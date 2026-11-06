import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { privacyFacts, privacyPage } from '../src/data/privacyFacts.ts';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('privacy-first page', () => {
  test('keeps title and description inside snippet limits', () => {
    expect(privacyPage.title.length).toBeLessThanOrEqual(70);
    expect(privacyPage.description.length).toBeGreaterThanOrEqual(50);
    expect(privacyPage.description.length).toBeLessThanOrEqual(170);
  });

  test('every fact links to the skilly repo and avoids unsourced apps', () => {
    const blob = JSON.stringify(privacyFacts);
    expect(blob).not.toMatch(/xcode|photoshop|visual studio code|houdini is bundled/i);
    for (const fact of privacyFacts) {
      expect(fact.sources.length).toBeGreaterThan(0);
      for (const source of fact.sources) {
        expect(source.href.startsWith('https://github.com/tryskilly/skilly/blob/main/')).toBe(true);
      }
    }
    expect(blob).toContain('LICENSE');
    expect(blob).toContain('UserDefaults');
    expect(blob).toContain('studio.tryskilly.app');
  });

  test('homepage and pricing link the details page without editing the legal policy', () => {
    const home = read('src/pages/index.astro');
    const pricing = read('src/pages/pricing.astro');
    const page = read('src/pages/privacy-first.astro');
    expect(home).toContain('<PrivacySnapshot />');
    expect(pricing).toContain('href="/privacy-first/"');
    expect(page).toContain('trackedDownloadUrl(\'privacy\', \'privacy_first\', \'download\')');
    expect(page).toContain('15-minute trial, no card');
    expect(page).not.toContain('Download for Mac — Free');
    expect(read('src/pages/privacy.astro')).not.toContain('/privacy-first/');
  });
});
