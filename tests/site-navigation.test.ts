import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');

describe('marketing navigation architecture', () => {
  test('uses canonical product destinations and avoids legacy redirects', () => {
    const navigation = readFileSync(join(root, 'src/data/siteNavigation.ts'), 'utf8');

    expect(navigation).toContain("href: '/'");
    expect(navigation).toContain("href: '/people/'");
    expect(navigation).toContain("href: '/vs/'");
    expect(navigation).toContain("href: '/learn/'");
    expect(navigation).not.toContain("href: '/builders/'");
    expect(navigation).not.toContain("href: '/mac/'");
  });

  test('links every routable use-case and audience landing page', () => {
    const navigation = readFileSync(join(root, 'src/data/siteNavigation.ts'), 'utf8');
    const expectedDestinations = [
      '/use-cases/voice-onboarding/',
      '/use-cases/ai-product-tours/',
      '/use-cases/reduce-support-tickets/',
      '/use-cases/in-app-guidance-for-saas/',
      '/for/devtools/',
      '/for/ai-saas/',
      '/for/nocode-tools/',
      '/for/education-platforms/',
    ];

    expectedDestinations.forEach((href) => expect(navigation).toContain(`href: '${href}'`));
    expect(existsSync(join(root, 'src/pages/use-cases/[slug].astro'))).toBe(true);
    expect(existsSync(join(root, 'src/pages/for/[slug].astro'))).toBe(true);
  });

  test('renders real desktop dropdowns and structured mobile groups', () => {
    const nav = readFileSync(join(root, 'src/components/Nav.astro'), 'utf8');

    expect(nav).toContain("from '../data/siteNavigation.ts'");
    expect(nav).toContain('data-nav-menu="product"');
    expect(nav).toContain('data-nav-menu="use-cases"');
    expect(nav).toContain('mobile-nav-section');
    expect(nav).toContain('fixed right-3 top-[68px]');
    expect(nav).not.toContain('absolute right-[-2px]');
    expect(nav).not.toContain("href={isBuilderHome ? '#how' : '/#how'} class=\"inline-flex");
  });
});
