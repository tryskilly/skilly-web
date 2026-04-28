# PostHog Analytics Snapshot — 2026-04-27

**Pulled via PostHog API (HogQL queries, project 376182)**
**Window:** Last 7 days (and 14 days where noted)
**Data integrity caveat:** Layout.astro uses `persistence: 'memory'` for PostHog, so distinct_id resets per page load. We use `$session_id` for true uniqueness, not distinct_id.

---

## Top-line (last 7 days)

- **104 pageviews / 104 sessions** (~15/day average)
- **99 of 104 pageviews on `/`** (homepage gets ~95% of traffic — /vs/* pages are barely seeing traffic yet)

## Daily trend (last 14 days, sessions)

| Date | Sessions | Notes |
|---|---|---|
| 2026-04-27 | 21 (partial) | Today — Reddit comment day + r/vibecodingcommunity engagement |
| 2026-04-26 | **32** | Best non-launch day — r/SwiftUI + r/OpenSourceAI + r/PromptEngineering posts |
| 2026-04-25 | 13 | r/MacOS Saturday post |
| 2026-04-24 | 2 | quiet |
| 2026-04-23 | 18 | r/IH attempt |
| 2026-04-22 | 11 | X loop active |
| 2026-04-21 | 4 | quiet |
| 2026-04-20 | 5 | r/buildinpublic launch post |
| 2026-04-19 | 14 | actual public launch |
| 2026-04-18 | 3 | pre-launch |
| 2026-04-16 | 43 | initial soft-launch traffic |
| 2026-04-15 | **69** | LAUNCH SPIKE (peak day) |
| 2026-04-14 | 11 | day before launch |
| 2026-04-13 | 1 | pre-launch |

**Read:** Launch peak (69 sessions) we haven't matched. Post-launch baseline of 10-30/day, with Reddit work driving the upper-end days.

---

## Top referrers (last 14 days)

| Referrer | Pageviews |
|---|---|
| `$direct` (typed URL / paste / unknown) | 128 |
| `http://localhost:4321/` | **86** ← your own dev server, NOT real traffic |
| `https://t.co/` (X click-through) | 9 |
| `https://www.google.com/` | 5 |
| `https://t.co/gWJBUBlrGD` (specific X thread link) | 5 |
| `https://www.reddit.com/` | 4 |
| `https://tryskilly.app/` (internal nav) | 2 |
| `android-app://com.reddit.frontpage/` (Reddit mobile app) | 2 |
| `https://github.com/tryskilly/skilly` | 2 |
| `https://www.reddit.com/r/macapps/comments/1srzk5a/has_anyone_tried_clicky/` | **2** ← organic gold |
| `https://github.com/` | 1 |
| `https://tryskilly.app/vs/cluely/` | 1 |

### Interpretation

1. **You're polluting your own analytics with dev traffic** — 86 of 128 "direct" referrers are actually `localhost:4321` (your Astro dev server). Real direct traffic is ~42, not 128. **Fix:** add a `if (location.hostname !== 'tryskilly.app') return;` guard in PostHog init.

2. **The r/macapps Clicky thread is organic backlink gold** — somebody discovered Skilly via discussion of the original Clicky. This is the compounding effect we want — being the active maintained fork attracts traffic from threads about the OG project.

3. **Reddit + Reddit-Android = 8 pageviews** in 14 days from referral attribution.

4. **X via t.co = 14 pageviews** (9 + 5) — bigger than Reddit by volume.

---

## Source × Sessions (last 7 days)

| Source | Pageviews | Sessions |
|---|---|---|
| (uncategorized + dev localhost) | 85 | 85 |
| **reddit** | 8 | 8 |
| **x (twitter)** | 6 | 6 |
| github | 3 | 3 |
| google | 2 | 2 |

Note: the `direct` bucket in this query missed `$direct` literal value, lumping into "other". Real direct ~ 80 once dev localhost is filtered out.

---

## Source × Downloads (last 14 days)

| Source | `web_cta_download_clicked` |
|---|---|
| direct | 9 |
| x | 2 |
| **reddit** | **0** |

**This is the most actionable finding.** Reddit drove 8 sessions over 14 days but generated **zero attributed downloads**. X drove 20 sessions and got 2 downloads. Direct/word-of-mouth converts best (9 downloads).

Either:
- Reddit visitors are reading but not converting (curious, not buyer-fit) → keep building credibility, don't chase volume
- The CTA on the homepage isn't compelling for Reddit's traffic profile → A/B test
- Reddit traffic is mostly mobile (Reddit Android app referrer), and the download flow is desktop-Mac specific → friction
- Sample size is too small to conclude anything → keep watching

My read: **all of the above, weighted toward "small sample"**. Don't pivot off this number yet, but watch it weekly.

---

## Funnel — what 104 pageviews actually did

| Step | Count | % of pageviews |
|---|---|---|
| Land on site (`$pageview`) | 104 | 100% |
| Played demo video (`web_demo_video_played`) | 24 | 23.1% |
| Clicked nav link (`web_nav_link_clicked`) | 22 | 21.2% |
| Opened the app (`app_opened`) | 12 | 11.5% |
| Sent a voice message (`user_message_sent`) | 9 | 8.7% |
| Clicked download CTA (`web_cta_download_clicked`) | 8 | 7.7% |
| Granted all macOS permissions (`all_permissions_granted`) | 3 | 2.9% |
| Started trial (`trial_started` / `onboarding_started`) | 2 | 1.9% |
| Completed first turn (`trial_first_turn`) | 2 | 1.9% |
| Reached 5-min trial mark (`trial_minute_5`) | 1 | 1.0% |
| Reached 10-min trial mark (`trial_minute_10`) | 1 | 1.0% |

### Where the funnel leaks

- **Land → Download click**: 8% (decent for a 0-effort first-touch on a beta)
- **Download click → App actually opens**: 12 / 8 = 150% (more app-opens than download-clicks, meaning many users came in from outside the website tracking — a chunk are direct GitHub release downloads bypassing the site)
- **App opens → All permissions granted**: 3 / 12 = 25%. **🔴 Big leak here.** 75% of users who launched the app never made it through the permissions onboarding (Screen Recording + Accessibility + Microphone). This is the highest-leverage UX fix.
- **All permissions → Trial first turn**: 2 / 3 = 67%
- **Trial first turn → 5-minute mark**: 1 / 2 = 50%
- **5-min → 10-min**: 1 / 1 = 100%

---

## Recommendations (ranked by leverage)

### Immediate (this week)

1. **Filter dev-server traffic from PostHog.** `localhost:4321` is polluting your data and skewing every "direct" metric. One-line fix in Layout.astro:
   ```js
   if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
     // skip PostHog init
   }
   ```
   This will make all future analysis cleaner.

2. **Fix the permissions-grant leak.** 75% of users who download + open the app never finish permissions onboarding. Possibilities to investigate via session replay:
   - Are the macOS permission prompts confusing?
   - Does the onboarding screen explain why each permission is needed?
   - Is there a dead-end where they grant Screen Recording but skip Accessibility?
   - The two articles you just shipped (`/learn/enable-screen-recording-permission-macos/` and `/learn/enable-accessibility-permission-macos/`) could be linked from the in-app onboarding screen as "stuck? read this" deep links.

3. **Re-pull this analysis in 7 days.** /learn just deployed; we want to see if it draws traffic from search and how /learn-attributed sessions convert vs homepage-attributed.

### Channel allocation reality check

- **Volume winner**: X (20 pageviews / 14d) > Reddit (8 / 14d). But neither is moving the needle vs the launch spike.
- **Don't drop Reddit** — the r/macapps Clicky thread shows the compounding mechanic working. Long-term, "Skilly is the active Clicky fork" mentions will keep paying.
- **Push X harder** — your reply-guy loop has been quiet for 5 days. The 32-session day on 4/26 happened on a multi-Reddit-post day; haven't measured what a multi-X-post day would do because we haven't had one recently.

### The 30-day SEO bet

`/vs/*` pages: 4 pageviews across 5 pages in 7 days. /learn just shipped. Both will compound on the SEO timeline (30-90 days), not the social timeline (hours-days). Don't expect /learn data this week — expect early signal in 14 days, real signal in 30.

---

## Source label

`posthog-2026-04-27` — internal slug for this analysis. Re-pull weekly with same query set to track week-over-week.

## What we did NOT measure

- **GitHub release download counts** — PostHog only tracks web events, not the actual DMG downloads from GitHub releases. Cross-reference GitHub release stats against `web_cta_download_clicked` to see how many users bypass the website entirely.
- **App-side conversion to paid** — Polar handles checkout, separate analytics. No data here on $19/mo trial-to-paid conversion.
- **Specific session replays** — PostHog has session replay enabled but disabled in config (`disable_session_recording: true`). To unblock the permissions-grant leak investigation, this needs to be enabled (with privacy considerations).
