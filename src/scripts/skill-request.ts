// src/scripts/skill-request.ts
// Window.posthog is declared globally in posthog-events.ts
export {};

const form = document.querySelector<HTMLFormElement>('[data-skill-request-form]');
if (form) {
  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
  const appInput = form.querySelector<HTMLInputElement>('input[name="appName"]');
  const messageInput = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const wrapper = document.querySelector<HTMLElement>('[data-skill-request-wrapper]');
  const success = document.querySelector<HTMLElement>('[data-skill-request-success]');
  const successApp = document.querySelector<HTMLElement>('[data-success-app]');

  const updateSubmitState = () => {
    if (!submitBtn || !emailInput || !appInput) return;
    const ok = emailInput.value.trim() !== '' && appInput.value.trim() !== '';
    submitBtn.disabled = !ok;
    submitBtn.classList.toggle('opacity-50', !ok);
    submitBtn.classList.toggle('cursor-not-allowed', !ok);
  };

  emailInput?.addEventListener('input', updateSubmitState);
  appInput?.addEventListener('input', updateSubmitState);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!emailInput || !appInput || !submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch('/api/skill-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          appName: appInput.value.trim(),
          message: messageInput?.value.trim() || '',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as Record<string, string>).error ?? `Request failed with status ${res.status}`);
      }

      window.posthog?.capture('web_skill_request_submitted', {
        app: appInput.value.trim(),
      });

      if (successApp) successApp.textContent = appInput.value.trim();
      wrapper?.setAttribute('hidden', '');
      success?.removeAttribute('hidden');
    } catch (err) {
      console.error(err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit request';
    }
  });

  updateSubmitState();
}
