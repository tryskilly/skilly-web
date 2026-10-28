import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { trackedDownloadUrl } from '../src/data/config.ts';

const root = join(import.meta.dir, '..');
const read = (path: string) => readFileSync(join(root, path), 'utf8');

const macDownloadPages = [
  'src/pages/vs/clicky.astro',
  'src/pages/vs/cluely.astro',
  'src/pages/vs/gemini-live.astro',
  'src/pages/vs/raycast-ai.astro',
  'src/pages/vs/rewind.astro',
  'src/pages/vs/index.astro',
  'src/pages/demo.astro',
];

describe('tracked download URLs', () => {
  test('keeps source, medium, campaign, and content', () => {
    const href = trackedDownloadUrl('vs', 'vs_clicky_hero', 'clicky');
    expect(href).toBe(
      '/download?utm_source=tryskilly-web&utm_medium=vs&utm_campaign=vs_clicky_hero&utm_content=clicky',
    );
  });
});

describe('non-Mac waitlist on remaining Mac download CTAs', () => {
  test('swaps the plain nav Download links for a waitlist jump', () => {
    const nav = read('src/components/Nav.astro');

    expect(nav).toContain("href={navDownloadUrl('nav_menu')}");
    expect(nav).toContain("href={navDownloadUrl('nav_mobile')}");
    expect(nav).toContain("href={navDownloadUrl('nav')}");
    expect(nav).toContain('data-mac-download href={navDownloadUrl(\'nav_menu\')}>Download</a>');
    expect(nav).toContain('data-waitlist-jump href={waitlistHref}>Join the waitlist</a>');
    expect(nav).toContain('<span>Join the waitlist</span>');
    expect(nav).toContain("data-ph-event=\"web_cta_download_clicked\"");
    expect(nav).toContain("data-ph-prop-location=\"nav\"");
  });

  test('puts a waitlist block beside each page download and keeps the click event', () => {
    for (const path of macDownloadPages) {
      const source = read(path);
      expect(source, path).toContain('<NonMacWaitlist');
      expect(source, path).toContain('id="get-skilly"');
      expect(source, path).toContain('data-mac-download');
      expect(source, path).toMatch(/trackedDownloadUrl\(|utm_source/);
      expect(source, path).toContain("data-ph-event=\"web_cta_download_clicked\"");
    }
  });

  test('keeps a waitlist jump on comparison pages that have a second download', () => {
    for (const path of macDownloadPages.filter((path) => path !== 'src/pages/vs/index.astro' && path !== 'src/pages/demo.astro')) {
      const source = read(path);
      expect(source, path).toContain('data-waitlist-jump');
      expect(source, path).toContain('href="#get-skilly"');
      expect(source, path).toContain('Join the waitlist');
    }
  });
});
