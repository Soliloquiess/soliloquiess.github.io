---
title: "[Springboot] RESTful API 설계 원칙과 Spring Boot 적용 완전 정리"
date: 2023-12-30
category: "Springboot"
tags: ["Spring"]
description: "REST(Representational State Transfer)의 핵심 제약 조건부터 Resource·URI·Sub Resource 설계, HTTP Methods(GET/POST/PUT/PATCH/DELETE), HTTP Status Codes까지 — Spring Boot RESTful API 개발에 필요한 개념을 체계적으로 정리합니다."
permalink: "study/2023/12/30/springboot-및-Rest-정리"
---

## REST란

**REST(Representational State Transfer)**는 네트워크 아키텍처 원칙의 모음으로, 웹을 위한 소프트웨어 아키텍처의 한 형태다.

분산 시스템을 위한 기본 설계 원칙을 제공하여 자원을 표현하고 상태를 전송하는 방법을 정의한다.

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

---

## REST Architectural Constraints (아키텍처 제약 조건)

다음 6가지 제약 조건을 모두 갖추는 API를 **RESTful API**라고 한다.

| 제약 조건 | 설명 |
|-----------|------|
| **클라이언트-서버** | 클라이언트(프런트엔드)와 서버(백엔드)는 서로 독립적으로 분리된다 |
| **무상태(Stateless)** | 요청 처리 중 서버에 상태를 저장하지 않는다. 세션 상태는 클라이언트 측에 저장한다 |
| **캐시 가능(Cacheable)** | 클라이언트는 응답을 캐시에 저장할 수 있어야 한다. API 성능을 크게 향상시킨다 |
| **일관된 인터페이스(Uniform Interface)** | 클라이언트-서버 간 모든 상호작용을 통일된 방식으로 관리한다. 아키텍처를 단순화하고 결합도를 낮춘다 |
| **계층화된 시스템(Layered System)** | 서버는 여러 계층을 가질 수 있다. 로드 밸런싱을 통해 확장성을 향상시킨다 |
| **코드 온 디맨드(Code on Demand)** | (선택적) 서버로부터 코드를 다운로드하여 런타임에 클라이언트 기능을 확장할 수 있다 |

---

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

REST 기반 시스템의 핵심은 **자원(Resource)**이다. 자원은 애플리케이션을 통해 외부에 노출하고자 하는 모든 데이터를 의미한다.

자원은 RESTful 시스템에서 **URI(Uniform Resource Identifier)**를 통해 식별되며, 사용자·제품·주문·이미지·문서 등 다양한 데이터 형태를 포함할 수 있다.

```
Resource (자원)  ──식별──▶  URI                ──표현──▶  Representation
  User                      /users/{id}                  JSON / XML
  Product                   /products/{id}               JSON / XML
  Order                     /orders/{id}                 JSON / XML
```

---

## URI (Uniform Resource Identifier)

**URI(유니폼 자원 식별자)**는 자원을 식별하기 위한 고유한 주소체계다. 웹 기반 시스템에서 HTTP가 가장 일반적으로 사용되는 프로토콜이며, URI를 통해 고유한 자원을 식별한다.

블로그 게시물 자원에 대한 URI 설계 예시:

```
블로그 게시물 자원에 대한 URI 예시
  /posts                              → 전체 게시물 컬렉션
  /posts/{post_id}                    → 특정 게시물
  /categories/{category_id}/posts     → 특정 카테고리의 게시물 목록
```

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

## HTTP Methods

참고: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

| 메서드 | 역할 | 설명 |
|--------|------|------|
| **GET** | 조회(읽기) | 자원을 조회한다 |
| **POST** | 생성 | 새로운 자원을 생성한다 |
| **PUT** | 전체 수정(교체) | 자원을 생성하거나 전체를 교체한다 |
| **PATCH** | 부분 수정 | 자원의 일부를 수정한다 |
| **DELETE** | 삭제 | 자원을 삭제한다 |

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
