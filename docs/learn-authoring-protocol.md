# /learn Article Authoring Protocol

**TL;DR:** Never write from training data alone. Research the live sources first, every time.

This protocol is mandatory for every article published to `tryskilly.app/learn/`. The reason: training data (cutoff Jan 2026) lags real-world software. Cluely's pricing, OpenAI Realtime's API surface, Blender's UI, macOS permission flows — these all change every few weeks. A single wrong number ("Cluely costs $20/month" when it's now $35) makes the whole article look unreliable, which kills both human trust AND AI citation likelihood.

## The 4-step research workflow

Before drafting **any** article in `src/content/learn/`, complete these in order.

### 1. SERP recon — what does Google rank for this query right now?

Use `WebSearch` (or `Skill` → `seo-audit` → SERP analysis) for the exact target keyword the article will own. Capture:

- Top 5 results' titles, URLs, and angle (definitional? listicle? tutorial?)
- People-Also-Ask box questions (these are FAQ schema gold)
- Featured snippet (if any) — what format won?
- Search intent inferred from results (informational? commercial? navigational?)

This determines structure and depth. Don't try to outrank a 5,000-word listicle with a 600-word definition.

### 2. Authoritative source pull — what do the docs actually say today?

For each tool, API, or product the article references, fetch the **canonical, official source** and confirm specifics. Use `WebFetch` for clean retrieval.

| Topic | Canonical source | What to verify |
|---|---|---|
| OpenAI Realtime | platform.openai.com/docs/guides/realtime | Current model names, voice options, pricing per minute, supported audio formats |
| ScreenCaptureKit | developer.apple.com/documentation/screencapturekit | Current API names, deprecations, macOS version availability |
| Blender | docs.blender.org/manual/en/latest/ | Current UI labels, shortcut keys, modifier names (Blender 5.1 as of 2026-04-27 — major UI changes vs 3.x and 4.x; always re-verify) |
| Cluely | cluely.com (homepage + pricing) | Current price, positioning, feature list |
| Rewind | rewind.ai | Same as Cluely |
| Raycast AI | raycast.com/ai | Plan tiers, model availability |
| Gemini Live | ai.google.dev / gemini.google.com | Current capability + pricing |
| Apple Intelligence | apple.com/apple-intelligence | Current macOS support, language coverage |

If the canonical source contradicts your draft — fix the draft. Never the other direction.

### 3. Version-stamp every fact

Inside the article markdown, when stating any version-sensitive fact, include the date you verified it. Example:

```markdown
> Cluely's standard plan is $25/month (verified 2026-04-27 at cluely.com/pricing).
```

This:
- Forces you to check before writing
- Lets readers know how fresh the comparison is
- Helps AI citation engines weight the article higher (date-stamped facts > undated claims)

### 4. Update the article when sources change

When a major source we cite changes (e.g., Cluely changes pricing), update the article and bump `updatedDate` in frontmatter. Schedule a quarterly sweep — every Q1/Q2/Q3/Q4 re-verify pricing and feature claims for /vs/* and /learn/* articles.

## What you can safely write from training data

Anything **conceptual** that doesn't depend on current API surface or vendor specifics:

- "What is voice-first AI?" — concept, evergreen
- "How screen-aware AI assistants work conceptually" — architecture-level
- "Why low-latency matters for voice tutors" — UX principle

What you **cannot** write from training data:

- Any version number, model name, pricing, or feature claim about a third-party tool
- Any specific menu/UI step in a frequently-updated app (Blender 4.x ≠ Blender 3.x)
- Any benchmark or stat without a primary source link

## Skilly-specific tone requirements

- First-person where it adds authority ("we built Skilly on OpenAI Realtime, here's what we learned" beats "OpenAI Realtime is...")
- Honest about Skilly's limits (don't claim it does everything in every comparison)
- No marketing fluff — readers searching long-tail queries are looking for an answer, not a pitch
- The CTA box at the bottom of `LearnLayout.astro` handles conversion. Article body stays educational.

## Article frontmatter checklist

Every `src/content/learn/*.md` file MUST have:

```yaml
---
title: "..."                 # ≤70 chars, includes the canonical keyword
description: "..."           # ≤170 chars, what + why + who-it's-for
pubDate: 2026-04-27
updatedDate: 2026-04-27      # bump when content changes
category: tutorial           # tutorial | how-to | comparison | concept | troubleshooting
tags: [blender, mac, voice-ai]
canonicalKeyword: "..."      # the one query this article should win
howTo:                       # OPTIONAL — only if the article is step-based
  totalTime: "PT8M"
  tools: ["macOS 14+", "Blender 4.0+"]
  steps:
    - name: "..."
      text: "..."
faq:                         # OPTIONAL — but recommended for SEO
  - question: "..."
    answer: "..."
---
```

## Build verification

Before merging an article PR, run locally:

```bash
cd /Users/engmsaleh/Repos/skilly-web
bun run build
```

Astro's content collection schema validation will fail loud if frontmatter is invalid. Then check the rendered HTML for the article URL — confirm Article + HowTo + BreadcrumbList + Person + FAQPage schemas all emit cleanly. Use [validator.schema.org](https://validator.schema.org/) on the deployed URL after merge.
