// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// ── 사이트맵 lastmod ──────────────────────────────────────────────
// @astrojs/sitemap 은 콘텐츠의 frontmatter 날짜를 lastmod 로 자동으로 넣지
// 않는다. lastmod 가 없으면 Google 은 "바뀔 이유 없는 파일"로 보고 재수집을
// 계속 미룬다(그래서 GSC '읽은 날짜'가 오래 고정됨). 여기서 각 글의 frontmatter
// 를 직접 읽어 permalink → 최종수정일 맵을 만들고, serialize 로 주입한다.
//   - 우선순위: updated(있으면) > date
//   - 홈(/)에는 가장 최신 글 날짜를 넣어 "새 글 올라옴" 신호를 준다.
//
// 글 외의 페이지(태그·카테고리 목록, 페이지네이션, 정적 페이지)도 실제 수정일을
// 계산해 채운다. Google 은 lastmod 가 "일관되게 부정확"하면 그 사이트맵의 lastmod
// 를 통째로 무시하므로, 값은 반드시 실제 근거가 있어야 한다.
//   - /tags/{태그}      : 그 태그가 붙은 글 중 최신 날짜
//   - /categories/{분류}: 그 분류의 글 중 최신 날짜
//   - /page/{N}         : 그 페이지에 실제로 실리는 글 중 최신 날짜
//   - /archive          : 전체 최신 글 날짜(모든 글을 나열하므로)
//   - /about /privacy /search : 해당 .astro 파일의 git 최종 커밋일
// 근거를 만들 수 없으면 넣지 않는다(추측 금지).
const BLOG_DIR = path.resolve('./src/content/blog');
const SITE_TS = path.resolve('./src/lib/site.ts');

/** frontmatter 블록에서 key 값을 뽑아 앞뒤 따옴표 제거 */
function readField(block, key) {
  const m = block.match(new RegExp('^' + key + '\\s*:\\s*(.+)$', 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

/** frontmatter 의 인라인 배열(tags: ["a","b"]) 또는 단일 스칼라를 배열로 */
function readList(block, key) {
  const raw = readField(block, key);
  if (!raw) return [];
  const s = raw.trim();
  if (!s.startsWith('[')) return [s].filter(Boolean);
  const end = s.lastIndexOf(']');
  return (end > 0 ? s.slice(1, end) : s.slice(1))
    .split(',')
    .map((t) => t.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

/** 페이지네이션 크기는 site.ts 의 SITE.postsPerPage 가 정본 — 값 드리프트 방지 */
function readPostsPerPage() {
  try {
    const m = fs.readFileSync(SITE_TS, 'utf8').match(/postsPerPage\s*:\s*(\d+)/);
    if (m) return Number(m[1]);
  } catch { /* 없으면 아래 기본값 */ }
  return 8;
}

/**
 * 파일의 git 최종 커밋일(ISO). 얕은 클론(fetch-depth:1)이라 이력이 없거나
 * git 자체가 없으면 null → lastmod 를 넣지 않는다(날짜 지어내지 않음).
 */
function gitLastModified(relPath) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', relPath], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (!out) return null;
    const d = new Date(out);
    return isNaN(d.getTime()) ? null : d.toISOString();
  } catch {
    return null;
  }
}

/** URL 경로/퍼머링크를 비교 가능한 형태로 정규화(디코드·슬래시·.html 제거) */
function normalizePath(p) {
  return decodeURIComponent(p).replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
}

/** permalink → ISO 날짜 문자열 맵 + 전체 최신 날짜 + 목록 페이지 계산용 글 정보 */
function buildLastmodMap() {
  const map = new Map();
  const posts = [];
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
        if (readField(block, 'draft') === 'true') continue; // getPublishedPosts() 와 동일 기준
        const permalink = readField(block, 'permalink');
        const stamp = readField(block, 'updated') || readField(block, 'date');
        if (!permalink || !stamp) continue;
        const d = new Date(stamp);
        if (isNaN(d.getTime())) continue;
        const iso = d.toISOString();
        map.set(normalizePath(permalink), iso);
        // 목록 정렬은 date 기준(글 표시 순서와 동일), lastmod 는 updated 우선
        const dateOnly = new Date(readField(block, 'date') || stamp);
        posts.push({
          iso,
          sortKey: isNaN(dateOnly.getTime()) ? iso : dateOnly.toISOString(),
          tags: readList(block, 'tags'),
          category: readField(block, 'category'),
        });
        if (!newest || iso > newest) newest = iso;
      } catch { /* 개별 파일 오류는 무시하고 계속 */ }
    }
  };
  if (fs.existsSync(BLOG_DIR)) walk(BLOG_DIR);
  return { map, newest, posts };
}

/** 태그·카테고리·페이지네이션·정적 페이지의 lastmod 맵 (키는 normalizePath 형태) */
function buildDerivedLastmod(posts, newest) {
  const derived = new Map();
  const bump = (rawKey, iso) => {
    if (!iso) return;
    const key = normalizePath(rawKey);
    const cur = derived.get(key);
    if (!cur || iso > cur) derived.set(key, iso);
  };

  for (const p of posts) {
    if (p.category) bump(`categories/${p.category}`, p.iso);
    for (const t of p.tags) bump(`tags/${t}`, p.iso);
  }

  // 목록은 date 내림차순, 1페이지는 index.astro(/) 담당이라 2페이지부터 생성된다
  const sorted = [...posts].sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  const size = readPostsPerPage();
  const lastPage = Math.max(1, Math.ceil(sorted.length / size));
  for (let n = 2; n <= lastPage; n++) {
    const slice = sorted.slice((n - 1) * size, n * size);
    // 슬라이스 내 최신값 — 정렬이 date 기준이라 updated 가 섞여도 안전하게 max 로
    for (const p of slice) bump(`page/${n}`, p.iso);
  }

  // 전체 글/태그/분류를 나열하는 페이지 → 글이 하나라도 추가·수정되면 목록이나
  // 개수가 바뀌므로 최신 글 날짜가 곧 이 페이지들의 마지막 변경일
  bump('archive', newest);
  bump('tags', newest);
  bump('categories', newest);

  // 콘텐츠 파생이 아닌 정적 페이지는 파일의 git 최종 커밋일이 실제 수정일
  for (const [route, file] of [
    ['about', 'src/pages/about.astro'],
    ['privacy', 'src/pages/privacy.astro'],
    ['search', 'src/pages/search.astro'],
  ]) {
    bump(route, gitLastModified(file));
  }

  return derived;
}

const { map: LASTMOD, newest: NEWEST, posts: POSTS } = buildLastmodMap();
const DERIVED_LASTMOD = buildDerivedLastmod(POSTS, NEWEST);

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
      // 글이 아니면 태그·카테고리·페이지네이션·정적 페이지용 파생 맵에서 찾는다.
      serialize(item) {
        const key = normalizePath(new URL(item.url).pathname);
        const iso = key === '' ? NEWEST : (LASTMOD.get(key) ?? DERIVED_LASTMOD.get(key));
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
