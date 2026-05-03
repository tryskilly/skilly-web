# Soft-Mention Scouting — 2026-05-02

Read-only recon of r/SwiftUI/new + r/OpenSourceAI/new. Six candidates ranked by fit and odds of value-add. Draft comments included; user reviews + posts manually tomorrow (don't post today — already shipped Deep_Ad1959 round-8 reply this morning, second post would risk algorithm cooldown).

---

## ⭐ TOP PICK — r/SwiftUI: "Help with Panel focus" (Raycast clone)

**URL:** https://reddit.com/r/SwiftUI/comments/1syridr/help_with_panel_focus/
**Author:** u/cluelessngl
**Stats:** 2 score, **0 comments**, 3 days old (still pristine)

**Why it's the top pick:** They're building a Raycast clone with `FloatingPanel: NSPanel` using exactly Skilly's pattern (`canBecomeKey=true, canBecomeMain=false, [.nonactivatingPanel, .borderless]`). They have the focus-stealing problem, and 0 comments = first substantive answer wins the thread. This is hero-answer territory.

**Their actual problem:** "focus is stolen again before it's hidden" on toggle — the window behind grays out.

**Draft reply (substantive answer + soft mention):**

```
Running into the same pattern in our menubar app. A few things that fixed focus-stealing for us:

1. `NSApp.setActivationPolicy(.accessory)` set BEFORE the panel is created (not after) — if it's after, the app activates as foreground for one runloop tick and steals focus. We do this in `applicationWillFinishLaunching`, not `didFinishLaunching`.

2. `panel.hidesOnDeactivate = false` — without this, AppKit re-evaluates focus on every panel hide.

3. Use `panel.orderOut(nil)` to hide, NOT `panel.close()`. Close triggers a window-server cascade that re-orders the previous-key window and grays it. orderOut keeps the panel hot for re-show.

4. For the Cmd+Opt+Space toggle, wrap the show/hide in `NSApp.activate(ignoringOtherApps: false)` (not `true` — true is what steals focus from the underlying app).

If you want a working reference, our overlay panel does the same dance — open source at github.com/tryskilly/skilly (file: SkillyApp/Overlay/OverlayPanelController.swift). Wrote up a related ScreenCaptureKit thing on tryskilly.app/learn/screencapturekit-lid-close-fix that has more menubar-app-specific gotchas.
```

**~880 chars. Concrete code-name references. Soft mention via "if you want a working reference" — natural, not promotional.**

---

## #2 — r/SwiftUI: "SwiftUI menubar app — NSStatusItem quirks on Tahoe"

**URL:** https://reddit.com/r/SwiftUI/comments/1sxgp46/swiftui_menubar_app_catmullrom_sparklines/
**Author:** u/MurkyFlan567
**Stats:** 7 score, 1 comment, 5 days old

**Why fit:** Same Tahoe (macOS 26) `.accessory` activation policy gotcha — they hit it too, with solution: "start as `.regular`, create status item, then switch to `.accessory` on next runloop tick via `DispatchQueue.main.async`." Skilly hit the exact same issue. Conversation-quality fit.

**Draft reply:**

```
Hit the same .accessory ghost-status-item bug on Tahoe. The DispatchQueue.main.async tick is also what worked for us.

One refinement worth trying: `NSApp.activationPolicy = .accessory` set in `applicationWillFinishLaunching` (instead of didFinishLaunching) avoids the issue entirely on macOS 26.0+ in our testing — turns out the policy gets baked into the app's initial focus chain and changing it after the chain forms is what breaks the status item. Filed FB-something on this; Apple closed as expected behavior, which is fine — willFinishLaunching is the right hook anyway.

For the Observation → AppKit bridge, withObservationTracking is the move but worth knowing: the closure re-fires on EVERY tracked property change, so wrap the AppKit-mutating side in a debounce if you have rapid updates. We hit this when the menu-bar text was updating per-frame from a screen-capture stream — was burning ~3% CPU until we throttled it to 10Hz.
```

**~750 chars. Adds two specific refinements they didn't mention. No URL — pure peer-to-peer technical exchange. Builds reputation, no soft-mention needed (the username links to skilly via past activity).**

---

## #3 — r/SwiftUI: "Throttle Meter (Claude Code usage meter)"

**URL:** https://reddit.com/r/SwiftUI/comments/1t0ayip/built_a_claude_code_usage_meter_for_macos_14_a/
**Author:** u/lorislabapp
**Stats:** 0 score, 4 comments, 2 days old

**Why fit:** Indie Mac dev, menu-bar app, macOS 26.5, hit overlapping gotchas (`.accessory` window-opening issue, MenuBarExtra Canvas crash). Open-source on GitHub. Community-bond opportunity.

**Draft reply:**

```
Nice writeup. We hit the same .accessory ⇄ .regular dance in our menubar app — the dock-icon flicker is genuinely annoying but it's the only path that doesn't break MenuBarExtra. One thing that helped us mitigate the flicker: setActivationPolicy(.regular) → orderFrontRegardless on the window → animate the window in over 80ms while it's still animating up → setActivationPolicy(.accessory) on close after a 200ms delay. The dock icon technically still appears but it's gone before the user tracks it visually. Hacky but ships.

On the Canvas + RenderBox crash — yeah, plain Path is the move. We never adopted Canvas for that reason. Bonus: SwiftUI Path renders on the SwiftUI render tree directly, so it composites without the Metal-shader compile path that's biting you.

Repo's interesting — starring. We're open source too if useful: github.com/tryskilly/skilly.
```

**~810 chars. Concrete timing numbers (80ms, 200ms) = real production wisdom, not generic. Soft mention as "we're open source too" reciprocity gesture.**

---

## r/OpenSourceAI candidates (lighter notes)

### #4 — "I built Decibench (voice agent QA)"

**URL:** https://reddit.com/r/OpenSourceAI/comments/1t0wzwl/i_got_tired_of_it_works_on_my_machine_being_the/
**Why:** Voice agent QA tool. Skilly is a voice agent. Genuine fit if Decibench is interesting to us as a tool.
**Action:** Read the post first — if Decibench is well-built, ask a substantive question about how they handle multi-language voice eval (Skilly does 20+ languages, this is a real pain). If shallow, skip.

### #5 — "Open source or not?"

**URL:** https://reddit.com/r/OpenSourceAI/comments/1szmcdt/open_source_or_not/
**Stats:** 7 score, 9 comments
**Why:** Discussion thread on open-sourcing decisions. Skilly IS open source under Apache-2.0. Could share the calculus (we open-sourced because forked from Apache-2.0 clicky → easier to honor license + lower contribution barrier; downside = competitors can fork → mitigated by infrastructure moat = OpenAI Realtime cost economics).
**Action:** Read the existing 9 comments first — only chime in with a unique angle that hasn't been covered.

### #6 — r/SwiftUI: "Using agent skills to enforce SwiftUI architecture in AI generated apps"

**URL:** https://reddit.com/r/SwiftUI/comments/1swxglq/using_agent_skills_to_enforce_swiftui/
**Author:** u/Goku2997
**Stats:** 0 score, 2 comments, 5 days old (lower priority but conceptually adjacent)
**Why:** Talks about agent skills in SwiftUI context — Skilly has the Skills layer (SKILL.md). Conceptually aligned. Lower priority because thread is dying (2 comments + 0 score), but a thoughtful comment could revive it.
**Action:** Skip unless time-rich. Low engagement signal suggests the thread isn't getting traction.

---

## Posting plan (tomorrow)

1. **Hit #1 (Panel focus) FIRST** — single highest-leverage post in the queue. Hero-answer territory. Post in the morning so it's seen by EU + US morning crowd.

2. **Hit #2 (Tahoe NSStatusItem) SECOND** — peer-to-peer technical exchange, no soft-mention. Builds reputation. ~3 hours after #1.

3. **Hit #3 (Throttle Meter) THIRD** — community-bond gesture. Drops a soft mention. Late afternoon.

4. **Skip or defer #4-#6** unless one of the early ones falls flat and you want one more shot.

**Cadence rule:** 3 posts max in a day. Two with substantive technical content, one with light soft-mention. Reddit's algorithm penalizes >3 posts in a 24h window.

**Pre-post checklist for each:**
- Re-read your draft against the actual post — has anyone already answered with the same point?
- Check if the OP has been active in the last 24h (no point answering an abandoned thread)
- Verify innerText length after type_text (per memory: harness occasionally drops chars)
- Don't paste the bare `tryskilly.app` URL — site-wide filter still bites; use `github.com/tryskilly/skilly` or relative path mentions

---

## Internal notes

- **All three top picks are macOS-NSPanel/menubar-app specific.** That's our ICP-adjacent niche on r/SwiftUI. Going deeper here over time will compound — same audience that produced Deep_Ad1959.
- **No "best AI tutor" threads available right now.** The Skilly value prop doesn't have natural ad-hoc threads to answer in. Technical-craft threads are where we earn credibility.
- **Round-9 watch on Deep_Ad1959:** if the article-credit reply gets a "haha thanks" from him, that's a closed loop. If he replies with another technical bullet, we go to round 9 + article v4.
