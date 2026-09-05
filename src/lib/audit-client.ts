export type ScoreKey = 'Activation clarity' | 'CTA clarity' | 'Help availability' | 'Docs friction' | 'AI-guidability';

export interface AuditReport {
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

export interface AuditRequestInput {
  url: string;
  goal: string;
  type: string;
  docsUrl: string;
  email: string;
}

export async function requestAuditReport(input: AuditRequestInput, request: (url: string, init: RequestInit) => Promise<Response> = fetch): Promise<AuditReport> {
  let response: Response;
  try {
    // Astro's trailingSlash setting emits API functions at the slash-terminated
    // path. POST requests cannot follow the platform's slash redirect safely,
    // so call the deployed function route directly.
    response = await request('/api/ai-onboarding-audit/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error('The audit could not connect. Please try again. No report was generated.');
  }
  if (!response.ok) {
    throw new Error(response.status === 429
      ? 'Too many audits from this network. Please try again in a few minutes.'
      : 'We could not audit that page. Check that the URL is public, then try again.');
  }
  let report: AuditReport;
  try {
    report = await response.json();
  } catch {
    throw new Error('The audit returned an unreadable report. Please try again.');
  }
  if (!report || typeof report.skillPreview !== 'string' || !report.skillPreview.trim()
      || typeof report.product !== 'string' || typeof report.band !== 'string'
      || !Number.isFinite(report.score) || !report.scores || !Array.isArray(report.gaps)) {
    throw new Error('The audit returned an incomplete report. Please try again.');
  }
  return report;
}
