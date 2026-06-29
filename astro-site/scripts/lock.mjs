#!/usr/bin/env node
// 비번 게이트용 글 암호화 도구
// 사용법:  node scripts/lock.mjs <평문.md> [출력slug] [컬렉션=locked|vault]
//   - 평문 마크다운을 HTML로 렌더 → AES-256-GCM 암호화 → src/content/<컬렉션>/<slug>.json 생성
//   - 비밀번호는 환경변수 LOCK_PW 또는 실행 중 입력
//   - 평문은 절대 저장/커밋되지 않음. 암호문(JSON)만 커밋하면 됨.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';
import { marked } from 'marked';

const ITER = 150000;

function parseFrontmatter(t) {
  t = t.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const fm = {};
  let body = t;
  if (t.startsWith('---')) {
    const end = t.indexOf('\n---', 3);
    if (end > 0) {
      const block = t.slice(3, end);
      body = t.slice(end + 4);
      for (const line of block.split('\n')) {
        const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
        if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  return { fm, body };
}

async function askPassword() {
  if (process.env.LOCK_PW) return process.env.LOCK_PW;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const pw = await new Promise((res) => rl.question('비밀번호 입력: ', res));
  rl.close();
  return pw;
}

async function main() {
  const input = process.argv[2];
  if (!input || !fs.existsSync(input)) {
    console.error('사용법: node scripts/lock.mjs <평문.md> [출력slug]');
    process.exit(1);
  }
  const raw = fs.readFileSync(input, 'utf8');
  const { fm, body } = parseFrontmatter(raw);
  const collection = (process.argv[4] || 'locked').replace(/[^a-z]/gi, '') || 'locked';

  const pw = await askPassword();
  if (!pw) { console.error('비밀번호가 비어 있습니다.'); process.exit(1); }

  const title = fm.title || path.basename(input).replace(/\.md$/i, '');
  const date = fm.date || new Date().toISOString().slice(0, 10);
  const description = fm.description || '';
  const html = marked.parse(body);

  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
  const enc = (plain) => {
    const iv = crypto.randomBytes(12);
    const c = crypto.createCipheriv('aes-256-gcm', key, iv);
    const e = Buffer.concat([c.update(plain, 'utf8'), c.final()]);
    return { iv: iv.toString('base64'), ct: Buffer.concat([e, c.getAuthTag()]).toString('base64') };
  };
  const tEnc = enc(JSON.stringify({ title, description }));
  const bEnc = enc(html);
  const slug = (process.argv[3]) ? String(process.argv[3]).trim().replace(/\s+/g, '-')
    : crypto.createHash('sha256').update(title + '|' + date).digest('hex').slice(0, 16);

  const out = { date, salt: salt.toString('base64'), ivT: tEnc.iv, ctT: tEnc.ct, ivB: bEnc.iv, ctB: bEnc.ct };

  const dir = path.resolve('src/content/' + collection);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, slug + '.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('✓ 암호화 완료:', path.relative(process.cwd(), outPath), '(제목:', title + ')');
  console.log('  → 이 JSON(암호문)만 커밋. 평문은 커밋 금지.');
}
main();
