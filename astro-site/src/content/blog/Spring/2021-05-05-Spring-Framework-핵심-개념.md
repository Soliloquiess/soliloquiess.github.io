---
title: "[Spring] Spring Framework 핵심 개념 — IoC/DI, MVC, JDBC, 트랜잭션"
date: 2021-05-05
category: "Spring"
tags: ["Spring"]
description: "Spring Framework 모듈 구조, IoC/DI 컨테이너 동작 원리, Bean 싱글톤 관리, Spring JDBC와 JdbcTemplate, DTO/DAO/ConnectionPool, MVC 패턴과 레이어드 아키텍처, 트랜잭션 ACID 특성을 정리한 Spring 기초 학습 노트."
permalink: "study/2021/05/05/Spring-뭐시기"
---

## Spring Framework란?

엔터프라이즈급 애플리케이션을 구축할 수 있는 가볍고 모듈화된 솔루션(**원스-스탑-숍, One-Stop-Shop**). 필요한 모듈만 골라 사용할 수 있으며 **IoC 컨테이너**, 선언적 트랜잭션 관리, 완전한 **MVC Framework**, **AOP** 지원을 제공합니다.

![Spring Framework 모듈 구조](/assets/20210505_150249.png)

> **프레임워크 vs 라이브러리**
> - **프레임워크**: 개발자가 틀 안에서 코드를 작성하도록 강제하는 기본 토대 (반제품)
> - **라이브러리**: 개발자가 원하는 연산 결과를 얻기 위해 호출하는 도구 (망치, 톱 같은 개별 도구)

### 주요 모듈 구성

스프링 프레임워크는 약 **20개 모듈**로 구성되어 있으며, 필요한 것만 선택적으로 사용합니다.

| 계층 | 모듈 | 설명 |
|------|------|------|
| **AOP** | spring-aop | AOP Alliance 호환 AOP 지원 |
| **AOP** | spring-aspects | AspectJ 통합 |
| **AOP** | spring-instrument | BCI(Byte Code Instrumentation) — 런타임/로드 시 바이트코드 변경 |
| **Messaging** | spring-messaging | Message, MessageChannel, MessageHandler 제공 (Spring 4+) |
| **Data Access** | spring-jdbc | JDBC 프로그래밍 추상화 |
| **Data Access** | spring-tx | 선언적 트랜잭션 관리 |
| **Data Access** | spring-orm | JPA, Hibernate 등 ORM 통합 레이어 |
| **Data Access** | spring-oxm | JAXB 등 Object/XML 맵핑 |
| **Data Access** | spring-jms | 메시지 생성/소비 기능 (Spring 4.1+: spring-messaging 통합) |
| **Web** | spring-web | 멀티파트 업로드, 서블릿 리스너 등 웹 통합 |
| **Web** | spring-webmvc | Spring MVC + REST 웹 서비스 구현 |
| **Web** | spring-websocket | 웹소켓 지원 |

---

## Spring IoC/DI 컨테이너

### 컨테이너(Container)란?

**인스턴스의 생명주기를 관리**하고 생성된 인스턴스에 추가 기능을 제공하는 것을 컨테이너라 합니다.

- WAS는 **Servlet 컨테이너**를 가지고 있어, 서블릿 URL 요청이 오면 해당 서블릿을 메모리에 올려 실행
- 동일한 서블릿 요청이 반복되면 이미 올라간 서블릿을 재사용 (메모리 효율)

### IoC (Inversion of Control — 제어의 역전)

컨테이너가 코드 대신 오브젝트의 **제어권**을 갖는 구조.

- 서블릿 클래스는 개발자가 작성하지만, 그 메소드를 알맞게 호출하는 것은 WAS
- 개발자가 만든 클래스·메소드를 **다른 프로그램이 대신 실행**해주는 것 = 제어의 역전

### DI (Dependency Injection — 의존성 주입)

클래스 사이의 의존 관계를 **Bean 설정 정보**를 바탕으로 컨테이너가 자동으로 연결해주는 것.

**DI 미적용 예 — 개발자가 직접 인스턴스 생성:**

```
class 엔진 {

}

class 자동차 {
    엔진 v5 = new 엔진();
}

```

![DI 미적용 다이어그램](/assets/20210505_150817.png)

**Spring DI 적용 예 — 컨테이너가 인스턴스 주입:**

```
@Component
class 엔진 {

}

@Component
class 자동차 {
     @Autowired
     엔진 v5;
}
```

- **IoC**: 프로그램이 개발자에게 틀을 강요해 그 형식으로 만들게 하는 것
- **DI**: 그 강요 내용 (예: "박스 높이는 4cm, 너비는 10cm로 해라")
- **장점**: 코드 형태가 정형화되어 유지·관리가 쉬워짐

![DI 적용 다이어그램](/assets/20210505_151508.png)

### Spring IoC/DI 컨테이너 종류

| 컨테이너 | 특징 |
|----------|------|
| **BeanFactory** | IoC/DI 기본 기능 |
| **ApplicationContext** | BeanFactory 기능 포함 + 트랜잭션, AOP, 국제화, 이벤트 처리. 일반적으로 권장 |
| **BeanPostProcessor** | 인스턴스화·의존성 처리 로직을 개발자가 커스터마이징 가능 |
| **BeanFactoryPostProcessor** | 설정 메타데이터 커스터마이징 |

---

### Bean과 싱글톤(Singleton)

Spring 컨테이너가 관리하는 객체를 **빈(Bean)**이라 합니다. `new` 연산자로 직접 생성한 객체는 Bean이 아닙니다.

Spring은 Bean을 기본적으로 **싱글톤(Singleton)** 으로 생성합니다 — 메모리에 하나만 존재. 동시에 여러 요청이 같은 객체를 사용할 경우 동시성 문제가 발생할 수 있으며, **스코프(scope)** 를 지정해 다른 생성 방식을 선택할 수 있습니다.

참고: https://gmlwjd9405.github.io/2018/11/10/spring-beans.html

---

### Java Config 주요 어노테이션

| 어노테이션 | 역할 |
|-----------|------|
| **`@Configuration`** | 스프링 설정 클래스 선언 |
| **`@Bean`** | Bean 정의 |
| **`@ComponentScan`** | `@Controller`, `@Service`, `@Repository`, `@Component` 붙은 클래스를 찾아 컨테이너에 등록 |
| **`@Component`** | 컴포넌트 스캔 대상. 주로 유틸·지원 클래스에 사용 |
| **`@Autowired`** | 컨테이너에서 주입 대상 Bean을 찾아 주입 |

---

## Spring JDBC

반복적인 JDBC 저수준 세부사항(연결, 해제, 예외 처리 등)을 Spring이 대신 처리해주어 **개발자는 필요한 SQL 로직에만 집중** 가능합니다.

![Spring JDBC 처리 흐름](/assets/20210505_161400.png)

### Spring JDBC 패키지 구성

| 패키지 | 제공 내용 |
|--------|-----------|
| `org.springframework.jdbc.core` | **JdbcTemplate** 및 관련 Helper 객체 |
| `org.springframework.jdbc.datasource` | DataSource 유틸 클래스, 트랜잭션 매니저, 다양한 DataSource 구현 |
| `org.springframework.jdbc.object` | RDBMS 조회·갱신·저장을 안전하고 재사용 가능한 객체로 제공 |
| `org.springframework.jdbc.support` | jdbc.core·object를 사용하는 JDBC 프레임워크 지원 |

### JdbcTemplate

`org.springframework.jdbc.core`에서 가장 중요한 클래스.
- 리소스 생성·해제 처리 (연결 닫는 것을 잊어 발생하는 문제 방지)
- Statement 생성·실행 처리
- SQL 조회, 업데이트, 저장 프로시저 호출, ResultSet 반복 실행
- JDBC 예외를 `org.springframework.dao` 패키지의 일반 예외로 변환

---

## DTO, DAO, ConnectionPool

### DTO (Data Transfer Object — 데이터 전송 객체)

계층 간(Controller-View, 비즈니스, 퍼시스턴스) 데이터 교환을 위한 자바빈즈. 로직 없이 순수 데이터만 보유하며 필드와 getter/setter로 구성됩니다.

```
public class ActorDTO {
    private Long id;
    private String firstName;
    private String lastName;
    public String getFirstName() {
        return this.firstName;
    }
    public String getLastName() {
        return this.lastName;
    }
    public Long getId() {
        return this.id;
    }
    // ......
}
```

### DAO (Data Access Object — 데이터 접근 객체)

데이터를 조회하거나 조작하는 기능을 전담하는 객체. 주로 데이터베이스 조작을 목적으로 사용됩니다.

### ConnectionPool (커넥션 풀)

DB 연결은 비용이 크기 때문에, 미리 여러 개의 커넥션을 맺어두고 필요 시 빌려 쓰고 반납하는 방식. 커넥션을 반납하지 않으면 풀이 고갈되어 새 요청이 대기 상태에 빠집니다.

- **DataSource**: 커넥션 풀을 관리하는 객체. 커넥션 획득·반납 작업을 담당

참고: https://lazymankook.tistory.com/30

---

## MVC (Model-View-Controller) 패턴

제록스 연구소의 트뤼그베 린즈커그가 처음 소개한 개념으로, 데스크톱 애플리케이션용으로 고안되었습니다.

| 구성 요소 | 역할 |
|-----------|------|
| **Model** | 뷰가 렌더링하는 데 필요한 데이터 (예: 상품 목록, 주문 내역) |
| **View** | 실제로 보이는 부분. 모델을 사용해 렌더링. JSP, JSF, PDF, XML 등 |
| **Controller** | 사용자 액션에 응답. 모델을 업데이트하고 다른 액션 수행 |

![Spring MVC 구조 1](/assets/20210505_164052.png)

![Spring MVC 구조 2](/assets/20210505_164107.png)

참고: https://tte-yeong.tistory.com/70

### Spring MVC 주요 어노테이션

| 어노테이션 | 역할 |
|-----------|------|
| **`@RequestParam`** | HTTP 파라미터를 메소드 인수에 바인딩. `required`로 필수 여부 설정 |
| **`@PathVariable`** | URL 경로 변수 추출. `@RequestMapping`의 `{변수명}`과 매핑 |
| **`@RequestHeader`** | 요청 헤더 값 읽기 |
| **`@RequestBody`** | HTTP 요청 본문(body)을 객체로 변환 |
| **`@ModelAttribute`** | 폼 데이터를 객체로 바인딩 |
| **`@CookieValue`** | 쿠키 값 읽기 |

> **서블릿 vs Spring MVC**: 서블릿은 항상 서블릿 객체를 상속받아야 해 서블릿에 종속적인 반면, Spring MVC는 일반 클래스로 작성 가능해 서블릿 독립적입니다.

---

## 컨트롤러와 서비스 — 레이어드 아키텍처

컨트롤러에서 중복되는 비즈니스 로직은 **Service 객체**로 분리하고, 컨트롤러는 Service를 사용하도록 구성합니다.

![컨트롤러-서비스 분리](/assets/20210505_165537.png)

**Service 객체**: 비즈니스 로직을 수행하는 메소드를 가진 객체. 보통 하나의 비즈니스 로직 = 하나의 **트랜잭션**으로 동작합니다.

---

## 트랜잭션(Transaction)

### ACID 특성

| 특성 | 설명 |
|------|------|
| **원자성 (Atomicity)** | 트랜잭션 내 모든 작업이 전부 성공하거나 전부 실패해야 함. 중간 실패 시 **rollback** |
| **일관성 (Consistency)** | 트랜잭션 진행 중 데이터가 변경되더라도 트랜잭션 시작 시점의 데이터 기준으로 진행 |
| **독립성 (Isolation)** | 동시에 실행 중인 트랜잭션들이 서로의 연산에 끼어들 수 없음 |
| **지속성 (Durability)** | 성공적으로 완료된 트랜잭션 결과는 영구적으로 반영됨 |

예: "출금" 작업 중 ④ 기록 단계에서 오류 발생 시 앞의 모든 작업을 rollback. 전 단계 성공 시에만 **commit**.

### JDBC 트랜잭션 처리

- DB 연결 후 `Connection.setAutoCommit(false)` 설정
- 모든 SQL 성공 시 `commit()` 호출

### `@EnableTransactionManagement`

Spring Java Config에서 트랜잭션을 활성화하는 어노테이션. `PlatformTransactionManager` 구현체를 자동으로 찾아 매핑합니다.

![레이어드 아키텍처 전체 구조](/assets/20210505_165718.png)

### 레이어드 아키텍처 설정 분리

- **DispatcherServlet**: 프레젠테이션 레이어 설정 담당 (`web.xml`에서 설정)
- **ContextLoaderListener**: 나머지 설정(Service, Repository 등) 담당 → **root 컨텍스트** 생성
- DispatcherServlet이 생성한 ApplicationContext는 root 컨텍스트의 **자식 컨텍스트**
- 자식 컨텍스트에서 root 컨텍스트의 Bean을 사용할 수 있음

> 레이어를 구성하지 않으면 비즈니스 로직이 한 곳에 집중되어 유지보수가 어려워지고, 모든 처리를 프레젠테이션 레이어에서 담당하게 되어 Model과 Controller의 역할이 모호해집니다.
