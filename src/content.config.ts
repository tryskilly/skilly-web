// src/content.config.ts
// Astro 5 content collection config — Learn (long-tail SEO + how-to articles)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const learn = defineCollection({
  loader: glob({ base: './src/content/learn', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Mohamed Saleh Zaied'),
    category: z.enum([
      'tutorial',
      'comparison',
      'how-to',
      'concept',
      'troubleshooting',
    ]),
    tags: z.array(z.string()).default([]),
    // For HowTo schema generation
    howTo: z.object({
      totalTime: z.string().optional(), // ISO 8601 duration like PT5M
      tools: z.array(z.string()).optional(),
      supplies: z.array(z.string()).optional(),
      steps: z.array(z.object({
        name: z.string(),
        text: z.string(),
        image: z.string().optional(),
      })),
    }).optional(),
    // Optional FAQ schema generation
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    // Hero / OG image
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    // Internal linking + SEO
    relatedArticles: z.array(z.string()).default([]),
    canonicalKeyword: z.string().optional(),
  }),
});

export const collections = {
  learn,
};
