---
title: "[Spring] SpringMVC 기능들"
layout: post
subtitle: Spring
date: "2021-06-09-04:58:53 +0900"
categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

###XML로 세팅하기

Dispatcher서블릿이 가진 변수에 이 값을 집어넣겠다.

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

---------


### URL MAPPING

![20210610_231942](/assets/20210610_231942.png)

이게 context-path다.


##### Servlet/JSP URL 주소


- 사용자가 서버에 접속해서 서비스를 받기 위해 입력하는 주소를 URL이라고 부릅니다.
- URL 주소는 여러 의미를 가지고 있는 값들로 구성됩니다.
- 프로토콜://도메인주소(IP):포트번호/경로1/경로2/경로3/


##### URL 주소


- 프로토콜 : 서버와 클라이언트간의 통신을 위한 약속입니다. (생략 시 http)


- 도메인 주소(IP 주소) : IP 주소는 같은 네트워크 망에서 컴퓨터를 구분하기 위해 제공되는 숫자로 구성된 고유 주소입니다. 인터넷 망에 연결된 컴퓨터는 전 세계에서 유일한 주소를 할당 받고 공유기 등에 연결된 컴퓨터는 공유기안에서 유일한 주소를 할당 받습니다. 그러나 숫자는 사람이 외우기 어려워 도메인 주소라는걸 만들어 제공합니다. 도메인 주소는 IP주소로 변환되어 컴퓨터를 찾을 수 있도록 합니다.

- 포트번호 : 1부터 65535번까지로 구성된 숫자입니다. 컴퓨터내에서 프로그램을 구분하기 위해 사용합니다. (생략시 80)


- 경로1/경로2/경로3… : 여기서 부터는 서버 혹은 개발 방식이나 분야에 따라 다르게 해석됩니다. Servlet/JSP 에서는 첫번째 경로는 Context Path라고 부릅니다. 하나의 서버에서 각 웹 애플리케이션을 구분하기 위해 지정되는 이름이며 폴더의 이름이 Context Path가 됩니다. 그 이후 경로는 하위 경로가 됩니다.


- Spring MVC에서는 Context Path 다음에 나오는 주소는 실제 물리적인 경로와 다르게 지정할 수 있습니다.

```
@Controller
public class Test1Controller {
	@RequestMapping(value = "/test1", method = RequestMethod.GET)
	public String test1() {
	return "test1";
	}
}

```

- 하위경로

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

#### RequestMapping 어노테이션으로 요청 주소 처리가 가능합니다.


-----------

### 요청 방식 지정하기

- Spring MVC 는 요청 주소별로 메서드를 정의할 수도 있지만 같은 요청 주소에서 요청 방식에 따라 메서드를 정의할 수도 있습니다.
- GET, POST, PUT, DELELTE, PATCH 에 대해 처리할 수 있습니다.


#### @RequestMapping
- RequestMapping 어노테이션은 요청 주소 셋팅 뿐만 아니라 요청 방식도 설정할 수 있습니다.


```

@RequestMapping(value = "/test1", method = RequestMethod.GET)
public String test1() {
	return "test1";
}

```

#### 요청 어노테이션

RequestMapping 대신 요청별로 제공되는 어노테이션을 사용할 수도 있습니다.

#### RequestMapping은 요청 방식들을 동시에 설정할 수 있습니다.


```
@RequestMapping(value = "/test7", method = {RequestMethod.GET, RequestMethod.POST})
public String test7() {
	return "test7";
}


```

#### 파라미터 추출하기


- 클라이언트 요청 발생 시 전달하는 파라미터 데이터를 손쉽게 주입 받을 수 있도록 다양한 방식을 제공하고 있습니다.
- Spring MVC는 Servlet/JSP 처럼 요청 방식에 따라 파라미터 추출하는 방식이 달라지지는 않습니다.


#### HttpServletRequest 사용하기

- Spring MVC 는 필요한 객체나 데이터는 주입을 받아 사용하게 됩니다.
- Servlet / JSP에서 파라미터 데이터를 추출할 때 HttpServletRequest 객체를 통하게 되는데 Spring MVC에서 이 객체를 주입 받아 사용할 수 있습니다.
- 파라미터 추출 뿐만 아니라 HttpServletRequest 객체가 필요할 경우 사용하면 됩니다

```
@GetMapping("/test1")
public String test1(HttpServletRequest request) {

String data1 = request.getParameter("data1");
String data2 = request.getParameter("data2");
String [] data3 = request.getParameterValues("data3");

… 생략
}

```


#### WebRequest 사용하기

- WebRequest는 HttpServletRequest 클래스를 확장한 클래스입니다.


#### PathVariable


- 데이터가 요청 주소에 있을 경우 값을 주입 받을 수 있는 어노테이션입니다.
- Restful API 서버 프로그래밍시 많이 사용하는 방식입니다.
- 요청주소/값1/값2/값3

#### @RequestParam

- 파라미터 데이터를 직접 주입 받을 수 있습니다.
지정된 변수의 이름과 파라미터의 이름이 같을 경우 값을 주입 받습니다.
- 가능한 경우 형 변환도 처리해줍니다.
- value : 파라미터의 이름과 변수의 이름이 다를 경우 파라미터 이름을 지정합니다.
- required : false를 설정하면 지정된 이름의 파라미터가 없을 경우 null이 주입됩니다.

--------


#### Map으로 주입받기


- 클라이언트가 전달 하는 모든 파라미터 데이터를 한번에 Map으로 받을 수 있습니다.
- 단 동일 명으로 전달되는 2개 이상의 파라미터는 하나만 담기게 됩니다.
- 동일 명으로 전달되는 파라미터가 2개 이상이라면 List로 주입 받아야 합니다.


```
public String test1(@RequestParam Map<String, String> map,
		  @RequestParam List<String> data3) {

}


```



#### @ModelAttribute

- ModelAttribute 어노테이션을 사용하면 파라미터를 객체로 주입받을 수 있습니다.
- 전달되는 파라미터의 이름과 동일한 프로퍼티에 자동으로 주입됩니다.
- 이 어노테이션은 생략이 가능합니다.
- 이러한 객체를 커맨드 객체(Command Object)라고 부릅니다.


--------


### ViewResolver


![20210611_093655](/assets/20210611_093655.png)

- 컨트롤러에서 전달 받은 View의 이름을 토대로 jsp를 찾아 선택하고 jsp 데이터를 분석해 응답결과를 만들어 전달하는 요소 입니다.
- 본 과정에서는 ViewResolver가 사용할 View의 이름을 지정하는 방법과 jsp 를 통해 응답 결과를 만들 때 필요한 데이터를 전달하는 방법에 대해 살펴봅니다.

### HttpServletRequest

- Spring MVC는 jsp 를 처리할 때 HttpServletRequest 객체를 jsp 쪽으로 전달합니다.
- ViewResolver는 이를 이용해 JSP 작업시 데이터를 사용할 수 있습니다.

---------


#### 커맨드 객체


- 클라이언트가 전달해 주는 파라미터 데이터를 주입 받기 위해 사용하는 객체


```
@PostMapping("/test1")
public String test1(@ModelAttribute DataBean bean) {
	return "test1";
}

```

### Request를 통해 전달


- 커맨드 객체는 HttpServletRequest 객체에 자동으로 담기고 jsp로 전달됩니다.
이 때, HttpServletRequest 객체에 저장되는 이름은 클래스의 이름으로 결정됩니다.
- 커맨드 객체는 HttpServletRequest 객체에 자동으로 담기고 jsp로 전달됩니다.
이 때, HttpServletRequest 객체에 저장되는 이름은 클래스의 이름으로 결정됩니다.


-----

### Form 태그

- Spring에서는 <form:태그명> 형태로 되어있는 커스텀 태그를 제공하고 있습니다.
- Form 커스텀 태그를 활용하면 Model 객체에 들어있는 값을  form 요소에 주입 시킬 수 있습니다.
- 회원 정보 수정 등 정보 수정페이지를 구성할 때 요긴하게 사용할 수 있습니다.

#### 커스템 태그 URI 설정
```
<%@taglib prefix='form' uri="http://www.springframework.org/tags/form" %>
```

- <form:> 커스텀 태그를 이용하면 Model 객체와 유기적으로 동작할 수 있습니다.

----


#### <form:form> 태그

- <form> 태그를 생성합니다.
- modelAttribute : form 태그 내의 입력 요소들에 적용될 value 값을 가진 객체 이름. 이 속성의 값이 id 속성으로 설정됩니다. 생략 시 command라는 문자열이 id로 설정됩니다.
- action : 요청할 주소를 설정합니다. 생략 시 현재 페이지가 설정됩니다.
- method : 요청 방식을 설정합니다. 생략 시 post로 설정됩니다.


#### <form:button>태그

- Submit 버튼을 생성합니다.
- disabled : true를 셋팅해주면 버튼을 누를 수 없도록 비활성화 됩니다.


#### <form:hidden>태그

- Hidden 타입의 input 태그를 생성합니다.
- path : 설정한 문자열은 id와 name 속성으로 지정되며 model의 값을 추출해 value 속성에 주입합니다.


#### <form:input>태그

- text 타입의 input 태그를 생성합니다.
- path : 설정한 문자열은 id와 name 속성으로 지정되며 model의 값을 추출해 value 속성에 주입합니다.


#### <form:password>태그

- password 타입의 input 태그를 생성합니다.
- path : 설정한 문자열은 id와 name 속성으로 지정되며 - model의 값을 추출해 value 속성에 주입합니다.
showPassword : 셋팅될 값의 이름을 지정하더라도 값이 셋팅되지 않는데 이 속성에 true를 넣어주면 값이 셋팅됩니다.


####  select, checkbox, radio

- Spring에서 제공하는 form custom tag를 이용하면 select, checkbox, radio button 등을 유동적으로 생성하여 사용할 수 있습니다.


#### <form:select>

- select 태그를 생성합니다.
path : 설정한 문자열은 id와 name 속성으로 지정되며 model의 값을 추출해 값과 동일한 value 속성의 option 태그를 선택합니다.


#### <form:option>, <form:options>


 - <form:option> : select 태그의 option 태그 하나를 생성합니다.
<form:options> : select 태그의 option들을 생성합니다.
items : option 태그들을 생성할 때 필요한 데이터가 담긴 list나 배열

#### <form:checkbox>, <form:checkboxs>

- <form:checkbox> : checkbox 하나를 생성합니다.
- <form:checkboxs> : checkbox 들을 생성합니다.
- items : checkbox들을 생성하기 위해 필요한 정보가 담겨있는 list나 배열


#### <form:radiobutton>, <form:radiobuttons>

- <form:radiobutton> : radiobutton 하나를 생성합니다.
- <form:radiobuttons> : radiobutton 들을 생성합니다.
- items : radiobutton들을 생성하기 위해 필요한 정보가 담겨있는 list나 배열


-----------


### 코드의 흐름


- 웹 애플리케이션은 브라우저가 서버에 요청을 하면 요청 정보를 분석하고 응답 결과를 생성하여 브라우저로 전달하는 과정을 거칩니다.
- 여기에서 서버의 동작은 어떤 분야를 가지고 개발을 하느냐에 따라 달라지게 됩니다.
- Spring MVC는 요청이 발생되면 요청 주소를 분석하여 그와 매핑되어 있는 메서드를 호출하고 메서드가 반환하는 정보를 토대로 응답결과를 생성하여 클라이언트에게 전달합니다.


### 메서드의 리턴

- Controller를 통해 요청 주소와 매핑되어 있는 메서드는 반드시 무언가를 반환해야 합니다.
우리는 지금까지 문자열, Model, ModelAndView 를 반환해 보았습니다.
- 이들은 모두 브라우저에게 전달할 응답결과를 생성하기 위한 JSP를 지정하는 부분입니다.
- 이 밖에도 다양한 정보를 반환할 수 있으며 이를 토대로 동작을 제어할 수 있습니다.

### Redirect

- Redirect는 서버가 클라이언트에게 요청할 주소를 응답결과로 전달하는 것을 의미합니다.
- 클라이언트는 응답결과로 받은 요청주소를 직접 요청하게 됩니다.
- 브라우저가 요청하는 것이므로 주소창의 주소는 변경됩니다.
- Redirect는 새로운 요청이 발생하는 것이므로 HttpServletRequest 객체는 소멸 후 새롭게 생성되며 HttpSession 객체는 그대로 유지됩니다.

### forward


- 코드의 흐름을 서버상에서만 이동하는 것을 의미합니다.
- 브라우저는 다른 곳으로 흐름이 이동되었다는 것을 알 수 없기 때문에 주소창의 주소는 변경되지 않습니다.
- HttpServletRequest, HttpSession 모두 유지됩니다.


##### Redirect : 클라이언트에게 새로운 페이지 요청을 응답결과로 전달합니다.
##### Forward : 서버상에서 코드의 흐름이 이동됩니다.


-----

### Request

- 브라우저에 의해 새로운 요청이 발생하면 브라우저는 서버에 요청에 관련된 정보를 전송하게 됩니다.
- 이를 받은 서버는 브라우저가 보낸 요청 정보들을 보관하기 위해 HttpServletRequest 객체를 생성해 요청 정보들을 담아 두게 됩니다.
- 요청 정보가 담겨 있는 HttpServletRequest 객체는 응답결과가 브라우저로 전송될 때까지 유지되며 사용이 가능합니다

### RequestScope


- 새로운 요청이 발생해 응답결과가 브라우저로 전달 될 때 까지 요청 정보가 담겨 있는 Request 객체를 사용할 수 있습니다.
- 이러한 사용 범위를 RequestScope라고 부릅니다.
- HttpServletRequest 객체에는 서버 개발자가 필요에 의해 데이터나 객체를 저장할 수 있고 RequestScope 내에서 사용이 가능합니다.

##### Request 영역에 데이터를 저장하게 되면 RequestScope 내에서 사용이 가능합니다

----

### 빈 주입



- @Autowired 를 활용하여 Bean을 자동으로 주입 받을 수 있었습니다.
- 스프링 코어에서 prototype과 singleton이 있었습니다.
- Spring MVC에서는 추가로 request, session, application을 제공하고 있습니다.

----

### Request scope

- Bean을 정의할 때 request scope로 정의하면 요청이 발생할 때 마다 Bean 객체가 생성되어 자동으로 주입됩니다.
- 주입된 Bean은 요청 발생시 주입만 이루어지는 것이므로 request 영역에 저장되지는 않습니다.
- Xml로 bean을 설정하고 byName으로 주입 받았을 경우에만 request 영역에 자동 저장됩니다.



- Java 방식은 @RequestScope 를 사용합니다.
- XML 방식은 bean을 정의할 때 scope=“request”로 설정합니다.

Bean을 정의할 때 scope를 request로 설정하면 요청이 발생할 때 마다 새로운 bean이 주입됩니다.

------


### Session

- 브라우저가 최초로 서버에 요청을 하게 되면 브라우저당 하나씩 메모리 공간을 서버에서 할당하게 됩니다.
- 이 메모리 영역은 브라우저당 하나씩 지정되며 요청이 새롭게 발생하더라도 같은 메모리 공간을 사용하게 됩니다.
이러한 공간을 session 이라고 부릅니다.
- 이 영역은 브라우저를 종료할 때 까지 서버에서 사용할 수 있습니다.

- 브라우저가 최초의 요청을 발생 시키고 브라우저를 닫을 때 까지를 SessionScope라고 부릅니다.
- SessionScope 에서는 session 영역에 저장되어 있는 데이터나 객체를 자유롭게 사용할 수 있습니다.


---------


### Session scope

- Bean을 정의할 때 session scope로 정의하면 브라우저가 서버에 최초의 요청을 보낼 때 Bean 객체가 주입됩니다.
- 주입된 Bean은 주입만 이루어지는 것이므로 session 영역에 저장되지는 않습니다.



- Java 방식은 @SessionScope 를 사용합니다.
- XML 방식은 bean을 정의할 때 scope=“session”으로 설정합니다.

##### Bean을 정의할 때 scope를 session으로 설정하면 최초의 요청이 발생할 때 새로운 bean이 주입됩니다.

-----


### Application Scope


- 서버가 가동될 때부터 서버가 종료되는 시점까지의 범위를 Application Scope라고 부릅니다.
- Application Scope 동안 사용할 수 있는 메모리 영역이 만들어지며 ServletContext라는 클래스 타입의 객체로 관리됩니다.
- ServletContext에 저장된 데이터나 객체는 서버가 종료되기 전까지 서버는 웹브라우저에 관계없이 동일한 메모리 공간을 사용하게 됩니다.


###  ServletContext

- HttpServletRequest 객체로 부터 추출이 가능합니다.
- Controller에서 주입 받을 수 있습니다.



##### ServletContext 객체에 데이터나 객체를 담으면 서버가 종료될 때 까지 사용할 수 있습니다.

-----

### Application scope


Bean을 정의할 때 application scope로 정의하면 서버가 가동될 때 자동으로 주입됩니다.
주입된 Bean은 주입만 이루어지는 것이므로 application 영역에 저장되지는 않습니다.
서버가 가동될 때 자동 주입 되는 것이므로 @Lazy를 설정하지 않아도 됩니다


Java 방식은 @ApplicationScope 를 사용합니다.
XML 방식은 bean을 정의할 때 scope=“application”으로 설정합니다.

-------

### Cookie


- 사용자 웹 브라우저에 저장되는 데이터입니다.
- 요청이 발생했을 때 웹 브라우저는 쿠키에 저장된 정보를 서버에 전달하게 됩니다.
- 만약 응답 결과로 쿠키 정보가 전달되면 웹 브라우저가 쿠키에 저장하게 됩니다.
- 쿠키는 사용자 브라우저에 저장되는 것이므로 브라우저가 전달 해 줄 때만 쿠키 정보를 사용할 수 있습니다.

#### Cookie 저장

- 서버측 코드로 쿠키에 데이터를 저장할 수 있는 방법은 없습니다.
브라우저로 보낼 응답 결과에 저장할 쿠키 정보를 담아 보내면 브라우저에 의해 쿠키가 저장됩니다.
Spring MVC에서 쿠키 저장은 Servlet/JSP에서 사용하는 방법으로 처리합니다.

-----

### Properties

- 애플리케이션을 개발할 때 프로그램 실행 중 절대 변하지 않는 값들이 있을 수 있습니다.
- Spring MVC에서는 이러한 값들을 properties 파일에 작성하고 이를 가져다 사용할 수 있도록 제공되고 있습니다.


### @PropertySource, @PropertySources



- 사용할 properties 파일을 지정합니다.
- 하나 혹은 다수의 파일을 지정할 수 있습니다.

```
@PropertySources({
	@PropertySource("/WEB-INF/properties/data1.properties"),
	@PropertySource("/WEB-INF/properties/data2.properties")
})

```

#### @Value


- properties 파일에 작성한 값을 주입 받을 수 있습니다.

```
@Value("${aaa.a1}")
private int a1;

@Value("${aaa.a2}")
private String a2;
```

#### Propery Editor

- Properties 파일에 한글을 작성하면 유니코드 형식의 문자열로 변경됩니다.
- 이는 Property Editor 설치로 해결할 수 있습니다.
- http://propedit.sourceforge.jp/eclipse/updates

------------

### Properties

- 이전 시간에 살펴본 Properties를 활용하면 다양한 값들을 미리 정의 해놓고 이를 가져다 사용할 수 있었습니다.
- Properties에 작성한 값을 JSP에서 사용하고자 한다면 몇 가지 설정이 필요합니다.

### Message

- Properties 파일을 Message로 등록하면 이 데이터는 JSP에서도 사용할 수 있습니다.
- Properties 파일을 Message로 등록하면 다국어 처리가 가능해집니다.

#### MessageSource

- MessageSource 객체를 이용해 properties 파일을 등록해주면 Message로 등록할 수 있습니다.
- 여기에서는 일정 시간마다 한번씩 갱신되는 ReloadableResourceBundleMessageSource를 사용합니다.


#### Java에서 사용하기

- Message로 등록된 데이터를 Java 코드에서 사용하고자 한다면 MessageSource를 주입 받아 사용하면 됩니다.
- 이 때, Locale을 지정하면 다국어 처리가 가능합니다.


```
@Autowired
ReloadableResourceBundleMessageSource res;


```


#### JSP에서 사용하기

- Message로 등록된 데이터를 JSP에서 사용하고자 한다면 message 커스텀 태그를 사용합니다.


#### Java에서 사용하기

- Message로 등록된 데이터를 Java 코드에서 사용하고자 한다면 MessageSource를 주입 받아 사용하면 됩니다.
- 이 때, Locale을 지정하면 다국어 처리가 가능합니다.


------




###  유효성 검사


- 웹 애플리케이션에서 사용자 입력에 대해 유효성을 검사해야 하는 경우가 있습니다.
- JavaScript로 처리할 수도 있지만 Spring MVC를 이용하여 처리할 수도 있습니다

### JSR-303

- Spring MVC는 JSR-303 규격의 유효성 검사 라이브러리를 사용할 수 있습니다.
Bean에 데이터가 입력될 때 어떤 검사를 할 것인지 어노테이션으로 지정하고 지정된 어노테이션의 조건에 맞지 않으면 개발자에게 입력값에 오류가 있다는 정보를 전달합니다.
개발자는 이를 통해 유효성 검사를 진행할 수 있습니다.


- @AssertTrue : true가 아닌 값이 들어오면 오류
- @AssertFalse : false가 아닌 값이 들어오면 오류
- @Max(값) : 값보다 큰 값이 들어오면 오류
- @Min(값) : 값보다 작은 값이 들어오면 오류




- @DecimalMax(value=값, inclusive=true/false) : 값보다 작거나 같은 값이 들어와야 합니다. Inclusive가 false면 값은 포함하지 않기 때문에 작은 값이 들어와야 합니다. 생략하면 true
- @DecimalMin(value=값, inclusive=true/false) : 값보다 크거나 같은 값이 들어와야 합니다. Inclusive가 false면 값은 포함하지 않기 때문에 큰 값이 들어와야 합니다. 생략하면 true


- @Null : 값이 들어오면 오류가 발생.
- @NotNull : 값이 들어오지 않으면 오류가 발생.
- @Digits(integer=자릿수,fraction=자릿수) : 지정된 자릿수의 숫자가 아닐 경우 오류가 발생. Integer – 정수 자릿수, fraction – 실수 자릿수
- @Size(min=글자수,max=글자수) : 지정된 글자수 보다 짧거나 길면 오류가 발생

- @Pattern(regexp=정규식) : 주어진 정규식에 위배되면 오류 발생


#### JSR-380

- @NotEmpty : 주입된 값의 길이가 0이면 오류 발생. 공백도 글자로 인식합니다.
- @NotBlank : 주입된 값이 공백을 제거하고 길이가 0이면 오류 발생.
- @Positive : 양수가 아니라면 오류 발생
- @PositiveOrZero : 0 또는 양수가 아니라면 오류 발생
- @Negative : 음수가 아니라면 오류 발생.

- @NegativeOrZero : 0 또는 음수가 아니라면 오류 발생.
- @Email : 이메일 형식이 아니라면 오류 발생. 중간에 @가 있는지 정도만 확인한다.


------


#### Interceptor


- Spring Framework 강좌에서 배웠던 AOP를 적용한 Spring MVC의 요소입니다.
- Interceptor는 요청 주소에 대해 관심을 갖고 요청이 발생하게 되면 요청 주소를 확인하여 Controller의 메서드를 호출 하기 전이나 후에 다른 메서드를 호출 할 수 있도록 가로 채 가는 개념입니다

![20210613_033945](/assets/20210613_033945.png)


- 요청 발생 시 호출되는 메서드의 코드가 중복 되는 부분이 있을 때 Interceptor를 통해 처리하게 됩니다.
- 로그인 여부 확인, 등급별 서비스 사용 권한 확인 등의 작업을 처리할 때 많이 사용합니다.
- Interceptor는 Java 프로젝트와 XML 프로젝트의 셋팅 방법이 각각 다릅니다.


- Interceptor는 HandlerInterceptor 인터페이스를 구현하거나 HandlerInterceptorAdapter를 상속받은 클래스를 만들고 다음 메서드를 구현합니다.
- preHandle : Controller의 메서드가 호출되기 전 호출됩니다. 이 메서드가 false를 반환하면 코드의 흐름이 중단됩니다.
- postHandle : Controller의 메서드의 수행이 완료되고 view 처리를 수행하기 전에 호출됩니다.
- afterCompletion : view 처리까지 완료되고 응답결과가 브라우저로 전달되기 전에 호출됩니다.

### pattern

* : 이름 하나를 의미하며 글자수, 글자 등 제한이 없습니다.
? : 글자하나를 의미합니다.
** : 하위 이름까지 포함하여 글자수, 글자 등 제한이 없습니다.

 addPathPatterns, <mapping> : Interceptor가 가로채 갈 주소를 등록합니다.
excludePathPatterns, <exclude-mapping> : Interceptor가 가로채 가지 않을 주소를 등록합니다.



- Interceptor는 AOP 개념을 적용하여 요청 주소를 감시하는 개념입니다.
- 등록된 주소 패턴에 맞는 Interceptor가 요청 흐름을 가로채 가서 원하는 처리를 할 수 있습니다.


--------
