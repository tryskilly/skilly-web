# Skilly Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `skilly-landing.jsx` (a complete React reference design with finalized copy) into a production Astro project that uses the Skilly design system, ships near-zero JavaScript, and is mobile-responsive.

**Architecture:** Astro static site, component-per-section (`src/components/*.astro`), section data extracted to `src/data/*.ts`, interactivity via small vanilla TypeScript scripts loaded only where needed (no React/Vue/Svelte islands), Tailwind for styling with design system tokens. Each section component is self-contained: it imports its data, renders markup, and includes its own `<script>` if interactive.

**Tech Stack:** Astro 4+, Tailwind CSS via `@astrojs/tailwind`, TypeScript, `@fontsource/dm-sans`, `@fontsource/jetbrains-mono`. No test framework (this is a static marketing site — verification is via `astro build` succeeding, dev server visual check, and Lighthouse).

**Spec:** `docs/superpowers/specs/2026-04-10-skilly-marketing-site-design.md`
**Reference design:** `skilly-landing.jsx` (do not modify — read-only source of copy and visual decisions)
**Design system:** `skilly-design-system-v1.0.md`

---

## File Structure

```
skilly-web/
├── astro.config.mjs                    Task 1
├── tailwind.config.mjs                 Task 2
├── tsconfig.json                       Task 1
├── package.json                        Task 1
├── public/
│   ├── skilly-mark.png                 Task 4
│   ├── skilly-mark-white.png           Task 4
│   ├── favicon.svg                     Task 4
│   └── og-image.png                    Task 4 (placeholder)
└── src/
    ├── styles/
    │   └── globals.css                 Task 3
    ├── layouts/
    │   └── Layout.astro                Task 5
    ├── data/
    │   ├── apps.ts                     Task 8
    │   ├── steps.ts                    Task 9
    │   ├── features.ts                 Task 10
    │   ├── tiers.ts                    Task 12
    │   └── skill-yaml.ts               Task 11
    ├── components/
    │   ├── Logo.astro                  Task 6
    │   ├── Wordmark.astro              Task 6
    │   ├── Nav.astro                   Task 7
    │   ├── Hero.astro                  Task 8
    │   ├── HowItWorks.astro            Task 9
    │   ├── Features.astro              Task 10
    │   ├── SkillFormat.astro           Task 11
    │   ├── Pricing.astro               Task 12
    │   ├── Waitlist.astro              Task 13
    │   ├── CTA.astro                   Task 14
    │   └── Footer.astro                Task 14
    ├── scripts/
    │   ├── nav-scroll.ts               Task 7
    │   ├── hero-rotate.ts              Task 8
    │   ├── reveal-on-scroll.ts         Task 9
    │   └── waitlist.ts                 Task 13
    └── pages/
        └── index.astro                 Task 15
```

---

## Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/pages/index.astro` (placeholder)

- [ ] **Step 1.1: Initialize the Astro project non-interactively**

The repo already contains files (the design system markdown, the JSX reference, the docs folder). We can't use `npm create astro` in a non-empty directory, so we set up the files manually.

Create `/Users/engmsaleh/Repos/skilly-web/package.json`:

```json
{
  "name": "skilly-web",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/tailwind": "^5.1.4",
    "@fontsource/dm-sans": "^5.1.0",
    "@fontsource/jetbrains-mono": "^5.1.1",
    "astro": "^5.0.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2"
  }
}
```

- [ ] **Step 1.2: Create `astro.config.mjs`**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tryskilly.app',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
});
```

- [ ] **Step 1.3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 1.4: Create `.gitignore`**

```
# build output
dist/
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store
```

- [ ] **Step 1.5: Create a placeholder `src/pages/index.astro`** so the build can run:

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Skilly</title>
  </head>
  <body>
    <h1>Skilly placeholder</h1>
  </body>
</html>
```

- [ ] **Step 1.6: Install dependencies**

Run: `cd /Users/engmsaleh/Repos/skilly-web && npm install`
Expected: `added N packages`, no errors. May print warnings — those are fine.

- [ ] **Step 1.7: Verify the dev build works**

Run: `cd /Users/engmsaleh/Repos/skilly-web && npm run build`
Expected: build succeeds, `dist/index.html` exists.

- [ ] **Step 1.8: Commit**

```bash
cd /Users/engmsaleh/Repos/skilly-web
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro
git commit -m "chore: scaffold Astro project with Tailwind and TypeScript"
```

---

## Task 2: Configure Tailwind with design system tokens

**Files:**
- Create: `tailwind.config.mjs`

- [ ] **Step 2.1: Create `tailwind.config.mjs` with the full design system palette**

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FEFCE8',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        gray: {
          50: '#FAFAF8',
          100: '#F5F5F0',
          200: '#E5E5E0',
          300: '#D4D4CF',
          400: '#A3A39E',
          500: '#737370',
          600: '#525250',
          700: '#3F3F3D',
          800: '#27272A',
          900: '#1C1C1E',
          950: '#0F0F10',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'site': '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'amber-glow': '0 0 60px rgba(245, 158, 11, 0.13), 0 0 120px rgba(245, 158, 11, 0.07)',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2.2: Verify the build still works**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 2.3: Commit**

```bash
git add tailwind.config.mjs
git commit -m "chore: configure Tailwind with Skilly design system tokens"
```

---

## Task 3: Add globals.css with fonts, base styles, and reveal animations

**Files:**
- Create: `src/styles/globals.css`

- [ ] **Step 3.1: Create `src/styles/globals.css`**

```css
/* src/styles/globals.css */

/* Self-hosted fonts */
@import '@fontsource/dm-sans/400.css';
@import '@fontsource/dm-sans/500.css';
@import '@fontsource/dm-sans/600.css';
@import '@fontsource/dm-sans/700.css';
@import '@fontsource/jetbrains-mono/400.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    @apply bg-gray-950 text-gray-200 font-sans;
    margin: 0;
  }
}

@layer utilities {
  /* Fade-up reveal-on-scroll: starts hidden, animates in when .is-visible is added */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.08s; }
  .reveal-delay-2 { transition-delay: 0.16s; }
  .reveal-delay-3 { transition-delay: 0.24s; }
  .reveal-delay-4 { transition-delay: 0.32s; }
  .reveal-delay-5 { transition-delay: 0.40s; }

  /* Subtle film grain overlay */
  .grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.015;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Nav scroll state */
  .nav-blur {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  header.scrolled {
    background-color: rgba(15, 15, 16, 0.93);
    border-bottom-color: #27272A;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .animate-float, .animate-pulse-soft, .animate-fade-in, .animate-fade-up {
    animation: none !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 3.2: Verify build still works**

Run: `npm run build`
Expected: build succeeds with no warnings about missing fonts.

- [ ] **Step 3.3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add global styles, self-hosted fonts, and reveal animations"
```

---

## Task 4: Copy logo assets to public/

**Files:**
- Create: `public/skilly-mark.png`, `public/skilly-mark-white.png`, `public/favicon.svg`, `public/og-image.png` (placeholder)

- [ ] **Step 4.1: Copy the two logo PNGs**

```bash
cd /Users/engmsaleh/Repos/skilly-web
mkdir -p public
cp /Users/engmsaleh/Downloads/skilly-logo-mark-512.png public/skilly-mark.png
cp /Users/engmsaleh/Downloads/skilly-logo-white-512.png public/skilly-mark-white.png
```

- [ ] **Step 4.2: Create a simple SVG favicon** that matches the cursor mark shape. Create `public/favicon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <path d="M20 8C18 7 16 9 16 11L16 60C16 62 18 64 20 63L34 52C35 51 37 51 38 52L50 66C51 67 53 68 55 67L61 61C63 59 62 57 61 56L49 44C48 43 48 41 49 40L58 38C60 37 61 35 59 34L20 8Z" fill="#F59E0B"/>
</svg>
```

- [ ] **Step 4.3: Create an OG image placeholder** by copying the amber mark:

```bash
cp public/skilly-mark.png public/og-image.png
```

(Real 1200x630 OG image is deferred per spec §12.)

- [ ] **Step 4.4: Verify the files exist**

Run: `ls public/`
Expected output includes: `favicon.svg  og-image.png  skilly-mark.png  skilly-mark-white.png`

- [ ] **Step 4.5: Commit**

```bash
git add public/
git commit -m "chore: add logo assets and favicon to public/"
```

---

## Task 5: Create the base Layout with meta tags and OG

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 5.1: Create `src/layouts/Layout.astro`**

```astro
---
// src/layouts/Layout.astro
import '../styles/globals.css';

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const {
  title = 'Skilly — Your AI companion for learning creative software',
  description = 'Skilly sees your screen, hears your question, and points at exactly what you need. Like having an expert sitting next to you. For Blender, Figma, After Effects, and more.',
  ogImage = '/og-image.png',
} = Astro.props;

const siteUrl = 'https://tryskilly.app';
const canonical = new URL(Astro.url.pathname, siteUrl).toString();
const ogImageUrl = new URL(ogImage, siteUrl).toString();
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" href="/skilly-mark.png" />
    <link rel="apple-touch-icon" href="/skilly-mark.png" />

    <meta name="theme-color" content="#0F0F10" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:site_name" content="Skilly" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonical} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImageUrl} />
  </head>
  <body class="bg-gray-950 text-gray-200 font-sans antialiased overflow-x-hidden">
    <div class="grain" aria-hidden="true"></div>
    <slot />
  </body>
</html>
```

- [ ] **Step 5.2: Update the placeholder `src/pages/index.astro` to use the layout**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <main class="min-h-screen flex items-center justify-center">
    <h1 class="text-4xl font-bold text-amber-500">Skilly placeholder</h1>
  </main>
</Layout>
```

- [ ] **Step 5.3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5.4: Visual check** — start dev server and confirm the placeholder renders with dark background and amber heading.

Run: `npm run dev` (in background or another terminal), open `http://localhost:4321`, then stop the server.

- [ ] **Step 5.5: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add base Layout with meta tags, OG, and favicon"
```

---

## Task 6: Logo and Wordmark components

**Files:**
- Create: `src/components/Logo.astro`, `src/components/Wordmark.astro`

- [ ] **Step 6.1: Create `src/components/Logo.astro`**

```astro
---
// src/components/Logo.astro
interface Props {
  size?: number;
  variant?: 'amber' | 'white';
  alt?: string;
  class?: string;
}

const {
  size = 32,
  variant = 'amber',
  alt = 'Skilly',
  class: className = '',
} = Astro.props;

const src = variant === 'amber' ? '/skilly-mark.png' : '/skilly-mark-white.png';
---
<img
  src={src}
  width={size}
  height={size}
  alt={alt}
  class={className}
  loading="eager"
  decoding="async"
/>
```

- [ ] **Step 6.2: Create `src/components/Wordmark.astro`** — renders "skilly" in DM Sans Bold with the optional amber cursor dot replacing the dot of the "i".

```astro
---
// src/components/Wordmark.astro
interface Props {
  size?: 'sm' | 'md' | 'lg';
  withDot?: boolean;
  class?: string;
}

const { size = 'md', withDot = false, class: className = '' } = Astro.props;

const sizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
};
---
<span class={`font-sans font-bold tracking-tight text-gray-50 ${sizeClasses[size]} ${className}`}>
  skill{withDot ? <span class="text-amber-500">y</span> : 'y'}
</span>
```

(Note: per the design system §5.3 the dot of the "i" can become a cursor mark. For simplicity in v1 we tint the trailing "y" amber when `withDot` is true. This is a small flourish — the wordmark works without it.)

- [ ] **Step 6.3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6.4: Commit**

```bash
git add src/components/Logo.astro src/components/Wordmark.astro
git commit -m "feat: add Logo and Wordmark components"
```

---

## Task 7: Nav component with scroll behavior

**Files:**
- Create: `src/components/Nav.astro`, `src/scripts/nav-scroll.ts`

- [ ] **Step 7.1: Create `src/scripts/nav-scroll.ts`**

```ts
// src/scripts/nav-scroll.ts
const header = document.querySelector('header[data-nav]');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
```

- [ ] **Step 7.2: Create `src/components/Nav.astro`**

```astro
---
// src/components/Nav.astro
import Logo from './Logo.astro';
import Wordmark from './Wordmark.astro';
---
<header
  data-nav
  class="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-transparent transition-all duration-300"
>
  <div class="max-w-site mx-auto px-6 h-16 flex items-center justify-between">
    <a href="#top" class="flex items-center gap-2.5">
      <Logo size={26} variant="amber" alt="Skilly" />
      <Wordmark size="md" />
    </a>

    <nav class="hidden md:flex items-center gap-8">
      <a href="#how" class="text-gray-400 hover:text-gray-200 text-[15px] font-medium transition-colors">How it works</a>
      <a href="#features" class="text-gray-400 hover:text-gray-200 text-[15px] font-medium transition-colors">Features</a>
      <a href="#pricing" class="text-gray-400 hover:text-gray-200 text-[15px] font-medium transition-colors">Pricing</a>
      <a href="#waitlist" class="text-gray-400 hover:text-gray-200 text-[15px] font-medium transition-colors">Waitlist</a>
      <a
        href="#download"
        class="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-gray-950 rounded-md px-5 py-2 text-sm font-semibold transition-all"
      >
        Download
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 12L12 4M12 4H5M12 4V11"/>
        </svg>
      </a>
    </nav>

    <a
      href="#download"
      class="md:hidden inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-gray-950 rounded-md px-4 py-2 text-sm font-semibold"
    >
      Download
    </a>
  </div>
</header>

<script>
  import '../scripts/nav-scroll.ts';
</script>
```

- [ ] **Step 7.3: Wire it into the index page** to verify it renders. Replace `src/pages/index.astro`:

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
---
<Layout>
  <Nav />
  <main class="min-h-screen pt-32">
    <p class="text-center text-gray-400">Scroll to test nav background fade.</p>
    <div style="height: 200vh"></div>
  </main>
</Layout>
```

- [ ] **Step 7.4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7.5: Visual check**

Run: `npm run dev`, open `http://localhost:4321`, scroll the page, and confirm:
- Nav starts transparent
- Nav background fades to dark gray-950 with a thin border once scrolled past 40px
- Logo + wordmark appear on the left, links + Download CTA on the right
- On mobile (resize browser to <768px) the nav links hide and only Download shows

Stop dev server.

- [ ] **Step 7.6: Commit**

```bash
git add src/components/Nav.astro src/scripts/nav-scroll.ts src/pages/index.astro
git commit -m "feat: add Nav with scroll-aware background"
```

---

## Task 8: Hero section with rotating app name

**Files:**
- Create: `src/data/apps.ts`, `src/components/Hero.astro`, `src/scripts/hero-rotate.ts`

- [ ] **Step 8.1: Create `src/data/apps.ts`**

```ts
// src/data/apps.ts
export const apps = [
  'Blender',
  'Figma',
  'After Effects',
  'DaVinci Resolve',
  'Premiere Pro',
] as const;
```

- [ ] **Step 8.2: Create `src/scripts/hero-rotate.ts`**

```ts
// src/scripts/hero-rotate.ts
import { apps } from '../data/apps.ts';

const target = document.querySelector<HTMLElement>('[data-hero-app]');
if (target) {
  let i = 0;
  const update = () => {
    target.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % apps.length;
      target.textContent = apps[i] ?? '';
      target.style.opacity = '1';
    }, 200);
  };
  setInterval(update, 2400);
}
```

- [ ] **Step 8.3: Create `src/components/Hero.astro`**

```astro
---
// src/components/Hero.astro
import Logo from './Logo.astro';
import { apps } from '../data/apps.ts';
const firstApp = apps[0];
---
<section
  id="top"
  class="relative min-h-screen flex items-center overflow-hidden"
>
  <!-- Ambient amber glow -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
    style="background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%);"
  ></div>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute top-0 right-0 w-2/5 h-full"
    style="background: linear-gradient(180deg, rgba(245,158,11,0.03) 0%, transparent 60%);"
  ></div>

  <div class="max-w-site mx-auto px-6 pt-32 lg:pt-40 pb-20 w-full">
    <div class="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
      <!-- LEFT: copy -->
      <div class="max-w-[720px]">
        <div class="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full pl-2.5 pr-4 py-1.5 mb-8">
          <span class="block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft"></span>
          <span class="text-[13px] font-medium text-amber-300">Now in beta — Blender skill available</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-gray-50 mb-6">
          Your AI companion<br />
          for learning{' '}
          <span class="relative inline-block">
            <span
              data-hero-app
              class="text-amber-500 inline-block transition-opacity duration-200"
            >{firstApp}</span>
            <span
              aria-hidden="true"
              class="absolute -bottom-1 left-0 right-0 h-[3px] rounded-sm opacity-60"
              style="background: linear-gradient(90deg, #F59E0B, #FCD34D);"
            ></span>
          </span>
        </h1>

        <p class="text-lg lg:text-xl leading-relaxed text-gray-400 mb-10 max-w-[540px]">
          Skilly sees your screen, hears your question, and points at exactly what you need. Like having an expert sitting next to you.
        </p>

        <div class="flex flex-wrap gap-3 items-center">
          <a
            href="#download"
            class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-gray-950 rounded-lg px-8 py-3.5 text-[17px] font-semibold transition-all"
          >
            Download for Mac — Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 12L12 4M12 4H5M12 4V11"/>
            </svg>
          </a>
          <span class="text-[13px] text-gray-500">macOS 14+ · Apple Silicon</span>
        </div>
        <a
          href="#waitlist"
          class="text-sm text-gray-500 hover:text-gray-300 mt-3 inline-block border-b border-dashed border-gray-700"
        >
          Not on Mac? Join the waitlist for Windows, Linux & iOS →
        </a>
      </div>

      <!-- RIGHT: floating cursor mockup -->
      <div class="hidden lg:flex flex-col items-center">
        <div class="relative w-[320px] h-[320px]">
          <div class="absolute top-10 left-5 w-[280px] h-[200px] bg-gray-900 rounded-xl border border-gray-800 p-4">
            <div class="flex gap-1.5 mb-3">
              <span class="block w-2 h-2 rounded-full bg-red-500"></span>
              <span class="block w-2 h-2 rounded-full bg-amber-500"></span>
              <span class="block w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <div class="flex flex-col gap-1">
              <div class="h-1.5 rounded-sm bg-gray-800" style="width: 80%"></div>
              <div class="h-1.5 rounded-sm bg-gray-800" style="width: 60%"></div>
              <div class="h-1.5 rounded-sm bg-gray-800" style="width: 100%"></div>
              <div class="h-1.5 rounded-sm bg-gray-800" style="width: 45%"></div>
              <div class="h-1.5 rounded-sm bg-gray-800" style="width: 75%"></div>
            </div>
            <div class="mt-4 flex gap-1.5">
              <div class="h-5 w-10 rounded bg-gray-800"></div>
              <div class="h-5 w-14 rounded bg-gray-800"></div>
              <div class="h-5 w-9 rounded bg-gray-800"></div>
            </div>
          </div>
          <div class="absolute bottom-16 right-5 animate-float">
            <Logo size={56} variant="amber" alt="Skilly cursor" />
            <div class="absolute -top-2 -right-20 bg-gray-900 border border-amber-500/25 rounded-lg px-3 py-1.5 whitespace-nowrap text-xs font-medium text-amber-300">
              UV Unwrap
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  import '../scripts/hero-rotate.ts';
</script>
```

- [ ] **Step 8.4: Wire Hero into the page**

Replace `src/pages/index.astro`:

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 8.5: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 8.6: Visual check**

Run `npm run dev`, open `http://localhost:4321`. Confirm:
- Hero copy renders with the "Now in beta" badge, headline, subhead, primary CTA, OS line, and waitlist link
- The amber app name in the headline rotates every ~2.4 seconds through the 5 apps
- The floating cursor mockup is visible on desktop (≥1024px), hidden on mobile/tablet
- The "UV Unwrap" pill renders next to the cursor

Stop dev server.

- [ ] **Step 8.7: Commit**

```bash
git add src/components/Hero.astro src/scripts/hero-rotate.ts src/data/apps.ts src/pages/index.astro
git commit -m "feat: add Hero with rotating app name and floating cursor mockup"
```

---

## Task 9: How It Works section with reveal-on-scroll

**Files:**
- Create: `src/data/steps.ts`, `src/components/HowItWorks.astro`, `src/scripts/reveal-on-scroll.ts`

- [ ] **Step 9.1: Create `src/scripts/reveal-on-scroll.ts`** (used by all reveal-animated sections)

```ts
// src/scripts/reveal-on-scroll.ts
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (els.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  for (const el of els) observer.observe(el);
}
```

- [ ] **Step 9.2: Create `src/data/steps.ts`**

```ts
// src/data/steps.ts
export interface Step {
  num: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'Open any creative app',
    desc: 'Launch Blender, Figma, or any desktop software. Skilly watches your screen.',
  },
  {
    num: '02',
    title: 'Hold Control+Option and ask',
    desc: '"How do I UV unwrap this face?" — speak naturally, Skilly hears you.',
  },
  {
    num: '03',
    title: 'Watch the cursor fly',
    desc: 'Skilly points at the exact button, explains what it does, and walks you through it.',
  },
];
```

- [ ] **Step 9.3: Create `src/components/HowItWorks.astro`**

```astro
---
// src/components/HowItWorks.astro
import { steps } from '../data/steps.ts';
---
<section id="how" class="relative py-24 lg:py-32 px-6">
  <div
    aria-hidden="true"
    class="absolute left-0 right-0 top-0 h-px"
    style="background: linear-gradient(90deg, transparent, #27272A, transparent);"
  ></div>

  <div class="max-w-site mx-auto">
    <div class="text-center mb-16 lg:mb-20">
      <span class="text-[13px] font-semibold text-amber-500 tracking-[1.5px] uppercase">How it works</span>
      <h2 data-reveal class="reveal text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mt-3 text-gray-50">
        Three steps. Zero setup.
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
      {steps.map((step, i) => (
        <div data-reveal class={`reveal reveal-delay-${i + 1}`}>
          <div class="font-mono font-bold text-5xl text-amber-500/20 mb-4">{step.num}</div>
          <h3 class="text-xl lg:text-[22px] font-semibold mb-2.5 text-gray-50">{step.title}</h3>
          <p class="text-base leading-relaxed text-gray-400">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  import '../scripts/reveal-on-scroll.ts';
</script>
```

- [ ] **Step 9.4: Wire HowItWorks into the page**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
  </main>
</Layout>
```

- [ ] **Step 9.5: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 9.6: Visual check**

Run `npm run dev`, scroll past the hero into How It Works. Confirm:
- The 3 numbered cards fade up with a stagger when they enter the viewport
- The big amber numbers (01, 02, 03) render at low opacity
- The titles and descriptions match the data

Stop dev server.

- [ ] **Step 9.7: Commit**

```bash
git add src/components/HowItWorks.astro src/data/steps.ts src/scripts/reveal-on-scroll.ts src/pages/index.astro
git commit -m "feat: add How It Works section with staggered reveal-on-scroll"
```

---

## Task 10: Features section (6 cards with icons)

**Files:**
- Create: `src/data/features.ts`, `src/components/Features.astro`

- [ ] **Step 10.1: Create `src/data/features.ts`**

```ts
// src/data/features.ts
export interface Feature {
  icon: 'cursor' | 'voice' | 'brain' | 'path' | 'plug' | 'key';
  title: string;
  desc: string;
}

export const features: Feature[] = [
  { icon: 'cursor', title: 'Points at your screen',
    desc: 'An amber cursor flies to the exact UI element you need. No more hunting through menus.' },
  { icon: 'voice', title: 'Talks you through it',
    desc: 'Natural voice explanations, not walls of text. Like having an expert sitting next to you.' },
  { icon: 'brain', title: 'Sees what you see',
    desc: "Screenshots your app in real-time. It knows if you're in Edit Mode or Object Mode." },
  { icon: 'path', title: 'Learns your pace',
    desc: "A curriculum engine tracks what you've mastered and what's next. No quizzes, no gates." },
  { icon: 'plug', title: 'One skill, one file',
    desc: 'Skills are simple Markdown files. Anyone can write one. A marketplace is coming.' },
  { icon: 'key', title: 'One API key',
    desc: 'Bring your own OpenAI key. No account creation, no subscription lock-in required.' },
];
```

- [ ] **Step 10.2: Create `src/components/Features.astro`**

```astro
---
// src/components/Features.astro
import { features } from '../data/features.ts';
---
<section id="features" class="py-24 lg:py-32 px-6">
  <div class="max-w-site mx-auto">
    <div class="text-center mb-16 lg:mb-20">
      <span class="text-[13px] font-semibold text-amber-500 tracking-[1.5px] uppercase">Features</span>
      <h2 data-reveal class="reveal text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mt-3 text-gray-50">
        Not a chatbot. A companion.
      </h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div
          data-reveal
          class={`reveal reveal-delay-${(i % 3) + 1} bg-gray-900 rounded-2xl p-8 border border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/25`}
        >
          <div class="w-11 h-11 rounded-[10px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-500">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              {f.icon === 'cursor' && (
                <path d="M5 3L5 19L9 15L14 21L17 19L12 13L17 12L5 3Z" />
              )}
              {f.icon === 'voice' && (
                <>
                  <path d="M12 3v10M8 8a4 4 0 008 0" />
                  <path d="M6 13a6 6 0 0012 0M12 17v4M9 21h6" />
                </>
              )}
              {f.icon === 'brain' && (
                <>
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v18M3 12h18" stroke-opacity="0.4" stroke-width="0.8" />
                </>
              )}
              {f.icon === 'path' && (
                <>
                  <path d="M4 19L8 15L12 17L16 11L20 5" />
                  <circle cx="8" cy="15" r="2" fill="currentColor" fill-opacity="0.3" stroke="none" />
                  <circle cx="16" cy="11" r="2" fill="currentColor" fill-opacity="0.3" stroke="none" />
                </>
              )}
              {f.icon === 'plug' && (
                <>
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <path d="M9 7h6M9 10h4" />
                </>
              )}
              {f.icon === 'key' && (
                <>
                  <circle cx="8" cy="8" r="5" />
                  <path d="M12 11l6 6M15 14l3 3" />
                </>
              )}
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-gray-50">{f.title}</h3>
          <p class="text-[15px] leading-relaxed text-gray-400">{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 10.3: Wire Features into the page**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Features from '../components/Features.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
  </main>
</Layout>
```

- [ ] **Step 10.4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 10.5: Visual check**

Run `npm run dev`, scroll into Features. Confirm 6 cards in 3 columns (desktop) / 2 columns (tablet) / 1 column (mobile), each with an amber icon, title, description, and hover lift.

Stop dev server.

- [ ] **Step 10.6: Commit**

```bash
git add src/components/Features.astro src/data/features.ts src/pages/index.astro
git commit -m "feat: add Features section with 6 cards and inline SVG icons"
```

---

## Task 11: Skill Format section (with SKILL.md preview)

**Files:**
- Create: `src/data/skill-yaml.ts`, `src/components/SkillFormat.astro`

- [ ] **Step 11.1: Create `src/data/skill-yaml.ts`**

```ts
// src/data/skill-yaml.ts
export const skillYaml = `---
name: Blender Fundamentals
app: Blender
version: "0.1"
recommended_model: gpt-realtime
pointing_mode: always
---

## Teaching Instructions

You are a patient Blender tutor. The user 
is a complete beginner. When they ask about 
any tool or feature:

1. Point at the relevant UI element
2. Explain what it does in plain language
3. Give them one thing to try right now

## Curriculum

### Stage 1: Getting Around
goals:
  - Orbit, pan, zoom the 3D viewport
  - Identify the major UI regions
  - Select an object with left-click
completion_signals:
  - orbit, pan, zoom, navigate, middle mouse

### Stage 2: Selecting & Transforming
goals:
  - Move (G), Rotate (R), Scale (S)
  - Use axis constraints (X, Y, Z)
  - Undo with Ctrl+Z`;

/**
 * Returns lines tagged with a syntax-highlight color class.
 * Computed once at build time — no runtime JS needed.
 */
export function highlightSkillYaml(): { line: string; color: string }[] {
  return skillYaml.split('\n').map((line) => {
    let color = 'text-gray-300';
    if (line.startsWith('---')) color = 'text-gray-500';
    else if (line.startsWith('###')) color = 'text-amber-300';
    else if (line.startsWith('##')) color = 'text-amber-400';
    else if (/^\w+:/.test(line)) color = 'text-amber-500';
    else if (line.startsWith('  -')) color = 'text-gray-400';
    return { line: line || '\u00A0', color };
  });
}
```

- [ ] **Step 11.2: Create `src/components/SkillFormat.astro`**

```astro
---
// src/components/SkillFormat.astro
import { highlightSkillYaml } from '../data/skill-yaml.ts';
const lines = highlightSkillYaml();
---
<section class="relative py-24 lg:py-32 px-6">
  <div
    aria-hidden="true"
    class="absolute left-0 right-0 top-0 h-px"
    style="background: linear-gradient(90deg, transparent, #27272A, transparent);"
  ></div>

  <div class="max-w-site mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div data-reveal class="reveal">
      <span class="text-[13px] font-semibold text-amber-500 tracking-[1.5px] uppercase">Skill format</span>
      <h2 class="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight mt-3 mb-5 text-gray-50">
        One Markdown file. <span class="text-amber-500">That's a skill.</span>
      </h2>
      <p class="text-[17px] leading-relaxed text-gray-400 mb-6">
        Skills are simple SKILL.md files with YAML frontmatter. Define the app, the teaching style, curriculum stages, and UI vocabulary. Skilly does the rest.
      </p>
      <p class="text-[17px] leading-relaxed text-gray-400 mb-8">
        Anyone can write a skill — no code, no SDK, no API integration. Just Markdown that any AI model consumes natively.
      </p>
      <div class="flex gap-4 items-center">
        <span class="text-sm text-gray-500">Skill marketplace coming soon</span>
        <div class="h-px flex-1 bg-gray-800"></div>
      </div>
    </div>

    <div data-reveal class="reveal reveal-delay-2 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-amber-glow">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
        <span class="block w-2 h-2 rounded-full bg-red-500"></span>
        <span class="block w-2 h-2 rounded-full bg-amber-500"></span>
        <span class="block w-2 h-2 rounded-full bg-green-500"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">blender-fundamentals-SKILL.md</span>
      </div>
      <pre class="p-5 text-[13px] leading-[1.7] font-mono overflow-auto max-h-[460px]">
        {lines.map(({ line, color }) => (
          <div class={color}>{line}</div>
        ))}
      </pre>
    </div>
  </div>
</section>
```

- [ ] **Step 11.3: Wire SkillFormat into the page**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Features from '../components/Features.astro';
import SkillFormat from '../components/SkillFormat.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
    <SkillFormat />
  </main>
</Layout>
```

- [ ] **Step 11.4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 11.5: Visual check**

Run `npm run dev`, scroll to the Skill Format section. Confirm:
- Two-column layout on desktop, stacked on mobile
- Code window with macOS traffic-light dots and the filename
- YAML lines render with the color highlighting (amber for `##`, `###`, `key:`, gray-500 for `---`)
- Amber glow shadow visible around the code block

Stop dev server.

- [ ] **Step 11.6: Commit**

```bash
git add src/components/SkillFormat.astro src/data/skill-yaml.ts src/pages/index.astro
git commit -m "feat: add Skill Format section with build-time syntax-highlighted SKILL.md preview"
```

---

## Task 12: Pricing section

**Files:**
- Create: `src/data/tiers.ts`, `src/components/Pricing.astro`

- [ ] **Step 12.1: Create `src/data/tiers.ts`**

```ts
// src/data/tiers.ts
export interface Tier {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Prove the magic',
    features: [
      '10 interactions/day',
      'Blender Fundamentals skill',
      'Push-to-talk voice',
      'Cursor pointing',
    ],
    cta: 'Download for Mac',
    highlight: false,
  },
  {
    name: 'Learner',
    price: '$19',
    period: '/mo',
    desc: 'Learn at your pace',
    features: [
      '300 interactions/mo',
      'All available skills',
      'Voice + vision',
      'Curriculum tracking',
      'Priority voice quality',
    ],
    cta: 'Start learning',
    highlight: true,
  },
  {
    name: 'BYOK',
    price: '$9',
    period: '/mo',
    desc: 'Bring your own key',
    features: [
      'Unlimited interactions',
      'All available skills',
      'Use your OpenAI API key',
      'Full curriculum engine',
      'Zero usage caps',
    ],
    cta: 'Connect your key',
    highlight: false,
  },
];
```

- [ ] **Step 12.2: Create `src/components/Pricing.astro`**

```astro
---
// src/components/Pricing.astro
import { tiers } from '../data/tiers.ts';
---
<section id="pricing" class="relative py-24 lg:py-32 px-6">
  <div
    aria-hidden="true"
    class="absolute left-0 right-0 top-0 h-px"
    style="background: linear-gradient(90deg, transparent, #27272A, transparent);"
  ></div>

  <div class="max-w-[1000px] mx-auto">
    <div class="text-center mb-16 lg:mb-20">
      <span class="text-[13px] font-semibold text-amber-500 tracking-[1.5px] uppercase">Pricing</span>
      <h2 data-reveal class="reveal text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mt-3 text-gray-50">
        Start free. Scale when ready.
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-5">
      {tiers.map((tier, i) => (
        <div
          data-reveal
          class={`reveal reveal-delay-${i + 1} relative bg-gray-900 rounded-[20px] p-9 transition-all duration-300 hover:-translate-y-1 ${
            tier.highlight
              ? 'border-2 border-amber-500'
              : 'border border-gray-800 hover:border-amber-500/25'
          }`}
        >
          {tier.highlight && (
            <div class="absolute top-4 right-4 bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
              Recommended
            </div>
          )}
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-50 mb-1">{tier.name}</h3>
            <p class="text-sm text-gray-500">{tier.desc}</p>
          </div>
          <div class="mb-7">
            <span class="text-5xl font-bold text-gray-50">{tier.price}</span>
            <span class="text-base text-gray-500">{tier.period}</span>
          </div>
          <a
            href="#download"
            class={`block w-full text-center px-6 py-3 rounded-lg text-[15px] font-semibold mb-7 transition-all ${
              tier.highlight
                ? 'bg-amber-500 hover:bg-amber-600 text-gray-950'
                : 'bg-transparent border border-gray-700 hover:bg-white/5 text-gray-300'
            }`}
          >
            {tier.cta}
          </a>
          <div class="flex flex-col gap-3">
            {tier.features.map((f) => (
              <div class="flex items-center gap-2.5 text-sm text-gray-400">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="9" fill="#F59E0B" fill-opacity="0.15" />
                  <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {f}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 12.3: Wire Pricing into the page**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Features from '../components/Features.astro';
import SkillFormat from '../components/SkillFormat.astro';
import Pricing from '../components/Pricing.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
    <SkillFormat />
    <Pricing />
  </main>
</Layout>
```

- [ ] **Step 12.4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 12.5: Visual check**

Run `npm run dev`, scroll to Pricing. Confirm:
- 3 cards: Free / Learner / BYOK
- Learner card has the amber border and "Recommended" pill
- Each card lists features with amber check icons
- Hover lifts each card slightly

Stop dev server.

- [ ] **Step 12.6: Commit**

```bash
git add src/components/Pricing.astro src/data/tiers.ts src/pages/index.astro
git commit -m "feat: add Pricing section with 3 tiers"
```

---

## Task 13: Waitlist section with form handling

**Files:**
- Create: `src/components/Waitlist.astro`, `src/scripts/waitlist.ts`

- [ ] **Step 13.1: Create `src/scripts/waitlist.ts`**

```ts
// src/scripts/waitlist.ts
const form = document.querySelector<HTMLFormElement>('[data-waitlist-form]');
if (form) {
  const platformBtns = form.querySelectorAll<HTMLButtonElement>('[data-platform]');
  const platformInput = form.querySelector<HTMLInputElement>('input[name="platform"]');
  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const successEl = document.querySelector<HTMLElement>('[data-waitlist-success]');
  const formWrapper = document.querySelector<HTMLElement>('[data-waitlist-wrapper]');
  const successEmail = document.querySelector<HTMLElement>('[data-success-email]');
  const successPlatform = document.querySelector<HTMLElement>('[data-success-platform]');

  const platformLabels: Record<string, string> = {
    windows: 'Windows',
    linux: 'Linux',
    ios: 'iOS / iPad',
  };

  const updateSubmitState = () => {
    if (!submitBtn || !emailInput || !platformInput) return;
    const ok = emailInput.value.trim() !== '' && platformInput.value !== '';
    submitBtn.disabled = !ok;
    submitBtn.classList.toggle('opacity-50', !ok);
    submitBtn.classList.toggle('cursor-not-allowed', !ok);
  };

  for (const btn of platformBtns) {
    btn.addEventListener('click', () => {
      const id = btn.dataset.platform ?? '';
      if (platformInput) platformInput.value = id;
      for (const b of platformBtns) {
        const selected = b === btn;
        b.dataset.selected = selected ? 'true' : 'false';
        b.classList.toggle('border-amber-500', selected);
        b.classList.toggle('bg-amber-500/15', selected);
        b.classList.toggle('border-gray-700', !selected);
      }
      updateSubmitState();
    });
  }

  emailInput?.addEventListener('input', updateSubmitState);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!emailInput || !platformInput || !submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    try {
      // TODO: replace with the real waitlist endpoint
      // await fetch('https://api.tryskilly.app/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: emailInput.value, platform: platformInput.value }),
      // });
      await new Promise((r) => setTimeout(r, 700));

      if (successEmail) successEmail.textContent = emailInput.value;
      if (successPlatform) successPlatform.textContent = platformLabels[platformInput.value] ?? platformInput.value;
      formWrapper?.setAttribute('hidden', '');
      successEl?.removeAttribute('hidden');
    } catch (err) {
      console.error(err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Join waitlist';
    }
  });

  updateSubmitState();
}
```

- [ ] **Step 13.2: Create `src/components/Waitlist.astro`**

```astro
---
// src/components/Waitlist.astro
const platforms = [
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' },
  { id: 'ios', label: 'iOS / iPad' },
];

const platformStatus = [
  { label: 'macOS', status: 'Available now', color: 'bg-green-500' },
  { label: 'Windows', status: 'In development', color: 'bg-amber-500' },
  { label: 'Linux', status: 'Planned', color: 'bg-gray-500' },
  { label: 'iOS / iPad', status: 'Exploring', color: 'bg-gray-500' },
];
---
<section id="waitlist" class="relative py-24 lg:py-32 px-6">
  <div
    aria-hidden="true"
    class="absolute left-0 right-0 top-0 h-px"
    style="background: linear-gradient(90deg, transparent, #27272A, transparent);"
  ></div>

  <div class="max-w-[560px] mx-auto text-center">
    <span class="text-[13px] font-semibold text-amber-500 tracking-[1.5px] uppercase">Coming soon</span>
    <h2 data-reveal class="reveal text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight mt-3 mb-4 text-gray-50">
      Not on Mac?
    </h2>
    <p data-reveal class="reveal reveal-delay-1 text-[17px] leading-relaxed text-gray-400 mb-10">
      Skilly is Mac-first, but Windows and Linux are on the roadmap. Join the waitlist and we'll email you when your platform launches.
    </p>

    <div data-waitlist-wrapper data-reveal class="reveal reveal-delay-2 bg-gray-900 rounded-[20px] border border-gray-800 p-9 text-left">
      <form data-waitlist-form>
        <input type="hidden" name="platform" value="" />

        <label class="text-sm font-medium text-gray-300 block mb-2">Choose your platform</label>
        <div class="flex gap-2.5 mb-6">
          {platforms.map((p) => (
            <button
              type="button"
              data-platform={p.id}
              data-selected="false"
              class="flex-1 flex flex-col items-center gap-2 px-3 py-4 rounded-xl border border-gray-700 bg-transparent transition-all hover:border-gray-500"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500" aria-hidden="true">
                {p.id === 'windows' && (
                  <>
                    <rect x="2" y="3" width="9" height="9" rx="1" />
                    <rect x="13" y="3" width="9" height="9" rx="1" />
                    <rect x="2" y="14" width="9" height="9" rx="1" />
                    <rect x="13" y="14" width="9" height="9" rx="1" />
                  </>
                )}
                {p.id === 'linux' && (
                  <path d="M12 2C9 2 7 5 7 8c0 2-2 3-3 5s0 4 1 5c2 2 5 2 7 2s5 0 7-2c1-1 2-3 1-5s-3-3-3-5c0-3-2-6-5-6z" />
                )}
                {p.id === 'ios' && (
                  <>
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <circle cx="12" cy="19" r="0.5" fill="currentColor" />
                  </>
                )}
              </svg>
              <span class="text-[13px] font-medium text-gray-400">{p.label}</span>
            </button>
          ))}
        </div>

        <label class="text-sm font-medium text-gray-300 block mb-2" for="waitlist-email">Email address</label>
        <div class="flex gap-2.5">
          <input
            id="waitlist-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            class="flex-1 px-4 py-3 rounded-lg text-[15px] bg-gray-950 border border-gray-700 text-gray-200 placeholder-gray-600 outline-none focus:border-amber-500 transition-colors"
          />
          <button
            type="submit"
            disabled
            class="bg-amber-500 hover:bg-amber-600 text-gray-950 border-none rounded-lg px-6 py-3 text-[15px] font-semibold whitespace-nowrap transition-all opacity-50 cursor-not-allowed"
          >
            Join waitlist
          </button>
        </div>
        <p class="text-xs text-gray-600 mt-3">No spam. One email when your platform launches. That's it.</p>
      </form>
    </div>

    <div data-waitlist-success hidden class="bg-gray-900 rounded-[20px] border border-amber-500/25 p-12 text-center">
      <div class="w-14 h-14 rounded-full bg-amber-500/10 border-2 border-amber-500/25 flex items-center justify-center mx-auto mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <h3 class="text-[22px] font-semibold text-gray-50 mb-2">You're on the list!</h3>
      <p class="text-[15px] text-gray-400 leading-relaxed">
        We'll email <span data-success-email class="text-amber-300"></span> when Skilly launches on <span data-success-platform class="text-amber-300"></span>.
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
      {platformStatus.map((p) => (
        <div class="flex items-center gap-1.5">
          <span class={`block w-1.5 h-1.5 rounded-full ${p.color}`}></span>
          <span class="text-[13px] text-gray-400">{p.label}</span>
          <span class="text-[11px] text-gray-600">— {p.status}</span>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  import '../scripts/waitlist.ts';
</script>
```

- [ ] **Step 13.3: Wire Waitlist into the page**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Features from '../components/Features.astro';
import SkillFormat from '../components/SkillFormat.astro';
import Pricing from '../components/Pricing.astro';
import Waitlist from '../components/Waitlist.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
    <SkillFormat />
    <Pricing />
    <Waitlist />
  </main>
</Layout>
```

- [ ] **Step 13.4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 13.5: Visual check + interaction**

Run `npm run dev`, scroll to Waitlist. Confirm:
- The 3 platform buttons render
- Clicking one highlights it amber and stores the value in the hidden input
- Submit button is disabled until both an email and a platform are chosen
- Submitting (with valid email + platform) shows the success state with the email and platform interpolated
- The platform-status row at the bottom renders with colored dots

Stop dev server.

- [ ] **Step 13.6: Commit**

```bash
git add src/components/Waitlist.astro src/scripts/waitlist.ts src/pages/index.astro
git commit -m "feat: add Waitlist section with platform picker and form handling"
```

---

## Task 14: CTA section + Footer

**Files:**
- Create: `src/components/CTA.astro`, `src/components/Footer.astro`

- [ ] **Step 14.1: Create `src/components/CTA.astro`**

```astro
---
// src/components/CTA.astro
import Logo from './Logo.astro';
---
<section id="download" class="py-24 lg:py-32 px-6 text-center">
  <div class="max-w-[600px] mx-auto">
    <div class="flex justify-center mb-6">
      <Logo size={56} variant="amber" alt="Skilly" />
    </div>
    <h2 data-reveal class="reveal text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mb-4 text-gray-50">
      Stop watching tutorials.<br />
      <span class="text-amber-500">Start doing.</span>
    </h2>
    <p class="text-lg text-gray-400 mb-9 leading-relaxed">
      Download Skilly, load a skill, and let the cursor show you the way.
    </p>
    <a
      href="#"
      class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-gray-950 rounded-lg px-10 py-4 text-lg font-semibold transition-all"
    >
      Download for Mac — Free
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 12L12 4M12 4H5M12 4V11"/>
      </svg>
    </a>
  </div>
</section>
```

- [ ] **Step 14.2: Create `src/components/Footer.astro`**

```astro
---
// src/components/Footer.astro
import Logo from './Logo.astro';
import Wordmark from './Wordmark.astro';
---
<footer class="border-t border-gray-800 py-12 px-6">
  <div class="max-w-site mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
    <div class="flex items-center gap-2.5">
      <Logo size={20} variant="amber" alt="Skilly" />
      <Wordmark size="sm" />
      <span class="text-[13px] text-gray-500 ml-2">by moelabs.dev</span>
    </div>
    <div class="flex gap-6">
      <a href="#" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">GitHub</a>
      <a href="#" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">X / Twitter</a>
      <a href="#" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">Discord</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 14.3: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 14.4: Commit**

```bash
git add src/components/CTA.astro src/components/Footer.astro
git commit -m "feat: add CTA and Footer components"
```

---

## Task 15: Compose the full index page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 15.1: Replace `src/pages/index.astro` with the final composition**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Features from '../components/Features.astro';
import SkillFormat from '../components/SkillFormat.astro';
import Pricing from '../components/Pricing.astro';
import Waitlist from '../components/Waitlist.astro';
import CTA from '../components/CTA.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
    <SkillFormat />
    <Pricing />
    <Waitlist />
    <CTA />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 15.2: Verify build**

Run: `npm run build`
Expected: build succeeds. `dist/index.html` exists and is non-empty.

- [ ] **Step 15.3: Full visual check**

Run `npm run dev`, open `http://localhost:4321`. Walk through the entire page top to bottom and confirm every section from the spec §13 acceptance criteria renders. Stop dev server.

- [ ] **Step 15.4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: compose full landing page with all 9 sections"
```

---

## Task 16: Mobile responsiveness pass

**Files:**
- Modify: any component where mobile layout needs tweaking

- [ ] **Step 16.1: Run dev server and test at three widths**

Run: `npm run dev`, then test at:
- 375px (iPhone)
- 768px (iPad)
- 1440px (desktop)

Use browser devtools responsive mode.

- [ ] **Step 16.2: Walk through the checklist for each breakpoint**

For each width, confirm:
- [ ] Nav: logo + Download CTA visible, no horizontal scroll
- [ ] Hero: headline doesn't overflow, CTA wraps, mockup hidden below `lg`
- [ ] How It Works: 3 columns on `md+`, stacked on mobile
- [ ] Features: 3 columns on `lg+`, 2 on `md`, 1 on mobile
- [ ] Skill Format: side-by-side on `lg+`, stacked on smaller. Code block doesn't overflow horizontally (it can scroll internally).
- [ ] Pricing: 3 columns on `md+`, stacked on mobile
- [ ] Waitlist: form fits, platform buttons fit, submit button doesn't overflow
- [ ] CTA: heading wraps cleanly
- [ ] Footer: stacks vertically on mobile (`flex-col sm:flex-row`)

- [ ] **Step 16.3: Fix any issues found**

If any issue is found, edit the relevant component file and re-test. Common fixes:
- Add `overflow-x-auto` to wide elements
- Adjust `text-3xl sm:text-4xl lg:text-[44px]` style chains
- Add `flex-wrap` to flex containers
- Hide non-essential decorative elements on mobile with `hidden lg:block`

- [ ] **Step 16.4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 16.5: Commit (if any fixes were made)**

```bash
git add -A
git commit -m "fix: mobile responsiveness pass across all sections"
```

If no fixes needed, skip this commit and note "No mobile fixes required" before moving on.

---

## Task 17: Accessibility and SEO pass

**Files:**
- Modify: any component where alt text, semantic HTML, or focus styles need fixing

- [ ] **Step 17.1: Audit alt text**

Run: `grep -rn 'img' src/components/`
Confirm every `<img>` and `<Logo>` usage has a meaningful `alt`. Decorative images use `alt=""` (or `aria-hidden="true"` on parent).

- [ ] **Step 17.2: Audit heading hierarchy**

Confirm there's exactly one `<h1>` (in Hero), and `<h2>` headings appear in section order without skipping levels.

Run: `grep -rn '<h[1-6]' src/components/ src/pages/`

Expected: one `<h1>` in Hero.astro, `<h2>` in HowItWorks/Features/SkillFormat/Pricing/Waitlist/CTA, `<h3>` inside cards.

- [ ] **Step 17.3: Audit interactive elements**

Every clickable element should be a `<button>` or `<a>`. Confirm there are no clickable `<div>`s.

Run: `grep -rn 'onclick\|@click' src/components/`
Expected: no matches (we only use vanilla scripts, not inline handlers).

- [ ] **Step 17.4: Verify the form is keyboard-accessible**

Run `npm run dev`, tab through the Waitlist form. Confirm:
- Each platform button is reachable via Tab
- Email input is reachable
- Submit button is reachable
- Pressing Enter in the email field submits the form

If anything fails, add `tabindex="0"` or convert the offending element to a real button.

- [ ] **Step 17.5: Verify focus styles are visible**

While tabbing, confirm focused elements have a visible outline. If not, add `focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950` to the relevant Tailwind class strings.

- [ ] **Step 17.6: Verify reduced-motion works**

In devtools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce", reload the page. Confirm:
- Reveal animations show content immediately (no fade-up delay)
- The float and pulse animations stop
- The hero rotating app text still updates (text change, not animation)

- [ ] **Step 17.7: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 17.8: Commit (if any fixes were made)**

```bash
git add -A
git commit -m "fix: accessibility pass — focus styles, alt text, semantic HTML"
```

---

## Task 18: Lighthouse and final verification

**Files:** none

- [ ] **Step 18.1: Build the production bundle**

Run: `npm run build`
Expected: build succeeds. Note the file sizes printed.

- [ ] **Step 18.2: Serve the production build**

Run: `npm run preview`
Expected: preview server running at `http://localhost:4321/`.

- [ ] **Step 18.3: Run Lighthouse manually**

In Chrome DevTools → Lighthouse → Desktop → Performance + Accessibility + Best Practices + SEO → "Analyze page load".

Required scores (from spec §13):
- [ ] Performance ≥ 95
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95

If any score is below threshold, read the recommendations, fix the issue, rebuild, and re-run.

- [ ] **Step 18.4: Final acceptance walkthrough**

Open `http://localhost:4321/`, walk through every section, and tick off the spec §13 acceptance criteria one by one:
- [ ] All 9 sections render with identical copy and color
- [ ] Hero rotating app name cycles through Blender → Figma → After Effects → DaVinci Resolve → Premiere Pro
- [ ] Nav background fades to gray-950 on scroll
- [ ] Reveal-on-scroll animations trigger when sections enter viewport
- [ ] Waitlist form validates email + platform and shows the success state
- [ ] Mobile (375px), tablet (768px), desktop (1440px) all render without overflow
- [ ] Lighthouse scores all ≥ 95
- [ ] No console errors or warnings
- [ ] Logo PNGs render correctly in nav, footer, and CTA section

Stop preview server.

- [ ] **Step 18.5: Final commit**

```bash
git add -A
git commit -m "chore: final Lighthouse pass and acceptance walkthrough" --allow-empty
```

(`--allow-empty` is fine here — this commit marks the milestone even if no files changed.)

---

## Done

The marketing site is built, mobile-responsive, accessible, and Lighthouse-clean. To deploy:

- **Vercel:** `npx vercel` from the project root
- **Netlify:** drag the `dist/` folder to Netlify
- **Cloudflare Pages:** connect the repo, set build command `npm run build` and output directory `dist`

Future work captured in spec §12: real waitlist endpoint, mobile hamburger menu, real demo video, real app screenshots, real OG image, analytics integration.
