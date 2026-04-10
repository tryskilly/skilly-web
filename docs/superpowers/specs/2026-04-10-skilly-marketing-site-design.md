# Skilly Marketing Site — Design Spec

**Date:** 2026-04-10
**Domain:** tryskilly.app
**Stack:** Astro + Tailwind CSS + vanilla TypeScript
**Source of truth:** `skilly-design-system-v1.0.md` (design system) and `skilly-landing.jsx` (reference design with finalized copy)

---

## 1. Goal

Ship a static, fast, dark-mode-first marketing site for Skilly — an AI teaching companion for complex desktop creative software. Port the existing React reference (`skilly-landing.jsx`) into a production Astro project that uses the design system tokens, ships near-zero JavaScript, and is ready to deploy.

The reference JSX already contains the final copy, color usage, and section structure. This project is a **port**, not a redesign. We do not change copy, colors, ordering, or visual hierarchy without explicit approval.

## 2. Non-Goals

- No CMS integration
- No analytics wiring (placeholder slot only)
- No i18n / RTL — Arabic support is a future task
- No real waitlist backend — the form posts to a TODO stub
- No demo video — placeholder section, real video to be shot later
- No app screenshots — styled mockup placeholder remains
- No blog, no docs site, no auth

## 3. Technical Decisions

### 3.1 Framework: Astro

Astro is the right choice for a marketing site because it ships zero JS by default and only hydrates what we explicitly opt into. With the interactivity in this site (rotating headline, scroll-aware nav, IntersectionObserver reveals, waitlist form), we can do **all of it in vanilla TS scripts** — no React island needed. This keeps the bundle minimal and the LCP fast.

### 3.2 Styling: Tailwind CSS

Tailwind via `@astrojs/tailwind`. The design system colors (amber-50..900, warm-gray-50..950) and font families become Tailwind tokens. The reference JSX uses inline `style={{...}}` objects throughout — we convert these to Tailwind utility classes during the port.

### 3.3 Interactivity: Vanilla TypeScript

Four scripts, each loaded only on the page that needs it:

1. `nav-scroll.ts` — toggles a `scrolled` class on `<header>` when `window.scrollY > 40`
2. `hero-rotate.ts` — cycles the rotating app name in the hero every 2400ms
3. `reveal-on-scroll.ts` — `IntersectionObserver` that adds `is-visible` class to elements with `[data-reveal]`, triggering fade-up
4. `waitlist.ts` — form state, validation, submit handler (POSTs to a TODO endpoint)

No React, no Vue, no Svelte — just `<script>` tags in Astro components.

### 3.4 Fonts

`@fontsource/dm-sans` and `@fontsource/jetbrains-mono` packages, self-hosted to avoid Google Fonts request. Loaded once in `Layout.astro`.

### 3.5 Logo Assets

The user has provided:
- `skilly-logo-mark-512.png` — amber cursor mark on transparent
- `skilly-logo-white-512.png` — white cursor mark on transparent

These are copied to `public/` and used directly. The reference JSX uses an inline SVG `CursorLogo` component — we replace it with `<img>` tags pointing at the real PNGs. A simple Astro component (`Logo.astro`) wraps this so we can swap variants (amber/white) and sizes via props.

The wordmark "skilly" is rendered in DM Sans Bold via CSS, not as an asset. (Per design system §5.3, the dot of the "i" can optionally be an amber cursor — we'll do this as a small flourish in the nav and footer wordmark.)

## 4. Project Structure

```
skilly-web/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── skilly-mark.png            ← amber mark (copied from Downloads)
│   ├── skilly-mark-white.png      ← white mark
│   ├── favicon.svg                ← amber mark as SVG (or PNG fallback)
│   └── og-image.png               ← placeholder, 1200x630, gray-950 bg + lockup
└── src/
    ├── layouts/
    │   └── Layout.astro           ← <html>, <head>, fonts, meta, OG
    ├── components/
    │   ├── Logo.astro             ← <img> wrapper, props: variant, size
    │   ├── Wordmark.astro         ← "skilly" in DM Sans Bold
    │   ├── Nav.astro
    │   ├── Hero.astro
    │   ├── HowItWorks.astro
    │   ├── Features.astro
    │   ├── SkillFormat.astro      ← SKILL.md preview with syntax highlight
    │   ├── Pricing.astro
    │   ├── Waitlist.astro
    │   ├── CTA.astro
    │   └── Footer.astro
    ├── scripts/
    │   ├── nav-scroll.ts
    │   ├── hero-rotate.ts
    │   ├── reveal-on-scroll.ts
    │   └── waitlist.ts
    ├── data/
    │   ├── apps.ts                ← rotating app names
    │   ├── steps.ts               ← How It Works data
    │   ├── features.ts            ← 6 feature cards
    │   ├── tiers.ts               ← pricing tiers
    │   └── skill-yaml.ts          ← SKILL.md preview content
    ├── styles/
    │   └── globals.css            ← Tailwind directives, custom keyframes
    └── pages/
        └── index.astro            ← composes the page
```

**Why a `data/` folder:** the reference JSX defines arrays (apps, steps, features, tiers) at the top of the file. We pull these out so each section component imports its own data — keeps components small and focused, makes copy edits a one-file change.

## 5. Tailwind Configuration

```js
// tailwind.config.mjs (excerpt)
export default {
  content: ['./src/**/*.{astro,html,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        amber: { 50: '#FEFCE8', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D',
                 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309',
                 800: '#92400E', 900: '#78350F' },
        gray:  { 50: '#FAFAF8', 100: '#F5F5F0', 200: '#E5E5E0', 300: '#D4D4CF',
                 400: '#A3A39E', 500: '#737370', 600: '#525250', 700: '#3F3F3D',
                 800: '#27272A', 900: '#1C1C1E', 950: '#0F0F10' },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-up':  { '0%': { opacity: 0, transform: 'translateY(30px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' } },
        'fade-in':  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'pulse-soft': { '0%, 100%': { opacity: 0.4 }, '50%': { opacity: 1 } },
        'float':    { '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
};
```

## 6. Section-by-Section Mapping

Each section is a single `.astro` component with its content imported from `src/data/*.ts`. Layout, copy, and color usage match the reference JSX exactly. The table below records what changes.

| Section | Reference JSX behavior | Astro port |
|---|---|---|
| Nav | Scroll listener toggles bg | `nav-scroll.ts` adds `.scrolled` class |
| Hero | Rotating app name via `useState` | `hero-rotate.ts` swaps `<span>` text content |
| Hero visual | Inline JSX mockup of code window + floating cursor | Same markup, Tailwind classes, real `<img>` for cursor |
| How It Works | 3 steps fade-up via `IntersectionObserver` | `reveal-on-scroll.ts`, same staggered delays |
| Features | 6 cards, fade-up + hover | Same — Tailwind classes for hover transform |
| Skill Format | Syntax-highlighted SKILL.md `<pre>` | Build the highlighted lines server-side at build time in the `.astro` component (no runtime JS) |
| Pricing | 3 tiers, "Recommended" badge | Same |
| Waitlist | Platform picker + email input + simulated submit | `waitlist.ts` handles state, posts to `/* TODO endpoint */` |
| CTA | Centered headline + download button | Same |
| Footer | Logo + links | Same, with placeholder social URLs |

## 7. Responsive Design

Per design system §7.3:

- Mobile (`< 640px`): 1 column. Hero text only, hero mockup hidden. Nav collapses to hamburger? **Decision:** No hamburger for v1 — too much scope. Nav links hide on mobile, only logo + Download CTA show. Typography scales down per design system table.
- Tablet (`640–1024px`): 2 columns where appropriate (features grid, pricing grid). Full nav shows.
- Desktop (`> 1024px`): 3-4 columns, max-width 1200px.

Tailwind breakpoints used: `sm:` (640px), `md:` (768px), `lg:` (1024px).

## 8. Accessibility & SEO

- Semantic HTML throughout (`<header>`, `<main>`, `<section>` with headings, `<footer>`)
- Every `<img>` has meaningful `alt` text (logo: "Skilly", mockups: descriptive)
- Color contrast: amber-300 text on gray-900 / gray-950 backgrounds — verified to meet WCAG AA
- Focus styles preserved on interactive elements (don't strip outlines)
- `<title>`, `<meta name="description">`, OG tags, Twitter card meta, canonical URL
- `lang="en"` on `<html>`
- Reduced motion: wrap reveal animations in `@media (prefers-reduced-motion: no-preference)` so motion-sensitive users get instant content

## 9. Performance Budget

- LCP < 1.5s on a fast connection
- JS bundle < 5KB gzipped (target: just the four small vanilla scripts)
- Total page weight < 200KB (excluding logo PNGs and self-hosted fonts)
- No render-blocking resources except the inlined critical CSS Tailwind generates

## 10. What Stays Identical to the Reference JSX

- All written copy
- Color values (already match the design system)
- Section ordering
- Pricing tier prices ($0 / $19 / $9 BYOK)
- Animation timings and easings
- The 6 feature card icons
- The SKILL.md YAML content shown in the code block

## 11. What Differs From the Reference JSX

- React → Astro components
- `useState`/`useEffect`/`useRef` → vanilla TS scripts
- Inline `style={{...}}` → Tailwind utility classes
- Inline SVG `CursorLogo` → real logo PNGs from `public/`
- Desktop-only layout → responsive (mobile/tablet/desktop)
- No `<style>` JSX block → Tailwind + small `globals.css`
- Adds: meta tags, OG tags, favicon, semantic HTML, reduced-motion handling

## 12. Open Questions / Deferred Decisions

| Question | Resolution |
|---|---|
| Real waitlist endpoint? | Stub for now. Wire to Buttondown/ConvertKit/custom endpoint when known. |
| Mobile nav (hamburger menu)? | Skip for v1. Hide nav links on mobile, show only logo + Download CTA. |
| Real demo video? | Placeholder section, swap when shot. |
| Real app screenshots? | Styled mockup placeholder, swap when ready. |
| Domain DNS / deployment? | Not in scope of this spec. Project will be deployable to Vercel/Netlify/Cloudflare Pages with zero config. |
| Analytics (Plausible/Fathom)? | Not in scope. Add later via a `<script>` slot in `Layout.astro`. |
| OG image generation? | Manual placeholder PNG for v1. Could automate with `@vercel/og` or similar later. |

## 13. Acceptance Criteria

The port is complete when:

- [ ] `npm run dev` shows a working dev server at `http://localhost:4321`
- [ ] `npm run build` produces a static site in `dist/` with no errors or warnings
- [ ] All 9 sections from the reference render with identical copy and color
- [ ] The hero rotating app name cycles through Blender → Figma → After Effects → DaVinci Resolve → Premiere Pro
- [ ] Nav background fades to gray-950 on scroll
- [ ] Reveal-on-scroll animations trigger when sections enter viewport
- [ ] Waitlist form validates email + platform selection and shows the success state on submit
- [ ] Mobile (375px), tablet (768px), and desktop (1440px) all render without overflow or broken layout
- [ ] Lighthouse desktop score: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] No console errors or warnings in the browser
- [ ] The logo PNGs render correctly in nav, footer, and CTA section
