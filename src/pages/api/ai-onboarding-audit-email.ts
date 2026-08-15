import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { auditReportEmail, type AuditEmailReport } from '../../lib/email-templates';
import { resendAccepted, resendFailureMessage } from '../../lib/resend-result';

export const prerender = false;

const FROM = 'Skilly <hello@send.tryskilly.app>';
const REPLY_TO = 'hello@tryskilly.app';
const FOUNDER = 'hello@tryskilly.app';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function env(key: string): string | undefined {
  return (typeof process !== 'undefined' ? process.env?.[key] : undefined) ?? (import.meta.env as Record<string, string | undefined>)[key];
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = env('RESEND_API_KEY');
  const audienceId = env('RESEND_AUDIENCE_ID');
  if (!apiKey) {
    console.error('[audit-email] missing RESEND_API_KEY');
    return json(500, { error: 'Server not configured' });
  }

  let body: { email?: unknown; url?: unknown; report?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const url = typeof body.url === 'string' ? body.url.trim() : '';
  const report = body.report as AuditEmailReport | undefined;

  if (!email || !EMAIL_RE.test(email)) return json(400, { error: 'Invalid email address' });
  if (!report || typeof report !== 'object') return json(400, { error: 'Missing report' });

  const resend = new Resend(apiKey);

  // Lead capture: add the email to the audience (best-effort; ignore duplicates).
  if (audienceId) {
    try {
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    } catch (err) {
      console.warn('[audit-email] contacts.create skipped:', (err as Error).message);
    }
  }

  const mail = auditReportEmail({ report, url });
  const target = report.host || url;

  const [userRes, notifyRes] = await Promise.allSettled([
    resend.emails.send({ from: FROM, replyTo: REPLY_TO, to: email, subject: mail.subject, html: mail.html, text: mail.text }),
    resend.emails.send({
      from: FROM,
      replyTo: email,
      to: FOUNDER,
      subject: `[Skilly] Audit lead: ${email} (${target})`,
      html: `<p><b>${email}</b> ran the AI onboarding audit for <b>${target}</b> — score ${report.score}/100 (${report.band}).</p>`,
      text: `${email} ran the audit for ${target} — ${report.score}/100 (${report.band})`,
    }),
  ]);

  if (userRes.status === 'rejected' || !resendAccepted(userRes.value)) {
    console.error('[audit-email] report email failed:', userRes.status === 'rejected' ? userRes.reason : resendFailureMessage(userRes.value));
    return json(500, { error: 'Failed to send the report' });
  }
  if (notifyRes.status === 'rejected' || !resendAccepted(notifyRes.value)) {
    console.error('[audit-email] founder notification failed:', notifyRes.status === 'rejected' ? notifyRes.reason : resendFailureMessage(notifyRes.value));
  }

  return json(200, { ok: true });
};
