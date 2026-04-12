// src/pages/api/skill-request.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import {
  skillRequestConfirmation,
  skillRequestNotification,
} from '../../lib/email-templates';

export const prerender = false;

const FROM = 'Skilly <hello@send.tryskilly.app>';
const REPLY_TO = 'hello@tryskilly.app';
const FOUNDER_NOTIFICATION_ADDRESS = 'hello@tryskilly.app';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RequestBody {
  email?: unknown;
  appName?: unknown;
  message?: unknown;
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_SKILL_REQUESTS_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error('[skill-request] Missing RESEND_API_KEY or RESEND_SKILL_REQUESTS_AUDIENCE_ID');
    return jsonResponse(500, { error: 'Server not configured' });
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const appName = typeof body.appName === 'string' ? body.appName.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) : '';

  if (!email || !EMAIL_RE.test(email)) {
    return jsonResponse(400, { error: 'Invalid email address' });
  }
  if (!appName || appName.length < 1 || appName.length > 100) {
    return jsonResponse(400, { error: 'App name is required' });
  }

  const resend = new Resend(apiKey);

  // Add contact to the Skill Requests audience (swallow duplicates)
  try {
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
  } catch (err) {
    console.warn('[skill-request] contacts.create skipped:', (err as Error).message);
  }

  // Send confirmation to user + notification to founder, in parallel
  const confirmation = skillRequestConfirmation({ appName });
  const notification = skillRequestNotification({ email, appName, message: message || undefined });

  const [confirmResult, notifyResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    }),
    resend.emails.send({
      from: FROM,
      to: FOUNDER_NOTIFICATION_ADDRESS,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    }),
  ]);

  if (confirmResult.status === 'rejected') {
    console.error('[skill-request] confirmation email failed:', confirmResult.reason);
    return jsonResponse(500, { error: 'Failed to send confirmation email' });
  }

  if (notifyResult.status === 'rejected') {
    console.error('[skill-request] notification email failed:', notifyResult.reason);
  }

  return jsonResponse(200, { ok: true });
};
