// Claims on /privacy-first/ and the homepage privacy snapshot.
// Each one is something the tryskilly/skilly source shows. Line links are
// permalinks to main. Do not add a claim that is not in this list.

const repo = 'https://github.com/tryskilly/skilly/blob/main';

export interface PrivacySource {
  label: string;
  href: string;
}

export interface PrivacyFact {
  id: string;
  title: string;
  /** One sentence for the homepage snapshot. */
  summary: string;
  /** Fuller wording for /privacy-first/. */
  detail: string;
  sources: PrivacySource[];
}

export const privacyFacts: PrivacyFact[] = [
  {
    id: 'screen',
    title: 'Screen',
    summary: 'A JPEG of your displays when you ask. Not a continuous recording.',
    detail:
      'ScreenCaptureKit takes a JPEG of every connected display when you start push-to-talk, submit a typed question, or when Live Tutor hears you start speaking. The helper returns that image data in memory, and the app sends it on the Realtime connection. The capture code does not write those JPEGs to disk.',
    sources: [
      {
        label: 'CompanionScreenCaptureUtility.swift',
        href: `${repo}/leanring-buddy/CompanionScreenCaptureUtility.swift#L27-L30`,
      },
      {
        label: 'Push-to-talk capture',
        href: `${repo}/leanring-buddy/CompanionManager.swift#L1480-L1482`,
      },
      {
        label: 'Typed-question capture',
        href: `${repo}/leanring-buddy/CompanionManager.swift#L1307`,
      },
      {
        label: 'Live Tutor capture',
        href: `${repo}/leanring-buddy/CompanionManager.swift#L1863-L1903`,
      },
    ],
  },
  {
    id: 'voice',
    title: 'Voice',
    summary: 'The mic is on while you hold push-to-talk. Live Tutor, if you turn it on, listens until it sleeps.',
    detail:
      'The default mode is push-to-talk. That press installs a microphone tap and sends audio for the turn. Live Tutor is optional. While it is on, the mic streams to the Realtime session, and the feed is skipped while Skilly is speaking. It sleeps after 5 minutes of silence unless you change that. The code does not show your microphone audio being saved as a file.',
    sources: [
      {
        label: 'Default is push-to-talk',
        href: `${repo}/leanring-buddy/AppSettings.swift#L157-L159`,
      },
      {
        label: 'voiceInputMode default',
        href: `${repo}/leanring-buddy/AppSettings.swift#L228-L231`,
      },
      {
        label: 'Push-to-talk microphone tap',
        href: `${repo}/leanring-buddy/CompanionManager.swift#L1508-L1514`,
      },
      {
        label: 'Live Tutor microphone stream',
        href: `${repo}/leanring-buddy/CompanionManager.swift#L1618-L1633`,
      },
    ],
  },
  {
    id: 'destination',
    title: 'Where it goes',
    summary: 'Hosted sessions ask studio.tryskilly.app for a short-lived token, then voice and screenshots go to OpenAI. Your own key talks to OpenAI directly.',
    detail:
      'Without your own key, the app requests a token from https://studio.tryskilly.app/api/mac/openai/token using the Keychain session. That route checks the session and mints a short-lived Realtime client secret with Skilly’s server key. The app then opens wss://api.openai.com/v1/realtime and sends the audio and screenshots there. With a saved key, the app skips that relay and POSTs https://api.openai.com/v1/realtime/client_secrets itself, then uses the same websocket. The hosted OpenAI key stays on the server.',
    sources: [
      {
        label: 'Hosted token vs your key',
        href: `${repo}/leanring-buddy/OpenAIRealtimeClient.swift#L158-L171`,
      },
      {
        label: 'Direct client_secrets call',
        href: `${repo}/leanring-buddy/OpenAIRealtimeClient.swift#L308-L310`,
      },
      {
        label: 'Realtime websocket',
        href: `${repo}/leanring-buddy/OpenAIRealtimeClient.swift#L115`,
      },
      {
        label: 'Studio token route',
        href: `${repo}/apps/web-backend/src/app/api/mac/openai/token/route.ts#L1-L52`,
      },
    ],
  },
  {
    id: 'stored',
    title: 'What stays on your Mac',
    summary: 'A saved OpenAI key lives in UserDefaults. Sign-in tokens live in Keychain. Transcripts and Skilly’s spoken replies stay in Application Support.',
    detail:
      'If you paste an OpenAI key, the app stores it in UserDefaults. The comment in that setting says it is plaintext on disk. It is not the Keychain item. Keychain holds the sign-in tokens (access, refresh, worker session, and user profile), marked ThisDeviceOnly. Completed turns are written under Application Support/skilly/conversation-history: the transcript text and, when present, the assistant’s PCM audio. That store keeps up to 100 turns and can be cleared. Installed skills and progress live in ~/.skilly.',
    sources: [
      {
        label: 'OpenAI key in UserDefaults',
        href: `${repo}/leanring-buddy/AppSettings.swift#L42-L47`,
      },
      {
        label: 'Keychain, this device only',
        href: `${repo}/leanring-buddy/AuthManager.swift#L367-L373`,
      },
      {
        label: 'Local conversation history',
        href: `${repo}/leanring-buddy/ConversationHistoryStore.swift#L6-L7`,
      },
      {
        label: 'Application Support path and 100-turn cap',
        href: `${repo}/leanring-buddy/ConversationHistoryStore.swift#L66-L78`,
      },
      {
        label: 'Skills directory',
        href: `${repo}/leanring-buddy/SkillStore.swift#L82-L86`,
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    summary: 'On unless you turn it off. Events can include your email. They do not include the transcript text.',
    detail:
      'PostHog runs when analyticsEnabled is on, which is the default. On sign-in, identify sends the WorkOS user id, email, and name. A sent message is recorded as a character count, not the words. Turn stats send token counts, durations, and a cost figure, not the transcript. The app also stores a beta_terms_consent flag. The turn-stat capture function checks analyticsEnabled. It does not read that consent flag.',
    sources: [
      {
        label: 'analyticsEnabled defaults on',
        href: `${repo}/leanring-buddy/AppSettings.swift#L197-L199`,
      },
      {
        label: 'identify sends email and name',
        href: `${repo}/leanring-buddy/SkillyAnalytics.swift#L34-L48`,
      },
      {
        label: 'Transcript text stays out of the event',
        href: `${repo}/leanring-buddy/SkillyAnalytics.swift#L199-L204`,
      },
      {
        label: 'Turn stats, not the transcript',
        href: `${repo}/leanring-buddy/SkillyAnalytics.swift#L308-L326`,
      },
      {
        label: 'beta_terms_consent is stored',
        href: `${repo}/leanring-buddy/AppSettings.swift#L68-L73`,
      },
    ],
  },
  {
    id: 'license',
    title: 'Open source',
    summary: 'The Mac app is open source under the Apache License 2.0.',
    detail:
      'The repository root contains an Apache License 2.0 text. That is the license on the project.',
    sources: [
      {
        label: 'LICENSE',
        href: `${repo}/LICENSE`,
      },
    ],
  },
];

export const privacyPage = {
  title: 'How Skilly Handles Your Screen, Voice and Data',
  description:
    'Skilly takes a screen JPEG when you ask, sends voice to OpenAI, and is Apache-2.0 open source. Your own key is $5/month plus your OpenAI usage.',
};
