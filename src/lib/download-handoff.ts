// Attribution-aware handoff for /download.
// The release asset is hosted on GitHub, so campaign context would otherwise
// be lost before the native app records its first trial event.
// download_served capture is unchanged; the page only changes what the visitor reads.
import { POSTHOG_HOST, POSTHOG_KEY, RELEASE_ASSET_URL } from '../data/config.ts';

const TRACKED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const POSTHOG_COOKIE_NAME = `ph_${POSTHOG_KEY}_posthog`;
const CRAWLER_USER_AGENT = /bot|crawl|spider|slurp|preview|headless/i;

export type DownloadHandoff = {
  downloadUrl: string;
  deepLink: string;
};

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
 * this page, so capturing here counts downloads that click tracking misses.
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

export async function prepareDownload(request: Request): Promise<DownloadHandoff> {
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

  return {
    downloadUrl: RELEASE_ASSET_URL,
    deepLink: `skilly://attribution?${handoff.toString()}`,
  };
}
