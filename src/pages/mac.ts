// /mac — consolidate the Mac-app pages onto the homepage.
//
// /mac was the original homepage, orphaned by the Builders pivot. The Mac app
// page is the homepage again, so /mac keeps working for anything already
// pointing here.
//
// Endpoint rather than an astro.config `redirects` entry — see people.ts for
// why that config silently 404s under trailingSlash: 'always'.
export const prerender = false;

export const GET = () => Response.redirect('https://tryskilly.app/', 301);
