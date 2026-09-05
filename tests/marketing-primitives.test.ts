import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');

describe('marketing badge design system', () => {
  test('defines the semantic badge variants and compact geometry', () => {
    const source = readFileSync(join(root, 'src/components/Badge.astro'), 'utf8');

    for (const variant of ['neutral', 'accent', 'people', 'success', 'featured']) {
      expect(source).toContain(`'${variant}'`);
    }

    expect(source).toContain('rounded-full');
    expect(source).toMatch(/px-(?:2|2\.5|3)|px-\[\d+px\]/);
    expect(source).toContain('whitespace-nowrap');
  });
});

describe('marketing comparison-table design system', () => {
  test('locks mobile overflow, sticky feature cells, and the Skilly highlight', () => {
    const source = readFileSync(join(root, 'src/components/ComparisonTable.astro'), 'utf8');

    expect(source).toContain('overflow-x-auto');
    expect(source).toContain('min-w-[680px]');
    expect(source).toContain('extraWide?: boolean');
    expect(source).toContain('min-w-[900px]');
    expect(source).toContain('sticky');
    expect(source).toContain('is-skilly');
    expect(source).toContain('scope="col"');
    expect(source).toContain('scope="row"');
  });
});
