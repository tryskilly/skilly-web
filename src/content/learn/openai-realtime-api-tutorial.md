---
title: "OpenAI Realtime API tutorial — what we learned in production"
description: "Practical guide to OpenAI Realtime API in 2026 — gpt-realtime model, pricing, WebRTC vs WebSocket vs SIP, function calling, and production gotchas."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: tutorial
tags:
  - openai
  - realtime-api
  - voice-ai
  - webrtc
  - tutorial
canonicalKeyword: "OpenAI Realtime API tutorial"
faq:
  - question: "Which connection method should I use — WebRTC, WebSocket, or SIP?"
    answer: "WebRTC for browsers and native apps where the user's audio device is local — it handles audio capture, encoding, and adaptive jitter buffering for you. WebSocket for server-side architectures where you control both ends of the audio pipeline (and don't mind handling the audio packetization yourself). SIP for phone-based agents (incoming/outgoing PSTN calls). For Skilly we use WebRTC because the audio source is the user's macOS microphone — letting Apple's RTC stack handle the capture saves us thousands of lines of audio code."
  - question: "How much does Realtime API cost in production?"
    answer: "As of 2026-04-27, gpt-realtime costs $32 per 1M audio input tokens (or $0.40 per 1M cached input tokens) and $64 per 1M audio output tokens. There's also a cheaper gpt-realtime-mini variant for cost-sensitive use cases. Audio tokens are measured in 100ms slices — a 1-minute conversation is roughly 600 input audio tokens and 600 output if both speak equally. Real production cost depends heavily on session length, function calling token volume, and how aggressively you truncate context."
  - question: "Does Realtime API support function calling?"
    answer: "Yes, and it improved significantly in gpt-realtime (Aug 2025 GA release). The model can call functions in the background while continuing to talk to the user — important for the 'let me look that up' moments without dead air. As of 2025, the API also supports remote MCP servers — pass an MCP URL in session config and the model auto-discovers the tools. We use this in Skilly for capturing screen frames the model requests."
  - question: "Can I send images to a Realtime session?"
    answer: "Yes, image input was added at the August 2025 GA release. You can include images as part of the conversation context — useful for screen-aware assistants, vision-grounded agents, or any flow where the model needs to see what the user sees. In Skilly, we send a screen capture frame along with the user's voice question, and the model can reason about both."
  - question: "What's the difference between gpt-realtime and gpt-4o-realtime-preview?"
    answer: "gpt-4o-realtime-preview was the public beta from October 2024. gpt-realtime is the GA model launched August 28, 2025 — 20% cheaper, better instruction following, better function calling, more natural and expressive speech, and exclusive access to two new voices (Cedar and Marin). If you're on the preview model, switching is just a model name change in your session config."
  - question: "How do I handle interruptions when the user starts talking mid-response?"
    answer: "The Realtime API has built-in voice activity detection (VAD) and emits an interruption event when it detects user speech overlapping with assistant output. Your client must (1) stop playing the assistant audio buffer immediately on interrupt, (2) clear the playback queue so older audio doesn't resume, and (3) tell the API which response position the user heard up to (so the model knows what was actually consumed). Skipping step 3 leads to the model 'remembering' it said something the user never heard, which produces weird inconsistencies on the next turn."
relatedArticles: []
---

If you're building anything voice-first in 2026, OpenAI's Realtime API is probably on your shortlist. We've been running it in production at Skilly for a few months — voice + screen-aware tutoring on Mac — and there's a gap between the docs and what you actually need to know to ship.

This is a practical tour: current model, what you connect to, how function calling actually works in a streaming voice context, and the gotchas that cost us debugging time.

> All facts verified 2026-04-27 against [OpenAI's gpt-realtime GA announcement](https://openai.com/index/introducing-gpt-realtime/) and [OpenAI API Pricing](https://openai.com/api/pricing/). Pricing changes — re-verify before quoting numbers in your own writeups.

## What the Realtime API actually is

Traditional voice AI pipelines chain three separate models:

```
microphone → STT (Whisper) → LLM (GPT-4) → TTS (gpt-4o-audio) → speaker
```

Every hop adds latency. The Realtime API collapses this into one streaming model that takes audio in and emits audio out directly. No intermediate text. The model "hears" tone, pauses, and emphasis, and "speaks" with similar nuance — you can't get the same expressiveness from a chained pipeline because tone information is lost in the STT step.

This single-model approach is the entire point. If you don't need that — if your app is fine with traditional STT → LLM → TTS — you'll save money and complexity by skipping Realtime entirely.

## Current model: `gpt-realtime`

As of 2026-04-27, the production model is **`gpt-realtime`**, GA since August 28, 2025. It replaces `gpt-4o-realtime-preview` (the public beta from October 2024).

What's better than the preview:
- **20% cheaper** on audio tokens
- **Better function calling** — calls tools with more precision, especially in multi-tool sessions
- **Better instruction following** — system prompts and developer messages are respected more reliably (e.g., "always read disclaimers verbatim", "switch to Spanish when the user does")
- **Two new voices** — Cedar and Marin, exclusive to the Realtime API

There's also `gpt-realtime-mini` for cost-sensitive use cases — same API surface, cheaper, slightly less capable.

## Pricing (verified 2026-04-27)

| Token type | gpt-realtime | gpt-realtime-mini |
|---|---|---|
| Audio input | $32 / 1M tokens | (cheaper, see [official pricing](https://openai.com/api/pricing/)) |
| Audio input (cached) | $0.40 / 1M tokens | — |
| Audio output | $64 / 1M tokens | — |

Audio tokens are measured in roughly 100ms slices. A naive estimate: **a 1-minute back-and-forth conversation costs about $0.06** in audio I/O combined, before function calling overhead.

Real production cost depends on:
- **Session length** — Realtime keeps full conversation context, so token cost grows linearly with session duration unless you truncate
- **Cached inputs** — if your system prompt is identical across sessions, OpenAI caches it and charges 1/80th the rate
- **Function calling** — every tool call adds text tokens at the standard text-token rate
- **Image inputs** — added in Aug 2025 GA release, charged separately

## Connection methods — pick one

| Method | Best for | Notes |
|---|---|---|
| **WebRTC** | Browser apps, native mobile/desktop apps | Browser/OS handles audio capture + jitter buffering. Lowest latency in practice. |
| **WebSocket** | Server-side voice agents, custom pipelines | You handle audio packetization yourself. More control, more code. |
| **SIP** | Phone-based agents (PSTN, contact centers) | Plug Realtime directly into a phone number. Added Aug 2025. |

**For Skilly we use WebRTC.** The user's microphone is local; macOS already has a hardened RTC stack. Letting Apple handle audio capture/echo cancellation/AGC saves us from rewriting the world.

The WebRTC handshake flow (simplified):

1. Your client requests an ephemeral session token from OpenAI via your server (don't ship your real API key to the client)
2. Client creates an `RTCPeerConnection`
3. SDP offer goes to OpenAI's `/v1/realtime` endpoint
4. OpenAI responds with SDP answer
5. WebRTC data channel + audio tracks open
6. Configure session with `session.update` event over the data channel
7. Speak and listen

WebSocket is similar minus steps 2-4 and you handle PCM16 packets yourself.

## Function calling in a streaming voice context

This is the part that tripped us up the most. Function calling in Realtime is **not** the same as function calling in chat completions.

In chat completions: model emits a `tool_call`, you execute, you append the result, you call the model again. Linear.

In Realtime: model is **streaming voice output continuously**. When it decides to call a tool, it emits a `response.function_call_arguments.delta` event mid-stream, possibly while still speaking the user-facing message ("let me check that for you..."). Your client must:

1. Buffer the tool call args as deltas arrive
2. When `response.function_call_arguments.done` fires, execute the function
3. Send `conversation.item.create` with the tool result
4. Send `response.create` to let the model continue

If you do this naively the model goes silent waiting for the result. The pattern that works in production: have the model **announce** the tool call out loud first ("let me look that up..."), execute the function in parallel, then continue with the result. This avoids dead air during database queries or web fetches.

### Remote MCP servers (added Aug 2025)

The cleanest way to extend Realtime with tools is now MCP. Pass an MCP server URL in `session.update` config:

```json
{
  "type": "session.update",
  "session": {
    "tools": [{
      "type": "mcp",
      "url": "https://your-mcp-server.example.com"
    }]
  }
}
```

The model auto-discovers tools from the MCP server, no per-tool wiring needed. We use this in Skilly to expose screen capture and skill-loading utilities to the model.

## What screen capture + voice looks like in practice (the Skilly architecture)

Here's the Skilly setup, since it's a good case study for screen-aware voice agents:

1. **User holds Control+Option** — push-to-talk, captures audio + a screen frame
2. **Audio streams to gpt-realtime via WebRTC** — voice in, voice out
3. **Screen frame attaches as an image input** — added at Aug 2025 GA, before that we couldn't do this without a roundtrip through gpt-4o-vision
4. **Model decides whether to call tools** — e.g., load a skill markdown file for Blender-specific knowledge
5. **Model speaks the answer** — through Cedar voice, streaming as it generates
6. **Cursor moves on screen** — separate channel, model emits coordinates as a tool call alongside the voice answer

The image input feature is what made the whole thing viable on a single API. Pre-Aug-2025 we had to chain: Realtime API for voice → separate vision model call for screen → Realtime API again to speak the answer. Latency was ~2.5 seconds. With direct image input on Realtime, we're at ~800ms end-to-end.

## Production gotchas nobody warns you about

**1. Session token caps.** Default session size is large but not infinite. For long sessions (>10 min), enable conversation context truncation in `session.update` so older turns drop off. Otherwise you hit token limits and the model degrades.

**2. ScreenCaptureKit on macOS fires its content-invalidation callback too late on lid close.** This is Mac-specific but bit us hard — you ship 2-3 black frames before the restart catches the lid event. Fix: register `CGDisplayRegisterReconfigurationCallback` separately to get ahead of the bad frames. (Thanks to u/Deep_Ad1959 on r/SwiftUI for this one.)

**3. Voice consistency across sessions.** Even with the same voice (Cedar/Marin/etc.), there can be slight tone drift between sessions. Don't rely on voice identity for security or persona signaling. Use a system prompt to reinforce persona at session start.

**4. Interrupt handling is a 3-step dance.** When the user talks over the assistant: stop playback, clear the audio buffer queue, AND send the conversation position back to the API so the model knows what was actually heard. Skipping that last step → model thinks it said things the user never heard → bizarre cross-turn inconsistencies.

**5. Cached input pricing only applies to identical prefixes.** If you change your system prompt by even one character, the cache misses for the entire session. Lock the system prompt at session creation time and don't mutate.

## Should you use Realtime?

**Yes** if:
- Your UX needs sub-second voice response
- You need vocal nuance (tone, emotion, mid-sentence interruption)
- You're building voice-first or phone-first agents
- You need image-grounded voice responses (screen-aware, document-aware, vision-grounded agents)

**No** if:
- Your UX is fine with 1-2 second response time (use chained STT → LLM → TTS, it's cheaper)
- You don't need voice at all (just use Chat Completions)
- You can't afford ~$0.06/min audio I/O at scale (run the math against your unit economics first)

## Try a real Realtime app

Skilly runs entirely on the OpenAI Realtime API. Hold Control+Option, ask out loud, get a voice answer with a cursor pointing at exactly what to click on your screen. **15 minutes free, no card.**
