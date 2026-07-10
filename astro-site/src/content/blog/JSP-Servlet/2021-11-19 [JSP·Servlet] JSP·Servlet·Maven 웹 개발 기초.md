---
title: "[JSP·Servlet] JSP·Servlet·Maven 웹 개발 기초"
date: 2021-11-19
category: "JSP·Servlet"
tags: ["JSP·Servlet"]
description: "JSP와 서블릿, Maven 웹 프로젝트 구성, 스프링 시큐리티·JWT 토큰 로그인까지 자바 웹 개발 기초를 정리한 노트."
permalink: "class/2021/11/19/jsp-servlet-웹"
---

## JSP와 웹 (Servlet / Maven)

> 자바 JSP 작동 원리를 몰라도 다 쉽게 한다.

내장 객체 정리:

- 송신 관련 객체 = `request`
- 응답 관련 객체 = `response`
- 서버 관련 정보 = 애플리케이션 내장 객체·메서드
- 페이지 내부에서 담아야 할 정보 = 페이지 내장 객체, `pageContext` 내장 객체

세션의 필요성:

- 페이지를 요청하면 응답하고 접속을 끊는다. 요청할 때마다 새로운 소켓이다(일반적인 웹 구동 방식). 그렇다면 로그인 후 페이지를 돌아다닐 때 어떻게 정보를 유지할까? 과거부터 이슈였다.

> **자바에서의 문자열, 동적 할당(자료구조)을 중점으로 봐야 한다. 이 두 개는 꼭 이해하고 가야 한다. 웹에서 가장 많이 쓰이기 때문이다.**

### 프로젝트 설정

![프로젝트 생성 설정](/assets/20220414_095500.png)

- 이름만 쓰고 next를 누르지 말고, 설정이 다 맞는지 확인하고 next 후 finish로 프로젝트를 만들자.
- Servlet 버전을 3.0으로 하면 최신 문법을 못 쓴다.

### JSP 개념

- 애플리케이션의 역할: JSP가 모듈로서 하듯, 자바를 컴파일해 나온 결과를 웹 서버에 준다.
- 기존의 웹 서버 방식과 애플리케이션 서버 방식이 있다.

#### JSP = Java Server Page의 약자

- 자바 언어 기반의 스크립트 언어
- 자바의 장점을 그대로 활용
- 쉽게 웹 개발 가능

#### 웹 컨테이너

- 웹 애플리케이션을 실행할 수 있는 서버 프로그램.
- 자바의 웹 컨테이너 = JSP와 Servlet을 지원.

### 톰캣과 라이브러리

- 웹에서는 실행의 주체가 톰캣이다(자바가 아니라).
- 톰캣이 jar 파일을 가지고 있어야 실행한다. 이클립스가 jar를 가져도 톰캣 자체에 없으면 오류가 난다. 톰캣이 가지고 있으려면 `web-inf` 아래 `lib`에 있어야 한다.
- Deployment Assembly로 `maven dependency`를 `web-inf/lib`에 설정한다.
- Maven 설치 후 cmd에서 `mvn package`를 실행한다.

![mvn package 실행](/assets/20220421_102458.png)

- 패키지 경로 - 클래스명으로 jar 파일이 생성된다.

### Maven 라이프 사이클

`mvn 5minutes`을 보고 실행한 뒤, `classes/com/.../app` 가면 클래스 파일이 있다. 이를 jar로 압축한 것이다.

```
\Web\my-app\target>jar cvf test.jar classes/ 로 가서

jar cvf test.jar classes/.
```

를 실행하면 추가된다.

- 안 되면 `target`을 지우고 `mvn compile`을 실행하면 `app.class`가 생성되고 jar는 없어진다.
- jar를 만들려면 `mvn package`를 입력한다.

![Maven 라이프 사이클 단계](/assets/20220421_103431.png)

- compile은 2번째까지, package까지 하면 4번째까지, deploy하면 마지막까지가 라이프 사이클이다. 그 아래 2개는 의존성과 별로 상관없는 것들이다.
- `properties`는 환경 변수다.
- `mvn clean package`는 한 번 다운받은 게 있으면 그대로 사용해서 빠르다. 이는 우리가 쓰는 라이브러리도 마찬가지다.
- 그냥 다 날리고 다시 받으면 되지만, 프레임워크로 가면 폴더가 10기가가 되기도 한다. 다 날리면 새로 받아야 해서 비효율적이므로, 피치 못할 사정이 아니면 jar를 하나씩 지워가는 게 좋다.

참고: [Maven Getting Started](https://maven.apache.org/guides/getting-started/index.html)

```
mvn archetype:generate ^
    -DarchetypeGroupId=org.apache.maven.archetypes ^
    -DarchetypeArtifactId=maven-archetype-webapp ^
    -DgroupId=com.bit.mvn ^
    -DartifactId=web07

```

- 위를 (따로 web07 프로젝트를 만들지 않고 부모 폴더에서) 실행한다. 뒤에 `^`가 있어야 한다(잘못 쓴 게 아니다).
- `Define value for property 'version' 1.0-SNAPSHOT:`에서 멈추면 그냥 엔터를 친다.
- `Y:`에서도 멈추면 `y`를 입력한다.
- 그럼 본 파일에 없던 web07이 생성된 것을 볼 수 있다.

![web07 생성](/assets/20220421_112517.png)

`cd web07`로 가서 `mvn package`를 입력한다.

![web07 mvn package](/assets/20220421_112730.png)

![war 파일 설정](/assets/20220421_113129.png)

위 부분을 `root`로 바꾸고 `mvn clean package`를 입력한다.

![mvn clean package 결과](/assets/20220421_113208.png)

- 그럼 본래의 web07이 타깃에 다시 들어가면서 war 파일의 이름이 바뀐 걸 볼 수 있다.

![war 파일 이름 변경](/assets/20220421_120118.png)

Maven Project를 임포트한다.

![Maven 프로젝트 임포트 1](/assets/20220421_120212.png)

![Maven 프로젝트 임포트 2](/assets/20220421_120255.png)

- 내장된 mvn이 아닌, 윈도우에 설치한 Maven을 쓰려면 위처럼 하면 된다.

![외부 Maven 설정](/assets/20220421_120610.png)

- New Maven Project로 그 이전 것은 next를 누르고 기다리면 위와 같은 목록이 뜬다(바로 안 뜰 수 있어 기다려야 함).

![Maven Archetype 선택](/assets/20220421_120752.png)

![Maven 프로젝트 완료](/assets/20220421_121110.png)

### 프로젝트 이관과 JDBC

(5/18)

- 서버 문제 등이 있으면 `src`, `pom.xml` 두 개만으로 올려도 개발 도구와 상관없이 작업이 가능해진다. 단, 운영체제가 다르면 개행이 달라지는 등의 제약은 있다.
- 이클립스는 에러가 있으면 컴파일을 안 해 버린다(임의로 누락). 단순한 JSP는 괜찮지만 서버측 컨트롤러는 실행하면 안 되며 제대로 되지도 않는다. 그래서 워크스페이스의 다른 프로젝트를 다 닫고 실행한다.
- JDBC를 프로시저 방식으로 쭉 해 오던 게, 프로시저 방식으로 매개변수를 전달한 것이며 성능 향상까지 가져온다.
- model2에 와서 `PreparedStatement`를 쓰는데, 장점은 프로시저 방식이라는 점이다.
- `sendRedirect`란 무엇인가?
- 비동기/동기 여부는 `sleep`을 해 보면 확인된다.
- `setParameter`는 전달할 수 있는 패턴이 있다. `getParameter`, `sendRedirect` 등을 다시 잘 알아 두자.

세션:

- 세션은 WAS 메모리에 만들어 둔다. 같은 접속에서 값을 계속 유지하고 싶을 때 사용한다.
- 세션은 하나의 접속당 가지고 있는 객체다. 같은 컴퓨터라도 브라우저가 달라지면 세션이 달라진다.

### MongoDB / Node.js 메모

- MongoDB를 쓸 때 동적인 데이터를 처리하기 위해 Map(동적)을 사용한다. DTO에서도 동적인 내용을 넣어 처리할 수 있다.
- MongoDB의 id는 문자열이 아니라 'id'라는 객체다. 객체를 줘야 한다.
- 커넥션을 밖으로 뽑아내야 롤백·커밋을 한다. 트랜잭션처럼 커넥션이 필요하면 위처럼 수행하면 된다(mysql.js). (덤으로 상대경로는 복사해서 써도 문제없다.)
- 헤더에 있는 success 코드로 콜백을 판단한다. 비동기에서 가장 먼저 할 일은 static 코드를 던지는 것인데, 아무것도 안 던지면 200 OK라는 뜻이다.
- 백엔드를 제대로 만드는 게 목표였다면, Node는 오픈소스를 올리기만 하면 된다. 오픈소스의 특징은 텀 사이클이 빠르게 진화한다는 것이다.
- Node.js는 굉장히 빠르다. 초창기는 아쉬웠지만 계속 발전했다. 대신 안정성 면에서는 그닥이며, 이게 스프링과의 반대점이다.
- 함수형 언어의 특징이 이렇게 발달한다. 파이썬도 비슷한 이유(라이브러리가 많고 먼저 선점)다. 이들은 안정적인 서비스보다 빠른 서비스를 지향한다. 싱글 스레드라 긴 서비스를 하면 다음 일을 못 해, 짧고 빠르게 제공하는 서비스를 목표로 한다.
- Mongoose는 자유로운 제약을 자유롭지 못하게 만든다. 몽구스를 쓰는 이유: 1. 제약된다, 2. 간편하다.

### 디자인 패턴

- **프론트 컨트롤러 패턴**: DispatcherServlet으로 대표되는 디자인 패턴. 모든 요청을 DispatcherServlet으로 받은 다음, 요청에 따라 각 컨트롤러에 넘겨준다.
- **커맨드 디자인 패턴**: 모든 것을 커맨드로 받고 일을 시행한다.

#### 프레임워크를 쓰는 이유

- 쉽게 코딩하려는 것도 있지만, 1순위는 프레임워크로 시큐어 코딩(제약을 걸어서)을 하기 위함이다.
- 공통적인 코드만 남겨 두고 공통적이지 않은 코드만 분리한다. 모듈화에서 가장 많이 쓰는 게 템플릿 메서드 패턴이다. 공통되지 않은 코드들만 메서드로 분리한다.

#### DAO 목표

- DAO의 최종 목적은 Spring에서 제공하는 Spring JDBC 연동 모듈을 만드는 것이다. 그중 가장 대표적인 것들만 만들어 본다.
- 하나의 기능을 다양한 메서드로 지원하고 선택은 사용자 마음대로 하게 하며, 메서드 오버로드로 (최소한을) 제공한다. 사용 문법은 최대한 JDBC와 똑같이 쓸 수 있도록 한다.

## React 메모

- XML의 `h1` 태그: 리액트에서는 XML이기 때문에 XML의 이름이 `h1`인 것이지 HTML의 `h1` 태그가 아니다. 그 element 이름을 가져다 `createElement` 하고 있는 것이다.
- HTML로 보이는 것은 유사 XML이지 유사 HTML이다. XML의 특징은 root element를 가진다는 것이다.
- 화면을 그리려면 하나의 태그를 열고 그 안에 다 들어가야 한다. JSX는 무조건 하나의 태그로 열고 그 안에 다 들어가야 한다(render에 들어가는 모든 것이 마찬가지). root element를 명세해야 그 안에 작성이 가능하다.
- 정해진 약속 패턴을 지켜야 element를 만들어 준다. `createElement()`하고 `appendChild`해서 구조를 만들어 낸다.
- 값의 전달은 부모에서 자식으로 전달하며, 이때 사용하는 게 props(다형성)다. 자식으로만 되지 자손으로는 안 되어 자식으로 계속 전달해야 한다. 이를 극복하기 위한 패턴들이 등장한다.
- 리액트는 한 번 그리면 렌더링하지 않는다. 언제 렌더링하나? state 값이 바뀌었을 때다. 값을 불러올 때는 그냥 불러오고, 줄 때는 setter로 준다.
- 소스를 복붙해 실행하려면 `npm i`로 시작한다.

스프링이 주는 IO 소켓 예제:

```
git clone https://github.com/spring-guides/gs-messaging-stomp-websocket.git
```

## 스프링 시큐리티와 토큰

### Security 기본 설정

- Security는 자동으로 인증 관련 작업을 진행한다.
- 필터에 값을 전달하려면 init 파라미터로 전달한다. 부트에서는 xml을 안 쓰는데, 전달하려면 xml에서 얻은 값을 통해 키-밸류로 전달한다. 그 객체에 setter로 값을 넣어 주며, 그걸 config에서 실행한다.

```
package com.bit.sts31.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/", "/home").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login")
				.permitAll()
				.and()
			.logout()
				.permitAll();
	}

	@Bean
	@Override
	public UserDetailsService userDetailsService() {
		UserDetails user =
			 User.withDefaultPasswordEncoder()
				.username("user")
				.password("password")
				.roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
}

```

- 로그인 페이지를 지정해 거기서 실행하게 한다(로그아웃도 마찬가지).
- 아이디·패스워드를 어딘가 저장해 두고(`id = user`, `pw = password`), 그 정보를 아래 `userDetailsService`에 저장해 둔 것이다.
- `/login`으로 오는데 `error`라고 주면 처리된다. 로그인 처리는 다 POST 방식이다.
- 서버를 내렸다 올리면 같은 패스워드가 바뀐다(다시 복사해야 함).

참고: [Spring Security Architecture](https://spring.io/guides/topicals/spring-security-architecture) — 이를 읽어야 스프링 시큐리티가 조금이라도 이해된다.

### JDBC 인증 (DB 연동)

```
@Autowired
	 DataSource dataSource;

	 @Override
	 public void configure(AuthenticationManagerBuilder builder) {
		 builder.jdbcAuthentication().dataSource(dataSource).withUser("dave")
			 .password("secret").roles("USER");
	 }
```

- 데이터베이스에 위처럼 테이블 스키마를 작성하고, xe 스키마에 users와 권한(authorities)을 추가한다.

![users / authorities 테이블](/assets/20220627_115902.png)

- 유저네임에 인덱스를 설정하면 안 될 수도 있다. 유저네임에 다양한 권한이 붙기 때문이다.
- 이전에 PK를 가진 유저 `dave`를 이미 만들었으면 그대로 실행하면 중복 에러가 나므로, 유저를 삭제하고 실행한다.
- 내가 집어넣은 패스워드와 DB의 패스워드를 검사해야 한다. 로그인할 때 아이디·패스워드를 날리면, 날린 패스워드와 DB의 패스워드를 비교한다.

![인코딩 안 된 패스워드](/assets/20220627_122548.png)

- 위 사진은 인코딩이 안 되어 있다. 이렇게 하나의 계정에 여러 권한을 주는 것도 가능하다.

```
public void configure(AuthenticationManagerBuilder builder) throws Exception {
//	    builder.jdbcAuthentication().dataSource(dataSource).withUser("dave")
	 builder.jdbcAuthentication().dataSource(dataSource).withUser("user01")	//user01하나 만듬

			 .password(getPasswordEncoder().encode("secret")).roles("USER");//패스워드 설정부분에서 엔코딩 설정해서 집어넣어야 한다.

	 }

	 @Bean
	 BCryptPasswordEncoder getPasswordEncoder() {
		 return new BCryptPasswordEncoder();
	 }


	 //우리가 직접 쿼리문 실행할거라 jdbcAuthentication()을 실행한다.
	 @Autowired
	 public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			 auth.jdbcAuthentication()
				 .dataSource(dataSource)	//데이터 소스 주입.
				 .usersByUsernameQuery("select username,password,enabled "
					 + "from users where username =?")

				 //권한은
				 .authoritiesByUsernameQuery("select username,authority "
					 + "from authorities where username =?");
	 }
```

- 빈(Bean)을 가지고 일한다. 위 로그인이 가장 기본적인 스프링 시큐리티 로그인이다. 권한 로그인을 할 수도, 로그인 없이 모든 사람에게 허용할 수도 있다.

시큐리티 학습 메모:

- 시큐리티는 복잡하고 어렵다. 스프링 시큐리티를 만드는 게 아니라 쓰는 방법을 익혀 부트처럼 빠르게 쓰기 위함이다. 레거시·문법을 책으로 주구장창 이해하려는 건 비추다.
- 내로라하는 개발자도 시큐리티를 처리하면 버그를 많이 낸다.
- detail 안의 User를 상속받아 구현하고 실행해야 한다.
- 원리는 MyBatis든 JPA든 다 똑같다. JPA는 MyBatis에서 VO에 어노테이션을 붙이고 메서드명만 호출하면 다 호출된다. 우리는 매퍼 위에 쿼리를 적어야 하지만, JPA는 어노테이션만 VO에 적으면 다 해결된다.

반드시 볼 문서:

- [Spring Security Architecture](https://spring.io/guides/topicals/spring-security-architecture)
- [Securing a Web Application](https://spring.io/guides/gs/securing-web/)

이 두 개를 꼭 보고, 그 안의 `configure`를 꼭 보고 가자.

### CSRF

```
//SSL 를 사용하지 않으면 true 사용
//		http.csrf().disable();
// csrf - 비활성화하면 어떤 문제가 생기나?
//CSRF(CROSS SITE REQUEST FORGERY) 공격
//사용자의 의지와 무관하게 크로스사이트(타사이트)로부터 서버에 공격적인 요청을 하는 것.
//이것을 방지하는게 기본값으로 들어있는데 csrf를 비활성화 하면 이 공격에 대해 공격방지를 하지 않는다(보안적인 문제)
```

기본 로그인 페이지:

```

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Please sign in</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <link href="https://getbootstrap.com/docs/4.0/examples/signin/signin.css" rel="stylesheet" crossorigin="anonymous"/>
  </head>
  <body>
     <div class="container">
      <form class="form-signin" method="post" action="/login">
        <h2 class="form-signin-heading">로그인페이지</h2>
        <!-- 스프링 기본 로그인 페이지  -->
        <p>
          <label for="username" class="sr-only">Username</label>
          <input type="text" id="username" name="username" class="form-control" placeholder="Username" required autofocus>
        </p>
        <p>
          <label for="password" class="sr-only">Password</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="Password" required>
        </p>
<input name="_csrf" type="hidden" value="89ed778c-3bb7-449c-a601-6cd978256f9a" />
<!-- 페이지 요청시 랜덤하게 value를 줌. 그리고 체크함 -->
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
</div>
</body>

</html>

```

- CORS 설정이 필요한 이유: 시큐리티를 설정하면 지금까지 한 CORS 설정이 안 먹힌다.
- `@CrossOrigin`은 DispatcherServlet에서 실행되는데, 얘가 열려 있어야 DispatcherServlet까지 온다. 필터에서 열어 줘야 한다.

### 세션과 쿠키

- 같은 세션으로 어떻게 유지하는가? 쿠키 값을 가져가고 세션을 준다.
- 로그인 자체가 완벽하진 않다. 정보가 클라이언트에 있고, 그걸 쿠키가 다양한 설정값으로 가진다.
- 생명 주기: 세션은 max age로 특정 시간까지만 값을 유지하고, 세션은 그 세션 동안만 유지된다. 브라우저를 끄는 순간 쿠키 값은 날아간다.
- 웹에서 세션을 쓰는 건 그 공간을 계속 쓰겠다는 것이다. 세션을 구분할 수 있어야 하므로, 세션을 쓰는 순간 쿠키를 만들고 그 쿠키에 `JSESSIONID`(value는 세션 아이디)를 줘서 사용한다.

세션 클러스터링:

- Spring Boot나 Redis를 쓰거나, 프록시 서버를 쓰면 이런 문제가 많이 발생한다.
- Redis를 쓸 줄 모르면 도커 이미지로 써도 된다. 클러스터링은 Redis만 되는 게 아니라 MongoDB로도 되고, 메모리 DB면 다 된다.

### 토큰 (JWT)

- 근래 유행하는 게 token(웹 토큰)이다. 토큰을 발행하고, 발행받은 토큰으로 접근하면 그 정보로 승인해 준다.
- 내가 발행한 토큰이 아닌데 어떻게 인증하나? 토큰의 목적은 로그인된 사용자인지 아닌지, 승인할지 말지를 선별하는 것이다. 승인 기준은 '내가 발행한 토큰이면 됨'이다.
- 토큰을 발행할 때 나만이 가진 정보(암호)를 실어서 보내면 된다. 그 암호는 나만 알면 된다. 나만 가진 암호로 토큰을 만들어 던지면, 갔다 왔을 때 같은 로직으로 백엔드가 처리한다.

```
<input name="_csrf" type="hidden" value="89ed778c-3bb7-449c-a601-6cd978256f9a" />
<!-- value="89ed778c-3bb7-449c-a601-6cd978256f9a" 는 우리가 임의적으로 준거니까 이걸 그대로 주면 안된다 기본 로그인 화면에서 cv 한거니까
그럼 webconfigSecurity에서 http.csrf.disable()을 하거나 (value그대로 두면 위변조로 이해하므로). 혹은 바로 위 문장을 삭제해야 한다.-->
<!-- 페이지 요청시 랜덤하게 value를 줌. 그리고 체크함 -->

```

JWT 참고:

- [jwt.io](https://jwt.io/)
- [java-jwt (auth0)](https://github.com/auth0/java-jwt)

토큰 만들기:

```
package com.bit.sts34;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

@Service
public class TokenServiceImpl {
	public String createToken() {
		try {
		    Algorithm algorithm = Algorithm.HMAC256("secret");
		    String token = JWT.create()
		        .withIssuer("auth0")
		        .sign(algorithm);
		    return token;
		} catch (JWTCreationException exception){
		    //Invalid Signing configuration / Couldn't convert Claims.


		}
		return "err";//exception이 일어나면.
	}
}

```

![JWT 토큰 구조](/assets/20220627_164317.png)

- 토큰은 값의 전달이 목적이 아니다. 발급받은 걸로 접근할 때, 어떤 목적으로 발급해 준 토큰을 가지고 접근했으니 인정해 주는 것이다.
- 이 키는 나만 발급할 수 있다. (JWT 그림에서) 아래 verify signature 부분이 맞으면 내가 발급한 것이다. 그것을 확인하는 게 토큰의 목적이다.
- 로그인 시 토큰을 발급하고, 이 토큰을 가지고 접근하면 로그인된 사용자다. 클라이언트가 토큰을 가지고 접근했을 때 내가 발급한 게 맞으면 로그인 대상자다.
- 기존 세션에서는 세션 아이디로 접근해, 그 세션 아이디를 찾고 그 공간을 처리했다.
- payload를 조금만 바꿔도 verify signature가 바뀌어 버려서, 눈으로 보이지만 토큰은 위변조할 수 없다.
- 라이브러리는 만들고 확인하는 기능을 쓰기 위함이지, 문자열 토큰 자체는 라이브러리와 상관없이 규격이 있다.

JWT 정리:

- secret된 키를 가지고 사용한다. 이게 JWT다. 큰 그림을 보지 않으면 알고리즘으로 뭘 선택하고 키를 넣어야 하는지에만 매몰된다.
- 어떤 키값으로 어떤 밸류를 넣을지 알면 된다. Map을 리턴하면 Jackson 라이브러리에 의해 바인딩된다.
- 기존에는 session으로 처리했다면, 이제는 토큰으로 처리한다. 받은 키가 유효한지 확인해 로그인으로 인정하고 다음을 진행할지, 로그인으로 보낼지 결정한다.

### OAuth2 / 소셜 로그인

- 위 내용이 구현된 구글 로그인을 실행한다. 쿠키에 유지 시간을 주고, 토큰에도 유지 시간을 준다.
- 토큰은 헤더에 실어서 보내고 받아야 한다. 인증받은 사용자가 받아온 토큰을 보내면, 헤더를 이용해 처리한다.
- OAuth2 로그인에 대한 설정도 우리가 해 줘야 한다. 스프링 시큐리티 라이브러리를 붙이고 config를 붙이면, 정의한 대로 커스터마이징되어 구현된다.
- OAuth2 설정이 없고 정보만 전달했는데도 처음부터 소셜 로그인을 지원해 준다. 특정 페이지로 갔을 때 결정한다.
- RestTemplate으로 날려 준다. id, pw는 안 받으니 따로 날려 줘야 한다(이메일은 주니까 안 받아도 됨).
