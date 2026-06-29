#!/usr/bin/env node
// 폴더 내 모든 .md를 한 비밀번호로 일괄 암호화 (제목+본문 모두 암호화, 파일명은 해시)
// 사용법:  node scripts/lock-batch.mjs <평문폴더> [컬렉션=vault]
//   비번은 LOCK_PW 환경변수 또는 실행 중 1회 입력. 평문/제목은 공개에 안 남음(암호문 JSON만).
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

function makeEnc(key) {
  return (plain) => {
    const iv = crypto.randomBytes(12);
    const c = crypto.createCipheriv('aes-256-gcm', key, iv);
    const e = Buffer.concat([c.update(plain, 'utf8'), c.final()]);
    const tag = c.getAuthTag();
    return { iv: iv.toString('base64'), ct: Buffer.concat([e, tag]).toString('base64') };
  };
}

async function main() {
  const srcDir = process.argv[2];
  const collection = (process.argv[3] || 'vault').replace(/[^a-z]/gi, '') || 'vault';
  if (!srcDir || !fs.existsSync(srcDir)) {
    console.error('사용법: node scripts/lock-batch.mjs <평문폴더> [컬렉션=vault]');
    process.exit(1);
  }
  const pw = await askPassword();
  if (!pw) { console.error('비밀번호가 비어 있습니다.'); process.exit(1); }

  const outDir = path.resolve('src/content/' + collection);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith('.md') && !f.startsWith('_'));
  let n = 0;
  for (const f of files) {
    const raw = fs.readFileSync(path.join(srcDir, f), 'utf8');
    const { fm, body } = parseFrontmatter(raw);
    const title = fm.title || f.replace(/\.md$/i, '');
    const date = fm.date || new Date().toISOString().slice(0, 10);
    const description = fm.description || '';
    const html = marked.parse(body);

    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
    const enc = makeEnc(key);
    const tEnc = enc(JSON.stringify({ title, description }));
    const bEnc = enc(html);

    // 파일명(slug)은 제목 노출 방지 위해 해시
    const slug = crypto.createHash('sha256').update(title + '|' + date).digest('hex').slice(0, 16);

    const out = {
      date,
      salt: salt.toString('base64'),
      ivT: tEnc.iv, ctT: tEnc.ct,
      ivB: bEnc.iv, ctB: bEnc.ct,
    };
    fs.writeFileSync(path.join(outDir, slug + '.json'), JSON.stringify(out, null, 2));
    console.log('  ✓', title, '→', slug + '.json');
    n++;
  }
  console.log(`\n총 ${n}개 암호화 → src/content/${collection}/  (제목·본문 모두 암호화, 파일명 해시)`);
}
main();
