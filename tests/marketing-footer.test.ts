import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');

describe('marketing footer refinement', () => {
  test('uses the shared warm marketing palette on the Builders page', () => {
    const globals = readFileSync(join(root, 'src/styles/globals.css'), 'utf8');
    const footer = readFileSync(join(root, 'src/components/Footer.astro'), 'utf8');

    expect(globals).toContain('--marketing-accent: #D78A0C');
    expect(globals).toContain('--marketing-section: #FCFAF6');
    expect(globals).toContain('--marketing-text: #171513');
    expect(globals).toContain('--marketing-muted: #6A6258');
    expect(globals).toContain('--marketing-border: #E7E0D3');
    expect(footer).toContain("getMarketingVariant(Astro.url.pathname)");
    expect(footer).toContain('marketing-footer--builders');
  });

  test('gives social destinations icons and visible labels', () => {
    const footer = readFileSync(join(root, 'src/components/Footer.astro'), 'utf8');

    expect(footer).toContain("import { Github, MessageCircle, Twitter } from 'lucide-astro'");
    expect(footer).toContain('<Twitter');
    expect(footer).toContain('<Github');
    expect(footer).toContain('<MessageCircle');
    expect(footer).toContain('X / Twitter');
    expect(footer).toContain('GitHub');
    expect(footer).toContain('Discord');
  });

  test('does not reserve space for unreliable remote launch badges', () => {
    const footer = readFileSync(join(root, 'src/components/Footer.astro'), 'utf8');

    expect(footer).not.toContain('nicklaunches.com/badges');
    expect(footer).not.toContain('smollaunch.com/badges');
  });
});
