# Skilly Marketing Redesign — Wireframe Spec v2

**Date:** 2026-04-16
**Supersedes:** v1 spec from 2026-04-15 (conversation-only, never committed)
**Changes vs. v1:** All HIGH-IMPACT items from `2026-04-16-marketing-redesign-cro-critique.md` applied, plus MED items M1 (social proof row) and M2 (FAQ reorder).
**Status:** Ready for Pencil drawing. No external decisions pending except final copy (user writes it).

---

## Global design tokens (unchanged from v1)

- **Canvas:** 1440 × ~7200 px desktop frame (taller than v1 due to added sections)
- **Grid:** 12-column, 64px gutters, 96px section padding
- **Theme:** Light — `#FFFFFF` bg, `#18181B` (zinc-900) text
- **Primary accent:** `amber-500` (`#F59E0B`) — CTAs, key highlights
- **Secondary accent:** `blue-500` (`#3B82F6`) — the product cursor color, used in mockups and icons
- **Style:** Modular Bento Showcase (from Pencil style library)
- **Shadows:** soft (Linear/Raycast aesthetic)
- **Corners:** 12px card radius, 24px section/bento radius
- **Type:** DM Sans (sans) + JetBrains Mono (mono), matching skilly-web brand
- **App mockups:** pixel-accurate macOS chrome (real traffic lights, title bars, sidebars)

---

## Section list (v2)

| # | Section | Change vs. v1 |
|---|---|---|
| S1 | Nav (sticky) | unchanged |
| S2 | Hero | headline rewrite (H1) |
| S3 | Trust strip — expanded to 2 rows | H2 applied |
| S4 | Bento features grid | unchanged |
| **S4.5** | **Social proof + CTA band (NEW)** | **M1 + H4** |
| S5 | How it works | unchanged |
| **S5.5** | **CTA band (NEW, slim)** | **H4** |
| S6 | Skills showcase | unchanged |
| S7 | Pricing (restructured) | **H3 applied — toggle, guarantee, anchor, mental accounting** |
| S8 | FAQ | **M2 applied — reordered, top 3 expanded by default** |
| S9 | Cross-platform waitlist | unchanged |
| S10 | Final CTA | **H5 applied — loss-frame headline** |
| S11 | Footer | unchanged |

**Total: 13 sections** (was 11 in v1, +2 for social proof row and mid-page CTA band).

---

## S1 · Nav (sticky, 64px) — UNCHANGED

```
[ Skilly logo ]    Skills · Pricing · FAQ           [ Download for Mac → amber ]
```
- White bg + backdrop blur, `zinc-200` 1px bottom border, subtle shadow on scroll
- Three center nav links are anchor jumps to S6 / S7 / S8
- Mobile (<768px): collapses to hamburger, CTA stays visible

---

## S2 · Hero — H1 APPLIED (headline rewrite)

**Canvas:** full-width, ~720px tall, centered content column ~960px wide

```
                        [ DRAFT headline, 56px, zinc-900, DM Sans Bold ]
           Learn Blender, Figma, and After Effects
              without watching 10 hours of YouTube.

                        [ DRAFT subhead, 20px, zinc-600 ]
          Skilly is a macOS menu bar tutor that sees your screen,
         talks you through the problem, and points at exactly what
                       to click — in 16 languages.

       [ Download for Mac → amber-500 ]    Watch 90s demo ↗ (text btn)

       ✓ Free 15 min · ✓ No card needed · ✓ macOS 14.2+

       ╭──────────────────────────────────────────────────────────╮
       │                                                          │
       │    [ SCENE 1 — pixel-accurate Blender window ]           │
       │    macOS chrome (traffic lights, title, sidebar)         │
       │    Blender 3D viewport with default cube                 │
       │    BLUE SKILLY CURSOR mid-bezier-arc                     │
       │    Speech bubble: "Click Object Mode to switch to Edit"  │
       │                                                          │
       ╰──────────────────────────────────────────────────────────╯
```

**Headline rationale** (per page-cro + Jobs-to-be-Done):
- Names 3 concrete apps the visitor already wants to learn → specificity
- Quantified pain point ("10 hours of YouTube") → concreteness + mild loss frame
- Outcome-focused ("Learn") not feature-focused

**Alternatives if this lands wrong:**
- "Learn Blender in 4 hours, not 40."
- "Stop pausing YouTube tutorials. Start making things."
- "Get unstuck in creative software — in seconds."

**Sub-headline** includes the three anchors page-cro wants:
- What it is ("macOS menu bar tutor")
- What it does ("sees, talks, points")
- Scope proof ("16 languages")

**Trust micro-line** (under buttons):
- ✓ Free 15 min · ✓ No card needed · ✓ macOS 14.2+
- Three checkmarks address the three most common cold-visitor objections

---

## S3 · Trust strip — H2 APPLIED (expanded to 2 rows)

**Canvas:** full-width, ~200px tall, `zinc-50` bg

### Row 1 — Trust signals (NEW, above)

```
[Founder photo] "Built by [Name], a Blender user tired of pausing
                 tutorials every 30 seconds." ↗ (founder story link)

   ⚡ Built on OpenAI Realtime  ·  🍎 macOS native APIs  ·  ⌐ Open-source Worker
```

**Psychology applied:**
- **Liking/Similarity Bias:** founder story signals "one of us"
- **Authority Bias:** OpenAI Realtime + Apple native APIs
- **Transparency:** open-source worker → viewable on GitHub

**Fallback if no founder photo available yet:** use a monogram avatar (first initial) on an amber circle, same layout.

### Row 2 — Privacy guarantees (v1 content, below)

```
🔒 Privacy first   ·   ⊘ Zero retention   ·   🔐 No tracking cookies   ·   ✦ No ads
```

- Single-row, centered, 14px text, subtle icons
- `zinc-100` bg (slightly darker than row 1 to visually separate)

---

## S4 · Bento features grid — UNCHANGED from v1

3-column asymmetric bento grid, 9 cells total, varied sizes.

```
┌──────────────────────────────┬──────────────────┐
│  CELL 1 (2×1)                │  CELL 2 (1×2)    │
│  [DRAFT: Points at exactly   │  ┌────────────┐  │
│   what you need]             │  │ SCENE 2    │  │
│  Close-up illustration of    │  │ Menu bar   │  │
│  cursor + speech bubble      │  │ panel,     │  │
│                              │  │ pixel-     │  │
├──────────┬──────────┬────────┤  │ accurate   │  │
│ CELL 3   │ CELL 4   │ CELL 5 │  │ — Blender  │  │
│ Multi-   │ 16 langs │ Zero   │  │ Active,    │  │
│ monitor  │ 8 voices │ retent │  │ stages 3/6 │  │
│ icon     │ globe    │ lock   │  │ trial mins │  │
├──────────┴──────────┴────────┤  │            │  │
│ CELL 6 (2×1)                 │  │            │  │
│ ┌────────────────────────┐   │  │            │  │
│ │ SCENE 3 — Live Tutor   │   │  └────────────┘  │
│ │ waveform overlay       │   │                  │
│ │ + streaming bubble     │   ├──────────────────┤
│ │ pixel-accurate         │   │ CELL 9 (1×1)     │
│ └────────────────────────┘   │ Auto-activates   │
│ [DRAFT: Hands-free Live]     │ per app — icon   │
├──────────────┬───────────────┤ row of Blender,  │
│ CELL 7 (1×1) │ CELL 8 (1×1)  │ Figma, AE, Pr,   │
│ Push-to-talk │ Curriculum    │ Resolve          │
│ keyboard art │ auto-advance  │                  │
└──────────────┴───────────────┴──────────────────┘
```

- 9 cells, 2 of 4 pixel-accurate scenes live here (Scene 2, Scene 3)
- 24px gap between cells, generous internal padding

---

## S4.5 · Social proof + CTA band — NEW (M1 + H4 combined)

**Canvas:** full-width, ~280px tall, `amber-50` bg (subtle amber tint to break visual rhythm)

```
                  ────── Built for the tools you already love ──────

       🟧 Blender      🟪 After Effects    🟪 Premiere Pro    🟦 DaVinci    🟪 Figma
       
                     Join 237 early-access learners already on Skilly
                        (update counter from actual PostHog data)
                     
                         [ Download for Mac → amber-500 ]
                         
                          Free 15 min · No card · 2.3 MB
```

**Psychology applied:**
- **Availability Heuristic:** app icons make "this works for my use case" vivid
- **Bandwagon Effect / Mimetic Desire:** "Join N learners" counter
- **Second CTA placement:** page-cro says repeat CTAs at decision points — after the bento grid is exactly that moment

**Counter rule:** only show if N ≥ 50. Below that, use "Be one of the first to try Skilly" (exclusivity frame) instead of a small number.

---

## S5 · How it works — UNCHANGED from v1

3-column row, ~480px tall.

```
   ╭───── 1 ─────╮     ╭───── 2 ─────╮     ╭───── 3 ─────╮
   │ ⌃⌥ keyboard │     │ 👁 cursor   │     │ 🎯 cursor   │
   │ illustration│     │ + speech    │     │ landing on  │
   │             │     │ bubble      │     │ UI element  │
   │ Hold the    │     │ Skilly sees │     │ It points   │
   │ hotkey      │     │ and speaks  │     │ exactly     │
   ╰─────────────╯     ╰─────────────╯     ╰─────────────╯
```

- Mini vector illustrations (NOT pixel-accurate), simpler style
- Large amber numerals top-left of each card
- 320px wide each

---

## S5.5 · CTA band — NEW (H4)

**Canvas:** full-width, ~160px tall, white bg, 1px `zinc-200` top/bottom borders

```
                    Ready to stop getting stuck in tutorials?
                    
                       [ Download for Mac → amber-500 ]
```

- Slim, single-line, single CTA
- No other content — this is the "commit moment" right after the user understands the mechanic
- Per page-cro: CTAs at every decision point increase conversion without significantly increasing page bloat

---

## S6 · Skills showcase — UNCHANGED from v1

```
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  🟧    │ │  🟪    │ │  🟪    │ │  🟦    │ │  🟪    │
│ Blender│ │  AE    │ │  Pr    │ │ DaVinci│ │ Figma  │
│ Funda- │ │ Basics │ │ Basics │ │ Basics │ │ Basics │
│ mentals│ │        │ │        │ │        │ │        │
│ 6 stage│ │ 5 stage│ │ 5 stage│ │ 6 stage│ │ 5 stage│
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘

         Add your own with a SKILL.md file →
```

- 5 skill cards in a row
- App icons ~80px in brand colors
- Bottom link to docs/format spec

---

## S7 · Pricing — H3 APPLIED (restructured)

**Canvas:** two-column, ~720px tall. Left 60% = pricing card, Right 40% = Scene 4.

### Left card — fully redesigned

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌──────────────────────────────────┐       │
│  │  [ Monthly ] [ ● Annual · Save 20% ]     │  ← toggle, default ANNUAL
│  └──────────────────────────────────┘       │
│                                             │
│  Skilly Pro                                 │
│                                             │
│  $190/year                                  │  ← large, amber accent
│  That's $15.83/month — save $38 vs monthly  │  ← anchor reference
│                                             │
│  ~$0.52/day · less than a coffee            │  ← mental accounting
│                                             │
│  ─────────────────────────────────          │
│                                             │
│  ✓ 3 hours of AI tutoring each month        │
│  ✓ All 5 bundled skills (+ custom)          │
│  ✓ 16 languages, 8 voices                   │
│  ✓ Multi-monitor + Live Tutor               │
│  ✓ Auto-updates forever                     │
│                                             │
│  ┌──────────────────────────────────┐       │
│  │  Download for Mac → (amber CTA)  │       │
│  └──────────────────────────────────┘       │
│                                             │
│  ⌂ 30-day money-back guarantee              │  ← Regret Aversion
│  ⌂ No card needed for free 15 min           │  ← Zero-Price anchor
│  ⌂ Cancel anytime                           │  ← lower switching friction
│                                             │
│  ─────────────────────────────────          │
│                                             │
│  Worth ~$500 in one-on-one tutor time       │  ← Anchor (optional, only
│                                             │     if defensible)
│                                             │
└─────────────────────────────────────────────┘
```

**Changes applied:**
1. **Monthly/annual toggle** — default to Annual so the anchor price ($190) is what visitors see first. Toggle revealing Monthly ($19) creates the contrast that makes annual look like the obvious choice.
2. **Price anchor math** — "$190/year · save $38 vs monthly" does the math for the visitor.
3. **Mental accounting reframe** — "$0.52/day · less than a coffee" is the daily-cost fluency frame.
4. **Three guarantee lines** near the CTA — money-back, no card, cancel anytime. All three address regret aversion.
5. **Optional tutor-time anchor** — "Worth $500" creates high-price anchor BELOW the actual price. Only use if defensible; otherwise remove.

### Right side — Scene 4

Scene 4 (pixel-accurate Settings → Account view showing Plan card + Manage button) stays as in v1. Size ~520×380px.

---

## S8 · FAQ — M2 APPLIED (reordered, top 3 expanded)

**Canvas:** single column, max-width 720px, centered.

**New order** (most important objections first, per page-cro):

```
▼ What if I cancel? Will I lose access immediately?                  [EXPANDED]
   (Answer: cancel anytime, keep access until the end of the period.
   30-day money-back if the trial didn't work for you.)

▼ Is it safe? What data does Skilly send to OpenAI?                  [EXPANDED]
   (Answer: screen + voice for the duration of a live session only.
   Never stored. OpenAI can't train on Skilly sessions.)

▼ Why $19/month? What am I actually paying for?                      [EXPANDED]
   (Answer: 3 hours of AI tutoring covers most users. Costs scale
   with OpenAI Realtime API usage. Cheaper than one human lesson.)

▸ Does it work offline?                                              [collapsed]
▸ What apps are supported?                                           [collapsed]
▸ Can I add my own teaching skills?                                  [collapsed]
▸ How accurate is the cursor pointing?                               [collapsed]
▸ What about Windows / Linux / iOS?                                  [collapsed]
```

**Changes applied:**
- Questions reordered by objection priority (regret aversion first, trust second, price third)
- Top 3 expanded by default so scroll scanners see the critical answers without clicking
- Platform question demoted to bottom (non-blocker for Mac users; iOS/Windows/Linux users should go to S9)

---

## S9 · Cross-platform waitlist — UNCHANGED from v1

```
            ┌────────────────────────────────┐
            │  Not on Mac?                   │
            │  Get notified when we ship.    │
            │                                │
            │  [Win] [Linux] [iOS] (chips)   │
            │  [ email@you.com ] [ Notify ]  │
            └────────────────────────────────┘
```

- Single centered card, lower visual weight than S7
- Reuses existing waitlist API
- Centered below the FAQ, before the final CTA

---

## S10 · Final CTA — H5 APPLIED (loss-frame headline)

**Canvas:** full-width, ~360px tall, `amber-50` tinted bg

```
     [ DRAFT loss-frame headline, 40px, zinc-900 ]
     Every hour lost to a YouTube tutorial is
         an hour you'll never get back.
         
     [ DRAFT sub, 18px, zinc-600 ]
     Skilly answers in seconds. Get it now.

              [ Download for Mac → ]

       Free 15 min · No card · 30-day money-back
```

**Psychology applied:**
- **Prospect Theory / Loss Aversion:** the only loss frame on the page, and it's at the last decision moment
- **Hyperbolic Discounting:** "in seconds" + "now" emphasizes immediate benefit
- **Regret Aversion reinforcement:** repeat guarantees at final CTA

**Copy alternatives for user to pick:**
- "Every hour lost to a YouTube tutorial is an hour you'll never get back." (strongest loss frame)
- "You've spent too many weekends pausing and rewinding. Skilly fixes that."
- "Stop losing weekends to tutorial hell."

---

## S11 · Footer — UNCHANGED from v1

```
[Logo + tagline]   Product       Company       Resources       🌐 EN ▾
                   Download      About         Privacy
                   Pricing       Blog          Terms
                   Skills        Press         GitHub
                   Changelog     Contact       Skill request

                © 2026 Skilly · Made on a Mac
```

- 3-column footer with language picker on the right

---

## Mobile behavior (informational — not drawn in Pencil v2)

Every section reflows to single-column at <768px. Key adjustments:
- Nav collapses to hamburger, CTA button stays in the bar
- Hero becomes text-then-visual stacked
- S4 bento collapses to a single-column list (visual cells stay prominent)
- S4.5 social proof: icons become a horizontal scroll row
- S5 how-it-works: stacks vertically
- S7 pricing: single-column with Scene 4 below the card
- S8 FAQ: full-width accordions

Pencil file will only draw the desktop frame (1440px). Mobile is an engineering concern, not a wireframe deliverable.

---

## What's still open (zero blockers for drawing)

These are things the user will decide later, but don't block Pencil drawing:

1. **Actual headline copy** — drawing uses DRAFT option D, user can overwrite without redrawing
2. **Founder photo/name** — drawing uses placeholder avatar + "[Founder Name]" label
3. **Early-access learner counter** — drawing uses "237" as placeholder; real number from PostHog later
4. **Demo video existence** — if no demo video exists, the "Watch 90s demo" secondary button should be removed from the hero (M3 from critique). Drawing includes it; user can delete the button in Pencil if no video exists.
5. **Tutor-time anchor line** — optional; draws the "Worth ~$500" line but marks it clearly DRAFT. User can delete if not defensible.
6. **App icons** — real Blender/Figma/etc. brand icons needed for S4.5 and S6. Drawing uses colored-block placeholders at pixel-correct sizes; real icons dropped in during web implementation.

---

## Drawing order for Pencil (sequential, with checkpoints)

To keep `batch_design` calls under 25 operations each and allow user checkpoints:

1. **Frame container + grid guides** (1 call)
2. **S1 Nav** (1 call)
3. **S2 Hero — text block** (1 call)
4. **S2 Hero — Scene 1 Blender mockup** (2-3 calls — macOS chrome, Blender UI, cursor overlay, speech bubble)
5. **S3 Trust strip (2 rows)** (1 call)
6. **S4 Bento — structure + copy cells** (2 calls)
7. **S4 Bento — Scene 2 menu bar panel mockup** (2-3 calls)
8. **S4 Bento — Scene 3 Live Tutor mockup** (2 calls)
9. **S4.5 Social proof + CTA band** (1 call)
10. **S5 How it works** (1 call)
11. **S5.5 CTA band** (1 call)
12. **S6 Skills showcase** (1 call)
13. **S7 Pricing card + Scene 4 mockup** (2-3 calls)
14. **S8 FAQ** (1 call)
15. **S9 Waitlist card** (1 call)
16. **S10 Final CTA** (1 call)
17. **S11 Footer** (1 call)

**Total estimate: 20-25 `batch_design` calls**, roughly 300-450 operations total across the whole frame. User can stop or course-correct between any two numbered steps above.

---

## Ready to draw

Spec is self-contained. No external decisions block drawing. User has final approval rights at every numbered checkpoint during Pencil execution.
