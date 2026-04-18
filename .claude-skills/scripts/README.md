# Working scripts from the directory-submission session

Standalone helper scripts that supported the Claude skills in this directory.
All assume the browser-use venv exists at `~/.claude/venvs/browser-use/`.

## Scripts

### `sync-cookies.py`
Reads Chrome cookies for a list of domains via `browser_cookie3`
(prompts macOS Keychain), injects them into Playwright's persistent
user-data-dir. **Does NOT work alone** for modern auth-walled sites —
kept here for reference. Prefer CDP + copy-profile (see scripts/cdp-setup.md below).

### `skilly-monitor-rt.sh`
Real-time monitor: tails active `/tmp/dir-batch*/*.log` agent output
every 3s, polls key listing URLs every 60s, logs state changes.
Run: `./skilly-monitor-rt.sh > /tmp/skilly-monitor.out 2>&1 &`

### `login-station.py` / `login-station-2.py` / `login-uneed.py`
Open N directory sign-up pages in Playwright's persistent Chromium.
User signs up manually; cookies save to the shared user-data-dir.
Works for simple magic-link flows (peerpush). Fails on sites with
browser fingerprinting — use CDP + copy-profile there.

### `dir-batch{4..9}-run.sh`
Batch submission templates. Each runs the `browser-use-agent` runner
sequentially against a list of (slug, url) pairs. Copy, tweak the
product details + URL list, run.

## CDP + copy-profile recipe (the one that works)

Chrome 136+ refuses `--remote-debugging-port` on its default profile.
Workaround: clone the profile.

```bash
# 1. Quit Chrome
osascript -e 'quit app "Google Chrome"'
sleep 3

# 2. Copy the profile (skip heavy caches)
rm -rf /tmp/chrome-debug-profile
mkdir -p /tmp/chrome-debug-profile/Default
cp "$HOME/Library/Application Support/Google/Chrome/Local State" /tmp/chrome-debug-profile/
rsync -a \
  --exclude='Cache/' --exclude='Code Cache/' --exclude='GPUCache/' \
  --exclude='Service Worker/CacheStorage/' --exclude='ShaderCache/' \
  --exclude='DawnGraphiteCache/' --exclude='DawnWebGPUCache/' \
  --exclude='File System/' --exclude='blob_storage/' \
  "$HOME/Library/Application Support/Google/Chrome/Default/" \
  /tmp/chrome-debug-profile/Default/

# 3. Launch Chrome with the clone + debug port
open -na "Google Chrome" --args \
  --user-data-dir=/tmp/chrome-debug-profile \
  --remote-debugging-port=9222 \
  --no-default-browser-check --no-first-run

# 4. Verify
curl -s http://localhost:9222/json/version | head -5

# 5. Run any browser-use-agent with --cdp-url http://localhost:9222

# 6. When done, close the debug Chrome:
pkill -9 -f "user-data-dir=/tmp/chrome-debug-profile"
```

## Logo sizing gotcha

Directories reject images larger than their limit. The `*-512.png`
asset in Downloads was actually 1536×1536 — resize before submission:

```bash
sips -Z 512 /Users/engmsaleh/Downloads/skilly-logo-mark-512.png \
  --out /tmp/skilly-logo-512.png
```

Pass with `--allow-file /tmp/skilly-logo-512.png` to the agent.
