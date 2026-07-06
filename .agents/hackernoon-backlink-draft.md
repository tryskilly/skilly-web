# HackerNoon backlink draft — ready to publish

**How to publish (per the @hridoyreh tactic, DR ~87 dofollow, ~1.45M/mo visitors):**
1. Register / log in at hackernoon.com
2. Click **Write** (top right)
3. Paste the article below (it's 900+ words, technical)
4. The backlink to tryskilly.app is already in the "Try it" + author bio lines (keep it dofollow)
5. Add 1–2 internal HackerNoon links (search HN for "OpenAI Realtime API" / "macOS ScreenCaptureKit" and link to a relevant HN article — required for approval)
6. Add a cover image (the Skilly demo frame or a generic dev image)
7. **Submit Story** for review

Tags to add on HN: `openai`, `voice-ai`, `realtime-api`, `saas`, `user-onboarding`

---

# How we built a voice-first, screen-aware product guide with the OpenAI Realtime API

Most in-app onboarding tools *tell* users what to do. They pop a tooltip, queue a checklist, or open a chat box where an AI types a paragraph the user still has to translate into clicks. We wanted the opposite: a guide that a user can **talk to** out loud, that **answers in voice**, and that **moves the cursor to the exact button** instead of describing where it is.

This is a write-up of the architecture decisions behind that guide, the tradeoffs we hit, and what we'd tell anyone building real-time voice features today.

## Why voice-to-voice, not STT → LLM → TTS

The traditional voice pipeline is three hops: speech-to-text, then a chat completion, then text-to-speech. Each hop adds latency, and the seams show — the assistant feels like it's "thinking" because it is, serially.

We built on the **OpenAI Realtime API**, which collapses that into a single bidirectional stream: audio in, audio out, with the model reasoning in between. The practical win is latency. A user asking "where do I start?" gets a spoken answer that begins in well under a second, which is the difference between a guide that feels alive and one that feels like a kiosk.

If you're evaluating this path, the tradeoff is control: you give up the ability to inspect and rewrite the intermediate text on every turn. For a guidance product where speed and naturalness matter more than deterministic phrasing, that was an easy call. (We wrote a longer, hands-on walkthrough of wiring up the Realtime API for voice + screen apps here: https://tryskilly.app/learn/openai-realtime-api-tutorial — that page has the connection and event-handling details this overview skips.)

## Making it screen-aware without recording everything

A guide that can't see the screen can only give generic answers. But "always watching" is both a privacy problem and a cost problem. Our rule: **capture only when the user is actually asking.** Screen frames are sampled on a push-to-talk boundary, sent with the question, and discarded — not streamed continuously.

On the desktop version this rides on Apple's **ScreenCaptureKit**; in the embeddable web version it's a scoped DOM snapshot. Either way, the principle holds: the guide sees context at the moment of the question, answers, and forgets. That keeps the privacy story honest and the token bill proportional to usage rather than to time-open.

## Pointing the cursor: the part users actually feel

The feature that changes how onboarding *feels* is the cursor move. When the model identifies the target element, the guide animates the user's cursor to it and highlights it. For a non-technical or stuck user, being **shown** the button is dramatically faster than reading a generated sentence about it.

The hard part isn't the animation — it's resolving "the bevel tool" or "the publish button" to a stable on-screen target across layouts and viewports. We lean on semantic selectors (roles, ARIA labels, visible text) over pixel coordinates, because coordinates break the moment the layout shifts. This is the same lesson anyone doing browser automation learns: describe *what* you're looking for, never *where it happened to be*.

## Teaching it from your own content

A generic model gives generic help. To make the guide answer in *your* product's voice — pointing at *your* buttons, using *your* terms — it has to be grounded in your material. Instead of asking builders to script flows, we let them teach the guide from content they already have: docs, help articles, feature descriptions. The model retrieves against that corpus at question time.

This inverts the usual onboarding-tool workflow. Tools like Appcues or Userpilot ask you to *build* each flow up front. A retrieval-grounded voice guide is taught once and then handles open-ended questions, including the ones you didn't anticipate.

## Shipping it as one script tag

For adoption, the embed has to be trivial. The whole guide ships as a single `<script>` tag; the builder drops it in, connects their content, and their users can start asking. No SDK ceremony, no per-flow authoring required to get a working guide.

## Lessons worth stealing

- **Use voice-to-voice if latency defines the experience.** The single Realtime stream is worth the loss of intermediate-text control for conversational products.
- **Gate capture on intent.** "Only see the screen when asked" is better for privacy *and* cost than continuous capture, and users trust it more.
- **Resolve targets semantically.** Cursor-pointing dies on pixel coordinates and lives on roles/labels/text.
- **Teach from existing content.** Grounding beats scripting for open-ended help.
- **Price on usage, not headcount.** Voice interactions map cleanly to minutes; charging per monthly active user punishes growth your guide didn't cause.

## Try it

We build this as **Skilly** — a voice-first guide you can embed in your product, plus a macOS tutor that walks you through desktop apps like Blender and Figma. If you want to see the cursor-pointing behavior in action or drop the guide into your own app, it's at **https://tryskilly.app**. It's free to start.

*Written by the Skilly team. We're building in public — feedback and hard questions welcome.*
