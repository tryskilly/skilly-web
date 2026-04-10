// src/pages/api/waitlist.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import {
  confirmationEmail,
  notificationEmail,
  type WaitlistPlatform,
} from '../../lib/email-templates';

export const prerender = false;

const FROM = 'Skilly <hello@send.tryskilly.app>';
const REPLY_TO = 'hello@tryskilly.app';
const FOUNDER_NOTIFICATION_ADDRESS = 'hello@tryskilly.app';
const VALID_PLATFORMS: readonly WaitlistPlatform[] = ['windows', 'linux', 'ios'] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RequestBody {
  email?: unknown;
  platform?: unknown;
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error('[waitlist] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID');
    return jsonResponse(500, { error: 'Server not configured' });
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const platform = typeof body.platform === 'string' ? body.platform : '';

  if (!email || !EMAIL_RE.test(email)) {
    return jsonResponse(400, { error: 'Invalid email address' });
  }
  if (!VALID_PLATFORMS.includes(platform as WaitlistPlatform)) {
    return jsonResponse(400, { error: 'Invalid platform' });
  }

  const typedPlatform = platform as WaitlistPlatform;
  const resend = new Resend(apiKey);

  // Step 1: try to add the contact to the audience.
  // If the contact already exists, swallow the error and continue —
  // the user still gets a fresh confirmation email.
  try {
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
  } catch (err) {
    // Log but don't fail. Resend returns 422 for duplicates.
    console.warn('[waitlist] contacts.create skipped:', (err as Error).message);
  }

  // Step 2: send confirmation to user + notification to founder, in parallel
  const confirmation = confirmationEmail({ platform: typedPlatform });
  const notification = notificationEmail({ email, platform: typedPlatform });

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
    console.error('[waitlist] confirmation email failed:', confirmResult.reason);
    return jsonResponse(500, { error: 'Failed to send confirmation email' });
  }

  if (notifyResult.status === 'rejected') {
    // Don't fail the user-facing flow if only the founder notification failed.
    console.error('[waitlist] notification email failed:', notifyResult.reason);
  }

  return jsonResponse(200, { ok: true });
};
