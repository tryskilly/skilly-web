export type SeoLandingPage = {
  slug: string;
  group: 'use-cases' | 'for';
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  ctaCampaign: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  bullets: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    group: 'use-cases',
    slug: 'voice-onboarding',
    eyebrow: 'Use case',
    title: 'Voice onboarding for SaaS products - Skilly for Builders',
    description:
      'Add voice onboarding to your SaaS product so users can ask what to do next and get a spoken answer plus cursor guidance.',
    h1: 'Voice onboarding that shows users what to do next',
    intro:
      'Most onboarding asks users to read. Skilly lets them ask out loud. It answers from your product content and points to the exact button, setting, or next step.',
    ctaCampaign: 'voice-onboarding',
    sections: [
      { heading: 'Why voice changes onboarding', body: 'Users ask messy, specific questions. A fixed tooltip sequence cannot cover every path. Voice onboarding lets the user say the problem in their own words and get guidance in the moment.' },
      { heading: 'Where it fits', body: 'Use Skilly for setup flows, first-run checklists, admin panels, dashboards, editor tools, and any product surface where users ask "where is this?" or "what do I do next?"' },
      { heading: 'How Skilly guides', body: 'Studio turns your docs, website, and notes into an editable product skill. The widget runs on allowed domains, listens during a session, answers out loud, and points users at the right control.' },
    ],
    bullets: ['User asks in natural language', 'Voice answer grounded in your content', 'Cursor points to the UI element', 'One script tag and domain lock', 'Usage-based pricing from $29/month'],
    faqs: [
      { question: 'What is voice onboarding?', answer: 'Voice onboarding lets a user ask questions out loud while using a product. Instead of reading a fixed tour, the user gets contextual spoken guidance for the task they are trying to finish.' },
      { question: 'Is voice onboarding better than tooltips?', answer: 'It is better for open-ended confusion. Tooltips are useful for known flows; voice onboarding helps when the user does not know which flow they need.' },
      { question: 'Does Skilly replace documentation?', answer: 'No. Skilly uses your documentation as source material, then turns it into live guidance inside the product.' },
    ],
  },
  {
    group: 'use-cases',
    slug: 'ai-product-tours',
    eyebrow: 'Use case',
    title: 'AI product tours that answer questions - Skilly for Builders',
    description:
      'Use Skilly as an AI product tour layer that answers open-ended user questions and points them to the next click.',
    h1: 'AI product tours for users who do not follow scripts',
    intro:
      'Traditional product tours assume everyone needs the same sequence. Skilly handles the real onboarding moment: a user asks a specific question and needs the next click now.',
    ctaCampaign: 'ai-product-tours',
    sections: [
      { heading: 'Beyond fixed tours', body: 'A fixed tour can teach one happy path. An AI product tour can respond to the actual question, whether the user is configuring a workspace, inviting a teammate, or looking for an advanced setting.' },
      { heading: 'Built from your product knowledge', body: 'Teach Skilly from your site, docs, and notes. The generated skill stays editable, so product teams can control wording, supported flows, and allowed surfaces.' },
      { heading: 'Designed for activation', body: 'Skilly is best for activation tasks where the user needs to do something in the UI, not just read a message.' },
    ],
    bullets: ['Open-ended user questions', 'Spoken answers', 'Pointer guidance to the right element', 'Editable skill markdown', 'Works alongside existing tours'],
    faqs: [
      { question: 'Is Skilly a product tour builder?', answer: 'Skilly is not a traditional modal tour builder. It is an AI guide that can walk users through tasks when they ask for help.' },
      { question: 'Can Skilly work with existing tours?', answer: 'Yes. You can keep proactive tours for known moments and add Skilly for reactive help when users get stuck.' },
      { question: 'What content does Skilly need?', answer: 'Start with your public pages, docs, help center, or internal notes. Studio drafts a skill that you can edit before publishing.' },
    ],
  },
  {
    group: 'use-cases',
    slug: 'reduce-support-tickets',
    eyebrow: 'Use case',
    title: 'Reduce support tickets caused by product confusion - Skilly',
    description:
      'Use Skilly to deflect repetitive support tickets where users only need to know where to click or how to finish setup.',
    h1: 'Reduce the support tickets that should have been onboarding',
    intro:
      'Some tickets are not support problems. They are guidance problems. Skilly helps users finish the task before they open a chat.',
    ctaCampaign: 'reduce-support-tickets',
    sections: [
      { heading: 'The right tickets to deflect', body: 'Skilly is best for "where do I click?", "how do I configure this?", and "what does this setting do?" questions. Keep account-specific, billing, security, and incident issues in your help desk.' },
      { heading: 'Why users still ask support', body: 'Docs are useful, but users often do not know the right words to search. Skilly lets them describe the problem in plain language while staying in the product.' },
      { heading: 'Measure the impact', body: 'Track product pageviews, Studio signups, widget interactions, and downstream support-ticket categories to see whether repetitive onboarding questions go down.' },
    ],
    bullets: ['Deflect repetitive UI questions', 'Guide setup and configuration', 'Keep sensitive account issues in support', 'Use PostHog events for funnel monitoring', 'Improve activation and support load together'],
    faqs: [
      { question: 'Can Skilly replace a support team?', answer: 'No. Skilly reduces a narrow class of product-confusion tickets. Support teams still need to handle account-specific, billing, security, and edge-case questions.' },
      { question: 'Which tickets should we target first?', answer: 'Start with high-volume questions where the answer is a product action: invite a teammate, configure a setting, find a report, connect an integration, or publish a workflow.' },
      { question: 'How should we measure support reduction?', answer: 'Compare the volume of targeted ticket categories before and after launch, and monitor whether users who engage Skilly complete the relevant activation event more often.' },
    ],
  },
  {
    group: 'use-cases',
    slug: 'in-app-guidance-for-saas',
    eyebrow: 'Use case',
    title: 'In-app guidance for SaaS products - voice and pointer help',
    description:
      'Add in-app guidance to your SaaS product with a voice assistant that answers from your content and points users to the right UI.',
    h1: 'In-app guidance for SaaS users who are already stuck',
    intro:
      'Skilly gives your SaaS product a guide users can talk to. It is for setup, feature discovery, workflow education, and the confusing moments that slow activation.',
    ctaCampaign: 'in-app-guidance-for-saas',
    sections: [
      { heading: 'What in-app guidance should do', body: 'Good guidance helps users complete the job they came to do. Skilly focuses on direct answers and next-click help rather than decorative onboarding overlays.' },
      { heading: 'Where to install it', body: 'Install on the pages where confusion turns into churn: onboarding, billing setup, integrations, dashboards, editors, workspace settings, and admin workflows.' },
      { heading: 'How it stays controlled', body: 'Projects are domain-locked, configured in Studio, and taught from editable content so teams can keep guidance aligned with the product.' },
    ],
    bullets: ['Embedded web widget', 'Allowed-domain controls', 'Product-specific skill content', 'Voice answers plus pointer guidance', 'Best for activation and retention workflows'],
    faqs: [
      { question: 'What is in-app guidance?', answer: 'In-app guidance is help delivered inside the product interface while the user is trying to complete a task.' },
      { question: 'How is Skilly different from a tooltip?', answer: 'A tooltip waits on a predefined element. Skilly lets the user ask a question first, then guides them to the relevant element.' },
      { question: 'Can Skilly be limited to certain domains?', answer: 'Yes. Studio projects are designed around allowed domains so the widget runs only where you approve it.' },
    ],
  },
  {
    group: 'for',
    slug: 'devtools',
    eyebrow: 'Persona',
    title: 'Voice onboarding for developer tools - Skilly for Builders',
    description:
      'Help developers configure API keys, webhooks, environments, and settings with a voice guide embedded in your devtool.',
    h1: 'Voice guidance for developer tools with complex setup',
    intro:
      'Developer tools often lose users in setup: API keys, webhooks, SDK choices, environments, permissions, and dashboards. Skilly helps users ask the next question and get pointed to the right place.',
    ctaCampaign: 'for-devtools',
    sections: [
      { heading: 'Where devtool users get stuck', body: 'Users may understand the concept but still miss the exact setting, integration page, or required sequence. Skilly guides the UI layer without replacing your docs.' },
      { heading: 'What to teach Skilly', body: 'Start with quickstarts, API docs, integration guides, troubleshooting notes, and UI labels from your dashboard.' },
      { heading: 'Best workflows', body: 'API-key creation, webhook setup, environment switching, team invites, billing setup, SDK install choices, and first successful request.' },
    ],
    bullets: ['Guide setup without hiding docs', 'Answer from quickstarts and integration guides', 'Point to dashboard controls', 'Reduce repetitive onboarding tickets', 'Support technical and nontechnical operators'],
    faqs: [
      { question: 'Can Skilly understand API documentation?', answer: 'Skilly can be taught from API docs and quickstarts, then use that content to explain setup steps inside your product.' },
      { question: 'Should Skilly give code advice?', answer: 'Use it for guided onboarding and documentation-grounded answers. Keep production debugging and security-sensitive implementation decisions in your support or developer-success process.' },
      { question: 'What devtool pages should include Skilly first?', answer: 'Start with onboarding, API keys, integrations, webhook setup, logs, environments, and team settings.' },
    ],
  },
  {
    group: 'for',
    slug: 'ai-saas',
    eyebrow: 'Persona',
    title: 'Voice onboarding for AI SaaS products - Skilly',
    description:
      'Guide AI SaaS users through prompts, setup, workspaces, integrations, and model settings with embedded voice help.',
    h1: 'Help AI SaaS users understand what to do next',
    intro:
      'AI SaaS products often combine new workflows, unfamiliar settings, and abstract value. Skilly gives users a product-aware guide they can ask out loud.',
    ctaCampaign: 'for-ai-saas',
    sections: [
      { heading: 'Why AI products need guidance', body: 'Users may not know what to prompt, which workflow to choose, or how to connect their data. A generic chatbot cannot point at your exact setup path.' },
      { heading: 'What Skilly can explain', body: 'Teach it onboarding docs, prompt examples, model limits, workspace setup, integrations, and feature descriptions.' },
      { heading: 'Where it helps most', body: 'First project creation, prompt setup, data connection, workspace configuration, usage limits, and result interpretation.' },
    ],
    bullets: ['Explain unfamiliar AI workflows', 'Guide prompt and project setup', 'Point users to settings and integrations', 'Answer from your own product content', 'Help users reach first value faster'],
    faqs: [
      { question: 'Is Skilly another AI chatbot?', answer: 'No. Skilly is a voice-and-pointer guidance layer. It answers from your content and helps users find the exact UI action.' },
      { question: 'Can Skilly explain prompts?', answer: 'Yes, if you teach it your recommended prompt patterns and examples. The goal is to help users use your product, not to become a general prompt tutor.' },
      { question: 'What AI SaaS teams benefit most?', answer: 'Teams with setup friction, workspace configuration, integrations, advanced settings, or users who need education before reaching first value.' },
    ],
  },
  {
    group: 'for',
    slug: 'nocode-tools',
    eyebrow: 'Persona',
    title: 'Voice onboarding for no-code tools - Skilly',
    description:
      'Help no-code users find settings, understand builders, and complete workflows with a voice guide that points at the UI.',
    h1: 'A voice guide for no-code users who need the next click',
    intro:
      'No-code tools are powerful because they expose many controls. That also makes them intimidating. Skilly lets users ask out loud and get shown where to go.',
    ctaCampaign: 'for-nocode-tools',
    sections: [
      { heading: 'The no-code guidance problem', body: 'Nontechnical users often know what they want but not which panel, setting, or term maps to it. Voice guidance bridges that vocabulary gap.' },
      { heading: 'What to teach Skilly', body: 'Use your tutorials, template docs, builder glossary, panel descriptions, and common recipes.' },
      { heading: 'Best workflows', body: 'Publishing, automation setup, template customization, connecting data, adding collaborators, and configuring permissions.' },
    ],
    bullets: ['Translate intent into UI steps', 'Point to builder controls', 'Help nontechnical users stay in flow', 'Reduce repetitive setup questions', 'Works from your existing tutorials'],
    faqs: [
      { question: 'Why is voice useful for no-code tools?', answer: 'No-code users often do not know the product vocabulary. Speaking a plain-language goal is easier than searching documentation for the exact feature name.' },
      { question: 'Can Skilly guide visual builders?', answer: 'Yes. Skilly is designed for UI guidance, so it can explain where to click or which panel to open when taught the relevant product content.' },
      { question: 'Does Skilly replace templates?', answer: 'No. Templates are still valuable. Skilly helps users modify, publish, and troubleshoot those templates.' },
    ],
  },
  {
    group: 'for',
    slug: 'education-platforms',
    eyebrow: 'Persona',
    title: 'Voice guidance for education platforms - Skilly',
    description:
      'Add a voice-and-pointer assistant to education platforms so learners can ask questions and get guided through lessons, tools, and dashboards.',
    h1: 'Voice guidance for learners inside education platforms',
    intro:
      'Learning platforms need more than static instructions. Skilly can answer from course or product content while showing learners the next UI action.',
    ctaCampaign: 'for-education-platforms',
    sections: [
      { heading: 'Where learners get stuck', body: 'Learners may struggle with navigation, lesson steps, submissions, project tools, or unfamiliar software embedded in the course.' },
      { heading: 'How Skilly supports them', body: 'A learner asks a question out loud, hears the answer, and sees where to click next. That keeps the learner in the lesson instead of sending them to search or support.' },
      { heading: 'Best workflows', body: 'Course navigation, project setup, exercise completion, dashboard actions, submission flows, and software-training modules.' },
    ],
    bullets: ['Answer learner questions in context', 'Guide lesson and dashboard actions', 'Support software-training workflows', 'Use editable course/product content', 'Reduce repeated instructor or support questions'],
    faqs: [
      { question: 'Can Skilly teach course material?', answer: 'Skilly can answer from the material you provide, but it is strongest when guidance is tied to an action in the platform or software being taught.' },
      { question: 'Is this only for technical education?', answer: 'No. It is useful for any learning platform where users need help navigating lessons, tools, dashboards, or project steps.' },
      { question: 'Can instructors control the content?', answer: 'Yes. Studio uses editable markdown skills, so teams can review and refine the guidance before publishing.' },
    ],
  },
];

export function getSeoLandingPages(group: SeoLandingPage['group']) {
  return seoLandingPages.filter((page) => page.group === group);
}
