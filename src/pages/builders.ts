// /builders — Builders is the homepage now; keep old links working.
//
// This replaces an astro.config `redirects` entry that was live but broken:
// with trailingSlash: 'always' the adapter puts a 308 slash-enforcer ahead of
// the 301, so /builders 308'd to /builders/ and nothing handled it — both paths
// returned 404 in production (verified 2026-07-16). An endpoint is reached at
// the slashed path, which is why /download has always worked.
export const prerender = false;

export const GET = () => Response.redirect('https://tryskilly.app/', 301);
