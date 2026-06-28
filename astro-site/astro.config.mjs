// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://soliloquiess.github.io',
  // 기존 Jekyll URL(.../slug.html) 보존을 위해 파일 형식으로 출력
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
    // 수식($) 처리는 끔 — 셸 프롬프트($)·SQL($$ 구분자) 등이 깨지지 않도록
    gfm: true,
  },
});
