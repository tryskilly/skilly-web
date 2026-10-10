# Two-funnel site spec: B2C home, B2B /builders

Status: implemented on `feature/two-funnel-site` (2026-10-11).

## Why

PostHog, last 90 days, visitors → people who clicked Download:

| Section | Visitors | Download clickers | Rate |
|---|---|---|---|
| `/learn/*` | 433 | 1 | 0.2% |
| `/` (Builders pitch) | 422 | 0 | 0% |
| `/vs/*` | 66 | 3 | 4.5% |
| `/people` | 63 | 11 | 17% |
| B2B pages | 56 | 1 | 2% |

Traffic is organic and individual (Google 155, direct 152, ChatGPT 21 in the last 30 days).
`/people` converts. Almost nobody reaches it. The homepage sells B2B to B2C visitors, and
the `/learn` call to action sits at the end of long articles.

B2B has no organic traffic. Its visitors will come from founder outreach, so its page must
support a conversation, not convert strangers.

## Decisions

1. `/` becomes the Mac app page (current `/people` content).
2. Builders moves to `/builders/`. The nav carries one small "For product teams →" link to it.
3. Each page sells one product. No cross-selling in heroes, pricing, or CTAs.

## Routes

| Route | Change |
|---|---|
| `/` | Render the `/people` page. Title and description switch to B2C. |
| `/people/` | 301 to `/` (keep old links and the 11 converting visitors' path). |
| `/builders/` | Render the current homepage. Remove `src/pages/builders.ts` redirect (it redirects `/builders` → `/`). |
| `/for/*`, `/use-cases/*`, `/tools/*` | Primary CTA and secondary links point at `/builders/`, not `/`. |
| `LearnLayout` | `secondaryHref` for builder articles becomes `/builders/`. |
| Sitemap, canonical, JSON-LD | Homepage becomes `SoftwareApplication` for the Mac app; Builders schema moves to `/builders/`. |

Risk: the homepage's search snippet changes. It currently ranks for B2B terms with little
B2B traffic, so the cost is low. Watch Search Console for 4 weeks after the switch.

## B2C funnel (`/`, `/learn/*`, `/vs/*`)

1. Hero: 10-second loop of the cursor pointing at a real control in Blender or Figma.
   One button: "Download for Mac". Under it: "15 minutes free · no card".
2. `/learn/*` articles (433 visitors, 1 download):
   - Inline CTA after the first section, matched to the article's app
     ("Stuck on this in Blender? Skilly sees your screen and points at the button.").
     `LearnLayout` already derives `articleApp`. Reuse it.
   - Sticky bottom bar on scroll past 40%, dismissible, same copy.
   - Keep the existing end-of-article CTA.
3. `/vs/*`: same Download button in the hero, not only at the bottom.
4. Remove from B2C pages: Builders pricing, Studio links, SDK mentions.

## B2B funnel (`/builders/`)

1. Primary CTA: "Book a 15-minute setup call" (`cal.com/moelabs.dev`), framed as the
   founder-led offer: "I set Skilly up on your product for free."
2. Secondary CTA: the onboarding audit ("paste your URL") and "Try it in Studio".
3. Proof above the fold: the live widget running on this page (`SkillyWebWidget`).
4. Pricing collapses to "Free to try · from $29/mo". Keep the full table lower down or drop it.
5. Remove the Mac app pill and download links.

## Tracking

Record the 90-day baseline above before shipping.

| Event | Where | Why |
|---|---|---|
| `download_served` (server) | `src/pages/download.ts` GET, with referrer path + UTM | Every download path goes through `/download`. Today only 6 clicks are recorded against 17 app opens. Server-side capture fixes that for all callers. |
| `web_cta_download_clicked` | keep; new `location` values `learn_inline`, `learn_sticky`, `vs_<page>_hero` (existing: `nav`, `learn_article_cta`, `vs_<page>`) | Compare placements. |
| `web_builders_book_clicked` | exists; new `location` `builders_hero_primary` | B2B primary conversion. |
| `web_builders_studio_clicked` | exists | B2B secondary. |

PostHog dashboards (to create after approval):
- B2C: `$pageview` → `web_cta_download_clicked` → `download_served` → `app_opened` → `trial_started` → `skilly_checkout_started` → `skilly_subscription_activated`.
- B2B: `/builders/` pageview → book or Studio click → Studio signup → script installed → first live session. Studio events must be added in `apps/web-backend` first.

## Success criteria (4 weeks after ship)

- `/` download rate ≥ 10% (now 0%).
- `/learn` download rate ≥ 2% (now 0.2%).
- Every app open traceable to a `download_served` or a known non-web source.

## Out of scope here

- Mac checkout failures (11 of 13 trial users tried to pay, 1 succeeded). Fix in the `skilly` repo.
- Studio redesign. See the Builders dashboard redesign in the Claude chat "Motion graphics video demo".

## Before implementing

`skilly-web` has 68 uncommitted files on the working tree. Commit or stash them first so this
change lands on a clean branch.
