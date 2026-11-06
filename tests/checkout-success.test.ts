import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('checkout success page', () => {
  test('opens the deep link the Mac app handles and does not forward the payer id', () => {
    const page = read('src/pages/checkout-success.astro');
    expect(page).toContain("const deepLink = 'skilly://checkout-success'");
    expect(page).not.toContain('skilly://checkout-success?');
    expect(page).toContain('Open Skilly');
    expect(page).toContain("Skilly didn't open? Make sure it's in Applications and open it from there.");
    expect(page).toContain('href="/download/"');
    expect(page).toContain('install steps');
    expect(page).toContain('noindex');
    expect(page).toContain("capture('checkout_success_viewed'");
    expect(page).toContain('data-ph-event="checkout_open_app_clicked"');
    expect(page.toLowerCase()).not.toContain('free');
  });

  test('stays out of the sitemap and robots.txt', () => {
    const config = read('astro.config.mjs');
    const robots = read('public/robots.txt');
    expect(config).toContain("trailingSlash: 'always'");
    expect(config).toContain("pathname !== '/checkout-success/'");
    expect(robots).toContain('Disallow: /checkout-success');
    expect(robots).not.toContain('Disallow: /checkout-success/');
  });
});
