# Reddit Marketing Research — 2026-05-04

Mined top-of-month posts from r/IndieHackers, r/SaaS, r/SideProject, r/microsaas, r/buildinpublic. Cross-referenced against the existing playbook in `.claude/skills/reddit-growth/distribution-patterns.md` (last updated 2026-04-27). Goal: surface NEW tactics not yet in our playbook, plus rule-changes (auto-mod patterns) we should know.

---

## NEW tactics worth shipping (not yet in our playbook)

### 1. Affiliate program — 40% recurring via Affonso ⭐ HIGHEST LEVERAGE

**Source:** PostClaw founder, r/indiehackers/1seubx8 (58↑, 186 comments).

**Insight:** "I was actually thinking about bringing on a cofounder and giving away 40% equity. That's the same number, but a much worse deal. A cofounder gets 40% forever, even if they don't deliver. Affiliates only earn when they bring in customers."

**Mechanic:** Set up affiliate program on [Affonso](https://affonso.io). 40% recurring commission. Listed in their marketplace + outreach to ideal partners.

**Failure mode confirmed in same post:** Cold email to 130 newsletter owners → 0 conversions. Cold DMs to 500 X accounts → ~5 affiliate signups → ZERO sales for weeks → then sudden burst (5 sales before breakfast).

**For Skilly:** $19/mo × 40% = $7.60/mo recurring per referred customer. Set up Affonso (~30 min), list publicly, focus outreach on Mac-focused YouTubers + indie newsletter writers + creator-tool reviewers. SKIP cold newsletter email (0% conversion proven). DO X DMs to indie creators in Mac/AI niche.

**Why we haven't done this:** Not in our playbook. Existing playbook said skip affiliates ("50+ signups → ~0 actual promotion") — but that was for B2B SaaS with weak referral incentive. The 40% rate is the differentiator + Affonso's marketplace gives discoverability.

### 2. YouTuber outreach for tech utility apps ⭐ HIGH LEVERAGE

**Source:** Photo2Calendar, r/indiehackers/1szqzkc (51↑, 83 comments). Sitting at $1k MRR.

**Insight:** "HowToMen, a tech YouTube channel with around 800k subscribers, mentioned it out of nowhere. Downloads spiked hard… That period basically funded the next three months of improvements."

**Mechanic:** Mid-size tech YouTubers (200k-1M subs) regularly cover small indie utility apps. They need fresh content; a polished demo + a working app = they cover it for free. The 1-week traffic spike from one mention compounds into App Store reviews → word of mouth → consistent organic.

**For Skilly:** We have a 50-sec launch video already perfect for this. Pitch list:
- **MacMost** (Mac-focused, ~250k subs, replies to email)
- **Snazzy Labs** (Mac/Apple, 700k+, reads pitches)
- **MaxTech** (Mac focused, 800k+)
- **Dave2D** (tech reviewer, 3M+, occasionally covers Mac apps)
- **9to5Mac** (newsroom, not YouTube but adjacent)
- **AppleInsider** YouTube channel
- **HowToMen** specifically (800k, the same channel that lifted Photo2Calendar)

Email format: 3-line pitch + 50-sec demo link + free Pro key. No deck. No follow-up sequence — one email, move on.

**Why we haven't done this:** Existing playbook missed this entirely. Pitching MKBHD-tier creators is hopeless, but the 200k-800k tier is genuinely reachable and runs out of content ideas.

### 3. Churn-recovery email sequence (3 templates, no fancy automation)

**Source:** r/indiehackers/1snxo82 (55↑, 203 comments). Recovered $1K+/quarter with 3 emails.

**Templates (verbatim from author, work because they're personal-feeling):**

```
Trigger 1: User went quiet (8-10 days no meaningful activity)
"Hey [name], noticed you've been a bit quiet lately.
Everything okay? Happy to help if anything felt confusing or broken."

Trigger 2: Failed payment
"Hey [name], looks like your last payment didn't go through,
probably just a card issue. Here's the link to update it: [link].
Let me know if you need anything."

Trigger 3: Trial user never used core feature (after X days)
"Hey [name], saw you signed up [X] days ago but haven't tried [core feature] yet.
That's usually where people get the most value.
Want me to walk you through it quickly?"
```

**For Skilly:** We already have Resend wired up + PostHog tracking the right events (`app_opened`, `permission_granted`, `all_permissions_granted`, `trial_started`, `trial_first_turn`). The triggers map directly:

| Skilly trigger | PostHog query |
|---|---|
| User went quiet | `app_opened` ago > 8 days, no `user_message_sent` since |
| Trial user never used core feature | `trial_started` + age > 2 days + no `trial_first_turn` |
| Failed payment | Polar webhook → directly to Resend |

**Why we haven't done this:** Was on the backlog in `posthog-permissions-leak-2026-05-02.md` recommendations but de-prioritized. This proves it's worth ~$1K/quarter even at small scale. **Estimate: 2 hours to ship via Resend + PostHog Cohorts API.**

### 4. Viral mechanic teaser pre-launch

**Source:** Wandoria, r/indiehackers/1svepwo (56↑, **287 comments** on a coming-soon page).

**Insight:** A coming-soon page with a single quirky mechanic ("randomize button → random company profile") got 287 IH comments. The mechanic itself is the hook — no traction, no MRR claim, no story.

**For Skilly:** The "Skilly's cursor moves to point at the exact button" IS our quirky mechanic, but our launch posts buried it in feature-list framing. Worth experimenting with a single-mechanic teaser post: *"Built a Mac voice tutor that physically moves your cursor to the button you need. Watch this 8-sec clip. Honest feedback?"* + the GIF/short clip.

**Why we haven't done this:** Our launch posts have always been comprehensive ("here's the product + here's the story + here's pricing"). A single-mechanic teaser is a different format we haven't tested.

---

## RULES we should know (auto-mod / sub culture changes since April)

### r/IndieHackers MRR-claim auto-mod — must include proof

**Pattern observed:** All 3 posts mentioning MRR were flagged by `IH-AutoMod` with:
> "If you're making an MRR/revenue claim, include proof. If this is an opinionated article about another company, make that clear. If there's no proof for the claim and it isn't a clearly opinionated/sourced article, it will be removed."

**Implication:** Any future Skilly r/IH post mentioning "$19/mo", "X downloads", or any revenue number MUST include a Stripe/Polar dashboard screenshot inline. Otherwise removal.

### r/SaaS culture is meta + AI-fatigued

**Top comment on the 1276↑ "Just hit $2K MRR" post:** "Lmao all bots comments!" with 124↑.

**Implication:** r/SaaS audience is openly skeptical of polished marketing prose. Any Skilly post there should be MAXIMALLY casual / lowercase / typo-tolerant. Long structured posts read as AI-generated and get downvoted into invisibility.

### "$X MRR" hook works disproportionately on r/SaaS

The 1276↑ post was a 4-sentence post: "Just hit $2K MRR after 8 months of grinding. No ads, no funding, just building in public… Biggest lesson: ship faster than you think you should… But we are still struggling to get reach…"

**Implication:** When Skilly hits $1K MRR (currently ~$60-100/month from beta), this exact 4-sentence template is the formula. No long retrospective needed. Save the spot.

---

## What does NOT work (confirmed failures from this round)

| Tactic | Source | Why it fails |
|---|---|---|
| Cold email to newsletter owners | PostClaw 130 emails / 0 conversions | Newsletter owners need volume guarantee, won't risk reputation on small SaaS |
| Cold DMs to 500 X accounts (for affiliate signups) | Same post | Got affiliate signups but ZERO sales for weeks (affiliates don't actually promote) |
| Asking for advice in your own post | r/SaaS $2K MRR + Photo2Calendar both did this | Comments turn into "good job mate" platitudes, not actual advice |

---

## Recommended next moves (priority order)

1. **Set up Affonso affiliate program — 40% recurring.** ~30 min. Public listing. Then 1-week of targeted X DMs to Mac/AI indie creators (NOT broad newsletter spam).

2. **Pitch 5-7 mid-size Mac-focused YouTubers.** One email each, no follow-up. Free Pro key offer + 50-sec demo link. List in section 2 above.

3. **Ship the 3 churn-recovery emails via Resend.** ~2 hours. Use the verbatim templates. PostHog events already exist as triggers.

4. **Test a single-mechanic teaser post on r/IndieHackers** — "Skilly's cursor moves to the button you need. 8-sec clip. Honest feedback?" Different format than our previous launch posts.

5. **Save the "$X MRR" 4-sentence template** for when Skilly hits a real round number. Don't post until then.

---

## What to AVOID (based on this research)

- ❌ Newsletter cold-email outreach (PostClaw proved 0%)
- ❌ Long structured marketing posts on r/SaaS (gets called bot)
- ❌ Posting MRR/revenue claims on r/IndieHackers without screenshot proof (auto-mod)
- ❌ Asking "any advice on growth?" at the end of posts (attracts platitudes, not insight)

---

## Cross-reference with existing playbook

`.claude/skills/reddit-growth/distribution-patterns.md` (2026-04-25 + 2026-04-27 refresh) covers: helpful comments, subreddit launch posts, Discord/Slack, X build-in-public, long-tail SEO, comparison pages, F5bot, pricing escalation. **None of those overlap with this round's findings.** This file extends the playbook rather than replacing it.

Update cadence: re-mine these subs every 14 days. The MRR-claim auto-mod rule + the "everyone is a bot" sentiment on r/SaaS look like persistent rule changes, not transient.
