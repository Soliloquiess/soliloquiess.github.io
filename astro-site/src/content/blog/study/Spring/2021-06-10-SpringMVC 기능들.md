---
title: "[Spring] SpringMVC — URL 매핑부터 스코프·쿠키·Properties까지"
date: 2021-06-09
category: "Spring"
tags: ["Spring"]
description: "Spring MVC의 web.xml 기반 설정, URL 매핑과 요청 방식, 파라미터 추출, ViewResolver, Redirect/Forward 흐름, Bean 스코프(Request/Session/Application), Cookie, Properties/Message까지 핵심 기능을 정리한 학습 기록."
permalink: "study/2021/06/09/SpringMVC-기능들"
---

## XML로 세팅하기

**DispatcherServlet**이 가진 변수에 이 값을 집어넣는다.

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="4.0"
	xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee                       
						http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd">

	<!-- 현재 웹 애플리케이션에서 받아들이는 모든 요청에 대해 appServlet이라는 이름으로 정의되어 있는 서블릿을 사용하겠다. -->
	<servlet-mapping>
		<servlet-name>appServlet</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
	<!-- 요청 정보를 분석해서 컨트롤러를 선택하는 서블릿을 지정한다. -->
	<servlet>
        <servlet-name>appServlet</servlet-name>
        <!-- Spring MVC에서 제공하고 있는 기본 서블릿을 지정한다. -->
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- Spring MVC 설정을 위한 xml 파일을 지정한다. -->
        <init-param>
        	<param-name>contextConfigLocation</param-name>
        	<param-value>/WEB-INF/config/servlet-context.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!-- Bean을 정의할 xml 파일을 지정한다. -->
    <context-param>
    	<param-name>contextConfigLocation</param-name>
    	<param-value>/WEB-INF/config/root-context.xml</param-value>
      <!-- 이 파일을 읽어들였다-->
    </context-param>

    <!-- 리스너설정 -->
    <listener>
    	<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- 파라미터 인코딩 필터 설정 -->
    <filter>
    	<filter-name>encodingFilter</filter-name>
    	<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    	<init-param>
    		<param-name>encoding</param-name>
    		<param-value>UTF-8</param-value>
    	</init-param>
    	<init-param>
    		<param-name>forceEncoding</param-name>
    		<param-value>true</param-value>
    	</init-param>
    </filter>

    <filter-mapping>
    	<filter-name>encodingFilter</filter-name>
    	<url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>


```

---

## URL 매핑

![Context Path 설명 화면](/assets/20210610_231942.png)

위 그림에서 강조된 부분이 **Context Path**다.

### URL 구조

`프로토콜://도메인주소(IP):포트번호/경로1/경로2/경로3/`

| 구성 요소 | 설명 | 기본값 |
|---|---|---|
| **프로토콜** | 서버-클라이언트 통신 약속 | http |
| **도메인(IP)** | 네트워크 상 컴퓨터를 구분하는 고유 주소 | - |
| **포트번호** | 1~65535, 컴퓨터 내 프로그램 구분 | 80 |
| **Context Path** | 하나의 서버에서 웹 애플리케이션을 구분하는 첫 번째 경로 | - |

- Spring MVC에서는 Context Path 이후의 주소를 **실제 물리적 경로와 다르게** 지정할 수 있다.

```
@Controller
public class Test1Controller {
	@RequestMapping(value = "/test1", method = RequestMethod.GET)
	public String test1() {
	return "test1";
	}
}

```

하위 경로도 동일한 방식으로 처리한다.

```
@Controller
public class Sub1Controller {
	@RequestMapping(value = "/sub1/test3", method = RequestMethod.GET)
	public String test3() {
		return "sub1/test3";
	}
	@RequestMapping(value = "/sub1/test4", method = RequestMethod.GET)
	public String test4() {
		return "sub1/test4";
	}
}


```

> `@RequestMapping` 어노테이션으로 요청 주소 처리가 가능하다.

---

## 요청 방식 지정

Spring MVC는 같은 요청 주소에서 **요청 방식(GET/POST/PUT/DELETE/PATCH)에 따라 별도 메서드**를 정의할 수 있다.

### @RequestMapping

```

@RequestMapping(value = "/test1", method = RequestMethod.GET)
public String test1() {
	return "test1";
}

```

요청 방식들을 동시에 설정하는 것도 가능하다.

```
@RequestMapping(value = "/test7", method = {RequestMethod.GET, RequestMethod.POST})
public String test7() {
	return "test7";
}


```

> `@RequestMapping` 대신 `@GetMapping`, `@PostMapping` 등 요청별 전용 어노테이션을 사용할 수도 있다.

---

## 파라미터 추출

Spring MVC는 요청 방식과 관계없이 동일한 방식으로 파라미터를 추출한다.

| 방식 | 설명 |
|---|---|
| **HttpServletRequest** | Servlet/JSP 방식과 동일. 객체를 주입받아 사용 |
| **WebRequest** | `HttpServletRequest`를 확장한 클래스 |
| **@PathVariable** | URL 경로에 포함된 값을 직접 주입. RESTful API에 주로 사용 |
| **@RequestParam** | 파라미터 이름과 변수 이름이 같으면 자동 주입. 형 변환 지원 |
| **Map** | 모든 파라미터를 한 번에 수신. 동일 명 파라미터가 2개 이상이면 List 사용 |
| **@ModelAttribute** | 파라미터를 객체(Command Object)로 주입. 생략 가능 |

```
@GetMapping("/test1")
public String test1(HttpServletRequest request) {

String data1 = request.getParameter("data1");
String data2 = request.getParameter("data2");
String [] data3 = request.getParameterValues("data3");

… 생략
}

```

```
public String test1(@RequestParam Map<String, String> map,
		  @RequestParam List<String> data3) {

}


```

---

## ViewResolver

![ViewResolver 동작 흐름](/assets/20210611_093655.png)

**ViewResolver**는 컨트롤러에서 전달받은 View 이름을 토대로 JSP를 찾아 선택하고, 응답 결과를 생성해 전달하는 요소다.

- Spring MVC는 JSP 처리 시 **HttpServletRequest** 객체를 JSP 쪽으로 함께 전달한다.
- **커맨드 객체**는 `HttpServletRequest`에 자동으로 담겨 JSP로 전달되며, 저장 이름은 클래스 이름으로 결정된다.

```
@PostMapping("/test1")
public String test1(@ModelAttribute DataBean bean) {
	return "test1";
}

```

---

## Form 태그

Spring에서는 `<form:태그명>` 형태의 **커스텀 태그**를 제공한다. Model 객체의 값을 form 요소에 자동 주입할 수 있어 정보 수정 페이지에 유용하다.

```
<%@taglib prefix='form' uri="http://www.springframework.org/tags/form" %>
```

### 주요 form 커스텀 태그

| 태그 | 설명 | 주요 속성 |
|---|---|---|
| `<form:form>` | `<form>` 태그 생성 | `modelAttribute`, `action`, `method` |
| `<form:button>` | Submit 버튼 생성 | `disabled` |
| `<form:hidden>` | hidden input 생성 | `path` |
| `<form:input>` | text input 생성 | `path` |
| `<form:password>` | password input 생성 | `path`, `showPassword` |
| `<form:select>` | select 태그 생성 | `path` |
| `<form:option>` / `<form:options>` | option 태그 생성 | `items` |
| `<form:checkbox>` / `<form:checkboxes>` | checkbox 생성 | `items` |
| `<form:radiobutton>` / `<form:radiobuttons>` | radiobutton 생성 | `items` |

> `path` 속성에 설정한 문자열은 `id`와 `name` 속성으로 지정되며, Model의 값이 `value`에 자동 주입된다.

---

## 코드의 흐름

Spring MVC의 요청 처리 흐름:
1. 브라우저 → 요청 발생
2. DispatcherServlet → 요청 주소 분석
3. 매핑된 컨트롤러 메서드 호출
4. 반환값(문자열 / Model / ModelAndView)으로 응답 결과 생성
5. 클라이언트에 전달

### Redirect vs Forward

| 구분 | **Redirect** | **Forward** |
|---|---|---|
| 동작 | 서버가 클라이언트에게 새 요청 주소를 응답으로 전달 | 서버 내부에서만 흐름 이동 |
| 주소창 변경 | **변경됨** | **변경되지 않음** |
| HttpServletRequest | 소멸 후 새로 생성 | 유지 |
| HttpSession | 유지 | 유지 |

---

## Request

브라우저가 요청을 보내면 서버는 **HttpServletRequest** 객체를 생성해 요청 정보를 담아 관리한다. 응답이 브라우저로 전송될 때까지 유지된다.

**RequestScope**: 요청 발생부터 응답 전달까지의 사용 범위. 이 범위 내에서 데이터나 객체를 저장하고 공유할 수 있다.

---

## Bean 스코프

Spring MVC는 스프링 코어의 `prototype` / `singleton`에 더해 아래 스코프를 추가로 제공한다.

| 스코프 | 생명주기 | Java 어노테이션 | XML 설정 |
|---|---|---|---|
| **request** | 요청 발생 ~ 응답 전달 | `@RequestScope` | `scope="request"` |
| **session** | 최초 요청 ~ 브라우저 종료 | `@SessionScope` | `scope="session"` |
| **application** | 서버 기동 ~ 서버 종료 | `@ApplicationScope` | `scope="application"` |

- request/session scope Bean은 주입만 이루어지며 해당 영역에 자동 저장되지는 않는다.
  - 단, XML 방식에서 `byName`으로 주입받은 경우에만 request 영역에 자동 저장된다.
- application scope Bean은 서버 기동 시 자동 주입되므로 `@Lazy` 불필요.
- **ServletContext**: application 영역의 데이터를 관리하는 객체. `HttpServletRequest`에서 추출하거나 Controller에서 주입받아 사용.

---

## Cookie

- 사용자 **웹 브라우저에 저장**되는 데이터.
- 요청 시 브라우저가 쿠키 정보를 서버에 전달하고, 응답 결과에 쿠키 정보가 포함되면 브라우저가 저장한다.
- 서버 측 코드로 직접 저장할 수 없다. 응답 결과에 쿠키 정보를 담아 보내면 브라우저가 저장하는 방식이다.
- Spring MVC에서 쿠키 저장은 Servlet/JSP 방식을 그대로 사용한다.

---

## Properties

애플리케이션 실행 중 변하지 않는 상수 값을 `.properties` 파일에 정의하고 가져다 쓸 수 있다.

### @PropertySource / @PropertySources

```
@PropertySources({
	@PropertySource("/WEB-INF/properties/data1.properties"),
	@PropertySource("/WEB-INF/properties/data2.properties")
})

```

### @Value

```
@Value("${aaa.a1}")
private int a1;

@Value("${aaa.a2}")
private String a2;
```

> Properties 파일에 한글을 작성하면 유니코드 문자열로 변환된다. **Property Editor** 설치로 해결 가능하다. (http://propedit.sourceforge.jp/eclipse/updates)

---

## Message (Properties → 다국어 처리)

Properties 파일을 **Message**로 등록하면 JSP에서도 사용할 수 있고 **다국어 처리**가 가능해진다.

- **MessageSource**: properties 파일을 Message로 등록하는 객체
- 여기서는 일정 시간마다 갱신되는 `ReloadableResourceBundleMessageSource`를 사용
- Java 코드에서 사용 시: `MessageSource`를 주입받아 `Locale`을 지정하면 다국어 처리 가능

> Properties 파일을 Message로 등록하면 JSP에서도 사용할 수 있으며 다국어 처리도 가능해진다.

---
