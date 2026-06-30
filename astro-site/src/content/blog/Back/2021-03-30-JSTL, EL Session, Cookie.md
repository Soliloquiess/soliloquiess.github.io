---
title: "[Backend] JSTL·EL·Session·Cookie — JSP 데이터 처리와 상태 관리"
date: 2021-03-29
category: "Backend"
tags: ["Backend"]
description: "DTO/DAO 패턴으로 서블릿과 DB를 분리하고, Request·Session·Application 스코프 차이, Cookie를 이용한 아이디 저장 기능을 정리한 학습노트."
permalink: "class/2021/03/29/JSTL,-EL-Session,-Cookie"
---

## DTO와 DAO 패턴 준비

![DTO/DAO 관계 구조 1](/assets/20210330_092559.png)

![DTO/DAO 관계 구조 2](/assets/20210330_092534.png)

![DTO/DAO 관계 구조 3](/assets/20210330_092523.png)

> 참고: 나중에 Vue를 사용하면 jQuery는 전혀 쓰지 않는다.

**DTO (Data Transfer Object)**는 테이블의 컬럼과 일반적으로 1:1 대응한다.

```java
rs = pstmt.executeQuery();  // 리턴 타입을 먼저 선언하면 IDE가 메서드를 자동 추가 목록에 올려준다.
```

- **DTO**는 앞으로 자주 만들게 된다.
- `Alt + S → R → A → R`: 게터·세터(Getter/Setter)를 단축키 한 번에 생성

> **서블릿 안에는 절대 HTML 코딩을 하면 안 된다.**

---

## Request·Session·Application 스코프

![에러 페이지 처리](/assets/20210330_144935.png)

- **sendRedirect**: request에 아무리 데이터를 담아도 **모두 버리고** 이동 → 데이터 전달 시 **forward** 사용
- **forward**: 다음 페이지까지만 request가 유지됨 (일회성)

대부분의 데이터는 request에 담으면 안 된다. → **Session에 담는다.**

![Session 스코프 예시](/assets/20210330_144935_7dc2o8052.png)

**Request·Session·Application** 세 객체는 `setAttribute` / `getAttribute` / `removeAttribute`를 공통으로 가지며, 차이는 **스코프(유효 범위)**뿐이다.

---

## Session 관리

![Session 타임아웃 설정](/assets/20210330_152810.png)

- 세션은 **30분** 동안 아무 동작이 없으면 만료
- 29분에 접근하면 다시 30분이 초기화되어 대기

---

## Cookie — 아이디 저장 기능

![Cookie 아이디 저장 기능](/assets/20210330_155120.png)

아이디 저장 체크 시 Cookie에 아이디를 저장하고, 다음 방문 시 자동으로 입력란에 채워준다.
