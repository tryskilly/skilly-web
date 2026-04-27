---
title: "OpenAI MCP server tutorial — building tools for voice agents"
description: "How to attach a remote MCP server to OpenAI's Realtime API. Session vs per-turn tools, the lifecycle events, approval flow, and the gotchas that tripped us up."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: tutorial
tags:
  - openai
  - mcp
  - realtime-api
  - voice-agents
  - tutorial
canonicalKeyword: "OpenAI MCP server tutorial"
faq:
  - question: "What's the difference between MCP tools and function tools in the Realtime API?"
    answer: "Function tools are executed by YOUR client — model emits a function_call event, your code runs the function, you send back function_call_output. MCP tools are executed by the Realtime API ITSELF — you only configure access (server URL, auth) and listen for lifecycle events. The Realtime API talks to your MCP server directly. This is why MCP integration is a few lines of session config vs hundreds of lines of function-call plumbing for the same toolset."
  - question: "Where do I attach an MCP server — at session level or per-response?"
    answer: "Use session level (session.tools in session.update) when the tool should be available for the entire conversation — typical for assistants with stable capabilities. Use per-response level (response.tools in response.create) when MCP should only apply to one turn — useful for ephemeral context (e.g., 'this turn needs access to today's email'). Both accept the same tool shape; same auth model. Don't double-attach the same server in both places, you'll get a duplicate server_label validation error."
  - question: "What transports does OpenAI's Realtime API support for MCP?"
    answer: "Streamable HTTP (preferred for production) and HTTP/SSE (legacy, still works). Both are remote MCP — you host the server somewhere reachable via HTTPS and Realtime API connects to it. Local stdio MCP servers (the ones you run with claude desktop) are NOT supported by Realtime — Realtime is server-side, it can't reach a process on your laptop. If you want a local-feeling MCP, deploy your stdio server as a Streamable HTTP wrapper on a Cloudflare Worker, Vercel function, or similar."
  - question: "What lifecycle events does Realtime emit for MCP?"
    answer: "Six main events to handle: (1) mcp_list_tools.in_progress when import starts, (2) mcp_list_tools.completed when tools are ready, (3) mcp_list_tools.failed if import errored, (4) response.mcp_call_arguments.delta and response.mcp_call_arguments.done as the model builds the tool call, (5) mcp_approval_request if the server demands approval, (6) response.mcp_call.failed if execution errored. The conversation.item.done event with item.type='mcp_list_tools' shows the actual tool names imported — useful for verifying connections."
  - question: "How does the approval flow work?"
    answer: "When you set require_approval: 'always' (or omit the field), every MCP tool call gets paused mid-response. The Realtime API emits mcp_approval_request with the tool name and arguments. Your client must send mcp_approval_response with approve: true or false. If you set require_approval: 'never', tools execute without prompting — appropriate for trusted tools where you've already vetted the MCP server. There's no middle ground at the API level — if you want fine-grained per-tool approval, add allowed_tools to limit which tools can be called and trust those entirely."
  - question: "What's the most common reason MCP integration fails?"
    answer: "Authentication. Realtime sends one of two auth headers: 'authorization' (the value you set in session config) or 'headers' (a custom header map). You can't set both — that's a validation failure. Most production failures are: (1) auth token expired, server returns 401, mcp_list_tools.failed fires; (2) server_url has wrong path or trailing slash; (3) the MCP server hasn't actually deployed yet. Always test with curl first — if your MCP server doesn't respond to curl with proper auth, it won't respond to OpenAI either."
relatedArticles:
  - openai-realtime-api-tutorial
---

If you've followed our [OpenAI Realtime API tutorial](/learn/openai-realtime-api-tutorial/), you've seen function calling — the manual plumbing where the model emits a tool call, your client runs the function, you stuff the result back into the conversation. That works. It also gets old fast at 5+ tools.

Remote MCP servers replace all that with declarative configuration. Point the Realtime session at an MCP server URL, the API auto-discovers the tools, and the model can call them without your client ever running the function.

This guide is the practical setup, with the gotchas we hit shipping it.

> Verified 2026-04-27 against [OpenAI's Realtime API with MCP guide](https://developers.openai.com/api/docs/guides/realtime-mcp). Current model is **`gpt-realtime-1.5`** as of today (newer than the `gpt-realtime` GA from Aug 2025). MCP support has been GA in Realtime since the Aug 2025 release.

## What MCP is, in 60 seconds

Model Context Protocol is an open spec (originally from Anthropic, now an industry standard) for giving AI models access to external tools and data sources. An MCP server exposes a set of tools — functions with names, descriptions, and JSON schemas — over HTTP. Any MCP-compatible AI client can connect, list those tools, and invoke them.

In a Realtime API context, MCP is the cleanest way to extend a voice agent without writing per-tool client code.

## Why MCP for Realtime > Function calling

Function calling in Realtime requires:
1. Define each tool's schema in `session.tools` as type `"function"`
2. Listen for `response.function_call_arguments.delta/done` events
3. Run the function in your client
4. Send `conversation.item.create` with the result
5. Send `response.create` to continue

For 1 tool that's fine. For 10 tools across multiple agents, the boilerplate compounds.

MCP equivalent:
1. Set `session.tools` to a single MCP entry pointing at your server
2. Done

The Realtime API talks to your MCP server directly, including auth, retries, and approval flow. Your client just listens for lifecycle events.

## The minimum viable MCP integration

Here's the canonical session config (verified against OpenAI's docs):

```javascript
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-1.5",
    output_modalities: ["text"],
    tools: [
      {
        type: "mcp",
        server_label: "openai_docs",
        server_url: "https://developers.openai.com/mcp",
        allowed_tools: ["search_openai_docs", "fetch_openai_doc"],
        require_approval: "never",
      },
    ],
  },
};

ws.send(JSON.stringify(event));
```

Six fields matter most:

| Field | Required | Purpose |
|---|---|---|
| `type: "mcp"` | yes | Identifies this as an MCP tool |
| `server_label` | yes | Unique label for this server (used in events to identify which MCP responded) |
| `server_url` | one-of | Direct URL to your remote MCP server |
| `connector_id` | one-of | Use OpenAI's hosted connector instead of your own URL |
| `allowed_tools` | optional | Whitelist subset of tools — exclude noisy or sensitive ones |
| `require_approval` | optional | `"always"` (default if omitted) or `"never"` |

You must specify exactly one of `server_url` or `connector_id`, never both — that triggers a validation error.

## Session-scope vs response-scope

Two ways to attach MCP tools, depending on lifecycle:

**Session-scope** — MCP server is available for the whole conversation. Use this for stable capabilities (e.g., "this assistant always has access to our docs server"). Set in `session.update`:

```javascript
{ type: "session.update", session: { tools: [{ type: "mcp", ... }] } }
```

**Response-scope** — MCP server is available only for one model response. Use this for ephemeral context (e.g., "this turn needs to query today's email"). Set in `response.create`:

```javascript
{ type: "response.create", response: { tools: [{ type: "mcp", ... }] } }
```

Don't attach the same `server_label` in both places at the same time — duplicate label is a validation failure.

## The Realtime MCP flow (events you'll see)

Once the MCP tool is configured, the API runs through a deterministic event sequence. Subscribe to these on your WebSocket / WebRTC data channel:

1. **`mcp_list_tools.in_progress`** — Realtime is reaching out to your server to enumerate available tools.
2. **`mcp_list_tools.completed`** — tools imported successfully. The accompanying `conversation.item.done` event with `item.type: "mcp_list_tools"` lists the imported tool names. Wait for this before triggering turns that depend on the tools, or the model won't see them.
3. **`mcp_list_tools.failed`** — import errored. Check server URL, auth, allowed_tools spelling, and server reachability.
4. **`response.mcp_call_arguments.delta`** / **`response.mcp_call_arguments.done`** — model is building a tool call. Use these to show "calling tool X..." UI affordances.
5. **`mcp_approval_request`** — only emitted when `require_approval: "always"`. Your client MUST send `mcp_approval_response` to continue.
6. **`response.mcp_call.failed`** — tool call execution errored. Inspect the payload for MCP protocol or transport details.

The big mental shift from function calling: **you do NOT run the tool**. The Realtime API runs it. Your client listens, optionally approves, and waits for the model to continue speaking.

## Building the MCP server side

The OpenAI side is half the story. The other half is your MCP server, which can be written in any language. The fastest paths today:

- **Python**: [`fastmcp`](https://github.com/jlowin/fastmcp) (FastAPI-style decorators) or the official Python MCP SDK
- **TypeScript/Node**: official MCP TypeScript SDK with Express or Fastify
- **Cloudflare Workers**: MCP SDK works in Workers runtime — best for sub-50ms cold starts
- **Vercel functions**: MCP SDK works in serverless functions — good for low-traffic prototypes

Minimum required: an HTTPS endpoint that speaks Streamable HTTP or HTTP/SSE transport, exposes a `tools/list` method, and handles `tools/call` for each tool you've defined.

For a worked example with code, the OpenAI Apps SDK has a [Build your MCP server guide](https://developers.openai.com/apps-sdk/build/mcp-server) that walks through a full Python implementation.

## Authentication patterns

Two ways to pass auth from Realtime to your MCP server:

**Single bearer token** — set `authorization: "Bearer abc123"` in the tool config. Realtime sends it as the `Authorization` header on every request to your server.

**Custom headers** — set `headers: { "X-API-Key": "abc123", "X-Tenant-ID": "skilly-prod" }` for multi-header auth.

You CANNOT set both `authorization` and `headers.Authorization` — Realtime's validator rejects it. If you need a custom Authorization scheme, use only `authorization`. If you need additional headers, use only `headers`.

For tokens that rotate, you have two options: (1) accept that you'll need to call `session.update` to refresh the tool config when tokens rotate, or (2) use a token-broker pattern where your MCP server validates a long-lived token and exchanges it for short-lived upstream tokens internally.

## Approval flow — when you'd actually use it

By default (`require_approval: "always"` or unset), every MCP tool call is paused for explicit approval. This is appropriate when:

- The MCP server has destructive tools (create/update/delete operations)
- You're building a UI where users should confirm tool calls
- You want a kill switch for runaway agent behavior

Set `require_approval: "never"` when:

- The MCP server is fully read-only (search, fetch, list operations)
- Latency matters (approval round-trips add 100-500ms per call)
- You're using `allowed_tools` to whitelist a known-safe subset

There's no middle ground. If you need per-tool approval ("approve writes, auto-approve reads"), the workaround is to deploy two MCP servers from the same codebase — one read-only with `require_approval: "never"`, one write-enabled with `require_approval: "always"` — and attach both to the session.

## How Skilly uses MCP

Skilly's voice tutor for Mac uses MCP to expose three things to the gpt-realtime-1.5 model during a session:

1. **Skill loader** — fetches a markdown file describing how a specific app (Blender, Figma, Xcode) is structured. Read-only, `require_approval: "never"`.
2. **Screen capture trigger** — model can request a fresh frame mid-conversation if the user changed something. Read-only.
3. **Cursor coordinate emitter** — model emits target screen coordinates as a tool call; client moves the visible cursor there. Action-but-non-destructive.

The whole MCP server is ~300 lines of TypeScript on Cloudflare Workers. Cold start under 30ms, no infrastructure to babysit. Adding a new app's "skill" is a markdown file in a folder — the MCP server picks it up automatically and the model can call it without code changes on the client.

## Common failures and fixes

**`mcp_list_tools.failed` immediately on session start**

Top causes:
- Wrong `server_url` — typo, missing `/mcp` path, http instead of https
- Auth missing or wrong — server returns 401
- Server not deployed — connection refused
- `allowed_tools` references a tool name that doesn't exist on the server

Always test the MCP server with `curl` before integrating. If it doesn't respond cleanly to a manual `tools/list` request, it won't work with Realtime.

**`response.mcp_call.failed` after the model selects a tool**

The MCP server received the call but errored during execution. Check the failure payload for the underlying error — most commonly: server-side timeout, downstream API failure, malformed arguments from the model.

**Turn starts before `mcp_list_tools.completed` fires**

Tool import happens asynchronously after `session.update`. If you immediately send a user message that requires a tool, the model can't call it yet. Either wait for `mcp_list_tools.completed` before sending the first turn, or accept that the first turn might miss tool capabilities.

**`tool_choice: "required"` with no tools available**

If you force the model to use a tool but no MCP tools have finished loading, the response fails. Either don't use `tool_choice: "required"` for the first turn, or wait for tool list completion first.

## Run a real MCP-powered voice agent

Skilly is a voice-first AI tutor for Mac built on Realtime + MCP. Hold Control+Option, ask out loud, get a voice answer with a cursor pointing at exactly what to click on your screen — all powered by an MCP server you can read and fork on [GitHub](https://github.com/tryskilly/skilly). **15 minutes free, no card.**
