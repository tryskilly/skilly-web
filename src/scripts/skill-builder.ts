import type { SkillCourse, SkillLesson } from '../lib/skill-builder';
import { BROWSER_EXTENSIONS } from '../data/config';

export {};

const form = document.querySelector<HTMLFormElement>('[data-skill-builder-form]');
const result = document.querySelector<HTMLElement>('[data-skill-result]');
let activeCourse: SkillCourse | null = null;
let started = false;
let skillDelivered = false;

type ClientPlatform = 'macos' | 'windows' | 'other';

function clientPlatform(): ClientPlatform {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) return 'macos';
  if (userAgent.includes('windows')) return 'windows';
  return 'other';
}

function preferredBrowserExtension(): (typeof BROWSER_EXTENSIONS)[number] {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('firefox')) return BROWSER_EXTENSIONS.find((item) => item.id === 'firefox') ?? BROWSER_EXTENSIONS[0];
  if (userAgent.includes('edg/')) return BROWSER_EXTENSIONS.find((item) => item.id === 'edge') ?? BROWSER_EXTENSIONS[0];
  return BROWSER_EXTENSIONS.find((item) => item.id === 'chrome') ?? BROWSER_EXTENSIONS[0];
}

function configureActivationHandoff(): void {
  const platform = clientPlatform();
  const installCta = document.querySelector<HTMLAnchorElement>('[data-skill-install-cta]');
  const openAppCta = document.querySelector<HTMLAnchorElement>('[data-skill-open-app]');
  const platformNote = document.querySelector<HTMLElement>('[data-skill-platform-note]');
  let nextAction = 'open_native_app';

  if (platform !== 'macos') {
    const extension = preferredBrowserExtension();
    if (installCta) {
      installCta.href = extension.href;
      installCta.textContent = `Use Skilly in ${extension.shortName}`;
      installCta.dataset.phEvent = 'web_skill_builder_extension_clicked';
      installCta.dataset.phPropBrowser = extension.id;
    }
    openAppCta?.setAttribute('hidden', '');
    if (platformNote) {
      platformNote.textContent = 'The generated SKILL.md imports into the Mac app today. Keep the email for later; the browser extension can still guide you on webpages now.';
    }
    nextAction = `install_${extension.id}_extension`;
  } else {
    openAppCta?.removeAttribute('hidden');
  }

  window.skillyTrack?.('web_skill_builder_activation_handoff_viewed', {
    platform,
    next_action: nextAction,
  });
}

function currentAttribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).hostname : ''; } catch { referrer = ''; }
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    referrer,
    landingPage: `${window.location.pathname}${window.location.search}`.slice(0, 180),
  };
}

function text(selector: string, value: string): void {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) element.textContent = value;
}

function showError(message: string): void {
  const error = document.querySelector<HTMLElement>('[data-skill-builder-error]');
  if (!error) return;
  error.textContent = message;
  error.classList.toggle('hidden', !message);
}

function renderLesson(lesson: SkillLesson): void {
  text('[data-active-title]', lesson.title);
  text('[data-active-duration]', lesson.duration);
  text('[data-active-objective]', lesson.objective);
  text('[data-active-checkpoint]', lesson.checkpoint);
  const steps = document.querySelector<HTMLOListElement>('[data-active-steps]');
  if (!steps) return;
  steps.replaceChildren();
  lesson.steps.forEach((step, index) => {
    const item = document.createElement('li');
    item.className = 'flex gap-3';
    const number = document.createElement('span');
    number.className = 'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-white font-mono text-[10px] font-bold text-[#9A5B08]';
    number.textContent = String(index + 1);
    const copy = document.createElement('span');
    copy.textContent = step;
    item.append(number, copy);
    steps.append(item);
  });
}

function renderLessonList(course: SkillCourse): void {
  const list = document.querySelector<HTMLOListElement>('[data-lesson-list]');
  if (!list) return;
  list.replaceChildren();
  course.lessons.forEach((lesson, index) => {
    const locked = index > 0 && !skillDelivered;
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `group flex w-full items-center gap-3 border-b border-[#EEE8E0] px-2 py-4 text-left last:border-0 ${index === 0 ? 'text-[#9A5B08]' : locked ? 'text-[#8C8378]' : 'text-[#4E463D]'}`;
    if (locked) button.setAttribute('aria-label', `Unlock lesson ${index + 1}: ${lesson.title}`);
    const number = document.createElement('span');
    number.className = `grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-xs ${index === 0 ? 'border-[#F59E0B] bg-[#F59E0B] text-[#1A1714]' : 'border-[#D8D0C5] bg-white'}`;
    number.textContent = String(index + 1);
    const copy = document.createElement('span');
    copy.className = 'min-w-0 flex-1';
    const title = document.createElement('strong');
    title.className = 'block truncate text-sm font-semibold';
    title.textContent = lesson.title;
    const duration = document.createElement('small');
    duration.className = 'mt-1 block text-xs text-[#8C8378]';
    duration.textContent = locked ? `${lesson.duration} · Email to unlock` : lesson.duration;
    copy.append(title, duration);
    button.append(number, copy);
    button.addEventListener('click', () => {
      if (locked) {
        openEmailGate('locked_lesson');
        window.skillyTrack?.('web_skill_builder_locked_lesson_clicked', { lesson_number: index + 1 });
        return;
      }
      list.querySelectorAll('button').forEach((candidate) => candidate.classList.remove('text-[#9A5B08]'));
      list.querySelectorAll('button > span:first-child').forEach((candidate) => {
        candidate.className = 'grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#D8D0C5] bg-white font-mono text-xs';
      });
      button.classList.add('text-[#9A5B08]');
      number.className = 'grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#F59E0B] bg-[#F59E0B] font-mono text-xs text-[#1A1714]';
      renderLesson(lesson);
      window.skillyTrack?.('web_skill_builder_lesson_opened', { lesson_number: index + 1, unlocked: skillDelivered });
    });
    item.append(button);
    list.append(item);
  });
}

function renderCourse(course: SkillCourse): void {
  activeCourse = course;
  skillDelivered = false;
  text('[data-skill-title]', course.title);
  text('[data-skill-lessons]', String(course.lessons.length));
  text('[data-skill-duration]', course.duration);
  text('[data-skill-level]', course.level);
  text('[data-skill-app]', course.app);
  text('[data-skill-summary]', course.summary);
  const grounding = document.querySelector<HTMLElement>('[data-skill-grounding]');
  if (grounding) {
    grounding.textContent = !course.exportReady
      ? 'Basic preview only — detailed generation incomplete'
      : course.grounding === 'web_sources'
      ? `Native Skilly skill · ${course.vocabulary.length} UI terms · ${course.sources.length} source${course.sources.length === 1 ? '' : 's'}`
      : course.grounding === 'model_knowledge'
        ? `Native Skilly skill · ${course.vocabulary.length} UI terms · model knowledge`
        : 'Basic preview only — detailed generation unavailable';
    grounding.classList.toggle('hidden', false);
    grounding.classList.toggle('text-emerald-700', course.grounding === 'web_sources');
    grounding.classList.toggle('text-amber-700', course.grounding !== 'web_sources');
  }

  const quality = document.querySelector<HTMLElement>('[data-skill-quality]');
  if (quality) {
    quality.textContent = course.exportReady ? '' : (course.qualityIssues[0] || 'This preview is incomplete. Regenerate it before requesting the SKILL.md.');
    quality.toggleAttribute('hidden', course.exportReady);
  }
  const exportButton = document.querySelector<HTMLButtonElement>('[data-export-open]');
  if (exportButton) {
    exportButton.disabled = !course.exportReady;
    exportButton.textContent = course.exportReady ? 'Unlock the full course' : 'Detailed export unavailable';
  }
  const emailForm = document.querySelector<HTMLFormElement>('[data-skill-email-form]');
  emailForm?.reset();
  emailForm?.querySelector<HTMLElement>('[data-skill-email-message]')?.classList.add('hidden');
  emailForm?.toggleAttribute('hidden', !course.exportReady);
  document.querySelector<HTMLElement>('[data-skill-delivered-next]')?.setAttribute('hidden', '');

  const sourcePanel = document.querySelector<HTMLElement>('[data-skill-sources]');
  const sourceList = document.querySelector<HTMLUListElement>('[data-skill-source-list]');
  if (sourcePanel && sourceList) {
    sourceList.replaceChildren();
    course.sources.forEach((source) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950';
      link.textContent = source.title;
      const meta = document.createElement('span');
      meta.className = 'ml-2 text-xs text-[#766D63]';
      meta.textContent = `${source.type === 'official' ? 'Official' : 'Reference'} · ${source.domain}`;
      item.append(link, meta);
      sourceList.append(item);
    });
    sourcePanel.toggleAttribute('hidden', course.sources.length === 0);
  }

  renderLessonList(course);

  renderLesson(course.lessons[0]);
  result?.removeAttribute('hidden');
  if (course.exportReady) window.skillyTrack?.('web_skill_builder_email_gate_viewed', { trigger: 'generation', lesson_count: course.lessons.length });
  result?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

form?.addEventListener('input', () => {
  if (started) return;
  started = true;
  window.skillyTrack?.('web_skill_builder_started');
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const data = new FormData(form);
  const payload = { app: data.get('app'), goal: data.get('goal'), level: data.get('level'), pace: data.get('pace') };
  showError('');
  if (button) { button.disabled = true; button.textContent = 'Building your skill…'; }
  window.skillyTrack?.('web_skill_builder_submitted', { level: payload.level, pace: payload.pace });
  const generationStartedAt = performance.now();

  try {
    const response = await fetch('/api/skill-builder/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const body = await response.json() as { course?: SkillCourse; error?: string };
    if (!response.ok || !body.course) throw new Error(body.error || 'Could not build your skill.');
    window.skillyTrack?.('web_skill_builder_generated', { level: body.course.level, pace: body.course.pace, lesson_count: body.course.lessons.length, used_llm: body.course.usedLlm, used_web_search: body.course.usedWebSearch, source_count: body.course.sources.length, grounding: body.course.grounding, cache_hit: body.course.cacheHit, export_ready: body.course.exportReady, generation_duration_ms: Math.round(performance.now() - generationStartedAt) });
    renderCourse(body.course);
  } catch (error) {
    showError(error instanceof Error ? error.message : 'Could not build your skill.');
    window.skillyTrack?.('web_skill_builder_failed');
  } finally {
    if (button) { button.disabled = false; button.textContent = 'Build my skill'; }
  }
});

function openEmailGate(source: string): void {
  if (!activeCourse?.exportReady) return;
  const emailForm = document.querySelector<HTMLFormElement>('[data-skill-email-form]');
  emailForm?.removeAttribute('hidden');
  emailForm?.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
  emailForm?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  window.skillyTrack?.('web_skill_builder_export_opened', { source });
}

document.querySelector<HTMLButtonElement>('[data-export-open]')?.addEventListener('click', () => openEmailGate('result'));

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="/dmg"]') : null;
  if (!target || !activeCourse?.exportReady || skillDelivered) return;
  event.preventDefault();
  openEmailGate(target.dataset.phPropLocation || 'download');
  window.skillyTrack?.('web_skill_builder_download_gated', { location: target.dataset.phPropLocation || 'unknown' });
});

document.querySelector<HTMLFormElement>('[data-skill-email-form]')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!activeCourse || skillDelivered) return;
  const emailForm = event.currentTarget as HTMLFormElement;
  const button = emailForm.querySelector<HTMLButtonElement>('button[type="submit"]');
  const message = emailForm.querySelector<HTMLElement>('[data-skill-email-message]');
  const data = new FormData(emailForm);
  if (button) { button.disabled = true; button.textContent = 'Sending…'; }
  if (message) message.classList.add('hidden');

  try {
    const response = await fetch('/api/skill-builder-email/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.get('email'), marketingConsent: data.get('marketingConsent') === 'on', website: data.get('website'), course: activeCourse, attribution: currentAttribution() }),
    });
    const body = await response.json() as { ok?: boolean; error?: string; leadStored?: boolean; deliveryStatus?: string };
    if (!response.ok || !body.ok) throw new Error(body.error || 'Could not send your skill.');
    skillDelivered = true;
    renderLessonList(activeCourse);
    const exportButton = document.querySelector<HTMLButtonElement>('[data-export-open]');
    if (exportButton) { exportButton.disabled = true; exportButton.textContent = 'Course unlocked'; }
    if (message) { message.textContent = 'Accepted by the email provider. Check your inbox and spam folder for the SKILL.md attachment.'; message.className = 'mt-3 text-sm font-medium text-emerald-700'; }
    document.querySelector<HTMLElement>('[data-skill-delivered-next]')?.removeAttribute('hidden');
    window.skillyTrack?.('web_skill_builder_email_submitted', { marketing_consent: data.get('marketingConsent') === 'on', lead_stored: body.leadStored === true, grounding: activeCourse.grounding, source_count: activeCourse.sources.length });
    configureActivationHandoff();
    window.skillyTrack?.('web_skill_builder_email_accepted', { provider: 'resend', delivery: 'attachment' });
    window.skillyTrack?.('web_skill_builder_download_unlocked');
  } catch (error) {
    if (message) { message.textContent = error instanceof Error ? error.message : 'Could not send your skill.'; message.className = 'mt-3 text-sm font-medium text-red-700'; }
    window.skillyTrack?.('web_skill_builder_email_failed');
  } finally {
    if (button) { button.disabled = skillDelivered; button.textContent = skillDelivered ? 'Course unlocked' : 'Email & unlock course'; }
  }
});

document.querySelector<HTMLAnchorElement>('[data-skill-install-cta]')?.addEventListener('click', () => {
  if (clientPlatform() !== 'macos') return;
  window.skillyTrack?.('web_skill_builder_app_download_clicked', {
    platform: 'macos',
    location: 'email_success',
  });
});
