---
title: "[Backend] Servlet과 JSP — 웹 서버 동작 원리부터 MVC 구조까지"
date: 2021-03-29
category: "Backend"
tags: ["Backend"]
description: "Web Server·WAS·Servlet·JSP의 역할을 구분하고, HttpServlet 요청 처리 흐름(Request/Response·doGet/doPost)과 JSP 스크립트 요소, sendRedirect vs. forward 차이를 정리한 학습노트."
permalink: "class/2021/03/29/Servlet,JSP"
---

## Web Back-End: Servlet / JSP 연동 구조

서버 단에서 실행하는 가장 대표적인 기술 스택이다.
DB를 HTTP 프로토콜로 직접 사용하는 것은 불가능하므로, Java와 DB 프로토콜을 연결하는 **JDBC**를 사용한다.

![Servlet-JSP-JDBC 전체 구조](/assets/20210329_092944.png)

클라이언트가 서버에 **요청(Request)**을 보내며, 이때 함께 전달되는 데이터를 **파라미터**라 한다.

- **Web Server (HTTP 서버)**: HTML·CSS·JS 등 정적 파일만 처리
- **Application Server**: Logic 처리 담당 (비즈니스 로직, 데이터베이스 로직)
- **WAS (Web Application Server)**: Web Server + Application Server 통합

> 톰캣(Tomcat)은 WAS 역할을 하며 두 가지를 모두 처리할 수 있다.

---

## Java EE와 Servlet

일반 Java SE(Standard Edition)가 아닌, 웹에서 수행되는 **Java EE(Enterprise Edition)**를 사용해야 한다.

- **Servlet**: 웹에서 동작하는 Java. Java EE에서 제공
- **JSP**: Servlet만으로 처리하기 방대한 부분을 해결하기 위해 등장 (문법 유사)
- **JDBC**: RDBMS와 연결하는 역할

![Java EE / Servlet 구조](/assets/20210329_093514.png)

사이트를 배포할 때는 설정 파일인 `web.xml`로 서버 구성을 정의한다.

![web.xml 설정 화면](/assets/20210329_093754.png)

> Servlet 3.0 이상부터는 `web.xml` 대신 **Annotation**(`@WebServlet` 등)을 사용한다.

---

## Servlet 생명주기 메서드

![Servlet 메서드 5종](/assets/20210329_094159.png)

Servlet을 implement하면 톰캣이 자동으로 호출하는 메서드 5개가 있다.

| 메서드 | 설명 |
|---|---|
| `destroy()` | 서블릿이 서버에서 제거될 때 자원 해제 (톰캣 종료 시 호출) |
| `init()` | `destroy()`의 반대, 서블릿 초기화 |
| `getServletInfo()` | 서블릿의 정보를 반환 |
| `getServletConfig()` | 설정 정보를 반환 |
| `service()` | **가장 중요**. 클라이언트 요청(request)·응답(response)을 모두 처리 |

`service()` 메서드는 반드시 구현해야 한다. 불편함을 줄이기 위해 **`GenericServlet`을 상속**받고 `service()` 메서드를 오버라이드한다.

![GenericServlet 상속 예시](/assets/20210329_094551.png)

---

## GET / POST 방식

Form 데이터를 서버에 전송하는 방식은 두 가지다.

| 방식 | 특징 |
|---|---|
| **GET** | URL 뒤에 `?`로 데이터 포함. 길이 제한·노출 위험 |
| **POST** | Body에 포함. 길이 제한 없고 노출 위험 감소 |

![GET/POST 처리 방식 비교](/assets/20210329_095042.png)

GET·POST에 따라 처리 방식이 달라지는 HTTP 환경에서는 `GenericServlet` 대신 **`HttpServlet`**을 사용한다.

![HTTP 전용 서블릿 구조](/assets/20210329_095110.png)

![HttpServlet 클래스](/assets/20210329_095146.png)

![HttpServlet 추상메서드](/assets/20210329_095204.png)

> `HttpServlet`은 추상메서드가 없는 추상클래스이므로, 메서드 중 하나 이상만 오버라이드하면 된다.

![URL 매핑 설정](/assets/20210329_095252.png)

---

## URL 매핑과 페이지 이동

URL 패턴 매핑은 생성한 클래스 이름과 동일하게 지정한다.

![URL 매핑 예시 1](/assets/20210329_095433_qiaqmtfet.png)

![URL 매핑 예시 2](/assets/20210329_095417.png)

![URL 매핑 예시 3](/assets/20210329_095433.png)

![응답 출력 메서드](/assets/20210329_100146.png)

상위 클래스의 메서드를 사용하면 출력이 가능하다.

URL에서 root context 설정 후 매핑한 경로로 접근한다.

![root context 설정](/assets/20210329_100146_z9y5bbs1k.png)

![URL 패턴 매핑](/assets/20210329_100345.png)

![매핑 결과 확인](/assets/20210329_100345_eph8geqlr.png)

GET/POST 방식에 따라 `doGet` / `doPost` 처리 분기가 결정된다.

**서블릿의 역할**:
1. 클라이언트가 보낸 데이터(파라미터) 획득
2. 그 데이터로 비즈니스 로직 처리
3. 응답 페이지(HTML) 생성

---

## 파라미터 처리

![URL 파라미터 예시](/assets/20210329_100515.png)

URL 패턴 `singleparam.do`를 찾아 처리한다.

![파라미터 getParameter 예시](/assets/20210329_103913.png)

![파라미터 처리 코드 1](/assets/20210329_104618.png)

![파라미터 처리 코드 2](/assets/20210329_104629.png)

![파라미터 처리 코드 3](/assets/20210329_104636.png)

![파라미터 처리 코드 4](/assets/20210329_104646.png)

![파라미터 처리 코드 5](/assets/20210329_104653.png)

![파라미터 처리 코드 6](/assets/20210329_104701.png)

서블릿에서는 파라미터를 구분하는 메서드가 존재한다.

![파라미터 구분 메서드](/assets/20210329_104701_9cf6qtck6.png)

실행하면 URL이 다음처럼 인코딩된다.
```
http://localhost:8080/backend/singleparam.do?userid=cyh1219&username=%EC%A1%B0%EC%96%91%ED%9B%88&area=0
```
브라우저가 URL 인코딩을 자동으로 처리한다.

---

## 한글 처리

![한글 처리 설정](/assets/20210329_111218.png)

POST 방식에서 한글이 깨지는 경우가 있다.
**GET·POST 방식별 한글 처리 방법**을 반드시 기억하자.

![한글 처리 코드](/assets/20210329_111735.png)

- 파라미터가 하나: `getParameter(name)` 사용
- 파라미터가 여러 개(checkbox 등): `getParameterValues(name)` 사용

---

## JSP (JavaServer Pages)

![웹 3대 기술](/assets/20210329_112110.png)

웹에서 HTML·CSS·JS 세 가지는 빠질 수 없다.

![JSP 처리 과정](/assets/20210329_112212.png)

JSP는 Servlet으로 변환되는 과정이 있으므로 **최초 1회**만 변환 작업이 일어나고, 이후에는 서블릿 메서드만 호출된다.

- JSP: 스크립트 기반 언어 문법 + 실행 시 컴파일 언어(Java) 방식 → **두 언어의 장점을 모두 활용**

---

## JSP 스크립트 요소

![JSP 지시어(Directive) 예시](/assets/20210329_113135.png)

**메서드 영역 선언부**

![선언부 예시](/assets/20210329_112952.png)

`!`로 선언한다는 점이 중요하다.

![스크립트릿(Scriptlet) 예시](/assets/20210329_112807.png)

응답 페이지는 태그 밖에 HTML 태그로 작성하면 된다.
`Data get`, `Logic`, `response` 객체 등을 사용할 수 있다.

![표현식(Expression) 예시](/assets/20210329_113235.png)

![JSP 주석 비교](/assets/20210329_113258.png)

Java 주석 / HTML 주석 / JSP 주석의 차이를 확인하자.

---

## JSP 기본 객체

![JSP 기본 객체 목록](/assets/20210330_092756.png)

![기본 객체 세부 설명](/assets/20210330_094028_eqora59ai.png)

- `pageContext`: Java 객체를 담거나 `forward`·`include` 시 사용
- `application`: 애플리케이션 전체 공유 객체

![pageContext 사용](/assets/20210330_094105.png)

![application 사용](/assets/20210330_094250.png)

![기본 객체 스코프 비교](/assets/20210330_095111.png)

**`ServletConfig`**: 설정 정보를 가져올 때 사용

![ServletConfig 예시](/assets/20210330_095539.png)

![기본 객체 정리](/assets/20210330_100031.png)

---

## 실습: 방명록(GuestBook) 연동

![방명록 테이블 SQL 에러](/assets/20210330_102342.png)

서블릿 작성 중 테이블 SQL을 다 작성했는데 에러 발생 — 원인 확인:

![JDBC 연결 오류 원인](/assets/20210330_102416.png)

`guestBookWrite.java`의 JDBC 연결 id/pw가 틀려서 연결이 안 된 것이었다. 수정 후 해결.

![연결 성공 확인](/assets/20210330_102524.png)

`init()` 메서드로 드라이버 로딩

![init 드라이버 로딩](/assets/20210330_102850.png)

![Refactor Rename 사용](/assets/20210330_102927.png)

블록 선택 후 `Refactor → Rename`을 사용하면 프로젝트 안에서 참조하던 모든 곳을 한 번에 변경할 수 있다.

![WAR Export](/assets/20210330_103147.png)

`WAR`로 export하면 WAS가 관련 파일들(html, js, jsp 등)을 알아서 처리한다.

---

## MySQL Connector 라이브러리 배치

![JSP 연결 오류 — mysqlconnector 없음](/assets/20210330_103715.png)

JSP에서 DB 연결 시 `mysqlconnector`가 없어서 오류 발생. 서블릿 프로젝트에만 포함된 jar를 JSP는 찾지 못한다.

해결 방법: **WAS 라이브러리 디렉터리에 jar 파일을 배치**

![WAS 라이브러리 경로](/assets/20210330_103715_7qxibzy71.png)

모든 프로젝트가 DB를 사용하는 것은 아니므로 우선 WAS에 배치한다.
(Maven을 사용하면 나중에 동적으로 다운로드 가능)

![jar 배치 경로 확인](/assets/20210330_103945.png)

---

## 서블릿 → JSP 변환

![DBServlet JSP 변환 1](/assets/20210330_104342.png)

![DBServlet JSP 변환 2](/assets/20210330_105211.png)

서블릿(Java) 파일의 내용을 그대로 JSP 안으로 옮길 수 있다.

![JSP 적용 결과](/assets/20210330_105504.png)

이 아래에서 조금 바뀐다.

![JSP 변환 후 차이점](/assets/20210330_105918.png)

---

## 페이지 이동: sendRedirect vs. forward

### sendRedirect

`response.sendRedirect(location)`

- 기존 요청 정보를 **버리고** 새로 고침 후 이동
- `location`은 **URL** 사용 → 어디든 이동 가능 (외부 URL 포함)
- 데이터 전달 시 **쿼리 스트링**으로 전달

![sendRedirect 예시](/assets/20210330_105935.png)

네이버 URL을 넣어도 이동된다.

![sendRedirect URL 이동](/assets/20210330_110221.png)

`sendRedirect`는 **풀 URL**을 사용해야 한다. (중요!)
프로젝트나 경로가 바뀔 때마다 수정이 번거로우므로, `getContextPath()`로 루트 컨텍스트를 동적으로 가져오자.

![getContextPath 사용](/assets/20210330_110337.png)

![sendRedirect 전체 URL 예시](/assets/20210330_110357.png)

파란색으로 표시된 부분이 빠지면 안 된다.

![풀 URL 필요 예시](/assets/20210330_110437.png)

![루트 컨텍스트 동적 설정](/assets/20210330_110518.png)

![동적 컨텍스트 결과](/assets/20210330_110549.png)

실제 톰캣 접근 시에는 `guestbookjsp`를 포함한 경로로 접근해야 한다.

![getContextPath 재확인](/assets/20210330_110518.png)

`getContextPath()`를 사용하면 동적으로 받아와 수정이 필요 없다.

---

### forward

`RequestDispatcher.forward(request, response)`

- 기존 **request·response를 그대로 전달** (포워딩)
- `path`에는 **프로젝트 내부 파일 경로**만 가능 (외부 URL 불가)
- forward 시 `path`에 contextPath를 포함하면 안 됨 (쓰면 안됨!)

![forward 예시](/assets/20210330_110837.png)

| 구분 | sendRedirect | forward |
|---|---|---|
| 이동 방식 | 클라이언트가 새 요청 | 서버 내부 전달 |
| URL | 모든 URL 가능 | 프로젝트 내부만 |
| Request 유지 | X (버림) | O (유지) |
| contextPath | 필요 | 불필요 (넣으면 오류) |

---

## 서블릿 URL 매핑 전략

`join.jsp`가 5군데 있을 때, 파일명을 `register.jsp`로 바꾸면 5군데를 모두 수정해야 한다.

> **원칙**: 링크 클릭 시 JSP를 직접 이동시키지 말고, **항상 서블릿을 통해 이동**한다.

![서블릿 통한 이동 패턴](/assets/20210330_113125.png)

하나의 메서드로 GET·POST를 모두 처리하는 방식:
- GET: request를 그대로 전달
- POST: request에 값을 세팅한 뒤 전달

---

## JSP 지시어 (Directive)

서블릿만으로는 불편해서 JSP가 ASP처럼 쉽게 백엔드를 구성할 수 있도록 등장했다.

![JSP 등장 배경](/assets/20210329_123707.png)

![JSP 지시어 형식](/assets/20210329_123917.png)

**지시어**: `<%@` 로 시작하고 끝나며, `@` 뒤에 `page` / `include` / `taglib` 중 하나가 온다.

![JSP 지시어 속성](/assets/20210330_130855.png)

`import` 속성을 제외한 속성은 **중복 선언 시 에러**. (`import`는 여러 개 허용)

![지시어 page 속성 목록](/assets/20210330_131216.png)

![지시어 include 예시](/assets/20210330_131332.png)

![지시어 taglib 예시](/assets/20210330_131446.png)

설명을 달 때는 `info` 속성을 사용한다.

![page info 속성](/assets/20210330_132024.png)

![에러 페이지 설정](/assets/20210330_132327.png)

![errorPage 설정 예시](/assets/20210330_132346.png)

`throwable` 타입 하위에 `error`, `exception`이 있다.

![throwable 계층 구조](/assets/20210330_132940.png)

---

## include 지시어 vs. include 액션

하나의 파일 안에 다른 파일을 포함시키는 방법은 두 가지다.

![include 지시어 예시](/assets/20210330_133148.png)

- **include 지시어**: 포함 시 내용을 **복사·붙여넣기** → 포함되는 파일이 자주 바뀌지 않을 때 적합
- **include 액션**: 매번 포함 시점에 동적으로 가져옴 → 포함 파일이 자주 바뀔 때 적합

`in.jsp` 내용이 수정되었을 때: 지시어로 포함했다면 `a.jsp`도 다시 컴파일해야 반영된다.

---

## JSP 스크립트 요소 정리

![스크립트 요소 3종 개요](/assets/20210330_134606.png)

![스크립트 요소 상세](/assets/20210330_134624.png)

변수 이름이나 메서드를 출력한 후 값 출력 — **스크립트릿(Scriptlet)**

![스크립트릿 예시](/assets/20210330_134800.png)

> `<% %>` 안에는 자바 코드를 자유롭게 작성할 수 있지만, 스크립트릿은 전체에서 **최소한**으로 줄여야 한다.

`let`은 의미상 '작은 스크립트'를 뜻한다 (piglet·owlet처럼 축소 접미사).

JSP 변환 시 자바 사이즈가 늘어나는데, 스크립트 요소 3가지가 그 원인이다.

---

## 정적 리소스(HTML·CSS·JS) 위치

![정적 리소스 위치](/assets/20210329_184310.png)

정적 파일은 모두 **Web Server(WS)** 에 배치한다.

![HTTP 1.1 포트 설정](/assets/20210329_185407.png)

현재 HTTP 1.1 버전 사용, 포트 번호 8080

![컨테이너·컴포넌트 개념](/assets/20210329_185713.png)

**컨테이너(Container)**와 **컴포넌트(Component)** 개념을 이해해야 한다.

---

## Servlet 요청·응답 처리 흐름

### 서블릿이란?

- **웹 컨테이너에서 실행**되며, 동적 컨텐츠를 생성하기 위한 자바 클래스

**서블릿 프로그램 장점**:
1. 플랫폼 독립성
2. 서버 독립성
3. 확장성
4. 개발 용이

![서블릿 임포트 구조](/assets/20210329_124401.png)

직접 import하지 않아도 자동 import되지만 기억은 해두자.

---

### HTTP 요청 구조

![HTTP 요청 구조 1](/assets/20210329_132428.png)

![HTTP 요청 구조 2](/assets/20210329_132439.png)

맨 위 흰 줄이 **요청 줄**, 그 아래로 **body**가 들어간다.

![파라미터 전달 위치](/assets/20210329_132701.png)

파라미터가 어디에 담겨서 전달되는지 확인.

![파라미터 처리 흐름](/assets/20210329_132855.png)

---

### 톰캣의 요청 처리 흐름

![요청 처리 흐름 1](/assets/20210329_133001.png)

클라이언트가 요청을 보내면 톰캣이 **HttpRequest·HttpResponse 객체**를 생성한다.
- `Request`: 요청 정보가 담김
- `Response`: 아직 비어 있음

![스레드 생성](/assets/20210329_133304.png)

톰캣이 **스레드(Thread)**를 생성하고 Request·Response를 전달한다. 클라이언트 수만큼 스레드가 생성된다.

![service 메서드 실행](/assets/20210329_133346.png)

스레드가 `service()` → `doGet()` 실행 → 결과를 `Response`에 담아 출력한다.

![응답 전달](/assets/20210329_133421.png)

![요청·응답 종료](/assets/20210329_133428.png)

응답을 클라이언트에게 보내고 사용했던 스레드·객체를 제거한다.

---

### JSP 페이지 처리 과정

JSP와 서블릿은 같은 일을 할 수 있으며, 일반적으로 **MVC 패턴**으로 역할을 나눠 사용한다.

규칙에 따라 톰캣이 JSP를 서블릿(Java)으로 자동 변환한다.

JSP도 언어이므로 **문법이 존재**한다.

![JSP 요소 분류](/assets/20210330_130153.png)

JSP의 element는 3가지로 분류된다.

![JSP 요소 3종](/assets/20210330_130341.png)

**식 언어(Expression Language)**는 뒤에서 다룬다.

---

## URL 매핑 심화

![HelloServlet 주소창 표기](/assets/20210329_190641.png)

`HelloServlet`은 주소창에 표기된다. GET 방식은 주소창 직접 입력 가능, POST는 불가.

```java
//@WebServlet("/HelloServlet")
//@WebServlet(value = {"/hello","/sub/hello","hello2"})  // 슬래시 다음 hello, sub/hello, hello2 가 오면 모두 이 서블릿이 처리
@WebServlet(value = {"/board","/board/","hello2"})
public class HelloServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

//    public HelloServlet() {
//        super();
//        // TODO Auto-generated constructor stub
//    }
```

**REST API** 방식: GET으로 board 요청, POST로 board 요청을 구분한다.

URL 매핑은 절대 헷갈리지 말자. 클라이언트가 어떤 주소를 입력하느냐에 따라 적절한 서버 자원을 매칭시키는 것이 **URL 매핑**이며, 매우 중요하다.

![서버 실행 오류 예시](/assets/20210329_192149.png)

서버를 띄우지 못하면 실행할 수 없다.
톰캣 **404·403·500** 오류를 보고 이해하고 해결할 줄 알아야 한다.

![톰캣 오류 화면](/assets/20210329_192149_tzsxa4aic.png)

![404 에러 예시](/assets/20210329_193512.png)

---

> 기본적으로 웹은 **멀티스레드** 환경이므로, 다양한 동시 접근 상황을 항상 고려해야 한다.
