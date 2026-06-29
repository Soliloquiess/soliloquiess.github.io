#!/usr/bin/env node
// 비번 게이트용 글 암호화 도구
// 사용법:  node scripts/lock.mjs <평문.md> [출력slug]
//   - 평문 마크다운을 HTML로 렌더 → AES-256-GCM 암호화 → src/content/locked/<slug>.json 생성
//   - 비밀번호는 환경변수 LOCK_PW 또는 실행 중 입력
//   - 평문은 절대 저장/커밋되지 않음. 암호문(JSON)만 커밋하면 됨.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';
import { marked } from 'marked';

const ITER = 150000;

function parseFrontmatter(t) {
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
  const slug = (process.argv[3] || path.basename(input).replace(/\.md$/i, ''))
    .trim().replace(/\s+/g, '-');

  const pw = await askPassword();
  if (!pw) { console.error('비밀번호가 비어 있습니다.'); process.exit(1); }

  const html = marked.parse(body);

  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(html, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const ct = Buffer.concat([enc, tag]); // 브라우저 AES-GCM은 tag를 ct 뒤에 붙여 받음

  const out = {
    title: fm.title || slug,
    date: fm.date || new Date().toISOString().slice(0, 10),
    description: fm.description || '🔒 비밀번호로 보호된 글',
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ct: ct.toString('base64'),
  };

  const dir = path.resolve('src/content/locked');
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, slug + '.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('✓ 암호화 완료:', path.relative(process.cwd(), outPath));
  console.log('  제목:', out.title);
  console.log('  → 이 JSON(암호문)만 커밋하면 됩니다. 평문은 커밋하지 마세요.');
}
main();
