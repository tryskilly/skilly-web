# Organic content tracking

Learning pages use PostHog and GA4 through the shared `data-ph-*` event bridge. No event properties contain visitor-provided text or other PII.

## Page classification

All `/learn/*` pages register:

- `product_line: learn`
- `funnel_stage: education`
- `page_path`: the current pathname
- campaign parameters when present

## Events

| Event | Trigger | Decision properties |
| --- | --- | --- |
| `web_learn_article_engaged` | First of 75% article progress or 45 seconds | `article_slug`, `article_category`, `engagement_trigger` |
| `web_learn_cta_viewed` | Contextual trial CTA is at least 50% visible | article, category, CTA variant |
| `web_learn_related_clicked` | Related-guide card click | source article, category, target article, location |
| `web_cta_download_clicked` | Download CTA click | article, category, canonical keyword, CTA text, target funnel |
| `web_learn_more_clicked` | Return to the learning library | article, category, location, target funnel |

## Primary funnel

Filter internal traffic out, then analyze:

1. `$pageview` where `product_line = learn`
2. `web_learn_article_engaged`
3. `web_learn_cta_viewed`
4. `web_cta_download_clicked` where `location = learn_article_cta`
5. `trial_started` and `web_checkout_completed` as aggregate downstream outcomes

Break down the first four steps by `page_path` or `article_slug`. Browser visitors and native-app users are anonymous until identity is explicitly joined, so do not present download-to-trial as a strict person-level funnel. Use aggregate downstream outcomes and the linked subset to decide which organic pages deserve CTA experiments and which topics attract traffic without purchase intent.
