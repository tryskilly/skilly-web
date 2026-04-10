// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tryskilly.app',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
});
