import { describe, expect, test } from 'bun:test';
import { buildStudioPrefillUrl } from '../src/lib/ai-onboarding-audit';

describe('Studio signup handoff contract', () => {
  test('emits the fields consumed by the Studio signup bootstrap', () => {
    const url = buildStudioPrefillUrl(
      {
        skillPreview: '# Acme\n\nTeach the first project step.',
        shareUrl: 'https://tryskilly.app/audit/?url=acme.example.com',
      },
      {
        url: 'https://acme.example.com/start?utm=ignored',
        goal: 'Create the first project',
        productType: 'B2B SaaS',
        email: 'owner@example.com',
      },
    );

    const parsed = new URL(url);
    expect(`${parsed.origin}${parsed.pathname}`).toBe('https://studio.tryskilly.app/signup');
    expect(parsed.searchParams.get('audit_url')).toBe('https://acme.example.com/start?utm=ignored');
    expect(parsed.searchParams.get('activation_goal')).toBe('Create the first project');
    expect(parsed.searchParams.get('prefill_skill')).toBe('# Acme\n\nTeach the first project step.');
    expect(parsed.searchParams.get('audit_share')).toBe('https://tryskilly.app/audit/?url=acme.example.com');
    expect(parsed.searchParams.get('product_type')).toBe('B2B SaaS');
    expect(parsed.searchParams.get('email')).toBe('owner@example.com');
  });
});
