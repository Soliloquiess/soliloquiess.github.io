---
title: "[front] BootStrap & Ajax"
date: 2021-03-09
category: "Front"
tags: ["Front"]
description: "Ajax 개념과 XMLHttpRequest, jQuery Ajax 함수, GET/POST 방식, CSV/XML/JSON 데이터 형식, 그리고 반응형 웹과 부트스트랩 기초를 정리."
permalink: "class/2021/03/09/bootstrap"
---

## Ajax (Asynchronous JavaScript And XML)

### Ajax 소개

- Ajax는 언어나 프레임워크가 아니라 **구현하는 방식**을 의미한다.
- 웹에서 화면을 갱신하지 않고 데이터를 서버로부터 가져와 처리하는 방법이다.
- JavaScript의 `XMLHttpRequest(XHR)` 객체로 데이터를 전달하고 비동기 방식으로 결과를 조회한다.
- 화면 갱신이 없어 사용자 입장에선 편리하지만, 동적으로 DOM을 구성해야 하므로 구현이 복잡하다.

클라이언트가 요청하면 항상 응답이 일어난다. 다만 **일반 요청**은 화면 전체를 다시 만든다. 예를 들어 `a.html`에서 작업이 끝나고 `b.html`을 만들면 화면이 전환된다.

![일반 요청과 화면 전환](/assets/20210309_104302.png)

Ajax를 이용하면 폼뿐 아니라 일반 URL 호출로도 데이터를 뽑아낼 수 있다(GET/POST). 일반 요청 서버가 HTML을 만든다면, Ajax는 응답을 XML로 만든다.

### 일반 요청에 대한 응답

- 데이터를 입력한 후 이벤트가 발생하면 서버가 일을 처리한다고 생각하면 된다.
- Ajax를 적용하지 않은 요청은 서버에서 데이터를 이용해 로직(logic)을 처리한다.
- 로직 처리 결과에 따라 응답 페이지를 생성하고 클라이언트에 전달한다.
- 클라이언트(브라우저)는 이 응답 데이터를 이용해 화면 전환 없이 현재 페이지에서 동적으로 화면을 재구성한다.

---

### 서버와 클라이언트의 상호작용

- 웹 화면을 구성하는 방식은 **서버 중심의 상호작용 방식**이다.
- 서버 중심 개발 방식은 화면 구성이 서버에서 이루어진다(프레젠테이션 영역의 JSP, PHP, ASP 등).
- 클라이언트 중심 개발 방식은 클라이언트(웹 브라우저)에서 화면을 구성한다.
- Ajax는 클라이언트 중심 개발 방식이며, 비동기 요청보다는 **동적 화면 구성**이 관건이다.

![서버/클라이언트 상호작용](/assets/20210309_105657.png)

---

### JavaScript Ajax

- `XMLHttpRequest`는 자바스크립트가 Ajax 방식으로 통신할 때 사용하는 객체다.

바닐라 자바스크립트든, 제이쿼리든, axios든 통신하려면 `XMLHttpRequest`가 필요하다. 다만 브라우저별로 통신 방법이 다르다.

- `XMLHttpRequest` 객체는 Ajax 통신 시 전송 방식, 경로, 서버로 전송할 데이터 등 전송 정보를 담는 역할을 한다.
- 실제 서버와의 통신은 브라우저의 Ajax 엔진에서 수행한다.
- 직접 자바스크립트로 Ajax를 프로그래밍하면 브라우저별 통신 방식이 달라 코드가 복잡해진다.

![JavaScript Ajax 동작](/assets/20210309_110424.png)

#### HttpRequest의 속성 값 예시

![HttpRequest 속성 값](/assets/20210309_111004.png)

---

### jQuery Ajax - `$.ajax()`

- `$.ajax()` 함수는 jQuery에서 Ajax 기능을 제공하는 가장 기본적인 함수다.
- 다른 함수에 비해 옵션을 다양하게 지정할 수 있어 실무에서 가장 많이 사용한다.
- 옵션은 다양하지만 대부분 자동으로 지정되므로 생략 가능하다.

![$.ajax() 옵션 1](/assets/20210309_112634.png)![$.ajax() 옵션 2](/assets/20210309_112641.png)

![$.ajax() 사용 예시](/assets/20210309_112729.png)

---

### jQuery Ajax 함수 - `$.get()`, `$.post()`

- `$.get()`, `$.post()` 함수는 `$.ajax()`의 옵션 중 `type`이 미리 지정된 함수다.
- 지정된 HTTP METHOD로 Ajax 통신을 하며, `get()`은 GET 방식, `post()`는 POST 방식을 이용한다.

![$.get(), $.post() 예시](/assets/20210309_112851.png)

---

### GET 방식과 POST 방식

| 구분 | GET 방식 | POST 방식 |
| --- | --- | --- |
| 데이터 위치 | URL에 변수(데이터)를 포함시켜 요청 | URL에 노출하지 않고 요청 |
| 전송 위치 | Header(헤더)에 포함 | Body(바디)에 포함 |
| 보안 | URL에 데이터가 노출되어 취약 | URL에 노출되지 않아 기본 보안 됨 |
| 길이 제한 | 전송 길이에 제한 있음 | 전송 길이에 제한 없음 |
| 캐싱 | 캐싱 가능 | 캐싱 불가 |

> 캐싱이란 한번 접근 후 또 요청할 시 빠르게 접근하기 위해 데이터를 저장해 두는 것을 말한다.

---

### jQuery Ajax - `$(selector).load()`

- `$.load()` 함수는 서버로부터 내용을 조회하여, 선택자로 탐색한 DOM 객체에 동적으로 삽입한다.
- 첫 번째 인자(필수)는 HTML을 조회할 서버 URL을 지정한다.
- 두 번째 인자는 요청 시 서버에 전달할 데이터를 지정한다.
- 세 번째 인자는 서버와 통신 완료 후 수행할 콜백 함수를 지정한다.

![$.load() 예시](/assets/20210309_113352.png)

---

## 데이터 전송 형식

서버와 클라이언트는 주고받을 데이터 형식을 맞춰야 한다. 대표적인 형식으로는 **CSV, XML, JSON**이 있다.

### 1. CSV (Comma Separated Values)

- 각 항목을 쉼표로 구분해 데이터를 표현한다.
- 다른 두 형식에 비해 매우 짧아 많은 양의 데이터 전송 시 유리하다.
- 단, 각 데이터가 어떤 내용인지 파악하기 힘들다.

### 2. XML (eXtensible Markup Language)

- 태그(tag)로 데이터를 표현한다.
- 태그를 보면 각 데이터가 무엇을 의미하는지 파악 가능하다.
- 태그에 사용자 정의 속성을 넣을 수 있으므로 복잡한 데이터 전송이 가능하다.

### 3. JSON (JavaScript Object Notation)

- CSV와 XML의 단점을 극복한 형식이다.
- 자바스크립트에서 사용하는 객체 형식으로 데이터를 표현한다.
- Ajax 사용 시 거의 표준으로 사용되는 데이터 표현 방식이다.

![JSON 데이터 형식](/assets/20210309_135626.png)

---

### Event 관리(전역 함수)

- Ajax는 서버와 통신하는 과정이 웹 브라우저 내부에서 이뤄지므로 사용자가 진행 상황을 알기 어렵다.
- Ajax 전역 함수를 사용해 처리 중 진행 상황을 보여주는 기능을 할 수 있다.
- jQuery는 Ajax 처리가 이뤄지는 각 단계별로 전역 함수를 호출한다.
- 단, jQuery의 전역 함수는 `$.ajaxSetup()` 함수의 `global` 프로퍼티가 `true`인 경우에만 수행된다(디폴트가 true).

![Ajax 전역 함수](/assets/20210309_135929.png)

---

## Ajax 통신 원리

- 폼 전송 방식이 아닌, 자바스크립트 객체(`XMLHttpRequest[XHR]`)를 이용한 요청과 응답 처리다.
- 동기는 한 개씩, 비동기는 여러 개를 동시에 전송한다(순서 상관없이).
- 비동기는 순서와 상관없이 전송 및 수신하므로, 순서를 지켜야 한다면 잘 생각해 봐야 한다.

![동기/비동기 전송](/assets/20210309_123945.png)

### Ajax 프로세스 (이것 하나만 봐도 어느 정도 보인다)

![Ajax 프로세스](/assets/20210309_124206.png)

---

## JSON 자세히 보기

주고받는 데이터 타입 중 텍스트만 봤었는데, 이제 JSON을 본다.

### JSON 개요

- JavaScript Object Notation
- 텍스트 기반의 경량 데이터 변환 포맷
- 사용자가 읽고 쓰기 쉬워 데이터 처리가 쉽다.
- 자바스크립트 기반으로 만들어졌으나 프로그래밍 언어에 독립적인 텍스트 형식이다.
- 이기종 간의 데이터 교환에 적합하다.

### JSON 데이터 형식

**배열 구조의 JSON**

![배열 구조 JSON](/assets/20210309_130103.png)

![중첩 JSON](/assets/20210309_130421.png)

value가 들어갈 부분에 또 JSON이 오는 경우도 있다.

![문자열을 객체로 변환](/assets/20210309_130550.png)

원래 데이터는 문자열인데 객체로 바꾼 것이다.

![JSON 접근 방식](/assets/20210309_131352.png)

- 대괄호(`[]`)를 써서 키를 문자열로 접근한다.
- 두 번째는 `json.name`처럼 점(`.`)으로 뽑아낼 수 있다.
- 예시에서 키를 `ko`로 주면 "대한민국", 반대로 점 접근 시 `frvalue`가 키가 되어 50으로 나온다.

### 실습 예제 - 기본 Ajax 요청

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('button:first, button:eq(1)').click(function(){
				//ajax요청 보내기
				$.ajax({
					url:'first.jsp',
					success:function(result){
						$('#result').val(result);
					},
					error:function(){}
				});
			});			
		});

	</script>



</head>
<body>
	<h1>ajax test</h1>
	<button>get data</button>
	<button>post data</button>
	<hr>
	<textarea id="result" rows="10" cols="30"></textarea>

</body>
</html>
```

### 실습 예제 - 파라미터 전송 Ajax

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<script type="text/javascript">
		$(document).ready(function(){
			$('button').click(function(){
				var name = $('#name').val();
				var address = $('#address').val();//getter			

				$.ajax({
					url:'paramTest.jsp',
					data:{//서버로 보낼 데이터
						"name": name,
						"address": address
					},
					success:function(result){
						$('#result').html('<h3>' + result + "</h3>");
						$('#name').val('');//setter
						$('#address').val('');
					}
				});
			});
		});
	</script>
</head>
<body>
	<h1>ajax param test</h1>
	name:<input type="text" id="name"><br>
	address:<input type="text" id="address"><br>

	<button>send</button>
	<hr>
	<div id="result"></div>
</body>
</html>

```

---

## BootStrap (반응형 웹)

### 반응형 웹의 장단점

**모든 스마트 기기에서 접속 가능**

- 반응형 웹에서 사용하는 기술들은 W3C에 웹 표준으로 지정한 HTML과 CSS로 구성되어 있다.
- 스마트 워치 같은 웨어러블 기기뿐 아니라 스마트 TV나 게임 콘솔 등 웹 표준을 지원하는 모든 기기에서 사용 가능하다.

**가로모드에 맞춰 레이아웃 변경 가능**

- 스마트폰이나 태블릿을 가로모드로 돌렸을 때 너비값이 커지면 그에 맞춰 레이아웃을 자동으로 변경한다.

**사이트 유지·관리 용이**

- PC용/모바일용 코드가 따로 있는 것이 아니어서 유지·관리가 쉽다.
- 서버 측 코드가 아닌 HTML과 CSS로만 되어 있어 복잡하지 않다.

### 뷰포트(Viewport)

- PC 화면에 보이는 내용을 모바일 기기에서 그대로 볼 수 없는 이유는 PC와 모바일의 픽셀 표현 방법이 다르기 때문이다.
- 뷰포트를 지정하면 접속한 기기 화면에 맞춰 확대 또는 축소해 표시할 수 있다.
- 뷰포트란 스마트폰 화면에서 실제 내용이 표시되는 영역을 말한다.
- 웹킷 기반 모바일 브라우저들의 기본 뷰포트 너비는 980px다. 화면 크기를 고려해 320px에 맞춰 사이트를 제작해도, 기본 뷰포트 너비가 980px이므로 글씨와 그림이 작아진다.
- 이를 해결하기 위해 뷰포트를 지정한다.

### 클래스 개념만 알면 부트스트랩 사용 가능

![부트스트랩 그리드 나눔](/assets/20210309_143415.png)

![부트스트랩 그리드 예시](/assets/20210309_143642.png)

**그리드 시스템**은 모든 화면 배치를 12개로 나눈다. 12개의 열로 나뉜다는 점만 잘 기억하면 디자인에 큰 문제가 없다.

### BootStrap이란

- 빠르고 쉬운 웹 개발을 위한 무료 프런트엔드 프레임워크다.
- typography, forms, buttons, tables, navigation, modals, image 등 여러 HTML/CSS 기반 디자인 템플릿과 선택적 JavaScript 플러그인이 포함되어 있다.
- 반응형 디자인을 쉽게 만들 수 있는 기능을 제공한다.

#### 장점

- **사용하기 쉬움** : HTML, CSS의 기본 지식만 있으면 누구나 사용 가능
- **반응형 기능** : 휴대폰, 태블릿, 데스크톱에 맞게 조정됨
- **모바일 우선 접근 방식** : 모바일 우선 스타일이 핵심 프레임워크의 일부
- **브라우저 호환성** : 부트스트랩 4는 모든 최신 브라우저와 호환

![부트스트랩 장점](/assets/20210309_144438.png)

#### Container

- `.container` 클래스는 반응형 고정 너비 컨테이너를 제공한다.
- `.container-fluid` 클래스는 뷰포트 전체에 걸쳐있는 전체 너비를 제공한다.

#### Grid System

- 부트스트랩 그리드 시스템은 플렉스박스로 구축되어 페이지에 최대 12개의 열을 허용한다.
- 12개의 열을 모두 개별적으로 사용하지 않으려면 열을 함께 그룹화하여 더 넓은 열을 만들 수 있다.

![Grid System](/assets/20210309_145059.png)

#### Grid Class

- 클래스를 결합해 보다 동적이고 유연한 레이아웃을 만들 수 있다.

![Grid Class](/assets/20210309_145143.png)

---

### 실습: 부트스트랩 Navbar

W3Schools의 BS4에서 부트스트랩 Navbar를 가져온다. 그 전에 [Get Started](https://www.w3schools.com/bootstrap4/bootstrap_get_started.asp) 페이지에서 CDN 부분을 가져와야 navbar 구현이 가능하다. 이를 헤더에 넣어 준다.

![Navbar 가져오기](/assets/20210309_152617.png)

개발자 모드에서 원하는 부분의 소스를 HTML에 복사해 넣는다.

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="margin:24px 0;">
    <a class="navbar-brand" href="javascript:void(0)">Logo</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navb">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="javascript:void(0)">Disabled</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search">
        <button class="btn btn-success my-2 my-sm-0" type="button">Search</button>
      </form>
    </div>
  </nav>
</body>
</html>

```

![Navbar 적용 결과](/assets/20210309_152746.png)

여기서 `fluid`로 하면 여백 없이 끝까지 간다.

![container 적용](/assets/20210309_153437.png)

`<div class="container">`를 추가해 준다.

### 그 밖의 실습 거리

- 여기에 이미지를 넣어 본다.
- W3Schools에서 테이블도 넣어 본다.
- 부트스트랩의 모달창도 살펴본다. 모달에도 헤더, 바디, 푸터가 있어 이 부분을 꾸미면 모달도 꾸밀 수 있다.

실행해 보면 콘솔에 document 값이 들어온다. 그리고 jQuery Traverse(순회)로 가본다. 원하는 대상을 찾는 것을 traverse라 한다.

![jQuery Traverse](/assets/20210309_170034.png)

자바스크립트는 에러가 나면 디버깅하기 힘들다. 그럴 때는 개발자 도구로 일일이 확인한다.
