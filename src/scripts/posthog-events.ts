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
    };
  }
}

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

  window.posthog?.capture(eventName, props);
});
