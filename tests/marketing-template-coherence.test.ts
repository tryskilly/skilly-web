import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const templates = [
  'src/components/SeoLandingTemplate.astro',
  'src/components/BuildersComparisonTemplate.astro',
  'src/components/VersusComparisonTemplate.astro',
];

describe('shared Builders marketing templates', () => {
  test.each(templates)('%s opts into the consolidated marketing system', (file) => {
    const source = readFileSync(join(root, file), 'utf8');

    expect(source).toContain('marketing-page');
    expect(source).toContain('marketing-hero');
    expect(source).toContain('marketing-card');
    expect(source).toContain('marketing-section-heading');
  });

  test('Layout exposes a stable product-line styling hook', () => {
    const layout = readFileSync(join(root, 'src/layouts/Layout.astro'), 'utf8');
    const globals = readFileSync(join(root, 'src/styles/globals.css'), 'utf8');

    expect(layout).toContain('data-product-line={productLine}');
    expect(globals).toContain('body[data-product-line="builders"]');
  });
});
