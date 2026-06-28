import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // URL/사이드바 분류용 카테고리 (기존 Jekyll 폴더/front matter 기준)
    category: z.string().default('etc'),
    tags: z.array(z.string()).default([]),
    description: z.string().optional().default(''),
    // 기존 URL 보존: 확장자(.html)와 선행 슬래시를 제외한 경로
    permalink: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
