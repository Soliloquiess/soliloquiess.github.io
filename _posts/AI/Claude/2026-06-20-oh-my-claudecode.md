# oh-my-claudecode (OMC) 정리

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
