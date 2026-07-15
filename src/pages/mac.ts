// /mac — consolidate the Mac-app pages onto /people.
//
// /mac was the original homepage, orphaned by the Builders pivot: nothing linked
// to it, but it stayed in the sitemap competing with /people for the same
// Mac-app queries. /people is the nav-linked page and matches the site's
// For Builders / For People IA, so it wins; /mac keeps working for anything
// already pointing here.
//
// Endpoint rather than an astro.config `redirects` entry — see builders.ts for
// why that config silently 404s under trailingSlash: 'always'.
export const prerender = false;

export const GET = () => Response.redirect('https://tryskilly.app/people/', 301);
