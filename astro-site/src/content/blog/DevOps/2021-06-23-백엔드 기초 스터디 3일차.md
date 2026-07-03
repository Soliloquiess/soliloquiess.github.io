---
title: "[DevOps] 개발 도구 기초 — Git 브랜치 전략과 Docker 컨테이너"
date: 2021-06-20
category: "DevOps"
tags: ["DevOps"]
description: "SVN vs Git 차이, fetch/pull/reset/merge 명령어와 Canary 브랜치 전략, Dockerfile·Image·Container 개념과 Docker Hub 활용, Postman Environment 설정까지 개발 운영 도구를 정리한 노트."
permalink: "study/2021/06/20/백엔드-기초-스터디-3일차"
---

## API 개발에 필요한 운영·관리 도구

| 도구 | 용도 |
|---|---|
| **Git** | 프로젝트 버전 관리 도구 |
| **Docker** | 배포 간소화에 많이 사용되는 가상화 도구 |
| **Postman** | API 테스팅 도구 |

---

## Git

- **리누스 토발즈(Linus Torvalds)** 가 Linux 개발 중 직접 만든 버전 관리 도구
- 당시 사용하던 BitKeeper의 정책 변경을 계기로, SVN·CVS를 대체하기 위해 개발
- 리누스 토발즈는 **Git**을 만들었고, **GitHub**는 별도 회사가 만든 Git 원격 저장소 서비스

![Git과 GitHub 관계 설명](/assets/20210702_133811.png)

### SVN vs Git 비교

| 항목 | SVN | Git |
|---|---|---|
| 방식 | **중앙 집중식** 버전 관리 | **분산형** 버전 관리 |
| 작업 방식 | 서버에서 일부만 받아와 수정 후 통합 | **로컬에서 전체 이력 보유**, 서버 없이도 작업 가능 |
| 장애 대응 | 서버 장애 시 작업 불가 | 서버가 날아가도 개별 작업 지속 가능 |

- `.git` 디렉토리가 Git 레포지토리의 실체. 이 디렉토리를 삭제하면 Git 레포지토리로 작동하지 않음
- Git의 모든 기능은 **커밋(commit)** 단위로 동작 (커밋 ID는 16진수 해시)

---

### Git 주요 명령어

#### `git init`

- 로컬에서 Git 레포지토리를 초기화
- `.git` 디렉토리를 자신의 폴더에만 생성

#### `git remote add origin <url>`

- 어떤 **원격 저장소**에 소스를 저장할지 지정
- `origin`을 저장함으로써 이 레포지토리에 전달할 원격 주소를 등록
- URL은 HTTP 외에도 SSH 등 다양한 스킴 사용 가능

#### 협업 시 기본 명령어

| 명령어 | 설명 |
|---|---|
| `git fetch` | 원격 저장소의 커밋 **이력만** 가져옴 (로컬 반영 없음) |
| `git pull` | 원격 저장소 이력을 가져와 **로컬에 적용** (충돌 가능) |
| `git clone` | 원격 저장소 전체를 로컬에 복사, 권한이 있으면 push도 가능 |

> 협업 시 하루 일과 제일 먼저 할 것: **`git pull`**

#### `git checkout` / `git reset`

| 명령어 | 설명 |
|---|---|
| `git checkout` | add 전 상태에서 변경사항을 **원래대로 되돌림** |
| `git reset HEAD~1` | 커밋 이력을 **로컬 기준으로 되돌림** |
| `git reset --soft` | 커밋만 취소, 변경 상태는 유지 |
| `git reset --mixed` | 커밋 취소 + staged 상태 해제 (변경 파일은 남음) |
| `git reset --hard` | 커밋 취소 + 변경사항 **완전 삭제** |

#### 브랜치 전략 (Canary 방식)

| 브랜치 | 역할 |
|---|---|
| **master** | 상용 브랜치 |
| **canary** | 릴리스 이전 검증용 브랜치 (크롬 카나리와 동일한 개념) |
| **dev / 개별 브랜치** | 개발자 작업 브랜치 |

- `git checkout -b <브랜치명>`: 새 브랜치 생성 후 전환
- `git push --set-upstream origin <브랜치>`: 로컬 브랜치를 원격에 최초 push

#### `git merge`

| 방식 | 설명 |
|---|---|
| **ff (fast-forward)** | 현재 브랜치 위에 합치려는 브랜치의 커밋을 시간순으로 얹음 |
| **no-ff (no fast-forward)** | 두 브랜치를 합치는 과정 자체를 새 커밋으로 기록 |

- **conflict(충돌)**: 서로 다른 브랜치에서 **같은 파일의 같은 부분**을 변경했을 때 발생 → 수동으로 해소 필요

> Git 시각화 참고: https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1

---

## Docker

- 현재 가장 널리 쓰이는 **가상화(컨테이너) 도구**

![Docker vs 기존 가상화(하이퍼바이저) 비교](/assets/20210702_134214.png)

- 왼쪽: Docker 방식 / 오른쪽: 기존 하이퍼바이저(VirtualBox 등) 방식

![Docker 사용 목적](/assets/20210702_134228.png)

### Docker 사용 목적

- 상용 환경에서 프로그램 설치 환경 표준화
- 자신이 개발한 서비스의 **배포 관리** 자동화
- Docker 엔진이 있으면 JDK, Python 등을 별도 설치 없이 컨테이너로 실행 가능

### Docker 핵심 개념

| 개념 | 설명 |
|---|---|
| **Dockerfile** | 개발한 프로그램을 어떤 환경으로 실행할지 정의하는 설명서 |
| **Image** | Dockerfile을 빌드한 결과물 (붕어빵 틀) |
| **Container** | Image를 실행한 프로세스 (붕어빵 틀로 구운 붕어빵) |

![Docker 명령어 예시](/assets/20210702_134243.png)

![Docker ps 컨테이너 확인](/assets/20210702_134258.png)

### Dockerfile 예시 (Python 애플리케이션)

![Dockerfile Python 예시](/assets/20210702_134311.png)

- `FROM python:3.7` — 베이스 이미지 지정 (Python 3.7 환경)
- `WORKDIR` — 작업 디렉토리를 현재 디렉토리로 설정
- `COPY . .` — 현재 디렉토리 파일을 이미지 내부로 복사
- `CMD ["python3", "hello.py"]` — 컨테이너 실행 시 수행할 명령어

![Dockerfile 빌드 과정](/assets/20210702_134328.png)

![Docker 이미지·컨테이너 디렉토리 구조](/assets/20210702_133918.png)

> 이미지 자체는 **설명서**, 컨테이너는 **그 설명서대로 실행된 프로세스**

---

### Docker Hub

- Docker 이미지를 공개·공유하는 **레지스트리 서비스**
- MySQL, Python 등 공식 이미지를 검색해 바로 사용 가능

![Docker Hub 공식 이미지 검색](/assets/20210702_133930.png)

- `docker run` 시 로컬에 이미지가 없으면 Docker Hub에서 자동으로 pull

![docker run 명령어 실행 예시 1](/assets/20210702_133950.png)

![docker run 명령어 실행 예시 2](/assets/20210702_133959.png)

- `-e` 옵션: 환경 변수 설정 (예: `MYSQL_ROOT_PASSWORD`)
- `-p` 옵션: 포트 바인딩 (호스트 포트:컨테이너 포트)
- `-d` 옵션: 백그라운드(detach) 모드로 실행
- `--name` 옵션: 컨테이너 이름 지정 (관리 목적에서 중요)

---

## Postman

- **API 테스팅 HTTP Client** 소프트웨어
- **Environment** 기능을 활용하면 로컬·개발·운영 환경별로 변수(IP, URL 등)를 쉽게 전환 가능
- API 개발 시 설정과 테스트를 효율적으로 관리할 수 있어 유용
