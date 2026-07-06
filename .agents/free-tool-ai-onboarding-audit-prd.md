# PRD — "Can AI Explain Your Product?" (Free AI Onboarding Audit)

*Skilly's first free traffic tool. Drafted 2026-06-30. Aligned to Hybrid positioning (new way vs old way) — see memory feedback_skilly_builders_positioning.*

## One-liner
Paste your product URL → we crawl your public site + docs, run one LLM pass, and return a free **AI-readiness / onboarding score**: can an AI assistant actually guide a new user through your product from your public content? Plus the gaps, the questions users ask that your content leaves dead, a suggested first-run path, and a generated Skilly voice-guide script + `SKILL.md` preview. CTA: *"This is what Skilly reads when it teaches your guide → Open Studio."*

## Why this tool (vs alternatives)
- **Nearly free to build** — reuses the **Studio crawl + skill-drafting LLM call** already written for project creation. The tool is a thin, no-auth wrapper + a scoring rubric + a share-card renderer.
- **Abuse-resistant + cheap to run** — the free output is **text** (score + checklist + script). **Voice is the upsell, not the giveaway** (a "hear Skilly explain your site" demo is the gated, rate-limited *second click*, not the open front door).
- **Identical ICP, not adjacent** — every SaaS owner in 2026 is anxious about whether AI can represent their product; that's the same person who buys Skilly for Builders. Ties directly to the GEO/AEO theme.
- **Programmatic-SEO multiplier, not a one-off** — every analyzed site gets a permanent shareable page (`/audit/<slug>`) + an OG image showing the score. Self-replicating content engine (the HubSpot Website Grader model). Slots next to the existing `/learn` + `/vs` clusters.

## MVP scope
**Inputs** (no signup): website URL · (optional) activation goal [connect data / create first project / invite teammate / publish first page] · (optional) product type · (optional) docs URL · email optional, never required before value.

**Output (text, free):**
1. **AI-readiness score** /100 (composite) + sub-scores (rubric below).
2. **Top 5 questions a confused new user asks** — flagged answered ✓ vs dead ✗ from public content.
3. **Specific gaps** — concrete, e.g. "your pricing page never says what happens after the trial."
4. **Suggested first-run path** — Step 1 → 2 → 3 to activation.
5. **Generated Skilly voice-guide script** — e.g. *user asks "where do I start?" → Skilly: "Click Connect Data, top-left," then points.*
6. **`SKILL.md` preview** — the conversion bridge (Studio already drafts skills from URLs/docs).
7. **CTA** → "Preview this as a live Skilly guide" → Studio, **prefilled with the generated skill** (reduce time-to-first-demo).

## Scoring rubric (0–100 composite, 5 dimensions × 20)
- **Activation clarity** — is the path to first value obvious from public content?
- **CTA clarity** — is the single most important next action unambiguous?
- **Help availability** — is contextual help reachable in-product (vs docs hidden offsite)?
- **Docs friction** — are docs structured/answer real "how do I…" questions, or buried/marketing-only?
- **AI-guidability** — can an AI assistant infer the steps to guide a user from the content alone? (the GEO/AEO axis)
Each scored by the LLM pass against the crawled content with a 1-line justification; composite = sum. Band labels: 0–40 "users will get stuck," 41–70 "needs work," 71–100 "AI-ready."

## Virality / share loop (the compounding part)
- Every audit → a permanent **public page** `tryskilly.app/audit/<slug>` (e.g. `/audit/linear-app`) with the score, first-run path, gaps, and a **"Generated with Skilly"** badge.
- **OG share card** renders the score big ("Acme scored 71/100 — AI-ready") → founders share "my number" on X/Slack. Spec: 1200×630, score dial + product name + Skilly mark + one-line band label.
- Not spammy: noindex thin/duplicate, only index pages with real content; allow site owners to claim/remove.

## SEO page cluster (programmatic, same engine)
| Page | Intent | CTA |
|---|---|---|
| `/tools/ai-onboarding-audit` (main) | "can AI explain / why aren't users activating" | Run audit |
| `/tools/product-tour-script-generator` | "I need onboarding copy" | Turn script into a Skilly guide |
| `/tools/user-onboarding-checklist` | "onboarding checklist" | Audit my app |
| `/tools/in-app-help-generator` | "contextual in-app help" | Create voice guide |
| `/tools/ai-product-tour-generator` | "AI product tour / onboarding" | Preview with Skilly |
Link the tool from the ranking `/learn` + `/vs` pages.

## Conversion path (value before signup)
SEO/social → enter URL → real audit (text) → see generated guide + SKILL.md → "Preview on my site" → *then* signup/Studio, prefilled with the generated skill.

## Tech approach
- Reuse Studio's crawler + skill-drafting LLM. Free tool = no-auth endpoint: crawl (cap pages) → 1 LLM pass with the rubric+extraction prompt → render result + persist share page + OG card.
- **Cost/abuse controls:** text-only free output; per-IP + per-domain rate limits; cache by domain; cap crawl depth; CAPTCHA only if abused; voice demo = separate gated/rate-limited second click.

## Distribution (a free tool with no distribution gets no traffic)
- **Build-in-public the build itself** on X (@moelabs_dev) — ties to the new BiP habit.
- **Run it live, publicly, on well-known SaaS sites** (Linear, Notion, etc.) so people want to see their own number.
- Seed from `/learn` + `/vs` (already indexing) + relevant Reddit threads.

## Phasing
1. **MVP**: main `/tools/ai-onboarding-audit` page + engine + result + Studio-prefill CTA (no share pages yet).
2. **Share pages + OG cards** (`/audit/<slug>`) — the viral layer.
3. **`/tools/*` cluster** — programmatic SEO siblings.
4. **Gated voice demo** ("hear Skilly explain your site") as the second click.

## Risks
- Engineering effort (real build, not a directory). Mitigate by reusing Studio code.
- Quality bar: a thin/gimmicky audit won't earn links — the LLM output must be genuinely sharp + specific.
- LLM cost on anonymous traffic — mitigated by text-only + caching + rate limits.

## Secondary tool ideas (portfolio, not first)
- **OpenAI Realtime cost calculator** (dev traffic; Skilly uses Realtime GA + BYOK) — low effort, medium conversion.
- **llms.txt generator/checker** — cheapest, evergreen SEO, dead-on ICP, but lower conversion (doesn't show what Skilly does). Good side magnet.
- **macOS permissions troubleshooter** (Skilly for People; existing /learn permission guides) — converts existing Mac users.
