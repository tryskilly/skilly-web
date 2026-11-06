import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const page = readFileSync(join(root, 'src/pages/index.astro'), 'utf8');
const short = readFileSync(join(root, 'src/components/HeroShort.astro'), 'utf8');

describe('homepage hero', () => {
  test('keeps one download CTA above the fold with the trial line and Mac note', () => {
    const hero = page.slice(page.indexOf('class="people-hero'), page.indexOf('id="how"'));

    expect(hero).toContain('data-ph-event="web_cta_download_clicked"');
    expect(hero).toContain('data-ph-prop-location="people_hero"');
    expect(hero).toContain('href={DOWNLOAD_URL}');
    expect(hero).toContain('Download for Mac');
    expect(hero).toContain('15-minute trial, no card.');
    expect(hero).not.toContain('15-minute free trial');
    expect(hero).toContain('Mac only, macOS 14.2 or later');
    expect(hero).toContain('href="#get-skilly"');
    expect(hero).toContain('id="get-skilly"');
    expect(hero).not.toContain('Watch demo');
    expect(hero).not.toContain('Watch the 90-second demo');
  });

  test('loads the YouTube short only after a click, from the nocookie host', () => {
    expect(page).toContain('<HeroShort />');
    expect(short).toContain('https://www.youtube-nocookie.com/embed/Bs4PAOwHotE');
    expect(short).toContain('aspect-ratio: 9 / 16');
    expect(short).toContain("iframe.loading = 'lazy'");
    expect(short).not.toContain('<img');
    expect(short).not.toContain('<iframe');
  });
});
