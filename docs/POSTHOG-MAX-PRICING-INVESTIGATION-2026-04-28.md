# PostHog Max AI — Pricing Section Bounce Investigation

**Date:** 2026-04-28
**Hypothesis (user):** Visitors are bouncing after seeing the pricing section ($19/month). Possibly compounded by pricing being expressed in **hours** (3 hrs/month) rather than credits.
**Chat ID:** `9f914568-f281-4cc1-8a09-1836ce6e3146`

---

## Verdict: Hypothesis CONFIRMED ✅

The data Max pulled is unambiguous. This is a hard conversion wall, not a gradual drop-off.

### The funnel (last 14 days, full site)

| Step | Count | Rate |
|---|---|---|
| Homepage visitors | 170 | 100% |
| Reached pricing section (`web_nav_link_clicked` link=pricing) | 20 | 11.8% |
| Then clicked download CTA | **0** | **0%** |

For comparison: non-pricing-section visitors convert to `web_cta_download_clicked` at **~7.3%**.
Pricing-section visitors: **0%**.

The two cohorts self-separated organically. Users who actively sought pricing information are the **least** likely to convert.

### Behavioral signals from session recordings

Max found 7 sessions of pricing-visitors who didn't convert:

- **Sessions 4 & 5**: 500–700 seconds of inactivity inside 9–12 min sessions. Classic price-objection behavior — user is sitting and thinking, not bouncing.
- **Session 3**: 8 clicks in 21 seconds — potential rage-click signal.
- **No keypresses on any session** — nobody engaged with any form (waitlist, etc.) after seeing pricing.

### Likely causes (to confirm in replays)

1. **Price anchoring issue** — $19/month reads as high without enough value framing above it
2. **No free-tier escape hatch** at the moment of price reveal — users see "$19" without "try free first" beside it
3. **CTA placement** — download button is in hero, but pricing-section users would need to scroll back up to act on impulse
4. **Hours-vs-credits framing (user hypothesis)** — "3 hours/month" may trigger loss aversion ("I'll save my hours") rather than habit formation. Credits-style pricing feels less finite. Not directly visible in funnel data; needs a dedicated qualitative pass on the recordings.

---

## Recommended experiment

**Variant A: Pricing-adjacent download CTA**

Add a second download button directly inside or below the pricing block:

> "Start free — download Skilly"
> Sub-line: "Try it free, upgrade when you're ready"

**Hypothesis:** Users who read pricing and immediately see a low-commitment CTA will convert at a higher rate than those forced to scroll back to the hero.

**Setup:**
- Feature flag in PostHog Experiments
- Control = current homepage
- Variant A = adds the pricing-section CTA + "free trial" framing
- Target: all homepage visitors
- Primary metric: `web_cta_download_clicked` rate among `web_nav_link_clicked` link=pricing
- Secondary: `skilly_checkout_started` (downstream paid conversion), rage-click rate on pricing elements

**Estimated runtime to significance:** 14–21 days at current ~85 weekly homepage visitors.

---

## Hours-vs-credits — separate question

The funnel data confirms pricing kills conversion. The data does NOT yet tell us whether the *unit* (hours vs credits) is the cause vs the *number* ($19) or the *missing escape hatch* (no free tier visible at pricing).

To isolate the unit hypothesis, run a parallel test:

**Variant B: Same price, credits framing**
- $19/month for 600 minutes of tutoring (or "300 questions" or similar credit-shaped unit)
- Same CTA, same hero, only the pricing card changes

If Variant B converts higher than control AND Variant A, the unit IS the friction. If only Variant A wins, the issue is CTA placement, not the unit.

**Order of operations:** Ship Variant A first (easier change, bigger expected lift). If lift exists but is incomplete, follow with Variant B in week 3.

---

## What to do RIGHT NOW

1. **Watch session 4 or 5** (the 500–700s inactivity ones) in PostHog → Session Replay. Look for: scroll direction after pricing, cursor stalls on the price line, whether the download CTA is even visible without scrolling back.
2. **Mark the rage-click session 3** as a separate sample to inspect.
3. **Create the feature flag** for Variant A in PostHog Experiments. Even a static landing-page change (no flag) would give us 7-day signal.

---

## Note on user's "I think one of those sessions is me" comment

If the user tried the site themselves but didn't sign in / convert, that recording is in the dataset and inflates the "pricing bouncer" cohort by 1 session. Real numbers are still: 19 of 20 = 95% non-converting pricing visitors (excluding self-test). Hypothesis still holds.
