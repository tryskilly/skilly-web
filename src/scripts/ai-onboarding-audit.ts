export {};

type ScoreKey = 'Activation clarity' | 'CTA clarity' | 'Help availability' | 'Docs friction' | 'AI-guidability';

interface AuditReport {
  product: string;
  host?: string;
  title: string;
  score: number;
  band: string;
  scores: Record<ScoreKey, number>;
  scoreJustifications?: Record<ScoreKey, string>;
  gaps: string[];
  questions?: Array<{ question: string; answered: boolean }>;
  firstRunPath?: string[];
  voiceGuideScript?: string;
  skillPreview: string;
  shareUrl?: string;
  studioUrl?: string;
  usedLlm?: boolean;
}

const scoreLabels: ScoreKey[] = [
  'Activation clarity',
  'CTA clarity',
  'Help availability',
  'Docs friction',
  'AI-guidability',
];

function hostFromUrl(rawUrl: string): string {
  const withProtocol = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  return new URL(withProtocol).host.replace(/^www\./, '');
}

function productNameFromHost(host: string): string {
  return host
    .split('.')[0]
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function scoreFor(goal: string, productType: string): Record<ScoreKey, number> {
  const base = productType.trim() ? 68 : 61;
  const goalBonus = goal.includes('project') ? 6 : goal.includes('data') ? 3 : 1;
  return {
    'Activation clarity': Math.min(20, 11 + goalBonus),
    'CTA clarity': Math.min(20, base > 65 ? 15 : 12),
    'Help availability': Math.min(20, productType ? 13 : 10),
    'Docs friction': Math.min(20, goal.includes('publish') ? 11 : 14),
    'AI-guidability': Math.min(20, productType ? 15 : 12),
  };
}

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

function localReport(rawUrl: string, goal: string, productType: string): AuditReport {
  const host = hostFromUrl(rawUrl);
  const product = productNameFromHost(host);
  const scores = scoreFor(goal, productType);
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const band = total >= 71 ? 'AI-ready' : total >= 41 ? 'Needs work' : 'Users will get stuck';
  return {
    product,
    host,
    title: `${product} is ${band.toLowerCase()} for "${goal}".`,
    score: total,
    band,
    scores,
    gaps: [
      `Make the path to "${goal}" explicit on the first product screen.`,
      'Answer what happens after the primary CTA before users commit.',
      'Add one contextual help entry for the first confused-user question.',
      'Expose product vocabulary an AI guide can reuse when pointing.',
    ],
    questions: [
      { question: `How do I ${goal}?`, answered: false },
      { question: 'What happens after I click the primary CTA?', answered: false },
      { question: 'Where should a new user start?', answered: false },
    ],
    firstRunPath: [
      `Open ${product} and confirm the user's goal.`,
      `Point to the first action related to "${goal}".`,
      'Explain the next screen in plain language.',
    ],
    voiceGuideScript: `User asks: "Where do I start?"\nSkilly says: "Start with ${goal}. I will point to the first action, explain why it matters, then confirm what you should see next."`,
    skillPreview: `---
name: ${product.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-onboarding
description: Guide new ${productType || 'product'} users to ${goal}.
---

## Teaching Instructions
Help a new user reach "${goal}" without leaving the product.

## First-run Path
1. Confirm the user's goal.
2. Point to the primary setup action.
3. Explain the next screen in plain language.`,
  };
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

    let report: AuditReport;
    try {
      const response = await fetch('/api/ai-onboarding-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: rawUrl, goal, type: productType, docsUrl, email }),
      });
      if (!response.ok) throw new Error('Audit API unavailable');
      report = (await response.json()) as AuditReport;
    } catch {
      report = localReport(rawUrl, goal, productType);
    }

    renderReport(report, rawUrl, goal, productType);
  } catch {
    if (error) {
      error.textContent = 'Enter a valid public website URL.';
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
    const response = await fetch('/api/ai-onboarding-audit-email', {
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
