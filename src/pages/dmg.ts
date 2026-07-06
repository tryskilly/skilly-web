// /dmg — 302-redirect to the latest Skilly DMG on GitHub Releases.
//
// Purpose: bypass the email-gated Hero download for high-trust contexts:
// - Show HN launch body
// - Journalist pitches
// - "Skip and download anyway" link below the Hero email form
//
// PostHog UTM tag: ?utm_source=dmg_direct picks up the bypass cohort.
import { DOWNLOAD_URL } from '../data/config.ts';

export const prerender = false;

export const GET = () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: DOWNLOAD_URL,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
