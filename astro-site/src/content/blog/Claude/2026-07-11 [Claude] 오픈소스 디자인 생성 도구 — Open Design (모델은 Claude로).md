---
title: "[Claude] 오픈소스 디자인 생성 도구 — Open Design (모델은 Claude로)"
date: 2026-07-11T19:00:00+09:00
category: "Claude"
tags: ["Claude", "Claude Code"]
description: "오픈소스 Claude Design 대안 Open Design의 설치·온보딩·사용 흐름과, 유료 자체 모델 대신 Claude(Claude Code)로 돌리는 설정을 스크린샷과 함께 정리한다."
permalink: "2026/07/11/open-design"
---

> 이전 노트: [SVG를 Lottie 애니메이션으로 — text-to-lottie](/2026/07/11/text-to-lottie.html)

> Open Design은 오픈소스 "Claude Design 대안"으로, 프롬프트로 슬라이드·프로토타입·영상 같은 디자인 결과물을 만들어주는 데스크톱 앱이다. 자체 모델은 유료라, 이 글에선 **내 Claude로 돌리는 설정**까지 정리한다.

---

## 1. Open Design이란

> **Open Design**(open-design.ai) = 프롬프트로 디자인 결과물을 생성하는 오픈소스 데스크톱 앱. 홈 화면에 "오픈소스 Claude Design 대안"이라고 적혀 있다.

| 항목 | 내용 |
|------|------|
| 성격 | 오픈소스 · Claude Design 대안 |
| GitHub | ⭐ 77.2K |
| 만드는 것 | 슬라이드덱·프로토타입·wireframe·모바일 UI·PDF·이미지·동영상·오디오·브랜드킷 |
| 입력 방식 | 자연어 프롬프트 |

![홈 화면 — 오픈소스 Claude Design 대안](/assets/open-design-4-home.png)
> 그림: 홈 "오늘 무엇을 디자인하시겠어요?" 화면. "오픈소스 Claude Design 대안" 문구와 템플릿 목록.

> 한 줄 요약: **Open Design = 프롬프트 한 줄로 슬라이드·프로토타입·영상까지 뽑는 오픈소스 디자인 앱.**

---

## 2. 설치 후 — 로그인과 첫 세팅

로그인 화면에는 "Open Design에 로그인"(클라우드 AI로 바로 디자인) 외에 대안으로 **Local coding agent**, **Bring your own key(BYOK)** 옵션이 보인다. 이 두 옵션이 뒤에서 다룰 "내 Claude로 돌리기"의 단초다.

![로그인 화면](/assets/open-design-1-login.png)
> 그림: 로그인 화면. 클라우드 AI 로그인 외 Local coding agent / BYOK 옵션.

로그인 후에는 온보딩으로 "회원님 정보"를 받는다 — 직무, 조직 규모, 활용 사례, 유입 경로를 선택하고 Continue.

![온보딩 회원 정보](/assets/open-design-2-onboarding.png)
> 그림: 처음 세팅 — 직무·조직규모·활용사례·유입경로 선택 후 Continue.

> 한 줄 요약: **로그인 화면에 이미 "Local coding agent / BYOK" 힌트가 있다 — 자체 모델만 쓰라는 앱이 아니다.**

---

## 3. 무료 크레딧과 "돈" 이야기

| 항목 | 내용 |
|------|------|
| 무료 플랜 체험 크레딧 | US$3.00 |
| 만료 | 7일 후 |
| 자동충전 | 꺼짐 |
| 자체 hosted 모델 호출 조건 | 지갑 잔액이 $0보다 커야 함 ("모델 호출에는 잔액이 필요합니다") |
| 무료 기본 모델 성능 | 체감상 아주 뛰어나진 않음 |

![지갑 — 무료 크레딧 $3.00(7일)](/assets/open-design-3-wallet.png)
> 그림: 지갑 화면. 무료 플랜 + 체험 크레딧 $3.00(7일 후 만료), 자동충전 꺼짐.

즉 Open Design의 **자체 모델은 결국 크레딧(돈)을 쓴다**. 체험 크레딧이 떨어지면 충전해야 계속 쓸 수 있다.

> 한 줄 요약: **자체 모델 = 유료. 체험 크레딧 $3은 7일이면 끝난다.**

---

## 4. ⭐ 모델은 Claude로 (크레딧 아끼기)

이 글의 핵심. 프롬프트 박스 오른쪽의 **모델·에이전트 드롭다운**(전송 버튼 왼쪽 둥근 아이콘)에서 **모드**와 **에이전트**를 고른다. 드롭다운 하단의 "실행 설정 열기"로 세부 설정도 연다.

| 항목 | 선택지 |
|------|--------|
| 모드 | 로컬 CLI / BYOK |
| 에이전트 | Open Design(Free, 잔액 $3 소모) / **Claude Code** |
| 모델 | grok-4.5 등 |

여기서 **모드 = 로컬 CLI**, **에이전트 = Claude Code**를 선택하면, Open Design 지갑 크레딧을 쓰지 않고 **내 Claude(Claude Code 구독)로 생성**한다.

![모드·에이전트·모델 선택 드롭다운](/assets/open-design-5-agent-claude.png)
> 그림: 모드[로컬 CLI/BYOK] · 에이전트[Open Design/Claude Code] · 모델 선택 드롭다운 — 이 글의 핵심 화면.

> 팁: Open Design 자체 모델은 돈을 내야 하니, 그냥 Claude로 돌리면 된다.

> 한 줄 요약: **모드=로컬 CLI + 에이전트=Claude Code 선택 → 지갑 크레딧 대신 내 Claude 구독으로 생성.**

---

## 5. 사용 흐름 — 폴더 지정부터 생성까지

1. **작업 폴더 지정** — 하단 "Select working directory"로 고르거나, 프롬프트에 폴더 경로를 직접 써 넣는다
2. 템플릿을 "동영상"으로 두고 프롬프트 입력 (예: 특정 폴더의 사용자 메뉴얼을 참고해 소개 영상 만들어 달라)
3. AI가 곧바로 만들지 않고 **되묻는 설정 폼**을 띄움 (영상 길이·모델·핵심 메시지·화면 비율 등 버튼 선택)
4. 답을 고르면 반영되어 생성 진행 → 결과물(assets 이미지, critique.json 등)이 프로젝트에 쌓임

![작업 폴더 + 프롬프트 입력](/assets/open-design-6-prompt.png)
> 그림: 작업 폴더 지정 후 프롬프트 입력 화면.

![AI가 되묻는 설정 폼](/assets/open-design-7-form.png)
> 그림: 영상 길이·모델·핵심 메시지·화면 비율 등을 버튼으로 고르는 인터뷰식 설정 폼.

![생성 진행 + 디자인 파일 트리](/assets/open-design-8-progress.png)
> 그림: 생성 진행 상황과 프로젝트에 쌓이는 디자인 파일 트리.

바로 만들지 않고 인터뷰식으로 되묻는 게 특징이라, 모호한 요청도 버튼 선택만으로 구체화된다. (실사용에서는 영상 모델(Seedance 등)이 API 키 없이 막혀 있어, 앱 캡처를 넣고 HyperFrames(HTML)로 소개 영상을 만드는 식으로 우회했다 — 무료·키 없음 환경의 제약 예시.)

> 참고: 위 진행 화면은 기본 모델(grok-4.5)로 돌린 예시다. §4처럼 에이전트를 **Claude Code**로 바꾸면 이 `model` 표기가 내 Claude로 바뀌고, Open Design 크레딧도 소모되지 않는다.

> 한 줄 요약: **폴더 지정 → 프롬프트 → 인터뷰식 설정 폼 → 생성. 무료·키 없음이면 일부 모델은 우회가 필요할 수 있다.**

---

## 6. 정리

Open Design은 슬라이드·프로토타입·영상 같은 디자인 결과물을 프롬프트로 실험해보기 좋은 오픈소스 앱이다. 다만 자체 모델은 유료 크레딧을 쓰므로, **모드=로컬 CLI + 에이전트=Claude Code**로 바꿔두면 Claude Code 구독만으로 무료로 계속 실험할 수 있다.

> 한 줄 요약: **디자인 결과물을 만들고 싶다면 Open Design + 에이전트를 Claude Code로 바꿔서 돈 걱정 없이 돌리자.**
