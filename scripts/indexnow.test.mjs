import { describe, expect, test } from 'bun:test';
import { collectSitemapUrls, parseSitemap, submitIndexNow } from './indexnow.mjs';

describe('parseSitemap', () => {
  test('detects a URL set and decodes XML entities', () => {
    const sitemap = parseSitemap(
      '<urlset><url><loc>https://tryskilly.app/page/?a=1&amp;b=2</loc></url></urlset>',
    );

    expect(sitemap).toEqual({
      type: 'urlset',
      locations: ['https://tryskilly.app/page/?a=1&b=2'],
    });
  });
});

describe('collectSitemapUrls', () => {
  test('follows sitemap indexes and deduplicates child URLs', async () => {
    const documents = new Map([
      ['https://tryskilly.app/sitemap-index.xml',
        '<sitemapindex><sitemap><loc>https://tryskilly.app/a.xml</loc></sitemap><sitemap><loc>https://tryskilly.app/b.xml</loc></sitemap></sitemapindex>'],
      ['https://tryskilly.app/a.xml',
        '<urlset><url><loc>https://tryskilly.app/a/</loc></url><url><loc>https://tryskilly.app/shared/</loc></url></urlset>'],
      ['https://tryskilly.app/b.xml',
        '<urlset><url><loc>https://tryskilly.app/b/</loc></url><url><loc>https://tryskilly.app/shared/</loc></url></urlset>'],
    ]);
    const fetchImpl = async (url) => new Response(documents.get(url), { status: 200 });

    const urls = await collectSitemapUrls(
      'https://tryskilly.app/sitemap-index.xml',
      fetchImpl,
    );

    expect(urls).toEqual([
      'https://tryskilly.app/a/',
      'https://tryskilly.app/shared/',
      'https://tryskilly.app/b/',
    ]);
  });
});

describe('submitIndexNow', () => {
  test('submits URLs in bounded batches and reports each response', async () => {
    const requests = [];
    const fetchImpl = async (_url, options) => {
      requests.push(JSON.parse(options.body));
      return new Response('', { status: 202, statusText: 'Accepted' });
    };

    const results = await submitIndexNow({
      host: 'tryskilly.app',
      key: 'test-key',
      keyLocation: 'https://tryskilly.app/test-key.txt',
      urlList: [
        'https://tryskilly.app/a/',
        'https://tryskilly.app/b/',
        'https://tryskilly.app/c/',
      ],
      fetchImpl,
      batchSize: 2,
    });

    expect(requests.map((request) => request.urlList)).toEqual([
      ['https://tryskilly.app/a/', 'https://tryskilly.app/b/'],
      ['https://tryskilly.app/c/'],
    ]);
    expect(results).toEqual([
      { status: 202, urlCount: 2 },
      { status: 202, urlCount: 1 },
    ]);
  });
});
