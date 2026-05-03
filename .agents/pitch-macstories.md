# MacStories Pitch — Skilly

**To:** federico@macstories.net (cc: john@macstories.net)
**From:** Mohamed (Eng.mohamedszaied@gmail.com), founder
**Subject:** Voice tutor that watches your Mac screen — works in 20+ languages, native Swift, indie launch

---

Hi Federico (cc John) —

I built Skilly, a Mac menu-bar app that watches your screen and teaches you out loud, in real time, in any app you open. Native Swift, ScreenCaptureKit, no web wrapper. I think it might land for MacStories for a few specific reasons:

**1. Voice-first interaction in 20+ languages with auto-detect.** Switch from English to Arabic to Japanese mid-sentence and Skilly follows. The Realtime model handles the language detection — no settings menu, no model picker. Federico, given your accessibility writeups, the voice-first flow has been the single most-mentioned thing in user feedback from non-developer testers (60+yo parents using it to learn Excel, kids using it in school for homework).

**2. Skills layer = a curriculum format anyone can author.** Each app gets a `SKILL.md` file that defines what Skilly should teach in that app and how. The Blender skill walks through modifiers; the Figma skill walks through Auto Layout; etc. They're plain Markdown — power users can write their own and share them. Open source under Apache-2.0, so the community can ship skills as PRs (github.com/tryskilly/skilly).

**3. Forked from Farza's open-source clicky in 5 days, then taken in a different direction.** Replaced the TTS+STT+LLM 3-stack with a single-call OpenAI Realtime API pipeline — sub-second latency between "user speaks" and "Skilly responds with screen context." The technical-craft proof is an 8-round r/SwiftUI thread on ScreenCaptureKit lid-close handling: tryskilly.app/learn/screencapturekit-lid-close-fix.

Pricing: $19/mo for 3 hours of tutoring, 15-min free trial, BYOK in beta. macOS 14.2+.

Launch video (~50 sec, no voiceover, captions on): https://youtu.be/M29K4g5Z_NA.
GitHub: https://github.com/tryskilly/skilly.

Happy to send a free Pro key for either of you, or jump on a 10-min screen share to walk through the skills layer if that's helpful.

Thanks for reading.

— Mohamed
@moelabs_dev

---

## Pitch notes (internal)

- **Why MacStories**: Federico's coverage angles (accessibility, automation, multi-language, productivity, indie) all line up. John Voorhees does most Mac app deep-dives. Higher coverage rate than DF (~1/15 vs DF's ~1/50).
- **Hooks used**: Multi-language Realtime auto-detect (Federico's i18n angle), Skills layer = Markdown curriculum (his Shortcuts/automation angle), open-source indie origin (his MacStories-values angle).
- **Risk**: MacStories audience skews iOS more than Mac. The Mac-only pitch needs to lean hard on the "this is something you can't do on iOS" framing.
- **Followup**: If no response in 14 days, ONE polite nudge with one new piece of info (e.g., user count, a recent feature ship, a press mention from elsewhere). Then drop.
- **Offer the screen share** — Federico has done this for indie tools before. It's a higher-effort ask but materially raises odds of coverage.
