---
title: "[CS] 웹 기술 핵심 — 브라우저 렌더링·인증·REST·CSR/SSR·보안"
date: 2021-11-13
category: "CS"
tags: ["CS"]
description: "브라우저 동작 방법(렌더링·파싱·DOM), Cookie/Session, HTTP 상태코드, REST API, Web Server vs WAS, OAuth, JWT, 인증 방식, CSR/SSR, 앱 종류(네이티브/웹/하이브리드), Vue vs React, PWA, CSRF/XSS 등 웹 전반 면접 핵심 정리."
permalink: "study/2021/11/13/면접-대비-Web"
---

# 브라우저 동작 방법

---

***"브라우저가 어떻게 동작하는지 아세요?"***

웹 서핑하다보면 우리는 여러 url을 통해 사이트를 돌아다닌다. 이 url이 입력되었을 때 어떤 과정을 거쳐서 출력되는걸까?

브라우저 주소 창에 `http://naver.com`을 입력했을 때 어떤 과정을 거쳐서 네이버 페이지가 화면에 보이는지 알아보자.

> 오픈 소스 브라우저(크롬, 파이어폭스, 사파리 등)로 접속했을 때로 정리

---

## 브라우저 주요 기능

- 사용자가 선택한 자원을 서버에 요청하고 브라우저에 표시
- 자원은 html 문서, pdf, image 등 다양한 형태
- 자원의 주소는 URI(Uniform Resource Identifier)에 의해 정해짐

브라우저는 html과 css 명세에 따라 html 파일을 해석해서 표시한다. 이 '명세'는 웹 표준화 기구인 **`W3C`(World Wide Web Consortium)** 에서 정해진다.

> 예전 브라우저들은 일부만 명세에 따라 구현하고 독자적 방법으로 확장했음
> → 결국 **심각한 호환성 문제** 발생. 그래서 요즘은 대부분 표준 명세를 따름

---

## 브라우저 기본 구조

<img src="https://d2.naver.com/content/images/2015/06/helloworld-59361-1.png">

| 구성 요소 | 역할 |
|:---:|:---|
| **사용자 인터페이스** | 주소 표시줄, 이전/다음 버튼, 북마크 등 (요청 페이지를 보여주는 창 제외) |
| **브라우저 엔진** | 사용자 인터페이스와 렌더링 엔진 사이의 동작 제어 |
| **렌더링 엔진** | 요청한 콘텐츠 표시 (html, css 파싱 → 화면에 표시) |
| **통신** | HTTP 요청과 같은 네트워크 호출 |
| **UI 백엔드** | 플랫폼에서 명시하지 않은 일반적 인터페이스. 콤보 박스 등 기본 장치를 그림 |
| **자바스크립트 해석기** | 자바스크립트 코드를 해석하고 실행 |
| **자료 저장소** | 쿠키 등 모든 종류의 자원을 하드 디스크에 저장하는 계층 |

---

## 렌더링이란?

**렌더링 엔진** 은 요청 받은 내용을 브라우저 화면에 표시해준다. 기본적으로 html, xml 문서와 이미지를 표시할 수 있다.

### 렌더링 엔진 종류

| 브라우저 | 렌더링 엔진 |
|:---:|:---:|
| 크롬, 사파리 | 웹킷(Webkit) |
| 파이어폭스 | 게코(Gecko) |

**웹킷(Webkit)** : 최초 리눅스 플랫폼에 동작하기 위한 오픈소스 엔진 (애플이 맥과 윈도우에서 사파리 브라우저를 지원하기 위해 수정을 더했음)

### 렌더링 동작 과정

<img src="https://d2.naver.com/content/images/2015/06/helloworld-59361-2.png">

```
먼저 html 문서를 파싱한다.

그리고 콘텐츠 트리 내부에서 태그를 모두 DOM 노드로 변환한다.

그 다음 외부 css 파일과 함께 포함된 스타일 요소를 파싱한다.

이 스타일 정보와 html 표시 규칙은
렌더 트리라고 부르는 또 다른 트리를 생성한다.

이렇게 생성된 렌더 트리는 정해진 순서대로 화면에 표시되는데,
생성 과정이 끝났을 때 배치가 진행되면서
노드가 화면의 정확한 위치에 표시되는 것을 의미한다.

이후에 UI 백엔드에서 렌더 트리의 각 노드를 가로지으며
형상을 만드는 그리기 과정이 진행된다.

이러한 과정이 점진적으로 진행되며, 렌더링 엔진은 좀더 빠르게
사용자에게 제공하기 위해 모든 html을 파싱할 때까지 기다리지 않고
배치와 그리기 과정을 시작한다. (마치 비동기처럼..?)

전송을 받고 기다리는 동시에 받은 내용을 먼저 화면에 보여준다
(우리가 웹페이지에 접속할 때 한꺼번에 뜨지 않고 점점 화면에 나오는 것이 이 때문!!!)
```

***DOM이란?***

**DOM(Document Object Model, 문서 객체 모델)** 은 웹 브라우저가 html 페이지를 인식하는 방식이다. 웹페이지 소스의 `<html>, <body>`와 같은 태그들을 Javascript가 활용할 수 있는 객체로 만든 것(트리 구조)이다.

### 웹킷 동작 구조

<img src="https://d2.naver.com/content/images/2015/06/helloworld-59361-3.png">

> **어태치먼트** : 웹킷이 렌더 트리를 생성하기 위해 DOM 노드와 스타일 정보를 연결하는 과정

---

## 파싱과 DOM 트리 구축

#### 파싱(parsing)

문서 파싱은, 브라우저가 코드를 이해하고 사용할 수 있는 구조로 변환하는 것이다. **어휘 분석과 구문 분석** 과정을 거쳐 파싱 트리를 구축한다.

보통 파서를 생성하는 것은 문법에 대한 규칙 부여 등 복잡하므로, 자동으로 생성해주는 `파서 생성기`를 많이 활용한다.

> 웹킷은 플렉스(flex)나 바이슨(bison)을 이용하여 유용하게 파싱이 가능

---

## 요약

- 주소창에 url을 입력하고 Enter를 누르면, **서버에 요청이 전송**됨
- 해당 페이지에 존재하는 여러 자원들(text, image 등)이 보내짐
- 브라우저는 html과 css를 W3C 명세에 따라 해석함
- 이 역할을 하는 것이 **'렌더링 엔진'**
- 렌더링 엔진은 html 파싱 과정 시작 → html 파서가 어휘와 구문을 분석하면서 **DOM 트리** 구축
- 다음엔 css 파싱 과정 시작 → css 파서가 모든 css 정보를 스타일 구조체로 생성
- 이 2가지를 연결시켜 **렌더 트리**를 만듬 → 문서가 **시각적 요소를 포함한 형태로 구성**된 상태
- 화면에 배치를 시작하고, UI 백엔드가 노드를 돌며 형상을 그림
- 빠른 화면 표시를 위해 자원을 전송받으면 **기다리는 동시에 일부분 먼저 진행**하고 화면에 표시함

#### [참고 자료]

- [링크](<https://d2.naver.com/helloworld/59361>)

---

# Cookie & Session

|          |                        Cookie                        |     Session      |
| :------: | :--------------------------------------------------: | :--------------: |
| 저장위치 |                        Client                        |      Server      |
| 저장형식 |                         Text                         |      Object      |
| 만료시점 | 쿠키 저장시 설정<br />(설정 없으면 브라우저 종료 시) | 정확한 시점 모름 |
|  리소스  |                 클라이언트의 리소스                  |  서버의 리소스   |
| 용량제한 |           한 도메인 당 20개, 한 쿠키당 4KB           |     제한없음     |

### 저장 위치

- **쿠키** : 클라이언트의 웹 브라우저가 지정하는 메모리 or 하드디스크
- **세션** : 서버의 메모리에 저장

### 만료 시점

- **쿠키** : 저장할 때 `expires` 속성을 정의해 무효화시키면 삭제될 날짜 정할 수 있음
- **세션** : 클라이언트가 로그아웃하거나, 설정 시간 동안 반응이 없으면 무효화되기 때문에 정확한 시점을 알 수 없음

### 리소스

- **쿠키** : 클라이언트에 저장되고 클라이언트의 메모리를 사용하기 때문에 서버 자원 사용하지 않음
- **세션** : 서버에 저장되고 서버 메모리로 로딩되기 때문에 세션이 생길 때마다 리소스를 차지함

### 용량 제한

- **쿠키** : 한 도메인당 20개, 하나의 쿠키 당 4KB로 제한
- **세션** : 클라이언트가 접속하면 서버에 의해 생성되므로 개수나 용량 제한 없음

---

# HTTP 상태 코드 (HTTP Status Code)

> API 문서를 작성할 때 꼭 알아야 할 HTTP 응답 상태 코드

- **1xx** : 정보 확인
- **2xx** : 통신 성공
- **3xx** : 리다이렉트
- **4xx** : 클라이언트 오류
- **5xx** : 서버 오류

#### 200번대 : 통신 성공

| 상태코드 |    이름     |           의미           |
| :------: | :---------: | :----------------------: |
|   200    |     OK      |      요청 성공(GET)      |
|   201    |   Created   |     생성 성공(POST)      |
|   202    |  Accepted   | 요청 접수O, 리소스 처리X |
|   204    | No Content  |  요청 성공O, 내용 없음   |

#### 300번대 : 리다이렉트

| 상태코드 |       이름       |             의미              |
| :------: | :--------------: | :---------------------------: |
|   300    | Multiple Choice  | 요청 URI에 여러 리소스가 존재 |
|   301    | Move Permanently |  요청 URI가 새 위치로 옮겨감  |
|   304    |   Not Modified   |    요청 URI의 내용이 변경X    |

#### 400번대 : 클라이언트 오류

| 상태코드 |        이름        |               의미                |
| :------: | :----------------: | :-------------------------------: |
|   400    |    Bad Request     | API에서 정의되지 않은 요청 들어옴 |
|   401    |    Unauthorized    |             인증 오류             |
|   403    |     Forbidden      |        권한 밖의 접근 시도        |
|   404    |     Not Found      |   요청 URI에 대한 리소스 존재X    |
|   405    | Method Not Allowed | API에서 정의되지 않은 메소드 호출 |
|   406    |   Not Acceptable   |             처리 불가             |
|   408    |  Request Timeout   |        요청 대기 시간 초과        |
|   409    |      Conflict      |               모순                |
|   429    |  Too Many Request  |        요청 횟수 상한 초과        |

#### 500번대 : 서버 오류

| 상태코드 |         이름          |         의미         |
| :------: | :-------------------: | :------------------: |
|   500    | Internal Server Error |    서버 내부 오류    |
|   502    |      Bad Gateway      |   게이트웨이 오류    |
|   503    |  Service Unavailable  |   서비스 이용 불가   |
|   504    |    Gateway Timeout    | 게이트웨이 시간 초과 |

---

# REST API

> **REST(REpresentational State Transfer)** : 웹(HTTP)의 장점을 활용한 아키텍처

## REST의 요소

### Method

| Method | 의미   | Idempotent |
| ------ | ------ | ---------- |
| POST   | Create | No         |
| GET    | Select | Yes        |
| PUT    | Update | Yes        |
| DELETE | Delete | Yes        |

> **Idempotent** : 한 번 수행하나, 여러 번 수행했을 때 결과가 같나?

### Resource

- `http://myweb/users`와 같은 URI
- 모든 것을 Resource(명사)로 표현하고, 세부 Resource에는 id를 붙임

### Message

메시지 포맷이 존재 : JSON, XML 등 (최근에는 JSON을 씀)

```text
HTTP POST, http://myweb/users/
{
	"users" : {
		"name" : "terry"
	}
}
```

## REST 특징

- **Uniform Interface** : HTTP 표준만 맞는다면, 어떤 기술도 가능한 Interface 스타일. Self-Descriptive Messages, HATEOAS(Hypermedia As The Engine Of Application State) 포함
- **Statelessness** : HTTP Session과 같은 컨텍스트 저장소에 **상태 정보 저장 안함**. Request만 Message로 처리하면 되므로 **구현이 단순해짐**
- **Resource 지향 아키텍처(ROA)** : Resource 기반의 복수형 명사 형태의 정의 권장
- **Client-Server Architecture**
- **Cache Ability**
- **Layered System**
- **Code On Demand** (Optional)

---

# Web Server와 WAS의 차이

<img src="https://gmlwjd9405.github.io/images/web/static-vs-dynamic.png">

## Static Pages vs Dynamic Pages

| 구분 | 설명 | 예시 |
|:---:|:---|:---|
| **Static Pages** | 항상 동일한 페이지 반환 | image, html, css, javascript 파일 |
| **Dynamic Pages** | 인자에 따라 바뀌는 페이지 | Servlet: WAS 위에서 돌아가는 자바 프로그램 |

## 웹 서버(Web Server)

**소프트웨어 개념**: 웹 브라우저 클라이언트로부터 HTTP 요청을 받고, **정적인 콘텐츠**(html, css 등)를 제공하는 프로그램

**역할:**
- **정적 컨텐츠 제공** : WAS를 거치지 않고 바로 자원 제공
- **동적 컨텐츠 요청 전달** : 클라이언트 요청을 WAS에 보내고 처리 결과를 클라이언트에게 전달

**종류** : Apache, Nginx, IIS 등

## WAS(Web Application Server)

> DB 조회 및 다양한 로직 처리 요구 시 **동적인 콘텐츠를 제공**하기 위해 만들어진 애플리케이션 서버

HTTP를 통해 애플리케이션을 수행해주는 미들웨어. **웹 컨테이너 혹은 서블릿 컨테이너** 라고도 불린다.

```
WAS = 웹 서버 + 웹 컨테이너
```

**주요 기능:**
1. 프로그램 실행 환경 및 DB 접속 기능 제공
2. 여러 트랜잭션 관리 기능
3. 업무 처리하는 비즈니스 로직 수행

**종류** : Tomcat, JBoss 등

## 웹 서버와 WAS를 분리하는 이유

<img src="https://gmlwjd9405.github.io/images/web/webserver-vs-was1.png">

- **웹 서버**: 정적 컨텐츠만 처리하도록 기능 분배 → 서버 부담 감소
- **WAS**: 동적 컨텐츠 처리에 집중. 정적 컨텐츠 요청까지 처리하면 부하가 커지고 동적 컨텐츠 처리가 지연됨

> **가장 효율적인 방법**: 웹 서버를 WAS 앞에 두고, 필요한 WAS들을 웹 서버에 플러그인 형태로 설정하면 효율적인 분산 처리가 가능함

<img src="https://gmlwjd9405.github.io/images/web/web-service-architecture.png">

#### [참고자료]

- [링크](<https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html>)

---

# OAuth

> **OAuth(Open Authorization)**

인터넷 사용자들이 비밀번호를 제공하지 않고, 다른 웹사이트 상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 개방형 표준 방법.

구글, 페이스북, 트위터 등이 사용하며, 타사 애플리케이션 및 웹사이트의 계정에 대한 정보를 공유할 수 있도록 허용해준다.

## 사용 용어

| 용어 | 설명 |
|:---:|:---|
| **사용자** | 계정을 가지고 있는 개인 |
| **소비자** | OAuth를 사용해 서비스 제공자에게 접근하는 웹사이트 or 애플리케이션 |
| **서비스 제공자** | OAuth를 통해 접근을 지원하는 웹 애플리케이션 |
| **소비자 비밀번호** | 서비스 제공자에서 소비자가 자신임을 인증하기 위한 키 |
| **요청 토큰** | 소비자가 사용자에게 접근권한을 인증받기 위해 필요한 정보 |
| **접근 토큰** | 인증 후에 소비자를 통해 보호 자원에 접근하기 위한 키 값 |

토큰 종류로는 **Access Token** 과 **Refresh Token** 이 있다. Access Token은 만료시간이 있고 끝나면 다시 요청해야 한다. Refresh Token은 만료되면 처음부터 진행해야 한다.

## 인증 과정

> 소비자 ↔ 서비스 제공자

1. 소비자가 서비스 제공자에게 요청토큰을 요청한다.
2. 서비스 제공자가 소비자에게 요청토큰을 발급해준다.
3. 소비자가 사용자를 서비스 제공자로 이동시킨다. 여기서 사용자 인증이 수행된다.
4. 서비스 제공자가 사용자를 소비자로 이동시킨다.
5. 소비자가 접근토큰을 요청한다.
6. 서비스 제공자가 접근토큰을 발급한다.
7. 발급된 접근토큰을 이용해서 소비자에서 사용자 정보에 접근한다.

---

# JWT (JSON Web Token)

```
JSON Web Tokens are an open, industry standard [RFC 7519]
method for representing claims securely between two parties.
출처 : https://jwt.io
```

JWT는 웹표준(RFC 7519)으로서 두 개체에서 JSON 객체를 사용하여 가볍고 자가수용적인 방식으로 정보를 안전성 있게 전달해줍니다.

## 구성요소

JWT는 `.`을 구분자로 3가지의 문자열로 구성된다.

**`aaaa.bbbbb.ccccc`** → 헤더(header) / 내용(payload) / 서명(signature)

### 헤더 (Header)

`typ`(토큰 타입)와 `alg`(해싱 알고리즘) 두 가지 정보를 지닌다.

```
{
	"typ" : "JWT",
	"alg" : "HS256"
}
```

### 정보 (Payload)

Payload 부분에는 토큰에 담을 정보가 들어있다. 정보의 한 조각을 **클레임(claim)** 이라고 부르며, `name/value` 쌍으로 이루어진다.

클레임의 종류는 3가지다.

1. **등록된(registered) 클레임** : 토큰에 대한 정보를 담기 위해 이름이 미리 정해진 클레임 (모두 선택적)
   - `iss` : 토큰 발급자, `sub` : 토큰 제목, `aud` : 토큰 대상자
   - `exp` : 만료시간, `nbf` : 활성 날짜, `iat` : 발급 시간, `jti` : 고유 식별자

2. **공개(public) 클레임** : 충돌 방지를 위해 URI 형식으로 이름을 짓는다.

```
{
	"https://chup.tistory.com/jwt_claims/is_admin" : true
}
```

3. **비공개(private) 클레임** : 클라이언트 ↔ 서버 간 합의하에 사용되는 클레임. 이름 충돌에 유의해야 한다.

### 서명 (Signature)

서명은 헤더의 인코딩값과 정보의 인코딩값을 합친 후 주어진 비밀키로 해쉬를 하여 생성한다. 이렇게 만든 해쉬를 `base64` 형태로 나타낸다.

## 로그인 인증시 JWT 사용

유효기간이 짧은 Token은 사용자가 자주 로그인해야 하는 불편함이 있고, 반대로 유효기간이 긴 Token은 탈취 시 보안에 취약하다.

이를 보완하기 위해 **Refresh Token** 을 사용한다.

- **Access Token** : 짧은 유효기간 (예: 1시간)
- **Refresh Token** : 긴 유효기간 (예: 1주) → Access Token이 만료되면 새로 발급

<img src="https://camo.githubusercontent.com/0fcc5fdd7d589d975360d4efca148bc26587b912/68747470733a2f2f7374617469632e7061636b742d63646e2e636f6d2f70726f64756374732f393738313738343339353430372f67726170686963732f4230333635335f30385f30322e6a7067">

---

# 인증 방식

## API Key

서비스들이 거대해짐에 따라 Module이나 Application들간의 공유와 독립성을 보장하기 위한 기능들이 등장했다. 그 중 가장 먼저 등장하고 널리 쓰이는 기술이 **API Key** 다.

**동작 방식:**
1. 사용자는 API Key를 발급받는다.
2. 해당 API를 사용하기 위해 Key와 함께 요청을 보낸다.
3. Application은 요청이 오면 Key를 통해 User 정보를 확인하여 권한을 검증한다.
4. 해당 Key의 인증과 인가에 따라 데이터를 반환한다.

**문제점:** Key가 유출된 경우에 대비하기 힘들고, 주기적으로 Key를 업데이트해야 하는 번거로움이 있다.

---

## OAuth2

API Key의 단점을 보완하기 위해 등장한 방식. 대표적으로 페이스북, 트위터 등 SNS 로그인 기능에서 볼 수 있다.

**동작 방식 (요약):**
1. 사용자가 Application 기능을 사용하기 위한 요청을 보낸다.
2. Application은 로그인이 되어 있지 않으면 사용자를 인증서버로 Redirect한다.
3. 인증서버에서 인증/Grant 처리를 거친다.
   > **Grant** : 사용자가 자신의 인증정보를 Application에 넘길지 말지 결정하는 과정
4. 인증 완료 후 인증서버가 Application에게 **인가코드** 를 전달한다. (짧은 유효기간)
5. Application은 인가코드를 Request Token으로 사용하여 **Access Token** 을 발급받는다.
6. Application은 Access Token을 통해 리소스 서버에 요청한다.

**문제점:** Access Token은 무의미한 문자열로 이루어져 있어 매번 인증서버에 유효성 확인 작업이 필요하다.

---

## JWT (인증 방식 관점)

JWT는 인증 흐름의 규약이 아닌 **Token 작성에 대한 규약** 이다. 인증여부 확인을 위한 값, 유효성 검증을 위한 값, 인증 정보 자체를 담고 있기 때문에 **인증서버에 묻지 않고도 사용할 수 있다.**

**문제점:** 토큰 자체가 인증 정보를 가지고 있기 때문에 민감한 정보는 인증서버에 다시 접속하는 과정이 필요하다.

토큰에 대한 자세한 내용은 [JWT 문서](https://github.com/kim6394/tech-interview-for-developer/blob/master/Web/JWT(JSON%20Web%20Token).md)를 참조하자.

#### [참고 자료]

- [링크](https://www.sauru.so/blog/basic-of-oauth2-and-jwt/)

---

# Logging Level

```
보통 log4j 라이브러리를 활용한다.
크게 ERROR, WARN, INFO, DEBUG로 로그 레벨을 나누어 작성한다.
```

| 레벨 | 설명 | 예시 |
|:---:|:---|:---|
| **ERROR** | 프로그램 동작에 큰 문제 발생. 즉시 조사 필요 | DB 사용 불가, 중요 에러 |
| **WARN** | 주의 필요하지만 프로세스는 계속 진행 | 현재 데이터 사용 불가, 잠재적 문제 |
| **INFO** | 중요한 비즈니스 프로세스의 시작/종료 알림 | `~가 ~를 실행했음` |
| **DEBUG** | 개발자가 기록할 가치가 있는 정보 | 개발 단계에서 활용 |

#### [참고 자료]

- [링크](https://jangiloh.tistory.com/18)

---

# UI와 UX

> 많이 들어봤지만, 차이를 말하라고 하면 멈칫한다. 면접에서도 웹을 했다고 하면 나올 수 있는 질문.

| 구분 | 정의 | 핵심 요소 |
|:---:|:---|:---|
| **UI(User Interface)** | 사용자가 앱을 사용할 때 마주하는 디자인, 레이아웃, 기술적인 부분 | 폰트, 색깔, 줄간격, 반응형, 애니메이션 등 |
| **UX(User eXperience)** | 사용자들의 경험을 분석하여 더 편하고 효율적인 방향으로 프로세스를 개선 | 터치 화면, 선택 flow, 통계/데이터 기반 분석 |

UI를 포장물에 비유한다면, UX는 그 안의 내용물이라고 볼 수 있다.

---

# CSR & SSR

```
CSR : Client Side Rendering
SSR : Server Side Rendering
```

## SPA (Single Page Application)

> 최초 한 번 페이지 전체를 로딩한 뒤, 데이터만 변경하여 사용할 수 있는 애플리케이션

기존의 전통적 방법인 SSR 방식은 요청할 때마다 새로고침이 일어나면서 서버로부터 리소스를 전달받아 렌더링하는 방식으로, 데이터가 많을수록 성능 문제가 발생했다.

**CSR 방식**은 사용자의 행동에 따라 필요한 부분만 다시 읽어온다. 서버는 단지 JSON 파일만 보내주고, HTML을 그리는 역할은 자바스크립트를 통해 클라이언트 측에서 수행한다.

## CSR 장단점

| 구분 | 내용 |
|:---:|:---|
| **장점** | 트래픽 감소 (필요한 데이터만 받음), 새로고침 없는 네이티브 앱 같은 사용자 경험 |
| **단점** | 검색엔진 크롤러가 데이터 수집에 어려움 (네이버/다음 등은 SSR 따로 구현 필요) |

## SSR 장단점

| 구분 | 내용 |
|:---:|:---|
| **장점** | 검색엔진 최적화(SEO), 초기 로딩 성능 개선 |
| **단점** | 프로젝트 복잡도 증가, 성능 악화 가능성 |

#### [참고 자료]

- [링크](https://velog.io/@zansol/%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C%EB%A0%8C%EB%8D%94%EB%A7%81SSR-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%82%AC%EC%9D%B4%EB%93%9C%EB%A0%8C%EB%8D%94%EB%A7%81CSR)

---

# 네이티브 앱 & 웹 앱 & 하이브리드 앱

## 네이티브 앱 (Native App)

<img src="https://mblogthumb-phinf.pstatic.net/MjAxNzA1MjNfMTYy/MDAxNDk1NTI0ODM5MTE4.TdQ3eHqNonWO6s_iP3--wu22JtO-plhsjTRxlC0UsU0g.jGJOzygOWVumEielqLMAo9PHzLizIpBRgqfPKFsUvPog.PNG.acornedu/02_%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C%EC%95%B1.png?type=w800">

모바일 기기에 최적화된 언어로 개발된 앱. 안드로이드 SDK를 이용한 Java, iOS 기반 SDK를 이용한 Swift 등으로 만드는 앱이다.

| 구분 | 내용 |
|:---:|:---|
| **장점** | 성능 가장 높음, 네이티브 API 활용 가능, 플랫폼과 밀착 |
| **단점** | 플랫폼에 한정적, 언어에 제약적 |

---

## 모바일 웹 앱 (Mobile Web App)

<img src="https://mblogthumb-phinf.pstatic.net/MjAxNzA1MjNfMTU0/MDAxNDk1NTI1MDk3ODMx.9Sc2ujbBTWVg5nyCCJpKYdwYTGr7e2sxUfBPN7Cosf0g.OGUHbnWVbHSJ45w4n2CIVMOY6iJaQESD9RxTvG8n_NIg.PNG.acornedu/03_%EC%9B%B9%EC%95%B1.png?type=w800">

모바일 웹 + 네이티브 앱을 결합한 형태. SPA를 활용해 속도가 빠른 장점이 있다.

| 구분 | 내용 |
|:---:|:---|
| **장점** | 별도 설치 불필요, 모든 기기와 브라우저에서 접근 가능, 유지보수 용이 |
| **단점** | 플랫폼 API 사용 불가 (브라우저 API만 가능), 네이티브/하이브리드보다 실행 까다로움 |

---

## 하이브리드 앱 (Hybrid App)

<img src="https://mblogthumb-phinf.pstatic.net/MjAxNzA1MjNfOTAg/MDAxNDk1NTI1NDUyNDQ0.KwG7RyksdzOfh-hHZZcwZN3fWVproJNp0KZjlXn4utQg.lFZN2yClP6MbcJQEoeGN2FGg8_Q_c2RbqlpLo45cdnwg.PNG.acornedu/04_%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C%EC%95%B1.png?type=w800">

> 네이티브 + 웹앱

네이티브 웹에 Web View를 띄워 웹앱을 실행시킨다. **양쪽의 API를 모두 사용할 수 있는 것이 가장 큰 장점.**

| 구분 | 내용 |
|:---:|:---|
| **장점** | 네이티브 API + 브라우저 API 모두 활용, 한번의 개발로 다수 플랫폼 사용 가능 |
| **단점** | 네이티브 기능 접근 위해 개발 지식 필요, UI 프레임도구 미사용 시 직접 제작 필요 |

### 요약

<img src="https://mblogthumb-phinf.pstatic.net/MjAxNzA1MjNfMTc1/MDAxNDk1NTI1NTk1OTQ3.Xwuq8V_m40A1CRCM-PHtqO2r5QTsTyAAGjHO1h0NX8cg.d5WrK9gZl58lDeb4wMWYkN3YaZth45WdnwwkGIikxNIg.PNG.acornedu/05_%EB%A7%88%EC%A7%80%EB%A7%89.png?type=w800">

#### [참고 자료]

- [링크](https://m.blog.naver.com/acornedu/221012420292)

---

# Vue.js와 React의 차이

<img src="https://miro.medium.com/max/704/1*tqpZoG9qMeVd9j7KhAnsBg.png">

| 항목 | Vue.js | React |
|:---:|:---:|:---:|
| **개발 CLI** | vue-cli | create-react-app |
| **CSS 파일** | 없음. style이 컴포넌트 파일 안에서 정의 | 파일이 존재. 해당 파일을 통해 style 적용 |
| **데이터 변이** | `this.name = 'lee'` | `this.setState({name:'lee'})` |

Vue에서는 data를 업데이트할 때마다 `setState`를 알아서 결합해준다.

#### [참고 자료]

- [링크](https://medium.com/@erwinousy/%EB%82%9C-react%EC%99%80-vue%EC%97%90%EC%84%9C-%EC%99%84%EC%A0%84%ED%9E%88-%EA%B0%99%EC%9D%80-%EC%95%B1%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%97%88%EB%8B%A4-%EC%9D%B4%EA%B2%83%EC%9D%80-%EA%B7%B8-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%B4%EB%8B%A4-5cffcbfe287f)

---

# PWA (Progressive Web App)

> 웹의 장점과 앱의 장점을 결합한 환경
> `앱 수준과 같은 사용자 경험을 웹에서 제공하는 것이 목적!`

확장성이 좋고, 깊이 있는 앱같은 웹을 만드는 것을 지향한다. 웹 주소만 있다면 누구나 접근하여 사용이 가능하고 스마트폰의 저장공간을 잡아먹지 않는다.

**서비스 작업자(Service Worker) API** : 웹앱의 중요한 부분을 캐싱하여 사용자가 다음에 열 때 빠르게 로딩할 수 있도록 도와줌

### PWA 제공 기능

| 기능 | 설명 |
|:---:|:---|
| **프로그래시브** | 어떤 브라우저든 모든 사용자에게 적합 |
| **반응형** | 데스크톱, 모바일, 태블릿 등 모든 폼 factor에 맞음 |
| **연결 독립적** | 서비스 워커를 사용해 오프라인에서도 작동 |
| **안전** | HTTPS를 통해 제공되어 콘텐츠가 변조되지 않음 |
| **검색 가능** | W3C 매니페스트 및 서비스 워커 등록 범위 덕분에 '앱'으로 식별되어 검색 가능 |
| **재참여 가능** | 푸시 알림과 같은 기능을 통해 쉽게 재참여 가능 |

---

# CSRF & XSS

## CSRF (Cross Site Request Forgery)

웹 어플리케이션 취약점 중 하나로, 인터넷 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위(modify, delete, register 등)를 특정한 웹사이트에 request하도록 만드는 공격.

**발생 조건:**
- 사용자가 해커가 만든 피싱 사이트에 접속한 경우
- 위조 요청을 전송하는 서비스에 사용자가 로그인한 상황

**대응 기법:**

| 방법 | 설명 |
|:---:|:---|
| **리퍼러(Referer) 검증** | 백엔드 단에서 승인된 도메인으로 요청 시에만 처리 |
| **Security Token 사용** | 세션에 임의의 난수 값을 저장하고, 요청 시 해당 값을 포함하여 전송. 백엔드에서 일치 여부 검증 |

---

## XSS (Cross Site Scripting)

웹 어플리케이션 취약점 중 하나로, 권한이 없는 사용자가 웹 사이트에 스크립트를 삽입하는 공격 기법.

악의적 스크립트를 삽입하여 이를 열람한 사용자의 쿠키를 해커에게 전송시키며, 탈취한 쿠키를 통해 세션 하이재킹 공격을 한다.

**공격 종류:**
- **지속성(Persistent XSS)** : XSS 취약점이 존재하는 웹 어플리케이션에 악성 스크립트를 삽입하여 DB에 저장, 지속적으로 공격
- **반사형(Reflected XSS)** : 악의적 스크립트와 URL을 사용자에게 누르도록 유도, 클릭 시 스크립트 실행
- **DOM 기반(DOM-based XSS)** : 악성 스크립트가 포함된 URL 요청 시 브라우저를 해석하는 단계에서 발생. 서버 측에서 탐지가 어려움

**대응 기법:**

| 방법 | 설명 |
|:---:|:---|
| **입출력 값 검증** | XSS Cheat Sheet에 대한 필터 목록 구성 |
| **XSS 방어 라이브러리/확장앱** | Anti XSS 라이브러리를 서버단에 추가, 사용자는 브라우저 확장앱으로 방어 |
| **웹 방화벽** | 웹 공격에 특화된 방화벽으로 다양한 Injection을 한꺼번에 방어 |

#### [참고 사항]

- [링크](https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95)
- [링크](https://noirstar.tistory.com/266)

##### https://gyoogle.dev/blog/web-knowledge/CSRF%20&%20XSS.html

여기보고 복붙하듯 한번씩 다 써보면서 공부하려고 노력하였습니다
