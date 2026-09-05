import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');

describe('marketing button design system', () => {
  test('defines the brand and hierarchy variants used across marketing pages', () => {
    const source = readFileSync(join(root, 'src/components/Button.astro'), 'utf8');

    for (const variant of [
      'builders-primary',
      'builders-accent',
      'people-primary',
      'secondary',
      'inverse',
      'ghost',
    ]) {
      expect(source).toContain(`'${variant}'`);
    }
  });

  test('keeps spacing, focus, active, disabled, and no-wrap behavior in the primitive', () => {
    const source = readFileSync(join(root, 'src/components/Button.astro'), 'utf8');

    expect(source).toContain('whitespace-nowrap');
    expect(source).toContain('focus-visible:');
    expect(source).toContain('active:');
    expect(source).toContain('disabled:');
    expect(source).toMatch(/px-(?:4|5|6|7|8)|px-\[\d+px\]/);
  });

  test('does not use the unsupported px-4.5 utility in source files', async () => {
    const glob = new Bun.Glob('src/**/*.{astro,css,ts,js}');
    const offenders: string[] = [];

    for await (const path of glob.scan({ cwd: root })) {
      if (readFileSync(join(root, path), 'utf8').includes('px-4.5')) offenders.push(path);
    }

    expect(offenders).toEqual([]);
  });
});
