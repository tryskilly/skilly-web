# Skilly Marketing Redesign — CRO Critique & Redlines

**Date:** 2026-04-16
**Source spec:** Wireframe spec presented 2026-04-15 (11 sections, light theme, Modular Bento Showcase, "Download for Mac" primary CTA)
**Frameworks applied:** `page-cro`, `marketing-psychology`, `pricing-strategy` (all from coreyhaines31/marketingskills)

---

## TL;DR — what actually needs to change

The wireframe structure is sound. The problems are content, not layout:

1. **Headline is feature-focused, not outcome-focused** — violates page-cro's #1 dimension (value proposition clarity) and Jobs-to-be-Done
2. **Zero trust signals above the pricing section** — violates page-cro dimension #5
3. **Pricing section has no anchor, no annual toggle, no guarantee** — violates pricing-strategy best practices
4. **CTA is not repeated at decision points** — violates page-cro dimension #3
5. **No loss-frame anywhere** — Prospect Theory says losses feel 2× stronger than gains, and we're using pure gain frames
6. **FAQ ordering doesn't address regret aversion first** — the biggest conversion blocker sits buried

None of these require redrawing sections. They're content swaps inside existing cells.

---

## HIGH IMPACT — do before any Pencil drawing

### H1. Rewrite the headline (outcome + specificity)
Current draft: *"An AI tutor that points at your screen."*

**Problem:** Feature-focused. Says what it IS, not what you GET. Fails page-cro dimension #1 and Jobs-to-be-Done ("People don't buy drills, they buy holes").

**Alternatives** (for user to pick and refine):
- **A.** "Learn Blender in 4 hours, not 40." (specificity + implicit time-saved promise)
- **B.** "Stop pausing YouTube tutorials. Start making things." (loss frame + outcome)
- **C.** "Get unstuck in creative software — in seconds." (immediacy via hyperbolic discounting)
- **D.** "Learn Blender, Figma, and After Effects without watching 10 hours of YouTube." (specific + explicit pain avoidance)

**Recommended:** A or D. Both include a concrete number, which page-cro calls out as a strong pattern.

### H2. Add trust signals BEFORE pricing (currently none)
The only "trust strip" in the spec is S3 with copy like "Privacy first · Zero retention." That's value-prop reinforcement, not trust signal. Real trust signals to add:

- **"Built on OpenAI Realtime + macOS native APIs"** (Authority Bias)
- **Open-source Worker proxy — view on GitHub** (Transparency + Authority)
- **"5 expert skills included"** (Concreteness/Availability Heuristic)
- **Founder story micro-element** ("Built by [name], a Blender user tired of pausing tutorials every 30 seconds" — Liking/Similarity Bias)
- **Product Hunt badge** when launched
- **"N early-access learners" counter** (Bandwagon Effect + Mimetic Desire)

**Where to place:**
- Expand S3 from a single strip to two stacked rows: Row 1 = trust signals (above), Row 2 = privacy guarantees (below)
- OR add a slim "founder bar" between S2 (hero) and S3 with founder photo + one-line story

### H3. Restructure pricing section (S7)
Current spec: single card, $19/mo, 3 hrs, free 15-min trial, Scene 4 mockup beside it.

**Problems (all from pricing-strategy best practices):**
- **No monthly/annual toggle** — industry standard, missing
- **No anchor** — single price floats in isolation, violates Anchoring Effect
- **No money-back guarantee** — violates Regret Aversion mitigation
- **No value reframe** — $19/mo is a big number; needs mental accounting reframe
- **Single tier is defensible but loses the decoy effect** — psychology says 3 tiers with middle as target converts best

**Redline for S7:**

```
Left card (renamed "Simple pricing"):

    [monthly] / [annual — save $38]       ← toggle, default annual
    
    $19/month                              ← or $190/year (save 2 months)
    ~$0.63/day — less than a coffee       ← mental accounting reframe
    
    ━━━━━━━━━━
    ✓ 3 hours of AI tutoring each month
    ✓ All 5 bundled skills (+ custom)
    ✓ 16 languages, 8 voices
    ✓ Multi-monitor + Live Tutor
    ✓ Auto-updates forever
    
    [ Download for Mac → ]
    
    30-day money-back guarantee            ← Regret Aversion
    No credit card needed for trial        ← Zero-Price Effect
    Cancel anytime                         ← lower switching friction
    
    Worth ~$500 in one-on-one tutor time   ← Anchoring (optional, if defensible)
    
Right side: Scene 4 settings/plan mockup (unchanged)
```

**Optional decoy:** add a small "Free — 15 min forever" comparison row below the card as the anchor. Creates a contrast that makes $19/mo look like the obvious choice for serious learners.

### H4. Add CTAs at two more decision points
Current spec has CTAs in S1 (nav), S2 (hero), S7 (pricing), S10 (final). page-cro says repeat CTAs "at key decision points." Missing:

- **After S4 (bento grid)** — after user has absorbed the feature story
- **After S5 (how it works)** — after user understands the mechanic

Add a slim horizontal CTA band between these sections: centered headline + amber button. Keep the body text short (one sentence). This is ~5 minutes of Pencil work but likely the biggest single-change conversion lift.

### H5. Add a loss frame somewhere prominent
Prospect Theory: losses feel ~2× stronger than gains. The spec uses only gain frames ("Start learning", "Get Skilly"). Add ONE loss frame, likely in the final CTA (S10):

- Current draft: *"Stop hunting through menus. Start learning."* (mixed)
- Stronger: *"Every hour you lose to a YouTube tutorial is an hour you'll never get back."*

Use sparingly — one loss frame per page, not five.

---

## MEDIUM IMPACT — worth doing if time permits

### M1. Add a social proof section (new S4.5 between bento and how-it-works)
Even pre-launch you have options:
- **Early-access counter**: "Join 237 Mac learners already on Skilly" (update with real number)
- **Founder quote** with photo
- **GitHub stars** on the open-source Worker proxy
- **Bundled-skill recognition**: logos of Blender, Figma, After Effects, Premiere, DaVinci in a strip with copy like "Teaches the tools you already want to learn"

Keep this section tight — one row, ~160px tall. Don't pad with fake testimonials.

### M2. Reorder the FAQ to address regret aversion first
Current FAQ order (per spec): safety → offline → multi-platform → cancel → price → custom skills → accuracy.

**Better order** (biggest blockers first, per page-cro objection-handling priority):
1. "What if I cancel?" (Regret Aversion — always #1)
2. "Is it safe? What data does Skilly send to OpenAI?" (Trust)
3. "Why $19/month?" (Price objection)
4. "Does it work offline?" (Capability question)
5. "What apps are supported?" (Fit question)
6. "Can I add my own teaching skills?" (Extensibility)
7. "What about Windows / Linux / iOS?" (Non-blocker — secondary)

**Keep FAQ accordion behavior**, but have questions #1-#3 expanded by default so cold scrollers don't have to click to see the answers.

### M3. Reframe the "watch 90s demo" secondary CTA
Secondary CTA is in the hero. Marketing-psychology note: if the 90s demo doesn't exist, don't promise it — regret aversion works against you when promises aren't kept. Either:
- Make the demo real (biggest lift, most work)
- Replace with "See it in action ↓" that smooth-scrolls to the bento grid
- Remove it entirely and rely solely on the primary CTA (Hick's Law — fewer choices = faster decisions)

---

## LOWER IMPACT — backlog

### L1. Lead magnet in the footer (Reciprocity)
A free "Blender 50-shortcut cheat sheet PDF" email capture in the footer creates reciprocity without cluttering the primary conversion path. Optional, not required for v1.

### L2. Mental accounting alternatives on the pricing page
A/B test copy variants: "$19/month" vs "$0.63/day" vs "$4.75/week" vs "Less than one Blender lesson." All are the same money, different frames.

### L3. Consider a "Free forever" tier
Skilly's TrialTracker is a one-shot 15-min lifetime trial. You could reframe that as a "Free forever" tier (15 min/lifetime) and call paid "Unlimited" or "Pro" — turns a limit into a product and creates the 2-tier anchor effect pricing-strategy recommends. Tradeoff: current framing is clearer; this is more conversion-optimized but slightly less honest about what "free" means.

---

## Wireframe redline summary (for Pencil drawing)

These are the ONLY structural changes to the spec from 2026-04-15. Everything else stays:

| Section | Change |
|---|---|
| S2 (Hero) | Swap headline copy to H1 alternative A or D; keep everything else |
| S3 (Trust strip) | Split into two rows — trust signals above, privacy guarantees below (or add a new founder-story micro-section between S2 and S3) |
| S4.5 (NEW) | Slim social proof row between bento and how-it-works (optional — M1) |
| S4→S5 transition | Add a slim horizontal CTA band (H4) |
| S5→S6 transition | Add a second slim horizontal CTA band (H4) |
| S7 (Pricing) | Restructured card per H3 — add toggle, guarantee, mental accounting reframe, optional anchor row |
| S8 (FAQ) | Reorder per M2; expand top 3 by default |
| S10 (Final CTA) | Swap headline to a loss frame per H5 |

**Everything else in the wireframe is unchanged.** Section count goes from 11 → 12 (if M1 social proof is added) or 11 → 11 (if not).

---

## Research we don't have but should

Both page-cro and pricing-strategy start by asking diagnostic questions the current Skilly project can't answer:
- Current conversion rate? **Unknown** — site is pre-PostHog-identify.
- Where is traffic coming from? **Unknown** — no UTM tracking summary.
- What have you tried? **Nothing yet on conversion** — this is v1.
- Competitor pricing? **No direct competitors** — no AI tutor for creative software exists.
- Willingness-to-pay research? **None.**

These aren't blockers for the redesign — v1 can ship on best practices. But after launch, the bodies of knowledge to run are:
1. **PostHog funnel** (already wired from yesterday's work): hero CTA clicks → download button clicks → app install → trial start → paid
2. **Hotjar or Microsoft Clarity heatmaps** on the new page
3. **One round of 5-7 user interviews** with fresh visitors: "what did you think this was in the first 5 seconds?"
4. **Van Westendorp survey** on pricing — send to the existing waitlist
5. **A/B test the headline** after traffic is flowing

---

## What to do next

1. **User reviews this critique** and picks which HIGH-IMPACT items to adopt before drawing begins
2. Once adopted, I update the wireframe spec inline (this file can be amended)
3. Then I start drawing in Pencil with the corrected spec, frame by frame with checkpoints

Nothing has been drawn yet. All changes are on paper. Easy to iterate.
