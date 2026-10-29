// Registers read-only WebMCP tools when a browser exposes modelContext.
// document.modelContext wins; navigator.modelContext is the fallback.
// Browsers without the API, and any registration failure, are ignored.
import { trackedDownloadUrl } from '../data/config';
import { skills } from '../data/skills';
import { betaTier, byokTier } from '../data/tiers';
import { trialTerms } from '../data/trial-terms';

const WAITLIST_PLATFORMS = ['windows', 'linux', 'ios'] as const;
type WaitlistPlatform = (typeof WAITLIST_PLATFORMS)[number];

// Same shape as the check in src/pages/api/waitlist.ts. Invalid input never
// reaches the network.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_INPUT_SCHEMA = {
  type: 'object',
  properties: {},
  additionalProperties: false,
} as const;

interface ModelContext {
  registerTool: (tool: WebMcpTool) => void | Promise<void>;
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: unknown, client?: { signal?: AbortSignal }) => unknown;
  annotations?: { readOnlyHint: boolean };
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

export function pricingFacts() {
  return {
    trialTerms,
    hosted: {
      price: betaTier.price,
      period: betaTier.period,
      tagline: betaTier.tagline,
      perDayEquivalent: betaTier.perDayEquivalent,
    },
    bringYourOwnOpenAiKey: byokTier.heading,
  };
}

// skills.ts is the bundled-skill list. apps.ts is the old hero rotation and
// does not include Houdini, so it is not the source for this tool.
export function bundledAppSkills(): string[] {
  return skills.filter((skill) => skill.status === 'available').map((skill) => skill.name);
}

// Sitewide "Download for Mac" links use utm_medium=nav. Keep that medium and
// mark this surface with utm_campaign=webmcp.
export function macDownloadPath(): string {
  return trackedDownloadUrl('nav', 'webmcp', 'download');
}

export function macDownloadUrl(origin = 'https://tryskilly.app'): string {
  return new URL(macDownloadPath(), origin).href;
}

function parseWaitlistInput(
  input: unknown,
): { email: string; platform: WaitlistPlatform } | { error: string } {
  if (input === null || typeof input !== 'object') {
    return { error: 'Invalid email address' };
  }
  const record = input as Record<string, unknown>;
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  if (!email || !EMAIL_RE.test(email)) {
    return { error: 'Invalid email address' };
  }
  if (typeof record.platform !== 'string' || !(WAITLIST_PLATFORMS as readonly string[]).includes(record.platform)) {
    return { error: 'Invalid platform' };
  }
  return { email, platform: record.platform as WaitlistPlatform };
}

export async function joinWaitlist(input: unknown, signal?: AbortSignal): Promise<Record<string, unknown>> {
  const parsed = parseWaitlistInput(input);
  if ('error' in parsed) return { ok: false, error: parsed.error };

  try {
    signal?.throwIfAborted();
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsed.email, platform: parsed.platform }),
      signal,
    });
    const data: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const error = data && typeof data === 'object' && 'error' in data && typeof (data as { error: unknown }).error === 'string'
        ? (data as { error: string }).error
        : `Request failed with status ${response.status}`;
      return { ok: false, error };
    }
    if (data && typeof data === 'object') return data as Record<string, unknown>;
    return { ok: true };
  } catch (err) {
    if (signal?.aborted) throw err;
    return { ok: false, error: 'Could not join the waitlist.' };
  }
}

export function webmcpTools(origin = 'https://tryskilly.app'): WebMcpTool[] {
  return [
    {
      name: 'get_pricing',
      description: 'Returns the Mac app trial, hosted monthly plan, and bring-your-own-OpenAI-key terms published on this site.',
      inputSchema: { ...EMPTY_INPUT_SCHEMA },
      annotations: { readOnlyHint: true },
      execute: () => pricingFacts(),
    },
    {
      name: 'get_download_link',
      description: 'Returns the Mac download link used on this site.',
      inputSchema: { ...EMPTY_INPUT_SCHEMA },
      annotations: { readOnlyHint: true },
      execute: () => ({ url: macDownloadUrl(origin) }),
    },
    {
      name: 'list_supported_apps',
      description: 'Lists the bundled app skills that ship with Skilly.',
      inputSchema: { ...EMPTY_INPUT_SCHEMA },
      annotations: { readOnlyHint: true },
      execute: () => ({ apps: bundledAppSkills() }),
    },
    {
      name: 'join_waitlist',
      description: 'Joins the waitlist for a platform Skilly does not ship on yet. Call only with an email and platform the person supplied.',
      inputSchema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'Address that should receive the waitlist confirmation.',
          },
          platform: {
            type: 'string',
            enum: [...WAITLIST_PLATFORMS],
            description: 'System the person wants Skilly on.',
          },
        },
        required: ['email', 'platform'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: (input, client) => joinWaitlist(input, client?.signal),
    },
  ];
}

function pickContext(
  doc: { modelContext?: ModelContext } | null | undefined,
  nav: { modelContext?: ModelContext } | null | undefined,
): ModelContext | null {
  const fromDocument = doc?.modelContext;
  if (fromDocument && typeof fromDocument.registerTool === 'function') return fromDocument;
  const fromNavigator = nav?.modelContext;
  if (fromNavigator && typeof fromNavigator.registerTool === 'function') return fromNavigator;
  return null;
}

async function registerOne(ctx: ModelContext, tool: WebMcpTool): Promise<void> {
  try {
    await ctx.registerTool(tool);
  } catch {
    if (!tool.annotations) return;
    try {
      await ctx.registerTool({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: tool.execute,
      });
    } catch {
      // registerTool rejected the tool. Leave the page alone.
    }
  }
}

export async function registerWebmcpTools(
  doc: { modelContext?: ModelContext } | null | undefined,
  nav: { modelContext?: ModelContext } | null | undefined,
  origin = 'https://tryskilly.app',
): Promise<void> {
  try {
    const ctx = pickContext(doc, nav);
    if (!ctx) return;
    for (const tool of webmcpTools(origin)) {
      await registerOne(ctx, tool);
    }
  } catch {
    // WebMCP is optional. Never throw or log into a normal page.
  }
}

function browserStart(): void {
  try {
    const flag = '__skillyWebmcp';
    const root = globalThis as typeof globalThis & { [key: string]: unknown };
    if (root[flag]) return;
    root[flag] = true;
    const doc = typeof document === 'undefined' ? undefined : document;
    const nav = typeof navigator === 'undefined' ? undefined : navigator;
    const origin = typeof location === 'undefined' ? 'https://tryskilly.app' : location.origin;
    void registerWebmcpTools(doc, nav, origin).catch(() => {});
  } catch {
    // Ignore browsers that expose a broken modelContext getter.
  }
}

browserStart();
