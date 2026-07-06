export type ScoreKey = 'Activation clarity' | 'CTA clarity' | 'Help availability' | 'Docs friction' | 'AI-guidability';

export interface AuditInput {
  url: string;
  goal: string;
  productType?: string;
  docsUrl?: string;
  email?: string;
}

export interface AuditQuestion {
  question: string;
  answered: boolean;
}

export interface AuditReport {
  product: string;
  host: string;
  title: string;
  crawledTitle: string;
  score: number;
  band: string;
  scores: Record<ScoreKey, number>;
  scoreJustifications: Record<ScoreKey, string>;
  gaps: string[];
  questions: AuditQuestion[];
  firstRunPath: string[];
  voiceGuideScript: string;
  skillPreview: string;
  shareSlug: string;
  shareUrl: string;
  ogImage: string;
  usedLlm: boolean;
}

interface CrawledPage {
  url: string;
  title: string;
  headings: string[];
  ctas: string[];
  questions: string[];
  text: string;
}

const REQUEST_TIMEOUT_MS = 8000;
const LLM_TIMEOUT_MS = 18_000;
const MAX_HTML_CHARS = 220_000;
const MAX_CRAWLED_PAGES = 4;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const SITE_URL = 'https://tryskilly.app';
const SCORE_LABELS: ScoreKey[] = ['Activation clarity', 'CTA clarity', 'Help availability', 'Docs friction', 'AI-guidability'];
const BLOCKED_HOSTS = new Set(['localhost', 'metadata.google.internal']);
const reportCache = new Map<string, { report: AuditReport; expiresAt: number }>();

interface LlmAuditPayload {
  scores?: Partial<Record<ScoreKey, unknown>>;
  scoreJustifications?: Partial<Record<ScoreKey, unknown>>;
  gaps?: unknown;
  questions?: unknown;
  firstRunPath?: unknown;
  voiceGuideScript?: unknown;
  skillPreview?: unknown;
}

function compactText(value: string): string {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeAuditUrl(rawUrl: string): URL {
  const withProtocol = /^https?:\/\//i.test(rawUrl.trim()) ? rawUrl.trim() : `https://${rawUrl.trim()}`;
  const url = new URL(withProtocol);
  url.hash = '';
  url.username = '';
  url.password = '';
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only public HTTP and HTTPS URLs can be audited.');
  }
  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new Error('That host cannot be audited.');
  }
  if (/^(127\.|10\.|0\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) {
    throw new Error('Private network URLs cannot be audited.');
  }
  return url;
}

function matchAll(html: string, pattern: RegExp, group = 1): string[] {
  return Array.from(html.matchAll(pattern), (match) => compactText(match[group] ?? '')).filter(Boolean);
}

function unique(values: string[], limit: number): string[] {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const value of values) {
    const normalized = value.trim();
    const key = normalized.toLowerCase();
    if (seen.has(key) || normalized.length < 2) continue;
    seen.add(key);
    output.push(normalized.slice(0, 180));
    if (output.length >= limit) break;
  }
  return output;
}

export function productNameFromHost(host: string): string {
  return host
    .replace(/^www\./, '')
    .split('.')[0]
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugFromHost(host: string): string {
  return host.replace(/^www\./, '').replace(/[^a-z0-9.-]+/gi, '-').toLowerCase();
}

async function fetchHtml(url: URL): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      accept: 'text/html,application/xhtml+xml,text/plain;q=0.8,*/*;q=0.1',
      'user-agent': 'SkillyAIOnboardingAudit/1.0 (+https://tryskilly.app/tools/ai-onboarding-audit)',
    },
  });
  if (!response.ok) {
    throw new Error(`The site returned HTTP ${response.status}.`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType && !/text\/html|application\/xhtml\+xml|text\/plain/i.test(contentType)) {
    throw new Error('The URL did not return a readable HTML page.');
  }
  return (await response.text()).slice(0, MAX_HTML_CHARS);
}

function internalLinks(html: string, baseUrl: URL): URL[] {
  const links = matchAll(html, /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi, 1);
  const candidates = links
    .map((href) => {
      try {
        return new URL(href, baseUrl);
      } catch {
        return null;
      }
    })
    .filter((url): url is URL => Boolean(url))
    .filter((url) => url.hostname === baseUrl.hostname && url.protocol.startsWith('http'))
    .filter((url) => /\b(docs|help|support|guide|learn|start|setup|quickstart|pricing|features)\b/i.test(url.pathname));
  return unique(candidates.map((url) => url.toString()), MAX_CRAWLED_PAGES - 1).map((url) => new URL(url));
}

function extractPage(url: URL, html: string): CrawledPage {
  const cleanText = compactText(html);
  return {
    url: url.toString(),
    title: matchAll(html, /<title\b[^>]*>([\s\S]*?)<\/title>/gi)[0] || productNameFromHost(url.host),
    headings: unique(matchAll(html, /<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi), 12),
    ctas: unique(
      [
        ...matchAll(html, /<button\b[^>]*>([\s\S]*?)<\/button>/gi),
        ...matchAll(html, /<a\b[^>]*>([\s\S]*?)<\/a>/gi),
      ].filter((label) => /\b(start|get|try|book|create|connect|invite|publish|sign|demo|download|open)\b/i.test(label)),
      10,
    ),
    questions: unique(
      [
        ...matchAll(html, /<h[2-4]\b[^>]*>([\s\S]*?\?)<\/h[2-4]>/gi),
        ...matchAll(html, /<summary\b[^>]*>([\s\S]*?\?)<\/summary>/gi),
      ],
      8,
    ),
    text: cleanText.slice(0, 7000),
  };
}

async function crawlPublicContent(input: AuditInput): Promise<CrawledPage[]> {
  const startUrl = normalizeAuditUrl(input.url);
  const startHtml = await fetchHtml(startUrl);
  const pages = [extractPage(startUrl, startHtml)];
  const urls = internalLinks(startHtml, startUrl);
  if (input.docsUrl) {
    urls.unshift(normalizeAuditUrl(input.docsUrl));
  }
  for (const url of urls.slice(0, MAX_CRAWLED_PAGES - 1)) {
    try {
      pages.push(extractPage(url, await fetchHtml(url)));
    } catch {
      continue;
    }
  }
  return pages;
}

function scorePages(pages: CrawledPage[], goal: string, productType: string): Record<ScoreKey, number> {
  const text = pages.map((page) => page.text).join(' ').toLowerCase();
  const ctaCount = pages.flatMap((page) => page.ctas).length;
  const helpCount = (text.match(/\b(help|docs|documentation|support|guide|tutorial|knowledge base|faq)\b/g) ?? []).length;
  const howCount = (text.match(/\b(how to|getting started|quickstart|setup|onboarding|first project|start here)\b/g) ?? []).length;
  const goalWords = goal.toLowerCase().split(/\s+/).filter((word) => word.length > 3);
  const goalHits = goalWords.filter((word) => text.includes(word)).length;

  return {
    'Activation clarity': Math.min(20, 8 + goalHits * 4 + Math.min(5, howCount)),
    'CTA clarity': Math.min(20, 9 + Math.min(9, ctaCount)),
    'Help availability': Math.min(20, 7 + Math.min(10, helpCount)),
    'Docs friction': Math.min(20, 10 + Math.min(5, howCount) + (helpCount > 2 ? 3 : 0)),
    'AI-guidability': Math.min(20, 9 + goalHits * 3 + (productType ? 2 : 0) + Math.min(4, ctaCount)),
  };
}

function bandForScore(score: number): string {
  if (score >= 71) return 'AI-ready';
  if (score >= 41) return 'Needs work';
  return 'Users will get stuck';
}

function fallbackReport(input: AuditInput, pages: CrawledPage[]): AuditReport {
  const url = normalizeAuditUrl(input.url);
  const host = url.host.replace(/^www\./, '');
  const product = productNameFromHost(host);
  const productType = input.productType?.trim() || 'product';
  const goal = input.goal || 'create first project';
  const scores = scorePages(pages, goal, productType);
  const score = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const band = bandForScore(score);
  const headings = unique(pages.flatMap((page) => page.headings), 8);
  const ctas = unique(pages.flatMap((page) => page.ctas), 8);
  const questions = unique(pages.flatMap((page) => page.questions), 5);
  const shareSlug = slugFromHost(host);
  const shareUrl = `${SITE_URL}/audit/${shareSlug}?goal=${encodeURIComponent(goal)}&type=${encodeURIComponent(productType)}`;
  const ogImage = `${SITE_URL}/api/ai-onboarding-audit-og?product=${encodeURIComponent(product)}&score=${score}&band=${encodeURIComponent(band)}`;

  return {
    product,
    host,
    title: `${product} scored ${score}/100: ${band.toLowerCase()}.`,
    crawledTitle: pages[0]?.title ?? product,
    score,
    band,
    scores,
    scoreJustifications: {
      'Activation clarity': headings.length ? 'The page exposes some setup language, but first value may still need sharper sequencing.' : 'The page has few headings that describe first value.',
      'CTA clarity': ctas.length ? `Primary actions found: ${ctas.slice(0, 3).join(', ')}.` : 'No obvious primary CTA was found in the crawled pages.',
      'Help availability': 'Contextual help and docs language are scored from public page text.',
      'Docs friction': pages.length > 1 ? 'The crawl found multiple public support or docs pages.' : 'The crawl found limited public support content.',
      'AI-guidability': 'The score reflects whether public content contains goals, action labels, and product vocabulary.',
    },
    gaps: [
      ctas.length ? `Clarify which action is first. Current actions include: ${ctas.slice(0, 3).join(', ')}.` : 'Add one primary first-run CTA an AI guide can confidently point to.',
      headings.length ? `Turn the strongest headings into step labels: ${headings.slice(0, 3).join(', ')}.` : 'Add headings that describe the setup path in plain language.',
      questions.length ? `Answer whether "${goal}" is covered by the public FAQ.` : `Add a public answer for "How do I ${goal}?"`,
      'Document the expected next screen after the first click.',
      'Add UI vocabulary for the first screen so Skilly can point to exact controls.',
    ],
    questions: questions.length
      ? questions.map((question) => ({ question, answered: true }))
      : [
          { question: `How do I ${goal}?`, answered: false },
          { question: 'What happens after I click the primary CTA?', answered: false },
          { question: 'Where should a new user start?', answered: false },
          { question: 'Which setup step creates first value?', answered: false },
          { question: 'Where can I get help without leaving the product?', answered: false },
        ],
    firstRunPath: [
      `Open ${product} and confirm the user's goal.`,
      `Point to the first action related to "${goal}".`,
      'Explain the next screen before the user clicks.',
    ],
    voiceGuideScript: `User asks: "Where do I start?"\nSkilly says: "Start with ${goal}. I will point to the first action, explain why it matters, then confirm what you should see next."`,
    skillPreview: `---
name: ${product.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-onboarding
description: Guide new ${productType} users to ${goal}.
---

## Teaching Instructions
Help a new user understand ${product} and reach "${goal}" without leaving the product.

## Public Content Signals
${headings.slice(0, 6).map((heading) => `- ${heading}`).join('\n') || '- Add clearer headings for onboarding-critical concepts.'}

## First-run Path
1. Confirm the user's goal.
2. Point to the primary setup action.
3. Explain the next screen in plain language.

## UI Vocabulary
### Primary CTA
The first action a new user should take to reach "${goal}".`,
    shareSlug,
    shareUrl,
    ogImage,
    usedLlm: false,
  };
}

function safeJsonParse(raw: string): Partial<AuditReport> | null {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as Partial<AuditReport>;
  } catch {
    return null;
  }
}

function clampScore(value: unknown, fallback: number): number {
  const score = Number(value);
  if (!Number.isFinite(score)) return fallback;
  return Math.max(0, Math.min(20, Math.round(score)));
}

function cleanTextValue(value: unknown, fallback: string, maxLength: number): string {
  if (typeof value !== 'string') return fallback;
  const normalized = value.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return normalized ? normalized.slice(0, maxLength) : fallback;
}

function cleanStringArray(value: unknown, fallback: string[], limit: number, maxItemLength = 180): string[] {
  if (!Array.isArray(value)) return fallback;
  const cleaned = unique(
    value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.replace(/\s+/g, ' ').trim())
      .filter(Boolean),
    limit,
  ).map((item) => item.slice(0, maxItemLength));
  return cleaned.length ? cleaned : fallback;
}

function cleanQuestions(value: unknown, fallback: AuditQuestion[]): AuditQuestion[] {
  if (!Array.isArray(value)) return fallback;
  const questions = value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const question = 'question' in item ? cleanTextValue(item.question, '', 180) : '';
      if (!question) return null;
      return { question, answered: Boolean('answered' in item ? item.answered : false) };
    })
    .filter((item): item is AuditQuestion => Boolean(item))
    .slice(0, 5);
  return questions.length ? questions : fallback;
}

function openAIResponseText(data: unknown): string {
  if (!data || typeof data !== 'object') return '';
  if ('output_text' in data && typeof data.output_text === 'string') return data.output_text;
  if (!('output' in data) || !Array.isArray(data.output)) return '';

  const parts: string[] = [];
  for (const outputItem of data.output) {
    if (!outputItem || typeof outputItem !== 'object' || !('content' in outputItem) || !Array.isArray(outputItem.content)) continue;
    for (const contentItem of outputItem.content) {
      if (!contentItem || typeof contentItem !== 'object') continue;
      if ('text' in contentItem && typeof contentItem.text === 'string') parts.push(contentItem.text);
      if ('json' in contentItem && contentItem.json) parts.push(JSON.stringify(contentItem.json));
    }
  }
  return parts.join('\n');
}

function normalizeLlmReport(parsed: LlmAuditPayload, fallback: AuditReport): AuditReport | null {
  if (!parsed.scores) return null;
  const scores = Object.fromEntries(
    SCORE_LABELS.map((label) => [label, clampScore(parsed.scores?.[label], fallback.scores[label])]),
  ) as Record<ScoreKey, number>;
  const score = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const band = bandForScore(score);
  const scoreJustifications = { ...fallback.scoreJustifications };
  for (const label of SCORE_LABELS) {
    scoreJustifications[label] = cleanTextValue(parsed.scoreJustifications?.[label], scoreJustifications[label], 220);
  }

  return {
    ...fallback,
    title: `${fallback.product} scored ${score}/100: ${band.toLowerCase()}.`,
    score,
    band,
    scores,
    scoreJustifications,
    gaps: cleanStringArray(parsed.gaps, fallback.gaps, 6, 220),
    questions: cleanQuestions(parsed.questions, fallback.questions),
    firstRunPath: cleanStringArray(parsed.firstRunPath, fallback.firstRunPath, 5, 180),
    voiceGuideScript: cleanTextValue(parsed.voiceGuideScript, fallback.voiceGuideScript, 900),
    skillPreview: cleanTextValue(parsed.skillPreview, fallback.skillPreview, 7000),
    ogImage: `${SITE_URL}/api/ai-onboarding-audit-og?product=${encodeURIComponent(fallback.product)}&score=${score}&band=${encodeURIComponent(band)}`,
    usedLlm: true,
  };
}

async function llmReport(input: AuditInput, pages: CrawledPage[], fallback: AuditReport): Promise<AuditReport> {
  const apiKey = (typeof process !== 'undefined' ? process.env?.OPENAI_API_KEY : undefined) ?? import.meta.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[ai-audit] OPENAI_API_KEY missing at runtime — using deterministic fallback (set it in Vercel + redeploy)');
    return fallback;
  }

  const prompt = [
    'You are scoring whether an AI product guide can explain and onboard a new user from public product content.',
    'Return strict JSON only. No markdown.',
    `Activation goal: ${input.goal}`,
    `Product type: ${input.productType || 'unknown'}`,
    'Rubric: five dimensions, each 0-20: Activation clarity, CTA clarity, Help availability, Docs friction, AI-guidability.',
    'JSON shape: {"scores":{"Activation clarity":0,"CTA clarity":0,"Help availability":0,"Docs friction":0,"AI-guidability":0},"scoreJustifications":{"Activation clarity":"","CTA clarity":"","Help availability":"","Docs friction":"","AI-guidability":""},"gaps":[],"questions":[{"question":"","answered":true}],"firstRunPath":[],"voiceGuideScript":"","skillPreview":""}',
    'Every score must be an integer from 0 to 20. Use only evidence from the crawled content. Keep gaps concrete and onboarding-specific.',
    `Crawled content:\n${pages.map((page) => `URL: ${page.url}\nTitle: ${page.title}\nHeadings: ${page.headings.join(' | ')}\nCTAs: ${page.ctas.join(' | ')}\nQuestions: ${page.questions.join(' | ')}\nText: ${page.text}`).join('\n\n')}`,
  ].join('\n\n');

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: (typeof process !== 'undefined' ? process.env?.OPENAI_AUDIT_MODEL : undefined) ?? import.meta.env.OPENAI_AUDIT_MODEL ?? 'gpt-4o-mini',
        input: prompt,
        max_output_tokens: 2200,
      }),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.warn(`[ai-audit] OpenAI ${response.status}: ${body.slice(0, 300)}`);
      return fallback;
    }
    const data = await response.json();
    const parsed = safeJsonParse(openAIResponseText(data));
    if (!parsed) {
      console.warn('[ai-audit] could not parse LLM JSON response — using deterministic fallback');
      return fallback;
    }
    return normalizeLlmReport(parsed, fallback) ?? fallback;
  } catch (error) {
    console.warn(`[ai-audit] LLM call failed: ${error instanceof Error ? error.message : String(error)}`);
    return fallback;
  }
}

export async function runAudit(input: AuditInput): Promise<AuditReport> {
  const normalizedInput = {
    ...input,
    goal: input.goal?.trim() || 'create first project',
    productType: input.productType?.trim() || '',
    docsUrl: input.docsUrl?.trim() || '',
  };
  const cacheKey = JSON.stringify({
    url: normalizeAuditUrl(normalizedInput.url).toString(),
    goal: normalizedInput.goal,
    productType: normalizedInput.productType,
    docsUrl: normalizedInput.docsUrl,
  });
  const cached = reportCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.report;
  }
  const pages = await crawlPublicContent(normalizedInput);
  const fallback = fallbackReport(normalizedInput, pages);
  const report = await llmReport(normalizedInput, pages, fallback);
  reportCache.set(cacheKey, { report, expiresAt: Date.now() + CACHE_TTL_MS });
  return report;
}

export function buildStudioPrefillUrl(report: Pick<AuditReport, 'skillPreview' | 'shareUrl'>, input: AuditInput): string {
  const params = new URLSearchParams({
    utm_source: 'tryskilly-web',
    utm_medium: 'free-tool',
    utm_campaign: 'ai-onboarding-audit',
    audit_url: input.url,
    activation_goal: input.goal,
    audit_share: report.shareUrl,
    prefill_skill: report.skillPreview.slice(0, 7000),
  });
  if (input.productType) params.set('product_type', input.productType);
  if (input.email) params.set('email', input.email);
  return `https://studio.tryskilly.app/signup?${params.toString()}`;
}
