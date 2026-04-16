# Skilly marketing site — final launch audit

**Date:** 2026-04-16
**Commit audited:** `4374b27` (live at https://tryskilly.app, deployed via Netlify)
**Frameworks applied:** `seo-audit`, `ai-seo`, `page-cro`, `marketing-psychology`, `pricing-strategy`, `copy-editing` (all from coreyhaines31/marketingskills), plus prior `2026-04-16-marketing-redesign-cro-critique.md` and `2026-04-16-copy-review-v2.md`.

---

## TL;DR — top 5 priorities

Ship these before any paid promotion or Product Hunt launch. Ordered by ROI × effort.

1. **🔴 Page `<title>` still says "Your AI companion for learning creative software"** — the OLD Blender-centric positioning baked into `Layout.astro` default. First thing Google indexes, first thing shown in SERPs and AI Overviews. One-line fix, highest-leverage change of the entire audit.
2. **🔴 `/robots.txt`, `/sitemap.xml`, `/llms.txt` all 404** — Google crawl efficiency is degraded, AI search citation is blocked because AI bots can't find a crawl directive, and there's no AEO context file at all.
3. **🔴 Zero schema markup** — no `Organization`, `SoftwareApplication`, `FAQPage`, `Product`, or `Article` JSON-LD. Rich Results, AI Overviews, and Perplexity all weight structured data 30–40% higher for citation.
4. **🔴 Hero still uses the 5-layer Blender PNG animation** — contradicts the universal positioning everywhere else. Kept by user decision pending a real demo video, but it IS the single biggest messaging inconsistency on the live page.
5. **🟡 No testimonials / social proof** — zero voice-of-customer quotes anywhere. Pre-launch so this is expected, but it's the #1 thing to ship right after launch to unlock conversion.

Everything below is ordered within its category and scored Critical / High / Medium / Low.

---

## 1. SEO — technical foundations

### 1.1 🔴 Missing `robots.txt` [CRITICAL]

**Evidence:** `curl https://tryskilly.app/robots.txt` → 404.

**Impact:** Google and AI crawlers default to "crawl everything" which usually works, BUT:
- No `Sitemap:` directive pointing at a sitemap → Google must discover URLs organically
- No explicit `Allow` for GPTBot, PerplexityBot, ClaudeBot, Google-Extended → some AI platforms treat missing robots.txt as ambiguous and may under-weight you for citation
- No way to block CCBot (Common Crawl, used for AI training) while still allowing citation-time bots

**Fix:** Add `/public/robots.txt` in skilly-web:

```
# Skilly — tryskilly.app
User-agent: *
Allow: /

# AI search crawlers — explicitly allow for citation
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

# Common Crawl — used for LLM training, not citation. Block to avoid
# uncompensated training corpus inclusion while keeping citation-time
# crawlers enabled.
User-agent: CCBot
Disallow: /

Sitemap: https://tryskilly.app/sitemap-index.xml
```

Also install `@astrojs/sitemap` and add it to `astro.config.mjs` to auto-generate a sitemap on build. `npm install @astrojs/sitemap` + 2 lines of config.

### 1.2 🔴 Missing sitemap [CRITICAL]

**Evidence:** `/sitemap.xml` and `/sitemap-index.xml` both 404.

**Fix:** Install `@astrojs/sitemap`, add to integrations. It generates automatically at build time. Reference it from `robots.txt` as above.

### 1.3 🔴 Missing `llms.txt` [CRITICAL for AEO/GEO]

**Evidence:** `/llms.txt` 404. Per [llmstxt.org](https://llmstxt.org), this is the emerging standard for giving AI systems a quick, structured overview of your site.

**Fix:** Add `/public/llms.txt`:

```
# Skilly

> Skilly is a macOS menu-bar AI tutor that watches your screen, hears your
> voice, answers out loud, and physically points at the right UI element
> with a live transcript floating beside the cursor. Works with every app
> on your Mac.

## Core

- [Homepage](https://tryskilly.app/): product overview, features, pricing, FAQ
- [Privacy policy](https://tryskilly.app/privacy): data handling, PostHog, OpenAI, WorkOS
- [Terms](https://tryskilly.app/terms)
- [Download (GitHub release)](https://github.com/tryskilly/skilly/releases/latest/download/Skilly.dmg)

## Pricing (machine-readable)

- Beta: $19/month, 3 hours of live AI teaching per month, cancel anytime
- Free 15-minute trial on first launch (no card required)
- Beta limited to 50 users, price locked for life on beta accounts

## Skills (bundled as examples, work without a skill on any app)

- Blender Fundamentals
- After Effects Basics
- Premiere Pro Basics
- DaVinci Resolve Basics
- Figma Basics

A skill builder is on the roadmap so anyone can create a skill for any app.

## How it works

1. Open any macOS app
2. Hold Control+Option and ask out loud — or enable Live Tutor for hands-free
3. Skilly sees your screen, answers out loud, and the transcript streams
   beside a blue cursor pointing at the UI element you need

## Tech

- Built on OpenAI Realtime (gpt-realtime model, single WebSocket)
- macOS native APIs (ScreenCaptureKit, AVAudioEngine)
- Open-source Worker proxy on Cloudflare
- WorkOS AuthKit for sign-in
- Polar for billing
- Zero retention: audio and screens stream only during a live session
```

### 1.4 🟡 Missing `/pricing.md` or `/pricing.txt` for AI agents [HIGH]

**Evidence:** `ai-seo` skill explicitly calls this out. AI agents evaluating SaaS on behalf of users parse machine-readable pricing files before visiting the live page.

**Fix:** Add `/public/pricing.md`:

```markdown
# Pricing — Skilly

## Skilly Beta
- Price: $19/month
- Per-day equivalent: ~$0.63/day
- Included: 3 hours of live AI tutoring per month, every bundled skill,
  16 languages, 8 voices, multi-monitor support, Live Tutor mode,
  auto-activation, custom skills via SKILL.md drop-in, auto-updates
- Trial: 15 minutes free on first launch (no credit card)
- Cancel: anytime, keep access through end of billing period
- Beta cap: first 50 users, beta price locked for life

## Platform
- macOS 14+ on Apple Silicon and Intel
- Windows, Linux, iOS/iPad: waitlist — not yet available
```

### 1.5 🔴 Page `<title>` is stale [CRITICAL]

**Evidence:** curl of tryskilly.app shows `<title>Skilly — Your AI companion for learning creative software</title>`. Also the meta description defaults to similar Blender-era copy.

**Source:** `src/layouts/Layout.astro` defaults, which `index.astro` uses unchanged.

**Impact:** This is what Google shows in SERPs, what AI Overviews use for entity identification, and what social previews render. Biggest single inconsistency between the page body and its metadata.

**Fix:** Update `Layout.astro` defaults:

```astro
const {
  title = 'Skilly — Stop hunting through menus. Just ask out loud.',
  description = 'A macOS menu-bar AI tutor for every app. Ask a question out loud — Skilly sees your screen, answers out loud, and points at exactly what to click, with a live transcript beside the cursor. 15 minutes free, no card.',
  ogImage = '/og-image.png',
} = Astro.props;
```

Also: the **`<meta name="theme-color">`** still says `#FAFAF8` (correct for light theme). Good. No change needed there.

### 1.6 🟡 No `<link rel="canonical">` verification [HIGH]

**Note:** `Layout.astro` already has `<link rel="canonical" href={canonical} />`. ✅ No fix needed — just verify it's self-referencing on build.

### 1.7 🟡 Hero image alt-text is empty [MEDIUM]

**Evidence:** The 5 layered PNGs in `Hero.astro` all have `alt=""`. The wrapping `<div>` has a correct `aria-label` for the overall composition, but the individual images are invisible to screen readers and image-indexing crawlers. This is partially correct (decorative layers) but Google Image search loses the opportunity.

**Fix:** Add descriptive alt text on at least the cursor and Blender window layers:

```astro
<img src="/hero/blender-window.png" alt="A Blender 3D viewport with the default cube" ... />
<img src="/hero/skilly-cursor.png" alt="Skilly's blue cursor pointing at a UI button" ... />
```

The bubbles and button-glow can stay `alt=""` (pure decoration).

### 1.8 🟢 HTTPS / HSTS [OK]

**Evidence:** `strict-transport-security: max-age=31536000` present in live response headers. ✅

### 1.9 🟢 Content-Type / encoding [OK]

**Evidence:** `content-type: text/html; charset=UTF-8`. ✅

---

## 2. SEO — on-page

### 2.1 🟡 Meta description still Blender-era [HIGH]

See 1.5 — same fix.

### 2.2 🟡 H1 verified present [OK — but verify with Playwright]

The H1 "Stop hunting through menus. Just ask out loud." is rendered server-side by `Hero.astro` per the indexed HTML. ✅

### 2.3 🟡 No keyword targeting document [MEDIUM]

**Evidence:** No `docs/keyword-targets.md` or similar. Per `seo-audit` Site-wide section, a keyword mapping doc prevents cannibalization as you add blog posts and comparison pages.

**Fix (backlog, not launch-blocking):** Create `docs/seo-keyword-map.md` with the top 10-20 queries you want to own:
- "AI screen tutor for Mac"
- "macOS voice assistant for any app"
- "talk to your Mac out loud AI"
- "best AI tutor for Blender / Figma / After Effects / Premiere / DaVinci" (one per skill)
- "how to learn [app] faster"
- etc.

### 2.4 🟡 Image optimization [MEDIUM]

**Evidence:** Scene 2/3/4 PNGs are 52-125 KB each. Reasonable. Hero layered PNGs not audited for size. Pencil scenes could be compressed further.

**Fix:** Run `pngquant` / `oxipng` on `public/scenes/*.png` and `public/hero/*.png` during Astro build. Or convert scenes to WebP with `<picture>` fallback. Low priority.

---

## 3. AI SEO / GEO — citation-worthiness

### 3.1 🔴 No schema markup anywhere [CRITICAL for AI citation]

**Evidence:** `Layout.astro` has no `<script type="application/ld+json">` blocks. I'd need Playwright's `document.querySelectorAll('script[type="application/ld+json"]')` to be 100% sure, but the source code has zero JSON-LD.

**Impact:** Google Rich Results, AI Overviews, Perplexity, and ChatGPT-with-search all weight schema-marked content 30–40% higher for citation. Missing schema is the single biggest AI-citation gap right now.

**Fix (add 3 JSON-LD blocks to Layout.astro head):**

**Block 1 — `Organization`:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Skilly",
  "url": "https://tryskilly.app",
  "logo": "https://tryskilly.app/skilly-mark.png",
  "sameAs": [
    "https://x.com/tryskilly",
    "https://github.com/tryskilly/skilly",
    "https://discord.gg/NbRVfUtwfn"
  ],
  "description": "Skilly is a macOS menu-bar AI tutor that watches your screen, hears your voice, answers out loud, and points at exactly what to click."
}
```

**Block 2 — `SoftwareApplication`:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Skilly",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "macOS 14+",
  "offers": {
    "@type": "Offer",
    "price": "19",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "19",
      "priceCurrency": "USD",
      "billingDuration": "P1M"
    }
  },
  "description": "Voice-first AI tutor for every macOS app. Ask out loud, see a live transcript, watch the cursor point at exactly what you need.",
  "softwareVersion": "1.4",
  "downloadUrl": "https://github.com/tryskilly/skilly/releases/latest/download/Skilly.dmg"
}
```

**Block 3 — `FAQPage` (index.astro-level, use your real faqs.ts data):**
```js
// In index.astro frontmatter
import { faqs } from '../data/faqs.ts';
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
  }))
};
// Then render <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
```

This one alone can get Skilly cited in "how does Skilly handle privacy?" type queries via Perplexity/ChatGPT.

### 3.2 🔴 No llms.txt [CRITICAL — see 1.3]

### 3.3 🟡 No /pricing.md for AI agents [HIGH — see 1.4]

### 3.4 🟡 No E-E-A-T signals — no author attribution, no expertise markers [HIGH]

**Evidence:** TrustStrip has a founder initial "M" but no named author, no credentials, no "Built by" link. Per `ai-seo`'s Pillar 2 (Authority), named experts boost citation by 25–30%.

**Fix:** Add to Footer.astro or TrustStrip.astro:
```
Built by Mohamed Saleh Zaied — iOS/macOS engineer,
long-time creative-software user tired of Googling shortcuts.
[X/Twitter] · [GitHub] · [LinkedIn]
```

Even better: add a `/about` page with your full bio + a link from the footer. AI systems crawl About pages specifically when identifying entities.

### 3.5 🟡 No statistics / no cited sources [MEDIUM]

Per the Princeton GEO study cited in `ai-seo`, statistics + citations boost AI visibility by 40%+. Current Skilly page has zero numeric claims with sources.

**Fix (backlog):** Wherever possible, replace vague copy with sourced numbers:
- "3 hours of teaching" — already specific ✓
- "16 languages, 8 voices" — already specific ✓
- "Save 10+ hours per skill vs YouTube tutorials" — needs source or user testimonial
- "Works on any macOS app" — add a count later ("tested on 47 apps")

### 3.6 🟢 Content structure for extraction [OK]

**Evidence:** FAQ section with clear Q&A blocks ✓. How-it-works with numbered steps ✓. Features in bento grid with clear H3 headings ✓. Comparison-ready skill card format ✓.

This is actually the strongest part of Skilly's AI-citation readiness — the content is well-structured for passage extraction. Just missing the schema wrapper.

---

## 4. CRO / conversion — unresolved from earlier reviews

### 4.1 🟡 No testimonials / social proof [HIGH, pre-launch known]

Already flagged in `docs/2026-04-16-copy-review-v2.md`. Still pending. After first 20-30 beta users, collect quotes and add a testimonials row between HowItWorks and Skills sections.

### 4.2 🟡 SocialProof counter stuck at "Be one of the first" [OK for now]

The `earlyAccessCount = 0` placeholder in `SocialProof.astro` correctly flips to the exclusivity frame. When the real number crosses 50, swap to the counter. No fix needed yet.

### 4.3 🟡 No exit-intent popup / email capture [MEDIUM, debatable]

CRO tradeoff. Popups convert well but hurt UX. `popup-cro` skill would have more here. Skipping for v1.

### 4.4 🟢 CTAs repeated at decision points [OK]

Nav / hero / SocialProof band / CTABand (after how-it-works) / Pricing / final CTA. ✅

---

## 5. Pricing section — from `pricing-strategy`

### 5.1 🟢 Mental accounting reframe present [OK]

`$0.63/day — less than a coffee` renders. ✓

### 5.2 🟢 Guarantees row present [OK]

"No card needed / Cancel anytime / Beta price locked for life" — all consistent with data in `tiers.ts`. ✓

### 5.3 🟢 Single-tier defensible for beta [OK]

Per the user's explicit direction (no annual until post-beta), the single-tier is the correct stance.

### 5.4 🟡 No anchor reference [MEDIUM]

Per `pricing-strategy` anchoring best practice, showing a higher-priced anchor (enterprise "contact us" tier, or a comparison like "less than one human lesson") makes $19 feel cheap. Current pricing card has no anchor — it's just $19 in isolation.

**Fix (optional):** Add one line in the Pricing card:
```
Compared to ~$80/hr for a private Figma tutor — one month of Skilly
costs less than 15 minutes with a human.
```

---

## 6. Copy review — Seven Sweeps (final state)

### 6.1 🟢 Headline is outcome-focused [OK]

"Stop hunting through menus. Just ask out loud." — strong loss frame + action. ✓

### 6.2 🟢 Voice consistent throughout [OK]

Warm, direct, confident, no jargon. Consistent DM Sans display + JetBrains Mono labels. ✓

### 6.3 🟢 So What test — every claim delivers benefit [OK]

Post-refactor all bento cells have 1 title + 2-line benefit description. ✓

### 6.4 🟡 Prove It — unsourced claims [MEDIUM, overlap with 3.5]

"Built on OpenAI Realtime" is verifiable via GitHub. "Zero retention" is a policy claim with no attestation. "No audio / screens / prompts recorded" is similar. Adding a link to the privacy policy near these claims makes them more citable.

### 6.5 🟢 Specificity [OK]

$19, 15 minutes, 3 hours, 16 languages, 8 voices, 5 skills — all specific. ✓

### 6.6 🟢 Emotion [OK]

Loss frame in final CTA + TrustStrip founder story + hero pain statement. Three strong emotional beats. ✓

### 6.7 🟢 Zero risk [OK]

"Free 15 min · No card · Cancel anytime" consistently. Orphaned "30-day money-back" was removed earlier. ✓

---

## 7. Analytics & measurement — from `analytics-tracking`

### 7.1 🟢 PostHog identify wired [OK]

`posthog.identify()` in the checkout-success page (via Worker `uid` param) and `posthog.register({source: 'web'})` on init. ✓

### 7.2 🟢 Event taxonomy covers the funnel [OK]

Captured events today:
- `web_cta_download_clicked` (with `location` prop — hero, nav, social_proof_band, after_how_it_works, bottom, pricing)
- `web_waitlist_submitted`
- `web_beta_waitlist_submitted`
- `web_skill_request_submitted`
- `web_nav_link_clicked`
- `web_checkout_completed`
- `$pageview` auto

### 7.3 🟡 No funnel dashboard set up in PostHog [MEDIUM]

**Fix (backlog):** In PostHog, create a funnel: `$pageview` → `web_cta_download_clicked (location=hero)` → `app_opened (macOS app)` → `trial_started` → `trial_first_turn` → `skilly_checkout_started` → `web_checkout_completed`. This gives a single dashboard of the entire web→app→paid journey, now possible because of yesterday's identify wiring.

### 7.4 🟡 No tracking on outbound link click to GitHub Releases [MEDIUM]

**Evidence:** The download button is a direct `<a href="GitHub URL">`. PostHog `capture_pageview: true` does NOT auto-track outbound clicks. The existing `data-ph-event="web_cta_download_clicked"` fires via `posthog-events.ts` delegated handler, so it IS tracked ✓. Verify in PostHog event feed that clicks are landing.

### 7.5 🔴 No GA4 or alternative [LOW if PostHog is enough]

Per `analytics-tracking`, PostHog + GA4 is the typical SaaS stack. If you intentionally skipped GA4 for privacy posture, that's fine and supported by the privacy page. No fix needed.

---

## 8. Third-party presence — `ai-seo` Pillar 3

AI systems cite where you APPEAR, not just your own site. Per `ai-seo`, Wikipedia mentions account for ~7.8% of ChatGPT citations, Reddit for ~1.8%. Current state of Skilly's third-party presence:

| Surface | Status | Action |
|---|---|---|
| **Wikipedia** | No entry | Not ready — wait until you have meaningful coverage in reliable sources (Wikipedia requires notability via 3rd-party mentions) |
| **Product Hunt** | Not launched | **Launch PH when the site is polished** — PH listings get indexed fast and cited by AI Overviews |
| **Reddit (r/MacApps, r/Blender, r/FigmaDesign, etc.)** | No presence | Post authentic showcases after launch; let users discover organically |
| **YouTube** | No channel / videos | Single 90-second demo video would unlock this surface — also ties into the user's stated plan to record a demo |
| **G2, Capterra, TrustRadius** | Not listed | Optional for B2C-ish tool; defer |
| **GitHub (tryskilly/skilly)** | Public repo | ✓ Already linked from site |
| **Discord (discord.gg/NbRVfUtwfn)** | Live | ✓ Already linked from footer |
| **X/Twitter (@tryskilly)** | Account exists | Post regularly — AI citations lean on recent social signal |

**Highest ROI move:** schedule a Product Hunt launch for the polished state (post-audit fixes) and record the demo video you mentioned. PH + YouTube + AI schema = triple citation unlock.

---

## 9. Prioritized action plan

### Critical (ship before any paid promotion) — 1-2 hours work

| # | Item | File | Effort |
|---|---|---|---|
| 1 | Update `Layout.astro` title + meta description defaults | `src/layouts/Layout.astro` | 5 min |
| 2 | Add `/public/robots.txt` | new file | 5 min |
| 3 | Install `@astrojs/sitemap`, add to `astro.config.mjs` | `astro.config.mjs` + `package.json` | 10 min |
| 4 | Add `/public/llms.txt` | new file | 10 min |
| 5 | Add `/public/pricing.md` | new file | 5 min |
| 6 | Add Organization + SoftwareApplication + FAQPage JSON-LD to `Layout.astro` and `index.astro` | edit | 20 min |

### High (ship within the next week)

| # | Item | Effort |
|---|---|---|
| 7 | Record 60-90s demo video, swap hero animation for autoplay video | 2-4 hrs |
| 8 | Write founder `/about` page with bio + credentials | 30 min |
| 9 | Schedule Product Hunt launch for post-audit state | 1 hr prep |
| 10 | Add "Compared to private tutor cost" anchor line to Pricing card | 5 min |
| 11 | Add descriptive alt text to hero PNGs (cursor + blender-window) | 5 min |
| 12 | Create PostHog funnel dashboard covering web → download → app → checkout | 30 min |

### Medium (post-launch, as user signups arrive)

- Collect 3-5 testimonials from first beta users → add between HowItWorks and Skills
- Stand up a `/changelog` route pulling from GitHub Releases so AI sees recent freshness signals
- Add keyword-targeting doc to `docs/` for future SEO work
- Compress hero + scene PNGs with pngquant or convert to WebP

### Low / optional

- GA4 (skip if sticking with PostHog-only per privacy stance)
- Comparison pages (`Skilly vs Warp`, `Skilly vs ChatGPT Desktop`, `Skilly vs Codeium`) — good AI-citation surface but significant content work
- Exit-intent popup (probably not worth UX cost)

---

## 10. Verified OK

Things I checked that **don't need any work** right now:

- ✅ HTTPS + HSTS header
- ✅ Content-Type / UTF-8
- ✅ Canonical link present in `Layout.astro`
- ✅ H1 rendered server-side
- ✅ Bento grid has consistent line-clamp + min-h alignment
- ✅ All scene mockup images have descriptive alt text
- ✅ FAQ top 3 expanded for regret aversion
- ✅ Pricing monthly only, mental-accounting reframe present, guarantees row present
- ✅ CTAs repeated at all decision points (nav / hero / social proof / how-it-works band / pricing / final)
- ✅ PostHog identify wired via Polar checkout-success `uid` param
- ✅ Event taxonomy covers the full web funnel
- ✅ Privacy stance consistent across privacy page, site copy, and Layout.astro (`persistence: 'memory'`, no cookies)
- ✅ Color tokens match `DesignSystem.swift` (gray-900 / amber-500 / blue-500)
- ✅ Simple Icons brand logos in SocialProof and Waitlist (muted gray → brand color on hover)
- ✅ Real Skilly cursor logo path used in Pencil scenes (not an icon-font approximation)

---

## Note on frameworks skipped

- **`schema-markup`** skill — I knew from source inspection that zero schema exists, so I recommended the 3 critical schemas inline without invoking the full skill. If you want detailed templates beyond what I wrote in §3.1, invoke `schema-markup` and it'll produce Article / HowTo / Product / AggregateRating templates.
- **`programmatic-seo`** skill — premature. You don't have enough data or content to benefit from scaled-template pages yet.
- **`competitor-alternatives`** skill — premature. Good to revisit once you have 3-5 named competitors you want to rank against.
- **`site-architecture`** skill — you have one page + privacy + terms. IA is fine.
- **`content-strategy`** skill — defer until post-launch when you know what users ask about.

---

## Closing

**Six critical fixes** cost ~1 hour and unlock Google rich results, AI Overviews citability, and fix the single biggest messaging inconsistency (the stale page title). Those should land before any push for traffic.

Everything else is growth/polish. The redesign itself is in good shape. You do NOT need a copywriting pass or another UX rewrite — you need the metadata layer, the AI-citation surface area, and eventually a demo video + testimonials.

**Do you want me to execute the 6 critical items now as a single follow-up commit?** They're all one-line-to-one-file changes, ~1 hour of work, and they're all blocking real acquisition channels. Say "execute criticals" and I'll batch them into one commit on top of the current `main`.
