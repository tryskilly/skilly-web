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
