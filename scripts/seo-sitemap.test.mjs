import { afterEach, describe, expect, test } from 'bun:test';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { extractArticleLastmod, loadLearnLastmodMap } from './seo-sitemap.mjs';

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
