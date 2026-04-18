---
name: indiehackers-automation
description: Automate reads and edits of an Indie Hackers profile (bio, social links, products) via Playwright. Skip the UI discovery dance — use known URL patterns, modal conventions, and coordinate-based clicks. Trigger when the user says "indie hackers", "IH profile", "add to my IH", "update my indiehackers", or wants to edit a profile at indiehackers.com.
---

# Indie Hackers automation

Playwright-based automation of an Indie Hackers profile. This skill captures everything learned the hard way about IH's Ember-based edit UI so you don't need to re-discover it.

## Before you start

- **Login**: Playwright cannot inherit the user's browser session. Use a **persistent context** (`chromium.launchPersistentContext('/tmp/playwright-ih-userdata', ...)`) so the user logs in ONCE inside the Playwright window, then cookies persist across subsequent scripts.
- **Default viewport**: `1440 × 1100` works well. Lower heights cut off cards past product 3.
- **Ember render delay**: Always `await page.waitForTimeout(3500)` after page load. IH renders lazily and `networkidle` fires before content appears.
- **Script location**: `/tmp/playwright-ih-*.js`, run via the playwright-skill: `cd $PLAYWRIGHT_SKILL_DIR && node run.js /tmp/playwright-ih-XX.js`.

## URL map

| Purpose | URL |
|---|---|
| Sign in | `https://www.indiehackers.com/sign-in` |
| Public profile | `https://www.indiehackers.com/{handle}` |
| Edit mode | `https://www.indiehackers.com/{handle}/editing` |
| Options/settings | `https://www.indiehackers.com/{handle}/settings` |
| History (default view of logged-out /account) | `https://www.indiehackers.com/{handle}/history` |

The handle is the user's chosen username — **not** the word "account". If you see `@account's History`, the user isn't logged in properly or the handle isn't set up.

Login detection: wait for `page.url()` to NOT contain `/sign-in` or `/login`.

## Edit UI conventions (critical)

The edit page is Ember-based and card-driven. **No traditional form.** Everything is inline clicks:

1. **Bottom toolbar** (fixed): `[PROFILE] [➕ Add] [⇕ Sort] [OPTIONS]`
2. **Section cards** (top-down): Bio block → Social Links → Products → Articles
3. Each card has a gear ⚙ (settings) and X (delete section) in its top-right corner.

### The save-checkmark convention

Every edit modal in IH is a **full-screen overlay** with two icon controls at the top:
- **Red X at (402, 42)** — cancel, discards changes
- **Blue ✓ at (1037, 42)** — save

Both are SVGs inside `<div>` wrappers with classes:
- `.edit-popup__header-icon.edit-popup__header-icon--left` (X / cancel)
- `.edit-popup__header-icon.edit-popup__header-icon--right` (✓ / save)

**DO NOT click outside the modal to save — clicking outside CANCELS.** Always click the checkmark at `(1037, 42)`.

Coordinates are viewport-absolute and stable across screen sizes ≥ 1280×900.

## Opening modals

### Bio / Name / Avatar
Click the `@{handle}` heading block at approximately `(720, 123)`. The bio block has class `.bio-block__text-contents.editable-part` — walk up from the h1 to find a ~320×96 container.

Modal fields:
| Label | Placeholder | Notes |
|---|---|---|
| Name | `e.g. Courtland Allen` | First textarea |
| Description | `e.g. I love building stuff <3` | Second textarea |

Also: "Upload New Photo" button for avatar (file input).

### Section picker (Add Section)
Click the ➕ icon in the bottom toolbar (coord ~683, 1054 on 1100-tall viewport). Opens a modal titled **"Add Section"** with three cards:
1. **Products** — *Show off all the things you've been working on.*
2. **Articles** — *Feature the best writing you've done on the internet.*
3. **Social Links** — *Link to your profiles on popular social websites.*

Clicking a card adds that section to the profile AND closes the picker.

### Add Social Link
Inside the Social Links section, click the `+ Add Social Link` pill (narrow, ~98×20, left-aligned).

Modal title: **"Add Social Link"**. Two-stage form:
- Stage 1: platform grid (3 rows × 6 tiles). Click a tile to select.
- Stage 2: after tile click, a single textarea appears below with placeholder `{platform}.com/…` — it accepts just the handle, not the full URL.

**Free-tier platforms** (no 🔒 lock icon):
- Twitter · LinkedIn · email · Instagram

**🔒 IH Plus only**:
- Behance · Dribbble · Figma · GitHub · Gumroad · Hacker News · Medium · Product Hunt · Reddit · Substack · TikTok · Twitch · YouTube

(Website is not a platform option. Put it in the bio text instead.)

### Add Product

Inside the Products section, click the `+ Add Product` pill. This creates an inline **"New Product"** placeholder card — it does NOT open a modal. Click the placeholder card's body to open the configuration modal.

Modal fields (in order, all are `<textarea>`):
| Label | Placeholder | Notes |
|---|---|---|
| Name | `e.g. Spacely Sprockets` | |
| Description | `e.g. I built this as a fun side project...` | Default value: `"I just added this product to my list."` — overwrite this. |
| Or link to a new image | `https://…` | Image URL. Leave empty if not using. |
| How much money does this earn? | `e.g. $20k/mo` | Revenue. Optional. |
| Status Label | `e.g. Acquired, Discontinued, 2019 — present, etc.` | Shows as a blue pill on the public card. |
| Link When Clicked | `https://…` | The actual product URL — THIS is where the external link goes. |

⚠️ **Two fields have `https://…` placeholder** — the image URL and the product link. Don't treat them identically. Match by label (`/^Or link to/` vs `/^Link When Clicked/`).

## Free-tier limits

- **Social Links**: 4 platforms available free. Rest are locked.
- **Products**: only **2** are visible on the public profile; past that shows "Upgrade to show unlimited products". Anything you add beyond 2 still saves, just isn't shown.
- **Articles**: haven't tested — assume similar.
- **Bio links**: inline hyperlinks in bio text are **Plus only** (there's an amber "Upgrade to support links in your bio" pill under the bio). Put the website URL as plain text (e.g. `moelabs.dev`).

Strategy: since only 2 products show, curate the top 2 relevant to the user's positioning. Add more products anyway — they'll unlock if the user upgrades later.

## Code patterns that work

### Launch persistent context

```js
const { chromium } = require('playwright');
const USER_DATA_DIR = '/tmp/playwright-ih-userdata';
const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
  headless: false,
  viewport: { width: 1440, height: 1100 },
});
const page = context.pages()[0] || await context.newPage();
```

### Wait for login (5 minute budget)

```js
await page.goto('https://www.indiehackers.com/sign-in', { waitUntil: 'domcontentloaded' });
await page.waitForURL(
  (url) => !url.pathname.includes('sign-in') && !url.pathname.includes('login'),
  { timeout: 300000 }
);
```

### Find a card container by its h3 title

```js
const card = await page.evaluate((productName) => {
  const titles = Array.from(document.querySelectorAll('h3'))
    .filter((el) => (el.textContent || '').trim() === productName);
  if (!titles.length) return null;
  let up = titles[0];
  let cardEl = null;
  for (let i = 0; i < 10 && up; i++) {
    const r = up.getBoundingClientRect();
    // Card widths are typically ~690px; allow heights up to 800px for tall cards
    if (r.width > 500 && r.width < 1000 && up.querySelectorAll('h3').length === 1) {
      cardEl = up; break;
    }
    up = up.parentElement;
  }
  if (!cardEl) return null;
  cardEl.scrollIntoView({ block: 'center' });
  const r = cardEl.getBoundingClientRect();
  return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
}, 'Skilly');
await page.mouse.click(card.x, card.y);
```

### Fill modal fields by label

Each `<textarea>` has its label as a sibling/ancestor's previous sibling. Match by walking backwards:

```js
const fieldMap = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('textarea, input[type="text"], input[type="url"]'))
    .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 60 && r.height > 0; })
    .map((el) => {
      let label = '', node = el;
      while (node && !label) {
        let sib = node.previousElementSibling;
        while (sib && !label) {
          const t = (sib.textContent || '').trim();
          if (t && t.length < 80) label = t;
          sib = sib.previousElementSibling;
        }
        node = node.parentElement;
      }
      return { id: el.id, label: label.replace(/\s+/g, ' ').slice(0, 80) };
    });
});
const byLabel = (re) => fieldMap.find((f) => re.test(f.label));
await page.fill(`#${byLabel(/^Name/i).id}`, 'Skilly');
```

### Save

```js
await page.mouse.click(1037, 42); // ✓ checkmark
await page.waitForTimeout(3000);  // let Ember render + re-fetch
```

## Things that do NOT work

- **`page.getByText('New Product').click()`** times out unpredictably. Ember's innerText differs from the text content used by Playwright's locator engine. **Use `page.evaluate()` + `querySelector` + `mouse.click` with explicit coordinates.**
- **Clicking outside the modal to save** — IH treats this as cancel.
- **`networkidle` alone** — too early. Wait at least 3.5s after navigation for Ember to settle.
- **Assuming DOM IDs (e.g. `ember91`)** — they change every render. Always find fields by label.
- **Mouse clicks at y > viewport height** — silently do nothing. Always `scrollIntoView({ block: 'center' })` first.

## Things to confirm before acting on the user's profile

These are PUBLIC edits visible to everyone on the internet. Before making changes:

1. Show the user the exact copy you plan to fill (name, bio, descriptions, URLs).
2. Get explicit approval.
3. Then execute.

The user can always delete after, but the friction of "oops fix" is higher than "approve first".

## Cross-linking hint

Whenever you finish IH profile work, remind the user to **cross-link** — add the IH profile URL on their personal site (and ideally into a JSON-LD Person schema's `sameAs` array) so search engines and AI treat the profiles as one entity.

## Recovery / re-verification

After any run, verify by loading the public profile and scanning the innerText:

```js
await page.goto(`https://www.indiehackers.com/${handle}`);
await page.waitForTimeout(3500);
const content = await page.evaluate(() => document.querySelector('main').innerText);
```

Expect to see: name, bio text, Social Links (icons render as images, not text), Products (name + description + status pill).
