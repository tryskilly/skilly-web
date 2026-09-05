import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/tools/skill-builder.astro', import.meta.url), 'utf8');
const client = readFileSync(new URL('../src/scripts/skill-builder.ts', import.meta.url), 'utf8');
const emailApi = readFileSync(new URL('../src/pages/api/skill-builder-email.ts', import.meta.url), 'utf8');
const learnHub = readFileSync(new URL('../src/pages/learn/index.astro', import.meta.url), 'utf8');

describe('skill builder lead gate', () => {
  test('offers a useful preview while describing the email exchange accurately', () => {
    expect(page).toContain('No account or email required to see the outline and first lesson.');
    expect(page).toContain('Unlock the remaining lessons and keep the skill');
    expect(page).not.toContain('six-lesson');
    expect(learnHub).not.toContain('six-lesson');
    expect(page.indexOf('data-lesson-list')).toBeLessThan(page.indexOf('data-skill-email-form'));
    expect(page.indexOf('data-active-checkpoint')).toBeLessThan(page.indexOf('data-skill-sources'));
  });

  test('shows meaningful progress while the skill is generated', () => {
    expect(page).toContain('data-skill-build-progress');
    expect(client).toContain('Building the right-sized learning path');
    expect(client).toContain('generationProgress');
  });

  test('labels adaptive lesson counts grammatically', () => {
    expect(page).toContain('data-skill-lessons-label');
    expect(client).toContain("course.lessons.length === 1 ? 'lesson' : 'lessons'");
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

  test('offers every published browser extension without claiming it imports the custom skill', () => {
    expect(page).toContain('BROWSER_EXTENSIONS.map');
    expect(page).toContain('data-skill-extension-link');
    expect(page).toContain('Custom SKILL.md files still import into the Mac app');
    expect(emailApi).toContain('Chrome, Edge, or Firefox');
  });

  test('records provider acceptance before showing the activation handoff', () => {
    const successStart = client.indexOf('skillDelivered = true;');
    const successPath = client.slice(successStart, client.indexOf('} catch (error)', successStart));
    expect(successPath.indexOf("web_skill_builder_email_submitted")).toBeLessThan(successPath.indexOf('configureActivationHandoff();'));
    expect(successPath).toContain("web_skill_builder_email_accepted");
    expect(successPath).not.toContain("web_skill_builder_markdown_emailed");
  });
});
