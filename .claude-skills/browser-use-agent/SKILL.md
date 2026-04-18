---
name: browser-use-agent
description: Natural-language browser automation with stealth. Use this instead of hand-writing Playwright scripts when you need to automate a form submission, signup, or any web flow on a site with bot protection (Cloudflare, reCAPTCHA) or an unknown UI. The agent reads the page via an LLM and acts without brittle selectors. Trigger when the user says "automate this form", "submit to {directory/site}", "fill in this page", "bypass Cloudflare", "log into X", or when a Playwright script keeps failing on detection.
---

# browser-use-agent

Runs [browser-use](https://github.com/browser-use/browser-use) with Patchright-backed stealth Chromium against any URL and a natural-language task. LLM drives the browser step-by-step.

## When to use this vs raw Playwright

| Situation | Use this | Use Playwright |
|---|---|---|
| Cloudflare / bot detection active | ✅ yes (Patchright) | ❌ blocked |
| Unknown form / directory submission | ✅ yes (LLM figures it out) | ❌ requires probe + selectors |
| Deterministic flow on a known site with stable DOM | ⚠️ overkill | ✅ yes |
| Needs multi-page reasoning ("find the checkout, fill it") | ✅ yes | ❌ painful |
| You don't want ongoing selector maintenance | ✅ yes | ❌ breaks on layout changes |

**Heuristic**: If the script would need 3+ Playwright selectors AND the site isn't one we've automated before, use this. Once the flow is proven, it's fine to leave it as browser-use (no need to re-port to raw Playwright).

## Setup (one-time)

Already installed at `~/.claude/venvs/browser-use` if you're reading this. If not:

```bash
mkdir -p ~/.claude/venvs
python3 -m venv ~/.claude/venvs/browser-use
source ~/.claude/venvs/browser-use/bin/activate
pip install --upgrade pip
pip install browser-use patchright
# Install Patchright's patched Chromium (needed first time)
patchright install chromium
deactivate
```

## API keys

browser-use is a SEPARATE process from Claude Code — it needs its own LLM credentials. Put ONE of the following in `~/.claude/venvs/browser-use/.env`:

```
GROQ_API_KEY=gsk_...       # free tier, fast, recommended default
OPENAI_API_KEY=sk-proj-... # pay-per-token, best reasoning
ANTHROPIC_API_KEY=sk-ant-...# $5 free credit, Claude quality
```

Or export in your shell. The runner auto-loads from the .env file.

**Cost note**: ChatGPT Plus / Claude subscription DO NOT include API access. Those are separate billing at platform.openai.com / console.anthropic.com. Groq is the free path.

## Usage

```bash
~/.claude/venvs/browser-use/bin/python \
  ~/.claude/skills/browser-use-agent/run_agent.py \
  --task "Go to https://example.com/submit and fill in the form with name 'Acme', email 'me@x.com', then click Submit" \
  --user-data-dir /tmp/playwright-example-userdata
```

### Key flags

| Flag | Default | Purpose |
|---|---|---|
| `--task` | required | Natural-language goal for the agent |
| `--user-data-dir` | `~/.claude/venvs/browser-use/userdata` | Persistent Chromium profile (cookies survive across runs). Use a per-site dir if you log into different accounts. |
| `--headless` | off (visible browser) | Hide the browser window. Keep visible when logins are needed. |
| `--max-steps` | 40 | Upper bound on agent reasoning loops. Form submissions usually finish in 8–15 steps. |
| `--model` | `llama-3.3-70b-versatile` (Groq) | Override the LLM. Auto-detects provider from model name (`gpt-*` → OpenAI, `claude-*` → Anthropic, else Groq). |

### Provider auto-detection

- Model name contains `gpt` → OpenAI
- Model name contains `claude` → Anthropic
- Model name contains `llama`/`mixtral`/`gemma` → Groq
- Otherwise falls back to whichever key is available

## Writing good tasks

browser-use is an agent, not a script runner. Tasks that work well are **goal-oriented**, not step-oriented. Give it the intent and the inputs; let it figure out the clicks.

**Good**:
> Go to https://futuretools.io and submit a new AI tool using this data:
> - Name: Skilly
> - Website: https://tryskilly.app
> - Description: Voice-first AI tutor for macOS…
> - Category: Productivity / AI Assistant
> - Logo: /Users/.../skilly-logo-mark-512.png
>
> If the site requires login first and you can't do it yourself, pause and print "LOGIN REQUIRED" then stop.
> After submitting, report the final URL and confirmation message.

**Bad**:
> Click the button at selector '.submit-btn', wait 2s, then type into #name, then…

(That's Playwright, not agent work.)

## Reusable submission pack

For directory/product submissions, keep the product's copy in `.agents/directory-submission-pack.md` and reference it in the task:

> Read `.agents/directory-submission-pack.md` for the product details.
> Go to https://…/submit and fill the form using the SHORT description and relevant tags.
> If a field isn't in the pack, skip it.

## Login handling

browser-use can't solve CAPTCHAs or 2FA by itself. Pattern:

1. Run with `--headless` off and a persistent `--user-data-dir`
2. In the task, tell the agent: *"If login is required, pause and wait for the user to authenticate manually in the visible browser window, then continue."*
3. You log in once; cookies persist in the user-data-dir
4. Subsequent runs reuse the session

## Common pitfalls

- **Stopping too early**: the agent might consider "form looks filled" as success without clicking submit. Be explicit: *"…then CLICK THE SUBMIT BUTTON and wait for the confirmation page."*
- **Upload fields**: LLMs sometimes miss file upload widgets. Include the exact file path in the task and tell the agent: *"Upload {path} in the Logo field — it's usually an 'Upload' button that opens a file picker."*
- **CAPTCHA walls**: if the agent reports a CAPTCHA or "verifying you are human" loop, the site needs higher-grade stealth (Browserbase/Stagehand paid) or manual submission. Don't waste tokens grinding.
- **Groq rate limits**: free tier has per-minute token limits. If you get 429 errors, wait a minute or switch to a smaller model (`llama-3.1-8b-instant`).

## Integration with other skills

The `directory-submissions` umbrella skill orchestrates multiple submissions. It:
1. Reads `.agents/directory-submission-pack.md`
2. Iterates the queue
3. For each entry, calls `run_agent.py` with a task built from the pack
4. Captures result + status

New directories don't need a per-site skill — the agent handles unknown forms.

## Files

- `run_agent.py` — the runner (self-contained)
- Venv at `~/.claude/venvs/browser-use/`
- Persistent user data default: `~/.claude/venvs/browser-use/userdata/`
