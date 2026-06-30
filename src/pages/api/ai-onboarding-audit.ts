import type { APIRoute } from 'astro';
import { buildStudioPrefillUrl, runAudit, type AuditInput } from '../../lib/ai-onboarding-audit';

export const prerender = false;

const RATE_WINDOW_MS = 1000 * 60 * 10;
const MAX_REQUESTS_PER_WINDOW = 8;
const rateBuckets = new Map<string, { count: number; resetsAt: number }>();

interface AuditRequest {
  url?: unknown;
  goal?: unknown;
  type?: unknown;
  docsUrl?: unknown;
  email?: unknown;
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function clientKey(request: Request): string {
  return (
    request.headers.get('x-nf-client-connection-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetsAt <= now) {
    rateBuckets.set(key, { count: 1, resetsAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

export const POST: APIRoute = async ({ request }) => {
  if (rateLimited(clientKey(request))) {
    return jsonResponse(429, { error: 'Too many audits from this network. Try again in a few minutes.' });
  }

  let body: AuditRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body.' });
  }

  const input: AuditInput = {
    url: typeof body.url === 'string' ? body.url.trim() : '',
    goal: typeof body.goal === 'string' && body.goal.trim() ? body.goal.trim() : 'create first project',
    productType: typeof body.type === 'string' ? body.type.trim() : '',
    docsUrl: typeof body.docsUrl === 'string' ? body.docsUrl.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim() : '',
  };

  if (!input.url) {
    return jsonResponse(400, { error: 'Enter a public product URL.' });
  }

  try {
    const report = await runAudit(input);
    return jsonResponse(200, {
      ...report,
      studioUrl: buildStudioPrefillUrl(report, input),
    });
  } catch (error) {
    return jsonResponse(422, {
      error: error instanceof Error ? error.message : 'Could not audit that URL.',
    });
  }
};
