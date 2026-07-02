---
title: "[Springboot] REST API 완전 정리 — 설계 원칙부터 @RestController 구현까지"
date: 2023-12-30
category: "Springboot"
tags: ["Springboot"]
description: "REST의 개념·아키텍처 제약 조건부터 Resource·URI 설계, HTTP Methods·Status Codes, @RestController/@ResponseBody와 JSON 응답 구현, MyBatis·JPA 연동, 예외 처리·필터링·버전 관리·실전 예제까지 — Spring Boot RESTful API 개발 전반을 하나로 통합 정리합니다."
permalink: "study/2023/12/30/springboot-및-Rest-정리"
---

# REST 개념과 아키텍처

## REST란

**REST(Representational State Transfer)**는 네트워크 아키텍처 원칙의 모음으로, 웹을 위한 소프트웨어 아키텍처의 한 형태다. 월드 와이드 웹과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식이라고도 표현한다.

분산 시스템을 위한 기본 설계 원칙을 제공하여 자원을 표현하고 상태를 전송하는 방법을 정의한다.

- **엄격한 의미**: REST는 네트워크 아키텍처 원리의 모음이다. 여기서 "네트워크 아키텍처"란 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반을 일컫는다.
- **간단한 의미**: 웹상의 자료를 HTTP 위에서, SOAP이나 쿠키를 통한 세션 트래킹 같은 별도의 전송 계층 없이 전송하기 위한 아주 간단한 인터페이스를 말한다.

REST 아키텍처 형식을 따르면 HTTP나 WWW이 아닌 아주 커다란 소프트웨어 시스템도 설계할 수 있다. 또한 리모트 프로시저 콜 대신 간단한 XML과 HTTP 인터페이스를 이용해 설계하는 것도 가능하다.

REST의 핵심 개념 세 가지:

1. **자원(Resource)**: 모든 것을 자원으로 표현한다. 각 자원은 고유한 식별자(**URI**)를 가지며 이를 통해 접근한다.
2. **표현(Representation)**: 자원의 상태를 나타내는 형태로 데이터를 전달한다. JSON이나 XML 형태로 자원을 표현한다.
3. **상태 전이(State Transfer)**: 클라이언트는 자원 상태를 조작하기 위한 정보를 포함한 요청을 보내고, 서버는 적절한 응답을 반환한다.

```
[Client] ──── HTTP Request (GET/POST/PUT/DELETE) ────▶ [Server]
   ▲                                                       │
   │                                                       ▼
   └──────── HTTP Response (JSON / XML 표현) ──────────  Resource (URI로 식별)
```

RESTful 시스템을 구축하면 서로 다른 시스템 간 통합이 용이해지고 확장성·유지보수성이 높아진다. REST는 주로 **HTTP 프로토콜**을 기반으로 동작하며 HTTP 메서드(GET, POST, PUT, DELETE 등)로 자원을 조작한다.

REST도 SOAP과 마찬가지로 클라이언트 통신 방식이다. 여기서 말하는 **상태(State)**는 컴퓨터가 가지고 있는 자원을 의미한다. 자원은 컴퓨터에 저장된 파일이거나 DB에 저장된 데이터일 수 있으며, 모든 자원은 각각 고유한 이름으로 표현된다. 그 자원이 가진 상태를 주고받는 것이 REST 서비스다.

- REST는 자원의 형태를 표현하기 위한 방식이다.
- HTTP 메서드를 이용해 리소스를 처리하기 위한 아키텍처다.

REST는 프로그래밍 언어에 독립적이고 개발하기 수월하며, 2000년대 중반 모바일의 등장과 함께 인기가 이어지고 있다.

![REST 개념](/assets/20210724_230922.png)

REST API는 이러한 인터페이스를 말하며, REST API를 제공하는 것을 **RESTful**이라고 한다.

![REST API 자원 표현](/assets/20210724_234654.png)

![REST API 자원 표현](/assets/20210724_234654_guxlqkp3s.png)

각 자원은 고유한 값을 가지며, 이를 **URI**라고 한다. URI는 고유하고 유일하며, 응답할 때는 XML, HTML, JSON과 같은 문서 포맷이 사용된다.

---

## REST Architectural Constraints (아키텍처 제약 조건)

다음 6가지 제약 조건을 모두 갖추는 API를 **RESTful API**라고 한다. REST 제약 조건들을 제대로 지키면서 REST 아키텍처를 만드는 것을 RESTful이라고 하며, 다음 제약 조건들을 준수하는 한 개별 컴포넌트들을 자유로이 구현할 수 있다.

| 제약 조건 | 설명 |
|-----------|------|
| **클라이언트-서버** | 클라이언트(프런트엔드)와 서버(백엔드)는 서로 독립적으로 분리된다. 일관적인 인터페이스로 분리되어야 한다 |
| **무상태(Stateless)** | 요청 처리 중 서버에 상태를 저장하지 않는다. 세션 상태는 클라이언트 측에 저장한다 |
| **캐시 가능(Cacheable)** | 클라이언트는 응답을 캐시에 저장할 수 있어야 한다. 캐싱은 클라이언트-서버 간 상호작용을 부분적으로 또는 완전하게 제거하여 확장성(scalability)과 성능을 크게 향상시킨다 |
| **일관된 인터페이스(Uniform Interface)** | 클라이언트-서버 간 모든 상호작용을 통일된 방식으로 관리한다. 아키텍처를 단순화하고 작은 단위로 분리함으로써 클라이언트-서버 각 파트가 독립적으로 개선되게 하며 결합도를 낮춘다 |
| **계층화된 시스템(Layered System)** | 서버는 여러 계층을 가질 수 있다. 중간 서버는 로드밸런싱 기능이나 공유 캐시 기능을 제공함으로써 확장성 있는 시스템을 구성하는 데 유용하다 |
| **코드 온 디맨드(Code on Demand)** | (선택적) 서버가 자바 애플릿이나 자바스크립트 실행 코드를 제공함으로써, 클라이언트가 실행시킬 수 있는 로직을 전송하여 런타임에 클라이언트 기능을 확장할 수 있다 |

### REST 인터페이스 원칙에 대한 가이드

가이드를 충실히 이행했는지에 따라 REST를 제대로 썼는지 판단할 수 있다.

1. **자원 식별**: 요청 내에 기술된 개별 자원을 식별할 수 있어야 한다. 웹 기반 REST 시스템에서의 URI 사용을 예로 들 수 있다.
2. **메시지를 통한 리소스 조작**: 클라이언트가 어떤 자원을 지칭하는 메시지와 특정 메타데이터만 가지고 있다면, 이것으로 서버상의 해당 자원을 수정·삭제하는 충분한 정보를 갖고 있다고 볼 수 있다.
3. **자기 서술적 메시지**: 각 메시지에는 처리 방법에 대한 충분한 정보가 들어 있어야 한다.
4. **애플리케이션 상태에 대한 엔진으로서의 하이퍼미디어(HATEOAS)**: 클라이언트에 응답할 때 단순히 결과 데이터만 제공하는 것이 아니라 URI를 함께 제공해야 한다.

---

## Web Service & Web Application

![Web Service와 Web Application 개요](/assets/20210724_212029.png)

웹 서비스란 네트워크 상에서 서로 다른 종류의 컴퓨터들 간에 상호작용하기 위한 소프트웨어 시스템이다.

> **Q. SOAP도 아니고 REST도 아닌 HTTP API는 뭐라고 하나요?**
>
> A. RESTful API와 HTTP API에는 약간 차이가 있습니다. RESTful API는 REST 명세에 따른 제약 조건이 몇 가지 있습니다. 반환하는 문서의 데이터 타입(XML, JSON), 지원하는 HTTP METHOD의 종류(GET/POST/PUT/DELETE) 등이 있습니다.
>
> HTTP API는 HTTP 전송 프로토콜을 사용하는 모든 API입니다. 여기에는 RESTful API나 SOAP도 포함되어 있을 수 있습니다.

### Web Service란

웹 서비스(web service)는 네트워크 상에서 서로 다른 종류의 컴퓨터들 간에 상호작용을 하기 위한 소프트웨어 시스템이다. 서비스 지향적 분산 컴퓨팅 기술의 일종이며, 프로토콜 스택은 SOAP, WSDL, UDDI 등으로 이루어진다. 모든 메시징에 XML이 사용되어 상호운용성이 높다.

3가지 키워드로 정리하면 다음과 같다.

- 머신과 머신, 애플리케이션과 애플리케이션 간의 상호작용
- 플랫폼 독립적으로 운영
- 애플리케이션 간에 네트워크를 통한 통신 지원

### Web Application이란

웹 애플리케이션(web application)은 소프트웨어 공학적 관점에서 인터넷이나 인트라넷을 통해 웹 브라우저에서 이용할 수 있는 응용 소프트웨어를 말한다.

웹 브라우저를 클라이언트로 사용하는 사람이 많아 인기를 누리고 있다. 수천만 대의 PC에 일일이 소프트웨어를 배포·설치하지 않아도 유지 관리할 수 있다는 점이 장점이다. 웹 메일, 온라인 전자상거래 및 경매, 위키, 인터넷 게시판, 블로그, MMORPG 게임 등 다양한 기능을 구현할 수 있다.

웹 브라우저는 HTTP 통신을 통해 받은 내용을 클라이언트에게 보여준다.

![웹 애플리케이션과 웹 서비스의 통신](/assets/20210724_225323.png)

- **request**: 웹 애플리케이션에서 웹 서비스로 전달하는 값 (웹 서비스 입장에서는 input 정보)
- **response**: 웹 서비스에서 처리된 결과값을 클라이언트로 반환하는 것 (output)

서비스를 정의하려면 다음이 필요하다.

- 문서 포맷
- 문서 구조
- 요청 서비스 위치(endpoint)

최근에는 XML보다 문서량이 적은 JSON을 더 많이 사용한다.

![문서 포맷 예시](/assets/20210724_225309.png)

![SOAP 구조](/assets/20210724_230126.png)

### SOAP

- SOAP는 HTTP 프로토콜 등을 이용해 XML을 전달할 수 있는 시스템이다.
- 웹 서비스 통신을 위해 XML을 사용하며, 구조는 envelope, header, body로 구성된다.
- 복잡하고 무겁고 어려워서, 더 간편한 REST 방식이 많이 쓰이게 되었다.

### SOAP vs REST

![SOAP과 REST 비교](/assets/20210724_235046.png)

- 먼저 접근 제한성이나 시스템 아키텍처에 맞는 것을 선택한다.
- 그 외에도 4가지 항목을 더 따져보고 선택한다.

---

## 서버와 클라이언트의 분리 - RESTful 서비스

서버는 RESTful 서비스만 제공하도록 역할이 축소되었다. REST는 **Representational State Transfer**의 약자로, 리소스를 XML 혹은 JSON 형태로 제공한다는 개념이다.

게시판을 예로 들어보자. 게시판을 안드로이드 앱으로 개발한다면, 안드로이드는 서버에 API만 호출해서 데이터를 받은 뒤 안드로이드 고유의 UI로 네이티브 앱을 구성한다. 아이폰도 마찬가지다.

HTTP 메서드를 활용하면 게시판의 CRUD를 모두 구현할 수 있으므로, 서버와 클라이언트가 자연스럽게 분리된다.

| 동작 | HTTP 메서드 |
| --- | --- |
| 게시판 내용 조회 | GET |
| 게시판 작성 | POST |
| 게시판 내용 수정 | PUT |
| 게시판 내용 삭제 | DELETE |

- 게시판 데이터는 클라이언트가 렌더링한다.
- 다양한 데이터를 JSON 형태로 받는다.

### 기존 서비스 vs REST 서비스

| 구분 | 기존 서비스 | REST 서비스 |
|---|---|---|
| 응답 형태 | 플랫폼에 맞는 View(HTML 등) | JSON 또는 XML 데이터 |
| View 관리 | 필요 | 불필요 |
| 플랫폼 의존성 | 웹/모바일별 View 변경 필요 | 어느 플랫폼에서나 동일 사용 가능 |
| 주 사용처 | 전통적 웹 서비스 | **OPEN API**, SPA, 모바일 앱 |

![20210722_202633](/assets/20210722_202633.png)

![20210722_203009](/assets/20210722_203009.png)

![20210722_203457](/assets/20210722_203457.png)

![20210723_010305](/assets/20210723_010305.png)

![20210723_010307](/assets/20210723_010307.png)

클라이언트가 데이터를 전송할 때, 일반적인 방법(JSP)은 전체 화면을 구성해서 보내지만, REST는 XML이나 JSON 형태의 데이터만 전송한다. 서버는 JSON 형식으로 받더라도 내부적으로는 자바 객체로 처리한다.

### 클라이언트 사이드 렌더링(SPA)

SPA(Single Page Application)는 라우팅과 SEO에서 단점이 있다.

- 메타 태그를 바꿔야 하는데 싱글 페이지라 헤더가 바뀌지 않는다.
- 그래서 나온 솔루션이 Nuxt 등을 사용한 서버 사이드 렌더링(SSR)이다.

![SPA 구조](/assets/20210718_210611.png)

배포, CI/CD, 젠킨스 등 백엔드 지식도 어느 정도 알아야 한다.

#### 프론트엔드에서의 HTTP 호출

- HTTP 호출에는 `axios` 같은 httpClient 라이브러리를 많이 사용한다.
- Vue는 라이프사이클 메서드를 제공한다. 그중 `mounted`는 컴포넌트(예: HelloWorld)가 화면에 그려진 직후 자동으로 호출되며, 여기에 HTTP 호출을 넣는다.
- `axios`를 통해 호출하고 콘솔로 결과를 확인한다.

#### CORS 문제

로컬에서 8080을 호출해야 하는데 8081을 호출하면, 도메인이 달라 호출하지 못한다. 이를 해결하려면 브라우저가 프록시(proxy)를 거치도록 설정해야 한다.

#### 데이터 바인딩

뷰를 직접 저장하는 게 아니라 모델을 만들어 두고, 모델 데이터에 따라 화면이 변동되도록 한다. 모델 데이터를 바인딩하면 변경 시 자동으로 렌더링된다.

---

# 리소스와 URI 설계

## REST API의 구성

- **자원(resource)**: URI
- **행위(verb)**: HTTP 메서드
- **표현(representations)**: 리소스에 대한 표현(HTTP MESSAGE BODY)

## REST 주요 개념

| 개념 | 설명 |
|------|------|
| **자원(Resource)** | 데이터의 표현. 고유한 URI로 식별되며 사용자·제품·주문 등 모든 데이터가 해당 |
| **하위 자원(Sub Resource)** | 자원의 하위 부분. 특정 사용자의 주문 목록, 제품의 리뷰 등 |
| **URI** (Uniform Resource Identifier) | 자원을 식별하기 위한 고유 주소체계 |
| **HTTP 메소드** | 자원을 조작하기 위한 HTTP 요청 메소드(GET/POST/PUT/PATCH/DELETE) |
| **HTTP 상태 코드** | 서버 응답 상태를 나타내는 코드(200/404/500 등) |

---

## REST - Resource (자원)

REST 기반 시스템의 핵심은 **자원(Resource)**이다. 자원은 애플리케이션을 통해 외부에 노출하고자 하는 모든 데이터를 의미한다. 리소스는 서비스를 제공하는 시스템의 자원을 의미하며 URI로 정의된다.

자원은 RESTful 시스템에서 **URI(Uniform Resource Identifier)**를 통해 식별되며, 사용자·제품·주문·이미지·문서 등 다양한 데이터 형태를 포함할 수 있다.

```
Resource (자원)  ──식별──▶  URI                ──표현──▶  Representation
  User                      /users/{id}                  JSON / XML
  Product                   /products/{id}               JSON / XML
  Order                     /orders/{id}                 JSON / XML
```

---

## URI (Uniform Resource Identifier)

**URI(유니폼 자원 식별자)**는 자원을 식별하기 위한 고유한 주소체계다. 웹 기반 시스템에서 HTTP가 가장 일반적으로 사용되는 프로토콜이며, URI를 통해 고유한 자원을 식별한다. URI는 웹에 있는 자원의 이름과 위치를 식별한다.

블로그 게시물 자원에 대한 URI 설계 예시:

```
블로그 게시물 자원에 대한 URI 예시
  /posts                              → 전체 게시물 컬렉션
  /posts/{post_id}                    → 특정 게시물
  /categories/{category_id}/posts     → 특정 카테고리의 게시물 목록
```

### URI 설계 규칙

#### 명사를 사용하라

URI는 명사를 사용해야 하며 동사는 피해야 한다. 명사만으로는 세부적인 동작을 표현하는 데 한계가 있을 때만 동사를 URI에 포함할 수 있다.

#### 동사는 HTTP 메서드로 표현한다

동사를 표현할 때는 HTTP 메서드인 `GET`, `POST`, `PUT`, `DELETE` 등으로 대체해야 한다.

#### 복수형을 사용하라

URI에서는 명사에 단수형보다 복수형을 사용해야 한다. `/book`도 명사라 사용 가능하지만, `/books`로 표현하면 컬렉션(collection)으로 명확히 표현할 수 있어 확장성 측면에서 유리하다.

#### 슬래시로 계층 관계를 표현한다

#### URI의 마지막에 슬래시를 넣지 않는다

넣어도 문제는 없지만 다음 계층이 있다는 오해를 부를 수 있다.

#### URI는 소문자로 작성한다

![URI 설계 규칙 예시](/assets/20210821_190845.png)

---

## REST - Sub Resource (하위 자원)

REST에서는 자원 간 관계를 **하위 자원(Sub Resource)**으로 모델링한다.

```
/{parent}/{parent_id}/{child}            → 부모에 속한 하위 자원 컬렉션
/{parent}/{parent_id}/{child}/{child_id} → 특정 하위 자원

예) /users/{user_id}/orders              → 특정 사용자의 주문 목록
    /users/{user_id}/orders/{order_id}   → 특정 사용자의 특정 주문
```

> 하위 자원을 사용할 때, **자식 객체는 부모 객체 없이 존재할 수 없다**.

---

# HTTP 메서드와 상태 코드

## HTTP Methods

참고: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

| 메서드 | 역할 | 설명 |
|--------|------|------|
| **GET** | 조회(읽기) | 자원을 조회한다 |
| **POST** | 생성 | 새로운 자원을 생성한다 |
| **PUT** | 전체 수정(교체) | 자원을 생성하거나 전체를 교체한다 |
| **PATCH** | 부분 수정 | 자원의 일부를 수정한다 |
| **DELETE** | 삭제 | 자원을 삭제한다 |

HTTP 요청은 크게 GET, POST, PUT, DELETE로 분류된다. 모든 HTTP 요청은 서버에서 처리된 후 응답 코드와 함께 결과를 받는다. 어떤 상태로 받게 되는지는 HTTP status 코드로 알 수 있다.

- **HTTP URI**: 제어할 자원(Resource)을 명시 (what)
- **HTTP METHOD**: 해당 자원에 수행할 명령을 지정 (how)

### GET vs POST (프로토콜 관점)

| 구분 | GET | POST |
| --- | --- | --- |
| Body | 없음 | 있음 |
| 데이터 전달 | URL 뒤 쿼리 파라미터 | Body |
| Content-Type | `x-www-form-urlencoded` 형태로 날아옴 | (Body로 전달) |

- GET은 프로토콜 상 body를 보낼 수 없어서 쿼리 파라미터로 내보낸다.
- POST는 body가 있다.
- 모두 HTTP 프로토콜이다. REST를 만들려면 DB 관련 기술(MyBatis, JPA)도 함께 알아야 기반이 된다.

---

## HTTP Status Codes

자주 사용되는 HTTP 상태 코드 목록이다.

| 코드 | 이름 | 설명 |
|------|------|------|
| **200** | OK | 요청 성공. 응답 내용이 클라이언트로 반환됨 |
| **201** | Created | 요청 성공 및 새로운 리소스가 생성됨 |
| **400** | Bad Request | 잘못된 구문으로 서버가 요청을 처리하지 못함 |
| **401** | Unauthorized | 리소스 접근을 위한 인증이 필요함 |
| **403** | Forbidden | 서버가 요청을 거부함. 유효한 요청이어도 응답하지 않음 |
| **404** | Not Found | 요청한 리소스를 지정 위치에서 찾을 수 없음 |
| **500** | Internal Server Error | 서버 내부 오류로 요청을 수행할 수 없음 |

상태 코드는 대역대로도 분류할 수 있다.

| 상태 코드 | 의미 |
| --- | --- |
| 200번대 | 정상 동작 |
| 400번대 | 클라이언트 오류 |
| 500번대 | 서버 측 오류 |

---

# @RestController와 스프링 기본 개념

## Spring Boot로 개발하는 RESTful Service

### Spring Boot 동작 과정

![Spring Boot 동작 과정](/assets/20210725_000612.png)

1. Spring Boot Application
2. Auto Configuration
3. Component Scan

가장 먼저 실행되는 스프링 애플리케이션은 Auto Configuration으로 설정을 자동화하고, 설정에 따라 개발자가 등록한 환경을 불러온다. 그리고 Component Scan에서 각종 컴포넌트를 불러온다.

사용 용도에 따라 Repository, Entity, Service 등으로 가져온다.

---

## 스프링 MVC 구조

스프링 MVC는 `DispatcherServlet`, `View Resolver`, `Handler`, `View` 등으로 구성된다.

### 스프링 요청 처리 흐름도

![스프링 MVC 요청 처리 흐름도](/assets/20210821_022001.png)

1. 클라이언트(브라우저)의 요청을 `DispatcherServlet`이 받는다.
2. 받은 요청을 처리할 수 있는 `Handler`의 이름을 `HandlerMapping`에게 물어본다.
3. `HandlerMapping`은 요청 URL을 비롯한 여러 요청 정보를 가지고 `Handler`를 판단한다.
4. `DispatcherServlet`은 `HandlerMapping`으로부터 선택받은 `Handler`에게 요청을 보낸다.
5. `Handler`는 요청을 처리하고, 렌더링할 `ViewName`을 판단해서 `DispatcherServlet`에 전송한다.
6. `DispatcherServlet`은 논리적인 `ViewName`을 `ViewResolver`에 전달한다.
7. `ViewResolver`는 응답에 필요한 `View`를 생성하여 `DispatcherServlet`에 보낸다.
8. `DispatcherServlet`은 해당 `View`에 `Model`을 전달한다.
9. `View`는 `Model`을 참조해서 응답을 생성한다.
10. `DispatcherServlet`은 생성된 응답을 클라이언트(브라우저)에 반환한다.

### DispatcherServlet

![DispatcherServlet 동작](/assets/20210725_140259.png)

---

## RestController와 싱글톤

`@RestController`를 붙여 두면, 스프링이 구동되면서 해당 컨트롤러 인스턴스를 만들어 스프링 내부(컨테이너)에 보관한다.

- 인스턴스는 한 번만 생성되고, 여러 번 호출되더라도 그 하나의 인스턴스를 재사용한다. 이것이 **싱글턴 패턴**이다.
- 필요할 때 이 인스턴스를 주입하는 것이 **DI(의존 주입)** 다.
- 스프링은 싱글턴으로 만든 객체를 자기 컨테이너에 갖고 있다.

### Controller vs RestController

- **`@Controller`** : 페이지(뷰)를 리턴한다.
- **`@RestController`** : 데이터를 리턴한다.

모바일이 등장하면서 리소스를 XML, JSON 형태로 리턴해야 할 일이 생겼고, 그래서 `@RestController`가 사용된다.

![RestController](/assets/20210725_141126.png)

> `@RestController` = 기존의 `@Controller` + `@ResponseBody`

---

## 비동기 응답을 만드는 2가지 방법

### 방법 1: `@Controller` + `@ResponseBody`

- 일반 컨트롤러처럼 `@Controller`를 사용
- 메서드에 `@ResponseBody`를 추가하면 뷰 이름이 아닌 **실제 데이터**(String, DTO, List 등)를 HTTP 응답 바디로 직접 반환

### 방법 2: `@RestController`

- `@RestController` 하나로 `@Controller` + `@ResponseBody` 효과를 동시에 적용
- 클래스 내 모든 메서드에 자동으로 `@ResponseBody`가 붙는다고 이해하면 된다.

> `@RestController` = `@Controller` + `@ResponseBody`

![20210723_021640](/assets/20210723_021640.png)

과거에는 `json-simple.jar`를 사용해 JSON 객체를 직접 조립해서 반환했다 (아래가 구 방식).

![20210723_021839](/assets/20210723_021839.png)

**Jackson 라이브러리**를 사용하면 자바 객체를 JSON으로 **자동 변환**하여 반환할 수 있다.

![20210723_021945](/assets/20210723_021945.png)

`success` 콜백에 List가 들어오는데, Jackson이 자바 객체를 JSON으로 변환해주기 때문에 별도 처리 없이 사용 가능하다.

---

## 요청 매핑과 파라미터

### RequestMapping과 HTTP 메서드

- `@RequestMapping`은 모든 매핑 방식(GET/POST 등)을 다 호출할 수 있다.
- 예를 들어 POST를 허용하지 않으면 톰캣 서버가 에러를 읽어서 내보낸다. (HTTP 프로토콜 차원의 동작)

### RequestParam — 쿼리 스트링

- `@RequestParam`은 URL 쿼리 스트링으로 들어온 값을 받을 때 쓴다.
- GET 매핑에서 name으로 지정하면 값을 받는다.
- 스프링이 쿼리 파라미터를 받는 규칙은 `@RequestParam`이며, URL 뒤에 `?key=value` 형식으로 보낸다. 이것이 (HTTP) 프로토콜이고, 스프링에서 받는 방식이 스프링의 규칙이다.

### PathVariable — URL 경로 파라미터

- URL 경로에서 파라미터를 받을 때는 `@PathVariable`로 받는다.
- 쿼리 파라미터(`@RequestParam`)와 URL 경로 파라미터(`@PathVariable`)는 받는 방식이 다를 뿐, 문법적으로는 비슷하다. 개발할 때 프로토콜 상황에 큰 차이는 없고 경우에 따라 선택한다.
- `@Path`: 경로 지정 / `@PathVariable`: 경로에 포함된 변수 값을 추출. GET 방식으로 URL에 변수를 포함해 요청할 때 사용한다.
- `raw`: 데이터를 직접 바디에 넣어 전송

![PathVariable 사용](/assets/20210725_143705.png)

```
@RestController
public class HelloWorldController {
    // GET

    // /hello-world(endpoint)
    // @RequestMapping(method=RequestMethod.GET, path="/hello-world")
    @GetMapping(path="/hello-world")
    public String helloWorld(){
        return "Hello World";
    }


    @GetMapping(path="/hello-world-bean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("Hello World");
        //자바 빈 형태로 주면 json형태로 줄 것.
        //responsebody 안 넣더라도 RestController로 인해 자동으로 json으로 넣어져 들어간다.
    }

    @GetMapping(path="/hello-world-bean/path-variable/{name}")
    public HelloWorldBean helloWorldBean(@PathVariable String name){
      return new HelloWorldBean(String.format("Hello World, %s", name));
  }
}


```

![PathVariable 실행 결과](/assets/20210725_150738.png)

정상적으로 동작하는 것을 확인할 수 있다.

### Request / Response 구조

- 위쪽이 `request`, 아래쪽이 `@ResponseBody`다.
- 둘 다 **헤더와 body**로 이뤄지며, 한 칸이 띄워진 이유도 헤더와 바디로 나뉘기 때문이다.
- 요청 형식 `x-www-form-urlencoded`는 쿼리 파라미터와 비슷하며, request와 response 양쪽에 존재할 수 있다. 쿼리 파라미터 방식뿐 아니라 `x-www-form-urlencoded` 방식으로도 받을 수 있고, body도 함께 받을 수 있다.

---

## 컨트롤러 메서드 매개변수

### 주요 매개변수

- **Model**: 이동 대상에 전달할 데이터를 가지고 있는 인터페이스
- **RedirectAttributes**: 리다이렉트 대상에 전달할 데이터를 가지고 있는 인터페이스
- **자바 빈즈 클래스**: 요청 파라미터를 가지고 있는 자바 빈즈 클래스
- **MultipartFile**: 멀티파트 요청을 사용해 업로드된 파일 정보를 가지고 있는 인터페이스
- **BindingResult**: 도메인 클래스의 입력값 검증 결과를 가지고 있는 인터페이스
- **java.util.Locale**: 클라이언트 로캘
- **java.security.Principal**: 클라이언트 인증을 위한 사용자 정보를 가지고 있는 인터페이스

### 요청 데이터 처리 어노테이션

- `@PathVariable`: URL에서 경로 변수 값을 가져오기 위한 어노테이션
- `@RequestParam`: 요청 파라미터 값을 가져오기 위한 어노테이션
- `@RequestHeader`: 요청 헤더 값을 가져오기 위한 어노테이션
- `@RequestBody`: 요청 본문 내용을 가져오기 위한 어노테이션
- `@CookieValue`: 쿠키 값을 가져오기 위한 어노테이션

---

# JSON 변환과 응답

## JSON이란?

**JSON(JavaScript Object Notation)**은 자바스크립트에서 객체를 표현할 때 사용하는 표현식으로, 데이터 교환 형식으로 널리 사용된다. 플랫폼이나 언어와 무관하게, 자바스크립트 내 자료 교환을 목적으로 만들어진 포맷이다.

### REST 서버에서 XML보다 JSON을 더 선호하는 이유

- JSON은 표현의 완전성과 가독성이 좋을 뿐 아니라 자바스크립트의 기본 형식이다.
- JSON은 XML보다 표현이 간단하다. 또한 XML 스키마나 XML DTD에 대한 구분이 필요 없다.

### JSON의 문법

- JSON은 바이너리(binary) 코드가 아닌 문자로만 이루어져 있다.
- 문자의 인코딩은 유니코드이다.
- JSON의 마임타입(MIME)은 `application/json`이다.
- JSON은 여는 중괄호 `{`로 시작하고 닫는 중괄호 `}`로 끝난다.
- 콤마는 두 개의 JSON 값을 구분하는 구분자로 사용한다.
- 키와 값의 구분은 `:`을 사이에 두고 한다. (일반 문자열을 읽고 해석할 때는 `=`또는 `=>`도 구분자로 인식한다.)
- JSON 키와 문자열 타입의 값은 큰따옴표(`""`)를 사용하여 표기한다.
- 값으로 들어가는 자료 타입은 숫자를 표현한 문자(int, long, double), 문자열(string), 불린(boolean), JSON 배열(JSONArray), JSON 객체가 된다.

### JSON 자료 타입

JSON은 2개의 구조를 기본으로 가지고 있다.

- name/value 형태의 쌍으로 이루어진 컬렉션 타입. 다양한 언어에서 이는 object, record, struct(구조체), dictionary, hashtable, 키가 있는 list, 또는 연상 배열로 실현되었다.

#### Object

object는 name/value 쌍들의 비순서화된 집합이다. 좌중괄호로 시작하고 우중괄호로 끝낸다. 각 name 뒤에 콜론(`:`)을 붙이고, 콤마로 name/value 쌍들 간을 구분한다.

![JSON Object 구조](/assets/20210821_195713.png)

#### array

array는 값들의 순서화된 컬렉션이다.

![JSON array 구조](/assets/20210821_195741.png)

#### value

value는 큰따옴표 안의 string, number, true, false, null, object, array 등이 올 수 있으며, 이러한 구조들을 포함한다.

![JSON value 구조](/assets/20210821_195841.png)

#### String

큰따옴표 안에 둘러싸인 0개 이상의 유니코드 문자들의 조합이며, 백슬래시 이스케이프가 적용된다. 하나의 문자도 하나의 문자열로서 표현된다.

![JSON String 구조](/assets/20210821_195907.png)

---

## JSON 변환과 RequestBody / ResponseBody

- body 형태가 JSON이라는 의미이며, request·response 양쪽에 존재할 수 있다. body에 대한 컨텐츠를 준다.
- 스프링에서 JSON으로 리턴한다고 직접 JSON을 만드는 게 아니라, **인스턴스를 리턴하면 자동으로 변환**된다. 내부에 `jacksonMapper`(잭슨 매퍼)가 포함되어 있어 객체 인스턴스를 변환해 준다.

### @RequestBody

- `@RequestParam`과는 다르게 동작한다.
- Body에 있는 것을 모아서 객체(VO)로 변환하라는 의미다.
- 객체를 리턴하면 자동으로 JSON으로 바꿔 주듯, request에 JSON을 던지면 그 body를 꺼내 VO로 넣어 준다.
- 변환은 양방향 모두 **잭슨 매퍼**가 해 준다.

> 참고: REST는 표준이 아니다. GET으로도 데이터 생성이 가능하다.

### Jackson과 @JsonInclude

- 잭슨 매퍼가 객체를 JSON으로 만들어 주고, 반대로 JSON을 객체로 만드는 것도 잭슨 매퍼가 한다.
- 어떤 값이 `null`인 경우 JSON에 포함하지 않도록 하는 것이 **`@JsonInclude`** 다.
- 예를 들어 ID를 `null`로 줬는데 `0`으로 리턴되는 경우가 있다. `int`로 두면 원치 않는 값(`0`)이 들어갈 수 있으므로, Wrapper 타입으로 두면 `null`이 되어 클라이언트에 전달하지 않을 수 있다.

---

## AJAX 요청 설정

![20210723_014701](/assets/20210723_014701.png)

| 옵션 | 설명 |
|---|---|
| `url` | 요청을 보낼 서버 경로 |
| `type` | HTTP METHOD (`GET`, `POST`, `PUT` 등) |
| `contentType` | 클라이언트 → 서버로 보내는 데이터 타입 (여기선 JSON) |
| `dataType` | 서버 → 클라이언트로 돌아오는 데이터 타입 |

![20210723_015406](/assets/20210723_015406.png)

---

## jQuery Ajax 통신

### 1. `$.get()`

HTTP GET 요청을 사용하여 서버에서 데이터를 로드한다.

```
$.get(url, parameters, callback)
```

매개변수로 명시된 URL을 사용하여 서버에 GET 요청을 전송한다. 매개변수는 쿼리 문자열로 전달한다.

| 변수명    | 타입           | 설명                                                                                                                      |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| URL       | String         | GET 메서드로 연결하는 서버측 자원의 URL                                                                                   |
| parameter | Object, String | URL에 덧붙이는 쿼리문자열을 구성하려고 이름과 값의 쌍으로 프로퍼티를 지닌 객체, 미리 구성 및 인코딩 된 쿼리 문자열        |
| callback  | Function       | 요청이 완료되면 호출되는 함수. 응답 본문은 이 콜백 함수의 첫번째 매개변수로 전달되며 상태값은 두번째 매개변수로 전달된다. |

- **반환값**: XHR 인스턴스

### 2. `$.getJSON()`

HTTP GET 요청을 사용하여 서버에서 JSON 형식으로 인코딩된 데이터를 로드한다.

```
$.getJSON(url, parameters, callback)
```

매개변수로 명시된 URL을 사용하여 서버에 GET 요청을 전송한다. 응답은 JSON 문자열로 해석되며, 결과로 만들어진 데이터는 콜백 함수에 전달된다.

| 변수명    | 타입           | 설명                                                                                                                      |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| URL       | String         | GET 메서드로 연결하는 서버측 자원의 URL                                                                                   |
| parameter | Object, String | URL에 덧붙이는 쿼리문자열을 구성하려고 이름과 값의 쌍으로 프로퍼티를 지닌 객체, 미리 구성 및 인코딩 된 쿼리 문자열        |
| callback  | Function       | 요청이 완료되면 호출되는 함수. 응답 본문은 이 콜백 함수의 첫번째 매개변수로 전달되며 상태값은 두번째 매개변수로 전달된다. |

- **반환값**: XHR 인스턴스

### 3. `$.post()`

HTTP POST 요청을 사용하여 서버에서 데이터를 로드한다.

```
$.post(url, parameters, callback)
```

| 변수명    | 타입           | 설명                                                                                                                      |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| URL       | String         | GET 메서드로 연결하는 서버측 자원의 URL                                                                                   |
| parameter | Object, String | URL에 덧붙이는 쿼리문자열을 구성하려고 이름과 값의 쌍으로 프로퍼티를 지닌 객체, 미리 구성 및 인코딩 된 쿼리 문자열        |
| callback  | Function       | 요청이 완료되면 호출되는 함수. 응답 본문은 이 콜백 함수의 첫번째 매개변수로 전달되며 상태값은 두번째 매개변수로 전달된다. |

### 4. `$.ajax()`

비동기 HTTP(Ajax) 요청을 수행한다.

```
$.ajax(options)
```

요청의 생성 방법과 통보받을 콜백을 제어하고자, 전달된 `options`를 사용하여 Ajax 요청을 전송한다.

**매개변수**

| 변수명 | 타입   | 설명                                                            |
| ------ | ------ | --------------------------------------------------------------- |
| option | object | 요청에 대한 매개변수를 정의하는 프로퍼티를 소유한 객체 인스턴스 |

- **반환값**: XHR 인스턴스

**함수의 옵션**

| 변수명      | 타입     | 설명                                                                                                                                                                                                                             |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | String   | 요청 URL                                                                                                                                                                                                                         |
| type        | String   | 사용할 HTTP 메서드, 일반적으로 POST나 GET을 사용한다. 생략하면 기본값으로 GET을 사용한다.                                                                                                                                        |
| data        | Object   | 요청에 전달되는 프로퍼티를 가진 객체. GET요청이면 데이터는 쿼리 문자열로 제공된다.POST 요청이면 데이터는 요청의 본문으로 제공된다.                                                                                               |
| datatype    | String   | 응답의 결과로 반환되는 데이터의 종류를 식별하는 키워드. 유효한 xml, html, json, jsonp, script, text이다.                                                                                                                         |
| timeout     | Number   | Ajax의 요청제한 시간을 밀리초 단위로 설정한다.                                                                                                                                                                                   |
| global      | Boolean  | true나 false냐에 따라 전역함수를 활성화 하거나 비활성화 한다.                                                                                                                                                                    |
| content     | String   | 요청에 명시되는 타입 생략하면 'application'/ x-www-form-urlencoded' 가 기본값으로 설정된다.                                                                                                                                      |
| headers     | Object   | 요청헤더 XMLHttpRequest 전송을 사용하여 요청과 함꼐 추가로 전송할 헤더키/ 값 쌍의 객체                                                                                                                                           |
| success     | Function | 응답이 성공상태의 코드를 반환하면 호출되는 함수. 응답 본문은 이 함수의 첫번째 매개변수로 전달되며, dataType 프로퍼티에 명시한 형태로 구성된다. 두번째 매개변수는 상태값을 나타내는 문자열이며, 이번 경우에는 항상 'success'이다. |
| error       | Function | 응답이 에러상태의 코드를 반환하면 호출되는 함수. 매개변수가 세개 전달되는데, 각각 XHR인스턴스, 상태값이 항상 'error' 인 메시지 문자열, 선택사항으로 XHR인스턴스가 반환되는 예외객체이다.                                         |
| complete    | Function | 요청이 완료되면 호출되는 함수, 매개변수 두개가 전달되는데 각각 XHR인스턴스와 success또는 error 를 나타내는 상태 메시지 문자열이다. success 나 error 콜백을 명시했다면, 이 함수는 해당 콜백이 호출된 후에 실행된다.               |
| beforeSend  | Function | 요청이 전송되기에 앞서 먼저 호출되는 함수, 이 함수는 XHR 인스턴스를 전달받으며 사용자 정의헤더를 설정하거나 요청 전에 필요한 연산을 수행하는 데 사용할 수 있다.                                                                  |
| async       | Boolean  | 요청이 전송되기에 앞서 먼저 호출되는 함수, 이 함수는 XHR 인스턴스를 전달받으며 사용자 정의헤더를 설정하거나 요청 전에 필요한 연산을 수행하는 데 사용할 수 있다.                                                                  |
| ProcessData | Boolean  | 요청이 전송되기에 앞서 먼저 호출되는 함수, 이 함수는 XHR 인스턴스를 전달받으며 사용자 정의헤더를 설정하거나 요청 전에 필요한 연산을 수행하는 데 사용할 수 있다.                                                                  |
| ifModified  | Boolean  | true일때 Last-Modified 헤더를 확인하며 마지막 요청 이후에 응답 컨텐츠가 변경되지 않았다면 요청이 성공한다. 만일 생략하면 헤더를 확인하지 않는다.                                                                                 |

---

# 스프링 핵심 개념 — DI / IoC / Lombok / 자바 빈즈

## 자바 빈즈(JavaBeans)

자바 빈즈는 자바로 작성된 소프트웨어 컴포넌트이며, 썬 마이크로시스템즈는 다음과 같이 정의했다.

> "빌더 형식의 개발 도구에서 가시적으로 조작이 가능하고, 또한 재사용이 가능한 소프트웨어 컴포넌트이다."

자바 빈즈는 여러 면에서 유사하지만 엔터프라이즈 자바 빈즈(EJB)와 혼동하지 말아야 한다. EJB는 자바 플랫폼 엔터프라이즈 에디션(Java EE)의 일부로서 서버 계열의 컴포넌트이다.

### 자바 빈즈의 관례

자바 빈즈 클래스로 작동하기 위해서는 명명법, 생성법, 행동에 관련된 일련의 관례를 따라야 한다. 이러한 관례는 (빌더 형식의) 개발 도구에서 자바 빈즈와의 연결을 통해 클래스의 사용·재사용·재배치를 가능하게 한다.

지켜야 할 관례는 다음과 같다.

1. 클래스는 직렬화되어야 한다. (클래스의 상태를 지속적으로 저장·복원하기 위해)
2. 클래스는 기본 생성자를 가지고 있어야 한다.
3. 클래스의 속성들은 `get`, `set` 혹은 표준 명명법을 따르는 메서드를 사용해 접근할 수 있어야 한다.
4. 클래스는 필요한 이벤트 처리 메서드를 포함하고 있어야 한다.

### 자바 빈즈의 직렬화

자바 빈즈가 반드시 직렬화될 필요는 없으나, 미리 구현해 두는 것이 무난하다. 본서에서는 편의상 직렬화가 반드시 필요한 경우가 아니면 구현하지 않는다.

직렬화가 필요한 경우는 다음과 같다.

1. JPA 프로바이더가 제공하는 캐시 기술이 `Serializable` 인터페이스를 요구하는 경우
2. 자바 빈즈 객체를 스코프에서 관리하는 경우
3. 다수의 서버에서 세션 객체를 공유해야 하는 경우

---

## Lombok

- 두 속성을 자동으로 만들어 주는 Getter/Setter를 지원하며, 하나만 만들고 싶으면 `@Getter`, `@Setter`를 따로 쓴다.
- Lombok을 안 썼으면 `toString` 시 메모리 주소가 찍히지만, Lombok을 쓰면 `toString`이 오버라이드되어 객체 내용이 찍힌다.

롬복을 활용하면 약간의 애너테이션 설정만으로, 소스 코드가 컴파일될 때 자동으로 추가 코드를 만들 수 있다.

| 어노테이션              | 설명                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| @Getter/@Setter         | 객체의 게터와 세터를 생성한다.                                                                                 |
| @ToString               | toString() 메서드를 생성한다.                                                                                  |
| @EqualsAndHashCode      | 자바의 equals() 메서드와 hashCode()메서드를 생성한다.                                                          |
| @NoArgsConstructor      | 인자가 없는 기본 생성자를 생성한다.                                                                            |
| @RequiredArgsConstuctor | @NonNull이 적용된 필드 값이나 final로 선언된 필드값만 인자로 받는 생성자를 생성한다.                           |
| @AllArgsConstructor     | 객체의 모든 필드값을 인자로 받는 생성자를 생성한다.                                                            |
| @Data                   | @ToString, @Getter, @Setter, @EqualsAndHashCode, @RequiredArgsConstuctor 어노테이션을 합쳐노은 어노테이션이다. |
| @Builder                | 빌더 패턴을 사용할 수 있도록 코드를 생성한다.                                                                  |
| @Log(Slf4j)             | 자동으로 생기는 log라는 변수를 이용해서 로그를 출력할 수 있다.                                                 |

### IntelliJ에서 Lombok 설정

![Annotation Processing 옵션](/assets/20210725_033758.png)

IntelliJ에서 이 옵션을 켜줘야 Lombok 및 어노테이션을 제대로 쓸 수 있다.

![Lombok 플러그인 설치](/assets/20210725_034058.png)

STS에서처럼 IntelliJ에도 Lombok 플러그인을 설치해줘야 한다.

---

## 의존성 주입(DI)

의존성 주입(DI)은 객체가 생성자 인수, 팩터리 메서드에 대한 인수, 또는 팩터리 메서드에서 생성·반환된 후 객체 인스턴스에 설정된 속성을 통해서만 의존성(즉, 함께 작업하는 다른 객체)을 정의하는 프로세스이다. 컨테이너는 빈을 생성할 때 이런 의존성을 주입한다.

일반적으로 세 가지 의존성 주입 방법을 사용할 수 있다.

- 필드 기반 의존성 주입
- 생성자 기반 의존성 주입
- 세터 기반 의존성 주입

### 필드 기반 의존성 주입

생성자나 세터 메서드를 사용하지 않고, DI 컨테이너의 기능을 이용하여 의존성을 주입하는 방식이다. `@Autowired` 어노테이션을 지정하여 필드에 대한 의존성을 주입한다.

### 생성자 기반 의존성 주입

생성자의 인수를 사용하여 의존성을 주입하는 방식이다.

### 세터 기반 의존성 주입

세터 메서드의 인수를 통해 의존성을 주입하는 방식이다.

### 자동 연결(Autowiring)

자동 연결은 `@Bean` 메서드를 사용하는 것처럼 명시적으로 빈을 정의하지 않고도, DI 컨테이너에 빈을 자동으로 주입하는 방식이다.

---

## 강한 결합 → IoC/DI

![User 클래스가 A를 직접 생성·제어하는 강한 결합 구조](/assets/20210711_214820.png)

`User` 클래스가 `A` 클래스를 직접 인스턴스화하고 함수를 호출하면, User가 직접 A를 제어하게 된다. 그런데 이렇게 하면 **강한 결합(dependency)** 문제가 생기므로 보통 이렇게 하지 않는다.

- `class A`에 `@Controller`를 붙이면, 스프링 구동 시 IoC에 등록되어 인스턴스가 등록된 상태가 된다.
- `User` 클래스에서 `private` 필드에 `@Autowired`를 붙이면 주입이 일어난다.
- 그러면 A를 생성·제어하는 주체가 User가 아니라 **Spring 컨테이너**로 바뀐다. 즉 제어가 역전된다. 유저가 제어하던 것을 스프링이 직접 제어하며, 이것을 **스프링 IoC 컨테이너**라 부른다.

> 주입하는 것을 DI라 한다. 제일 중요한 것은 DI와 AOP인데, 실제로는 DI가 90%다. 거의 대부분이 스프링이 쓰는 DI다.

### 순환 의존(상호 디펜던시) 문제

![상호 의존 시 인스턴스 생성 순서 문제](/assets/20210711_215449.png)

- `private A`를 두고 `@Autowired`를 붙이면, 인스턴스화되지 않은 상황에서 `@Autowired`를 만나면 먼저 Controller를 만나 인스턴스화하려 한다. (알파벳 순서상 Autowired를 먼저 만나면 컨트롤러를 먼저 실행)
- User가 A를 필요로 해서 A를 먼저 실행하는데, A에 갔더니 A도 User를 필요로 하는 상황이 생긴다.
- 필드 `@Autowired`는 이런 상호 의존 상황에서도 일단 실행은 되지만, 런타임에 가서야 에러가 난다.
- 그래서 이렇게 하지 말고 **생성자 주입**을 권장한다. (생성자 주입은 상호 디펜던시가 걸렸음을 명확하게 에러로 알려 준다.)

### Lombok으로 생성자 주입 간소화

- 생성자 주입을 하면 `private` 필드마다 또 주입받아야 해서 번거롭다.
- `final`이 붙은 필드에 대한 생성자를 **`@RequiredArgsConstructor`** 로 자동 생성할 수 있다.
- 생성자는 필드가 많아질수록 수정이 번거로우므로, Lombok이 `final` 필드에 대한 생성자를 자동으로 만들어 준다.

`BoardMapper` 인스턴스는 주입되었으니 바로 쓸 수 있고, request의 body를 가져와 주입하는 것은 잭슨 매퍼가 해 준다.

### 스프링의 핵심 4가지

> 스프링은 **DI, IoC, 디펜던시(의존성), 싱글톤** 이 4가지만 알면 된다. 그중 가장 중요한 것은 **DI**이며, 이것만으로도 80%는 이해 가능하다.

---

# REST API 설계와 산출물

## REST API 설계

서버 한 대가 여러 클라이언트에 대응하려면 REST API가 필요하다.

![프로젝트 생성 - group id](/assets/20210725_000829.png)

- **group id**: 개발하는 회사 이름, 그룹, 도메인 이름 등을 등록한다. 보통 패키지 이름으로 사용한다.
- **artifact id**: 애플리케이션의 이름 정도로 이해하면 된다.

![프로젝트 생성 설정](/assets/20210725_002017.png)

### 프로젝트 설정 yml

![프로젝트 설정 yml](/assets/20210725_131635.png)

yml은 properties와 동일하며, 표현 방식의 차이만 있다.

---

## 웹 개발 필수 산출물과 ERD 설계

화면(UI)을 보고 백엔드 개발자가 API를 설계해야 하고, UI가 나오면 ERD를 설계해야 한다. (요즘은 피그마를 많이 쓰는 추세다.)

웹 개발의 3대 필수 산출물:

1. **ERD** (Entity Relationship Diagram, 여러 테이블 사이의 관계 그림)
2. **API**
3. **UI**

이 산출물이 있어야 개발이 가능하다. 무엇을 할지 정하고 UI를 만든 다음, 백엔드 개발자가 가장 중요하게 해야 할 일이 **DB 설계(ERD 설계)** 다.

### ERD 표기법

- `users`(사용자)와 `favorites` 관계처럼, 유저 쪽에 짝대기가 하나 있고 다른 테이블 쪽에 삼각형이 있으면 1:N 관계를 의미한다.
  - **짝대기** = 하나(1)
  - **삼각형** = 많다(N)
- RDB에서 테이블 사이 관계를 맺어 두는 이유는 쿼리로 데이터를 묶기(조인) 쉽기 때문이다.
- 1:1, 1:N 등 관계를 설정하는 표기법이 여러 개 있다.

예시:

- 유저와 게시판: 1:N (한 명이 게시판 여러 개를 쓰니까)
- 게시판 하나에 여러 댓글: 1:N
- `board`와 `comment` 사이에는 **Foreign Key**를 달아 연결한다.

화살표는 표준 ERD 표기법이 아니며, 표준 표기법으로 그리면 삼각형과 작대기가 있어야 한다. ERD를 그리는 툴로는 erwin 같은 유료 툴이나 erdcloud 등을 쓴다.

### 설계의 비중

- REST API 개발에서 **DB 설계가 70~80%** 를 차지한다. API를 만드는 것 자체는 더 쉬울 수 있다.
- 화면을 그리면 그에 따라 어떤 관계를 맺어야 할지 설계가 나오고, 설계만 해 두면 나머지는 매뉴얼대로 구현하면 된다.
- 정규화(normalized)를 할지, 어떻게 관계를 맺을지, 어떤 컬럼을 Primary Key로 할지는 개인의 사고와 지식에 따라 달라지는 DB 영역이다.

---

## SOLID 클래스 원칙

> 하나의 클래스는 하나의 책임을 가지라. (단일 책임 원칙)

이 원칙에 따라 게시판 전체 카운트를 하는 API와 목록을 조회하는 클래스를 따로 만든다.

- 프론트엔드 역량이 있으면 API를 잘게 쪼개서 확장성 있게 만들 수 있다.
- **API를 잘게 쪼갤수록 확장성이 좋다.** (합치는 것은 나중에 필요할 때 하면 된다.) 예를 들어 A, B, C API를 한꺼번에 만들어 두는 대신 분리한다.

---

# 실전 예제 — USER SERVICE / 게시판 CRUD

## USER SERVICE API 구현

![User Service 설계](/assets/20210725_151053.png)

![createUser 구현](/assets/20210725_163242.png)

```

    @PostMapping("/users")
    public void createUser(@RequestBody User user){
        //json이나 xml 같은걸 전달하기 위해 매개변수 타입에 지금 전달받는게 RequestBody 을 선언해야 한다.
        User savedUser = service.save(user);
    }

```

Postman으로 POST 메서드를 호출하려면 body에 데이터를 실어서 보내고 확인해야 한다.

![Postman POST 요청](/assets/20210725_164413.png)

![Postman POST 결과](/assets/20210725_164758.png)

POST로 추가한 새 유저를 GET 방식으로 호출하면 정상적으로 들어간 것이 보인다.

![GET으로 조회](/assets/20210725_165842.png)

headers 탭의 Location으로 새로운 사용자가 추가된 것을 확인할 수 있다. 이 주소를 복사해서 메서드를 요청해보자.

![Location 헤더 확인](/assets/20210725_165912.png)

![Location 주소로 요청](/assets/20210725_165912_ij0jmtpj3.png)

![요청 결과](/assets/20210725_170108.png)

### 사용자 삭제를 위한 API 구현 - DELETE HTTP METHOD

```
@DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id) {
        User user = service.deleteById(id);

        if (user == null) {
            throw new UserNotFoundException(String.format("ID[%s] not found", id));
        }
    }
```

### API 테스트 도구

- **Swagger** : 프론트가 달라고 하면 전달해 주는 용도.
- **Postman** : 서버 개발자가 직접 개발하며 테스트할 때 더 낫다.
- 또는 unitTest로 만들어 돌려도 된다. (버전 2.4.4 기준)

---

## 게시판 생성 REST API

ERD가 설계되었다는 가정하에, 화면에서 데이터가 있어야 쿼리를 날리므로 **게시판 생성 API**를 만들어야 한다. 저장을 누르면 제목·내용을 서버로 보내고(나중에 로그인하면 사용자 ID 등도 함께) 저장하는 REST API다.

### Mapper — XML vs 자바 코드

`BoardVO`를 만들면 매핑이 된다.

- XML로 작성하면 양이 많아질수록 자바 코드와 오갈 때 코드를 찾기 힘들다.
- 자바 코드로 짜면 코드 추적이 쉬워진다. (XML로 할 수 있는 것은 자바 코드로도 100% 변환 가능하다.)

`@Mapper`는 `@Service`, `@Controller`처럼 인스턴스화되어 컨테이너에 보관된다. 인터페이스는 사실 직접 인스턴스화(`new`)할 수 없지만, 인터페이스를 구현하는 클래스를 만들고 그것을 스프링이 갖고 있다고 생각하면 된다. (싱글턴 패턴으로 인스턴스화하여 컨테이너에 보관)

## Board 컨트롤러와 의존 주입(@Autowired)

Board 컨트롤러도 스프링이 구동되면 클라이언트로부터 들어온 API를 받아야 한다. API로 들어오는 모든 요청은 `BoardMapper`를 거친다.

- `BoardMapper`는 스프링 컨테이너에 인스턴스로 들어 있다.
- 여기에 `@Autowired`를 붙이면 컨테이너가 갖고 있는 것을 주입해 준다.

---

## 목록 보기 / 상세 보기와 페이지네이션

### 상세 보기

- 상세 보기는 파라미터를 `int`로 던지고, URL 경로의 id 부분을 `@RequestParam`이 아니라 `@PathVariable`로 받는다.
- `null`인 부분은 (JSON 변환 시) 포함되지 않는다.

### 목록 보기와 페이지네이션

목록 보기는 모든 내용을 다 가져오면 안 되고 **페이징**이 필요하다. (나중에 JPA를 쓰면 방식이 좀 달라진다.)

페이지네이션에 필요한 3가지 정보:

1. 현재 페이지 번호
2. 한 페이지당 개수(페이지 사이즈)
3. 전체 개수

예시: 현재 페이지 1, 페이지 사이즈 10, 전체 게시판 155개 → 전체 16페이지(1, 2, ... 16). 클라이언트는 페이지 목록 바를 두고 현재 몇 페이지인지 알아야 한다.

- 프로토콜은 백엔드가 정해서 알려 주지만, 프론트가 위 3가지를 알아야 페이징을 구현할 수 있다.
- 개발자가 어떻게 개발하느냐에 따라 다르며, API를 세분화하면 확장성이 좋다(어딘가에서 재사용 가능).

### 카운트 + 목록을 다루는 구현

- 프론트에서 페이지 넘버와 사이즈를 쿼리 파라미터로 보내므로, 두 가지를 `@RequestParam`으로 받는다.
- 페이지 넘버는 늘어날 수 있고 `null`일 수도 있으니 `Integer`(Wrapper)로, `nullable`로 받는다.
  - Wrapper 클래스를 써야 `null` 여부를 판단할 수 있다. `int`를 쓰면 `0`부터 들어올 수 있어 구분이 안 된다.
- MariaDB는 `LIMIT` 문장을 쓸 수 있다. `LIMIT`가 없으면 0부터 가져오고, 페이지 사이즈가 1이면 10개를 가져온다.
- 값이 `null`이면 `findBoard`에서 `if`문 분기를 탄다.

### 카운트와 목록을 한 번에 응답하기

프론트 개발자가 한 번에 달라고 하면 합쳐서 보내면 된다.

- `BoardVO`에 VO와 카운트를 함께 담는 객체를 만들어 보낸다.
- JSON 객체 안에 카운트 속성과 board라는 ArrayList가 들어가도록 만들어, 조회를 두 번 하고 카운트와 목록을 함께 리턴하면 잭슨 매퍼가 JSON으로 변환해 준다.

---

# RESTful Service 기능 확장

확장할 수 있는 기능은 다음과 같다.

- Validation(유효성 검증)
- Internationalization(다국어 처리)
- XML format으로 변환하기
- Filtering(필터링)
- Version(버전) 관리

---

## 유효성 체크를 위한 Validation API 사용

![Validation 적용](/assets/20210725_225649.png)

### 입력값 검증 (스프링 MVC Bean Validation)

스프링 MVC는 Bean Validation 기능을 이용해, 요청 파라미터 값이 바인딩된 도메인 클래스(또는 커맨드 클래스)의 입력값을 검증한다.

#### 입력값 검증 활성화

- 입력값 검증을 하려면 메서드 매개변수에 도메인 클래스를 정의하고 `@Validated`를 지정한다.
- 입력값 검증 대상 도메인 클래스 직후에 `BindingResult`를 정의한다. `BindingResult`에는 요청 데이터의 바인딩 오류와 입력값 검증 오류 정보가 저장된다.

> `@Validated` 어노테이션을 지정하여 입력값 검증 기능을 활성화한다.

#### 입력값 검증 결과 — BindingResult

입력값 검증 대상 도메인 클래스 직후에 `BindingResult`를 정의한다. `BindingResult`에는 요청 데이터의 바인딩 에러와 입력값 검증 에러 정보가 저장된다.

에러 정보 확인을 위한 `BindingResult` 메서드:

- `hasErrors()`: 에러가 발생한 경우 true를 반환한다.
- `hasGlobalErrors()`: 객체 레벨의 에러가 발생한 경우 true를 반환한다.
- `hasFieldErrors()`: 필드 레벨의 에러가 발생한 경우 true를 반환한다.
- `hasFieldErrors(String)`: 인수에서 지정한 필드에서 에러가 발생 시 true를 반환한다.

---

## 다국어 처리를 위한 Internationalization 구현 방법

`MessageSource`는 메시지 정보의 출처를 추상화하기 위한 것이고, `getMessage` 메서드를 제공하여 메시지 정보를 가져온다. `MessageSource`의 구현 클래스는 국가별로 메시지 언어를 다르게 적용할 수 있는 국제화 기능을 가지고 있다.

![Internationalization 설정](/assets/20210725_232132.png)

![message properties 설정](/assets/20210725_233828.png)

다국어 처리를 위해 yml에 설정을 지정하고, `message.properties` 파일을 만들어 각 언어별 메시지를 설정한다(en은 hello, fr은 bonjour).

```
@GetMapping(path="/hello-world-internationalized")
   public String helloWorldInternationalized(
           @RequestHeader (name="Accept-Language", required=false) Locale locale){
    //이건 앞에 설명한 language란 헤더값이 포함 안되면 디폴트 값(한국어)가 들어감
    //메시지 값 반환하기 위해 메시지 소스를 만들자.(맨위)

   }

```

```

@GetMapping(path="/hello-world-internationalized")
    public String helloWorldInternationalized(
            @RequestHeader (name="Accept-Language", required=false) Locale locale){
     //이건 앞에 설명한 language란 헤더값이 포함 안되면 디폴트 값(한국어)가 들어감
     //메시지 값 반환하기 위해 메시지 소스를 만들자.(맨위)
        return messageSource.getMessage("greeting.message",null, locale);
    }

```

![아무 값 없을 때 - 한글 출력](/assets/20210726_000652.png)

아무 값도 넣지 않으면 디폴트인 한글이 출력된다.

![en 헤더 - hello 출력](/assets/20210726_000732.png)

헤더로 `en` 값을 주면 출력 결과가 hello로 나온다. 우리가 가지지 않은 국가 코드는 default인 한글이 나온다.

---

## Response 데이터 형식 변환 - XML 포맷

위에서 했던 것을 XML로 줘야 한다면?

![XML 요청 시도](/assets/20210726_001259.png)![XML 406 에러](/assets/20210726_001333.png)

지원하지 않는 데이터 형태인 XML을 요청해서 406 클라이언트 에러가 발생한다.

---

## Response 데이터 제어를 위한 Filtering

사용자 정보 중 클라이언트에 전달할 데이터를 필터를 통해 관리할 수 있다.

![Filtering 개념](/assets/20210726_004224.png)

주민번호나 패스워드 같은 중요한 데이터는 제어해야 하는데, 그 방법을 필터를 통해 처리한다. (오른쪽은 실행에 필요한 데이터)

```
@JsonIgnoreProperties(value={"password","ssn"})
public class User {
    private Integer id;

    @Size (min=2, message = "2글자 이상 입력해주세요")
    private String name;
    @Past   //현재 미래는 못오고 과거만 오게.
    private Date joinDate;

//    @JsonIgnore
    private String password;
//    @JsonIgnore //이걸 넣어주면 json넣어줄떄 무시된다.
    private String ssn;
}

```

`@JsonIgnore`로 무시하고 싶은 변수들을 지정해 응답에서 제외할 수 있다.

![필터 적용 결과](/assets/20210726_015006.png)

이처럼 데이터를 제어하고 싶을 때 필터를 이용하면 좀 더 수월하게 컨트롤할 수 있다.

### MappingJacksonValue를 이용한 동적 필터링

필터를 적용한 결과는 `List<User>` 도메인으로 받지 못하고 `MappingJacksonValue`로 전환해 받아야 한다.

![MappingJacksonValue 사용](/assets/20210726_015420.png)

```

@RestController
@RequestMapping("/admin")
public class AdminUserController {
    private UserDaoService service;

    public AdminUserController(UserDaoService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public MappingJacksonValue retrieveAllUsers() {
        List<User> users = service.findAll();

        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter
                .filterOutAllExcept("id", "name", "joinDate", "password");

        FilterProvider filters = new SimpleFilterProvider().addFilter("UserInfo", filter);

        MappingJacksonValue mapping = new MappingJacksonValue(users);
        mapping.setFilters(filters);

        return mapping;
    }

    // GET /admin/users/1 -> /admin/v1/users/1
//    @GetMapping("/v1/users/{id}")
//    @GetMapping(value = "/users/{id}/", params = "version=1")
//    @GetMapping(value = "/users/{id}", headers="X-API-VERSION=1")
    @GetMapping(value = "/users/{id}", produces = "application/vnd.company.appv1+json")
    public MappingJacksonValue retrieveUserV1(@PathVariable int id) {
        User user = service.findOne(id);

        if (user == null) {
            throw new UserNotFoundException(String.format("ID[%s] not found", id));
        }

        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter
                .filterOutAllExcept("id", "name", "password", "ssn");

        FilterProvider filters = new SimpleFilterProvider().addFilter("UserInfo", filter);

        MappingJacksonValue mapping = new MappingJacksonValue(user);
        mapping.setFilters(filters);

        return mapping;
    }

    //    @GetMapping("/v2/users/{id}")
//    @GetMapping(value = "/users/{id}/", params = "version=2")
//    @GetMapping(value = "/users/{id}", headers="X-API-VERSION=2")
    @GetMapping(value = "/users/{id}", produces = "application/vnd.company.appv2+json")
    public MappingJacksonValue retrieveUserV2(@PathVariable int id) {
        User user = service.findOne(id);

        if (user == null) {
            throw new UserNotFoundException(String.format("ID[%s] not found", id));
        }

        // User -> UserV2
        UserV2 userV2 = new UserV2();
        BeanUtils.copyProperties(user, userV2); // id, name, joinDate, password, ssn
        userV2.setGrade("VIP");

        SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter
                .filterOutAllExcept("id", "name", "joinDate", "grade");

        FilterProvider filters = new SimpleFilterProvider().addFilter("UserInfoV2", filter);

        MappingJacksonValue mapping = new MappingJacksonValue(userV2);
        mapping.setFilters(filters);

        return mapping;
    }
}

```

![버전별 응답 결과](/assets/20210726_025002.png)

---

## 버전 관리

버전 관리는 단순히 사용자에게 보여주는 데이터만 지칭하는 게 아니라, REST API 설계나 애플리케이션 구조가 바뀔 때도 버전을 변경해서 사용해야 한다. 사용자에게 어떤 버전을 사용해야 하는지도 명시해줘야 한다.

REST에서 버전 관리 방식은 다음과 같다.

| 방식 | 일반 브라우저 실행 |
| --- | --- |
| 1. URI 파라미터 | 가능 (URI를 통해) |
| 2. URI 경로 | 가능 (URI를 통해) |
| 3. MIME 타입 | 불가능 (Header 설정 필요) |
| 4. 헤더 | 불가능 (Header 설정 필요) |

3, 4번은 Header 부분에 설정값을 넣어야 해서 일반 브라우저에서는 실행할 수 없다.

---

## Spring Boot API 사용

![Spring Boot API 사용](/assets/20210726_031416.png)

---

# 데이터 접근 계층 — DB / MyBatis / JPA

## DB 연동과 도커로 MariaDB 띄우기

ORM이 없으면 쿼리문을 직접 만들어 줘야 한다.

![도커로 MariaDB 컨테이너와 계정을 만드는 과정 (1)](/assets/20210711_174652.png)

![도커로 MariaDB 컨테이너와 계정을 만드는 과정 (2)](/assets/20210711_174821.png)

도커에 계정과 MariaDB를 만드는 과정이다.

### 포트 매핑

```
-p 3306:3306
```

- **왼쪽** : 로컬 포트
- **오른쪽** : 도커에서 실행된 DB 포트

도커 DB와 연결할 포트를 3306으로 하겠다는 의미인데, 로컬에 이미 3306이 설치되어 있으면 왼쪽 3306을 쓸 수 없다. 이때 왼쪽을 3307로 바꾸면(로컬 3306 → 3307) 컨테이너를 쓸 수 있다.

---

## MySQL 워크벤치 계정 추가 (권한까지)

루트 계정으로 들어간다.

![MySQL 워크벤치 루트 계정 접속](/assets/20210823_001538.png)

네비게이터 하단의 Administration에서 Users and Privileges로 가서, 하단의 Add Account를 누른다.

![Users and Privileges 화면](/assets/20210823_001614.png)

저 3군데를 체크하고 `%` 부분은 그대로 둔다. (지우면 로컬에서만 쓰겠다는 뜻이 된다.)

![Add Account - 호스트 설정](/assets/20210823_001706.png)

모든 권한을 다 주기 위해 Role과 Global Privileges 부분을 체크해준다.

![Role 및 Global Privileges 체크](/assets/20210823_002906.png)

그런데 계속 root 계정의 DB가 모두 접근 가능하게 보인다. 직접 터미널에서 권한을 줘서 해보자.

![권한 설정 결과](/assets/20210823_004247.png)

```
create user RESTUSER identified by 'RESTUSER';


grant all privileges on RESTUSER.* to RESTUSER;

```

![터미널 유저 생성](/assets/20210823_005614.png)

![권한 부여 확인](/assets/20210823_005457.png)

![스키마 정리 확인](/assets/20210823_005447.png)

직접 root 계정으로 들어가 쿼리창에서 유저 생성 및 권한을 주니, 이제 스키마가 깨끗한 상태의 유저(RESTUSER)가 보인다.

---

## 데이터 소스 설정

데이터 소스는 애플리케이션이 데이터베이스에 접근하기 위한, 추상화된 연결을 제공하는 역할을 한다.

### 스프링에서 설정할 수 있는 데이터 소스

- JDBC 드라이버를 통해 선언된 데이터 소스
- JNDI에 등록된 데이터 소스
- 커넥션을 풀링하는 데이터 소스

#### JNDI(Java Naming and Directory Interface)

디렉터리 서비스에서 제공하는 데이터 및 객체를 발견(discover)하고 참고(lookup)하기 위한 자바 API다.

![데이터 소스 설정 화면](/assets/20210823_012945.png)

**SQL 쿼리문 (board 생성)**

```
create table board(
board_no int not null auto_increment,
title varchar(200) not null,
content TEXT null,
writer varchar(50) not null,
reg_date timestamp not null default now(),
primary key(board_no)
);

```

---

## 스프링 JDBC

스프링 JDBC는 SQL로만 데이터베이스를 쉽게 처리하도록 도와주는 `JdbcTemplate` 클래스를 제공한다.

`JdbcTemplate` 클래스가 제공하는 주요 메서드는 다음과 같다.

- `queryForObject`: 하나의 결과 레코드 중에서 하나의 컬럼값을 가져온다.
- `queryForMap`: 하나의 결과 레코드 정보를 Map 형태로 매핑할 수 있다.
- `queryForList`: 여러 개의 결과 레코드를 처리할 수 있다.
- `query`: `ResultSetExtractor`, `RowCallbackHandler`와 함께 조회 시 사용한다.
- `update`: 데이터를 변경하는 SQL을 실행 시 사용한다.

**데이터 테이블**

![JDBC 데이터 테이블](/assets/20210823_094103.png)

**데이터 흐름도**

![JDBC 데이터 흐름도](/assets/20210823_094123.png)

---

## JPA

JPA(Java Persistence API)는 자바 표준 ORM(Object-Relational Mapping)이다.

> **ORM**: 객체에 데이터를 읽고 쓰는 방법으로, 관계형 데이터베이스에 데이터를 읽고 쓰는 기술이다.

### Entity

데이터베이스에 지속적으로 저장된 데이터를 자바 객체에 매핑한 것이다. 메모리 상에 자바 객체의 인스턴스 형태로 존재하며, `EntityManager`에 의해 데이터베이스의 데이터와 동기화된다.

### EntityManager

필요에 따라 Entity와 데이터베이스의 데이터를 동기화한다. `EntityManager`에서 제공하는 Entity 조작 API를 통해 Entity에 대해 CRUD 작업을 할 수 있다.

### Entity 상태

- new 상태
- 관리 상태
- 분리 상태
- 삭제된 상태

**데이터 흐름도**

![JPA 데이터 흐름도](/assets/20210823_100213.png)

### JPA를 쓰면 달라지는 점

- 쿼리문을 하나도 모르고 자바 객체만으로 처리하는 것이 가능하다.
- MyBatis의 단점: MariaDB를 쓰다 오라클로 바꾸고 싶으면, `insert` 등 쿼리 100개를 오라클용으로 다 바꿔야 한다.
- 반면 JPA는 자바 객체(`BoardVO` 같은 엔티티 클래스)를 다루기 때문에, 엔티티에 따라 insert 쿼리를 자동으로 날려 준다. 오라클이든 MariaDB든 상관없이 객체만 다루면 된다.
- 앞서가는 기업은 대부분 JPA를 쓰고, 대기업은 MySQL을 많이 쓴다. 기술이 앞서가는 벤처에서는 JPA를 쓸 것이다.

> 인터페이스를 만들고 클래스를 만드는 건 정해진 규칙이 아니다. 인터페이스를 만드는 가장 큰 목적은 공통화다. 하나밖에 없는데도 굳이 인터페이스를 만들 필요는 없다. 배웠으면 자유롭게 쓸 수 있는 게 중요하다. 리팩토링은 덩치가 커질수록 매일 하는 일이다.

---

## MyBatis 소개

MyBatis는 자바 퍼시스턴스 프레임워크의 하나로, XML 서술자나 어노테이션을 사용하여 저장 프로시저나 SQL문으로 객체들을 연결시킨다. MyBatis는 아파치 라이선스 2.0으로 배포되는 자유 소프트웨어이다.

### MyBatis를 사용함으로써 얻을 수 있는 이점

- SQL의 체계적인 관리
- 자바 객체와 SQL 입출력 값의 투명한 바인딩
- 동적 SQL 조합

**SQL 쿼리문**

```
use dev_db;


create table member(
user_no integer(5) auto_increment,
user_id varchar(50) not null,
user_pw varchar(100) not null,
user_name varchar(100) not null,
coin integer(10) default 0,
reg_date timestamp default now(),
upd_date timestamp default now(),
enabled char(1) default '1',
primary key(user_no)
);

create table member_auth(
user_no integer(5) not null,
auth varchar(50) not null
);


alter table member_auth add constraint fk_member_auth_user_no
foreign key(user_no)references member(user_no);


```

![member 테이블 생성 결과](/assets/20210823_104314.png)

### 매퍼 설정

MyBatis 구성에는 MyBatis 동작에 영향을 주는 설정 및 프로퍼티가 있다.

- Configuration
  - Properties
  - settings
  - typeAliases
  - typeHandlers
  - ObjectFactory
  - plugins
  - environments
    - environment
      - transactionManager
      - dataSource
  - databaseIdProvider
  - mappers

![매퍼 설정 1](/assets/20210823_122925.png)

![매퍼 설정 2](/assets/20210823_122936.png)

![매퍼 설정 3](/assets/20210823_123001.png)

![매퍼 설정 4](/assets/20210823_123018.png)

![매퍼 설정 5](/assets/20210823_123035.png)

![매퍼 설정 6](/assets/20210823_123123.png)

![매퍼 설정 7](/assets/20210823_123920.png)

---

## Mapper XML 파일

MyBatis의 진정한 힘은 매핑 구문에 있다. Mapper XML 파일은 모든 기능에 있어서 비교적 간단하다. 동등한 JDBC 코드와 비교하면 95%의 코드가 절약된다. MyBatis는 SQL에 중점을 두고 개발되었다.

매퍼 XML 파일에는 다음과 같은 최상위 요소들이 있다.

- `cache`: 지정된 네임스페이스에 대한 캐시 구성
- `cache-ref`: 다른 네임스페이스의 캐시 구성에 대한 참조
- `resultMap`: 데이터베이스 결과 세트에서 객체를 로드하는 방법을 설명하는 요소
- `sql`: 다른 구문에서 참조할 수 있는, 재사용 가능한 SQL 블록
- `insert`: 매핑된 insert 구문
- `update`: 매핑된 update 구문
- `delete`: 매핑된 delete 구문
- `select`: 매핑된 select 구문

### select

`select` 구문은 MyBatis에서 가장 많이 사용되는 요소 중 하나이다. 데이터베이스에 데이터를 넣는 것은 데이터를 다시 얻을 때까지 별로 중요하지 않으므로, 대부분의 응용 프로그램은 데이터를 수정하는 것보다 훨씬 더 많이 조회한다. 이것이 MyBatis의 기본 원칙 중 하나이며, 쿼리 및 결과 매핑에 많은 초점과 노력이 집중된 이유이다. select 요소는 간단한 경우에는 매우 단순하다.

![select 구문 예시](/assets/20210823_150614.png)

**select 요소 속성**

![select 요소 속성](/assets/20210823_150625.png)

### insert, update, delete

데이터 변경 구문 `insert`, `update`, `delete`는 구현이 매우 비슷하다.

![insert/update/delete 예시 1](/assets/20210823_154812.png)

![insert/update/delete 예시 2](/assets/20210823_164352.png)

### 기본키 취득

MyBatis는 `useGeneratedKeys` 속성을 이용하여, Insert 할 때 데이터베이스 측에서 채번된 기본키를 취득할 수 있다.

![useGeneratedKeys 예시](/assets/20210823_164922.png)

### SQL 요소

이 요소는 다른 구문에 포함될 수 있는, 재사용 가능한 SQL 코드 조각을 정의하는 데 사용할 수 있다. 로드 단계에서 정적으로 매개변수화할 수 있으며, 다른 프로퍼티 값은 포함한 인스턴스에 따라 달라질 수 있다.

![SQL 요소 예시](/assets/20210823_170310.png)

### Parameters

지금까지의 모든 구문에서 간단한 매개변수의 예를 보았다. 매개변수는 MyBatis에서 매우 강력한 요소이다. 대략 90% 정도의 간단한 경우는 이러한 형태로 설정한다.

![Parameters 예시](/assets/20210823_171940.png)

### Result Maps

`resultMap` 요소는 MyBatis에서 가장 중요하고 강력한 요소이다. JDBC가 ResultSet에서 데이터를 검색하는 데 필요한 코드의 90%를 제거할 수 있으며, 경우에 따라 JDBC가 지원하지 않는 작업도 수행할 수 있다.

실제로 복잡한 구문의 조인 매핑과 같은 코드를 작성하려면 수천 줄의 코드가 포함될 수 있다. ResultMap 설계상, 간단한 구문에는 명시적인 결과 매핑이 전혀 필요하지 않으며, 복잡한 구문은 관계를 설명하는 데 필요하다.

![Result Maps 예시 1](/assets/20210823_175638.png)

![Result Maps 예시 2](/assets/20210823_175647.png)

![Result Maps 예시 3](/assets/20210823_175656.png)

### 동적 SQL

MyBatis의 가장 강력한 기능 중 하나는 동적 SQL 기능이다. JDBC 또는 이와 유사한 프레임워크 경험이 있다면, 공백을 잊지 않거나 컬럼 목록 끝에 쉼표를 생략하지 않도록 하면서 SQL 문자열을 조건부로 연결하는 것이 얼마나 고통스러운지 알 것이다.

동적 SQL은 다루기가 매우 어려울 수 있다. 사용하는 것이 결코 쉽지 않지만, MyBatis는 매핑된 SQL 문에서 사용할 수 있는 강력한 동적 SQL 언어로 상황을 개선한다.

동적 SQL 요소는 JSTL 또는 유사한 XML 기반 텍스트 프로세서를 사용해 본 사람에게 친숙할 것이다. 이전 버전의 MyBatis는 알고 이해해야 할 요소가 많았지만, MyBatis 3은 이 기능을 향상시켜 작업할 요소가 절반 미만이 됐다.

- `if`
- `choose` (when, otherwise)
- `trim` (where, set)
- `foreach`

동적 SQL을 조립하기 위한 요소는 다음과 같다.

- `<where>`: 조건을 만족할 시에만 SQL을 조립하도록 하는 요소
- `<choose>`: 여러 선택 항목에서 조건에 만족 시에만 SQL을 조립하게 만드는 요소
- `<foreach>`: 컬렉션이나 배열에 대해 반복 처리를 하기 위한 요소
- `<set>`: SET 절 앞뒤에 내용을 더 추가하거나 삭제 시 사용하는 요소

---

## REST 요청 실습 — MyBatis 연동

클라이언트 요청 흐름:

```
Request → DispatcherServlet → Controller → Service → DAO → XML Mapper (쿼리)
```

화면은 **Postman**으로 대체한다.

- **URI**: 원하는 자원을 명시 (what)
- **HTTP METHOD**: 자원에 수행할 동작을 명시 (how)

![20210503_191534](/assets/20210503_191534.png)

![20210503_191706](/assets/20210503_191706.png)

![20210503_191813](/assets/20210503_191813.png)

> XML 매퍼의 쿼리 `id`와 자바 매퍼(DAO 인터페이스)의 메서드 이름이 **반드시 일치**해야 한다.

```java
package com.mvc.dao;

import java.util.List;
import com.mvc.vo.Customer;

// client(CustomerServiceImpl.java)
// java mapper (method name == xml mapper 안에 있는 쿼리 id)
public interface CustomerDao {
    public List<Customer> selectAll();
    public Customer selectOne(String num);
    public int insert(Customer c);
    public int delete(String num);
    public List<Customer> findByAddress(String address);
    public int update(Customer c);
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
   PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
   "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- mapper file: 실행 할 쿼리 문을 저장하는 파일. 테이블 하나당 한개씩 작성
namespace: 작업하는 테이블들을 구분해주기 위한 식별자 -->
<mapper namespace="com.mvc.dao.CustomerDao">

  <select id="selectAll" resultType="Customer">
    select * from customer
  </select>

  <select id="selectOne" parameterType="java.lang.String" resultType="Customer">
    select * from customer where num = #{num}
  </select>

  <insert id="insert" parameterType="Customer">
  	insert into customer values(#{num}, #{name}, #{address})
  </insert>

  <update id="update" parameterType="Customer">
  	update customer set address = #{address} where num = #{num}
  </update>

  <select id="findAddress" parameterType="string" resultType="Customer">
  	select * from customer where address = #{address}
  </select>

 <delete id="delete" parameterType="string">
  	delete from customer where num = #{num}
  </delete>

</mapper>
```

- **서비스**는 DAO 메서드를 호출
- **컨트롤러**는 서비스 메서드를 호출
- DAO가 XML 매퍼의 쿼리 `id`와 일치하는 메서드를 호출하면 해당 쿼리가 실행됨

---

# REST 서버 설계 (심화)

## 스프링 부트 데이터 레스트

스프링 부트 데이터 레스트는 MVC 패턴에서 VC를 생략하고, 도메인과 리포지토리로만 REST API를 제공한다. `@RepositoryRestResource` 어노테이션을 사용하여 해당 도메인의 정보를 매핑하여 REST API를 제공한다.

**요구사항**

- 게시글을 등록/보기/수정/삭제할 수 있어야 한다.
- 게시글의 목록을 조회할 수 있는 기능을 구현한다.

![데이터 레스트 결과](/assets/20210824_033729.png)

---

## @RestController를 통한 REST API 구현

MVC 패턴 기반으로 `@RestController`를 생성하여 REST API를 구현한다. 컨트롤러와 서비스를 사용하는 MVC 패턴은 세부적인 처리가 가능하고 복잡한 서비스도 처리할 수 있다. 클라이언트에 반드시 필요한 정보만 전달하고, 응답 상태 코드도 단순하게 설정한다.

**요구사항**

- 게시글 등록/보기/수정/삭제
- 게시글 목록 조회

---

## HATEOAS 적용

HATEOAS 원칙을 적용하여, 클라이언트에 응답할 때 결과 데이터와 함께 관련 URI를 함께 제공한다. (REST API 개발 시 HATEOAS는 반드시 구현해야 하는 것은 아니다.)

![HATEOAS 적용 결과](/assets/20210824_162129.png)

---

## 서버 애플리케이션 패키징

단독 서버 애플리케이션 실행을 위해 jar 파일로 패키징한다. 메이븐 래퍼 스크립트를 실행해서 패키징한다.

---

## Vue.js 연동

**Axios**: HTTP 클라이언트 라이브러리로, 비동기 방식으로 HTTP 데이터 요청을 실행한다. 내부적으로 axios는 직접적으로 XMLHttpRequest를 다루지 않고 Ajax를 호출할 수 있다.

- REST API 서버와 HTTP 통신을 구현한다.
- axios 라이브러리를 설치한다.
- axios 객체를 생성하는 모듈을 구현한다.
- 게시글 등록 기능을 구현한다.

---

# AOP · 트랜잭션 · 예외 처리 · 인터셉터

## Spring AOP를 이용한 Exception Handling

예외가 발생한 시간, 메시지, 상세 정보를 가진 일반화된 자바 객체를 선언한다.

```

@RestController
@ControllerAdvice   //이게 있어야 상태창에 제대로 설정한 대로 보인다.
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request){
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);//500 에러
    }
    @ExceptionHandler(UserNotFoundException.class)
    public final ResponseEntity<Object> handleUserNotFoundExceptions(Exception ex, WebRequest request){
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND); //404 에러
    }
}


```

---

## AOP

AOP는 관점 지향 프로그래밍(Aspect-Oriented Programming)을 의미하는 약자이다.

### 관점 지향 프로그래밍

소스 코드의 여기저기에 흩어져 있는 횡단 관심사를 중심으로 설계와 구현을 하는 프로그래밍 기법이다. 간단히 말하면, 횡단 관심사의 분리를 실현하는 방법이다.

> **횡단 관심사(Cross-Cutting Concern)**: 핵심 비즈니스 로직과는 다소 거리가 있지만, 여러 모듈에서 공통적이고 반복적인 처리를 요구하는 내용이다.

### AOP 개발 순서

1. 핵심 비즈니스 로직만 근거해서 코드를 작성한다.
2. 주변 로직에 해당하는 관심사들을 분리해서 따로 작성한다.
3. 핵심 비즈니스 로직 대상 객체에 어떤 관심사들을 결합할지 설정한다.

### AOP 사용 예

- 로깅
- 보안 적용
- 트랜잭션 관리
- 예외 처리

---

## 트랜잭션

트랜잭션은 한 번에 이뤄지는 작업의 단위를 의미한다.

### 트랜잭션 성격 (ACID 원칙)

1. **원자성(Atomicity)**: 하나의 트랜잭션은 모두 하나의 단위로 처리되어야 한다.
2. **일관성(Consistency)**: 트랜잭션이 성공했다면 모든 데이터는 일관성을 유지해야 한다.
3. **격리성(Isolation)**: 트랜잭션으로 처리되는 동안에는 외부에서의 간섭이 없어야 한다.
4. **영속성(Durability)**: 트랜잭션이 성공적으로 처리되면 그 결과는 영속적으로 보관되어야 한다.

---

## 예외 처리

일반적으로 프로그램이 처리되는 동안 특정한 문제가 일어났을 때, 처리를 중단하고 다른 처리를 하는 것을 예외 처리라고 한다.

웹 컨테이너는 기본적으로 예외 처리를 하여 기본 에러 페이지를 표시해준다. 하지만 이 페이지에 앱 서버의 내부 정보가 일반 사용자들에게 노출되어, 프레임워크 보안 취약점을 노린 공격을 받을 수 있다. 이런 점을 고려해서 사용자가 직접 예외 처리를 하여 에러 페이지를 표시하게 해야 한다.

### 사용자 정의 예외 처리

`@ExceptionHandler`와 `@ControllerAdvice`를 이용하여 처리한다.

- `@ControllerAdvice` 어노테이션은 스프링 컨트롤러에서 발생하는 예외를 처리하는 핸들러 클래스임을 명시한다.
- `@ExceptionHandler` 어노테이션은 괄호 안에 설정한 예외 타입을 해당 메서드가 처리한다는 것을 의미한다.

### 처리할 수 있는 예외

- 등록할 때 제목에 빈 값을 입력하여 유효값 검증 예외 발생
- 존재하지 않는 게시물을 조회

### 시스템 예외 처리

`@ExceptionHandler`와 `@ControllerAdvice`를 이용하여 처리한다.

- `@ControllerAdvice` 어노테이션은 스프링 컨트롤러에서 발생하는 예외를 처리하는 핸들러 클래스임을 명시한다.
- `@ExceptionHandler` 어노테이션은 괄호 안에 설정한 예외 타입을 해당 메서드가 처리하는 것을 의미한다.

---

## 인터셉터

### 인터셉터란

인터셉터는 웹 애플리케이션에서 특정 URI 호출을 가로채는 역할을 한다.

---

# 정리

`@RestController`를 사용하면 자동으로 `@ResponseBody`가 적용되어, 메서드 반환값이 JSON으로 변환되어 응답된다.
