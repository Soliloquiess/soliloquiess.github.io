#!/usr/bin/env node
// 폴더 내 모든 .md를 한 비밀번호로 일괄 암호화
// 사용법:  node scripts/lock-batch.mjs <평문폴더> [컬렉션=vault]
//   비번은 LOCK_PW 환경변수 또는 실행 중 1회 입력. 평문은 저장/커밋 안 됨(암호문 JSON만).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';
import { marked } from 'marked';

const ITER = 150000;

function parseFrontmatter(t) {
  t = t.replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
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
  const pw = await new Promise((res) => rl.question('보관함 비밀번호 입력: ', res));
  rl.close();
  return pw;
}

function encrypt(html, pw) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(html, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ct: Buffer.concat([enc, tag]).toString('base64'),
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
    const slug = f.replace(/\.md$/i, '').trim().replace(/\s+/g, '-');
    const html = marked.parse(body);
    const enc = encrypt(html, pw);
    const out = {
      title: fm.title || slug,
      date: fm.date || new Date().toISOString().slice(0, 10),
      description: fm.description || '📦 보관함 글',
      ...enc,
    };
    fs.writeFileSync(path.join(outDir, slug + '.json'), JSON.stringify(out, null, 2));
    console.log('  ✓', out.title);
    n++;
  }
  console.log(`\n총 ${n}개 암호화 → src/content/${collection}/`);
  console.log('이 JSON들만 커밋하세요. 평문은 커밋하지 마세요.');
}
main();
