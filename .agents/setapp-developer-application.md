# Setapp Developer Application — Skilly

**Form URL:** https://developer.setapp.com/ (developer signup → app submission)
**Submitter:** Mohamed Saleh Zaied (Eng.mohamedszaied@gmail.com)
**App:** Skilly — voice-first AI tutor for Mac
**Bundle ID:** app.tryskilly.Skilly *(verify in Xcode before submitting)*

---

## 1. Form-ready answers

### App name
Skilly

### Tagline (max 60 chars)
Voice tutor that watches your Mac screen and teaches you live

### Category
Productivity *(secondary: Education)*

### Short description (max 250 chars)
Skilly is a menu-bar AI tutor that sees your screen and teaches you out loud, in any app. Press a shortcut, ask a question — Skilly screenshots your active app, points the cursor at the exact button, and narrates the answer in 20+ languages.

### Long description (~800 chars)
Skilly is a native Mac menu-bar app that combines real-time screen capture with voice AI to act as a patient on-demand tutor for any application you use. Built on a single-call OpenAI Realtime API pipeline (no separate STT/LLM/TTS stack), Skilly delivers sub-second latency between "user speaks" and "screen-aware response."

Native Swift, ScreenCaptureKit, NSPanel-on-every-space. macOS 14.2+. Open source under Apache-2.0 (github.com/tryskilly/skilly).

What sets Skilly apart from other AI tools: it sees what you see, points the physical cursor at the UI element you need, and speaks back in your language. Works in Blender, Figma, After Effects, DaVinci Resolve, Premiere Pro, Excel, browsers — anywhere on your Mac. Each app gets a "Skill" (a Markdown curriculum file) that defines deeper teaching context; users can author their own.

### Why Setapp users would want it
Setapp's audience is creative pros, productivity power users, and indie devs — exactly the people who jump between unfamiliar Mac apps weekly and lose hours to YouTube tutorials and Google searches. Skilly turns every Mac app into a guided experience. Particularly relevant for non-English-native Setapp subscribers (Skilly handles 20+ languages with auto-detect, including Arabic, Chinese, Japanese RTL/CJK).

### Technical readiness
- Native Swift (no Electron, no web wrapper)
- macOS 14.2+ minimum (uses ScreenCaptureKit APIs only available in 14.2+)
- Code-signed + notarized for direct distribution
- Sandboxed where ScreenCaptureKit permits (full sandboxing requires entitlement work — happy to discuss with Setapp's tech review)
- No telemetry beyond anonymous PostHog analytics; OpenAI contractually blocked from training on session data
- Currently in $19/mo beta via Polar; ready to integrate Setapp's licensing/auth flow

### Pricing model fit (proactive)
Skilly's per-minute infrastructure cost (OpenAI Realtime API: voice + vision) is non-trivial — meaningfully higher than typical Setapp utilities. Three options I'd want to discuss with Setapp's commercial team:

1. **Capped-hours Setapp tier** — Setapp users get N hours/month included; usage above cap requires a top-up or upgrade.
2. **BYOK-only Setapp tier** — Setapp users bring their own OpenAI API key; Skilly is the client. Lower margin to me, but cost-neutral for Setapp.
3. **Standard Setapp pricing** — accept the per-active-user payout and absorb the variable cost; viable only if Setapp can guarantee a meaningful active-user floor.

Open to whichever model lands best for Setapp's economics.

### Founder
Mohamed Saleh Zaied — solo indie dev, based in Saudi Arabia. 12 years iOS/macOS experience. Skilly is built on top of Farza Majeed's open-source clicky (github.com/farzaa/clicky), Apache-2.0 licensed. Active on r/SwiftUI publishing technical writeups (e.g., 8-round ScreenCaptureKit lid-close handling thread at tryskilly.app/learn/screencapturekit-lid-close-fix).

### Links
- Website: https://tryskilly.app
- Source: https://github.com/tryskilly/skilly
- Launch video (~50 sec): https://youtu.be/M29K4g5Z_NA
- Technical writeup (proof of native craft): https://tryskilly.app/learn/screencapturekit-lid-close-fix
- Founder X: https://x.com/moelabs_dev

### Build delivery
Direct DMG available at tryskilly.app/download. Happy to ship a signed/notarized review build to a Setapp test-flight equivalent — let me know preferred channel.

---

## 2. Internal pitch notes

### Why Setapp
- Aligned audience: Setapp users are exactly Skilly's ICP (creative pros + productivity nerds who pay for tools)
- Distribution leverage: Setapp = ~50K+ subscribers, predictable monthly bundle position
- Brand halo: Setapp inclusion = independent stamp of native-Mac craft

### Risks / tension points
1. **Pricing model is the real question.** Setapp's flat-rate-to-developer model assumes low marginal cost per use. Skilly has high marginal cost (OpenAI Realtime API) — this WILL come up in commercial review. The proactive 3-options framing is an attempt to get ahead of it. If Setapp pushes back, the BYOK-only tier is the cleanest path forward.
2. **Sandboxing.** Setapp prefers fully-sandboxed apps. ScreenCaptureKit + cursor control (CGEvent-based) means we need specific entitlements. This needs Xcode review before submission to confirm entitlement story is clean.
3. **Approval timeline.** Setapp dev approval typically takes 4-8 weeks. Don't block on this — keep direct distribution + Polar billing as the primary channel.

### Pre-submit checklist (do these BEFORE filling the form)
- [ ] Verify bundle ID matches what's in Xcode build settings
- [ ] Confirm the build at tryskilly.app/download is the latest signed + notarized version
- [ ] Take 5 fresh screenshots: hero menu-bar shot, cursor-pointing-at-Blender shot, language picker shot, skills marketplace shot, voice-bubble shot (1280x800 minimum)
- [ ] Decide Setapp pricing tier preference upfront (recommend opening with option #2 BYOK-only — easiest to defend)
- [ ] Check the github.com/tryskilly/skilly repo is public + Apache-2.0 LICENSE file is present at root

### Follow-up cadence
- Setapp typically responds within 2-3 weeks on initial review
- If silent past 4 weeks, ONE polite check-in via the developer portal
- If approved, expect a 4-6 week integration sprint (Setapp licensing SDK swap + commercial terms negotiation)

### What I'd bet
~50% chance of acceptance on first pass. The pricing-model question is the one that derails most AI app applications to Setapp. Lead with willingness to flex on that and the odds improve.
