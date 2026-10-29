import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { GET } from '../src/pages/download.ts';
import { GET as GET_DMG } from '../src/pages/dmg.ts';

type CapturedRequest = { url: string; body: Record<string, any> };
const originalFetch = globalThis.fetch;
let capturedRequests: CapturedRequest[] = [];

beforeEach(() => {
  capturedRequests = [];
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    capturedRequests.push({ url: String(url), body: JSON.parse(String(init?.body ?? '{}')) });
    return new Response('{}', { status: 200 });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('download_served server-side capture', () => {
  test('joins the web visitor via the PostHog cookie and records the sending page', async () => {
    const webVisitorCookie = encodeURIComponent(JSON.stringify({ distinct_id: 'web-visitor-123' }));
    const request = new Request('https://tryskilly.app/download?utm_source=newsletter', {
      headers: {
        referer: 'https://tryskilly.app/learn/how-to-add-bevel-modifier-blender/',
        cookie: `other=1; ph_phc_D46KQXyPXhmRabFDiL3KUZTWJcmjyqhpGJfpH7H48Sso_posthog=${webVisitorCookie}`,
        'user-agent': 'Mozilla/5.0 (Macintosh)',
      },
    });

    await GET({ request });

    expect(capturedRequests).toHaveLength(1);
    const capturedEvent = capturedRequests[0].body;
    expect(capturedRequests[0].url).toBe('https://us.i.posthog.com/i/v0/e/');
    expect(capturedEvent.event).toBe('download_served');
    expect(capturedEvent.distinct_id).toBe('web-visitor-123');
    expect(capturedEvent.properties.referrer_path).toBe('/learn/how-to-add-bevel-modifier-blender/');
    expect(capturedEvent.properties.utm_source).toBe('newsletter');
    expect(capturedEvent.properties.attribution_id).toBeTruthy();
    expect(capturedEvent.properties.has_web_session).toBe(true);
  });

  test('falls back to the attribution id when the visitor has no PostHog cookie', async () => {
    await GET({ request: new Request('https://tryskilly.app/download', { headers: { 'user-agent': 'Mozilla/5.0' } }) });

    const capturedEvent = capturedRequests[0].body;
    expect(capturedEvent.distinct_id).toBe(capturedEvent.properties.attribution_id);
    expect(capturedEvent.properties.has_web_session).toBe(false);
  });

  test('records the visitor, not the Vercel function, as the source', async () => {
    const request = new Request('https://localhost/download/?utm_source=x', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh)',
        'x-forwarded-for': '203.0.113.7, 10.0.0.1',
        'x-forwarded-host': 'tryskilly.app',
        'x-forwarded-proto': 'https',
      },
    });

    await GET({ request });

    const { properties } = capturedRequests[0].body;
    expect(properties.$current_url).toBe('https://tryskilly.app/download/?utm_source=x');
    expect(properties.$ip).toBe('203.0.113.7');
    expect(properties.$raw_user_agent).toBe('Mozilla/5.0 (Macintosh)');
  });

  test('skips crawlers and still serves the page when PostHog is down', async () => {
    await GET({ request: new Request('https://tryskilly.app/download', { headers: { 'user-agent': 'Googlebot/2.1' } }) });
    expect(capturedRequests).toHaveLength(0);

    globalThis.fetch = (async () => { throw new Error('PostHog unreachable'); }) as unknown as typeof fetch;
    const response = await GET({ request: new Request('https://tryskilly.app/download') });
    expect(response.status).toBe(200);
  });
});

describe('download attribution handoff', () => {
  test('carries campaign parameters and referrer domain into the app deep link', async () => {
    const request = new Request(
      'https://tryskilly.app/download?utm_source=tiktok&utm_medium=organic_social&utm_campaign=launch_2026-09&utm_content=live_cursor_pov',
      { headers: { referer: 'https://www.tiktok.com/@tryskilly/video/123' } },
    );

    const response = await GET({ request });
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain('skilly://attribution?');
    expect(body).toContain('utm_source=tiktok');
    expect(body).toContain('utm_medium=organic_social');
    expect(body).toContain('utm_campaign=launch_2026-09');
    expect(body).toContain('utm_content=live_cursor_pov');
    expect(body).toContain('referrer_domain=www.tiktok.com');
    expect(body).toContain('Download for Mac');
  });

  test('escapes untrusted campaign values before placing them in HTML', async () => {
    const request = new Request(
      'https://tryskilly.app/download?utm_source=%3Cscript%3Ealert(1)%3C%2Fscript%3E',
    );

    const body = await (await GET({ request })).text();

    expect(body).not.toContain('<script>alert(1)</script>');
    expect(body).toContain('utm_source=%3Cscript%3Ealert%281%29%3C%2Fscript%3E');
  });

  test('keeps the legacy dmg alias inside the attribution handoff', () => {
    const response = GET_DMG({ request: new Request('https://tryskilly.app/dmg') });
    const location = response.headers.get('location');

    expect(response.status).toBe(302);
    expect(location).toContain('/download?');
    expect(location).toContain('utm_source=dmg_direct');
    expect(location).toContain('utm_medium=referral');
  });
});
