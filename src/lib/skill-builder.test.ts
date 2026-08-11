import { describe, expect, test } from 'bun:test';
import {
  buildSkillCourse,
  buildFallbackCourse,
  courseToMarkdown,
  normalizeSkillSources,
  skillCourseCacheKey,
  type SkillBuilderInput,
} from './skill-builder';
import { buildSkillLeadProperties, parseSkillLeadAttribution } from './skill-builder-lead';

const input: SkillBuilderInput = {
  app: 'Blender',
  goal: 'Create a product render with a beveled cube',
  level: 'Beginner',
  pace: 'Standard',
};

describe('skill builder grounding', () => {
  test('requests web search and returns only consulted citations', async () => {
    const originalFetch = globalThis.fetch;
    const originalKey = process.env.OPENAI_API_KEY;
    const requestedBodies: Record<string, unknown>[] = [];
    process.env.OPENAI_API_KEY = 'test-key';
    const official = 'https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html';
    const fallback = buildFallbackCourse({ ...input, goal: 'Create a verified bevel workflow for a product mockup' });
    globalThis.fetch = (async (_resource: string | URL | Request, init?: RequestInit) => {
      requestedBodies.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      return new Response(JSON.stringify({
        output: [
          { type: 'web_search_call', action: { sources: [{ type: 'url', url: official }] } },
          { type: 'message', content: [{ type: 'output_text', text: JSON.stringify({
            title: fallback.title,
            summary: fallback.summary,
            outcome: fallback.outcome,
            duration: fallback.duration,
            lessons: fallback.lessons.map((lesson) => ({
              ...lesson,
              steps: [...lesson.steps, 'Use the named control to verify the result.', 'Repeat the operation from a saved checkpoint.'],
            })),
            teaching: {
              principles: ['Use exact Blender labels.', 'Confirm object mode.', 'Teach modifier order.', 'Compare before and after.'],
              commonMistakes: [1, 2, 3, 4].map((number) => ({ mistake: `Mistake ${number}`, symptom: 'The bevel is not visible.', correction: 'Apply scale and inspect the modifier stack.' })),
              safetyChecks: ['Save before applying modifiers.', 'Verify the active object.'],
            },
            vocabulary: ['Properties Editor', 'Modifier tab', 'Bevel modifier', 'Segments', 'Width', 'Clamp Overlap', 'Object Mode', 'Viewport'].map((name) => ({ name, description: `${name} is used to configure and verify the bevel workflow.` })),
            sources: [
              { title: 'Blender bevel documentation', url: official, type: 'official' },
              { title: 'Unconsulted', url: 'https://example.com/unconsulted', type: 'official' },
            ],
          }) }],
          },
        ],
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as typeof fetch;

    try {
      const course = await buildSkillCourse({ ...input, goal: 'Create a verified bevel workflow for a product mockup' });
      const tools = requestedBodies[0]?.tools as Array<{ type?: string }>;
      const textFormat = requestedBodies[0]?.text as { format?: { type?: string; strict?: boolean } };
      expect(tools[0]?.type).toBe('web_search');
      expect(textFormat.format?.type).toBe('json_schema');
      expect(textFormat.format?.strict).toBe(true);
      expect(course.grounding).toBe('web_sources');
      expect(course.exportReady).toBe(true);
      expect(course.sources.map((source) => source.url)).toEqual([official]);
    } finally {
      globalThis.fetch = originalFetch;
      if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
      else process.env.OPENAI_API_KEY = originalKey;
    }
  });

  test('keeps only sources returned by the web-search tool', () => {
    const official = 'https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html';
    const sources = normalizeSkillSources([
      { title: 'Bevel modifier', url: official, type: 'official' },
      { title: 'Invented source', url: 'https://example.com/fake', type: 'official' },
      { title: 'Duplicate', url: official, type: 'reference' },
    ], new Set([official]));

    expect(sources).toEqual([{
      title: 'Bevel modifier',
      url: official,
      domain: 'docs.blender.org',
      type: 'official',
    }]);
  });

  test('exports visible source links in the Markdown skill', () => {
    const fallback = buildFallbackCourse(input);
    const { markdown: _markdown, ...base } = fallback;
    const markdown = courseToMarkdown({
      ...base,
      grounding: 'web_sources',
      usedWebSearch: true,
      sources: [{
        title: 'Blender bevel documentation',
        url: 'https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html',
        domain: 'docs.blender.org',
        type: 'official',
      }],
    });

    expect(markdown).toContain('## Sources');
    expect(markdown).toContain('[Blender bevel documentation](https://docs.blender.org');
  });

  test('normalizes equivalent requests to the same cache key', () => {
    expect(skillCourseCacheKey(input)).toBe(skillCourseCacheKey({ ...input, app: '  blender ', goal: 'Create  a product render with a beveled cube' }));
  });
});

describe('skill builder lead metadata', () => {
  test('captures the course and sanitized campaign attribution', () => {
    const course = buildFallbackCourse(input);
    const attribution = parseSkillLeadAttribution({
      source: 'reddit\n',
      medium: 'community',
      campaign: 'skill-builder-launch',
      referrer: 'reddit.com',
      landingPage: '/tools/skill-builder/?utm_source=reddit',
    });
    const properties = buildSkillLeadProperties(course, attribution);

    expect(properties.skill_app).toBe('Blender');
    expect(properties.skill_goal).toBe(input.goal);
    expect(properties.skill_utm_source).toBe('reddit');
    expect(properties.skill_grounding).toBe('fallback');
  });
});
