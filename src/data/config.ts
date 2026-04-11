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

/**
 * Tally form for users to request a new skill (app coverage).
 */
export const TALLY_SKILL_REQUEST_URL = 'https://tally.so/r/SKILLY_SKILLS';

/**
 * Tally form used as the waitlist when BETA_CAP_REACHED === true.
 */
export const TALLY_WAITLIST_URL = 'https://tally.so/r/SKILLY_WAITLIST';

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
 * Returns the download URL in normal operation, or the Tally waitlist
 * form when the beta cap is reached.
 */
export function primaryCta(): { label: string; href: string; analyticsLocation: string } {
  if (BETA_CAP_REACHED) {
    return {
      label: 'Join waitlist',
      href: TALLY_WAITLIST_URL,
      analyticsLocation: 'pricing_waitlist',
    };
  }
  return {
    label: 'Download Skilly',
    href: DOWNLOAD_URL,
    analyticsLocation: 'pricing_download',
  };
}
