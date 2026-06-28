// 빌드 전 정적 자산 복사: 저장소 루트의 /assets → public/assets (+ favicon 등)
// prebuild 훅으로 로컬/CI 양쪽에서 자동 실행됨
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), '..');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const assetsSrc = path.join(ROOT, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, path.join(PUBLIC_DIR, 'assets'), { recursive: true });
  console.log('✓ assets 복사 완료');
} else {
  console.warn('! assets 폴더를 찾을 수 없음:', assetsSrc);
}

for (const f of ['favicon.ico', 'robots.txt', 'ads.txt']) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(PUBLIC_DIR, f));
}
