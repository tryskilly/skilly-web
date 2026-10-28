// src/scripts/nonmac-waitlist.ts
// Submit handler for every NonMacWaitlist block on the page, plus the
// jump links (nav button, learn sticky bar) that scroll to the first block.
// Note: window.skillyTrack is declared globally in posthog-events.ts.
import { isWaitlistOs, readVisitorOs, waitlistPlatformFor } from '../lib/visitor-os';

const SUCCESS_TARGET = { windows: 'Windows', linux: 'Linux', ios: 'your phone' } as const;

const os = readVisitorOs();

if (isWaitlistOs(os)) {
  const platform = waitlistPlatformFor(os);

  for (const block of document.querySelectorAll<HTMLElement>('[data-nonmac-waitlist]')) {
    const form = block.querySelector<HTMLFormElement>('[data-nonmac-waitlist-form]');
    const body = block.querySelector<HTMLElement>('[data-nonmac-waitlist-body]');
    const status = block.querySelector<HTMLElement>('[data-nonmac-waitlist-status]');
    const success = block.querySelector<HTMLElement>('[data-nonmac-waitlist-success]');
    const emailInput = form?.querySelector<HTMLInputElement>('input[name="email"]');
    const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!form || !emailInput || !submitBtn) continue;
    const buttonHtml = submitBtn.innerHTML;

    const showError = (message: string) => {
      if (status) status.textContent = message;
      submitBtn.disabled = false;
      submitBtn.innerHTML = buttonHtml;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !emailInput.checkValidity()) {
        showError('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (status) status.textContent = '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Joining…';

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, platform }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? `Request failed with status ${res.status}`);
        }

        window.skillyTrack?.('web_waitlist_submitted', {
          platform,
          location: block.dataset.waitlistLocation ?? 'unknown',
          email_submitted: true,
          $set: { email, waitlist_platform: platform },
        });

        if (body) body.hidden = true;
        if (success) {
          success.textContent = `Got it. We'll email ${email} when Skilly is on ${SUCCESS_TARGET[platform]}.`;
          success.hidden = false;
        }
      } catch (err) {
        console.error('[nonmac-waitlist]', err);
        showError('Something went wrong. Try again?');
      }
    });
  }

  // Jump links fall back to their href when the page has no visible block.
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-waitlist-jump]')) {
    link.addEventListener('click', (e) => {
      const target = Array.from(document.querySelectorAll<HTMLElement>('[data-nonmac-waitlist]')).find(
        (el) => el.offsetParent !== null && !el.closest('[data-learn-sticky-cta]'),
      );
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.querySelector<HTMLInputElement>('input[name="email"]')?.focus({ preventScroll: true });
    });
  }
}
