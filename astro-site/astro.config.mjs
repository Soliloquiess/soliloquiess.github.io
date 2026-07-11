// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 원본이 사라진 상대경로 이미지(깨진 이미지) 제거 — mdast 단계라
// 코드블록(```) 안의 예제 <img>(type 'code')는 절대 건드리지 않음.
function isBrokenSrc(u) {
  const s = (u || '').trim();
  return s !== '' && !s.startsWith('http') && !s.startsWith('/') && !s.startsWith('data:');
}
function remarkDropBrokenImages() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.filter((c) => {
        // 마크다운 ![alt](상대경로) 이미지 제거
        if (c.type === 'image' && isBrokenSrc(c.url)) return false;
        return true;
      });
      for (const c of node.children) {
        // 마크다운에 직접 쓴 raw HTML <img> 중 상대경로만 제거
        if (c.type === 'html' && typeof c.value === 'string') {
          c.value = c.value.replace(/<img\b[^>]*>/gi, (tag) => {
            const m = tag.match(/src\s*=\s*["']([^"']*)["']/i);
            return m && isBrokenSrc(m[1]) ? '' : tag;
          });
        }
        walk(c);
      }
    };
    walk(tree);
  };
}

// rehype 단계: 상대경로 img 엘리먼트 제거(백스톱) + 나머지 img lazy-loading.
// 코드블록은 <pre><code> 텍스트라 img 엘리먼트가 아니므로 안전.
function rehypeImages() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.filter((c) => {
        if (c.tagName === 'img' && c.properties && typeof c.properties.src === 'string') {
          if (isBrokenSrc(c.properties.src)) return false;
        }
        return true;
      });
      for (const c of node.children) {
        if (c.tagName === 'img' && c.properties) {
          if (c.properties.loading == null) c.properties.loading = 'lazy';
          if (c.properties.decoding == null) c.properties.decoding = 'async';
        }
        walk(c);
      }
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
    // noindex 페이지(암호화된 vault·locked, 암호화 도구)는 사이트맵에서 제외.
    // 이미 검색에 안 나오지만(내용 암호화 + noindex), "크롤 요청 vs noindex" 모순을
    // 없애 GSC의 "제출됐으나 noindex로 제외됨" 경고를 방지한다.
    sitemap({
      filter: (page) =>
        !page.includes('/vault') &&
        !page.includes('/locked') &&
        !page.includes('/tools/lock'),
    }),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
    // 수식($) 처리는 끔 — 셸 프롬프트($)·SQL($$ 구분자) 등이 깨지지 않도록
    gfm: true,
    remarkPlugins: [remarkDropBrokenImages],
    rehypePlugins: [rehypeImages],
  },
});
