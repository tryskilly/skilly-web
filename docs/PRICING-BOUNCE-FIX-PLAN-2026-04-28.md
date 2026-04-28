# Pricing-Bounce Fix Plan

**Date:** 2026-04-28
**Source data:** docs/POSTHOG-MAX-PRICING-INVESTIGATION-2026-04-28.md
**User session-replay observation:** at least one visitor specifically navigated FAQ looking for "bring your own OpenAI key"

## Three changes, ordered by leverage

### 1. Promote + strengthen the BYOK FAQ (highest leverage for technical price-sensitive cohort)

**Current state** (`src/data/faqs.ts:72-75`):
- Position: 11th of 12 — collapsed by default, requires multiple clicks to find
- Answer: *"Not yet. If many people want it, we'll add the option soon (at a lower price)."*
- Problem: non-committal, no email capture, no signal mechanism. User leaves.

**Proposed change:**
- **Move to position 4** (right below "Why $19/month?") — still collapsed (top 3 stay), but next click reveals it
- **Rewrite answer to capture intent** (turns "no" into a leading signal):

> Coming soon. Skilly's roadmap includes a BYOK plan at a lower price for users with their own OpenAI Realtime credits. We're prioritizing it based on demand — email **hello@tryskilly.app (subject "BYOK")** with the subject "BYOK" and we'll notify you when it ships, plus lock in early-access pricing.

This converts a hard "no" into:
- A captured email (intent signal we can act on)
- A confirmed roadmap item (relieves objection)
- A reason to come back (lock-in framing)

### 2. Add an in-pricing CTA (Max's Variant A)

**Current state:** download CTA only in the hero. Pricing-section visitors must scroll back up to act.

**Proposed change** in `Pricing.astro`, directly below the `$19/month` price line:

> **"Start free — try Skilly first"** [download button]
> *15 minutes free, no credit card. Decide after.*

Mechanically: a second `web_cta_download_clicked` button with `data-ph-prop-location="pricing_section"` so we can measure the lift.

**Expected impact** (per Max's funnel analysis):
- Pricing-section visitors currently convert at 0% (vs 7.3% baseline)
- Recovering even half of the 20 pricing-bouncers/14d → 1.4 extra conversions/14d → ~36 extra/year at current scale

### 3. Add "no card, decide after" to the pricing card heading

**Current heading copy** in `tiers.ts`:
- tagline: *"3 hours of real AI tutoring every month — in any app you use."*

**Proposed addition** above tagline (or as a pre-headline on the pricing card):

> **First 15 minutes are free. Then decide.**

Reduces price-shock by establishing the free-trial frame BEFORE the $19 number registers. Aligns with the user-hypothesis that pricing-display order is causing loss aversion.

---

## NOT touching yet

- **Hours-vs-credits unit change** (Variant B). Funnel data alone can't isolate it from CTA-placement and missing-trial-frame. Run #1-3 first, observe lift, then decide if a unit change is needed.
- **Big architectural BYOK feature.** Not a marketing fix — that's product work. The FAQ answer commits us to "coming soon" without committing to a date.

## Implementation cost

| Change | Effort | Files |
|---|---|---|
| 1. Move + rewrite BYOK FAQ | 2 min | `src/data/faqs.ts` |
| 2. Pricing-section CTA | 8 min | `src/components/Pricing.astro` |
| 3. Free-trial framing on card | 3 min | `src/data/tiers.ts` (or `Pricing.astro`) |

Total: ~15 min. Single PR. Build + deploy via Netlify.

## Measurement plan

- After deploy, watch `web_cta_download_clicked` counts split by `data-ph-prop-location`:
  - `hero` (existing)
  - `pricing_section` (new)
- Run for 14 days, check Max's funnel query again — has the 0% pricing-section conversion moved?
- Watch session replays of users who hit BYOK email — what country / referrer? That tells us if the BYOK cohort is a real user segment vs noise.

## One-time follow-up to plan

If BYOK email signups exceed 10 in 30 days, that's strong enough signal to actually build the BYOK plan. Schedule that check for 2026-05-28.
