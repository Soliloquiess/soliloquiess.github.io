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
