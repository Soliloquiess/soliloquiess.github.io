---
title: "[Springboot] Project 연습"
date: 2021-07-06
category: "Springboot"
tags: ["Springboot"]
description: "yml 설정, 컨트롤러와 디스패처, HTTP 요청 방식, 시큐리티 기반 회원가입/로그인, JPA 연관관계, 이미지 업로드, OSIV와 트랜잭션까지 실습하며 정리한 학습 노트입니다."
permalink: "study/2021/07/06/Project-연습"
---

## yml 파일 이해하기

> **비유: 음료 공장을 만드는 기술자**
>
> 1. 두 번째 공장
> 2. 공장 입구는 서쪽
> 3. 음료 요청은 전부 한글 문서로 변경해서 받는다.
> 4. 음료는 전부 콜라로 만들어서 출시된다.
> 5. 음료 창고는 컨테이너 박스를 사용한다.
> 6. 음료는 요청에 따라 페트, 캔, 병으로 출시된다.
> 7. 공장이 재가동 시 기존에 만들어진 음료는 버리지 않는다.
> 8. 음료 요청 시 A4용지 2장 이상의 문서는 받지 않는다.
> 9. 음료 요청은 아무나 할 수 없다. 암호를 아는 사람만 요청한다.

yml은 스프링 부트로 "공장"을 만들 때, 그 공장을 어떻게 만들지 정하는 문서이다.

**뷰 리졸버 설정**

![yml 뷰 리졸버 설정](/assets/20210706_020842.png)

`port: 8080`은 (위 비유에서) 입구 부분에 해당한다.

![yml port 설정](/assets/20210706_022539.png)

결국 yml은 스프링이라는 "성"을 어떻게 구성할지 정하는 것이다. (properties도 마찬가지)

---

## 컨트롤러란? (FrontController와 Dispatcher)

1. 요청을 할 때마다 java 파일이 호출된다.
2. 요청의 종류가 3개면 3개의 Java 파일이 존재한다.
3. 하나의 Java 파일에서 모든 요청을 받는 것이 FrontController이다.
4. 너무 많은 요청이 한 곳으로 모이는 것을 막기 위해 도메인별로 분기한다.
5. 분기 작업은 Dispatcher가 해준다.

로그인, 회원가입, 게시글 처리를 FrontController 하나에서 처리할 수 있다. 다만 그렇게 하면 너무 많은 요청이 한 곳으로 모이게 된다.

### 도메인이란

"이 세상에 남자, 여자만 있다"처럼 범주를 정해주는 것이 도메인이다.

- 로그인, 회원가입은 `UserController`
- 글쓰기/삭제/수정 등 글 관련은 `BoardController`
- 상품 등록/목록/보기 등은 `ProductController`

이런 식으로 적당한 양으로 나눠 쌓이게 된다.

![도메인별 컨트롤러 분기](/assets/20210706_024016.png)

여기서 문제는, 로그인 등의 요청이 들어올 때 이 요청들을 어디로 보낼지 분기가 필요하다는 점이다. 그것을 Dispatcher가 한다. (정확히는 ServletDispatcher, RequestDispatcher라고도 한다.)

스프링 프레임워크는 디스패처와 컨트롤러가 이미 만들어져 있어 편하게 사용 가능하다. 우리가 만들어야 하는 것은 컨트롤러뿐이다.

![Dispatcher 동작](/assets/20210706_024400.png)

컨트롤러를 잘 만들면 요청에 대한 처리가 모두 가능하다.

---

## HTTP 4가지 요청 방식

클라이언트가 웹 서버에 요청하면, 웹 서버는 DB에 Select, Insert, Update, Delete 요청을 해서 응답한다.

![HTTP 요청 방식과 DB 동작](/assets/20210706_025641.png)

GET 요청을 웹 서버로 보내면, 웹 서버는 데이터를 들고 있지 않으므로 DB에 Select 요청을 한다. 그럼 DB가 응답하고, 웹 서버가 클라이언트로 응답한다.

브라우저는 `.html`을 이해하지만, 핸드폰은 html을 이해하지 못한다. 그래서 `.html`이 파일이 아니라 문자열(데이터)로 응답할 때, 쿼리 결과 한 건을 레코드라고 한다.

이 4가지 방식만 알면 거의 다 컨트롤하고 만들 수 있다.

POST, PUT은 꼭 기억해야 할 점이 있다. HTTP에 Body가 필요하다는 것이다. POST는 전송할 데이터를 Body에 담고, PUT도 수정 정보를 Body에 담는다.

![요청 처리 예시 1](/assets/20210706_033521.png)

이걸 이렇게 바꿔서 받게 된다.

![요청 처리 예시 2](/assets/20210706_033838.png)

---

## HTTP 쿼리 스트링(QueryString), 주소 변수 매핑(PathVariable) 실습

1. 구체적인 데이터를 요청할 때는 쿼리 스트링이나 주소 변수 매핑이 필요하다.
2. 스프링 부트에서는 주소 변수 매핑을 주로 사용한다. (훨씬 편리하다.)

구체적으로 데이터를 전달하는 방식은 두 가지가 있다.

**1. 쿼리 스트링 방식**

![쿼리 스트링 방식](/assets/20210706_120245.png)

**2. PathVariable 방식**

![PathVariable 방식](/assets/20210706_120350_rmgy7szlk.png)

이 중 좀 더 보기 좋고 간편한 것이 PathVariable 방식이다.

![PathVariable 결과](/assets/20210706_123834.png)

스프링 부트는 쿼리 스트링보다 PathVariable 방식을 더 많이 쓴다.

---

## HTTP Body 데이터 전송하기

HTTP 헤더의 Content-Type을 이해해야 한다. 스프링 부트는 기본적으로 `x-www-form-urlencoded` 타입을 파싱(분석)해준다.

- `x-www-form-urlencoded`
- `plain/text`
- `application/json`

(비유하면) 바디 데이터는 "쌀", 헤더 데이터는 "문서"이다. 헤더에는 여러 개의 문서가 들어 있다.

![Content-Type 헤더 분석](/assets/20210706_131521.png)

```
package com.cos.controllerdemo.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.controllerdemo.domain.User;

@RestController
public class HttpBodyController {



	private static final Logger log = LoggerFactory.getLogger(HttpBodyController.class);

	@PostMapping("/body1")
	public String xwwwformformuerlencoded(String username) {
		log.info(username);
		return "key=value 전송옴 ";
	}


	@PostMapping("/body2")
	public String plaintext(@RequestBody String data) 	{	//평문: 안녕
		log.info(data);
		return "plain/text 전송옴";
	}

	@PostMapping("/body3")
	public String applicationjson(@RequestBody String data) {
		log.info(data);
		return "json 전송옴";
	}

	@PostMapping("/body4") //오브젝트로 바로 받음.
	public String applicationtoObject(@RequestBody User user) {
		log.info(user.getUsername());
		return "json 전송옴";
	}
}



```

![Body 전송 테스트 1](/assets/20210706_141244.png)

![Body 전송 테스트 2](/assets/20210706_141236.png)

---

## HTTP 요청을 JSON으로 응답하기

**예제**

```
package com.cos.controllerdemo.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HttpResponseJsonController {
	@GetMapping("/resp/json")
		public String respJson() {
			return "{\"username\":\"cos\"}";
	}
}


```

![JSON 응답 결과 1](/assets/20210706_141723.png)

![JSON 응답 결과 2](/assets/20210706_142141.png)

User 오브젝트를 리턴했는데 문자열이 나오는 경우도 있다. 원래는 User 오브젝트를 리턴하고 싶으면 일일이 데이터를 빼와서 만들어 리턴해야 한다.

그런데 아래처럼 User를 그대로 리턴하면, 리턴되면서 클라이언트 웹 브라우저로 통신이 된다. 그 과정에서 `MessageConverter`가 자동으로 Java Object를 JSON으로 변경해서 응답해준다.

---

## HTML 응답

### HTTP 요청을 파일로 응답하기

1. txt 파일 응답하기 (기본 경로는 `resource/static`)
2. 스프링 부트가 지원하는 `.mustache` 파일 응답하기
3. 스프링 부트가 버린 `.jsp` 파일 응답하기

`.jsp`와 `.mustache` 파일은 템플릿 엔진을 가지고 있다. 템플릿 엔진이란 HTML 파일에 java 코드를 쓸 수 있게 해주는 것이다.

![템플릿 엔진 개념](/assets/20210706_152105.png)

(위 기준에서) 이렇게 쓰라고 요청하는 것이 아니다. jsp의 경우, 클라이언트가 `.jsp`를 요청한다. 그런데 브라우저는 자바 코드를 이해하지 못한다. 그래서 웹 서버가 톰캣이라는 WAS에 던진다.

![톰캣(WAS) 처리](/assets/20210706_152350.png)

`index.jsp`에서 자바 코드를 해석해서 `index.html` 파일로 만든다.

![jsp → html 변환](/assets/20210706_152444.png)

이렇게 자바 코드를 해석해서 html 파일을 만드는 것이 템플릿 엔진이다. `.jsp` 파일을 스프링 부트가 버리긴 했지만, 아직 대한민국에서는 jsp를 많이 쓴다. (mustache 파일은 익히는 데 하루면 된다.)

```
package com.cos.controllerdemo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller //파일을 리턴할 것이기 때문
public class HttpRespController {
	@GetMapping("/txt")
	public String txt() {
		return "a.txt";	//프레임워크 사용(틀이 이미 정해져 있음)
	}
}


```

`localhost:8080/txt` 주소창에 쳐보면 파일 리턴도 된다.

**2. mustache 파일도 리턴해보자**

![mustache 다운로드 1](/assets/20210706_153116.png)

mvnRepository에서 다운이 필요하다.

![mustache 다운로드 2](/assets/20210706_153733.png)

스프링에서 쓰는 mustache를 검색한 후 최신 버전을 받아 쓰자.

![mustache 인식 문제](/assets/20210706_154749.png)

이동이 아니라 다운로드가 되는 이유는, 스프링이 mustache를 인식하지 못해서다. 즉 웹 서버가 mustache를 응답해야 하는데,

![톰캣 미응답](/assets/20210706_154916.png)

이 톰캣 부분에서 응답을 안 한 것이다.

```
@GetMapping("/mus")
	public String mus() { 	//2.mustache 파일 응답하기(기본 경로는 resource/static)

		return "b";	//머스테치 템플릿 엔진 라이브러리 등록 완료 - templates폴더 안에 .mustache놔두면 확장자 없이 자동으로 찾아감.
	}

```

![버전 선택](/assets/20210706_155132.png)

사람들이 많이 받은 9.0.41로 받아 사용하자.

![설정 1](/assets/20210706_155221.png)

![설정 2](/assets/20210706_155550.png)

![설정 3](/assets/20210706_155807.png)

여기서 jsp를 설정하면 경로가 안 뜬다. (스프링 부트가 기본 지원하지 않아서) `application.properties`를 yml로 바꾸자.

![ViewResolver 설정](/assets/20210706_160621.png)

이 부분을 ViewResolver라고 한다.

---

## JSP 파일에 JAVA 코드 사용해보기

- Java 코드 사용
- model 사용

![JSP에서 model 사용](/assets/20210706_174757.png)

이렇게 html 페이지로 model을 통해 자바 코드를 전달할 수 있다. 그 이유는 jsp가 템플릿 엔진이기 때문이다.

---

## HTTP 요청 재분배하기 - redirection

- HTTP 상태 코드 300번대
- 다른 주소로 요청을 재분배한다.

![리다이렉션 코드 1](/assets/20210706_182321.png)

![리다이렉션 코드 2](/assets/20210706_183309.png)

여기서 `/away`로 실행하면,

![리다이렉션 결과 1](/assets/20210706_183442.png)

![리다이렉션 결과 2](/assets/20210706_183455.png)

`home`으로 가게 되고 away, home 2개가 생기는데 home 부분에 200이 뜬다. 이것이 리다이렉션이다. (`/away`로 줬는데 home으로 이동)

더 자세한 내용은 [HTTP 상태 코드 문서](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)를 보자.

---

## 회원가입 - SecurityConfig 생성

![login 리다이렉션](/assets/20210706_194121.png)

`localhost:8080`에 갔는데 login 부분으로 간다. 왜일까?

```

<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
```

이 `pom.xml`의 security dependency 때문이다. 인증되지 않은 모든 사용자를 가로채서, 리다이렉션으로 주소 요청을 변경해 다른 주소로 보낸다.

![302 리다이렉션](/assets/20210706_194728.png)

status가 302면 리다이렉션되어 login 페이지가 뜬다. 우리가 만든 로그인으로 가고 싶다.

```
package config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity //해당 파일로 시큐리티를 활성화
@Configuration //IOC 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter{
		@Override
		protected void configure(HttpSecurity http) throws Exception {

//			super.configure(http);	//얘가 실행되서 리다이렉션가로챈다 tkrwpgkwk
//			얘를 삭제하면 기존 시큐리티가 가진 기능이 다 비활성화 된다.

		}
}

```

`super.configure` 부분에서 낚아채서 리다이렉션이 됐던 것이므로, 저 부분을 지워야 한다.

![리다이렉션 해제](/assets/20210706_200125.png)

이제 리다이렉션이 안 된다.

`"/", "/user/**", "/image/**", "/subscribe/**", "/comment/**"` 이런 구조로 지정하면 인증이 필요하게 만든다.

![요청 재분배](/assets/20210706_205649.png)

300번대가 뜨면 요청 재분배가 되었다고 생각하면 된다.

---

## CSRF

### 인증 구현하기

- 시큐리티 세팅
- 회원가입 구현
- 로그인 구현
- 회원정보 수정 구현

insert를 하려면 POST 요청이 필요하다.

![POST 회원가입](/assets/20210706_222033.png)

```
//회원가입 버튼 -> /auth/signup->auth/signin
	//회원가입 버튼 클릭했는데 아무것도 안되었네?
	//form 로그인 할 때 저기 보면 csrf토큰이라는 게 활성화되어있기 떄문.
	@PostMapping("/auth/signup")
	public String signup() {	//실제 signup
		System.out.println("실행됨?");
		return "auth/signin";	//회원가입이 성공하면 로그인으로 가게 한다.
	}

```

### CSRF 토큰

클라이언트가 서버에 전송할 때, 서버가 받기 전 시큐리티가 감싸고 있어 CSRF라는 토큰을 검사한다.

회원가입 창으로 서버에 요청하면 회원가입 페이지로 응답한다. `signup.jsp`를 응답할 때 시큐리티가 토큰을 심는다. CSRF 토큰을 심어 돌려주는데, input 태그들에 임시의 난수값이 생긴다.

![CSRF 토큰 1](/assets/20210706_223149.png)

![CSRF 토큰 2](/assets/20210706_223244.png)

예를 들어 KFC를 보낸다고 치면, 시큐리티가 이런 내용을 달아서 전달해준다. 이 상태에서 다시 요청하면, 시큐리티가 만든 CSRF 토큰이 있는지 확인한다.

포스트맨을 열어서,

![비정상 요청](/assets/20210706_223349.png)

이렇게 요청하거나(비정상적),

![정상 요청](/assets/20210706_223509.png)

회원가입 페이지를 통해 요청하는 사람이 있을 것이다(정상적). 이걸 구분하기 위해 CSRF를 사용한다.

다만 이걸 쓰면 자바스크립트로 요청하기도 힘들어 시큐리티에서 비활성화할 것이다.

**(참고)**

```
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
//@Controller
public class ViewControllerTest {

	@GetMapping("/auth/signup")
	public String signupPage() {
		return "auth/signup";
	}

	@GetMapping("/auth/signin")
	public String signinPage() {
		return "auth/signin";
	}

	@GetMapping("/image/story")
	public String storyPage() {
		return "image/story";
	}

	@GetMapping("/image/popular")
	public String popularPage() {
		return "image/popular";
	}

	@GetMapping("/image/upload")
```

여기서 `ViewControllerTest`로 컨트롤러를 했었는데, 이 부분을 주석 처리하지 않고 계속 POST 요청하니 컨트롤러가 요청을 못 잡았다. 컨트롤러를 주석 처리하고,

```
package com.cos.photogramstart.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity //해당 파일로 시큐리티를 활성화

@Configuration //IOC 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter{
		@Override
		protected void configure(HttpSecurity http) throws Exception {


			http.csrf().disable();	//시큐리티의 csrf를 사용하지 않음. 그럼 포스트맨에든 회원가입 창이든 어디서 해도 상관 안하겠다(403 안뜸)
//			super.configure(http);	//얘가 실행되서 리다이렉션가로챈다 삭제하자

//			얘를 삭제하면 기존 시큐리티가 가진 기능이 다 비활성화 된다.
			http.authorizeRequests()
			.antMatchers("/","/user/**", "/image/**", "/subscribe/**","/comment/**").authenticated()
			.anyRequest().permitAll()
			//"/","/user/**", "/image/**", "/subscribe/**","/comment/** 이런 구조로 지정하게 되면 인증이 필요하게 만든다.
			.and()
			.formLogin()	//form login 할텐데 auth의 sigin이 하면 이쪽으로 가게
			.loginPage("/auth/signin")
			.defaultSuccessUrl("/");	//로그인을 정상처리하면 /로 가라
		}
}


```

이 부분에 다시 컨트롤러를 넣고 실행하면 정상 작동된다.

---

## User 모델 만들기

signup을 하는데, 요청 DTO와 응답 DTO를 만들 것이다. DTO는 통신을 위해 데이터를 담는 객체이다.

```
@PostMapping("/auth/signup")
	public String signup(SignupDto signupDto) {	//key =value(x-www-form-urlencoded)방식이라고 했었따.

		log.info(signupDto.toString());	//문자열만 받을 수 있는 toString
		return "auth/signin";
	}
```

이렇게 바꾸고 info를 확인해보면,

![signupDto 로그](/assets/20210707_004042.png)

잘 넘어온 것이 확인된다. 이제 이걸 DB에 insert해야 한다. insert하려면 model이 필요하다. userModel을 만들어보자.

```
create user 'root'@'%' identified by 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
create database photogram;
```

자바에서 오브젝트를 만들면, 이 오브젝트를 기준으로 테이블이 만들어진다.

![테이블 자동 생성](/assets/20210707_011729.png)

---

## 회원가입 완료

- `User` 오브젝트에 `SignupDto`를 넣을 것이다. (SignupDto의 4개 값을 User에 집어넣는다.)
- 담을 때는 DTO에서 함수를 하나 만들어 전달한다.

```
public User toEntity() {
		return User.builder() //빌더패턴 사용
				.username(username)
				.password(password)
				.email(email)
				.name(name)
				.build();
	}
```

![toEntity 결과](/assets/20210707_015607.png)

받아온 값을 잘 넘겼다. (User의 role은 나중에 처리해도 된다.)

이걸 DB에 집어넣을 때 사용하는 것이 service이다. 그리고 서비스를 쓰려면 Repository를 만들어야 한다.

```

import com.cos.photogramstart.domain.user.User;

@Service	//1. IOC 관리 2.트랜잭션 관리
public class AuthService {

	public void 회원가입(User user) {
		//회원가입 진행(Repository가 필요)


	}
}


```

```
package com.cos.photogramstart.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

//어노테이션이 없어도 IOC등록이 자동으로 된다.
public interface UserRepository extends JpaRepository<User, Integer>{
	//첫번쨰는 오브젝트를 적어주고 두번쨰는 프라이머리 키의 타입을 적어준다.

}

```

AuthService를 요청해야 하는데, 이걸 DI로 불러와야 한다.

![DI 주입 1](/assets/20210707_021130.png)

![DI 주입 2](/assets/20210707_021051.png)

전역 변수에 `final`이 걸려 있으면, 생성자 실행 시 반드시 초기화를 해줘야 한다. `@RequiredArgsConstructor`를 쓰면 final이 걸린 모든 객체에 대한 생성자를 만들어준다. 이것은 final 필드를 DI 할 때 사용한다.

`save`되면 S 타입을 리턴한다. (내가 넣은 타입을 그대로 리턴받는다.)

![save 결과 1](/assets/20210707_023210.png)

![save 결과 2](/assets/20210707_024725.png)

실행 시 데이터가 안 들어갔다고 에러가 났었다. 이유는, 테이블을 만들기 전에 DB에 저장을 시도했기 때문이다. 테이블에 저장하려면 yml의

![ddl-auto 설정](/assets/20210707_024810.png)

이 부분을 `update`에서 `create`로 바꾸고 저장한 뒤, 다시 데이터가 사라지지 않도록 `update`로 바꿔 저장해야 한다.

![insert 성공](/assets/20210707_025035.png)

insert가 잘 되었다고 나오고, 실제 DB를 봐도

![DB 확인](/assets/20210707_025126.png)

정상적으로 들어간 것이 보인다.

여기서 문제는 패스워드가 암호화되지 않은 채 들어갔다는 점과, 권한(role)을 넣어줘야 한다는 점이다.

---

## 회원가입 - 비밀번호 해시화

`@Transactional`을 붙여주면, 이 함수가 실행되고 종료될 때까지 트랜잭션을 관리해준다. Write 작업(insert, update, delete)에는 트랜잭션을 붙이는 것이 좋다.

BCrypt를 사용해 암호화할 것이다.

```
private final UserRepository userRepository;
private final BCryptPasswordEncoder bCryptPasswordEncoder;
@Transactional
//붙여주면 이 함수가 실행되고 종료될때까지 트랜잭션 관리를 해준다.Write 할떄 트랜잭션 붙여줄 것(insert, update,delete)

public User  회원가입(User user) {	//타입도 User로 바꿔야
  //회원가입 진행(Repository가 필요)
  //여기서 받아서 인서트가 필요하고 그게 service 역할
  String rawPassword =user.getPassword();
  String encPassword = bCryptPasswordEncoder.encode(rawPassword);//암호화된 패스워드
  user.setPassword(encPassword);
  user.setRole("Role_User"); //관리자 Role_admin

```

이 부분을 서비스에 추가하고 실행해보자. 그리고 `SecurityConfig` 부분에,

```
@Bean
  public BCryptPasswordEncoder encode() {
      return new BCryptPasswordEncoder();
  }

```

이 부분이 없어서 에러가 났었으므로 넣어주자.

![암호화 결과](/assets/20210707_123130.png)

회원가입을 하면 DB에 들어가고, 비밀번호도 알아볼 수 없게 암호화가 잘 되었다.

![DB 암호화 확인](/assets/20210707_124459.png)

그런데 아이디, 패스워드, 유저네임 등이 같으면 중복이라 안 되기 때문에 이것도 처리해줘야 한다.

![중복 제약 위반 1](/assets/20210707_124146.png)

![중복 제약 위반 2](/assets/20210707_130644.png)

이 부분은 유니크 제약 조건을 위배했다고 에러를 뱉는다. (이게 정상이다.) 다만 이렇게 사용자에게 보여줄 수는 없으니 고쳐야 한다.

---

## 전처리/후처리 개념 잡기

서버가 데이터를 받아 JPA를 통해 DB에 insert하는 것이 기본이다.

![전처리/후처리 1](/assets/20210707_142525_lda87ojqp.png)

![전처리/후처리 2](/assets/20210707_142447.png)

![전처리/후처리 3](/assets/20210707_142938.png)

스키마(DB 테이블)를 바꾸면 다시 반영해야 하므로, 이때는 `create`로 해야 적용된다.

DB에 물어볼 것이 있고 안 물어볼 것이 있다.

- **유저네임 중복 여부**: 1번(전처리)에서는 판단 못 하고 2번(후처리)에서만 가능하다.
- **20자 이상 여부**: 1번에서도 가능하다.

그래서 1번에서 처리하는 것을 **전처리**라 하고 Validation을 이용하며, 2번에서 처리하는 것을 **후처리**라 하고 ExceptionHandler를 사용한다.

---

## 유효성 검사하기

![Validation 예시 1](/assets/20210707_143956.png)

이것이 validation인데, 이렇게 하면 코드가 굉장히 길어진다.

![Validation 예시 2](/assets/20210707_144431.png)

전처리를 하기 위해 starter validation을 설치하자(pom.xml).

![Validation 설치 1](/assets/20210707_144859.png)

![Validation 설치 2](/assets/20210707_150149.png)

![Validation 결과](/assets/20210707_150203.png)

테이블이 생성되고 not null이 들어간 것이 보인다.

---

## @ResponseBody 사용하기

프론트단에서 막아도(`localhost:8080/auth/signup`) 포스트맨에서 넣을 수 있는데, 이것을 막아야 한다.

![프론트 막기 1](/assets/20210707_165809.png)

프론트단에서 막는 것은,

![프론트 막기 2](/assets/20210707_170115.png)

이렇게 `required`를 넣어주면 글자를 안 넣을 시 안 넘어가게 된다.

`@ResponseBody`를 사용하면 컨트롤러지만 데이터를 받을 수 있다. 오류가 나면 이제 콘솔이 아닌 페이지로 이동시켜주게 만들 것이다.

```
@PostMapping("/auth/signup")
public @ResponseBody String signup(@Valid SignupDto signupDto, BindingResult bindingResult) {	//key =value(x-www-form-urlencoded)방식이라고 했었따.
  //signupDto에서 오류가 있으면 bindingResult에 다 모아준다.
  //getFieldErrors에 다 모아주고 그걸 errors로 담는다.

  if(bindingResult.hasErrors()) {//에러가 있으면(유저길이가 넘어가거나 빈칸이 있으면
    Map<String, String> errorMap = new HashMap<>();

    for(FieldError error : bindingResult.getFieldErrors()) {
      errorMap.put(error.getField(), error.getDefaultMessage());
    }
    return "오류남";
  }else {
```

---

## 글로벌 예외 처리하기 (Validation 체크)

다시 `@ResponseBody`를 지우고, 전체 예외 처리를 하는 핸들러를 만든다.

```
@ControllerAdvice	//이걸 붙이면 모든 Exception을 다 낚아챈다.

```

![ControllerAdvice 1](/assets/20210707_170724.png)

데이터를 응답하기 위해 `@RestController` 어노테이션도 사용한다.

![ControllerAdvice 2](/assets/20210707_171026.png)

이제 실행해보면 UI가 더 나아진 것이 보인다.

유효성 검사에 실패하면(DTO 중 하나라도 실패하면) `BindingResult`에 다 담기고, 에러가 하나라도 있으면 해시맵에 담아 Exception을 강제로 발생시킨다.

```
throw new CustomValidationException("유효성 검사 실패", errorMap); //강제 예외 발생

```

예외를 강제로 throw로 발생시키고 실행해보자.

---

## 공통 응답 DTO 만들기

```
public Map<String, String> validationException(CustomValidationException e) {
```

이 부분을 `CMRespDto`로 받게 하자.

![CMRespDto](/assets/20210707_190640.png)

그리고 다 바꾸고 실행하면 (정리된) 에러들이 발생한다.

---

## 공통 응답 Script 만들기

```
@RestController
@ControllerAdvice
public class ControllerExceptionHanlder {

	@ExceptionHandler(CustomValidationException.class)
	public String validationException(CustomValidationException e) {
		// CMRespDto, Script 비교
		// 1. 클라이언트에게 응답할 때는 Script가 더 좋음.(응답을 브라우저가 받음)
		// 2. Ajax통신 - CMRespDto(Ajax랑 통신할 떈 이게 더 좋음)
		// 3. Android 통신 - CMRespDto
		//Ajax는 자바쪽으로 서버 연결해서 통신
		//차이는 클라이언트가 응답받을땐 스크립트, 개발자는 코드로 응답받을때가 좋다
		return Script.back(e.getErrorMap().toString());
//		return new CMRespDto(-1, e.getMessage(), e.getErrorMap());	//실패했을떄 -1, 두번째에 메시지 3번째에 에러맵

	}
}

```

- **클라이언트(브라우저)가 응답받을 때**: Script가 더 좋다.
- **Ajax / Android 통신**: CMRespDto가 더 좋다. (개발자가 코드로 응답받을 때 적합)

---

## 로그인 - UserDetailsService 이해하기 및 완료

시큐리티 설정 파일이 `POST: /auth/signin`이 들어오는지 계속 감시한다(AOP).

![로그인 감시 1](/assets/20210708_015455.png)

![로그인 감시 2](/assets/20210708_015601.png)

`PrincipalDetailsService`에서 로그인이 진행된다.

```

	// 1. 패스워드는 알아서 체킹하니까 신경쓸 필요 없다.
	// 2. 리턴이 잘되면 자동으로 UserDetails 타입을 세션으로 만든다.
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//유저네임만 받아오면 됨. 왜냐면 시큐리티가 알아서 패스워드 처리하기 때문.
		User userEntity = userRepository.findByUsername(username);

		if(userEntity == null) {
			return null;
		}else {
			return new PrincipalDetails(userEntity);
		}
	}


```

JPA Naming Query도 찾아보자.

함수를 넣고 싶지만 자바는 매개변수에 함수를 못 넣는다(일급 객체가 아니라서). 대신 자바에서 함수를 넘기고 싶으면 인터페이스를 넘긴다.

```
@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collector = new ArrayList<>();
		collector.add(() -> { return user.getRole();});	//자바에서는 매개변수에
		return collector;
	}

```

---

## View, 세션 정보 확인하기

home을 눌렀을 때 이미지 스토리로 가는데, `/`로 가게 바꾸자. (스토리의 메인 페이지로 오게 한다.)

![home 이동](/assets/20210708_151750.png)

일단 회원가입·로그인 뷰까지 연결이 끝났다. 그럼 세션이 어디에 만들어졌는지 확인해야 한다.

시큐리티로 로그인을 했는데, 사용자가 `/auth/signin` 요청을 하면 (시큐리티 config에 설정되어 있기 때문에) 서버로 가는 내용을 시큐리티가 받는다.

![세션 처리 1](/assets/20210708_154506.png)

유저네임이 있는지 확인하고, 없으면 내보내고 있으면 리턴한 `PrincipalDetails`를 세션에 저장한다.

![세션 저장](/assets/20210708_174113.png)

---

## 회원 정보 수정 - 시큐리티 태그 라이브러리

![시큐리티 태그 라이브러리](/assets/20210709_003150.png)

헤더에 이걸 걸어놨는데, 어느 곳에서든 헤더 부분이 사용된다.

```
<sec:authorize access="isAuthenticated()">  //인증된 정보에 접근하는 방법(세션에 접근하는 방법)
	<sec:authentication property="principal" var="principal"/>

</sec:authorize>

```

`principal`을 저렇게 설정한 이유는, 접근 주체·인증 주체라는 뜻으로 정해진 것이라 생각하면 된다.

![principal 사용](/assets/20210709_003448.png)

이제 이 과정이 되면 모델에 안 넘겨도 된다(지우자). 시큐리티 관련 내용은 [이 글](https://codevang.tistory.com/273)에 잘 나와 있다.

---

## Ajax 사용하기

```
<button onclick="update(${principal.user.id},event)">제출</button>

```

버튼이 form 태그 안에 있으면 폼이 가진 이벤트가 발생한다. 폼은 데이터를 전송하는 것이라 타입을 바꿔줘야 한다.

```
<button type = "button" onclick="update(${principal.user.id},event)">제출</button>
```

이렇게 `type`을 추가해야 한다. 그런데 우리는 이벤트를 넘기지 않고 폼 태그가 지닌 모든 값을 가져와야 전송이 가능하다. 제이쿼리를 쓰자.

```
// (1) 회원정보 수정
function update(userId) {

	let data = $("#profileUpdate").serialize();
	console.log(data);
}

```

값을 바꾸고 넘겨보면,

![serialize 결과](/assets/20210709_012335.png)

잘 넘어간다.

```

	let data = $("#profileUpdate").serialize();
	console.log(data);
	$.ajax({
		type: "put",
		url: `/api/user/${userId}`,
		data: data,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json"
	}).done(res => {
		console.log("update실패")

	}).fail(error => {
		console.log("update실패")
	});

```

Ajax는 페이지나 파일이 아닌 데이터를 응답해야 한다. 데이터를 응답하는 것을 API라고 한다.

![Ajax API](/assets/20210709_014615.png)

이 데이터들을 넘겨받아 처리할 것이라, 이 데이터를 담을 DTO를 만들어야 한다.

```

public class UserApiController {
	@PutMapping("/api/user/{id}")
	public String update(UserUpdateDto userUpdateDto) {
		System.out.println(userUpdateDto);
		return "ok";
	}

```

이렇게 작성하고 회원 수정을 실행해보면,

![수정 데이터 전달](/assets/20210709_015017.png)

입력한 정보들이 잘 넘어온 것이 보인다. (업데이트 실패 로그는 String 타입을 줬는데 json으로 리턴해서 그렇다.)

신경 써야 할 부분은 여기다.

![신경 쓸 부분](/assets/20210709_020740.png)

콘솔에 입력값이 잘 들어왔는지 볼 수 있다.

![영속화 확인](/assets/20210709_024332.png)

영속화해서, 영속화된 객체의 값만 바꾸면 DB에 자동으로 반영되게 해야 한다. 그리고 `@RequiredArgsConstructor`를 써야 final로 선언한 객체도 초기화 선언 없이 사용 가능하다.

그리고 컨트롤러 부분에서,

```
@PutMapping("/api/user/{id}")
public CMRespDto<?> update(@PathVariable int id,UserUpdateDto userUpdateDto) {
  User userEntity = userService.회원수정(id, userUpdateDto.toEntity());//유저 오브젝트 날림
//		PrincipalDetails.setUser(userEntity); // 세션 정보 변경
  return new CMRespDto<>(1, "회원수정완료", userEntity);
}

```

요청이 들어오면 회원 수정을 하고, 수정된 결과를 받아 Ajax 호출한 쪽으로 응답만 해줬다.

이제 업데이트하고 DB를 확인해보면,

![DB 수정 확인](/assets/20210709_030049.png)

성별 부분과 그 외 입력 부분이 바뀐 것이 보인다.

DB는 변경됐는데 다시 들어가면 그대로다. 세션 정보가 안 바뀌어서 그런 것이므로, 세션 정보에 접근해 바꿔줘야 한다.

![세션 변경](/assets/20210709_031240.png)

뒤의 `@AuthenticationPrincipal`을 이용해 세션 정보에 접근했다.

이제 프론트단에선 막았다. 그런데 포스트맨 같은 백엔드 접근은 막지 못하므로 그것도 막아야 한다. `ControllerExceptionHanlder`에 모든 예외가 모이는데, 브라우저에 던져줄 때 상태 코드도 같이 던져주는 것이 좋다.

---

## 유효성 검사

![유효성 검사](/assets/20210709_100058.png)

**프론트단에서 할 일**

1. 유효성 검사 (서버에 정보가 잘 들어왔는지 확인)

![유효성 검사 흐름](/assets/20210709_100323.png)

유저 수정은 DB에 접근해야 확인할 수 있어 뒷단에서 처리한다.

- 1번 유저 수정 → 영속화 → 1번 유저 없음

---

## 구독 - 연관관계 개념 잡기

![연관관계 1](/assets/20210709_143655.png)

이때 Foreign Key는 누가 가질까? 연관관계가 없으면 이 게시글을 누가 썼는지(ssar이 썼는지) 알 수 없다.

ssar이라는 유저가 1번 게시글을 쓴다고 하자. 그런데 ssar은 글을 여러 개 쓸 수 있다. 만약 한 컬럼에 여러 글을 담으면 정규화의 원자성이 깨진다. (하나의 컬럼에는 하나의 데이터가 들어가야 한다.)

![연관관계 2](/assets/20210709_144151.png)

**연관관계 개념**

1. FK는 Many가 가진다.

예시로 사람과 영화의 관계를 보자.

- 사람 한 명이 여러 영화를 볼 수 있다.
- 한 영화는 여러 사람이 볼 수 있다.

이 경우 N:N 관계이다.

1번/2번 유저, 1번/2번 영화가 있다고 하자. 1번 유저가 어벤져스도, 2번 영화도 보려는데 동시에는 못 한다(원자성 깨짐). 어벤져스도 1번 유저, 2번 유저가 동시에 보는 것도 원자성이 깨진다. 그래서 N:N에서는 항상 중간 테이블이 생성된다.

![중간 테이블 1](/assets/20210709_144547.png)

![중간 테이블 2](/assets/20210709_144606.png)

![중간 테이블 3](/assets/20210709_144854.png)

중간 테이블을 "예매" 테이블로 두면,

- 한 명의 유저는 예매를 여러 번 가능하다. → 유저와 예매는 1:N
- 한 영화는 예매를 여러 번 가능하다. (한 번만 가능하면 한 명밖에 못 본다.) → 영화와 예매는 1:N
- 하나의 예매가 여러 영화를 한 번에? → 불가능

**공식: N:N은 항상 중간 테이블이 생긴다.**

중간 테이블이 1이 되고, 내 테이블이 N이 된다(중요). 반대쪽도 마찬가지여서 결국 `N:1:N` 형태가 된다. (1은 중간 테이블)

![구독 테이블 1](/assets/20210709_145806.png)

![구독 테이블 2](/assets/20210709_145850.png)

이 subscribe 테이블은 중간 테이블이라 항상 N이 되어야 하고, `1:N:1` 형식이 된다. 그럼 이런 식으로 테이블 설계가 가능하며, Foreign Key는 subscribe가 가지게 된다.

![구독 설계](/assets/20210709_152354.png)

![구독 중복 에러](/assets/20210709_172801.png)

이 경우 1번이 2번을 구독했는데 또 2번을 구독하면 중복이 나서 에러가 발생한다.

**쿼리 작성**

```

	@Modifying // INSERT, DELETE, UPDATE 를 네이티브 쿼리로 작성하려면 해당 어노테이션 필요!!
	@Query(value = "INSERT INTO subscribe(fromUserId, toUserId, createDate) VALUES(:fromUserId, :toUserId, now())", nativeQuery = true)
	void mSubscribe(int fromUserId, int toUserId);

	@Modifying
	@Query(value = "DELETE FROM subscribe WHERE fromUserId = :fromUserId AND toUserId = :toUserId", nativeQuery = true)
	void mUnSubscribe(int fromUserId, int toUserId);

```

- `@Modifying`: INSERT, DELETE, UPDATE를 네이티브 쿼리로 작성하려면 해당 어노테이션이 필요하다.
- 쿼리 안의 `:` 문법은 (예: `:fromUserId`) 파라미터로 들어온 값을 안에 넣겠다는 뜻이다.

---

## 예외 처리 ~ 시큐리티 설정

![구독 예외 1](/assets/20210710_143207_drgcj09xa.png)

![구독 예외 2](/assets/20210710_143829_wbulgwtvv.png)

![구독 예외 3](/assets/20210710_143859_24s4va5v7.png)

로그인을 먼저 해야 구독이 가능하다.

![구독 동작 1](/assets/20210710_144105.png)

그리고 똑같은 걸 또 하면 에러가 나게 해야 한다.

![구독 동작 2](/assets/20210710_144142.png)

![구독 동작 3](/assets/20210710_144216.png)

그리고 시큐리티 config 부분에서, 인증이 필요한 경로로 user, comment, image, subscribe를 설정했는데 `api`로 시작하는 모든 것도 (인증 대상에서) 나가게 설정한다.

![시큐리티 config](/assets/20210710_150955.png)

---

## Profile 페이지 - 이미지 모델 만들기 ~ 유효성 검사

- 한 명의 유저는 여러 이미지를 업로드할 수 있다. → 유저가 1, 이미지가 N
- 반대로 하나의 이미지는 몇 명의 유저가 만들 수 있나?

**파일 저장 위치**

![파일 저장 위치](/assets/20210710_163454.png)

```
<form class="upload-form"  action="/image" method="post" enctype="multipart/form-data">
		<input  type="file" name="file"  onchange="imageChoose(this)"/>
		<div class="upload-img">
				<img src="/images/person.jpeg" alt="" id="imageUploadPreview" />
		</div>

		<!--사진설명 + 업로드버튼-->
		<div class="upload-form-detail">
			 <input type="text" placeholder="사진설명" name="caption"> <!--  얘를 전송하는데 얘는 key-value로 날아감-->
				<button class="cta blue">업로드</button>
		</div>
```

`multipart/form-data`는 여러 가지 타입 데이터를 묶어서 전달한다는 의미이다. 파일과 key-value를 동시에 전송하고 싶을 때 멀티파트를 사용한다.

![이미지 업로드 1](/assets/20210710_171302.png)

사진을 업로드하면 로그인한 사용자 페이지로 오고, yml에 등록한 폴더에도

![이미지 업로드 2](/assets/20210710_171331.png)

잘 들어 있는 것이 확인된다. 이걸 DB에 실제로 등록하고 caption을 넣어보자.

---

## 업로드 폴더를 프로젝트 외부에 두는 이유

서버를 실행하면 코드가 바로 실행되는 게 아니라, 코드가 컴파일되어 `.class` 파일로 바뀐 뒤 실행된다. target 폴더가 있는데, 서버가 실행될 때 컴파일을 해서 `.class` 파일들이 거기에 들어가고, 실행은 target 폴더의 `.class` 파일이 한다.

photogram 폴더 안의 모든 것은 target 폴더로 들어가야 한다(업로드 폴더, 사진 파일도 마찬가지). 1.jpg가 들어오면 target 폴더로 가야 실행된다.

![deploy 개념 1](/assets/20210710_201638.png)

target 폴더로 `.class`나 정적 파일을 집어넣는 것을 deploy(배포)한다고 한다.

서버를 실행해 사진을 업로드하면, photogram 내부에 있으니 업로드 폴더 안에 1.jpg가 저장되고, 이 파일이 target 폴더로 이동된다. 이렇게 target 폴더로 들어와 실행되는 행위를 deploy라고 한다.

자바 파일은 실행(컴파일)하는 데 얼마 안 걸리지만(`.java`/`.class`가 0.1초 수준), 사진 같은 큰 파일은 몇 초가 걸릴 수 있다.

![deploy 개념 2](/assets/20210710_202238.png)

그래서 실행 시 target 폴더에 모든 걸 넣으면, target 폴더에 들어가기도 전에 1.jpg가 실행될 수도 있다.

![deploy 개념 3](/assets/20210710_202210.png)

여기서 업로드를 누르면 deploy가 되어야 하는데, 올라가는 시간보다

![deploy 개념 4](/assets/20210710_202230.png)

메인으로 오는 시간이 더 빠르면, 엑박(이미지 깨짐)이 나오게 된다.

photogram 내부가 아닌 외부에 1.jpg를 두면, 내부에 있는 게 아니니 deploy할 필요가 없다. 찾을 때도 target이 아니라 업로드 폴더에서 찾는다. 그래서 큰 파일은 프로젝트 폴더에 두는 것을 추천하지 않는다.

User 프로필 정보로 가면서 이미지로 갈 때는 양방향 매핑을 해야 한다.

---

## 이미지 뷰 렌더링

```
@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		WebMvcConfigurer.super.addResourceHandlers(registry);

		//file:///C:/workspace/springbootwork/upload/
//			  path: C:/STS4_WorkSpace\photogram\workspace/springbootwork/upload/

//			이렇게만 적어도 실제 주소인 path부분으로 간다.
		registry
			.addResourceHandler("/upload/**") // jsp페이지에서 /upload/** 이런 주소 패턴이 나오면 발동
			.addResourceLocations("file:///"+uploadFolder)
			.setCachePeriod(60*10*6) // 1시간
			.resourceChain(true)
			.addResolver(new PathResourceResolver());

```

![리소스 핸들러](/assets/20210713_015924.png)

`/upload/**` 패턴이 발동하면 실제 주소로 바꿔준다. `WebMvcConfig`가 낚아채서 실행하는데, 만약 리소스 핸들러 부분을 바꾸면 발동하지 않는다.

---

## Open in View (OSIV)

클라이언트가 요청하면, 톰캣에는 스프링 컨테이너가 있고 그 안에 디스패처가 있다. 스프링 컨테이너 안에는 컨트롤러가 있고, 컨트롤러가 서비스를 호출하며, 서비스는 레파지토리를 호출하고, 레파지토리는 영속성 컨텍스트를 가지고 있다. 그다음 영속성 컨텍스트가 DB를 호출한다.

요청이 들어오면 디스패처가 받아서 어떤 컨트롤러에 줄지 찾는다. 이때 DB에 접근할 수 있는 세션이 (컨트롤러에) 만들어진다.

그다음 영속성 컨텍스트에 데이터가 있으면 바로 응답 가능하고, 없으면 영속성 컨텍스트가 DB에 요청해 응답받는다. 레파지토리가 받으면 다시 역순으로 응답한다. 서비스가 비즈니스 로직을 처리하고 컨트롤러에 돌려주면, 컨트롤러는 그것을 데이터로 줄지 html로 줄지 정해 최종적으로 돌려준다.

![OSIV 1](/assets/20210713_022937.png)

세션이 닫히는 타이밍이 언제인가? 서비스에서 컨트롤러로 돌려주는 시점에 닫히면 Lazy 로딩이 불가능해진다.

![OSIV 2](/assets/20210713_023411.png)

![OSIV 3](/assets/20210713_023353.png)

**지연 로딩 예시**: `User` 클래스가 id, username, images를 들고 있는데, images가 다른 테이블(OneToMany/ManyToOne)인지가 중요하다. `fetchType`이 `LAZY`면 처음 유저를 select할 때 유저만 들고온다. `EAGER`면 조인해서 이미지까지 같이 들고온다.

![OSIV 4](/assets/20210713_023330.png)

![OSIV 5](/assets/20210713_023330_5tmwyk27t.png)

![OSIV 6](/assets/20210713_023449.png)

바꾸면 user1 페이지로 가는 것조차 안 된다. 유저만 들고온 상태에서 유저가 들고 있는 images에서

![OSIV 7](/assets/20210713_023551.png)

이 동작이 안 되게 된다.

![OSIV 8](/assets/20210713_023637.png)

OpenInView가 꺼져 있으면 세션이 컨트롤러와 서비스단 사이에서 종료된다. 대신 EAGER 전략이면 세션이 그곳에서 닫혀도 된다.

### OpenInView란

OpenInView는 뷰단까지 세션을 오픈한다는 뜻이다.

![OSIV 9](/assets/20210713_024203.png)

그럼 세션 종료가 컨트롤러 이후에 일어나므로 Lazy 로딩이 가능해진다.

### DB 업로드 시 @Transactional을 걸어야 하는 이유

송금 서비스와 계좌가 있다고 하자. 송금 함수를 하나 만들어, 2번 유저에게 머니를 송금한다.

![트랜잭션 1](/assets/20210713_024549.png)

여기서 1번 유저(출금) 처리가 실패했다고 치면, 5000원이 허공으로 날아간다.

지금은 단순한 insert/update라 한 번의 행동밖에 없지만, 여러 개의 update나 insert가 섞이면 문제가 된다. 송금은 2개의 로직(출금 + 입금)이 하나로 묶인 것이며, 이것을 하나의 트랜잭션으로 본다.

트랜잭션은 일의 최소 단위이다. 송금의 최소 단위는 2가지 업데이트가 일어나는 것이다. 이런 문제가 안 일어나게 하려면 `@Transactional`을 넣어주면 된다. 위의 일 중 하나라도 잘못되면 롤백하고, 전부 잘 수행되어야 commit한다.

그래서 DB에 값을 넣을 때 CRUD를 잘 실행하기 위해 `@Transactional`을 거는 것이 아주 좋은 습관이다.

![트랜잭션 2](/assets/20210713_024822.png)

회원 프로필처럼 read만 하는 경우에도 트랜잭션을 걸어주는 것이 좋다(readOnly).

**select에 트랜잭션을 거는 이유**

user 1번 정보를 업데이트하고 싶다고 하자.

![readOnly 1](/assets/20210713_025808.png)

1번 정보를 select해서 들고온다(레파지토리에 있으면 바로, 없으면 DB에 요청). 그리고 이 user1 정보는 어디서나 동기화되어 있다. 이 상태에서 user1의 username을 변경하면, 레퍼런스가 모두 같아서 영속성 컨텍스트 부분도 바뀐다.

응답되는 시점(컨트롤러-서비스 사이)에, 영속성 컨텍스트는 변경된 오브젝트를 DB에 자동 flush해서 업데이트한다. 영속성 컨텍스트는 서비스가 끝나는 시점에 변경된 오브젝트를 감지해야 하는데, 감지해서 넣는 것을 더티 체킹(Dirty Checking)이라고 한다.

그래서 변경 감지를 하기 위해 `readOnly=true` 같은 옵션을 넣어준다. (DB 고립성 같은 내용도 있지만 그건 나중에)

---

## ~DTO 페이지 완성

![DTO 페이지](/assets/20210713_030254.png)

`sout`(System.out.println)을 막 호출하면 오류가 난다. 유저 호출 시 내부적으로 이미지를 호출할 텐데, sout를 어디서 잘못했는지 확인하자.

---

## 구독하기 뷰 렌더링

### 스칼라 서브쿼리

select 절에 select를 넣는 것이다.

```
SELECT u.id, u.username,u.profileImageUrl
FROM user u INNER JOIN subscribe s
ON u.id = s.toUserId
WHERE s.fromUserId=1;

```

### QLRM이란

데이터베이스에서 result된 결과를 자바 클래스에 매핑해주는 라이브러리이다. 이것으로 DTO를 쉽게 받고 만들 수 있다.

![QLRM](/assets/20210714_132507.png)

```


-- 구독수
-- SELECT COUNT(*) FROM subscribe WHERE FROMUserID=1;

-- 구독 여부(ssar(1)로 로그인, cos(2)페이지로 감)
SELECT COUNT(*) FROM subscribe WHERE FROMUserID=1 AND touserid=2;

-- 로그인(1 ssar) -- 구독정보(2 cos)
SELECT * FROM subscribe;

SELECT * FROM user;

SELECT * FROM subscribe WHERE FromUserid=1;

SELECT * from user WHERE id =1 OR id=3;	--조인

--조인쿼리 (user.id = subscribe.toUserID)

SELECT u.id, u.username,u.profileImageUrl
FROM user u INNER JOIN subscribe s
ON u.id = s.toUserId
WHERE s.fromUserId=1;

```

---

## 스토리 페이지

### 포토 리스트 만들기 ~ 페이징 로딩 구현

**쿼리 (ImageRepository)**

```
@Query(value = "SELECT * FROM image WHERE userId IN (SELECT toUserId FROM subscribe WHERE fromUserId = :principalId) ORDER BY id DESC", nativeQuery = true)
	Page<Image> mStory(int principalId, Pageable pageable);
}

```

**스토리 페이지 API (JavaScript)**

```
/**
	2. 스토리 페이지
	(1) 스토리 로드하기
	(2) 스토리 스크롤 페이징하기
	(3) 좋아요, 안좋아요
	(4) 댓글쓰기
	(5) 댓글삭제
 */

// (1) 스토리 로드하기
let page = 0;

function storyLoad() {
	$.ajax({
		url: `/api/image?page=${page}`,
		dataType: "json"
	}).done(res => {
		//console.log(res);
		res.data.content.forEach((image)=>{
			let storyItem = getStoryItem(image);
			$("#storyList").append(storyItem);
		});
	}).fail(error => {
		console.log("오류", error);
	});
}

storyLoad();

function getStoryItem(image) {
	let item = `<div class="story-list__item">
	<div class="sl__item__header">
		<div>
			<img class="profile-image" src="/upload/${image.user.profileImageUrl}"
				onerror="this.src='/images/person.jpeg'" />
		</div>
		<div>${image.user.username}</div>
	</div>
	<div class="sl__item__img">
		<img src="/upload/${image.postImageUrl}" />
	</div>
	<div class="sl__item__contents">
		<div class="sl__item__contents__icon">
			<button>
				<i class="fas fa-heart active" id="storyLikeIcon-1" onclick="toggleLike()"></i>
			</button>
		</div>
		<span class="like"><b id="storyLikeCount-1">3 </b>likes</span>
		<div class="sl__item__contents__content">
			<p>${image.caption}</p>
		</div>
		<div id="storyCommentList-1">
			<div class="sl__item__contents__comment" id="storyCommentItem-1"">
				<p>
					<b>Lovely :</b> 부럽습니다.
				</p>
				<button>
					<i class="fas fa-times"></i>
				</button>
			</div>
		</div>
		<div class="sl__item__input">
			<input type="text" placeholder="댓글 달기..." id="storyCommentInput-1" />
			<button type="button" onClick="addComment()">게시</button>
		</div>
	</div>
</div>`;
	return item;
}

// (2) 스토리 스크롤 페이징하기
$(window).scroll(() => {
	//console.log("윈도우 scrollTop", $(window).scrollTop());
	//console.log("문서의 높이", $(document).height());
	//console.log("윈도우 높이", $(window).height());

	let checkNum = $(window).scrollTop() - ( $(document).height() - $(window).height() );
	//console.log(checkNum);

	if(checkNum < 1 && checkNum > -1){
		page++;
		storyLoad();
	}
});


```

---

## 좋아요 구현

### Like 모델 만들기

### 좋아요 API 구현

![좋아요 API 1](/assets/20210727_141711.png)

![좋아요 API 2](/assets/20210727_141409.png)

먼저 포스트맨에서 로그인(POST)을 하고 좋아요 API를 실행해야 좋아요가 성공한다.

![좋아요 성공](/assets/20210727_141935.png)

---

## 인기순 정렬

Likes 안의 유저 안에 이미지가 안 나오면 해결된다.

```
SELECT imageId
FROM(
SELECT imageId, COUNT(imageId) likeCount
FROM likes GROUP BY imageId
ORDER BY likeCount desc
) c;

```

인기순으로 데이터를 뽑아온다.

```

SELECT i.*
FROM image i INNER JOIN (SELECT imageId, COUNT(imageId) likeCount FROM likes GROUP BY imageId) c
ON i.id = c.imageid
ORDER BY likeCount DESC;
;

```

---

## 프로필 유저 사진 변경

![사진 변경](/assets/20210728_030536.png)

1. `pageUserId`와 `principalId`를 비교해서 같을 때만 동작하기
2. 사진 클릭 시 `input type="file"` 강제로 클릭 이벤트 발생시키기
3. 이미지를 PUT 방식(Ajax)으로 서버에 전송하기
   - FormData 객체 이용
