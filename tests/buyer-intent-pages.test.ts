import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { appBuyerPages, planLines } from '../src/data/appBuyer.ts';

const root = new URL('../', import.meta.url);
const clicky = readFileSync(new URL('src/pages/vs/clicky.astro', root), 'utf8');

describe('buyer-intent app landers', () => {
  test('keeps titles and metas inside the snippet limits', () => {
    expect(appBuyerPages.map((page) => page.slug)).toEqual([
      'blender',
      'premiere-pro',
      'davinci-resolve',
    ]);

    for (const page of appBuyerPages) {
      expect(page.pageTitle.length, page.slug).toBeLessThanOrEqual(60);
      expect(page.description.length, page.slug).toBeGreaterThanOrEqual(50);
      expect(page.description.length, page.slug).toBeLessThanOrEqual(160);
      expect(page.h1.length, page.slug).toBeGreaterThan(12);
      expect(page.stages.length, page.slug).toBe(7);
    }
  });

  test('uses the pricing.md phrases and does not call Skilly free', () => {
    expect(planLines).toContain('15-minute trial, no card.');
    expect(planLines).toContain('Bring your own OpenAI key: $5/month plus your OpenAI usage.');
    expect(planLines).toContain('Skilly for People Beta — $19/month.');
    expect(planLines.join(' ')).toContain('Houdini is coming soon and not bundled in the app yet.');

    const blob = JSON.stringify(appBuyerPages) + planLines.join('\n');
    expect(blob.toLowerCase()).not.toContain('free');
    expect(blob).not.toMatch(/xcode|photoshop|vs code|vscode|lifetime|founder/i);
    expect(blob).toContain('It never clicks, and it never moves your cursor.');
    expect(blob).not.toMatch(/cursor flies|clicks for you/i);
  });

  test('puts the buyer keywords on the right page', () => {
    const blender = appBuyerPages[0];
    expect(blender.pageTitle.toLowerCase()).toContain('blender ai assistant');
    expect(blender.description.toLowerCase()).toContain('ai for blender');
    expect(blender.tutorHeading).toBe('An AI tutor for Blender');

    const premiere = appBuyerPages[1];
    expect(premiere.pageTitle.toLowerCase()).toContain('ai for premiere pro');
    expect(premiere.tutorHeading).toBe('An AI assistant for Premiere Pro');

    const davinci = appBuyerPages[2];
    expect(davinci.pageTitle.toLowerCase()).toContain('ai for davinci resolve');
    expect(davinci.tutorHeading).toBe('An AI assistant for DaVinci Resolve');
  });
});

describe('clicky alternative page', () => {
  test('retitles around Clicky alternative and stays inside the snippet limits', () => {
    const title = clicky.match(/const title = '([^']+)';/)?.[1] ?? '';
    const description = clicky.match(/const description =\n\s+'([^']+)';/)?.[1] ?? '';
    expect(title).toContain('Clicky alternative');
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description.length).toBeGreaterThanOrEqual(50);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(clicky).toMatch(/<h1[^>]*>\s*Clicky alternative\s*<\/h1>/);
  });

  test('links the allowed sources and the creative-app landers', () => {
    for (const url of [
      'https://github.com/tryskilly/skilly/blob/main/LICENSE',
      'https://github.com/farzaa/clicky',
      'https://www.heyclicky.com/',
      'https://www.heyclicky.com/for-mac',
      '/privacy-first/',
      '/pricing/',
      '/blender/',
      '/premiere-pro/',
      '/davinci-resolve/',
      '/after-effects/',
      '/figma/',
    ]) {
      expect(clicky, url).toContain(url);
    }
  });

  test('drops unsourced Clicky claims and does not call Skilly free', () => {
    expect(clicky).not.toMatch(/cursor flies|push-to-talk only|3-stack|three-stack|33 hours|5 days|20\+|15 minutes free|15 min free/i);
    expect(clicky).not.toMatch(/lifetime|founder/i);
    expect(clicky).toContain('15-minute trial, no card');
    expect(clicky).toContain('Bring your own OpenAI key: $5/month plus your OpenAI usage.');
    expect(clicky).toContain('It never clicks, and it never moves your cursor.');
  });
});
