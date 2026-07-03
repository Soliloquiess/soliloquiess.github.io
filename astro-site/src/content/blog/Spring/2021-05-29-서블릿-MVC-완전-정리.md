---
title: "[Spring] 서블릿 MVC 완전 정리 — Model1·Model2·FrontController·3-Tier"
date: 2021-05-29
category: "Spring"
tags: ["Spring"]
description: "순수 서블릿 기반 MVC를 한 번에 정리한다. MVC 패턴 개념부터 Model1 vs Model2, 서블릿 요청/응답 흐름과 매핑, FrontController·POJO 분리 설계, 3-Tier 계층 구조, 포워드/리다이렉트와 객체 바인딩, JSTL/EL까지 다룬다."
permalink: "study/2021/05/29/mvc개인정리"
---

## MVC 패턴 개념

**MVC 디자인 패턴**은 모델 2 구조에서 가장 많이 사용되는 개념이다. MVC는 **Model — View — Controller**의 약자로, 일종의 프로그램 디자인 패턴이다. 웹 애플리케이션의 각 기능(클라이언트 요청 처리, 응답 처리, 비즈니스 로직 처리 등)을 모듈화하여 역할을 분리한다.

![MVC 구조 개요](/assets/20210531_001344.png)

| 역할 | 구현체 | 설명 |
|------|--------|------|
| **Controller** | Servlet | 클라이언트 요청을 받아 분석하고, 알맞은 모델을 호출한 뒤 결과를 보여줄 JSP를 선택한다. |
| **Model** | DAO / VO 클래스 | 데이터 저장·수정·DB 연동 등 비즈니스 로직을 수행한다. |
| **View** | JSP | 화면 기능을 담당하며 모델에서 처리한 결과를 화면에 표시한다. |

MVC에서 **Controller**는 서블릿(Servlet)이 담당하며, 클라이언트 요청을 가장 먼저 받는다.

---

## Model1 vs Model2(MVC)

모델 2는 모델 1의 단점을 보완하고자 웹 애플리케이션의 각 기능을 분리하여 구현한다.

| 방식 | 구성 요소 | 특징 |
|------|-----------|------|
| **Model1** | JSP + Model | 뷰(JSP)와 모델만으로 구성 |
| **Model2 (MVC)** | Controller(서블릿) + View(JSP) + Model | 역할 분리, 유지보수 용이 |

**Model1은 Model과 View만으로 이루어진 구조다.** Model2는 아래와 같이 구현체를 분리한다.

| 역할 | 구현체 |
|------|--------|
| Controller | Servlet |
| View | JSP |
| Model | Java 객체 |

**Model 2 방식이 곧 MVC 방식이다.**

---

## 서블릿(Servlet)이란?

Model1에서 자바로 만들어진 컴포넌트를 **서블릿(Servlet)**이라 한다.

![서블릿 개념](/assets/20210330_011150.png)

이름 유래: **Server + -let** (소형 서버 프로그램). `-let`으로 끝나는 용어들의 공통 특징이다.

- 클래스 파일(`.class`)은 톰캣이 직접 실행 불가 — 반드시 **서블릿 형태**로 만들어야 웹에서 구동된다.

![서블릿과 클래스 실행](/assets/20210330_012607.png)

- `HttpServlet`은 Java EE 웹 전용 클래스 (Java SE의 `rt.jar`와 구분)
- 개발자가 임의로 메서드를 만드는 것이 아니라, `HttpServlet`에 정의된 메서드를 **재정의(Override)**해야 한다.
- 핵심 대상: `service()` 메서드 재정의

### JSP는 서블릿이다

JSP가 서블릿으로 변환되고, 그 서블릿이 `.class` 파일이 된다. 이 변환 작업은 **WAS(Web Application Server)**가 담당한다.

JSP는 HTML 없이도 사용 가능하다. 컨트롤러에 있던 내용을 JSP 안에 넣고, 조건에 따라 다른 JSP를 호출하면 JSP만으로도 동작한다.

> 초창기에는 JSP 없이 서블릿만 사용했다. 클라이언트 출력(뷰) 부분의 유지보수 문제가 커지면서 **View 역할을 분리한 JSP**가 등장하게 되었다.

**JSP 태그 요소:**

| 태그 | 역할 |
|------|------|
| `<%@ page %>` | 페이지 지시자 |
| `<%@ include %>` | 파일 포함 지시자 |
| `<%@ taglib %>` | 태그 라이브러리 지시자 |
| `<% %>` | 스크립트릿 (자바 코드) |
| `<%= %>` | 출력식 |

---

## 서블릿 요청/응답 처리 흐름

![서블릿 요청/응답 구조](/assets/20210330_013117.png)

`service()` 메서드는 **요청 객체(req)와 응답 객체(resp)를 반드시 파라미터로 받는다.**

```
protected void service(요청, 응답)
```

- 브라우저 → 서버 요청 시 클라이언트의 **IP + 포트 정보**가 함께 전달됨
- `req`, `resp` 객체가 이 클라이언트 요청 정보를 인식하고 처리

![클라이언트 요청 정보](/assets/20210330_014203.png)

- 클라이언트 IP + 포트로 연결하는 것을 **소켓(Socket)**이라 한다
- 응답 출력에는 `PrintWriter out`(출력 스트림)을 사용
- 브라우저로 내려주면 **HTML 태그로 해석**되어 렌더링됨

![응답 출력 처리 1](/assets/20210330_014428.png)

![응답 출력 처리 2](/assets/20210330_014827.png)

![서블릿 요청-응답 처리 흐름](/assets/20220326_013947.png)

클라이언트가 서버에 요청하면, 서버는 해당 요청을 처리하기 위해 **Request 객체**와 **Response 객체**를 생성해 서비스 메서드의 첫 번째·두 번째 인자로 넘겨준다.

서비스 메서드는 반드시:
- 첫 번째 인자: `HttpServletRequest`
- 두 번째 인자: `HttpServletResponse`

이것이 서블릿 요청-응답 처리의 핵심이다.

### HTML 폼과 서블릿 연동

![HTML 폼 작성 1](/assets/20210331_003119.png)

![HTML 폼 작성 2](/assets/20210331_012328.png)

![HTML 폼 작성 3](/assets/20210331_012707.png)

> **reset** 버튼은 `<form>` 태그 안에 있어야 동작한다.

![HTML 폼 작성 4](/assets/20210331_012925.png)

![HTML 폼 작성 5](/assets/20210331_013242.png)

![HTML 폼 전송](/assets/20210331_013549.png)

전송 버튼을 눌렀을 때 **파라미터 2개가 서블릿으로 전달**되어야 한다.

![service() 요청/응답 1](/assets/20210331_015903.png)

![service() 요청/응답 2](/assets/20210331_015941.png)

![service() 요청/응답 3](/assets/20210331_020511.png)

클라이언트가 서버에 요청 → `service()` 메서드에 **요청 객체(request)와 응답 객체(response)**가 전달되어 실행된다.

- 클라이언트 식별은 `request`와 `response`로 수행
- 항상 **첫 번째 인자가 request, 두 번째 인자가 response**
- 서버 요청 시 정보가 패킷으로 전달되며, 주소창에 패킷 정보가 보이는 것이 **GET 방식**

![GET 방식 패킷 노출](/assets/20210331_020816.png)

GET 방식은 전달되는 데이터가 URL에 노출되어 보안에 취약하고, 전송 데이터 크기에 한계가 있다.

![요청 처리 결과](/assets/20210331_021500.png)

---

## GET vs POST 방식

### GET 방식

GET은 "가져오다"라는 의미처럼, 서버에서 **정보를 조회**하기 위해 사용하는 방식이다.

| 항목 | 내용 |
|------|------|
| 데이터 위치 | URL에 포함 (Header) |
| 보안 | URL 노출로 취약 |
| 캐싱 | 가능 |
| 데이터 크기 | 제한 있음 |

### POST 방식

POST는 "제출하다"라는 의미처럼, 데이터를 서버로 제출하여 **추가 또는 수정**하기 위해 사용하는 방식이다.

| 항목 | 내용 |
|------|------|
| 데이터 위치 | HTTP Body에 포함 |
| 보안 | URL 미노출로 기본 보안 확보 |
| 캐싱 | 불가 |
| 데이터 크기 | 제한 없음 (단, Time Out 존재) |

POST 방식은 Body에 데이터를 담으므로 `Content-Type` 헤더 필드로 데이터 타입을 명시해야 한다. 쿼리스트링 외에도 라디오 버튼, 텍스트 박스 등 다양한 객체 값 전송이 가능하다.

**요약 비교:**

| 구분 | GET | POST |
|------|-----|------|
| 데이터 위치 | URL(헤더)에 포함 | HTTP Body에 포함 |
| 보안 | URL 노출로 취약 | URL 비노출로 기본 보안 |
| 캐싱 | 가능 | 불가 |
| 용도 | 조회 | 생성·수정 |

![쿼리스트링 1](/assets/20210331_022133.png)

참고: https://mangkyu.tistory.com/17

![쿼리스트링 2](/assets/20210331_022326.png)

> `?` 뒤에 전달되는 내용을 **쿼리스트링(Query String)**이라 한다.

---

## 서블릿 매핑

### WEB-INF 보안 디렉터리

**`WEB-INF`는 보안 디렉터리** — URL에 절대 노출되면 안 된다.

![WEB-INF 보안](/assets/20210330_014959.png)

서블릿 요청 경로를 직접 노출할 경우 발생하는 문제:
1. URL 경로가 보안에 취약
2. 경로가 불필요하게 길어짐

### web.xml 방식

![매핑 필요성](/assets/20210330_015052.png)

해결책: `hs.do` → `/WEB-INF/class/Servlet` 으로 **매핑(mapping)**하면 내부 경로를 숨길 수 있다.

![매핑 개념](/assets/20210330_015121.png)

`web.xml`에 서블릿을 등록할 때 이름이 세 곳에 등장한다.

```xml
<servlet>
  <servlet-name>HelloServlet</servlet-name>
  <!-- 여긴 일반적으로 클래스 이름 넣어줌-->
  <servlet-class>kr.web.controller.HelloServlet</servlet-class>
  <!-- 이건 진짜 서블릿 이름 -->
</servlet>

<servlet-mapping>
  <servlet-name>HelloServlet</servlet-name>
  <url-pattern>/hs.do</url-pattern>
  <!-- 이건 url상의 서블릿 이름 -->
</servlet-mapping>
```

- **URL 패턴** (`/hs.do`): 브라우저가 요청하는 주소
- **서블릿 이름** (`HelloServlet`): `<servlet>`과 `<servlet-mapping>`을 연결하는 이름
- **서블릿 클래스** (`kr.web.controller.HelloServlet`): 실제 자바 클래스 경로

![web.xml 매핑 등록](/assets/20210330_021350.png)

**서블릿 매핑 규칙:**
- 서블릿 이름은 자유롭게 지정 가능하지만, `<servlet>`과 `<servlet-mapping>`의 이름은 **반드시 일치**해야 한다

![매핑 규칙 1](/assets/20210330_021426.png)

![매핑 규칙 2](/assets/20210330_021555.png)

- 서블릿을 세 가지 이름(서블릿 이름, URL 패턴, 실제 클래스명)으로 관리
- 서블릿이 여러 개일 때 이름이 중복되면 충돌이 발생하므로 **클래스 이름을 명시**하는 것이 바람직하다

![매핑 규칙 3](/assets/20210330_021651.png)

![매핑 규칙 4](/assets/20210330_021915.png)

매핑된 URL로 요청이 오면 해당 서블릿을 찾아 실행한다.

![서블릿 매핑 흐름도](/assets/20220324_025753.png)

서블릿이 어떻게 매핑되는지를 잘 이해하는 것이 핵심이다.

### 서블릿 실행 확인

서블릿은 반드시 **먼저 매핑을 완료**한 후 실행해야 한다.

![실행 확인 1](/assets/20210330_022032.png)

![실행 확인 2](/assets/20210330_022058.png)

이것이 실제 브라우저 화면에 나타나는 결과다.

![실행 확인 3](/assets/20210330_022129.png)

HTML 형태로 렌더링되어 최종 출력된다. 응답은 I/O 스트림으로 전달한다.

![실행 확인 4](/assets/20210330_022313.png)

### 어노테이션(Annotation) 매핑

서블릿 실행마다 `web.xml`에 수동 매핑하는 것은 번거롭다. 톰캣 버전이 올라가면서 **어노테이션(메타데이터)** 방식으로 간편하게 매핑할 수 있게 되었다.

- **메타데이터**: 프로그램 실행 전에 서버에 정보를 미리 알려주는 방식
- 어노테이션을 통해 서버가 해당 클래스의 역할을 사전 인지

![어노테이션 매핑 개념](/assets/20210330_024150.png)

**MVC에서 Controller(C)의 역할**: 클라이언트 요청을 가장 먼저 받아 처리 흐름을 제어한다.

![Controller 역할](/assets/20210330_024427.png)

![애노테이션 매핑 예시](/assets/20220324_205832.png)

Dynamic Web Project에서는 서블릿 **애노테이션**으로 이렇게 매핑이 가능하며, 이 경우 `web.xml`에 수동 등록이 필요 없다.

### 트러블슈팅: URL 패턴 중복 충돌

`web.xml`과 서블릿 애노테이션 양쪽에 `/hs.do`를 중복 매핑하면 톰캣이 기동하지 않는다.

> `Caused by: java.lang.IllegalArgumentException: 이름이 [HelloServlet]과 [kr.web.controller.HelloServlet]인 두 서블릿들 모두 url-pattern [/hs.do]에 매핑되어 있는데, 이는 허용되지 않습니다.`

둘 중 하나만 남겨야 한다.

![충돌 오류 화면 (web.xml)](/assets/20220324_044952.png)![충돌 오류 화면 (서블릿 애노테이션)](/assets/20220324_044944.png)

---

## 프로젝트 구조와 배포

### classes 디렉터리

우리가 만든 파일은 **classes** 파일로 간다. `src`에 만들어지는 건 `bin` 폴더에 들어가는데, 실제로는 모든 파일을 **classes** 폴더에서 찾도록 설정되어 있다. 따라서 build path에서 출력 경로를 `classes`로 변경해야 한다.

> `bin` 디렉토리는 IDE에서 숨겨져 있다. 확장자가 `.class`인 파일은 컴파일 후에 생성되기 때문이다.

![Build path 설정 화면](/assets/20220324_010634.png)

![Classes 폴더 경로 확인](/assets/20220324_012616.png)

이 부분 설정이 아주 중요하다. 이렇게 바꿔야 런타임이 `classes` 폴더에서 클래스를 찾게 된다. 수동으로 프로젝트를 만들 때만 필요하고, Dynamic Web Project로 자동 생성하면 이미 처리되어 있다.

![classes 디렉터리 1](/assets/20210329_193843.png)

![classes 디렉터리 2](/assets/20210330_005259.png)

![classes 디렉터리 3](/assets/20210330_005616.png)
![classes 디렉터리 4](/assets/20210330_005703.png)

> classes 디렉터리가 보이지 않는 것은 **수동 생성** 시 나타나는 현상으로, 자동 생성하면 정상 표시된다.

![classes 디렉터리 5](/assets/20210330_010023.png)

### Dynamic Web Project 구조

Dynamic Web Project로 만들면 자바 컴파일 경로가 `build/classes`로 자동 설정된다. Eclipse가 `build` 폴더로 분리해 관리하지만, 실제로는 `WEB-INF/classes` 위치에 배치되어 동작한다.

![Dynamic Web Project 구조](/assets/20220324_035835.png)

**context-root** 설정이 중요하다. 톰캣이 웹 애플리케이션을 인식하려면 컨텍스트 루트 등록이 필수다. `context directory`는 `webapp`와 같은 개념으로 보면 된다.

![Context 설정 화면](/assets/20220324_041215.png)

```xml
<!-- 여기에 등록해야 찾아감 -->
	<Context docBase="D:\egovFrame_workspace\narp\WEB\webapp" path="/web" ></Context>
    <!--  중요한 부분 우리가 만든 웹 어플리케이션을 톰캣이 인식하도록 등록하는데 이걸 컨텍스트 등록이라 한다 .안하면 톰캣이 인식 불가. -->
      <Context docBase="MVC01" path="/MVC01" reloadable="true" source="org.eclipse.jst.jee.server:MVC01"/>

```

프로젝트 생성 후 톰캣에 추가하고 실행하면 **context-path가 자동으로 등록**된다.

![톰캣 실행 확인](/assets/20220324_041613.png)

![DD 생성 1](/assets/20210330_030001.png)

![DD 생성 2](/assets/20210330_030051.png)

- `web.xml`을 체크하면 **배포 서술자(DD, Deployment Descriptor)**가 생성된다
- 어노테이션만으로도 매핑 가능하지만, 이후 `web.xml`을 사용하므로 체크 권장

![컨텍스트 등록 1](/assets/20210330_030616.png)

![컨텍스트 등록 2](/assets/20210330_031514.png)

두 방식의 공통점: **컨텍스트(Context) 등록** — 웹 애플리케이션을 톰캣이 인식하도록 등록하는 작업

![컨텍스트 등록 3](/assets/20210330_031629.png)

- 수동 방식: `context path`를 일일이 직접 등록해야 함
- Dynamic Web Project: Add하면 자동으로 `context path`에 등록됨

![컨텍스트 등록 4](/assets/20210330_031835.png)

![컨텍스트 등록 5](/assets/20210330_032111.png)

![컨텍스트 등록 6](/assets/20210330_032302.png)

![컨텍스트 등록 7](/assets/20210330_032333.png)

> **핵심**: `contextPath`는 `WebContent` 디렉터리를 기준으로 동작한다.

![reloadable 설정](/assets/20210330_032631.png)

**`reloadable=true` 설정:**
- 서버 재시작 없이 변경사항을 자동 반영 (메모리의 구 서블릿을 내리고 새 버전을 올리는 과정을 자동화)
- 단, 시간이 걸리기 때문에 빠른 반영이 필요할 때는 서버를 직접 재시작하는 것이 낫다

![path 경로 일치](/assets/20210330_032930.png)

`path` 경로가 일치해야 우리가 만든 서블릿을 찾아간다.

![프로젝트 디렉터리 구분](/assets/20210330_033003.png)

**프로젝트 디렉터리 구분:**

| 구성 요소 | 위치 |
|-----------|------|
| JSP (View) | `WebContent` |
| Servlet / Model | `src` (패키지) |

### 서블릿 자동 생성과 doGet/doPost/service

![자동 생성 1](/assets/20210330_035404.png)

어떤 URL 요청이 왔을 때 어떤 서블릿을 실행할지 매핑을 정의한다.

![자동 생성 2](/assets/20210330_035520.png)

서블릿 매핑 이름은 실행 서블릿 위치만 가리키는 것이라 자유롭게 변경 가능하다.

![자동 생성 3](/assets/20210330_035643.png)

**응답 메서드 선택:**

| 메서드 | 설명 |
|--------|------|
| `doGet()` | GET 방식 요청만 처리 |
| `doPost()` | POST 방식 요청만 처리 |
| `service()` | GET/POST 무관하게 모두 처리 |

체크박스에서 `service`를 선택하면 기본 서블릿이 생성되며, 수동 생성 결과와 동일한 구조가 만들어진다.

![프레젠테이션/비즈니스 로직 분리](/assets/20210330_040624.png)

서블릿의 **프레젠테이션 로직(응답부)**과 **비즈니스 로직(모델부, Service에서 처리)**을 V와 M으로 분리하여 응답 부하를 줄인다.

### 배포 방식

웹 애플리케이션 배포는 두 가지 방식을 지원한다:

| 방식 | 특징 |
|------|------|
| **WAR** | 웹 애플리케이션 전용 압축 파일 |
| **JAR** | 범용 자바 아카이브 |

프로젝트를 다른 환경으로 이동하거나 팀 협업 시 패키징 방법:

![배포 방식 1](/assets/20210330_040849.png)

![배포 방식 2](/assets/20210330_040938.png)

---

## MVC 역할 분리와 요청 처리 흐름

클라이언트 요청을 받는 역할도 하고 응답도 해야 하므로, 서블릿에서 **View 역할은 별도 JSP로 분리**된다.

![역할 분리 1](/assets/20210331_022704.png)

서블릿 내부 로직을 **Model(비즈니스 로직)**과 **View(JSP)** 로 분리한다.

![역할 분리 2](/assets/20210331_024401.png)

Controller 역할만 하는 서블릿으로만 모든 것을 처리하는 것은 매우 비효율적이다.

![역할 분리 3](/assets/20210331_024542.png)

![역할 분리 4](/assets/20210331_025516.png)

![역할 분리 5](/assets/20210331_025602.png)

> **Java 클래스 네이밍 컨벤션**: 클래스 이름의 첫 글자는 반드시 **대문자**로 시작한다.

### MVC 요청 처리 흐름

![MVC 요청 처리 흐름](/assets/20210531_002031.png)

1. 브라우저에서 `/mem.do`로 요청한다.
2. `MemberController` 서블릿이 요청을 받고 `MemberDAO`의 `listMembers()` 메서드를 호출한다.
3. `MemberDAO`의 `listMembers()`에서 SQL로 회원 정보를 조회한다.
4. 조회된 정보를 `MemberVO`에 설정하여 반환한다.
5. `MemberController`가 받은 정보를 `listMembers.jsp`로 전송한다.
6. `listMembers.jsp`가 결과를 클라이언트 화면에 출력한다.

![포워딩 흐름 다이어그램](/assets/20210531_003957.png)

컨트롤러와 뷰가 데이터를 주고받는 것을 **포워딩(Forwarding)**이라 한다.

### 한글 인코딩 처리

![한글 인코딩 1](/assets/20210331_032859.png)

![한글 인코딩 2](/assets/20210331_033853.png)

![한글 인코딩 3](/assets/20210331_034011.png)

한글이 깨지는 문제가 발생한다.

원인: 자바에서 한글은 **2바이트**이지만, 서버 전달 시 **1바이트**로 처리되기 때문이다.

![한글 인코딩 해결](/assets/20210331_035640.png)

---

## FrontController와 POJO 분리 설계

### FrontController 패턴이란?

기존 방식은 클라이언트의 요청을 **개별 컨트롤러에 직접 연결**해서 처리했다. **FrontController**를 도입하면 모든 요청을 프론트 컨트롤러가 먼저 받아 분기한다.

![Redirect 흐름도 1](/assets/20220326_190414.png)
![Redirect 흐름도 2](/assets/20220326_190526.png)

요청이 들어오면 해당 컨트롤러로 넘겨주는 방식이다.

| 구분 | 구현 방식 | 설명 |
|------|-----------|------|
| **FrontController** | 서블릿(Servlet) | 웹 요청을 받는 골격. 웹에서 실행되는 자바 |
| **일반 Controller (POJO)** | 순수 자바 클래스 | 틀 없는 평범한 자바 — Plain Old Java Object |

> 서블릿은 웹에서 실행되는 골격이고, 순수 자바(POJO)는 그런 틀이 없다. FrontController는 서블릿으로 만들고, 일반 Controller는 POJO로 만든다.

![FrontController 매핑](/assets/20210531_141558.png)

`.do`로 끝나는 요청은 FrontController가 받도록 설정한다.

```
package kr.bit.frontcontroller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.bit.controller.Controller;
import kr.bit.controller.MemberContentController;
import kr.bit.controller.MemberDeleteController;
import kr.bit.controller.MemberInsertController;
import kr.bit.controller.MemberListController;
import kr.bit.controller.MemberRegisterController;
import kr.bit.controller.MemberUpdateController;
import kr.bit.model.MemberDAO;
import kr.bit.model.MemberVO;
@WebServlet("*.do")
public class MemberFrontController extends HttpServlet {
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		// 클라이언트가 어떤 요청을 했는지 파악하기
		String url=request.getRequestURI();
		//System.out.println(url);		
		String ctx=request.getContextPath();
		//System.out.println(ctx);		
		// 실제로 요청한 명령이 무엇이지 파악
		String command=url.substring(ctx.length());
		System.out.println(command); // /memberInsert.do
		// 요청에 따른 분기작업(if~ else if~)
		Controller controller=null;
		String nextPage=null;
		// 핸들러매핑->HandlerMapping
	    HandlerMapping mapping=new HandlerMapping();
	    controller=mapping.getController(command);
	    nextPage=controller.requestHandler(request, response);
		// forward, redirect
		if(nextPage!=null) {
			if(nextPage.indexOf("redirect:")!=-1) {
				//            redirect:/MVC04/memberList.do
				response.sendRedirect(nextPage.split(":")[1]); // redirect
			}else {
				RequestDispatcher rd=request.getRequestDispatcher(ViewResolver.makeView(nextPage)); // forward
				rd.forward(request, response);
			}
		}		
	}
}


```

![컨텍스트 패스 파악](/assets/20210531_142525.png)

`mvc04`가 컨텍스트 패스로 등록된다. 이 컨텍스트 이름 뒤에 있는 이름을 뽑아내어 실제 요청 명령을 파악한다.

![컨트롤러 통합](/assets/20210531_150907.png)

이전 MVC 정리에서는 컨트롤러가 여러 개였다면, 이번에는 **컨트롤러가 하나로 통합**된 것이 핵심 차이다.

여기서 FrontController가 해야 할 일을 대신할 컨트롤러를 추가하는데, 그것이 **POJO**다.

> FrontController가 모든 처리를 직접 다 하면 부하가 발생할 수 있다. FrontController는 **안내·보조원** 역할만 하고, 실제 업무는 POJO에 위임한다.

### POJO의 역할

![POJO 인터페이스 1](/assets/20210531_155319.png)

![POJO 인터페이스 2](/assets/20210531_160359.png)

`requestHandler` 기능을 넣어주기 위해 인터페이스를 하나 만든다.

![POJO가 할 일 1](/assets/20210531_162424.png)

`memberlist.do` 요청이 들어왔을 때 POJO가 처리하는 작업:

- **Model 연결** — DAO 호출
- **객체 바인딩** — VO 처리
- **뷰 페이지 경로 반환** — 결과 뷰 이름 리턴

![POJO가 할 일 2](/assets/20210531_164250.png)

![POJO가 할 일 3](/assets/20210531_165715.png)

> View 경로를 변경하면 반환값도 함께 바꿔야 한다.

![POJO가 할 일 4](/assets/20210531_180222.png)

### HandlerMapping

![HandlerMapping](/assets/20210531_205927.png)

특정 핸들러(요청)가 들어오면 대응하는 컨트롤러(POJO)가 실행된다.

### FrontController 흐름 요약

1. `memberList.do` 요청이 FrontController에 도착
2. **HandlerMapping**이 키(요청 URL)로 해당 POJO를 조회해 반환
3. FrontController가 POJO에 처리를 위임
4. POJO가 결과 뷰 경로를 반환
5. FrontController가 Forward 또는 Redirect로 응답

> 스프링에서는 이 FrontController가 이미 **DispatcherServlet**으로 구현되어 제공된다. (Spring MVC의 상세 동작은 별도 문서에서 다룬다.)

---

## 3-Tier 아키텍처 (Presentation · Business · Persistence)

![3-Tier 개요](/assets/20210622_003720.png)

클라이언트 요청이 오면 컨트롤러가 받아서 Mapper의 메서드를 호출한다. 이 사이에 **중간 레이어(서비스 계층)** 를 두면 역할을 더 명확하게 분리할 수 있다.

### Presentation Tier — 웹·화면 계층

- **Controller** (FrontController + POJO) 담당
- 클라이언트 요청 URL과 처리 메서드를 아래와 같이 매핑한다.

| 요청 URL | 메서드 |
|---|---|
| `/memberList.do` | `memberList` |
| `/memberInsert.do` | `memberInsert` |

### Business Tier — 서비스 계층

- 비즈니스 로직이 가장 많이 동작하는 계층
- DAO 없이 **Mapper**를 직접 사용하며, 기존 DAO의 역할을 여기서 수행
- **고객의 요구사항**을 반영하는 계층
- 메서드 이름은 현실적인 로직 이름을 붙이는 것이 관례

| 동작 | 메서드 이름 예시 |
|---|---|
| 회원 등록 | `insert` |
| 회원 검색 | `get` |
| 회원 수정 | `modify` |
| 전체 목록 조회 | `getList` |

### Persistence Tier — 영속 계층 (DB 관점, DAO)

- 데이터에 대한 **CRUD** 처리 담당
- **VO 클래스**: 테이블 설계를 기준으로 작성 (예: `MemberVO`, `BoardVO`)
- **Mapper 인터페이스** + XML 파일로 구성 (두 파일 모두 존재해야 함)
- 메서드 이름은 DB 기준으로 설계

| 동작 | 메서드 이름 |
|---|---|
| 생성 | `insert` |
| 조회 | `read` |
| 수정 | `update` |
| 삭제 | `delete` |

![3-Tier 메서드 매핑](/assets/20210622_014100.png)

---

## 객체 바인딩(Object Binding)

컨트롤러에서 JSP로 데이터를 전달할 때는 **공유 메모리 공간(Scope)**에 데이터를 넣어두는 방식을 사용한다.

- **저장**: `setAttribute("key", value)` — 특정 스코프에 데이터를 바인딩한다.
- **조회**: `getAttribute("key")` — 주소(키)를 알면 바인딩된 데이터를 꺼낼 수 있다.

> **컨트롤러와 뷰가 포워딩될 때 데이터를 주고받으려면, 특정 메모리 공간에 데이터를 집어넣어야 하는데 이를 객체 바인딩이라 한다.**

`RequestDispatcher`(요청 의뢰)와 객체 바인딩이 포워드의 핵심이다.

![RequestDispatcher와 객체 바인딩](/assets/20210531_014151.png)

---

## Forward vs Redirect

### 개념 비교

**Forward**는 Web Container 차원에서 페이지를 이동한다. 웹 브라우저는 이동 사실을 알 수 없으므로 URL이 최초 호출 URL 그대로 유지된다. 현재 페이지와 Forward로 호출되는 페이지는 **Request·Response 객체를 공유**한다.

> 주의: 글쓰기처럼 시스템에 변화가 생기는 요청에 Forward를 쓰면, 새로고침 시 요청 정보가 살아있어 **게시물이 중복 등록**될 수 있다. 단순 조회(글 목록, 검색)에만 Forward를 사용하는 것이 바람직하다.

**Redirect**는 Web Container가 브라우저에게 다른 페이지로 이동하라는 명령을 내린다. 브라우저는 URL을 지시된 주소로 바꾸고 해당 주소로 **새 요청**을 보낸다. 새로운 페이지에서는 Request·Response 객체가 새롭게 생성된다.

> 글쓰기·회원가입처럼 **시스템에 변화가 생기는 요청**에는 Redirect를 사용해야 새로고침 시 중복 처리를 막을 수 있다.

출처: https://mangkyu.tistory.com/51

### Forward/Redirect 판단 코드

```
if(nextPage!=null) {
			if(nextPage.indexOf("redirect:")!=-1) {
				//            redirect:/MVC04/memberList.do
				response.sendRedirect(nextPage.split(":")[1]); // redirect
			}else {
				RequestDispatcher rd=request.getRequestDispatcher(ViewResolver.makeView(nextPage)); // forward
				rd.forward(request, response);
			}
		}		
```

FrontController에서 nextPage 값에 `"redirect:"` 문자열이 있으면 Redirect, 없으면 Forward로 처리한다.

![Forward/Redirect 판단](/assets/20210531_211313.png)

### Redirect로 페이지 전환

리다이렉트는 쿼리스트링(GET 방식)으로 데이터를 넘긴다.

![Redirect 방식 페이지 전환](/assets/20220403_040612.png)

### Forward 방식으로 페이지 전환

객체 바인딩을 사용해 JSP에서 데이터를 가져간다. Redirect 대신 사용하는 방식이다.

![Forward 방식 페이지 전환](/assets/20220403_040643.png)

### 포워드와 객체 바인딩 예제

![포워드 기본 예제](/assets/20210531_020314.png)

단순 포워드는 여러 개의 정보(예: 회원 정보)를 넘기기 어렵다는 단점이 있다.

![리다이렉트로 데이터 전달](/assets/20210531_020613.png)

리다이렉트 기법으로 페이지를 전환하거나, 포워드 기법으로 데이터를 넘길 수 있다.

![리다이렉트 + 쿼리스트링 예제](/assets/20210531_023229.png)

리다이렉트 기법으로 페이지를 전환하고 GET 방식의 쿼리스트링(querystring)으로 데이터를 전달하는 예제다.

### 리다이렉트 복습

![리다이렉트 흐름 복습](/assets/20210531_024626.png)

URI 상에서는 컨트롤러 주소가 나타나지 않는다(JSP가 직접 노출되지 않음).

포워딩은 서버 내부에서만 이루어지므로 클라이언트 브라우저에는 JSP의 존재가 보이지 않는다.

![포워드 내부 처리 흐름](/assets/20210531_025430.png)

**서버에서만 이루어지고, 클라이언트 브라우저는 JSP의 존재를 알 수 없다 — 이것이 포워드 방식이다.**

![컨트롤러(좌) / 뷰(우) 코드 비교](/assets/20210531_025809.png)

왼쪽이 컨트롤러, 오른쪽이 뷰(JSP)다. 컨트롤러가 JSP에 `RequestDispatcher`로 요청을 처리한다.

![포워드 방식 전체 흐름](/assets/20210531_033634.png)

포워드 방식으로 페이지를 전환하고, 객체 바인딩으로 값을 JSP에서 가져오는 전체 흐름이다.

![포워드 서버 처리 확인](/assets/20210531_035225.png)

서버 단에서만 이루어져 클라이언트에서는 알 수 없다.

> 참고: JDBC 연결 시 MySQL 버전과 JDBC 커넥터 버전이 맞는지 확인해야 한다.  
> - https://higugu.tistory.com/entry/commysqljdbcexceptionsjdbc4MySQLNonTransientConnectionException-Could-not-create-connection-to-database-server  
> - https://cho001.tistory.com/152  
> (MySQL 8.0.22에는 커넥터 8 버전을 사용해야 DB가 연결된다.)

![전형적인 MVC 구조 코드](/assets/20210531_092643.png)

![MVC 흐름도](/assets/20210531_095950.png)

MVC 흐름도 전체 요약.

---

## 곁가지 — JDBC · MIME

### JDBC(Java Database Connectivity) 개요

각 데이터베이스 연결을 위한 API가 제각각이면 개발 부담이 크다. 이 문제를 해결하기 위해 자바에서 **JDBC API**라는 공통 인터페이스를 만들고, 각 DB 벤더가 별도의 구현 클래스(드라이버)를 제공한다.

![JDBC 1](/assets/20210331_041749.png)

![JDBC 2](/assets/20210331_042019.png)

![JDBC 3](/assets/20210331_042829.png)

![JDBC 4](/assets/20210331_042945.png)

![JDBC 5](/assets/20210401_003400.png)
![JDBC 6](/assets/20210401_003538.png)

### MIME 타입

서버에서 클라이언트로 응답을 전송할 때 지정하는 **MIME(Multipurpose Internet Mail Extensions) 타입**:

![MIME 타입](/assets/20210402_021810.png)

---

## JSTL (JSP Standard Tag Library)

JSP는 자신만의 커스텀 태그를 추가할 수 있는 기능을 제공한다. **JSTL**은 `if`, `for`, DB 처리 등을 편하게 처리하는 표준 태그 라이브러리다.

| 라이브러리 | Prefix | URI | 주요 기능 |
|-----------|--------|-----|-----------|
| **Core** | `c` | `http://java.sun.com/jsp/jstl/core` | 변수 선언, 흐름 제어, 페이지 이동 |
| **Formatting** | `fmt` | `http://java.sun.com/jsp/jstl/fmt` | 숫자·날짜·시간 포매팅, 국제화 |
| **DataBase** | `sql` | `http://java.sun.com/jsp/jstl/sql` | DB 입력·수정·삭제·조회 |
| **XML** | `x` | `http://java.sun.com/jsp/jstl/xml` | XML 문서 처리 |
| **Function** | `fn` | `http://java.sun.com/jsp/jstl/functions` | 문자열 함수 |

> 출처: https://hunit.tistory.com/203 [HunIT Blog]

![JSTL 사용 예시](/assets/20210531_133256.png)

---

## EL (Expression Language)

`<%= %>`, `out.println()` 같은 자바 코드 대신 더 간편하게 출력을 지원하기 위한 도구다. 배열·컬렉션·JavaBean 프로퍼티에서도 사용 가능하다.

**문법**

- Attribute 형식: `<%= cnt + 1 %>` → `${cnt + 1}`
- Parameter 형식: `${param.abc}`

값을 찾을 때 Attribute는 작은 스코프에서 큰 스코프 순서로 탐색한다.

> `page` → `request` → `session` → `application`

| 스코프 | 저장 | 조회 | 삭제 |
|--------|------|------|------|
| PageContext / Request | `setAttribute("key", value)` | `getAttribute("key")` | `removeAttribute("key")` |
| Session | 동일 | 동일 | `invalidate()` (전체 삭제) |

> 출처: https://hunit.tistory.com/203 [HunIT Blog]

![EL 사용 예시](/assets/20210531_133247.png)
