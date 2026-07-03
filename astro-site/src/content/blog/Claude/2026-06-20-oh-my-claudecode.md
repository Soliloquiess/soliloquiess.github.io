---
title: "[Claude] oh-my-claudecode(OMC) — 멀티에이전트 오케스트레이션 정리"
date: 2026-06-20
category: "Claude"
tags: ["Claude", "oh-my-claudecode"]
description: "Claude Code 위에서 동작하는 멀티에이전트 오케스트레이션 레이어 oh-my-claudecode(OMC)의 구성과 사용법을 정리한 노트."
permalink: "2026/06/20/oh-my-claudecode"
---
# oh-my-claudecode(OMC) — 멀티에이전트 오케스트레이션 정리

> 작성일: 2026-06-20
> 저장소: https://github.com/yeachan-heo/oh-my-claudecode
> (npm 패키지명: `oh-my-claude-sisyphus`, 명령어 별칭: `oh-my-claudecode`, `omc`)

---

## 1. 개요
Claude Code 위에서 **여러 AI 에이전트를 오케스트레이션**하는 CLI + 플러그인.


- 복잡한 개발 작업을 전문 에이전트에 자동 분배·병렬 실행하고, **검증으로 "완료" 확인될 때까지 포기하지 않는 자가 치유 루프** 제공.
(이름 유래: Sisyphus = 끝까지 반복 완료)

## 2. 핵심 기능

### 오케스트레이션 모드

| 모드 | 설명 |
|------|------|
| **Team** | `team-plan → team-prd → team-exec → team-verify → team-fix` 파이프라인 |
| **CLI Workers** | 외부 제공자 연동 (Codex, Gemini, Grok) |
| **Autopilot** | 자율 실행 |
| **Ralph** | 끈질긴 검증 반복 루프 |
| **Ultrawork** | 최대 병렬화 |

### 지능형 라우팅
- 19개 전문 에이전트 + 자동 모델 선택 (간단→Haiku, 복잡→Opus), 호환 매트릭스 제공

### DX
- 매직 키워드(`ralph`, `ulw`, `ralplan`), 실시간 HUD 스테이터스라인, 세션→스킬 추출, 비용 추적

### 커스텀 스킬 (자동 주입)
```
# .omc/skills/fix-proxy-crash.md
---
name: Fix Proxy Crash
description: aiohttp proxy crashes on ClientDisconnectedError
triggers: ["proxy", "aiohttp", "disconnected"]
source: extracted
---
Wrap handler at server.py:42 in try/except ClientDisconnectedError...
```

## 3. 설치
**마켓플레이스 (권장):**
```
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
```
**npm:**
```
npm i -g oh-my-claude-sisyphus@latest
```
**설정:**
```
/setup
/omc-setup
omc setup
```

## 4. 사용 예시
```
# 인세션
/team 3:executor "fix all TypeScript errors"
/autopilot "build a REST API for managing tasks"
/deep-interview "I want to build a task management app"
/ask codex "review this PR"

# 터미널 CLI
omc team 2:codex "review auth module for security issues"
omc ask claude "review this migration plan"
omc wait --start    # 레이트리밋 리셋 시 자동 재개

# 매직 키워드
ralph: refactor auth module
ulw: fix all errors
ralplan: plan this feature
```

## 5. 주요 명령
- `/setup` — 대화형 설정
- `/team N:provider "task"` — N개 워커 실행
- `/autopilot "..."` — 자율 실행
- `/deep-interview "idea"` — 코딩 전 소크라테스식 요구사항 명확화
- `/ask provider "prompt"` — 단일 자문 질의
- `/skill list|add|remove|edit|search` — 재사용 패턴 관리
- `omc wait --start` — 레이트리밋 자동 재개
- `omc hud` — 실시간 오케스트레이션 지표

## 6. 요구사항
- Claude Code CLI
- Claude Max/Pro 구독 또는 Anthropic API 키
- **tmux** (`omc team` 및 레이트리밋 감지에 필수)
- (선택) 멀티 AI: Gemini CLI `@google/gemini-cli`, Codex CLI `@openai/codex`, Grok Build(build.grok.com)

## 7. 설정
```json
// 네이티브 Claude Code 팀 활성화
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```
- 환경변수: `OMC_PLUGIN_ROOT`(HUD 번들 경로), `OMC_STATE_DIR`(상태 루트)
- 멀티레포 워크스페이스: 부모 디렉토리에 `echo '{"id":"my-workspace"}' > .omc-workspace`
- 알림 연동(Telegram/Discord):
  `omc config-stop-callback telegram --enable --token <bot_token> --chat <chat_id> --tag-list "@alice,bob"`

## 8. ⚠️ 설치 전 주의점 (Windows / 팀계정 환경)
1. **tmux 필요 → Windows 직접 실행 곤란.** team·레이트리밋 기능은 사실상 **WSL2(Ubuntu)** 안에서 돌려야 함.
2. **비용**: 다수 에이전트 병렬 → 토큰 소비 큼. Max/Pro 또는 API 키 필요.
3. **팀 계정 정책**(노트 1번 연결): 외부 제공자 연동·사내 코드 외부 전송·자율 실행은 회사 정책 확인 필요.
4. **비공식 서드파티**: Anthropic 공식 아님. 콜백·자율 실행 등 보안 검토 후 사용.
5. 참고: Claude Code 공식 **Agent Teams** + 서브에이전트(메인 노트 10번)로 충분한지 먼저 검토 권장.

## 9. 기타
- npm 패키지는 `oh-my-claude-sisyphus`로 게시되지만 `oh-my-claudecode`/`omc` 별칭 둘 다 설치됨
- team 모드는 인세션에서 `/team ...` 명시 필요. 레거시 `swarm` 키워드는 제거됨

## 10. `omc-teams` vs Claude Code 네이티브 Agent Teams (중요)

> 설치된 OMC 플러그인 파일 직접 확인: `skills/omc-teams/SKILL.md`, `commands/omc-teams.md`

**핵심: `omc-teams`는 네이티브 Agent Teams를 활성화하는 게 아님. 완전히 다른 메커니즘.**

### `omc-teams` = OMC 고유 "프로세스 기반" CLI 워커 (tmux)
```bash
/oh-my-claudecode:omc-teams N:claude "task"
/oh-my-claudecode:omc-teams N:codex  "task"
/oh-my-claudecode:omc-teams N:gemini "task"
```
- N개(1~10) CLI 워커 **프로세스**(claude/codex/gemini)를 **tmux 패널**에 띄워 병렬 실행 (OS 프로세스 단위)
- **tmux(또는 cmux) 필수** — 없으면 "tmux is not installed" 하고 중단
- Claude Code 세션 내부의 인프로세스 팀원이 아님. 별도 CLI 프로세스 다수를 띄우는 방식
- 레거시 호환 스킬. 실제론 `omc team ...` 명령 사용 권장

### 헷갈리는 3가지 구분


| 항목 | 정체 | tmux | 네이티브 팀 플래그 |
|------|------|:----:|:------------------:|
| `omc-teams` / `omc team N:claude...` | OMC **CLI 워커**(프로세스, tmux 패널) | 필수 | 무관 |
| OMC `team` 파이프라인 (team-plan→exec→verify) | OMC 오케스트레이션 (네이티브 팀 도구 활용) | 경우에 따라 | OMC가 켜둠 |
| Claude Code 네이티브 Agent Teams | 인프로세스 팀원 + 공유 작업목록 | split-pane만 | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |

### 결론
- `omc-teams`는 "무조건 에이전트 팀 활성화"가 **아니라** tmux 기반 CLI 워커를 띄우는 OMC 전용 기능.
- 네이티브 Agent Teams를 켜는 건 OMC가 `~/.claude/settings.json`에 넣어둔 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (별도 설정). `omc-teams` 명령 자체가 켜는 게 아님.
- ⚠️ **Windows**: `omc-teams`는 tmux 필수 → 플레인 터미널(PowerShell/Windows Terminal)에선 중단. WSL2/cmux 안에서만 동작.
- 🔗 메인 노트 13·14번(네이티브 Agent Teams)과 대조해서 볼 것.

---

## 11. 대표 모드 정리 (team · omc-teams · ralph · ultragoal · autoresearch)

> 호출: `/oh-my-claudecode:<이름>` 또는 매직 키워드. 5개를 한눈에 비교.

### 한눈 비교표

| 모드 | 한 줄 정체 | 병렬 | 반복/종료 | 상태 저장 | tmux |
|------|-----------|:----:|-----------|-----------|:----:|
| **team** | 네이티브 Agent Teams로 **N명이 공유 작업목록** 협업 | ✅ 팀원 | 작업목록 소진 시 | 작업목록·메일박스 | ❌(인프로세스) |
| **omc-teams** | claude/codex/gemini **CLI 워커를 프로세스로** 병렬 | ✅ 프로세스 | 워커 종료 시 | — | ✅ **필수** |
| **ralph** | **검증될 때까지 포기 않는** 자기참조 루프 | 보통 단일 | 검증 통과까지(끈질김) | 진행 상태 | ❌ |
| **ultragoal** | **다중 목표** 장기 워크플로 (plan/ledger 영속) | 목표별 | 모든 목표 달성까지 | `.omc/ultragoal` 아티팩트 | ❌ |
| **autoresearch** | **단일 미션 개선 루프** (엄격 평가자 계약) | 보통 단일 | 평가 충족 or 최대시간 | 마크다운 결정 로그 | ❌ |

### 각 모드 상세

**① team** — `/team N:executor "작업"`
- Claude Code **네이티브 Agent Teams**를 써서 N명의 팀원이 **공유 작업목록 + 메일박스**로 협업·자체 조율 (메인 노트 13·14번)
- 팀원끼리 직접 소통·반박 가능. 병렬 코드리뷰(보안/성능/테스트), 경쟁 가설 디버깅 등
- 권장 3~5명. **인프로세스**라 Windows 일반 터미널에서도 동작

**② omc-teams** — `omc team N:codex "작업"` (= `/oh-my-claudecode:omc-teams`)
- claude/codex/gemini **CLI 워커를 OS 프로세스로** 띄워 tmux 패널에서 병렬 (10번 상세)
- **여러 AI 제공자**를 섞어 쓰거나 프로세스 단위 격리가 필요할 때
- ⚠️ **tmux 필수** → Windows는 WSL2/cmux 안에서만

**③ ralph** — 키워드 `ralph:` / `/oh-my-claudecode:ralph`
- **"검증으로 완료 확인될 때까지 멈추지 않는"** 자기참조 루프 (이름=Sisyphus 정신, "The boulder never stops")
- 검증 리뷰어를 설정 가능. 리팩터·버그수정처럼 **"될 때까지" 밀어붙일 때**
- `ralplan`으로 사전 합의 계획 후 실행하면 더 안전

**④ ultragoal** — `/oh-my-claudecode:ultragoal`
- **여러 목표를 가진 장기 작업**을 위한 durable 워크플로
- 계획(plan)·원장(ledger)을 **`.omc/ultragoal`에 파일로 영속** → 세션이 끊겨도 이어감
- Claude의 **`/goal`** 핸드오프 텍스트를 출력해 현재 세션과 연동
- "여러 목표가 얽힌 큰 프로젝트를 끝까지 추적·관리"

**⑤ autoresearch** — `/oh-my-claudecode:autoresearch`
- **하나의 미션**을 정해 **개선을 반복**하는 stateful 루프
- **엄격한 평가자(evaluator) 계약** — 매 반복마다 정해진 기준으로 채점, 충족해야 종료
- **마크다운 결정 로그**로 무엇을 왜 바꿨는지 기록, **최대 실행시간** 도달 시 정지
- "측정 가능한 단일 목표를 향해 자율적으로 갈아 넣기" (예: 벤치마크 점수↑)

### 고르는 기준

| 상황 | 모드 |
|------|------|
| 팀원이 서로 소통하며 병렬 협업 | **team** |
| 여러 AI 제공자/프로세스 병렬 (tmux 가능 환경) | **omc-teams** |
| "될 때까지" 끈질기게 한 작업 완성 | **ralph** |
| 여러 목표를 세션 넘어 장기 추적 | **ultragoal** |
| 단일 목표를 평가 기준 충족까지 자동 개선 | **autoresearch** |

> 공통: 모두 **검증/평가로 "완료"를 확인**하려는 OMC 철학(Sisyphus)의 변주. team/omc-teams=병렬 협업축, ralph/ultragoal/autoresearch=끈질긴 반복축.
> ⚠️ 다수 에이전트·반복 루프라 **토큰 소비 큼** (메인 노트의 Token Maxxing 맥락). 고가치 작업에.

---

## 12. 연구 & 개발 자동화 파이프라인 (OMC 스킬 조합)

> 아래 스킬들을 순서대로 엮으면 **"아이디어 → 작동 코드"** R&D 파이프라인이 된다. 모두 OMC 스킬(`/oh-my-claudecode:<이름>`).

### 파이프라인 흐름
```
① 명확화        ② 계획            ③ 실행        ④ 검증       ⑤ 정제
Deep-Interview → OMC-Plan      → Ultrawork → UltraQA  → ai-slop-cleaner
 /Deep-Dive      /Ralplan
                          ┌───────────────────────────────────────┐
   Autopilot = 위 전체를 사람 개입 최소로 "한 번에" 자동 오케스트레이션
                          └───────────────────────────────────────┘
```

### 단계별 스킬

| 단계 | 스킬 | 하는 일 |
|------|------|---------|
| **① 명확화** | **deep-interview** | Socratic 질문으로 요구사항 명확화, **수학적 모호함 게이팅** 후 실행 승인 (메인 노트 12·13번) |
| | **deep-dive** | 2단계: **trace(원인 인과 조사)** → deep-interview(요구 결정화). 버그·기존 코드 이해가 먼저 필요할 때 |
| **② 계획** | **OMC-Plan** (`plan`) | 전략 계획 수립 (옵션으로 인터뷰 워크플로 포함) |
| | **ralplan** | **합의(consensus) 계획** 게이트 — 모호한 ralph/autopilot/team 요청을 실행 전 자동 게이팅 |
| **③ 실행** | **ultrawork** | **고처리량 병렬 실행 엔진** — 작업을 잘게 나눠 다수 에이전트로 동시 처리 |
| **④ 검증** | **ultraqa** | QA 사이클: **테스트 → 검증 → 수정 반복**, 목표 충족까지 |
| **⑤ 정제** | **ai-slop-cleaner** | AI가 만든 "슬롭(군더더기 코드)"을 **삭제 우선·회귀 안전** 워크플로로 청소 (리뷰 전용 모드 옵션) |
| **전체 자동** | **autopilot** | **아이디어 → 작동 코드까지 완전 자율 실행** — 위 단계를 알아서 오케스트레이션 |

### 두 가지 사용 방식

| 방식 | 설명 | 적합 |
|------|------|------|
| **수동 조립** | 단계별 스킬을 직접 순서대로 호출 (interview→plan→ultrawork→ultraqa→cleaner) | 각 단계 통제·검토하고 싶을 때 |
| **Autopilot 일임** | `/autopilot "..."` 하나로 전체 자동 | 신뢰된 작업을 빠르게 끝까지 |

### 핵심 포인트
- 앞단(①②)이 **"코딩 전 모호함 제거"** (메인 노트 SDD·Socratic 흐름과 동일 철학) → 뒷단 실행 품질을 좌우
- ④⑤가 **품질 게이트** — ultraqa(기능 검증) + slop-cleaner(코드 정제)로 "그냥 돌아가는 코드"가 아니라 **깨끗하고 검증된 코드**로
- **ralplan**은 ②의 안전장치 — 모호한 요청을 곧장 autopilot/ralph로 보내기 전에 합의 계획으로 한 번 거름
- ⚠️ ultrawork·autopilot은 **다수 에이전트 → 토큰 소비 큼**. 고가치·복잡 작업에 (11번 주의점과 동일)

> 한 줄 요약: **deep-interview(명확화) → plan/ralplan(계획) → ultrawork(실행) → ultraqa(검증) → ai-slop-cleaner(정제)** 가 OMC의 R&D 파이프라인이고, **autopilot은 이 전체를 한 번에 자동화**한 래퍼.

---

## 13. 유틸리티 스킬 (ask · ccg · visual-verdict · wiki · writer-memory)

> 파이프라인 단계가 아니라, **어느 단계에서든 불러 쓰는 보조 도구들**. 모두 OMC 스킬.

### 한눈 표

| 스킬 | 한 줄 정체 | 쓰임 |
|------|-----------|------|
| **ask** | 단일 자문 질의를 **다른 모델로 라우팅** | 외부 모델 의견 한 번 받기 |
| **ccg** | **Claude+Codex+Gemini** 3모델 종합 | 교차 검증·합의 |
| **visual-verdict** | 스크린샷 ↔ 레퍼런스 **시각 QA 판정** | UI 비교 검증 |
| **wiki** | 세션 넘어 쌓이는 **마크다운 지식베이스** | 지식 누적 |
| **writer-memory** | 글쓰기용 **에이전트 메모리** | 캐릭터·장면 추적 |

### 각 스킬 상세

**① ask** — `/ask <provider> "프롬프트"` (`omc ask`)
- Claude/Codex/Gemini/Grok/Cursor에 **단일 자문 질의**를 보내고 결과를 **아티팩트로 캡처**
- 원시 CLI 조립 없이 "프로세스 우선" 라우팅. "다른 모델은 이걸 어떻게 볼까?"

**② ccg** — Claude-Codex-Gemini 3모델 오케스트레이션
- `/ask codex` + `/ask gemini`를 돌린 뒤 **Claude가 결과를 종합(synthesize)**
- 한 모델 편향을 줄이는 **교차 검증/합의** — 중요한 설계·리뷰 결정에

**③ visual-verdict** — 시각 QA 판정
- **스크린샷을 레퍼런스와 비교**해 구조화된 합격/불합격 판정 산출
- UI 구현이 디자인과 맞는지 객관적으로 (메인 노트 Visual Companion과 짝 — 만들기 vs 검증)

**④ wiki** — LLM Wiki (Karpathy 모델)
- **세션을 넘어 누적되는 마크다운 지식베이스** — 한 번 정리한 지식이 다음 세션에도 복리로 쌓임
- `wiki add/query/ingest/list` 등으로 추가·검색. "프로젝트 지식을 영구 위키로"

**⑤ writer-memory** — 글쓰기용 에이전트 메모리
- 소설/문서의 **캐릭터·관계·장면·테마를 추적**하는 메모리 시스템
- (코드용 프로젝트 지식은 별도 스킬 **`remember`** — 프로젝트 메모리/노트패드/문서로 분류)

### 보조축 묶음

| 묶음 | 스킬 | 한 줄 |
|------|------|------|
| **외부 모델 활용** | ask, ccg | 다른 모델에 묻기 / 3모델 종합 |
| **검증** | visual-verdict | 시각 QA 객관 판정 |
| **지식 축적** | wiki, writer-memory | 세션 넘는 기억 (코드 지식 ↔ 글쓰기 요소) |

> 한 줄 요약: **파이프라인(12번)이 "일을 진행"한다면, 유틸리티 스킬은 "외부 의견(ask/ccg)·시각 검증(visual-verdict)·지식 축적(wiki/writer-memory)"으로 옆에서 보조**한다.
> 🔗 ask/ccg는 메인 노트의 멀티모델 협업, wiki는 자동 메모리(메인 5번)와 같은 "세션 넘는 기억" 계보.

---

## 14. Deep-Interview 파라미터 (quick · standard · deep · autoresearch)

> 호출 형식: `/deep-interview [--quick|--standard|--deep] [--autoresearch] <아이디어>`
> deep-interview = Socratic 질문 + **수학적 모호함 게이팅**으로 명세를 결정화 (메인 노트 12·13번)

### 파라미터 두 종류 구분

플래그는 **성격이 다른 두 묶음**이다:
- **깊이 프리셋** (`--quick` / `--standard` / `--deep`) — 인터뷰를 *얼마나 철저히* 할지
- **모드 전환** (`--autoresearch`) — deep-interview를 *autoresearch 셋업 차선*으로 바꿈

### ① 깊이 프리셋 — `--quick` / `--standard` / `--deep`

인터뷰의 **엄격도(라운드 수·모호함 임계값 등 rigor)**를 정하는 프리셋.

| 프리셋 | 성격 | 적합 |
|--------|------|------|
| **--quick** | 가볍게 — 적은 라운드, 핵심 모호함만 빠르게 제거 | 작고 비교적 명확한 작업, 빠른 확인 |
| **--standard** | 기본 — 균형 잡힌 라운드 (지정 안 하면 기본값) | 일반적인 기능 개발 |
| **--deep** | 철저히 — 더 많은 라운드·엄격한 게이트로 끝까지 파고듦 | 크고 모호하고 위험한 작업 |

> 공통 동작(프리셋 무관): 라운드마다 **한 질문씩**, 가장 약한 차원을 겨냥, 답변 후 **모호함 점수** 표시.
> 기본 모호함 임계값 **0.2** (= 명확도 80%) 이하가 돼야 실행 단계로. `omc.deepInterview.ambiguityThreshold`로 조정 가능.
> 라운드 한계: 소프트 경고 10라운드 / 하드캡 20라운드 / 3라운드부터 조기 종료 허용.
> 챌린지 에이전트: 4R Contrarian(가정 반박) · 6R Simplifier(단순화) · 8R Ontologist(본질 재정의).

### ② 모드 전환 — `--autoresearch`

deep-interview를 **autoresearch 스킬의 "학습 곡선 0" 셋업 차선**으로 전환.

| 단계 | 동작 |
|------|------|
| 1. 미션 질문 | **"이 레포에서 autoresearch가 무엇을 개선·증명해야 하나?"**부터 물음 |
| 2. 평가자 수집 | **evaluator(평가) 명령**을 받음 (비우면 레포 근거 강할 때만 추론, 아니면 계속 질문) |
| 3. 하드 게이트 | 일반 모호함 임계값 + **미션 명확도·평가자 명확도**를 추가 필수 게이트로 |
| 4. 핸드오프 | 준비되면 omc-plan/autopilot/ralph로 안 넘기고 **`Skill("oh-my-claudecode:autoresearch")`** 로 직행 |

> ⚠️ `omc autoresearch` CLI는 **하드 deprecated** — 실행은 스킬 핸드오프로만. 핸드오프 후 미션 슬러그·평가 명령·최대 실행시간·아티팩트 위치를 알려줌.
> autoresearch 자체 = "엄격한 평가자 계약으로 단일 미션을 반복 개선하는 stateful 루프" (11번 참조).

### 흐름 요약
```
일반:        /deep-interview [--quick|--standard|--deep] "아이디어"
              → 질문 게이트(≤0.2) → 명세(.omc/specs/) → 실행 승인(omc-plan/autopilot/ralph/team)

autoresearch: /deep-interview --autoresearch "미션"
              → 미션·평가자 게이트 → Skill(autoresearch)로 핸드오프 → 평가 충족까지 자율 개선
```

> 한 줄 요약: **quick/standard/deep = 인터뷰를 얼마나 깊게 할지(rigor) 프리셋**, **--autoresearch = deep-interview를 autoresearch 셋업 차선으로 전환하는 모드 플래그**. 앞 셋은 "깊이", 뒤 하나는 "목적지"가 다름.

---

## 15. 플랜 접근법 선택 가이드 (계획 도구 고르기)

> 계획·요구 명확화 단계에서 무엇으로 시작할지 고르는 기준. OMC 스킬 + Claude/외부 도구를 한 표로.

### 한눈 선택표

| 접근법 | 정체 | 언제 쓰나 |
|--------|------|-----------|
| **기본 플랜모드** | Claude Code 표준 플랜 모드 | 일반적인 계획 (수정 전 계획 승인) |
| **울트라플랜** | ultrathink(최대 사고) / ralplan(합의) | **초기 큰 작업**, 위험·복잡한 설계 |
| **우로보로스** | 외부 MCP "Agent OS" (`ooo interview`) | **완전히 빈 상태 / 첫 프로젝트 세팅**(greenfield) — 바닥부터 명세 |
| **deep-interview** | OMC 내장 Socratic 인터뷰 (우로보로스 **경량판**) | 가벼운 요구 명확화. **조절은 OMC 딥인터뷰**(`--quick/--standard/--deep`, 14번) |
| **deep-dive** | trace(원인 조사) → deep-interview 2단계 | 딥인터뷰인데 **내용·기존 코드를 더 깊이** 살펴야 할 때 |
| **visual-companion** | 인터뷰의 **시각 인터페이스** | 시안·선택지를 눈으로 비교 (⚠️ 인터뷰 자체 아님, 13번 유틸리티와 별개 레이어) |

### 핵심 메모
- **우로보로스 = 0→1**: 아무것도 없는 빈 상태·첫 세팅에 최강. 외부 MCP라 별도 설치(`ooo`)
- **deep-interview = 우로보로스 약소(경량) 버전**: OMC에 내장돼 바로 쓰고, **세부 조절도 OMC 딥인터뷰가 담당** (깊이 프리셋·모호함 임계값 — 14번)
- **deep-dive > deep-interview**: 더 꼼꼼히 파야 하면 trace로 원인·코드부터 조사 후 인터뷰
- **visual-companion은 "인터뷰"가 아니라 "인터뷰 인터페이스"**: 인터뷰/계획 내용을 시각적으로 비교·선택하게 얹는 레이어 (메인 노트 11번 Visual Companion)

### 고르는 흐름
```
빈 상태·첫 프로젝트 세팅?     → 우로보로스(ooo interview)
초기 큰 작업?                → 울트라플랜(ultrathink / ralplan)
가볍게 요구만 명확히?         → deep-interview (조절도 OMC 딥인터뷰)
내용·코드 더 깊이 살펴야?      → deep-dive (trace+interview)
시각적으로 보며 고르고 싶다?  → visual-companion (인터페이스로 얹기)
그 외 일반 계획?             → 기본 플랜모드
```

> 한 줄 요약: **빈 상태=우로보로스, 큰 초기작업=울트라플랜, 가벼운 명확화=deep-interview(조절도 OMC), 더 깊게=deep-dive, 시각화=visual-companion(인터뷰 아님·인터페이스), 일반=기본 플랜모드.**
> 🔗 12번 R&D 파이프라인의 "① 명확화" 단계를 무엇으로 채울지에 대한 선택 가이드.

---

## 16. Ralplan (합의 계획 게이트)

> 출처: github.com/Yeachan-Heo/oh-my-claudecode (skills/ralplan/SKILL.md)
> 한마디로: **Ralplan = Ralph(실행)를 수행하기 전의 Planning.** 모호한 ralph/autopilot/team 요청을 실행 전에 가로채(gate), 합의(consensus) 계획을 먼저 세우게 하는 진입점.
> 정체: `/oh-my-claudecode:plan --consensus`의 **별칭(alias)**.

### 왜 있나
- ralph·autopilot·team은 **곧장 실행에 들어가는** 모드라, 요청이 모호하면 엉뚱한 걸 만들 위험(goal drift)·재작업
- ralplan은 그 앞단 게이트 — 요청이 너무 막연하면(≤15단어 + 파일/함수/이슈 등 구체 단서 없음) **계획 단계로 먼저 돌림**
- 통과(패스) 조건: 파일경로·이슈번호·함수명(camel/Pascal/snake)·테스트러너·번호단계·인수기준·에러참조 중 **하나라도** 있으면 게이트 안 걸림. `force:` / `!` 접두사로 강제 우회

### 에이전트 3종 (역할 분담)

| 에이전트 | 역할 | 하는 일 |
|----------|------|---------|
| **Planner** | 계획 전담 | 초기 계획 + RALPLAN-DR 요약(원칙 3~5 · 결정동인 top3 · 옵션 ≥2) 작성 |
| **Architect** | 기술 분석 | 아키텍처 타당성 검토 — 최강 반론(steelman)·트레이드오프 긴장·종합 제시 |
| **Critic** | 최종 품질 검문 전담 | 품질 기준 평가 — 원칙-옵션 일관성, 테스트 가능한 인수기준, 검증 단계. `APPROVE`/`ITERATE`/`REJECT` 판정 |

> ⚠️ Architect → Critic은 **반드시 순차** (Architect 끝난 뒤 Critic). 동시 실행 금지.

### 종료(합의) 기준 — ★정정 포인트
- **Critic가 `APPROVE`를 내면 합의 완료** (= "한 번" 승인으로 종료)
- Critic가 `ITERATE`/`REJECT`(비-APPROVE)면 **재검토 루프**: Architect+Critic 피드백 수집 → Planner 수정 → Architect 재검토 → Critic 재평가
- 이 루프는 **최대 5회(iterations)**. 5회 안에 `APPROVE`가 안 나오면 **최선안(best version)을 사용자에게 제시**하고 종료
- 즉 **"Critic 승인 5번 반복"이 아니라 "최대 5회 루프 안에 Critic이 한 번 APPROVE"** 가 정확한 기준

### interactive 모드 (`--interactive`)
- **있으면**: 사람이 직접 승인 — 2단계(초안+Principles/Drivers/Options 검토: 진행/수정요청/검토생략), 6단계(최종 승인: team으로 실행/ralph로 실행/압축 후 승인대기/수정요청/거절)
- **없으면(기본)**: 완전 자동(Planner→Architect→Critic 루프) → 최종안을 `pending approval`로 출력하고 **멈춤** (실행·수정 안 함)
- 기타 플래그: `--deliberate`(고위험용 — 사전부검 3시나리오 + 확장 테스트계획), `--architect codex` / `--critic codex`(해당 패스를 Codex로)

### 결과물 & 위치
- 산출: `.omc/plans/`에 합의 계획 — **RALPLAN-DR 요약 + ADR**(결정·동인·대안·선택이유·결과·후속) + 테스트 가능 인수기준 + 구현 단계
- `pending approval` 상태 → **별도 명시 승인**이 있어야 실행(team/ralph)으로. ralplan 자체는 코드 수정·커밋·실행 안 함

```
모호한 프롬프트
   → ralplan 게이트 → (계획 가능) Planner→Architect→Critic 합의(≤5회)
                    → (극도로 모호) deep-interview로 더 내려보냄
   → pending approval → 명시 승인 → 실행(team 권장 / ralph)
```
> 🖼️ 참고 그림(사용자 제공, 구글드라이브 — 접근 권한 필요): https://drive.google.com/file/d/1tIg_Pp9YrqkYz9y8M7P30xWP45xrhH3Q/view

### 호출
- 매직 키워드 `ralplan:` / `/oh-my-claudecode:ralplan "작업"` (interactive는 `--interactive`)
- 또는 모호한 `ralph/autopilot/team` 요청이 게이트에 걸려 자동 redirect

### 다른 것과의 구분

| | 하는 일 | 결과 |
|---|---------|------|
| **ralplan** | 모호 요청을 **Planner·Architect·Critic 합의 계획으로 게이팅** | `.omc/plans/` 합의안(pending approval) |
| **deep-interview** | Socratic **질문으로 요구 명확화** | `.omc/specs/` 명세 (14번) |
| **ralph** | **될 때까지** 실행·검증 반복 | 완성된 코드 (11번) |
| **울트라플랜** | 최대 사고/멀티에이전트 계획 | 깊은 계획 (15번) |

> 한 줄 요약: **Ralplan = Ralph 실행 전 Planning.** Planner(계획)·Architect(기술분석)·Critic(품질검문) 합의 루프를 **최대 5회** 돌려 Critic이 `APPROVE`하면 종료, `--interactive`면 사용자가 승인. omc-plan `--consensus`의 별칭.
> 🔗 12번 파이프라인의 "② 계획" 안전장치 / 15번 선택 가이드와 함께 볼 것.
