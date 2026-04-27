---
title: "How to enable Accessibility permissions on macOS (Tahoe + Sequoia)"
description: "Enable Accessibility for an app in macOS Tahoe 26 and Sequoia 15. What it actually grants, why apps need it, and how it differs from Screen Recording."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - macos
  - privacy
  - accessibility
  - permissions
canonicalKeyword: "enable accessibility permission macOS"
howTo:
  totalTime: "PT1M"
  tools:
    - "macOS Sonoma 14 or later"
  steps:
    - name: "Open System Settings"
      text: "Apple menu → System Settings (or System Preferences on Monterey and earlier)."
    - name: "Click Privacy & Security"
      text: "In the sidebar. Scroll down if you don't see it — it's below Apple Intelligence on Tahoe and Sequoia."
    - name: "Click Accessibility"
      text: "You may need to scroll within the Privacy & Security panel — Accessibility is usually below the App Management and Automation entries."
    - name: "Toggle the app on"
      text: "Find your app, flip the switch. macOS prompts you for your password or Touch ID to confirm."
    - name: "Restart the app"
      text: "Quit (Cmd+Q) and relaunch — Accessibility permission only activates on next launch."
faq:
  - question: "What does Accessibility permission actually grant an app?"
    answer: "Accessibility lets an app read and control other apps — read window contents through the Accessibility (AX) tree, send keystrokes and mouse clicks programmatically, observe focus changes, and inspect UI elements. This is significantly more powerful than Screen Recording. Screen Recording only lets an app see pixels; Accessibility lets an app DO things — type for you, click for you, navigate menus for you. Apps that automate workflows (text expanders, clipboard managers, app launchers, AI cursor tools) need it. Be cautious — only grant it to software you trust."
  - question: "How is Accessibility different from Screen Recording permission?"
    answer: "Screen Recording lets an app SEE your screen — capture pixels, watch what apps you have open, see what's on display. Accessibility lets an app CONTROL your Mac — send keystrokes, click buttons, read UI element labels through the AX tree. They're separate permissions because they enable different threat models. A screenshot app needs Screen Recording but never Accessibility. A keyboard automation tool needs Accessibility but might not need Screen Recording. Apps like Skilly need both because they observe (Screen Recording) AND can move the cursor for you (Accessibility)."
  - question: "Why doesn't my app appear in the Accessibility list?"
    answer: "Same as Screen Recording — apps only appear after they've requested permission. Two fixes: (1) launch the app and trigger the action that needs accessibility — macOS shows a prompt and 'Open System Settings' adds the app to the list automatically. (2) If you missed the prompt, click the + button below the list and navigate to /Applications/AppName.app to add it manually."
  - question: "I enabled Accessibility but the app still says permission is denied"
    answer: "Almost always: the app wasn't fully restarted after granting. Quit completely (Cmd+Q, not just close the window) and relaunch. macOS evaluates Accessibility permission only at process launch, so a restart is required. If that doesn't work, check that you didn't grant Accessibility to an old version of the app (e.g., from a previous beta) — remove the old entry with the - button and let the new app prompt fresh."
  - question: "Is there a weekly re-prompt for Accessibility like there is for Screen Recording?"
    answer: "No. macOS Sequoia 15's weekly re-prompt only applies to Screen Recording, not Accessibility. Once you grant Accessibility, it stays granted until you revoke it manually or update the app to a build with a different bundle identifier."
  - question: "Can an app have Accessibility access without Screen Recording, or vice versa?"
    answer: "Yes — the permissions are completely independent. A clipboard manager (Paste, Maccy) needs Accessibility but not Screen Recording. A screenshot tool (CleanShot, Shottr) needs Screen Recording but not Accessibility. Apps that automate based on what's visible on screen (Skilly, BetterSnapTool's window snapping with hover detection) often need both. Always check what the app says it needs in its permission prompts — and if it asks for more than it should for its stated purpose, that's a flag."
relatedArticles:
  - enable-screen-recording-permission-macos
---

If you've installed an app that automates anything on your Mac — a text expander, a clipboard manager, an app launcher with global hotkeys, or any AI tool that can move your cursor — you've hit Accessibility permission. This is the up-to-date guide for granting it on Tahoe 26 and Sequoia 15.

> Verified 2026-04-27 against Apple's [Allow accessibility apps to access your Mac](https://support.apple.com/guide/mac-help/allow-accessibility-apps-to-access-your-mac-mh43185/mac). Procedure has been stable since Ventura 13 — only the panel location moved slightly.

## What macOS version are you on?

Check **Apple menu → About This Mac**. The procedure is the same across recent versions, only the path differs slightly:

| Version | Path |
|---|---|
| **macOS Tahoe 26** (2026) | System Settings → Privacy & Security → Accessibility |
| **macOS Sequoia 15** (2024-2025) | Same path as Tahoe |
| **macOS Sonoma 14** | Same path |
| **macOS Ventura 13** | System Settings → Privacy & Security → Accessibility |
| **macOS Monterey 12 and earlier** | System Preferences → Security & Privacy → Privacy tab → Accessibility |

## The 5-step procedure

1. **Apple menu → System Settings** (or System Preferences on Monterey or older)
2. **Click "Privacy & Security"** in the sidebar — scroll if you don't see it
3. **Click "Accessibility"** within Privacy & Security (usually below App Management, Automation, and Files & Folders)
4. **Find your app and flip the switch on.** macOS asks for password or Touch ID
5. **Quit and restart the app** — `Cmd+Q`, not just closing the window. Accessibility only activates on next launch.

## What Accessibility actually grants

This is the permission that gives an app real power over your Mac. Specifically:

- **Read the AX tree** — a structured representation of every window, button, text field, and label currently visible. Apps use this to know "the user is in the Bevel modifier panel" without literally looking at pixels.
- **Send keystrokes** — type characters, simulate keyboard shortcuts, trigger system actions
- **Send mouse events** — click at coordinates, drag, scroll
- **Observe focus changes** — know which window or text field the user just clicked on
- **Inspect UI elements** — get labels, roles, and values of buttons and fields

Apps that legitimately need it: text expanders (TextExpander, Espanso), clipboard managers (Paste, Maccy), launcher apps (Raycast, Alfred), window managers (Rectangle, Magnet), accessibility tools for users with disabilities (the original use case), and screen-aware AI tools that can also control the cursor (Skilly).

Apps that should never ask for it: most screenshot tools, most chat apps, most browsers, most media players. If a single-purpose app asks for Accessibility without an obvious automation feature, that's a flag.

## Accessibility vs Screen Recording — the difference matters

These are often confused. They're separate for a reason:

| | Screen Recording | Accessibility |
|---|---|---|
| **Lets app SEE pixels** | ✅ | ❌ |
| **Lets app READ window contents (AX tree)** | ❌ | ✅ |
| **Lets app SEND keystrokes** | ❌ | ✅ |
| **Lets app SEND mouse clicks** | ❌ | ✅ |
| **Weekly re-prompt** | ✅ (Sequoia 15+) | ❌ |
| **Required by Skilly** | ✅ for screen capture | ✅ for cursor pointing |

Some apps need both, some need only one. Apple separated them so you can make informed grants — a screenshot tool gets Screen Recording but not Accessibility; a keyboard expander gets Accessibility but not Screen Recording.

## When the app isn't in the list

Apps only appear in the Accessibility list after they've requested the permission at least once. Two fixes:

**Option 1 (preferred):** Launch the app and trigger the feature that needs Accessibility. macOS shows a permission dialog. Click "Open System Settings" — the app gets auto-added to the list. Toggle on, restart the app.

**Option 2 (if you dismissed the prompt):** In the Accessibility panel, click the **+ button** below the app list. Navigate to `/Applications/`, pick the `.app` bundle, click Open. macOS adds it to the list with the toggle off; flip it on.

## "I enabled it but it's still denied"

Three causes, in order of frequency:

**1. You didn't fully quit the app.** This is by far the #1 cause. Closing the window keeps the process running, and Accessibility is checked at process launch only. `Cmd+Q` while the app is in focus, wait two seconds, relaunch.

**2. The app's bundle identifier changed** (e.g., upgraded from a beta to a release build, or replaced one app with a fork). macOS keeps the old entry separate. Click the - (minus) button to remove the stale entry, then let the new app prompt fresh.

**3. The app needs more than just Accessibility.** Some apps need Accessibility AND Input Monitoring AND Screen Recording. If only Accessibility is granted, parts of the app still won't work. Check the app's troubleshooting docs or its onboarding flow — most well-built apps walk you through every required permission.

## Privacy posture: what Skilly needs and why

Skilly requires both Screen Recording (to see what app you're using) and Accessibility (to move the cursor to the right button while answering your question). The Accessibility permission is what lets Skilly's blue cursor land on the actual Bevel slider in Blender, not just a generic "look here" arrow.

What Skilly does NOT do with Accessibility:
- Never types for you (we don't simulate keystrokes)
- Never clicks for you (cursor points; you click)
- Never reads other apps' windows in the background (capture is push-to-talk only)

The Accessibility grant is required by Apple's API model, but Skilly uses only the read+point subset, never the type-or-click-for-you subset. The full source is on [GitHub](https://github.com/tryskilly/skilly) if you want to verify.

## Try Skilly

Skilly is the AI tutor that watches your Mac screen and points at exactly what to click while answering you out loud. **15 minutes free, no card.**
