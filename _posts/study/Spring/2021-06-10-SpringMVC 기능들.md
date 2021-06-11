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


-----------
