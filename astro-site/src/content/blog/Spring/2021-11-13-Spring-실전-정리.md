---
title: "[Spring] Spring 실전 정리 — Bean Scope·MVC·JPA·Security"
date: 2021-11-13
category: "Spring"
tags: ["Spring"]
description: "Bean Scope·Spring MVC·SpringApplication·테스트 코드·JPA·더티 체킹·Spring Security까지 스프링 실전 개념을 정리한 노트."
permalink: "study/2021/11/13/면접-대비-Web(spring~devops)"
---

> **📚 웹 풀스택 정리 — Spring · Vue · React · 배포**
>
> Spring 실전 ← *지금 글*
> [Vue.js 실전](/study/2021/11/13/vue-실전.html)
> [React 실전](/study/2021/11/13/react-실전.html)
> [배포 자동화](/study/2021/11/13/aws-travis-배포.html)

## [Spring] Bean Scope

<br>

![image](https://user-images.githubusercontent.com/34904741/139436386-d6af0eba-0fb2-4776-a01d-58ea459d73f7.png)

<br>

> Bean의 사용 범위를 말하는 Bean Scope의 종류에 대해 알아보자

<br>

Bean은 스프링에서 사용하는 POJO 기반 객체다.

상황과 필요에 따라 Bean을 사용할 때 하나만 만들어야 할 수도 있고, 여러개가 필요할 때도 있고, 어떤 한 시점에서만 사용해야할 때가 있을 수 있다.

이를 위해 Scope를 설정해서 Bean의 사용 범위를 개발자가 설정할 수 있다.

<br>

우선 따로 설정을 해주지 않으면, Spring에서 Bean은 `Singleton`으로 생성된다. 싱글톤 패턴처럼 특정 타입의 Bean을 딱 하나만 만들고 모두 공유해서 사용하기 위함이다. 보통은 Bean을 이렇게 하나만 만들어 사용하는 경우가 대부분이지만, 요구사항이나 구현에 따라 아닐 수도 있을 것이다.

따라서 Bean Scope는 싱글톤 말고도 여러가지를 지원해준다.

<br>

### Scope 종류

| Scope | 설명 |
|-------|------|
| **singleton** | 해당 Bean에 대해 IoC 컨테이너에서 단 하나의 객체로만 존재한다. (기본값) |
| **prototype** | 해당 Bean에 대해 다수의 객체가 존재할 수 있다. |
| **request** | 하나의 HTTP Request 라이프사이클에서 단 하나의 객체로만 존재한다. |
| **session** | 하나의 HTTP Session 라이프사이클에서 단 하나의 객체로만 존재한다. |
| **global session** | 하나의 Global HTTP Session 라이프사이클에서 단 하나의 객체로만 존재한다. |

> request, session, global session은 MVC 웹 어플리케이션에서만 사용함

<br>

Scope들은 Bean으로 등록하는 클래스에 어노테이션으로 설정해줄 수 있다.

```java
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Scope("prototype")
@Component
public class UserController {
}
```

<br>

<br>

#### [참고 자료]

- [링크](https://gmlwjd9405.github.io/2018/11/10/spring-beans.html)

---

## Spring MVC Framework

<br>

> 스프링 MVC 프레임워크가 동작하는 원리를 이해하고 있어야 한다

<br>

<img src="https://media.vlpt.us/images/miscaminos/post/80555c98-2846-4774-9b27-9746336f3dce/springMVC_Dispatcher_centered.jpg">

클라이언트가 서버에게 url을 통해 요청할 때 일어나는 스프링 프레임워크의 동작을 그림으로 표현한 것이다.

<br>

### MVC 진행 과정

----

- 클라이언트가 url을 요청하면, 웹 브라우저에서 스프링으로 request가 보내진다.
- `Dispatcher Servlet`이 request를 받으면, `Handler Mapping`을 통해 해당 url을 담당하는 Controller를 탐색 후 찾아낸다.
- 찾아낸 `Controller`로 request를 보내주고, 보내주기 위해 필요한 Model을 구성한다.
- `Model`에서는 페이지 처리에 필요한 정보들을 Database에 접근하여 쿼리문을 통해 가져온다.
- 데이터를 통해 얻은 Model 정보를 Controller에게 response 해주면, Controller는 이를 받아 Model을 완성시켜 Dispatcher Servlet에게 전달해준다.
- Dispatcher Servlet은 `View Resolver`를 통해 request에 해당하는 view 파일을 탐색 후 받아낸다.
- 받아낸 View 페이지 파일에 Model을 보낸 후 클라이언트에게 보낼 페이지를 완성시켜 받아낸다.
- 완성된 View 파일을 클라이언트에 response하여 화면에 출력한다.

<br>

### 구성 요소

---

#### Dispatcher Servlet

모든 request를 처리하는 중심 컨트롤러라고 생각하면 된다.  서블릿 컨테이너에서 http 프로토콜을 통해 들어오는 모든 request에 대해 제일 앞단에서 중앙집중식으로 처리해주는 핵심적인 역할을 한다.

기존에는 web.xml에 모두 등록해줘야 했지만, 디스패처 서블릿이 모든 request를 핸들링하면서 작업을 편리하게 할 수 있다.

<br>

#### Handler Mapping

클라이언트의 request url을 어떤 컨트롤러가 처리해야 할 지 찾아서 Dispatcher Servlet에게 전달해주는 역할을 담당한다.

> 컨트롤러 상에서 url을 매핑시키기 위해 `@RequestMapping`을 사용하는데, 핸들러가 이를 찾아주는 역할을 한다.

<br>

#### Controller

실질적인 요청을 처리하는 곳이다. Dispatcher Servlet이 프론트 컨트롤러라면, 이 곳은 백엔드 컨트롤러라고 볼 수 있다.

모델의 처리 결과를 담아 Dispatcher Servlet에게 반환해준다.

<br>

#### View Resolver

컨트롤러의 처리 결과를 만들 view를 결정해주는 역할을 담당한다. 다양한 종류가 있기 때문에 상황에 맞게 활용하면 된다.

<br>

<br>

#### [참고사항]

- [링크](https://velog.io/@miscaminos/Spring-MVC-framework)
- [링크](https://velog.io/@miscaminos/Spring-MVC-framework)


-------


## [Spring Boot] SpringApplication

<br>

스프링 부트로 프로젝트를 실행할 때 Application 클래스를 만든다.

클래스명은 개발자가 프로젝트에 맞게 설정할 수 있지만, 큰 틀은 아래와 같다.

```java
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
```

<br>

`@SpringBootApplication` 어노테이션을 통해 스프링 Bean을 읽어와 자동으로 생성해준다.

이 어노테이션이 있는 파일 위치부터 설정들을 읽어가므로, 반드시 프로젝트의 최상단에 만들어야 한다.

`SpringApplication.run()`으로 해당 클래스를 run하면, 내장 WAS를 실행한다. 내장 WAS의 장점으로는 개발자가 따로 톰캣과 같은 외부 WAS를 설치 후 설정해두지 않아도 애플리케이션을 실행할 수 있다.

또한, 외장 WAS를 사용할 시 이 프로젝트를 실행시키기 위한 서버에서 모두 외장 WAS의 종류와 버전, 설정을 일치시켜야만 한다. 따라서 내장 WAS를 사용하면 이런 신경은 쓰지 않아도 되기 때문에 매우 편리하다.

> 실제로 많은 회사들이 이런 장점을 살려 내장 WAS를 사용하고 있고, 전환하고 있다.

---


## [Spring Boot] Test Code

<br>

#### 테스트 코드를 작성해야 하는 이유

- 개발단계 초기에 문제를 발견할 수 있음
- 나중에 코드를 리팩토링하거나 라이브러리 업그레이드 시 기존 기능이 잘 작동하는 지 확인 가능함
- 기능에 대한 불확실성 감소

<br>

개발 코드 이외에 테스트 코드를 작성하는 일은 개발 시간이 늘어날 것이라고 생각할 수 있다. 하지만 내 코드에 오류가 있는 지 검증할 때, 테스트 코드를 작성하지 않고 진행한다면 더 시간 소모가 클 것이다.

1. 코드를 작성한 뒤 프로그램을 실행하여 서버를 킨다.
2. API 프로그램(ex. Postman)으로 HTTP 요청 후 결과를 Print로 찍어서 확인한다.
3. 결과가 예상과 다르면, 다시 프로그램을 종료한 뒤 코드를 수정하고 반복한다.

위와 같은 방식이 얼마나 반복될 지 모른다. 그리고 하나의 기능마다 저렇게 테스트를 하면 서버를 키고 끄는 작업 또한 너무 비효율적이다.

이 밖에도 Print로 눈으로 검증하는 것도 어느정도 선에서 한계가 있다. 테스트 코드는 자동으로 검증을 해주기 때문에 성공한다면 수동으로 검증할 필요 자체가 없어진다.

새로운 기능이 추가되었을 때도 테스트 코드를 통해 만약 기존의 코드에 영향이 갔다면 어떤 부분을 수정해야 하는 지 알 수 있는 장점도 존재한다.

<br>

따라서 테스트 코드는 개발하는 데 있어서 필수적인 부분이며 반드시 활용해야 한다.

<br>

#### 테스트 코드 예제

```java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = HomeController.class)
public class HomeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void home_return() throws Exception {
        //when
        String home = "home";

        //then
        mvc.perform(get("/home"))
                .andExpect(status().isOk())
                .andExpect(content().string(home));
    }
}
```

<br>

1) `@RunWith(SpringRunner.class)`

테스트를 진행할 때 JUnit에 내장된 실행자 외에 다른 실행자를 실행시킨다.

스프링 부트 테스트와 JUnit 사이의 연결자 역할을 한다고 생각하면 된다.

2) `@WebMvcTest`

컨트롤러만 사용할 때 선언이 가능하며, Spring MVC에 집중할 수 있는 어노테이션이다.

3) `@Autowired`

스프링이 관리하는 Bean을 주입시켜준다.

4) `MockMvc`

웹 API를 테스트할 때 사용하며, 이를 통해 HTTP GET, POST, DELETE 등에 대한 API 테스트가 가능하다.

5) `mvc.perform(get("/home"))`

`/home` 주소로 HTTP GET 요청을 한 상황이다.

6)  `.andExpect(status().isOk())`

결과를 검증하는 `andExpect`로, 여러개를 붙여서 사용이 가능하다. `status()`는 HTTP Header를 검증하는 것으로 결과에 대한 HTTP Status 상태를 확인할 수 있다. 현재 `isOK()`는 200 코드가 맞는지 확인하고 있다.

<br>

프로젝트를 만들면서 다양한 기능들을 구현하게 되는데, 이처럼 테스트 코드로 견고한 프로젝트를 만들기 위한 기능별 단위 테스트를 진행하는 습관을 길러야 한다.

<br>

<br>

#### [참고 자료]

- [링크](http://www.yes24.com/Product/Goods/83849117)


---

##  JPA

> Java Persistence API

<br>

> 개발자가 직접 SQL을 작성하지 않고, JPA API를 활용해 DB를 저장하고 관리할 수 있다.

<br>

JPA는 오늘날 스프링에서 많이 활용되고 있지만, 스프링이 제공하는 API가 아닌 **자바가 제공하는 API다.**

자바 ORM 기술에 대한 표준 명세로, 자바 어플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 인터페이스다.

<br>

#### ORM(Object Relational Mapping)

ORM 프레임워크는 자바 객체와 관계형 DB를 매핑한다. 즉, 객체가 DB 테이블이 되도록 만들어주는 것이다. ORM을 사용하면, SQL을 작성하지 않아도 직관적인 메소드로 데이터를 조작할 수 있다는 장점이 있다. ( 개발자에게 생산성을 향상시켜줄 수 있음 )

종류로는 Hibernate, EclipseLink, DataNucleus 등이 있다.

<br>

<img src="https://media.vlpt.us/images/modsiw/post/99fef220-9062-4234-95f4-211eafa431d4/image.png">

스프링 부트에서는 `spring-boot-starter-data-jpa`로 패키지를 가져와 사용하며, 이는 Hibernate 프레임워크를 활용한다.

<br> JPA는 애플리케이션과 JDBC 사이에서 동작하며, 개발자가 JPA를 활용했을 때 JDBC API를 통해 SQL을 호출하여 데이터베이스와 호출하는 전개가 이루어진다.

즉, 개발자는 JPA의 활용법만 익히면 DB 쿼리 구현없이 데이터베이스를 관리할 수 있다.

<br>

### JPA 특징

1. ##### 객체 중심 개발 가능

   SQL 중심 개발이 이루어진다면, CRUD 작업이 반복해서 이루어져야한다.

   하나의 테이블을 생성해야할 때 이에 해당하는 CRUD를 전부 만들어야 하며, 추후에 컬럼이 생성되면 관련 SQL을 모두 수정해야 하는 번거로움이 있다. 또한 개발 과정에서 실수할 가능성도 높아진다.

   <br>

2. ##### 생산성 증가

   SQL 쿼리를 직접 생성하지 않고, 만들어진 객체에 JPA 메소드를 활용해 데이터베이스를 다루기 때문에 개발자에게 매우 편리성을 제공해준다.

   <br>

3. ##### 유지보수 용이

   쿼리 수정이 필요할 때, 이를 담아야 할 DTO 필드도 모두 변경해야 하는 작업이 필요하지만 JPA에서는 엔티티 클래스 정보만 변경하면 되므로 유지보수에 용이하다.

4. ##### 성능 증가

   사람이 직접 SQL을 짜는 것과 비교해서 JPA는 동일한 쿼리에 대한 캐시 기능을 지원해주기 때문에 비교적 높은 성능 효율을 경험할 수 있다.

<br>

#### 제약사항

JPA는 복잡한 쿼리보다는 실시간 쿼리에 최적화되어있다. 예를 들어 통계 처리와 같은 복잡한 작업이 필요한 경우에는 기존의 Mybatis와 같은 Mapper 방식이 더 효율적일 수 있다.

> Spring에서는 JPA와 Mybatis를 같이 사용할 수 있기 때문에, 상황에 맞는 방식을 택하여 개발하면 된다.

<br>

<br>

#### [참고 사항]

- [링크](https://velog.io/@modsiw/JPAJava-Persistence-API%EC%9D%98-%EA%B0%9C%EB%85%90)
- [링크](https://wedul.site/506)





-----


## [Spring Data JPA] 더티 체킹 (Dirty Checking)

<br>

<img src="https://cdn.inflearn.com/public/courses/324474/course_cover/58c8632c-7a6e-4c76-9893-d7fffa32faf2/kyh_JPA_Spring2%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1%206.png">

<br>

> 트랜잭션 안에서 Entity의 변경이 일어났을 때
> 변경한 내용을 자동으로 DB에 반영하는 것

<br>

ORM 구현체 개발 시 더티 체킹이라는 말을 자주 볼 수 있다.

더티 체킹이 어떤 것을 뜻하는 지 간단히 살펴보자.

<br>

JPA로 개발하는 경우 구현한 한 가지 기능을 예로 들어보자

##### ex) 주문 취소 기능

```java
@Transactional  
public void cancelOrder(Long orderId) {  
    //주문 엔티티 조회  
    Order order = orderRepository.findOne(orderId);  

    //주문 취소  
    order.cancel();  
}
```

`orderId`를 통해 주문을 취소하는 메소드다. 데이터베이스에 반영하기 위해선, `update`와 같은 쿼리가 있어야할 것 같은데 존재하지 않는다.

하지만, 실제로 이 메소드를 실행하면 데이터베이스에 update가 잘 이루어진다.

- 트랜잭션 시작
- `orderId`로 주문 Entity 조회
- 해당 Entity 주문 취소 상태로 **Update**
- 트랜잭션 커밋

이를 가능하게 하는 것이 바로 '더티 체킹(Dirty Checking)'이라고 보면 된다.

<br>

그냥 더티 체킹의 단어만 간단히 해석하면  `변경 감지`로 볼 수 있다. 좀 더 자세히 말하면, Entity에서 변경이 일어난 걸 감지한 뒤, 데이터베이스에 반영시켜준다는 의미다. (변경은 최초 조회 상태가 기준이다)

> Dirty : 상태의 변화가 생김
>
> Checking : 검사

JPA에서는 트랜잭션이 끝나는 시점에 변화가 있던 모든 엔티티의 객체를 데이터베이스로 알아서 반영을 시켜준다. 즉, 트랜잭션의 마지막 시점에서 다른 점을 발견했을 때 데이터베이스로 update 쿼리를 날려주는 것이다.

- JPA에서 Entity를 조회
- 조회된 상태의 Entity에 대한 스냅샷 생성
- 트랜잭션 커밋 후 해당 스냅샷과 현재 Entity 상태의 다른 점을 체크
- 다른 점들을 update 쿼리로 데이터베이스에 전달

<br>

이때 더티 체킹을 검사하는 대상은 `영속성 컨텍스트`가 관리하는 Entity로만 대상으로 한다.

준영속, 비영속 Entity는 값을 변경할 지라도 데이터베이스에 반영시키지 않는다.

<br>

기본적으로 더티 체킹을 실행하면, SQL에서는 변경된 엔티티의 모든 내용을 update 쿼리로 만들어 전달하는데, 이때 필드가 많아지면 전체 필드를 update하는게 비효율적일 수도 있다.

이때는 `@DynamicUpdate`를 해당 Entity에 선언하여 변경 필드만 반영시키도록 만들어줄 수 있다.

```java
@Getter
@NoArgsConstructor
@Entity
@DynamicUpdate
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String product;
```

<br>

<br>

#### [참고 자료]

- [링크](https://velog.io/@jiny/JPA-%EB%8D%94%ED%8B%B0-%EC%B2%B4%ED%82%B9Dirty-Checking-%EC%9D%B4%EB%9E%80)
- [링크](https://jojoldu.tistory.com/415)

-----


## Spring Security - Authentication and Authorization

<br>

> API에 권한 기능이 없으면, 아무나 회원 정보를 조회하고 수정하고 삭제할 수 있다. 따라서 이를 막기 위해 인증된 유저만 API를 사용할 수 있도록 해야하는데, 이때 사용할 수 있는 해결 책 중 하나가 Spring Security다.

<br>

스프링 프레임워크에서는 인증 및 권한 부여로 리소스 사용을 컨트롤 할 수 있는 `Spring Security`를 제공한다. 이 프레임워크를 사용하면, 보안 처리를 자체적으로 구현하지 않아도 쉽게 필요한 기능을 구현할 수 있다.

<br>

<img src="https://bravenamme.github.io/files/posts/201908/spring_sec_authentication.png">

<br>

Spring Security는 스프링의 `DispatcherServlet` 앞단에 Filter 형태로 위치한다. Dispatcher로 넘어가기 전에 이 Filter가 요청을 가로채서, 클라이언트의 리소스 접근 권한을 확인하고, 없는 경우에는 인증 요청 화면으로 자동 리다이렉트한다.

<br>

### Spring Security Filter

<img src="https://t1.daumcdn.net/cfile/tistory/993341355B6B2A0A03">

Filter의 종류는 상당히 많다. 위에서 예시로 든 클라이언트가 리소스에 대한 접근 권한이 없을 때 처리를 담당하는 필터는 `UsernamePasswordAuthenticationFilter`다.

인증 권한이 없을 때 오류를 JSON으로 내려주기 위해 해당 필터가 실행되기 전 처리가 필요할 것이다.

<br>

API 인증 및 권한 부여를 위한 작업 순서는 아래와 같이 구성할 수 있다.

1. 회원 가입, 로그인 API 구현
2. 리소스 접근 가능한 ROLE_USER 권한을 가입 회원에게 부여
3. Spring Security 설정에서 ROLE_USER 권한을 가지면 접근 가능하도록 세팅
4. 권한이 있는 회원이 로그인 성공하면 리소스 접근 가능한 JWT 토큰 발급
5. 해당 회원은 권한이 필요한 API 접근 시 JWT 보안 토큰을 사용

<br>

이처럼 접근 제한이 필요한 API에는 보안 토큰을 통해서 이 유저가 권한이 있는지 여부를 Spring Security를 통해 체크하고 리소스를 요청할 수 있도록 구성할 수 있다.

<br>

### Spring Security Configuration

서버에 보안을 설정하기 위해 Configuration을 만든다. 기존 예시처럼, USER에 대한 권한을 설정하기 위한 작업도 여기서 진행된다.

```JAVA
@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable() // rest api 이므로 기본설정 사용안함. 기본설정은 비인증시 로그인폼 화면으로 리다이렉트
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable() // rest api이므로 csrf 보안이 필요없으므로 disable처리.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt token으로 인증하므로 세션은 필요없으므로 생성안함.
                .and()
                .authorizeRequests() // 다음 리퀘스트에 대한 사용권한 체크
                .antMatchers("/*/signin", "/*/signin/**", "/*/signup", "/*/signup/**", "/social/**").permitAll() // 가입 및 인증 주소는 누구나 접근가능
                .antMatchers(HttpMethod.GET, "home/**").permitAll() // home으로 시작하는 GET요청 리소스는 누구나 접근가능
                .anyRequest().hasRole("USER") // 그외 나머지 요청은 모두 인증된 회원만 접근 가능
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); // jwt token 필터를 id/password 인증 필터 전에 넣는다

    }
```

<br>

<br>

#### [참고 자료]

- [링크](https://dzone.com/articles/spring-security-authentication)
- [링크](https://daddyprogrammer.org/post/636/springboot2-springsecurity-authentication-authorization/)
- [링크](https://bravenamme.github.io/2019/08/01/spring-security-start/)

------
