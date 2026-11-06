import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const source = readFileSync(
  new URL('../src/content/learn/ai-tutor-that-sees-your-screen.md', import.meta.url),
  'utf8',
);

const field = (key: string) => source.match(new RegExp(`^${key}: "([^"]+)"`, 'm'))?.[1] ?? '';

describe('ai tutor guide buyer upgrade', () => {
  test('keeps the ranking phrase and adds the screen-aware assistant phrase inside the snippet limits', () => {
    const title = field('title');
    const description = field('description');
    expect(title.toLowerCase()).toContain('ai tutor');
    expect(title.toLowerCase()).toContain('sees your screen');
    expect(description.toLowerCase()).toContain('screen-aware ai assistant');
    expect(title.length).toBeLessThanOrEqual(70);
    expect(description.length).toBeGreaterThanOrEqual(50);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(field('canonicalKeyword')).toBe('AI tutor that sees your screen');
  });

  test('links the five app pages with one skill-backed question each', () => {
    expect(source).toContain('## Skilly for your app');
    const questions: Record<string, string> = {
      '/premiere-pro/': 'Where are the Source Monitor and the Timeline?',
      '/davinci-resolve/': 'How do I switch from the Edit page to Color?',
      '/after-effects/': 'How do I keyframe position so this layer moves?',
      '/blender/': 'Where do I add a Bevel modifier?',
      '/figma/': 'How do I add auto layout to this frame?',
    };
    for (const [href, question] of Object.entries(questions)) {
      expect(source, href).toContain(`](${href})`);
      expect(source, question).toContain(question);
    }
    expect(source).toContain('Houdini is coming soon and not bundled in the app yet.');
  });

  test('keeps the mid-article CTA, the privacy line, and sourced competitor notes', () => {
    expect(source.match(/<!-- skilly-mid-cta -->/g)).toHaveLength(1);
    expect(source).toContain('How Skilly handles your screen: a JPEG of your displays when you ask. Not a continuous recording.');
    expect(source).toContain('](/privacy-first/)');
    expect(source).toContain('15-minute trial, no card');
    expect(source).toContain('Bring your own OpenAI key: $5/month plus your OpenAI usage.');
    expect(source).toContain('https://www.useclacky.com/');
    expect(source).toContain('https://clicky.foo/');
    expect(source).toContain('/learn/chatgpt-screen-sharing-mac/');
    expect(source).toContain('It never clicks, and it never moves your cursor.');
    expect(source).toContain('macOS 14.2 or later');
    const body = source.split(/^---$/m).slice(2).join('---');
    expect(body).not.toMatch(/Moves the cursor|15 minutes free|15-minute free trial|\bXcode\b|Photoshop|VS Code/i);
  });
});
