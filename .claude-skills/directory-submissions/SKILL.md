---
name: directory-submissions
description: Submit a SaaS/product to free marketing directories (BetaList, Indie Hackers Products DB, Product Hunt Coming Soon, There's An AI For That, Futurepedia, Toolify, Uneed, AIXploria, StartupBase, and more). Automates repetitive copy-paste submissions via Playwright, reusing a shared submission pack. Trigger when the user says "submit to directories", "directory bombing", "list my product", "submit to BetaList/ProductHunt/IH Products/TAAFT", or wants to register a product on multiple listing sites.
---

# Directory submissions — automation umbrella

Coordinates submissions of a product to the free directory ecosystem. This skill references shared per-directory sub-skills (see "Known directories" below) and a reusable **submission pack** pattern so the same asset set works everywhere.

## Core workflow

1. **Ensure a submission pack exists** at `.agents/directory-submission-pack.md` in the project root. Template below.
2. **Pick target directories** — prioritize by audience fit, not volume.
3. **Check for a directory-specific skill** in `~/.claude/skills/dir-*-submit/SKILL.md`. If one exists, invoke it — it encodes that directory's quirks.
4. **No skill yet?** Start with a probe script (see `Playwright probe template` below) to map the form, then write the skill as part of the work.
5. **Submit + verify** — always verify the listing is live before marking done.
6. **Update the queue** in the submission pack: `☐ → ◐ → ☑`.

## Why this is worth a skill (and not just a script)

Directory submissions are painful because:
- Each site has different required fields, character limits, categories.
- Most want a logo AND a screenshot AND a demo GIF.
- Some require account creation, email verification, and human approval.
- Copy-pasting the same text 10 times with slight tweaks is demoralizing and error-prone.
- You'll do this again for every new product.

Codifying this as a skill set means the next product submission is hours → minutes.

## Submission pack template (`.agents/directory-submission-pack.md`)

Required sections:

```markdown
# {Product} — Directory Submission Pack

## Core assets
- Name, Website, Tagline (≤60 chars), One-liner (≤90 chars), Category, Platforms, Pricing, Launch status, Maker, Contact

## Logos & screenshots
- Absolute file paths (Playwright file uploads need absolute paths)

## Descriptions (by length)
- Ultra-short (≤160 chars — for X, PH coming soon)
- Short (~250 chars — for BetaList, Toolify)
- Medium (~500 chars — for Futurepedia, PH, IH)
- Long (~800 chars — for pages that ask for more)

## Tags / keywords (pick what fits each directory)
## Maker bio
## Submission queue (priority + status table)
## Per-directory quirks (learned as you go)
```

**Why multiple lengths?** Each directory has different character limits. Prepare once, paste everywhere.

## Known directories (prioritized by audience fit for AI/indie products)

| # | Directory | URL | Login? | Cost | Skill |
|---|---|---|---|---|---|
| 1 | Indie Hackers Products DB | indiehackers.com/products/new | Yes | Free | `dir-indiehackers-products-submit` |
| 2 | BetaList | betalist.com/submit | No (email) | Free (slow approval) | `dir-betalist-submit` |
| 3 | Product Hunt — Coming Soon | producthunt.com/ship | Yes | Free | `dir-producthunt-coming-soon-submit` |
| 4 | There's An AI For That | theresanaiforthat.com/submit | Yes | Free | `dir-taaft-submit` |
| 5 | Futurepedia | futurepedia.io/submit-tool | Yes | Free (approval) | `dir-futurepedia-submit` |
| 6 | Toolify | toolify.ai/tool/submit-tool | Yes | Free | `dir-toolify-submit` |
| 7 | AIToolsClub | aitoolsclub.com/submit-ai-tool | Usually paid/approval | — | `dir-aitoolsclub-submit` |
| 8 | StartupBase | startupbase.io/submit | Yes | Free | `dir-startupbase-submit` |
| 9 | Uneed | uneed.best/submit-a-tool | Yes | Free (paid to skip queue) | `dir-uneed-submit` |
| 10 | AIXploria | aixploria.com/en/submit-ai | No | Free | `dir-aixploria-submit` |

Check `~/.claude/skills/dir-*-submit/SKILL.md` for each. If missing, probe and write.

## Playwright probe template

Every new directory starts with a probe to map its submission form. Save to `/tmp/probe-{directory}.js`:

```js
const { chromium } = require('playwright');
const USER_DATA_DIR = '/tmp/playwright-{directory}-userdata'; // persistent for login

(async () => {
  const ctx = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false, viewport: { width: 1440, height: 1100 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3500);

  // Dump fields with their best-guess labels (walks previousSibling chain)
  const fields = await page.evaluate(() => Array.from(document.querySelectorAll('input, textarea, select'))
    .map((el) => {
      const r = el.getBoundingClientRect();
      let label = '', n = el;
      while (n && !label) {
        let s = n.previousElementSibling;
        while (s && !label) { const t = (s.textContent || '').trim(); if (t && t.length < 100) label = t; s = s.previousElementSibling; }
        n = n.parentElement;
      }
      return { tag: el.tagName.toLowerCase(), type: el.type || '', id: el.id, name: el.name, label: label.slice(0, 80), placeholder: el.placeholder, y: Math.round(r.top), visible: r.width > 0 && r.height > 0 };
    }).filter((f) => f.visible && !/ot-|vendor|spambot|chkbox/i.test(f.id + f.name + f.placeholder)).sort((a, b) => a.y - b.y));
  fields.forEach((f) => console.log(f));

  await page.screenshot({ path: `/tmp/probe-{directory}.png`, fullPage: true });
  await ctx.close();
})();
```

Running this tells you every field, its label, its placeholder, and its y-position. Then write the real submit script + per-directory skill.

## Persistent context per directory

Use **separate persistent-context dirs per directory** so logins don't conflict:
- `/tmp/playwright-ih-userdata` (already exists from IH profile work)
- `/tmp/playwright-ph-userdata` (Product Hunt)
- `/tmp/playwright-betalist-userdata`
- etc.

Store the path constant in each directory's skill file.

## Submission etiquette

- **Do NOT submit the same product multiple times to the same directory.** Directories de-duplicate by URL.
- **Do NOT spam** — don't submit an unfinished product just to "claim the spot." Rejection hurts future submissions.
- **Tag yourself as the maker** when the directory asks — it ties submissions to your profile and lets you update later.
- **Turn on email notifications** (where offered) so you know when your listing goes live.
- **Verify after submission** — fetch the resulting URL and confirm your fields rendered correctly.

## Safety

These are PUBLIC submissions visible to anyone. Before submitting:
1. Confirm the copy in the pack is current (not a stale tagline from an old pivot).
2. Confirm the website URL is LIVE and converts visitors correctly.
3. Confirm the pricing + launch status are current.
4. Get explicit user approval on the exact copy per directory before clicking submit.

If in doubt, show the user a "dry-run" screenshot (form filled, not submitted), let them approve, then submit.

## What to do after submissions

- Add UTM parameters to tracking links *if* the directory lets you set the landing URL (e.g., `?utm_source=betalist`).
- Bookmark the resulting listing URLs — directories sometimes let you edit later.
- Track referrer traffic via PostHog / GA4.
- Replace the logo or tagline 2–3 weeks later when you have testimonials/metrics, if the directory allows edits.
