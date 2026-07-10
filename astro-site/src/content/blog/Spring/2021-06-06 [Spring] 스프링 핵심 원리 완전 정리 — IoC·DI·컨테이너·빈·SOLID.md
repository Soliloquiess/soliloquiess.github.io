---
title: "[Spring] 스프링 핵심 원리 완전 정리 — IoC·DI·컨테이너·빈·SOLID"
date: 2021-06-06
category: "Spring"
tags: ["Spring"]
description: "스프링 등장 배경(EJB·POJO), 객체지향 설계와 SOLID, AppConfig로 시작하는 IoC·DI, 스프링 컨테이너·BeanDefinition·싱글톤·컴포넌트 스캔·의존관계 자동 주입까지 스프링 핵심 원리 정리."
permalink: "study/2021/06/06/스프링-핵심원리-이해"
---

이 문서는 스프링의 핵심 원리를 **순수 자바 → 객체지향 설계 → IoC/DI → 스프링 컨테이너 → 빈/싱글톤 → 컴포넌트 스캔**의 흐름으로 정리한 통합 레퍼런스다. 스프링 없이 순수 자바로 동작을 확인하는 것에서 시작해, 왜 스프링이 필요한지, 스프링이 무엇을 해주는지를 단계별로 이해하는 것이 목표다.

---

# 1. 스프링의 등장 배경

## EJB와 POJO

**EJB(Enterprise JavaBeans)**는 트랜잭션 관리, 분산처리, 보안 등 엔터프라이즈급 서비스를 제공했지만, 복잡한 스펙 때문에 사용이 어려웠다. 웹 사이트가 커지면서 더 가벼운 대안이 필요해졌다.

### POJO(Plain Old Java Object)

| 키워드 | 설명 |
|--------|------|
| **Plain** | 특정 프레임워크의 컴포넌트 인터페이스를 상속받지 않는 순수 자바 객체 |
| **Old** | EJB 이전 방식의 자바 클래스를 의미 |
| **장점** | 특정 기술에 종속되지 않아 생산성·이식성 향상 |

EJB가 제공하는 서비스를 지원하는 **경량 프레임워크**들이 등장했다: Hibernate, JDO, iBatis(MyBatis), **Spring**.

## 스프링이란?

- 자바 언어 기반의 프레임워크
- 자바 언어의 가장 큰 특징 — **객체 지향 언어**
- 스프링은 객체 지향 언어가 가진 강력한 특징을 살려내는 프레임워크
- 스프링은 좋은 객체 지향 애플리케이션을 개발할 수 있게 도와주는 프레임워크

기업형 응용 프로그램을 보조하기 위한 **경량 프레임워크**다.

| 특징 | 설명 |
|------|------|
| 적용 대상 | 분산형·기업형 응용 프로그램 |
| 핵심 기능 | 개발을 위한 API, **DI**(결합력 저하), DB 트랜잭션 처리, 로그 처리 |

![스프링 프레임워크 개요](/assets/20210623_025623.png)

코드 수정을 없애고 DI를 위한 설정으로 대체한다.

## 스프링의 싱글턴과 컴포넌트 체계

Spring은 별도 설정 없이도 내부적으로 **싱글턴(Singleton)**으로 객체를 관리하며, 팩터리 메서드 패턴도 지원한다. DTO처럼 싱글턴이 되면 안 되는 경우는 별도 설정으로 제어할 수 있다.

![Spring 싱글턴 구조와 XML·어노테이션 설정 비교](/assets/20210427_095725.png)

- 아래: XML 설정 방식 / 위: 어노테이션 설정 방식

**컴포넌트(@Component) 계층 구조:**

- 웹 MVC: `@Controller`, `@Service`
- 영속성(자료의 집합) 담당: `@Repository`
- 그 외 일반 객체(DTO 등): `@Component`

**@Autowired**를 선언하면 타입에 맞는 빈을 자동으로 주입해준다. 이를 위해 **컴포넌트 스캔(Component Scan)**이 필요하다 — 베이스 패키지의 모든 클래스에서 타입에 맞는 빈을 찾아 주입한다.

## 프로젝트 구조

Spring을 사용하면 엔터프라이즈 애플리케이션 개발이 편해진다. 일반 main 함수가 있는 애플리케이션에도 사용 가능하다.

![Spring 프로젝트 디렉토리 구조](/assets/20210426_131624.png)

- `src/main/java`: 자바 코드
- `src/main/resources`: XML 설정 문서 등 자바 코드가 아닌 리소스

---

# 2. 객체 지향 설계와 다형성

## 객체지향 4대 특징

| 특징 | 설명 |
|---|---|
| **추상화** | 공통 속성/기능을 추출해 인터페이스·추상 클래스로 표현 |
| **캡슐화** | 데이터와 메서드를 하나로 묶고 외부 접근 제한 |
| **상속** | 부모 클래스의 속성·기능을 자식 클래스가 재사용 |
| **다형성** | 같은 인터페이스로 다양한 구현체를 유연하게 교체 |

객체 지향 프로그래밍은 프로그램을 **독립된 객체들의 협력 관계**로 파악한다. 각 객체는 메시지를 주고받고, 데이터를 처리하며 협력한다. 이러한 구조 덕분에 프로그램이 유연하고 변경이 용이해져 **대규모 소프트웨어 개발**에 적합하다.

![다형성 개념](/assets/20210606_172826.png)

### 다형성의 실세계 비유

- 운전자 — 자동차 (운전자는 차종이 바뀌어도 운전 가능)
- 공연 무대 (배우는 언제든 교체 가능)
- 키보드, 마우스 등 표준 인터페이스
- 정렬 알고리즘, 할인 정책 로직

## 역할과 구현을 분리 (매우 중요)

역할과 구현을 분리하면 세상이 단순해지고, 유연해지며, 변경이 편리해진다.

**장점:**
- 클라이언트는 대상의 **역할(인터페이스)**만 알면 된다.
- 클라이언트는 구현 대상의 **내부 구조를 몰라도** 된다.
- 클라이언트는 구현 대상의 내부 구조가 변경되어도 **영향을 받지 않는다**.
- 클라이언트는 구현 대상 자체를 변경해도 **영향을 받지 않는다**.

**자바 언어에서의 매핑:**

| 개념 | 자바 구현 |
|---|---|
| 역할 | 인터페이스 |
| 구현 | 인터페이스를 구현한 클래스, 구현 객체 |

객체 설계 시 **역할(인터페이스)을 먼저 부여**하고, 그 역할을 수행하는 구현 객체를 만든다.

### 객체의 협력 관계

- 혼자 있는 객체는 없다.
- 클라이언트: 요청 / 서버: 응답
- 수많은 객체 클라이언트와 객체 서버는 서로 **협력 관계**를 가진다.

### 자바 언어의 다형성

![자바 다형성과 오버라이딩](/assets/20210606_180256.png)

- **오버라이딩**은 자바 기본 문법
- 오버라이딩된 메서드가 실행
- 다형성으로 인터페이스를 구현한 객체를 **실행 시점에 유연하게 변경**할 수 있다.
- 클래스 상속 관계도 다형성·오버라이딩 적용 가능

![다형성으로 구현 객체 교체](/assets/20210606_180747.png)

### 다형성의 본질

- 인터페이스를 구현한 객체 인스턴스를 **실행 시점에 유연하게 변경**할 수 있다.
- 다형성의 본질을 이해하려면 **협력이라는 객체 사이의 관계**에서 시작해야 한다.
- 클라이언트를 변경하지 않고, **서버의 구현 기능을 유연하게 변경**할 수 있다.

## 역할과 구현을 분리 — 정리와 한계

**정리:**
- 실세계의 역할과 구현 컨셉을 다형성을 통해 객체 세상으로 가져올 수 있음
- 유연하고 변경이 용이, 확장 가능한 설계
- 클라이언트에 영향을 주지 않는 변경 가능
- **인터페이스를 안정적으로 잘 설계하는 것이 중요**

**한계:**
- 역할(인터페이스) 자체가 변하면, 클라이언트와 서버 모두에 큰 변경이 발생한다.
  - 자동차를 비행기로 변경해야 한다면?
  - USB 인터페이스가 변경된다면?

## 스프링과 객체 지향

- **다형성이 가장 중요하다!**
- 스프링은 다형성을 극대화해서 이용할 수 있게 도와준다.
- 스프링의 **IoC(제어의 역전)**, **DI(의존관계 주입)**은 다형성을 활용해서 역할과 구현을 편리하게 다룰 수 있도록 지원한다.
- 스프링을 사용하면 마치 **레고 블럭 조립하듯이**, 공연 무대의 배우를 선택하듯이 구현을 편리하게 변경할 수 있다.

---

# 3. 좋은 객체 지향 설계의 5원칙 (SOLID)

클린코드로 유명한 **로버트 마틴**이 정리한 5가지 원칙이다.

| 원칙 | 이름 | 한국어 |
|---|---|---|
| **SRP** | Single Responsibility Principle | 단일 책임 원칙 |
| **OCP** | Open/Closed Principle | 개방-폐쇄 원칙 |
| **LSP** | Liskov Substitution Principle | 리스코프 치환 원칙 |
| **ISP** | Interface Segregation Principle | 인터페이스 분리 원칙 |
| **DIP** | Dependency Inversion Principle | 의존관계 역전 원칙 |

### SRP — 단일 책임 원칙

- 한 클래스는 **하나의 책임**만 가져야 한다.
- 중요한 기준은 **변경**이다 — 변경이 있을 때 파급 효과가 적으면 단일 책임 원칙을 잘 따른 것
- 예) UI 변경, 객체의 생성과 사용을 분리

### OCP — 개방-폐쇄 원칙

- 소프트웨어 요소는 **확장에는 열려 있으나 변경에는 닫혀** 있어야 한다.
- 다형성을 활용: 인터페이스를 구현한 새로운 클래스를 만들어 기능 확장

**문제점:**
- `MemberRepository m = new MemoryMemberRepository();` → 기존 코드
- `MemberRepository m = new JdbcMemberRepository();` → 변경 코드
- 구현 객체를 변경하려면 **클라이언트 코드도 변경**해야 한다 → OCP 위반

**해결책:** 객체를 생성하고 연관관계를 맺어주는 **별도의 조립·설정자(DI 컨테이너)** 가 필요하다.

### LSP — 리스코프 치환 원칙

- 프로그램의 객체는 정확성을 깨뜨리지 않으면서 **하위 타입의 인스턴스로 바꿀 수 있어야** 한다.
- 인터페이스를 구현한 구현체는 **인터페이스 규약을 반드시 지켜야** 한다.
- 단순히 컴파일 성공을 넘어서는 이야기
- 예) 자동차 인터페이스의 `엑셀`은 앞으로 가라는 기능 — 뒤로 가게 구현하면 LSP 위반

### ISP — 인터페이스 분리 원칙

- **특정 클라이언트를 위한 인터페이스 여러 개**가 범용 인터페이스 하나보다 낫다.
- 예) 자동차 인터페이스 → **운전 인터페이스** + **정비 인터페이스** 분리
- 분리하면 정비 인터페이스가 변해도 운전자 클라이언트에 영향을 주지 않는다.
- 인터페이스가 명확해지고, 대체 가능성이 높아진다.

### DIP — 의존관계 역전 원칙

- **추상화에 의존해야지, 구체화에 의존하면 안 된다.**
- 구현 클래스에 의존하지 말고, **인터페이스에 의존**하라.
- 클라이언트가 인터페이스에 의존해야 구현체를 유연하게 변경할 수 있다.

**문제점 (DIP 위반):**
- `MemberRepository m = new MemoryMemberRepository();`
- `MemberService`가 인터페이스에도 의존하지만 **구현 클래스도 동시에 의존** → DIP 위반

> `의존한다` = 해당 코드를 알고(참조하고) 있다는 의미

### 정리

- 객체 지향의 핵심은 **다형성**
- 하지만 다형성만으로는 OCP, DIP를 지킬 수 없다.
  - 구현 객체를 변경할 때 클라이언트 코드도 함께 변경된다.
- **스프링의 DI 컨테이너**가 이 문제를 해결한다.

**설계 원칙**
- **모든 설계에 역할과 구현을 분리하자.**
- 애플리케이션 설계도 공연처럼 — 배역(인터페이스)만 만들어두고, 배우(구현체)는 언제든 유연하게 변경할 수 있도록 만드는 것이 좋은 객체 지향 설계다.
- 이상적으로는 **모든 설계에 인터페이스를 부여**하자.
- (추가 설계 원칙) **결합도는 낮게, 응집도는 높게.**

**실무 고민:**
- 인터페이스를 도입하면 추상화라는 비용이 발생한다.
- 기능을 확장할 가능성이 없다면, 구체 클래스를 직접 사용하고, 향후 꼭 필요할 때 리팩터링해서 인터페이스를 도입하는 것도 방법이다.

---

# 4. 순수 자바로 시작하기 — 예제 설계

여기서 할 건 스프링 없이 순수 자바로 동작을 확인하는 것이다.

## 동작 확인

기본 메인 클래스 실행: `CoreApplication.main()`

IntelliJ에서 Gradle 대신 자바 직접 실행으로 변경하면 실행 속도가 더 빠르다.

> `Preferences` → `Build, Execution, Deployment` → `Build Tools` → `Gradle`  
> - **Build and run using**: Gradle → **IntelliJ IDEA**  
> - **Run tests using**: Gradle → **IntelliJ IDEA**

## 비즈니스 요구사항과 설계

**회원**
- 회원을 가입하고 조회할 수 있다.
- 회원은 일반과 VIP 두 가지 등급이 있다.
- 회원 데이터는 자체 DB를 구축할 수 있고, 외부 시스템과 연동할 수 있다. (미확정)

**주문과 할인 정책**
- 회원은 상품을 주문할 수 있다.
- 회원 등급에 따라 할인 정책을 적용할 수 있다.
- 할인 정책은 모든 VIP는 1000원을 할인해주는 고정 금액 할인을 적용해달라. (나중에 변경 될 수 있다.)
- 할인 정책은 변경 가능성이 높다. 회사의 기본 할인 정책을 아직 정하지 못했고, 오픈 직전까지 고민을 미루고 싶다. 최악의 경우 할인을 적용하지 않을 수도 있다. (미확정)

요구사항에서 회원 데이터, 할인 정책 같은 부분은 지금 결정하기 어렵다. 하지만 인터페이스를 만들고 구현체를 언제든지 갈아끼울 수 있도록 설계하면 된다.

## 회원 도메인 설계

**회원 도메인 요구사항**
- 회원을 가입하고 조회할 수 있다.
- 회원은 일반과 VIP 두 가지 등급이 있다.
- 회원 데이터는 자체 DB를 구축할 수 있고, 외부 시스템과 연동할 수 있다. (미확정)

![회원 도메인 협력 관계](/assets/20210606_205130.png)

![회원 클래스 다이어그램](/assets/20210606_205150.png)

![회원 객체 다이어그램](/assets/20210606_212026.png)

> 단축키가 헷갈리면 `Keymap`에서 확인할 수 있다. 중간에 막히면 `Alt+Enter`를 눌러보자.

```java
package hello.core.member;

import java.util.HashMap;
import java.util.Map;

public class MemoryMemberRepository implements MemberRepository{

    private static Map<Long, Member> store = new HashMap<>();

    @Override
    public void save(Member member) {
        store.put(member.getId(), member);  //저장소에 넣고
    }
    @Override
    public Member findById(Long memberId) {
        return store.get(memberId); //꺼내온다.
    }
}


```

이렇게 일일이 테스트 하면 너무 많다. 그래서 **JUnit 5**를 사용하게 된다.

```java
package hello.core.member;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

public class MemberServiceTest {

    MemberService memberService = new MemberServiceImpl();
    @Test

    void join(){

        //given(이런이런게 주어졌을때)
        Member member = new Member(1L, "memberA", Grade.VIP );



        //when(이럴떄)

        memberService.join(member);
        Member findMember = memberService.findMember(1L);
        //then(이렇게 된다.)
        Assertions.assertThat(member).isEqualTo(findMember);
    }
}



```

이렇게 테스트 코드를 작성하고 멤버가 같으면(찾으면) success를 띄운다.

`MemberRepository`는 인터페이스이고, `MemberServiceImpl`은 구현체에도 의존한다.  
즉, **추상화에도 의존하고 구현체에도 의존**하고 있는 문제가 있다.

**회원 도메인 설계의 문제점**
- 다른 저장소로 변경할 때 OCP 원칙을 잘 준수할까?
- DIP를 잘 지키고 있을까?
- 의존관계가 인터페이스 뿐만 아니라 구현까지 모두 의존하는 문제점이 있다.

## 주문과 할인 도메인 설계

**주문과 할인 정책**
- 회원은 상품을 주문할 수 있다.
- 회원 등급에 따라 할인 정책을 적용할 수 있다.
- 할인 정책은 모든 VIP는 1000원을 할인해주는 고정 금액 할인을 적용해달라. (나중에 변경 될 수 있다.)
- 할인 정책은 변경 가능성이 높다. (미확정)

![주문 도메인 협력, 역할, 책임](/assets/20210606_235940.png)

1. **주문 생성**: 클라이언트는 주문 서비스에 주문 생성을 요청한다.
2. **회원 조회**: 할인을 위해서는 회원 등급이 필요하다. 주문 서비스는 회원 저장소에서 회원을 조회한다.
3. **할인 적용**: 주문 서비스는 회원 등급에 따른 할인 여부를 할인 정책에 위임한다.
4. **주문 결과 반환**: 주문 서비스는 할인 결과를 포함한 주문 결과를 반환한다.

> 참고: 실제로는 주문 데이터를 DB에 저장하겠지만, 예제가 너무 복잡해질 수 있어서 생략하고 단순히 주문 결과를 반환한다.

![주문 도메인 클래스 다이어그램](/assets/20210607_000133.png)

---

# 5. 문제 발견 — OCP·DIP 위반

## 새로운 할인 정책 개발

> 악덕 기획자: 서비스 오픈 직전에 할인 정책을 고정 금액 할인이 아니라 좀 더 합리적인 주문 금액당 할인하는 **정률% 할인**으로 변경하고 싶어요.  
> 순진 개발자: 제가 처음부터 고정 금액 할인은 아니라고 했잖아요.  
> 악덕 기획자: 애자일 소프트웨어 개발 선언 몰라요? "계획을 따르기보다 변화에 대응하기를"  
> 순진 개발자: … (하지만 난 유연한 설계가 가능하도록 객체지향 설계 원칙을 준수했지 후후)

> 참고: 애자일 소프트웨어 개발 선언 https://agilemanifesto.org/iso/ko/manifesto.html

![RateDiscountPolicy 클래스 추가](/assets/20210607_013052.png)

![RateDiscountPolicy 테스트](/assets/20210607_014147.png)

윈도우에서 `Ctrl+Shift+T`로 JUnit 5 테스트를 생성하고 이름 뒤에 `test`를 붙여준다.

![DIP 위반 다이어그램](/assets/20210607_021847.png)
![DIP 위반 코드](/assets/20210607_021854.png)

**DIP 위반**: `OrderServiceImpl`이 `DiscountPolicy` 인터페이스뿐만 아니라 `FixDiscountPolicy` 구체 클래스도 함께 의존하고 있다.

## 정책 변경과 OCP 위반

![OCP 위반 구조](/assets/20210607_022430.png)

**중요**: `FixDiscountPolicy`를 `RateDiscountPolicy`로 변경하는 순간 `OrderServiceImpl`의 소스 코드도 함께 변경해야 한다 → **OCP 위반**.

기름차에서 전기차로 바꿨다고 면허를 갱신하지 않아도 되지만, 이 경우엔 면허를 바꿔야 하는 상황이 된 것이다.

**해결 방법**
- `OrderServiceImpl`이 `DiscountPolicy` 인터페이스에만 의존하도록 변경
- **DIP를 위반하지 않도록 인터페이스에만 의존하도록 의존관계를 변경하면 된다.**

---

# 6. AppConfig — 관심사의 분리

애플리케이션의 전체 동작 방식을 구성(config)하기 위해, **구현 객체를 생성하고 연결하는 책임**을 가지는 별도의 설정 클래스를 만든다.

철저히 인터페이스에만 의존 → **DIP 준수**.

`AppConfig`는 애플리케이션의 실제 동작에 필요한 구현 객체를 생성한다.
- `MemberServiceImpl`
- `MemoryMemberRepository`
- `OrderServiceImpl`
- `FixDiscountPolicy`

`AppConfig`는 생성한 객체 인스턴스의 참조(레퍼런스)를 생성자를 통해서 주입(연결)해준다.
- `MemberServiceImpl` ← `MemoryMemberRepository`
- `OrderServiceImpl` ← `MemoryMemberRepository`, `FixDiscountPolicy`

```java
MemberServiceImpl - 생성자 주입
package hello.core.member;
public class MemberServiceImpl implements MemberService {
private final MemberRepository memberRepository;
public MemberServiceImpl(MemberRepository memberRepository) {
this.memberRepository = memberRepository;
}
public void join(Member member) {
memberRepository.save(member);
}
public Member findMember(Long memberId) {
return memberRepository.findById(memberId);
}
}

```

이 내용들이 엄청 중요하다!

설계 변경으로 `MemberServiceImpl`은 `MemoryMemberRepository`를 의존하지 않는다. 단지 `MemberRepository` 인터페이스만 의존한다. `MemberServiceImpl`의 생성자를 통해 어떤 구현 객체를 주입할지는 오직 외부(`AppConfig`)에서 결정된다. `MemberServiceImpl`은 이제부터 의존관계에 대한 고민은 외부에 맡기고 실행에만 집중하면 된다.

```java
public class AppConfig {
public MemberService memberService() {
return new MemberServiceImpl(memberRepository());
}
public OrderService orderService() {
return new OrderServiceImpl(
memberRepository(),
discountPolicy());
}
public MemberRepository memberRepository() {
return new MemoryMemberRepository();
}
public DiscountPolicy discountPolicy() {
return new FixDiscountPolicy();
}
}

```

`new MemoryMemberRepository()` 이 부분이 중복 제거되었다. `AppConfig`를 보면 역할과 구현 클래스가 한눈에 들어온다. 애플리케이션 전체 구성을 빠르게 파악할 수 있다.

## 새로운 구조와 할인 정책 적용

정액 할인 정책을 정률% 할인 정책으로 변경: `FixDiscountPolicy` → `RateDiscountPolicy`

`AppConfig`의 등장으로 애플리케이션이 크게 **사용 영역**과, **객체를 생성하고 구성(Configuration)하는 영역**으로 분리되었다.

![사용, 구성 영역 분리](/assets/20210607_115740.png)

![RateDiscountPolicy 적용 후 구조](/assets/20210607_115817.png)

`AppConfig`에서 할인 정책 역할을 `FixDiscountPolicy` → `RateDiscountPolicy`로 변경했다. 이제 할인 정책을 변경해도 **AppConfig만 변경**하면 된다. 클라이언트 코드인 `OrderServiceImpl`을 포함해서 사용 영역의 어떤 코드도 변경할 필요가 없다.

## 지금까지의 흐름 정리

| 단계 | 내용 |
|------|------|
| 새로운 할인 정책 개발 | 다형성 덕분에 새로운 정률 할인 정책 코드를 추가하는 것 자체는 문제 없음 |
| 새로운 할인 정책 적용과 문제점 | 클라이언트 코드(주문 서비스 구현체)도 함께 변경 필요 → **DIP 위반** |
| 관심사의 분리 | 공연 기획자 `AppConfig`가 구현 객체 생성·연결 책임을 전담 |
| AppConfig 리팩터링 | 역할과 구현이 한눈에 보이도록 구조화 |
| 새로운 구조와 할인 정책 적용 | AppConfig만 변경하면 사용 영역은 변경 불필요 |

## 좋은 객체 지향 설계의 5가지 원칙 적용 (AppConfig 관점)

### SRP — 단일 책임 원칙

한 클래스는 하나의 책임만 가져야 한다.

- 기존: 클라이언트 객체가 구현 객체 생성·연결·실행을 모두 담당
- 개선: **구현 객체 생성·연결**은 `AppConfig`가 담당, **클라이언트 객체**는 실행만 담당

### DIP — 의존관계 역전 원칙

> "프로그래머는 추상화에 의존해야지, 구체화에 의존하면 안된다."

- `OrderServiceImpl`은 `DiscountPolicy` 추상화 인터페이스에만 의존하도록 변경
- `AppConfig`가 `FixDiscountPolicy` 객체 인스턴스를 생성해서 클라이언트 코드에 의존관계를 주입

### OCP

> 소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.

- 애플리케이션을 사용 영역과 구성 영역으로 나눔
- `AppConfig`가 의존관계를 `FixDiscountPolicy` → `RateDiscountPolicy`로 변경해서 주입하므로 **클라이언트 코드는 변경하지 않아도 됨**
- 소프트웨어 요소를 새롭게 확장해도 사용 영역의 변경은 닫혀 있다!

---

# 7. IoC, DI, 그리고 컨테이너

## 제어의 역전 IoC (Inversion of Control)

기존 프로그램은 클라이언트 구현 객체가 스스로 필요한 서버 구현 객체를 생성하고, 연결하고, 실행했다.

`AppConfig` 등장 이후 구현 객체는 자신의 로직을 실행하는 역할만 담당하고, **프로그램의 제어 흐름은 `AppConfig`가 가져간다**. `OrderServiceImpl`조차도 `AppConfig`가 생성하며, 어떤 구현 객체들이 실행될지는 모른 채 묵묵히 자신의 로직만 실행한다.

> 이렇듯 프로그램의 제어 흐름을 직접 제어하는 것이 아니라 외부에서 관리하는 것을 **제어의 역전(IoC)**이라 한다.

(다른 관점의 정의) IoC란 메서드나 객체의 호출 작업을 **개발자가 결정하지 않고 외부(스프링 컨테이너)에서 결정**하는 것을 의미한다.

## 프레임워크 vs 라이브러리

- **프레임워크**: 내가 작성한 코드를 제어하고 대신 실행한다. (예: JUnit)
- **라이브러리**: 내가 작성한 코드가 직접 제어의 흐름을 담당한다.

## 의존관계 주입 DI (Dependency Injection)

`OrderServiceImpl`은 `DiscountPolicy` 인터페이스에 의존한다. 실제 어떤 구현 객체가 사용될지는 모른다.

IoC가 일어날 때 스프링이 내부 객체들 간의 관계를 관리하는 기법이 DI다.

- 의존 객체를 직접 생성하거나 제어하지 않고, **외부에서 결정해 연결**시킨다.
- 자바에서는 일반적으로 **인터페이스**를 이용해 유연하게 처리한다.
- 결과적으로 **모듈 간 결합도가 낮아지고 유연성이 높아진다.**

> **핵심**: DI가 없으면 의존 설정이 불가능하다. DI는 **객체 간의 결합을 느슨하게** 만든다는 점이 중요하다.

### 일체형 vs 조립형으로 이해하는 DI

![일체형 vs 조립형](/assets/20210623_030304.png)

- **왼쪽(일체형)**: 클래스 A가 클래스 B를 직접 생성해서 사용한다. A가 B를 부품으로 소유하는 **has-a 관계**이며, 이를 **Dependency(종속성, 부품 관계)**라 한다.
- **오른쪽(조립형)**: 외부에서 B를 생성해서 A에 주입(세팅)한다. A는 직접 생성하지 않는다.

![일체형 코드](/assets/20210623_031618.png)

![조립형 코드](/assets/20210623_031636.png)

| 방식 | 결합도 | 부품 교체 |
|------|--------|-----------|
| **일체형** | 높음 | 어려움 |
| **조립형** | 낮음(느슨한 결합) | 쉬움 |

조립형이 결합력이 낮아 부품을 쉽게 교체할 수 있다. 부품(Dependency)을 꽂는 작업을 **Injection**이라 하며, 이 둘을 합쳐 **DI(Dependency Injection)**라 한다.

- **장점**: 부품을 쉽게 교체 가능
- **단점**: 부품을 직접 조립해야 하는 번거로움 → 스프링이 이 조립을 대신 처리해준다.

![DI 주입 방법 개요](/assets/20210623_032747.png)

DI 주입 방법:
- **세터(Setter) 주입**: `setXxx()` 메서드로 주입
- **생성자(Constructor) 주입**: 생성자 파라미터로 주입

### 의존관계와 결합도

엔터프라이즈 환경 = **분산환경**. 클래스와 클래스 사이의 **의존도(결합도)**를 낮추는 것이 핵심이다.

![클래스 A-B-C 의존관계 다이어그램](/assets/20210426_125220.png)

B를 가져다 쓰는 쪽이 A라면, B가 바뀌면 A도 바뀌어야 할 수 있다. C도 마찬가지다.

## 정적/동적 의존관계

의존관계는 두 가지로 분리해서 생각해야 한다.

### 정적인 클래스 의존관계

클래스가 사용하는 import 코드만 보고 의존관계를 쉽게 판단할 수 있다. 애플리케이션을 실행하지 않아도 분석할 수 있다.

![정적인 클래스 의존 관계 다이어그램](/assets/20210607_134212.png)

### 동적인 객체 인스턴스 의존 관계

애플리케이션 실행 시점에 실제 생성된 객체 인스턴스의 참조가 연결된 의존 관계다.

![동적인 객체 인스턴스 의존 관계](/assets/20210607_134510.png)

애플리케이션 실행 시점(런타임)에 외부에서 실제 구현 객체를 생성하고 클라이언트에 전달해서 클라이언트와 서버의 실제 의존관계가 연결되는 것을 **의존관계 주입**이라 한다.

- 의존관계 주입을 사용하면 클라이언트 코드를 변경하지 않고, 클라이언트가 호출하는 대상의 타입 인스턴스를 변경할 수 있다.
- 정적인 클래스 의존관계를 변경하지 않고, 동적인 객체 인스턴스 의존관계를 쉽게 변경할 수 있다.

## IoC 컨테이너, DI 컨테이너

`AppConfig`처럼 객체를 생성하고 관리하면서 의존관계를 연결해 주는 것을 **IoC 컨테이너** 또는 **DI 컨테이너**라 한다. 의존관계 주입에 초점을 맞추어 최근에는 주로 **DI 컨테이너**라 한다.

이용되는 쪽(B, C)이 변동되면 그걸 쓰는 쪽(A)도 변경해야 하는 문제를 **컨테이너**가 해결한다.

![컨테이너 의존관계 중재 구조](/assets/20210426_125912.png)

컨테이너가 제공하는 객체가 활용되지 않으면 아무것도 동작하지 않는다.

**톰캣(Tomcat)**도 컨테이너다. 클라이언트가 `HelloServlet`을 요청하면 서블릿을 직접 `new` 하지 않아도 톰캣이 내부에서 생성해 공급한다.

![IoC 컨테이너 객체 공급 흐름 (인력사무소 비유)](/assets/20210426_130703.png)

서비스를 이용하는 최종 사용자는 A·B를 신경 쓰지 않고, 중간의 **컨테이너(인력사무소)**에 요청만 하면 된다.

**XML 설정 파일(bean 설정파일)**: 컨테이너가 미리 생성해서 대기시킬 객체들의 정보가 담겨 있다. 컨테이너가 준비할 객체 a, b, c, d, e, f, g가 모두 XML 문서에 명시되어야 한다.

> Spring이 제공하는 컨테이너는 객체를 미리 만들어 대기시키고 공급한다 — "공급기"라는 용어를 쓰기도 한다.

## IOC는 왜 "제어의 역전"인가 — 생성 역순 원리

주문서 역할을 하는 게 필요한데, 스프링에서는 **XML**과 **어노테이션(annotation)**이 그 역할을 한다.

![주문서(XML/어노테이션)](/assets/20210623_033556.png)

스프링도 주문서(XML/어노테이션)에 입력된 내용을 담을 그릇이 필요하다. 이를 **IOC 컨테이너(Inversion of Control Container)**라 한다.

> IOC는 DI의 상위 개념이다.

![IOC 생성 역순 원리](/assets/20210623_034915.png)

- **일체형**: A가 B를 생성하고, B가 C를 생성한다. 안쪽 구조를 몰라도 A를 만들면 B·C가 순서대로 만들어진다.
- **조립형(결합형)**: **작은 부품(D)부터 먼저 만들어진다.** 즉, 생성 순서가 역순이 된다 → **Inversion of Control(제어의 역전)**

부품을 담기만 하면 Dependency Container, 부품이 결합까지 되어 담겨있으므로 **IOC 컨테이너**라 부른다.

---

# 8. 스프링 컨테이너

`@Bean`을 넣으면 스프링 컨테이너에 등록이 된다.

`ApplicationContext`를 스프링 컨테이너라 한다. `ApplicationContext`는 인터페이스이며, XML 기반 또는 애노테이션 기반의 자바 설정 클래스로 만들 수 있다.

`new AnnotationConfigApplicationContext(AppConfig.class);`

> 참고: 더 정확히는 스프링 컨테이너를 부를 때 `BeanFactory`, `ApplicationContext`로 구분해서 이야기한다. `BeanFactory`를 직접 사용하는 경우는 거의 없으므로 일반적으로 `ApplicationContext`를 스프링 컨테이너라 한다.

이제부터 스프링 빈으로 컨테이너에 넣어서 관리하게 된다.

## Spring IOC 컨테이너 활용

작성한 지시서(주문서)를 읽어서 빈을 생성하고 활용한다.

![지시서를 읽어 빈 생성](/assets/20210623_114554.png)

**ApplicationContext**: 스프링에서 DI 지시서를 읽어 조립해주는 구체적인 객체다. 인터페이스이며 여러 구현체가 있고, 지시서를 어떻게 전달하느냐에 따라 달라진다. 가장 보편적인 것은 `ClassPathXmlApplicationContext`다.

## 스프링 컨테이너의 생성 과정

### 1. 스프링 컨테이너 생성

![스프링 컨테이너 생성](/assets/20210607_174833.png)

`new AnnotationConfigApplicationContext(AppConfig.class)` 호출 시 `AppConfig.class`를 구성 정보로 지정한다.

### 2. 스프링 빈 등록

![스프링 빈 등록](/assets/20210607_174954.png)

스프링 컨테이너는 파라미터로 넘어온 설정 클래스 정보를 사용해서 스프링 빈을 등록한다.

- **빈 이름 기본 전략**: 메서드 이름 사용
- **빈 이름 직접 지정**: `@Bean(name="memberService2")`

> 주의: 빈 이름은 항상 다른 이름을 부여해야 한다. 같은 이름을 부여하면 다른 빈이 무시되거나, 기존 빈을 덮어버리거나, 오류가 발생한다.

### 3. 스프링 빈 의존관계 설정 — 준비

![빈 의존관계 설정 준비](/assets/20210607_183412.png)

### 4. 스프링 빈 의존관계 설정 — 완료

![빈 의존관계 설정 완료](/assets/20210607_183453.png)

스프링 컨테이너는 설정 정보를 참고해서 의존관계를 주입(DI)한다.

## 컨테이너에 등록된 모든 빈 조회

### 모든 빈 출력하기

- `ac.getBeanDefinitionNames()`: 스프링에 등록된 모든 빈 이름을 조회한다.
- `ac.getBean()`: 빈 이름으로 빈 객체(인스턴스)를 조회한다.

**애플리케이션 빈 출력하기**: `getRole()`로 구분할 수 있다.
- `ROLE_APPLICATION`: 일반적으로 사용자가 정의한 빈
- `ROLE_INFRASTRUCTURE`: 스프링이 내부에서 사용하는 빈

**스프링 빈 조회 - 기본**
- `ac.getBean(빈이름, 타입)`
- `ac.getBean(타입)`
- 조회 대상이 없으면 예외 발생: `NoSuchBeanDefinitionException: No bean named 'xxxxx' available`

### 스프링 빈 조회 — 상속 관계

부모 타입으로 조회하면, 자식 타입도 함께 조회한다. 따라서 모든 자바 객체의 최고 부모인 `Object` 타입으로 조회하면, 모든 스프링 빈을 조회한다.

![빈 상속 관계 조회](/assets/20210607_193627.png)

---

# 9. BeanFactory와 ApplicationContext

![BeanFactory와 ApplicationContext 계층 구조](/assets/20210607_195042.png)

`BeanFactory`에 우리가 사용했던 기능(`getBean` 등)이 다 들어있다. `ApplicationContext`는 `BeanFactory`의 기능을 모두 상속받아서 제공한다.

**BeanFactory**
- 스프링 컨테이너의 최상위 인터페이스
- 스프링 빈을 관리하고 조회하는 역할 (`getBean()` 제공)

**ApplicationContext**
- `BeanFactory` 기능을 모두 상속받아서 제공
- 빈 관리·검색 기능 외에 수많은 부가기능을 제공

![ApplicationContext 부가 기능](/assets/20210607_195053.png)

| 부가 기능 | 설명 |
|-----------|------|
| **메시지소스** (국제화) | 한국에서 들어오면 한국어, 영어권에서 들어오면 영어로 출력 |
| **환경변수** | 로컬, 개발, 운영 등을 구분해서 처리 |
| **애플리케이션 이벤트** | 이벤트를 발행하고 구독하는 모델을 편리하게 지원 |
| **리소스 조회** | 파일, 클래스패스, 외부 등에서 리소스를 편리하게 조회 |

**정리**
- `ApplicationContext`는 `BeanFactory`의 기능을 상속받는다.
- `ApplicationContext`는 빈 관리 기능 + 편리한 부가 기능을 제공한다.
- `BeanFactory`를 직접 사용할 일은 거의 없다. 부가 기능이 포함된 `ApplicationContext`를 사용한다.
- `BeanFactory`나 `ApplicationContext`를 스프링 컨테이너라 한다.

## 빈의 종류와 컨테이너 개념 요약

| 빈 종류 | 특징 |
|---------|------|
| **JavaBeans** | 재사용 가능한 컴포넌트, 상태 보유 |
| **Servlet & JSP Beans** | MVC 모델, EL·Scope 활용, JSP 컨테이너 관리 |
| **EJB(Enterprise Java Beans)** | 복잡한 규칙, EJB 컨테이너 관리 |
| **Spring Bean** | **POJO(Plain Old Java Object)**, 단순·독립적, Spring 컨테이너 관리 |

![Spring Bean과 POJO](/assets/20220209_000017_7gcfn6nxs.png)

![BeanFactory와 ApplicationContext 관계](/assets/20220209_011255.png)

| 개념 | 설명 |
|------|------|
| **Bean** | Spring Container가 관리하는 객체 |
| **Spring Container** | Bean 저장소. Bean을 생성·소멸·연결하여 관리 |
| **BeanFactory** | 빈 생성·연결 등 기본 기능 정의 |
| **ApplicationContext** | BeanFactory를 확장해 여러 부가 기능 정의 |

### ApplicationContext의 종류

![ApplicationContext 종류](/assets/20220209_011529.png)

### Root AC와 Servlet AC

![Root AC와 Servlet AC](/assets/20220209_012030.png)

![톰캣 서버 구조](/assets/20220209_014236.png)

톰캣 서버 구조: **톰캣 엔진** 안에 호스트별 영역이 있고, 그 안에 모듈별 **Context**가 존재한다.

![모듈별 Context](/assets/20220209_014302.png)

![Context를 감싸는 ApplicationContext](/assets/20220209_015922.png)

Context를 감싸고 있는 것이 **ApplicationContext**다.

---

# 10. 다양한 설정 형식과 BeanDefinition

## 다양한 설정 형식 지원

스프링 컨테이너는 다양한 형식의 설정 정보를 받아들일 수 있게 유연하게 설계되어 있다.

- 자바 코드, XML, Groovy 등

![다양한 설정 형식 지원 구조](/assets/20210607_200859.png)

**애노테이션 기반 자바 코드 설정**

`new AnnotationConfigApplicationContext(AppConfig.class)`

**XML 설정 사용**: 최근에는 스프링 부트를 많이 사용하면서 XML 기반 설정은 잘 사용하지 않는다. 아직 많은 레거시 프로젝트들이 XML로 되어 있고, 컴파일 없이 빈 설정 정보를 변경할 수 있는 장점도 있으므로 배워두는 것도 좋다. `GenericXmlApplicationContext`를 사용하면서 xml 설정 파일을 넘기면 된다.

### DI 주입 방법 3가지 (XML / Properties / Java)

| 방법 | 설명 |
|------|------|
| 1. XML로 주입 | `applicationContext.xml` 등에서 빈 설정 |
| 2. Properties로 주입 | `application.properties` 파일로 설정 |
| 3. Java로 주입 | `@Configuration` 클래스로 설정 |

아래는 Spring Boot의 `application.properties` 예시다. 코드 내 주석으로 각 항목을 설명하고 있다.

```
#port
server.port=80
#db setting--> connection pool(이거로 풀을 만들어준다.)

spring.datasource.url=jdbc:mysql://127.0.0.1:3306/scott?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

#mybatis setting(type alias, mapper file)
mybatis.type-aliases-package=com.mvc.vo
mybatis.mapper-locations=classpath:/mapper/CustomerMapper.xml

#log
logging.level.com.mvc.dao=trace(여기 들어있는 dao가 실행되면 로그가 실행이 된다. trace로 하면 거의 모든 경우에 있어 로그가 남는다.)

여기서 jsp세팅은 하지 않았다.

하나 빠졌는데 mybatis에서

```

![application.properties·MyBatis 설정](/assets/20210723_043655.png)

![MyBatis classpath 설정](/assets/20210723_043618.png)

`classpath` 경로는 `src/main/java`를 가리킨다. `webapp` 안에 만들었으면 필요 없지만, 위 경로에 설정했다면 `classpath` 설정이 필요하다.

`**`는 뎁스에 상관없이 어떤 경로가 와도 되고, `*.xml`은 그 안의 모든 XML 파일을 읽겠다는 의미다.

![Mapper 경로 지정](/assets/20210723_044406.png)

이 경우는 config 파일과 Mapper 파일이 각각 어디 있는지를 지정한다.

![typeAlias 설정](/assets/20210723_044512.png)

`typeAlias`로 기본값을 `com.ssafy.guestbook.model`에 있는 클래스로 사용하겠다는 설정이다.

## 스프링 빈 설정 메타 정보 — BeanDefinition

스프링이 다양한 설정 형식을 지원하는 중심에는 `BeanDefinition`이라는 추상화가 있다. 역할과 구현을 개념적으로 나눈 것이다.

- XML을 읽어서 `BeanDefinition`을 만들면 된다.
- 자바 코드를 읽어서 `BeanDefinition`을 만들면 된다.
- 스프링 컨테이너는 자바 코드인지, XML인지 몰라도 된다. 오직 `BeanDefinition`만 알면 된다.

![BeanDefinition 추상화 구조](/assets/20210607_203707.png)

![BeanDefinition Reader 구조](/assets/20210607_203713.png)

- `AnnotationConfigApplicationContext`는 `AnnotatedBeanDefinitionReader`를 사용해서 `AppConfig.class`를 읽고 `BeanDefinition`을 생성한다.
- `GenericXmlApplicationContext`는 `XmlBeanDefinitionReader`를 사용해서 `appConfig.xml` 설정 정보를 읽고 `BeanDefinition`을 생성한다.

### BeanDefinition 정보

| 항목 | 설명 |
|------|------|
| `BeanClassName` | 생성할 빈의 클래스 명 |
| `factoryBeanName` | 팩토리 역할의 빈을 사용할 경우 이름 (예: `appConfig`) |
| `factoryMethodName` | 빈을 생성할 팩토리 메서드 지정 (예: `memberService`) |
| `Scope` | 싱글톤(기본값) |
| `lazyInit` | 실제 빈을 사용할 때까지 최대한 생성을 지연처리 하는지 여부 |
| `InitMethodName` | 빈을 생성하고 의존관계 적용 뒤 호출되는 초기화 메서드 명 |
| `DestroyMethodName` | 빈의 생명주기가 끝나서 제거하기 직전에 호출되는 메서드 명 |
| `Constructor arguments, Properties` | 의존관계 주입에서 사용 |

### 정리

`BeanDefinition`을 직접 생성해서 스프링 컨테이너에 등록할 수도 있지만, 실무에서 직접 정의하거나 사용할 일은 거의 없다. 스프링이 다양한 형태의 설정 정보를 `BeanDefinition`으로 추상화해서 사용하는 것 정도만 이해하면 된다.

---

# 11. 싱글톤 컨테이너

## 웹 애플리케이션과 싱글톤

스프링은 태생이 기업용 온라인 서비스 기술을 지원하기 위해 탄생했다. 웹 애플리케이션은 보통 여러 고객이 동시에 요청을 한다.

![고객 요청마다 객체 생성 문제](/assets/20210607_211000.png)

## 싱글톤 패턴

- 클래스의 인스턴스가 **딱 1개만 생성**되는 것을 보장하는 디자인 패턴이다.
- `private` 생성자를 사용해서 외부에서 임의로 `new` 키워드를 사용하지 못하도록 막아야 한다.

```java


```

`private`으로 `new` 키워드를 막아두었다. 호출할 때마다 같은 객체 인스턴스를 반환하는 것을 확인할 수 있다.

**싱글톤 패턴 문제점**
- 싱글톤 패턴을 구현하는 코드 자체가 많이 들어간다.
- 의존관계상 클라이언트가 구체 클래스에 의존한다. **DIP 위반**.
- 클라이언트가 구체 클래스에 의존해서 **OCP 원칙을 위반**할 가능성이 높다.
- 테스트하기 어렵다.
- 내부 속성을 변경하거나 초기화 하기 어렵다.
- `private` 생성자로 자식 클래스를 만들기 어렵다.
- 결론적으로 유연성이 떨어진다. 안티패턴으로 불리기도 한다.

## 싱글턴 컨테이너

스프링 컨테이너는 싱글톤 패턴의 문제점을 해결하면서, 객체 인스턴스를 싱글톤(1개만 생성)으로 관리한다. 지금까지 학습한 스프링 빈이 바로 싱글톤으로 관리되는 빈이다.

스프링 컨테이너는 싱글톤 컨테이너 역할을 하며, 이렇게 싱글톤 객체를 생성하고 관리하는 기능을 **싱글톤 레지스트리**라 한다.

- 싱글톤 패턴을 위한 지저분한 코드가 들어가지 않아도 된다.
- DIP, OCP, 테스트, `private` 생성자로부터 자유롭게 싱글톤을 사용할 수 있다.

스프링 컨테이너를 사용하는 테스트 코드:

```java
@Test
@DisplayName("스프링 컨테이너와 싱글톤")
void springContainer() {
ApplicationContext ac = new
AnnotationConfigApplicationContext(AppConfig.class);
//1. 조회: 호출할 때 마다 같은 객체를 반환
MemberService memberService1 = ac.getBean("memberService",
MemberService.class);
//2. 조회: 호출할 때 마다 같은 객체를 반환
MemberService memberService2 = ac.getBean("memberService",
MemberService.class);
//참조값이 같은 것을 확인
System.out.println("memberService1 = " + memberService1);
System.out.println("memberService2 = " + memberService2);
//memberService1 == memberService2
assertThat(memberService1).isSameAs(memberService2);

}
```

### 싱글톤 컨테이너 적용 후

![싱글톤 컨테이너 적용 후](/assets/20210607_220729.png)

스프링은 99% 싱글턴 방식을 쓴다.

스프링 컨테이너 덕분에 고객의 요청이 올 때마다 객체를 생성하는 것이 아니라, 이미 만들어진 객체를 공유해서 효율적으로 재사용할 수 있다.

> 참고: 스프링의 기본 빈 등록 방식은 싱글톤이지만, 싱글톤 방식만 지원하는 것은 아니다. 요청할 때마다 새로운 객체를 생성해서 반환하는 기능도 제공한다. 자세한 내용은 뒤에 빈 스코프에서 설명한다.

## 싱글톤 방식의 주의점

싱글톤 방식은 여러 클라이언트가 하나의 같은 객체 인스턴스를 공유하기 때문에, 싱글톤 객체는 **상태를 유지(stateful)하게 설계하면 안된다**.

**무상태(stateless)로 설계해야 한다!**
- 특정 클라이언트에 의존적인 필드가 있으면 안된다.
- 특정 클라이언트가 값을 변경할 수 있는 필드가 있으면 안된다.
- 가급적 읽기만 가능해야 한다.
- 필드 대신에 자바에서 공유되지 않는 **지역변수, 파라미터, ThreadLocal** 등을 사용해야 한다.
- **스프링 빈의 필드에 공유 값을 설정하면 정말 큰 장애가 발생할 수 있다!!!**

```java
package hello.core.singleton;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import
        org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
public class StatefulServiceTest {
    @Test
    void statefulServiceSingleton() {
        ApplicationContext ac = new
                AnnotationConfigApplicationContext(TestConfig.class);
        StatefulService statefulService1 = ac.getBean("statefulService",
                StatefulService.class);
        StatefulService statefulService2 = ac.getBean("statefulService",
                StatefulService.class);
//ThreadA: A사용자 10000원 주문
        statefulService1.order("userA", 10000);
//ThreadB: B사용자 20000원 주문
        statefulService2.order("userB", 20000);
//ThreadA: 사용자A 주문 금액 조회
        int price = statefulService1.getPrice();
//ThreadA: 사용자A는 10000원을 기대했지만, 기대와 다르게 20000원 출력
        System.out.println("price = " + price);
        Assertions.assertThat(statefulService1.getPrice()).isEqualTo(20000);
    }
    static class TestConfig {
        @Bean
        public StatefulService statefulService() {
            return new StatefulService();
        }
    }
}

```

## @Configuration과 싱글톤

`@Configuration`은 싱글턴을 위해 존재한다.

![@Configuration 싱글톤 보장](/assets/20210608_001901.png)

예상대로라면 3번 호출이 되어야 할 것 같은데, 실제로는 1번만 호출된다. 스프링은 어떻게 해서든 싱글턴을 보장하려고 한다.

## @Configuration과 바이트코드 조작의 마법

스프링 컨테이너는 싱글톤 레지스트리다. 그런데 자바 코드를 보면 분명 3번 호출되어야 하는 것이 맞다. 그래서 스프링은 클래스의 바이트코드를 조작하는 라이브러리를 사용한다. 모든 비밀은 `@Configuration`을 적용한 `AppConfig`에 있다.

```java
@Test
void configurationDeep() {
ApplicationContext ac = new
AnnotationConfigApplicationContext(AppConfig.class);
//AppConfig도 스프링 빈으로 등록된다.
AppConfig bean = ac.getBean(AppConfig.class);
System.out.println("bean = " + bean.getClass());
//출력: bean = class hello.core.AppConfig$$EnhancerBySpringCGLIB$$bd479d70
}

```

`AppConfig` 스프링 빈을 조회해서 클래스 정보를 출력하면:

> `bean = class hello.core.AppConfig$$EnhancerBySpringCGLIB$$bd479d70`

순수한 클래스라면 `class hello.core.AppConfig`이 출력되어야 한다. 하지만 클래스명에 `xxxCGLIB`가 붙은 것은 스프링이 **CGLIB**라는 바이트코드 조작 라이브러리를 사용해서 `AppConfig` 클래스를 상속받은 임의의 다른 클래스를 만들고, 그 클래스를 스프링 빈으로 등록한 것이다.

![CGLIB 동작 구조](/assets/20210608_010256.png)

그 임의의 다른 클래스가 바로 싱글톤을 보장해준다.

`AppConfig@CGLIB` 예상 코드:

```java
@Bean
public MemberRepository memberRepository() {
if (memoryMemberRepository가 이미 스프링 컨테이너에 등록되어 있으면?) {
return 스프링 컨테이너에서 찾아서 반환;
} else { //스프링 컨테이너에 없으면
기존 로직을 호출해서 MemoryMemberRepository를 생성하고 스프링 컨테이너에 등록
return 반환
}
}
```

`@Bean`이 붙은 메서드마다 이미 스프링 빈이 존재하면 존재하는 빈을 반환하고, 스프링 빈이 없으면 생성해서 등록하고 반환하는 코드가 동적으로 만들어진다. 덕분에 싱글톤이 보장된다.

`@Configuration`을 적용하지 않고, `@Bean`만 적용하면 어떻게 될까?

```java
//@Configuration 삭제
public class AppConfig {
}
```

이제 똑같이 실행해보자.

```java
bean = class hello.core.AppConfig
```

이 출력 결과로 `AppConfig`가 CGLIB 기술 없이 순수한 `AppConfig`로 스프링 빈에 등록된 것을 확인할 수 있다.

```java
call AppConfig.memberService
call AppConfig.memberRepository
call AppConfig.orderService
call AppConfig.memberRepository
call AppConfig.memberRepository
```

`MemberRepository`가 총 3번 호출된다. 1번은 `@Bean`에 의해 스프링 컨테이너에 등록하기 위해서이고, 2번은 각각 `memberRepository()`를 호출하면서 발생한 코드다.

```java
memberService -> memberRepository =
hello.core.member.MemoryMemberRepository@6239aba6
orderService -> memberRepository =
hello.core.member.MemoryMemberRepository@3e6104fc
memberRepository = hello.core.member.MemoryMemberRepository@12359a82


```

당연히 인스턴스가 다르고 테스트도 실패한다.

확인이 끝났으면 `@Configuration`이 동작하도록 다시 돌려놓자.

**정리**
- `@Bean`만 사용해도 스프링 빈으로 등록되지만, 싱글톤을 보장하지 않는다.
- `memberRepository()`처럼 의존관계 주입이 필요해서 메서드를 직접 호출할 때 싱글톤을 보장하지 않는다.
- **스프링 설정 정보는 항상 `@Configuration`을 사용하자.**

## 빈 스코프 — Singleton vs Prototype

스프링 컨테이너가 객체를 생성하면 기본이 **singleton** 방식이다. 매번 새 객체가 필요하다면 `scope="prototype"`을 지정한다.

`<bean id="c" class="com.test.Car" scope="prototype"/>`

---

# 12. 컴포넌트 스캔과 의존관계 자동 주입

## 컴포넌트 스캔과 의존관계 자동 주입 시작하기

지금까지는 `@Bean`이나 XML `<bean>`으로 스프링 빈을 직접 나열해 등록했다. 등록해야 할 스프링 빈이 수십, 수백 개가 되면 일일이 등록하기도 귀찮고, 누락하는 문제도 발생한다.

그래서 스프링은 설정 정보가 없어도 자동으로 스프링 빈을 등록하는 **컴포넌트 스캔(Component Scan)** 기능을 제공한다. 또 의존관계도 자동으로 주입하는 **`@Autowired`** 기능도 제공한다.

### 1. @ComponentScan

![@ComponentScan 동작](/assets/20210608_105509.png)

`@ComponentScan`은 `@Component`가 붙은 모든 클래스를 스프링 빈으로 등록한다.

- **빈 이름 기본 전략**: 클래스명 사용, 맨 앞글자만 소문자 (`MemberServiceImpl` → `memberServiceImpl`)
- **빈 이름 직접 지정**: `@Component("memberService2")`

### 2. @Autowired 의존관계 자동 주입

![@Autowired 자동 주입](/assets/20210608_105915.png)

생성자에 `@Autowired`를 지정하면, 스프링 컨테이너가 자동으로 해당 스프링 빈을 찾아서 주입한다. 기본 조회 전략은 **타입이 같은 빈**을 찾아서 주입한다. `getBean(MemberRepository.class)`와 동일하다고 이해하면 된다.

![@Autowired 다중 파라미터](/assets/20210608_105937.png)

생성자에 파라미터가 많아도 다 찾아서 자동으로 주입한다.

## 탐색 위치와 기본 스캔 대상

**탐색할 패키지의 시작 위치 지정**

모든 자바 클래스를 다 컴포넌트 스캔하면 시간이 오래 걸린다. 꼭 필요한 위치부터 탐색하도록 시작 위치를 지정할 수 있다.

`@ComponentScan(basePackages = "hello.core", }`

- `basePackages`: 탐색할 패키지의 시작 위치를 지정한다. 이 패키지를 포함해서 하위 패키지를 모두 탐색한다.
- `basePackages = {"hello.core", "hello.service"}` 이렇게 여러 시작 위치를 지정할 수도 있다.
- `basePackageClasses`: 지정한 클래스의 패키지를 탐색 시작 위치로 지정한다.
- 지정하지 않으면 `@ComponentScan`이 붙은 설정 정보 클래스의 패키지가 시작 위치가 된다.

**권장하는 방법**: 패키지 위치를 지정하지 않고, 설정 정보 클래스의 위치를 **프로젝트 최상단**에 두는 것이다. 최근 스프링 부트도 이 방법을 기본으로 제공한다.

예를 들어 프로젝트 구조가 다음과 같으면:

`com.hello` / `com.hello.serivce` / `com.hello.repository`

`com.hello` 프로젝트 시작 루트에 `AppConfig` 같은 메인 설정 정보를 두고, `@ComponentScan` 애노테이션을 붙이고, `basePackages` 지정은 생략한다. 이렇게 하면 `com.hello`를 포함한 하위는 모두 자동으로 컴포넌트 스캔의 대상이 된다.

> 참고로 스프링 부트를 사용하면 `@SpringBootApplication`을 이 프로젝트 시작 루트 위치에 두는 것이 관례이다. (이 설정 안에 바로 `@ComponentScan`이 들어있다!)

- `includeFilters`에 `MyIncludeComponent` 애노테이션을 추가해서 `BeanA`가 스프링 빈에 등록된다.
- `excludeFilters`에 `MyExcludeComponent` 애노테이션을 추가해서 `BeanB`는 스프링 빈에 등록되지 않는다.

## FilterType 옵션

| FilterType | 설명 | 예시 |
|------------|------|------|
| `ANNOTATION` | 기본값, 애노테이션을 인식해서 동작 | `org.example.SomeAnnotation` |
| `ASSIGNABLE_TYPE` | 지정한 타입과 자식 타입을 인식해서 동작 | `org.example.SomeClass` |
| `ASPECTJ` | AspectJ 패턴 사용 | `org.example..*Service+` |
| `REGEX` | 정규 표현식 | `org\.example\.Default.*` |
| `CUSTOM` | `TypeFilter` 인터페이스를 구현해서 처리 | `org.example.MyTypeFilter` |

예를 들어서 `BeanA`도 빼고 싶으면 다음과 같이 추가하면 된다.

```java
@ComponentScan(
includeFilters = {
@Filter(type = FilterType.ANNOTATION, classes =
MyIncludeComponent.class),
},
excludeFilters = {
@Filter(type = FilterType.ANNOTATION, classes =
MyExcludeComponent.class),
@Filter(type = FilterType.ASSIGNABLE_TYPE, classes = BeanA.class)
}
)
```

> 참고: `@Component`면 충분하기 때문에, `includeFilters`를 사용할 일은 거의 없다. `excludeFilters`는 여러 가지 이유로 간혹 사용할 때가 있지만 많지는 않다. 최근 스프링 부트는 컴포넌트 스캔을 기본으로 제공하는데, 스프링의 기본 설정에 최대한 맞추어 사용하는 것을 권장한다.

## 컴포넌트 스캔의 원리 — 스테레오타입 어노테이션

`@Component` 어노테이션이 있으면 스프링 빈으로 **자동 등록**된다. `@Controller`가 자동 등록되는 이유도 컴포넌트 스캔 때문이다.

`@Component`를 포함하는 어노테이션은 모두 스프링 빈으로 자동 등록된다.

| 어노테이션 | 역할 |
|------------|------|
| `@Controller` | 웹 계층 컨트롤러 |
| `@Service` | 비즈니스 로직 서비스 |
| `@Repository` | 데이터 접근 리포지토리 |

![컴포넌트 스캔과 스테레오타입 어노테이션](/assets/20210605_190342.png)

스프링이 올라올 때 컴포넌트 관련 어노테이션이 있으면 객체를 생성해서 등록하고, `@Autowired`로 연관관계(의존관계)를 연결한다.

`@Controller`, `@Service`, `@Repository`는 모두 Bean 객체를 생성하지만, **역할을 명시적으로 구분**하기 위해 분리해서 사용한다. 부모 어노테이션인 `@Component`를 써도 동작하지만 가시성이 낮아 잘 사용하지 않는다.

| 어노테이션 | 레이어 | 역할 |
|------------|--------|------|
| **`@Controller`** | 프레젠테이션 | 웹 요청·응답 처리, View 반환 |
| **`@Service`** | 서비스 | 내부 자바 비즈니스 로직 처리 |
| **`@Repository`** | 퍼시스턴스 | DB·파일 등 외부 I/O 처리 |

## 중복 등록과 충돌

컴포넌트 스캔에서 같은 빈 이름을 등록하면 어떻게 될까?

| 상황 | 결과 |
|------|------|
| **자동 빈 등록 vs 자동 빈 등록** | 스프링이 오류 발생 (`ConflictingBeanDefinitionException`) |
| **수동 빈 등록 vs 자동 빈 등록** | 수동 빈 등록이 우선권을 가진다 (수동 빈이 자동 빈을 오버라이딩) |

---

# 13. 스프링 빈을 등록하는 2가지 방법 (실전)

지금까지 서비스와 리포지토리를 만들고 멤버 객체를 생성해서, 서비스를 통해 멤버를 저장하고 리포지토리에 보관하며 테스트를 작성했다. 이번엔 화면을 붙인다.

```
private final MemberService memberService = new MemberService();

```

이렇게 하면 여러 멤버 컨트롤러가 각자 인스턴스를 만들게 된다. 스프링 컨테이너에 등록하면 **하나의 빈**만 등록되어 공유할 수 있다.

![MemberService 주입 오류](/assets/20210605_184516.png)

`MemberService`를 찾을 수 없다는 오류가 발생한다.

`@Autowired`는 스프링 컨테이너에서 빈을 찾아 주입한다. 그런데 `MemberService`는 순수 자바 클래스라 스프링이 인식하지 못한다. **`@Service`** 어노테이션을 붙여야 스프링 빈으로 등록된다.

- 스프링이 시작될 때 **스프링 컨테이너**가 생성되며, `@Controller` 어노테이션이 붙은 클래스의 객체를 생성해서 관리한다.
- **Controller → Service → Repository** 는 정형화된 3계층 패턴이다.
- 생성자에 `@Autowired`가 있으면 스프링이 연관된 객체를 컨테이너에서 찾아 주입한다. 이를 **DI(Dependency Injection, 의존성 주입)** 라 한다.
- 이전 테스트에서는 개발자가 직접 주입했고, 여기서는 `@Autowired`에 의해 스프링이 주입해준다.

> 출처: https://velog.io/@abcdana/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B9%88%EA%B3%BC-%EC%9D%98%EC%A1%B4%EA%B4%80%EA%B3%84

> 참고: 스프링은 스프링 컨테이너에 스프링 빈을 등록할 때, 기본으로 **싱글톤**으로 등록한다(유일하게 하나만 등록해서 공유). 따라서 같은 스프링 빈이면 모두 같은 인스턴스다. 특별한 경우를 제외하면 대부분 싱글톤을 사용한다.

## 방법 1: 컴포넌트 스캔과 자동 의존관계 설정

`@Controller`, `@Service`, `@Repository` 등 어노테이션을 이용하는 **컴포넌트 스캔** 방식이다.

**컴포넌트 스캔 범위**

> 실행 클래스의 패키지(`hello.hellospring`) 하위에 포함된 파일들만 스캔한다. 그 외 패키지는 기본적으로 스캔되지 않으며, 추가 설정으로 등록하는 것은 가능하다.

## 방법 2: 자바 코드로 직접 스프링 빈 등록

```
public class SpringConfig {

    @Bean
    public MemberService memberService(){
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository(){
        return new MemoryMemberRepository();
        //인터페이스는 뉴가 안된다.
        //멤버 서비스랑 멤버리포지토리를 스프링에 등록하고
    }
}

```

멤버 서비스와 리포지토리를 스프링 컨테이너에 올리고, 멤버 서비스는 멤버 리포지토리를 호출하며 스프링에 등록된 리포지토리를 주입받는다. 컨트롤러는 스프링이 관리한다.

![자바 코드 직접 등록 구조](/assets/20210605_193737.png)

컴포넌트 스캔 방식은 `@Autowired`를 사용하면 된다.

## DI 방식 비교와 주의사항

| DI 방식 | 특징 |
|---------|------|
| **생성자 주입** | 의존관계가 실행 중 변하지 않으므로 **권장** |
| **필드 주입** | 간결하지만 변경 불가 |
| **setter 주입** | 변경 가능하나 실무에서 거의 사용 안 함 |

- XML 설정 방식도 있지만 최근에는 거의 사용하지 않는다.
- 실무에서는 정형화된 컨트롤러·서비스·리포지토리는 **컴포넌트 스캔**을 사용하고, 구현 클래스를 바꿔야 하는 경우에는 **자바 코드 직접 등록**을 사용한다.
- `@Autowired`를 통한 DI는 스프링이 관리하는 객체에서만 동작한다. 직접 `new`로 생성한 객체에서는 동작하지 않는다.

## 빈 중복 등록 오류 해결

```
@Autowired지우고 SpringConfig 파일 생성 후 실행해보니 bean이 이미 정의 되어 있다는 식의 오류가 떴습니다.

구글링 해보니 spring boot 2.1 이후로는 bean을 overriding 못하도록 설정되어있다고 하더라고요.

application.properties 파일에 spring.main.allow-bean-definition-overriding=true 를 추가하니 작동하긴 하는데, 빈이 오버라이드 될 경우에 무슨 문제점이 발생하나요?

뭔가 문제점이 있으니까 스프링에서 디폴트 설정을 바꾼 것 같은데... 구글링 해도 해결법만 나오고 왜 그런지는 설명이 없네요ㅜㅜ

```

`@Service`를 제거하니 해결되었다. `MemberService`가 이미 컴포넌트 스캔으로 등록된 상태에서 `SpringConfig`에서 또 등록하려 해서 충돌이 발생한 것이다.

- **컴포넌트 스캔** 방식: `@Service` 유지
- **직접 등록** 방식: `//@Service` 로 제거

---

# 14. 의존관계 자동 주입 — 주입 방법 4가지

의존관계 주입은 크게 4가지 방법이 있다.

| 주입 방법 | 설명 | 특징 |
|-----------|------|------|
| **생성자 주입** | 생성자를 통해 의존 관계를 주입 | 생성자 호출시점에 딱 1번만 호출 보장. 불변·필수 의존관계에 사용 |
| **수정자 주입** (setter) | setter 메서드를 통해 주입 | 선택적·변경 가능한 의존관계에 사용 |
| **필드 주입** | 필드에 직접 주입 | 테스트하기 어렵고 권장하지 않음 |
| **일반 메서드 주입** | 일반 메서드를 통해 주입 | 거의 사용하지 않음 |

## 생성자 주입을 선택해라!

과거에는 수정자 주입과 필드 주입을 많이 사용했지만, 최근에는 스프링을 포함한 DI 프레임워크 대부분이 **생성자 주입을 권장**한다.

**이유: 불변**
- 대부분의 의존관계 주입은 한번 일어나면 애플리케이션 종료 시점까지 의존관계를 변경할 일이 없다.
- 수정자 주입을 사용하면 `setXxx` 메서드를 `public`으로 열어두어야 한다. 누군가 실수로 변경할 수 있고, 변경하면 안되는 메서드를 열어두는 것은 좋은 설계 방법이 아니다.
- 생성자 주입은 객체를 생성할 때 딱 1번만 호출되므로 이후에 호출되는 일이 없다. 따라서 불변하게 설계할 수 있다.

## 환경설정 방식 요약 (XML / Java / Annotation)

컨테이너가 객체를 생성하고 주입하는 방법:

| 방식 | 설명 |
|------|------|
| **XML (`<bean>`)** | 생성자 주입, setter 주입 시 사용 |
| **Annotation (`@Autowired`)** | 타입 기준으로 자동 주입 |
| **Java (`@Configuration`)** | XML 대신 자바 파일로 설정 |

`@Component`는 Bean을 `new`로 생성하듯이 만들며, `@ComponentScan`은 XML의 `<context:component-scan>`을 자바로 대체한다.

---

# 15. 회원 관리 예제 — 웹 화면 구현

![요청 처리 흐름](/assets/20210605_212315.png)

관련 컨트롤러를 먼저 찾고, 없으면 정적 파일을 찾는다.

![매핑된 컨트롤러 처리](/assets/20210605_212650.png)

매핑된 컨트롤러가 있으므로 바로 찾아간다.

## 홈 화면 추가

홈 컨트롤러:

```
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

}

```

회원 관리용 홈 HTML:

```
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<body>
<div class="container">
  <div>
    <h1>Hello Spring</h1>
    <p>회원 기능</p>
    <p>
      <a href="/members/new">회원 가입</a>
      <a href="/members">회원 목록</a>
    </p>
  </div>
</div> <!-- /container -->
</body>
</html>
```

> 참고: 컨트롤러가 정적 파일(ex. `index.html`)보다 우선순위가 높다.

## 회원 등록

회원 등록 폼 컨트롤러 및 HTML, 데이터 전달 폼 객체, 실제 등록 기능:

```
@Controller                                                       
public class MemberController {                                   

    private final MemberService memberService;                    

    @Autowired                                                    
    public MemberController(MemberService memberService) {        
        this.memberService = memberService;                       
    }                                                             

    @GetMapping("/members/new")                                   
    public String createForm() {                                  
        return "members/createMemberForm";                        
    }                                                                                                                        

}
회원 등록 폼 HTML
(resources/templates/members/createMemberForm)
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<body>
<div class="container">
  <form action="/members/new" method="post">
    <div class="form-group">
      <label for="name">이름</label>
      <input type="text" id="name" name="name" placeholder="이름을 입력하세요">
    </div>
    <button type="submit">등록</button>
  </form>
</div> <!-- /container -->
</body>
</html>
회원 등록 컨트롤러
웹 등록 화면에서 데이터를 전달 받을 폼 객체
package hello.hellospring.controller;

public class MemberForm {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
회원 컨트롤러에서 회원을 실제 등록하는 기능
@PostMapping("/members/new")                                  
public String create(MemberForm form) {                       
    Member member = new Member();                             
    member.setName(form.getName());                           

    memberService.join(member);                               

    return "redirect:/";                                      
}

```

요청 흐름:
1. `/members/new` GET 요청 → `createForm()` 호출 → `createMemberForm.html` 렌더링
2. `input[name]` 값을 담아 POST 방식으로 재전송 (name이 서버에서 key가 됨)
3. `@PostMapping` 으로 `create()` 호출 → `MemberForm`에 데이터 바인딩 → `join()` 실행

## 회원 조회

```
@GetMapping("/members")
public String list(Model model) {
    List<Member> members = memberService.findMembers();
    model.addAttribute("members", members);            
    return "members/memberList";                       
}
```

회원 리스트 HTML:

```
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<body>
<div class="container">
  <div>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>이름</th>
      </tr>
      </thead>
      <tbody>
      <tr th:each="member : ${members}">
        <td th:text="${member.id}"></td>
        <td th:text="${member.name}"></td>
      </tr>
      </tbody>
    </table>
  </div>
</div> <!-- /container -->
</body>
</html>
<tr th:each="member : ${members}"> : 반복하는 thymeleaf 문법
```

Java의 `forEach`와 유사한 타임리프 반복 문법이다. 아직 메모리에 데이터를 저장하므로 서버를 재시작하면 회원 데이터가 모두 사라진다.

![회원 목록 화면](/assets/20210605_230326.png)

화면이 위처럼 나와야 하며,

![test.mv.db 파일 확인](/assets/20210605_225813.png)

`test.mv.db` 파일이 있어야 한다.

---

# 16. 관련: DB 연동·JPA 연계

> 이 섹션부터는 스프링 핵심 원리(IoC·DI)의 곁가지로, DI가 실무에서 어떻게 활용되는지 보여주는 확장 주제다.

## 순수 JDBC

`build.gradle`에 의존성 추가:

```
implementation 'org.springframework.boot:spring-boot-starter-jdbc'
runtimeOnly 'com.h2database:h2'
```

위 줄은 JDBC 연결, 아래는 H2 DB 클라이언트 라이브러리다.

`resources/application.properties` 설정 추가:

    spring.datasource.url=jdbc:h2:tcp://localhost/~/test
    spring.datasource.driver-class-name=org.h2.Driver
    spring.datasource.username=sa

> 주의: 스프링 부트 2.4부터는 `spring.datasource.username=sa`를 반드시 추가해야 한다. 누락하거나 공백이 있으면 `Wrong user name or password` 오류가 발생한다.

> 참고: IntelliJ 커뮤니티(무료) 버전의 경우 `application.properties` 파일의 왼쪽이 회색으로 나오는데, 스프링 소스 코드 연결 기능이 빠진 것으로 실제 동작에는 문제없다.

![JDBC 설정](/assets/20210606_012343.png)

`MemberService`는 `MemberRepository`에 의존하고, `MemberRepository`는 `MemoryMemberRepository`와 `JDBCMemberRepository` 두 구현체를 가진다.

![구현체 교체 구조](/assets/20210606_013233.png)

기존 Memory 버전 등록을 JDBC 버전으로 교체한다.

## 개방-폐쇄 원칙(OCP, Open-Closed Principle) — DI로 구현 교체

- **확장에는 열려있고, 변경에는 닫혀있다.**
- 스프링의 **DI(Dependency Injection)**를 사용하면 기존 코드를 전혀 수정하지 않고 설정만으로 구현 클래스를 교체할 수 있다.
- 데이터를 DB에 저장하므로 서버를 재시작해도 데이터가 안전하게 보존된다.

통합 테스트:

```

@SpringBootTest
@Transactional

class MemberServiceIntegrationTest {
    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;
    @Test
    public void 회원가입() throws Exception {
    //Given
        Member member = new Member();
        member.setName("hello");
    //When
        Long saveId = memberService.join(member);
    //Then
        Member findMember = memberRepository.findById(saveId).get();
        assertEquals(member.getName(), findMember.getName());
    }
    @Test
    public void 중복_회원_예외() throws Exception {
    //Given
        Member member1 = new Member();
        member1.setName("spring");
        Member member2 = new Member();
        member2.setName("spring");
    //When
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> memberService.join(member2));//예외가 발생해야 한다.
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
    }
}

```

`@Transactional`이 매우 중요하다. DB는 커밋해야 반영되는데, 이 어노테이션은 테스트 후 **롤백**을 수행한다. 주석 처리하면 DB에 데이터가 실제로 반영된다.

| 어노테이션 | 역할 |
|------------|------|
| `@SpringBootTest` | 스프링 컨테이너와 테스트를 함께 실행(실제 실행) |
| `@Transactional` | 테스트 시작 전 트랜잭션 시작, 완료 후 **항상 롤백** → DB에 데이터 남지 않아 다음 테스트에 영향 없음 |

## 스프링 JdbcTemplate

- 순수 JDBC와 동일한 환경 설정을 사용한다.
- JdbcTemplate과 MyBatis 같은 라이브러리는 **JDBC API의 반복 코드를 대부분 제거**해준다. 단, SQL은 직접 작성해야 한다.

> 참고: 생성자가 1개면 `@Autowired` 생략 가능하다.

## MyBatis 요약

1. SQL을 자바 소스와 **별도로 분리**해서 관리한다.
2. JDBC 코드의 단점(분량, 반복 코드)을 크게 줄여준다.
3. properties 파일에 쿼리를 저장해 관리한다.
4. `SqlSession`의 쿼리 처리 메서드를 이용해 작업한다.

## JPA

JDBC → JdbcTemplate까지 발전해왔지만, 개발자가 직접 SQL을 작성해야 한다는 단점이 남아있다.

**JPA**를 사용하면 쿼리도 JPA가 자동으로 처리한다. 객체를 메모리에 넣듯이 다루면 JPA가 쿼리를 알아서 생성·실행한다.

- JPA는 기본적인 SQL도 직접 만들어 실행한다.
- SQL·데이터 중심 설계에서 **객체 중심 설계**로 패러다임 전환이 가능하다.
- 개발 생산성을 크게 높일 수 있다.

`build.gradle` 의존성:

```
dependencies {
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'org.springframework.boot:spring-boot-starter-web'
//implementation 'org.springframework.boot:spring-boot-starter-jdbc'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'com.h2database:h2'
testImplementation('org.springframework.boot:spring-boot-starter-test') {
exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
}
}

```

`spring-boot-starter-data-jpa`는 내부에 JDBC 관련 라이브러리를 포함하므로 JDBC 의존성은 제거해도 된다.

`application.properties` 추가:

```
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none

```

| 설정 | 설명 |
|------|------|
| `show-sql` | JPA가 생성하는 SQL을 콘솔에 출력 |
| `ddl-auto=none` | 자동 테이블 생성 기능 비활성화 (`create`로 설정 시 자동 생성) |

엔티티를 사용하려면 **EntityManager**를 주입받아야 한다. `em`에서 영구 저장(영속성)이 처리된다.

---

# 17. 관련: AOP 연계

> AOP도 스프링 핵심 기술이지만 이 문서의 주제(IoC·DI)와는 결이 다르므로 개념 위주로 간결히 정리한다.

## AOP를 사용하는 이유

회원가입, 회원 조회 등 **핵심 관심사항**과 시간 측정 같은 **공통 관심사항**을 분리하기 위해 AOP를 사용한다.

```
package hello.hellospring.service;


import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

//@Service
public class MemberService{
//    private final MemberRepository memberRepository = new MemoryMemberRepository();


    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    /*회원가입*/
    public Long join(Member member) {
        //같은 이름이 있는 중복회원 X
        long start = System.currentTimeMillis();

//        Optional<Member> result = memberRepository.findByName(member.getName());
        //옵셔널로 반환
        try {
            validateDuplicateMember(member);

            memberRepository.save(member);
            return member.getId();
        }finally{
            long finish = System.currentTimeMillis();
            long timeMs=finish-start;
            System.out.println("join="+timeMs+"ms");
        }
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent(m->{   //만약 멤버에 값이 있으면
                throw new IllegalStateException("이미 존재하는 회원입니다");
        });
    }

    /*전체 회원 조회*/

    public List<Member> findMembers() {
        long start = System.currentTimeMillis();
        try {
            return memberRepository.findAll();
        }finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish-start;
            System.out.println("findMember"+timeMs+"ms");
        }

    }
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}


```

AOP 적용 효과:
- 시간 측정 로직을 **별도의 공통 로직**으로 분리
- 핵심 관심사항을 깔끔하게 유지
- 변경 시 공통 로직만 수정하면 됨
- 원하는 대상에만 선택적으로 적용 가능

## 스프링의 AOP 동작 방식

### AOP 적용 전 의존관계

![AOP 적용 전 의존관계](/assets/20210606_152517.png)

![AOP 적용 전 의존관계 상세](/assets/20210606_152533.png)

### AOP 적용 전 전체 그림

![AOP 적용 전 전체 그림](/assets/20210606_152551.png)

### AOP 적용 후 전체 그림

![AOP 적용 후 전체 그림](/assets/20210606_152616.png)

AOP를 적용하면 `HelloController`가 호출하는 것은 진짜 `MemberService`가 아니라, **프록시(가짜 빈)**를 통해 호출된다.

![프록시 빈 호출 구조](/assets/20210606_154344.png)

어디서 병목이 발생하는지 콘솔에서 확인할 수 있다. `joinPoint`로 메서드 호출 시점을 가로채 조작이 가능하다.

## AOP — Advice 용어 정리

**AOP**(Aspect-Oriented Programming)에서 **Advice**란, Target 클래스의 JoinPoint에 삽입되어 실행되는 공통 관심 로직 코드다.

> 예: "메서드를 호출하기 전(언제)에 트랜잭션을 시작한다(공통기능)"

Advice를 어디에 적용할지는 **PointCut** 단위로 정의한다.

| Advice 타입 | 실행 시점 |
|-------------|-----------|
| **Around Advice** | JoinPoint 앞과 뒤 모두 |
| **Before Advice** | JoinPoint 앞 |
| **After Returning Advice** | 메서드가 정상 종료된 뒤 |
| **After Throwing Advice** | 예외가 던져질 때 |
| **Introduction** | 클래스에 인터페이스와 구현을 추가하는 특수 Advice |

## @Transactional과 프록시

`@Transactional`은 트랜잭션 처리를 지원하는 어노테이션이다. 클래스 또는 메서드 위에 선언하는 **선언적 트랜잭션** 방식이 일반적이다.

`@Transactional`이 추가되면 해당 클래스에 **트랜잭션 기능이 적용된 프록시 객체**가 생성된다. MyBatis, JPA 모두 이 어노테이션 하나로 트랜잭션을 처리한다. (AOP 프록시와 같은 원리)

## PSA (Portable Service Abstraction, 이식 가능한 서비스 추상화)

인터페이스를 통한 약한 결합도와 DI를 활용해, 스프링은 변화하는 환경에서도 **일관성 있는 추상 API 계층**을 제공한다. 변경에 유연하게 대처할 수 있는 서비스 구조다.

---

# 18. 관련: 스프링 부트·MVC·REST (간단 참고)

> 이 문서는 스프링 핵심 원리(IoC·DI)를 다루므로 MVC·REST 상세는 범위를 벗어난다. 아래는 학습 노트에 함께 있던 참고 요약이다.

## 스프링 부트 특징

1. 작업 결과를 **jar**로 패키징하여 단독 실행이 가능하다.
2. 미리 잘 짜인 라이브러리 조합으로 **라이브러리 관리가 용이**하다.
3. 레거시 스프링의 복잡한 설정을 자동화해 **개발자가 비즈니스 로직에 집중**할 수 있다.
4. 기본 View 형식은 JSP로, 추가 dependency 없이 사용 가능하다.

### @SpringBootApplication 구성

`main()` 클래스의 `@SpringBootApplication`은 아래 3개 어노테이션을 포함한다 (`@MapperScan`은 포함되지 않음).

| 포함 어노테이션 | 역할 |
|----------------|------|
| **`@Configuration`** | 설정 클래스 선언. Bean을 **싱글톤**으로 한 번만 생성 |
| **`@EnableAutoConfiguration`** | 자동 설정 활성화 |
| **`@ComponentScan`** | 지정 경로 이하의 `@Component`, `@Configuration` 클래스를 스캔해 Bean 등록 |

> 출처: https://sieunlim.tistory.com/10

## Spring MVC 요청 처리 순서 (한 줄 참고)

DispatcherServlet(프런트 컨트롤러) → HandlerMapping → Controller → Model 생성 → ViewResolver → View 렌더링 → Response 반환. (상세는 MVC 전용 문서 참고)

## REST 서비스 (한 줄 참고)

**REST**(Representational State Transfer)는 HTTP 프로토콜로 자원을 주고받는 아키텍처 스타일이며, `@RestController` = `@Controller` + `@ResponseBody`로 JSON 데이터를 반환한다. CRUD 동작은 URI가 아닌 HTTP 메서드로 표현한다. (상세는 REST 전용 문서 참고)

---

# 19. 관련: 테스트 설정 참고 (JUnit5 / Spring-Test)

> DI 컨테이너를 테스트에서 어떻게 활용하는지 보여주는 참고 노트다.

## Swagger

- 프로젝트 개발 시 일반적으로 **프론트엔드 개발자**와 **백엔드 개발자**가 분리된다.
- 프론트엔드 개발자는 백엔드가 만든 API 문서를 보며 데이터 처리를 진행한다.
- 개발 상황 변화에 따라 API가 추가·변경될 때마다 문서에 반영하는 불편함이 생기는데, **Swagger**가 이 문제를 해결한다.

**Swagger 특징**

- 간단한 설정으로 프로젝트 API 목록을 웹에서 **확인 및 테스트** 가능
- Controller에 정의된 모든 URL을 바로 확인 가능
- API 목록 외에도 API 명세·설명 조회 및 직접 테스트 가능

## JUnit5 / Spring-Test 어노테이션

```java

package com.ssafy.guestbook;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

//JUnit 지원 어노테이션
//@Test
//테스트를 수행하는 메소드를 지정합니다. jUnit에서는 각각의 테스트가 서로 영향을 주지 않고 독립적으로 실행되는 것을 지향합니다. 따라서 @Test 단위 마다 필요한 객체를 생성해 지원해줍니다.
//
//@Ignore
//테스트를 실행하지 않도록 해줍니다. 메소드는 남겨두되 테스트에 포함되지 않도록 하려면 이 어노테이션을 붙여두면 됩니다.
//
//@Before / @After
//테스트 메소드가 실행되기 전, 후로 항상 실행되는 메소드를 지정합니다. 공통적으로 실행되어야 하는 메소드가 있다면 어노테이션을 붙여주면 됩니다. 각각의 테스트 메소드에 적용됩니다.
//
//@BeforeClass / @AfterClass
//각각의 메소드가 아닌 해당 클래스에서 딱 한번만 수행되는 메소드입니다. 테스트 메소드의 갯수와 상관없이 딱 한번만 실행됩니다.

//Spring-Test 어노테이션
//@RunWith(SpringJUnit4ClassRunner.class)
//ApplicationContext를 만들고 관리하는 작업을 할 수 있도록 jUnit의 기능을 확장해줍니다. 스프링의 핵심 기능인 컨테이너 객체를 생성해 테스트에 사용할 수 있도록 해준다고 보면 됩니다. 원래 jUnit에서는 테스트 메소드별로 객체를 따로 생성해 관리하는 반면, Spring-Test 라이브러리로 확장된 jUnit에서는 컨테이너 기술을 써서 싱글톤으로 관리되는 객체를 사용해 모든 테스트에 사용하게 됩니다.
//
//@ContextConfiguration(locations = "classpath:xml파일위치")
//스프링 빈(Bean) 설정 파일의 위치를 지정할 수 있습니다. 굳이 별도로 컨테이너를 추가하지 않고 Bean을 등록해둔 xml 파일을 지정해 컨테이너에서 사용할 수 있도록 해줍니다. 위의 @RunWith 어노테이션은 컨테이너를 생성하겠다는 의미인데, 어떤 파일을 참조할지 모르는 상태이기 때문에 이 어노테이션을 함께 써줘야 합니다.
//파일 위치의 루트는 "src/test/resources" 폴더입니다. 필요한 설정 파일은 이곳에 복사해놓고 사용해도 됩니다. 하지만 매번 파일을 복사하면 힘들기 때문에 "file:Full path" 형식으로 써주면 운영 개발에서 사용하는 파일을 불러올 수 있습니다. 대괄호 { } 를 붙이면 여러개도 모두 가져올 수 있습니다. 아래 예시에서 추가 설명하겠습니다.
//
//@Autowired
//스프링에서 사용하는 것과 같습니다. 자동으로 의존성 주입을 해줍니다.

// method
//assertEquals(x, y)
//	·객체 x와 y가 일치함을 확인합니다.
//	·x(예상 값)와 y(실제 값)가 같으면 테스트 통과
//
//assertArrayEquals(a, b);
//	·배열 A와 B가 일치함을 확인합니다.
//
//assertFalse(x)
//	·x가 false 인지 확인합니다.
//
//assertTrue(x)
//	·x가 true 인지 확인합니다.
//
//assertTrue(message, condition)
//	·condition이  true이면 message표시
//
//assertNull(o)
//	·객체o가 null인지 확인합니다.
//
//assertNotNull(o)
//	·객체o가 null이 아닌지 확인합니다.
//
//assertSame(ox, oy)
//	·객체 ox와 oy가 같은 객체임을 확인합니다.
//	·ox와 oy가 같은 객체를 참조하고 있으면 테스트 통과
//	·assertEquals()메서드는 두 객체의 값이 같은지 확인하고, assertSame()메서드는 두 객체의 레퍼런스가 동일한가를 확인합니다. (== 연산자)
//
//assertNotSame(ox, oy)
//	·ox와 oy가 같은 객체를 참조하고 있지 않으면 통과
//
//assertfail()
//	·테스트를 바로 실패처리

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml",
		"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
public class UnitTestConfig {

	@Autowired
	public ApplicationContext context;

}


```

---

# 20. 관련: 웹 계층 부가 개념 요약

> 학습 노트에 함께 있던 MVC·REST·설정 파일 관련 개념을 참고용으로 모았다. 본 문서 주제(IoC·DI)의 곁가지다.

## MVC 패턴과 핵심 객체

| 구성 요소 | 역할 |
|-----------|------|
| **M (Model)** | Data / DB를 직접 다루는 부분 |
| **V (View)** | 화면에 보이는 부분 |
| **C (Controller)** | 이벤트와 제어 기능, 실질적인 처리 담당 |

- **DAO (Data Access Object)** — CRUD를 전문적으로 다루는 클래스 (연결지향)
- **DTO (Data Transfer Object)** — DAO의 데이터를 묶어서 BL/PL 계층에 전달. 데이터 전송을 위해 캡슐화한다.

## Forward vs Redirect

| 구분 | 처리 위치 | URL 변경 | Request/Response 공유 |
|------|-----------|----------|-----------------------|
| **Forward** | 서버 내부 | 변경 없음 | 공유 (동일 객체) |
| **Redirect** | 클라이언트 재요청 | 변경됨 | 새로 생성 |

## Interceptor vs Filter

| 구분 | 처리 시점 |
|------|-----------|
| **Filter** | 클라이언트 요청이 들어오면 가장 먼저 처리 (예: 한글 인코딩 필터) |
| **Interceptor** | Filter 통과 후 DispatcherServlet 통과 이후 처리 |

**요청 처리 순서:** 클라이언트 요청 → **Filter** → **DispatcherServlet** → **Interceptor** → **Controller**

- `servlet`, `filter`, `welcome-file`은 `web.xml`에 기술한다. **interceptor는 web.xml에 기술하지 않는다.**

## 컨텍스트 XML 분리 구조

| 파일 | 담당 영역 |
|------|-----------|
| **root-context.xml** | DAO, Service, DB 커넥션 풀 |
| **servlet-context.xml** | Controller, Interceptor |

## 주요 파라미터/바디 어노테이션

- `@RequestParam` — 쿼리스트링·폼 데이터를 받는다 (`HttpServletRequest`와 유사한 역할).
- `@PathVariable` — URI 경로상의 변수값을 받아온다 (비동기/Ajax 파라미터에 사용).
- `@RequestBody` — HTTP 요청 body를 자바 객체로 매핑 (JSON → Object).
- `@ResponseBody` — 자바 객체를 HTTP 응답 body로 변환 (Object → JSON).

![RestController와 CRUD 메서드](/assets/20210510_014222.png)

## HTTP 상태 코드 (참고)

| 코드 | 이름 | 설명 |
|------|------|------|
| **200** | OK | 성공적으로 처리 |
| **401** | Unauthorized | 인증 없이 인증 필요 리소스에 접근 |
| **402** | Payment Required | 예약된 코드 (현재 표준 없음, 실무에서는 403 사용) |
| **404** | Not Found | 리소스 없음 |
| **405** | Method Not Allowed | 허용되지 않은 HTTP 메서드 사용 |
| **500** | Internal Server Error | 서버 내부 오류 (설정·권한 문제, 프로그램 비정상 종료 등) |
