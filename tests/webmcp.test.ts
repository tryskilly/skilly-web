import { afterEach, describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { betaTier, byokTier } from '../src/data/tiers';
import { trialTerms } from '../src/data/trial-terms';
import {
  bundledAppSkills,
  joinWaitlist,
  macDownloadUrl,
  pricingFacts,
  registerWebmcpTools,
  webmcpTools,
} from '../src/scripts/webmcp';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('WebMCP facts', () => {
  test('pricing comes from the site data and does not call bring-your-own-key free', () => {
    expect(pricingFacts()).toEqual({
      trialTerms,
      hosted: {
        price: betaTier.price,
        period: betaTier.period,
        tagline: betaTier.tagline,
        perDayEquivalent: betaTier.perDayEquivalent,
      },
      bringYourOwnOpenAiKey: byokTier.heading,
    });
    expect(pricingFacts().bringYourOwnOpenAiKey).toContain('$5/month');
    expect(pricingFacts().bringYourOwnOpenAiKey.toLowerCase()).not.toContain('free');
    expect(pricingFacts().bringYourOwnOpenAiKey).not.toContain('$0');
    expect(pricingFacts().hosted.tagline).toContain('3 hosted hours');
  });

  test('lists only the bundled skills that are available', () => {
    expect(bundledAppSkills()).toEqual([
      'Blender',
      'Figma',
      'After Effects',
      'DaVinci Resolve',
      'Premiere Pro',
      'Houdini',
    ]);
  });

  test('download link keeps the sitewide medium and sets the webmcp campaign', () => {
    expect(macDownloadUrl()).toBe(
      'https://tryskilly.app/download?utm_source=tryskilly-web&utm_medium=nav&utm_campaign=webmcp&utm_content=download',
    );
  });
});

describe('join_waitlist', () => {
  test('rejects a missing or invalid email before any request', async () => {
    let calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      return new Response('{}');
    }) as unknown as typeof fetch;

    expect(await joinWaitlist(undefined)).toEqual({ ok: false, error: 'Invalid email address' });
    expect(await joinWaitlist({})).toEqual({ ok: false, error: 'Invalid email address' });
    expect(await joinWaitlist({ email: 'not-an-email', platform: 'windows' })).toEqual({
      ok: false,
      error: 'Invalid email address',
    });
    expect(await joinWaitlist({ email: 'person@example.com', platform: 'macos' })).toEqual({
      ok: false,
      error: 'Invalid platform',
    });
    expect(calls).toBe(0);
  });

  test('posts the same email and platform payload as the non-Mac form', async () => {
    let body = '';
    globalThis.fetch = (async (_url: string, init?: RequestInit) => {
      body = String(init?.body ?? '');
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as unknown as typeof fetch;

    const result = await joinWaitlist({ email: ' person@example.com ', platform: 'ios' });

    expect(body).toBe(JSON.stringify({ email: 'person@example.com', platform: 'ios' }));
    expect(result).toEqual({ ok: true });
  });
});

describe('registration', () => {
  test('prefers document.modelContext, falls back, and stays quiet when absent or broken', async () => {
    const documentTools: string[] = [];
    const navigatorTools: string[] = [];
    const documentContext = {
      registerTool: (tool: { name: string }) => {
        documentTools.push(tool.name);
      },
    };
    const navigatorContext = {
      registerTool: (tool: { name: string }) => {
        navigatorTools.push(tool.name);
      },
    };

    await registerWebmcpTools({ modelContext: documentContext }, { modelContext: navigatorContext });
    expect(documentTools).toEqual(['get_pricing', 'get_download_link', 'list_supported_apps', 'join_waitlist']);
    expect(navigatorTools).toEqual([]);

    await registerWebmcpTools({}, { modelContext: navigatorContext });
    expect(navigatorTools).toEqual(documentTools);

    await registerWebmcpTools(undefined, undefined);
    await registerWebmcpTools(
      { modelContext: { registerTool: () => { throw new Error('unsupported annotations'); } } },
      undefined,
    );
  });

  test('sets readOnlyHint and does not declare toolname forms', () => {
    const tools = webmcpTools();
    expect(tools.find((tool) => tool.name === 'get_pricing')?.annotations).toEqual({ readOnlyHint: true });
    expect(tools.find((tool) => tool.name === 'get_download_link')?.annotations).toEqual({ readOnlyHint: true });
    expect(tools.find((tool) => tool.name === 'list_supported_apps')?.annotations).toEqual({ readOnlyHint: true });
    expect(tools.find((tool) => tool.name === 'join_waitlist')?.annotations).toEqual({ readOnlyHint: false });

    const source = readFileSync(join(import.meta.dir, '../src/scripts/webmcp.ts'), 'utf8');
    const layout = readFileSync(join(import.meta.dir, '../src/layouts/Layout.astro'), 'utf8');
    expect(source).not.toContain('toolname');
    expect(source).not.toContain('console.');
    expect(layout).toContain("import '../scripts/webmcp.ts';");
  });
});
