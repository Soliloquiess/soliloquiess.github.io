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

// 비번 게이트(암호화) 글 — 평문 대신 AES 암호문(JSON)만 커밋·배포한다.
const locked = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/locked' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(''),
    // AES-GCM 암호화 결과 (base64)
    salt: z.string(),
    iv: z.string(),
    ct: z.string(),
  }),
});

// 보관함(📦) — 길어서 잘 안 보는 옛 글을 비번으로 묶어 따로 관리. locked과 동일 구조, 폴더만 분리.
const vault = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/vault' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(''),
    salt: z.string(),
    iv: z.string(),
    ct: z.string(),
  }),
});

export const collections = { blog, locked, vault };
