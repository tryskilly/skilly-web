# PostHog Permissions Leak Diagnostic — 2026-05-02

**Window:** Last 30 days
**Caveat:** Sample is tiny (14 unique downloads). Patterns are signal, not statistical certainty. Ad blockers drop 10-25% per PostHog warning, so actual numbers are likely 1.2× higher.

## Funnel (unique people)

| Step | People | Events | Drop from prev |
|------|--------|--------|----------------|
| `web_cta_download_clicked` | 14 | 19 | — |
| `app_opened` | 9 | 101 | -36% |
| `permission_granted` (any) | 8 | 262 | -11% |
| `all_permissions_granted` | 5 | 70 | **-38%** ⚠️ |
| `onboarding_started` | 3 | 4 | -40% |
| `trial_started` | 3 | 4 | 0% |

**Net: 14 downloads → 3 trials = 21% conversion.**

## The 3 stuck-mid-permissions users

### Person A: `0a9c0d20-1bb1-5452-9770-f3f309a6d87a` ⭐ MOST INTERESTING
- **Identified user:** `user_01KPVT9Z0ZGJJ9B1A4CGJAVWBK`
- **Sessions:** `019db7a2-20b8-7be7-9754-2ffc7a0d1343`, `019db7a0-deda-76bd-97dc-4f0a46250d8a`
- **Events seen:** `onboarding_demo_triggered`, `app_opened`, `permission_granted`, `onboarding_video_completed`, `onboarding_replayed`, `$identify`, `onboarding_started`, `trial_first_turn`, `push_to_talk_started`, `user_message_sent`, `push_to_talk_released`, `trial_started`
- **The pattern:** This user is *actively using the product* — `trial_first_turn`, `push_to_talk_started`, `user_message_sent` all fired. They have enough permissions to send messages and use voice. **They're missing only the LAST permission** (most likely Accessibility, since cursor-pointing isn't fundamental to voice+screen capture).
- **Replay URL:** https://us.posthog.com/project/376182/replay/019db7a2-20b8-7be7-9754-2ffc7a0d1343
- **Hypothesis:** The user skipped Accessibility because they didn't see the value (or were spooked by the wording). Cursor control is the "wow" moment in your demo — losing it means the product feels like just a voice assistant.
- **Action:** Re-prompt for Accessibility *contextually* (e.g., when user asks a "where do I click" question, show "I can do that — grant Accessibility?" inline rather than at onboarding).

### Person B: `e2f53f2b-0921-533a-9fa4-8a9f3be58166` ⚠️ THE CANARY
- **Anonymous only** (never identified — no email/account tie)
- **Sessions:** `019dcb93-b122-745e-bd6d-7afba017ca29`, `019dcb93-6aea-7d4d-8dca-51acb51ce6f3`
- **Events seen:** `app_opened`, `permission_granted` (just 2 events total)
- **The pattern:** Opened the app, granted ONE permission, **vanished**. Total interaction = ~30 seconds based on event volume.
- **Replay URL:** https://us.posthog.com/project/376182/replay/019dcb93-b122-745e-bd6d-7afba017ca29
- **Hypothesis:** They saw the second permission prompt (probably Screen Recording or Microphone) and quit. Classic permission-fatigue bail.
- **Action:** Watch the replay to confirm WHICH permission dialog appeared right before they quit. If Screen Recording → softer copy + a "why we need this" inline explainer. If Microphone → unusual, since people are used to mic prompts; could be a UI bug.

### Person C: `70bb1de8-3544-5b66-a900-5f6c7eeb1401`
- **Identified user:** `user_01KQDFD4SC887X7DB160EWEE6N`
- **Sessions:** `019ddaf4-d2b3-7414-ab07-22de4dfa26be`, `019ddaef-897c-7eb4-b637-a047bb4b54b5`
- **Events seen:** `app_opened`, `permission_granted`, `$identify`, `onboarding_started`
- **The pattern:** Got further than B (identified themselves = probably tied an email), entered onboarding, but never started a trial. No trial_first_turn either.
- **Replay URL:** https://us.posthog.com/project/376182/replay/019ddaf4-d2b3-7414-ab07-22de4dfa26be
- **Hypothesis:** They identified themselves expecting onboarding to "just work" but hit something — either a bug, a confusing UI, or a third permission prompt during onboarding.
- **Action:** Watch the replay. If they got to a screen and stared at it for 60+ seconds before quitting, that screen needs a CTA fix. If they hit an error/crash, that's a bug.

## Cross-cutting recommendations

1. **The biggest leak is 8 → 5 (38%) at "any-permission → all-permissions".** This is where Person A lives — actively using the product but never closed the loop. Three concrete fixes worth A/B testing:
   - **Defer Accessibility to first contextual ask.** Don't ask up-front. Wait until the user says something like "where do I click" or "show me" — THEN ask, with the context as the "why."
   - **Reframe Screen Recording's permission copy.** macOS's stock copy is scary. Use an inline pre-prompt (your own UI) before triggering the system dialog. Pre-prompt should say something like "Skilly only sees your screen while you're talking. We don't store anything. Click Allow on the next prompt."
   - **Add a `permission_skipped` event.** Fire it explicitly when a user dismisses a permission prompt without granting. Right now we can only INFER skipping by absence. Logging it makes the funnel countable + lets us re-prompt.

2. **Web → App is 14 → 9 (36% drop).** This is install friction, not in-app. To diagnose:
   - Add a `web_cta_download_clicked` follow-up: track if the user returns to the website after clicking download. If they bounce and never return, they probably hit the Gatekeeper "unverified developer" warning and gave up. Notarization should be 100% verified for every release.
   - Consider a post-download landing page with "Stuck? See install steps" — lets users self-rescue from Gatekeeper without abandoning.

3. **Add a desktop-app session-replay SDK.** PostHog iOS SDK 3.x supports session recording on iOS — verify if it works on macOS too. If yes, enable it for the desktop app. Then we'd see WHICH permission dialog Person B saw before quitting. If no, the next-best diagnostic is a high-cardinality `permission_prompt_shown` event with the permission type as a property.

4. **Sample size action:** 14 downloads / 30 days = ~0.5/day. We need ~50+ for any quantitative confidence. Until then, each individual session replay is worth more than aggregate stats. **Watch all 3 of these replays personally.**

## What I did NOT find

- No `permission_denied` event exists. We can't see explicit denials, only the absence of grants. Add this event.
- No `app_quit` event exists. We can't see when users quit the app post-permission. Add this.
- No `permission_prompt_shown` event with type. We can't tell which permission was the last one shown. Add this.

## Next session

If you want, I can wire up the three events above (`permission_denied`, `app_quit`, `permission_prompt_shown` with type) by editing the Skilly Swift codebase. Estimate: 30 min in the permission-handling code path, plus a release.
