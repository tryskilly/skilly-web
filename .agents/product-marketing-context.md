# Product Marketing Context

*Last updated: 2026-04-16*

## Product Overview
**One-liner:** An AI tutor for your Mac that sees your screen, moves the cursor, and speaks you through any app.
**What it does:** Skilly lives in your macOS menu bar. You press a shortcut (or enable Live Tutor) and ask out loud — "how do I add a bevel?" — and it screenshots your active app, moves the cursor to the exact UI element, and narrates the answer in your language. Works in every Mac app; ships with deeper "skills" for Blender, Figma, After Effects, DaVinci Resolve, and Premiere Pro.
**Product category:** AI copilot / voice-first learning assistant for desktop apps (category-creating — adjacent to Arc Search, Granola, Rewind, Cursor, one-on-one video tutorials)
**Product type:** Native macOS app, subscription SaaS (downloaded DMG, in-app billing via Polar)
**Business model:** Beta: $19/month for 3 hours of live voice+vision tutoring. 15 min free (no card). Beta capped at 50 users with price locked for life. Multi-tier + annual planned post-beta.

## Target Audience
**Target companies:** Individual creators and knowledge workers (not enterprise yet). Solo freelancers, indie makers, small teams. People who pay for their own tools.
**Decision-makers:** End user = buyer. No committee.
**Primary use case:** "I'm stuck in [Blender / Figma / Excel / a new tool] and hunting through menus to figure out how to do the thing I want."
**Jobs to be done:**
- Get unstuck in a creative or productivity app without leaving the app to Google / YouTube
- Learn a new tool faster than watching hour-long tutorials
- Get help in your native language even when the app and docs are English-only
**Use cases:**
- Creative pros jumping between apps (motion designer learning Blender, video editor trying DaVinci)
- Non-English speakers using English-only pro software
- Self-taught learners who bounce off 60-minute YouTube tutorials
- People doing occasional tasks in Excel / Notion / niche apps they don't master
- Career switchers picking up a design or 3D tool for the first time

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| The context-switching creative pro | Shipping today's deliverable, not learning | Knows Figma cold but keeps getting stuck in After Effects / Blender / Resolve | One tool that teaches every app they touch, in real time |
| The non-English-native learner | Understanding clearly, not translating in their head | Pro apps and tutorials are English-only | Voice tutoring in 16 languages — hear it in your own language |
| The self-taught hobbyist | Progress without feeling dumb | YouTube tutorials are long, out of date, and skip their exact question | Patient on-demand expert that sees their actual screen |
| The "new tool Monday" knowledge worker | Getting through a one-off task fast | Onboarding a new SaaS or CAD tool just to do one thing | Instant help in any app, no setup, no docs to read |

## Problems & Pain Points
**Core problem:** Learning and navigating software is slow, lonely, and text-heavy. Docs are generic, YouTube is long, ChatGPT can't see your screen, and the help that exists isn't *pointing at your actual cursor*.
**Why alternatives fall short:**
- YouTube/Udemy: passive, 30–60 min, out of date, can't answer the specific thing you're stuck on
- ChatGPT/Claude: can't see your screen, describes UI in words ("click the third icon on the left panel"), often wrong about current version
- Built-in app help: static docs written once, buried under search
- Copilot/Cursor-style tools: exist for code only, not for creative/pro apps
- Screen-share with a friend: not available at 11pm when you're stuck
**What it costs them:** Hours per week of googling, context-switching, abandoned projects, unused software subscriptions. For pros: missed deadlines. For learners: giving up on a tool entirely.
**Emotional tension:** Feeling dumb. Feeling behind. Hating the tool instead of loving it. Fear of paying $50/mo for software they can't figure out.

## Competitive Landscape
**Direct:** No direct competitor owning "voice + vision AI tutor on desktop" yet. Closest: Arc Max / Rabbit-style AI actions, but none sees+speaks in real time in any app.
**Secondary:** ChatGPT Desktop (has screen capture but not voice-first, doesn't move your cursor or narrate live). Rewind (records, doesn't tutor). Grammarly-style inline assistants (writing only).
**Indirect:** YouTube tutorials, Skillshare/Udemy courses, Perplexity/Google, paying for a human tutor, abandoning the tool.
**How each falls short:**
- ChatGPT: can't see what you see persistently; has to be asked; doesn't point at things
- YouTube: one-way, long, dated
- Courses: expensive and slow; wrong granularity
- Human tutors: $50–100/hr, scheduled, don't scale

## Differentiation
**Key differentiators:**
- Voice-first: talk naturally; no typing, no hotkeys if you enable Live Tutor mode
- Sees your screen in real time across all monitors
- **Moves your physical cursor** to point at the exact UI element (unique — nobody else does this visually)
- 16 languages / 8 voices — works for non-English speakers in English-only apps
- Works in any Mac app (not one integration at a time)
- "Skills" = deeper curriculum for specific apps (not just Q&A)
- Custom skills via SKILL.md (bring your own knowledge)
**How we do it differently:** OpenAI real-time voice + live vision, session-only data (nothing stored, no training), cursor overlay as the teaching surface.
**Why that's better:** Feels like having a patient expert sitting next to you rather than reading a doc or watching a video.
**Why customers choose us:** Speed of getting unstuck + the "wait, it actually pointed at the button" wow moment.

## Objections
| Objection | Response |
|-----------|----------|
| "Privacy — it's watching my screen?" | Audio + a screenshot go to OpenAI only while you're talking. Nothing saved after the session. OpenAI contractually can't train on Skilly sessions. Our analytics are anonymous usage metrics only. |
| "$19/mo is steep for an AI tool" | $0.63/day — less than a coffee. One human tutor hour = $50–100; one month of Skilly = 3 live hours. Real-time voice+vision is expensive to run and we're honest about it. |
| "Only 3 hours? I'll blow through that." | Most users don't. We email at 80% and 100%. No surprise charges — it just pauses. |
| "Only 5 apps?" | Works in *any* app without a skill. Skills add deeper courses and updated knowledge for specific apps. Skill builder shipping so users can create their own. |
| "Mac only?" | Today yes. Windows in dev, Linux planned, iOS exploring. Waitlist available. |
| "Will the price go up after beta?" | Yes, but beta users keep $19 forever on their account. Only 50 seats. |

**Anti-persona:** Enterprise buyers needing SSO/SOC2 today. Windows-first users. People who already know their tool cold and don't need tutoring. Teams wanting shared accounts (single-user for now).

## Switching Dynamics
**Push:** "I've been stuck on this stupid thing for 40 minutes." "I'm tired of watching tutorials for 30 seconds of content I actually need."
**Pull:** The first time the cursor flies to the right button and the voice explains it in your language — that's the aha moment.
**Habit:** Habit of alt-tabbing to YouTube/ChatGPT and searching. Habit of asking a teammate on Slack.
**Anxiety:** Privacy ("it's watching my screen"), AI reliability ("what if it tells me the wrong thing"), sunk cost ("I already paid for a Udemy course").

## Customer Language
**How they describe the problem:**
- "I'm hunting through menus"
- "I just want to know how to do this one thing"
- "I've been stuck for 20 minutes"
- "YouTube tutorials are too long"
- "ChatGPT can't see my screen"
**How they describe us:**
- "An AI tutor that sees my screen"
- "It literally moves my cursor to what I need to click"
- "Like having a pro sitting next to me"
- "Finally, help in [Arabic / Spanish / Portuguese]"
**Words to use:** tutor, shows you, points at, moves the cursor, in your language, out loud, stuck, unstuck, any app, next to you, real-time, live
**Words to avoid:** "copilot" (owned by GitHub/Microsoft), "agent" (overloaded/scary), "assistant" (too generic), "LLM," "RAG," enterprise jargon. Don't over-promise "teaches you anything" — it tutors inside software.
**Glossary:**
| Term | Meaning |
|------|---------|
| Skill | An upgrade pack for one specific app (Blender, Figma, etc.) — adds up-to-date instructions + a full learning path |
| Live Tutor mode | Always-on listening; no hotkey — just start talking |
| Custom skill | A user-provided SKILL.md file adding app-specific knowledge |
| Beta | 50-seat founding cohort at $19/mo price-locked for life |

## Brand Voice
**Tone:** Warm, confident, direct. Anti-hype. Closer to Linear/Granola than to enterprise SaaS.
**Style:** Short sentences. Concrete verbs ("points at," "moves," "hear it"). Honest about limits. Speaks to individuals, not committees.
**Personality:** Patient teacher, nerdy-curious, respectful of the user's time, slightly irreverent about overcomplicated tools.

## Proof Points
**Metrics:** 5 skills live at beta; 16 languages; 8 voices; 15-min free trial, no card. *(No usage/retention metrics yet — pre-launch.)*
**Customers:** None to cite yet (pre-beta / just opened).
**Testimonials:** None yet. Collecting from first 50 beta users — plan to pull 2–3 verbatim quotes within the first 30 days for the landing page.
**Value themes:**
| Theme | Proof |
|-------|-------|
| "Works in any Mac app" | Demo across Blender, Figma, Excel, Notion, browser |
| "Speaks your language" | 16 languages / 8 voices, auto-detect |
| "Moves the cursor" | Hero animation shows it pointing at exact UI |
| "Price locked for life" | Only 50 beta seats; explicit in pricing card |
| "Privacy-safe" | OpenAI contractually blocked from training; nothing saved post-session |

## Goals
**Business goal:** Fill the 50-seat beta with activated paying users who'd rate 9+/10, so the post-beta launch has real testimonials, usage data, and word-of-mouth.
**Conversion action (primary):** Download DMG → complete 15-min free trial → subscribe inside the app.
**Conversion action (secondary):** Cross-platform waitlist signup (Windows / Linux / iOS) — builds launch list for v2.
**Current metrics:** *Unknown — baseline being established; PostHog tracking in place. Landing page is live at tryskilly.app. Beta status: BETA_ACTIVE, 0 early-access users counted on site.*
