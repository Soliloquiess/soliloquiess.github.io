---
title: "Claude Code 정리 노트"
date: 2026-06-20
category: "Claude"
tags: []
description: "Claude Code 정리 노트 작성일: 2026 06 20 1. 팀 계정 사용 정책 개인 기기에서 팀 계정 사용 시 팀/조직 계정을 개인 컴퓨터에서 사용하는 것 자체가 자동 정지되지는 않음 동일 계정으로 다른 기기"
permalink: "2026/06/20/claude-code-notes"
---
# Claude Code 정리 노트

> 작성일: 2026-06-20

---

## 1. 팀 계정 사용 정책

### 개인 기기에서 팀 계정 사용 시

- 팀/조직 계정을 개인 컴퓨터에서 사용하는 것 자체가 **자동 정지되지는 않음**
- 동일 계정으로 다른 기기에서 로그인은 기술적으로 가능

### 주의사항

| 항목 | 설명 |
|------|------|
| 회사 내부 정책 | 회사/팀 관리자가 사용 범위를 제한할 수 있음 (예: 회사 기기 전용) |
| 관리자 권한 | 팀 관리자가 사용 로그, 기기 정보를 확인할 수 있음 |
| 이용약관 | 계정 공유나 부정 사용은 제재 대상 가능 |

### 로그아웃/로그인 전환 방식

- 회사 PC에서 로그아웃 후 개인 기기에서 로그인하는 방식은 기술적으로 문제가 적음
- 동시 다중 세션보다는 안전한 방식
- **핵심은 기술적 방식이 아니라 회사 정책** 준수 여부
- 가장 확실한 방법: **팀 관리자에게 직접 확인**

---

## 2. Claude Code 메모리 시스템

Claude Code는 파일 기반의 영구 메모리 시스템을 제공하며, 4가지 유형으로 구분된다.

### 메모리 유형 요약

| 유형 | 저장 내용 | 예시 |
|------|-----------|------|
| **User (사용자)** | 역할, 목표, 지식 수준 | "시니어 백엔드 개발자", "React 초보" |
| **Feedback (피드백)** | 작업 방식 지침 (하지 말 것 / 계속할 것) | "테스트에서 DB 모킹 금지", "응답 끝 요약 금지" |
| **Project (프로젝트)** | 진행 중인 작업, 목표, 버그 등 코드 외 맥락 | "3/5부터 머지 동결", "auth 교체는 법무 요구" |
| **Reference (참조)** | 외부 시스템 정보 위치 | "버그 추적은 Linear INGEST 프로젝트" |

### 저장 위치

```
~/.claude/projects/<프로젝트>/memory/
├── MEMORY.md          ← 인덱스 (목차 역할)
├── user_role.md       ← 개별 메모리 파일
├── feedback_testing.md
└── ...
```

---

## 3. CLAUDE.md 설정 파일 스코프

Claude Code는 4단계 스코프의 CLAUDE.md 파일을 지원한다.

### 스코프 비교

| 구분 | 관리정책 (Managed) | 사용자 (User) | 프로젝트 (Project) | 로컬 (Local) |
|------|-------------------|---------------|-------------------|--------------|
| **경로** | `C:\Program Files\ClaudeCode\CLAUDE.md` | `~/.claude/CLAUDE.md` | `./CLAUDE.md` | `./CLAUDE.local.md` |
| **관리 주체** | IT/관리자 | 본인 | 팀 전체 | 본인 |
| **Git 커밋** | N/A | X | O | X |
| **적용 범위** | 머신 전체 | 내 모든 프로젝트 | 이 프로젝트 팀원 전체 | 이 프로젝트에서 나만 |
| **무시 가능** | 불가 | 가능 | 가능 | 가능 |

### 로드 순서

```
관리정책 → 사용자 → 프로젝트 → 로컬
(넓은 범위)                (좁은 범위)
```

- 파일들은 서로 **덮어쓰지 않고 순서대로 이어붙여짐**
- 나중에 로드된 것이 더 구체적인 지침으로 취급
- 관리정책은 개인이 끌 수 없음 (회사 강제)

### 각 스코프의 용도

- **관리정책**: 회사 보안 정책, 컴플라이언스 규칙
- **사용자**: 개인 코딩 스타일, 선호 도구 설정
- **프로젝트**: 팀 코딩 표준, 빌드 명령어, 아키텍처 설명
- **로컬**: 개인 샌드박스 URL, 테스트 데이터 등

### 사용자(User) vs 로컬(Local) 차이

둘 다 "나만의 설정"이지만 **적용 범위가 다르다.**

| | 사용자 (User) | 로컬 (Local) |
|---|---|---|
| **경로** | `~/.claude/CLAUDE.md` | `./CLAUDE.local.md` |
| **적용 범위** | 내 **모든 프로젝트** | **이 프로젝트에서만** |
| **예시** | "항상 한국어로 답변해줘" | "이 프로젝트 로컬 DB는 localhost:5433" |

- **사용자** = 글로벌 개인 설정 (어떤 프로젝트를 열든 적용)
- **로컬** = 프로젝트별 개인 설정 (이 레포에서만 적용)

---

## 4. 메모리 & CLAUDE.md 컨텍스트 배치

### 세션 시작 시 로드 순서

```
 1. 시스템 프롬프트 (숨김, ~4200 토큰)
 2. Auto Memory (MEMORY.md 첫 200줄 / 25KB)
 3. 환경 정보 (OS, 쉘, 경로 등 - 숨김)
 4. MCP 도구 이름
 5. 관리정책 CLAUDE.md
 6. 사용자 CLAUDE.md (~/.claude/CLAUDE.md)
 7. 사용자 규칙 (~/.claude/rules/*.md)
 8. 프로젝트 CLAUDE.md (루트 → 작업 디렉토리 순)
 9. 로컬 CLAUDE.local.md
10. 조건 없는 .claude/rules/ 규칙
```

### 즉시 로드 vs 지연 로드

| 즉시 로드 (세션 시작) | 지연 로드 (필요할 때) |
|---|---|
| 루트/상위 CLAUDE.md 전부 | 하위 디렉토리 CLAUDE.md |
| MEMORY.md (첫 200줄) | 메모리 토픽 파일 (개별 .md) |
| 경로 조건 없는 rules | 경로 조건 있는 rules (`paths:` 프론트매터) |

### 메모리 파일 구조

```
~/.claude/projects/<프로젝트>/memory/
├── MEMORY.md              ← 인덱스 (첫 200줄만 시작 시 로드)
├── user_role.md           ← 필요할 때 로드
├── feedback_testing.md    ← 필요할 때 로드
└── project_deadline.md    ← 필요할 때 로드
```

- **MEMORY.md**: 목차 역할. 세션 시작 시 자동 로드 (200줄 / 25KB 제한)
- **개별 토픽 파일**: Claude가 필요할 때 읽어서 로드 (지연 로드)
- 하나의 git 레포 당 하나의 메모리 디렉토리 공유

### .claude/rules/ 경로 조건부 규칙

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/components/*.tsx"
---
# API 개발 규칙
- 모든 API 엔드포인트에 입력 검증 포함할 것
```

- `paths:` 프론트매터가 **없으면** → 세션 시작 시 항상 로드
- `paths:` 프론트매터가 **있으면** → 해당 파일 패턴을 읽을 때만 로드
- 컨텍스트 절약에 유리

---

## 5. 자동 메모리 (Auto Memory) 상세

### 개념
- 세션이 끝나도 사라지지 않는 **파일 기반 영구 기억** 시스템
- 사용자가 매번 다시 설명하지 않아도, 중요한 사실을 파일로 저장 → 다음 세션에서 다시 로드
- 저장 위치: `~/.claude/projects/<프로젝트>/memory/`

### 구조
```
~/.claude/projects/<프로젝트>/memory/
├── MEMORY.md              ← 인덱스(목차). 세션 시작 시 자동 로드
├── user-role.md           ← 개별 메모리 (필요할 때 지연 로드)
├── feedback-testing.md
└── ...
```
- **MEMORY.md** = 한 줄 요약 인덱스. 세션 시작 시 컨텍스트에 자동 주입 (첫 200줄 / 25KB 제한)
- **개별 .md 파일** = 사실 1개당 파일 1개. 필요할 때만 읽어들임 (지연 로드)

### 메모리 파일 형식 (프론트매터)
```markdown
---
name: <kebab-case-슬러그>
description: <한 줄 요약 — 관련성 판단에 사용>
metadata:
  type: user | feedback | project | reference
---

<사실 내용. feedback/project는 **Why:** 와 **How to apply:** 추가>
<관련 메모리는 [[다른-메모리-이름]] 으로 링크>
```

### 메모리 4가지 유형

| 유형 | 저장 내용 |
|------|-----------|
| **user** | 사용자가 누구인지 (역할, 전문성, 선호) |
| **feedback** | 작업 방식 지침 (왜 그런지 이유 포함) |
| **project** | 진행 중 작업/목표/제약 (코드·git에서 알 수 없는 것) |
| **reference** | 외부 자원 포인터 (URL, 대시보드, 티켓) |

### 동작 방식 (Recall)
- 새 세션 시작 시 **MEMORY.md 인덱스**가 자동으로 컨텍스트에 주입됨
- 작업과 관련 있는 메모리는 `<system-reminder>` 블록 안에 **배경 정보**로 다시 나타남
  - ⚠️ 이건 사용자 지시가 아니라 "참고용 배경"이며, **작성 당시 시점**의 정보
  - 파일명·함수명을 언급하면 아직 존재하는지 **확인 후** 사용

### 운영 원칙 (Best Practice)
- **한 파일 = 한 사실** (잘게 쪼갬)
- 저장 전 **중복 확인** → 있으면 기존 파일 수정, 새로 만들지 않음
- 틀린 것으로 판명되면 **삭제**
- **저장하지 말 것**: 코드 구조, 과거 수정 내역, git 히스토리, CLAUDE.md에 이미 있는 것, 이번 대화에서만 의미 있는 것
- 저장 후 반드시 **MEMORY.md에 한 줄 포인터** 추가 (`- [제목](파일.md) — 짧은 설명`)

### 자동 메모리 vs CLAUDE.md 차이

| | 자동 메모리 | CLAUDE.md |
|---|---|---|
| **생성 주체** | Claude가 자동 저장 | 사람이 직접 작성 |
| **단위** | 사실 1개당 파일 1개 | 프로젝트 지침 묶음 |
| **로드** | MEMORY.md 인덱스 + 지연 로드 | 세션 시작 시 전체 로드 |
| **용도** | 학습된 맥락·선호 누적 | 명시적 규칙·표준 |

---

## 6. CLAUDE.md 와 규칙(Rules) — 메모리와의 관계

### Claude Code가 맥락을 유지하는 3가지 계층

| 구분 | 무엇 | 생성 주체 |
|------|------|-----------|
| **자동 메모리** | `memory/` 폴더의 사실 파일들 | Claude가 자동 저장 |
| **CLAUDE.md** | 프로젝트/개인 지침 문서 | 사람이 작성 |
| **규칙(Rules)** | `.claude/rules/` 의 조건부 지침 | 사람이 작성 |
  
### CLAUDE.md 란? 
세션 시작 시 Claude Code가 자동으로 읽는 **지침 문서**. "이 프로젝트는 이렇게 작업해라"를 적어둠.
- 적는 내용: 빌드/테스트 명령어, 코딩 컨벤션, 아키텍처, 금지 사항
- 4단계 스코프(관리정책 → 사용자 → 프로젝트 → 로컬)로 이어붙여 로드 (상세는 3번 섹션 참조)

### 규칙(Rules) 란?
`.claude/rules/` 폴더의 **조건부 지침** 파일. CLAUDE.md와 유사하나 특정 파일 작업 시에만 로드 가능 → 컨텍스트 절약.
```markdown
---
paths:
  - "src/api/**/*.ts"
---
# API 개발 규칙
- 모든 API 엔드포인트에 입력 검증 포함할 것
```
| paths | 유무 | 로드 시점 |
|---|---|
| 없음 | 세션 시작 시 항상 로드 |
| 있음 | 해당 패턴 파일을 읽을 때만 로드 |

### 셋의 차이 한눈에

| | 자동 메모리 | CLAUDE.md | 규칙(Rules) |
|---|---|---|---|
| **누가 작성** | Claude 자동 | 사람 | 사람 |
| **단위** | 사실 1개 = 파일 1개 | 지침 묶음 | 조건부 지침 묶음 |
| **로드 조건** | 인덱스 + 지연 로드 | 항상 (스코프별) | `paths` 조건부 |
| **용도** | 학습된 맥락·선호 누적 | 프로젝트 표준 | 특정 영역 전용 규칙 |

> ⚠️ 용어 주의: 메모리의 4가지 **유형(type)** (user/feedback/project/reference) 은
> 메모리 파일 내부 분류이고, **규칙(Rules)** 은 별개의 `.claude/rules/` 시스템임.

---

## 7. Claude Hooks (훅)

### 개념
Claude Code의 **특정 시점에 하버스(harness)가 자동 실행하는 사용자 정의 명령(스크립트)**.
- 메모리·CLAUDE.md = "Claude에게 부탁" (따를 수도 안 따를 수도)
- **훅 = 하버스가 강제 실행** → "항상/매번 X" 같은 자동화는 훅으로만 확실히 보장
- "from now on when X / 매번 X 할 때 / X 전후로" 자동 동작 ⇒ 메모리 아닌 **훅**으로 구현

### 주요 훅 이벤트(시점)

| 훅 이벤트 | 실행 시점 | 활용 예 |
|-----------|-----------|---------|
| **PreToolUse** | 도구 실행 직전 | 위험 명령 차단, 입력 검증 |
| **PostToolUse** | 도구 실행 직후 | 파일 수정 후 자동 포맷팅/린트 |
| **UserPromptSubmit** | 프롬프트 제출 시 | 컨텍스트 주입, 차단 |
| **Stop** | Claude 응답 종료 시 | 알림, 테스트 자동 실행 |
| **SubagentStop** | 서브에이전트 종료 시 | 후처리 |
| **Notification** | 알림 발생 시 | 데스크톱 알림 연동 |
| **SessionStart** | 세션 시작 시 | 환경 정보 로드 |
| **PreCompact** | 컨텍스트 압축 직전 | 상태 저장 |

### 설정 (settings.json)
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "prettier --write \"$CLAUDE_FILE_PATHS\"" }
        ]
      }
    ]
  }
}
```
- **matcher**: 반응할 도구 (예: `Edit`, `Write`, `Bash`)
- **command**: 실행할 셸 명령
- 훅은 JSON을 stdin으로 받고 **종료 코드**로 제어:
  - `0` = 정상 통과
  - `2` = **차단(blocking)** — 도구 실행 막고 Claude에게 피드백 전달
  - 그 외 = 비차단 에러

### 대표 활용 사례
- **자동 포맷팅**: 수정 후 prettier/gofmt/black 실행
- **위험 명령 차단**: `rm -rf`, 프로덕션 배포 등 PreToolUse에서 거부
- **자동 테스트**: Stop 훅에서 테스트 실행
- **데스크톱 알림** / **로깅·감사**: Bash 명령 기록

> ⚠️ 훅은 임의 명령을 실행하므로 보안 영향이 큼 → 신뢰 가능한 명령만 등록.
> `/update-config` 스킬로 안전하게 설정 가능.

---

## 8. Claude Code Hooks 생명주기 (Lifecycle)

> 📊 시각 다이어그램(Artifact): https://claude.ai/code/artifact/4585e8b0-119c-48e7-917b-42d26154ffb4
> 출처: 공식 문서 https://code.claude.com/docs/ko/hooks (공식 SVG 도식 2종 기반)

### 한눈에 보는 구조
Claude Code는 **세션 ⊃ 턴 루프 ⊃ 에이전트 도구 루프**로 중첩된 상태 기계.
이벤트는 두 종류로 나뉜다:
- **순차 흐름 이벤트** — 정해진 순서대로 흐름 (아래 도식)
- **수시 발생(비동기) 이벤트** — 사건이 일어나는 즉시 발화 (별도 표)

각 전환점마다 훅이 발화하며, 일부는 흐름을 차단(exit 2)할 수 있다(⛔).

### A. 순차 흐름 도식
```
Setup (--init 류 실행 시만)
    ↓
SessionStart
    ↓
┌─── Per-Turn 루프 (사용자 입력마다) ──────────────────┐
│  UserPromptSubmit → UserPromptExpansion              │
│      ↓                                               │
│  ┌─── Agentic 도구 루프 ──────────────────────────┐    │
│  │  PreToolUse → PermissionRequest                │  │
│  │      ↓                                         │  │
│  │  도구 실행  (MCP면 Elicitation/Result 중첩)      │  │
│  │      ↓                                         │  │
│  │  PostToolUse | PostToolUseFailure              │  │
│  │      ↓                                         │  │
│  │  SubagentStart/Stop · TaskCreated/Completed    │  │
│  │      ↓                                         │  │
│  │  PostToolBatch                                 │  │
│  │      ↓  [다음 모델 호출] ─ 도구 더 필요 시 반복     │  │
│  └────────────────────────────────────────────────┘  │
│      ↓                                               │
│  Stop | StopFailure · TeammateIdle                   │
│      ↓  (다음 프롬프트 → 위로 반복)                     │
└──────────────────────────────────────────────────────┘
    ↓
PreCompact → PostCompact (컨텍스트 길어지면)
    ↓
SessionEnd
```

### B. 순차 흐름 훅 요약 (발생 순서 / ⛔=차단 가능)


| 단계 | 훅 | 발화 시점 | 차단 |
|------|-----|-----------|:----:|
| 세션 | `SessionStart` / `Setup` | 세션 시작·재개 / 초기화 | — |
| 턴 | `UserPromptSubmit` | 프롬프트 제출 | ⛔ |
| 턴 | `UserPromptExpansion` | 커맨드 확장 시 | ⛔ |
| 도구 | `PreToolUse` | 도구 실행 직전 | ⛔ |
| 도구 | `PermissionRequest` | 권한 대화 발생 | ⛔ |
| 도구 | `PostToolUse` | 도구 성공 직후 | ⛔ |
| 도구 | `PostToolUseFailure` | 도구 실패 직후 | — |
| 도구 | `PostToolBatch` | 병렬 도구 완료 후 | ⛔ |
| 서브 | `SubagentStart` / `SubagentStop` | 서브에이전트 생성/종료 | Stop만 ⛔ |
| 서브 | `TaskCreated` / `TaskCompleted` | 작업 생성/완료 | — |
| 턴 끝 | `Stop` / `StopFailure` | 응답 종료 | Stop만 ⛔ |
| 턴 끝 | `TeammateIdle` | 팀 동료 유휴 전환 직전 | ⛔ |
| 컨텍스트 | `PreCompact` / `PostCompact` | 압축 직전/직후 | Pre만 ⛔ |
| 세션 | `SessionEnd` | 세션 종료 | — |

### C. 수시 발생(비동기) 이벤트

정해진 단계가 아니라 해당 사건 발생 즉시 발화. 대부분 비차단.

| 훅 | 발화 시점 | 차단 |
|-----|-----------|:----:|
| `Notification` | 알림 발생 | — |
| `MessageDisplay` | 메시지 화면 표시 (표시 전용) | — |
| `InstructionsLoaded` | CLAUDE.md·rules 로드 | — |
| `ConfigChange` | 설정 파일 변경 | 대체로 예 |
| `CwdChanged` | 작업 디렉토리(cd) 변경 | — |
| `FileChanged` | 감시 파일 변경 | — |
| `WorktreeCreate` / `WorktreeRemove` | 워크트리 생성/제거 | Create만 ⛔ |

### D. 종료 코드(Exit Code) 동작

| 코드 | 의미 | 동작 |
|------|------|------|
| **0** | 성공 | JSON 있으면 결정으로 파싱, 없으면 통과 |
| **2** | 차단 에러 | stderr를 Claude에 전달 + 동작 차단 |
| **기타** | 비차단 에러 | stderr 첫 줄만 표시, 실행 계속 (exit 1 포함) |

> 💡 7번 섹션(Hooks)과 연결됨. 훅 = 이 생명주기의 각 지점에 붙이는 자동 명령.
> 공식 페이지에는 `hooks-lifecycle.svg`(전체 흐름) + `hook-resolution.svg`(매칭 해결) 두 그림이 있음.

---

## 9. MCP 도구 훅 (MCP Tool Hooks)

> ⚠️ "MCP 도구 훅"은 **방향이 다른 두 개념** + MCP 전용 이벤트로 나뉨.
> 출처: https://code.claude.com/docs/ko/hooks (MCP 도구 Hook 필드 / MCP 도구 일치)

### ① MCP 도구 호출을 가로채는 훅 (matcher로 매칭)
`PreToolUse`/`PostToolUse` 등에서 **MCP 도구가 호출될 때** 반응. 핵심은 이름 규칙.

**이름 규칙:** `mcp__<서버>__<도구>` (예: `mcp__memory__create_entities`)

| Matcher 패턴 | 매칭 대상 |
|--------------|-----------|
| `mcp__memory__.*` | memory 서버의 **모든** 도구 |
| `mcp__.*__write.*` | 모든 서버의 "write~" 도구 |
| `mcp__memory` | ❌ 동작 안 함 — `.*` 없으면 정확한 문자열 취급 |

> 서버 전체 매칭엔 `.*` 접미사 **필수**.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "mcp__memory__.*",
        "hooks": [{ "type": "command",
          "command": "echo 'Memory op' >> ~/mcp-operations.log" }] },
      { "matcher": "mcp__.*__write.*",
        "hooks": [{ "type": "command",
          "command": "/home/user/scripts/validate-mcp-write.py" }] }
    ]
  }
}
```

### ② MCP 도구를 훅 핸들러로 사용 (`type: "mcp_tool"`)
훅 동작으로 셸/HTTP 대신 **MCP 도구를 직접 호출**.

| 필드 | 필수 | 설명 |
|------|:----:|------|
| `server` | ✅ | 연결된 MCP 서버 이름 (이미 연결돼 있어야 함, 훅이 OAuth/연결 트리거 안 함) |
| `tool` | ✅ | 그 서버에서 호출할 도구 이름 |
| `input` | ❌ | 인수. 문자열은 `${path}` 치환 지원 (예: `"${tool_input.file_path}"`) |

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Write|Edit",
        "hooks": [{
          "type": "mcp_tool",
          "server": "my_server",
          "tool": "security_scan",
          "input": { "file_path": "${tool_input.file_path}" }
        }] }
    ]
  }
}
```
- 도구 출력이 유효 JSON이면 **결정(decision)**으로 파싱, 아니면 텍스트 표시
- 서버 미연결 / `isError:true` → **비차단 에러**, 실행 계속
- `SessionStart`/`Setup`은 MCP 연결 **전**에 발화 → 첫 실행 "미연결" 에러는 정상

### ③ Elicitation / ElicitationResult (MCP 전용 이벤트)
MCP 서버가 도구 실행 중 **사용자 입력을 요청**할 때 발화. (도구 실행에 중첩)

| 이벤트 | 발화 시점 | 용도 |
|--------|-----------|------|
| `Elicitation` | 서버가 입력 요청 시 | 폼 자동 수락/거부, 값 채우기 (exit 2 거부) |
| `ElicitationResult` | 사용자 응답 후, 서버 전송 직전 | 응답 수정·거부 |

- matcher = MCP **서버 이름**으로 필터 (예: `memory`, `filesystem`)
- 결정 제어: `action: "accept | decline | cancel"`, `content`로 폼 값 지정

```json
{ "hookSpecificOutput": {
    "hookEventName": "Elicitation",
    "action": "accept",
    "content": { "form_field_values": "..." } } }
```

> 🔑 핵심 구분: ① = "MCP 도구가 불릴 때 반응", ② = "훅이 MCP 도구를 부름" → 방향 반대.

---

## 10. 서브에이전트 (SubAgent)

> 출처: https://code.claude.com/docs/en/sub-agents

### 개념
특정 작업을 전담하는 **분리된 AI 도우미**. 자기만의 **독립 컨텍스트 창**에서 일하고
**결과 요약만** 메인 대화로 반환. (메인=팀장 / 서브=전문 팀원, 한 장 요약만 보고)

### 핵심 이점

| 이점 | 설명 |
|------|------|
| 컨텍스트 보존 | 탐색·로그·파일 내용이 메인 대화를 어지럽히지 않음 |
| 제약 강제 | 사용 도구 제한 (예: 읽기 전용) |
| 재사용 | 같은 작업자를 프로젝트마다 재사용 |
| 전문화 | 도메인 전용 시스템 프롬프트 |
| 비용 절감 | 가벼운 작업은 Haiku 등 저렴·빠른 모델로 |

### 내장 서브에이전트

| 에이전트 | 모델 | 도구 | 용도 |
|----------|------|------|------|
| **Explore** | Haiku | 읽기 전용 | 코드 검색·탐색 (CLAUDE.md·git 건너뜀→빠름) |
| **Plan** | 메인 상속 | 읽기 전용 | 플랜 모드 사전 조사 |
| **general-purpose** | 메인 상속 | 전체 | 탐색+수정 복합 작업 |
| statusline-setup | Sonnet | — | `/statusline` 설정 시 |
| claude-code-guide | Haiku | — | Claude Code 기능 질문 시 |

### 파일 형식 (YAML 프론트매터 + 본문=시스템 프롬프트)
```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---
You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

### 저장 위치(스코프) — 우선순위 순

| 위치 | 범위 | 우선순위 |
|------|------|--------|
| 관리 설정(Managed) | 조직 전체 | 1 (최고) |
| `--agents` CLI 플래그 | 현재 세션 | 2 |
| `.claude/agents/` | 현재 프로젝트(git 커밋 권장) | 3 |
| `~/.claude/agents/` | 내 모든 프로젝트 | 4 |
| 플러그인 `agents/` | 플러그인 활성 위치 | 5 (최저) |
> 정체성은 파일명 아닌 `name` 필드로 결정. 디스크에서 직접 추가/수정 시 세션 재시작 필요(`/agents`로 만들면 즉시 적용).

### 주요 프론트매터 필드 (필수: name, description)

| 필드 | 설명 |
|------|------|
| `name` | 소문자+하이픈. 훅의 `agent_type`로 전달 |
| `description` | **언제 위임할지** — 자동 위임 판단 근거 |
| `tools` | 허용 도구(화이트리스트). 생략 시 전체 상속 |
| `disallowedTools` | 차단 도구(블랙리스트). 둘 다 있으면 disallowed 먼저 |
| `model` | `sonnet`/`opus`/`haiku`/`fable`/풀ID/`inherit`(기본) |
| `permissionMode` | default/acceptEdits/auto/dontAsk/bypassPermissions/plan |
| `skills` | 시작 시 주입할 스킬 (전체 내용 주입) |
| `mcpServers` | 이 서브에이전트 전용 MCP 서버 |
| `hooks` | 이 서브에이전트 활성 중에만 도는 훅 (Stop→SubagentStop 변환) |
| `memory` | user/project/local — 세션 넘는 영구 기억 |
| `effort` | low~max 추론 강도 |
| `isolation` | `worktree` → 격리된 git 워크트리 복사본 |
| `background` | true → 항상 백그라운드 |
| `color` | 표시 색상 |

> 모델 해석 순서: `CLAUDE_CODE_SUBAGENT_MODEL` 환경변수 > 호출별 model > 프론트매터 model > 메인 모델.
> 도구 패턴: `mcp__<server>` / `mcp__<server>__*` 로 서버 단위 허용·차단 가능.
> 일부 도구는 서브에이전트에서 불가: AskUserQuestion, EnterPlanMode, ScheduleWakeup 등.

### 호출 방법 (강제력 순)

| 방법 | 강제력 |
|------|--------|
| 자연어 ("code-reviewer로 검토해줘") | Claude가 위임 여부 판단 |
| @-멘션 (`@"code-reviewer (agent)"`) | 해당 서브에이전트 **확정** 실행 |
| `--agent <name>` / `agent` 설정 | 세션 전체가 그 에이전트로 동작 |


> `description`에 "use proactively" 넣으면 자동 위임 유도.

### 컨텍스트 격리 (가장 중요)
- 새 **빈 컨텍스트**로 시작 → 대화 히스토리·읽은 파일·호출 스킬 **안 보임**
- Claude가 쓴 **위임 메시지(작업 요약)**만 받고 출발
- 받는 것: 자기 시스템 프롬프트 + CLAUDE.md/메모리 + git 상태 + 프리로드 스킬
  - 단, **Explore·Plan만** CLAUDE.md·git 건너뜀
- 끝나면 **요약만** 메인 복귀 → 메인 컨텍스트 깨끗
- 서브에이전트 트랜스크립트는 별도 파일에 저장, 메인 압축과 무관하게 보존(기본 30일)

### 전경/배경 & Fork & 중첩
- **전경**: 메인 막고 실행, 권한 프롬프트 전달
- **배경**: 동시 실행, 기존 권한으로만 동작(프롬프트는 자동 거부). `Ctrl+B`로 전환
- **Fork**: 일반 서브와 달리 **전체 대화 상속**(배경 설명 불필요), 도구 호출은 격리·결과만 복귀. `/fork <지시>`
- **중첩**(v2.1.172+): 서브에이전트가 자기 서브에이전트 생성 가능. 최대 깊이 5(고정)

### 서브에이전트 vs 메인 vs 스킬
- 메인 대화: 잦은 왕복·여러 단계 맥락 공유·빠른 수정·지연 민감
- 서브에이전트: 장황한 출력·도구 제한 필요·자기완결 작업
- 스킬: 분리 컨텍스트 아닌 **메인 대화에서** 도는 재사용 프롬프트/워크플로
- (대화 안 내용 빠른 질문은 `/btw` — 도구 없이 전체 맥락 보고 답 후 버림)

> 🔗 생명주기(8번)의 SubagentStart/SubagentStop 훅이 이 서브에이전트 시작/종료에 발화.

---

## 11. Rewind & Resume (세션 되감기 / 재개)

> 출처: code.claude.com/docs/en/checkpointing, /en/sessions


> 목적이 다름: **Rewind = 한 세션 안에서 과거로 되감기 / Resume = 종료한 세션 다시 열기**

### A. Rewind (체크포인트 되감기) — "로컬 undo"
Claude의 파일 편집 상태를 자동 스냅샷 → 잘못되면 과거 시점으로 복원.

**여는 법**

| 방법 | 설명 |
|------|------|
| `/rewind` | 되감기 메뉴 |
| `Esc` 두 번 | 입력창이 **비어 있을 때** 메뉴 (글자 있으면 글자 삭제됨) |

**메뉴 동작** (보낸 프롬프트 목록에서 지점 선택)

| 동작 | 효과 |
|------|------|
| Restore code and conversation | 코드, 대화 모두 되돌림 |
| Restore conversation | 대화만 (코드 유지) |
| Restore code | 코드만 (대화 유지) |
| Summarize from here | 선택 지점 이후 요약 압축 (앞 보존) |
| Summarize up to here | 선택 지점 이전 요약 압축 (뒤 보존) |
| Never mind | 취소 |

- 프롬프트 보낼 때마다 체크포인트 생성, 세션 넘어 유지, 기본 30일 정리
- Restore=상태 되돌림 / Summarize=파일 안 건드리고 대화만 압축(타겟형 /compact)

**⚠️ 한계**
- **Bash 파일 변경(`rm`/`mv`/`cp`)은 추적 안 됨** — Claude 편집 도구로 한 직접 편집만 추적
- 외부/다른 세션 수동 변경도 추적 안 됨
- **Git 대체 아님** — 체크포인트=로컬 undo, Git=영구 이력

### B. Resume (세션 재개)
종료/`/clear`한 이전 대화를 다시 열어 이어가기.

| 명령 | 동작 |
|------|------|
| `claude --continue` (`-c`) | 현재 디렉토리 **가장 최근** 세션 재개 |
| `claude --resume` (`-r`) | 세션 선택기 열기 |
| `claude --resume <name>` | 이름으로 바로 재개 |
| `claude --resume <session-id>` | ID로 재개 (`-p` 헤드리스도 가능) |
| `claude --from-pr <번호>` | PR 연결 세션 재개 |
| `/resume` | 세션 안에서 다른 대화로 전환 |

**선택기 단축키**: `Enter`재개 · `Space`미리보기 · `Ctrl+R`이름변경 · `/`검색(PR URL 가능) · `Ctrl+A`모든프로젝트 · `Ctrl+W`모든워크트리 · `Ctrl+B`현재브랜치

**이름 짓기**: 시작 `claude -n <name>` / 중간 `/rename <name>` / 선택기 `Ctrl+R`

### C. Branch (분기) — 원본 두고 다른 길 실험
- 세션 안: `/branch <name>`
- CLI: `claude --continue --fork-session`
- 원본 보존, 복사본으로 전환. "이어가되 갈라서 실험"

### 셋 비교

| | 범위 | 용도 |
|---|------|------|
| Rewind | 세션 **내부** | 과거로 코드/대화 undo |
| Resume | 세션 **간** | 종료한 대화 다시 열기 |
| Branch | 세션 **복제** | 원본 두고 다른 접근 |

### 세션 저장 위치
`~/.claude/projects/<project>/<session-id>.jsonl` (기본 30일, `cleanupPeriodDays`로 조정)

> 💡 handover.md는 "요약" 인수인계 → 내용 압축됨. `--resume`은 **원본 트랜스크립트 그대로** 이어감 → 정확 복원엔 resume.

---

## 12. 사전정의 없이 단일 서브에이전트 만들기 (모델 지정)

`.md` 정의 파일 없이 그 자리에서 1회성 서브에이전트를 띄우고 모델 지정하는 법.

### A. 인세션 자연어 (가장 간단, 추천)
내장 `general-purpose` 에이전트를 즉석 실행. 모델은 호출 시 지정.
```
haiku 모델로 서브에이전트 하나 띄워서 src의 TODO 주석 다 찾아줘
opus 서브에이전트로 이 버그 원인 분석해줘
```
- Claude가 Agent 도구로 general-purpose를 그 모델로 1회 실행. 파일 불필요.
- 모델은 **호출별(per-invocation)** → 같은 에이전트라도 매번 다른 모델 가능.

### B. `--agents` 플래그 (세션 한정, 디스크 저장 X)
실행 시 JSON으로 정의 → 그 세션에서만 존재. (PowerShell)
```powershell
claude --agents @'
{
  "quick-reviewer": {
    "description": "Reviews code changes quickly",
    "prompt": "You are a code reviewer. Focus on bugs and security.",
    "tools": ["Read", "Grep", "Glob"],
    "model": "haiku"
  }
}
'@
```
- `model`: sonnet/opus/haiku/fable 또는 풀ID(claude-opus-4-8)
- `prompt`=시스템 프롬프트, `tools`=도구 제한(선택). 여러 개 동시 정의 가능.

### C. 환경변수로 모델 강제
```powershell
$env:CLAUDE_CODE_SUBAGENT_MODEL = "haiku"
```

### 모델 해석 우선순위
```
1. CLAUDE_CODE_SUBAGENT_MODEL 환경변수  (최우선)
2. 호출별 model 파라미터
3. 정의의 model 프론트매터
4. 메인 대화 모델                        (기본)
```

### 상황별 선택

| 상황 | 방법 |
|------|------|
| 지금 한 번만 / 가장 간단 | A. 자연어 |
| 세션 동안 재사용 + 커스텀 | B. `--agents` JSON |
| 모든 서브에이전트 모델 통일 | C. 환경변수 |
| 여러 프로젝트 영구 재사용 | 사전정의 `.md` (10번 섹션) |

---

## 13. 서브에이전트 vs Agent Teams

> 📊 비교 다이어그램(Artifact): https://claude.ai/code/artifact/dca49fe6-d470-4c12-940c-db579bef2ad6
> 출처: code.claude.com/docs/en/agent-teams, /en/sub-agents

### 핵심 차이 한 줄
둘 다 병렬화하지만 — **서브에이전트=메인에만 보고(허브앤스포크)**,
**Agent Teams=팀원끼리 직접 소통 + 공유 작업목록(메시)**.

### 구조
```
[서브에이전트]                      [Agent Teams]
      Main(Opus)                         Lead(main)
     ╱   │   ╲                              │
   Sub  Sub  Sub      vs           ┌─ 공유 작업목록 + 메일박스 ─┐
   (결과만 메인에 보고)            팀원A ↔ 팀원B ↔ 팀원C
   서로 대화 X                     (서로 직접 메시지·반박, 스스로 일 claim)
```

### 항목별 비교

| 항목 | 서브에이전트 | Agent Teams |
|------|--------------|-------------|
| 컨텍스트 | 독립 창, 결과는 호출자로 반환 | 독립 창, 완전 독립 |
| 소통 | **메인에만 보고** | **팀원끼리 직접 메시지** |
| 조율 | 메인이 모든 작업 관리 | 공유 작업목록 + 자체 조율 |
| 적합 | 결과만 중요한 집중 작업 | 토론·협업 필요한 복합 작업 |
| 토큰 비용 | 낮음 (요약 반환) | **높음** (각자 별도 인스턴스) |
| 활성화 | 기본 켜짐 | **실험적 — env var 필요** |
| 중첩 | 가능 (최대 깊이 5) | 불가 (팀원은 팀 못 만듦) |
| 세션 재개 | 가능 | `/resume`·`/rewind`로 인프로세스 팀원 복원 안 됨 |

### Agent Teams 구성 요소

| 구성 | 역할 |
|------|------|
| **Team Lead** | 팀원 띄우고 조율하는 메인 세션 |
| **Teammates** | 각자 작업하는 별도 Claude Code 인스턴스 |
| **Task List** | 팀원이 claim·완료하는 공유 작업 목록 |
| **Mailbox** | 에이전트 간 메시징 시스템 |

### 활성화 (실험적, 기본 꺼짐)
```json
// settings.json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```
- 켜면 자연어로 팀 요청: "팀원 3명 띄워서 UX·아키텍처·반대역할로 탐색해줘"
- Lead 터미널 하단 패널에서 팀원 선택(↑↓)·열기(Enter)·중단(Esc)
- 팀원 소통: `SendMessage`로 이름 지정해 직접 메시지 (자동 전달, 폴링 불필요)
- 디스플레이 모드: in-process(기본, 모든 터미널) / split-pane(tmux·iTerm2 필요)
- 저장: `~/.claude/teams/{team}/config.json`, `~/.claude/tasks/{team}/`

### 언제 무엇을
- **서브에이전트**: 빠른 일꾼이 결과만 보고. 코드 탐색·테스트·검수·장황한 출력 격리. 순차/같은파일/의존성 많은 일.
- **Agent Teams**: 팀원이 발견 공유·서로 반박·자체 조율. 병렬 코드리뷰(보안/성능/테스트), 경쟁 가설 디버깅, 프론트·백·테스트 동시.
- 권장 팀 크기 3~5명, 팀원당 작업 5~6개.

### ⚠️ Windows 주의
- in-process 모드는 모든 터미널 OK. **split-pane은 tmux/iTerm2 필요** → Windows Terminal·VS Code 통합터미널 미지원.
- 즉 Windows에선 in-process로만 쓰는 게 현실적 (OMC의 `/team`도 tmux 의존 — 9번 OMC 노트 주의점과 동일 맥락).

> 🔗 서브에이전트 정의(`tools`/`model`)는 팀원으로도 재사용 가능 (정의 본문이 팀원 시스템 프롬프트에 추가됨). 단 정의의 `skills`/`mcpServers`는 팀원으론 적용 안 됨.

---

## 14. Agent Teams 활성화 & settings.json

> 내 환경: **이미 활성화됨** (`~/.claude/settings.json`에 OMC가 넣어둠). 추가 작업 불필요.

### 활성화 방법
**방법 1 — settings.json** (권장):
```json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```
**방법 2 — 셸 환경변수** (PowerShell, 일시적):
```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1"
```
> 설정은 **세션 시작 시 로드** → 바꾸면 재시작해야 반영.

### settings.json 경로 (정확한 이름)
⚠️ `./claude/setting.json`(X) → **`.claude/settings.json`**(O). 점으로 시작 + `settings`(복수).

| 파일 | 범위 | 비고 |
|------|------|------|
| `~/.claude/settings.json` | **유저 전역** (모든 프로젝트) | 내 AgentTeams 설정 여기 ✅ |
| `.claude/settings.json` | 프로젝트 공유 | git 커밋 (팀원 공유) |
| `.claude/settings.local.json` | 프로젝트 **나만** | git 제외 (내 건 permissions만) |
| 관리 설정(Managed) | 조직 강제 | 못 끔 |

### 내 `~/.claude/settings.json` 현재 상태 (요약)
- `enabledPlugins`: oh-my-claudecode@omc 활성
- `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`: "1"  ← Agent Teams 켜짐
- `theme`: dark-daltonized, `statusLine`: OMC HUD
- `extraKnownMarketplaces`: omc 마켓플레이스 등록

### 쓰는 법 (이미 켜진 상태)
```
팀원 3명 띄워서 이 PR을 보안/성능/테스트 관점으로 각각 리뷰해줘
```
- Windows → **in-process 모드**로 동작 (split-pane은 tmux 필요, 13번 주의점)
- teammateMode 변경: `~/.claude/settings.json`의 `"teammateMode"` ("in-process"/"auto"/"tmux")

---

## 15. Dynamic Workflow (동적 워크플로)

> 출처: claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code

### 개념
Claude가 작업에 맞춰 **그 자리에서 직접 작성하는 오케스트레이션 하네스(harness)**.
고정 절차가 아니라, **짧은 JavaScript 프로그램을 즉석에서 짜서** 여러 서브에이전트를 조율한다.
(Opus 4.8부터 Claude가 맞춤 하네스를 직접 작성할 만큼 똑똑해진 게 전제)

### 단일 에이전트의 3가지 실패 → 이걸 해결

| 문제 | 설명 |
|------|------|
| Agentic laziness | 일부만 하고 "다 했다"며 조기 종료 |
| Self-preferential bias | 자기 결과를 대안보다 편애 |
| Goal drift | 턴 길어지며 원래 목표에서 이탈 |

→ 작업을 잘게 쪼개 독립 컨텍스트 서브에이전트에 맡기고, 적대적 검증을 끼워 해결.

### 빌딩 블록 (JS 함수)
- `agent(prompt, opts)` — 서브에이전트 1개 실행 (model·schema 지정)
- `parallel([...])` — 동시 실행 (배리어: 전부 끝날 때까지 대기)
- `pipeline(items, stage1, stage2...)` — 항목별 다단계 (단계 간 배리어 없음)
- `phase(title)` — 진행 단계 구분
- `schema` — 구조화 출력 강제 (검증된 객체 반환)

### 6가지 조합 패턴

| 패턴 | 용도 |
|------|------|
| Classify-and-act | 유형 분류 후 분기 |
| Fan-out-and-synthesize | 잘게 나눠 병렬 → 결과 종합 |
| Adversarial verification | 독립 에이전트가 결과 반박·검증 |
| Generate-and-filter | 후보 다수 생성 → 품질 필터 |
| Tournament | 후보끼리 쌍대결로 최선 선발 |
| Loop-until-done | 멈춤 조건까지 계속 생성 |

### 호출 / 활성화
- 직접 요청: "워크플로 써서 ~해줘"
- 트리거 키워드 **`ultracode`**: 워크플로 생성 보장
- **`/loop` 연동**: 반복 작업(트리아지·리서치·검증) 주기 실행
- **`/goal` 연동**: 완료 조건 지정

### ⚠️ 비용·규모
- 토큰 많이 씀 → 복잡·고가치 작업에 적합. 토큰 예산 지정 가능("use 10k tokens")
- 한 번에 수백 개 에이전트까지 확장

> 💡 관계: 서브에이전트(10번)=일꾼, Agent Teams(13번)=서로 대화하는 팀,
> **dynamic workflow=일꾼들을 JS 코드로 결정론적으로 조율하는 지휘 로직**.
> 제어 흐름(루프·조건·팬아웃)을 모델 즉흥이 아니라 코드로 확정하는 게 차별점.

---

## 16. ultracode & deep-research

> 출처: claude.com/blog/introducing-dynamic-workflows-in-claude-code, /a-harness-for-every-task...

### ultracode — "최대 출력" 모드
켜면 두 가지가 동시에:
1. **effort(추론 강도) = `xhigh`**
2. **Claude가 언제 dynamic workflow 쓸지 자동 판단** (매번 지시 불필요)
- 한 번에 끝내려 하지 않고, 수십~수백 병렬 서브에이전트 오케스트레이션 스크립트를 즉석 작성 + 결과 전에 스스로 검증
- 토큰 효율보다 **철저함·정확성 우선**

**켜고 끄기**

| 방법 | 효과 |
|------|------|
| 프롬프트에 `ultracode` 입력 | 그 턴만 워크플로 사용 보장 |
| effort 메뉴(설정)에서 토글 | 세션 내내 기본 적용 |

**관계**: dynamic workflow(15번)를 "기본값으로 알아서 쓰게" 만드는 스위치 + xhigh.
⚠️ 토큰 많이 씀 → 복잡·고가치 작업용.

### deep-research — 딥 리서치 하네스(스킬)
여러 출처를 교차검증해 **인용 달린 리포트**를 만드는 리서치 전용 스킬. dynamic workflow로 동작.
```
질문 → 웹검색 팬아웃(병렬) → 출처 fetch → 적대적 검증(교차확인) → 인용 종합 리포트
```
- 1차 출처 우선, 확신 수준 명시, 검증된 근거 기반(환각 방지)
- 웹뿐 아니라 코드베이스 심층 탐색·Slack 상태보고 등에도
- 호출: `/deep-research`. (광범위하면 먼저 2~3개 좁히는 질문)

### ultracode vs deep-research

| | ultracode | deep-research |
|---|-----------|---------------|
| 정체 | 모드(xhigh + 워크플로 자동) | 리서치 전용 스킬 |
| 범위 | 모든 작업 | 조사·리포트 작업 |
| 결과 | 작업별 맞춤 | 인용 검증 리포트 |

> 공통: 둘 다 dynamic workflow(병렬 서브에이전트 오케스트레이션) 위에서 동작.

---

## 17. 역할별 모델 분담 설정 (실제 구축 내용)

오늘 구축한 워크플로: **문서=Sonnet, 코드=Opus(메인), 검수=Opus 서브에이전트**.

### 만든 파일 (모두 유저 전역 `~/.claude/`)

| 파일 | 내용 |
|------|------|
| `~/.claude/agents/doc-writer.md` | 한국어 문서 초안 작성 (model: sonnet) |
| `~/.claude/agents/doc-reviewer.md` | 문서 검수, 읽기 전용 (model: opus) |
| `~/.claude/CLAUDE.md` (USER-CUSTOM 블록) | 역할 분담 전역 규칙 (OMC 블록 바깥에 추가) |

### 동작 흐름
```
메인(Opus): 조율·코드
   ├─ 문서 초안 → doc-writer(Sonnet)
   ├─ 검수      → doc-reviewer(Opus, 독립 시각)
   └─ 코드      → 메인이 직접
```
호출: `@doc-writer ...` / `doc-writer로 초안, doc-reviewer로 검수` (체이닝)

### 설정 스코프 = 어디까지 자동 적용되나 (핵심)
유저 전역(`~/.claude/`)에 둔 건 **PC 어느 폴더에서 claude를 실행하든 자동 적용**. 재설정 불필요.

| 항목 | 위치 | 새 폴더 자동? |
|------|------|:------------:|
| Agent Teams 플래그 | `~/.claude/settings.json` | ✅ |
| doc-writer/reviewer | `~/.claude/agents/` | ✅ |
| 역할 분담 규칙 | `~/.claude/CLAUDE.md` | ✅ |
| 메모리 | `projects/<폴더>/memory/` | ❌ 프로젝트별 |
| 프로젝트 설정·CLAUDE.md | `.claude/` (그 폴더) | ❌ 프로젝트별 |

예외: ① 회사 관리설정(Managed)이 막으면 우선 적용됨 ② 프로젝트가 자기 설정으로 덮어쓸 때 ③ 다른 계정/`CLAUDE_CONFIG_DIR` 변경 시.
주의: 설정·에이전트는 **세션 시작 시 로드** → 디스크에서 바꾸면 재시작해야 반영(`/agents`로 만들면 즉시).

## 18. 노트 발행(블로그) 시 표 깨짐 주의

증상: 발행된 HTML에서 표 구분선이 em대시로 바뀌어 표가 깨짐 (`|------|` → `|——|`).
- 원인: 원본 md는 정상(하이픈). **Jekyll/kramdown의 스마트 타이포**가 하이픈 연속(`------`)을 em대시(`——`)로 변환 → 표 인식 실패.
- 진짜 해결(블로그 쪽): `_config.yml`에 GFM 입력 지정
  ```yaml
  markdown: kramdown
  kramdown:
    input: GFM
  ```
- 원본 md는 고칠 필요 없음(기술적으로 정상). 블로그 설정만 수정.

---

> 참고: 각 CLAUDE.md 파일은 200줄 이하로 유지하는 것을 권장
