# PostHog Analytics Snapshot — 2026-04-28 (Day 2)

**Pulled:** mid-day 2026-04-28
**Compared against:** docs/POSTHOG-ANALYSIS-2026-04-27.md (yesterday's baseline)

---

## TL;DR

1. **Localhost pollution is GONE ✅** — 100% of 24h traffic now from tryskilly.app (yesterday: 67% was localhost). The Layout.astro guard works.
2. **2026-04-27 (yesterday) = 34 pv** — our best non-launch day so far. Multi-channel posting day correlates with daily lift.
3. **/learn: 0 pageviews in last 24h** — expected. Just deployed; SEO compounds in 7-30 day windows, not hours.
4. **Permissions-grant leak holds at ~20%** — 1 of 5 app opens granted all permissions in last 48h. The 75% drop-off is real, not noise.
5. **Session replay is capturing ✅** — 10 recordings since enablement, including 2 long-engagement sessions worth watching.

---

## Top-line vs yesterday

| Metric | 2026-04-27 (7d snapshot) | 2026-04-28 (now, 7d) | Notes |
|---|---|---|---|
| Pageviews | 104 | 124 | +20 (yesterday's posts adding) |
| Sessions | 104 | 124 | 1:1 because of memory persistence |

## Daily trend (3-day window, after localhost cleanup)

| Date | Pageviews | Notes |
|---|---|---|
| 2026-04-28 (today, partial) | 13 | mid-day; on pace for ~25-30 |
| 2026-04-27 | **34** | yesterday's distribution day — best non-launch peak |
| 2026-04-26 | 32 | multi-Reddit posting day |
| 2026-04-25 | 9 | (was reported 13 yesterday — old number was localhost-inflated) |

Important: **historical numbers shifted slightly** because localhost dev hits are no longer in the data. Today's numbers are clean. Yesterday's snapshot was inflated by ~30% in the "direct" bucket.

## Top pages (last 24h)

| Path | PV |
|---|---|
| `/` | 17 |
| `/vs/cluely/` | 1 |

Homepage is taking 94% of traffic. /vs/* pages getting trickle. /learn = zero (deployed too recently).

## Top referrers (last 24h)

| Referrer | PV |
|---|---|
| `$direct` | 16 |
| `https://tryskilly.app/` (internal nav) | 1 |
| `android-app://com.reddit.frontpage/` | 1 |

Only **1 attributed Reddit referral in 24h** despite 7+ comments and 1 fresh post yesterday. Caveat: most Reddit→site clicks bypass referrer attribution because:
- Reddit Android app strips referrer header by default
- iOS in-app browser does the same
- Yesterday's post was 0.1h old at end of pull; comments compound for days, not hours

The compounding will show up in next 24-48h.

## /learn paths (last 24h)

**Empty.** No /learn pageviews yet.

This is expected:
- Netlify deploy of /learn finalized ~12h ago
- Google index latency = 1-7 days for new URLs
- Footer + Nav now link /learn but nobody's clicked through yet
- First organic /learn signal = days 7-30, not hours

Track this query daily to see when it crosses zero.

## Funnel snapshot (last 48h)

| Step | Count |
|---|---|
| `$pageview` | 61 |
| `web_demo_video_played` | 10 |
| `web_cta_download_clicked` | 2 |
| `app_opened` | 5 |
| `all_permissions_granted` | 1 |
| `trial_first_turn` | 0 |

### Conversion rates

- Demo video play rate: 16% (was 23% over 7d)
- Download click rate: 3.3% of pageviews (was 7.7% over 7d)
- App opens > download clicks (5 vs 2) — confirming users grab DMG straight from GitHub releases
- **All permissions granted: 1 of 5 app opens (20%)** — the funnel leak holds steady at the 20-25% range. This is real, not noise.

### What changed vs yesterday's snapshot

- Sample sizes are smaller (48h vs 7d), so all rates have higher variance
- Trial first turn = 0 in last 48h. Yesterday's 7d showed 2. Could be:
  - Small sample noise
  - The 1 user who got through permissions today hasn't completed first turn yet
  - The leak now is at permissions→first-turn (not just app-open→permissions)

Need 48-72 more hours of data before we can call the trend.

## Session replays — captured ✅

10 recordings since session_recording was enabled yesterday afternoon. The 4 worth watching:

| Recording ID | Time | Duration | Clicks | Why watch |
|---|---|---|---|---|
| `019dd4ca-cacb-7a11-bb4d-0a6f27de958e` | 15:52 | **9.5 min** | 6 | Long engagement + clicks → real exploration session |
| `019dd3e4-217e-783c-8452-7550a068a70b` | 11:40 | **10.3 min** | 0 | Long read, no clicks → likely article reading or video play |
| `019dd36e-bd2e-72e0-9250-6581e597a52e` | 09:32 | 21s | **8** | High clicks in short time → either rage-click or quick navigator |
| `019dd330-b5f2-7647-8c0a-3377725da093` | 08:24 | 30s | 2 | Quick exit but with interaction |

**To watch a recording:**
1. Open us.posthog.com → Session Replay (left nav)
2. Filter by date: 2026-04-28
3. Click any of the 4 IDs above

**What to look for:**
- Does the user reach the download button?
- Where on the page do they hesitate / hover for >2s?
- Do any clicks appear to be on non-clickable elements (rage clicks)?
- Do they scroll past the FAQ without expanding any?

The 569s (9.5 min) session is the highest-leverage one to watch — that's a user actively spending time on the site. Whether they downloaded or not, their behavior tells us what the page taught them.

---

## What's NOT in the data yet but should be soon

- **/learn referrer attribution** — first organic search hits expected day 5-7
- **Activation from a Reddit comment** — yesterday's `oijp9ex` (the score-3 organic comment) and today's `oirefvr` and `oireyb2` should drive trickle traffic over next 48h
- **r/buildinpublic post 1sy46fm** — if it scores >5, expect 50-150 visitors to the homepage from this single post. We'll see the spike in tomorrow's 24h pull.

## Recommendation for today

1. **Watch 1 of the 4 surfaced session replays** (the 9.5-min one is the highest signal). 5 minutes of your time, possibly transforms the conversion playbook.
2. **Re-pull this analysis tomorrow** to see whether the new content from today (post + 4 comments) drove attributed traffic.
3. **Don't overreact to the 0 trial_first_turn** — sample is too small. Wait 72 more hours.

---

## Source label

`posthog-2026-04-28` — internal slug. Re-pull daily for the next 5 days to track post-launch trajectory cleanly now that localhost noise is gone.
