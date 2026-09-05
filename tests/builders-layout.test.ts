import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');

describe('Builders reference layout', () => {
  test('uses shared chrome and the shared featured badge', () => {
    const page = readFileSync(join(root, 'src/pages/index.astro'), 'utf8');
    const nav = readFileSync(join(root, 'src/components/Nav.astro'), 'utf8');

    expect(page).toContain("import Footer from '../components/Footer.astro'");
    expect(page).toContain('<Footer />');
    expect(page).toContain('variant="featured"');
    expect(page).toContain('md:col-span-2 md:text-[28px]');
    expect(page).toContain('class="shrink-0 uppercase tracking-[0.04em]"');
    expect(page).toContain('class="impact-featured-chevron mt-0.5 shrink-0 text-[#312C27]"');
    expect(page).not.toContain('<span class="rounded-full bg-[#F8D892]');
    expect(nav).toContain('sticky top-0');
  });

  test('locks the 948px impact and pilot grid calibration', () => {
    const page = readFileSync(join(root, 'src/pages/index.astro'), 'utf8');

    expect(page).toContain('gap: 46px');
    expect(page).toContain('padding: 25px 54px 25px 34px');
    expect(page).toContain('grid-template-columns: 372.5px 20px 300px 48px minmax(0, 1fr)');
    expect(page).toContain('@media (min-width: 1101px)');
    expect(page).toContain('grid-template-columns: minmax(360px, 0.58fr) minmax(0, 1fr)');
    expect(page).not.toContain('padding-inline: 0');
    expect(page).toContain('.builders-problem-title {\n        max-width: 30ch;');
  });
});
