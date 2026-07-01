---
title: "Pencil.dev & DESIGN.md — 디자인을 코드로"
date: 2026-06-27
category: "Claude"
tags: ["Claude", "Pencil", "DESIGN.md"]
description: "AI 코딩 시대의 '디자인 → 코드' 도구·포맷 — Pencil.dev와 DESIGN.md의 정체·활용법·한계를 정리한 노트."
permalink: "2026/06/27/pencil-designmd"
---
# Pencil.dev & DESIGN.md — 디자인을 코드로

> 작성일: 2026-06-27
> 주제: AI 코딩 시대의 "디자인 → 코드" 도구·포맷 — Pencil, DESIGN.md, getdesign.md, 크롬 확장
> 관련 노트: 2026-06-27-claude-code-notes_2.md 의 10(MCP)·11(Visual Companion)·18(Pencil)·19(DESIGN.md)번 상세판

---

## 1. 한눈에 — 이 셋의 관계

| 도구/포맷 | 역할 | 한 줄 |
|-----------|------|-------|
| **Pencil.dev** | 그리는 캔버스 | IDE 안 캔버스에서 디자인 → 코드로 |
| **DESIGN.md** | 디자인 명세(기준) | AI가 읽는 디자인 시스템 문서 |
| **getdesign.md** | DESIGN.md 카탈로그 | 남이 만든 DESIGN.md 골라 쓰기 |
| **DESIGN.md 크롬 확장** | 추출기 | 아무 사이트의 디자인을 DESIGN.md로 추출 |

```
[DESIGN.md] 기준 정하기 ──┐
  getdesign.md(고르기) /   ├─→ Claude Code / Pencil 이 읽고
  크롬확장(사이트서 추출)  ┘    → 일관된 UI 코드 생성
[Pencil] 캔버스에서 직접 그리기 ──→ 코드 export
```

---

## 2. Pencil.dev — 정체

> 슬로건: **"Design on canvas. Land in code."** (pencil.dev)

**IDE(VS Code·Cursor) 안에 들어오는 벡터 디자인 캔버스.** 캔버스에서 그리면 깔끔한 HTML/CSS/React 코드로 떨어지고, 실행 시 **로컬 MCP 서버**가 켜져 Claude Code 같은 AI가 캔버스를 사람 디자이너처럼 직접 조작한다.

- 핵심 차별점: 디자인이 **별도 툴(Figma)이 아니라 코드 레포 안**에 `.pen` 파일로 존재 → 디자인↔코드 drift(어긋남) 제거
- **얼리액세스 100% 무료** (제한 없음)

---

## 3. 설치 & 첫 실행 (가장 중요)

### 3-1. IDE 확장 설치

**VS Code**
1. VS Code 실행
2. 확장 열기 (`Cmd/Ctrl + Shift + X`)
3. **"Pencil"** 검색 → **Install**

**Cursor**
1. Cursor 실행 → 확장 → **"Pencil"** 검색 → **Install**

### 3-2. 설치 확인
- `test.pen` 파일 생성 → 열었을 때 에디터 **우상단에 Pencil 아이콘**이 보이면 정상
- 안 보이면 명령 팔레트(`Cmd/Ctrl + Shift + P`) → "Pencil" 검색 → 확장 활성화 확인

### 3-3. Claude Code 인증 (AI 기능 전제)
```bash
npm install -g @anthropic-ai/claude-code-cli
claude            # 브라우저 인증 플로우 진행
claude --version  # 확인
```

### 3-4. 첫 실행 워크플로
1. **Pencil 활성화** — 활성화 이메일을 받아 완료
2. **Claude Code 로그인** — AI 연동에 필수
3. **Welcome 파일 열기** — 캔버스 우클릭 → "Open Welcome File"
4. **첫 디자인** — 새 `.pen` 파일 생성해 시작

> 참고: MCP 서버는 Pencil 실행 시 **자동 기동**. 확장이 연결 안 되면 Claude Code 로그인 확인 후 IDE 재시작.

---

## 4. 핵심 개념 (.pen 파일)

| 개념 | 설명 |
|------|------|
| **`.pen` 파일** | 디자인을 담는 **JSON 기반** 파일. `/design` 폴더 등 레포 안에 둠 |
| **Design as code** | 디자인을 코드처럼 git으로 관리 (commit·branch·merge) |
| **Variables** | 디자인 변수 → CSS 변수에 매핑 (토큰 시스템) |
| **Components / Slots** | 재사용 컴포넌트·슬롯 구조 |
| **AI-readable** | AI가 좌표·토큰·구조를 정확히 읽음 |

> 권장: `.pen`을 **소스코드 옆에** 두면 AI가 디자인+구현을 같이 읽어 정확도↑.

---

## 5. 코드 Export (상세)

캔버스 디자인을 **여러 스택**으로 코드 생성. 방식은 **AI 채팅(`Cmd/Ctrl + K`)에 자연어로 요청** → 채팅으로 코드 산출(자동 파일 생성이 아니라 채팅 기반).

### 지원 범위

| 분류 | 지원 |
|------|------|
| **프레임워크** | React · Next.js · Vue · Svelte · 순수 HTML/CSS |
| **스타일링** | Tailwind CSS · CSS Modules · Styled Components · 바닐라 CSS |
| **컴포넌트 라이브러리** | shadcn/ui · Radix UI · Chakra UI · Material UI · 커스텀 |
| **아이콘** | Lucide · Heroicons · FontAwesome · React Icons + 내장(Material Symbols·Feather·Phosphor) |

### Export 절차
```
① 캔버스에서 디자인
② .pen 저장
③ Cmd/Ctrl + K 로 AI 채팅 열기
④ 자연어로 요청
```
**예시 프롬프트**
```
"이 버튼을 React 컴포넌트로 만들어줘"
"이 디자인을 Tailwind 쓰는 Next.js 페이지로 생성해줘"
"이 카드를 재사용 컴포넌트로 export 해줘"
"Shadcn UI 컴포넌트로 export 해줘"
"폼에 대한 TypeScript 타입 생성해줘"
```

---

## 6. 양방향 동기화 (Design ↔ Code)

| 방향 | 방법 |
|------|------|
| **Design → Code** | 캔버스 디자인 → 컴포넌트 코드 생성 |
| **Code → Design** | `"src/components/Button.tsx의 Button을 캔버스로 복원해줘"` → 기존 코드를 캔버스로 가져옴 |
| **반복 사이클** | 코드 import → 시각 수정 → 다시 코드로 sync → **drift 없음** |

### 변수·토큰 동기화
- CSS → Pencil: `"내 globals.css로 Pencil 변수 만들어줘"`
- Pencil → CSS: `"이 디자인 토큰을 내 CSS로 sync해줘"`
- Pencil 변수 ↔ CSS 변수 매핑 → 공유 토큰 시스템 구축·유지

### Git-native & Figma
- `.pen`을 코드처럼 commit·branch·merge. **롤백하면 디자인도 함께 롤백**
- **Figma 복붙**: 프레임 복사 → Pencil 붙여넣기 (레이어·오토레이아웃·스타일 보존)
- 사전 디자인 시스템 4종: **Shadian · Halo · Lunarus · Nitro** (토큰·패턴·반응형 내장)

---

## 7. MCP 연동 (AI가 캔버스를 조작)

- Pencil 실행 → **로컬 MCP 서버 기동** (원격 API 안 거침)
- 지원: Claude Code · Cursor · Codex CLI · Claude Desktop · Windsurf 등 MCP 지원 도구
- "이 컴포넌트 만들어" 요청 시 AI가 `.pen`의 **정확한 좌표·토큰·구조를 읽어** 코드 생성
- 🔗 MCP 개념은 메인 노트 10번 참조 (Pencil = 캔버스를 노출하는 MCP 서버)

---

## 8. DESIGN.md (디자인 명세 포맷)

> Google Stitch가 도입. **AI가 읽는 디자인 시스템 명세 파일**(프로젝트 루트 .md).

### 구조
- **상단**: 기계가 읽는 토큰 (YAML — 색 hex·폰트·간격·radius·그림자·컴포넌트 스타일)
- **하단**: 사람이 읽는 근거(rationale) — 왜 이 값인지, 어떻게 적용하는지

### AI 지시의 3계층
| 파일 | 담당 |
|------|------|
| **AGENTS.md** | 행동(어떻게 일하나) |
| **SKILL.md** | 작업(특정 절차) |
| **DESIGN.md** | 외형(어떻게 보이나) |

- `CLAUDE.md`가 `DESIGN.md`를 참조하게 설정 → Claude Code·Cursor·v0 등이 **일관된 브랜드 UI** 생성
- 한계(요약): 강제력 없음(이탈 가능)·동기화 필요·컨텍스트 비용·검증 부재 — 상세는 메인 노트 19번

---

## 9. getdesign.md — DESIGN.md 카탈로그

> **유명 브랜드 75개+(Stripe·Figma·Apple·Tesla·Airbnb…)의 디자인 시스템을 DESIGN.md로 분석해둔 참고 모음집.** 생성기가 아니라 **레퍼런스**.

### 무엇을 주나
- 항목마다 "프로덕션급 DESIGN.md 분석" — 분석된 패턴·토큰·규칙 + 디자인 철학 요약 (예: Airbnb = "따뜻한 코랄 강조·사진 중심·둥근 UI")
- **12개 카테고리**로 분류: AI/LLM 플랫폼 · 개발자도구 · 백엔드/DevOps · 생산성/SaaS · 디자인툴 · 핀테크 · 이커머스 · 미디어 등

### 사용법 (워크플로)
```
① getdesign.md / catalog(/design-md) 둘러보기
② 카테고리·산업으로 필터
③ 원하는 느낌과 가까운 디자인 시스템 선택 (예: "Stripe 같은 느낌")
④ 그 DESIGN.md 분석을 요청/확보
⑤ 내 프로젝트 루트 DESIGN.md로 복사·각색
⑥ CLAUDE.md가 DESIGN.md를 참조하게 설정
⑦ Claude Code 프롬프트에 녹여 일관 UI 생성
```

### 무료 vs 유료
| 구분 | 내용 |
|------|------|
| **무료** | 카탈로그 열람 + 비공개 DESIGN.md "요청(request)" |
| **유료** | NewLaunchKit(웹/SaaS/스타트업 스타터 + DESIGN.md 포함), 비공개 맞춤 제작 |

> ⚠️ 주의: getdesign.md **카탈로그 자체**는 "남이 만든 걸 골라 쓰는" 곳 — 내 Figma를 여기에 "올리는" 게 아님. 내 디자인으로 DESIGN.md를 만들려면 아래 ↓

### 내 Figma → DESIGN.md 만들기 (★질문)
내가 가진 Figma 디자인을 DESIGN.md로 뽑는 방법은 여러 갈래:

| 방법 | 사용법 |
|------|--------|
| **getdesign CLI** | 프로젝트 루트에서 `npx getdesign@latest add figma` → 그 다음 AI에게 "DESIGN.md로 UI 작업해줘" |
| **Figma 플러그인** | "DESIGN.md Generator" / bergside "design-md-figma" — Figma 파일의 로컬 스타일을 스캔해 **DESIGN.md / SKILL.md 생성** (Claude Code·Cursor·Codex용) |
| **웹 생성기** | figmadesignmd.com — **Figma 파일·이미지·PDF·링크**를 넣으면 design.md / design-guidelines.md / design-components.md 생성 (Claude AI 기반, 브라우저에서, 무료·비공개) |

#### 💡 추천 팁 — PDF(슬라이드)로 추출해서 넣기
- Figma를 직접 연동하기보다, **Figma 화면을 PDF(슬라이드)로 export → 그 PDF를 생성기에 넣는** 방식이 더 낫다고 함
- 이유: PDF는 화면 단위로 깔끔하게 정리돼 들어가고, 플러그인 권한·연동 이슈 없이 어떤 생성기에도 투입 가능
- 흐름: `Figma → PDF(슬라이드) export → figmadesignmd.com 등에 업로드 → DESIGN.md 생성 → 내 프로젝트 + CLAUDE.md 참조`

> 정리: **카탈로그(getdesign.md)는 "고르기", 내 디자인은 "CLI/플러그인/웹 생성기로 추출".** 실용적으로는 **Figma를 PDF로 빼서 생성기에 넣는 게 편함.**

---

## 10. DESIGN.md 크롬 확장 (사이트에서 자동 추출)

> 아무 웹사이트나 열고 클릭하면 **그 사이트의 디자인 시스템을 DESIGN.md로 추출**해주는 확장. 오픈소스 **TypeUI DESIGN.md 포맷** 기반.

### 대표 확장 (크롬 웹스토어 "DESIGN.md" 검색)
- **DESIGN.md Generator** — 사이트를 클릭 한 번에 DESIGN.md / SKILL.md로
- **DESIGN.md Style Extractor (TypeUI)** — 타이포·색·간격·radius·그림자·모션 추출
- **StyleKit** — 토큰 추출 → Claude Code·Cursor·Copilot·Windsurf용 DESIGN.md
- **Design System Extractor** — Design Tokens JSON / CSS 변수 / Tailwind config로도 내보내기

### 사용법
```
① 크롬 웹스토어에서 "DESIGN.md" 검색 → 설치
② 마음에 드는 디자인의 사이트 열기
③ 확장 아이콘 클릭 → 스타일 자동 추출
④ 생성된 DESIGN.md(또는 SKILL.md)를 내 프로젝트에 저장
⑤ Claude Code/Cursor가 읽어 UI 생성
```

---

## 11. 통합 워크플로 (셋을 합치면)

```
1) 기준 만들기
   getdesign.md에서 고르거나  ┐
   크롬 확장으로 사이트서 추출 ┘ → 내 DESIGN.md (프로젝트 루트)
        │  CLAUDE.md가 DESIGN.md 참조
        ▼
2) 그리기 / 생성
   Pencil 캔버스에서 와이어프레임~UI 그림
        │  (.pen 저장, 로컬 MCP)
        ▼
3) 코드로
   Cmd/Ctrl+K 또는 Claude Code에 요청
   → DESIGN.md 기준 + .pen 구조를 읽어 일관된 React/Next/Vue… 코드 생성
        │
        ▼
4) 유지
   코드↔디자인 양방향 sync, git으로 버전관리 (drift 없음)
```

- **DESIGN.md = 기준(명세)**, **Pencil = 그리는 캔버스**, **getdesign.md/크롬확장 = 기준을 빠르게 마련하는 입력**
- 메인 노트 흐름과 연결: SDD(코딩 전 명세) → Visual Companion(미리보기) → Pencil(캔버스=산출물) → DESIGN.md(외형 명세)

---

## 출처
- Pencil: https://www.pencil.dev/ , https://docs.pencil.dev/ (getting-started/installation, design-and-code/design-to-code)
- DESIGN.md: https://designmd.app/ , departmentofproduct.substack.com "DESIGN.md Explained"
- getdesign.md: https://getdesign.md/
- 크롬 확장: github.com/bergside/design-md-chrome (TypeUI), 크롬 웹스토어 "DESIGN.md Generator / Style Extractor"

> 참고: 각 CLAUDE.md 파일은 200줄 이하로 유지하는 것을 권장
