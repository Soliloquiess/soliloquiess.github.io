#!/usr/bin/env node
// 이미 잠긴 글의 비밀번호만 바꾼다 (재암호화).
//
// 사용법:  node scripts/rekey.mjs [컬렉션...]
//   컬렉션을 안 주면 locked 과 vault 둘 다 처리한다.
//
// 비밀번호는 환경변수로만 받는다. 화면에 찍지 않는다.
//   OLD_PW  현재 비밀번호
//   NEW_PW  새 비밀번호
//   (또는 OLD_PW_FILE / NEW_PW_FILE 로 파일 경로를 줄 수 있다)
//
// 하는 일: 각 JSON 을 현재 비밀번호로 풀어 제목·본문을 얻고,
//          새 소금(salt)과 새 키로 다시 암호화해 같은 파일에 덮어쓴다.
//          slug(파일명)와 date 는 그대로 두므로 글 주소가 바뀌지 않는다.
//
// 안전장치: 하나라도 복호화에 실패하면 아무것도 쓰지 않고 멈춘다.
//          원본은 .bak 으로 남긴다.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ITER = 150000;

function pw(name) {
  const direct = process.env[name];
  if (direct) return direct;
  const file = process.env[name + '_FILE'];
  if (file && fs.existsSync(file)) return fs.readFileSync(file, 'utf8').replace(/\r?\n+$/, '');
  return '';
}

function keyOf(password, saltB64) {
  return crypto.pbkdf2Sync(password, Buffer.from(saltB64, 'base64'), ITER, 32, 'sha256');
}

function decrypt(key, ivB64, ctB64) {
  const buf = Buffer.from(ctB64, 'base64');
  const tag = buf.subarray(buf.length - 16);
  const data = buf.subarray(0, buf.length - 16);
  const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString('utf8');
}

function encrypt(key, plain) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const e = Buffer.concat([c.update(plain, 'utf8'), c.final()]);
  return { iv: iv.toString('base64'), ct: Buffer.concat([e, c.getAuthTag()]).toString('base64') };
}

function main() {
  const oldPw = pw('OLD_PW');
  const newPw = pw('NEW_PW');
  if (!oldPw || !newPw) {
    console.error('OLD_PW 와 NEW_PW 를 환경변수(또는 OLD_PW_FILE / NEW_PW_FILE)로 주세요.');
    process.exit(1);
  }
  if (oldPw === newPw) {
    console.error('새 비밀번호가 현재 비밀번호와 같습니다.');
    process.exit(1);
  }

  const collections = process.argv.slice(2).length ? process.argv.slice(2) : ['locked', 'vault'];
  const jobs = [];

  // 1단계 — 전부 복호화해 본다. 하나라도 실패하면 중단.
  for (const col of collections) {
    const dir = path.resolve('src/content/' + col);
    if (!fs.existsSync(dir)) { console.error('폴더 없음:', col); process.exit(1); }
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
      const p = path.join(dir, f);
      const j = JSON.parse(fs.readFileSync(p, 'utf8'));
      let k;
      try {
        k = keyOf(oldPw, j.salt);
        jobs.push({ p, col, f, date: j.date, title: decrypt(k, j.ivT, j.ctT), body: decrypt(k, j.ivB, j.ctB) });
      } catch (e) {
        console.error('복호화 실패 →', col + '/' + f, '— 현재 비밀번호가 맞는지 확인하세요. 아무것도 바꾸지 않았습니다.');
        process.exit(1);
      }
    }
  }
  console.log('복호화 확인 완료:', jobs.length + '개');

  // 2단계 — 새 비밀번호로 다시 암호화해 덮어쓴다.
  let done = 0;
  for (const j of jobs) {
    fs.copyFileSync(j.p, j.p + '.bak');
    const salt = crypto.randomBytes(16);
    const k = keyOf(newPw, salt.toString('base64'));
    const t = encrypt(k, j.title);
    const b = encrypt(k, j.body);
    fs.writeFileSync(j.p, JSON.stringify({
      date: j.date, salt: salt.toString('base64'),
      ivT: t.iv, ctT: t.ct, ivB: b.iv, ctB: b.ct,
    }, null, 2));
    done++;
  }
  console.log('재암호화 완료:', done + '개');

  // 3단계 — 새 비밀번호로 다시 읽히는지 검증.
  let ok = 0;
  for (const j of jobs) {
    const n = JSON.parse(fs.readFileSync(j.p, 'utf8'));
    const k = keyOf(newPw, n.salt);
    if (decrypt(k, n.ivT, n.ctT) === j.title && decrypt(k, n.ivB, n.ctB) === j.body) ok++;
  }
  console.log('검증 통과:', ok + ' / ' + jobs.length);
  if (ok !== jobs.length) {
    console.error('검증 실패. .bak 파일로 되돌리세요.');
    process.exit(1);
  }
  console.log('');
  console.log('모두 정상입니다. 확인 후 .bak 파일을 지우세요:');
  console.log('  find src/content -name "*.json.bak" -delete');
}

main();
