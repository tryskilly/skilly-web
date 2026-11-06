import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
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
    expect(component).toContain("trackedDownloadUrl('learn', articleSlug, 'mid_article')");
    expect(trackedDownloadUrl('learn', 'how-to-add-bevel-modifier-blender', 'mid_article')).toBe(
      '/download/?utm_source=tryskilly-web&utm_medium=learn&utm_campaign=how-to-add-bevel-modifier-blender&utm_content=mid_article',
    );
  });

  test('each guide marks the stuck step and links the honest lander', () => {
    for (const guide of guides) {
      const source = read(guide.file);
      expect(source.match(/<!-- skilly-mid-cta -->/g), guide.slug).toHaveLength(1);
      expect(source, guide.slug).toContain(`landerHref: "${guide.lander}"`);
      expect(source, guide.slug).toContain(guide.moment);
      expect(source, guide.slug).not.toMatch(/Skilly clicks|Skilly moves your cursor/i);
    }
  });
});
