import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // _private/** 는 비공개/보관함 암호화 소스·로컬 메모라 블로그 글로 잡지 않음
  loader: glob({ pattern: ['**/*.md', '!**/_private/**'], base: './src/content/blog' }),
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
    date: z.coerce.date(),
    // AES-GCM 암호화 (base64) — 제목/설명(ctT)·본문(ctB) 모두 암호화, 제목은 공개에 안 남음
    salt: z.string(),
    ivT: z.string(),
    ctT: z.string(),
    ivB: z.string(),
    ctB: z.string(),
  }),
});

// 보관함(📦) — 길어서 잘 안 보는 옛 글을 비번으로 묶어 따로 관리. locked과 동일 구조, 폴더만 분리.
const vault = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/vault' }),
  schema: z.object({
    date: z.coerce.date(),
    salt: z.string(),
    ivT: z.string(),
    ctT: z.string(),
    ivB: z.string(),
    ctB: z.string(),
  }),
});

export const collections = { blog, locked, vault };
