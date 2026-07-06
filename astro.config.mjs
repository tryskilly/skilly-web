// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tryskilly.app',
  output: 'static',
  adapter: vercel(),
  redirects: {
    // Builders is now the homepage; keep old /builders links working.
    '/builders': '/',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
