---
title: "[Git] Sourcetree로 브랜치 전략을 활용한 Git 충돌 해결"
date: 2023-02-13
category: "Git"
tags: ["Git"]
description: "pull 중 충돌이 발생했을 때 임시 브랜치를 생성해 충돌을 안전하게 분리하고, Sourcetree의 GUI로 손쉽게 병합·해결하는 전 과정을 단계별로 정리했다."
permalink: "etc/2023/02/13/SourceTree-브랜치"
---

## 문제 상황

`git pull` 중 충돌 에러가 발생해 원하는 동작이 실행되지 않는 경우가 있다.

![충돌 에러 화면](https://user-images.githubusercontent.com/37941513/218321884-fbe1e632-4da4-4d88-96c9-890ccdf6c27e.png)

내가 수정한 소스와 상대방이 push하여 원격 저장소에 올라간 소스가 **충돌**한 상황이다.

---

## 해결 전략: 임시 브랜치 활용

### 1단계 — 임시 브랜치 생성 및 충돌 소스 보존

`mergeTest` 브랜치를 새로 생성하고, 해당 브랜치로 체크아웃한 뒤 현재 충돌 중인 소스를 **commit & push**한다.

![mergeTest 브랜치 생성](https://user-images.githubusercontent.com/37941513/218322304-eb96b0c4-b792-4703-8099-911d43c01c92.png)

---

### 2단계 — develop 브랜치와 병합

`mergeTest` 브랜치에서 `develop` 브랜치 소스를 병합한다.

![병합할 커밋 선택](https://user-images.githubusercontent.com/37941513/218322376-3058fd2a-cc25-4716-8c89-8829ea2a8e0d.png)

현재 브랜치에 병합할 커밋을 선택하면, 충돌 병합 Alert 창이 나타난다.

![충돌 병합 Alert](https://user-images.githubusercontent.com/37941513/218321887-73f8fe10-8d70-4103-b477-72a4672a302b.png)

그래프를 보면 병합이 완료된 것을 확인할 수 있다.

![병합 후 그래프](https://user-images.githubusercontent.com/37941513/218321889-ef28fbcf-a20c-4569-83cd-a649ee369371.png)

---

### 3단계 — 충돌 파일 확인

파일 상태에서 충돌 난 소스를 확인한다.

![충돌 파일 목록](https://user-images.githubusercontent.com/37941513/218321890-bf22d1f4-d7a9-4e9f-a753-a1743056216e.png)

충돌 마커는 다음과 같이 구분된다.

| 구간 | 의미 |
|------|------|
| `<<<< HEAD` ~ `====` | 내가 수정한 소스 |
| `====` ~ `>>>> origin/master` | 원격 저장소에 올라간 소스 |

온전한 상태의 소스를 얻으려면 이 구간을 직접 수정해야 하지만, **Sourcetree는 GUI로 이 작업을 제공한다.**

---

### 4단계 — Sourcetree 충돌 해결 기능 활용

**액션 > 충돌 해결**을 클릭하면 두 가지 옵션이 나타난다.

![충돌 해결 메뉴](https://user-images.githubusercontent.com/37941513/218321891-a893c7fc-f427-40d7-903a-f1242a4e8a5a.png)

| 옵션 | 적용 대상 소스 |
|------|--------------|
| ‘내것’을 이용해 해결 | `<<<< HEAD` ~ `====` 구간 |
| ‘저장소’ 것을 사용하여 해결 | `====` ~ `>>>> origin/develop` 구간 |

원하는 옵션을 선택하면 소스를 쉽게 동기화할 수 있다.

![충돌 해결 후 상태](https://user-images.githubusercontent.com/37941513/218321892-8c9ee98d-4e75-411d-bbe0-852087a177ea.png)

소스 동기화 후 충돌 수정 사실을 알리기 위해 원격 저장소에 **commit & push**한다.

---

### 5단계 — develop 브랜치로 복귀 및 최종 병합

`develop` 브랜치로 체크아웃하면 `origin/master`가 `mergeTest`에 병합된 그래프를 확인할 수 있다.

![develop 복귀 후 그래프](https://user-images.githubusercontent.com/37941513/218322581-07fc9180-715f-4e25-99cb-98fcdc5a2638.png)

이제 `mergeTest` 브랜치를 로컬 `master` 브랜치에 병합한다.

![최종 병합 그래프](https://user-images.githubusercontent.com/37941513/218322581-07fc9180-715f-4e25-99cb-98fcdc5a2638.png)

마지막으로 충돌 난 부분을 수정하고, 원격 `develop` 브랜치에 push하면 **충돌 해결 및 소스 동기화 완료**다.

---

### 6단계 — 임시 브랜치 정리

`mergeTest` 브랜치는 충돌 해결 전용이므로 원격 저장소에 영구 보관할 필요가 없다.

> 원격 브랜치 삭제를 위해서는 로컬과 원격 양쪽에 push한 뒤 삭제해야 오류가 나지 않는다.  
> 또는 `git branch -D mergeTest` 명령어로 강제 삭제도 가능하다.

`master` 브랜치와 `mergeTest` 브랜치 모두 push 후, 그래프에서 `develop`과 `origin/mergeTest`가 같은 단계에 있는 것을 확인한다.

![push 후 그래프](https://user-images.githubusercontent.com/37941513/218322653-3539d4dc-2066-4eda-99e6-8811cf41783e.png)

로컬 및 원격 저장소의 `mergeTest` 브랜치는 마우스 오른쪽 클릭으로 삭제한다.

![브랜치 삭제](https://user-images.githubusercontent.com/37941513/218322721-23de2015-718f-49c5-a37d-11d438c67963.png)

---

## 정리

Git 충돌 해결 방법은 다양하다. 위와 같은 방법 외에도 원격 저장소 소스를 먼저 pull 받은 뒤 내 소스를 추가해 commit & push하는 방법, 또는 `mergeTest` 브랜치를 push한 뒤 로컬 `develop`에 직접 pull → 병합 → 충돌 해결 → push하는 방법도 있다.

**Sourcetree** 외에도 TortoiseGit, Eclipse Git 등 다양한 형상관리 GUI 툴을 활용할 수 있으며, git 터미널 명령어로 직접 관리하는 방법도 있다. 툴을 사용하면 그래프와 파일 상태를 직관적으로 파악할 수 있어 편리하다.

팀원끼리 소스 동기화를 꾸준히 관리한다면 **충돌을 최소화**할 수 있다.

---

- 참고: https://hoi5088.medium.com/git-sourcetree-%EC%82%AC%EC%9A%A9-%EC%A4%91-%EC%B6%A9%EB%8F%8C-%ED%95%B4%EA%B2%B0%EB%B2%95-becce5b93206
