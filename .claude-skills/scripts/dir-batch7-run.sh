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
- Categories/tags: AI, productivity, education, voice AI, macOS
- Pricing: Freemium ($19/mo paid tier)
- Logo: /tmp/skilly-logo-512.png (allowed for upload)
- Twitter: moelabs_dev
- LinkedIn: https://linkedin.com/in/mohamedsalehzaied

You are using the REAL Chrome via CDP — you should be logged in. If logged out, print "LOGIN REQUIRED" and stop.

Rules:
1. If logged out: "LOGIN REQUIRED" and stop.
2. If paid/sponsored to submit: "PAID LISTING" and stop.
3. Use /tmp/skilly-logo-512.png for logo upload if asked.
4. If the site has a multi-step form, fill step 1 completely before moving on.
5. Fill all REQUIRED (*) fields. Skip optional ones you cannot map.
6. Click Submit. Report confirmation message + URL.
7. If the site reports the product is already submitted / in review / pending: treat that as SUCCESS and report the URL.'

run_one() {
  local slug="$1" url="$2"
  local log="/tmp/dir-batch7/${slug}.log"
  echo "━━━ ${slug} — ${url}"
  "$AGENT" "$RUNNER" --max-steps 50 --cdp-url http://localhost:9222 --allow-file /tmp/skilly-logo-512.png --task "Open a NEW TAB and go to ${url}. Submit Skilly as a new product.

${DETAILS}" >"$log" 2>&1
}

run_one "devhunt"  "https://devhunt.org/submit"
run_one "fivetaco" "https://fivetaco.com/submit"

echo "🎉 Batch 7 complete."
