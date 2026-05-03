# Free Distribution Playbook — Top of Funnel — 2026-05-02

**Current state:** 14 downloads / 30 days = ~0.5/day. Need to 5-10× this.
**Constraint:** $0 paid spend. All organic.
**Already running:** r/SwiftUI, r/MacOS, r/buildinpublic, r/SideProject, r/microsaas, r/coolgithubprojects, r/OpenSourceAI, r/PromptEngineering, r/FigmaDesign, X reply-guy, /learn long-tail SEO, weekly Show IH attempts (3 removals — DO NOT RETRY r/IH self-promo).

This doc focuses on **untapped channels** + the **specific format** to use in each, based on actual top-performer recon.

---

## Tier 1 — Ship this week (highest ROI per hour)

### 🎯 1. r/macapps (224K subs) — THE biggest untapped sub in our exact ICP

**Why it's #1:** Last month's top posts are LITERALLY app launches with our exact positioning:
- "I built a 1MB Mac app that replaces 7 tools" — 463↑
- "[OS] SuperCmd — Open-Source alternative to Raycast Pro" — 429↑
- "Sentient OS: your Mac & iPhone understand your entire digital life" — 220↑ (direct adjacent competitor)
- "I built a free macOS app that processes your mic in real-time" — 252↑

**Karma gate:** 10pt **local** karma in r/macapps. We have 0 right now.

**Action plan:**
1. **TODAY: Karma build.** Spend 30 min commenting on 8-10 r/macapps posts. Pattern: someone asks "best X for Y", you reply with the tool you actually use + why. Avoid mentioning Skilly.
2. **In ~2-3 days** when karma reaches 10: Post with this title format:
   - **`[Free] Skilly: open-source voice AI tutor for Mac that watches your screen and walks you through any app`**
   - Use `[OS]` flair (open-source bonus)
   - Body: 1-paragraph what-it-does + 3 bullet "what's working" + 1 bullet "what's not yet" + GitHub link in body, official download link in body (rule: must be publisher's official source — tryskilly.app/download is fine)
   - Pricing-page link allowed but Rule says NO third-party download mirrors

**Self-promo cadence:** 1 per developer per 30 days. Make it count.

---

### 🎯 2. r/AI_Agents (354K subs) — STRONG fit, friendly to discussion-style posts

**Why:** This week's top posts are all technical discussions — the format that worked for us on r/PromptEngineering (1svq3br got us score 1 + 2 substantive comments).

**Karma gate:** None known — but enforces 1/10 self-promo ratio + "links in comments, not posts" (matches our existing playbook for new-domain filter).

**Action plan:**
- Post draft: **"Built a voice agent that watches your Mac screen — production lessons from running OpenAI Realtime in a desktop app for 30 days"**
- Body structure: 3 things that didn't carry over from chat-completion to Realtime, 3 things that worked, 3 open questions
- GitHub link in a follow-up comment, NOT in the body
- Disclose affiliation in opening line ("I built this...")

**When to ship:** 24+ hours after the morning Reddit replies that just shipped. Tomorrow morning.

---

### 🎯 3. r/blenderhelp (226K subs) — ZERO-friction help-question placement

**Why:** This is THE sub where "how do I bevel?" / "stuck in Blender" questions live. We have a Blender skill literally designed for these questions. Skilly *is* the answer.

**No karma gate. No self-promo restriction (it's a help sub).**

**Action plan — engagement-first, NOT a launch post:**
1. Filter `r/blenderhelp/new` for questions Skilly's Blender skill answers
2. Drop substantive answer (real Blender steps)
3. Add a soft mention: "if you keep getting stuck on similar things, I built a free tool that watches Blender and walks you through it — github.com/tryskilly/skilly"
4. Limit: 2 comments per day max — mods are alert to repeat soft-mentions

**Expected ROI:** 1-3 downloads per week of consistent engagement. Compounds slowly but cleanly.

---

### 🎯 4. r/AppHookup (202K subs) — Strict format but predictable

**Why:** This sub is purely deals/free-app announcements. Our 15-min free trial qualifies.

**No karma gate.** Strict title format:
- `[Platform] [Title] [Price Change] [Description]`
- Must be `[macOS] [Skilly] [Free 15-min trial] [Voice AI tutor that watches your screen and walks you through any app]`
- No CAPS, no symbols, no affiliate URLs

**Risk:** Rules say "no apps that are always free or free most of the time" — our 15-min trial reads as a permanent freemium. Could be removed. Worth 1 attempt; if removed, don't retry.

**Best time to post:** Tuesday morning ET (when AppHookup gets most engagement based on top-of-week patterns).

---

## Tier 2 — Ship in 7-14 days (build prerequisites first)

### 5. r/ProductivityApps (168K subs)

**Karma gate:** 10 community karma + 1 self-promo per month. Same pattern as r/IH (and we know how that goes — 3 strikes).

**Action:** Same karma-build path as r/macapps. After karma is built, post: **"Built Skilly: a Mac voice tutor that explains any app — no more YouTube tutorial purgatory"**. Use `[Self Promotion]` flair. 800-1200 words. Match the "I built this because" tone (top post: "After years of duct-taping Notion + Todoist + Miro together, I built my own thin..." — same vibe).

**No "vibe-coded" rule** = we're fine (Swift native).

---

### 6. r/macsetups (174K subs) — Visual culture, post LATER

**No rules surfaced.** Culture is "show off your Mac setup". Top posts are photographs.

**Action:** Take a clean screenshot of your Mac with Skilly visible in the menu bar. Post title: **"My setup with my favorite menu-bar app — Skilly (open source, voice AI tutor)"**. Risk: gets called out as marketing post. Lower priority.

---

### 7. r/EntrepreneurRideAlong (685K subs) — RETRY with different format

**Past failure:** Auto-removed on 2026-04-21 (per-sub karma gate).

**Action:** Build broad Reddit karma over 2 more weeks (currently we engage in r/SwiftUI, r/buildinpublic, r/IndieHackers comments — that all counts). Then retry with a NUMBERS retrospective post: **"30 days post-launch: 14 downloads, what I tried, what worked, what flopped"** — top performers in this sub are journey/journal posts, not pitches.

---

## Tier 3 — Comment/engagement-only (not for direct posts)

These are too big or too strict for self-promo, but PERFECT for the "F5bot keyword alert + helpful comment" pattern from `distribution-patterns.md`.

| Sub | Why comment-only | Trigger keywords to watch |
|-----|------------------|---------------------------|
| **r/apple** (6.4M) | Strict no-promo rules | "Mac AI assistant", "screen recording AI", "Apple Intelligence alternatives" |
| **r/mac** (3M) | Same as above | "best app for learning [tool]", "tutor for Mac", "AI helper" |
| **r/Productivity** (4.2M) | Generic, gets buried | "stuck learning [app]", "tutorials are too long", "ChatGPT can't see my screen" |
| **r/ChatGPT** (11.5M) | Spam-magnet, our framing differs | "wish ChatGPT could see my screen", "Mac alternative to ChatGPT desktop" |
| **r/OpenAI** (2.7M) | Adjacent — we use Realtime API | "OpenAI Realtime API", "voice + vision use cases" |
| **r/learnprogramming** (4.4M) | Target persona | "stuck in Xcode", "first time using [Mac dev tool]" |
| **r/Blender** (1.4M) | "Blender Creations Only" rule blocks tools | "stuck on bevel", "modifier confusion" — redirect to /r/blenderhelp |
| **r/LocalLLaMA** (709K) | We're cloud, not local | "voice + screen but I want local" — opening to discuss the tradeoff |

**Set up F5bot alerts** for: `clicky`, `Cluely`, `Sentient OS`, `Rewind`, `Granola`, `farzaa`, `screen recording AI`, `Mac voice AI`. Reply within hours when fits.

---

## What's working in r/macapps RIGHT NOW (formula)

Pulled from top 10 posts of last month, ranked by upvotes:

| Element | Pattern | Example |
|---------|---------|---------|
| **Title prefix** | `[Free]` or `[Lifetime]` or `[OS]` (open source — best signal) | `[OS] SuperCmd — Open-Source alternative to Raycast Pro` (429↑) |
| **Number in title** | "1MB", "7 tools", "600+ languages" | "I built a 1MB Mac app that replaces 7 tools" (463↑) |
| **Founder story** | Background + duration + cost | "I'm a Swedish airline pilot who taught himself Swift. 14 months and $20K later" (583↑) |
| **Competitor position** | "alternative to X" — borrows their search equity | "Open-Source alternative to Raycast Pro" (429↑) |
| **Body structure** | 1 paragraph what + 3-5 bullets specific features + 1 bullet what's missing | All winners |
| **Visual** | Demo GIF or screenshot in body | All winners |

**Skilly title that hits all 5 patterns:**
> `[OS] [Free] Skilly — voice AI tutor for Mac that walks you through Blender, Figma, Excel (5-day clicky fork, 20+ languages, open-source alternative to Cluely)`

That's: `[OS]` flair, `[Free]` tag, number ("5-day", "20+ languages"), founder story ("clicky fork"), competitor positioning ("alternative to Cluely"). Length 130 chars — fits Reddit's 300-char title limit.

---

## Competitor distribution intel (what they actually did)

### Sentient OS (r/macapps 220↑, 210 comments)
- Direct competitor — Mac AI that "understands your entire digital life"
- Won via: clear positioning + free download + responsive in comments (210 replies on 220 upvotes = 95% comment-to-upvote ratio = engaged audience)
- **Steal:** their willingness to comment back on every reply. We've been doing this on r/SwiftUI; bring it to r/macapps.

### clicky (the project we forked from)
- Farza Majeed launched primarily on **X (Twitter)**, not Reddit
- Reddit traction was secondary — coasted on Farza's existing X audience
- **Steal:** the open-source angle is sticky. Lead with `[OS]` everywhere. Apache-2.0 + GitHub stars = trust signal.

### Cluely (the AI cheating tool)
- Went viral via X controversy + Y Combinator backing
- Almost zero r/macapps presence (search returned nothing)
- **Steal:** none — we're not playing the controversy game. But "alternative to Cluely" positioning gives us their search equity without the negative association.

### Granola (meeting notes AI)
- "FOSS alternatives to Granola" had 10↑ on r/macapps — interest is THERE but light
- Their main distribution: LinkedIn + podcast appearances (not Reddit)
- **Steal:** none directly — Mac creator/coder is a different audience than Granola's enterprise notes-takers.

### OpenVox / Refine / SuperCmd (current r/macapps winners)
- All open-source, all have free tiers, all post `[OS]` flair
- Bodies follow same template: what + 5 features + roadmap + GitHub
- **Steal:** the template. We have everything they have + voice + screen.

---

## Quick wins to ship THIS WEEK (in priority order)

1. **TODAY: Comment on 5 r/macapps posts** to start the karma build (target 10pt LOCAL karma in 3-4 days)
2. **TODAY: Comment on 2 r/blenderhelp posts** with substantive Blender answers + soft Skilly mention (no karma gate)
3. **TOMORROW MORNING: Post on r/AI_Agents** with the discussion-style "OpenAI Realtime production lessons" angle (no karma gate)
4. **TOMORROW: Submit to r/AppHookup** with strict format `[macOS] [Skilly] [Free 15-min trial] [...]` — single attempt
5. **THIS SATURDAY (UTC): Second r/MacOS post** — 9 days after the first one (1svnkrl). Different angle: "30 days in — what I learned shipping a screen-aware AI tool on Mac"
6. **DAY ~4-5: Once r/macapps karma hits 10, ship the launch post** with the formula above

**Total estimated weekly download lift if all 6 ship:** +20-40 downloads (3-6× current rate).

---

## What to AVOID

- ❌ r/IndieHackers self-promo posts (3 strikes — automod will silently kill it)
- ❌ Posting in Big Five (r/apple, r/mac, r/programming, r/ChatGPT, r/Productivity) as direct launches — comment-only there
- ❌ r/Blender direct launch (rule blocks "non-Blender creations") — go to r/blenderhelp
- ❌ Posting tryskilly.app URL in any post body (site-wide new-domain filter still active 13d post-launch — confirmed via prior removals). Use github.com/tryskilly/skilly OR drop URL in follow-up comment.
- ❌ DM-based outreach (per `distribution-patterns.md` — Reddit's value is broadcast, DMs kill views)
- ❌ Spreading too thin — better to win 1 sub deeply (r/macapps) than to spam 10 subs once each

---

## What to instrument (so we can measure what works)

Add a `?source=` UTM parameter to all Reddit links going forward:
- `tryskilly.app/?source=reddit_macapps`
- `tryskilly.app/?source=reddit_aiagents`
- etc.

Then in PostHog query: `SELECT properties.$initial_referring_domain, properties.utm_source, count() FROM events WHERE event = 'web_cta_download_clicked' GROUP BY 1,2`. Within 7 days you'll know which sub actually drives downloads vs which just gives upvotes.

---

## 🚀 The Skills-as-Giveaway play (highest-leverage unlock)

**The insight:** Each `SKILL.md` in `github.com/tryskilly/skilly/skills/` is a standalone curriculum that's useful AS-IS without installing Skilly. They're real content — Blender Fundamentals alone is 282 lines, 8-hour learning path, sourced from the official Blender 5.1 manual.

**Total open-source curriculum we can give away:** ~1,400 lines across 5 skills (Blender, After Effects, DaVinci Resolve, Figma, Premiere Pro), all Apache-2.0, all live at `github.com/tryskilly/skilly/skills/`.

**Why this is a top-of-funnel multiplier:**

1. **Sidesteps "yet another AI app" fatigue.** A free curriculum gets a different reception than a free app. Same audience, different frame.
2. **Multiplies our Reddit surface 5×.** Instead of one Skilly post (1 sub, 1 self-promo per 30 days), each skill gets its own post in its niche sub. 5 skills × 5 niche subs = 25 distinct organic surfaces.
3. **Bypasses sub rules that block apps but allow free content.** r/Blender's "Blender Creations Only" rule blocks Skilly the app, but a "I open-sourced a Blender curriculum" post is closer to community resource (worth verifying with mods, but the framing is different).
4. **GitHub stars > app downloads as a top-of-funnel metric.** A star is one click, no permission prompts, no install friction. Stars compound social proof + appear in HN/Reddit signals.
5. **Counter-positions vs Cluely.** Cluely = closed-source AI helper. Skilly = open-source curriculum + optional companion app. Antithesis play.
6. **The format itself is shareable.** "I built a markdown spec for AI agent curriculums — anyone can fork the format" → opens up r/AI_Agents, r/programming, Show HN as additional surfaces.

### Per-skill distribution map

| Skill | GitHub URL | Primary sub | Secondary subs | Sample post title |
|-------|-----------|-------------|----------------|-------------------|
| **Blender Fundamentals** | `/skills/blender-fundamentals` | r/blenderhelp (226K) | r/learnBlender, r/blenderTutorials | "I open-sourced an 8-hour Blender curriculum — markdown format, free, includes object/edit mode mental model + bevel/modifier deep-dive" |
| **Figma Basics** | `/skills/figma-basics` | r/FigmaDesign (already posted, fresh angle) | r/web_design, r/UI_Design | "Open-sourced a Figma curriculum that actually teaches Auto Layout properly — markdown, free, MIT-style license" |
| **After Effects Basics** | `/skills/after-effects-basics` | r/aftereffects (337K) | r/MotionDesign | "I open-sourced an After Effects beginner curriculum — markdown, free" |
| **DaVinci Resolve Basics** | `/skills/davinci-resolve-basics` | r/davinciresolve (208K) | r/editors, r/VideoEditing | "Open-sourced a DaVinci Resolve curriculum — markdown, free, Blackmagic-version-aware" |
| **Premiere Pro Basics** | `/skills/premiere-pro-basics` | r/premiere (180K) | r/editors, r/VideoEditing | "Open-sourced a Premiere Pro beginner curriculum — markdown, free" |

**Cadence:** 1 skill-post per week. Cycle through 5 skills = 5 weeks of niche-sub launches with NO self-promo conflicts (each sub gets the post once).

### The "format play" cross-cutting post

Standalone post NOT tied to any single skill — pitches the SKILL.md format as an open standard:

**Title:** "Open-sourced a markdown format for AI agent app curriculums (5 reference skills included — Blender, Figma, AE, DaVinci, Premiere)"

**Subs:** r/AI_Agents, r/LocalLLaMA, r/programming, r/MachineLearning (350K-7M each), Show HN

**Body angle:** Lead with the FORMAT (YAML frontmatter + teaching instructions sections + pointing modes), show the 5 reference implementations, invite contributions. Skilly mentioned as "a reference runtime that reads the format". This is open-standard positioning, not product pitch.

### What to ship to enable this (1-2 hour task)

1. **Add a `skills/README.md`** at the repo root that lists all 5 skills with one-line descriptions + how to add your own. This is the landing page each Reddit post links to. (Currently the repo has skill folders but no top-level skills index.)
2. **Add a `skills/SPEC.md`** that documents the SKILL.md format (YAML keys, sections, pointing modes). This is the artifact the "format play" post links to.
3. **Per-skill landing pages on `/learn/skills/[skill]`** that render the markdown nicely (TOC, syntax highlighting, "use with Skilly" sidebar). SEO + nicer-than-GitHub reading experience.
4. **Submit each skill to the relevant Awesome list:**
   - Awesome Blender (`github.com/agmmnn/awesome-blender`)
   - Awesome Figma (search GitHub for "awesome-figma" — multiple exist)
   - Awesome After Effects (similar)
   - Awesome MotionDesign / Awesome VideoEditing
   PRs to these lists are perpetual SEO + traffic.

### Reddit comment template (for help-sub engagement)

When someone asks a question Skilly's skill answers, comment:

> "[Concrete answer to their question — 2-3 sentences of real Blender/Figma/AE help]
>
> If you keep getting stuck on similar things, I open-sourced a free [Skill Name] curriculum that covers this — [github.com/tryskilly/skilly/tree/main/skills/blender-fundamentals]. It's just markdown so you can read it on GitHub directly. (I also built a Mac app that uses these as live tutoring scripts but the curriculum stands on its own.)"

The "stands on its own" line is the trust signal. Optional app mention at the end, not the headline.

### Expected lift

If we ship this strategy:
- **5 skill posts × ~50 upvotes each = 250 niche-sub upvotes/month** (vs current ~5/month from r/macapps if we tried to launch the app there)
- **GitHub stars: estimated +30-100/month** (vs current near-zero — the repo gets stars only from the technical Reddit threads)
- **Download conversion:** stars → repo visit → app awareness. Estimated 10-15% of skill-post readers will visit the repo, 20% of those will check the app, 5-10% will download. So 250 upvotes × visitor multiplier ~ +30-50 downloads/month.
- **Compound effect over 3 months:** 100+ stars + 5 posts in 5 niche subs gives the project enough credibility for a Hacker News "Show HN" submission with real social proof.

### Risk mitigations

- **Make sure each SKILL.md actually stands alone** before posting. If they require Skilly to render meaningfully, the giveaway angle breaks. Read each skill cold before posting.
- **Don't lead with the app in any skill post.** App mention is sidebar/bottom, not headline. The post is about the curriculum.
- **r/Blender direct posts are still risky** — "Blender Creations Only" rule. r/blenderhelp + r/learnBlender are the safer paths.
- **Don't ship all 5 in one week.** That looks like spam. One per week, rotated through different subs.

---

## Update cadence

Re-run this analysis every 14 days. Markets shift; what works in r/macapps this week may saturate by next month. The competitor list (Sentient OS, OpenVox, etc.) is *especially* time-sensitive — what's hot now is what we should pattern-match against.
