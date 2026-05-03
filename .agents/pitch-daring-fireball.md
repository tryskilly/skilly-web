# Daring Fireball Pitch — Skilly

**To:** gruber@daringfireball.net
**From:** Mohamed (Eng.mohamedszaied@gmail.com), founder
**Subject:** Native Mac voice tutor built on ScreenCaptureKit — 5-day fork of Farza's clicky, single-call Realtime API

---

John —

Skilly is a menu-bar Mac app that watches your screen and teaches you out loud, in real time, in any app. Built on Farza's open-source clicky in 5 days, then taken in a different direction: replaced the TTS+STT+LLM 3-stack with a single-call OpenAI Realtime API pipeline so the latency between "user speaks" and "Skilly responds with screen context" is sub-second, not the 3+ seconds clicky and most voice agents land at.

Three things I think might actually interest you:

1. **It's native Swift, ScreenCaptureKit, NSPanel-on-every-space, no Electron, no web wrapper.** The whole thing renders in a translucent menubar overlay that follows you across spaces and full-screen apps without flickering. macOS 14.2+ only.

2. **The ScreenCaptureKit work is non-trivial.** I shipped an 8-round technical writeup on r/SwiftUI ([thread](https://reddit.com/r/SwiftUI/comments/1svpmif/)) with another Mac dev about lid-close handling, SCFrameStatus gating, content-hash dedup, and queueDepth tuning. It's the only public writeup of any of those details that I've found. Article version with full code: tryskilly.app/learn/screencapturekit-lid-close-fix.

3. **It's open source.** Apache-2.0, github.com/tryskilly/skilly. Originally to honor the clicky license but it's turned into a small contribution magnet. Anyone can fork it and ship their own version.

Pricing is $19/mo for 3 hours of tutoring — BYOK option is in beta for power users who'd rather burn their own OpenAI credits.

If any of this is the kind of thing you'd link, the YouTube launch video (~50 sec, no voiceover) is at https://youtu.be/M29K4g5Z_NA. Happy to send a free Pro key — and if you'd rather just try it without that, the 15-minute trial covers a real session.

Either way, thanks for reading.

— Mohamed
@moelabs_dev
github.com/tryskilly/skilly

---

## Pitch notes (internal)

- **Why DF**: Gruber covers native Mac apps with craft + indie devs + Apple-ecosystem deep-cuts. Skilly checks all three. The ScreenCaptureKit thread is the strongest proof-of-craft we have.
- **News hook used**: 5-day fork from Farza's clicky + single-call Realtime API replacing 3-stack. Both are technically distinctive enough to be linkable on their own.
- **Risk**: DF pitches are read but rarely posted (~1/50). The article link is the strongest single asset — Gruber respects deep technical writeups.
- **Followup**: If no response in 14 days, do NOT re-pitch. One shot. Move to the next outlet.
- **Avoid**: Don't mention "AI tutor" generically (Gruber is allergic to AI hype copy). Lead with native Swift + ScreenCaptureKit specificity.
