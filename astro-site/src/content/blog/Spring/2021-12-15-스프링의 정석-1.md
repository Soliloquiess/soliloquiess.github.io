---
title: "[Spring] 스프링의 정석 1 — 톰캣·MVC·DI·AOP·MyBatis 핵심 개념 정리"
date: 2021-12-03
category: "Spring"
tags: ["Spring"]
description: "톰캣 내부 구조, Spring MVC 요청 처리 흐름, DI·IoC 원리, AOP 개념, MyBatis 연동, REST API까지 스프링의 정석 강의 1회차 핵심 내용을 정리한다."
permalink: "study/2021/12/03/스프링의-정석-1"
---

![20211223_114843](/assets/20211223_114843.png)

- `static`이 아니면 객체를 생성해야 한다.
- `static`이면 객체를 생성할 필요가 없다.
- 브라우저와 WAS(Web Application Server)가 있어야 원격 프로그램을 실행할 수 있다.

![20211223_115206](/assets/20211223_115206.png)

**인스턴스 메서드** = 객체 생성 후 호출.

```java
public class Hello {
	//2.URL과 메서드를 연결
	@RequestMapping("/hello")
	public static void main() {//static넣어도 되긴 하는데 안넣어도 됨.
		System.out.println("HELLO");
	}
}
```

인스턴스 메서드 호출이 가능하다는 것은 중간에 누군가 객체 생성을 해준다는 의미다(톰캣이 내부적으로 객체 생성을 해준다).

---

`HttpServletRequest`의 메서드를 활용한다.

![20211223_135419](/assets/20211223_135419.png)

**쿼리 스트링(Query String)** — 값 전달 시 사용한다.

![20211223_135719](/assets/20211223_135719.png)

`&` 기호를 이용해서 값을 여러 개 보낼 수 있다.

- **클라이언트**: 서비스를 요청하는 애플리케이션
- **서버**: 서비스를 제공하는 애플리케이션

브라우저에서 URL을 입력해 요청하면 해당 서버의 톰캣이 받아서 객체를 생성하고 분류해서 저장한 뒤, 메서드의 매개변수로 전달한다. 스프링은 우리가 원하는 대로 자동으로 저장해 둔다.

쿼리 스트링은 **name=value** 형태로 값들이 붙어있다.

![20211223_203825](/assets/20211223_203825.png)

![20211223_210606](/assets/20211223_210606.png)

1대의 PC에 여러 서버 프로그램이 있을 수 있다. IP 주소만으로는 구분이 안 되므로 **포트 번호**로 구분한다.

| 구분 | 설명 |
|------|------|
| **Web Server** | 정적 웹을 서비스 |
| **WAS(Web Application Server)** | 웹 애플리케이션을 서비스하는 서버 |

---

### 톰캣의 내부 구조

8080 포트로 요청이 들어오면 **스레드 풀(Thread Pool)**에 사용자 요청이 들어간다. 미리 만들어둔 한가한 스레드가 그 요청을 처리한다.

서비스가 요청을 처리하는데, 그 안에 **커넥터(Connector)**가 있다. 프로토콜 종류에 따라 처리하는 커넥터가 달라진다.

서버 안에 서비스가 있고, 서비스 안에 **엔진(Engine)**이 있다. 엔진 안에 여러 **호스트(Host)**가 있고, 하나의 톰캣 서버에 여러 가상 호스트가 공존할 수 있다.

![20211223_211818](/assets/20211223_211818.png)

**컨텍스트(Context)** = 웹 애플리케이션 = STS 프로젝트 하나에 해당한다. 각 컨텍스트는 서로 영향을 주지 않는 독립적인 공간에서 동작한다.

그 안에 **서블릿(Servlet)**이 있다.

> **서블릿**: 서버에서 실행되는 작은 서버 프로그램. 컨트롤러와 같은 개념으로 볼 수 있다.

서블릿은 같은 컨텍스트 안에서 동작한다.

**정리:** 톰캣 서버 → 서비스 → 엔진 → 호스트(여러 개 가능) → 컨텍스트(여러 개 가능) → 서블릿

---

스레드 풀의 요청을 받아서 엔진에 전달하고, 호스트를 거쳐 컨텍스트로 전달된다. **DispatcherServlet**이 받아서 해당 메서드를 호출한다.

---

### 톰캣 설정 파일 위치

| 파일 | 역할 |
|------|------|
| `{톰캣설치경로}/conf/server.xml` | 톰캣 서버 설정 파일 |
| `{톰캣설치경로}/conf/web.xml` | 톰캣의 모든 웹 앱 공통 설정 |
| `{웹앱이름}/WEB-INF/web.xml` | 웹 앱 개별 설정 |

STS·IntelliJ에서는 `src/webapp/WEB-INF/web.xml`

![20211223_214556](/assets/20211223_214556.png)

![20211223_215340](/assets/20211223_215340.png)

STS에는 `web.xml`이 두 개 있다. 하나는 **공통 설정**, 하나는 **개별 설정**이다.

> `@Controller`와 `@RequestMapping`은 스프링에서 사용하고, 서블릿에서는 `@WebServlet`을 사용한다.

![20211223_220153](/assets/20211223_220153.png)

위처럼 URL 매핑을 XML로 하던 방식이 너무 길고 불편해서 **어노테이션 기반**으로 변경되었다.

---

## 프로토콜

서로 간의 통신을 위한 약속·규칙. 주고 받을 데이터의 형식을 정의한 것.

### HTTP란?

- 단순하고 읽기 쉽다 — **텍스트 기반 프로토콜**
- **상태를 유지하지 않는다(stateless)** — 클라이언트 정보를 저장하지 않음
- **확장 가능하다** — 커스텀 헤더(Header) 추가 가능

클라이언트 요청이 들어와도 이전 요청과 동일한 클라이언트인지 알 수 없다. 이를 보완하기 위해 **쿠키(Cookie)**와 **세션(Session)**이 등장했다.

HTTP 메서드는 편지와 비슷하다.

![20211223_222725](/assets/20211223_222725.png)

![20211223_223353](/assets/20211223_223353.png)

네트워크 탭에서 헤더가 나뉘어 보이는 것을 확인할 수 있다.

![20211223_225820](/assets/20211223_225820.png)

---

| 구분 | 설명 |
|------|------|
| **바이너리 파일** | 문자와 숫자가 저장된 파일. 데이터를 있는 그대로 읽고 쓴다 |
| **텍스트 파일** | 문자만 저장된 파일. 숫자를 문자로 변환 후 쓴다 |

**MIME(Multipurpose Internet Mail Extensions)**: 텍스트 기반 프로토콜에서 바이너리 데이터를 전송하기 위해 고안된 규약. HTTP의 `Content-Type` 헤더에 데이터 타입을 명시할 때 사용한다.

---

### Base64

바이너리 데이터를 텍스트 데이터로 변환할 때 사용한다. 64진법은 `'0'~'9'`, `'A'~'Z'`, `'a'~'z'` 등 64개 문자로 구성(6비트 단위)된다.

---

# Spring MVC

### 1. 관심사의 분리 (Separation of Concerns)

#### OOP 5대 원칙

1. **SRP(Single Responsibility Principle)**: 단일 책임의 원칙 — 하나의 메서드는 하나의 책임

![20211224_000233](/assets/20211224_000233.png)

공통 코드의 분리 → 입력의 분리 → 출력의 분리 → 변하는 것과 변하지 않는 것의 분리

| 역할 | 담당 |
|------|------|
| **Controller** | 요청을 처리하는 곳 |
| **View** | 결과를 보여주는 곳 |
| **Model** | 실제 데이터가 오가는 곳 |

![20211224_002303](/assets/20211224_002303.png)

코드를 분리해서 전달하기 위해 **Model**이 필요하다.

---

**DispatcherServlet**이 입력을 받으면 해당 컨트롤러에 요청을 전달한다. 컨트롤러의 처리 결과를 다시 받아 View에 전달한다.

![20211224_003012](/assets/20211224_003012.png)

Model이 컨트롤러에 주어지면 컨트롤러는 결과를 Model에 저장한다. View는 전달받은 Model을 이용해 응답을 만들어 클라이언트에 전송한다. 이것이 단순화된 MVC 구조다.

![20211224_003340](/assets/20211224_003340.png)
![20211224_010900](/assets/20211224_010900.png)

---

## 서블릿과 JSP

### 서블릿의 생명주기

![20211225_161649](/assets/20211225_161649.png)

서블릿은 **싱글톤(Singleton)**이다. 인스턴스 1개를 재활용한다.

JSP는 `@WebServlet` 등 별도 매핑 없이도 자동으로 매핑된다.

![20211225_175456](/assets/20211225_175456.png)

| 구분 | 초기화 방식 |
|------|------------|
| 서블릿 | 늦은 초기화(Lazy Init) |
| 스프링 | 빠른 초기화(Early Init) |

#### JSP 기본 객체

생성 없이 사용할 수 있는 객체들.

**유효 범위(Scope)와 속성(Attribute)**

![20211225_182234](/assets/20211225_182234.png)

---

## @RequestParam과 @ModelAttribute

### 1. @RequestParam

요청의 파라미터를 연결할 매개변수에 붙이는 어노테이션.

### 2. @ModelAttribute

적용 대상을 Model의 속성으로 자동 추가해주는 어노테이션. 반환 타입 또는 컨트롤러 메서드의 매개변수에 적용 가능.

### 3. @WebDataBinder

![20211225_225408](/assets/20211225_225408.png)

브라우저 요청값이 객체에 바인딩될 때 중간 역할을 하는 것이 **WebDataBinder**다. 크게 두 가지 작업을 수행한다.

1. **타입 변환**
2. **데이터 검증**

그 결과를 `BindingResult`에 저장해 컨트롤러에 전달한다.

---

### Context 파일 구성

| 파일 | 역할 |
|------|------|
| `src/main/webapp/WEB-INF/spring/root-context.xml` | 비웹(non-web) 관련 설정 |
| `src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml` | 웹(web) 관련 설정 |

`servlet-context.xml` 안의 `<resources mapping="/resources/**" location="/resources/" />`에서 이 경로를 수정하면 정적 리소스 주소를 단축할 수 있다.

---

## Redirect와 Forward

### 처리 과정 비교

| 구분 | 설명 |
|------|------|
| **Redirect** | 브라우저가 Location 헤더의 URL로 자동으로 재요청한다(GET/POST 무관). 요청 **2번** 발생 |
| **Forward** | 서버 내부에서 처리를 다른 컨트롤러/JSP로 넘긴다. 요청 **1번** 발생 |

---

### 쿠키(Cookie)

- 이름과 값의 쌍으로 구성된 정보. ASCII(American Standard Code for Information Interchange) 코드만 가능
- 서버에서 생성 후 전송, 브라우저에 저장, 유효기간 이후 자동 삭제

### 세션(Session)

- 서로 관련된 요청을 하나로 묶은 것 — 쿠키를 이용
- 브라우저마다 개별 저장소(session 객체)를 서버에서 제공

![20220206_182316](/assets/20220206_182316.png)

![20220206_182335](/assets/20220206_182335.png)

| 항목 | 쿠키 | 세션 |
|------|------|------|
| 저장 위치 | 브라우저 | 서버 |
| 서버 부담 | 없음 | 있음 |
| 보안 | 불리 | 유리 |
| 서버 다중화 | 유리 | 불리 |

![20220206_212205](/assets/20220206_212205.png)

세션이 있을 때(`true`)와 없을 때(`false`):
- `true`면 세션 생성, `false`면 생성하지 않음. 기본값은 `true`
- 세션이 필요 없는 페이지에는 `false`를 줘서 불필요한 세션 생성을 막을 수 있다

`session="false"`일 때 주의사항:
1. 세션이 필요 없는 JSP에서만 사용
2. 기존 세션에 영향을 주지 않는다(세션 시작 여부만 제어하며, 이미 시작된 세션은 유지됨)

`session="false"`인 JSP에서 `sessionScope`와 `pageContext.session`은 사용 불가하므로, `pageContext.request.getSession(false).getAttribute("id")`로 변경해야 한다.

> `getSession(true)`는 세션이 없을 경우 새로 생성하므로, 세션을 새로 만들지 않으려면 **`getSession(false)`**를 사용한다.

---

### 예외 처리

![20220207_003951](/assets/20220207_003951.png)

예외 처리를 위한 메서드를 만들고 `@ExceptionHandler`를 붙인다.

![20220207_004218](/assets/20220207_004218.png)

#### @ControllerAdvice — 전역 예외 처리 클래스

패키지 지정 기능을 제공한다. 예외 처리 메서드가 중복된 경우, **컨트롤러 내의 예외 처리 메서드가 우선** 적용된다(가까운 곳이 우선).

![20220207_004311](/assets/20220207_004311.png)

#### @ResponseStatus

응답 메시지의 **상태 코드 변경** 시 사용한다.

![20220207_030537](/assets/20220207_030537.png)

#### `<error-page>` (web.xml)

상태 코드별 뷰 매핑.

![20220207_030612](/assets/20220207_030612.png)

**SimpleMappingExceptionResolver**: 상태 코드 외에도 예외 종류별로 매핑 가능(`servlet-context.xml`).

#### ExceptionResolver

예외 처리 기본 전략(스프링 내장).

![20220207_033148](/assets/20220207_033148.png)

#### 예외 처리 방법 정리

![20220207_033235](/assets/20220207_033235.png)

---

### DispatcherServlet

![20220205_173308](/assets/20220205_173308.png)

각 컨트롤러나 서비스에서 공통적으로 해야 할 일을 **DispatcherServlet**이 전처리로 담당한다. 단순 전처리 외에도 다양한 역할을 수행한다.

요청이 오면:
1. 요청을 받아 해당 컨트롤러 메서드를 호출
2. 결과로 뷰 이름을 받음
3. 뷰 이름으로 해당 뷰를 찾아 응답

![20220205_174724](/assets/20220205_174724.png)

**HandlerMapping**: URL과 메서드를 key-value로 관리한다. 요청이 들어오면 DispatcherServlet이 HandlerMapping에게 어떤 메서드가 처리해야 하는지 물어보고, 등록된 맵에서 URL과 일치하는 항목을 찾아 반환한다.

**HandlerAdapter**: 컨트롤러 호출 시 중간에 개입한다. 직접 호출이 아니라 HandlerAdapter를 거쳐 호출하는 방식으로 **느슨한 결합(loose coupling)**을 유지한다. 느슨한 연결은 변경에 유리하다.

![20220205_175120](/assets/20220205_175120.png)

---

### 데이터의 변환과 검증

**1. WebDataBinder**

![20220205_183416](/assets/20220205_183416.png)

**2. RegisterController에 변환 기능 추가하기**

![20220205_184143](/assets/20220205_184143.png)

**3. PropertyEditor**

- 양방향 타입 변환 (`String → 타입`, `타입 → String`)
- 특정 타입이나 이름의 필드에 적용 가능

| 종류 | 설명 |
|------|------|
| 디폴트 PropertyEditor | 스프링이 기본 제공 |
| 커스텀 PropertyEditor | 사용자가 직접 구현. `PropertyEditorSupport` 상속 시 편리 |

- 모든 컨트롤러에서 사용: `WebBindingInitializer` 구현 후 등록
- 특정 컨트롤러에서만 사용: `@InitBinder`를 붙인 메서드 작성

**4. Converter와 ConversionService**

- **Converter**: 단방향 타입 변환(`타입 A → 타입 B`). PropertyEditor의 stateful 단점을 stateless로 개선
- **ConversionService**: 타입 변환 서비스 제공. 여러 Converter를 등록 가능

| 적용 범위 | 방법 |
|-----------|------|
| 모든 컨트롤러 | `ConfigurableWebBindingInitializer` 설정 |
| 특정 컨트롤러 | `@InitBinder`가 붙은 메서드 작성 |

**5. Formatter**

![20220207_140023](/assets/20220207_140023.png)

- 양방향 타입 변환 (`String → 타입`, `타입 → String`)
- 바인딩할 필드에 적용: `@NumberFormat`, `@DateTimeFormat`

![20220207_141601](/assets/20220207_141601.png)

**6. Validator**

객체를 검증하기 위한 인터페이스. 객체 검증기(Validator) 구현에 사용.

![20220207_141910](/assets/20220207_141910.png)

**7. Validator 검증 — 수동**

![20220207_142246](/assets/20220207_142246.png)

**8. Validator 검증 — 자동**

![20220207_143120](/assets/20220207_143120.png)

**9. Global Validator**

![20220207_143226](/assets/20220207_143226.png)

하나의 Validator로 여러 객체를 검증할 때 글로벌 Validator로 등록한다.

![20220207_154131](/assets/20220207_154131.png)

**10. MessageSource**

![20220207_154442](/assets/20220207_154442.png)

다양한 리소스(파일, 배열)에서 메시지를 읽기 위한 인터페이스.

**11. 검증 메시지의 출력**

스프링이 제공하는 커스텀 태그 라이브러리를 사용한다.

![20220207_155226](/assets/20220207_155226.png)

> 위 그림 중간에 오타 — `add`가 아니라 `save` 경로다.

---

### Spring DI

![20220208_023138](/assets/20220208_023138.png)

변경 포인트가 2개에서 1개로 줄었다 → **변경에 유리해진다** (다형성).

어떻게 하면 변경에 더 유리한 코드가 되는가에 집중한다.

#### 변경에 유리한 코드 — Map과 외부 파일

![20220208_023944](/assets/20220208_023944.png)

**Properties 객체**를 만들면 key-value 저장 공간이 생성된다. 파일을 로드해서 `config.txt`에 저장하고(car=키, 패키지 경로=값), 클래스 이름만 바꾸면 소스 코드 수정 없이 원하는 결과를 출력할 수 있다.

이런 파일이 바로 스프링 기본 전략 파일(`DispatcherServlet.properties` 등)이다.

**OOP(Object-Oriented Programming)의 핵심은 분리다:**

1. **변하는 것**과 변하지 않는 것을 분리
2. **관심사(Concern)**를 분리
3. **중복 코드**를 분리

![20220208_162404](/assets/20220208_162404.png)

![20220208_162404](/assets/20220208_162404_4w60b0pqf.png)

클래스 앞에 `@Component`를 붙이면 스프링이 자동으로 찾아서 해당 객체를 Map에 저장한다.

---

#### 객체 찾기 — by Name, by Type

![20220208_182622](/assets/20220208_182622.png)

#### 객체를 자동 연결하기 — @Autowired

![20220208_183550](/assets/20220208_183550.png)

| 어노테이션 | 검색 방식 |
|-----------|---------|
| `@Autowired` | byType |
| `@Resource` | byName |

#### @Autowired 동작 상세

![20220208_183622](/assets/20220208_183622.png)

![ex3.1](/assets/ex3.1.png)

`-Duser.language=en` VM 옵션을 주면 로그에서 한글이 깨지지 않는다.

---

### IoC(Inversion of Control)와 DI(Dependency Injection)

**IoC(제어의 역전)**: 제어의 흐름을 전통적인 방식과 다르게 바꾸는 것.

![20220209_142618](/assets/20220209_142618.png)

잘 변하는 부분과 잘 변하지 않는 부분을 분리하는 것이 핵심이다.

**분리의 3가지 유형:**
1. 관심사의 분리
2. 변하는 것과 변하지 않는 것
3. 중복 코드

![20220209_143720](/assets/20220209_143720.png)

사용할 객체를 외부에서 주입받도록 변경한다(왼쪽 → 오른쪽).

**DI(의존성 주입)**: 사용할 객체를 외부에서 주입하는 것.

| 방식 | 설명 |
|------|------|
| `new ClassName()` | 수동 지정 |
| `@Autowired` | 자동 지정 |

오른쪽 코드는 디자인 패턴으로는 **전략 패턴(Strategy Pattern)**에 해당한다. 슈퍼엔진이 필요하면 슈퍼엔진을 넣고, 터보엔진이 필요하면 터보엔진을 넣는 식으로 동작한다.

#### @Autowired 적용 대상

인스턴스 변수(iv), setter, 참조형 매개변수를 가진 생성자, 메서드에 적용 가능.

![20220209_144614](/assets/20220209_144614.png)

- 생성자가 여러 개면 `@Autowired`로 명확하게 지정해야 한다.
- Spring Container에서 **타입으로 빈을 검색**해서 참조 변수에 자동 주입(DI)
- 검색된 빈이 n개이면, 그 중 ***참조 변수와 이름이 일치하는 것***을 주입

![20220209_152942](/assets/20220209_152942.png)

| 주입 대상 | 조건 |
|-----------|------|
| **변수** | 검색된 빈이 1개가 아니면 예외 발생 |
| **배열** | 검색된 빈이 n개가 아니면 예외 발생 |

---

#### @Resource

- `@Autowired`: **byType**으로 검색
- `@Resource`: **byName**으로 검색

![20220209_161640](/assets/20220209_161640.png)

`component-scan`으로 `@Component` 클래스를 자동 검색해서 빈으로 등록한다.

`@Controller`, `@Service`, `@Repository`, `@ControllerAdvice`의 **메타 어노테이션(Meta-Annotation)**이다.

#### @Value, @PropertySource

![20220209_163403](/assets/20220209_163403.png)

#### 스프링 어노테이션 vs 표준 어노테이션 (JSR-330)

![20220209_171245](/assets/20220209_171245.png)

#### 빈의 초기화 — `<property>`와 setter

`<property>` 태그를 사용하면 별도 호출 없이도 설정 가능하다. 작성·관리할 코드가 설정 파일에 집중되어 줄어든다. `<constructor-arg>`도 동일한 역할을 하지만 **생성자**로 관리한다.

#### 빈의 초기화 — list, set, map

![20220209_173711](/assets/20220209_173711.png)

---

### Transaction(트랜잭션)

더 이상 나눌 수 없는 작업의 단위.

> 계좌 이체의 경우 입금과 출금이 **하나의 트랜잭션**으로 묶여야 한다. 출금만 되고 입금이 안 되는 상황은 허용되지 않는다.

**트랜잭션의 4가지 특성 (ACID)**

| 속성 | 설명 |
|------|------|
| **원자성(Atomicity)** | 나눌 수 없는 하나의 작업으로 이뤄져야 한다 |
| **일관성(Consistency)** | 트랜잭션 수행 전과 후가 일관된 상태를 유지해야 한다 |
| **고립성(Isolation)** | 각 트랜잭션은 독립적으로 수행되어야 한다 |
| **영속성(Durability)** | 성공한 트랜잭션의 결과는 유지되어야 한다 |

#### 커밋과 롤백

| 용어 | 설명 |
|------|------|
| **커밋(Commit)** | 작업 내용을 DB에 영구적으로 저장 |
| **롤백(Rollback)** | 최근 변경 사항을 취소(마지막 상태로 복귀) |
| **자동 커밋(Auto Commit)** | 명령 실행 후 자동으로 커밋 수행(롤백 불가) |
| **수동 커밋** | 명시적으로 commit 또는 rollback 실행 |

---

### 트랜잭션 Isolation Level(격리 수준)

각 트랜잭션을 고립시키는 정도.

| 레벨 | 설명 |
|------|------|
| Read Uncommitted | 커밋되지 않은 데이터도 읽기 가능 |
| Read Committed | 커밋된 데이터만 읽기 가능 |
| Repeatable Read | 트랜잭션 시작 이후 변경은 무시됨 (기본값) |
| Serializable | 한 번에 하나의 트랜잭션만 독립적으로 수행 (고립도 최고) |

![20220422_030357](/assets/20220422_030357.png)

IntelliJ에서는 위에서 트랜잭션 격리 수준을 설정할 수 있다.

---

### AOP(Aspect-Oriented Programming) 개념과 용어

#### AOP란?

**관점 지향 프로그래밍** — 횡단 관심사를 처리하는 방법이다. 부가기능(Advice)을 동적으로 추가해주는 기능으로, 메서드의 시작 또는 끝에 자동으로 코드(Advice)를 추가한다.

![20220422_035016](/assets/20220422_035016.png)

#### AOP 관련 용어

| 용어 | 설명 |
|------|------|
| **target** | advice가 추가될 객체 |
| **advice** | target에 동적으로 추가될 부가기능(코드) |
| **join point** | advice가 추가될 대상(메서드) |
| **pointcut** | join point를 정의한 패턴 |
| **proxy** | target에 advice가 동적으로 추가되어 생성된 객체 |
| **weaving** | target에 advice를 추가하여 메서드를 생성하는 것 |

AOP는 분리에 유리한 코드 — **변경에 유리한 코드**를 작성하게 해준다.

### Advice의 종류

| 종류 | 어노테이션 | 설명 |
|------|-----------|------|
| Around Advice | `@Around` | 메서드의 시작과 끝 부분에 추가되는 기능 |
| Before Advice | `@Before` | 메서드의 시작 부분에 추가되는 부가기능 |
| After Advice | `@After` | 메서드의 끝 부분에 추가되는 부가기능 |
| After Returning | `@AfterReturning` | 예외가 발생하지 않았을 때 실행되는 부가기능 |
| After Throwing | `@AfterThrowing` | 예외가 발생했을 때 실행되는 부가기능 |

---

### TransactionManager와 @Transactional

같은 트랜잭션 내에서 Connection을 사용할 수 있게 관리한다.

> DAO에서 Connection을 얻거나 반환할 때 `DataSourceUtils`를 사용해야 한다.

#### @Transactional로 Transaction 적용하기

- AOP를 이용한 핵심 기능과 부가기능의 분리
- `@Transactional`은 클래스나 인터페이스에도 붙일 수 있다

---

### Propagation(전파) 속성의 값

| 값 | 설명 |
|----|------|
| **Required** | 트랜잭션이 진행 중이면 참여하고, 없으면 새로운 트랜잭션 시작 (기본값) |
| **Requires_New** | 진행 중인 트랜잭션 여부와 무관하게 새로운 트랜잭션 시작 |
| **Nested** | 트랜잭션이 진행 중이면 내부 트랜잭션으로 실행 |
| **Mandatory** | 반드시 진행 중인 트랜잭션 내에서만 실행 |
| **Supports** | 트랜잭션 진행 여부와 무관하게 실행 |
| **Not_Supported** | 트랜잭션 없이 처리. 진행 중이면 잠시 중단 |
| **Never** | 트랜잭션 없이 처리. 진행 중이면 예외 발생 |

---

### MyBatis

- **SQL Mapping Framework** — Easy & Simple
- 자바 코드로부터 SQL문을 분리해서 관리
- 매개변수 설정과 쿼리 결과 읽기 코드를 제거
- 작성할 코드가 줄어들어 **생산성 향상 & 유지보수 편리**

> 스프링에서 MyBatis를 쓰려면 `mybatis`와 `mybatis-spring` 두 가지 라이브러리가 모두 필요하다.

#### SqlSessionFactoryBean과 SqlSessionTemplate

| 클래스 | 역할 |
|--------|------|
| **SqlSessionFactory** | SQL을 생성해서 제공 |
| **SqlSession** | SQL 명령을 수행하는 데 필요한 메서드 제공 |
| **SqlSessionFactoryBean** | `SqlSessionFactory`를 Spring에서 사용하기 위한 빈 |
| **SqlSessionTemplate** | SQL 명령 수행 메서드 제공. **Thread-safe** |

![20220423_162646](/assets/20220423_162646.png)

`root-context.xml`에 등록한다. `SqlSessionFactoryBean` 등록 시 `Mapper.xml`을 등록한다(`*.Mapper.xml` = SQL이 들어있는 XML).

`SqlSessionTemplate`이 Thread-safe이므로, 여러 DAO(`BoardDao`, `UserDao` 등)가 `SqlSessionTemplate`을 **공유**한다.

---

### DTO (Data Transfer Object)

계층 간 데이터를 주고받기 위해 사용되는 객체.

![20220423_170242](/assets/20220423_170242.png)

관심사, 역할, 계층을 분리한다.

> **VO(Value Object)**: 값 객체. `immutable` — 변경 불가다.

---

#### `#{}` 와 `${}` 의 차이

| 구문 | 방식 | 설명 |
|------|------|------|
| `#{}` | PreparedStatement | 값에 대해서만 `?`를 사용 가능. SQL 인젝션 방지 |
| `${}` | Statement | 일반 문자열로 받으며 더 유연하다 |

![20220423_184157](/assets/20220423_184157.png)

![20220423_184235](/assets/20220423_184235.png)

---

### URI(Uniform Resource Identifier)와 URL(Uniform Resource Locator)의 차이

| 용어 | 설명 |
|------|------|
| **URL** | 리소스 경로(위치). 원래는 URI밖에 없었다 |
| **URN(Uniform Resource Name)** | 리소스의 유일한 이름 |
| **URI** | URL과 URN을 모두 포괄하는 개념. I = Identify(유일한 식별자) |

일반적으로 전체 경로는 URL, URL의 일부만 적을 때는 URI라고 부른다.

---

### 게시판 CRUD

#### 기본 API 정리

![20220703_183057](/assets/20220703_183057.png)

##### 읽기

![20220703_183331](/assets/20220703_183331.png)

`boardList.jsp` 게시물 목록에서 링크를 클릭하면 요청이 간다. 게시물 번호가 자동으로 따라간다.

`boardController`의 `read` 메서드가 게시물 번호를 받아서 `boardService`의 `read` 메서드를 호출한다. DB에서 게시물 하나를 읽어와서 `BoardDTO`에 담아 `board.jsp`에 전달한다.

![20220703_183951](/assets/20220703_183951.png)

목록 버튼을 누르면 `boardController`로 요청이 가고 `list` 메서드가 호출된다. `boardService`의 `getPage`를 호출해 한 페이지를 가져와 리스트에 담아 `boardList.jsp`에 전달한다.

> 3페이지에서 게시물을 보다가 돌아가면 3페이지로 복귀해야 한다. 페이지 정보도 함께 `board.jsp`에 전달해야 한다.

##### 삭제

![20220703_215433](/assets/20220703_215433.png)

`boardController`에 삭제할 게시물 번호를 POST로 넘긴다. Controller는 `boardService`의 `remove`를 호출하고(`bno`, `writer` 두 정보 전달), 삭제 후 redirect한다.

> 수정·삭제 버튼은 **로그인한 사람이 작성자일 때만** 보여야 한다.

##### 쓰기

![20220703_220425](/assets/20220703_220425.png)

게시물 목록에서 글쓰기 버튼을 클릭하면 `BoardController`의 `write` 메서드를 호출해 `board.jsp`를 보여준다. 읽기일 땐 `readonly`, 글쓰기에서는 `readonly` 해제. 등록 버튼을 누르면 Controller의 `write` 메서드를 다시 호출한다.

##### 수정

읽기 화면에서 수정 버튼을 클릭하면 `readonly`가 해제된다(jQuery 이용).

**attribute vs property (둘 다 번역하면 "속성")**

| 구분 | 설명 |
|------|------|
| **attribute** | HTML 태그 안에 직접 작성하는 속성 |
| **property** | 브라우저가 태그를 파싱해서 생성하는 DOM 객체의 속성 |

jQuery에서 `prop()` 메서드가 property를 다룬다. 등록 버튼을 누르면 Controller의 `modify` 메서드에 POST로 전달되고, Service의 `modify`를 통해 DB에 반영된다. 처리 후 list로 redirect한다.

---

#### MyBatis 동적 쿼리 — `<sql>`과 `<include>`

![20220703_224534](/assets/20220703_224534.png)

검색 기능을 넣으려면 **동적 쿼리**를 알아야 한다. 검색 대상 설정에 따라 쿼리가 달라지기 때문이다.

![20220704_000935](/assets/20220704_000935.png)

공통 부분을 `<sql>`로 정의하고 `<include>`로 포함해서 재사용한다.

---

#### XML의 특수문자 처리

![20220423_185000](/assets/20220423_185000.png)

XML 내의 특수문자(`<`, `>`, `&` 등)는 `&lt;`, `&gt;`로 변환해야 한다. 또는 특수문자가 포함된 쿼리를 `<![CDATA[` 와 `]]>` 로 감싼다.

---

### REST API와 AJAX

#### JSON (JavaScript Object Notation)

JavaScript Object Notation — 자바스크립트 객체 표기법.

XML은 데이터 교환에 태그가 너무 많고 복잡해서, 더 간단한 데이터 전송 방식으로 **JSON**이 사용되기 시작했다.

#### JSON.stringify()와 JSON.parse()

JS 객체를 서버로 전송하려면 **직렬화(문자열 변환)**가 필요하다. HTTP가 문자열 기반이기 때문이다.

| 메서드 | 방향 | 설명 |
|--------|------|------|
| `JSON.stringify()` | JS 객체 → 문자열 | 직렬화 |
| `JSON.parse()` | 문자열 → JS 객체 | 역직렬화 |

---

### AJAX (Asynchronous JavaScript And XML)

요즘은 XML 대신 **JSON**을 주로 사용한다.

- **비동기 통신** — 데이터를 주고받기 위한 기술
- 웹 페이지 전체(data + UI)가 아닌 **일부(data)만 업데이트** 가능

---

### @ResponseBody와 @RestController

`@RegisterController`에서 `@ResponseBody` 대신 클래스에 **`@RestController`**를 사용할 수 있다.

### REST(Representational State Transfer)란?

- 웹 서비스 디자인 아키텍처 접근 방식
- 프로토콜에 독립적이며 주로 **HTTP**를 사용해서 구현
- **리소스 중심의 API 디자인** — HTTP 메서드로 수행할 작업을 정의

![20220427_032605](/assets/20220427_032605.png)

### REST API

REST 규약을 준수하는 API.
