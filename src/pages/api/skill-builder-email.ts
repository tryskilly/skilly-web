import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { BROWSER_EXTENSIONS } from '../../data/config';
import { assessCourseQuality, courseToMarkdown, parseSkillBuilderInput, type SkillCourse } from '../../lib/skill-builder';
import { parseSkillLeadAttribution, persistSkillBuilderLead } from '../../lib/skill-builder-lead';
import { resendAccepted, resendFailureMessage } from '../../lib/resend-result';

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

function logDeliveryFailure(scope: 'recipient' | 'founder', error: { name: string; statusCode: number | null; message: string }): void {
  console.error(`[skill-builder-email] ${scope} delivery failed`, {
    name: error.name,
    statusCode: error.statusCode,
    message: safeText(error.message, 240),
  });
}

function deliveryErrorMessage(name: string): string {
  if (name === 'validation_error') return 'The email provider rejected this address. Check it and try again.';
  if (name === 'rate_limit_exceeded' || name === 'daily_quota_exceeded' || name === 'monthly_quota_exceeded') {
    return 'Email delivery is temporarily at capacity. Try again shortly.';
  }
  return 'Could not send the skill right now. Try again shortly.';
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
        completionSignals: Array.isArray(lesson?.completionSignals) ? lesson.completionSignals.slice(0, 6).map((signal) => safeText(signal, 80)) : [],
      }))
    : [];
  const teaching = {
    principles: Array.isArray(source.teaching?.principles) ? source.teaching.principles.slice(0, 8).map((item) => safeText(item, 240)) : [],
    commonMistakes: Array.isArray(source.teaching?.commonMistakes) ? source.teaching.commonMistakes.slice(0, 8).map((item) => ({
      mistake: safeText(item?.mistake, 100), symptom: safeText(item?.symptom, 180), correction: safeText(item?.correction, 240),
    })) : [],
    safetyChecks: Array.isArray(source.teaching?.safetyChecks) ? source.teaching.safetyChecks.slice(0, 6).map((item) => safeText(item, 220)) : [],
  };
  const vocabulary = Array.isArray(source.vocabulary) ? source.vocabulary.slice(0, 18).map((entry) => ({
    name: safeText(entry?.name, 90), description: safeText(entry?.description, 300),
  })) : [];

  const base = {
    id: safeText(source.id ?? 'custom-skill', 80).replace(/[^a-z0-9-]/gi, '-') || 'custom-skill',
    ...input,
    title: safeText(source.title ?? input.goal, 120),
    summary: safeText(source.summary, 240),
    outcome: safeText(source.outcome, 300),
    duration: safeText(source.duration, 40),
    lessons,
    teaching,
    vocabulary,
    bundleId: safeText(source.bundleId, 160),
    exportReady: false,
    qualityIssues: [],
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
  const qualityIssues = assessCourseQuality(base);
  if (qualityIssues.length) throw new Error('This skill is incomplete. Regenerate it before requesting the SKILL.md.');
  const complete = { ...base, exportReady: true, qualityIssues };
  return { ...complete, markdown: courseToMarkdown(complete) };
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
    env('RESEND_SKILL_REQUESTS_AUDIENCE_ID'),
  );
  if (!leadStored) console.warn('[skill-builder-email] durable lead storage failed');

  const safeTitle = escapeHtml(course.title);
  const downloadUrl = 'https://tryskilly.app/dmg?utm_source=skill_builder_email&utm_medium=email&utm_campaign=b2c_skill_builder';
  const openAppUrl = 'skilly://skills';
  const chromeExtensionUrl = BROWSER_EXTENSIONS.find((extension) => extension.id === 'chrome')?.href ?? 'https://tryskilly.app/for-people/';
  const edgeExtensionUrl = BROWSER_EXTENSIONS.find((extension) => extension.id === 'edge')?.href ?? 'https://tryskilly.app/for-people/';
  const firefoxExtensionUrl = BROWSER_EXTENSIONS.find((extension) => extension.id === 'firefox')?.href ?? 'https://tryskilly.app/for-people/';
  const subject = `Your Skilly course: ${course.title}`;
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;color:#1A1714;line-height:1.55">
    <p style="font-family:monospace;font-size:12px;color:#9A5B08">SKILLY SKILL BUILDER</p>
    <h1 style="font-size:26px;line-height:1.2">${safeTitle}</h1>
    <p>Your complete SKILL.md is attached to this email. Import it into Skilly to follow the course with voice and screen-aware guidance.</p>
    <ol><li>Save the attached Markdown file.</li><li>Open Skilly.</li><li>Choose <b>Import skill</b> and select the saved file.</li></ol>
    <p><a href="${openAppUrl}" style="display:inline-block;background:#1A1714;color:#FFFFFF;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:700">Open Skilly to import</a></p>
    <p><a href="${downloadUrl}" style="color:#9A5B08;font-weight:700">Need Skilly? Download the Mac app</a></p>
    <p>Learning a website? Use Skilly in <a href="${chromeExtensionUrl}">Chrome</a>, <a href="${edgeExtensionUrl}">Edge</a>, or <a href="${firefoxExtensionUrl}">Firefox</a> for voice-and-pointer guidance on webpages. Custom SKILL.md files still import into the Mac app.</p>
    <p style="font-size:12px;color:#6B635A">This transactional email was requested from the free Skill Builder. Marketing emails are sent only when separately selected.</p>
  </div>`;
  const text = `${course.title}\n\nYour SKILL.md is attached. Save it, open Skilly, choose Import skill, and select the file.\n\nOpen Skilly: ${openAppUrl}\nDownload Skilly: ${downloadUrl}\n\nLearning a website? Skilly is available for Chrome, Edge, or Firefox. Custom SKILL.md files still import into the Mac app.\nChrome: ${chromeExtensionUrl}\nEdge: ${edgeExtensionUrl}\nFirefox: ${firefoxExtensionUrl}`;

  const [delivery, notification] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: email,
      subject,
      html,
      text,
      attachments: [{ filename: `${course.id || 'skilly-skill'}.md`, content: Buffer.from(course.markdown).toString('base64') }],
    }),
    resend.emails.send({
      from: FROM,
      replyTo: email,
      to: FOUNDER,
      subject: `[Skilly] Skill Builder lead: ${course.app}`,
      html: `<p><b>${escapeHtml(email)}</b> generated <b>${safeTitle}</b> for ${escapeHtml(course.app)}.</p><p>Grounding: ${escapeHtml(course.grounding)} · ${course.sources.length} sources · campaign: ${escapeHtml(attribution.campaign || 'direct')}</p>`,
      text: `${email} generated ${course.title} for ${course.app}. Grounding: ${course.grounding}; sources: ${course.sources.length}; campaign: ${attribution.campaign || 'direct'}.`,
    }),
  ]);

  if (delivery.status === 'rejected') {
    console.error('[skill-builder-email] recipient delivery threw', delivery.reason instanceof Error ? delivery.reason.name : 'unknown');
    return json(500, { error: 'Could not send the skill right now. Try again shortly.' });
  }
  if (!resendAccepted(delivery.value)) {
    if (delivery.value.error) logDeliveryFailure('recipient', delivery.value.error);
    else console.error('[skill-builder-email] recipient delivery was not accepted', resendFailureMessage(delivery.value));
    return json(500, { error: deliveryErrorMessage(delivery.value.error?.name || 'unknown') });
  }
  if (notification.status === 'rejected') {
    console.warn('[skill-builder-email] founder notification threw', notification.reason instanceof Error ? notification.reason.name : 'unknown');
  } else if (!resendAccepted(notification.value)) {
    console.warn('[skill-builder-email] founder notification not accepted', resendFailureMessage(notification.value));
  }
  console.info('[skill-builder-email] recipient accepted', { messageId: delivery.value.data.id });
  return json(200, { ok: true, leadStored, deliveryStatus: 'accepted' });
};
