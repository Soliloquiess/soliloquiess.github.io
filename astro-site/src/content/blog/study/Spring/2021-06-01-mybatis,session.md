---
title: "[Spring] MVC MyBatis 연동과 세션(Session) 상태 유지"
date: 2021-06-01
category: "Spring"
tags: ["Spring"]
description: "MyBatis의 커넥션 풀·SqlSession 구조를 정리하고, HttpSession을 활용한 회원 인증 상태 유지 기법과 AJAX 비동기 통신 원리를 설명한다."
permalink: "study/2021/06/01/mybatis,session"
---

## MyBatis란?

JDBC(Java Database Connectivity)로 직접 DB를 다루면 **모든 쿼리를 개발자가 직접 작성**해야 하고, 수정 시 일일이 고쳐야 해서 유지보수가 어렵고 개발 속도도 느리다.

**MyBatis**는 이 문제를 해결해주는 SQL 매퍼(Mapper) 프레임워크다.

![5f208a29-9374-4b57-bd8c-4952117d3789](/assets/5f208a29-9374-4b57-bd8c-4952117d3789.jpg)

MyBatis를 사용하면 DAO에 하드코딩하던 DB 접속 정보를 **properties 파일**로 분리해 관리한다.

![20210601_022843](/assets/20210601_022843.png)

![20210601_022930](/assets/20210601_022930.png)

![20210601_022945](/assets/20210601_022945.png)

SQL 문은 **매퍼 파일(XML)**에 저장한다.

![20210601_030823](/assets/20210601_030823.png)

DB 접속에는 위의 3가지 파일(properties, mapper XML, 환경설정 XML)이 모두 필요하다.

---

## 커넥션 풀(Connection Pool)

![20210601_035918](/assets/20210601_035918.png)

properties와 SQL 매퍼 파일을 **XML 환경설정 파일**로 묶는다.

![20210601_040430](/assets/20210601_040430.png)

데이터 소스(DataSource)를 설정하는 곳이다. (`kr.bit.mybatis` 폴더의 `db.properties` 설정)

![20210601_043420](/assets/20210601_043420.png)

자바와 DB를 연결하는 **커넥션**은 프로젝트에서 가장 부하가 높은 지점이다(인증·DB 정보 확인 등). 일반 JDBC는 작업 후 커넥션을 종료하지만, **MyBatis는 커넥션을 없애지 않고 재활용**한다.

> **커넥션 풀**: 커넥션을 미리 여러 개 메모리에 생성해두고, 필요할 때 꺼내 쓰고 반납하는 방식.

![20210601_043746](/assets/20210601_043746.png)

XML 환경설정을 읽어 **pooled** 방식으로 커넥션을 생성한 뒤 `SqlSessionFactory`에 보관한다.

| JDBC 용어 | MyBatis 용어 |
|---|---|
| Connection | SqlSession |
| ConnectionPool | SqlSessionFactory |

![20210601_044627](/assets/20210601_044627.png)

- **SqlSession**: DB 액세스 시 가장 핵심적인 역할을 하는 개별 커넥션 객체
- **SqlSessionFactory**: 여러 SqlSession을 보관하는 커넥션 풀

![20210601_044815](/assets/20210601_044815.png)

XML을 읽어 `SqlSessionFactory`가 만들어지고, 커넥션 풀이 메모리에 생성된다. 이후 세션을 꺼내 DB 작업이 가능하다.

![20210601_124502](/assets/20210601_124502.png)

XML 매퍼가 SQL 문을 대신하며, VO 타입으로 결과를 묶을 때는 `resultType`으로 정의한다.

![20210601_130048](/assets/20210601_130048.png)

![20210601_130857](/assets/20210601_130857.png)

JDBC 코드를 MyBatis로 대체하면 코드량이 크게 줄어든다.

![1](/assets/1_0hpvgadx8.png)
![2](/assets/2_p7mbhx1r2.jpg)
![3](/assets/3_h1qpvqdcz.jpg)
![4](/assets/4_pvgy975ct.jpg)
![5](/assets/5_b66szq8m4.jpg)

- **SqlSessionFactoryBuilder**: 환경설정 파일을 읽어 커넥션 풀을 생성한다.
- **SqlSessionFactory**: SqlSession 집합(커넥션 풀)을 가리킨다.
- **SqlSession**: DB 액세스 시 가장 중요한 역할을 담당한다.

![6](/assets/6_nonuf9h81.jpg)

- `configurations` 파일에 DB 설정 파일을 적용하고, 이를 읽어 팩토리 객체를 생성하는 것이 `SqlSessionFactoryBuilder`의 역할이다.

---

## 상태 유지 기법 — 세션(Session)

### Request 바인딩의 한계

![20210601_173218](/assets/20210601_173218.png)

`Request`/`Response` 객체에 데이터를 바인딩하여 **포워딩(Forwarding)**하면, 포워딩된 페이지에서만 `getAttribute()`로 값을 꺼낼 수 있다.

> 포워딩은 **단 하나의 페이지**에서만 인증 상태를 확인할 수 있어, 여러 페이지에 걸쳐 회원 인증을 유지하기 어렵다.

---

### 쿠키(Cookie)와 세션(Session) 개념

![4c976186-de2a-48c7-9047-a47c6d928e9c](/assets/4c976186-de2a-48c7-9047-a47c6d928e9c.jpg)

학원 비유로 이해해보자.

- 학생이 처음 방문하면 **수강권(번호 포함)**을 발급받는다 → 이것이 **쿠키**
- 캐비넷은 수강권 번호를 알아야 사용할 수 있다 → 이것이 **세션(HttpSession)**

| 현실 세계 | 웹 용어 |
|---|---|
| 수강권 (쿠키) | Cookie (브라우저 캐시에 저장) |
| 캐비넷 | HttpSession (서버 메모리) |
| 수강 번호 | Session ID |

***클라이언트와 서버 간의 식별은 쿠키로 이루어진다.***

![2c7409a9-b17c-4bbc-ab0b-56d0c5fc8918](/assets/2c7409a9-b17c-4bbc-ab0b-56d0c5fc8918.jpg)

- A.jsp: `request`에서 id를 꺼낼 수 있다.
- B.jsp, C.jsp: `request` 객체를 가져올 수 없어 **인증 상태 확인 불가**.

---

### HttpSession을 통한 다중 페이지 인증 유지

![a80c3b79-a8b0-4252-a33a-88e01423092f](/assets/a80c3b79-a8b0-4252-a33a-88e01423092f.jpg)

**HttpSession**을 사용하면 A·B·C 페이지 모두에서 인증 상태를 확인할 수 있다.

![b5a4f3d4-2c1b-4c54-9268-9bdb48c37bb6](/assets/b5a4f3d4-2c1b-4c54-9268-9bdb48c37bb6.jpg)

세션 동작 흐름:

1. 클라이언트 최초 접속 → 서버가 `HttpSession` 메모리 공간 생성, **세션 ID** 부여
2. 세션 ID가 **쿠키**에 담겨 브라우저에 저장됨
3. 두 번째 방문부터 브라우저가 자동으로 쿠키(세션 ID)를 서버로 전송
4. 서버는 세션 ID로 기존 세션 메모리를 찾아 재사용

![25c59ea7-a275-4710-83b8-26ec4bfe5cd2](/assets/25c59ea7-a275-4710-83b8-26ec4bfe5cd2_v4rglheen.jpg)

동일 브라우저에서 요청하면 **세션이 동일**하게 유지된다.

---

### 세션을 활용한 회원 인증

클라이언트가 인증 성공 시:

1. `request.getSession()`으로 세션 객체를 가져온다(없으면 새로 생성).
2. 인증 성공 정보를 세션에 `setAttribute()`로 저장.
3. 이후 어느 페이지에서든 같은 세션 ID로 `getAttribute()`가 가능.

![370709fe-82cd-4b28-acf4-6030cb5315cb](/assets/370709fe-82cd-4b28-acf4-6030cb5315cb.jpg)

- 세션에 바인딩된 값이 **있으면 인증 성공**, **없으면 인증 실패**.

![7ef7dc90-3d28-4ed8-979f-11add895a99e](/assets/7ef7dc90-3d28-4ed8-979f-11add895a99e.jpg)

동일 브라우저라면 A·C 페이지 모두 같은 세션 번호로 데이터를 꺼낼 수 있다.

![20210601_180521](/assets/20210601_180521.png)

![20210601_184845](/assets/20210601_184845.png)

`getSession()`이 요청을 읽어 일치하는 세션이 있으면 기존 세션을 재사용(`getAttribute` 가능). 없으면 회원 인증 페이지로 되돌린다.

---

## AJAX (Asynchronous Javascript And XML)

**AJAX**란 `XMLHttpRequest` 객체를 이용해 **페이지 전체를 새로 고치지 않고** 필요한 부분의 데이터만 서버에서 불러오는 비동기 통신 기법이다.

### 비동기 방식이란?

웹페이지를 리로드하지 않고 데이터를 불러오는 방식. 서버에 요청을 보낸 후 응답을 기다리는 동안 프로그램이 멈추지 않고 계속 실행된다.

### 동기 vs 비동기

| 구분 | 동기(Sync) | 비동기(Async) |
|---|---|---|
| 요청 후 대기 | 응답 받을 때까지 중단 | 응답과 무관하게 계속 실행 |
| 페이지 갱신 | 전체 리로드 | 일부만 갱신 |
| 자원 효율 | 낮음 | 높음 |

### AJAX가 사용하는 기술

- HTML / DOM
- JavaScript
- **XMLHttpRequest**

### AJAX의 장단점

**장점**
- 웹페이지 속도 향상
- 서버 처리 완료를 기다리지 않고 다른 작업 가능
- 서버에서 데이터만 전송하면 되어 코드량 감소
- 기존 웹에서 불가능했던 다양한 UI 구현 가능

**단점**
- 히스토리 관리가 어렵다.
- 페이지 이동 없는 통신으로 보안 이슈 발생 가능
- 연속 요청 시 서버 부하 증가
- `XMLHttpRequest` 통신 진행 중 사용자에게 피드백 없음
- 크로스 도메인(Cross-Domain) 문제 발생

> 출처: https://velog.io/@surim014/AJAX%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

---

### 응답 방식 비교

| 방식 | 설명 |
|---|---|
| Forward | JSP로 포워딩하여 응답 |
| Redirect | 컨트롤러를 통해 다른 URL로 응답 |
| **AJAX** | 페이지 변환 없이 콜백 함수로 데이터만 응답 |

AJAX는 현재 페이지를 유지한 채로 서버에 요청하고, 응답 결과를 **콜백 함수**의 매개변수로 받는다.

![99f53c3c-53e3-4beb-bc08-c157e759ff8b](/assets/99f53c3c-53e3-4beb-bc08-c157e759ff8b.jpg)

![20210601_224320](/assets/20210601_224320.png)

![20210602_000013](/assets/20210602_000013.png)

서버-클라이언트 간 AJAX + JSON 통신 흐름:

1. JavaScript에서 서버로 비동기 요청
2. 서버가 **JSON(Gson 변환)** 형태로 응답
3. 콜백 함수에서 JSON 키값으로 데이터 렌더링

![20210602_025347](/assets/20210602_025347.png)

로그인 인증 후 파일 업로드 처리 예시.

![20210602_031351](/assets/20210602_031351.png)

`count == -1`이면 더 이상 읽을 데이터가 없음을 의미하며, 그 전까지는 버퍼에서 `0`부터 `count`만큼 데이터를 읽어들인다.
