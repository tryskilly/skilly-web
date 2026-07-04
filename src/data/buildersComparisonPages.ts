export type BuildersComparisonPage = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  targetQueries: string[];
  competitorLabel: string;
  competitorSummary: string;
  skillySummary: string;
  quickTake: string;
  pickSkilly: string;
  pickCompetitor: string;
  sourceNote: string;
  rows: Array<{
    feature: string;
    skilly: string;
    competitor: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const buildersComparisonPages: BuildersComparisonPage[] = [
  {
    slug: 'walkme',
    competitor: 'WalkMe',
    title: 'Skilly vs WalkMe - voice guide vs enterprise digital adoption',
    description:
      'WalkMe is an enterprise digital adoption platform for complex organizations. Skilly is a self-serve voice-and-pointer guide for SaaS teams that want users to ask out loud and be shown the exact button.',
    targetQueries: ['skilly vs walkme', 'walkme alternative', 'walkme alternative for startups'],
    competitorLabel: 'enterprise DAP',
    competitorSummary:
      'WalkMe fits large companies that need governed digital adoption across many internal and customer-facing systems.',
    skillySummary:
      'Skilly fits builders who want one script tag, transparent usage pricing, and a product guide users can talk to.',
    quickTake:
      'WalkMe is built for enterprise digital adoption programs. Skilly is built for teams that need fast voice onboarding inside one product.',
    pickSkilly:
      'You want a self-serve assistant that answers out loud, points users to the right control, and can be installed without a sales-led rollout.',
    pickCompetitor:
      'You need enterprise DAP governance, multi-system deployment, workflow analytics, and services around a broad change-management program.',
    sourceNote: 'Positioning checked against public vendor category language; confirm enterprise packaging with WalkMe before procurement.',
    rows: [
      { feature: 'Primary use case', skilly: 'In-product voice onboarding and contextual help for a SaaS or website', competitor: 'Enterprise digital adoption across many applications and employee workflows' },
      { feature: 'Interaction model', skilly: 'User asks out loud; Skilly answers by voice and moves the cursor to the button', competitor: 'Scripted guidance, walkthroughs, automation, and analytics for managed workflows' },
      { feature: 'Setup motion', skilly: 'One script tag, Studio project, editable product skill, allowed domains', competitor: 'Enterprise implementation, governance, and cross-system configuration' },
      { feature: 'Pricing motion', skilly: 'Free founding tier, then transparent monthly usage plans from $29', competitor: 'Sales-led enterprise pricing' },
      { feature: 'Best fit', skilly: 'Startups and SaaS teams that need direct user activation help now', competitor: 'Large organizations with a formal digital adoption program' },
    ],
    faqs: [
      { question: 'Is Skilly a WalkMe alternative?', answer: 'Skilly can replace a small WalkMe-style onboarding use case when the goal is to answer user questions and show the next click inside one product. It is not a full enterprise DAP replacement for large, governed, multi-application deployments.' },
      { question: 'Why would a startup choose Skilly over WalkMe?', answer: 'A startup usually needs speed, self-serve setup, and transparent pricing. Skilly is designed around one script tag and usage-based voice minutes, so a team can launch guidance without an enterprise procurement process.' },
      { question: 'What does WalkMe do that Skilly does not?', answer: 'WalkMe has mature enterprise workflow orchestration, governance, analytics, and services for digital adoption programs. Skilly is intentionally narrower: voice-and-pointer guidance for your product.' },
    ],
  },
  {
    slug: 'chameleon',
    competitor: 'Chameleon',
    title: 'Skilly vs Chameleon - voice onboarding vs no-code product tours',
    description:
      'Chameleon helps product teams build no-code tours, surveys, and launchers. Skilly is a voice-first guide users ask questions to, then it points at the exact place to click.',
    targetQueries: ['skilly vs chameleon', 'chameleon alternative', 'chameleon product tour alternative'],
    competitorLabel: 'no-code product tours',
    competitorSummary:
      'Chameleon is strong when product teams want designed in-app experiences, surveys, launchers, and controlled flows.',
    skillySummary:
      'Skilly is strong when users do not follow a script and need to ask their own question in natural language.',
    quickTake:
      'Chameleon lets you design guided experiences. Skilly handles the unscripted moment when a user asks, "what do I do now?"',
    pickSkilly:
      'You want conversational onboarding that answers arbitrary user questions and points to UI elements.',
    pickCompetitor:
      'You want polished no-code tours, surveys, banners, checklists, and launchers managed by a product-growth team.',
    sourceNote: 'Comparison is based on public category positioning for Chameleon and Skilly product behavior.',
    rows: [
      { feature: 'Primary use case', skilly: 'Conversational voice help and next-click guidance', competitor: 'No-code in-app tours, microsurveys, launchers, and checklists' },
      { feature: 'User input', skilly: 'Open-ended voice questions from the user', competitor: 'Predefined flows and targeted experiences created by the product team' },
      { feature: 'Answer format', skilly: 'Spoken response plus cursor movement to the right element', competitor: 'Visual overlays, modals, banners, tooltips, and surveys' },
      { feature: 'Content source', skilly: 'Editable product skill generated from your docs, site, or notes', competitor: 'Configured experiences and user segments' },
      { feature: 'Best fit', skilly: 'Products where users get stuck in unpredictable ways', competitor: 'Teams that already know the exact flow they want to drive' },
    ],
    faqs: [
      { question: 'Is Skilly a Chameleon alternative?', answer: 'Yes for teams that want AI voice guidance instead of only scripted no-code flows. Chameleon is better for carefully designed tours and surveys; Skilly is better for live, open-ended help.' },
      { question: 'Can Skilly run product tours?', answer: 'Skilly is not a traditional step-by-step tour builder. It is an assistant users talk to. It can guide a user through a task, but the interaction starts from the user question rather than a fixed modal sequence.' },
      { question: 'Can Skilly and Chameleon be used together?', answer: 'Yes. A team could use Chameleon for proactive announcements and tours, then use Skilly for reactive voice help when the user is still stuck.' },
    ],
  },
  {
    slug: 'intercom-fin',
    competitor: 'Intercom Fin',
    title: 'Skilly vs Intercom Fin - voice guidance vs AI support agent',
    description:
      'Intercom Fin is an AI support agent for answering customer questions. Skilly is in-product voice guidance that speaks back and points users to the exact UI element.',
    targetQueries: ['skilly vs intercom fin', 'intercom fin alternative', 'ai support agent vs product onboarding'],
    competitorLabel: 'AI support agent',
    competitorSummary:
      'Intercom Fin is built for support teams that want to answer tickets and deflect repetitive customer questions.',
    skillySummary:
      'Skilly is built for product teams that want users to complete the workflow without opening a support conversation.',
    quickTake:
      'Fin answers support questions. Skilly prevents some support questions by showing users what to click inside the product.',
    pickSkilly:
      'You want activation guidance, setup help, and "where is this button?" support inside your product.',
    pickCompetitor:
      'You need a support inbox AI agent that resolves customer questions across chat, help center, and ticket workflows.',
    sourceNote: 'Comparison is category-based: support automation versus embedded product guidance.',
    rows: [
      { feature: 'Primary use case', skilly: 'In-product onboarding and task guidance', competitor: 'AI support answer automation and ticket deflection' },
      { feature: 'Where it lives', skilly: 'Inside the product or website with one script tag', competitor: 'Inside Intercom support surfaces and connected help content' },
      { feature: 'Answer format', skilly: 'Voice response plus cursor pointing to the UI', competitor: 'Text answer in support chat or help experience' },
      { feature: 'Metric it moves', skilly: 'Activation, onboarding completion, fewer "where do I click?" tickets', competitor: 'Resolution rate, support deflection, agent workload' },
      { feature: 'Best fit', skilly: 'Product-led teams with confusing setup or feature discovery', competitor: 'Support-led teams with high-volume customer questions' },
    ],
    faqs: [
      { question: 'Is Skilly an Intercom Fin alternative?', answer: 'Skilly is an alternative only for the subset of questions caused by product confusion. Fin is a support agent. Skilly is a guidance layer that tries to help the user finish the task before they need support.' },
      { question: 'Should we use Fin or Skilly to reduce support tickets?', answer: 'Use Fin when the ticket still belongs in a support conversation. Use Skilly when the ticket is really an onboarding or UI-discovery problem, such as "where do I configure this?" or "how do I finish setup?"' },
      { question: 'Can Skilly answer billing or account-support questions?', answer: 'Skilly can answer from the content you teach it, but it is not a support system of record. Keep billing, security, and account-specific issues in your help desk.' },
    ],
  },
  {
    slug: 'storylane',
    competitor: 'Storylane',
    title: 'Skilly vs Storylane - live voice guidance vs interactive demos',
    description:
      'Storylane creates interactive product demos for sales and marketing. Skilly guides real users inside the live product with voice answers and cursor pointing.',
    targetQueries: ['skilly vs storylane', 'storylane alternative', 'interactive demo vs product onboarding'],
    competitorLabel: 'interactive demos',
    competitorSummary:
      'Storylane is built for pre-sale demos, website embeds, and sales enablement experiences.',
    skillySummary:
      'Skilly is built for the live product moment after a user signs up or lands inside your app.',
    quickTake:
      'Storylane shows prospects a demo. Skilly helps actual users complete work in the real product.',
    pickSkilly:
      'You need post-signup guidance, setup help, and contextual answers inside your app.',
    pickCompetitor:
      'You need a polished product demo for your website, outbound sales, or sales enablement.',
    sourceNote: 'Comparison separates demo-led acquisition from live in-product onboarding.',
    rows: [
      { feature: 'Primary use case', skilly: 'Live onboarding and in-app help', competitor: 'Interactive demos for marketing and sales' },
      { feature: 'Environment', skilly: 'The real product UI', competitor: 'Captured or recreated demo flow' },
      { feature: 'User input', skilly: 'Open-ended voice questions', competitor: 'Prebuilt click path through a demo' },
      { feature: 'Best stage', skilly: 'Activation, onboarding, retention', competitor: 'Awareness, consideration, sales qualification' },
      { feature: 'Best fit', skilly: 'Users who already need to perform a task', competitor: 'Prospects who need to understand the product before signup' },
    ],
    faqs: [
      { question: 'Is Skilly a Storylane alternative?', answer: 'Skilly is not a direct replacement for website demo software. It is an alternative when the problem is live product onboarding rather than pre-sale product storytelling.' },
      { question: 'Can Skilly replace an interactive demo on a landing page?', answer: 'Usually no. Use an interactive demo to show value before signup. Use Skilly to help users after they enter the product or when they are trying to complete a real workflow.' },
      { question: 'Can Skilly and Storylane work together?', answer: 'Yes. Storylane can improve pre-signup education, while Skilly can improve post-signup activation and reduce support tickets.' },
    ],
  },
  {
    slug: 'arcade',
    competitor: 'Arcade',
    title: 'Skilly vs Arcade - embedded voice help vs interactive demo storytelling',
    description:
      'Arcade helps teams create polished interactive demos. Skilly embeds in the live product so users can ask out loud and be guided to the next click.',
    targetQueries: ['skilly vs arcade', 'arcade software alternative', 'arcade interactive demo alternative'],
    competitorLabel: 'demo storytelling',
    competitorSummary:
      'Arcade is a strong fit for marketing pages, product launches, release demos, and sales assets.',
    skillySummary:
      'Skilly is a strong fit for live user confusion after someone is already trying to use the product.',
    quickTake:
      'Arcade is for showing how a product works. Skilly is for helping users while they are doing the work.',
    pickSkilly:
      'You care about activation, fewer confused users, and support deflection inside the product.',
    pickCompetitor:
      'You care about demo storytelling, launch assets, and interactive walkthroughs outside the product.',
    sourceNote: 'Comparison separates interactive demo content from runtime in-app guidance.',
    rows: [
      { feature: 'Primary use case', skilly: 'Runtime voice guidance inside your product', competitor: 'Interactive demos for product storytelling' },
      { feature: 'Where users interact', skilly: 'Your live app or website', competitor: 'A demo embedded on a page or shared with prospects' },
      { feature: 'Question handling', skilly: 'Open-ended voice Q&A grounded in your product content', competitor: 'A designed sequence with controlled steps' },
      { feature: 'Outcome', skilly: 'Users finish setup or learn where to click', competitor: 'Prospects understand the product faster' },
      { feature: 'Best fit', skilly: 'Onboarding, education, and support deflection', competitor: 'Marketing, enablement, and launch storytelling' },
    ],
    faqs: [
      { question: 'Is Skilly an Arcade alternative?', answer: 'Only if your real need is live product guidance. Arcade is for interactive demos and storytelling; Skilly is for users who are already in the product and need help completing a task.' },
      { question: 'Which is better for onboarding?', answer: 'For pre-signup education, Arcade is usually better. For post-signup activation and "where do I click?" moments, Skilly is the better fit.' },
      { question: 'Does Skilly create demo assets?', answer: 'No. Skilly embeds a live assistant. It does not create polished standalone demo stories.' },
    ],
  },
  {
    slug: 'navattic',
    competitor: 'Navattic',
    title: 'Skilly vs Navattic - live product guide vs interactive product demo',
    description:
      'Navattic is built for interactive product demos that qualify and educate buyers. Skilly is built for live voice guidance inside your actual product.',
    targetQueries: ['skilly vs navattic', 'navattic alternative', 'navattic onboarding alternative'],
    competitorLabel: 'interactive product demos',
    competitorSummary:
      'Navattic is a strong fit for go-to-market teams that want demo-led acquisition and sales enablement.',
    skillySummary:
      'Skilly is a strong fit for product teams that want users to complete real workflows after they arrive.',
    quickTake:
      'Navattic helps prospects experience a guided demo. Skilly helps users complete tasks in the real app.',
    pickSkilly:
      'You need contextual voice help inside the product after signup or during a live website workflow.',
    pickCompetitor:
      'You need an interactive demo for your website, sales team, or product-led growth motion.',
    sourceNote: 'Comparison is based on the common distinction between demo-led acquisition and live user guidance.',
    rows: [
      { feature: 'Primary use case', skilly: 'In-product voice onboarding', competitor: 'Interactive demos for sales and marketing' },
      { feature: 'Environment', skilly: 'Live app UI', competitor: 'Demo environment or captured product experience' },
      { feature: 'Guidance style', skilly: 'User asks a question; Skilly responds and points', competitor: 'Prospect follows a designed demo path' },
      { feature: 'Team owner', skilly: 'Product, growth, onboarding, support', competitor: 'Marketing, sales, demand generation' },
      { feature: 'Best fit', skilly: 'Reducing friction for real users', competitor: 'Increasing conversion before real product access' },
    ],
    faqs: [
      { question: 'Is Skilly a Navattic alternative?', answer: 'Skilly is an alternative only when you are trying to guide users in the actual product. Navattic is the better tool for interactive demos used in sales and marketing.' },
      { question: 'Can Skilly help demo-qualified leads after signup?', answer: 'Yes. A common pairing is an interactive demo before signup, then Skilly inside the product to help the user finish setup and discover features.' },
      { question: 'Does Skilly require recreating demo flows?', answer: 'No. Skilly runs in the live product and answers from your content, so you do not need to maintain a separate demo copy for guidance.' },
    ],
  },
];

export const buildersComparisonIndexItems = [
  {
    href: '/vs/appcues',
    name: 'Skilly vs Appcues',
    summary: 'Appcues builds no-code product tours. Skilly is a voice guide users talk to — it points the cursor.',
  },
  {
    href: '/vs/pendo',
    name: 'Skilly vs Pendo',
    summary: 'Pendo is analytics-first with in-app guides. Skilly is a focused, voice-first guidance layer.',
  },
  {
    href: '/vs/userpilot',
    name: 'Skilly vs Userpilot',
    summary: 'Userpilot is no-code flows + analytics from $299/mo. Skilly is voice-first, starting free.',
  },
  {
    href: '/vs/whatfix',
    name: 'Skilly vs Whatfix',
    summary: 'Whatfix is an enterprise DAP across many apps. Skilly is a self-serve guide for one product.',
  },
  {
    href: '/vs/command-ai',
    name: 'Skilly vs Command AI',
    summary: 'Command AI (Amplitude) is a text AI copilot + nudges. Skilly answers out loud and shows the button.',
  },
  ...buildersComparisonPages.map((page) => ({
    href: `/vs/${page.slug}`,
    name: `Skilly vs ${page.competitor}`,
    summary: page.quickTake,
  })),
];

export function getBuildersComparisonPage(slug: string) {
  const page = buildersComparisonPages.find((item) => item.slug === slug);
  if (!page) {
    throw new Error(`Unknown Builders comparison page: ${slug}`);
  }
  return page;
}
