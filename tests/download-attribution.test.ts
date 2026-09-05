import { describe, expect, test } from 'bun:test';
import { GET } from '../src/pages/download.ts';
import { GET as GET_DMG } from '../src/pages/dmg.ts';

describe('download attribution handoff', () => {
  test('carries campaign parameters and referrer domain into the app deep link', async () => {
    const request = new Request(
      'https://tryskilly.app/download?utm_source=tiktok&utm_medium=organic_social&utm_campaign=launch_2026-09&utm_content=live_cursor_pov',
      { headers: { referer: 'https://www.tiktok.com/@tryskilly/video/123' } },
    );

    const response = GET({ request });
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

    const body = await GET({ request }).text();

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
