import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { courseToMarkdown, parseSkillBuilderInput, type SkillCourse } from '../../lib/skill-builder';
import { parseSkillLeadAttribution, persistSkillBuilderLead } from '../../lib/skill-builder-lead';

export const prerender = false;

const FROM = 'Skilly <hello@send.tryskilly.app>';
const REPLY_TO = 'hello@tryskilly.app';
const FOUNDER = 'hello@tryskilly.app';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, { count: number; resetsAt: number }>();

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function env(key: string): string | undefined {
  return (typeof process !== 'undefined' ? process.env?.[key] : undefined) ?? (import.meta.env as Record<string, string | undefined>)[key];
}

function safeText(value: unknown, maxLength: number): string {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function clientKey(request: Request): string {
  return request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
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

function normalizeCourse(value: unknown): SkillCourse {
  if (!value || typeof value !== 'object') throw new Error('Missing generated skill.');
  const source = value as Partial<SkillCourse>;
  const input = parseSkillBuilderInput({ app: source.app, goal: source.goal, level: source.level, pace: source.pace });
  const lessons = Array.isArray(source.lessons)
    ? source.lessons.slice(0, 8).map((lesson) => ({
        title: safeText(lesson?.title, 90),
        duration: safeText(lesson?.duration, 24),
        objective: safeText(lesson?.objective, 220),
        steps: Array.isArray(lesson?.steps) ? lesson.steps.slice(0, 6).map((step) => safeText(step, 180)) : [],
        checkpoint: safeText(lesson?.checkpoint, 220),
      }))
    : [];
  if (lessons.length < 3 || lessons.some((lesson) => lesson.steps.length < 2)) throw new Error('Generated skill is incomplete.');

  const base = {
    id: safeText(source.id ?? 'custom-skill', 80).replace(/[^a-z0-9-]/gi, '-') || 'custom-skill',
    ...input,
    title: safeText(source.title ?? input.goal, 120),
    summary: safeText(source.summary, 240),
    outcome: safeText(source.outcome, 300),
    duration: safeText(source.duration, 40),
    lessons,
    usedLlm: Boolean(source.usedLlm),
    usedWebSearch: Boolean(source.usedWebSearch),
    grounding: (source.grounding === 'web_sources' || source.grounding === 'model_knowledge' ? source.grounding : 'fallback') as SkillCourse['grounding'],
    sources: Array.isArray(source.sources) ? source.sources.slice(0, 6).flatMap((item) => {
      try {
        if (!item?.url || !item?.title) return [];
        const url = new URL(item.url);
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return [];
        return [{ title: safeText(item.title, 140), url: url.toString(), domain: url.hostname.replace(/^www\./, ''), type: item.type === 'official' ? 'official' as const : 'reference' as const }];
      } catch { return []; }
    }) : [],
    generatedAt: safeText(source.generatedAt, 40) || new Date().toISOString(),
    cacheHit: Boolean(source.cacheHit),
  };
  return { ...base, markdown: courseToMarkdown(base) };
}

export const POST: APIRoute = async ({ request }) => {
  if (isRateLimited(clientKey(request))) return json(429, { error: 'Too many email requests. Try again in a few minutes.' });
  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) return json(500, { error: 'Email delivery is not configured.' });

  let body: { email?: unknown; course?: unknown; marketingConsent?: unknown; website?: unknown; attribution?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid request body.' });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email)) return json(400, { error: 'Enter a valid email address.' });
  if (typeof body.website === 'string' && body.website.trim()) return json(200, { ok: true });

  let course: SkillCourse;
  try {
    course = normalizeCourse(body.course);
  } catch (error) {
    return json(400, { error: error instanceof Error ? error.message : 'Generated skill is invalid.' });
  }

  const resend = new Resend(apiKey);
  const attribution = parseSkillLeadAttribution(body.attribution);
  const leadStored = await persistSkillBuilderLead(
    resend,
    email,
    course,
    attribution,
    body.marketingConsent === true,
    env('RESEND_MARKETING_SEGMENT_ID'),
    env('RESEND_AUDIENCE_ID'),
  );
  if (!leadStored) console.warn('[skill-builder-email] durable lead storage failed');

  const safeTitle = escapeHtml(course.title);
  const safeMarkdown = escapeHtml(course.markdown);
  const downloadUrl = 'https://tryskilly.app/dmg?utm_source=skill_builder_email&utm_medium=email&utm_campaign=b2c_skill_builder';
  const subject = `Your Skilly course: ${course.title}`;
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;color:#1A1714;line-height:1.55">
    <p style="font-family:monospace;font-size:12px;color:#9A5B08">SKILLY SKILL BUILDER</p>
    <h1 style="font-size:26px;line-height:1.2">${safeTitle}</h1>
    <p>Your generated SKILL.md is included below. Save it as a Markdown file, or download Skilly to follow the course with voice and screen-aware guidance.</p>
    <p><a href="${downloadUrl}" style="display:inline-block;background:#F59E0B;color:#1A1714;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:700">Download Skilly for Mac</a></p>
    <pre style="white-space:pre-wrap;background:#F6F3EE;border:1px solid #E8E2D9;border-radius:12px;padding:18px;font:12px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace">${safeMarkdown}</pre>
    <p style="font-size:12px;color:#6B635A">This transactional email was requested from the free Skill Builder. Marketing emails are sent only when separately selected.</p>
  </div>`;
  const text = `${course.title}\n\nDownload Skilly: ${downloadUrl}\n\n${course.markdown}`;

  const [delivery, notification] = await Promise.allSettled([
    resend.emails.send({ from: FROM, replyTo: REPLY_TO, to: email, subject, html, text }),
    resend.emails.send({
      from: FROM,
      replyTo: email,
      to: FOUNDER,
      subject: `[Skilly] Skill Builder lead: ${course.app}`,
      html: `<p><b>${escapeHtml(email)}</b> generated <b>${safeTitle}</b> for ${escapeHtml(course.app)}.</p><p>Grounding: ${escapeHtml(course.grounding)} · ${course.sources.length} sources · campaign: ${escapeHtml(attribution.campaign || 'direct')}</p>`,
      text: `${email} generated ${course.title} for ${course.app}. Grounding: ${course.grounding}; sources: ${course.sources.length}; campaign: ${attribution.campaign || 'direct'}.`,
    }),
  ]);

  if (delivery.status === 'rejected') return json(500, { error: 'Could not send the skill. Try again.' });
  if (notification.status === 'rejected') console.warn('[skill-builder-email] founder notification failed');
  return json(200, { ok: true, leadStored, markdown: course.markdown, filename: `${course.id || 'skilly-skill'}.md` });
};
