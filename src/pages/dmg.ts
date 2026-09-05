// /dmg — 302-redirect to the latest Skilly DMG on GitHub Releases.
//
// Purpose: bypass the email-gated Hero download for high-trust contexts:
// - Show HN launch body
// - Journalist pitches
// - "Skip and download anyway" link below the Hero email form
//
// PostHog UTM tag: ?utm_source=dmg_direct picks up the bypass cohort.

export const prerender = false;

export const GET = ({ request }: { request: Request }) => {
  const destination = new URL('/download', request.url);
  const sourceUrl = new URL(request.url);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = sourceUrl.searchParams.get(key);
    if (value) destination.searchParams.set(key, value);
  }
  if (!destination.searchParams.has('utm_source')) destination.searchParams.set('utm_source', 'dmg_direct');
  if (!destination.searchParams.has('utm_medium')) destination.searchParams.set('utm_medium', 'referral');
  if (!destination.searchParams.has('utm_campaign')) destination.searchParams.set('utm_campaign', 'direct_download');

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
};
