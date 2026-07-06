# Skilly Marketing Platform Scorecard

A reusable "scale" for every channel we run — so for any future product we already know each platform's value, effort, rules, and what's worked. Ratings are 1–5 (5 = best). Updated 2026-06-28.

**Legend:** Value = realistic upside for an early Mac/dev SaaS · Effort = ongoing time cost · Speed = how fast results show · Status = where we are today.

| Platform | Value | Effort | Speed | Status | One-line verdict |
|---|---|---|---|---|---|
| X reply-guy (@moelabs_dev) | 4 | 3 | Fast | Active daily | Best converter we have; conversions come from engage-back, not the first reply |
| Reddit (value comments) | 4 | 4 | Med | Warm-up mode | High intent but heavily throttled/rule-bound; read rules first, ≤2 posts/24h |
| /learn SEO + /vs GEO pages | 5 | 3 | Slow (3–6mo) | Building | Compounding engine; GEO/curation is the fast lane, classic SEO is slow |
| HackerNoon backlink | 3 | 2 | Med | Draft in progress | DR~87 dofollow; one-off per good technical article, not recurring |
| Directories (BetaList/TAAFT/etc.) | 2 | 2 | Slow | Mostly done | One-time submits; weak links but cheap; AlternativeTo/SaaSHub still net-new |
| Product Hunt / Show HN | 4 | 4 | Spike | Planned | Big one-day spike + backlinks; high prep, non-repeatable |
| Email (Resend, recovery/warm) | 4 | 2 | Fast | Active | Highest intent of all; only works at our small scale because list is tiny |
| Setapp / Mac roundups (DF, MacStories) | 3 | 3 | Slow | Pitched | Credibility + distribution if accepted; gatekept, low hit rate |
| Awesome lists (GitHub) | 2 | 2 | Slow | Done | Niche dev backlinks; some maintainers are anti-AI (pre-check) |

## Per-platform notes (rules + what works)

### X reply-guy — Value 4 / Effort 3
- **Cap:** ~8 tailored posts/day on the single account; more risks shadowban. Space 5+ min apart.
- **What converts:** the engage-back loop (reply to everyone who engages today) — not the broadcast. Recovered critics + warm replies use NO link/pitch.
- **Tooling:** `scripts/x/` (discover → draft → dashboard → post_reply.py). Use `Input.insertText` + `tweetButtonInline`. UTM: `utm_medium=social`.
- **Gotcha:** put high-priority queries first (tail gets rate-limited); cooldown 30 days/author.

### Reddit — Value 4 / Effort 4
- **Rules first, always** — per-sub removal is brutal; some subs auto-mod AI/low-effort (skip r/SaaS, r/SideProject throttles us).
- **Cap:** account-wide ~2 successful comments/24h; use dev megathreads where Rule 12 exists.
- **Voice:** shorter, proper punctuation; no top-level promo on other apps' threads.

### /learn SEO + /vs GEO — Value 5 / Effort 3
- **Fast lane = GEO/curation** content engineered for ChatGPT/Perplexity citation (listicles, comparisons). Classic Google ranking is slow + backlink-gated.
- **Pattern:** apps×tasks (consumer) + Alternatives/Integrations/Personas/Glossary (Builders). Verify indexing before mass-generating (needs GSC, task #59).
- **Tooling:** Astro content collection (`src/content/learn`) + hand-built `/vs/*.astro`. Title ≤70, description ≤170 chars.

### HackerNoon — Value 3 / Effort 2
- DR~87 dofollow, ~1.45M/mo. **Image-only uploads; video embeds by URL only.** 500+ word technical article, 1 backlink + internal HN links required for approval.
- Repeatable only as fast as you can write genuinely technical posts.

### Backlinks (general) — the "5 that matter" rule
- Quality > quantity. Worth chasing: Show HN, Product Hunt, real tool roundups, integration-partner pages, HackerNoon, AlternativeTo/SaaSHub. Skip free-directory link lists.

## How to use this for the next product
1. Start with the **fast levers** (X reply-guy + email + a GEO curation page).
2. Build the **compounding engine** in parallel (SEO/GEO pages) — it pays off month 3+.
3. Bank **a few quality backlinks** (HackerNoon, PH/Show HN, AlternativeTo).
4. Treat Reddit as high-skill/high-risk — rules first, low volume.
5. Re-rate this table per product; the ratings above are tuned to a Mac/dev-tool SaaS.
