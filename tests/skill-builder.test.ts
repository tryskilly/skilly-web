import { describe, expect, test } from 'bun:test';
import { assessCourseQuality, buildFallbackCourse, courseToMarkdown, parseSkillBuilderInput } from '../src/lib/skill-builder';

describe('skill builder input', () => {
  test('normalizes a valid request', () => {
    expect(parseSkillBuilderInput({ app: '  Blender ', goal: ' Create a product render ', level: 'Beginner', pace: 'Standard' })).toEqual({
      app: 'Blender',
      goal: 'Create a product render',
      level: 'Beginner',
      pace: 'Standard',
    });
  });

  test('rejects vague and invalid requests', () => {
    expect(() => parseSkillBuilderInput({ app: 'X', goal: 'learn', level: 'Expert', pace: 'Fast' })).toThrow();
  });
});

describe('fallback course', () => {
  const input = { app: 'Blender', goal: 'Create a product render', level: 'Intermediate' as const, pace: 'Standard' as const };
  const course = buildFallbackCourse(input);

  test('sizes the preview to the requested material instead of forcing six stages', () => {
    const simple = buildFallbackCourse({ app: 'File Explorer', goal: 'Learn to download apps from the internet', level: 'Beginner', pace: 'Quick' });
    const substantial = buildFallbackCourse({ app: 'Blender', goal: 'Build an end-to-end product render with modeling, materials, lighting, camera setup, and export', level: 'Beginner', pace: 'Deep dive' });

    expect(simple.lessons.length).toBeGreaterThanOrEqual(1);
    expect(simple.lessons.length).toBeLessThan(substantial.lessons.length);
    expect(substantial.lessons.length).toBeLessThanOrEqual(8);
    expect(course.lessons.every((lesson) => lesson.steps.length >= 3 && lesson.checkpoint.length > 10)).toBe(true);
    expect(course.usedLlm).toBe(false);
    expect(course.exportReady).toBe(false);
  });

  test('accepts a concise, detailed curriculum without padding it to six stages', () => {
    const lessons = [0, 1].map((index) => ({
      title: `Focused stage ${index + 1}`,
      duration: '8 min',
      objective: 'Complete one bounded part of the requested outcome.',
      steps: ['Open the named control.', 'Perform the requested action.', 'Verify the visible result.'],
      checkpoint: 'The expected result is visible and can be repeated.',
      completionSignals: ['control visible', 'result verified'],
    }));
    const issues = assessCourseQuality({
      usedLlm: true,
      lessons,
      teaching: {
        principles: ['Use exact labels.', 'Teach one visible action at a time.', 'Verify before advancing.'],
        commonMistakes: [
          { mistake: 'Wrong control', symptom: 'The expected option is missing.', correction: 'Return to the named panel and verify the current mode.' },
          { mistake: 'Skipped verification', symptom: 'The result is uncertain.', correction: 'Repeat the visible checkpoint before continuing.' },
        ],
        safetyChecks: ['Save before a destructive change.'],
      },
      vocabulary: ['Panel', 'Button', 'Menu', 'Result'].map((name) => ({ name, description: `${name} used by this workflow.` })),
    });

    expect(issues).toEqual([]);
  });

  test('exports deterministic SKILL.md frontmatter and lessons', () => {
    const markdown = courseToMarkdown({ ...course, markdown: undefined } as never);
    expect(markdown).toContain('id: blender-create-a-product-render');
    expect(markdown).toContain('format_version: "1.0"');
    expect(markdown).toContain('bundle_id: org.blenderfoundation.blender');
    expect(markdown).toContain('## Curriculum');
    expect(markdown).toContain('### Stage 1:');
    expect(markdown).toContain(`### Stage ${course.lessons.length}:`);
    expect(markdown).toContain('## UI Vocabulary');
    expect(markdown).toContain('Guide the learner one observable action at a time.');
  });
});
