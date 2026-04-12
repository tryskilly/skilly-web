// src/data/config.ts
//
// Site-wide configuration. Edit these constants to change the live
// behavior of the landing page without touching component markup.
//
// When changing any of these values, run `bun run build` to verify
// and commit with a clear message so the flip is auditable in git.

/**
 * Flip to `true` when the 50-user beta cap is reached.
 *
 * Effect: every "Download Skilly" CTA on the landing page swaps to a
 * "Join waitlist" link pointing at TALLY_WAITLIST_URL. The trial /
 * subscribe language stays the same — only the button target and label
 * change.
 */
export const BETA_CAP_REACHED = false;

/**
 * Direct link to the macOS app download. The trial starts on first
 * launch inside the app; there is no subscription step on the website.
 */
export const DOWNLOAD_URL = 'https://downloads.tryskilly.app/Skilly.dmg';

// Skill request and beta-waitlist forms are built into the site
// (src/components/Skills.astro and src/components/Pricing.astro)
// and submit to our own Resend-backed API endpoints at
// /api/skill-request and /api/waitlist respectively.
// No external form service (Tally, Typeform, etc.) is used.

/**
 * Beta status label shown in the footer.
 * - BETA_ACTIVE: accepting new users (green dot)
 * - BETA_FULL: at 50/50, waitlist only (amber dot)
 * - BETA_CLOSED: program ended (gray dot)
 */
export type BetaStatus = 'BETA_ACTIVE' | 'BETA_FULL' | 'BETA_CLOSED';
export const BETA_STATUS: BetaStatus = 'BETA_ACTIVE';

/**
 * Resolved CTA shown on the primary "try Skilly" button(s).
 * Returns the download URL in normal operation, or the inline
 * beta-waitlist form anchor when the beta cap is reached.
 */
export function primaryCta(): { label: string; href: string; analyticsLocation: string } {
  if (BETA_CAP_REACHED) {
    return {
      label: 'Join waitlist',
      href: '#beta-waitlist',
      analyticsLocation: 'pricing_waitlist',
    };
  }
  return {
    label: 'Download Skilly',
    href: DOWNLOAD_URL,
    analyticsLocation: 'pricing_download',
  };
}
