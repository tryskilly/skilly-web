import { describe, expect, test } from 'bun:test';
import { BROWSER_EXTENSIONS } from '../src/data/config';

describe('browser extension listings', () => {
  test('publishes one secure store URL for every supported browser', () => {
    expect(BROWSER_EXTENSIONS.map((extension) => extension.id)).toEqual([
      'chrome',
      'edge',
      'firefox',
    ]);

    expect(new Set(BROWSER_EXTENSIONS.map((extension) => extension.href)).size).toBe(
      BROWSER_EXTENSIONS.length,
    );
    expect(BROWSER_EXTENSIONS.every((extension) => extension.href.startsWith('https://'))).toBe(true);
  });
});
