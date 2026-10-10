// /people — the Mac app page is the homepage now; keep old links working.
//
// /people converted 17% of its visitors to a download while the homepage (then
// the Builders pitch) converted 0% of mostly Mac-intent organic traffic, so the
// Mac page moved to / and Builders moved to /builders/.
//
// Endpoint rather than an astro.config `redirects` entry: with
// trailingSlash: 'always' the Vercel adapter puts a 308 slash-enforcer ahead of
// config redirects, so they never match. See astro.config.mjs.
export const prerender = false;

export const GET = () => Response.redirect('https://tryskilly.app/', 301);
