import { describe, expect, test } from 'bun:test';
import { buildFallbackCourse, courseToMarkdown, parseSkillBuilderInput } from '../src/lib/skill-builder';

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

  test('always provides a complete useful preview', () => {
    expect(course.lessons).toHaveLength(6);
    expect(course.lessons.every((lesson) => lesson.steps.length >= 3 && lesson.checkpoint.length > 10)).toBe(true);
    expect(course.usedLlm).toBe(false);
    expect(course.exportReady).toBe(false);
  });

  test('exports deterministic SKILL.md frontmatter and lessons', () => {
    const markdown = courseToMarkdown({ ...course, markdown: undefined } as never);
    expect(markdown).toContain('id: blender-create-a-product-render');
    expect(markdown).toContain('format_version: "1.0"');
    expect(markdown).toContain('bundle_id: org.blenderfoundation.blender');
    expect(markdown).toContain('## Curriculum');
    expect(markdown).toContain('### Stage 1:');
    expect(markdown).toContain('### Stage 6:');
    expect(markdown).toContain('## UI Vocabulary');
    expect(markdown).toContain('Guide the learner one observable action at a time.');
  });
});
