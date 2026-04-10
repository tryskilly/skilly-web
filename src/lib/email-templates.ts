// src/lib/email-templates.ts

export type WaitlistPlatform = 'windows' | 'linux' | 'ios';

const PLATFORM_LABELS: Record<WaitlistPlatform, string> = {
  windows: 'Windows',
  linux: 'Linux',
  ios: 'iOS / iPad',
};

export function confirmationEmail(opts: { platform: WaitlistPlatform }) {
  const platformLabel = PLATFORM_LABELS[opts.platform];

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#0F0F10;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#E5E5E0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#0F0F10;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#1C1C1E;border-radius:16px;border:1px solid #27272A;max-width:560px;">
          <tr>
            <td style="padding:40px 40px 32px;">
              <img src="https://tryskilly.app/skilly-mark.png" width="48" height="48" alt="Skilly" style="display:block;margin-bottom:24px;border:0;" />
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#FAFAF8;letter-spacing:-0.5px;line-height:1.2;">
                You're on the list.
              </h1>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#A3A39E;">
                Thanks for joining the Skilly waitlist for <span style="color:#F59E0B;font-weight:600;">${platformLabel}</span>. We'll send one email the day Skilly is available on your platform — no marketing in between.
              </p>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.6;color:#A3A39E;">
                If you have an Apple Silicon Mac, you can try Skilly today — it's already shipping on macOS.
              </p>
              <a href="https://tryskilly.app" style="display:inline-block;background:#F59E0B;color:#0F0F10;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;">
                Visit tryskilly.app
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid #27272A;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#525250;">
                You're receiving this because you signed up at tryskilly.app. If this wasn't you, ignore this email — we won't email you again.
              </p>
              <p style="margin:12px 0 0;font-size:13px;line-height:1.6;color:#525250;">
                <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#737370;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#525250;">Skilly · by moelabs.dev</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `You're on the list.

Thanks for joining the Skilly waitlist for ${platformLabel}. We'll send one email the day Skilly is available on your platform — no marketing in between.

If you have an Apple Silicon Mac, you can try Skilly today — it's already shipping on macOS.

Visit tryskilly.app

— Skilly · by moelabs.dev

You're receiving this because you signed up at tryskilly.app. If this wasn't you, ignore this email — we won't email you again.
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}
`;

  return {
    subject: `You're on the Skilly waitlist`,
    html,
    text,
  };
}

export function notificationEmail(opts: { email: string; platform: WaitlistPlatform }) {
  const platformLabel = PLATFORM_LABELS[opts.platform];

  const html = `<!doctype html>
<html lang="en">
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafaf8;color:#27272A;padding:24px;">
  <h2 style="margin:0 0 12px;font-size:18px;">New Skilly waitlist signup</h2>
  <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(opts.email)}</p>
  <p style="margin:0 0 8px;"><strong>Platform:</strong> ${platformLabel}</p>
  <p style="margin:24px 0 0;color:#737370;font-size:13px;">Sent automatically by tryskilly.app</p>
</body>
</html>`;

  const text = `New Skilly waitlist signup

Email: ${opts.email}
Platform: ${platformLabel}

Sent automatically by tryskilly.app
`;

  return {
    subject: `[Skilly] New waitlist signup: ${opts.email} (${platformLabel})`,
    html,
    text,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
