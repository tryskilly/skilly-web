// src/scripts/posthog-events.ts
// Delegated click handler that reads data-ph-event and data-ph-prop-* attributes
// and forwards them as PostHog capture() calls.
//
// Usage in markup:
//   <a data-ph-event="web_cta_download_clicked" data-ph-prop-location="nav">Download</a>
//
// All data-ph-prop-* attributes become event properties (with the prefix stripped
// and the camelCase preserved as lowercase).

export {};

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
      register: (props: Record<string, unknown>) => void;
      init: (key: string, config: Record<string, unknown>) => void;
      identify: (distinctId: string, userProperties?: Record<string, unknown>) => void;
    };
    gtag?: (...args: unknown[]) => void;
    skillyTrack?: (event: string, props?: Record<string, unknown>) => void;
  }
}

function gaSafeProperties(props: Record<string, unknown>): Record<string, unknown> {
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    const normalized = key.toLowerCase();
    if (key.startsWith('$')) continue;
    if (normalized.includes('email')) continue;
    if (normalized.includes('name')) continue;
    if (normalized.includes('phone')) continue;
    safe[key] = value;
  }
  return safe;
}

window.skillyTrack = (event, props = {}) => {
  const safeProps = {
    source: 'web',
    source_surface: 'marketing_site',
    ...props,
  };
  window.posthog?.capture(event, safeProps);
  window.gtag?.('event', event, gaSafeProperties(safeProps));
};

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const el = target.closest<HTMLElement>('[data-ph-event]');
  if (!el) return;

  const eventName = el.dataset.phEvent;
  if (!eventName) return;

  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    if (key.startsWith('phProp') && value !== undefined) {
      // phPropLocation -> location
      const propKey = key.slice('phProp'.length).toLowerCase();
      props[propKey] = value;
    }
  }

  window.skillyTrack?.(eventName, props);
});
