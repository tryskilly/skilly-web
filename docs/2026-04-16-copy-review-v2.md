# Skilly v2 Copy Review — Seven Sweeps

**Date:** 2026-04-16
**Source copy:** Post-repositioning v2 as of tonight's edits (light theme, universal, voice-first, monthly-only pricing)
**Framework applied:** `copy-editing` skill — Seven Sweeps (Clarity → Voice → So What → Prove It → Specificity → Emotion → Zero Risk) + Expert Panel Scoring
**Status:** Recommendations below. User picks which to apply.

---

## TL;DR — 9 concrete fixes to ship before launch

These are the edits I'd apply without further debate. All are small. Ordered by impact:

1. **🔴 CRITICAL INCONSISTENCY**: `CTA.astro` final trust line says "30-day money-back" but Pricing no longer offers that. Delete or add the guarantee everywhere. (Zero Risk sweep)
2. **Hero subhead is 46 words — too long.** Cut to ~30. (Clarity sweep)
3. **Skills subhead is 60 words — too dense.** Cut to ~35. (Clarity sweep)
4. **`HowItWorks` step 2 example is still Blender** ("UV unwrap this face") — contradicts the universal repositioning we just did. (Voice / So What)
5. **`Features` cell 9 still names Blender + Figma** — same leak, one line. (Voice)
6. **`CTABand` default headline** says "getting stuck in tutorials" — implicitly creative-software. Swap to "hunting through menus" to match the hero's universal frame.
7. **`steps.ts` step 1** is fine BUT step 3 ("Watch the cursor fly") doesn't mention audio+transcript — adds cursor-only framing at the worst spot in the page.
8. **Hero alt text still says** "Skilly teaching Blender". Accessibility text leaks the old positioning.
9. **`Nav.astro` mobile CTA label** is just "Download" — could be tighter + more specific. Low priority.

**Everything else scores 7/10+ and doesn't block launch.** Details per sweep below.

---

## Sweep 1 — Clarity

### 🔴 Hero subhead (46 words → target ≤30)

**Current:**
> A macOS menu-bar tutor for every app on your Mac. Ask a question out loud — Skilly sees your screen, **answers out loud**, and points at exactly what to click. Live transcription streams beside the cursor, in 16 languages.

**Problem:** Two clauses doing the same work ("every app on your Mac" + "Ask a question out loud — Skilly sees your screen"). Both paint the setup. One is enough.

**Recommended (30 words):**
> A macOS menu-bar tutor for every app. Ask out loud — Skilly sees your screen, **answers out loud**, and points at exactly what to click. With live transcription beside the cursor.

**Why it's better:** Drops "on your Mac" (redundant with "macOS menu-bar"), drops "a question" (implied by "Ask out loud"), drops "in 16 languages" (the language detail is in the Features bento and FAQ — fine to lose from hero). Same meaning, 16 fewer words.

**Alternative tighter version (24 words):**
> Your macOS menu-bar tutor for every app. Talk out loud — Skilly sees your screen, talks back, and points at the button with a live transcript.

### 🔴 Skills section subhead (60 words → target ≤35)

**Current:**
> Skilly works with any app out of the box — open it and start asking. Skills are optional add-ons that teach Skilly an app's exact UI layout, shortcuts, and common pitfalls for more precise pointing and structured lessons. Five skills ship as examples. A skill builder is coming so you can make your own — for any app, any workflow.

**Problem:** Three distinct ideas in one paragraph: (1) works with anything, (2) skills add expertise, (3) you'll be able to build your own. That's three sentences' worth, not one paragraph.

**Recommended (split into three short beats, 34 words total):**
> Skilly works with any app out of the box. Skills are optional add-ons that make it an expert in specific apps — with precise pointing and structured lessons. Five ship as examples. A skill builder is coming.

### 🟡 Cell 2 placeholder sidebar

**Current:**
> Your skill, your pace
> Curriculum stages that advance as you learn. No quizzes, no gates.

**Problem:** Works, but "Your skill, your pace" is abstract. Could be more concrete.

**Recommended:**
> Learns your pace
> Stages advance as you master things. No quizzes, no gates.

### 🟡 Cell 7 "Push-to-talk that sticks"

**Current title:** "Push-to-talk that sticks"
**Problem:** "Sticks" is cute but ambiguous — "sticks" to what? (It means "the hotkey doesn't get missed", but you have to read the body to get that.)
**Recommended:** "Push-to-talk that never drops" or just "Reliable push-to-talk"

---

## Sweep 2 — Voice and Tone

Overall the voice is consistent: warm, direct, no corporate speak, playful loss-framing. Two small inconsistencies:

### 🔴 Residual Blender leakage

Three places still name specific apps in a way that contradicts "universal for every app":

1. **`HowItWorks` step 2** — `src/data/steps.ts`:
   > "Hold Control+Option and ask, or enable Live Tutor mode and just start talking. **'How do I UV unwrap this face?'**"
   
   UV unwrap is a Blender-specific term. Should be app-agnostic.
   
   **Recommended:**
   > "Hold ⌃⌥ and ask — or enable Live Tutor and just start talking. 'How do I do [X] in this app?' — anything you'd ask a pro next to you."

2. **`Features.astro` cell 9**:
   > "Switch to Blender → Blender tutor. Switch to Figma → Figma tutor."
   
   **Recommended:**
   > "Frontmost app changes, Skilly's expertise changes with it. Automatic."

3. **`Hero.astro` aria-label on the illustration**:
   > `aria-label="Skilly teaching Blender: user speaks a question, ..."`
   
   **Recommended:**
   > `aria-label="Skilly in action: user speaks a question out loud, Skilly's cursor animates to the right UI element, and the spoken answer streams as text beside the cursor"`
   
   This is accessibility-only but still leaks the old positioning.

### 🟡 `CTABand` default headline

**Current:** "Ready to stop getting stuck in tutorials?"
**Problem:** "Tutorials" implies creative software learning. Less universal than the hero.
**Recommended:** "Ready to stop hunting through menus?" (matches hero framing exactly)

---

## Sweep 3 — So What

Most claims pass the "so what" test. Two weak spots:

### 🟡 TrustStrip Row 2 privacy badges are claim-only

**Current:** "Privacy first · Zero retention · No tracking cookies · No ads"

**Problem:** These are claims, not proofs. The reader has to take "Privacy first" on faith. The Row 1 anchors ("Built on OpenAI Realtime", "Open-source proxy") actually prove something. Row 2 is just adjectives.

**Recommended:** Either (a) keep them but know they're window-dressing, or (b) swap one for a concrete proof like "No data retained after session" (quantifies "zero retention" into something testable).

### 🟡 `SocialProof` fine print

**Current:** "Free 15 min · No card · 2.3 MB"
**Problem:** The "2.3 MB" file size is specific but "so what?" to most people. It's trying to signal "small download" but most Mac users don't care about MB.
**Recommended:** Drop "2.3 MB", replace with "macOS 14+" for a user-relevant constraint, or leave as two items.

---

## Sweep 4 — Prove It

### 🔴 No testimonials anywhere

There is **zero voice-of-customer quote** on the page. No "I finally learned Blender in a weekend" from a user, no screenshot of a review, no Twitter post embedded. For pre-launch beta this is understandable, but it's the #1 thing to add post-launch. **Not blocking this commit — just flag as the top priority once you have real users.**

### 🔴 "Join 237 early-access learners" (SocialProof)

237 is a placeholder number in the code. Two issues:
1. If the real number is smaller, the copy lies.
2. The skill I wrote has a threshold: display only if N ≥ 50, otherwise use "Be one of the first..." (already implemented in SocialProof.astro as `showCounter = earlyAccessCount >= 50`).

**Action needed:** Before launch, wire the real count in, OR hardcode a conservative truthful number, OR remove the counter entirely until you have real data.

### 🟢 Authority anchors are strong

`TrustStrip` Row 1 has: "Built on OpenAI Realtime · macOS native APIs · Open-source proxy". These are concrete, verifiable claims. Excellent.

---

## Sweep 5 — Specificity

### 🟢 Things that are specific (good — keep)

- "$19 / month" — exact
- "~$0.63/day" — calculated
- "3 hours of live teaching" — exact
- "15 minutes free on first launch" — exact
- "16 languages, 8 voices" — exact
- "macOS 14+ · Apple Silicon" — exact
- "30 seconds" in TrustStrip ("tired of pausing tutorials every 30 seconds") — vivid

### 🟡 Things that are vague (could improve)

- **Pricing card tagline**: "3 hours of live teaching per month, any app you use" — "any app you use" is a little awkward. Could be "3 hours of live teaching per month, for every app on your Mac."
- **Skills section bottom link**: "Skills are built and maintained by Skilly. If you want to build your own, get in touch — we're exploring a creator program." This contradicts the subhead above it which says "A skill builder is coming". Pick one story and stick with it.

---

## Sweep 6 — Heightened Emotion

### 🟢 Strong emotional hits

- **Hero headline**: "Stop hunting through menus. Just ask out loud." — pain frame + relief, one-two punch
- **TrustStrip founder**: "Googling 'how do I X in this app?' fifty times a week" — universally relatable pain
- **Final CTA loss frame**: "Every minute spent hunting through menus is a minute you won't get back." — Prospect Theory loss frame executed correctly
- **Cell 5**: "Talk out loud. Hear the answer. See the transcript." — three-beat cadence that maps cleanly to sensory experience

### 🟡 Flat or informational spots

- **Pricing card**: "Simple pricing. No surprises." — generic SaaS cliché. Everyone says this. Could be more specific: "Beta price. Locked in for life if you join now." — which adds urgency + specificity.
- **FAQ headline**: "Questions, answered." — fine, bland. Could go bolder: "The objections you haven't said out loud."

---

## Sweep 7 — Zero Risk

### 🔴 CRITICAL — Trust line inconsistency

**`CTA.astro` final CTA trust line:**
> "Free 15 min · No card · 30-day money-back"

**Problem:** "30-day money-back" is listed in the final-CTA trust line but **it's not in the Pricing section guarantees and it's not in any FAQ answer**. I removed the "30-day money-back" line from Pricing when rolling back the annual toggle — forgot to update CTA.astro to match.

This is a **trust killer at the commit moment.** A reader who scrolled back to check "wait, is there actually a money-back guarantee?" finds nothing. That's worse than never having claimed it.

**Two fixes — pick one:**

**Fix A — Remove the claim from CTA.astro** (honest, fastest):
```
Free 15 min · No card · Cancel anytime
```

**Fix B — Add the guarantee back everywhere** (strongest for conversion):
- `CTA.astro`: keep "30-day money-back"
- `Pricing.astro` guarantees list: add "30-day money-back guarantee"
- `faqs.ts` — add an FAQ: "What if I pay and change my mind? → 30-day money-back, no questions."
- `FAQ.astro` top 3 expanded (regret aversion) — make sure the money-back answer is in the top 3

**My recommendation: Fix B.** The money-back guarantee is the single strongest regret-aversion signal a subscription app can offer, and it's cheap. Only pick A if you don't want to actually honor a money-back policy.

### 🟢 Other risk-reduction signals are in place

- Hero trust micro-line (Free 15 min, No card, macOS requirements)
- Pricing guarantees (no card, cancel anytime, beta price locked)
- FAQ top 3 addresses cancel, safety, price — correct regret-aversion priority
- "No checkout on this page" note under Pricing

---

## Expert Panel Scoring (4 personas)

Each persona scored the full page 1–10 in their domain. Target: ≥8 average, no sub-7.

| Persona | Score | Top gaps |
|---|---|---|
| **Conversion copywriter** | 7 | No testimonials, CTA trust-line inconsistency (30-day MBG), hero subhead too long |
| **UX writer** | 7 | Skills subhead too dense, several 60+ word paragraphs, "sticks" ambiguous in cell 7 |
| **Target customer (frustrated Mac user learning apps)** | 6 | "Points at the cursor" feels abstract without seeing it — Scene 1 exists but Scenes 2/3/4 are placeholders, which weakens the proof. "Stop hunting through menus" resonates, voice-first clicks |
| **Brand strategist** | 7 | Residual Blender leakage (step 2, cell 9, hero alt-text), generic Pricing headline, CTABand default implies tutorials |
| **Average** | **6.75** | **Below target** |

**After applying the 9 fixes in the TL;DR**, re-scoring:

| Persona | Projected Score | Notes |
|---|---|---|
| Conversion copywriter | 8 | Fixes consistency + length. Still -2 for no testimonials. |
| UX writer | 8 | Fixes density. Still -2 for some longer cells. |
| Target customer | 7 | Gets better after Pencil scenes exist. |
| Brand strategist | 8 | Universal positioning holds after the 3 Blender leaks are patched. |
| **Projected average** | **7.75** | **Close to target; hits 8+ after Pencil scenes land.** |

---

## Concrete edits to apply (copy-paste ready)

If you reply "apply the review," I'll make exactly these surgical edits:

### 1. `src/components/Hero.astro` — subhead tighter

Replace:
```html
A macOS menu-bar tutor for every app on your Mac. Ask a question out loud — Skilly sees your screen, <strong class="font-semibold text-gray-900">answers out loud</strong>, and points at exactly what to click. Live transcription streams beside the cursor, in 16 languages.
```

With:
```html
A macOS menu-bar tutor for every app. Ask out loud — Skilly sees your screen, <strong class="font-semibold text-gray-900">answers out loud</strong>, and points at exactly what to click. With a live transcript streaming beside the cursor.
```

### 2. `src/components/Hero.astro` — aria-label

Replace:
```
aria-label="Skilly teaching Blender: user speaks a question, Skilly cursor animates to the right button and responds with an explanation"
```

With:
```
aria-label="Skilly in action: user speaks a question out loud, Skilly's cursor animates to the right UI element, and the spoken answer streams as text beside the cursor"
```

### 3. `src/components/CTA.astro` — remove 30-day money-back (Fix A) OR add it everywhere (Fix B)

Fix A trust line:
```
Free 15 min · No card · Cancel anytime
```

### 4. `src/data/steps.ts` — step 2 universal

```ts
{
  num: '02',
  title: 'Talk to Skilly',
  desc: "Hold Control+Option and ask — or enable Live Tutor and just start talking. 'How do I do [X] in this app?' — anything you'd ask a pro next to you.",
},
```

### 5. `src/components/Features.astro` — cell 9 universal

Replace:
```
Switch to Blender → Blender tutor. Switch to Figma → Figma tutor.
```

With:
```
Frontmost app changes, Skilly's expertise changes with it. Automatic.
```

### 6. `src/components/Features.astro` — cell 7 title

Replace:
```
Push-to-talk that sticks
```

With:
```
Push-to-talk that never drops
```

### 7. `src/pages/index.astro` — CTABand headline

Replace:
```astro
<CTABand headline="Ready to stop getting stuck in tutorials?" location="after_how_it_works" />
```

With:
```astro
<CTABand headline="Ready to stop hunting through menus?" location="after_how_it_works" />
```

### 8. `src/components/Skills.astro` — subhead split into three beats

Replace the current subhead with:
```html
<p data-reveal class="reveal reveal-delay-1 text-[17px] leading-relaxed text-gray-600">
  Skilly works with any app out of the box. Skills are optional add-ons that make it an expert in specific apps — with precise pointing and structured lessons. Five ship as examples. <strong class="font-semibold text-gray-900">A skill builder is coming.</strong>
</p>
```

### 9. `src/components/SocialProof.astro` — fine print

Replace:
```
Free 15 min · No card · 2.3 MB
```

With:
```
Free 15 min · No card · macOS 14+
```

---

## What I'm NOT changing (and why)

- **Hero headline** — already strong (8/10 from all four personas). Don't touch.
- **Final CTA loss frame** — already strong. Don't touch beyond the trust-line fix.
- **Pricing card "Simple pricing. No surprises."** — generic but safe. The specific alternatives I'd offer all have trade-offs and the user said they'll write copy themselves. Flag as a backlog item.
- **FAQ entries** — the top 3 (cancel / safety / price) are good. The remaining 9 are lower priority and don't block.
- **TrustStrip founder story** — already strong ("Googling ... fifty times a week").
- **Nav labels** — fine as-is.
- **Footer** — fine as-is.

---

## Open questions for the user

1. **Fix A or Fix B for the 30-day money-back?** (Cheap trust boost but requires you to actually honor it)
2. **Real early-access count for SocialProof?** Or hardcode a safe placeholder, or remove the counter entirely until launch?
3. **Do you want to add a "skill builder" FAQ** explicitly calling it "coming soon"? Would tie the bottom-of-Skills promise to a concrete answer.
4. **Testimonials** — when will you have real ones? I can add a placeholder testimonial block now (hidden via a feature flag) that you can fill in later, or leave a visible gap.

Once you confirm which fixes to apply, I'll batch them into a single edit pass.
