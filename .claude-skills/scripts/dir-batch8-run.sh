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
- Categories/tags: AI, productivity, education, voice AI, macOS, developer tools
- Pricing: Freemium ($19/mo)
- Logo: /tmp/skilly-logo-512.png (allowed)
- Maker: Mohamed Saleh Zaied, eng.mohamedszaied@gmail.com, @moelabs_dev, https://linkedin.com/in/mohamedsalehzaied

You are using the REAL Chrome via CDP. Sign-up links should work; if the site lets you sign up with Google/email, go ahead (eng.mohamedszaied@gmail.com). If verification is strict, print "LOGIN REQUIRED" and stop.

Rules:
1. If login required AND no easy Google/email signup path: "LOGIN REQUIRED" and stop.
2. If the site ONLY accepts paid submissions: "PAID LISTING" and stop.
3. Fill all REQUIRED (*) fields. Use logo at /tmp/skilly-logo-512.png.
4. Submit and report confirmation + URL.
5. If "already submitted / pending review" → treat as SUCCESS.
6. If the site has a 404 on the URL, try to find the submit path from the homepage nav.'

run_one() {
  local slug="$1" url="$2"
  local log="/tmp/dir-batch8/${slug}.log"
  echo "━━━ ${slug} — ${url}"
  "$AGENT" "$RUNNER" --max-steps 40 --cdp-url http://localhost:9222 --allow-file /tmp/skilly-logo-512.png --task "Open a NEW TAB and go to ${url}. Submit Skilly.

${DETAILS}" >"$log" 2>&1
}

run_one "futurepedia"     "https://www.futurepedia.io/submit-tool"
run_one "aixploria"       "https://www.aixploria.com/en/submit-ai/"
run_one "openalternative" "https://openalternative.co/submit"
run_one "thenocodelist"   "https://www.thenocodelist.com/"
run_one "10words"         "https://10words.io/"
run_one "indiehackerstacks" "https://indiehackerstacks.com/submit"

echo "🎉 Batch 8 complete."
