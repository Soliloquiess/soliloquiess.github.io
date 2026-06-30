---
title: "[Spring] 스프링 프레임워크 핵심 원리 — DI·IOC 컨테이너·ApplicationContext 완전 정리"
date: 2021-06-23
category: "Spring"
tags: ["Spring"]
description: "일체형 vs 조립형 의존관계 비교로 DI(의존성 주입) 개념을 이해하고, IOC 컨테이너의 생성 역순 원리, ApplicationContext 종류, Root AC와 Servlet AC 구조까지 스프링 핵심 원리를 체계적으로 정리한 학습 노트."
permalink: "study/2021/06/23/Spring-프레임워크-DI~AOP"
---

## 스프링 프레임워크

기업형 응용 프로그램을 보조하기 위한 **경량 프레임워크**다.

| 특징 | 설명 |
|------|------|
| 적용 대상 | 분산형·기업형 응용 프로그램 |
| 핵심 기능 | 개발을 위한 API, **DI**(결합력 저하), DB 트랜잭션 처리, 로그 처리 |

![20210623_025623](/assets/20210623_025623.png)

코드 수정을 없애고 DI를 위한 설정으로 대체한다.

---

## DI(Dependency Injection, 의존성 주입) 개념

### 일체형 vs 조립형

![20210623_030304](/assets/20210623_030304.png)

- **왼쪽(일체형)**: 클래스 A가 클래스 B를 직접 생성해서 사용한다. A가 B를 부품으로 소유하는 **has-a 관계**이며, 이를 **Dependency(종속성, 부품 관계)**라 한다.
- **오른쪽(조립형)**: 외부에서 B를 생성해서 A에 주입(세팅)한다. A는 직접 생성하지 않는다.

![20210623_031618](/assets/20210623_031618.png)

![20210623_031636](/assets/20210623_031636.png)

| 방식 | 결합도 | 부품 교체 |
|------|--------|-----------|
| **일체형** | 높음 | 어려움 |
| **조립형** | 낮음(느슨한 결합) | 쉬움 |

조립형이 결합력이 낮아 부품을 쉽게 교체할 수 있다. 부품(Dependency)을 꽂는 작업을 **Injection**이라 하며, 이 둘을 합쳐 **DI(Dependency Injection)**라 한다.

- **장점**: 부품을 쉽게 교체 가능
- **단점**: 부품을 직접 조립해야 하는 번거로움 → 스프링이 이 조립을 대신 처리해준다.

![20210623_032747](/assets/20210623_032747.png)

DI 주입 방법:
- **세터(Setter) 주입**: `setXxx()` 메서드로 주입
- **생성자(Constructor) 주입**: 생성자 파라미터로 주입

---

## IOC 컨테이너

주문서 역할을 하는 게 필요한데, 스프링에서는 **XML**과 **어노테이션(annotation)**이 그 역할을 한다.

![20210623_033556](/assets/20210623_033556.png)

스프링도 주문서(XML/어노테이션)에 입력된 내용을 담을 그릇이 필요하다. 이를 **IOC 컨테이너(Inversion of Control Container)**라 한다.

> IOC는 DI의 상위 개념이다.

### IOC(Inversion of Control, 제어의 역전) 원리

![20210623_034915](/assets/20210623_034915.png)

- **일체형**: A가 B를 생성하고, B가 C를 생성한다. 안쪽 구조를 몰라도 A를 만들면 B·C가 순서대로 만들어진다.
- **조립형(결합형)**: **작은 부품(D)부터 먼저 만들어진다.** 즉, 생성 순서가 역순이 된다 → **Inversion of Control(제어의 역전)**

부품을 담기만 하면 Dependency Container, 부품이 결합까지 되어 담겨있으므로 **IOC 컨테이너**라 부른다.

---

## Spring IOC 컨테이너 활용

작성한 지시서(주문서)를 읽어서 빈을 생성하고 활용한다.

![20210623_114554](/assets/20210623_114554.png)

**ApplicationContext**: 스프링에서 DI 지시서를 읽어 조립해주는 구체적인 객체다. 인터페이스이며 여러 구현체가 있고, 지시서를 어떻게 전달하느냐에 따라 달라진다. 가장 보편적인 것은 `ClassPathXmlApplicationContext`다.

---

## Spring DI 활용 — 이론

### 1. 빈(Beans) 종류

| 빈 종류 | 특징 |
|---------|------|
| **JavaBeans** | 재사용 가능한 컴포넌트, 상태 보유 |
| **Servlet & JSP Beans** | MVC 모델, EL·Scope 활용, JSP 컨테이너 관리 |
| **EJB(Enterprise Java Beans)** | 복잡한 규칙, EJB 컨테이너 관리 |
| **Spring Bean** | **POJO(Plain Old Java Object)**, 단순·독립적, Spring 컨테이너 관리 |

![20220209_000017](/assets/20220209_000017_7gcfn6nxs.png)

### 2. BeanFactory와 ApplicationContext

![20220209_011255](/assets/20220209_011255.png)

| 개념 | 설명 |
|------|------|
| **Bean** | Spring Container가 관리하는 객체 |
| **Spring Container** | Bean 저장소. Bean을 생성·소멸·연결하여 관리 |
| **BeanFactory** | 빈 생성·연결 등 기본 기능 정의 |
| **ApplicationContext** | BeanFactory를 확장해 여러 부가 기능 정의 |

### 3. ApplicationContext의 종류

![20220209_011529](/assets/20220209_011529.png)

### 4. Root AC와 Servlet AC

![20220209_012030](/assets/20220209_012030.png)

![20220209_014236](/assets/20220209_014236.png)

톰캣 서버 구조: **톰캣 엔진** 안에 호스트별 영역이 있고, 그 안에 모듈별 **Context**가 존재한다.

![20220209_014302](/assets/20220209_014302.png)

![20220209_015922](/assets/20220209_015922.png)

Context를 감싸고 있는 것이 **ApplicationContext**다.
