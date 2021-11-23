---
title: "[CS] 면접 대비 Web(Spring~Devops)"
layout: post
subtitle: CS
date: "2021-11-13-06:58:53 +0900"
categories: study
tags: CS
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

# [Spring] Bean Scope

<br>

![image](https://user-images.githubusercontent.com/34904741/139436386-d6af0eba-0fb2-4776-a01d-58ea459d73f7.png)

<br>

```
Bean의 사용 범위를 말하는 Bean Scope의 종류에 대해 알아보자
```

<br>

Bean은 스프링에서 사용하는 POJO 기반 객체다.

상황과 필요에 따라 Bean을 사용할 때 하나만 만들어야 할 수도 있고, 여러개가 필요할 때도 있고, 어떤 한 시점에서만 사용해야할 때가 있을 수 있다.

이를 위해 Scope를 설정해서 Bean의 사용 범위를 개발자가 설정할 수 있다.

<br>

우선 따로 설정을 해주지 않으면, Spring에서 Bean은 `Singleton`으로 생성된다. 싱글톤 패턴처럼 특정 타입의 Bean을 딱 하나만 만들고 모두 공유해서 사용하기 위함이다. 보통은 Bean을 이렇게 하나만 만들어 사용하는 경우가 대부분이지만, 요구사항이나 구현에 따라 아닐 수도 있을 것이다.

따라서 Bean Scope는 싱글톤 말고도 여러가지를 지원해준다.

<br>

### Scope 종류

- #### singleton

  해당 Bean에 대해 IoC 컨테이너에서 단 하나의 객체로만 존재한다.

- #### prototype

  해당 Bean에 대해 다수의 객체가 존재할 수 있다.

- #### request

  해당 Bean에 대해 하나의 HTTP Request의 라이프사이클에서 단 하나의 객체로만 존재한다.

- #### session

  해당 Bean에 대해 하나의 HTTP Session의 라이프사이클에서 단 하나의 객체로만 존재한다.

- #### global session

  해당 Bean에 대해 하나의 Global HTTP Session의 라이프사이클에서 단 하나의 객체로만 존재한다.

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

# Spring MVC Framework

<br>

```
스프링 MVC 프레임워크가 동작하는 원리를 이해하고 있어야 한다
```

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


# [Spring Boot] Test Code

<br>

#### 테스트 코드를 작성해야 하는 이유

- 개발단계 초기에 문제를 발견할 수 있음
- 나중에 코드를 리팩토링하거나 라이브러리 업그레이드 시 기존 기능이 잘 작동하는 지 확인 가능함
- 기능에 대한 불확실성 감소

<br>

개발 코드 이외에 테스트 코드를 작성하는 일은 개발 시간이 늘어날 것이라고 생각할 수 있다. 하지만 내 코드에 오류가 있는 지 검증할 때, 테스트 코드를 작성하지 않고 진행한다면 더 시간 소모가 클 것이다.

```
1. 코드를 작성한 뒤 프로그램을 실행하여 서버를 킨다.
2. API 프로그램(ex. Postman)으로 HTTP 요청 후 결과를 Print로 찍어서 확인한다.
3. 결과가 예상과 다르면, 다시 프로그램을 종료한 뒤 코드를 수정하고 반복한다.
```

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

#  JPA

> Java Persistence API

<br>

```
개발자가 직접 SQL을 작성하지 않고, JPA API를 활용해 DB를 저장하고 관리할 수 있다.
```

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


# [Spring Data JPA] 더티 체킹 (Dirty Checking)

<br>

<img src="https://cdn.inflearn.com/public/courses/324474/course_cover/58c8632c-7a6e-4c76-9893-d7fffa32faf2/kyh_JPA_Spring2%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1%206.png">

<br>

```
트랜잭션 안에서 Entity의 변경이 일어났을 때
변경한 내용을 자동으로 DB에 반영하는 것
```

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


# Spring Security - Authentication and Authorization

<br>

```
API에 권한 기능이 없으면, 아무나 회원 정보를 조회하고 수정하고 삭제할 수 있다. 따라서 이를 막기 위해 인증된 유저만 API를 사용할 수 있도록 해야하는데, 이때 사용할 수 있는 해결 책 중 하나가 Spring Security다.
```

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



# Vue.js 라이프사이클

---

<br>

무작정 프로젝트를 진행하면서 적용하다보니, 라이프사이클을 제대로 몰라서 애를 먹고있다. Vue가 가지는 라이프사이클을 제대로 이해하고 넘어가보자.

<br>

Vue.js의 라이프사이클은 크게 4가지로 나누어진다.

> Creation, Mounting, Updating, Destruction

<br>

<img src="https://miro.medium.com/max/700/1*tnSXRrpLBYmfHnIagITlcg.png">

<br>

### Creation

> 컴포넌트 초기화 단계

Creation 단계에서 실행되는 훅(hook)들이 라이프사이클 중 가장 먼저 실행됨

아직 컴포넌트가 DOM에 추가되기 전이며 서버 렌더링에서도 지원되는 훅임

<br>

클라이언트와 서버 렌더링 모두에서 처리해야 할 일이 있으면, 이 단계에 적용하자

<br>

- #### beforeCreate

  가장 먼저 실행되는 훅

  아직 데이터나 이벤트가 세팅되지 않은 시점이므로 접근 불가능

- #### created

  데이터, 이벤트가 활성화되어 접근이 가능함

  하지만 아직 템플릿과 virtual DOM은 마운트 및 렌더링 되지 않은 상태임

<br>

<br>

### Mounting

> DOM 삽입 단계

초기 렌더링 직전 컴포넌트에 직접 접근이 가능하다.

컴포넌트 초기에 세팅되어야할 데이터들은 created에서 사용하는 것이 나음

<br>

- #### beforeMount

  템플릿이나 렌더 함수들이 컴파일된 후에 첫 렌더링이 일어나기 직전에 실행됨

  많이 사용하지 않음

- #### mounted

  컴포넌트, 템플릿, 렌더링된 DOM에 접근이 가능함

  모든 화면이 렌더링 된 후에 실행

<br>

#### 주의할 점

부모와 자식 관계의 컴포넌트에서 생각한 순서대로 mounted가 발생하지 않는다. 즉, 부모의 mounted가 자식의 mounted보다 먼저 실행되지 않음

> 부모는 자식의 mounted 훅이 끝날 때까지 기다림

<br>

### Updating

> 렌더링 단계

컴포넌트에서 사용되는 반응형 속성들이 변경되거나 다시 렌더링되면 실행됨

디버깅을 위해 컴포넌트가 다시 렌더링되는 시점을 알고 싶을때 사용 가능

<br>

- #### beforeUpdate

  컴포넌트의 데이터가 변하여 업데이트 사이클이 시작될 때 실행됨

  (돔이 재 렌더링되고 패치되기 직전 상태)

- #### updated

  컴포넌트의 데이터가 변하여 다시 렌더링된 이후에 실행됨

  업데이트가 완료된 상태이므로, DOM 종속적인 연산이 가능

<br>

### Destruction

> 해체 단계

<br>

- #### beforeDestory

  해체되기 직전에 호출됨

  이벤트 리스너를 제거하거나 reactive subscription을 제거하고자 할 때 유용함

- #### destroyed

  해체된 이후에 호출됨

  Vue 인스턴스의 모든 디렉티브가 바인딩 해제되고 모든 이벤트 리스너가 제거됨

<br>

<br>



### 추가로 사용하는 속성들
---

- #### computed

  템플릿에 데이터 바인딩할 수 있음

  ```vue
  <div id="example">
    <p>원본 메시지: "{{ message }}"</p>
    <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
  </div>

  <script>
      new Vue({
        el: '#example',
        data: {
          message: '안녕하세요'
        },
        computed: {
          // 계산된 getter
          reversedMessage: function () {
          // `this` 는 vm 인스턴스를 가리킵니다.
          return this.message.split('').reverse().join('')
          }
        }
       })
  </script>
  ```

  <br>

  > message의 값이 바뀌면, reversedMessage의 값도 따라 바뀜

  <br>

  `Date.now()`와 같이 의존할 곳이 없는 computed 속성은 업데이트 안됨

<br>

  ```javascript
  computed: {
    now: function () {
      return Date.now() //업데이트 불가능
    }
  }
  ```

<br>

  호출할 때마다 변경된 시간을 이용하고 싶으면 methods 이용

  <br>

- #### watch

  데이터가 변경되었을 때 호출되는 콜백함수를 정의

  watch는 감시할 데이터를 지정하고, 그 데이터가 바뀌면 어떠한 함수를 실행하라는 방식으로 진행

<br>

<br>

#### computed와 watch로 진행한 코드

```vue
//computed
<script>
    new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }
    })
</script>
```

<br>

```vue
//watch
<script>
    new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      watch: {
        firstName: function (val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName = this.firstName + ' ' + val
        }
      }
    })
</script>
```

<br>

computed는 선언형, watch는 명령형 프로그래밍 방식

watch를 사용하면 API를 호출하고, 그 결과에 대한 응답을 받기 전 중간 상태를 설정할 수 있으나 computed는 불가능

<br>

대부분의 경우 선언형 방식인 computed 사용이 더 좋으나, 데이터 변경의 응답으로 비동기식 계산이 필요한 경우나 시간이 많이 소요되는 계산을 할 때는 watch를 사용하는 것이 좋다.

----


# Vue CLI + Spring Boot 연동하여 환경 구축

---

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb2Pobh%2Fbtqwtl6pmaF%2F0fITFNedrPMn9uaEj8RrJK%2Fimg.png">

<br>

프론트엔드는 Vue.js로, 백엔드는 Spring Boot를 이용해서 프로젝트를 진행하려고 한다.

스프링에서 Jsp를 통해 view를 구축해봤지만, 이번엔 Vue.js를 활용해서 View를 모두 넘겨주려고 한다.

<br>

스프링에서 컨트롤러를 통해 DB 관리나 데이터에 관한 비즈니스 로직을 잘 처리하고, 이에 대한 값을 활용해 Vue에서 화면으로 뿌려줄 탬플릿을 만들어나가는 진행 방식이 되지 않을까 생각된다.

<br>

개발 툴은 VS Code로 진행한다.

[VS Code 다운로드](https://code.visualstudio.com/download)

<br>

Java와 Node.js도 기본적으로 깔린 상태여야 한다.

[Node.js 다운로드](https://nodejs.org/ko/download/)

<br>

<br>

VS Code를 열고, 자신이 프로젝트를 생성할 폴더로 들어가자 (File → Open Folder)

<br>

시작하기에 앞서, VS Code에서 필요한 플러그인을 설치한다.

왼쪽 메뉴탭에서 Extensions(단축키 : Ctrl + Shift + X)를 누르고, 검색창에서 아래 3가지를 입력 후 install 한다.

```
1. Vetur
2. Java IDE Pack
3. Lombok
```

<br>

<br>

### VS Code 한글 인코딩

현재 상태로는 VS Code에서 한글을 인식해주지 않는다. 인코딩을 따로 해줘야한다.

<br>

File → Preferences → Settings로 들어간다.

위의 검색창에 'settings.json'을 검색하면 아래와 같이 Edit할 수 있는 링크가 뜬다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FWSVv1%2Fbtqwr5pWRwm%2Fyx95AKviDEKtXNruHkwowK%2Fimg.png">

<br>

json 파일이 나오게 되는데, 이곳에서 'java.jdt.ls.vmargs'를 찾는다.

<br>

이곳에 value 값으로 '-Dfile.encoding=utf-8'를 추가해줘야한다.

추가 후에 java.jdt.ls.vmargs는 아래와 같이 될 것이다.

<br>

```
"java.jdt.ls.vmargs": "-Dfile.encoding=utf-8 -noverify -Xmx1G -XX:+UseG1GC -XX:+UseStringDeduplication -javaagent:\"lombok 경로~~"
```

<br>

<br>

### 프로젝트 구성하기

이제 프로젝트를 구성해보자!

<br>

#### 1.Spring Boot Project

<br>

먼저, 스프링 부트 프로젝트를 만든다. (우리는 스프링 부트 프로젝트 안에 Vue 프로젝트를 넣을 것이다)

프로젝트는 [Spring Initializr](https://start.spring.io/)을 이용할 것이다. 스프링 부트 프로젝트를 매우 쉽고 간편하게 만들어주는 곳이다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FTLnMo%2FbtqwrAw7TqQ%2FjBy8g9AOdUTh7cEVOhK4W0%2Fimg.png">

<br>

자신이 만들 프로젝트 목적에 맞게 설정해주면 된다.

Dependencies도 미리 추가해놓을 수 있다. (Web, JDBC, Lombok, MySQL 등)

나중에 따로 추가할 수 있으니 기억나는 것들만 지정해도 무방하다.

<br>

프로젝트 Metadata 부분은 생성할 프로젝트 패키지나 이름 등 옵션을 지정해줄 수 있다. 처음에는 demo로 되어있는데 자신이 만들고 싶은대로 수정할 수 있다.

<br>

마지막으로 'Generate the project' 버튼을 클릭하면, zip 파일로 프로젝트가 다운로드 된다. 해당 파일을 압축 해제하고 현재 VS Code에서 접속 중인 폴더에 복사하면 된다.

<br>

<br>

<br>

#### 2.Vue.js Project

<br>

이제 스프링 부트에서 Vue.js 프로젝트를 만들어보자. 프로젝트 생성은 Vue CLI를 이용할 것이다.

<br>

Vue CLI는 Vue.js 개발을 위한 시스템으로, Vue.js Core에서 공식적으로 제공하는 CLI다. 개발에 집중할 수 있도록 프로젝트 구성을 빠르고 쉽게 도와주는 역할을 하고 있다.

(따라서 반드시 이용해야 한다는 건 아니다. 다만 쉽게 구축할 수 있도록 만들어준거니 이용하면 편하다)

<br>

현재는 Vue CLI 버전 3가 나온 상태다. 2보다 더욱 편하고 많은 기능들을 제공한다고 하지만, 많은 정보가 없어서 일단 2로 진행하고자 한다.

<br>

Node.js를 설치한 상태기 때문에, npm을 통해 터미널에서 Vue CLI 설치가 가능하다.

<br>

VS Code에서 터미널을 열고, 아래와 같이 설치를 진행하자

```
$ npm i -g @vue/cli
$ npm i -g @vue/cli-init
```

<br>

@vue/cli-init은 2버전 템플릿을 가져오기 위한 vue init을 제공해준다.

이제 필요한 설치는 끝났다! Vue 프로젝트를 만들어보자. 이름은 그냥 frontend로 생성했다.

<br>

(현재 프로젝트 생성은, 스프링 부트 루트 폴더 위치에서 진행하는 것이다.)

```
$ vue init webpack frontend
```

<br>

몇가지 설정하는 부분이 나온다.

<br>

> Project name
>
> Project description
>
> Author

<br>

이 3가지는 자신의 프로젝트에 맞게 작성해주면 된다.

> Vue build는 standalone
>
> vue-router는 설치(Yes)
>
> Use ESLint to lint your code도 Yes
>
> ESLint preset은 Standard

<br>

그 이후 test부분은 진행할 사람들은 Yes, 안할사람은 No로 넘어가면 된다.

터미널 창에서 열심히 파일들이 다운로드되는 모습을 볼 수 있다. (시간 조금 걸림)

<br>

끝나면 스프링부트 루트 폴더에 'frontend'라는 Vue 프로젝트 폴더가 생성된 모습을 확인할 수 있다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2F0543k%2Fbtqwq5xDdXA%2F9jkKem7iR2QXlo9C3SYbk0%2Fimg.png">

<br>

<br>

#### Webpack 번들링 output 설정

<br>

Vue에서 작성한 코드들을 번들링하고, 이 결과를 어느 위치에서 뽑아낼 지 정해야 한다.

<br>

Spring Boot에서는 자동설정으로 src/main/resources에 번들링한 결과들을 저장하도록 되어있다.

(이곳에 index.html과 정적 파일(css, img, javascript)들이 인식됨)

<br>

이 구역에 잘 번들링 될 수 있도록, Vue 프로젝트에서 경로 지정을 해주자.

config/index.js을 열어 build 부분에 정의한 곳을 수정해야 한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FypIZ4%2FbtqwrRyGxV2%2F6kBWA8wH0C3CKECs9ITy40%2Fimg.png">

<br>

해당 위치에 절대 경로로 위와 같이 수정해준다.

<br>

이제 터미널에서 'npm run build' 커맨드를 입력하여 빌드를 실행한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbdPbwS%2FbtqwrBbLXZE%2FSK29p5xKxGDkZ3cNZ5al6K%2Fimg.png">

이제 Spring Boot의 src/main/resources/static 경로에 들어가보면, 번들링 된 정적 파일들이 생성된 모습을 확인할 수 있다.

<br>

이제 스프링 부트 애플리케이션을 실행해보자

.vscode 폴더의 launch.json에 들어가서 F5키를 누르면 스프링 부트 서버가 실행된다.

<br>

???

에러가 뜰 것이다.

```

***************************
APPLICATION FAILED TO START
***************************
Description:
Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class

```

datasource 내용이 없어서 뜬 에러다.

<br>

스프링부트에서 프로젝트를 생성할 때, application.properties 파일이 자동생성되나 확인해보면 빈 파일일 것이다.

사용자가 원하는 데이터베이스를 선택하고, 그에 맞는 드라이버 라이브러리 설치와 jdbc 설정을 직접 해야한다.

<br>

이 공간이 비어있기 때문에 서버가 실행을 하고 있지 못하는 것이다. 현재는 어떤 데이터베이스를 지정할 지 결정이 되있는 상태가 아니기 때문에 스프링 부트의 메인 클래스에서 어노테이션을 추가해주자

<br>


 ```

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})

 ```

이를 추가한 메인 클래스는 아래와 같이 된다.

<br>

```java
package com.example.mvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class MvcApplication {

    public static void main(String[] args) {
        SpringApplication.run(MvcApplication.class, args);
    }

}
```

<br>

이제 다시 스프링 부트 메인 애플리케이션을 실행하면, 디버깅 창에서 에러가 없어진 걸 확인할 수 있다.

<br>

이제 localhost:8080/으로 접속하면, Vue에서 만든 화면이 잘 나오는 것을 확인할 수 있다.

<br>

 <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FHGlD8%2Fbtqwr6biQpm%2FXeCKMJsUr0HbcXiWa3S98K%2Fimg.png">

<br>

Vue.js에서 View에 필요한 템플릿을 구성하고, 스프링 부트에 번들링하는 과정을 통해 연동하는 과정을 완료했다!

<br>

<br>




----



# Vue.js + Firebase로 이메일 회원가입/로그인 구현

---

<br>

Vue.js와 Firebase를 통한 이메일 로그인을 구현해보자

<br>

우선 설치해야할 것

```
$ npm -i -g @vue/cli
$ npm -i -g @vue/cli-init
```

<br>

> @vue/cli-init은 2.0버전을 사용하기 위한 설치!

<br>

vue-cli는 템플릿 기반 프로젝트 초기 구성을 간편하게 할 수 있도록 도와준다!

<br>

### 프로젝트 생성

```
$ vue init webpack "프로젝트 이름"
```

<br>

이름과 같은 환경설정을 해주면 vue 프로젝트가 생성된다.

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/vue%20init.JPG?raw=true">

<br>

이제 해당 경로로 들어가서 npm 설치를 진행한다.

```
$ cd "프로젝트 이름"
$ npm install
```

<br>

> 만약 npm install 후에 `vulnerabilities` 알림이 뜨면, npm audit fix를 통해 충돌나는 부분에 대한 문제를 해결하자

<br>

이제 npm 설치가 끝났으니 프로젝트를 실행해보자

```
$ npm run dev
```

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/run%20%ED%99%94%EB%A9%B4.JPG?raw=true">

<br>

화면이 잘 나온다! 순조롭게 잘 실행했다는 뜻~

<br>

현재 만들어진 기본적인 Vue.js 파일 구조를 이해하지 못한 사람은 먼저 구조를 이해하고 다음 과정을 진행합시다.

<br>

<br>

### vue-router 활용하기

회원가입과 로그인 과정을 진행하기 위해, 3개의 view에 해당하는 컴포넌트를 src/components 폴더 아래에 만들고 vue-router를 통해 이동해볼 것이다.

- Login 컴포넌트 : 로그인 하는 곳
- Signup 컴포넌트 : 회원가입 하는 곳
- Show 컴포넌트 : 로그인해야 볼 수 있는 곳 (기존의 HelloWorld.vue)

<br>

<br>




### 로그인 구현
---

<br>

src/components에 Login.vue를 만들자

<br>

```vue
<template>
  <div class="login">
    <h3>Login</h3>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button>로그인</button>
    <p>만약 계정이 없다면, 회원가입을 먼저 진행해주세요!</p>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 15px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
```

<br>

이제 로그인을 router/index.js에 라우터를 추가해주자.

<br>

```javascript
import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
```

<br>

> url 중간에 "#"을 지우기 위해서는 라우터에서 mode: 'history'를 위와 같이 추가해주면 된다.

<br>

이제 <http://localhost:8080/login>로 접속하면 아래와 같은 로그인 화면이 나온다.

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/login.JPG?raw=true">

style을 적용시켜서 이쁘게 화면을 구현시킬 수 있다ㅎㅎ

<br>

### 회원가입 구현

---

로그인처럼 같은 방식으로 회원가입에 해당하는 컴포넌트와 라우터 연결을 진행해보자

#### src/components/SignUp.vue

```vue
<template>
  <div class="sign-up">
    <p>회원가입</p>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button>가입하기</button>
    <span>또는 로그인으로 돌아가기</span>
  </div>
</template>

<script>
  export default {
    name: 'signUp',
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .signUp {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 20px;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 15px;
  }
</style>
```

<br>

#### router/index.js

```javascript
import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
```

<br>

이제 <http://localhost:8080/signup> 경로로 들어가면 아래와 같이 회원가입 창이 잘 나오는 것을 확인할 수 있다.

<br>

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/signup.JPG?raw=true">

<br>

<br>

### 컴포넌트간 이동하기

---

컴포넌트와 컴포넌트간 이동을 하기 위해서는 `router-link`를 사용한다.



로그인과 회원가입 vue 폴더에서 서로 이동하도록 link를 사용해보자

#### Login.vue

```vue
<template>
  <div class="login">
    <h3>Login</h3>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button>로그인</button>
    <p>만약 계정이 없다면, <router-link to="/signup">회원가입</router-link>을 먼저 진행해주세요!</p>
  </div>
</template>
```

#### SignUp.vue

```vue
<template>
  <div class="sign-up">
    <p>회원가입</p>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button>가입하기</button>
    <span>또는 <router-link to="/login">로그인</router-link>으로 돌아가기</span>
  </div>
</template>
```

이처럼 link 태그에 to="/경로"를 통해 컴포넌트 이동이 가능하다.

다시 화면으로 돌아가면, a태그와 같이 링크가 걸려있고 클릭 시 컴포넌트가 잘 이동되는 것을 확인할 수 있을 것이다.

<br>

<br>



현재는 인증 단계가 진행되지 않은 상태이므로, 로그인이 완료되었을 때 helloWorld.vue 화면으로 이동이 되도록만 replace 메소드를 적용시켜보자

#### Login.vue

```vue
<template>
  <div class="login">
    <h3>Login</h3>
    <input type="email" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button v-on:click="login">로그인</button>
    <p>만약 계정이 없다면, <router-link to="/signup">회원가입</router-link>을 먼저 진행해주세요!</p>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
      }
    },
    methods: {
      login() {
        this.$router.replace('hello')
      }
    }
  }
</script>

<style scoped>
 ...
</style>
```

<br>

로그인 button에 `v-on:click`을 통해 버튼을 눌렀을 때 login() 메소드가 실행되도록 해둔 상태다. methods에서 구현한 login 메소드가 실행되며, hello라는 경로를 가진 페이지로 이동하는 메소드다.

<br>

현재 hello라는 경로가 없기 때문에, 기존의 root 경로를 hello로 변경해주자

<br>

```javascript
import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
```

<br>

root 경로의 path를 `/`에서 `/hello`로 변경했다.

이제 로그인 창에서 이메일과 패스워드를 입력 후 로그인을 누르면 HelloWorld.vue로 이동하는 것을 확인할 수 있을 것이다.

<br>

<br>



### 파이어베이스 연동

---

프론트 구현은 끝났다. 이제 가장 중요한 파이어베이스 연동이다.



파이어베이스를 사용하기 위해, 파이어베이스 콘솔에서 새로운 프로젝트를 생성하자

[파이어베이스 콘솔 링크](<https://console.firebase.google.com/>)

<br>

### 프로젝트 추가

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%ED%8C%8C%EC%9D%B4%EC%96%B4%EB%B2%A0%EC%9D%B4%EC%8A%A4%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B6%94%EA%B0%80.JPG?raw=true">

프로젝트 추가버튼 클릭

<br>

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%ED%8C%8C%EC%9D%B4%EC%96%B4%EB%B2%A0%EC%9D%B4%EC%8A%A4%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B6%94%EA%B0%802.JPG?raw=true">

<br>

이제 파이어베이스 프로젝트 생성이 완료되었다.

해당 프로젝트에 들어가면 코드 스니펫 모양이 있는데, 웹 앱을 추가하는 곳이다. 클릭해서 웹 앱에 파이어베이스를 추가하자

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%EC%9B%B9%EC%95%B1%20%EC%B6%94%EA%B0%80.JPG?raw=true">

앱 닉네임을 정하고, 등록을 누르면 스크립트가 나올 것이다.

이 스크립트에 있는 config를 우리 vue 프로젝트에 적용시킬 것이다.

<br>

```javascript
var firebaseConfig = {
    apiKey: "개인 API KEY",
    authDomain: "개인 프로젝트 ID.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial-da26f.firebaseio.com",
    projectId: "vue-firebase-tutorial-da26f",
    storageBucket: "",
    messagingSenderId: "173286603007",
    appId: "1:173286603007:web:2258c081f9102650"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
```

<br>

코드 중에서 이 부분만 가져와서 활용할 것이다.

<br>

적용시키기 전에 터미널에서 firebase를 설치하자

```
$ npm install --save firebase
```

설치가 끝나면, main.js 파일에다 Firebase를 아래와 같이 적용시키자

<br>

```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: "개인 API KEY",
    authDomain: "개인 프로젝트 ID.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial-da26f.firebaseio.com",
    projectId: "vue-firebase-tutorial-da26f",
    storageBucket: "",
    messagingSenderId: "173286603007",
    appId: "1:173286603007:web:2258c081f9102650"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

<br>

<br>

### 회원가입 컴포넌트에서 파이어베이스 사용자 생성하기

---

이제 회원가입을 통해 가입한 사용자 데이터를 파이어베이스에게 전송해줘야 한다.

회원가입 시 필요한 email과 password를 받아서 전송해야 하는데, **양방향 데이터 바인딩을 지원하는 v-model을 활용**하자

```vue
<input type="text" v-model="email" placeholder="email"><br>
<input type="password" v-model="password" placeholder="password"><br>
<button v-on:click="signUp">가입하기</button>
```

> 이처럼 회원가입의 template에서 v-model과 메소드를 실행할 v-on을 추가한다.

<br>

#### signUp() 메소드 구현

```vue
<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          function(user) {
            alert('회원가입 완료!')
          },
          function(err) {
            alert('에러 : ' + err.message)
          }
        );
      }
    }
  }
</script>
```

<br>

createUserWithEmailAndPassword 메소드는 onResolve, onReject 콜백과 파이어베이스의 프로미스를 반환해준다.

<br>

<br>

### 파이어베이스 로그인 공급자 활성화시키기

---

다시 파이어베이스 콘솔로 돌아가자

왼쪽 사이드바를 열고, DEVELOP의 Authentication으로 들어간다.

<br>

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/authentication.JPG?raw=true">

로그인 방법으로 들어가서 `이메일/비밀번호`를 활성화 시킨다.

<br>

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%ED%99%9C%EC%84%B1%ED%99%94.JPG?raw=true">

사용 설정됨으로 표시되면, 이제 사용자 가입 시 파이어베이스에 저장이 가능하다!

<br>

회원가입 view로 가서 이메일과 비밀번호를 입력하고 가입해보자

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%EC%84%B1%EA%B3%B5.JPG?raw=true">



회원가입이 정상적으로 완료되었다는 alert가 뜬다. 진짜 파이어베이스에 내 정보가 저장되어있나 확인하러 가보자

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%EC%82%AC%EC%9A%A9%EC%9E%90%ED%99%95%EC%9D%B8.JPG?raw=true">

오오..사용자 목록을 눌러보면, 내가 가입한 이메일이 나오는 것을 확인할 수 있다.

이제 다음 진행은 당연히 뭘까? 내가 로그인할 때 **파이어베이스에 등록된 이메일과 일치하는 비밀번호로만 진행**되야 된다.

<br>

<br>

### 사용자 로그인

회원가입 시 진행했던 것처럼 v-model 설정과 로그인 버튼 클릭 시 진행되는 메소드를 파이어베이스의 signInWithEmailAndPassword로 수정하자

```vue
<template>
  <div class="login">
    <h3>Login</h3>
    <input type="text" v-model="email" placeholder="email"><br>
    <input type="password" v-model="password" placeholder="password"><br>
    <button v-on:click="login">로그인</button>
    <p>만약 계정이 없다면, <router-link to="/signup">회원가입</router-link>을 먼저 진행해주세요!</p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          function(user) {
            alert('로그인 완료!')
          },
          function(err) {
            alert('에러 : ' + err.message)
          }
        );
      }
    }
  }
</script>
```

이제 다 끝났다.

로그인을 진행해보자! 우선 비밀번호를 제대로 입력하지 않고 로그인해본다

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%20%EB%B6%88%EC%9D%BC%EC%B9%98%EC%8B%9C.JPG?raw=true">

에러가 나오면서 로그인이 되지 않는다!

<br>

다시 제대로 비밀번호를 치면?!

<img src="https://github.com/kim6394/tech-interview-for-developer/blob/master/resources/%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%EC%84%B1%EA%B3%B5.JPG?raw=true">

제대로 로그인이 되는 것을 확인할 수 있다.

<br>

이제 로그인이 되었을 때 보여줘야 하는 화면으로 이동을 하거나 로그인한 사람이 관리자면 따로 페이지를 구성하거나를 구현하고 싶은 계획에 따라 만들어가면 된다.




-----


.# Vue.js + Firebase로 페이스북(facebook) 로그인 연동하기

---

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbDIKm5%2FbtqwCrAc0kZ%2FtkCKCfOi1OLeyIkI8vmpe1%2Fimg.png">

<br>

우선, 기존의 파이어베이스 콘솔에서 Authentication의 로그인 방법으로 들어가자

우리는 이메일/비밀번호를 활성화 시켜서 회원가입과 로그인을 가능하도록 구현했었다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbgObPY%2FbtqwBPBBzJ0%2F2CogtLkNhAE0exbMVUKSu1%2Fimg.jpg">

<br>

위 사진처럼 페이스북도 상태를 사용으로 만들어야 한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb7WzfJ%2FbtqwCRyLtJZ%2F8tyKM9EK7kFx4BIDUWbQy0%2Fimg.jpg">

<br>

아래에 나오는 OAuth 리디렉션 URI를 복사하고, facebook for developers로 이동한다.

[Facebook for developers 링크](https://developers.facebook.com)

<br>

해당 사이트에서 페이스북 아이디를 통해 로그인이 가능하다.

앱을 새로 하나 생성하자. 앱 이름은 알아서 정하면 된다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbKAP4Y%2FbtqwFB9fgIc%2FNStytIGaIHK2ernu7JHuk1%2Fimg.jpg">

<br>

앱을 생성하면 대시보드 화면이 나올 것이다.

(현재 스크린샷은 라이브 상태로 되어있지만, 처음 만들었을 때는 개발모드 상태일 것이다.)

페이지를 아래로 내려보면 제품 추가 항목이 존재한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FGQpSa%2FbtqwExeWknp%2FQm6AkZnEyOh9aQvwIYXzqK%2Fimg.jpg">

이중에 'Facebook 로그인'항목이 우리가 필요한 것이다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FB06Xm%2FbtqwCpJd5b4%2FIxI9SmhR85xTgCRYkTEFv0%2Fimg.jpg">

<br>

유효한 OAuth 리디렉션 URI의 공란에 아까 파이어베이스에서 복사한 URI를 붙여넣기 하고 저장해주면 된다.

<br>

이제 우리 Facebook 앱을 배포시에도 정상 작동할 수 있도록 공개상태로 전환시켜야한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FlHRPy%2FbtqwFPzp8he%2FvmBIHktkzGMIrMMYMo6fCk%2Fimg.jpg">

<br>

설정 → 기본 설정으로 들어가면, 다음과 같은 화면이 나올 것이다.

여기서 '개인정보처리방침 URL'을 등록해야만 앱을 공개상태로 바꿀 수 있다.

현재는 연습단계이므로, 아무 url이나 작성하고 저장한다.

이제 중앙 위쪽에 설정을 키면, 앱이 정상적으로 실행될 것이다!

<br>

이제 설정창에 존재하는 앱 ID와 앱 시크릿 코드를 파이어베이스에서 페이스북 연동을 하기 위해 사용할 것이다.

(시크릿 코드는 비밀번호를 한번더 입력하면 볼 수 있다.)

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fc5QEd8%2FbtqwCRk8Tsz%2Fk2DlVAZkD4mgLmKoifN4hK%2Fimg.jpg">

다시 파이어베이스로 돌아가서, 앱ID와 앱 비밀번호를 입력하자

이제 Facebook 사용 설정이 모두 끝났다.

<br>

코드로 파이어베이스를 로그인 화면에서 불러오는 메소드를 작성해주면 된다.

<br>

#### Login.vue의 템플릿 부분

```vue
<template>
<div class="login">
  <h3>로그인</h3>
  <input type="text" v-model="email" placeholder="email"><br>
  <input type="password" v-model="password" placeholder="password"><br>
  <button v-on:click="login">로그인</button>
  <p>또는 페이스북 로그인 <br>
    <button class="social-button" v-on:click="facebookLogin">
      <img alt="Facebook Logo" src="../assets/facebook-logo.png">
    </button>
  </p>
  <p>만약 계정이 없다면, <router-link to="/signup">회원가입</router-link>을 먼저 진행해주세요!</p>
</div>
</template>
```

<br>

기존 화면에서 페이스북 로그인 부분을 추가했다.

<br>

인터넷에서 페이스북 로고 이미지(facebook-logo.png)를 다운받아서, 프로젝트 폴더의 src/assets에다가 추가하자.

<br>

#### 페이스북 로그인 연동 script

```vue
<script>
import firebase from 'firebase'

var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      ...
    },
    facebookLogin() {
      firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken
        var user = result.user

        console.log("token : " + token)
        console.log("user : " + user)

        this.$router.replace('welcome')

      }).catch((err) => {
        alert('에러 : ' + err.message)
      })
    }
  }
}
</script>
```

<br>

파이어베이스에서 facebookauth를 불러오고, provider 변수로 작업한다.

setCustomParameters의 display를 popup으로 줘서, 버튼을 클릭했을 때 팝업창으로 페이스북 로그인이 진행되도록 한 것이다.

버튼에 작성한 facebookLogin 메소드를 firebase.auth().signInWithPopup로 가져와서 페이스북 로그인을 진행할 수 있다.

<br>

#### Login.vue의 전체 소스코드

```vue
<template>
<div class="login">
  <h3>로그인</h3>
  <input type="text" v-model="email" placeholder="email"><br>
  <input type="password" v-model="password" placeholder="password"><br>
  <button v-on:click="login">로그인</button>
  <p>또는 페이스북 로그인 <br>
    <button class="social-button" v-on:click="facebookLogin">
      <img alt="Facebook Logo" src="../assets/facebook-logo.png">
    </button>
  </p>
  <p>만약 계정이 없다면, <router-link to="/signup">회원가입</router-link>을 먼저 진행해주세요!</p>
</div>
</template>

<script>
import firebase from 'firebase'

var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('welcome')
        },
        (err) => {
          alert('에러 : ' + err.message)
        }
      );
    },
    facebookLogin() {
      firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken
        var user = result.user

        console.log("token : " + token)
        console.log("user : " + user)

        this.$router.replace('welcome')

      }).catch((err) => {
        alert('에러 : ' + err.message)
      })
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p {
  margin-top: 40px;
  font-size: 15px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}

.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.social-button img {
  width: 100%;
}
</style>
```

<br>

style을 통해 페이스북 로그인 화면도 꾸민 상태다.

<br>

<br>

이제 서버를 실행하고 로그인 화면을 보자

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FUVSvA%2FbtqwCP1TKip%2FZUhB0sUvM0cBgedWNQdx00%2Fimg.jpg">

<br>

페이스북 로고 사진을 누르면?

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FmyOvv%2FbtqwFAP25Id%2F3mEekrZxZJBR97JwK9O2U1%2Fimg.jpg">

페이스북 로그인 창이 팝업으로 뜨는걸 확인할 수 있다.

이제 자신의 페이스북 아이디와 비밀번호로 로그인하면 welcome 페이지가 정상적으로 나올 것이다.

<br>

마지막으로 파이어베이스에 사용자 정보가 저장된 데이터를 확인해보자

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbbnHdk%2FbtqwCrmHfn1%2FdeNFk5k34JKfLJvB2JSASK%2Fimg.jpg">

<br>

페이스북으로 로그인한 사람의 정보도 저장되어있는 모습을 확인할 수 있다. 페이스북으로 로그인한 사람의 이메일이 등록되면 로컬에서 해당 이메일로 회원가입이 불가능하다.

<br>

위처럼 간단하게 웹페이지에서 페이스북 로그인 연동을 구현시킬 수 있고, 다른 소셜 네트워크 서비스들도 유사한 방법으로 가능하다.


--------


# Nuxt.js

---

<br>

<img src="https://t1.daumcdn.net/cfile/tistory/990CB73A5AF842A422">

<br>

> vue.js를 서버에서 렌더링할 수 있도록 도와주는 오픈소스 프레임워크

서버, 클라이언트 코드의 배포를 축약시켜 SPA(싱글페이지 앱)을 간편하게 만들어준다.

Vue.js 프로젝트를 진행할 때, 서버 부분을 미리 구성하고 정적 페이지를 만들어내는 기능을 통해 UI 렌더링을 보다 신속하게 제공해주는 기능이 있다.

<br>

<br>

***들어가기에 앞서***

- SSR(Server Side Rendering) : 서버 쪽에서 페이지 컨텐츠들이 렌더링된 상태로 응답해줌

- CSR(Client Side Rendering) : 클라이언트(웹브라우저) 쪽에서 컨텐츠들을 렌더링하는 것

- SPA(Single Page Application) : 하나의 페이지로 구성된 웹사이트. index.html안에 모든 웹페이지들이 javascript로 구현되어 있는 형태

> SPA는 보안 이슈나 검색 엔진 최적화에 있어서 단점이 존재. 이를 극복하기 위해 처음 불러오는 화면은 SSR로, 그 이후부터는 CSR로 진행하는 방식이 효율적이다.

<br>


***Nuxt.js는 왜 사용하나?***

vue.js를 서버에서 렌더링하려면 설정해야할 것들이 한두개가 아니다ㅠ

보통 babel과 같은 webpack을 통해 자바스크립트를 빌드하고 컴파일하는 과정을 거치게 된다. Node.js에서는 직접 빌드, 컴파일을 하지 않으므로, 이런 것들을 분리하여 SSR(서버 사이드 렌더링)이 가능하도록 미리 세팅해두는 것이 Nuxt.js다.

> Vue에서는 Nuxt를, React에서는 Next 프레임워크를 사용함

<br>

Nuxt CLI를 통해 쉽게 프로젝트를 만들고 진행할 수 있음

```
$ vue init nuxt/starter <project-name>
```

기본적으로 `vue-router`나 `vuex`를 이용할 수 있게 디렉토리가 준비되어 있기 때문에 Vue.js로 개발을 해본 사람들은 편하게 활용이 가능하다.

<br>

#### 장점

---

- 일반적인 SPA 개발은, 검색 엔진에서 노출되지 않아 조회가 힘들다. 하지만 Nuxt를 이용하게 되면 서버사이드렌더링으로 화면을 보여주기 때문에, 검색엔진 봇이 화면들을 잘 긁어갈 수 있다. 따라서 **SPA로 개발하더라도 SEO(검색 엔진 최적화)를 걱정하지 않아도 된다.**

  > 일반적으로 많은 회사들은 검색엔진에 적절히 노출되는 것이 매우 중요함. 따라서 **검색 엔진 최적화**는 개발 시 반드시 고려해야 할 부분

- SPA임에도 불구하고, Express가 서버로 뒤에서 돌고 있다. 이는 내가 원하는 API를 프로젝트에서 만들어서 사용할 수 있다는 뜻!



#### 단점

---

Nuxt를 사용할 때, 단순히 프론트/백엔드를 한 프로젝트에서 개발할 수 있지않을까로 접근하면 큰코 다칠 수 있다.

ex) API 요청시 에러가 발생하면, 프론트엔드에게 오류 발생 상태를 전달해줘야 예외처리를 진행할텐데 Nuxt에서 Express 에러까지 먹어버리고 리디렉션시킴

> API부분을 Nuxt로 활용하는 게 상당히 어렵다고함



----


# [React] Fragment

<br>

```
JSX 파일 규칙상 return 시 하나의 태그로 묶어야한다.
이런 상황에 Fragment를 사용하면 쉽게 그룹화가 가능하다.
```

<br>

아래와 같이 Table 컴포넌트에서 Columns를 불렀다고 가정해보자

```JSX
import { Component } from 'React'
import Columns from '../Components'

class Table extends Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

<br>

Columns 컴포넌트에서는 `<td> ~~ </td>`와 같은 element를 반환해야 유효한 테이블 생성이 가능할 것이다.

```jsx
import { Component } from 'React'

class Columns extends Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

여러 td 태그를 작성하기 위해 div 태그로 묶었다. (JSX 파일 규칙상 return 시 하나의 태그로 묶어야한다.)

이제 Table 컴포넌트에서 DOM 트리를 그렸을 때 어떻게 결과가 나오는지 확인해보자

<br>

```html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Columns 컴포넌트에서 div 태그로 묶어서 Table 컴포넌트로 보냈기 때문에 문제가 발생한다. 따라서 JSX파일의 return문을 무조건 div 태그로 묶는 것이 바람직하지 않을 수 있다.

이때 사용할 수 있는 문법이 바로 `Fragment`다.

```jsx
import { Component } from 'React'

class Columns extends Component {
  render() {
    return (
      <Fragment>
        <td>Hello</td>
        <td>World</td>
      </Fragment>
    );
  }
}
```

div 태그 대신에 Fragment로 감싸주면 문제가 해결된다. Fragment는 DOM트리에 추가되지 않기 때문에 정상적으로 Table을 생성할 수 있다.

<br>

Frament로 명시하지 않고, 빈 태그로도 가능하다.

```JSX
import { Component } from 'React'

class Columns extends Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

<br>

이 밖에도 부모, 자식과의 관계에서 flex, grid로 연결된 element가 있는 경우에는 div로 연결 시 레이아웃을 유지하는데 어려움을 겪을 수도 있다.

따라서 위와 같은 개발이 필요할 때는 Fragment를 적절한 상황에 사용하면 된다.

<br>

<br>

#### [참고 사항]

- [링크](https://velog.io/@dolarge/React-Fragment%EB%9E%80)

----

# React Hook

> useState(), useEffect() 정의

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcbKGwj%2FbtqC5pwunG7%2FYkaJ6YKK5YSESx7Gs2x410%2Fimg.jpg">

<br>

리액트의 Component는 '클래스형'과 '함수형'으로 구성되어 있다.

기존의 클래스형 컴포넌트에서는 몇 가지 어려움이 존재한다.

1. 상태(State) 로직 재사용 어려움
2. 코드가 복잡해짐
3. 관련 없는 로직들이 함께 섞여 있어 이해가 힘듬

이와 같은 어려움을 해결하기 위해, 'Hook'이 도입되었다. (16.8 버전부터)

<br>

### Hook

- 함수형 컴포넌트에서 State와 Lifecycle 기능을 연동해주는 함수
- '클래스형'에서는 동작하지 않으며, '함수형'에서만 사용 가능

<br>

#### useState

기본적인 Hook으로 상태관리를 해야할 때 사용하면 된다.

상태를 변경할 때는, `set`으로 준 이름의 함수를 호출한다.

```jsx
const [posts, setPosts] = useState([]); // 비구조화 할당 문법
```

`useState([]);`와 같이 `( )` 안에 초기화를 설정해줄 수 있다. 현재 예제는 빈 배열을 만들어 둔 상황인 것이다.

<br>

#### useEffect

컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook

> '클래스' 컴포넌트의 componentDidMount()와 componentDidUpdate()의 역할을 동시에 한다고 봐도 된다.

```jsx
useEffect(() => {
    console.log("렌더링 완료");
    console.log(posts);
});
```

posts가 변경돼 리렌더링이 되면, useEffect가 실행된다.

<br>

<br>

#### [참고자료]

- [링크](https://ko.reactjs.org/docs/hooks-intro.html)


---


# React & Spring Boot 연동

---

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FANf2v%2Fbtqw4m6O105%2F5YoRpX1xO9NGkyjwbOKFV1%2Fimg.png">


<br>

React와 Spring Boot의 연동을 연습해보자

<br>

> **Front-end** : React
>
> **Back-end** : Spring Boot

<br>

**스프링 부트를 통해 서버 API 역할을 구축**하고, **UI 로직을 React에서 담당**
( React는 컴포넌트화가 잘되어있어서 재사용성이 좋고, 수많은 오픈소스 라이브러리 활용 장점 존재)

<br>

#### 개발 환경도구 (설치할 것)

- VSCode : 확장 프로그램으로 Java Extension Pack, Spring Boot Extension Pack 설치
   (메뉴-기본설정-설정에서 JDK 검색 후 'setting.json에서 편집'을 들어가 `java.home`으로 jdk 경로 넣어주기)

```
"java.home":  "C:\\Program Files\\Java\\jdk1.8.0_181" // 자신의 경로에 맞추기
```

- Node.js : 10.16.0

- JDK(8 이상)

<br>

<br>

### Spring Boot 웹 프로젝트 생성

---

1. VSCode에서 `ctrl-shift-p` 입력 후, spring 검색해서
   `Spring Initalizr: Generate Maven Project Spring` 선택
   <br>

2. 프로젝트를 선택하면 나오는 질문은 아래와 같이 입력

   > - **언어** : Java
   > - **Group Id** : no4gift
   > - **Artifact Id** : test
   > - **Spring boot version** : 2.1.6
   > - **Dependency** : DevTools, Spring Web Starter Web 검색 후 Selected

   <br>

3. 프로젝트를 저장할 폴더를 지정하면 Spring Boot 프로젝트가 설치된다!

<br>

일단 React를 붙이기 전에, Spring Boot 자체로 잘 구동되는지 진행해보자

JSP와 JSTL을 사용하기 위해 라이브러리를 추가한다. pom.xml의 dependencies 태그 안에 추가하자

```xml
<dependency>
	<groupId>org.apache.tomcat.embed</groupId>
	<artifactId>tomcat-embed-jasper</artifactId>
	<scope>provided</scope>
</dependency>
<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>jstl</artifactId>
	<scope>provided</scope>
</dependency>
```

<br>

이제 서버를 구동해보자

VSCode에서 터미널 창을 열고 `.\mvnw spring-boot:run`을 입력하면 서버가 실행되는 모습을 확인할 수 있다.

<br>

***만약 아래와 같은 에러가 발생하면?***

```
***************************
APPLICATION FAILED TO START
***************************

Description:

The Tomcat connector configured to listen on port 8080 failed to start. The port may already be in use or the connector may be misconfigured.
```

<br>

8080포트를 이미 사용 중이라 구동이 되지 않는 것이다.

cmd창을 관리자 권한으로 열고 아래와 같이 진행하자

<br>

```
netstat -ao |find /i "listening"
```

<br>

현재 구동 중인 포트들이 나온다. 이중에 8080 포트를 확인할 수 있을 것이다.

가장 오른쪽에 나오는 숫자가 PID번호다. 이걸 kill 해줘야 한다.

<br>

```
taskkill /f /im [pid번호]
```

<br>

다시 서버를 구동해보면 아래처럼 잘 동작하는 것을 확인할 수 있다!

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbHP9BD%2Fbtqw7chRt8b%2FKltDWaAziWWi1F8JgpZLgK%2Fimg.png">

<br>

<br>

### React 환경 추가하기

---

터미널을 하나 더 추가로 열고, `npm init`을 입력해 pakage.json 파일이 생기도록 하자

> 나오는 질문들은 모두 enter 누르고 넘어가도 괜찮음

이제 React 개발에 필요한 의존 라이브러리를 설치한다.

<br>

```
npm i react react-dom

npm i @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader style-loader webpack webpack-cli -D
```

> create-react-app으로 한번에 설치도 가능함

<br>

#### webpack 설정하기

> webpack을 통해 react 개발 시 자바스크립트 기능과 jsp에 포함할 .js 파일을 만들 수 있다.
>
> 프로젝트 루트 경로에 webpack.config.js 파일을 만들고 아래 코드를 붙여넣기

<br>

```javascript
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src/main/jsx'),
    entry: {
        main: './MainPage.jsx',
        page1: './Page1Page.jsx'
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/webapp/js/react/[name].bundle.js'
    },
    mode: 'none',
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env', '@babel/preset-react' ]
                }
            }
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        } ]
    }
};
```

<br>

> - 코드 내용
>
> React 소스 경로를 src/main/jsx로 설정
>
> MainPage와 Page1Page.jsx 빌드
>
> 빌드 결과 js 파일들을 src/main/webapp/js/react 아래 [페이지 이름].bundle.js로 놓음

<br>

<br>

### 서버 코드 개발하기

---

VSCode에서 패키지 안에 MyController.java라는 클래스 파일을 만든다.

<br>

```java
package no4gift.test;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MyController {

    @GetMapping("/{name}.html")
    public String page(@PathVariable String name, Model model) {
        model.addAttribute("pageName", name);
        return "page";
    }

}
```

<br>

추가로 src/main에다가 webapp 폴더를 만들자

webapp 폴더 안에 jsp 폴더와 css 폴더를 생성한다.

<br>

그리고 jsp와 css 파일을 하나씩 넣어보자

#### src/main/webapp/jsp/page.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!doctype html>
<html>
<head>
    <title>${pageName}</title>
</head>

<body>
    <div id="root"></div>
    <script src="/js/react/${pageName}.bundle.js"></script>
</body>
</html>
```

<br>

#### src/main/webapp/css/custom.css

```css
.main {
    font-size: 24px; border-bottom: solid 1px black;
}
.page1 {
    font-size: 14px; background-color: yellow;
}
```

<br>

<br>

### 클라이언트 코드 개발하기

---

이제 웹페이지에 보여줄 JSX 파일을 만들어보자

src/main에 jsx 폴더를 만들고 MainPage.jsx와 Page1Page.jsx 2가지 jsx 파일을 만들었다.

#### src/main/jsx/MainPage.jsx

```jsx
import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';

class MainPage extends React.Component {

    render() {
        return <div className="main">no4gift 메인 페이지</div>;
    }

}

ReactDOM.render(<MainPage/>, document.getElementById('root'));
```

<br>

#### src/main/jsx/Page1Page.jsx

```jsx
import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';

class Page1Page extends React.Component {

    render() {
        return <div className="page1">no4gift의 Page1 페이지</div>;
    }

}

ReactDOM.render(<Page1Page/>, document.getElementById('root'));
```

> 아까 작성한 css파일을 import한 것을 볼 수 있는데, css 적용 방식은 이밖에도 여러가지 방법이 있다.

<br>

이제 우리가 만든 클라이언트 페이지를 서버 구동 후 볼 수 있도록 빌드시켜야 한다!

<br>

<br>

### 클라이언트 스크립트 빌드시키기

jsx 파일을 수정할 때마다 자동으로 지속적 빌드를 시켜주는 것이 필요하다.

이는 webpack의 watch 명령을 통해 가능하도록 만들 수 있다.

VSCode 터미널에서 아래와 같이 입력하자

```
node_modules\.bin\webpack --watch -d
```

> -d는 개발시
>
> -p는 운영시

터미널 화면을 보면, `webpack.config.js`에서 우리가 설정한대로 정상적으로 빌드되는 것을 확인할 수 있다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdCY33w%2Fbtqw6nqnFYA%2F6PkKNTZAFhHS92sj9GDsc0%2Fimg.png">

<br>

src/main/webapp/js/react 아래에 우리가 만든 두 페이지에 대한 bundle.js 파일이 생성되었으면 제대로 된 것이다.

<br>

서버 구동이나, 번들링이나 명령어 입력이 상당히 길기 때문에 귀찮다ㅠㅠ
`pakage.json`의 script에 등록해두면 간편하게 빌드과 서버 실행을 진행할 수 있다.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "set JAVA_HOME=C:\\Program Files\\Java\\jdk1.8.0_181&&mvnw spring-boot:run",
    "watch": "node_modules\\.bin\\webpack --watch -d"
  },
```

<br>

이처럼 start와 watch를 등록해두는 것!

start의 jdk경로는 각자 자신의 경로를 입력해야한다.

이제 우리는 빌드는 `npm run watch`로, 스프링 부트 서버 실행은 `npm run start`로 진행할 수 있다~

<br>

빌드가 이루어졌기 때문에 우리가 만든 페이지를 확인해볼 수 있다.

해당 경로로 들어가면 우리가 jsx파일로 작성한 모습이 제대로 출력된다.

<br>

MainPage : http://localhost:8080/main.html

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FblVl1i%2Fbtqw8BHJS0i%2Fk9n8KFavNlAl72Ijl5zZB0%2Fimg.png">

<br>

Page1Page : http://localhost:8080/page1.html

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbE35Su%2Fbtqw79Y0c6b%2Fm57ohwy2QKkkEgdEWifvTk%2Fimg.png">

<br>

여기까지 진행한 프로젝트 경로

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FHrN7W%2Fbtqw5gec26g%2FMqCZViee9Qc2s1tl09XVs0%2Fimg.png">



이와 같은 과정을 토대로 구현할 웹페이지들을 생성해 나가면 된다.



이상 React와 Spring Boot 연동해서 환경 설정하기 끝!

---


# [AWS] 스프링 부트 배포 스크립트 생성

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FufFpw%2FbtrfolbIEVG%2F5U2LKUjUUKYKODQwmh7uf0%2Fimg.png">

<br>

AWS에서 프로젝트를 배포하는 과정은 프로젝트가 수정할 때마다 똑같은 일을 반복해야한다.

#### 프로젝트 배포 과정

- `git pull`로 프로젝트 업데이트
- gradle 프로젝트 빌드
- ec2 인스턴스 서버에서 프로젝트 실행 및 배포

<br>

이를 자동화 시킬 수 있다면 편리할 것이다. 따라서 배포에 필요한 쉘 스크립트를 생성해보자.

`deploy.sh` 파일을 ec2 상에서 생성하여 아래와 같이 작성한다.

<br>

```sh
#!/bin/bash

REPOSITORY=/home/ec2-user/app/{clone한 프로젝트 저장한 경로}
PROJECT_NAME={프로젝트명}

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

./gradlew build

echo "> step1 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi

echo "> 새 애플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

nohup java -jar \
       -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
       -Dspring.profiles.active=real \
       $REPOSITORY/$JAR_NAME 2>&1 &
```

<br>

쉘 스크립트 내 경로명 같은 경우에는 사용자의 환경마다 다를 수 있으므로 확인 후 진행하도록 하자.

<br>

스크립트 순서대로 간단히 설명하면 아래와 같다.

```sh
REPOSITORY=/home/ec2-user/app/{clone한 프로젝트 저장한 경로}
PROJECT_NAME={프로젝트명}
```

자주 사용하는 프로젝트 명을 변수명으로 저장해둔 것이다.

`REPOSITORY`는 ec2 서버 내에서 본인이 git 프로젝트를 clone한 곳의 경로로 지정하며, `PROJECT_NAME`은 해당 프로젝트명을 입력하자.

<br>

```SH
echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

./gradlew build

echo "> step1 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/
```

<br>

현재 해당 경로는 clone한 곳이기 때문에 바로 `git pull`이 가능하다. 프로젝트의 변경사항을 ec2 인스턴스 서버 내의 코드에도 update를 시켜주기 위해 pull을 진행한다.

그 후 프로젝트 빌드를 진행한 뒤, 생성된 jar 파일을 현재 REPOSITORY 경로로 복사해서 가져오도록 설정했다.

<br>

```sh
CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi
```

<br>

기존에 수행 중인 프로젝트를 종료 후 재실행해야 되기 때문에 pid 값을 얻어내 kill 하는 과정을 진행한다.

현재 구동 중인 여부를 확인하기 위해서 `if else fi`로 체크하게 된다. 만약 존재하면 해당 pid 값에 해당하는 프로세스를 종료시킨다.

<br>

```sh
echo "> JAR Name: $JAR_NAME"

nohup java -jar \
       -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
       -Dspring.profiles.active=real \
       $REPOSITORY/$JAR_NAME 2>&1 &
```

<br>

`nohup` 명령어는 터미널 종료 이후에도 애플리케이션이 계속 구동될 수 있도록 해준다. 따라서 이후에 ec2-user 터미널을 종료해도 현재 실행한 프로젝트 경로에 접속이 가능하다.

`-Dspring.config.location`으로 처리된 부분은 우리가 git에 프로젝트를 올릴 때 보안상의 이유로 `.gitignore`로 제외시킨 파일들을 따로 등록하고, jar 내부에 존재하는 properties를 적용하기 위함이다.

예제와 같이 `application-oauth.properties`, `application-real-db.properties`는 git으로 올라와 있지 않아 따로 ec2 서버에 사용자가 직접 생성한 외부 파일이므로, 절대경로를 통해 입력해줘야 한다.

<br>

프로젝트의 수정사항이 생기면, EC2 인스턴스 서버에서 `deploy.sh`를 실행해주면, 차례대로 명령어가 실행되면서 수정된 사항을 배포할 수 있다.

<br>

<br>

#### [참고 사항]

- [링크](https://github.com/jojoldu/freelec-springboot2-webservice)


---

# [Travis CI] 프로젝트 연동하기

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbMIduW%2FbtrfWMtiPEC%2FENLpZFdHhIVcpV31IWNBcK%2Fimg.jpg">

<br>

```
자동으로 테스트 및 빌드가 될 수 있는 환경을 만들어 개발에만 집중할 수 있도록 하자
```

<br>

#### CI(Continuous Integration)

코드 버전 관리를 하는 Git과 같은 시스템에 PUSH가 되면 자동으로 빌드 및 테스트가 수행되어 안정적인 배포 파일을 만드는 과정을 말한다.

<br>

#### CD(Continuous Deployment)

빌드한 결과를 자동으로 운영 서버에 무중단 배포하는 과정을 말한다.

<br>

### Travis CI 웹 서비스 설정하기

[Travis 사이트](https://www.travis-ci.com/)로 접속하여 깃허브 계정으로 로그인 후, `Settings`로 들어간다.

Repository 활성화를 통해 CI 연결을 할 프로젝트로 이동한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcpCgp3%2Fbtrf1hF3DBd%2F6y2x40HdH0Ko8ZUB4kHV90%2Fimg.jpg">

<br>

<br>

### 프로젝트 설정하기

세부설정을 하려면 `yml`파일로 진행해야 한다. 프로젝트에서 `build.gradle`이 위치한 경로에 `.travis.yml`을 새로 생성하자

```yml
language: java
jdk:
  - openjdk11

branches:
  only:
    - main

# Travis CI 서버의 Home
cache:
  directories:
    - '$HOME/.m2/repository'
    - '$HOME/.gradle'

script: "./gradlew clean build"

# CI 실행 완료시 메일로 알람
notifications:
  email:
    recipients:
      - gyuseok6394@gmail.com
```

- `branches` : 어떤 브랜치가 push할 때 수행할지 지정
- `cache` : 캐시를 통해 같은 의존성은 다음 배포하지 않도록 설정
- `script` : 설정한 브랜치에 push되었을 때 수행하는 명령어
- `notifications` : 실행 완료 시 자동 알람 전송 설정

<br>

생성 후, 해당 프로젝트에서 `Github`에 push를 진행하면 Travis CI 사이트의 해당 레포지토리 정보에서 빌드가 성공한 것을 확인할 수 있다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbwMGb1%2FbtrfXzHcn2G%2FFjODgalLKrzYNvsx5COlxK%2Fimg.jpg">

<br>

<br>

#### *만약 Travis CI에서 push 후에도 아무런 반응이 없다면?*

현재 진행 중인 프로젝트의 GitHub Repository가 바로 루트 경로에 있지 않은 확률이 높다.

즉, 해당 레포지토리에서 추가로 폴더를 생성하여 프로젝트가 생성된 경우를 말한다.

이럴 때는 `.travis.yml`을  `build.gradle`이 위치한 경로에 만드는 것이 아니라, 레포지토리 루트 경로에 생성해야 한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzdMai%2Fbtrf1iEWSaG%2Fq2FZkc3HXXo0Nnes2MYegk%2Fimg.jpg">

<br>

그 이후 다음과 같이 코드를 추가해주자 (현재 위치로 부터 프로젝트 빌드를 진행할 곳으로 이동이 필요하기 때문)

```yml
language: java
jdk:
  - openjdk11

branches:
  only:
    - main

# ------------추가 부분----------------

before_script:
  - cd {프로젝트명}/

# ------------------------------------

# Travis CI 서버의 Home
cache:
  directories:
    - '$HOME/.m2/repository'
    - '$HOME/.gradle'

script: "./gradlew clean build"

# CI 실행 완료시 메일로 알람
notifications:
  email:
    recipients:
      - gyuseok6394@gmail.com
```

<br>

<br>

#### [참고 자료]

- [링크](https://github.com/jojoldu/freelec-springboot2-webservice)

<br>


##### 참고 : https://gyoogle.dev/blog/web-knowledge/react-knowledge/React%20Hook.html

여기보고 복붙하듯 한번씩 다 써보면서 공부하려고 노력하였습니다
