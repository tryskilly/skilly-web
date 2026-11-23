import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('pricing page download tracking', () => {
  test('both Download for Mac buttons capture web_cta_download_clicked', () => {
    const page = read('src/pages/pricing.astro');
    expect(page.match(/data-ph-event="web_cta_download_clicked"/g)).toHaveLength(2);
    expect(page).toContain('data-ph-prop-location="pricing_hero"');
    expect(page).toContain('data-ph-prop-location="pricing_people"');
    expect(page).toContain('data-ph-prop-target-funnel="people"');
    expect(page).toContain("trackedDownloadUrl('pricing', 'pricing_hero', 'download')");
    expect(page).toContain("trackedDownloadUrl('pricing', 'pricing_people', 'download')");
    expect(page).toContain("trackedDownloadUrl('pricing', 'pricing_faq', 'download')");
    expect(page).toContain('data-mac-download');
    expect(page).toContain('<NonMacWaitlist');
    expect(page).toContain('href="/#get-skilly"');
    expect(page).not.toContain('href="/#waitlist"');
    expect(page).not.toMatch(/15 minutes free|15-minute free trial|lifetime trial|Try free|Start free/i);
  });
});

describe('learn after-step CTAs on high-intent guides', () => {
  test('houdini karma stays honest and figma auto layout marks the stuck step', () => {
    const houdini = read('src/content/learn/houdini-karma-rendering.md');
    const figma = read('src/content/learn/figma-auto-layout-tutorial.md');
    for (const source of [houdini, figma]) {
      expect(source.match(/<!-- skilly-mid-cta -->/g)).toHaveLength(1);
      expect(source).not.toMatch(/<!-- skilly-top-cta -->/);
      expect(source).not.toMatch(/15 minutes free|15-minute free trial|Start free/i);
    }
    expect(houdini).toContain('The Houdini skill is coming soon');
    expect(houdini).toContain('landerHref: "/#try-asking"');
    expect(figma).toContain('landerHref: "/figma/"');
    expect(figma).toContain('Hug and Fill');
  });
});
