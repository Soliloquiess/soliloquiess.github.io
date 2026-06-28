// _posts/**/*.md (Jekyll) → src/content/blog/**/*.md (Astro)
// - 기존 URL(.../slug) 보존: 카테고리(front matter 우선, 없으면 폴더) + 날짜 + 슬러그
// - front matter 정규화(없는 글 보강), 중복 permalink 제거, Jekyll 잔재 정리
// - ../assets → public/assets 복사
import fs from 'node:fs';
import path from 'node:path';

// YAML 더블쿼트 스칼라 (특수문자/한글 안전)
function q(s) { return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'; }
function serializeFM(d) {
  return [
    '---',
    `title: ${q(d.title)}`,
    `date: ${d.date}`,
    `category: ${q(d.category)}`,
    `tags: [${d.tags.map(q).join(', ')}]`,
    `description: ${q(d.description)}`,
    `permalink: ${q(d.permalink)}`,
    '---',
    '',
  ].join('\n');
}

// front matter를 안전하게 분리/파싱 (깨진 YAML도 죽지 않게, 라인 단위)
function parseFM(raw) {
  raw = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  if (!raw.startsWith('---')) return { data: {}, content: raw };
  const m = raw.match(/^---\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return { data: {}, content: raw };
  return { data: looseParse(m[1]), content: raw.slice(m[0].length) };
}

// front matter를 줄 단위로 회수 (깨진 YAML/멀티라인도 안전)
function looseParse(block) {
  const d = {};
  const lines = block.split('\n');
  let lastKey = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) {
      lastKey = kv[1];
      let v = kv[2].trim();
      if (v === '>' || v === '|' || v === '>-' || v === '|-') {
        // 폴디드/리터럴 스칼라: 들여쓴 다음 줄들을 모음
        const buf = [];
        while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) { buf.push(lines[++i].trim()); }
        d[lastKey] = buf.join(' ');
      } else {
        v = v.replace(/^["']|["']$/g, '');
        d[lastKey] = v === '' ? [] : v;
      }
    } else {
      const item = line.match(/^\s*-\s*(.+)$/);
      if (item && lastKey) {
        if (!Array.isArray(d[lastKey])) d[lastKey] = [];
        d[lastKey].push(item[1].trim().replace(/^["']|["']$/g, ''));
      }
    }
  }
  return d;
}

const ROOT = path.resolve(process.cwd(), '..');          // 저장소 루트
const POSTS_DIR = path.join(ROOT, '_posts');
const OUT_DIR = path.resolve(process.cwd(), 'src/content/blog');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

// 파일명에서 날짜와 제목 분리: YYYY-MM-DD 다음에 - . 또는 공백
function parseFilename(base) {
  const name = base.replace(/\.md$/i, '');
  const m = name.match(/^(\d{4})-(\d{2})-(\d{2})[-.\s]+(.+)$/);
  if (!m) return null;
  return { y: m[1], mo: m[2], d: m[3], title: m[4].trim() };
}

// Jekyll 기본 슬러그: 공백 → 하이픈, 그 외(쉼표/점/괄호/밑줄/대소문자/한글)는 보존
function slugify(title) {
  return title.trim().replace(/\s+/g, '-');
}

function toArray(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  return String(v).split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
}

function cleanContent(body) {
  let s = body;
  // {% youtube ID %} → 임베드
  s = s.replace(/\{%\s*youtube\s+([^\s%}]+)\s*%\}/g,
    (_, id) => `\n<div class="embed-container"><iframe src="https://www.youtube.com/embed/${id}" loading="lazy" allowfullscreen></iframe></div>\n`);
  // 기타 liquid 태그/출력 제거
  s = s.replace(/\{%[^%]*%\}/g, '');
  s = s.replace(/\{\{\s*site\.url\s*\}\}/g, '');
  s = s.replace(/\{\{[^}]*\}\}/g, '');
  // 인라인 AdSense 스크립트/ins 제거 (광고는 레이아웃에서 처리)
  s = s.replace(/<script[^>]*adsbygoogle[^>]*>[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<script[^>]*pagead2[^>]*>[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<ins[^>]*adsbygoogle[\s\S]*?<\/ins>/gi, '');
  s = s.replace(/\(adsbygoogle\s*=\s*window\.adsbygoogle[^\n]*\}\);?/g, '');
  return s.trim();
}

function firstHeading(body) {
  const m = body.match(/^#{1,3}\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function makeDescription(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~\-|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, 120);
}

// 라이브 sitemap에서 기존 URL을 가져와 (yyyy/mm/dd/slug) → 전체경로 매핑
async function buildJekyllUrlMap() {
  const map = new Map();
  try {
    const res = await fetch('https://soliloquiess.github.io/sitemap.xml');
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      let p = m[1].replace(/^https?:\/\/[^/]+\//, '').replace(/\.(html|txt)$/i, '');
      p = decodeURIComponent(p);
      const segs = p.split('/').filter(Boolean);
      if (segs.length < 4) continue;
      const key = segs.slice(-4).join('/'); // yyyy/mm/dd/slug
      if (!map.has(key)) map.set(key, p);
    }
    console.log(`  (sitemap에서 기존 URL ${map.size}개 로드)`);
  } catch (e) {
    console.warn('  ! sitemap 로드 실패 — 계산된 URL 사용:', e.message);
  }
  return map;
}

// ---- 실행 ----
const jekyllMap = await buildJekyllUrlMap();
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const files = walk(POSTS_DIR);
const seen = new Map();      // permalink → source
let written = 0, skippedNoDate = 0, skippedDup = 0;
const dupList = [], noDateList = [];

for (const file of files) {
  const rel = path.relative(POSTS_DIR, file);
  const base = path.basename(file);
  const fn = parseFilename(base);
  if (!fn) { skippedNoDate++; noDateList.push(rel); continue; }

  const parsed = parseFM(fs.readFileSync(file, 'utf8'));
  const fm = parsed.data || {};

  // 날짜: front matter 우선
  let y = fn.y, mo = fn.mo, d = fn.d;
  if (fm.date) {
    const dm = String(fm.date).match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dm) { y = dm[1]; mo = dm[2]; d = dm[3]; }
  }

  // URL 카테고리: front matter categories 우선, 없으면 _posts 하위 폴더 경로
  const dirParts = path.dirname(rel).split(path.sep).filter((x) => x && x !== '.');
  const slug = slugify(fn.title);

  // 1순위: 라이브 sitemap의 기존 URL 그대로 (날짜는 front matter/파일명 둘 다 시도)
  let permalink = jekyllMap.get(`${y}/${mo}/${d}/${slug}`)
    || jekyllMap.get(`${fn.y}/${fn.mo}/${fn.d}/${slug}`);
  // 2순위(신규 글 등): front matter categories, 없으면 루트
  if (!permalink) {
    const catPath = toArray(fm.categories ?? fm.category).map(slugify).join('/');
    permalink = [catPath, y, mo, d, slug].filter(Boolean).join('/');
  }

  if (seen.has(permalink)) { skippedDup++; dupList.push(`${rel}  ==  ${seen.get(permalink)}`); continue; }
  seen.set(permalink, rel);

  // 표시용 카테고리: 바로 위 폴더명 (없으면 URL 첫 카테고리)
  const displayCategory = dirParts.length ? dirParts[dirParts.length - 1] : (urlCats[0] || 'etc');

  const title = (fm.title && String(fm.title).trim()) || firstHeading(parsed.content) || fn.title;
  const tags = toArray(fm.tags);
  const body = cleanContent(parsed.content);
  const description = (fm.description && String(fm.description).trim())
    || (fm.subtitle && String(fm.subtitle).trim())
    || makeDescription(body);

  const out = serializeFM({
    title,
    date: `${y}-${mo}-${d}`,
    category: displayCategory,
    tags,
    description,
    permalink,
  }) + body + '\n';

  const outPath = path.join(OUT_DIR, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out, 'utf8');
  written++;
}

// 이미지/정적 자산 복사
const assetsSrc = path.join(ROOT, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, path.join(PUBLIC_DIR, 'assets'), { recursive: true });
}
for (const f of ['favicon.ico', 'robots.txt', 'ads.txt']) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(PUBLIC_DIR, f));
}

console.log(`\n✅ 변환 완료`);
console.log(`  - 작성:        ${written}`);
console.log(`  - 날짜없음 skip: ${skippedNoDate}`);
console.log(`  - 중복 skip:    ${skippedDup}`);
if (noDateList.length) console.log(`\n[날짜 없는 파일]\n  ` + noDateList.join('\n  '));
if (dupList.length) console.log(`\n[중복 permalink]\n  ` + dupList.join('\n  '));
