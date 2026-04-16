// src/data/feature-details.ts
//
// Rich, marketing-ready feature catalog for Skilly, grounded in the actual
// macOS app codebase. Use this on any marketing surface that needs more than
// the 6-tile hero grid in `features.ts` — e.g. landing page long-form
// sections, pricing page "what you get", comparison grids, email sequences,
// ad copy, SEO landing pages, and app store copy.
//
// Every entry has:
//   - `headline`: ≤45 char punchy title (nav, ad headlines, hero bullets)
//   - `oneLiner`: ≤120 char single sentence (feature grid, email subject)
//   - `body`:     1–2 sentence elaboration (feature card, landing section)
//   - `technicalProof`: optional technical detail for power users / SEO
//   - `keywords`: optional array for SEO / programmatic SEO pages
//
// The catalog is organized by `category` so you can filter sections per page.

export type FeatureCategory =
  | 'screen-awareness'
  | 'voice-interaction'
  | 'teaching-skills'
  | 'interaction-modes'
  | 'privacy-security'
  | 'platform';

export interface FeatureDetail {
  id: string;
  category: FeatureCategory;
  headline: string;
  oneLiner: string;
  body: string;
  technicalProof?: string;
  keywords?: string[];
}

export const featureCategories: Record<FeatureCategory, { label: string; tagline: string }> = {
  'screen-awareness': {
    label: 'Screen awareness',
    tagline: 'Skilly sees exactly what you see, on every monitor.',
  },
  'voice-interaction': {
    label: 'Voice interaction',
    tagline: 'Talk to it. It talks back. Sub-second latency.',
  },
  'teaching-skills': {
    label: 'Teaching skills',
    tagline: 'Domain-specific tutors for the apps you actually use.',
  },
  'interaction-modes': {
    label: 'Interaction modes',
    tagline: 'Hands-free, push-to-talk, or out of the way entirely.',
  },
  'privacy-security': {
    label: 'Privacy & security',
    tagline: 'Your screen stays yours. Your API keys never ship.',
  },
  'platform': {
    label: 'Platform',
    tagline: 'Native macOS. Menu bar only. Lives where it belongs.',
  },
};

export const detailedFeatures: FeatureDetail[] = [
  // ─── Screen awareness ──────────────────────────────────────────────────
  {
    id: 'cursor-points-at-ui',
    category: 'screen-awareness',
    headline: 'A cursor that physically points',
    oneLiner: 'A blue cursor flies across your screen and lands on the exact button, menu, or slider the AI is talking about.',
    body: 'No more "see that little icon in the top-right corner?" Skilly parses its own response, finds the coordinates on whichever monitor the element lives on, and animates there along a bezier arc.',
    technicalProof: 'Custom overlay window per display. Multi-monitor coordinate mapping with edge-proximity suppression so the cursor never flies somewhere suspicious. Runs at 60 fps via a transparent NSWindow that joins all Spaces.',
    keywords: ['ai cursor', 'screen pointer', 'ui element pointing', 'visual tutor'],
  },
  {
    id: 'multi-monitor-vision',
    category: 'screen-awareness',
    headline: 'Sees all your monitors',
    oneLiner: 'Screen-aware across every connected display — no matter where you dragged the Blender viewport.',
    body: 'Skilly captures every monitor the moment you ask a question, filters out its own windows, and sends the correct one to the model based on where your cursor is.',
    technicalProof: 'ScreenCaptureKit on macOS 14.2+. Displays are sorted by cursor position so the active screen is evaluated first. Skilly\'s own overlay windows are filtered out of every capture.',
    keywords: ['multi-monitor', 'screen capture', 'screencapturekit'],
  },
  {
    id: 'element-vocabulary',
    category: 'screen-awareness',
    headline: 'Speaks your app\'s language',
    oneLiner: 'Skilly knows what the "dope sheet" is in Blender and the "pen tool" in Figma. No translation layer.',
    body: 'Every teaching skill ships with a UI vocabulary map — so when the model says "click the keyframe diamond", you know exactly which pixel it means and so does the cursor.',
    keywords: ['ui vocabulary', 'domain specific ai', 'creative software tutor'],
  },

  // ─── Voice interaction ─────────────────────────────────────────────────
  {
    id: 'realtime-voice-pipeline',
    category: 'voice-interaction',
    headline: 'Sub-second voice conversations',
    oneLiner: 'One live WebSocket handles speech in, vision, thinking, and speech out. No pipeline relay.',
    body: 'Most AI voice apps chain three services: speech-to-text, LLM, text-to-speech. Skilly collapses all of it into a single connection to OpenAI Realtime, which is why it feels instant instead of awkward.',
    technicalProof: 'Single WebSocket to OpenAI gpt-realtime. PCM16 audio streaming at 16 kHz in / 24 kHz out. No intermediate transcription step visible to the user.',
    keywords: ['voice ai', 'realtime voice', 'low latency ai', 'openai realtime'],
  },
  {
    id: 'live-tutor-mode',
    category: 'voice-interaction',
    headline: 'Live Tutor: always-on listening',
    oneLiner: 'Turn on Live Tutor and just start talking — no hotkey, no button, nothing to remember.',
    body: 'Live Tutor uses server-side voice activity detection so Skilly knows when you\'re asking and when you\'re thinking out loud. Ideal when your hands are already in Blender or After Effects.',
    technicalProof: 'Server-side VAD via the OpenAI Realtime session config. No microphone recording happens locally — audio only streams while the session is live.',
    keywords: ['always on ai', 'voice activated tutor', 'hands free learning'],
  },
  {
    id: 'push-to-talk',
    category: 'voice-interaction',
    headline: 'Push-to-talk that never drops a key',
    oneLiner: 'Hold ⌃⌥ (or any combo you pick) and ask. Release and Skilly answers. Works system-wide.',
    body: 'A rock-solid shortcut capture that doesn\'t miss modifier-based combos, even with another full-screen app in front. No menu bar click required.',
    technicalProof: 'Listen-only CGEvent tap instead of an AppKit global monitor — more reliable for modifier-heavy shortcuts while the app runs in the background.',
    keywords: ['push to talk', 'global hotkey', 'keyboard shortcut ai'],
  },

  // ─── Teaching skills ───────────────────────────────────────────────────
  {
    id: 'bundled-skills',
    category: 'teaching-skills',
    headline: '5 expert skills out of the box',
    oneLiner: 'Blender Fundamentals, After Effects Basics, Premiere Pro, DaVinci Resolve, Figma — all included.',
    body: 'Each skill is a curriculum written from the app\'s official docs, not scraped from forums. Install Skilly and you can start learning any of them immediately — no extra downloads.',
    keywords: ['blender tutor', 'after effects tutor', 'figma tutor', 'premiere pro tutor', 'davinci resolve tutor'],
  },
  {
    id: 'curriculum-engine',
    category: 'teaching-skills',
    headline: 'A curriculum that tracks your progress',
    oneLiner: 'Stages, goals, and completion signals — so Skilly knows what you\'ve learned and what\'s next.',
    body: 'No quizzes, no gates. The engine watches your conversation for completion signals and quietly advances the curriculum when you\'re ready. Move back, reset, or jump around whenever you want.',
    technicalProof: 'Pure-function curriculum engine with a signal buffer, auto-advance after 3 confirmed signals, and manual override. Progress is persisted per skill per user.',
    keywords: ['curriculum ai', 'adaptive learning', 'skill tracking'],
  },
  {
    id: 'custom-skills',
    category: 'teaching-skills',
    headline: 'Drop in your own skills',
    oneLiner: 'A skill is a SKILL.md file. Drag it onto the menu bar panel and it\'s installed.',
    body: 'Build a skill for your internal tool, your design system, or your favorite obscure CAD app. Safety-scanned at install time, token-budgeted at runtime.',
    technicalProof: 'YAML frontmatter + H2/H3 parsed markdown body. 6K token ceiling with progressive vocabulary trimming. Banned-phrase scanner catches prompt injection attempts before install.',
    keywords: ['custom ai skills', 'markdown skills', 'extensible ai tutor'],
  },
  {
    id: 'auto-activation',
    category: 'teaching-skills',
    headline: 'Activates the right skill automatically',
    oneLiner: 'Switch to Blender and Skilly becomes a Blender tutor. Switch to Figma and it becomes a Figma tutor.',
    body: 'Skilly watches which app is frontmost and pairs it with the matching installed skill, so you never have to manually change modes.',
    technicalProof: 'NSWorkspace frontmost-app monitoring by bundle ID. Auto-activation is opt-in per skill in the config.',
    keywords: ['context aware ai', 'auto switching tutor'],
  },

  // ─── Interaction modes ─────────────────────────────────────────────────
  {
    id: 'transient-overlay',
    category: 'interaction-modes',
    headline: 'Out of the way until you need it',
    oneLiner: 'Transient mode fades the cursor in only when you ask and fades it out 1 second after Skilly finishes.',
    body: 'You don\'t want a floating assistant cursor while you\'re color-grading. Transient mode makes Skilly completely invisible between interactions.',
    keywords: ['unobtrusive ai', 'minimal ui ai'],
  },
  {
    id: 'languages-voices',
    category: 'interaction-modes',
    headline: '16 languages, 8 voices',
    oneLiner: 'Pick your language and voice, or let Skilly auto-detect what you speak.',
    body: 'Teaching works in your native language, not just English. Pick a voice you enjoy listening to for hours — or swap mid-session.',
    keywords: ['multilingual ai', 'ai voice options', 'international ai tutor'],
  },
  {
    id: 'per-skill-pointing',
    category: 'interaction-modes',
    headline: 'Pointing mode per skill',
    oneLiner: 'Some apps reward a physical pointer. Others don\'t. Every skill gets its own pointing policy.',
    body: 'Skills can declare when the cursor should fly to elements — always, only on request, or never. Default is smart and unobtrusive.',
    keywords: ['configurable ai', 'pointing mode'],
  },

  // ─── Privacy & security ────────────────────────────────────────────────
  {
    id: 'no-retention',
    category: 'privacy-security',
    headline: 'Your screen is not training data',
    oneLiner: 'OpenAI is contractually blocked from training on your Skilly sessions. Nothing is retained after the conversation ends.',
    body: 'Audio and screen context stream directly to the model for a single live session, then evaporate. Analytics never sees your transcripts — only character counts.',
    technicalProof: 'Privacy-first analytics logs only `character_count`, never the text itself. Session content is not persisted locally and is not retained by OpenAI.',
    keywords: ['privacy first ai', 'no retention ai', 'gdpr ai tutor'],
  },
  {
    id: 'keys-on-proxy',
    category: 'privacy-security',
    headline: 'Zero API keys in the binary',
    oneLiner: 'Every external API goes through a Cloudflare Worker proxy. The Skilly app you download has no secrets inside it.',
    body: 'If someone pulls apart the binary, they find nothing. Keys live as encrypted Cloudflare secrets and the app fetches short-lived tokens as needed.',
    technicalProof: 'Cloudflare Worker proxy for OpenAI, WorkOS, Polar. Short-lived Realtime client secrets minted per session. WorkOS-signed session tokens are scoped to the user.',
    keywords: ['secure ai app', 'no embedded api keys', 'cloudflare proxy'],
  },
  {
    id: 'keychain-this-device-only',
    category: 'privacy-security',
    headline: 'Tokens stay on this device',
    oneLiner: 'Your login tokens are stored with `ThisDeviceOnly` keychain access — they can\'t migrate to another Mac, even via iCloud.',
    body: 'Even if you sync your whole Mac to a backup, the Skilly auth tokens don\'t come with it. You sign in again on every device, deliberately.',
    technicalProof: 'kSecAttrAccessibleWhenUnlockedThisDeviceOnly on all stored tokens. Refresh tokens are rotated on every use.',
    keywords: ['keychain security', 'device bound auth'],
  },

  // ─── Platform ──────────────────────────────────────────────────────────
  {
    id: 'menu-bar-native',
    category: 'platform',
    headline: 'Menu bar only. No dock icon.',
    oneLiner: 'No floating windows, no dock clutter, no cmd-tab surprises. Just a quiet icon in your menu bar.',
    body: 'Built as a pure menu bar app (`LSUIElement`). Click the icon, a panel drops down. Click outside, it goes away. That\'s it.',
    technicalProof: 'Custom borderless NSPanel hosted on NSStatusItem. Non-activating so it never steals focus from your real work.',
    keywords: ['menu bar app', 'macos native', 'minimal ai app'],
  },
  {
    id: 'auto-updates-sparkle',
    category: 'platform',
    headline: 'Updates itself quietly',
    oneLiner: 'Signed auto-updates via Sparkle. You don\'t check for new versions — they arrive.',
    body: 'Skilly ships new features and fixes through the same auto-update framework used by every good indie Mac app. Cryptographically signed so only real Skilly updates install.',
    technicalProof: 'Sparkle with EdDSA signing. Updates delivered via an appcast on GitHub Releases.',
    keywords: ['auto updates', 'sparkle framework'],
  },
  {
    id: 'free-trial-pricing',
    category: 'platform',
    headline: '15 minutes free. No credit card.',
    oneLiner: 'Try Skilly for a full 15 minutes without a card. After that, $19/month gets you 3 hours of tutoring.',
    body: 'One lifetime free trial, not a seven-day clock. Subscribe only if the teaching actually clicked for you — and cancel any time, keep your access to the end of the period.',
    technicalProof: 'WorkOS AuthKit for sign-in. Polar for billing. Entitlements synced through a Cloudflare KV store. Cap resets on period boundaries, not rolling windows.',
    keywords: ['free trial ai', 'no credit card', 'ai tutor pricing'],
  },
];
