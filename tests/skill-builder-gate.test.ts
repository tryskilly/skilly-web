import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/tools/skill-builder.astro', import.meta.url), 'utf8');
const client = readFileSync(new URL('../src/scripts/skill-builder.ts', import.meta.url), 'utf8');
const emailApi = readFileSync(new URL('../src/pages/api/skill-builder-email.ts', import.meta.url), 'utf8');

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

  test('hands delivered skills into an install and import journey', () => {
    expect(page).toContain('data-skill-install-cta');
    expect(page).toContain('data-skill-open-app');
    expect(page).toContain('skilly://skills');
    expect(client).toContain("web_skill_builder_activation_handoff_viewed");
    expect(client).toContain("web_skill_builder_app_download_clicked");
    expect(page).toContain("web_skill_builder_open_app_clicked");
    expect(emailApi).toContain('skilly://skills');
  });
});
