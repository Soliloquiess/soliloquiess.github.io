---
title: "[front] BootStrap&Ajax"
layout: post
subtitle: front
date: '2021-03-09 19:45:51 +0900'

categories: class
tags: Front
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### Ajax(Asynchronous Javascript And XML)

#### Ajax 소개

- Ajax 는 언어나 프레임워크가 아닌 구현하는 방식 의미
- Ajax 는 웹에서 화면을 갱신하지 않고 데이터를 서버로부터 가져와 처리하는 방법을 의미
- JavaScript 의 XMLHttpRequest(XHR) 객체로 데이터를 전달하고 비동기 방식으로 결과를 조회
- 화면 갱신이 없으므로 사용자 입장에선 편리하지만 동적으로 DOM 을 구성해야 하므로 구현이 복잡.

클라이언트가 요청하면 항상 응답이 일어남.
근데 일반요청은 화면을 만들고 내가 보고있던 페이지(a.html이라 치면)가 제대로 돌아갔을때 b.html 만들었다 치면 화면 전환.

![20210309_104302](/assets/20210309_104302.png)

ajax 이용하면 폼 뿐만 아니라 일반 url  호출로도 데이터 뽑아내기 가능(get/post)

일반요청 서버는 html을 만들었다 보면 ajax는 응답을 xml로 만듬.

#### 일반 요청에 대한 응답

- DATA를 입력후 event 발생
결과적으로 서버는 일처리 한다 생각하면 됨.


- Ajax를 적용하지 않은 요청은 서버에서 데이터 이용해서 logic 처리
- logic 처리에 대한 결과에 따라 응답 페이지를 생성하고 클라이언트에 전달
- client(Browser)에서는 이 응답 데이터를 이용하여 화면 전환 없이 현재 페이지에서 동적으로 화면 재구성.


--------


#### 서버와 클라이언트의 상호작용

- 웹 화면을 구성하는 방식은 서버 중심의 상호작용 방식
- 서버 중심의 개발방식은 화면 구성이 서버에서 이루어짐.(프레젠테이션 영역의 JSP,PHP,ASP 등)
- 클라이언트 중심의 개발방식은 클라이언트(웹 브라우저)에서 화면을 구성한다.
- Ajax는 클라이언트 중심의 개발방식이며 비동기 요청보다는 동적 화면구성이 관건.


![20210309_105657](/assets/20210309_105657.png)

----


#### JavaScript AJAX

- XMLHttpRequest는 자바스크립트가 Ajax 방식으로 통신할 때 사용하는 객체

바닐라 자바스크립트건, 제이쿼리던 axios 던 통신하려면 XMLHttpRequest 가 필요. 브라우저 별로 통신 방법이 다름.

- XMLHttpRequest 객체는 Ajax 통신시 전송 방식, 경로 , 서버로 전송할 데이터 등 전송 정보를 담는 역할.
- 실제 서버와의 통신은 브라우저의 Ajax 엔진에서 수행
- 직접 자바스크립트로 Ajax 를 프로그래밍 할 경우 브라우저별로 통신방식이 달라 코드가 복잡해짐.


![20210309_110424](/assets/20210309_110424.png)


----

#### JavaScript Ajax 적용 예: HttpRequest의 속성 값.

![20210309_111004](/assets/20210309_111004.png)

----

#### Ajax(Asynchronous JavaScript And Ajax)
- $.ajax() 함수는 jqeury 에서 ajax 기능을 제공하는  가장 기본적인 함수
- 다른 함수들에 비해 옵션을 다양하게 지정 할 수 있으며 실무에서 가장 많이 사용
- 함수의 옵션은 다양하지만 대부분 자동으로 지정하므로  생략 가능.




![20210309_112634](/assets/20210309_112634.png)![20210309_112641](/assets/20210309_112641.png)



![20210309_112729](/assets/20210309_112729.png)

---

jquery Ajax 함수 - $.get(), $.post()

- $.get(), $.post() 함수는  $.ajax() 의 옵션 속성 중  type 옵션이 미리 지정된 함수

- 지정된 HTTP METHOD 로 Ajax 통신을 하며 get()은  GET방식, post 는 POST 방식을 이용

![20210309_112851](/assets/20210309_112851.png)


-------

#### GET 방식과 POST 방식

- Get 방식의 특징
- url 에 변수(데이터)를 포함시켜 요청한다.
- 데이터를 Header(헤더)에 포함하여 전송한다.
- url 에 데이터가 노출되어 보안에 취약하다.
- 전송하는 길이에 제한이 있다.
- 캐싱할 수 있다.( 캐싱이란 한번 접근 후 또 요청할 시 빠르게 접근하기 위해 데이터를 레지스터에 저장해 놓는 것)

- post 방식의 특징

- url 에 변수(데이터)를 노출하지 않고 요청한다.
- 데이터를 BOdy(바디)에 포함시킨다.
- url에 데이터가 노출되지 않아 기본 보안은 되어있다.
- 전송 길이에 제한이 없다.
- 캐싱할 수 없다.


---

##### jquery Ajax - $(selector).load()

- $.load()함수는 서버로부터 내용을 조회하여, 선택자를 통해 탐색한 DOM 객체에 동적으로 삽입.

- 첫번째 인자는 필수값으로 HTML 을 조회할 서버 URL을 지정
- 두번째 인자는 요청시 서버에 전달할 데이터를 지정.
- 세번째 인자는 서버와 통신을 완료 후에 수행할 콜백 함수를 지정.

![20210309_113352](/assets/20210309_113352.png)


----

##### 데이터 전송 형식 -csv

- server 와 client는 주고 받을 데이터 형식을 맞춰야 함
- 대표적인 data 형식은 csv, xml, json 이 있음

1.csv(comma separated values)

- 각 항목을 쉼표로 구분해 데이터 표현
- 다른 두형식에 비해 굉장히 짧음. 많은 양 데이터 전송시 유리
- 단 각각 데이터 어떤 내용인지 파악이 힘듬.

----

##### 데이터 전송형식 : XMLHttpRequest
- server와 client 는 주고 받을 data 형식을 맞춰야 함
- 대표적인 data 형식은 csv, xml , json 등이 있음.

2. XML (eXtensible MarkupLanguage).
- xml은 tag로 data를 표현함.
- tag를 보면 각 데이터가 무엇을 의미하는 지 파악 가능.
-ta에 사용자 정의 속성을 넣을 수 있으므로 복잡한 데이터 전송 가능.

---


##### 데이터 전송형식 : JSON
- server와 client는 주고받을 data형식을 맞춰야 한다.
- 대표적인 data 형식은 CSV,XML,JSON등이 있음.

3. JSON (JavaScript Object Notation)
- CSV 와 XML 단점을 극복한 형식
- javascript에서 사용하는 객체의 형식으로 데이터를 표현
- Ajax 사용시 거의 표준으로 사용되는 데이터 표현 방식.

![20210309_135626](/assets/20210309_135626.png)

----

#### Event 관리(전역함수)

- Ajax 는 서버와 통신하는 과정이 웹 브라우저 내부서 이뤄지므 사용자가 진행상황을 알기 어렵다.

- Ajax 전역함수를 사용해 Ajax 처리 중에 진행상황을 보여주는 기능을 할  수 있다.

- jquery는 ajax 처리가 이뤄지는 각 단계별로 전역함수를 호출

- 단, 제이쿼리의 전역함수는 $.ajaxSet()함수 global 프로퍼티 설정이 true인 경우에만 수행(디폴트가 true)

![20210309_135929](/assets/20210309_135929.png)



----

### Ajax 통신 원리

- 폼 전송방식이 아닌 자바스크립트 객체를 이용한(XMLhttpRequest[XHR])를 이용한 요청과 응답 처리

- 동기는 한개, 비동기는 여러개 전송(동시). 순서 상관 없이.
 비동기 같은 경우 순서 상관없이 전송 및 받아옴으로 순차 지켜가려면 잘 생각해봐야.

 ![20210309_123945](/assets/20210309_123945.png)

 ---

#### AJAX 프로세스(이거 하나만 보면 어느정도 보인다)
 ![20210309_124206](/assets/20210309_124206.png)


----

주고받는 데이터 타입 중 텍스트만 봤었는데 제이슨 보자


### JSON의 개요
- javascript object notation
- json은 텍스트 기반의 경량 데이터 변환 포맷
- 사용자가 읽고 쓰기 쉬워 데이터 처리가 쉬움
- 자바스크립트 기반으로 만들어 졌으나 프로그래밍 언어에 독립적인 텍스트 형식
- 이기종간의 데이터 교환에 적합.

---

### Json의 데이터 형식

##### 배열 구조의 제이슨


![20210309_130103](/assets/20210309_130103.png)

----


![20210309_130421](/assets/20210309_130421.png)

value가 들어갈 부분에 또 json이 오는 경우도 있다.

----

![20210309_130550](/assets/20210309_130550.png)

원래 데이터는 문자열인데 객체로 바꿈.



----



대괄호 써서 키를 적는데 문자열로 접근

두번쨰는 json.name으로 뽑아내기 가능

![20210309_131352](/assets/20210309_131352.png)


예시 보면 안에 명시적으로 들어가 있긴 함.
그랬을 때 제이슨 데이터 하면서 키를 ko로 주면 대한민국
근데 반대로 .으로 접근시엔 frvalue가 키가 되서 50으로 나옴.


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

### BootStrap(반응형 웹)

#### 반응형 웹의 장단점

###### 모든 스마트 기기에서 접속 가능
- 반응협 웹에서 사용하는 기술들은 W3C에 웹 표준으로 지정한 HTML과 CSS 로 구성되어 있음
- 스마트 워치 같은 웨어러블 기기 뿐 아니라 스마트 티비나 게임 콘솔 등 웹 표준을 지원하는 모든 기기 사용 가능

###### 가로모드에 맞춰 레이아웃 변경 가능
- 스마트폰이나 태블릿에서 가로모드로 돌렸을 때 너비값이 커지면 그에 맞춰 레이아웃을 자동으로 변경

###### 사이트 유지, 관리 용이
- PC 용 모바일 용 코드가 따로 있는 것이 아니기 때문에 유지, 관리가 쉽다.
- 서버쪽 코드가 아닌 HTML과 CSS 로만 되어있어 복잡하지 않다.


----

#### 뷰포트

- pc화면에 보이는 내용을 모바일 기기에서 그대로 볼 수 없는 이유는 pc화면과 모바일 화면의 픽셀 표현 방법이 다르기 때문.
- 뷰포트를 지정시 접속한 기기 화면에 맞춰 확대 또는 축소해 표시할 수 있다.
- 이때 뷰포트란 스마트폰 화면에서 실제 내용이 표시되는 영역을 말한다.
- 웹킷 기반인 모바일 브라우저들의 기본 뷰포트 너비는 980px, 화면 크기 고려해 320px로 맞춰 웹 사이트 제작해도 스마트폰의 모바일 브라우저 기본 뷰포트 너비가 980px 이므로 글씨와 그림은 작아진다.
- 이를 해결하기 위해 뷰포트를 지정.

---

##### 클래스 개념만 알면 부트스트랩 이용 가능

나눔.![20210309_143415](/assets/20210309_143415.png)


![20210309_143642](/assets/20210309_143642.png)


---


그리드 시스템은 모든 화면 배치는 12개로 나눔.
12개의 열로 나눠진거 잘 기억하면 디자인에 문제 별로 없을 것.

---

### BootStrap

- 부트스트랩은 빠르고 쉬운 웹개발을 위한 무료 프런트엔드 프레임워크.

- 부트스트램은 typograhpy, forms, buttons, tables, navitaion, modals, image 및 여러 기타 html,css기 디자인 템플릿과 선택적 javascript플러그인이 포함되어 있다.

- 부트스트램은 또한 반응형 디자인을 쉽게 만들 수 있는 기능을 제공한다.

---

#### 장점

- 사용하기 쉬움 : html, css의 기본적 지식만 있으면 누구나 사용 가능

- 반응형 기능: 부트스트랩의 반응형 css는 휴대폰, 태블릿 및 데스크톱에 맞게 조정된다.

- 모바일 우선 접근 방식 :Bootstrap 에서 모바일 우선 스타일은 핵심 프레임 워크의 일부

- 브라우저 호환성: 부트스트랩 4는 모든 최신 브라우저와 호환.


![20210309_144438](/assets/20210309_144438.png)

----

#### Container
- .container 클래스는 반응형 고정 너비 컨테이너를 제공
- .container-fluid 클래스는 뷰포트 전체에 걸쳐있는 전체너비

----

#### Grid System.

- 부트스트랩 그리드 시스템은 플렉스박스로 구축되어 페이지에 최대 12개의 열을 허용한다.

- 12개의 열을 모두 개별적으로 사용하지 않으려면 열을 함께 그룹화하여 더 넓은 열을 만들 수 있다.

![20210309_145059](/assets/20210309_145059.png)

---


#### Grid Class

- 클래스를 결합해 보다 동적이고 유연한 레이아웃을 만들 수 있다.

![20210309_145143](/assets/20210309_145143.png)

----


W3schools 의 bs4에서
부트스트랩 Nav가져오자

근데 그 전에

https://www.w3schools.com/bootstrap4/bootstrap_get_started.asp
에 가면 stated가 있는 데 이 부분을 가져와야만 navbar가 구현이 가능핟.
헤더에 넣어주자..


![20210309_152617](/assets/20210309_152617.png)

그리고 개발자 모드에서 저 부분을 구현하고 싶으니 저부분의 소스를 html에 넣어주자(컨트롤 씨브이)

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


![20210309_152746](/assets/20210309_152746.png)



여기서 fluid 하면 여유 없이 끝까지 감.


![20210309_153437](/assets/20210309_153437.png)

div class = "container" 를 추가해주자


---

여기에 이미지 넣어보자



그리고 테이블이 있는데 w3schools에서 테이블도 넣어보자.

그리고 부트스트랩엔 모달창이 있는데 거길 가보자.

모달에도 헤더,바디,푸터가 있는데 이 부분을 꾸미면 모달도 꾸미기가 가능핟.




실행해보면 console에 document값이 들어온다


그리고 java Traverse 로 가보자.(순회하는거)
원하는 애를 찾는 걸 traverse라 한다.



![20210309_170034](/assets/20210309_170034.png)


자바스크립트가 에러나면 디벅이하기 힘듬. 그럴떄 개발자도구로 일일이 확인.
