# SEO Indexation and Organic Growth Plan

Date: 2026-07-30
Scope: tryskilly.app

## Current Search Console baseline

The site is no longer facing a broad indexing failure. Google Search Console reports 103 indexed pages and 96 excluded URLs. Of the excluded URLs, 80 are expected alternate-canonical or redirect variants. The remaining actionable cases are:

- 7 not found (404)
- 1 redirect error
- 2 blocked by robots.txt
- 3 crawled but not indexed
- 3 discovered but not indexed

Performance for 2026-06-30 through 2026-07-27:

- 13 clicks
- 7,427 impressions
- 0.2% CTR
- Average position 20

The immediate opportunity is therefore ranking and click-through improvement, not publishing hundreds of additional URLs.

## Repairs completed locally

- Excluded `/audit/` and `/checkout-success/` from the XML sitemap.
- Added `noindex, nofollow` to `/checkout-success/`.
- Added permanent redirects for four malformed legacy URLs:
  - `/learn/figma-null/`
  - `/learn/houdini-null/`
  - `/learn/premiere-pro-null/`
  - `/learn/davinci-resolve-null/`
- Added contextual related-guide links to learn articles using explicit relationships, course series, and shared tags.

These changes must be deployed before requesting validation in Search Console.

## Search Console cleanup after deployment

1. Verify the four legacy URLs and `/builders/` return HTTP 301 to their final canonical destinations.
2. Inspect `/dmg`, `/dmg/`, and `/download` live. They should be crawlable redirects, not blocked by robots.txt.
3. Start validation for the 404 and redirect-error groups.
4. Do not “fix” alternate-canonical and redirected URLs that already resolve to the trailing-slash canonical URL.
5. Treat `cdn.tryskilly.app` and `studio.tryskilly.app` separately at their own origins. They should not compete with the marketing site for search visibility.

## Existing-page optimization queue

### Tier 1: move positions 8–15 into the top 10

1. `/learn/enable-screen-recording-permission-macos/`
2. `/learn/enable-accessibility-permission-macos/`
3. `/learn/how-to-add-bevel-modifier-blender/`
4. Homepage brand-result snippet

For each page:

- Align the title and introduction with the exact query.
- Put the direct answer or procedure before background explanation.
- Add original screenshots and observable verification steps.
- Add a concise troubleshooting section and task-specific FAQ.
- Link from the relevant topic hub and two adjacent guides.
- Review the Search Console query set after 21–28 days.

### Tier 2: high impressions, weak position

1. `/learn/swiftui-preview-macro-xcode/`
2. `/learn/figma-auto-layout-tutorial/`
3. `/learn/openai-realtime-api-tutorial/`

These pages need substantive improvement rather than title-only changes: current-version accuracy, original examples, stronger intent matching, primary-source references, and clearer task completion criteria.

## Programmatic SEO strategy

Scale only within validated topic clusters:

1. macOS, Xcode, and SwiftUI troubleshooting
2. Task-based lessons for Blender, Figma, Houdini, DaVinci Resolve, After Effects, and Premiere Pro
3. Product adoption and onboarding software comparisons

Every indexable page must contain:

- A unique, task-specific search intent
- Original steps, examples, screenshots, or tested observations
- A useful answer even if the visitor never downloads Skilly
- A self-referencing canonical URL
- At least two contextual internal links
- A parent hub or curriculum relationship
- A truthful updated date
- Structured data only when the visible page supports it

Do not generate pages by swapping software names into a shared body. Merge overlapping intents into a stronger canonical guide, and noindex utility or incomplete pages.

## Recommended page architecture

```text
/learn/
  /learn/blender/
    /learn/how-to-add-bevel-modifier-blender/
    /learn/how-to-add-subdivision-surface-modifier-blender/
  /learn/figma/
    /learn/figma-auto-layout-tutorial/
  /learn/macos/
    /learn/enable-screen-recording-permission-macos/

/vs/
  /vs/appcues/
  /vs/appcues-vs-pendo/
```

Create HTML topic hubs before expanding each cluster. Hubs should explain the learning path, link to every qualifying child page, and avoid being thin link lists.

## Publishing and measurement cadence

Weekly:

1. Export Search Console page and query data.
2. Score opportunities by impressions, distance to position 10, business relevance, and content quality gap.
3. Improve five existing URLs before approving new pages.
4. Publish no more than one tested cluster batch.
5. Inspect indexing, cannibalization, and CTR by page type.

After the initial cleanup, split sitemap reporting by content type if operationally practical:

- learn/tutorial pages
- comparison pages
- tools and commercial pages

## 90-day targets

- No unresolved redirect errors or accidental 404s from internal links.
- All sitemap URLs are canonical, indexable, and return HTTP 200.
- Tier 1 pages reach stable top-10 visibility for at least one qualified query.
- Organic CTR improves from the 0.2% baseline without sacrificing relevant impressions.
- New programmatic pages are published only in clusters where an existing page has demonstrated impressions or clicks.

## Guardrails

- Google treats redirects and `rel=canonical` as strong canonical signals; sitemap inclusion is weaker. Include only preferred canonical URLs in sitemaps.
- Robots.txt is not a canonicalization mechanism and may leave blocked URLs visible without useful snippets.
- Large sets of substantially similar pages can be treated as doorway or scaled-content abuse.
- Internal links must be crawlable HTML anchors and should use descriptive anchor text.

Primary references:

- [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
