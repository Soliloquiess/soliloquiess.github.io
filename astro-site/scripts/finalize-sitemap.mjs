// 빌드 후처리: /sitemap.xml 을 정본 사이트맵으로 보장한다.
//
// 배경: @astrojs/sitemap 은 sitemap-index.xml + sitemap-0.xml 만 생성하고
// sitemap.xml 은 만들지 않는다. 하지만 Google Search Console 에는 옛 Jekyll
// 시절부터 /sitemap.xml 이 등록돼 있어(성공 이력 있음), 그 경로를 살려두는 게
// 가장 확실하다. GitHub Pages 는 정적 호스팅이라 리다이렉트가 불가능하므로
// 실제 파일을 만들어 둔다.
//
// - URL 목록이 sitemap-0.xml 하나면: 그 urlset 을 그대로 sitemap.xml 로 복사
//   (인덱스 중간단계 없는 단일 사이트맵 → 옛 GSC 성공 형태와 동일).
// - 5만 URL 초과로 분할되면(sitemap-1.xml…): sitemap-index.xml 을 sitemap.xml
//   로 복사(인덱스 형태). 어느 쪽이든 /sitemap.xml 은 항상 최신 상태를 가리킨다.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist');
const parts = fs.existsSync(DIST)
  ? fs.readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f))
  : [];

let source;
if (parts.length === 1) {
  source = path.join(DIST, parts[0]); // 단일 urlset
} else if (parts.length > 1 && fs.existsSync(path.join(DIST, 'sitemap-index.xml'))) {
  source = path.join(DIST, 'sitemap-index.xml'); // 분할 → 인덱스
}

if (source) {
  fs.copyFileSync(source, path.join(DIST, 'sitemap.xml'));
  console.log(`✓ sitemap.xml 생성 완료 (source: ${path.basename(source)})`);
} else {
  console.warn('! sitemap 산출물을 찾지 못해 sitemap.xml 을 만들지 못함');
}
