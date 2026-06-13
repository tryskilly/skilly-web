// src/scripts/beta-waitlist.ts
// Window.posthog is declared globally in posthog-events.ts
export {};

const form = document.querySelector<HTMLFormElement>('[data-beta-waitlist-form]');
if (form) {
  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const wrapper = document.querySelector<HTMLElement>('[data-beta-waitlist-wrapper]');
  const success = document.querySelector<HTMLElement>('[data-beta-waitlist-success]');

  const updateSubmitState = () => {
    if (!submitBtn || !emailInput) return;
    const ok = emailInput.value.trim() !== '';
    submitBtn.disabled = !ok;
    submitBtn.classList.toggle('opacity-50', !ok);
    submitBtn.classList.toggle('cursor-not-allowed', !ok);
  };

  emailInput?.addEventListener('input', updateSubmitState);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!emailInput || !submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          platform: 'macos_beta',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as Record<string, string>).error ?? `Request failed with status ${res.status}`);
      }

      // Track conversion and attach lead email to PostHog for funnel attribution.
      // The shared helper strips $set before mirroring the event to GA4.
      window.skillyTrack?.('web_beta_waitlist_submitted', {
        platform: 'macos_beta',
        email_submitted: true,
        $set: {
          email: emailInput.value.trim(),
          waitlist_platform: 'macos_beta',
        },
      });

      wrapper?.setAttribute('hidden', '');
      success?.removeAttribute('hidden');
    } catch (err) {
      console.error(err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Join waitlist';
    }
  });

  updateSubmitState();
}
