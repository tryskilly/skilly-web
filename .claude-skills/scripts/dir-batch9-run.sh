#!/usr/bin/env bash
set -u
AGENT=~/.claude/venvs/browser-use/bin/python
RUNNER=~/.claude/skills/browser-use-agent/run_agent.py

DETAILS='Product details:
- Name: Skilly
- Website: https://tryskilly.app
- GitHub: https://github.com/tryskilly/skilly
- Tagline: AI tutor for macOS, speaks 16 languages
- Short description: Voice-first AI tutor for macOS. Screenshots your active app, moves the cursor to the exact UI element, narrates the answer in 16 languages. Works in any Mac app.
- Long description: Skilly is a voice-first AI tutor that lives in the macOS menu bar. Press a shortcut, ask out loud, and it screenshots your active app, moves the cursor to the exact UI element, and narrates the answer in your own language (16 languages, 8 voices). Works in every Mac app. OpenAI Realtime voice + vision. 50-seat founder beta at $19/mo.
- Categories: AI, productivity, education, voice AI, macOS, developer tools
- Pricing: Freemium ($19/mo)
- Logo: /tmp/skilly-logo-512.png
- Maker: Mohamed Saleh Zaied, eng.mohamedszaied@gmail.com, @moelabs_dev, https://linkedin.com/in/mohamedsalehzaied

You are using the REAL Chrome via CDP. The user reports they have LOGGED IN to these sites recently — session cookies should be active.

Rules:
1. If still logged out: "LOGIN REQUIRED" and stop.
2. If paid-only: "PAID LISTING" and stop.
3. Use logo /tmp/skilly-logo-512.png if upload field exists.
4. Fill required fields, click submit.
5. Report confirmation + URL.
6. "already submitted / pending / under review" = SUCCESS.'

run_one() {
  local slug="$1" url="$2"
  local log="/tmp/dir-batch9/${slug}.log"
  echo "━━━ ${slug} — ${url}"
  "$AGENT" "$RUNNER" --max-steps 45 --cdp-url http://localhost:9222 --allow-file /tmp/skilly-logo-512.png --task "Open a NEW TAB and go to ${url}. Submit Skilly.

${DETAILS}" >"$log" 2>&1
}

run_one "10words"          "https://10words.io"
run_one "indiehackerstacks" "https://indiehackerstacks.com"
run_one "thenocodelist"    "https://thenocodelist.com"

echo "🎉 Batch 9 complete."
