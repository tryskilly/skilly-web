import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const demoPage = readFileSync(join(root, 'src/pages/demo.astro'), 'utf8');

describe('public browser demo', () => {
  test('ships a no-install voice demo with concrete pointable tasks', () => {
    expect(demoPage).toContain('Try Skilly in your browser');
    expect(demoPage).toContain('<SkillyWebWidget />');
    expect(demoPage).toContain("id: 'connect-data'");
    expect(demoPage).toContain("id: 'create-workspace'");
    expect(demoPage).toContain("id: 'invite-teammate'");
    expect(demoPage).toContain('data-skilly={step.id}');
    expect(demoPage).toContain('data-demo-start');
  });

  test('tracks the conversion funnel without sending conversation content', () => {
    expect(demoPage).toContain("capture('web_browser_demo_viewed')");
    expect(demoPage).toContain("capture('web_browser_demo_session_started')");
    expect(demoPage).toContain("capture('web_browser_demo_point_completed'");
    expect(demoPage).toContain("capture('web_browser_demo_session_completed')");
    expect(demoPage).toContain("capture('web_browser_demo_session_error')");
    expect(demoPage).toContain("We don’t send conversation text to analytics.");
    expect(demoPage).toContain("setStartState('Continue in Skilly')");
    expect(demoPage).not.toContain('transcript:');
    expect(demoPage).not.toContain("window.Skilly.start(question);\n            setStartState('Stop voice demo')");
  });
});
