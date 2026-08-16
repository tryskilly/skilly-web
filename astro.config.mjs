// astro.config.mjs
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { loadLearnLastmodMap } from './scripts/seo-sitemap.mjs';

const learnLastmods = await loadLearnLastmodMap(
  fileURLToPath(new URL('./src/content/learn/', import.meta.url)),
);

export default defineConfig({
  site: 'https://tryskilly.app',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  // NOTE: do NOT use the `redirects` config with trailingSlash: 'always'.
  // The Vercel adapter emits a 308 slash-enforcer route AHEAD of these 301s, and
  // Astro normalises the key's trailing slash away, so '/builders' compiles to
  // ^/builders$ and can never match: /builders 308s to /builders/, which nothing
  // then handles -> 404. That shipped and was live (verified 2026-07-16:
  // /builders and /builders/ both 404'd).
  // Use a prerender=false endpoint instead (see src/pages/builders.ts, mac.ts,
  // download.ts) — the SSR function is reached at the slashed path and works.
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // Public Markdown files are copied as static assets, so Astro cannot
      // discover them from routes. List the product facts explicitly for AI
      // agents and crawlers that use the sitemap as their URL inventory.
      customPages: [
        'https://tryskilly.app/pricing.md',
        'https://tryskilly.app/products/skilly-builders.md',
        'https://tryskilly.app/products/skilly-people.md',
      ],
      // Runtime/share artifacts and post-checkout pages are intentionally
      // non-indexable. Keeping them out of the sitemap avoids sending Google
      // contradictory crawl/index signals.
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return pathname !== '/audit/' && pathname !== '/checkout-success/';
      },
      serialize: (item) => {
        const lastmod = learnLastmods.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
