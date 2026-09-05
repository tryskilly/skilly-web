import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const privacy = readFileSync(join(import.meta.dir, '../src/pages/privacy.astro'), 'utf8');

describe('privacy processing disclosure', () => {
  test('does not claim Cloudflare is already retired during the staged migration', () => {
    expect(privacy).toContain('legacy desktop clients may still use Cloudflare as an API relay');
    expect(privacy).toContain('Studio becomes the application backend');
  });
});
