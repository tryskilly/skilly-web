# SEO backlog

Ranked by **expected signups per hour of work**. Each item has the query, the page, the change, and a one-line rationale. Ship from the top. Move shipped items to `log.md`. Volumes are US monthly searches from OpenSEO; "?" means not measured yet.

Ranking note: items 1–5 come from Skilly Growth (2026-10-29) and rank above the how-to publish queue. The publish routine already has the DaVinci Resolve "add text" page scheduled for Thu 2026-10-29 10:00 Cairo, so it runs on its own schedule (item 0).

## In flight

0. **DaVinci Resolve add text** (2400, KD 0) → `/learn/how-to-add-text-in-davinci-resolve/`. Scheduled publish run Thu 10:00 Cairo, using the Premiere add-text template. *Rationale: the biggest KD-0 query in the map, already scheduled.*
- **`public/pricing.md` fix** (Houdini missing from the skills list; BYOK line missing): in progress since 2026-10-29. *Rationale: AI agents read pricing.md, so wrong facts there spread into AI answers.*
- **WebMCP tools PR** (get_pricing, get_download_link, list_supported_apps, join_waitlist): in progress since 2026-10-29. *Rationale: the agent-readiness scan failed this check. Small and factual.*

## Ranked queue

1. **`/learn/skilly-openai-key-setup/`**: BYOK setup ($5/month plus your OpenAI usage, never free) plus the fix for the "no credits remaining" error. Offer hosted $19/month as the zero-setup option. *Rationale: Growth reports 83 first-answer failures from this error. Fixing activation beats any new traffic.* Facts: Settings → Account → API Key (`src/data/faqs.ts`). Confirm the exact error text in the product repo (`leanring-buddy/OpenAIRealtimeClient.swift` handles `insufficient_quota`) before quoting it.
2. **HTML `/pricing/` page** that reuses only the existing trial line from `src/data/trial-terms.ts` and the tiers in `src/data/tiers.ts`, with no new pricing copy. *Rationale: "skilly pricing" style queries currently land on an anchor or `pricing.md`. A real page converts and gives "price" queries a target.* Pricing-adjacent, so reuse the existing strings exactly.
3. **Pendo pricing** (210, KD 2) and **WalkMe pricing** (50, KD 0) explainers → `/learn/pendo-pricing/`, `/learn/walkme-pricing/` (proposed slugs). Each ends with Skilly Builders as the self-serve option. Cite only public competitor prices with an "as of" date. If a price is quote-only, say so. *Rationale: low KD, buyers close to a decision, and they reuse /vs/pendo and /vs/walkme research.*
4. **"Digital adoption platform"** (480, KD 15, CPC $225) → `/for/digital-adoption-platform/` (proposed). Frame Skilly as a light, one-script-tag option for your own web app, not a full DAP. *Rationale: very high-value B2B query; an honest "light alternative" angle can rank without overclaiming.*
   - **Blocker check (2026-10-29): VERIFIED, unblocked.** A web-app embed exists. github.com/tryskilly/skilly `sdk/web/README.md` documents `@skilly/web`, an "embeddable Skilly companion for websites" with status "live embed", installed with `<script src="https://cdn.tryskilly.app/web/v1.js" data-skilly-key="pk_live_..." data-skilly-skill="..." defer>`. `public/products/skilly-builders.md` says "Installation: One script tag", and https://tryskilly.app/builders/ sells it (Builders plans in `public/pricing.md`). Don't claim DAP features such as analytics dashboards, segmentation, or desktop/Electron coverage unless you verify them in the same sources.
5. **L&D / employee software training** (390, KD 13) → `/use-cases/employee-software-training/` (proposed). Limit it to **internal web apps the team controls**, because the embed needs the site owner to install the script tag. *Rationale: the same verified embed opens a second B2B buyer.* Blocker check: same finding as item 4, unblocked for team-owned web apps only. Never imply it works inside third-party SaaS (Salesforce, Workday) or desktop apps. For those, the Mac app or browser extension is the honest answer, and it's per user.
6. **Money keyword `clicky alternative` → `/vs/clicky/` on-page pass** (blitz-seo step 2). Answer "best Clicky alternative for Mac" in the first two sentences. Retitle to something like "Clicky Alternative for Mac: Skilly vs Clicky (2026)". Disambiguate from clicky.com analytics. Keep the comparison fair, with sources and "as of" dates. *Rationale: AI Overviews already cites us for this query, buyer intent is the highest we have, and the page is already indexed.*
7. **Internal-link plan for the money keyword** (about 30 minutes total, one link each, descriptive anchors). *Rationale: the cheapest ranking lever; it concentrates existing authority on the money page.*
   - L1 `/learn/ai-tutor-that-sees-your-screen/` → `/vs/clicky/`, anchor "Clicky alternative for Mac"
   - L2 `/learn/best-voice-ai-assistant-mac-2026/` → `/vs/clicky/`, anchor "Skilly vs Clicky"
   - L3 `/learn/chatgpt-screen-sharing-mac/` → `/vs/clicky/`, anchor "Clicky alternatives that point at the screen"
   - L4 `/vs/cluely/` → `/vs/clicky/`, anchor "Skilly vs Clicky"
   - L5 `/learn/is-it-safe-to-let-ai-see-your-screen/` → `/vs/clicky/`, anchor "how Skilly differs from Clicky"
   - L6 `/vs/` hub: make the existing link's anchor "Clicky alternative" if it's generic
8. **Measure the money keyword** (one paid call, about $0.10–0.50 from the $10/week budget): run `get_keyword_metrics` on clicky alternative, heyclicky alternative, ai tutor for mac, ai that can see your screen mac, and chatgpt screen share mac alternative. *Rationale: confirms the Blitz pick before 30 days of effort. If volume is negligible, switch to the runner-up `/learn/ai-tutor-that-sees-your-screen/`.*
9. **Refresh `/learn/enable-screen-recording-permission-macos/`** with blog-refresher phases 1–4. Answer in the first two sentences, rewrite the title and description for CTR, and check the CTA. *Rationale: 15,957 impressions at 0.2% CTR (GSC Jul–Oct). A CTR lift on existing impressions is the fastest traffic win.*
10. **Premiere Pro keyboard shortcuts** (1300, KD 0) → `/learn/premiere-pro-keyboard-shortcuts/`, using the add-text template with Mac keys and a version stamp. *Rationale: Growth's next pick, KD 0, and a reusable template.*
11. **Premiere Pro crop video** (1600, KD 0) → `/learn/how-to-crop-video-in-premiere-pro/`. *Rationale: the largest remaining KD-0 how-to.*
12. **Premiere Pro speed up video** (1300, KD 0) → `/learn/how-to-speed-up-video-in-premiere-pro/`. *Rationale: KD 0 and the same template.*
13. **Premiere Pro add captions** (1300, KD 4) → `/learn/how-to-add-captions-in-premiere-pro/`. *Rationale: high volume, low KD.*
14. **Title, H1 and meta audit** with seo-title-optimization across `/learn/`, `/vs/` and the money pages. Output a before/after table and fix titles that lack the primary query, run past 55 characters before the key words, or are vague (for example "(beginner guide)" titles that hide the query). Start with pages that have impressions. *Rationale: titles are a high-leverage CTR fix across about 90 pages, and one batch PR covers them.*
15. **Blender render** (880, KD 3) and **Blender UV unwrap** (880, KD 9). Check overlap with `/learn/blender-lighting-and-rendering/` first, so there's one page per query. *Rationale: solid volume and low KD.*
16. **Blender separate objects** (720, KD 0) and **Blender join objects** (480, KD 0) as two pages that link to each other. *Rationale: KD 0 and paired intent.*
17. **DaVinci crop** (390, KD 0) and **Figma mask** (170, KD 0). *Rationale: small, but KD 0 and quick with the template.*
18. **Issue #34: download attribution.** Product and analytics scope, so track it and don't fix it here. *Rationale: without attribution we can't credit signups to SEO pages, which this whole ranking depends on.*
19. **Issue #35: Figma auto-layout canonical** (`/learn/figma-auto-layout/` vs `/learn/figma-auto-layout-tutorial/`). *Rationale: two pages chasing one query split ranking signals.*
20. **Skill-count copy conflict** ("5 skills" in `tiers.ts`, `faqs.ts`, `Hero.astro`, `pricing.md` vs six in `skills/`; Houdini isn't in the app bundle folder). Ask Mohamed which is true, then fix it everywhere. *Rationale: inconsistent facts confuse AI answers. It's pricing-adjacent copy, so confirm first.*
21. **Roundup pitches**, drafted by Skilly Growth, not by SEO (list in `/workspace/seo-research/roundups-2026-10-28.md`; priority A: usecarly, ac0.ai, crodo, duckyhelper, shadow.do, blendermcp.org, tryharness). SEO supplies the facts and URLs; nothing gets sent without Mohamed's approval. *Rationale: the pages AI engines cite are where Skilly needs to appear. Acceptance odds are lower on competitor-owned blogs.*
22. **Firsthand comparison: Skilly vs ChatGPT screen share vs Gemini Live** → `/vs/chatgpt/` and a refresh of `/vs/gemini-live/`. **BLOCKED until Mohamed's Mac recordings arrive.** *Rationale: firsthand evidence is the one thing competitors' pages can't copy. ChatGPT appears in 30 of 40 AI answers.*

## Rules for this queue

- Every new page gets links from three or more existing pages on ship day, plus a title, description, canonical, sitemap entry and structured data.
- One page per query. Check `keyword-map.csv` before creating a page.
- No doorway or mass programmatic pages: B2B pages (3–5) are individually written, with one page per real buyer query.
