// src/scripts/waitlist.ts
// Note: window.posthog is declared globally in posthog-events.ts.
export {};

const form = document.querySelector<HTMLFormElement>('[data-waitlist-form]');
if (form) {
  const platformBtns = form.querySelectorAll<HTMLButtonElement>('[data-platform]');
  const platformInput = form.querySelector<HTMLInputElement>('input[name="platform"]');
  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const successEl = document.querySelector<HTMLElement>('[data-waitlist-success]');
  const formWrapper = document.querySelector<HTMLElement>('[data-waitlist-wrapper]');
  const successEmail = document.querySelector<HTMLElement>('[data-success-email]');
  const successPlatform = document.querySelector<HTMLElement>('[data-success-platform]');

  const platformLabels: Record<string, string> = {
    windows: 'Windows',
    linux: 'Linux',
    ios: 'iOS / iPad',
  };

  const updateSubmitState = () => {
    if (!submitBtn || !emailInput || !platformInput) return;
    const ok = emailInput.value.trim() !== '' && platformInput.value !== '';
    submitBtn.disabled = !ok;
    submitBtn.classList.toggle('opacity-50', !ok);
    submitBtn.classList.toggle('cursor-not-allowed', !ok);
  };

  for (const btn of platformBtns) {
    btn.addEventListener('click', () => {
      const id = btn.dataset.platform ?? '';
      if (platformInput) platformInput.value = id;
      for (const b of platformBtns) {
        const selected = b === btn;
        b.dataset.selected = selected ? 'true' : 'false';
        b.classList.toggle('border-amber-500', selected);
        b.classList.toggle('bg-amber-500/15', selected);
        b.classList.toggle('border-gray-700', !selected);
      }
      updateSubmitState();
    });
  }

  emailInput?.addEventListener('input', updateSubmitState);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!emailInput || !platformInput || !submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          platform: platformInput.value,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed with status ${res.status}`);
      }

      // Track waitlist submission in PostHog
      window.posthog?.capture('web_waitlist_submitted', {
        platform: platformInput.value,
      });

      if (successEmail) successEmail.textContent = emailInput.value;
      if (successPlatform) successPlatform.textContent = platformLabels[platformInput.value] ?? platformInput.value;
      formWrapper?.setAttribute('hidden', '');
      successEl?.removeAttribute('hidden');
    } catch (err) {
      console.error(err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Join waitlist';
    }
  });

  updateSubmitState();
}
