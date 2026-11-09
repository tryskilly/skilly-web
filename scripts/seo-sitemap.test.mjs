import { afterEach, describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { contentLastmodSources, extractArticleLastmod, loadLearnLastmodMap, newestIsoTimestamp } from './seo-sitemap.mjs';

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })
  ));
});

describe('extractArticleLastmod', () => {
  test('prefers updatedDate over pubDate', () => {
    const source = `---
pubDate: 2026-06-01
updatedDate: 2026-07-30
---
# Article
`;

    expect(extractArticleLastmod(source)).toBe('2026-07-30T00:00:00.000Z');
  });

  test('falls back to pubDate', () => {
    const source = `---
pubDate: "2026-06-01"
---
# Article
`;

    expect(extractArticleLastmod(source)).toBe('2026-06-01T00:00:00.000Z');
  });
});

describe('loadLearnLastmodMap', () => {
  test('maps nested Markdown files to canonical learn paths', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'skilly-sitemap-'));
    temporaryDirectories.push(directory);
    await mkdir(path.join(directory, 'series'));
    await writeFile(
      path.join(directory, 'series', 'lesson.md'),
      '---\npubDate: 2026-07-01\n---\n',
    );

    const lastmods = await loadLearnLastmodMap(directory);

    expect(lastmods.get('/learn/series/lesson/')).toBe('2026-07-01T00:00:00.000Z');
  });
});

describe('content page lastmod', () => {
  test('keeps a source list for the indexable buyer and handoff pages', () => {
    expect(Object.keys(contentLastmodSources).sort()).toEqual([
      '/after-effects/',
      '/blender/',
      '/davinci-resolve/',
      '/download/',
      '/figma/',
      '/premiere-pro/',
      '/privacy-first/',
      '/vs/clicky/',
    ]);
    expect(contentLastmodSources['/checkout-success/']).toBeUndefined();
  });

  test('uses the newest real timestamp', () => {
    expect(newestIsoTimestamp([
      '2026-08-04T12:00:00.000Z',
      '2026-11-06T21:31:54.000Z',
    ])).toBe('2026-11-06T21:31:54.000Z');
    expect(newestIsoTimestamp([])).toBeUndefined();
  });

  test('the listed pages stay indexable and checkout-success stays out', () => {
    const root = new URL('../', import.meta.url);
    const read = (relativePath) => readFileSync(new URL(relativePath, root), 'utf8');
    const config = read('astro.config.mjs');
    expect(config).toContain("pathname !== '/checkout-success/'");
    expect(read('src/pages/checkout-success.astro')).toContain('noindex');

    const indexable = [
      'src/pages/figma.astro',
      'src/pages/after-effects.astro',
      'src/pages/blender.astro',
      'src/pages/premiere-pro.astro',
      'src/pages/davinci-resolve.astro',
      'src/pages/vs/clicky.astro',
      'src/pages/download.astro',
      'src/pages/privacy-first.astro',
      'src/content/learn/ai-tutor-that-sees-your-screen.md',
    ];
    for (const file of indexable) {
      expect(read(file), file).not.toContain('noindex');
    }
  });
});
