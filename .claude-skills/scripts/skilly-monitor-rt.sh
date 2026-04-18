#!/usr/bin/env bash
# Real-time monitor: 60-sec listing URL polls + live agent step streaming.

LOG=/tmp/skilly-listings-monitor.log
STATE=/tmp/skilly-listings-state.json
AGENT_STREAM=/tmp/skilly-agent-stream.log

touch "$LOG" "$STATE" "$AGENT_STREAM"
[[ $(cat "$STATE" 2>/dev/null) == "" ]] && echo '{}' > "$STATE"

echo "[$(date +%H:%M:%S)] 🟢 Real-time monitor started (60-sec poll + agent log stream)" >> "$LOG"

# Worker 1: tail active agent batch logs as they are written
(
  # Follow any logs written under /tmp/dir-batch*/ — new files auto-discovered
  while true; do
    # Find logs touched in last 5 minutes
    files=$(find /tmp/dir-batch*/ -name "*.log" -mmin -5 2>/dev/null)
    if [[ -n "$files" ]]; then
      for f in $files; do
        slug=$(basename "$f" .log)
        # Extract JUST the agent's key narrative lines (Eval / Memory / Next goal / done)
        tail -n 2 "$f" 2>/dev/null | grep -E "Eval:|Memory:|Next goal|done:|Final Result|Task completed|LOGIN REQUIRED|PAID LISTING|Success" 2>/dev/null | \
          sed "s/^/[$slug] /" | sed 's/\x1b\[[0-9;]*m//g' >> "$AGENT_STREAM"
      done
    fi
    sleep 3
  done
) &
TAIL_PID=$!

# Worker 2: poll listing URLs every 60 seconds, log state changes
fetch() { curl -sL --max-time 15 -A "Skilly-Monitor" "$1" 2>/dev/null; }
classify() {
  local body="$1"
  if echo "$body" | grep -qi "not yet published\|waiting line\|under review\|pending\|moderation\|awaiting\|in queue\|will be reviewed"; then
    echo "pending"
  elif echo "$body" | grep -qi "Skilly\|tryskilly\|AI tutor for macOS"; then
    echo "live"
  elif echo "$body" | grep -qi "404\|not found\|NXDOMAIN"; then
    echo "dead"
  else
    echo "unknown"
  fi
}

declare -A SITES=(
  [ih_product]="https://www.indiehackers.com/product/skilly"
  [peerpush]="https://peerpush.net/p/skilly"
  [ih_profile]="https://www.indiehackers.com/moelabs"
)

cleanup() { kill "$TAIL_PID" 2>/dev/null; exit 0; }
trap cleanup INT TERM

while true; do
  ts=$(date "+%Y-%m-%d %H:%M:%S")
  for key in "${!SITES[@]}"; do
    url="${SITES[$key]}"
    body=$(fetch "$url")
    status=$(classify "$body")
    prev=$(python3 -c "import json; print(json.load(open('$STATE')).get('$key','_none_'))" 2>/dev/null)
    if [[ "$status" != "$prev" ]]; then
      echo "[$ts] 🔔 $key: $prev → $status  ($url)" | tee -a "$LOG"
      python3 -c "
import json
d = json.load(open('$STATE'))
d['$key'] = '$status'
json.dump(d, open('$STATE','w'))
" 2>/dev/null
    fi
  done
  sleep 60
done
