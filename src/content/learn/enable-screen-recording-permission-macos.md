---
title: "How to enable screen recording permission on macOS (Tahoe + Sequoia)"
description: "Step-by-step for macOS Tahoe 26 and Sequoia 15, plus the weekly re-prompt, the + button trick when your app isn't listed, and why you must restart the app."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - macos
  - privacy
  - screen-recording
  - permissions
canonicalKeyword: "enable screen recording permission macOS"
howTo:
  totalTime: "PT2M"
  tools:
    - "macOS Sonoma 14 or later"
  steps:
    - name: "Open System Settings"
      text: "Click the Apple menu in the top-left corner, then choose System Settings."
    - name: "Click Privacy & Security"
      text: "In the sidebar, click Privacy & Security. You may need to scroll down — it sits below Apple Intelligence and above Wallet & Apple Pay on Tahoe."
    - name: "Click Screen & System Audio Recording"
      text: "On Tahoe 26 and Sequoia 15, the panel is called 'Screen & System Audio Recording'. On Sonoma 14 it's still labeled 'Screen Recording'."
    - name: "Toggle the app on"
      text: "Find your app in the list and flip the switch to on. macOS will ask for your password or Touch ID to confirm."
    - name: "Restart the app"
      text: "Quit and reopen the app — permission only takes effect after a restart. macOS used to make this implicit; it's now explicit."
faq:
  - question: "Why doesn't my app show up in the list?"
    answer: "macOS only lists apps that have already requested screen recording. If yours hasn't been launched yet (or hasn't tried to capture the screen yet), it won't appear. Two fixes: (1) launch the app and trigger any feature that needs screen access — macOS prompts you, and the app then appears in the list. (2) Click the + button below the app list and navigate to the app yourself (typically /Applications/AppName.app). The + button workaround is what to use when the prompt was dismissed accidentally and won't reappear."
  - question: "Why does macOS keep asking me to re-grant permission every week?"
    answer: "macOS Sequoia 15 introduced this weekly re-prompt for any app that captures the screen — it's a privacy nudge, not a bug. Apple kept it in Tahoe 26. There's no setting to disable it. The good news: clicking 'Allow' takes one second, and you don't have to re-toggle anything in Settings — the prompt itself is the re-confirmation. Built-in screenshot shortcuts (Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5) bypass this since they're part of macOS itself."
  - question: "I toggled the switch on but the app still says permission is denied."
    answer: "Three causes, in order of likelihood. (1) You didn't restart the app — quit it fully (Cmd+Q, not just close the window) and relaunch. (2) On Tahoe 26, the panel is 'Screen & System Audio Recording' — if you only enabled an older 'Screen Recording' permission from a previous macOS upgrade, the new combined permission may need to be re-granted. (3) The app shipped with a different bundle ID than the one macOS remembers (e.g., you replaced an old version with a new build) — remove the old entry with the - button, then let the app prompt you fresh."
  - question: "Are the permission toggles greyed out?"
    answer: "On older macOS versions, you'd click a padlock at the bottom-left to unlock changes. On Tahoe 26 and Sequoia 15 there's no padlock — but you DO need to authenticate with Touch ID or your password every time you flip a privacy toggle. If toggles look unresponsive, check that the authentication prompt isn't hiding behind another window."
  - question: "Does enabling screen recording also let an app see my passwords or system audio?"
    answer: "Screen recording captures the visible pixels — anything visible on your display, including password fields if you have 'Show password' enabled. Most password managers blur or block password reveals during active screen capture as a defense. System audio is a separate sub-permission inside the same panel on Tahoe 26 — you can grant screen-only without audio, or both. Apps must declare which one they actually need; check the app's privacy policy."
  - question: "Can I revoke screen recording permission later?"
    answer: "Yes — toggle it back off in the same panel, or click the - (minus) button below the list to remove the app entirely. Revoking takes effect immediately for new screen captures, but any active capture session continues until the app stops it."
relatedArticles: []
---

If you've installed any Mac app that records, mirrors, or analyzes your screen — Zoom, OBS, Loom, CleanShot, Skilly, AnyDesk — you've hit macOS's Screen Recording permission gate. This guide is the up-to-date path through it.

> Verified 2026-04-27 against Apple's official guide at [support.apple.com/guide/mac-help/control-access-screen-system-audio-recording-mchld6aa7d23/mac](https://support.apple.com/guide/mac-help/control-access-screen-system-audio-recording-mchld6aa7d23/mac). The procedure changed slightly in **Tahoe 26** (the panel is now called *Screen & System Audio Recording*) and gained a weekly re-prompt in **Sequoia 15** (15.0+).

## What macOS version are you on?

Check **Apple menu → About This Mac**. The procedure differs slightly by version:

| Version | Panel name | Special behavior |
|---|---|---|
| **macOS Tahoe 26** (2026) | Screen & System Audio Recording | Weekly re-prompt for screen capture apps |
| **macOS Sequoia 15** (2024-2025) | Screen & System Audio Recording | Weekly re-prompt introduced |
| **macOS Sonoma 14** | Screen Recording | No weekly re-prompt |
| **macOS Ventura 13** | Screen Recording | Located in System Settings (renamed from System Preferences) |
| **macOS Monterey 12 and earlier** | Screen Recording | Located in System Preferences |

The rest of this guide assumes Tahoe 26 or Sequoia 15. For older versions, the underlying flow is the same — only the panel name changes.

## The 5-step procedure (Tahoe 26 / Sequoia 15)

1. **Apple menu → System Settings.** (System Preferences if you're on Monterey or earlier.)
2. **Click "Privacy & Security"** in the sidebar. Scroll down if you don't see it — Apple put a lot above it on recent versions.
3. **Click "Screen & System Audio Recording".** On Sonoma 14 this is "Screen Recording".
4. **Find your app in the list and flip the switch.** macOS asks for your password or Touch ID to confirm.
5. **Quit and relaunch the app.** Permission only activates on next launch. `Cmd+Q` (not just closing the window) → reopen.

That's the happy path. Now for the things that break.

## When your app isn't in the list

This is the #1 support question for any Mac app that needs screen recording. The list only shows apps that have **already tried** to access screen recording — fresh installs that haven't run yet won't appear.

Two ways to fix it:

**Option 1 (easier):** Launch the app and trigger whatever feature needs screen access. macOS shows a permission dialog. Click "Open System Settings" — the app gets added to the list automatically. Then toggle on, restart the app, you're done.

**Option 2 (if you dismissed the prompt):** In the Screen & System Audio Recording panel, click the **+ (plus) button** below the app list. A file picker opens. Navigate to `/Applications/`, pick the app's `.app` bundle, and macOS adds it. Then toggle the switch on.

## The weekly re-permission prompt (Sequoia 15+)

Apple introduced this in macOS 15.0. Roughly **once a week**, any app that captures your screen will trigger a system dialog: *"YourApp can record this Mac's screen and audio. Allow it to continue recording?"* with three options: Allow For One Month, Continue, or Quit & Open System Settings.

This isn't a bug. Apple's stated rationale: privacy hygiene — make sure you're aware which apps are still listening. In practice it adds 1-2 seconds of friction per week per app.

There is **no setting to disable this prompt**. Built-in macOS screenshot shortcuts (`Cmd+Shift+3/4/5`) skip it because they're part of the OS, not third-party apps.

If you find a tutorial telling you to disable SIP or modify TCC databases to bypass this — don't. You'll break unrelated security features and the prompt comes back on the next OS update anyway.

## "I enabled it but the app still says permission is denied"

Three things to check, in order of how often they're the cause:

**1. You didn't fully quit the app.** Closing the window isn't enough. Press `Cmd+Q` while the app is in focus, wait two seconds, then relaunch. macOS evaluates permissions at process start.

**2. App was upgraded and the bundle identifier changed.** If you replaced the app with a new build (especially during beta), macOS may have a stale entry for the old version. Click the **- (minus) button** to remove the old entry, then trigger the permission prompt fresh from the new app.

**3. You enabled "Screen Recording" on Sonoma but upgraded to Tahoe.** The panel was renamed and consolidated. On Tahoe, the new "Screen & System Audio Recording" entry may need re-granting even if the old one shows enabled. Toggle off, toggle on, restart the app.

## What screen recording actually captures

When an app has screen recording permission:

- **Visible pixels** — anything currently rendered on your display(s). This includes private windows from other apps, password fields if you reveal them, and notifications.
- **System audio** — only if you also grant System Audio (separate sub-permission on Tahoe 26).
- **NOT keystrokes** — keystroke logging requires Accessibility permission, which is separate.
- **NOT clipboard contents** — that's a third permission again.

The panel name on Tahoe 26 — "Screen & System Audio Recording" — is precise: it controls exactly two things. Keystrokes and clipboard need their own grants.

## Privacy posture for a screen-aware AI tutor (the Skilly version)

Skilly only captures the screen while you're holding `Control+Option` and asking a question. The capture stops the moment Skilly's done answering — it's not a continuous stream. The video frames go to OpenAI Realtime for that question, and aren't stored on Skilly's servers. We block AI training corpus crawlers (CCBot) at the site level so nothing about how Skilly works leaks into model training.

If you want the technical detail, the macOS API Skilly uses is `ScreenCaptureKit` — Apple's official, sandboxed screen capture API introduced in macOS 12.3. It's the same one Apple's own Screen Saver, Migration Assistant, and Continuity tools use. No private APIs, no LSUIElement workarounds.

## Try Skilly

Skilly is the AI tutor that needs that screen recording permission you just figured out. Voice-first, watches your Mac screen, walks you through whatever app you're stuck in. **15 minutes free, no card.**
