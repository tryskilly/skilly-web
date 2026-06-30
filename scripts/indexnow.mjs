#!/usr/bin/env node
// IndexNow submitter — instantly notifies Bing, Copilot, Perplexity, Yandex, Seznam
// (NOT Google — Google ignores IndexNow). Run after a deploy that adds/changes pages:
//   node scripts/indexnow.mjs
// The key file (public/<KEY>.txt) must already be live on the domain.

const HOST = 'tryskilly.app';
const KEY = '9fb825477617a04ec41c4958163fa3ae';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap-0.xml`;

const sm = await fetch(SITEMAP);
if (!sm.ok) { console.error('sitemap fetch failed:', sm.status); process.exit(1); }
const xml = await sm.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.log(`found ${urlList.length} URLs in sitemap`);
if (!urlList.length) process.exit(1);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
// IndexNow returns 200 (accepted) or 202 (accepted, pending). 403 = key file not found/mismatch.
console.log('IndexNow response:', res.status, res.statusText);
process.exit(res.status >= 200 && res.status < 300 ? 0 : 1);
