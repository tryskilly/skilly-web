import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { askApps } from '../src/data/askExamples.ts';

const root = new URL('../', import.meta.url);

describe('homepage ask examples', () => {
  test('covers only the five bundled apps, three skill-backed questions each', () => {
    expect(askApps.map((app) => app.name)).toEqual([
      'Premiere Pro',
      'DaVinci Resolve',
      'After Effects',
      'Blender',
      'Figma',
    ]);

    for (const app of askApps) {
      expect(app.questions.length).toBeGreaterThanOrEqual(8);
      expect(app.questions.length).toBeLessThanOrEqual(12);
      expect(app.title.length).toBeLessThanOrEqual(70);
      expect(app.description.length).toBeGreaterThanOrEqual(50);
      expect(app.description.length).toBeLessThanOrEqual(170);
      expect(app.skillFile.startsWith('skills/')).toBe(true);
      expect(app.skillFile).not.toMatch(/houdini|xcode|photoshop|vscode/i);
      for (const example of app.questions) {
        expect(example.question.length).toBeGreaterThan(12);
        expect(example.skillLine).toBeGreaterThan(0);
        const learnPath = `src/content/learn/${example.learnHref.replace(/^\/learn\//, '').replace(/\/$/, '')}.md`;
        expect(existsSync(new URL(learnPath, root)), learnPath).toBe(true);
      }
    }
  });

  test('renders the questions on the homepage', () => {
    const page = readFileSync(new URL('src/pages/index.astro', root), 'utf8');
    expect(page).toContain('<AskExamples />');
    const component = readFileSync(new URL('src/components/AskExamples.astro', root), 'utf8');
    expect(component).toContain('Try asking...');
    expect(component).toContain('questions.slice(0, 3)');
    expect(component).toContain('href={`/${app.slug}/`}');
    expect(component).toContain('It never clicks, and it never moves your cursor.');
  });
});
