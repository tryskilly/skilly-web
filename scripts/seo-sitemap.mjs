import { execFileSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const FRONTMATTER_PATTERN = /^---\s*\n([\s\S]*?)\n---/;

const dateFromFrontmatter = (frontmatter, field) => {
  const match = frontmatter.match(
    new RegExp(`^${field}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})["']?\\s*$`, 'm'),
  );
  return match?.[1];
};

export const extractArticleLastmod = (source) => {
  const frontmatter = source.match(FRONTMATTER_PATTERN)?.[1];
  if (!frontmatter) return undefined;

  const date = dateFromFrontmatter(frontmatter, 'updatedDate')
    ?? dateFromFrontmatter(frontmatter, 'pubDate');
  if (!date) return undefined;

  return new Date(`${date}T00:00:00.000Z`).toISOString();
};

const listMarkdownFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
  }));
  return nested.flat();
};

export const loadLearnLastmodMap = async (contentDirectory) => {
  const files = await listMarkdownFiles(contentDirectory);
  const entries = await Promise.all(files.map(async (file) => {
    const source = await readFile(file, 'utf8');
    const lastmod = extractArticleLastmod(source);
    if (!lastmod) return undefined;

    const slug = path
      .relative(contentDirectory, file)
      .replace(/\.md$/, '')
      .split(path.sep)
      .join('/');
    return [`/learn/${slug}/`, lastmod];
  }));

  return new Map(entries.filter(Boolean));
};

// Buyer and handoff pages have no article frontmatter. lastmod is the newest
// author date among the files that actually render the page.
export const contentLastmodSources = {
  '/figma/': ['src/pages/figma.astro', 'src/data/appBuyer.ts', 'src/data/askExamples.ts', 'src/components/AppLanding.astro'],
  '/after-effects/': ['src/pages/after-effects.astro', 'src/data/appBuyer.ts', 'src/data/askExamples.ts', 'src/components/AppLanding.astro'],
  '/blender/': ['src/pages/blender.astro', 'src/data/appBuyer.ts', 'src/data/askExamples.ts', 'src/components/AppLanding.astro'],
  '/premiere-pro/': ['src/pages/premiere-pro.astro', 'src/data/appBuyer.ts', 'src/data/askExamples.ts', 'src/components/AppLanding.astro'],
  '/davinci-resolve/': ['src/pages/davinci-resolve.astro', 'src/data/appBuyer.ts', 'src/data/askExamples.ts', 'src/components/AppLanding.astro'],
  '/vs/clicky/': ['src/pages/vs/clicky.astro'],
  '/download/': ['src/pages/download.astro', 'src/components/DownloadInstallGuide.astro'],
  '/privacy-first/': ['src/pages/privacy-first.astro', 'src/data/privacyFacts.ts'],
};

export const newestIsoTimestamp = (values) => {
  const times = values
    .map((value) => Date.parse(value))
    .filter((time) => Number.isFinite(time));
  if (times.length === 0) return undefined;
  return new Date(Math.max(...times)).toISOString();
};

const gitAuthorIso = (repoRoot, file) => {
  try {
    const output = execFileSync(
      'git',
      ['log', '-1', '--format=%aI', '--', file],
      { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return output || undefined;
  } catch {
    return undefined;
  }
};

export const loadContentLastmodMap = (repoRoot) => {
  const entries = Object.entries(contentLastmodSources).map(([pathname, files]) => {
    const lastmod = newestIsoTimestamp(
      files.map((file) => gitAuthorIso(repoRoot, file)).filter(Boolean),
    );
    return lastmod ? [pathname, lastmod] : undefined;
  });
  return new Map(entries.filter(Boolean));
};
