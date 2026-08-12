import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/tools/skill-builder.astro', import.meta.url), 'utf8');
const client = readFileSync(new URL('../src/scripts/skill-builder.ts', import.meta.url), 'utf8');

describe('skill builder lead gate', () => {
  test('offers a useful preview while describing the email exchange accurately', () => {
    expect(page).toContain('No account or email required to see the outline and first lesson.');
    expect(page).toContain('Unlock all six lessons and keep the skill');
    expect(page.indexOf('data-skill-email-form')).toBeLessThan(page.indexOf('data-lesson-list'));
  });

  test('shows the gate after generation and unlocks the remaining lessons after delivery', () => {
    expect(client).toContain("web_skill_builder_email_gate_viewed");
    expect(client).toContain("const locked = index > 0 && !skillDelivered");
    expect(client).toContain('if (!activeCourse || skillDelivered) return;');
    expect(client).toContain('skillDelivered = true;\n    renderLessonList(activeCourse);');
  });
});
