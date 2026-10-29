# Skilly SEO context

State file for the SEO agent (format adapted from Illyism's seo-autopilot skill). Read it at the start of every run; update it when the product or site changes. **Every fact cites its source.** If the site and the product repo disagree, the product repo (github.com/tryskilly/skilly) wins; log the conflict under "Open conflicts".

Last verified: 2026-10-29 against skilly-web `main` @ 984ea19 and tryskilly/skilly `main` (shallow clone, 2026-10-29).

## Product

- Skilly is a voice-first AI tutor for Mac. You ask out loud, it sees your screen, answers out loud with a live transcript, and points at the button, menu or control to use next. Sources: `public/products/skilly-people.md`, `src/data/faqs.ts` ("What is Skilly, exactly?").
- Activation: hold Control+Option and ask, or turn on Live Tutor for hands-free use. Source: `public/products/skilly-people.md` ("How it works on Mac").
- Skilly **points**; it does not click for you. Source: `public/products/skilly-people.md` ("Its pointer moves to the interface element").
- Works in any Mac app; a skill adds app-specific lessons and current docs. Source: `src/data/faqs.ts` ("Which apps does Skilly work with?").
- 16 languages, 8 voices; Live Tutor; multi-monitor support; custom skills via your own SKILL.md. Source: `src/data/tiers.ts` (`betaTier.features`).
- Open source under Apache-2.0. Source: `src/components/Pricing.astro` (line 42); `LICENSE` in github.com/tryskilly/skilly.
- Skilly is a fork of Farza Majeed's Clicky that adds Live Tutor, a single OpenAI Realtime call, a skills layer and course progress. Source: https://tryskilly.app/vs/clicky/ (`src/pages/vs/clicky.astro`).
- Privacy: audio and a live screenshot stream to OpenAI only while you're talking; nothing is saved after the session; analytics never log transcripts, screenshots or prompts. Source: `src/data/faqs.ts` ("Is it safe?").
- Free Skill Builder makes a custom SKILL.md for another app and emails it. Sources: `src/data/faqs.ts` ("Can I build my own skill?"), https://tryskilly.app/tools/skill-builder/.
- Browser extensions for Chrome, Edge and Firefox give voice-and-pointer help on websites. Source: `src/data/config.ts` (`BROWSER_EXTENSIONS`).

## Bundled skills

Six skills: **Blender, After Effects, Premiere Pro, DaVinci Resolve, Figma, Houdini.**
- Product repo `skills/` holds six: `blender-fundamentals`, `after-effects-basics`, `premiere-pro-basics`, `davinci-resolve-basics`, `figma-basics`, `houdini-essentials`. Source: github.com/tryskilly/skilly `skills/`.
- Site list (all six marked available): `src/data/skills.ts`.
- **Never claim Xcode, Photoshop or VS Code skills.** None exist in `skills/`.
- See "Open conflicts" for places that still say five.

## Pricing (people product)

- **Free trial: 15 minutes of actual use, one-time, no credit card.** Sources: `src/data/faqs.ts` ("How long is the free trial?"), `src/data/trial-terms.ts`, `src/data/tiers.ts` (`guarantees`).
  - Canonical trial line for CTAs (reuse it verbatim, don't write new pricing copy): "15-minute free trial, no card. Then $19/month hosted, or $5/month plus your own OpenAI usage." Source: `src/data/trial-terms.ts`.
- **Hosted: $19/month, 3 hosted hours a month** (about $0.11 per included minute), monthly billing only. Sources: `src/data/tiers.ts` (`betaTier`), `public/pricing.md`.
- When you hit 3 hours, Skilly pauses until the next billing cycle; there are no overage charges. Source: `src/data/faqs.ts` ("What happens when I hit my 3 hours?").
- **BYOK: $5/month plus your OpenAI usage. It is never free.** Sources: `src/data/tiers.ts` (`byokTier.heading`), `src/data/faqs.ts` ("Can I bring my own OpenAI API key?"), `src/components/Pricing.astro`.
- Cancel anytime and keep access to the end of the period. Source: `src/data/faqs.ts` ("What happens if I cancel?").
- Price changes come with at least 30 days' notice; people who joined earlier keep their price. Source: `src/data/faqs.ts` ("Will the price change after beta?"), https://tryskilly.app/terms/.
- **There is no founder or lifetime offer.** The "price lock for life" and "50 seats" lines were removed in PR #37 (fc66e3f). "Founder beta" is the beta's name, not a discount (`src/components/Hero.astro`).
- **Never call Skilly "free".** The only $0 plan is **Builders Early Access** (Builders product, 30 teaching minutes a month). Source: `public/pricing.md` ("Early Access — $0/month").
- Builders plans: Early Access $0, Starter $29, Studio $99, Scale $299 per month. Source: `public/pricing.md`.

## Platforms

- Mac: macOS 14.2 or later. No CPU architecture is claimed. Sources: `src/data/faqs.ts` ("Which operating systems work?"), `public/products/skilly-people.md`.
- Windows, Linux and iOS: waitlist only, through the site's `/api/waitlist`. Sources: `src/data/faqs.ts`, `src/pages/api/waitlist.ts`, `public/pricing.md`.
- Web apps: Builders embed widget, installed with one script tag. Sources: `public/products/skilly-builders.md` ("Installation: One script tag"), github.com/tryskilly/skilly `sdk/web/README.md` ("Script tag (auto-inits from data-skilly-*)").

## Audience and positioning

- People: anyone learning or stuck in a Mac app, especially creative tools (3D, motion, video, design). Sources: `public/products/skilly-people.md` ("Audience"), `src/data/skills.ts`.
- Builders (B2B): SaaS teams that want voice onboarding and in-app guidance on their own web app. Sources: `public/products/skilly-builders.md`, https://tryskilly.app/builders/.
- Positioning: Skilly isn't another tutorial video or chatbot. It's like an expert sitting next to you inside the app who sees your screen and points at the control. Sources: https://tryskilly.app/ (title "Skilly: Voice AI Tutor for Mac That Points at the Button", `src/pages/index.astro`), `src/pages/vs/clicky.astro`.

## Competitors

People (product): Clicky (heyclicky.com), ChatGPT voice and screen sharing, Gemini Live, Raycast AI, Cluely, Rewind, OpenClicky. Sources: `src/pages/vs/*.astro`, `/learn/chatgpt-screen-sharing-mac/`, OpenSEO tracker 78058fd6 brand list.
People (SERP): helpx.adobe.com, docs.blender.org, help.figma.com, Blackmagic Design, YouTube, support.apple.com. Source: OpenSEO tracker 78058fd6 and run baf1d653 cited domains (`/workspace/seo-research/roundups-2026-10-28.md`).
Builders: WalkMe, Pendo, Appcues, Whatfix, Userpilot, Chameleon, Command AI, Intercom Fin, Storylane, Arcade, Navattic. Sources: `src/pages/vs/*.astro`, `src/data/buildersComparisonPages.ts`, `src/data/buildersVersusPages.ts`.

## Site structure (Astro, `trailingSlash: 'always'`)

| Path | Source | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | People money page (Mac download) |
| `/learn/` and `/learn/<slug>/` | `src/content/learn/*.md`, `src/pages/learn/[...slug].astro` | How-tos and guides (about 70 articles) |
| `/vs/` and `/vs/<competitor>/` | `src/pages/vs/*.astro` | People and Builders comparisons |
| `/vs/<a>-vs-<b>/` | `src/data/buildersVersusPages.ts` | Builders competitor-vs-competitor pages |
| `/builders/` | `src/pages/builders/index.astro` | Builders money page |
| `/for/<slug>/`, `/use-cases/<slug>/` | `src/data/seoLandingPages.ts` | Builders landing pages |
| `/tools/<slug>/` | `src/pages/tools/` | Free tools (Skill Builder, AI onboarding audit, generators) |
| `/download` | `src/pages/download.ts` | Attributed Mac download handoff (UTM `utm_source=tryskilly-web`, `trackedDownloadUrl()` in `src/data/config.ts`) |
| `/pricing.md`, `/llms.txt`, `/products/*.md` | `public/` | Machine-readable facts for AI agents |
| `/sitemap-index.xml` | `@astrojs/sitemap` in `astro.config.mjs` | Excludes `/audit/` and `/checkout-success/` |

The `seo/` folder sits at the repo root, outside `src/` and `public/`, so Astro never serves it.

## Money keyword (Blitz target)

**Chosen: `clicky alternative`, target page https://tryskilly.app/vs/clicky/.**

Why:
1. It's the closest query to winning. Google AI Overviews already cites tryskilly.app for "Clicky alternatives for Mac". That's one of Skilly's only 2 mentions in 40 AI answers (OpenSEO run baf1d653, 2026-10-28).
2. It has the highest buyer intent of anything we track. Someone searching it already wants a voice tutor that sees the screen and points, which is exactly what Skilly is (a Clicky fork with skills, Live Tutor and course progress, per `/vs/clicky/`). How-to traffic, by contrast, has to be converted from scratch.
3. Third-party lists like usecarly.com "8 Best Clicky Alternatives" and koiscribe.com/alternatives/heyclicky rank and get cited by AI engines, so the query has a real SERP and real AI demand (`/workspace/seo-research/roundups-2026-10-28.md`).
4. A page already exists, and the sitewide footer and several /vs/ pages already link to it, so this is a push to an indexed page, not a new build. That's the ideal Blitz case.

Risks and unknowns:
- US volume and KD are **not measured yet**. No free data exists, and this task allowed no paid calls. The first paid check should run `get_keyword_metrics` on: clicky alternative, heyclicky alternative, ai tutor for mac, ai that can see your screen mac, chatgpt screen share mac alternative. Fund it from the $10/week budget.
- "Clicky" is also clicky.com web analytics. alternativeto, Product Hunt and appmus pages for that product confuse AI engines, so the page must say "Clicky (heyclicky.com) by Farza" up front.
- Runner-up: `ai tutor that sees your screen` → `/learn/ai-tutor-that-sees-your-screen/`. Switch to it if the volume check shows `clicky alternative` is negligible.

On-page changes for /vs/clicky/ (backlog item B4):
- Answer "best Clicky alternative for Mac" in the first two sentences.
- Retitle around the query: current title is "Skilly vs Clicky: What Is Different in the Fork?". Candidate: "Clicky Alternative for Mac: Skilly vs Clicky (2026)".
- Keep the comparison fair and note where Clicky is better. Give every Clicky claim a source and an "as of" date.

Internal-link plan (backlog items L1–L6; only existing pages, descriptive anchors, one link each):

| From | To | Anchor |
|---|---|---|
| `/learn/ai-tutor-that-sees-your-screen/` (mentions Clicky, no link yet) | `/vs/clicky/` | "Clicky alternative for Mac" |
| `/learn/best-voice-ai-assistant-mac-2026/` (mentions Clicky, no link yet) | `/vs/clicky/` | "Skilly vs Clicky" |
| `/learn/chatgpt-screen-sharing-mac/` (screen-aware alternatives section) | `/vs/clicky/` | "Clicky alternatives that point at the screen" |
| `/vs/cluely/` | `/vs/clicky/` | "Skilly vs Clicky" |
| `/learn/is-it-safe-to-let-ai-see-your-screen/` | `/vs/clicky/` | "how Skilly differs from Clicky" |
| `/vs/` hub (already links) | `/vs/clicky/` | Change the anchor to "Clicky alternative" if it's generic |

Already linking: footer (`src/components/Footer.astro`, `BuildersFooter.astro`), `src/data/siteNavigation.ts`, `/vs/gemini-live/`, `/vs/raycast-ai/`, `/vs/rewind/`, `/vs/`.

## Rules

- **No invented stats, testimonials, reviews, customer logos, quotes or benchmarks.** If a fact can't be sourced, leave it out. Competitor claims need a public source and an "as of" date.
- **Skilly only.** Never mention or touch Mohamed's other businesses or people.
- **PostHog is read-only** (project 376182): query it, never change it.
- **Paid research budget: $10/week total** (OpenSEO DataForSEO credits plus treg). Estimate the cost before any paid call and log the spend in `log.md`. The weekly OpenSEO AI-visibility tracker costs about $1.74/month.
- Never call Skilly "free". Say "15-minute free trial, no card". Builders Early Access is the only $0 plan.
- Never claim Xcode, Photoshop or VS Code skills, a founder or lifetime price, or that Skilly clicks for you.
- Edit only content and SEO files. Product code, pricing logic, legal pages, analytics, deploy config and secrets need an issue or approval.
- White-hat only: no bought links, link exchanges or networks, doorway or mass programmatic pages, keyword stuffing or parasite SEO.
- Don't send email, submit listings or post on social media without explicit approval. Draft these in the report instead.

## Open conflicts (site vs product)

- **Skill count:** `src/data/tiers.ts` ("5 ready-to-use skills"), `src/data/faqs.ts` ("Five skills ship today"), `src/components/Hero.astro` ("5 skills live") and `public/pricing.md` ("All 5 bundled example skills", no Houdini) still say five. `skills/` has six, but the app bundle folder `leanring-buddy/skills/` has five (no Houdini). Confirm with Mohamed before changing pricing-adjacent copy; the `public/pricing.md` fix is in progress (log 2026-10-29).
- **Intel support:** Resolved. The product repo does not pin a CPU architecture, so the site no longer claims Apple Silicon only or Intel support. Machine-readable files were corrected in PR #47. The FAQ, schema, homepage, and comparison pages were corrected in PR #48.
- **BYOK missing from `public/pricing.md`:** the people section doesn't state the $5/month plus OpenAI usage BYOK line. Fix is in progress (log 2026-10-29).
