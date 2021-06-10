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
