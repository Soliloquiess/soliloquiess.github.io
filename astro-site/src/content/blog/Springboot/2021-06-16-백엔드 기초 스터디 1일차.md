---
title: "[Springboot] 백엔드 입문 — Java·OOP·SOLID와 Spring Boot 첫걸음"
date: 2021-06-20
category: "Springboot"
tags: ["Springboot"]
description: "Java 크로스 플랫폼 특성과 OOP·SOLID 원칙, Spring Boot IoC 컨테이너 구조, HTTP·REST 기초, Kotlin 특징까지 백엔드 첫 날 전체 개요를 정리한 노트."
permalink: "study/2021/06/20/백엔드-기초-스터디-1일차"
---

## Java

- **High-Level, Class 기반, OOP** 언어
- **크로스 플랫폼**: 한 번 컴파일된 Java 바이트코드는 어떤 JVM에서든 실행 가능 (한 번 작성 → 어디서든 실행)

---

### OOP (Object-Oriented Programming)란?

- **객체지향 프로그래밍** — 프로그램을 명령어 목록이 아닌 서로 상호작용하는 객체들의 모임으로 보는 패러다임

#### OOP를 사용한다고 해서 OOP를 제대로 쓴다고 보기 어렵다

OOP의 핵심 개념:

| 개념 | 설명 |
|---|---|
| **Encapsulation** (캡슐화) | 실제 구현을 감추고 인터페이스(getter/setter)만 노출 |
| **Composition & Inheritance** (컴포지션·상속) | 기존 객체를 계승하거나 조합해 재사용 |
| **Polymorphism** (다형성) | 동일한 인터페이스로 다른 동작을 수행 |

#### SOLID Principles

| 원칙 | 설명 |
|---|---|
| **S** ingle Responsibility | 하나의 객체는 하나의 책임만 가진다 (드라이버는 나사 조이는 용도) |
| **O** pen-Closed | 확장에는 열려 있고, 변형에는 닫혀 있다 |
| **L** iskov Substitution | 상위 타입(List)을 사용하던 자리에 하위 타입(ArrayList)을 넣어도 동작해야 한다 |
| **I** nterface Segregation | 하나의 큰 인터페이스보다 여러 개의 작은 인터페이스가 낫다 |
| **D** ependency Inversion | 원래 함수를 변형하지 않고, 기능 확장 시 새로운 함수를 추가한다 |

---

## Web Application이란?

> A web application is application software that runs on a web server. Web applications are accessed by the user through a web browser with an active network connection. _(Wikipedia)_

웹 서버에서 작동하는 소프트웨어로, 사용자는 브라우저를 통해 접근한다.

### HTTP (HyperText Transfer Protocol)

- **Hypertext**를 전송하기 위한 규약
- 통신 7계층 중 **Application Layer(응용 계층)**에서 작동
- 일반적인 인터넷 브라우저는 대부분 HTTP를 사용

### REST (Representational State Transfer)

- 소프트웨어 **아키텍처 스타일**
- 브라우저와 웹서버가 정보를 주고받기 위한 **API 설계 방식**
- HTTP와 기술적 차이가 있는 것이 아니라 어떤 상황에서 어떻게 쓸지를 정의한 설계 방식
- REST 자체는 상세한 규칙이 많아 REST처럼 보이지만 실제로는 REST가 아닌 경우도 많음

### 웹 브라우저 작동 방식

![웹 브라우저 작동 흐름](/assets/20210617_050627.png)

| 구분 | 역할 |
|---|---|
| **Front-End** | 웹 브라우저에 게시될 HTML 구현 |
| **Back-End** | API를 통해 요청을 받고 데이터를 조작·반환하는 서버 구현 |

---

## Spring Boot란?

> The Spring Framework is an application framework and inversion of control container for the Java platform. _(Wikipedia)_

### 스프링 vs 스프링 부트 비교

![스프링과 스프링 부트 비교 1](/assets/20210617_051150.png)

![스프링과 스프링 부트 비교 2](/assets/20210617_051158.png)

- 스프링 부트는 스프링과 거의 동일하나 **단독 실행 가능**한 점이 핵심 차이
- 스프링 부트는 **Jetty/Tomcat 같은 WAS를 내장**하여 별도 서버 설정 없이 실행 가능
- 스프링은 WAR 파일로 외부 컨테이너가 필요하므로 `main` 함수가 없음

![스프링 부트 main 예시](/assets/20210617_053051.png)

### Spring IOC Container

![Spring IOC Container 구조](/assets/20210617_053111.png)

#### IoC (Inversion of Control, 제어 역전)

개발자가 라이브러리 코드를 호출하는 것이 아니라, **기능이 구현된 라이브러리(프레임워크)가 개발자 코드를 호출**하여 기능을 제공하는 것.

> 비유: 일하는 데 필요한 물품을 내가 사는 게 아니라 회사에서 제공해주는 것.

#### Spring에서 Bean으로 정의된 어노테이션들

![Spring Bean 어노테이션 예시](/assets/20210617_054241.png)

```
@Bean
@Controller / @MemberRegisterController
@Service
@Repository
@Configuration
@Component
```

스프링 프레임워크는 이러한 **Bean** 객체들을 다뤄 Web Application을 만든다.

---

## Kotlin

- **JVM에서 동작하는 바이트코드**를 생성하는 또 다른 언어
- Java와 동일한 바이트코드를 사용하므로 **같은 JVM 위에서 동작**
- Java 코드 안에서 Kotlin 호출 가능, 반대도 가능 → **상호 호환**
- Java에 없는 기능을 제공:
  - `?` 연산자를 통한 **Null-Safety**
  - **Functional Programming** 지원
  - `data class` — 데이터 저장 전용 클래스 정의
  - Primitive 타입 없이 **모든 것이 객체**로 처리 (`int`, `long` 등도 객체화)

---

## 학습 방향성

![학습 방향성 로드맵](/assets/20210617_060319.png)

- 프로그램 입출력과 CLI (Linux)
- 클라우드 서비스
- HTTPS 이론 및 적용
- gRPC (Remote Procedure Call) 개요
- MSA (Microservice Architecture)
- Sonatype Nexus (라이브러리 관리 도구)
- Nginx / Load Balancing
