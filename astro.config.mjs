// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tryskilly.app',
  output: 'static',
  adapter: netlify(),
  redirects: {
    // Builders is now the homepage; keep old /builders links working.
    '/builders': '/',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
