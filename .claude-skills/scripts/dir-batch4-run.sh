#!/usr/bin/env bash
set -u
AGENT=~/.claude/venvs/browser-use/bin/python
RUNNER=~/.claude/skills/browser-use-agent/run_agent.py

DETAILS='Product details:
- Name: Skilly
- Website: https://tryskilly.app
- Tagline: AI tutor for macOS, speaks 16 languages
- Short description: Voice-first AI tutor for macOS. Screenshots your active app, moves the cursor to the exact UI element, narrates the answer in 16 languages. Works in any Mac app.
- Long description: Skilly is a voice-first AI tutor that lives in the macOS menu bar. Press a shortcut, ask out loud, and it screenshots your active app, moves the cursor to the exact UI element, and narrates the answer in your own language (16 languages, 8 voices). Works in every Mac app. OpenAI Realtime voice + vision. 50-seat founder beta at $19/mo.
- Category/tags: AI assistant, productivity, education, voice AI, Mac app
- Pricing: Freemium (15 min free trial, $19/mo paid)
- Logo file path: /Users/engmsaleh/Downloads/skilly-logo-mark-512.png
- Submitter: Mohamed Saleh Zaied, eng.mohamedszaied@gmail.com, hello@tryskilly.app, twitter @moelabs_dev

You should be logged in on this site from a prior session — cookies persist in the user-data-dir. If the site still shows a login wall, print "LOGIN REQUIRED" and stop.

Rules:
1. If login/signup is still required: print "LOGIN REQUIRED" and stop.
2. If paywall/sponsored: print "PAID LISTING" and stop.
3. Use logo file path above if logo upload field exists.
4. Skip optional fields you cannot map.
5. Report confirmation + final URL after submit.'

run_one() {
  local slug="$1" url="$2"
  local log="/tmp/dir-batch4/${slug}.log"
  echo "━━━ ${slug}"
  "$AGENT" "$RUNNER" --max-steps 30 --task "Go to ${url} and submit Skilly.

${DETAILS}" >"$log" 2>&1
}

run_one "uneed"        "https://www.uneed.best/submit-a-tool"
run_one "peerpush"     "https://peerpush.net"
run_one "devhunt"      "https://devhunt.org/submit"
run_one "uno"          "https://uno.directory/submit"
run_one "fivetaco"     "https://fivetaco.com/submit"

echo "🎉 Batch 4 complete."
