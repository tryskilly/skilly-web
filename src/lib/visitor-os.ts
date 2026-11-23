// src/lib/visitor-os.ts
// One place that decides which OS a visitor is on. The same function runs
// twice: serialized into a pre-paint inline script by VisitorOsScript.astro
// (sets <html data-visitor-os>, so CSS can swap Mac download CTAs for the
// non-Mac waitlist without a flicker), and imported by client scripts.
//
// Keep classifyVisitor and classifyBrowser self-contained: each is stringified
// with toString(), so neither may reference anything outside its own body.

export type VisitorOs = 'mac' | 'windows' | 'linux' | 'mobile' | 'other' | 'bot';
export type VisitorBrowser = 'chrome' | 'edge' | 'firefox' | 'other';

export function classifyVisitor(userAgent: string, maxTouchPoints: number): VisitorOs {
  var ua = userAgent || '';
  // Crawlers keep the default (download) markup.
  if (/bot|crawl|spider|slurp|lighthouse|headlesschrome|facebookexternalhit|embedly|preview/i.test(ua)) return 'bot';
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return 'mobile';
  // iPadOS 13+ reports a desktop Mac user agent; touch support gives it away.
  if (/Macintosh|Mac OS X/i.test(ua)) return maxTouchPoints > 1 ? 'mobile' : 'mac';
  if (/Windows/i.test(ua)) return 'windows';
  if (/CrOS/i.test(ua)) return 'other';
  if (/Linux|X11/i.test(ua)) return 'linux';
  return 'other';
}

/** Store listing to lead with. Edge before Chrome; both strings contain "chrome". */
export function classifyBrowser(userAgent: string): VisitorBrowser {
  var ua = (userAgent || '').toLowerCase();
  if (ua.indexOf('firefox') !== -1 || ua.indexOf('fxios') !== -1) return 'firefox';
  if (ua.indexOf('edg/') !== -1 || ua.indexOf('edgios') !== -1) return 'edge';
  if (ua.indexOf('chrome') !== -1 || ua.indexOf('crios') !== -1) return 'chrome';
  return 'other';
}

/** Read the value set before first paint; classify again if it is missing. */
export function readVisitorOs(): VisitorOs {
  const fromDom = document.documentElement.dataset.visitorOs as VisitorOs | undefined;
  return fromDom ?? classifyVisitor(navigator.userAgent, navigator.maxTouchPoints || 0);
}

/** Visitors who get the waitlist instead of the Mac download. */
export function isWaitlistOs(os: VisitorOs): os is 'windows' | 'linux' | 'mobile' {
  return os === 'windows' || os === 'linux' || os === 'mobile';
}

/**
 * /api/waitlist accepts windows | linux | ios | macos_beta | updates.
 * It has no android value, so every phone or tablet maps to 'ios',
 * the endpoint's only mobile list.
 */
export function waitlistPlatformFor(os: 'windows' | 'linux' | 'mobile'): 'windows' | 'linux' | 'ios' {
  return os === 'mobile' ? 'ios' : os;
}
