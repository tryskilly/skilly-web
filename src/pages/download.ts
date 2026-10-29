// /download — attribution-aware handoff to the latest macOS release.
// The release asset is hosted on GitHub, so campaign context would otherwise
// be lost before the native app records its first trial event.
import { POSTHOG_HOST, POSTHOG_KEY, RELEASE_ASSET_URL } from '../data/config.ts';

export const prerender = false;

const TRACKED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const POSTHOG_COOKIE_NAME = `ph_${POSTHOG_KEY}_posthog`;
const CRAWLER_USER_AGENT = /bot|crawl|spider|slurp|preview|headless/i;

/**
 * The browser snippet writes its distinct_id to a .tryskilly.app cookie, so
 * reading it here joins the server-side download to the visitor's pageviews.
 */
function readWebDistinctId(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  for (const cookie of cookieHeader.split(';')) {
    const separatorIndex = cookie.indexOf('=');
    if (separatorIndex === -1 || cookie.slice(0, separatorIndex).trim() !== POSTHOG_COOKIE_NAME) continue;
    try {
      const distinctId = JSON.parse(decodeURIComponent(cookie.slice(separatorIndex + 1).trim())).distinct_id;
      return typeof distinctId === 'string' && distinctId ? distinctId : null;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Behind Vercel the function sees request.url as https://localhost/..., so the
 * public host comes from the forwarding headers the edge sets.
 */
function publicUrl(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get('x-forwarded-host');
  if (forwardedHost) {
    url.host = forwardedHost.split(',')[0].trim();
    url.protocol = `${request.headers.get('x-forwarded-proto')?.split(',')[0].trim() || 'https'}:`;
  }
  return url.toString();
}

/**
 * Every download link on the site (hero, nav, Learn, /vs, /dmg) routes through
 * this endpoint, so capturing here counts downloads that click tracking misses.
 * Awaited with a short timeout because serverless functions can be frozen once
 * the response is returned; a PostHog outage must never block the download.
 */
async function captureDownloadServed(request: Request, handoff: URLSearchParams, referrerPath: string | null) {
  const userAgent = request.headers.get('user-agent') ?? '';
  if (CRAWLER_USER_AGENT.test(userAgent)) return;

  const attributionId = handoff.get('attribution_id');
  const webDistinctId = readWebDistinctId(request);
  const properties: Record<string, string | boolean> = {
    $current_url: publicUrl(request),
    // Without the visitor's IP and user agent PostHog geolocates and
    // bot-classifies Vercel's server, so every download read as Ashburn automation.
    $raw_user_agent: userAgent,
    // A cookie means the browser ran posthog-js on our pages; crawlers that fake
    // a browser user agent never have one.
    has_web_session: webDistinctId !== null,
  };
  const visitorIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim();
  if (visitorIp) properties.$ip = visitorIp;
  for (const [key, value] of handoff) properties[key] = value;
  if (referrerPath) properties.referrer_path = referrerPath;

  try {
    await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: 'download_served',
        distinct_id: webDistinctId ?? attributionId,
        properties,
      }),
      signal: AbortSignal.timeout(1500),
    });
  } catch {
    // Analytics is best-effort; the visitor still gets the download page.
  }
}

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

export const GET = async ({ request }: { request: Request }): Promise<Response> => {
  const requestUrl = new URL(request.url);
  const handoff = new URLSearchParams({ attribution_id: crypto.randomUUID() });

  for (const key of TRACKED_PARAMS) {
    const value = clean(requestUrl.searchParams.get(key));
    if (value) handoff.set(key, value);
  }

  // The referrer path says which page sent the visitor (e.g. a Learn article).
  // It stays in analytics only; the app deep link carries just the domain.
  let referrerPath: string | null = null;
  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);
      const hostname = clean(referrerUrl.hostname);
      if (hostname) handoff.set('referrer_domain', hostname);
      referrerPath = clean(referrerUrl.pathname);
    } catch {
      // Ignore malformed referrers; campaign parameters remain valid.
    }
  }

  await captureDownloadServed(request, handoff, referrerPath);

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
