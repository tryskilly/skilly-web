import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { classifyBrowser } from '../src/lib/visitor-os.ts';

const root = join(import.meta.dir, '..');

describe('browser store detection', () => {
  test('picks Edge before Chrome, and leaves Safari unmatched', () => {
    expect(classifyBrowser('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0')).toBe('edge');
    expect(classifyBrowser('Mozilla/5.0 Firefox/121.0')).toBe('firefox');
    expect(classifyBrowser('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36')).toBe('chrome');
    expect(classifyBrowser('Mozilla/5.0 Macintosh Version/17.0 Safari/605.1.15')).toBe('other');
  });

  test('the pre-paint script sets data-visitor-browser from the same function', () => {
    const script = readFileSync(join(root, 'src/components/VisitorOsScript.astro'), 'utf8');
    expect(script).toContain('classifyBrowser');
    expect(script).toContain("d.setAttribute('data-visitor-browser'");
  });
});

describe('crawler download handoff', () => {
  test('sends answer engines through /download/ instead of the GitHub DMG', () => {
    const layout = readFileSync(join(root, 'src/layouts/Layout.astro'), 'utf8');
    const llms = readFileSync(join(root, 'public/llms.txt'), 'utf8');
    const people = readFileSync(join(root, 'public/products/skilly-people.md'), 'utf8');
    const openAi = readFileSync(join(root, 'src/content/learn/skilly-openai-key-setup.md'), 'utf8');
    const resolve = readFileSync(join(root, 'src/content/learn/how-to-add-text-in-davinci-resolve.md'), 'utf8');

    expect(layout).toContain(
      "downloadUrl: 'https://tryskilly.app/download/?utm_source=schema&utm_medium=referral&utm_campaign=jsonld'",
    );
    expect(llms).toContain(
      'https://tryskilly.app/download/?utm_source=llms&utm_medium=referral&utm_campaign=llms_txt',
    );
    expect(people).toContain(
      'https://tryskilly.app/download/?utm_source=llms&utm_medium=referral&utm_campaign=people_md',
    );
    expect(layout).not.toContain('releases/latest/download/Skilly.dmg');
    expect(llms).not.toContain('releases/latest/download/Skilly.dmg');
    expect(people).not.toContain('releases/latest/download/Skilly.dmg');
    expect(openAi).toContain(
      '/download/?utm_source=tryskilly-web&utm_medium=learn&utm_campaign=skilly-openai-key-setup&utm_content=inline_text',
    );
    expect(resolve).toContain(
      '/download/?utm_source=tryskilly-web&utm_medium=learn&utm_campaign=how-to-add-text-in-davinci-resolve&utm_content=inline_text',
    );
    expect(resolve).toContain('](/davinci-resolve/)');
  });
});
