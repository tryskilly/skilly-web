# Skilly — GEO Audit Pass 2 (post-critical-fixes)

**Date:** 2026-04-16
**URL:** https://tryskilly.app
**Commit audited:** `b994bd2` (live, Netlify deployment confirmed)
**Business type:** SaaS (macOS desktop app with web-based marketing page)
**Pages analyzed:** 4 routes (/, /privacy, /terms, /checkout-success) + /robots.txt, /llms.txt, /pricing.md, /sitemap-index.xml
**Frameworks:** `geo-audit`, `seo-audit`, `ai-seo`, `page-cro`, `marketing-psychology`, `pricing-strategy`, `copy-editing`

---

## Executive Summary

**Overall GEO Score: 47/100 (Poor)**

This score is appropriate for a pre-launch beta SaaS: the controllable dimensions (Technical GEO, Schema, Citability) average **65/100** thanks to today's critical fixes, while the uncontrollable dimensions (Brand Authority, Platform Presence) are naturally low at **25/100** because no third-party coverage exists yet. E-E-A-T (35/100) is the biggest fixable gap — one `/about` page with a founder bio would move the score meaningfully.

The 6 critical fixes shipped in commit `b994bd2` are all verified live. No regressions detected.

### Score Breakdown

| Category | Score | Weight | Weighted |
|---|---|---|---|
| AI Citability | 65 | 25% | 16.25 |
| Brand Authority | 25 | 20% | 5.00 |
| Content E-E-A-T | 35 | 20% | 7.00 |
| Technical GEO | 70 | 15% | 10.50 |
| Schema & Structured Data | 60 | 10% | 6.00 |
| Platform Optimization | 25 | 10% | 2.50 |
| **Overall GEO Score** | | | **47/100** |

---

## Verified OK (from critical fix deployment)

All 6 items from the first audit now confirmed live:

| Item | Live URL | Status |
|---|---|---|
| `<title>` | tryskilly.app | ✅ "Skilly — Stop hunting through menus. Just ask out loud." |
| `<meta description>` | tryskilly.app | ✅ Universal voice-first copy |
| `/robots.txt` | tryskilly.app/robots.txt | ✅ 200, AI bot allowlist + CCBot block |
| `/sitemap-index.xml` | tryskilly.app/sitemap-index.xml | ✅ 200, references sitemap-0.xml (4 URLs) |
| `/llms.txt` | tryskilly.app/llms.txt | ✅ 200, structured product overview |
| `/pricing.md` | tryskilly.app/pricing.md | ✅ 200, machine-readable pricing |
| JSON-LD Organization | `<script type="application/ld+json">` | ✅ renders correctly |
| JSON-LD SoftwareApplication | `<script type="application/ld+json">` | ✅ renders with Offer/price |
| JSON-LD FAQPage | `<script type="application/ld+json">` | ✅ 12 Q&A pairs from faqs.ts |

---

## New issues found in pass 2

### 🔴 Critical — none

No new critical issues. All prior criticals resolved.

### 🟡 High priority

#### H1. No custom 404 page

**Evidence:** `curl https://tryskilly.app/nonexistent-page-test` → HTTP 404 with Netlify's generic error page. No Skilly branding, no "go home" link, no download CTA.

**Impact:** Users clicking dead links (from old social posts, typos, cached results) hit a blank wall. Missed conversion opportunity. AI crawlers that encounter a 404 see no useful content to index.

**Fix:** Create `src/pages/404.astro` with:
- Skilly logo
- "Page not found" message
- "Go to homepage" button
- Optional download CTA
- Uses the existing `Layout.astro` (gets the correct title/meta/schema)

**Effort:** 15 min.

#### H2. No /about page — biggest E-E-A-T gap

**Evidence:** `ls src/pages/about*` → no file. AI systems (especially Google AI Overviews and Perplexity) heavily weight E-E-A-T signals. A named, credentialed author behind the product is the single biggest trust accelerator.

**Impact:** E-E-A-T score is 35/100 primarily because of anonymous authorship. One `/about` page would push it to ~55.

**Fix:** Create `src/pages/about.astro` with:
- Mohamed Saleh Zaied's name, photo, and bio
- Founder story (why Skilly was built)
- Link to GitHub, X/Twitter, LinkedIn
- Person schema JSON-LD
- "Contact" section (hello@tryskilly.app)

**Effort:** 30 min.

#### H3. Zero security headers

**Evidence:** `curl -I` shows no `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, or `Content-Security-Policy` headers. Only `strict-transport-security` (HSTS) from Netlify's default.

**Impact:** Low direct SEO impact but:
- Google considers site security as a ranking factor
- Some AI systems check security headers as a trust signal
- Missing `X-Frame-Options` allows clickjacking
- Missing `Referrer-Policy` leaks referrer data on outbound clicks

**Fix:** Add a `public/_headers` file (Netlify convention):

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**Effort:** 5 min.

#### H4. OG image may be stale

**Evidence:** `og:image` points to `https://tryskilly.app/og-image.png` which exists on disk (confirmed). But the file was last modified `Apr 8` — before the light-theme redesign. It likely shows the OLD dark-theme Blender-centric branding.

**Impact:** Every social share (X, Discord, Slack, iMessage, LinkedIn) renders this image. If it's off-brand from the current site, it creates a visual disconnect that hurts click-through rates.

**Fix:** Create a new OG image in Pencil (1200×630 per social preview standard) matching the light theme + universal positioning. Export to `public/og-image.png`. Can reuse elements from the existing Scene designs.

**Effort:** 20 min.

### 🟡 Medium priority

#### M1. No "Last updated" date visible on page

**Evidence:** No visible date anywhere on the homepage. Per `ai-seo`, undated content loses to dated content because AI systems weight recency. The meta `<time>` isn't present either.

**Fix:** Add a small "Last updated: April 2026" line in the footer or below the hero. Also add `dateModified` to the SoftwareApplication schema.

**Effort:** 5 min.

#### M2. No HowTo schema for "Three steps. Zero setup."

**Evidence:** The "How it works" section has 3 numbered steps which map perfectly to schema.org `HowTo`. This is a high-value schema for Google Rich Results ("How to use AI to learn software" type queries).

**Fix:** Add a `HowTo` JSON-LD block in `index.astro` via the head slot, built from `steps.ts`:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to use Skilly",
  "step": [
    { "@type": "HowToStep", "name": "Open any app", "text": "..." },
    { "@type": "HowToStep", "name": "Talk to Skilly", "text": "..." },
    { "@type": "HowToStep", "name": "Hear it. See it. Watch the cursor.", "text": "..." }
  ]
}
```

**Effort:** 10 min.

#### M3. No definition block for "What is Skilly?"

**Evidence:** No section on the page directly answers "What is Skilly?" in a self-contained passage. The hero says "Stop hunting through menus" but not "Skilly is [definition]". AI systems answering "What is Skilly?" need a clean, extractable definition block — ideally in the first paragraph visible to crawlers.

**Fix:** Add a visually-hidden-but-crawlable definition early in the page, or reframe the TrustStrip or hero subhead to include a crisp "Skilly is..." sentence:

> "Skilly is a macOS menu-bar AI tutor that watches your screen, answers your voice questions out loud, and physically points at the right UI element with a live transcript beside the cursor."

The `llms.txt` already has this exact sentence — it just needs to also appear in the page body for direct extraction.

**Effort:** 5 min.

#### M4. No Person schema for the founder

**Evidence:** `TrustStrip.astro` mentions "Built by makers" but no named person. No `Person` schema anywhere. Per ai-seo, named authors boost citation by 25-30%.

**Fix:** Add to the `/about` page (if created per H2):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohamed Saleh Zaied",
  "url": "https://tryskilly.app/about",
  "sameAs": ["https://x.com/tryskilly", "https://github.com/engmsaleh"]
}
```

**Effort:** 5 min (included in H2's /about page work).

#### M5. Performance / Core Web Vitals never measured

**Evidence:** No Lighthouse run, no PageSpeed Insights check, no CWV data in this audit. Per `seo-audit`, Google explicitly uses LCP, INP, and CLS as ranking signals.

**Fix:** Run PageSpeed Insights at https://pagespeed.web.dev/?url=https://tryskilly.app and address any red flags. Astro SSG + Tailwind + no third-party JS beyond PostHog = probably very fast, but should be measured and documented.

**Effort:** 10 min to measure, variable to fix if issues found.

#### M6. Accessibility never audited

**Evidence:** No WCAG check performed in this or the prior audit. The bento grid, FAQ accordions, and hero animation all have interaction patterns that may fail keyboard navigation or screen reader tests.

**Fix:** Run Lighthouse accessibility audit or Playwright `page.accessibility.snapshot()`. Address any critical failures (missing ARIA labels, broken focus order, insufficient contrast).

**Effort:** 15-30 min depending on findings.

### 🟢 Low priority

#### L1. No BreadcrumbList schema

Only matters when the site grows beyond 4 routes. Defer.

#### L2. No WebSite + SearchAction schema

Enables Google sitelinks search box. Low priority for a 4-page site.

#### L3. Footer social links could include LinkedIn

Currently: Terms, Privacy, X, GitHub, Discord. LinkedIn company page is missing — important for B2B discovery and AI entity recognition.

#### L4. Sitemap only has 4 URLs

Correct for current site. Will grow automatically when `/about`, `/404`, and blog posts are added.

#### L5. No changelog / release notes page

Freshness signal for AI. Low priority until post-launch.

---

## Category Deep Dives

### AI Citability — 65/100

**Strengths:**
- FAQ section with 12 clear Q&A blocks → directly extractable by AI
- How-it-works with numbered steps → process extraction
- Pricing with specific numbers ($19/month, 3 hours, 15 min trial)
- Features bento with H3 titles that match natural queries ("Sees every monitor", "16 languages, 8 voices")

**Gaps:**
- No comparison content (Skilly vs X) — comparison articles account for ~33% of AI citations
- No original data/statistics with cited sources — statistics boost AI citation by 37-40%
- No self-contained "What is Skilly?" definition block in the page body
- Hero animation PNGs can't be parsed by text-based AI crawlers

**What would move the score to 80+:**
Create 2-3 comparison pages (`/skilly-vs-chatgpt-desktop`, `/skilly-vs-youtube-tutorials`) with structured tables. Add 1-2 cited statistics. Add the definition block.

### Brand Authority — 25/100

**Present:** GitHub, X/Twitter, Discord
**Absent:** Wikipedia, YouTube, Reddit, Product Hunt, G2, Capterra, press coverage, guest posts, podcast appearances

**What would move the score to 50+:**
Product Hunt launch + 1 YouTube demo video + 3-5 authentic Reddit posts in r/MacApps, r/productivity, r/artificial. These are the surfaces AI models crawl most frequently for entity recognition.

### Content E-E-A-T — 35/100

**Experience:** implied by the founder bar ("built by makers") but not demonstrated with real examples/screenshots of the founder USING Skilly

**Expertise:** "Built on OpenAI Realtime" and "macOS native APIs" are authority anchors, but no named expert vouches for the claims

**Authoritativeness:** open-source proxy is a transparency signal; no external citations or reviews yet

**Trustworthiness:** privacy page exists ✓, terms exist ✓, HTTPS + HSTS ✓, "No tracking cookies" + "Zero retention" claims are on-page ✓

**What would move the score to 55+:**
One `/about` page with the founder's name, photo, credentials, and links to GitHub/LinkedIn/X. Add `Person` schema. Add "Last updated: April 2026" to the page.

### Technical GEO — 70/100

**Strong:**
- robots.txt with explicit AI bot allows ✓
- llms.txt comprehensive and well-structured ✓
- Sitemap ✓
- HTTPS + HSTS ✓
- Static HTML (Astro SSG) — perfectly parseable by AI ✓
- Canonical tags ✓
- PostHog in memory mode (no cookies) ✓

**Gaps:**
- No security headers (X-Frame, CSP, Referrer-Policy)
- No custom 404 page
- Core Web Vitals unmeasured
- pricing.md not linked from sitemap (static files aren't auto-included by @astrojs/sitemap — only .astro routes are)

**What would move the score to 85+:**
Add the security headers file, create the 404 page, and run one PageSpeed Insights test.

### Schema & Structured Data — 60/100

**Present (verified live):**
- Organization ✓ (with sameAs → X, GitHub, Discord)
- SoftwareApplication ✓ (with Offer, price, downloadUrl)
- FAQPage ✓ (12 Q&A pairs, auto-generated from faqs.ts)

**Missing:**
- HowTo (for the "Three steps" section)
- Person (for the founder — blocked on /about page)
- BreadcrumbList (low priority for 4-page site)
- WebSite + SearchAction (low priority)
- dateModified on SoftwareApplication (freshness signal)

**What would move the score to 80+:**
Add HowTo schema (10 min) + Person schema (5 min, with /about) + dateModified on SoftwareApplication.

### Platform Optimization — 25/100

**Present:** GitHub ✓, X/Twitter ✓, Discord ✓
**Absent:** YouTube, Product Hunt, Reddit, Wikipedia, LinkedIn, G2/Capterra, Quora, Stack Overflow

**What would move the score to 50+:**
Product Hunt launch (biggest single lift) + 1 YouTube video + Reddit posts. These compound: PH gets indexed fast, YouTube is cited by Google AI Overviews, Reddit is cited by ChatGPT and Perplexity.

---

## Quick wins (implement this week, each under 30 min)

| # | Win | GEO score impact | Effort |
|---|---|---|---|
| 1 | Create `public/_headers` with security headers | Technical +5 | 5 min |
| 2 | Create `src/pages/404.astro` | Technical +3, Citability +2 | 15 min |
| 3 | Add HowTo schema to index.astro | Schema +10 | 10 min |
| 4 | Add "Last updated" date to footer + dateModified to schema | E-E-A-T +5 | 5 min |
| 5 | Add definition block in hero subhead or TrustStrip | Citability +5 | 5 min |

**Projected score after quick wins: ~52/100** (from 47)

## 30-day action plan

### Week 1: Foundation (you + me)
- [ ] Quick wins 1-5 above
- [ ] Create `/about` page with founder bio + Person schema (+8 E-E-A-T)
- [ ] Update OG image to match light theme + universal positioning
- [ ] Run PageSpeed Insights, fix any red flags
- [ ] Run Lighthouse accessibility audit, fix critical failures

### Week 2: Content surfaces (you)
- [ ] Record 60-90s demo video → upload to YouTube
- [ ] Replace hero animation with real video (when ready)
- [ ] Write 1 comparison page: "Skilly vs YouTube tutorials" with structured table
- [ ] Schedule Product Hunt launch for week 3 or 4

### Week 3: Distribution (you)
- [ ] Product Hunt launch → PH listing gets indexed by AI fast
- [ ] Post authentic demos in r/MacApps, r/productivity, r/artificial
- [ ] Create LinkedIn company page for Skilly
- [ ] Share demo video on X with #buildinpublic

### Week 4: Measurement + iteration (you + me)
- [ ] Collect first 5-10 testimonials from beta users
- [ ] Add testimonials section between HowItWorks and Skills
- [ ] Check AI visibility: test top 10 queries across ChatGPT, Perplexity, Google AI Overviews
- [ ] Update this audit with new scores

**Projected score after 30 days: ~65-70/100** (from 47)

---

## Comparison: before and after today's session

| Metric | Before (start of session) | After pass 1 | After pass 2 (now) |
|---|---|---|---|
| Page title | "AI companion for learning creative software" | same (not fixed in pass 1) | ✅ "Stop hunting through menus. Just ask out loud." |
| Meta description | Blender-era copy | same | ✅ Universal voice-first |
| robots.txt | 404 | 404 | ✅ 200, AI bot allowlist |
| sitemap.xml | 404 | 404 | ✅ 200, 4 URLs |
| llms.txt | 404 | 404 | ✅ 200, comprehensive |
| pricing.md | nonexistent | nonexistent | ✅ 200, machine-readable |
| JSON-LD schemas | 0 | 0 | ✅ 3 (Organization, SoftwareApplication, FAQPage) |
| Theme | dark (gray-950) | light (gray-50) | light ✓ |
| Positioning | Blender-centric | universal + voice-first | universal ✓ |
| Nav brand visible | ❌ (white on white) | ✅ fixed | ✅ |
| Bento alignment | inconsistent | line-clamp + min-h | ✅ |
| App mockups | 0 | 3 Pencil scenes | 3 scenes ✓ |
| Brand logos | colored <span> rects | Simple Icons (all 3 sections) | ✓ |
| PostHog identify | ❌ | ✅ (app + web checkout) | ✓ |
| Worker deployed | ❌ (uid missing) | ✅ | ✓ |
| Estimated GEO score | ~20 | ~35 | **47** |

---

## What NOT to do right now

- ❌ Don't pursue comparison pages until post-PH-launch (need traffic before SEO content)
- ❌ Don't add GA4 (PostHog is sufficient, privacy stance is documented)
- ❌ Don't redesign the hero animation (user decision: wait for real video)
- ❌ Don't obsess over the GEO score being 47 — the uncontrollable dimensions (Brand, Platform) will naturally rise with launch activity. The controllable dimensions average 65, which is "Fair" and appropriate for a beta SaaS.
