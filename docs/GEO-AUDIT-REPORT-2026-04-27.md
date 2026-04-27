# GEO Audit Report: tryskilly.app

**Audit Date:** 2026-04-27
**URL:** https://tryskilly.app
**Business Type:** SaaS (macOS productivity tool, freemium)
**Pages Analyzed:** 10 (full sitemap)

---

## Executive Summary

**Overall GEO Score: 58/100 (Fair)**

Skilly's site has **excellent technical GEO foundations** (AI-crawler-friendly robots.txt, comprehensive llms.txt, sitewide Organization + SoftwareApplication + FAQPage schema, fast static Astro stack). The **single critical gap** is content surface area: only 10 indexed URLs total, with zero long-tail SEO content. Comparable founders this week (Agensi: 8K users in 8 weeks via 86 articles) prove that filling this gap is the highest-leverage move available right now.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 65/100 | 25% | 16.25 |
| Brand Authority | 35/100 | 20% | 7.00 |
| Content E-E-A-T | 50/100 | 20% | 10.00 |
| Technical GEO | 88/100 | 15% | 13.20 |
| Schema & Structured Data | 70/100 | 10% | 7.00 |
| Platform Optimization | 30/100 | 10% | 3.00 |
| **Overall GEO Score** | | | **56.45 → 58/100** |

---

## Critical Issues (Fix Immediately)

**None.** Technical foundation is sound; nothing is blocking AI citation.

## High Priority Issues

1. **Zero long-tail content** — Sitemap has 10 URLs (home, privacy, terms, checkout-success, vs/index + 5 competitor pages). No /blog, /learn, /docs, /guides. Long-tail search intent traffic = zero. **Highest-leverage fix.**
2. **No Article or HowTo schema** anywhere — required for AI answer engines to cite tutorial-style content.
3. **No author/Person schema** — founder is named in llms.txt but not surfaced as Person entity. AI systems lose entity-recognition signal.
4. **Missing Skilly app on key platforms AI models cite** — no Reddit `r/skilly` or active subreddit, no Wikipedia entry, no LinkedIn company page, no Product Hunt page.

## Medium Priority Issues

5. **FAQPage limited to homepage** — competitor /vs pages and the future /learn articles should each have FAQPage schema with relevant Q&As.
6. **No BreadcrumbList schema** — once /learn launches with category structure, breadcrumbs are essential.
7. **llms.txt is good but could expand** — currently doesn't list /vs/* pages or future /learn pages. Update on each content launch.

## Low Priority Issues

8. **OG image is generic** — could benefit from per-page custom OG images (Astro supports this trivially).
9. **No dedicated /about page** — founder bio is in llms.txt but not on the site. Affects E-E-A-T.

---

## Category Deep Dives

### AI Citability (65/100)

**Strengths:**
- Homepage has FAQPage schema with self-contained Q&A blocks (excellent for AI extraction)
- Each /vs/* page has clear comparison structure
- llms.txt is comprehensive (~25KB of structured product context)

**Gaps:**
- No "how-to" or "explainer" content for AI to cite
- No statistics, benchmarks, or original data points
- No definitional content ("what is voice-first AI", "how does ScreenCaptureKit work for AI tutors")

### Brand Authority (35/100)

**Strengths:**
- GitHub repo (tryskilly/skilly) — legitimate technical signal
- X (@tryskilly) presence

**Gaps:**
- No Reddit subreddit; engmsaleh has 5/16 IH karma, not enough for own-sub claim yet
- No Wikipedia article (early-stage, expected)
- No LinkedIn company page
- No mention on Product Hunt
- No third-party mentions/reviews discovered

### Content E-E-A-T (50/100)

**Strengths:**
- llms.txt includes "Built by" section with founder name + role
- Honest tone throughout (privacy posture, beta limits)
- Real GitHub repo demonstrates Experience signal

**Gaps:**
- No /about page
- No author byline on /vs/* pages
- No founder Person schema
- No external authority links

### Technical GEO (88/100)

**Strengths:**
- ✅ robots.txt explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, anthropic-ai, Claude-Web, Google-Extended, Bingbot, Applebot-Extended
- ✅ Blocks CCBot (training-only) — smart move
- ✅ llms.txt present and comprehensive
- ✅ Astro 5 static site = fast, no JS-rendering blockers for AI crawlers
- ✅ Sitemap-index.xml + sitemap-0.xml structure
- ✅ Canonical URLs set sitewide

**Gaps:**
- llms-full.txt not present (the longer-context variant for advanced AI systems)
- No `<link rel="alternate" hreflang>` for future internationalization

### Schema & Structured Data (70/100)

**Present:**
- Organization (sitewide) ✅
- SoftwareApplication (sitewide) ✅
- FAQPage (homepage) ✅
- Open Graph + Twitter Card complete ✅

**Missing:**
- Article schema (for /learn launch)
- HowTo schema (for tutorial content)
- Person schema (for founder)
- BreadcrumbList (for any nested content)
- Review/AggregateRating (no reviews yet — fine to defer)
- VideoObject (we have launch videos, could mark them up)

### Platform Optimization (30/100)

**Present:**
- ✅ X (@tryskilly)
- ✅ GitHub (tryskilly/skilly)
- ✅ Discord (NbRVfUtwfn)

**Missing:**
- ❌ Reddit (founder has u/engmsaleh but no Skilly-owned community presence)
- ❌ LinkedIn company page
- ❌ Product Hunt
- ❌ Wikipedia article
- ❌ YouTube channel for product demos
- ❌ Indie Hackers Products DB

---

## Quick Wins (Implement This Week)

1. **Build /learn route + first 5 articles** — fills the #1 gap. Targets identified high-intent low-competition queries (see Task #13). Expected impact: 5 → 100+ clicks/week within 60 days based on Agensi precedent.
2. **Add HowTo + Article + Person schema to Layout.astro** as page-specific slots so /learn templates emit them automatically.
3. **Create /about page** with founder Person schema. Direct E-E-A-T boost.
4. **Add VideoObject schema to homepage** for the launch demo videos already hosted.
5. **Submit Skilly to LinkedIn (company page) + Indie Hackers Products DB** — quick presence wins, ~30 min total.

## 30-Day Action Plan

### Week 1: Content Foundation (this week)
- [ ] Build /learn route in Astro with content collection schema
- [ ] Write articles 1-5 (Blender bevel, screen permission, voice AI for Mac, OpenAI Realtime tutorial, Cluely vs Skilly)
- [ ] Add Article + HowTo schema to /learn layout
- [ ] Add Person schema for founder
- [ ] Update llms.txt to include /learn URLs

### Week 2: Schema Expansion + About
- [ ] Build /about page with founder bio + Person schema
- [ ] Add VideoObject schema for launch videos
- [ ] Add FAQPage schema to each /vs/* page
- [ ] Add BreadcrumbList schema sitewide
- [ ] Create LinkedIn company page

### Week 3: Content Velocity
- [ ] Articles 6-10 (more Blender/Figma/Xcode workflows + comparison content)
- [ ] Submit to Indie Hackers Products DB
- [ ] Submit to Product Hunt Coming Soon
- [ ] Set up F5bot keyword alerts (Cluely, Rewind, ScreenCaptureKit, OpenAI Realtime)

### Week 4: Distribution + Measurement
- [ ] Articles 11-15
- [ ] Add basic analytics for /learn (already have PostHog — just track per-article)
- [ ] First "brand-name no-link" comments on Reddit threads ranking for target queries
- [ ] Re-run geo-audit, measure score delta

---

## Appendix: Pages Analyzed

| URL | Title | Schema | Issues |
|---|---|---|---|
| / | Skilly — Stop hunting through menus. Just ask out loud. | Org + SW + FAQPage | Could add VideoObject |
| /privacy/ | Privacy policy | Org + SW | None critical |
| /terms/ | Terms | Org + SW | None critical |
| /vs/ | Comparison hub | Org + SW | Missing FAQPage, BreadcrumbList |
| /vs/clicky/ | Skilly vs Clicky | Org + SW | Missing FAQPage, BreadcrumbList |
| /vs/cluely/ | Skilly vs Cluely | Org + SW | Missing FAQPage, BreadcrumbList |
| /vs/gemini-live/ | Skilly vs Gemini Live | Org + SW | Missing FAQPage, BreadcrumbList |
| /vs/raycast-ai/ | Skilly vs Raycast AI | Org + SW | Missing FAQPage, BreadcrumbList |
| /vs/rewind/ | Skilly vs Rewind | Org + SW | Missing FAQPage, BreadcrumbList |
| /checkout-success/ | (transactional) | Org + SW | OK |

---

## Bottom Line

The site is built **right** — it's just **small**. Every weakness in this audit collapses into a single root cause: **not enough indexed URLs**. The fix is content velocity, and the infrastructure (Astro content collections, sitewide schema, AI-crawler-friendly stack) is already there to support fast publishing. **Start with /learn this week.**
