// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// ── 사이트맵 lastmod ──────────────────────────────────────────────
// @astrojs/sitemap 은 콘텐츠의 frontmatter 날짜를 lastmod 로 자동으로 넣지
// 않는다. lastmod 가 없으면 Google 은 "바뀔 이유 없는 파일"로 보고 재수집을
// 계속 미룬다(그래서 GSC '읽은 날짜'가 오래 고정됨). 여기서 각 글의 frontmatter
// 를 직접 읽어 permalink → 최종수정일 맵을 만들고, serialize 로 주입한다.
//   - 우선순위: updated(있으면) > date
//   - 홈(/)에는 가장 최신 글 날짜를 넣어 "새 글 올라옴" 신호를 준다.
const BLOG_DIR = path.resolve('./src/content/blog');

/** frontmatter 블록에서 key 값을 뽑아 앞뒤 따옴표 제거 */
function readField(block, key) {
  const m = block.match(new RegExp('^' + key + '\\s*:\\s*(.+)$', 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

/** URL 경로/퍼머링크를 비교 가능한 형태로 정규화(디코드·슬래시·.html 제거) */
function normalizePath(p) {
  return decodeURIComponent(p).replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
}

/** permalink → ISO 날짜 문자열 맵 + 전체 최신 날짜 계산 */
function buildLastmodMap() {
  const map = new Map();
  let newest = null;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === '_private') continue; // 비공개/암호화 소스 제외
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!entry.name.endsWith('.md')) continue;
      try {
        const raw = fs.readFileSync(full, 'utf8');
        const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!fm) continue;
        const block = fm[1];
        const permalink = readField(block, 'permalink');
        const stamp = readField(block, 'updated') || readField(block, 'date');
        if (!permalink || !stamp) continue;
        const d = new Date(stamp);
        if (isNaN(d.getTime())) continue;
        const iso = d.toISOString();
        map.set(normalizePath(permalink), iso);
        if (!newest || iso > newest) newest = iso;
      } catch { /* 개별 파일 오류는 무시하고 계속 */ }
    }
  };
  if (fs.existsSync(BLOG_DIR)) walk(BLOG_DIR);
  return { map, newest };
}

const { map: LASTMOD, newest: NEWEST } = buildLastmodMap();

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
      // 각 글 URL 에 frontmatter 기반 lastmod 주입. 홈(/)엔 최신 글 날짜.
      serialize(item) {
        const key = normalizePath(new URL(item.url).pathname);
        const iso = key === '' ? NEWEST : LASTMOD.get(key);
        if (iso) item.lastmod = iso;
        return item;
      },
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
