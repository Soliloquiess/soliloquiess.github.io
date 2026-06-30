---
title: "[backend] Spring MVC 구조 — DispatcherServlet, DI, 그리고 어노테이션 기반 컨트롤러"
date: 2021-06-21
category: "Backend"
tags: ["Backend"]
description: "순수 서블릿 기반의 FrontController + POJO 구조가 Spring MVC에서 DispatcherServlet과 어노테이션으로 어떻게 대체되는지, 그리고 DI(의존성 주입) 컨테이너의 역할을 정리한다."
permalink: "study/2021/06/21/SpringWEB-MVC만들기"
---

## 기존 MVC 구조 복습

기존 MVC에서 **C(Controller)** 부분은 **FrontController + POJO** 로 이루어져 있었다.

- **FrontController**: 서블릿 클래스. 핸들러 매핑과 연결되어 클라이언트 요청에 대응하는 POJO를 찾아준다.
- **POJO**: 뷰(View)의 경로를 리턴하고, 모델(Model)과 연결해 DB CRUD를 실행한다.
- **ViewResolver**: FrontController가 최종적으로 뷰 리졸버를 통해 JSP에 포워딩한다.

POJO의 역할:
1. **객체 바인딩** — 모델 데이터를 request/세션에 담음
2. **next 페이지 리턴** — 이동할 뷰 경로 반환

![20210621_025333](/assets/20210621_025333.png)

위 흐름이 기존 MVC의 전체 경로이다.

![20210621_030415](/assets/20210621_030415.png)

Spring에서는 이 세 기능(FrontController, 핸들러 매핑, ViewResolver)이 프레임워크에 **미리 내장**되어 있다.

---

## Spring MVC로의 전환

기존 MVC에서는 POJO가 공통 `Controller` 인터페이스를 구현해야 했기 때문에 메서드 이름이 고정되었다.

![20210621_033811](/assets/20210621_033811.png)

**Spring MVC에서 달라지는 점:**

| 구성 요소 | 기존 MVC | Spring MVC |
|---|---|---|
| FrontController | 직접 서블릿 구현 | `DispatcherServlet` (프레임워크 제공) |
| 핸들러 매핑 | 직접 구현 | 어노테이션 기반 자동 처리 |
| ViewResolver | 직접 구현 | 프레임워크 제공 |
| Controller 인터페이스 | 필수 구현 | 불필요 — 메서드 이름 자유 |

![20210621_035739](/assets/20210621_035739.png)

**어노테이션**으로 요청 URL과 메서드를 직접 매핑하므로, 핸들러 매핑이 내부적으로 처리된다. FrontController도 `DispatcherServlet`으로 대체되어 별도 구현이 없어진다.

![20210621_040139](/assets/20210621_040139.png)

Spring에서는 `MemberController`에서 바로 작업하면 된다.

![20210621_041017](/assets/20210621_041017.png)

Spring은 이처럼 모든 설정을 **어노테이션** 기호로 처리한다.

---

## pom.xml과 Maven 의존성 관리

**pom.xml(Project Object Model)** 은 Maven 빌드 툴에서 가장 중요한 파일로, 프로젝트 설정과 라이브러리 관리를 담당한다.

`<dependency>` 태그에 사용할 API를 선언하면 Maven이 **mvnrepository**에서 자동으로 다운로드한다.

![20210621_042917](/assets/20210621_042917.png)

---

## DispatcherServlet과 root-context.xml

기존 MVC의 FrontController를 Spring에서는 **DispatcherServlet**이 대신한다. 이를 정의하는 파일이 XML 설정 파일이며, 서버 기동 시 이 파일을 읽어 사전 작업을 수행한다.

- **root-context.xml**: 가장 먼저 실행되는 설정 파일. DB 연결 설정을 담당한다.

Spring → MyBatis → JDBC → DB

![20210621_092335](/assets/20210621_092335.png)

![20210621_095104](/assets/20210621_095104.png)

Spring에서 클래스를 설정할 때는 **bean**으로 등록한다.

- 방법 1 (코드): `A a = new A();`
- 방법 2 (XML bean 설정 — 리플렉션 기법): `<bean id="a" class="A"/>`

클래스 이름만 알면 내부적으로 객체를 생성할 수 있는 이것이 **리플렉션(Reflection)** 기법이다.

`db.properties` 파일을 bean으로 연결하고, `setLocations()` 메서드에 해당 경로값을 주입한다.

![20210621_095756](/assets/20210621_095756.png)

MyBatis의 **SqlSessionFactory**로 커넥션 풀(Connection Pool)을 생성한다.

---

## Spring 컨테이너와 DI(의존성 주입)

**Spring 컨테이너**는 모든 객체를 관리하는 메모리 공간이다.

### 의존 관계(Dependency) 문제

A 클래스 안에서 B 객체를 직접 생성(`B b = new B()`)하면 A와 B가 강하게 결합된다.

A가 B를 직접 생성하면 A와 B 사이에 **강한 의존 관계**가 생긴다. 이는 유지보수 시 문제가 된다.

### DI(Dependency Injection) — 의존성 주입

Spring은 이 의존 관계를 **느슨하게** 만드는 **DI 기법**을 핵심으로 제공한다.

![20210621_104401](/assets/20210621_104401.png)

![20210621_105446](/assets/20210621_105446.png)

![20210621_110514](/assets/20210621_110514.png)

![20210621_110735](/assets/20210621_110735.png)

![20210621_111024](/assets/20210621_111024.png)

![20210621_113046](/assets/20210621_113046.png)

`@Autowired` 또는 `@Inject` 어노테이션을 사용하면 Spring 컨테이너가 `memberDAO`를 찾아 변수에 **자동 주입**한다.

> Window → File → Preferences → File Associations에서 XML 파일을 Spring Properties Editor와 연결하면 설정 파일 편집이 편해진다.
