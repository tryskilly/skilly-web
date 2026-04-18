---
name: dir-indiehackers-products-submit
description: Submit a new product to the Indie Hackers Products DB at indiehackers.com/products/new. Uses the existing indiehackers-automation persistent session. Trigger when the user says "submit to IH products", "list on indie hackers", "add product to IH products DB", or wants to register a product on the Indie Hackers product directory.
---

# Indie Hackers Products DB submission

Submit a product to [indiehackers.com/products/new](https://www.indiehackers.com/products/new). This is separate from the IH *profile* Products section (which is handled by `indiehackers-automation`) — this creates a standalone product page in IH's products database.

## Prerequisites

- Logged-in IH session in the persistent context at `/tmp/playwright-ih-userdata` (created by `indiehackers-automation`).
- `.agents/directory-submission-pack.md` with the product's core assets + description.
- Absolute path to the product logo (square, 512×512+, PNG preferred).

## Submission URL

```
https://www.indiehackers.com/products/new
```

The form title is **"Create a Product Page"**.

## Form fields

Only 3 input fields + 1 image upload + submit button. Much simpler than the profile editor.

| # | Field | Input | Placeholder | Required | Notes |
|---|---|---|---|---|---|
| 1 | Product name | `input[text]` | `e.g. Acme Sprockets` | ✅ | **Name only** — not a description. Label says: "Only include the name of the product itself, not a description." |
| 2 | Tagline | `input[text]` | `e.g. Music Remixing App, Form Building Tool, Community for Digital Nomads` | ✅ | **Shows next to the name.** Keep it short and descriptive — think "category + benefit", not a sales headline. |
| 3 | Website | `input[text]` | `https://…` | ✅ | Full URL with protocol. |
| 4 | Logo | file upload via "Upload Image" button (~y=747) | — | ✅ | Square PNG/JPEG; IH shows it ~100×100 on listings. |
| — | Submit | button text "Submit Product" (~y=883) | — | — | Creates the product page immediately — no approval queue. |

**No fields for**: description (added on the product page itself after creation), pricing, platforms, categories. IH keeps this intentionally minimal; long-form content happens in Updates/Milestones posted *after* the product exists.

## Tagline tips

The placeholder ("Music Remixing App, Form Building Tool") implies IH wants **category + what it does**, not a punchy marketing tagline. Format suggestions:

- ✅ *AI tutor for macOS* (category + platform)
- ✅ *Voice AI tutor for creative apps* (category + specifier)
- ❌ *Stop hunting through menus* (too emotional — save for marketing pages)
- ❌ *The AI that moves your cursor and speaks 16 languages* (too long for a tagline)

Keep under ~50 characters; IH truncates longer taglines in feed previews.

## Playwright recipe

```js
const { chromium } = require('playwright');
const USER_DATA_DIR = '/tmp/playwright-ih-userdata';

const PRODUCT = {
  name: 'Skilly',
  tagline: 'AI tutor for macOS, speaks 16 languages',
  url: 'https://tryskilly.app',
  logoPath: '/Users/engmsaleh/Downloads/skilly-logo-mark-512.png',
};

(async () => {
  const ctx = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false, viewport: { width: 1440, height: 1100 },
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  await page.goto('https://www.indiehackers.com/products/new', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3500); // Ember render

  // Fields are positioned top-down. Match by placeholder (IDs are Ember-dynamic).
  await page.fill('input[placeholder="e.g. Acme Sprockets"]', PRODUCT.name);
  await page.fill('input[placeholder*="Music Remixing"]', PRODUCT.tagline);
  await page.fill('input[placeholder="https://…"]', PRODUCT.url);

  // Upload the logo via the hidden file input inside the "Upload Image" button
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) await fileInput.setInputFiles(PRODUCT.logoPath);
  await page.waitForTimeout(1500);

  // Screenshot for verification BEFORE submitting
  await page.screenshot({ path: '/tmp/ih-products-new-filled.png', fullPage: true });

  // Submit
  await page.click('button:has-text("Submit Product")');
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3000);

  // Verify: after submit, IH redirects to the new product page (e.g. /products/skilly)
  console.log('Final URL:', page.url());
  await page.screenshot({ path: '/tmp/ih-products-new-result.png', fullPage: true });
  await ctx.close();
})();
```

## Post-submission: the extended edit form

After a successful Submit Product, IH redirects to `/product/{slug}/edit` — a MUCH bigger form to flesh out the product page. The basic listing is already live at `/product/{slug}` at this point, but filling this form unlocks a richer page.

**Extended fields:**

| Field | Type | Notes |
|---|---|---|
| Motivation | textarea | "Why are you working on {Product}?" — 2-4 sentences. |
| Web address | prefilled (input) | Already set from step 1. |
| Twitter handle | input | Format: `@handle`. Optional. |
| Facebook address | input | Optional. |
| Start Date (Month + Year) | two text inputs with placeholders `Month` and `Year` | REQUIRED. IH accepts month name ("April") and 4-digit year. |
| End Date (Month + Year) | two text inputs | Only for discontinued products. |
| Page Admins | role input | Prefilled with your handle as Founder. |
| **Tag selectors** (pills with class `.tag-selector__tag`) | toggleable divs | Click to select. |
| Founder Skillset | single-select pill | `Founders Code` / `Founders Don't Code` |
| Number of Founders | single-select | `Solo Founder` / `Multiple Founders` |
| Number of Employees | single-select | `No Employees`, `Under 10`, `10+`, … |
| Business Model | single-select | `Subscriptions`, `Advertising`, `Commission`, `Consulting`, `Donation-Supported`, `Free`, `Partnerships`, `Sales & Transactions` |
| Funding | single-select | `Bootstrapped`, `Accelerator`, `Crowdfunded`, `Donation-Supported`, `Seed Funded`, `Self Funded`, `VC Funded` |
| Initial Commitment | single-select | `Full Time` / `Side Project` |
| Platforms | multi-select | `Android`, `Browser Plugin`, `Desktop`, `iOS`, `Mac`, `Mobile`, `Web` |
| Tags | multi-select | Long list: `AI`, `Design`, `Education`, `Productivity`, `SaaS`, `B2B`, `B2C`, etc. |
| Visibility | checkbox | `Anyone with the link` (always on, disabled) + `Anyone browsing Indie Hackers` (toggle). |

**Pill click pattern** — all pills share class `.tag-selector__tag`:

```js
async function clickPillByText(page, text) {
  return await page.evaluate((t) => {
    const pills = Array.from(document.querySelectorAll('.tag-selector__tag'));
    const target = pills.find((p) => (p.textContent || '').trim() === t);
    if (!target) return false;
    target.scrollIntoView({ block: 'center' });
    target.click();
    return true;
  }, text);
}
```

Use exact text match (trim) — substring match will collide (e.g., `AI` vs `APIs`, `Donation-Supported` appears in both Business Model and Funding).

**Save button**: `button:has-text("Save Changes")` at the bottom. After save IH redirects to `/product/{slug}` (the public page).

## Regular post-submission actions

1. **Visit the public product page** (`/product/{slug}`) and confirm logo + tagline + motivation + metadata rendered correctly.
2. **Link to profile** — by default IH automatically links the product to your profile's Products section if the website URL matches.
3. **Track referrer traffic** — add `?utm_source=indiehackers&utm_medium=directory&utm_campaign=products_db` to analytics if you want separate attribution.
4. **Update the submission pack queue**: change `☐` → `☑`.
5. **Consider a milestone post** later — IH rewards active products that post updates in the Milestones feed.

## Gotchas

- **No de-duplication check on the form** — if you submit the same URL twice, you'll end up with duplicate product pages. Always check `/products?q={product-name}` first.
- **URL must load** — IH may fetch the URL for metadata; a down site can fail silently.
- **Ember-dynamic IDs** — do NOT target `#ember123`. Always use `placeholder=` or visible button text.
- **Logo upload** — the "Upload Image" button triggers a hidden `<input type="file">`; use `setInputFiles()` on that input directly, not the button.
- **Image size** — upload at least 512×512 square. IH crops to a circle or rounded square in some views.

## Related

- Profile-side product editing: `indiehackers-automation` skill.
- Umbrella of all directories: `directory-submissions` skill.
