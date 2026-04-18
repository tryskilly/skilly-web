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
- Categories/tags: AI, productivity, education, voice AI, Mac, macOS
- Pricing: Freemium ($19/mo paid tier)
- Logo file: /tmp/skilly-logo-512.png (512x512 PNG, allowed for upload)
- Maker: Mohamed Saleh Zaied, eng.mohamedszaied@gmail.com, twitter @moelabs_dev
- LinkedIn: https://linkedin.com/in/mohamedsalehzaied

You should be logged in on this site from a prior session. If the submit form still requires login, print "LOGIN REQUIRED" and stop.

Rules:
1. If login still required, print "LOGIN REQUIRED" and stop.
2. If paid/sponsored only, print "PAID LISTING" and stop.
3. Use the logo file at /tmp/skilly-logo-512.png if a logo/image upload field exists.
4. Fill all visible fields sensibly. Skip optional fields you cannot map.
5. Click Submit and report confirmation message + final URL.'

run_one() {
  local slug="$1" url="$2"
  local log="/tmp/dir-batch5/${slug}.log"
  echo "━━━ ${slug} — ${url}"
  "$AGENT" "$RUNNER" --max-steps 35 --allow-file /tmp/skilly-logo-512.png --task "Go to ${url} and submit Skilly.

${DETAILS}" >"$log" 2>&1
}

run_one "uneed"    "https://www.uneed.best/submit-a-tool"
run_one "devhunt"  "https://devhunt.org/submit"
run_one "uno"      "https://uno.directory/submit"
run_one "fivetaco" "https://fivetaco.com/submit"

echo "🎉 Batch 5 done."
