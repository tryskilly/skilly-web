// Competitor-vs-competitor comparisons ("Appcues vs Chameleon"), as opposed to
// the Skilly-vs-X pages in buildersComparisonPages.ts.
//
// Why these exist: GSC (2026-07-15) shows tryskilly.app already picking up
// impressions for X-vs-Y queries we have no page for — "appcues vs chameleon"
// (+ "compare appcues vs chameleon"), "chameleon vs userguiding", "chameleon vs
// whatfix", and a broad '"pendo vs" compare or best'. Those buyers are in-market
// and the terms are winnable at our current authority, unlike the head brand
// terms ("userpilot", "whatfix") where we sit at position 55-70.
//
// House rules for this file:
//  - The A-vs-B comparison must be genuinely useful and fair even to a reader who
//    never picks Skilly. That honesty is what earns the ranking and the citation.
//  - No invented pricing or feature specifics for third-party tools; they change
//    and we cannot verify them. Keep vendor claims qualitative and use sourceNote.
//  - Skilly is the third, different-category option — never pretend it is a
//    feature-parity replacement for a mature DAP.

export type BuildersVersusPage = {
  slug: string;
  a: string;
  b: string;
  title: string;
  description: string;
  targetQueries: string[];
  /** The short answer, given away at the top — the bit AI engines quote. */
  verdict: string;
  pickA: string;
  pickB: string;
  pickSkilly: string;
  sourceNote: string;
  rows: Array<{ feature: string; a: string; b: string; skilly: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const buildersVersusPages: BuildersVersusPage[] = [
  {
    slug: 'appcues-vs-chameleon',
    a: 'Appcues',
    b: 'Chameleon',
    title: 'Appcues vs Chameleon (2026): an honest comparison',
    description:
      'Compare Appcues and Chameleon for product onboarding: speed, customization, targeting, analytics, maintenance, pricing, and where Skilly differs.',
    targetQueries: ['appcues vs chameleon', 'compare appcues vs chameleon', 'appcues vs chameleon comparison', 'chameleon vs appcues'],
    verdict:
      'Both are no-code in-app onboarding tools for product teams. Appcues optimises for speed — templates, a mature flow builder, and a broad integration ecosystem. Chameleon optimises for control — deeper styling, native-feeling components, and a search-style help surface. If your first question is "how fast can we ship a checklist?", that points to Appcues. If it is "will this look like we built it?", that points to Chameleon.',
    pickA:
      'You want standard onboarding patterns — modals, tooltips, checklists, surveys — live quickly, with a mature template library and a well-trodden integration path, and you are happy to accept the tool\'s look and feel.',
    pickB:
      'Your product has a strong design language and off-the-shelf tooltips would look bolted on. Chameleon gives more styling and targeting control, and you have the design or front-end time to use it.',
    pickSkilly:
      'Your real problem is the long tail of questions no flow anticipated. Skilly is not a flow builder: users ask out loud and get pointed at the exact control, with nothing to author in advance.',
    sourceNote:
      'Positioning reflects each vendor\'s public category language and documentation as of July 2026. Both tools ship quickly — confirm current pricing, MAU tiers, and feature availability directly with Appcues and Chameleon before you buy.',
    rows: [
      { feature: 'Core strength', a: 'Mature, template-led flow builder that gets standard onboarding live fast', b: 'Deep customization — guidance that matches your product\'s design language', skilly: 'Answering the question the user actually asked, out loud, at the moment they are stuck' },
      { feature: 'Who authors it', a: 'PM or growth, no-code', b: 'PM or growth, with design/front-end help for the polished result', skilly: 'Nobody — the guide is taught from your existing site, docs, and help centre' },
      { feature: 'Coverage', a: 'The flows you predicted and built', b: 'The flows you predicted and built, styled well', skilly: 'Any question your existing content can answer' },
      { feature: 'Help surface', a: 'Flows, checklists, resource centre', b: 'Flows, checklists, plus a search-style help bar', skilly: 'Voice — the user talks, the cursor moves to the button' },
      { feature: 'When the UI changes', a: 'Flows targeting changed elements need fixing', b: 'Flows targeting changed elements need fixing', skilly: 'Nothing to rebuild — there are no scripted steps' },
      { feature: 'Analytics & experimentation', a: 'Established flow analytics, goals, and A/B testing', b: 'Established flow analytics and targeting', skilly: 'Deliberately narrow — session and usage reporting, not a full analytics suite' },
      { feature: 'Best fit', a: 'Teams that need conventional onboarding shipped this sprint', b: 'Design-led PLG teams where guidance must feel native', skilly: 'Teams losing users to questions they never thought to script' },
    ],
    faqs: [
      { question: 'What is the main difference between Appcues and Chameleon?', answer: 'Speed versus control. Appcues leads with a mature template library and a broad integration ecosystem, so standard onboarding flows go live quickly. Chameleon leads with customization — deeper styling control and native-feeling components — so guidance matches your product\'s design language. Both are no-code in-app onboarding tools for product teams.' },
      { question: 'Is Chameleon better than Appcues?', answer: 'Neither is better outright; they optimise for different constraints. Chameleon is the stronger choice when off-the-shelf tooltips would look bolted onto a design-led product and you have front-end time to invest. Appcues is stronger when the priority is shipping conventional onboarding patterns fast with minimal design work.' },
      { question: 'Which is easier to set up, Appcues or Chameleon?', answer: 'Appcues is generally the faster path to a first live flow because of its template library and established patterns. Chameleon\'s additional styling and targeting control is exactly what makes it take a little more time to reach a polished result.' },
      { question: 'Do I need a product tour tool at all?', answer: 'Only for guidance you can predict in advance. Scripted tours work well for a single known path every user must see, such as a required setup step. They are a poor fit for the long tail of real questions, which is most of what confuses users after day one — that is a different job, answered when the user asks rather than authored ahead of time.' },
      { question: 'What is the alternative to building onboarding flows?', answer: 'Voice onboarding: instead of authoring flows, an AI guide reads your existing product content and answers when a user asks out loud, pointing at the exact button. There is nothing to author, segment, or maintain, and it covers questions you never anticipated. It does not replace a mature platform\'s analytics, segmentation, and experimentation.' },
    ],
  },
  {
    slug: 'pendo-vs-walkme',
    a: 'Pendo',
    b: 'WalkMe',
    title: 'Pendo vs WalkMe (2026): an honest comparison',
    description:
      'Compare Pendo and WalkMe: customer product analytics and guides versus enterprise employee adoption across many apps, plus a lighter alternative.',
    targetQueries: ['pendo vs walkme', 'walkme vs pendo', 'pendo or walkme', 'pendo vs walkme comparison'],
    verdict:
      'These are less alike than the category suggests. Pendo starts from product analytics — understand what users do in your SaaS, then guide them — and is usually bought by product teams at software companies. WalkMe starts from digital adoption — get employees through workflows across many applications, often ones you did not build — and is usually bought by IT, enablement, or transformation teams. The right question is not "which is better" but "am I guiding my customers or my colleagues?"',
    pickA:
      'You build customer-facing software and want product analytics and in-app guides in one platform, so the data on what users do and the guidance you show them live together.',
    pickB:
      'You need employees guided through processes spanning many applications — CRM, ERP, HR systems — with enterprise governance, and you have the budget and services appetite for a digital adoption programme.',
    pickSkilly:
      'You want customers to get unstuck inside one product without authoring flows or launching a programme. Skilly answers questions out loud and points at the control; it is not a DAP and does not span your enterprise application estate.',
    sourceNote:
      'Category positioning reflects public vendor material as of July 2026. Both are sales-led at the enterprise end — confirm scope, packaging, and services with Pendo and WalkMe directly.',
    rows: [
      { feature: 'Starting point', a: 'Product analytics — what users actually do in your app', b: 'Digital adoption — getting people through workflows across applications', skilly: 'The user\'s question, asked out loud, in the moment' },
      { feature: 'Who is guided', a: 'Your customers, inside your product', b: 'Usually employees, across many systems you may not own', skilly: 'Your customers, inside your product' },
      { feature: 'Typical buyer', a: 'Product and growth teams at software companies', b: 'IT, enablement, and transformation teams at large organisations', skilly: 'Founders and product teams who need activation help now' },
      { feature: 'Scope', a: 'One product, deeply instrumented', b: 'Many applications, centrally governed', skilly: 'One product, no instrumentation to author' },
      { feature: 'Setup motion', a: 'Instrumentation plus guide authoring; sales-led at scale', b: 'Enterprise implementation, governance, and services', skilly: 'One script tag, then point it at content you already have' },
      { feature: 'Analytics', a: 'The main event — retention, paths, funnels, feedback', b: 'Adoption and workflow analytics for the programme', skilly: 'Narrow by design — usage and session reporting only' },
      { feature: 'Best fit', a: 'SaaS teams that want to measure and guide in one place', b: 'Enterprises running a formal change-management programme', skilly: 'Teams whose users churn on questions nobody scripted' },
    ],
    faqs: [
      { question: 'What is the difference between Pendo and WalkMe?', answer: 'Pendo starts from product analytics for your own software — understand what customers do, then guide them — and is typically bought by product teams. WalkMe starts from digital adoption — getting employees through workflows across many applications, often third-party systems like CRM or ERP — and is typically bought by IT or enablement. They overlap on in-app guidance but serve different buyers and jobs.' },
      { question: 'Is Pendo or WalkMe better for employee onboarding?', answer: 'WalkMe is the more natural fit. Employee onboarding usually spans multiple applications you did not build, which is the problem digital adoption platforms are designed for. Pendo is strongest inside a product you own and instrument yourself.' },
      { question: 'Is WalkMe worth it for a startup?', answer: 'Rarely. WalkMe is built for large organisations with a formal digital adoption programme, enterprise governance needs, and the budget and services appetite to match. A startup guiding customers inside a single product is buying a great deal of capability it will not use.' },
      { question: 'Can Pendo replace WalkMe?', answer: 'Only if your guidance stays inside software you build and instrument. Pendo is not designed to orchestrate employee workflows across an estate of third-party enterprise applications, which is WalkMe\'s core competence.' },
      { question: 'Is there a lighter alternative to both?', answer: 'For the narrow job of helping customers get unstuck inside one product, yes: an AI guide that answers out loud when a user asks and points at the exact control, installed with a script tag and taught from content you already have. It does not replace either platform\'s analytics, governance, or cross-application reach.' },
    ],
  },
  {
    slug: 'chameleon-vs-userguiding',
    a: 'Chameleon',
    b: 'UserGuiding',
    title: 'Chameleon vs UserGuiding (2026): an honest comparison',
    description:
      'Compare Chameleon and UserGuiding for SaaS onboarding: design control, speed, pricing, maintenance, and where conversational guidance fits.',
    targetQueries: ['chameleon vs userguiding', 'userguiding vs chameleon', 'chameleon or userguiding', 'userguiding alternative'],
    verdict:
      'This is mostly a budget-and-polish decision rather than a capability one. UserGuiding aims at smaller teams that want conventional tours, checklists, and a resource centre live quickly at an accessible price. Chameleon aims at design-led product teams who need guidance to look and behave like a native part of the product, and will spend more — in money and front-end time — to get it. If nobody on your team will notice the tooltips look generic, the cheaper tool wins.',
    pickA:
      'Your product has a strong design language, generic tooltips would visibly clash, and you have the design or front-end time to use the extra styling and targeting control.',
    pickB:
      'You want standard onboarding patterns live quickly at a lower price point, and native-feeling polish is not what is blocking activation today.',
    pickSkilly:
      'Neither the polish nor the price is the real problem — the flows simply do not cover what users ask. Skilly answers those questions out loud and points at the control, with no flows to author.',
    sourceNote:
      'Reflects public vendor positioning as of July 2026. Pricing tiers in this category change often — check current plans with Chameleon and UserGuiding before deciding.',
    rows: [
      { feature: 'Positioning', a: 'Premium customization for design-led product teams', b: 'Accessible, straightforward onboarding for smaller teams', skilly: 'A different category — ask out loud, get shown the button' },
      { feature: 'Look and feel', a: 'Deep styling control; guidance can feel native', b: 'Solid, conventional patterns out of the box', skilly: 'No tour UI at all — voice plus a moving cursor' },
      { feature: 'Time to first flow', a: 'Longer — the control is the point', b: 'Fast, with templates and simple setup', skilly: 'Minutes; nothing to author' },
      { feature: 'Coverage', a: 'The flows you built', b: 'The flows you built', skilly: 'Any question your existing content answers' },
      { feature: 'Maintenance', a: 'Flows need updating as the UI changes', b: 'Flows need updating as the UI changes', skilly: 'No scripted steps to break' },
      { feature: 'Best fit', a: 'Funded PLG teams with a strong design bar', b: 'SMBs and early teams that need tours shipped affordably', skilly: 'Teams losing users in the long tail of questions' },
    ],
    faqs: [
      { question: 'What is the difference between Chameleon and UserGuiding?', answer: 'Mostly polish and price. Chameleon targets design-led product teams and offers deeper styling and targeting control so guidance feels native to your product. UserGuiding targets smaller teams that want conventional tours, checklists, and a resource centre live quickly at a more accessible price point.' },
      { question: 'Is UserGuiding a good Chameleon alternative?', answer: 'Yes, if your constraint is budget rather than design fidelity. UserGuiding covers the standard onboarding patterns most teams actually ship. You give up the deeper customization that makes Chameleon worth its premium for design-conscious products.' },
      { question: 'Which is better for a small startup?', answer: 'Usually UserGuiding, on cost and speed. The exception is a startup whose product is design-led enough that generic tooltips would undermine the experience — there, Chameleon\'s control earns its price. Both assume you can predict what users need to be told.' },
      { question: 'What if users ask questions the tour does not cover?', answer: 'That is the structural limit of both tools: they only cover paths you predicted and authored. The long tail of real questions is answered by a guide that responds when the user asks, rather than one configured to fire on a segment or page load.' },
    ],
  },
  {
    slug: 'chameleon-vs-whatfix',
    a: 'Chameleon',
    b: 'Whatfix',
    title: 'Chameleon vs Whatfix (2026): an honest comparison',
    description:
      'Compare Chameleon and Whatfix: customer onboarding in your SaaS versus employee adoption across enterprise software, plus a lighter alternative.',
    targetQueries: ['chameleon vs whatfix', 'whatfix vs chameleon', 'whatfix alternative', 'chameleon or whatfix'],
    verdict:
      'These rarely belong on the same shortlist, and if they are on yours it is worth asking why. Chameleon is an in-product experience tool for software companies guiding their own customers, with a premium on native-feeling design. Whatfix is an enterprise digital adoption platform for guiding employees through applications the organisation bought rather than built, with content authoring, governance, and analytics for the programme. Answer "customers or employees?" and the decision usually makes itself.',
    pickA:
      'You are a software company guiding your own customers inside your own product, and the guidance needs to feel like part of that product.',
    pickB:
      'You are driving adoption of enterprise applications among employees, need in-app content authoring and governance across systems, and are running it as a programme.',
    pickSkilly:
      'You are guiding customers in one product and the blocker is unanticipated questions, not design polish or enterprise governance. Skilly answers out loud and points; it is not a DAP.',
    sourceNote:
      'Reflects each vendor\'s public category language as of July 2026. Whatfix is enterprise and sales-led — confirm scope and packaging directly before procurement.',
    rows: [
      { feature: 'Category', a: 'In-product experience / onboarding tool', b: 'Enterprise digital adoption platform (DAP)', skilly: 'Voice-and-pointer product guide' },
      { feature: 'Who is guided', a: 'Your customers', b: 'Usually employees', skilly: 'Your customers' },
      { feature: 'Application scope', a: 'The product you build', b: 'Many applications across the organisation', skilly: 'The product you build' },
      { feature: 'Typical buyer', a: 'Product and growth teams', b: 'IT, L&D, enablement, transformation', skilly: 'Founders and product teams' },
      { feature: 'Setup motion', a: 'Self-serve, with design time for polish', b: 'Enterprise implementation and governance', skilly: 'One script tag, taught from existing content' },
      { feature: 'Strength', a: 'Native-feeling, highly customizable guidance', b: 'Governed adoption and training content at enterprise scale', skilly: 'Covering questions nobody scripted' },
      { feature: 'Best fit', a: 'Design-led SaaS guiding customers', b: 'Large organisations rolling out enterprise software', skilly: 'SaaS teams whose users churn on unanswered questions' },
    ],
    faqs: [
      { question: 'What is the difference between Chameleon and Whatfix?', answer: 'They serve different buyers. Chameleon is an in-product experience tool for software companies guiding their own customers, emphasising native-feeling, customizable guidance. Whatfix is an enterprise digital adoption platform for guiding employees through applications the organisation bought rather than built, emphasising content authoring, governance, and programme analytics.' },
      { question: 'Is Whatfix a Chameleon alternative?', answer: 'Only superficially. Both can place guidance inside a web application, but Whatfix is built for enterprise employee adoption across many systems, while Chameleon is built for customer-facing product teams. Choosing on feature overlap alone usually means buying the wrong shape of tool.' },
      { question: 'Which should a SaaS company choose?', answer: 'If you are guiding your own customers inside your own product, Chameleon is the more natural fit and the lighter buy. Whatfix becomes relevant when the job shifts to employees adopting enterprise software across the organisation.' },
      { question: 'Do either of them answer questions users ask?', answer: 'Both are built around guidance you author in advance — flows, walkthroughs, and content targeted at segments or pages. Neither is designed to answer an unanticipated question at the moment a user asks it; that is a different model, where the user asks out loud and the guide responds from your existing content.' },
    ],
  },
  {
    slug: 'appcues-vs-pendo',
    a: 'Appcues',
    b: 'Pendo',
    title: 'Appcues vs Pendo (2026): an honest comparison',
    description:
      'Compare Appcues and Pendo for onboarding: focused in-app guidance versus product analytics with guides, including setup, pricing, and best fit.',
    targetQueries: ['appcues vs pendo', 'pendo vs appcues', 'appcues or pendo', 'appcues vs pendo comparison'],
    verdict:
      'The honest framing is scope. Appcues does in-app onboarding and does it well — flows, checklists, surveys — without asking you to adopt a platform. Pendo is an analytics product first, with guides built on top of that data; you buy it when you want to understand behaviour and act on it in one place. If you already have product analytics you trust, Appcues is the lighter, cheaper answer. If your analytics are the actual gap, guides from Appcues will not fill it.',
    pickA:
      'Your analytics stack is settled and the gap is guidance. Appcues is focused, quicker to adopt, and does not require buying into a wider platform.',
    pickB:
      'You want behavioural analytics and in-app guides from the same system, with segmentation driven by real usage data, and you have the budget and appetite for a platform commitment.',
    pickSkilly:
      'Your gap is neither dashboards nor flows — it is that users hit questions nobody predicted. Skilly answers those out loud and points at the control, with nothing to author.',
    sourceNote:
      'Reflects public vendor positioning and documentation as of July 2026. Pendo in particular packages by product and scale — confirm current tiers with both vendors before committing.',
    rows: [
      { feature: 'Primary job', a: 'In-app onboarding and adoption flows', b: 'Product analytics, with guides built on top', skilly: 'Answering the question the user asked, out loud' },
      { feature: 'Scope of commitment', a: 'A focused tool', b: 'A platform', skilly: 'A script tag' },
      { feature: 'Analytics depth', a: 'Flow-level analytics and goals', b: 'The core product — paths, retention, funnels, feedback', skilly: 'Narrow by design — usage and session reporting only' },
      { feature: 'Segmentation', a: 'Solid, based on traits and events you send', b: 'Its strongest suit — driven by observed behaviour', skilly: 'Not the model — the user self-selects by asking' },
      { feature: 'Authoring', a: 'No-code flow builder, mature templates', b: 'No-code guides plus instrumentation work', skilly: 'None — taught from your existing content' },
      { feature: 'Coverage', a: 'The flows you predicted', b: 'The flows you predicted, better targeted', skilly: 'Any question your content can answer' },
      { feature: 'Best fit', a: 'Teams with analytics sorted that need onboarding now', b: 'Teams that want to measure and guide in one system', skilly: 'Teams losing users in the long tail of questions' },
    ],
    faqs: [
      { question: 'What is the difference between Appcues and Pendo?', answer: 'Scope. Appcues is a focused in-app onboarding tool — flows, checklists, and surveys — that you can adopt without buying into a wider platform. Pendo is a product-analytics platform first, with in-app guides built on top of that behavioural data, which makes it more capable and a bigger commitment.' },
      { question: 'Is Appcues cheaper than Pendo?', answer: 'Appcues is generally the lighter commitment because it solves a narrower problem, whereas Pendo is priced as a platform. Both vendors package by scale and change tiers regularly, so treat this as a shape-of-purchase difference and confirm current pricing with each directly.' },
      { question: 'Should I use Pendo if I already have product analytics?', answer: 'Often not. Pendo\'s main advantage is having analytics and guidance in one system. If you already run analytics you trust, you are paying for overlap — a focused onboarding tool like Appcues usually gets you the guidance without the duplication.' },
      { question: 'Can Appcues replace Pendo?', answer: 'For guidance, frequently yes. For analytics, no — Appcues does not attempt the behavioural depth Pendo is built around. The question is which of the two jobs you actually need.' },
      { question: 'What if the problem is questions no flow covers?', answer: 'Neither tool addresses that directly, because both depend on predicting the question before the user has it. Covering the long tail means answering at the moment of confusion — the user asks out loud and the guide responds from your existing content and shows them where to click.' },
    ],
  },
];

export const buildersVersusIndexItems = buildersVersusPages.map((page) => ({
  href: `/vs/${page.slug}/`,
  name: `${page.a} vs ${page.b}`,
  summary: page.description,
}));

export function getBuildersVersusPage(slug: string) {
  const page = buildersVersusPages.find((item) => item.slug === slug);
  if (!page) {
    throw new Error(`Unknown Builders versus page: ${slug}`);
  }
  return page;
}
