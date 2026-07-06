# Marketing site Vercel migration — 2026-07-04

## Status

`skilly-web` has been migrated from the Netlify Astro adapter to the Vercel Astro adapter and deployed successfully to Vercel.

## Vercel project

- Project: `tryskilly`
- Owner/scope: `mohamed-salehs-projects-7bccfd3c`
- Project id: `prj_W6shBPBV5SKVbdoaEjKAk8mB0NlU`
- Source repo: `https://github.com/tryskilly/skilly-web`
- Root directory: `.`
- Node version: `24.x`
- Deployment id: `dpl_6B6EwTcF1jx9qXfZyHuzg6VB63FA`
- Deployment URL: `https://tryskilly-hfazaq72v-mohamed-salehs-projects-7bccfd3c.vercel.app`
- Vercel alias: `https://tryskilly.vercel.app`

## Code changes

- Replaced `@astrojs/netlify` with `@astrojs/vercel@9.0.5`.
- Updated `astro.config.mjs` to use `adapter: vercel()`.
- Added `vercel.json` with explicit `bun run build` and `bun install` commands.
- Removed `netlify.toml`.
- Updated preview analytics suppression to include `.vercel.app`.
- Updated privacy processor copy from Netlify to Vercel.
- Updated AI audit missing-key warning from Netlify to Vercel.
- Converted `/dmg` from an Astro page to a proper endpoint so it returns the intended `302` redirect.

## Environment variables

Copied from Netlify to Vercel production, preview, and development:

- `OPENAI_API_KEY`
- `OPENAI_AUDIT_MODEL`
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `RESEND_SKILL_REQUESTS_AUDIENCE_ID`

Did not copy Netlify `NODE_VERSION=20`; Vercel project uses Node `24.x`.

## Domain state

Attached to Vercel project:

- `tryskilly.app`
- `www.tryskilly.app`

Vercel project ownership is verified and DNS is cut over.

Current DNS:

- `tryskilly.app` -> `76.76.21.21`
- `www.tryskilly.app` -> `ac19bc5ed1008daf.vercel-dns-016.com.`

Current Vercel verification:

- `tryskilly.app`: `ok: true`, `misconfigured: false`; Vercel still shows optional `dns_change_recommended` because it prefers generated apex CNAME, but the current A record is valid and working.
- `www.tryskilly.app`: `ok: true`, configured correctly.

Final aliases on deployment `dpl_6B6EwTcF1jx9qXfZyHuzg6VB63FA`:

- `https://tryskilly.app`
- `https://www.tryskilly.app`
- `https://tryskilly.vercel.app`

## Verification

- `bun run build` passed locally with the Vercel adapter.
- Vercel deployment `dpl_6B6EwTcF1jx9qXfZyHuzg6VB63FA` built successfully and is `READY`.
- Vercel env names are present for production, preview, and development.
- `https://tryskilly.app` returns `200` from Vercel.
- `https://www.tryskilly.app` returns `200` from Vercel.
- `https://tryskilly.app/download` returns `302` to the GitHub DMG.
- `https://tryskilly.app/dmg` returns `302` to the GitHub DMG.
- `https://tryskilly.app/api/waitlist` returns expected `400` for invalid empty JSON, proving the server route is live without creating a lead.
- `https://tryskilly.app/sitemap-index.xml` and `https://tryskilly.app/robots.txt` return `200` from Vercel.

Netlify `tryskilly` can be removed after any desired rollback window. Netlify `skilly-studio` was already replaced by Vercel earlier. Do not close the Netlify account until both Netlify projects are intentionally deleted or confirmed unused.
