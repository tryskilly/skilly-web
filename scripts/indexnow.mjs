#!/usr/bin/env node
// Notify IndexNow participants after a successful production deployment.
// This does not notify Google; Google does not support IndexNow.

import { pathToFileURL } from 'node:url';

const HOST = 'tryskilly.app';
const KEY = '9fb825477617a04ec41c4958163fa3ae';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap-index.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_BATCH_SIZE = 10_000;

const decodeXml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&apos;', "'");

export const parseSitemap = (xml) => {
  const type = /<sitemapindex(?:\s|>)/i.test(xml)
    ? 'index'
    : /<urlset(?:\s|>)/i.test(xml)
      ? 'urlset'
      : undefined;

  if (!type) throw new Error('Response is not a sitemap index or URL set');

  const locations = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((match) => decodeXml(match[1].trim()))
    .filter(Boolean);

  return { type, locations };
};

export const collectSitemapUrls = async (
  sitemapUrl,
  fetchImpl = globalThis.fetch,
  visited = new Set(),
) => {
  const normalizedUrl = new URL(sitemapUrl).href;
  if (visited.has(normalizedUrl)) return [];
  visited.add(normalizedUrl);

  const response = await fetchImpl(normalizedUrl);
  if (!response.ok) {
    throw new Error(`Sitemap fetch failed (${response.status}): ${normalizedUrl}`);
  }

  const sitemap = parseSitemap(await response.text());
  if (sitemap.type === 'urlset') return sitemap.locations;

  const childUrls = await Promise.all(
    sitemap.locations.map((location) => collectSitemapUrls(location, fetchImpl, visited)),
  );
  return [...new Set(childUrls.flat())];
};

const chunk = (values, size) => {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
};

export const submitIndexNow = async ({
  host,
  key,
  keyLocation,
  urlList,
  fetchImpl = globalThis.fetch,
  endpoint = INDEXNOW_ENDPOINT,
  batchSize = MAX_BATCH_SIZE,
}) => {
  const results = [];

  for (const batch of chunk(urlList, batchSize)) {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
    });

    if (!response.ok) {
      throw new Error(`IndexNow submission failed (${response.status} ${response.statusText})`);
    }

    results.push({ status: response.status, urlCount: batch.length });
  }

  return results;
};

export const runIndexNow = async ({
  fetchImpl = globalThis.fetch,
  dryRun = process.argv.includes('--dry-run') || process.env.INDEXNOW_DRY_RUN === '1',
} = {}) => {
  const discoveredUrls = await collectSitemapUrls(SITEMAP, fetchImpl);
  const urlList = [...new Set(discoveredUrls)].filter((url) => {
    try {
      return new URL(url).hostname === HOST;
    } catch {
      return false;
    }
  });

  if (!urlList.length) throw new Error('No same-host URLs found in sitemap');

  const summary = {
    event: 'indexnow_submission',
    timestamp: new Date().toISOString(),
    host: HOST,
    sitemap: SITEMAP,
    urlCount: urlList.length,
    dryRun,
  };

  if (dryRun) {
    console.log(JSON.stringify(summary));
    return summary;
  }

  const batches = await submitIndexNow({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
    fetchImpl,
  });

  const completedSummary = { ...summary, batches };
  console.log(JSON.stringify(completedSummary));
  return completedSummary;
};

const isMain = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  runIndexNow().catch((error) => {
    console.error(JSON.stringify({
      event: 'indexnow_submission_failed',
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : String(error),
    }));
    process.exitCode = 1;
  });
}
