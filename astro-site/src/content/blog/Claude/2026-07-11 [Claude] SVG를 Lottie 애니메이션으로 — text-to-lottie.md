---
title: "[Claude] SVG를 Lottie 애니메이션으로 — text-to-lottie"
date: 2026-07-11T18:00:00+09:00
category: "Claude"
tags: ["Claude", "Claude Code"]
description: "diffusion.studio의 text-to-lottie 스킬로 SVG·로고·텍스트를 Lottie 애니메이션으로 만드는 법 — 설치(에이전트 선택 주의)와 예시 프롬프트 정리."
permalink: "2026/07/11/text-to-lottie"
---

> 이전 노트: [영역을 끌어 AI로 고치는 발표툴 — slides-grab](/2026/07/11/slides-grab.html)

> 버튼 하나, 로더, 로고 같은 걸 웹에서 가볍게 움직이려면 Lottie가 편하다. text-to-lottie는 SVG나 텍스트를 프롬프트로 Lottie 애니메이션으로 만들어주는 스킬이다.

---

## 1. Lottie와 text-to-lottie란

> **Lottie** = JSON 기반 벡터 애니메이션 포맷(원래 Airbnb의 Bodymovin). 파일이 작고, 벡터라 확대해도 안 깨지며, 웹·모바일·Skia **Skottie** 플레이어에서 가볍게 재생된다.

**text-to-lottie**는 diffusion.studio(github.com/diffusionstudio/lottie)가 만든 스킬로, **Lottie/Bodymovin JSON 애니메이션을 생성·편집·수정**해준다. 로컬 Skia **Skottie** 플레이어용 Lottie를 만드는 걸 목표로 한다.

| 항목 | 내용 |
|------|------|
| 포맷 | Lottie(JSON 벡터) |
| 만드는 것 | SVG·로고·텍스트·아이콘 애니메이션 |
| 재생 | 웹(lottie-web)·모바일·Skottie |

> 한 줄 요약: **text-to-lottie = 프롬프트로 Lottie/Bodymovin JSON 애니메이션을 만들고 고치는 스킬.**

---

## 2. 설치 (skills CLI)

```
npx skills add diffusionstudio/lottie
```

처음이면 `skills` CLI(예: skills@1.5.16) 설치 여부를 물음 → `y`. 이후 저장소를 클론하고 설치 마법사가 뜬다.

![npx skills add 실행 화면](/assets/lottie-install-1-add.png)
> 그림: `npx skills add diffusionstudio/lottie` 실행 → skills CLI 설치 확인(y) → 저장소 클론.

**⚠️ 에이전트 선택은 `space`로 하고, `enter`는 확정만!**

여러 코딩 에이전트(Amp·Antigravity·Cline·Codex·Cursor·Gemini CLI·GitHub Copilot·Claude Code·Warp·Zed 등) 목록이 뜬다. 화면 하단 안내가 "↑↓ move, **space select, enter confirm**" — **space로 원하는 에이전트를 토글**하고 **enter로 확정**하는 방식이다. 기본으로 여러 개가 켜져 있을 수 있으니, space로 원하는 것만 켜고 끈 뒤 enter를 눌러야 의도대로 설치된다. 바로 enter만 누르면 조정 없이 기본 선택 그대로 진행된다.

![에이전트 다중 선택 화면](/assets/lottie-install-2-select.png)
> 그림: 설치할 에이전트를 고르는 화면. space로 토글 선택 후 enter로 확정 — 여기서 실수하기 쉽다.

이어서 설치 범위(**Global**)와 방법(**Symlink** 권장 — 단일 소스라 업데이트 쉬움, 또는 **Copy to all agents**)을 선택한다.

![설치 범위·방법 선택](/assets/lottie-install-3-method.png)
> 그림: 설치 범위 Global + 방법 Symlink(권장) 또는 Copy to all agents 선택 화면.

마지막에 설치 요약(`~/.agents/skills/text-to-lottie`)과 **보안 평가**(Gen: Safe · Socket: 0 alerts · Snyk: **Med Risk**)를 보여준다 → Proceed → 설치 완료. 서드파티 스킬이니 Snyk Med Risk 표시는 확인하고 진행하는 게 좋다.

![설치 요약과 보안 평가](/assets/lottie-install-4-summary.png)
> 그림: 설치 경로 `~/.agents/skills/text-to-lottie`와 보안 평가(Gen Safe · Socket 0 alerts · Snyk Med Risk) → Proceed로 완료.

> 한 줄 요약: **`npx skills add diffusionstudio/lottie` → 에이전트는 space로 골라 enter → 범위(Global)·방식(Symlink 권장) 선택 → 보안 평가(Snyk Med Risk) 확인 후 Proceed.**

---

## 3. 무엇을 만들 수 있나

| 용도 | 예 |
|------|----|
| SVG·로고·타입(글자) 애니메이션 | 로고 그려지는 효과, 텍스트 등장 |
| 로더·아이콘 | 스피너, 진행률 아이콘 |
| UI 마이크로인터랙션 | 버튼 클릭 반응, 토글 |
| lower thirds(자막바) | 방송·영상용 하단 자막 애니메이션 |
| 다이어그램·데이터·차트 애니메이션 | 값 변화, 흐름도 |
| 제품 프로모·씬·카메라 모션·비주얼 이펙트 | 짧은 홍보 클립 |

> 한 줄 요약: **정적 SVG·로고를 "움직이는" 자산으로 바꾸는 데 강하다.**

---

## 4. 예시 프롬프트 (그대로)

```
Create a Lottie animation from the SVG path in https://github.com/JaceThings/SF-Hello/blob/main/SVG/hello-en.svg. Reveal the path with an animation that follows the natural path direction. Apply a premium apple themed gradient to the path. Use ease-in-out timing, a transparent background, and preserve the original SVG geometry.
```

| 지시 | 내용 |
|------|------|
| ① 소스 | 주어진 SVG 경로에서 Lottie 생성 |
| ② 애니메이션 | 경로의 자연스러운 방향을 따라 그려지는(reveal) 효과 |
| ③ 스타일 | 애플풍 프리미엄 그라디언트 적용 |
| ④ 타이밍 | ease-in-out |
| ⑤ 배경 | 투명 |
| ⑥ 지오메트리 | 원본 SVG 형태 보존 |

> 한 줄 요약: **무엇을(SVG)·어떻게 움직일지(방향·타이밍)·스타일(그라디언트·배경)을 문장으로 지시하면 Lottie JSON을 만들어준다.**

---

## 5. 만든 뒤 — 어디에 쓰나

결과물인 Lottie(JSON)는 웹에선 **lottie-web**, 앱에선 각 플랫폼 플레이어, Skia 환경은 **Skottie**로 재생한다. 발표자료·랜딩페이지·앱 로더 등에 그대로 삽입하면 된다.

> 한 줄 요약: **text-to-lottie로 뽑은 JSON은 lottie-web·모바일 플레이어·Skottie 어디서든 가볍게 재생된다.**
