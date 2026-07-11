---
title: "[Claude] 영역을 끌어 AI로 고치는 발표툴 — slides-grab"
date: 2026-07-11
category: "Claude"
tags: ["Claude", "Claude Code"]
description: "슬라이드에서 영역을 마우스로 끌어 AI에게 그 부분만 고치게 하는 발표자료 제작/편집 도구 slides-grab의 설치·워크플로·예시 프롬프트를 정리한다."
permalink: "2026/07/11/slides-grab"
---

> 이전 노트: [AI 티 안 나는 발표자료 만들기 — frontend-slides](/2026/07/11/frontend-slides.html)

> 이름은 "grab"이지만 슬라이드를 수집하는 게 아니라, 슬라이드를 만들고 **영역을 마우스로 끌어 그 부분만 AI에게 고치게** 하는 발표툴이다. 앞의 frontend-slides와 결이 다른, 편집 중심 도구.

---

## 1. slides-grab란

> 슬라이드를 HTML/CSS로 생성하는 발표자료 **제작·편집 도구**. 다른 도구와 갈리는 지점은 편집 방식 — **브라우저 편집기에서 커서로 영역(bbox)을 선택해 "이 부분만 이렇게 고쳐줘"라고 AI에게 요청**한다.

출처: https://github.com/NomaDamas/slides-grab

| 구분 | frontend-slides | slides-grab |
|------|------------------|-------------|
| 초점 | 스타일 시안 골라 한 번에 생성 | Plan→Design→**Edit(영역 끌어 수정)**→Export 워크플로 |
| 편집 | 프롬프트로 재생성 | 브라우저 편집기에서 bbox 선택 후 부분 수정 |
| 출력 | 단일 HTML + PDF | HTML + PDF + PPTX(실험)·Figma |

> 한 줄 요약: **slides-grab = "만든 뒤 영역을 끌어 부분만 고치는" 편집 중심 발표툴** — 한 번에 뽑는 frontend-slides와 대비된다.

---

## 2. 설치 (Claude Code)

**간편: 설치 문서를 Claude가 읽고 따라하게**

```
Read https://raw.githubusercontent.com/NomaDamas/slides-grab/main/docs/installation/claude.md and follow every step.
```

(Codex는 `.../codex.md`)

**수동 단계**

```
npm install slides-grab
npx playwright install chromium        # 렌더링용 크로미움
npx slides-grab install-skills --target claude-code --scope user
```

설치 확인: `slides-grab --help`, 그 뒤 **Claude Code 재시작**(스킬이 `~/.claude/skills/`에 로드됨).

설치 후 쓸 수 있는 스킬 4종:

| 스킬 | 역할 |
|------|------|
| `slides-grab-plan` | Plan 단계 |
| `slides-grab-design` | Design 단계 |
| `slides-grab-export` | Export 단계 |
| `slides-grab` | 전체/편집 통합 진입점 |

<!-- [스크린샷 자리] /assets/slides-grab-1-install.png — 설치 완료 후 스킬 목록 화면 -->

> 한 줄 요약: **설치 문서를 Claude에 읽히거나(간편), npm 설치 + Playwright + install-skills 수동 3단계. 재시작하면 4종 스킬 사용 가능.**

---

## 3. 워크플로 — Plan → Design → Edit → Export

| 단계 | 내용 |
|------|------|
| Plan | 주제로부터 구조화된 발표 개요 생성 |
| Design | 각 슬라이드를 독립 HTML로 생성 |
| Edit | **브라우저 편집기에서 영역(bbox) 선택 → AI가 그 부분 재작성** |
| Export | PDF / 실험적 PPTX / Figma로 내보내기 |

Edit 단계가 이 도구의 정체성이다. 완성된 시안을 처음부터 다시 만들지 않고, 마음에 안 드는 영역만 끌어서 고치는 방식.

<!-- [스크린샷 자리] /assets/slides-grab-2-edit.png — 브라우저 편집기에서 bbox 영역 선택 화면 -->
<!-- [스크린샷 자리] /assets/slides-grab-3-final.png — 완성된 슬라이드 화면 -->

> 한 줄 요약: **Plan(개요)→Design(HTML 생성)→Edit(영역 끌어 수정)→Export(PDF/PPTX/Figma).**

---

## 4. 주요 CLI 명령

| 명령 | 역할 |
|------|------|
| `slides-grab edit` | 비주얼 편집기 실행 |
| `slides-grab pdf` | PDF로 내보내기(여러 해상도) |
| `slides-grab png` | 슬라이드당 PNG 1장 렌더 |
| `slides-grab convert` | 실험적 PPTX 변환 |
| `slides-grab figma` | Figma로 가져올 PPTX 내보내기(실험) |
| `slides-grab list-styles` | 번들 디자인 스타일 95종 보기(기본 92종 선택 가능) |
| `slides-grab image --prompt "..."` | 슬라이드용 이미지 생성(기본은 Codex 로그인 재사용, `--provider`로 OpenAI·Gemini 등 지정) |

> 주의: `pdf`·`convert`·`figma`는 먼저 `slides-grab design-gate proceed`로 현재 슬라이드 파일을 검증해야 동작한다(`png`은 게이트 없이 가능).

> 한 줄 요약: **내보내기 계열 명령은 실행 전 `design-gate proceed` 검증이 선행돼야 한다.**

---

## 5. 예시 프롬프트 (그대로)

강의에서 쓴 프롬프트 원문:

```
/slides-grab-plan https://github.com/NomaDamas/slides-grab
이 링크를 조사를 하고 slides grab 을 잘 사용하는 방법에 대해서 소개를 하는 발표 자료를 만들어고 싶어.
```

`/slides-grab-plan`은 Plan 단계 스킬이며, 링크(자료)를 조사해 발표 개요부터 잡아준다. 이후 design→edit→export로 이어간다.

> 💡 frontend-slides는 "빠르게 한 벌 생성", slides-grab은 "만들고 영역을 끌어 다듬기" — 필요에 따라 골라 쓰면 된다.

> 한 줄 요약: **`/slides-grab-plan`으로 자료 조사부터 시작해 design→edit→export까지 이어가면 된다.**

---
