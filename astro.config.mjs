// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tryskilly.app',
  output: 'static',
  adapter: netlify(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
