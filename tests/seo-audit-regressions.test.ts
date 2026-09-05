import { describe, expect, test } from 'bun:test';
import { readFileSync, readdirSync } from 'node:fs';
import { buildersComparisonPages } from '../src/data/buildersComparisonPages';
import { buildersVersusPages } from '../src/data/buildersVersusPages';

const root = new URL('../', import.meta.url);

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, root), 'utf8');
}

function extractConst(source: string, name: 'title' | 'description'): string | null {
  const match = source.match(new RegExp(`const ${name}\\s*=\\s*(['"])(.*?)\\1;`, 's'));
  return match?.[2] ?? null;
}

describe('OpenSEO regressions', () => {
  test('keeps the browser demo to one document heading and a canonical download path', () => {
    const demo = read('src/pages/demo.astro');

    expect(demo.match(/<h1\b/g)).toHaveLength(1);
    expect(demo).toContain("const MAC_URL = '/download/';");
  });

  test('does not introduce the trailing-slash redirects found by the crawler', () => {
    const downloadSources = [
      read('src/components/Hero.astro'),
      read('src/pages/tools/skill-builder.astro'),
      read('src/pages/api/skill-builder-email.ts'),
    ].join('\n');

    expect(downloadSources).not.toMatch(/\/dmg\?/);
    expect(downloadSources).not.toMatch(/\/dmg(['"]|&quot;)/);
  });

  test('keeps generated comparison metadata within the crawler snippet guardrails', () => {
    const pages = [...buildersComparisonPages, ...buildersVersusPages];

    for (const page of pages) {
      expect(page.title.length, `${page.slug} title`).toBeLessThanOrEqual(60);
      expect(page.description.length, `${page.slug} description`).toBeGreaterThanOrEqual(50);
      expect(page.description.length, `${page.slug} description`).toBeLessThanOrEqual(160);
    }
  });

  test('keeps hand-authored comparison metadata within the same guardrails', () => {
    const vsDirectory = new URL('src/pages/vs/', root);
    const files = readdirSync(vsDirectory).filter((name) => name.endsWith('.astro'));

    for (const file of files) {
      const source = read(`src/pages/vs/${file}`);
      const title = extractConst(source, 'title');
      const description = extractConst(source, 'description');

      if (!title || !description) continue;
      expect(title.length, `${file} title`).toBeLessThanOrEqual(60);
      expect(description.length, `${file} description`).toBeGreaterThanOrEqual(50);
      expect(description.length, `${file} description`).toBeLessThanOrEqual(160);
    }
  });
});
