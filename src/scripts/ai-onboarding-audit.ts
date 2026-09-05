import { requestAuditReport, type AuditReport, type ScoreKey } from "../lib/audit-client";

const scoreLabels: ScoreKey[] = [
  'Activation clarity',
  'CTA clarity',
  'Help availability',
  'Docs friction',
  'AI-guidability',
];

function renderList(container: Element, items: string[]): void {
  container.innerHTML = '';
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    container.appendChild(li);
  }
}

function renderOrderedList(container: Element, items: string[]): void {
  container.innerHTML = '';
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    container.appendChild(li);
  }
}

let lastReport: AuditReport | null = null;
let lastAuditUrl = '';

function renderReport(report: AuditReport, rawUrl: string, goal: string, productType: string): void {
  const title = document.querySelector<HTMLElement>('[data-audit-title]');
  const score = document.querySelector<HTMLElement>('[data-audit-score]');
  const scoresContainer = document.querySelector<HTMLElement>('[data-audit-scores]');
  const gaps = document.querySelector<HTMLElement>('[data-audit-gaps]');
  const questions = document.querySelector<HTMLElement>('[data-audit-questions]');
  const path = document.querySelector<HTMLElement>('[data-audit-path]');
  const script = document.querySelector<HTMLElement>('[data-audit-script]');
  const skill = document.querySelector<HTMLElement>('[data-audit-skill]');
  const engine = document.querySelector<HTMLElement>('[data-audit-engine]');
  const studioLink = document.querySelector<HTMLAnchorElement>('[data-ai-studio-link]');
  const shareLink = document.querySelector<HTMLAnchorElement>('[data-ai-share-link]');

  if (title) title.textContent = report.title || `${report.product} is ${report.band.toLowerCase()} for "${goal}".`;
  if (score) score.textContent = String(report.score);
  if (engine) engine.textContent = report.usedLlm ? 'Crawler + OpenAI rubric' : 'Crawler + deterministic rubric';

  if (scoresContainer) {
    scoresContainer.innerHTML = '';
    for (const label of scoreLabels) {
      const item = document.createElement('div');
      item.className = 'rounded-2xl border border-[#E8E2D9] bg-[#FAF8F4] p-4';
      item.innerHTML = `<div class="text-sm font-semibold">${label}</div><div class="mt-2 text-2xl font-bold">${report.scores[label]}/20</div>`;
      scoresContainer.appendChild(item);
    }
  }

  if (gaps) renderList(gaps, report.gaps);
  if (questions) {
    renderList(
      questions,
      (report.questions ?? []).map((item) => `${item.answered ? 'Answered' : 'Missing'}: ${item.question}`),
    );
  }
  if (path) renderOrderedList(path, report.firstRunPath ?? []);
  if (script) script.textContent = report.voiceGuideScript ?? '';
  if (skill) skill.textContent = report.skillPreview;

  if (studioLink) {
    studioLink.href = report.studioUrl ?? `https://studio.tryskilly.app/signup?${new URLSearchParams({
      utm_source: 'tryskilly-web',
      utm_medium: 'free-tool',
      utm_campaign: 'ai-onboarding-audit',
      audit_url: rawUrl,
      activation_goal: goal,
      prefill_skill: report.skillPreview.slice(0, 7000),
    }).toString()}`;
  }
  if (shareLink && report.shareUrl) {
    shareLink.href = report.shareUrl;
    shareLink.textContent = 'Share audit';
  }

  window.skillyTrack?.('web_ai_audit_preview_generated', {
    tool: 'ai_onboarding_audit',
    score: report.score,
    band: report.band,
    activation_goal: goal,
    product_type: productType || 'unknown',
    host: report.host,
    used_llm: Boolean(report.usedLlm),
  });

  document.querySelector<HTMLElement>('[data-audit-actions]')?.classList.remove('hidden');
  lastReport = report;
  lastAuditUrl = rawUrl;
  document.querySelector<HTMLElement>('[data-audit-email-form]')?.classList.remove('hidden');
}

document.addEventListener('submit', async (event) => {
  const form = event.target instanceof HTMLFormElement ? event.target : null;
  if (!form?.matches('[data-ai-audit-form]')) return;
  event.preventDefault();

  const error = document.querySelector<HTMLElement>('[data-ai-audit-error]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const originalButtonText = button?.textContent ?? '';
  try {
    const data = new FormData(form);
    const rawUrl = String(data.get('url') ?? '').trim();
    const goal = String(data.get('goal') ?? 'create first project');
    const productType = String(data.get('type') ?? '').trim();
    const docsUrl = String(data.get('docsUrl') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    error?.classList.add('hidden');
    if (button) {
      button.disabled = true;
      button.textContent = 'Auditing...';
    }

    lastReport = null;
    const resultTitle = document.querySelector<HTMLElement>('[data-audit-title]');
    if (resultTitle) resultTitle.textContent = 'Auditing your public pages…';
    for (const selector of ['[data-audit-score]', '[data-audit-engine]', '[data-audit-scores]', '[data-audit-gaps]', '[data-audit-questions]', '[data-audit-path]', '[data-audit-script]', '[data-audit-skill]']) {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) element.textContent = '';
    }
    document.querySelector<HTMLElement>('[data-audit-actions]')?.classList.add('hidden');
    document.querySelector<HTMLElement>('[data-audit-email-form]')?.classList.add('hidden');
    window.skillyTrack?.('web_ai_audit_started', { tool: 'ai_onboarding_audit' });
    const report = await requestAuditReport({ url: rawUrl, goal, type: productType, docsUrl, email });
    renderReport(report, rawUrl, goal, productType);
  } catch (failure) {
    const title = document.querySelector<HTMLElement>('[data-audit-title]');
    if (title) title.textContent = 'No report generated. Please try again.';
    window.skillyTrack?.('web_ai_audit_failed', { tool: 'ai_onboarding_audit' });
    if (error) {
      error.textContent = failure instanceof Error ? failure.message : 'The audit could not finish. Please try again.';
      error.classList.remove('hidden');
    }
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalButtonText;
    }
  }
});

document.addEventListener('submit', async (event) => {
  const form = event.target instanceof HTMLFormElement ? event.target : null;
  if (!form?.matches('[data-audit-email-form]')) return;
  event.preventDefault();

  const msg = form.querySelector<HTMLElement>('[data-audit-email-msg]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const originalText = button?.textContent ?? '';
  const email = String(new FormData(form).get('email') ?? '').trim();

  const setMsg = (text: string, ok: boolean) => {
    if (!msg) return;
    msg.textContent = text;
    msg.className = `mt-2 text-sm font-medium ${ok ? 'text-green-700' : 'text-red-700'}`;
  };

  if (!lastReport) {
    setMsg('Run an audit first.', false);
    return;
  }
  if (button) {
    button.disabled = true;
    button.textContent = 'Sending...';
  }
  try {
    const response = await fetch('/api/ai-onboarding-audit-email/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, url: lastAuditUrl, report: lastReport }),
    });
    if (!response.ok) throw new Error('send failed');
    setMsg('Sent — check your inbox for the full report.', true);
    form.reset();
    window.skillyTrack?.('web_ai_audit_report_emailed', {
      tool: 'ai_onboarding_audit',
      host: lastReport.host,
      score: lastReport.score,
    });
  } catch {
    setMsg('Could not send right now. Try again in a moment.', false);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
});
