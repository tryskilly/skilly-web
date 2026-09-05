import { describe, expect, test } from 'bun:test';
import { requestAuditReport } from '../src/lib/audit-client';

const input = { url: 'https://example.com', goal: 'connect data', type: '', docsUrl: '', email: '' };
const report = {
  product: 'Example', title: 'Example audit', score: 60, band: 'Needs work',
  scores: { 'Activation clarity': 12, 'CTA clarity': 12, 'Help availability': 12, 'Docs friction': 12, 'AI-guidability': 12 },
  gaps: ['Explain the next action'], skillPreview: '## Teaching Instructions\nHelp connect data.',
};
const respond = (response: Response) => async () => response;

describe('audit request', () => {
  test('posts to the slash-terminated Astro API route', async () => {
    let requestedUrl = '';
    const request = async (url: string) => {
      requestedUrl = url;
      return Response.json(report);
    };
    await requestAuditReport(input, request);
    expect(requestedUrl).toBe('/api/ai-onboarding-audit/');
  });

  test('returns the server report without manufacturing a score', async () => {
    expect(await requestAuditReport(input, respond(Response.json(report)))).toEqual(report);
  });

  test('preserves a retryable rate-limit error instead of reporting success', async () => {
    await expect(requestAuditReport(input, respond(Response.json({ error: 'limited' }, { status: 429 }))))
      .rejects.toThrow('Too many audits');
  });

  test('does not replace crawler failure with a synthetic report', async () => {
    await expect(requestAuditReport(input, respond(Response.json({ error: 'unreachable' }, { status: 422 }))))
      .rejects.toThrow('could not audit');
  });

  test('reports network failure without inventing a report', async () => {
    const offline = async () => { throw new TypeError('network failed'); };
    await expect(requestAuditReport(input, offline)).rejects.toThrow('No report was generated');
  });

  test('rejects unreadable and incomplete success responses', async () => {
    await expect(requestAuditReport(input, respond(new Response('<html>error</html>')))).rejects.toThrow('unreadable');
    await expect(requestAuditReport(input, respond(Response.json({ score: 70 })))).rejects.toThrow('incomplete');
  });
});
