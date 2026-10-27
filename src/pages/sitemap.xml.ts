// /sitemap.xml — conventional sitemap URL for crawlers and tools.
//
// @astrojs/sitemap only emits /sitemap-index.xml (+ /sitemap-0.xml), so
// /sitemap.xml 404'd. Endpoint rather than an astro.config `redirects` entry —
// see people.ts for why that config silently 404s under trailingSlash: 'always'.
// The file extension keeps this route slash-free (/sitemap.xml, not /sitemap.xml/).
export const prerender = false;

export const GET = () => Response.redirect('https://tryskilly.app/sitemap-index.xml', 301);
