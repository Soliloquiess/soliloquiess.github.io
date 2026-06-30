---
title: "[Spring] 일반 MVC에서 Spring MVC로 — DispatcherServlet과 @RequestMapping"
date: 2021-06-01
category: "Spring"
tags: ["Spring"]
description: "일반 MVC의 다중 POJO를 Spring MVC의 단일 컨트롤러+메서드 방식으로 전환하는 과정을 정리한다. DispatcherServlet·HandlerMapping·ViewResolver 자동 제공 구조, Maven 의존성, MyBatis 연동 설정까지 포함."
permalink: "study/2021/06/01/mvc를-Spring-mvc로"
---

## 일반 MVC의 한계

![20210602_130416](/assets/20210602_130416.png)

일반 MVC로 구현하면 생산성이 떨어진다. 그 이유는 다음과 같다.

| 일반 MVC | Spring MVC |
|----------|------------|
| 요청마다 별도 POJO 클래스 필요 | 하나의 컨트롤러 클래스 + 메서드로 처리 |
| HandlerMapping 직접 구현 | 프레임워크가 자동 제공 |
| ViewResolver 직접 구현 | 프레임워크가 자동 제공 |
| FrontController 직접 구현 | **DispatcherServlet**이 제공 |

> 서블릿도 클래스다. 프론트 컨트롤러와 핵심적으로 연결된 **HandlerMapping**이 클라이언트 요청에 대한 POJO를 찾아주고, POJO는 마지막으로 View 경로를 프론트 컨트롤러에 전달한다. 프론트 컨트롤러는 **ViewResolver**와 연동해 결과를 받아온다.

---

## Spring MVC 전환 핵심: POJO를 메서드로

일반 MVC에서 C(Controller)는 **FrontController + 다수의 POJO**로 구성되어 있었다.

![20210602_133045](/assets/20210602_133045.png)

**Maven**은 의존성(라이브러리) 상태 관리 도구다. 스프링 프로젝트는 Boot가 아닌 **Legacy 방식(Spring MVC Project)**으로 생성한다.

> 스프링은 맨 마지막 이름이 컨텍스트 패스로 등록된다.

![20210602_135254](/assets/20210602_135254.png)

이 경우 컨텍스트 패스는 `myapp`으로 등록된다.

---

스프링 MVC도 M·V·C 구조를 따르며, 프로젝트 생성 시 샘플로 `home.jsp`(View)와 `HomeController`(POJO)가 만들어진다.

![20210602_140445](/assets/20210602_140445.png)

HandlerMapping, FrontController(DispatcherServlet), ViewResolver 같은 클래스들은 스프링이 **자동으로 만들어 숨겨두고** 제공한다.

객체는 **객체 바인딩 + Forward** 기법으로 다음 단계에 전달된다.

![20210602_143225](/assets/20210602_143225.png)

---

## 다수의 POJO를 하나의 컨트롤러로 통합

일반 MVC에서는 요청마다 별도 POJO 클래스가 필요했다.

![20210602_145213](/assets/20210602_145213.png)

Spring MVC에서는 **MemberController 하나**로 모든 요청 처리가 가능하다.

![20210602_145833](/assets/20210602_145833.png)

각 POJO에 있던 기능을 전부 **메서드 단위**로 만들어 하나의 컨트롤러에 넣는다.

![20210602_151009](/assets/20210602_151009.png)

이제 이 컨트롤러는 어떤 요청이 와도 처리할 수 있다. 문제는 **어떤 메서드를 호출할지** 결정하는 것이다.

---

## @RequestMapping — 요청과 메서드를 직접 연결

![20210602_153059](/assets/20210602_153059.png)

스프링은 요청이 왔을 때 컨트롤러가 아닌 **메서드와 직접 연결**하는 방법을 제공한다. `@RequestMapping` 어노테이션이 있으면 **HandlerMapping이 자동으로 관리**한다.

![20210602_153347](/assets/20210602_153347.png)

내부적으로 위와 같이 처리된다.

---

## HandlerMapping·FrontController·ViewResolver는 건드리지 않는다

**HandlerMapping, FrontController(DispatcherServlet), ViewResolver**는 스프링이 제공하므로 거의 수정할 일이 없다. 우리는 **POJO(컨트롤러 메서드)부터 바로 코딩**하면 된다.

수정이 필요한 부분은 아래와 같다.

![20210602_154252](/assets/20210602_154252.png)

---

## Maven 의존성 설정

![20210602_162625](/assets/20210602_162625.png)

**mvnRepository**에서 네트워크를 통해 라이브러리를 자동으로 설치한다.

![20210602_163905](/assets/20210602_163905.png)

**Gson** 라이브러리도 추가하자. Gson은 Java 객체를 JSON 형태로 쉽게 변환해주는 라이브러리다.

![20210602_164555](/assets/20210602_164555.png)

의존성을 `pom.xml`의 `<dependencies>`에 추가하면 자동으로 다운로드된다.

![20210602_164943](/assets/20210602_164943.png)

---

## Spring MVC 전환 정리

> Spring MVC로 오면서 가장 큰 변화: **다수의 POJO를 하나의 컨트롤러(메서드)로 통합**. `@RequestMapping` 어노테이션으로 요청-메서드 매핑이 간단해졌다.

**HandlerMapping, FrontController, ViewResolver** 3개는 없어진 게 아니라 Maven(프레임워크)에 내장되어 자동 제공된다.

---

## 설정 파일 구조

![20210602_171746](/assets/20210602_171746.png)

스프링은 `web.xml`을 읽으면서 시작된다. `web.xml`에는 `root-context.xml`과 `servlet-context.xml`이 보이는데, 각각 리스너와 DispatcherServlet이 읽어들인다.

- **ContextLoaderListener** → `root-context.xml` (1번)
- **DispatcherServlet** → `servlet-context.xml` (2번)

---

## MyBatis 연동

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

위와 같이 나오면 성공.

자바에서 클래스를 사용하는 방법은 두 가지다. 직접 객체를 생성하거나, **XML의 `<bean>`으로 등록**하거나. 클래스 이름만 알면 객체를 생성할 수 있는 것이 **리플렉션(Reflection)** 기법이다.

![20210602_181913](/assets/20210602_181913.png)

---

## XML 편집기 설정

Window 탭 → File Associations → `.xml` → XML Editor를 선택 후 Default로 맨 위로 올린다.

![20210602_183005](/assets/20210602_183005.png)

![20210602_191140](/assets/20210602_191140.png)

`sqlSessionFactory` 안에 위의 XML 정보들이 모두 적용된다.

---

## 한글 인코딩 필터

![20210602_211314](/assets/20210602_211314.png)

![20210602_212231](/assets/20210602_212231.png)

![20210602_230550](/assets/20210602_230550.png)

클라이언트 요청이 오면 DispatcherServlet 이전에 **Filter**를 거친다. 한글 깨짐을 방지하기 위해 CharacterEncodingFilter를 설정한다.

![20210602_231538](/assets/20210602_231538.png)

위 설정을 `web.xml`에 추가하면 모든 요청이 `CharacterEncodingFilter`를 거치게 된다.

---

## Mapper 파일과 Configuration 파일 분리

**DAO는 메서드 이름으로 SQL과 연결**된다. 이 규칙이 하나의 표준이 된다.

![20210603_010231](/assets/20210603_010231.png)

Maven에서 추가·변경 후 에러나 X 표시가 나면 **Update**를 한 번 해보자.

![20210603_011659](/assets/20210603_011659.png)

또는 **Clean** 후 Rebuild를 시도한다.

---

**Mapper 인터페이스**를 사용하면 DAO 없이도 인터페이스 내부에서 바로 SQL을 실행할 수 있다.

![20210603_011659](/assets/20210603_011659_fosenhpb1.png)

**매퍼의 namespace 이름**과 **실제 인터페이스 이름**이 같아야 스프링이 두 부분을 하나로 연결해 관리한다.

![20210603_011659](/assets/20210603_011659_ol5ynhlrc.png)

매퍼 인터페이스는 XML 파일과 연결된다.

![20210603_023837](/assets/20210603_023837.png)

`@Mapper`를 붙이면 MyBatis로 인식해 `SqlSession`을 내부적으로 자동 호출한다.

![20210603_024314](/assets/20210603_024314.png)

그 외에도 `root-context.xml`에 자잘한 설정을 추가해야 한다.
