import type { APIRoute } from 'astro';
import { buildSkillCourse, parseSkillBuilderInput } from '../../lib/skill-builder';

export const prerender = false;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const buckets = new Map<string, { count: number; resetsAt: number }>();

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

function clientKey(request: Request): string {
  return (
    request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetsAt <= now) {
    buckets.set(key, { count: 1, resetsAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

export const POST: APIRoute = async ({ request }) => {
  if (isRateLimited(clientKey(request))) {
    return json(429, { error: 'You have created several skills. Try again in a few minutes.' });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid request body.' });
  }

  try {
    const input = parseSkillBuilderInput(body);
    const course = await buildSkillCourse(input);
    return json(200, { course });
  } catch (error) {
    return json(400, { error: error instanceof Error ? error.message : 'Could not create that skill.' });
  }
};
