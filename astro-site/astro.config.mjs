// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 본문 마크다운 이미지에 lazy-loading/async 디코딩 부여 (성능)
function rehypeLazyImages() {
  return (tree) => {
    const walk = (node) => {
      if (node.tagName === 'img' && node.properties) {
        if (node.properties.loading == null) node.properties.loading = 'lazy';
        if (node.properties.decoding == null) node.properties.decoding = 'async';
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

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
    rehypePlugins: [rehypeLazyImages],
  },
});
