// /download — attribution-aware handoff to the latest macOS release.
// The release asset is hosted on GitHub, so campaign context would otherwise
// be lost before the native app records its first trial event.
import { RELEASE_ASSET_URL } from '../data/config.ts';

export const prerender = false;

const TRACKED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

function clean(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.trim().replace(/[\u0000-\u001f\u007f]/g, '');
  return normalized ? normalized.slice(0, 120) : null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

export const GET = ({ request }: { request: Request }): Response => {
  const requestUrl = new URL(request.url);
  const handoff = new URLSearchParams({ attribution_id: crypto.randomUUID() });

  for (const key of TRACKED_PARAMS) {
    const value = clean(requestUrl.searchParams.get(key));
    if (value) handoff.set(key, value);
  }

  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const hostname = clean(new URL(referrer).hostname);
      if (hostname) handoff.set('referrer_domain', hostname);
    } catch {
      // Ignore malformed referrers; campaign parameters remain valid.
    }
  }

  const deepLink = `skilly://attribution?${handoff.toString()}`;
  const downloadUrl = escapeHtml(RELEASE_ASSET_URL);
  const deepLinkUrl = escapeHtml(deepLink);

  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Download Skilly for Mac</title>
    <style>
      :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fafaf8; color: #26231f; }
      main { width: min(92vw, 560px); padding: 44px 32px; text-align: center; }
      h1 { margin: 0 0 12px; font-size: clamp(28px, 6vw, 46px); letter-spacing: -0.04em; }
      p { margin: 0 auto 26px; max-width: 440px; color: #6f675c; line-height: 1.55; }
      a { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 20px; border-radius: 12px; font-weight: 700; text-decoration: none; }
      .download { background: #ff6f3f; color: #fff; }
      .open { margin-top: 12px; color: #ff6f3f; border: 1px solid #f1c3b3; background: #fff; }
      small { display: block; margin-top: 22px; color: #8c8378; }
    </style>
  </head>
  <body>
    <main>
      <h1>Skilly is ready to teach.</h1>
      <p>Download the Mac app, then open Skilly from this page after installation so we can keep your campaign source attached to the trial.</p>
      <a class="download" href="${downloadUrl}" target="_blank" rel="noopener">Download for Mac</a>
      <a class="open" href="${deepLinkUrl}">I installed Skilly — open it</a>
      <small>15 minutes free · no card required</small>
    </main>
  </body>
</html>`, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
};
