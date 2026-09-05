export interface ResendResultLike {
  data?: { id?: string } | null;
  error?: { name?: string; message?: string; statusCode?: number | null } | null;
}

export function resendAccepted(result: ResendResultLike): result is ResendResultLike & { data: { id: string } } {
  return !result.error && typeof result.data?.id === 'string' && result.data.id.length > 0;
}

export function resendFailureMessage(result: ResendResultLike): string {
  return result.error?.message || 'Email provider did not return an accepted message ID.';
}
