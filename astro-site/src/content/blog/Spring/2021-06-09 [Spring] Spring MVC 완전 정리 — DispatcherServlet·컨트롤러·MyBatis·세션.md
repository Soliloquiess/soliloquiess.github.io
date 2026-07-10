---
title: "[Spring] Spring MVC 완전 정리 — DispatcherServlet·컨트롤러·MyBatis·세션"
date: 2021-06-09
category: "Spring"
tags: ["Spring"]
description: "일반 MVC에서 Spring MVC로의 전환부터 DispatcherServlet·HandlerMapping·ViewResolver 흐름, @Controller/@RequestMapping과 파라미터 추출, 3계층+MyBatis 매퍼 연동, 세션·스코프·쿠키, URL 매핑·Properties까지 Spring MVC 핵심을 통합 정리한 학습 기록."
permalink: "study/2021/06/09/SpringMVC-기능들"
---

Spring MVC는 스프링이 제공하는 **서블릿(Servlet) 기반의 MVC 프레임워크**다. **DispatcherServlet**을 프론트 컨트롤러(Front Controller)로 두고, AOP·트랜잭션·DI(의존성 주입) 등 스프링의 기능을 그대로 활용하면서 웹 애플리케이션을 개발할 수 있다. 이 문서는 일반 MVC → Spring MVC 전환 흐름부터 요청 처리 구조, 컨트롤러 작성, 3계층 + MyBatis 연동, 상태 유지(세션/스코프/쿠키), 부가 기능(Properties/Message)까지 하나로 묶는다.

> IoC/DI·AOP의 상세 원리는 별도 "스프링 핵심 원리" 문서에서 다룬다. 여기서는 MVC 맥락에서 필요한 만큼만 간결히 짚는다.

---

## 1. 일반 MVC에서 Spring MVC로

### 기존 MVC 구조 복습

기존 MVC에서 **C(Controller)** 부분은 **FrontController + POJO**로 이루어져 있었다.

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

![20210602_130416](/assets/20210602_130416.png)

일반 MVC로 구현하면 생산성이 떨어진다. 그 이유는 다음과 같다.

| 일반 MVC | Spring MVC |
|----------|------------|
| 요청마다 별도 POJO 클래스 필요 | 하나의 컨트롤러 클래스 + 메서드로 처리 |
| HandlerMapping 직접 구현 | 프레임워크가 자동 제공 |
| ViewResolver 직접 구현 | 프레임워크가 자동 제공 |
| FrontController 직접 구현 | **DispatcherServlet**이 제공 |
| Controller 인터페이스 필수 구현 | 불필요 — 메서드 이름 자유 |

> 서블릿도 클래스다. 프론트 컨트롤러와 핵심적으로 연결된 **HandlerMapping**이 클라이언트 요청에 대한 POJO를 찾아주고, POJO는 마지막으로 View 경로를 프론트 컨트롤러에 전달한다. 프론트 컨트롤러는 **ViewResolver**와 연동해 결과를 받아온다.

### 다수의 POJO를 하나의 컨트롤러(메서드)로 통합

일반 MVC에서 C(Controller)는 **FrontController + 다수의 POJO**로 구성되어 있었다.

![20210602_133045](/assets/20210602_133045.png)

**Maven**은 의존성(라이브러리) 상태 관리 도구다. 스프링 프로젝트는 Boot가 아닌 **Legacy 방식(Spring MVC Project)**으로 생성한다.

> 스프링은 맨 마지막 이름이 컨텍스트 패스로 등록된다.

![20210602_135254](/assets/20210602_135254.png)

이 경우 컨텍스트 패스는 `myapp`으로 등록된다.

스프링 MVC도 M·V·C 구조를 따르며, 프로젝트 생성 시 샘플로 `home.jsp`(View)와 `HomeController`(POJO)가 만들어진다.

![20210602_140445](/assets/20210602_140445.png)

HandlerMapping, FrontController(DispatcherServlet), ViewResolver 같은 클래스들은 스프링이 **자동으로 만들어 숨겨두고** 제공한다. 객체는 **객체 바인딩 + Forward** 기법으로 다음 단계에 전달된다.

![20210602_143225](/assets/20210602_143225.png)

일반 MVC에서는 요청마다 별도 POJO 클래스가 필요했다.

![20210602_145213](/assets/20210602_145213.png)

Spring MVC에서는 **MemberController 하나**로 모든 요청 처리가 가능하다.

![20210602_145833](/assets/20210602_145833.png)

각 POJO에 있던 기능을 전부 **메서드 단위**로 만들어 하나의 컨트롤러에 넣는다.

![20210602_151009](/assets/20210602_151009.png)

이제 이 컨트롤러는 어떤 요청이 와도 처리할 수 있다. 문제는 **어떤 메서드를 호출할지** 결정하는 것이다.

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

### @RequestMapping — 요청과 메서드를 직접 연결

![20210602_153059](/assets/20210602_153059.png)

스프링은 요청이 왔을 때 컨트롤러가 아닌 **메서드와 직접 연결**하는 방법을 제공한다. `@RequestMapping` 어노테이션이 있으면 **HandlerMapping이 자동으로 관리**한다.

![20210602_153347](/assets/20210602_153347.png)

내부적으로 위와 같이 처리된다.

**HandlerMapping, FrontController(DispatcherServlet), ViewResolver**는 스프링이 제공하므로 거의 수정할 일이 없다. 우리는 **POJO(컨트롤러 메서드)부터 바로 코딩**하면 된다. 수정이 필요한 부분은 아래와 같다.

![20210602_154252](/assets/20210602_154252.png)

> Spring MVC로 오면서 가장 큰 변화: **다수의 POJO를 하나의 컨트롤러(메서드)로 통합**. `@RequestMapping` 어노테이션으로 요청-메서드 매핑이 간단해졌다. **HandlerMapping, FrontController, ViewResolver** 3개는 없어진 게 아니라 Maven(프레임워크)에 내장되어 자동 제공된다.

---

## 2. Spring MVC 요청 처리 흐름

**DispatcherServlet**은 프론트 컨트롤러(Front Controller) 역할로, 모든 클라이언트 요청을 최초로 받는다. 요청이 들어오면 어떤 컨트롤러가 처리할지 매핑을 확인한 후 해당 컨트롤러에 위임한다.

![20210430_094224](/assets/20210430_094224.png)

![20210428_142220](/assets/20210428_142220.png)

### 요청 처리 흐름 (단계별)

| 단계 | 주체 | 역할 |
|---|---|---|
| 1 | **DispatcherServlet** | 클라이언트 요청(URL) 수신 |
| 2 | **HandlerMapping** | 요청 URL에 매핑되는 Controller 검색 |
| 3 | DispatcherServlet | 처리할 Controller 확인 |
| 4 | **Controller** | 비즈니스 로직을 Model에 위임 |
| 5 | Controller | Model & View 반환 (논리적 뷰 이름) |
| 6 | DispatcherServlet | 데이터와 뷰 정보를 ViewResolver에 전달 |
| 7 | **ViewResolver** | 논리 뷰 이름을 물리 경로(JSP 등)로 변환 |
| 8 | View(JSP) | 최종 응답 렌더링 |

![20210428_142153](/assets/20210428_142153.png)

정리하면 처리 흐름은 다음과 같다.

1. 브라우저가 **DispatcherServlet**에 URL로 접근하여 요청
2. **HandlerMapping**에서 해당 요청에 매핑된 컨트롤러를 탐색
3. 매핑된 **Controller**에 처리 요청
4. 컨트롤러가 요청 처리 결과와 View 이름을 **ModelAndView**에 저장하여 DispatcherServlet으로 반환
5. DispatcherServlet이 View 이름을 **ViewResolver**로 전달하여 해당 View를 요청
6. ViewResolver가 요청한 View를 반환
7. View 처리 결과를 DispatcherServlet으로 전송
8. DispatcherServlet이 최종 결과를 **브라우저로 전송**

![20210509_225031](/assets/20210509_225031.png)

![20210509_225141](/assets/20210509_225141.png)

![20210509_225150](/assets/20210509_225150.png)

**Spring MVC 특징:**
- Model2 방식 지원
- 스프링 다른 모듈과 연계 용이
- Tiles, SiteMesh 같은 뷰 기술과 연계 쉬움
- 태그 라이브러리를 통해 메시지, 테마, 입력 폼을 쉽게 구현 가능

### 컨테이너 2가지

Spring MVC에서는 **컨테이너 2종류**를 사용한다.

| 컨테이너 | 특징 |
|---|---|
| **Root Spring Container** | 모든 서블릿이 공유해서 사용 |
| **DispatcherServlet Container** | DispatcherServlet만 단독 사용 |

![20210428_152611](/assets/20210428_152611.png)

### Filter — 전처리/후처리기

![20210428_172816](/assets/20210428_172816.png)

**Filter**는 클라이언트와 서블릿 사이에 위치하여 요청의 **전처리 및 후처리**를 담당한다. 클라이언트 요청이 오면 DispatcherServlet 이전에 **Filter**를 거친다.

---

## 3. 참고 — MVC 이전의 서블릿·Model2

> 순수 서블릿(Model1/2)의 상세는 별도 문서에서 다룬다. 여기서는 Spring MVC 이해에 필요한 배경만 짚는다.

### 서블릿(Servlet)

서버 측에서 실행되면서 클라이언트 요청에 따라 **동적으로 서비스를 제공하는 자바 클래스**다.

![20210509_113141](/assets/20210509_113141.png)

**커넥션 풀(Connection Pool)**

![20210509_113942](/assets/20210509_113942.png)

### JNDI(Java Naming and Directory Interface)

실제 웹에서 `ConnectionPool` 객체 구현 시 `javax.sql.DataSource` 클래스를 이용한다. 톰캣이 만들어 놓은 커넥션 풀 객체에 접근할 때는 **JNDI**를 이용한다.

**JNDI란?** 필요한 자원을 키/값 쌍으로 저장한 후, 필요할 때 키를 이용해 값을 얻는 방법. 미리 접근할 자원에 키를 지정해 두고, 애플리케이션이 접근 중일 때 이 키를 이용해 자원에 접근한다.

**사용 예:**
- 웹 브라우저에서 name/value 쌍으로 전송 후 서블릿에서 `getParameter(name)`으로 값을 가져올 때
- 해시맵·해시테이블에 키/값으로 저장한 후 키를 이용해 값을 가져올 때
- 웹 브라우저에서 도메인 네임(Domain Name)으로 DNS(Domain Name System) 서버에 요청 시 IP 주소를 가져올 때

### 서블릿 포워드(Forward)

하나의 서블릿에서 다른 서블릿이나 JSP와 연동하는 방법 = **포워드(Forward)**

- 요청에 대한 추가 작업을 다른 서블릿에게 위임
- 요청에 포함된 정보를 다른 서블릿이나 JSP와 공유 가능
- 요청에 정보를 포함시켜 다른 서블릿에 전달 가능
- **Model2 개발 시 서블릿에서 JSP로 데이터를 전송**하는 데 사용

**서블릿 포워드 4가지 방법**

![20210509_120545](/assets/20210509_120545.png)

**바인딩(Binding)** — 사전적 의미: 두 개를 하나로 묶는다.

> 대량의 정보를 JSP로 전송할 때 GET 방식은 불편하므로 바인딩을 활용한다.

### Model2(MVC) 방식으로 동작하는 웹 사이트

![20210509_192906](/assets/20210509_192906.png)

![20210509_193645](/assets/20210509_193645.png)

---

## 4. web.xml 기반 XML 세팅

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

### 설정 파일 구조

![20210602_171746](/assets/20210602_171746.png)

스프링은 `web.xml`을 읽으면서 시작된다. `web.xml`에는 `root-context.xml`과 `servlet-context.xml`이 보이는데, 각각 리스너와 DispatcherServlet이 읽어들인다.

- **ContextLoaderListener** → `root-context.xml` (1번)
- **DispatcherServlet** → `servlet-context.xml` (2번)

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

### 한글 인코딩 필터

![20210602_211314](/assets/20210602_211314.png)

![20210602_212231](/assets/20210602_212231.png)

![20210602_230550](/assets/20210602_230550.png)

클라이언트 요청이 오면 DispatcherServlet 이전에 **Filter**를 거친다. 한글 깨짐을 방지하기 위해 CharacterEncodingFilter를 설정한다.

![20210602_231538](/assets/20210602_231538.png)

위 설정을 `web.xml`에 추가하면 모든 요청이 `CharacterEncodingFilter`를 거치게 된다.

---

## 5. Maven과 pom.xml

프로젝트 생성 시 **Maven**이 라이브러리를 자동으로 관리한다. 필요한 라이브러리는 `pom.xml`의 `<dependency>`에 선언하면 Maven이 자동으로 다운로드·적용한다.

![20210428_114010](/assets/20210428_114010.png)

`groupId`, `artifactId`, `name` 등의 정보가 모두 있어야 다운로드된다.

**pom.xml(Project Object Model)**은 Maven 빌드 툴에서 가장 중요한 파일로, 프로젝트 설정과 라이브러리 관리를 담당한다. `<dependency>` 태그에 사용할 API를 선언하면 Maven이 **mvnrepository**에서 자동으로 다운로드한다.

![20210621_042917](/assets/20210621_042917.png)

![20210602_162625](/assets/20210602_162625.png)

**mvnRepository**에서 네트워크를 통해 라이브러리를 자동으로 설치한다.

![20210602_163905](/assets/20210602_163905.png)

**Gson** 라이브러리도 추가하자. Gson은 Java 객체를 JSON 형태로 쉽게 변환해주는 라이브러리다.

![20210602_164555](/assets/20210602_164555.png)

의존성을 `pom.xml`의 `<dependencies>`에 추가하면 자동으로 다운로드된다.

![20210602_164943](/assets/20210602_164943.png)

---

## 6. URL 매핑

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

## 7. 요청 방식 지정

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

## 8. 파라미터 추출

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

## 9. ViewResolver

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

## 10. Form 태그

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

## 11. 코드의 흐름 — Redirect vs Forward

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

## 12. 3계층(3-Tier) 아키텍처

![Spring MVC 3계층 구조](/assets/20210603_122057.png)

Spring MVC에서 3티어(3-Tier)는 위와 같이 나눠지며, 특히 신경써야 할 계층은 **비즈니스 로직 계층**이다. **Controller → Service → DAO** 순서로 요청이 흘러간다.

| 계층 | 역할 |
|------|------|
| **Presentation (Controller)** | 요청 수신, 서비스 호출 |
| **Business (Service/ServiceImpl)** | 비즈니스 로직, DAO에 위임 |
| **Persistence (DAO/인터페이스)** | DB 작업 선언, 매퍼 파일과 연결 |

- **Controller**는 `@Autowired`로 Service를 주입받는다. 직접 `new`하지 않고 스프링이 자동으로 주입해준다.
- **`@Repository`** 어노테이션은 DAO에 붙인다.
- `BoardServiceImpl`은 Service 계층에 해당하며, DAO 타입을 주입받아 DB 작업을 위임한다.

### 컴포넌트 스캔(component-scan)

컨테이너를 구성하는 설정은 `root-context.xml`에 담겨 있다.

![20210430_200455](/assets/20210430_200455.png)

`component-scan` 태그는 **지정한 패키지를 탐색**해서 어노테이션이 붙은 클래스를 자바 객체(빈)로 자동 등록하고, `@Autowired`가 있으면 의존관계까지 주입해준다.

스캔 대상 어노테이션:

| 어노테이션 | 등록 대상 |
|------------|-----------|
| `@Component` | 일반 컴포넌트 |
| `@Service` | 서비스 계층 |
| `@Controller` | 웹 컨트롤러 |
| `@Repository` | DAO 계층 |

---

## 13. MyBatis 연동

### MyBatis란?

JDBC(Java Database Connectivity)로 직접 DB를 다루면 **모든 쿼리를 개발자가 직접 작성**해야 하고, 수정 시 일일이 고쳐야 해서 유지보수가 어렵고 개발 속도도 느리다. **MyBatis**는 이 문제를 해결해주는 SQL 매퍼(Mapper) 프레임워크다.

![5f208a29-9374-4b57-bd8c-4952117d3789](/assets/5f208a29-9374-4b57-bd8c-4952117d3789.jpg)

**MyBatis 특징:**
- SQL 실행 결과를 자바 빈즈(JavaBeans) 또는 Map 객체에 매핑해주는 Persistence 솔루션. **SQL을 소스코드가 아닌 XML로 분리**
- SQL 문과 프로그래밍 코드를 분리해서 구현
- 데이터 소스 기능과 트랜잭션 처리 기능 제공

MyBatis를 사용하면 DAO에 하드코딩하던 DB 접속 정보를 **properties 파일**로 분리해 관리한다.

![20210601_022843](/assets/20210601_022843.png)

![20210601_022930](/assets/20210601_022930.png)

![20210601_022945](/assets/20210601_022945.png)

SQL 문은 **매퍼 파일(XML)**에 저장한다.

![20210601_030823](/assets/20210601_030823.png)

DB 접속에는 위의 3가지 파일(properties, mapper XML, 환경설정 XML)이 모두 필요하다.

### 커넥션 풀(Connection Pool)

![20210601_035918](/assets/20210601_035918.png)

properties와 SQL 매퍼 파일을 **XML 환경설정 파일**로 묶는다.

![20210601_040430](/assets/20210601_040430.png)

데이터 소스(DataSource)를 설정하는 곳이다. (`kr.bit.mybatis` 폴더의 `db.properties` 설정)

![20210601_043420](/assets/20210601_043420.png)

자바와 DB를 연결하는 **커넥션**은 프로젝트에서 가장 부하가 높은 지점이다(인증·DB 정보 확인 등). 일반 JDBC는 작업 후 커넥션을 종료하지만, **MyBatis는 커넥션을 없애지 않고 재활용**한다.

> **커넥션 풀**: 커넥션을 미리 여러 개 메모리에 생성해두고, 필요할 때 꺼내 쓰고 반납하는 방식.

![20210601_043746](/assets/20210601_043746.png)

XML 환경설정을 읽어 **pooled** 방식으로 커넥션을 생성한 뒤 `SqlSessionFactory`에 보관한다.

| JDBC 용어 | MyBatis 용어 |
|---|---|
| Connection | SqlSession |
| ConnectionPool | SqlSessionFactory |

![20210601_044627](/assets/20210601_044627.png)

- **SqlSession**: DB 액세스 시 가장 핵심적인 역할을 하는 개별 커넥션 객체
- **SqlSessionFactory**: 여러 SqlSession을 보관하는 커넥션 풀

![20210601_044815](/assets/20210601_044815.png)

XML을 읽어 `SqlSessionFactory`가 만들어지고, 커넥션 풀이 메모리에 생성된다. 이후 세션을 꺼내 DB 작업이 가능하다.

![20210601_124502](/assets/20210601_124502.png)

XML 매퍼가 SQL 문을 대신하며, VO 타입으로 결과를 묶을 때는 `resultType`으로 정의한다.

![20210601_130048](/assets/20210601_130048.png)

![20210601_130857](/assets/20210601_130857.png)

JDBC 코드를 MyBatis로 대체하면 코드량이 크게 줄어든다.

![1](/assets/1_0hpvgadx8.png)
![2](/assets/2_p7mbhx1r2.jpg)
![3](/assets/3_h1qpvqdcz.jpg)
![4](/assets/4_pvgy975ct.jpg)
![5](/assets/5_b66szq8m4.jpg)

- **SqlSessionFactoryBuilder**: 환경설정 파일을 읽어 커넥션 풀을 생성한다.
- **SqlSessionFactory**: SqlSession 집합(커넥션 풀)을 가리킨다.
- **SqlSession**: DB 액세스 시 가장 중요한 역할을 담당한다.

![6](/assets/6_nonuf9h81.jpg)

- `configurations` 파일에 DB 설정 파일을 적용하고, 이를 읽어 팩토리 객체를 생성하는 것이 `SqlSessionFactoryBuilder`의 역할이다.

### MyBatis 매퍼와 DAO 인터페이스

![20210501_024701](/assets/20210501_024701.png)

쿼리는 **매퍼 파일(Mapper File, XML 문서)**에 저장되며, 각 쿼리마다 고유한 `id`가 붙는다. **DAO**는 인터페이스로 선언되며, 메서드 내용 없이 껍데기(선언)만 존재한다.

> 핵심 규칙: **DAO 인터페이스의 메서드 이름**과 **매퍼 파일의 쿼리 id**가 일치해야 한다.

동작 흐름:
1. 사용자가 DAO의 메서드를 호출한다.
2. MyBatis가 같은 이름의 쿼리 id를 매퍼 파일에서 찾는다.
3. 해당 쿼리가 실행되어 DB 작업이 수행된다.

매퍼 파일 안의 쿼리 id와 인터페이스 메서드 이름이 **반드시 일치**해야 한다.

![20210430_194616](/assets/20210430_194616.png)

### MyBatis 연동 설정 파일

![20210602_172419](/assets/20210602_172419.png)

MyBatis를 연결하기 위해 위 3가지 파일이 필요하다.

![20210602_172739](/assets/20210602_172739.png)

필요한 API를 다운받기 위해 `pom.xml`에 설정을 추가한다.

![20210602_173430](/assets/20210602_173430.png)

MySQL 8 버전을 사용하므로 **8버전 커넥터**를 받아야 한다.

![20210602_173613](/assets/20210602_173613.png)

mvnRepository에서 가장 많이 사용되는 버전으로 받자. **Spring JDBC**도 함께 받는다 (3.1.1).

![20210602_174006](/assets/20210602_174006.png)

JDBC 연결 레퍼지토리.

![20210602_174336](/assets/20210602_174336.png)

위와 같이 나오면 성공. 자바에서 클래스를 사용하는 방법은 두 가지다. 직접 객체를 생성하거나, **XML의 `<bean>`으로 등록**하거나. 클래스 이름만 알면 객체를 생성할 수 있는 것이 **리플렉션(Reflection)** 기법이다.

![20210602_181913](/assets/20210602_181913.png)

### XML 편집기 설정

Window 탭 → File Associations → `.xml` → XML Editor를 선택 후 Default로 맨 위로 올린다.

![20210602_183005](/assets/20210602_183005.png)

![20210602_191140](/assets/20210602_191140.png)

`sqlSessionFactory` 안에 위의 XML 정보들이 모두 적용된다.

> 참고: Window → File → Preferences → File Associations에서 XML 파일을 Spring Properties Editor와 연결하면 설정 파일 편집이 편해진다.

### Mapper 파일과 Configuration 파일 분리

**DAO는 메서드 이름으로 SQL과 연결**된다. 이 규칙이 하나의 표준이 된다.

![20210603_010231](/assets/20210603_010231.png)

Maven에서 추가·변경 후 에러나 X 표시가 나면 **Update**를 한 번 해보자.

![20210603_011659](/assets/20210603_011659.png)

또는 **Clean** 후 Rebuild를 시도한다.

**Mapper 인터페이스**를 사용하면 DAO 없이도 인터페이스 내부에서 바로 SQL을 실행할 수 있다.

![20210603_011659](/assets/20210603_011659_fosenhpb1.png)

**매퍼의 namespace 이름**과 **실제 인터페이스 이름**이 같아야 스프링이 두 부분을 하나로 연결해 관리한다.

![20210603_011659](/assets/20210603_011659_ol5ynhlrc.png)

매퍼 인터페이스는 XML 파일과 연결된다.

![20210603_023837](/assets/20210603_023837.png)

`@Mapper`를 붙이면 MyBatis로 인식해 `SqlSession`을 내부적으로 자동 호출한다.

![20210603_024314](/assets/20210603_024314.png)

그 외에도 `root-context.xml`에 자잘한 설정을 추가해야 한다.

### 매퍼 인터페이스와 매퍼 XML 자동 연결 조건

![MyBatis 매퍼 연동 구조](/assets/20210603_133811.png)

**매퍼 인터페이스**와 **매퍼 XML**을 자동으로 연결하려면 두 가지 조건이 맞아야 한다.

1. **인터페이스 이름**과 XML의 **`namespace`**가 일치해야 한다.
2. 인터페이스의 **메서드 이름**과 XML 내 `<select>` 등의 **`id`**가 일치해야 한다.

이 두 조건이 충족되면 매퍼 인터페이스와 매퍼 XML이 자동으로 연동된다.

### root-context DB 설정

![root-context DB 설정](/assets/20210603_140507.png)

**매퍼 패키지를 스캔**해서 매퍼 인터페이스와 XML을 서로 연결하도록 `root-context.xml`에 설정해야 한다.

![네임스페이스 설정](/assets/20210603_140902.png)

이 설정을 사용하려면 `beans` 위에 해당 **네임스페이스(namespace)**를 선언해야 한다.

### 타입 Alias 설정

![타입 Alias 설정](/assets/20210603_141839.png)

`inflearn.model.BoardVo`를 `boardVO`라는 짧은 이름으로 쓸 수 있도록 **타입 alias**를 지정한다.

### 영속 계층(Persistence Layer) 설정

DB 연결을 담당하는 영속 계층도 `root-context` 부분에서 설정한다.

![MyBatis-Spring 설정](/assets/20210603_142700.png)

`mybatis-spring`을 추가해 DataSource·SqlSessionFactory 등을 자동으로 처리하도록 설정하고, `pom.xml`에 의존성(dependency)을 추가한다.

![매퍼 어노테이션 사용](/assets/20210603_144136.png)

영속 계층임을 선언하고 매핑된 인터페이스임을 알려주기 위해 **`@Mapper`** 어노테이션을 추가한다. 서비스 계층에서는 **`@Autowired`**로 의존성을 자동 주입(DI, Dependency Injection)한다.

---

## 14. 트랜잭션(Transaction)

스프링은 트랜잭션을 MyBatis와 연동해서 사용한다.

트랜잭션 설정 방법:
- XML 설정 방식
- **애너테이션(Annotation) 방식** (설정 파일이 복잡해지는 XML보다 선호됨)

**트랜잭션이란?** 여러 개의 DML(Data Manipulation Language) 명령문을 하나의 논리적 작업 단위로 묶어서 관리하는 것. **All or Nothing** 방식으로 동작한다.

- SQL 명령이 모두 정상 처리 → 모든 작업을 DB에 영구 반영 (**Commit**)
- 하나라도 잘못된 것이 있으면 모두 취소 (**Rollback**)

![20210510_023208](/assets/20210510_023208.png)

> 일반적인 웹 애플리케이션의 Service와 DAO 클래스 구조.

Service 클래스의 각 메서드가 단위 기능을 수행한다. 단위기능 1은 DAO의 SQL문 하나로 처리하는 반면, 단위기능 2·3은 여러 SQL을 묶어서 처리한다. 묶어서 처리할 때 하나의 SQL이 실패하면 이전에 수행한 **모든 작업을 취소해야 일관성이 유지**된다.

**트랜잭션 적용 사례:**

| 사례 | 묶어야 하는 작업 |
|------|-----------------|
| 게시판 조회 | 글 조회 + 조회수 갱신 |
| 쇼핑몰 주문 | 상품 등록 + 포인트 갱신 |
| 은행 송금 | 송금자 잔고 갱신 + 수취자 잔고 갱신 |

### 트랜잭션 예시 — 은행 계좌 이체

![20210510_023827](/assets/20210510_023827.png)

홍길동이 500만 원을 인출하고 커밋한 상황에서, 트랜잭션을 적용하지 않으면 김유신의 계좌 갱신 중 오류가 발생해도 홍길동의 인출은 이미 커밋된다. → **데이터 불일치 문제 발생**

트랜잭션을 적용하면 두 과정이 모두 완료되어야 최종 커밋이 이루어진다.

![20210510_024047](/assets/20210510_024047.png)

최종 커밋 전 문제가 생기면 **롤백(Rollback)**으로 원상 복구된다.

### 스프링 트랜잭션 속성

![20210510_024304](/assets/20210510_024304.png)

---

## 15. 상태 유지 — Request 바인딩의 한계와 세션

브라우저가 요청을 보내면 서버는 **HttpServletRequest** 객체를 생성해 요청 정보를 담아 관리한다. 응답이 브라우저로 전송될 때까지 유지된다.

**RequestScope**: 요청 발생부터 응답 전달까지의 사용 범위. 이 범위 내에서 데이터나 객체를 저장하고 공유할 수 있다.

### Request 바인딩의 한계

![20210601_173218](/assets/20210601_173218.png)

`Request`/`Response` 객체에 데이터를 바인딩하여 **포워딩(Forwarding)**하면, 포워딩된 페이지에서만 `getAttribute()`로 값을 꺼낼 수 있다.

> 포워딩은 **단 하나의 페이지**에서만 인증 상태를 확인할 수 있어, 여러 페이지에 걸쳐 회원 인증을 유지하기 어렵다.

### 세션 트래킹(Session Tracking)

| 방식 | 저장 위치 | 특징 |
|------|-----------|------|
| **쿠키(Cookie)** | 클라이언트 PC | 용량 제한·보안 취약·브라우저 설정 가능 |
| **세션(Session)** | 서버 메모리 | 보안 유리·서버 부하 가능·유효시간 존재 |

![20210509_125202](/assets/20210509_125202.png)

> HTTP로 웹 페이지를 보여주는 과정.

**쿠키(Cookie)** — 웹페이지들 사이의 공유 정보를 **클라이언트 PC에 저장**하고, 여러 웹페이지가 공유해서 사용할 수 있도록 매개 역할을 하는 방법.

- 정보가 클라이언트 PC에 저장
- 저장 정보 용량에 제한 있음
- 보안 취약
- 클라이언트 브라우저에서 사용 유무 설정 가능
- 도메인 당 쿠키가 생성됨

**세션(Session)**
- 정보가 **서버의 메모리**에 저장
- 브라우저의 세션 연동은 세션 쿠키를 사용
- 쿠키보다 보안에 유리
- 서버에 부하를 줄 수 있음
- 브라우저당 하나의 세션이 생성
- 세션은 유효시간을 가짐
- **로그인 상태 유지, 쇼핑몰 장바구니** 등에 주로 사용

### 쿠키와 세션 개념 — 학원 비유

![4c976186-de2a-48c7-9047-a47c6d928e9c](/assets/4c976186-de2a-48c7-9047-a47c6d928e9c.jpg)

학원 비유로 이해해보자.

- 학생이 처음 방문하면 **수강권(번호 포함)**을 발급받는다 → 이것이 **쿠키**
- 캐비넷은 수강권 번호를 알아야 사용할 수 있다 → 이것이 **세션(HttpSession)**

| 현실 세계 | 웹 용어 |
|---|---|
| 수강권 (쿠키) | Cookie (브라우저 캐시에 저장) |
| 캐비넷 | HttpSession (서버 메모리) |
| 수강 번호 | Session ID |

***클라이언트와 서버 간의 식별은 쿠키로 이루어진다.***

![2c7409a9-b17c-4bbc-ab0b-56d0c5fc8918](/assets/2c7409a9-b17c-4bbc-ab0b-56d0c5fc8918.jpg)

- A.jsp: `request`에서 id를 꺼낼 수 있다.
- B.jsp, C.jsp: `request` 객체를 가져올 수 없어 **인증 상태 확인 불가**.

### HttpSession을 통한 다중 페이지 인증 유지

![a80c3b79-a8b0-4252-a33a-88e01423092f](/assets/a80c3b79-a8b0-4252-a33a-88e01423092f.jpg)

**HttpSession**을 사용하면 A·B·C 페이지 모두에서 인증 상태를 확인할 수 있다.

![b5a4f3d4-2c1b-4c54-9268-9bdb48c37bb6](/assets/b5a4f3d4-2c1b-4c54-9268-9bdb48c37bb6.jpg)

세션 동작 흐름:

1. 클라이언트 최초 접속 → 서버가 `HttpSession` 메모리 공간 생성, **세션 ID** 부여
2. 세션 ID가 **쿠키**에 담겨 브라우저에 저장됨
3. 두 번째 방문부터 브라우저가 자동으로 쿠키(세션 ID)를 서버로 전송
4. 서버는 세션 ID로 기존 세션 메모리를 찾아 재사용

![25c59ea7-a275-4710-83b8-26ec4bfe5cd2](/assets/25c59ea7-a275-4710-83b8-26ec4bfe5cd2_v4rglheen.jpg)

동일 브라우저에서 요청하면 **세션이 동일**하게 유지된다.

### 세션을 활용한 회원 인증

클라이언트가 인증 성공 시:

1. `request.getSession()`으로 세션 객체를 가져온다(없으면 새로 생성).
2. 인증 성공 정보를 세션에 `setAttribute()`로 저장.
3. 이후 어느 페이지에서든 같은 세션 ID로 `getAttribute()`가 가능.

![370709fe-82cd-4b28-acf4-6030cb5315cb](/assets/370709fe-82cd-4b28-acf4-6030cb5315cb.jpg)

- 세션에 바인딩된 값이 **있으면 인증 성공**, **없으면 인증 실패**.

![7ef7dc90-3d28-4ed8-979f-11add895a99e](/assets/7ef7dc90-3d28-4ed8-979f-11add895a99e.jpg)

동일 브라우저라면 A·C 페이지 모두 같은 세션 번호로 데이터를 꺼낼 수 있다.

![20210601_180521](/assets/20210601_180521.png)

![20210601_184845](/assets/20210601_184845.png)

`getSession()`이 요청을 읽어 일치하는 세션이 있으면 기존 세션을 재사용(`getAttribute` 가능). 없으면 회원 인증 페이지로 되돌린다.

---

## 16. Bean 스코프

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

## 17. Cookie

- 사용자 **웹 브라우저에 저장**되는 데이터.
- 요청 시 브라우저가 쿠키 정보를 서버에 전달하고, 응답 결과에 쿠키 정보가 포함되면 브라우저가 저장한다.
- 서버 측 코드로 직접 저장할 수 없다. 응답 결과에 쿠키 정보를 담아 보내면 브라우저가 저장하는 방식이다.
- Spring MVC에서 쿠키 저장은 Servlet/JSP 방식을 그대로 사용한다.

---

## 18. AJAX (Asynchronous JavaScript And XML)

**AJAX**란 `XMLHttpRequest` 객체를 이용해 **페이지 전체를 새로 고치지 않고** 필요한 부분의 데이터만 서버에서 불러오는 비동기 통신 기법이다. 클라이언트의 작업과 관계없이 **비동기적으로 서버와 통신**할 때 사용한다.

![20210509_182407](/assets/20210509_182407.png)

자바스크립트를 이용한 비동기 통신으로 클라이언트와 서버 간 **XML 또는 JSON 데이터**를 주고받는 기술이다.

![20210509_182759](/assets/20210509_182759.png)

### 비동기 방식이란?

웹페이지를 리로드하지 않고 데이터를 불러오는 방식. 서버에 요청을 보낸 후 응답을 기다리는 동안 프로그램이 멈추지 않고 계속 실행된다.

### 동기 vs 비동기

| 구분 | 동기(Sync) | 비동기(Async) |
|---|---|---|
| 요청 후 대기 | 응답 받을 때까지 중단 | 응답과 무관하게 계속 실행 |
| 페이지 갱신 | 전체 리로드 | 일부만 갱신 |
| 자원 효율 | 낮음 | 높음 |

### AJAX가 사용하는 기술

- HTML / DOM
- JavaScript
- **XMLHttpRequest**

### AJAX의 장단점

**장점**
- 웹페이지 속도 향상
- 서버 처리 완료를 기다리지 않고 다른 작업 가능
- 서버에서 데이터만 전송하면 되어 코드량 감소
- 기존 웹에서 불가능했던 다양한 UI 구현 가능

**단점**
- 히스토리 관리가 어렵다.
- 페이지 이동 없는 통신으로 보안 이슈 발생 가능
- 연속 요청 시 서버 부하 증가
- `XMLHttpRequest` 통신 진행 중 사용자에게 피드백 없음
- 크로스 도메인(Cross-Domain) 문제 발생

> 출처: https://velog.io/@surim014/AJAX%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

### 응답 방식 비교

| 방식 | 설명 |
|---|---|
| Forward | JSP로 포워딩하여 응답 |
| Redirect | 컨트롤러를 통해 다른 URL로 응답 |
| **AJAX** | 페이지 변환 없이 콜백 함수로 데이터만 응답 |

AJAX는 현재 페이지를 유지한 채로 서버에 요청하고, 응답 결과를 **콜백 함수**의 매개변수로 받는다.

![99f53c3c-53e3-4beb-bc08-c157e759ff8b](/assets/99f53c3c-53e3-4beb-bc08-c157e759ff8b.jpg)

![20210601_224320](/assets/20210601_224320.png)

![20210602_000013](/assets/20210602_000013.png)

서버-클라이언트 간 AJAX + JSON 통신 흐름:

1. JavaScript에서 서버로 비동기 요청
2. 서버가 **JSON(Gson 변환)** 형태로 응답
3. 콜백 함수에서 JSON 키값으로 데이터 렌더링

![20210602_025347](/assets/20210602_025347.png)

로그인 인증 후 파일 업로드 처리 예시.

![20210602_031351](/assets/20210602_031351.png)

`count == -1`이면 더 이상 읽을 데이터가 없음을 의미하며, 그 전까지는 버퍼에서 `0`부터 `count`만큼 데이터를 읽어들인다.

---

## 19. Properties

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

## 20. Message (Properties → 다국어 처리)

Properties 파일을 **Message**로 등록하면 JSP에서도 사용할 수 있고 **다국어 처리**가 가능해진다.

- **MessageSource**: properties 파일을 Message로 등록하는 객체
- 여기서는 일정 시간마다 갱신되는 `ReloadableResourceBundleMessageSource`를 사용
- Java 코드에서 사용 시: `MessageSource`를 주입받아 `Locale`을 지정하면 다국어 처리 가능

> Properties 파일을 Message로 등록하면 JSP에서도 사용할 수 있으며 다국어 처리도 가능해진다.

---

## 부록 A. IoC / DI — MVC 맥락 요약

> IoC/DI의 완전한 원리는 별도 "스프링 핵심 원리" 문서에서 다룬다. 여기서는 MVC를 이해하는 데 필요한 최소한만 정리한다.

**IoC(Inversion of Control, 제어의 역전)**는 객체의 생성과 의존관계 설정을 개발자가 아닌 **컨테이너**가 담당하는 방식이다.

| 용어 | 설명 |
|---|---|
| **IoC** | 제어의 역전 — 객체 생성·관리를 컨테이너에 위임 |
| **DI** | 의존성 주입 — 필요한 객체를 컨테이너가 직접 넣어줌 |
| **DL** | 의존성 검색 — 필요한 객체를 컨테이너에서 직접 찾아옴 (`getBean()`) |

- **DI**: 컨테이너가 A에게 B, C를 주입(Inject)
- **DL**: A가 컨테이너에서 필요한 객체를 이름으로 찾아옴

부품이 고장나면 교체하듯, 애플리케이션에서도 클래스 기능을 변경하거나 다른 클래스로 대체해야 하는 경우가 자주 생긴다. **DI**란 이런 연관관계를 개발자가 직접 코딩하는 것이 아니라 **컨테이너가 연관관계를 직접 규정**하는 방식이다. → 코드에서 직접 연관관계가 발생하지 않으므로 클래스 변경이 자유로워짐 = **약한 결합(Loose Coupling)**

![20210509_201154](/assets/20210509_201154.png)

**Spring 컨테이너**는 모든 객체를 관리하는 메모리 공간이다.

- X가 컨테이너에 `getBean()`으로 A를 요청
- A가 작업하려면 B, C가 필요 → 컨테이너가 미리 B, C를 A에 주입
- X는 이미 B·C가 주입된 완성 상태의 A를 받아서 사용

A 클래스 안에서 B 객체를 직접 생성(`B b = new B()`)하면 A와 B가 강하게 결합된다. Spring은 이 의존 관계를 **느슨하게** 만드는 **DI 기법**을 핵심으로 제공한다.

![20210621_104401](/assets/20210621_104401.png)

![20210621_105446](/assets/20210621_105446.png)

![20210621_110514](/assets/20210621_110514.png)

![20210621_110735](/assets/20210621_110735.png)

![20210621_111024](/assets/20210621_111024.png)

![20210621_113046](/assets/20210621_113046.png)

`@Autowired` 또는 `@Inject` 어노테이션을 사용하면 Spring 컨테이너가 `memberDAO`를 찾아 변수에 **자동 주입**한다.

**주입 방법 2가지:**

| 방법 | 설명 |
|---|---|
| **생성자 주입** | 생성자 파라미터로 전달 |
| **Setter 주입** | set 메서드로 전달 |

```java
public class Americano implements Coffee {
    int price;
    String origin;

    // 1. 생성자를 이용한 주입
    public Americano(int price) {
        this.price = price;
    }

    // 2. setter를 이용한 주입
    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public void info() {
        System.out.println("Americano:강렬한 에스프레소 샷과 뜨거운 물의 조화");
        System.out.println("price" + price);
        System.out.println("origin" + origin);
    }
}
```

XML 빈 설정에서 생성자·setter 주입은 아래 태그로 작성한다.

- `<constructor-arg>` — 생성자 파라미터로 주입
- `<property>` — setter 메서드로 주입
- 객체 참조 시 `value` 대신 **`ref`** 사용

```xml
<bean id="star" class="com.coffee3.di.Starbucks">
    <constructor-arg name="ame" ref="coffee2"></constructor-arg>
    <constructor-arg name="ame" ref="coffee1"></constructor-arg>
</bean>
```

부모 클래스가 더 큰 타입이므로, 구현체만 교체하면 된다.

```java
// 구현체만 바꾸면 됨 — 인터페이스 타입은 그대로
Coffee cof = new CaffeLatte();
// → 변경 시
Coffee cof = new Americano();
```

![20210428_184703](/assets/20210428_184703.png)

MyBatis는 Spring ORM 부분에 해당한다. **스프링 코어(Core)** 부분이 컨테이너 기능을 담당한다.

![20210428_192029](/assets/20210428_192029.png)

XML 생성 시 일반 XML 파일이 아닌 **Spring Bean Configuration File**로 생성해야 한다.

![20210509_231008](/assets/20210509_231008.png)

> XML 주입 과정.

---

## 부록 B. AOP — MVC 맥락 요약

> AOP의 완전한 원리는 별도 "스프링 핵심 원리" 문서에서 다룬다. 여기서는 개요만 정리한다.

**OOP(객체 지향)**와 **AOP(관점 지향)**는 함께 사용할 수 있다. AOP는 메서드 안의 **주 기능**과 **보조 기능**을 분리한 후 선택적으로 적용하는 프로그래밍 방식이다.

![20210428_093735](/assets/20210428_093735.png)

AOP는 애플리케이션 기능을 두 가지로 구분한다.

| 구분 | 설명 |
|---|---|
| **핵심업무 (Core Concern)** | 비즈니스 로직 자체 (이체, 승인, 계산 등) |
| **공통업무 (Cross-cutting Concern)** | 로깅, 권한 체크 등 반복되는 부가 업무 |

핵심 기능과 부가 기능을 **분리해서 설계**하는 것이 핵심이다.

![20210428_102723](/assets/20210428_102723.png)

![20210428_103015](/assets/20210428_103015.png)

모듈 ABC가 핵심 기능(이체·승인·계산), 진하게 색칠된 부분이 공통 부분이다.

![20210428_103218](/assets/20210428_103218.png)

![20210428_103320](/assets/20210428_103320.png)

- 전체 코드에 흩어진 보조 기능을 하나의 장소에 모아서 관리
- 보조 기능을 원하는 주 기능에 선택적으로 적용 → 코드 단순화, **가독성 향상**

![20210509_224814](/assets/20210509_224814.png)

### 스프링 AOP 핵심 용어

| 용어 | 설명 |
|---|---|
| **JoinPoint** | Advice가 삽입될 수 있는 시점 (인스턴스 생성, 메서드 호출, 예외 발생 등) |
| **Advice** | JoinPoint에 삽입되어 실행될 공통 코드 |
| **PointCut** | 같은 Advice를 적용할 여러 JoinPoint를 하나로 묶은 것 |
| **Weaving** | Advice를 핵심 로직 코드에 삽입하는 것 |
| **Target** | 핵심 로직을 구현하는 클래스 |
| **Aspect** | 여러 객체에 공통으로 적용되는 관점 — Advice를 가진 객체 |

![20210428_104131](/assets/20210428_104131.png)

![20210428_104754](/assets/20210428_104754.png)

![20210428_105315](/assets/20210428_105315.png)

![20210428_105326](/assets/20210428_105326.png)

> **Weaving**: Advice를 핵심 로직 코드에 삽입하는 것. 분리한 관점을 여러 모듈에 적용하는 과정.

- **Advice** — 끼어들어가는 공통 코드
- **PointCut** — 언제 끼어들어갈지 (시점 묶음)

즉, "**언제** 끼어들어가서 **무엇**을 할 것인가"를 정의하는 것이 AOP의 핵심이다.

### Spring AOP 특징

- **프록시(Proxy) 기반**: Target 객체에 대한 프록시를 런타임에 생성
- 클라이언트 요청이 들어오면 **프록시가 먼저 받아** 공통 Advice를 끼워넣을지 판단 후 Target에 전달

![20210428_112038](/assets/20210428_112038.png)

![20210428_112223](/assets/20210428_112223.png)
![20210428_112748](/assets/20210428_112748.png)

![20210428_112801](/assets/20210428_112801.png)

- `(*)` — 어떤 반환 타입이든 허용
- `*service` — 이름이 "service"로 끝나는 것만 허용

**PointCut 예제**

![20210428_113612](/assets/20210428_113612.png)

![20210428_113612](/assets/20210428_113612_orupfgx2t.png)
