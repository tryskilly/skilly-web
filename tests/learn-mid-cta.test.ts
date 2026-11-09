import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';
import { trackedDownloadUrl } from '../src/data/config.ts';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');

const guides = [
  {
    file: 'src/content/learn/how-to-add-bevel-modifier-blender.md',
    slug: 'how-to-add-bevel-modifier-blender',
    lander: '/blender/',
    moment: 'Add Modifier > Generate > Bevel',
  },
  {
    file: 'src/content/learn/figma-canvas-and-navigation.md',
    slug: 'figma-canvas-and-navigation',
    lander: '/figma/',
    moment: 'toolbar along the bottom',
  },
  {
    file: 'src/content/learn/chatgpt-screen-sharing-mac.md',
    slug: 'chatgpt-screen-sharing-mac',
    lander: '/#try-asking',
    moment: 'Share Screen button is missing',
  },
  {
    file: 'src/content/learn/enable-screen-recording-permission-macos.md',
    slug: 'enable-screen-recording-permission-macos',
    lander: '/#try-asking',
    moment: 'Screen & System Audio Recording',
  },
  {
    file: 'src/content/learn/ai-tutor-that-sees-your-screen.md',
    slug: 'ai-tutor-that-sees-your-screen',
    lander: '/#try-asking',
    moment: 'where do I change this?',
  },
];

describe('learn mid-article CTA', () => {
  test('the component carries the trial, the download label, and the learn attribution', () => {
    const component = read('src/components/LearnMidArticleCta.astro');
    expect(component).toContain('15-minute trial, no card.');
    expect(component).toContain('Download for Mac');
    expect(component).toContain('It never clicks, and it never moves your cursor.');
    expect(component).toContain('data-ph-event="web_cta_download_clicked"');
    expect(component).toContain('data-ph-prop-location="learn_mid_article"');
    expect(component).toContain('data-ph-prop-location="learn_top"');
    expect(component).toContain('15-minute trial, no card. macOS 14.2 or later.');
    expect(component).toContain("const utmContent = placement === 'top' ? 'top' : 'mid_article';");
    expect(component).toContain("trackedDownloadUrl('learn', articleSlug, utmContent)");
    expect(component.toLowerCase()).not.toContain('free');
    expect(trackedDownloadUrl('learn', 'how-to-add-bevel-modifier-blender', 'mid_article')).toBe(
      '/download/?utm_source=tryskilly-web&utm_medium=learn&utm_campaign=how-to-add-bevel-modifier-blender&utm_content=mid_article',
    );
    expect(trackedDownloadUrl('learn', 'how-to-add-bevel-modifier-blender', 'top')).toBe(
      '/download/?utm_source=tryskilly-web&utm_medium=learn&utm_campaign=how-to-add-bevel-modifier-blender&utm_content=top',
    );
  });

  test('each guide marks the stuck step and links the honest lander', () => {
    for (const guide of guides) {
      const source = read(guide.file);
      expect(source.match(/<!-- skilly-mid-cta -->/g), guide.slug).toHaveLength(1);
      expect(source.match(/<!-- skilly-top-cta -->/g), guide.slug).toHaveLength(1);
      const topAt = source.indexOf('<!-- skilly-top-cta -->');
      const midAt = source.indexOf('<!-- skilly-mid-cta -->');
      expect(topAt, guide.slug).toBeGreaterThan(-1);
      expect(topAt, guide.slug).toBeLessThan(midAt);
      expect(source, guide.slug).toContain(`landerHref: "${guide.lander}"`);
      expect(source, guide.slug).toContain(guide.moment);
      expect(source, guide.slug).not.toMatch(/Skilly clicks|Skilly moves your cursor/i);
    }
  });

  test('the top marker stays off SwiftUI and Xcode guides', () => {
    const directory = new URL('src/content/learn/', root);
    const marked = readdirSync(directory)
      .filter((name) => name.endsWith('.md'))
      .filter((name) => read(`src/content/learn/${name}`).includes('<!-- skilly-top-cta -->'))
      .sort();
    expect(marked).toEqual([
      'ai-tutor-that-sees-your-screen.md',
      'chatgpt-screen-sharing-mac.md',
      'enable-screen-recording-permission-macos.md',
      'figma-canvas-and-navigation.md',
      'how-to-add-bevel-modifier-blender.md',
    ]);
  });
});
