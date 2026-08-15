export type NavigationItem = {
  href: string;
  label: string;
  description: string;
};

export const productNavigation: NavigationItem[] = [
  {
    href: '/',
    label: 'For Builders',
    description: 'Embedded voice onboarding for SaaS products.',
  },
  {
    href: '/people/',
    label: 'For People',
    description: 'Live voice guidance for any app on your Mac.',
  },
  {
    href: '/vs/',
    label: 'Compare',
    description: 'See where Skilly fits beside other tools.',
  },
  {
    href: '/learn/',
    label: 'Learn',
    description: 'Practical tutorials, guides, and product notes.',
  },
];

export const useCaseNavigation: NavigationItem[] = [
  {
    href: '/use-cases/voice-onboarding/',
    label: 'Voice onboarding',
    description: 'Let users ask what to do next, out loud.',
  },
  {
    href: '/use-cases/ai-product-tours/',
    label: 'AI product tours',
    description: 'Answer open questions and point to the next click.',
  },
  {
    href: '/use-cases/reduce-support-tickets/',
    label: 'Reduce support tickets',
    description: 'Resolve repetitive UI confusion in context.',
  },
  {
    href: '/use-cases/in-app-guidance-for-saas/',
    label: 'In-app guidance for SaaS',
    description: 'Support activation without building brittle tours.',
  },
];

export const audienceNavigation: NavigationItem[] = [
  {
    href: '/for/devtools/',
    label: 'Devtools',
    description: 'Guide API keys, webhooks, and environments.',
  },
  {
    href: '/for/ai-saas/',
    label: 'AI SaaS',
    description: 'Explain prompts, models, and integrations.',
  },
  {
    href: '/for/nocode-tools/',
    label: 'No-code tools',
    description: 'Help users find builders, settings, and workflows.',
  },
  {
    href: '/for/education-platforms/',
    label: 'Education platforms',
    description: 'Guide learners through tools and dashboards.',
  },
];

const peopleComparisonPaths = [
  '/vs/cluely/',
  '/vs/rewind/',
  '/vs/raycast-ai/',
  '/vs/gemini-live/',
  '/vs/clicky/',
];

export function getMarketingVariant(pathname: string): 'people' | 'builders' {
  const isPeople =
    pathname.startsWith('/people') ||
    pathname.startsWith('/checkout-success') ||
    peopleComparisonPaths.some((path) => pathname.startsWith(path));

  return isPeople ? 'people' : 'builders';
}
