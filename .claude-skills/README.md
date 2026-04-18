# Claude Skills for Skilly marketing

Reusable Claude Code skills built during the 2026-04-18 marketing session.
They live in this repo for version control; the source of truth is still
`~/.claude/skills/` where Claude Code auto-discovers them.

## How to install into Claude Code

```bash
for skill in browser-use-agent directory-submissions dir-indiehackers-products-submit indiehackers-automation; do
  rsync -a "./.claude-skills/$skill/" "$HOME/.claude/skills/$skill/"
done
```

## What's here

### `browser-use-agent/`
Generic natural-language browser automation runner. Handles LLM routing
(Gemini / OpenAI / Anthropic / Groq), persistent user-data-dir, CDP
connection (`--cdp-url`), file-upload allowlist (`--allow-file`).

### `directory-submissions/`
Umbrella skill for submitting a product to many free marketing directories.
References a `.agents/directory-submission-pack.md` submission pack and
the `browser-use-agent` runner.

### `dir-indiehackers-products-submit/`
Specific form map for indiehackers.com/products/new — the field names,
tag-selector pill pattern, and the post-submit extended form.

### `indiehackers-automation/`
IH profile (`/{handle}/editing`) automation — the modal-based editor,
`(1037, 42)` save-checkmark coord, free-tier limits, etc.

## Prerequisites

- Python venv at `~/.claude/venvs/browser-use/` with `browser-use` and
  `patchright` installed (see `browser-use-agent/SKILL.md` for setup).
- An LLM API key in `~/.claude/venvs/browser-use/.env` (Gemini works well:
  https://aistudio.google.com/apikey).
- Chromium installed via `patchright install chromium`.
