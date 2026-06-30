---
title: "[Spring] 테스트 코드, Bean 어노테이션, AOP 기초 개념 정리"
date: 2021-04-30
category: "Spring"
tags: ["Spring"]
description: "테스트 코드가 필요한 이유, DTO/DAO/ORM 계층 분리 개념, @Bean/@Component/@Autowired 등 Bean 관련 어노테이션, 그리고 AOP(관점 지향 프로그래밍) 기초 개념을 정리한 학습 기록."
permalink: "study/2021/04/30/스프링-기초"
---

## 테스트 코드가 필요한 이유

메인 코드에서 함수를 바꿔가며 직접 눈으로 확인하는 방식 대신, **컴퓨터에게 검증을 맡기는** 것이 테스트 코드의 목적이다.

### 계층 분리와 DTO의 필요성

- 관리자와 일반 유저가 사용하는 기능이 다르고, 계층 분리에 따라 코드 관리 방식도 달라진다.
- 예를 들어, 전화번호 앞자리 4개를 뒷자리 4개로 바꿔야 하는 경우, **DTO를 분리**해두면 한 곳만 수정하면 된다.
- 초기 비용은 높지만 규모가 큰 프로젝트일수록 반드시 계층을 분리한다.
- DB에서 가져온 값을 가공해서 내보내는 것은 **DTO**에서 처리한다.

### DAO와 ORM

- **DAO(Data Access Object)**: 엔티티를 데이터베이스와 매칭시켜 사용하는 계층. 실제로는 내부적으로 **Repository**로 처리한다.
- 객체와 DB 사이에는 큰 패러다임 차이가 있으며, **ORM**이 이를 자동으로 매핑해준다.
- Java JDBC를 직접 다루기보다 JPA/QueryDSL을 통해 추상화된 방식을 사용한다.

### QueryDSL과 JPQL

- **QueryDSL**은 JPA를 대체하는 것이 아니라, 쿼리문을 **타입 안전하게 편리하게** 작성하게 해주는 도구다.
- QueryDSL은 자체 컴파일러 개념으로 내부에서 DB 연동을 관리한다. (테스트 코드 개념이 아님)
- **JPQL**도 함께 살펴볼 필요가 있다.

---

## @Bean 어노테이션

![Bean 어노테이션 설명 화면](/assets/20210501_142858.png)

| 어노테이션 | 설명 |
|---|---|
| `@Bean` | Bean 객체를 정의. 메서드 이름이 Bean 이름이 됨 |
| `@Bean(name=이름)` | Bean 이름을 직접 지정 |
| `@Lazy` | `lazy-init` 속성 지정 (getBean 호출 시점에 생성) |
| `@Scope` | Bean의 스코프 설정 |
| `@Primary` | 동일 타입 Bean이 여러 개일 때 우선 주입 대상 지정 |

- 사용할 Bean이 XML에서 하나만 정의된 경우 `id`는 생략 가능하다.
- 같은 클래스 타입의 Bean이 여러 개 있을 때는 `id`로 구분해야 한다.

---

XML 방식에서 설정한 내용을 Java 방식으로 바꾸는 예시다.

![XML → Java 방식 Bean 설정 변경](/assets/20210501_150304.png)

@Bean(autowire = Autowire.BY_TYPE)
	//선이 그어지는 건 디플리케이드(그래도 실행은 잘 됨) 스프링 버전을 하위로 하면 디플리케이드 된게 삭제된다.
	public TestBean3 java4() {
		return new TestBean3();
	}

> Spring 5.1부터 `autowire` 속성은 **deprecated(권장하지 않음)**. 생성자 주입 방식으로 전환을 권장한다.

---

![Deprecated 표시 예시](/assets/20210501_153541.png)

Java에서 코드에 **취소선(strikethrough)**이 그어진 것은 deprecated 되었다는 의미다.

- **의미 1**: 더 이상 사용하지 않음
- **의미 2**: 더 좋은 대안이 있으니 그것을 사용할 것을 권장

> Spring 5.1부터 `@Required`는 아무 동작도 하지 않는다. **생성자 주입** 방식을 사용하도록 권장한다.

---

## @Autowired

@Autowired
public TestBean1(DataClass2 data4) {
	this.data4 = data4;
}

- `@Autowired`를 사용하면 **클래스 타입**으로 Bean을 주입한다.
- 주입받으려는 타입의 Bean이 반드시 정의되어 있어야 한다.

---

## @Qualifier

- `@Autowired`로 주입 시 **같은 타입의 Bean이 여러 개** 정의되어 있을 경우, `@Qualifier`에 설정된 이름의 Bean을 찾아 주입한다.

---

## @Component

- `@Component` 어노테이션을 사용하면 **Bean Configuration 파일에 등록하지 않아도** Bean이 자동으로 등록된다.
- XML 방식에서는 아래와 같이 탐색 경로를 지정한다.

<context:component-scan base-package="kr.co.softcampus.beans"/>
<context:component-scan base-package="kr.co.softcampus.bean2"/>

### @Bean vs @Component

| 어노테이션 | 사용 상황 |
|---|---|
| `@Bean` | 클래스 코드를 수정할 수 없을 때 / 같은 타입의 Bean을 여러 개 등록할 때 |
| `@Component` | 클래스 코드를 직접 수정할 수 있을 때 |

---

## AOP (Aspect Oriented Programming)

**AOP(관점 지향 프로그래밍)**은 하나의 프로그램을 관점(관심사)이라는 논리적 단위로 분리해 관리하는 개념이다.

- **활용 분야**: 로깅, 감사(Audit), 선언적 트랜잭션, 보안, 캐싱 등
- Spring Framework가 특정 메서드 호출을 감시하다가, 해당 메서드가 실행되기 **전·후에 자동으로 다른 메서드**가 호출되도록 한다.
- 즉, 특정 메서드 실행 → 전처리 작업 → 메서드 실행 → 후처리 작업 순으로 동작을 제어할 수 있다.
