---
title: "OpenAI Realtime API tutorial: a production guide for 2026"
description: "A current OpenAI Realtime API guide covering GPT-Realtime models, WebRTC, WebSocket, SIP, function calls, interruptions, cost, and privacy."
pubDate: 2026-04-27
updatedDate: 2026-08-04
author: "Mohamed Saleh Zaied"
category: tutorial
tags:
  - openai
  - realtime-api
  - voice-ai
  - webrtc
  - tutorial
canonicalKeyword: "OpenAI Realtime API tutorial"
relatedArticles:
  - openai-mcp-server-tutorial
  - ai-tutor-that-sees-your-screen
faq:
  - question: "What is the OpenAI Realtime API?"
    answer: "The Realtime API is OpenAI's low-latency interface for multimodal sessions. It supports speech-to-speech interaction plus text, image, and audio input over WebRTC, WebSocket, or SIP connections."
  - question: "Which GPT-Realtime model should I use?"
    answer: "As of 2026-08-04, GPT-Realtime-2.1 is the most capable current voice model, while GPT-Realtime-2.1 mini is the lower-cost option. GPT-Realtime-1.5 and the original GPT-Realtime remain documented. Test the exact model against your latency, tool-use, and recognition requirements, and pin a snapshot when reproducibility matters."
  - question: "Should I connect with WebRTC, WebSocket, or SIP?"
    answer: "Use WebRTC when audio originates in a browser or user device, WebSocket for server-controlled audio pipelines, and SIP for phone calls. All three are supported by current GPT-Realtime models."
  - question: "How much does the OpenAI Realtime API cost?"
    answer: "Pricing depends on the model and text, audio, image, and cached token usage. When checked 2026-08-04, GPT-Realtime-2.1 audio cost $32 per 1M input tokens, $0.40 per 1M cached input tokens, and $64 per 1M output tokens. GPT-Realtime-2.1 mini audio cost $10, $0.30, and $20 respectively. Verify the official model pages before budgeting."
  - question: "Does the Realtime API support function calling?"
    answer: "Yes. Current GPT-Realtime models support function calling. Your application must assemble streamed arguments, execute the tool, return its result to the conversation, and request or allow the response to continue."
  - question: "Does OpenAI train on Realtime API data?"
    answer: "OpenAI says API inputs and outputs are not used for model training by default unless the customer opts in. Its data-control documentation lists the Realtime endpoint with no application-state retention, while default abuse-monitoring logs may be retained for up to 30 days unless approved retention controls apply."
---

The **OpenAI Realtime API** is for conversations where waiting for a transcription request, a text-model request, and a speech request would make the experience feel slow or unnatural. It accepts live audio and can return audio directly while also handling text, images, and tools.

We use Realtime for Skilly's voice-and-screen tutoring. This guide focuses on the decisions that matter when moving from a demo to a product: model choice, transport, authentication, interruption handling, tools, cost, and data controls.

> Models, prices, connection methods, and retention details were rechecked August 4, 2026 against OpenAI's official documentation. These details change. Follow the linked model and data-control pages rather than copying values into a permanent budget.

## How the Realtime API differs from a chained voice pipeline

A traditional voice system often looks like this:

```text
microphone → speech-to-text → text model → text-to-speech → speaker
```

That architecture remains useful when you want independent vendors, inspectable transcripts, or asynchronous processing. But it creates several network and model boundaries.

Realtime can instead run a speech-to-speech session:

```text
microphone ⇄ realtime model ⇄ speaker
```

The same session can also receive text or image context and call tools. Choose it when conversational latency, interruptions, and vocal interaction are core to the product—not merely because the API is newer.

## Current GPT-Realtime models

OpenAI's model catalog had several Realtime families when checked August 4, 2026:

| Model | Positioning | Audio input / output per 1M tokens |
|---|---|---|
| `gpt-realtime-2.1` | Most capable current voice model; stronger recognition, silence/noise handling, interruptions, reasoning, and tools | $32 / $64 |
| `gpt-realtime-2.1-mini` | Faster, lower-cost 2.1 variant | $10 / $20 |
| `gpt-realtime-1.5` | Flagship 1.5 audio model | $32 / $64 |
| `gpt-realtime` | Original generally available Realtime model | $32 / $64 |

Cached audio input is cheaper than uncached input. Text and image tokens are priced separately. The 2.1 models also expose a much larger context window than the original model, according to their current model pages.

Use an alias while experimenting. For a production release where behavior must remain stable, evaluate and pin a documented snapshot rather than assuming an alias will never change.

## Choose the connection method

### WebRTC for client-side voice

WebRTC is usually the first choice when the microphone and speaker belong to a browser, desktop app, or mobile app. It provides a media path for audio and a data channel for session events.

A simplified setup is:

1. Your backend authenticates with the OpenAI API.
2. The client creates an `RTCPeerConnection` and local audio track.
3. The client sends its SDP offer through the Realtime call flow.
4. OpenAI returns an SDP answer.
5. Audio and the event data channel become available.

Do not embed a permanent OpenAI API key in client code. Follow the current OpenAI WebRTC guide for its supported client-secret or server-mediated authentication flow.

### WebSocket for server-side pipelines

Use WebSocket when your server owns the audio stream or needs direct control over packetization, buffering, telephony integration, recording policy, or routing. You exchange Realtime events and audio chunks explicitly, which gives control at the cost of more audio plumbing.

### SIP for phone calls

Use SIP when the product is a phone agent. OpenAI exposes call controls for accepting, rejecting, transferring, monitoring, and hanging up Realtime calls. Do not build a phone bridge around WebRTC merely to avoid learning the SIP path.

## Configure the session deliberately

A useful production session configuration defines:

- The model or snapshot
- Input and output audio configuration
- Voice
- Instructions and conversation policy
- Turn detection behavior
- Available tools
- Context or truncation behavior

Keep the initial instructions short and testable. Long collections of exceptions are difficult to debug in voice because a failure may sound plausible. OpenAI's current Realtime prompting guide recommends clear, structured instructions and explicit behavior for unclear audio.

## Function calling is an event loop

Current Realtime models support function calling, but your application still owns tool execution.

The robust mental model is:

1. Receive streamed function arguments.
2. Assemble and validate the complete arguments.
3. Run the tool with normal authorization and timeout rules.
4. Add the tool output to the conversation.
5. Continue the model response.

Never execute partial arguments. Treat model-produced values as untrusted input. Validate identifiers, constrain file or network access, and return structured errors the model can explain to the user.

If you want OpenAI to connect to a remote MCP server, use the dedicated [OpenAI MCP server tutorial](/learn/openai-mcp-server-tutorial/). MCP and local function tools solve related problems but have different execution and approval boundaries.

## Handle interruptions as a product feature

Voice users speak over the assistant. That is normal, not an edge case.

Your client needs to coordinate three views of the conversation:

- What the model generated
- What audio the client buffered
- What the user actually heard

When the user interrupts, stop playback promptly, clear audio that should no longer play, and follow the current Realtime event contract so the conversation reflects the portion the user heard. Otherwise, the model may continue as though the unheard response was delivered.

Test interruption during network jitter, tool execution, and long responses—not only during a clean local demo.

## Send images only when they add context

Current GPT-Realtime models accept image input. That enables screen-aware tutoring, visual support, and inspection workflows.

Do not stream unnecessary full-resolution frames by default. A better pattern is to send a relevant frame when the user asks a visual question, resize it to the resolution the task needs, and avoid unrelated windows. This controls cost and reduces privacy exposure.

## Budget with measured sessions

Token prices do not translate into one universal cost per conversation. Actual cost changes with:

- How much the user and model speak
- Model choice
- Context length and truncation
- Cached input reuse
- Image input
- Tool definitions and results
- Failed or abandoned sessions

Instrument input, cached input, output, and session duration separately. Build a cost distribution from real sessions before setting a flat per-minute price.

## Data retention and training are separate

OpenAI's current API data-control documentation says API inputs and outputs are not used to train models by default unless the customer explicitly opts in.

The same documentation says default abuse-monitoring logs may contain customer content and may be retained for up to 30 days. It lists `/v1/realtime` with no application-state retention and as eligible for Zero Data Retention, subject to OpenAI approval and endpoint limitations.

So “not used for training” should not be presented as “nothing is ever retained.” Review the exact account controls and make accurate disclosures to your users.

## Production checklist

- Keep permanent API credentials on the server.
- Choose WebRTC, WebSocket, or SIP based on where audio originates.
- Validate all tool arguments and enforce authorization outside the model.
- Test barge-in, silence, noisy audio, and reconnect behavior.
- Bound session duration and conversation context.
- Measure token categories and real session cost.
- Send only the visual context the task requires.
- Document training and retention separately.
- Pin a model snapshot when reproducibility matters.
- Recheck the official docs before every material launch.

## Official sources

- [GPT-Realtime-2.1 model](https://developers.openai.com/api/docs/models/gpt-realtime-2.1)
- [GPT-Realtime-2.1 mini model](https://developers.openai.com/api/docs/models/gpt-realtime-2.1-mini)
- [GPT-Realtime model](https://developers.openai.com/api/docs/models/gpt-realtime)
- [Realtime API reference](https://platform.openai.com/docs/api-reference/realtime)
- [OpenAI API data controls](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)
- [Realtime prompting guide](https://cdn.openai.com/API/docs/realtime-prompting-guide.pdf)
