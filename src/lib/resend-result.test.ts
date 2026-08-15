import { describe, expect, test } from 'bun:test';
import { resendAccepted, resendFailureMessage } from './resend-result';

describe('Resend result handling', () => {
  test('accepts only responses with a message ID and no provider error', () => {
    expect(resendAccepted({ data: { id: 'email_123' }, error: null })).toBe(true);
    expect(resendAccepted({ data: null, error: null })).toBe(false);
    expect(resendAccepted({ data: null, error: { message: 'Rejected' } })).toBe(false);
  });

  test('returns a safe fallback when the provider omits an error', () => {
    expect(resendFailureMessage({ data: null, error: null })).toContain('message ID');
  });
});
