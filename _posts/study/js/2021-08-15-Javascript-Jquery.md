<!-- ---
title: "[js] Javascript, Jquery"
layout: post
subtitle: JS
date: "2021-08-15-23:45:51 +0900"

categories: study
tags: JS
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


자바스크립트는 HTML 조작을 위해 사용합니다.  



자바스크립트는 html 파일 안에 몰래 집어넣는 따까리 언어입니다.

html 파일 안에 몰래 숨어서 "html 조작과 변경" 을 담당하는 언어입니다.

그래서 자바스크립트 코드를 잘 짜시면 html을 원하는대로 마구마구 조작이 가능합니다.





왜 조작을 하냐고요?

- 탭, 모달 등 웹페이지 UI 만들 수 있음

- 유저가 입력한 데이터를 검사할 수도 있음

- 유저가 버튼누르면 서버로 데이터 요청할 수도 있음

이런 기능들을 개발할 수 있습니다.






html 조작, 변경하려면

```
<h1 id="hello">안녕하세요</h1>

<script>
  document.getElementById('hello').innerHTML = '안녕';
</script>
```

일단 html 파일 안에 h1 이런 html을 작성하고 이걸 맘대로 조작해봅시다.


자바스크립트 코드를 짜고 싶으면 script 태그 안에 적으면 됩니다.

그리고 위처럼 그대로 한 줄 작성하면 안녕하세요였던 h1태그가 안녕으로 바뀌어있습니다.

진짠지 미리보기 띄워서 확인해봅시다.

(script 안에 적은 코드는 브라우저 새로고침시 1번 실행됩니다)







자바스크립트 배운 내용은 아무것도 없지만

영어좀 알면 누구나 해석가능한 쉬운 언어입니다.

document -> 문서인데 여기선 html 웹문서겠죠

마침표 -> ~의

getElementById('어쩌구') -> 아이디가 '어쩌구'인 html 요소 (일명 element) 를 찾으셈

innerHTML -> 딱봐도 그냥 내부 HTML이라는 뜻인듯

= -> 등호는 프로그래밍에서 오른쪽에 있는걸 왼쪽에 대입하라는 뜻입니다.

'바보' -> 바보라는 문자 (큰따옴표, 작은따옴표안에 담겨있으면 항상 문자입니다.)

단어 뜻 아니까 이제 코드 해석도 가능하겠죠?
```
document.getElementById('hello').innerHTML = '안녕';
```
-> 웹문서의 id="hello"인거 찾아서 그거의 내부 HTML에 '안녕' 집어넣어라

라는 뜻입니다.


눈치 빠르면 응용도 가능할 것 같군요



Q. 'hello' 이 부분을 바꾸면 다른 html 요소도 맘대로 바꿀 수 있겠군요?

A. 넴



Q. innerHTML과 '안녕' 이 부분을 바꾸면 html 요소의 다른 내용도 바꿀 수 있겠군요?

A. 넴





그래서 빠른 결론은
```
document.getElementById('???').??? = '???';
```


여기 물음표만 맘대로 바꿔주면 html의 모든걸 변경하고 조작할 수 있습니다.



document.getElementById('???').src = 'profile.jpg';
이러면 원하는 요소에 src="profile.jpg"를 추가할 수 있고



document.getElementById('???').style.color = 'red';
이러면 원하는 요소에 style="color : red"를 추가할 수 있고

아무튼 그렇습니다 수백가지 바꿀 수 있습니다.


-----

Q. 하단 h1 내부의 글자를 'JS 고수에요'로 바꾸고 싶다면 어떻게하죠?

```
<h1 id="hi">JS 초보에요</h1>
```
이건 답인데 먼저 알아서 해보십시오
```
document.getElementById('hi').innerHTML = 'JS 고수에요';
```
언제나 미리보기로 테스트해봅시다




Q. 위의 h1 내부의 글자를 초록색으로 바꾸고 싶다면 어떻게하죠?

```
document.getElementById('hello').style.color = 'green';
```




(참고)

.getElementById()는 셀렉터라고 부릅니다. html 요소를 찾기 위해 사용합니다.

.innerHTML / .style / .color 이렇게 점찍는데 괄호없는건 메소드(또는 함수) 라고 부릅니다.

html 요소의 어떤 속성을 변경할지 결정하기 위해 사용합니다


------

프로그래밍 하는 법



프로그래밍은 별거 아니고 컴퓨터에게 일시키는게 프로그래밍입니다.

코드를 막 짜서 컴퓨터에게 저거해라 이거해라 시키는겁니다.





(중요) 컴퓨터와 사람처럼 대화하면 안됩니다.

사람은 "너 저기가서 저것좀 바꿔와" 하면 잘 알아듣습니다.

컴퓨터는 "너 저기가서 저것좀 바꿔와" 하면 절대 못알아듣습니다.

"저거가 뭐임?"

이렇게 되물을걸요



왜냐면 컴퓨터는 지능이 0 입니다.

사람처럼 유추, 상상을 할 수가 없어서 정말 정확히 설명해줘야 알아듣습니다.

"너 저기가서 저것좀 바꿔" 이게 아니라

"너 id가 hello인 html요소 있지 그거 찾아서 안의 내용을 안녕으로 바꿔"

그래야 알아듣습니다.

그래서 document부터 시작해서 코드를 저따구로 길게 상세히 짜는 것입니다.







그래서 이상한 곳에서 코딩배운 사람들 보면

사람하고 대화하는 것 처럼 코드짭니다.

***그러면 안되고 바보 멍청이 상대하듯 코드짜야 프로그래밍을 잘합니다.***

그리고 이것이 프로그래머들이 성격 이상한 이유입니다


----------

### 동적 UI 만드는 스텝 (Alert 박스 만들기)


##### 기본적인 UI 만드는 법칙



웹페이지에선 탭, 모달창, 서브메뉴, 툴팁 등 수백개의 동적인 UI를 만들 수 있습니다.

이런거 하나하나 다 가르치면 100강도 모자라기 때문에

UI 만드는 법을 알려드릴테니 이거 외워가시면 저런 UI는 알아서 다 만들 수 있습니다.



1. HTML CSS 로 미리 UI 디자인을 해놓고 필요하면 평소엔 숨김

2. 버튼을 누르거나할 경우 UI를 보여달라고 자바스크립트 코드짬

이게 다임



-----

step 1. Alert UI 디자인부터 하기



작업폴더에 main.css 이런거 하나 만들고
```
index.html <head> 태그 안에 <link href="main.css" rel="stylesheet">
```
이렇게 첨부하면 css 이용가능합니다.



html 파일에는
```
<div class="alert-box">알림창임</div>
```

css 파일에는
```
.alert-box {
  background-color: skyblue;
  padding: 20px;
  color: white;
  border-radius: 5px;
  display: none;
}
```
추가하면 디자인 완성입니다.

UI를 평소에 숨기고 싶으면 display : none 주면 됩니다.

다시 보여주고 싶으면 display : block 넣으면 보입니다.

싫으면 visibility : hidden  이것도 있습니다.

step 2. 버튼 누르면 Alert UI 보여주기



거의 모든 html 태그 내에 onclick 이라는 속성을 넣을 수 있는데

이걸 넣게되면 해당 html 을 클릭시 onclick 안의 자바스크립트를 실행해줍니다.





그럼 버튼을 눌렀을 때 자바스크립트를 실행하고 싶으면
```
<button onclick="자바스크립트~~"> 버튼 </button>
```
이렇게 코드짜면 되는 것임

```
<button onclick="Alert 박스 보여주셈~~"> 버튼 </button>
```
onclick 속성 안에 이렇게 코드짜면 버튼누르면 Alert 박스가 보이지않을까요?

근데 "Alert 박스 보여주셈~" 이렇게 사람처럼 말하면 컴퓨터는 절대 못알아듣는다고 했습니다.

컴퓨터 바보 멍청이임

정확히 어떤걸 어떻게 수정해야 박스가 보일까요?

그냥 알려드리면 display : block 이렇게 수정하면 Alert 박스가 보입니다.  



5분 드릴테니 빨리 자바스크립트 짜보십시오.

----


html을 변경할 땐 항상 document 부터 시작하는 그거 쓰면 된다고 했습니다   

그럼 "Alert 박스의 display : block 으로 바꿔라" 라고 코드를 작성하려면 어떻게 해야할까요.

고민해서 안나오는건 구글찾아보면 되는 것임




```
<button onclick="document.getElementById('어쩌구').style.display = 'block';"> 버튼 </button>
```
이러면 display가 block으로 바뀝니다.

어쩌구 자리에 Alert 박스의 id를 집어넣으면 되겠군요.

id가 없다고요? 하나 만드십시오


----------


### 자바스크립트 function 문법 사용법


닫기버튼 기능 만들라던 저번시간 숙제는


닫기버튼 누르면 Alert 박스 닫으라고 하면 됩니다.

근데 닫으라고 명령주면 컴퓨터는 못알아들으니

id가 alert 인걸 display : none 이걸로 바꾸라고 코드짜면 알아들을듯요



 ```
<div class="alert-box" id="alert">
  알림창임
  <button onclick="document.getElementById('alert').style.display = 'none'; ">닫기</button>
</div>
```
이러면 되겠군요

display : none 바꿔주는 코드를 내가 어떻게 아냐고요?

안배운건 생각한다고 나오지않습니다 당연히 구글에서 검색해봐야함


자바스크립트 function 문법



function (일명 함수) 라는 문법이 있는데

이 문법 쓰는 이유부터 알고 지나가봅시다.



함수는 길고 더러운 코드 한 단어로 축약하고 싶을 때 쓰는 문법입니다.

간지나는 개발자말로 표현하면 특정 기능을 다음에도 쓰기 위해 모듈화해놓는 문법 인데

어려우니 그냥 긴 코드 짧은 단어로 축약하고 싶을 때 쓰는 문법이라고 외우면 됩니다.




```
function 자유롭게작명(){
  축약하고 싶은 긴 코드
}
```

1. function 키워드 쓰고 소괄호, 중괄호 붙이면 됩니다.

2. 그리고 소괄호 왼쪽에 작명하고

3. 긴 코드를 중괄호 안에 담으면 코드 축약 끝입니다.

그럼 이제 자유롭게작명() 이거 쓸 때 마다 그 자리에 긴 코드가 실행됩니다.


Alert 여는 코드 function으로 축약해보기



버튼의 onclick 안에 길고 더럽게 자바스크립트 코드가 있었는데

그걸 함수 문법을 이용하면 좀 짧게 축약해서 쓸 수도 있겠군요.




```
<button onclick="알림창열기()">알림창 여는 버튼</button>

<script>
  function 알림창열기(){
    document.getElementById('alert').style.display = 'block';
  }
</script>
```
Alert 여는 코드를 function 안에 넣어봤습니다.

그럼 이제 알림창열기() 라고 쓸 때 마다 function 안에 있는 긴 코드가 실행됩니다.

그래서 버튼 onclick 안에 예전처럼 길게 코드 안짜도 됩니다. 단어하나 적으면 끝임


(참고)
함수 이름을 영어로 작명할 때

- 영어소문자로 시작합니다.

- open_alert() 이런거 안됩니다. openAlert() 이렇게 붙여서 쓰는게 자바스크립트 관습입니다. (일명 camelCase)

- 한글작명도 상관없긴합니다.


자주 겪는 에러들 1. JS 코드는 밑에 짜야합니다



자바스크립트는 html 조작하는 언어라고 했습니다.

근데 조작할 html이 위쪽에 있어야 조작이 잘 됩니다.

자바스크립트를 조작할 html 위에 작성하면 안됩니다.

왜냐면 컴퓨터가 html 파일을 읽을 때 위에서 부터 한줄한줄 읽는데

미리 html을 읽어놔야 조작이 가능하기 때문입니다.









자주 겪는 에러들 2. 오타주의



셀렉터 이런거 맨날 오타납니다.

getElementById() 인데 i를 소문자로 쓴다든지 그런 경우도 많고

아니면 getELementById('alert1111') 처럼 잘못된 id를 찾고 있거나 그럴 수도 있습니다.



다행히 이상하게 코드짜면 에러가 나는데

에러메세지는 브라우저 개발자도구 Console 탭에 들어가면 나옵니다.

브라우저에서 우클릭 - 검사 - Console탭 눌러보십시오


![20220321_112141](/assets/20220321_112141.png)

▲ 여기에 Cannot read properties of null 어쩌구 라는 에러가 나오면

alert111 이런 식으로 id 이름이 잘못되었다는 뜻입니다.


![20220321_112242](/assets/20220321_112242.png)

▲ ~~ is not a function 은 함수명이 잘못되었다는 뜻입니다.

getElementById() 이것도 소괄호 붙는거 보니까 함수인데

여기에 오타났다는 뜻입니다.



아무튼 오타났다고 알려주는 고마운 메세지니까 이거 보고 "디버깅" 이란걸 해나가면 됩니다.

버그없애는걸 디버깅이라고 합니다.

실은 에러메세지 그대로 구글 찾아보는것도 빠름











(오늘의 결론)

function 문법 생김새만 외운다고 공부 끝이 아니라

나중에 혼자서도 코드짜고 싶으면 용도를 잘 외우고 지나가면 되겠습니다.

function 왜, 언제 쓴다고 했습니까

그걸 알면 이제 자유자재로 function 활용가능한 것임


---------

------


### function의 파라미터 문법


버튼 2개를 만들어놓고

버튼1과 버튼2를 누르면 각각 다른 이름의 alert 박스가 나오도록 코드를 짜봅시다.

- 버튼1을 누르면 '아이디를 입력하세요' 라는 alert 박스가 등장해야합니다.

- 버튼2를 누르면 '비밀번호를 입력하세요' 라는 alert 박스가 등장해야합니다.









저번시간 숙제는


닫기버튼의 자바스크립트 코드를 함수로 축약해보라고 했습니다.


```
<button onclick="알림창닫기()">닫기</button>
<script>
  function 알림창닫기(){
    document.getElementById('alert').style.display = 'none';
  }
</script>
```

function에 사용가능한 파라미터 문법



파라미터라고 하면 어려우니까 구멍이라고 합시다.

함수내에 구멍을 뚫어줄 수 있습니다.


```
function 알림창열기(구멍){
  document.getElementById('alert').style.display = 구멍;
}
```
지금 함수 내에 구멍을 뚫었습니다.

구멍을 뚫는 법은

1. () 소괄호 내에 아무 글자나 적고

2. {} 중괄호 내에도 같은 글자 아무데나 적으면 됩니다.







구멍을 왜 뚫냐고요?

-> 구멍을 뚫으면 함수를 업그레이드해서 사용할 수 있습니다.



구멍이 뚫려있으면 이제 함수를 쓸 때 그냥 쓰는게 아니라

소괄호 내에 뭔가 문자나 숫자등을 입력해서 사용가능합니다.

```
function 알림창열기(구멍){
  document.getElementById('alert').style.display = 구멍;
}

알림창열기('안녕');
알림창열기('바보');
```
▲ 업그레이드 된 함수를 사용할 때는

소괄호 구멍자리에 뭔가 내가 원하는 문자를 입력해줄 수 있습니다.

문자를 입력하면 아까 그 {} 중괄호 내부의 '구멍'자리에 문자가 쇼옥하고 들어가게 됩니다.



그럼 알림창열기('안녕') 이렇게 실행하면

document.getElementById('alert').style.display = '안녕';

이런 코드가 실행된다는 것입니다.

```
function 알림창열기(구멍){
  document.getElementById('alert').style.display = 구멍;
}

알림창열기('none'); //이거 실행하면 알림창열릴듯
알림창열기('block');  //얘는 닫힐듯
```
▲ 좀 더 실용적인 사용예시를 들고왔습니다.

알림창열기('block') 이렇게 실행하면

document.getElementById('alert').style.display = 'block'; 이런 코드가 실행됩니다.

그럼 알림창이 열리겠군요



알림창열기('none') 이렇게 실행하면

document.getElementById('alert').style.display = 'none'; 이런 코드가 실행됩니다.

그럼 알림창이 열리겠군요

이렇게 하면 아까처럼 함수 2개나 만들 필요가 없어지겠죠?













이거 구멍 문법을 어디다 쓰죠?



문법만 외우고 땡이 아니라

언제 이 문법을 써야하는지 알아야 나중에 혼자서도 코드 잘짭니다.



아까는 알림창열기() 알림창닫기() 두 개의 함수를 만들어 썼지만

지금은 알림창열기(구멍) 이거 하나면 다 됩니다.

-> 그래서 비슷한 함수가 여러개 있으면 굳이 여러개 만들 필요 없이 하나가지고 구멍만 뚫어보십시오.

함수 하나가지고 다양한 기능을 실행할 수 있게 됩니다.

이거 외엔 쓸데없습니다

















파라미터 문법 이해를 위한 예시 2



```
function plus(){
  2 + 1
}
```

코드를 짜다가 2 + 1 같은 어렵고 복잡한 수식을 함수로 축약해서 사용하고 있습니다.

근데 갑자기 2 + 2 도 필요하고 2+ 3 도 필요한 겁니다.

그럼 어떻게하죠?




```
function plus(){
  2 + 1
}

function plus2(){
  2 + 2
}

function plus3(){
  2 + 3
}
```

이렇게 하면 될듯요

근데 비슷한 함수들은 굳이 많이 만들 필요없습니다.

구멍 문법이 있기 때문입니다.
```
function plus(구멍){
 2 + 구멍
}
```
가변적인 부분을 구멍뚫어주면

이제 함수 쓸 때 마다

plus(1) 하면 2 + 1 해주고

plus(2) 하면 2 + 2 해주니까

함수 하나로 해결가능합니다.



그래서 쓰는 문법이 구멍문법입니다.













파라미터 문법 특징



이제 쪽팔리니까 구멍말고 파라미터라고 합시다.

파라미터 문법 세부사항 2개가 있는데



1. 파라미터는 자유롭게 작명가능합니다.
```
function plus(a){
 2 + a
}
```



2. 파라미터는 2개 이상 사용가능합니다.
```
function plus(a, b){
 a + b
}
plus(2, 5);
```
콤마로 구분하면 됩니다.

그럼 함수 사용할 때도 자료 2개 입력가능

(참고) 함수는 원래 수학에서 온건데



실은 수학시간의 함수 vs 자바스크립트의 함수는 둘 다 같은 역할을 합니다.





중학교 수학시간을 떠올려봅시다. 이런거 배웠을 걸요

f(x) = x + 1 일때
f(3)은 뭘까요? -> 4임
f(5)는 뭘까요? -> 6임


x를 구멍으로 바꾸면 자바스크립트랑 똑같습니다.

실은 함수는 수학에서 "뭔가 input 넣으면 규칙에 따라 output을 출력해주는 마법의 모자" 만들 때 사용합니다.


![20220321_173126](/assets/20220321_173126.png)

외국에선 중학교 수학시간에 함수를 마법의 모자, 블랙박스 이렇게 비유해서 표현하곤 합니다.

자바스크립트 함수도 "구멍에 뭐 집어넣으면 규칙에 따라 각각 다른 기능 실행해주는 마법의 모자" 일 뿐입니다.

아무튼 비유하자면 그렇습니다.


 --------

 ### 자바스크립트 이벤트 리스너


 저번시간 숙제는



 버튼1 누르면 '아이디입력하세요' 라는 alert 박스가 떠야함

 버튼2 누르면 '비번입력하세요' 라는 alert 박스가 떠야함



 구현방법은 2개가 있겠군요

 1. 미리 html로 alert 박스를 2개 만들어놓고

 버튼1 누르면 박스1 띄우기~

 버튼2 누르면 박스2 띄우기~

 이렇게 짜도 되겠지만 이러면 나중에 alert 박스가 100종 필요하면 어떻게 되겠습니까. 끔찍하군요



 2. 기존에 있던 alert 박스를 재사용하는겁니다.

 버튼1 누르면 alert 박스 안의 제목을 "아이디입력하세요"로 바꾸고 alert 박스 띄우기

 버튼2 누르면 alert 박스 안의 제목을 "아이디입력하세요"로 바꾸고 alert 박스 띄우기

 이러면 효율적일듯요

 자바스크립트가 가장 잘하는게 html 변경이니까 제목 바꾸는건 일도 아님











 ###### HTML 복붙 100번 하지말고 UI를 재사용해보자  





 1. 버튼1 누르면 alert 박스 안의 제목을 "아이디입력하세요"로 바꾸고

 2. alert 박스 띄우기

 이걸 구현해봅시다.

 저렇게 한글부터 상세히 짜고 그대로 자바스크립트로 바꾸면 쉽습니다.

 ```
 <div class="alert-box" id="alert">
   <p id="title"> 알림창임 </p>
   <button>닫기</button>
 </div>

 <button onclick="아이디알림창()">버튼1</button>
 <button>버튼2</button>

 <script>
   function 아이디알림창(){
     document.getElementById('title').innerHTML = '아이디입력하셈';
     document.getElementById('alert').style.display = 'block';
   }
 </script>
 ```

 이렇게 해봤다고 합니다.

 그럼 버튼1 누르는 순간 'p id="title"' 내부 글자가 바뀌고

 alert 박스도 뜹니다.

 숙제 1번 끝


```
<div class="alert-box" id="alert">
  <p id="title"> 알림창임 </p>
  <button>닫기</button>
</div>

<button onclick="아이디알림창()">버튼1</button>
<button onclick="비번알림창()">버튼2</button>

<script>
  function 아이디알림창(){
    document.getElementById('title').innerHTML = '아이디입력하셈';
    document.getElementById('alert').style.display = 'block';
  }

  function 비번알림창(){
    document.getElementById('title').innerHTML = '비번입력하셈';
    document.getElementById('alert').style.display = 'block';
  }
</script>
```

버튼2도 이렇게 해봤다고 합니다.

근데 잘 보니 함수 2개가 비슷하군요

그럼 구멍문법쓰면 함수 하나로도 충분할 것 같은데 심심하면 직접 해보도록 합시다.











###### getElementsByClassName 셀렉터



어떤 html 요소를 찾고 변경할 때 id로 찾았었는데

실은 class 같은걸로도 찾을 수 있습니다.

```
<p class="title1"> 테스트1 </p>
<p class="title1"> 테스트2 </p>
```
이런 html요소가 있다고 칩시다.

얘를 셀렉터로 찾고 변경하고 싶으면 class명이 title1인걸 찾아라~ 라고 명령줄 수도 있습니다.




```
<p class="title1"> 테스트1 </p>
<p class="title1"> 테스트2 </p>
<script>
  document.getElementsByClassName('title1')[0].innerHTML = '안녕';
</script>
```
이러면 첫 p 태그 내용이 안녕으로 바뀝니다.

getElementsByClassName('클래스명')[순서] 이렇게 쓰면 됩니다.

[0] 이렇게 순서를 넣는 이유는

getElementsByClassName 셀렉터는 일치하는 class가 들어있는 모든 html 요소를 찾아주기 때문입니다.

그래서 그 중에 몇번째 요소를 바꿀지 [순서]를 꼭 뒤에 붙여줘야합니다.

[0] 이렇게 쓰면 찾은 것 중 위에서 부터 1번째 요소

[1] 이렇게 쓰면 찾은 것 중 위에서 부터 2번째 요소

[2] 이렇게 쓰면 찾은 것 중 위에서 부터 3번째 요소

...

이렇게 쓰면 됩니다.

대괄호 안붙이면 안됨



실은

getElementsByTagName -> 태그명으로 찾아줌

getElementsByName -> name 속성으로 찾아줌

등 여러가지 셀렉터가 있는데 class, id 로 찾는게 가장 흔해서 그것만 아셔도 됩니다.








이벤트 리스너



지금까진 버튼의 onclick=" " 안에 자바스크립트를 길게 짰는데 이것도 좀 더러워보입니다.

그게 보기싫으면 이벤트리스너 문법 사용하면 됩니다.

그럼 html 안에 자바스크립트 안적고도 똑같이 개발진행할 수 있습니다.







이벤트 리스너는 이렇게 사용합니다.
```
document.getElementById('어쩌구').addEventListener('click', function(){
    //실행할 코드
});
```
이렇게 작성하면 'id가 어쩌구인 요소를 클릭하면 안의 코드를 실행해주세요~' 라는 뜻입니다.

이거 쓰면 버튼 같은 곳에 onclick 넣을 필요가 없겠군요 ㄷㄷ
```
<div class="alert-box" id="alert">
  <p id="title">알림창임</p>
  <button id="close"> 닫기 </button>
</div>
```
Q. alert 박스 내부에 닫기버튼이 있습니다.

이걸 누르면 alert 창이 닫히도록 하려면 어떻게 기능개발을 해야할까요?

onclick 말고 addEventListener를 써봅시다.

어떻게 하냐면


밑에다가 script 태그 열고
```
document.getElementById('close').addEventListener('click', function(){
    document.getElementById('alert').style.display = 'none'
});
```
이렇게 작성하면 끝입니다.

HTML은 안건드려도 되어서 깨끗해지지만 자바스크립트 양은 살짝 늘어났군요.

그래서 쓰고싶으면 쓰시면 되는데 저는 맨날 써볼겁니다.


더 배워볼 개념 1. event



이벤트 리스너를 배웠는데 이벤트가 뭐냐고요?

유저가 웹페이지 접속해서 클릭, 스크롤, 키보드입력, 드래그 등을 할 수 있는데 이걸 전문용어로 이벤트라고 부릅니다.

어떤 요소 클릭시엔 click 이벤트

마우스갖다대면 mouseover 이벤트

스크롤하면 scroll 이벤트

키입력하면 keydown 이벤트

... 몇십가지가 있습니다.



그리고 이벤트가 일어나길 기다리는 친구가 이벤트 리스너입니다.

이벤트 리스너는 이벤트가 일어나면 내부 코드를 실행해주는 고마운 기본 문법입니다.  







그럼 이벤트 리스너 쓰면 다양한 이벤트도 체크가능하겠군요?

예시를 보도록 합시다.


```
셀렉터로찾은요소.addEventListener('mouseover', function(){
  실행할코드
});
````
▲ 이러면 셀렉터로찾은요소에 마우스를 스윽 갖다대면 특정 코드를 실행해줍니다.


```
셀렉터로찾은요소.addEventListener('scroll', function(){
  실행할코드
});
```
▲ 이러면 셀렉터로찾은요소가 스크롤되면 특정 코드를 실행해줍니다. (당연히 그 요소에 스크롤바가 있어야됨)


```
셀렉터로찾은요소.addEventListener('keydown', function(){
  실행할코드
});
```
▲ 셀렉터로찾은요소에 키보드로 글자를 입력하면 특정 코드를 실행해줍니다. (그 요소가 글자를 입력할 수 있는 input 이런거여야 합니다)





이벤트 종류는 수십가지가 있습니다.

https://developer.mozilla.org/en-US/docs/Web/Events

▲ 이벤트 목록인데 이런거 미련하게 외우지 마시고 필요할 때 찾아쓰십시오.


더 배워볼 개념 2. 콜백함수


```
셀렉터로찾은요소.addEventListener('scroll', function(){} );
```
이벤트 리스너 생김새를 잘 보면 함수같이 생겼습니다.

실은 뒤에 소괄호 붙으면 다 함수입니다.



근데 addEventListener() 함수에는 파라미터 자리에 2개의 자료를 집어넣죠?

맞습니다 자바스크립트 addEventListener 문법 만든 사람이 그렇게 쓰라고 해서 그렇게 쓸 뿐인데

둘째 파라미터로 함수가 들어가네요?

그래도 됩니다.



저렇게 함수 파라미터자리에 들어가는 함수를 전문용어로 '콜백함수'라고 합니다.

콜백함수는 그냥 뭔가 순차적으로 실행하고 싶을 때 많이 보이는 함수형태며

그냥 함수안에 함수 넣으라고 하면 "아 저건 콜백함수구나~" 라는 반응만 보이면 됩니다.



지금 코드짤 때는 우리가 콜백함수를 직접 작성하고 그럴 일은 없고

콜백함수 쓰라고 하는 자리가 있으면 잘 쓰기만 하면 됩니다.

--


### 서브메뉴 만들어보기와 classList 다루기

오늘의 숙제 :

심심하면 지금까지 썼던 셀렉터를 querySelector로 다 바꿔보십시오








![20220321_174725](/assets/20220321_174725.png)




버튼누르면 등장하는 서브메뉴를 만들며

자바스크립트로 class 탈부착하는 문법을 배워봅시다.


Bootstrap 설치해서 쓸 것임



Bootstrap css 파일을 설치해놓으면

버튼, 탭, 메뉴 같은걸 복붙식으로 개발할 수 있습니다.

css 짜기 귀찮으니 설치해봅시다.

구글에 bootstrap 검색하면 나오는 맨 첫 사이트 들어가보면 되겠습니다.

그리고 get started 버튼 누르면 됩니다.

1. 우선 우측 위에서 버전이 5.X 버전인지 확인한 후에





<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
2. css 파일은 head 태그 안에,

3. js 파일은 body태그 끝나기 전에 붙여넣으면 설치 끝입니다.



https://getbootstrap.com/docs/5.1/getting-started/introduction/#starter-template

모르겠다면 그냥 starter template 항목에 있는 예제코드로 html파일 내용을 갈아치우면 설치됩니다.

갈아치웠으면 css 파일도 link태그로 잘 넣으셈


Navbar 만들기



Bootstrap을 설치해놨으면

그 사이트에서 원하는 웹 UI 검색해서 복붙하면 웹페이지 개발 끝입니다.

버튼같은거 검색해서 예제코드 붙여넣어보셈





하지만 우린 상단 메뉴부터 만들어봅시다.

상단메뉴 이름은 Navbar 입니다.

그거 하나 맘대로 복사붙여넣기 해보면 되는데

근데 그냥 이거 복사붙여넣기 하십시오


```
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-brand">Navbar</span>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
```
이러면 상단바 제작 끝입니다.

![20220321_174725](/assets/20220321_174725_kjfbkcd7r.png)

그럼 이제 버튼 누르면 등장하는 서브메뉴를 만들어봅시다.

저런 UI 어떻게 만든다고 했습니까

1. 미리 html css로 디자인 해놓고 숨기든가 함

2. 버튼누르면 보여줌

이러면 끝이라 미리 디자인부터 합시다.





디자인은 그냥 Bootstrap 홈페이지에서 list group 찾아서 <nav>밑에 복붙하면 될듯요
```
<ul class="list-group">
  <li class="list-group-item">An item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>
```
서브메뉴의 html css 디자인 완성

하지만 이번엔 class 탈부착식으로



버튼 누르면 보여달라고 코드짭시다.

어쩌구.style.display = 'block'

이렇게 해도 되겠지만 지겨우니까 이번엔 class 탈부착식으로 구현해봅시다.




```
.list-group {
  display : none
}
.show {
  display : block
}
```
css 파일 열어서 평소에 .list-group 붙은 요소는 숨겨놓도록 합시다.

그리고 거기에 show라는 클래스를 부착하면 보여주는 식으로 개발해봅시다.

이제 버튼누르면 ul class="list-group" 에다가 show라는 클래스 부착하라고 코드짜면 서브메뉴 UI 완성임



왜 이따구로 class를 부착해서 만드냐고요?

나중에 display : block 말고 다른 스타일도 동시에 주고 싶을 경우 유용해서 그렇습니다.

버튼 클릭시 저기에 클래스명을 추가해주세요



버튼 눌렀을 때 show 라는 클래스를 저기에 추가해봅시다.

class명을 원하는 요소에 추가하는 법은

셀렉터로찾은요소.classList.add('클래스명') 이렇게 쓰면 됩니다.

class명을 원하는 요소에서 제거하는 법은

셀렉터로찾은요소.classList.remove('클래스명') 이렇게 쓰면 됩니다.

당연히 구글 검색해봐야 알지 생각해서 나오는 것들이 아닙니다.






```
document.getElementsByClassName('navbar-toggler')[0].addEventListener('click', function(){
  document.getElementsByClassName('list-group')[0].classList.add('show');
});
```
▲ 그래서 class="navbar-toggler" 가진 요소 클릭하면

class="list-group"인 요소에 show라는 클래스명 추가하라고 코드를 짰습니다.

이제 버튼누르면 서브메뉴가 잘 보이는군요.

버튼 한 번 더 누르면 숨기기



버튼을 한 번 더 누르면 서브메뉴를 숨기고 싶은겁니다.

그럼 당연히 노예 컴퓨터에게 이렇게 명령내리면 됩니다.

"버튼 한 번 더 누르면 show 클래스를 제거해주세요"

근데 이건 나중에 if문, 변수문법을 배우면 직접 만들어볼 수 있기 때문에

좀 쉬운 방법을 먼저 알려드리자면


```
document.getElementsByClassName('navbar-toggler')[0].addEventListener('click', function(){
 document.getElementsByClassName('list-group')[0].classList.toggle('show');
});
```
.classList.toggle() 쓰면

- 클래스명이 있으면 제거하고

- 클래스명이 없으면 붙여줍니다.

그래서 왔다갔다하는 UI 만들 때 유용하게 쓰면 되겠습니다.


querySelector



getElementById()

getElementsByClassName()

이거 말고도 다른 방식으로 html 요소를 찾아주는 셀렉터도 있습니다.

querySelector인데 이거 쓰면 css 잘하는 분들은 편리하게 사용가능합니다.






```
<div class="test1">안녕하세요</div>
<div id="test2">안녕하세요</div>

<script>
  document.querySelector('.test1').innerHTML = '안녕';
  document.querySelector('#test2').innerHTML = '안녕';
</script>
```

querySelector() 안에는 css 셀렉터 문법을 사용가능합니다.

(css에서 마침표는 class라는 뜻이고 #은 id라는 뜻임)

다만 querySelector() 는 맨 위의 한개 요소만 선택해줍니다.
```
<div class="test1">안녕하세요</div>
<div class="test1">안녕하세요</div>

<script>
  document.querySelectorAll('.test1')[1].innerHTML = '안녕';
</script>
```
▲ 그래서 위처럼 test1이라는 클래스가 중복으로 여러개 있는데

X번째 요소를 선택하고 싶은 경우엔 querySelectorAll() 쓰면 됩니다.



querySelectorAll() 은 해당하는걸 다 찾아서 [] 안에 담아줍니다.

그래서 [숫자] 를 뒤에 붙여서 원하는 위치에 있는 요소 찾아쓰면 됩니다.





그래서 심심하면 지금까지 썼던 셀렉터를 querySelector로 다 바꿔보십시오

--------

### jQuery 사용법 간단정리


오늘의 숙제 :

버튼하나 아무데나 만들고 버튼 누르면 모달창을 띄워오십시오.

모달창 디자인은

```
<div class="black-bg">
  <div class="white-bg">
    <h4>로그인하세요</h4>
    <button class="btn btn-danger" id="close">닫기</button>
  </div>
</div>
```
```
.black-bg {
  width : 100%;
  height : 100%;
  position : fixed;
  background : rgba(0,0,0,0.5);
  z-index : 5;
  padding: 30px;
}
.white-bg {
  background: white;
  border-radius: 5px;
  padding: 30px;
}
```
위의 html, css를 복사붙여넣기 하면 모달창이 보입니다.

html은 <body>태그 내부 가장 위에 붙여넣기 하면 잘보입니다.

평소엔 숨겨놓았다가 버튼 누르면 모달창을 띄워보십시오.

자바스크립트 특징인데 코드가 매우 길고 더럽습니다.

그게 불만이면 html 조작을 쉽게 바꿔주는 라이브러리들을 사용가능합니다.

React, Vue, jQuery 이런 것들이 전부 html 조작 쉽게 바꿔주는 라이브러리들입니다.

React와 Vue는 자바스크립트 어느정도 문법을 알아야 사용가능하기 때문에 나중에 도전해보시고

우선 jQuery를 사용해봅시다.





Q. 어 저는 jQuery 말고 자바스크립트언어를 배우고 싶은데요

A. jQuery는 자바스크립트 querySelectorAll, addEventListener, classList.add 이런 것들을

이름만 훨씬 짧게 바꿔주는 라이브러리일 뿐 다른 언어 그런거 아닙니다.

굳이 싫다면 쌩자바스크립트로 알아서 길게 쓰도록 합시다.

초보들 코드읽기에 짧고 좋아서 쓰는 것임













jQuery 설치는



구글에 jQuery cdn 이런거 검색하면 나오는 사이트가 있습니다.

거기서 jQuery 3.x 버전 script 태그를 찾아서 여러분들 html 파일에 복붙하면 설치 끝입니다.


```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
귀찮으면 제가 찾은거 쓰십쇼



이제 jQuery 설치한 곳 하단에서 jQuery 문법을 사용가능합니다.

jQuery 설치한 곳 상단에 코드짜면서 뭔가 안된다고 그러면 혼납니다.

jQuery 써서 html 변경하려면


```
<p class="hello">안녕</p>

<script>
  $('.hello').html('바보');
</script>
```
이렇게 코드 양이 절반으로 줄어들어서 쓰는 것일 뿐입니다.

$ 이건 querySelector와 동일하게 사용하면 됩니다.











jQuery 써서 스타일 변경하려면


```
<p class="hello">안녕</p>

<script>
  $('.hello').css('color', 'red');
</script>
```
이러면 css 스타일 변경이 가능합니다.



(주의) html 셀렉터로 찾으면 html 함수들을 뒤에 붙여야하고

jQuery 셀렉터로 찾으면 jQuery 함수들을 뒤에 붙여야 잘됩니다.

$('어쩌구').innerHTML 이건 안된다는 소리입니다.

jQuery 써서 class 탈부착하려면


```
<p class="hello">안녕</p>

<script>
  $('.hello').addClass('클래스명');
  $('.hello').removeClass('클래스명');
  $('.hello').toggleClass('클래스명');
</script>
```
이러면 됩니다. toggleClass는 왔다갔다 토글해줍니다.









html 여러개를 바꾸려면


```
<p class="hello">안녕</p>
<p class="hello">안녕</p>
<p class="hello">안녕</p>

<script>
  document.querySelectorAll('.hello')[0].innerHTML = '바보';
  document.querySelectorAll('.hello')[1].innerHTML = '바보';
  document.querySelectorAll('.hello')[2].innerHTML = '바보';
</script>
```
<p> 태그 3개 내용을 일괄적으로 '바보'로 바꾸려면

그냥 자바스크립트는 저렇게 3줄 쓰면 됩니다.




```
<p class="hello">안녕</p>
<p class="hello">안녕</p>
<p class="hello">안녕</p>

<script>
  $('.hello').html('바보');
</script>
```
그런데 $() 셀렉터는 그냥 querySelectorAll처럼 여러개가 있으면 전부 찾아줍니다.

그리고 거기에 [0] 이런 식으로 순서지정해줄 필요없이 냅다 .html() 붙이면

셀렉터로 찾은 모든 요소를 한 번에 조작하고 변경해줄 수 있습니다.


이벤트리스너는


```
<p class="hello">안녕</p>
<button class="test-btn">버튼</button>

<script>
  $('.test-btn').on('click', function(){
    어쩌구~
  });
</script>
```
addEventListener 대신 on 쓰면 똑같습니다.

on은 $() 이걸로 찾은 것들에만 붙일 수 있습니다.











UI 애니메이션은


```
<p class="hello">안녕</p>
<button class="test-btn">버튼</button>

<script>
  $('.test-btn').on('click', function(){
    $('.hello').fadeOut();
  });
</script>
```
.hide() 는 사라지게

.fadeOut() 은 서서히 사라지게

.slideUp() 은 줄어들며 사라지게 만들어줍니다.

간단한 애니메이션은 이런 식으로 쉽게 사용가능합니다.



애니메이션을 반대로 주고 싶으면 show() fadeIn() slideDown() 이런게 있습니다.

아니면 fadeToggle() 이런 것도 있음

----------


### 모달창만들기와 간단한 애니메이션


모달창 띄우기 숙제 1. 클래스부터 만들어놓읍시다



버튼 누를 때 display : block 그냥 대충 줘도 되겠지만 나중을 위해 class 부착식으로 만들어봅시다.


```
.black-bg {
  (생략)
  display : none;
}

.show-modal {
  display : block;
}
```
그래서 css 파일열어서

모달창에 붙어있던 기본 class엔 display : none을 추가했고

show-modal 이라는 class를 만들었습니다.

이제 show-modal 원할 때 부착하면 모달창 보일듯요











모달창 띄우기 숙제 2. 버튼클릭시 모달창 띄워주세요



버튼클릭시 모달창 띄워달라고 컴퓨터에게 명령주면 되는데

"띄워주세요~" 라고 코드짜면 컴퓨터가 알아듣겠습니까.

지능이 없는 친구이기 때문에

show-modal 이라는 class를 부착이나 해달라고 구체적으로 명령주면 됩니다.




```
<button id="login">로그인</button>
<script>
  $('#login').on('click', function(){
    $('.black-bg').addClass('show-modal');
  });
</script>
```
그래서 버튼누르면 .black-bg에 show-modal 클래스명 추가하라고 코드짰습니다.

쌩자바스크립트는 document.querySelector('.black-bg').classList.add('show-modal') 하면 되겠군요.

닫기버튼과 기능은 알아서 만들어오십시오.













UI 애니메이션 만드는 법



fade 애니메이션은 이렇게 만들어요~

slide 애니메이션은 이렇게 만들어요~

이렇게 가르치면 100강도 모자라서 평생 강의듣다가 인생끝나니까

UI 애니메이션 만드는 법을 알려드리도록 하겠습니다.

실은 자바스크립트말고 css 잘하면 됩니다.





[ one-way 일방향 애니메이션 만드는 법 ]

1. 시작스타일 만들고 (class로)

2. 최종스타일 만들고 (class로)

3. 원할 때 최종스타일로 변하라고 JS 코드짭니다

4. 시작스타일에 transition 추가

A 상태에서 B 상태로만 움직이는 one-way 애니메이션은 다 이렇게 만들면 됩니다.









![20220321_175741](/assets/20220321_175741.png)



그럼 모달창 fade-in 애니메이션을 만들어봅시다.











1. 시작스타일 2. 최종스타일을 class로 만들어봅시다.



애니메이션 동작 전 스타일과 동작 후 스타일을 class로 각각 만들어두라는 소리입니다.

```
.black-bg {
  (생략)
  visibility : hidden;
  opacity : 0;
}
.show-modal {
  visibility : visible;
  opacity : 1;
}
```
기존에 있던 display 어쩌구는 다 버리고 이렇게 코드짰습니다.

- display : none을 주면 애니메이션이 잘 동작하지 않기 때문에

그거랑 비슷한 역할을 할 수 있는 visibility : hidden 을 사용했습니다.

- opacity는 투명도 조절할 수 있는 속성입니다.

0이면 투명 1이면 불투명 0.5면 반투명임









3. 원할 때 최종스타일로 변하라고 자바스크립트 코드짬



이건 아까 했습니다.

로그인버튼 누르면 알아서 show-modal 부착되고 그럼 최종스타일로 변하는군요









4. 시작스타일에 transition 추가


```
.black-bg {
  (생략)
  visibility : hidden;
  opacity : 0;
  transition : all 1s;
}
.show-modal {
  visibility : visible;
  opacity : 1;
}
```
transition은 스타일이 변할 때 천천히 변경하라는 뜻입니다.

지금 class 탈부착시 opacity가 변하는데 그걸 천천히 1초에 걸쳐 변경해줍니다.

애니메이션 구현 끝









Q. 그럼 모달창이 위에서 밑으로 내려오는 애니메이션은 어떻게 만들까요?

Q. 서브메뉴가 접혔다 펴지는 애니메이션은 어떻게 만들까요?

심심하면 집에서 해봅시다. 저거 4-step 따라하면 됩니다.

이건 자바스크립트보다는 css 실력에 달린 것이라 css 잘 모르면 못하는게 당연합니다.











예를 들면 서브메뉴 이렇게 접히는건

서브메뉴의 height를 0px 에서 400px 로 조절하면 되는데

overflow : hidden 이런것도 있으면 될듯 합니다.


-----

### 폼만들며 배워보는 if else

오늘의 숙제 :

전송버튼 클릭시 첫째 input에 입력된 값이 공백이면 아이디 입력하라고 알림을 띄워봅시다.











form 만들기



form과 기능을 만들면서 if else 문법을 배워보도록 합시다.
```
<form action="success.html">
  <div class="my-3">
    <input type="text" class="form-control">
   </div>
   <div class="my-3">
     <input type="password" class="form-control">
   </div>
   <button type="submit" class="btn btn-primary">전송</button>
   <button type="button" class="btn btn-danger" id="close">닫기</button>
</form>
```
▲ 모달창 안에 폼 이렇게 만들어보십시오.

그리고 전 닫기버튼도 폼 안으로 옮겼습니다.

그리고 success.html 파일도 같은 폴더에 하나 만들어두면 되겠습니다. 파일 내용은 아무 글자나 채웁시다.





지금은 전송버튼 누르면 폼 전송이 되며 success.html로 이동합니다.

근데 여기에 제한을 걸어봅시다.

첫 input에 입력한 값이 아무것도 없으면 전송버튼 누를 때 알림을 띄워봅시다.



그럼 자바스크립트로

전송버튼누르면
저기 input에 입력된 값이 공백이면 알림띄워주세요
코드 짜면 되는데 "이런 경우 코드 실행해주세요~" 라는 표현법은 배우지 않았습니다.

이 경우엔 자바스크립트 if 문법쓰면 됩니다.













잠깐 문법수업 : if else 조건문



조건부로 코드를 실행하고 싶으면 if 문법을 쓰면 됩니다.
```
if (조건식){
  실행할코드
}
```
이렇게 적으면 됩니다.

조건식이 참일 때 중괄호 안에 있는 코드를 실행해줍니다.




```
if (3 > 1){
  console.log('안녕')
}
```
그래서 이렇게 쓰면 된다는 소리입니다.

콘솔창 열어보면 '안녕'이 잘 뜹니다.

조건식란엔 대부분의 경우엔 등호, 부등호 이런거 넣으면 됩니다.



비교연산자


수학에서의 등호, 부등호를 프로그래밍할 때도 똑같이 사용가능합니다.

같다고 비교하고 싶으면 ==

크거나 작은지 비교하고 싶으면 >, <

크거나 같다, 작거나 같다는 >=, <=

다른지 비교하고 싶으면 !=

이런거 쓰면 됩니다.







```
if (3 < 1){
  console.log('안녕')
} else {
  console.log('안녕2')
}
```
"조건식이 참이 아니면 이거 실행해주세요~" 라고 코드 짜고 싶으면

else 조건문 쓰면 됩니다. if 뒤에만 붙일 수 있습니다.

그럼 위의 코드는 콘솔창에 뭐가 출력될까요 실험해보십시오.













간편한 alert 함수



간단한 알림팝업 띄우고 싶으면 alert('어쩌구') 쓰면 됩니다.



![20220321_182417](/assets/20220321_182417.png)



이런 화면으로 사용자에게 간단한 안내문을 간편하게 띄울 수 있습니다.

이걸 이용해서 오늘의 숙제를 해오도록 합시다.

첫째 input에 입력한 값이 공백이면 alert('아이디입력하세요') 라고 안내문을 띄워보도록 합시다.

입력한 값이 공백인지 어떻게 알 수 있냐고요?

자바스크립트 쓰면 html 내의 모든걸 찾고 조작할 수 있다고 했습니다.

input에 입력한 값 찾는 법도 있습니다.

안배운 것은 당연히 생각해서 나오는게 아니라 검색해봐야합니다.


----------


### 공백 검사 숙제와 else if 문법

오늘의 숙제 :

1. 전송버튼 누를 때 아이디랑 패스워드 둘 다 공백검사하려면?

2. 전송버튼 누를 때 입력한 비번이 6자 미만이면 알림띄우기











전송버튼 누르면 공백체크하라던 숙제



1. 전송버튼누르면

2. 저기 input에 입력한 값이 공백인 경우 알림 띄우기


```
$('form').on('submit', function(){
  input에 입력한 값이 공백인 경우 알림 띄우기~~
});
```
▲ 1번은 이렇게 했는데

버튼에 click 이벤트리스너 달아도 되고 <form>태그 찾아서 submit 이벤트리스너 달아도 됩니다.

똑같이 동작합니다. 왜냐면 폼전송이 되면 <form> 태그에서 submit 이벤트도 발생해서 그렇습니다.

원하는 html을 태그명으로 찾고 싶으면 마침표나 # 없이 $('태그명')만 적으면 됩니다.












```
$('form').on('submit', function(){
  if (input에 입력한 값이 공백) {
    alert('아이디 입력하쇼');
  }
});
```
▲ 2번은 이렇게 했는데

근데 input에 입력한 값을 어떻게 찾는지는 배운 적이 없어서 구글찾아봤습니다.

그랬더니 document.getElementById('인풋태그찾고').value 쓰면 된다는군요.

진짜 유저가 입력한 값이 나오나 콘솔창에 한번 실험해보십시오.











input 태그에 id="email" 좀 주고 저렇게 출력해봤더니

진짜로 입력된 값이 나옵니다.











input 태그에 아무것도 안썼을 땐

따옴표 2개만 나오는군요 이게 공백이라는 뜻인가봅니다.




```
$('form').on('submit', function(){
  if (document.getElementById('email').value == '') {
    alert('아이디 입력하쇼');
  }
});
```
그래서 이렇게 코드짰더니 의도대로 잘 동작합니다.

jQuery로 짧게 쓰려면 $('#email').val() == '' 쓰면 됩니다.













폼 전송 막는 법


```
$('form').on('submit', function(e){
  if (document.getElementById('email').value == '') {
    e.preventDefault();
    alert('아이디 입력하쇼');
  }
});
```
나중에 배울 것인데

이벤트리스너 콜백함수에 e라는 파라미터 추가해주고

e.preventDefault() 라고 쓰면 폼전송이 안됩니다.













else if 문법



else if 라는 키워드도 있습니다.

if문 뒤에 몇번이고 원하는 만큼 붙일 수 있습니다.


```
if (1 == 3) {
  console.log('맞아요1')
} else if (3 == 3){
  console.log('맞아요2')
}
```
else if 뜻은 "그게아니면 만약에" 라는 뜻입니다.

그래서 1 == 3 비교해보고 그게 아니면 3 == 3 비교해보고 이게 참이면 맞아요2를 출력해줍니다.






```
if (1 == 3) {
  console.log('맞아요1')
} else if (3 == 3){
  console.log('맞아요2')
} else if (4 == 4){
  console.log('맞아요3')
}
```
이 코드는 콘솔창에 무엇이 출력될까요?

생각해보고 직접 확인해봅시다.



else if 문의 경우 else 문의 특징도 가지고 있어서

조건식이 참이면 뒤에오는 else if문은 실행하지 않습니다.

귀찮으면 "그게아니면 만약에" 라고 해석만 잘하면 됩니다.










```
if (1 == 3) {
  console.log('맞아요1')
} else if (3 == 3){
  console.log('맞아요2')
}
if (1 == 3) {
  console.log('맞아요1')
}
if (3 == 3){
  console.log('맞아요2')
}
```
굳이 위처럼 else if 문 안쓰고도 if문 2개만 써도 똑같은 기능을 구현가능합니다.

그러면 else if 문은 왜 있는 문법임?





if문만 2개 있으면

-> 위에 있는 if문이 참이든 아니든 둘째 if문도 항상 실행됩니다.



if + else if가 있으면

-> else 덕분에 위의 조건식이 참이면 else 뒤는 스킵합니다.

그래서 조건식을 여러번 검사하는데 중간에 참이 나올 경우

코드실행을 중단하고 싶으면 else if 쓰시면 되겠습니다.



설명만 들으면 의미없기 때문에 오늘 숙제해보면서 한번 활용해보시길 바랍니다.

오늘의 숙제 :

1. 전송버튼 누를 때 아이디랑 패스워드 둘 다 공백검사하려면?

이건 답인데 누르면 안됩니다


컴퓨터에게 "둘다 공백검사해줘~" 라고 할겁니까

컴퓨터는 공백검사 그런 단어 모릅니다.

기능을 최대한 상세히 설명부터하십시오



1. 전송버튼누르면

2. 첫째 input에 입력한 값이 공백인 경우 알림 띄워

3. 둘째 input에 입력한 값이 공백인 경우 알림 띄워

이러면 되겠군요 if문이 2개 필요할듯 보입니다.






```
$('form').on('submit', function(e){
  if (document.getElementById('email').value == '') {
    alert('아이디 입력하쇼');
  }
  if (document.getElementById('pw').value == ''){
    alert('비번 입력하쇼')
  }
});
```
1번 2번은 아까 한거고 3번만 추가해봤습니다.

그러기 위해서 둘째 input에 id="pw" 도 추가했습니다.

아니면 else if 쓰는 것도 좋겠군요




2. 전송버튼 누를 때 입력한 비번이 6자 미만이면 알림띄우기

글자가 몇자인지 출력하는건 구글이 압니다

```
$('form').on('submit', function(e){
  if (document.getElementById('email').value == '') {
    alert('아이디 입력하쇼');
  }
  if (document.getElementById('pw').value == ''){
    alert('비번 입력하쇼')
  }
  if (document.getElementById('pw').value.length < 6){
    alert('왜케 비번이 짧음?')
  }
});
```
밑에 if문을 추가했습니다 끝

어떤 문자자료에 .length를 붙이면 몇 글자인지 출력해줍니다.

진짜인지 확인하고 싶으면 언제나 콘솔창에 출력해봅시다.


----

### input, change 이벤트와 and, or 연산자


input 이벤트와 change 이벤트



input 태그에서 발생하는 이벤트들이 있습니다.

input이벤트와 change 이벤트인데 input 안에 뭔가 입력할 때 발생합니다.

진짜인지 확인하려면 input 하나 찾아서 이벤트리스너 장착해봅시다.




```
document.getElementById('email').addEventListener('input', function(){
  console.log('안녕')
});
```
▲ input에 입력된 값이 변경될 때 input 이벤트가 발생합니다.

input에 뭐 입력해보십시오 그 때마다 콘솔창에 안녕이 출력되는군요.








```
document.getElementById('email').addEventListener('change', function(){
  console.log('안녕')
});
```
▲ input에 입력된 값이 변경되고 커서를 다른 곳에 찍으면 change 이벤트가 발생합니다.

<input>에 뭐 입력하고 커서를 다른데 찍어보십시오. 안녕이 출력됩니다.



그래서 input 값이 변경되었을 때 뭔가 코드를 실행하고 싶으면

input, change 이벤트리스너를 활용해보면 되겠습니다.













true/false 자료



실은 if 조건문 자리에는 == 등호 이런게 아니라 true, false를 넣어야 잘 작동합니다.


```
if (true){
  console.log('진짜임')
}
```
진짜로 true 넣으면 if문이 실행 잘됩니다.

true는 참, false는 거짓을 뜻하는 자료형입니다.

멋진 개발자말로 boolean 타입이라고 부릅니다.





Q. 그럼 1 == 1 이런거 넣어도 if문 잘 작동하는 이유는 뭐임?

A. 1 == 1 쓰면 그 자리에 true 아니면 false 가 자동으로 남아서 그렇습니다.

콘솔창에 1 == 1 출력해보셈



Q. 타입이 뭐임

자료가 무슨 형식을 가지고 있는지 구분하기 위한 용어입니다.

123은 숫자타입 '123'은 문자타입 true는 boolean타입 이렇게 부르고

포켓몬으로 비유하면 불타입 비행타입 그런거랑 비슷합니다.











다른지 같은지 비교하고 싶으면



console.log(2 != 1)
다름을 비교하고 싶으면 != 쓰면 됩니다.

위 코드는 그래서 true가 콘솔창에 출력됩니다.





console.log(2 == '2')  //true 나옴
console.log(2 === '2')  //false 나옴
같다고 비교하려면 == 쓰면 된다고 했는데 실은 === 이것도 있음

== 이건 느슨한 비교

=== 이건 엄격한 비교입니다.

== 느슨한 비교는 자료의 타입변환을 지가 알아서 해보고 동일하면 true라고 판정해줍니다.

=== 엄격한 비교는 자료의 타입까지 동일해야 true라고 판정해줍니다.











실은 if문 안에서 true, false 역할을 하는 자료들도 있음



0
''
null
undefined
NaN
이런 것들은 if문 소괄호 안에서 false랑 같은 역할을 합니다.





0제외 모든 숫자
'아무문자'
[]
{}
이런 것들은 if문 소괄호 안에서 true랑 같은 역할을 합니다.

첨보는 것들은 지금은 몰라도 됩니다.















and/or 연산자



if문 소괄호 안에 조건식을 여러개 동시에 입력하고 싶을 때가 있습니다.

1 == 1

2 == 2

이런거 동시에 비교해서 참이면 뭔가 코드를 실행하고 싶으면 and/or 기호와 함께 적으면 됩니다.






```
if (1 == 1 && 2 == 2){
  console.log('안녕')
}
```
&& 기호는 논리학의 and 역할을 해줍니다.

그니까 왼쪽 오른쪽이 둘 다 true면 전체를 true로 바꿔줍니다.




```
if (1 == 1 && 2 == 3){
  console.log('안녕')
}
```
그럼 이건 안녕이 출력안될듯








```
if (1 == 1 || 2 == 3){
  console.log('안녕')
}
```
|| 기호는 논리학의 or 역할을 해줍니다.

그니까 왼쪽 오른쪽 둘 중 true가 적어도 1개 있으면 전체를 true로 남겨줍니다.






```
if (1 == 4 || 2 == 3){
  console.log('안녕')
}
```
이러면 뭐가 출력될까요

알아서 테스트해보도록 합시다.









이런건 배워봤자 어짜피 다음날 다 까먹습니다.

혼자서 코드짜봐야 기억에 오래남기 때문에 다음강의 문제들 풀고 지나가봅시다.

---------

### if/else, function 실력향상 과제

if/else, function 실력향상 과제


Q1. 철수는 369게임을 더럽게 못합니다.



실제 369게임 말고 약간 쉽게 각색해서

'3의 배수에서' 박수를 치면 되는 게임을 하고 있습니다.



근데 철수는 바보라 숫자를 하나 주었을 때 이 숫자가 3의 배수인지 아닌지 파악하기 넘나 힘든 관계로

프로그래밍으로 이 문제를 해결하려고 합니다.

어떤 숫자를 함수 안에 집어넣으면 박수를 쳐야할 지 말아야할 지 판단해주는 함수를 만들려고 하는데

어떻게 함수를 만들어야할까요?






```
function 삼육구게임() {
  //빨리 이 함수를 디자인해봅시다.
}
 ```

실행결과 예시 :

삼육구게임(6); 실행하면 3의 배수니까 콘솔창에 '박수'라는 글자가 떠야합니다.

삼육구게임(12); 실행하면 3의 배수니까 콘솔창에 '박수'라는 글자가 떠야합니다.

삼육구게임(11); 실행하면 3의 배수 아니니까 콘솔창에 '통과'라는 글자가 떠야합니다.



힌트 :

자바스크립트엔 % 나머지 연산자가 있긴 합니다



뭐라도 써보는게 중요하지 답보는게 중요한게 아님


답안과 내 코드가 스타일이 달라도 실행결과만 잘 나오면 장땡입니다.

삼육구게임()이라는 함수는

파라미터에 숫자를 입력하면 그 숫자가 3의 배수일 경우 콘솔창에 '박수' 를 출력해줘야합니다.

"컴퓨터야 파라미터로 입력한 숫자가 3의 배수면 '박수' 출력해" 명령주면 되는데

컴퓨터 역시 바보라서 3의 배수가 뭔 뜻인지 전혀 모릅니다.









Q. 3의 배수인지 어떻게 압니까

% 이거 쓰면 나머지를 알려준다고 했습니다.

5 % 3 하면 뭐가 나오게요? 2가 나옵니다.

6 % 3 하면 뭐가 나오게요? 0이 나옵니다.

3의 배수들은 % 3 을 해버리면 0이 항상 나옵니다.



그럼 컴퓨터에게

파라미터 % 3 해서 그게 0이면 '박수' 출력하라고 명령주면 되겠군요.




```
function 삼육구게임(num){
  if (num % 3 == 0) {
    console.log("박수");
  }
}
```
▲ 이렇게 되겠습니다.

그럼 그게 아닌 경우엔 '통과'를 출력시켜주면 되겠죠?




```
function 삼육구게임(num){
  if (num % 3 == 0) {
    console.log("박수");
  } else {
    console.log('통과');
  }
}

삼육구게임(15);
```
함수는 만들었다고 실행되는게 아니라 사용해야 실행됩니다.

밑에서 삼육구게임(15) 이렇게 사용해봅시다 진짜로 '박수'가 나오나 확인 ㄱㄱ








Q2. 하지만 369게임 업그레이드 버전이 등장했습니다.



369게임 업그레이드 버전은 3의 배수에서 박수를 치는건 맞지만

9의 배수에서는 박수를 두번 쳐야합니다.

철수는 역시나 이것도 프로그래밍으로 이 문제를 해결하려고 합니다.

아까 만들었던 369게임() 함수를 어떻게 고치면 될까요?




```
function 삼육구게임() {
  //빨리 이 함수를 디자인해봅시다.
}
```
실행결과 예시 :

삼육구게임(6); 실행하면 콘솔창에 '박수'라는 글자가 떠야합니다.

삼육구게임(9); 실행하면 콘솔창에 '박수x2'라는 글자가 떠야합니다.

삼육구게임(11); 실행하면 콘솔창에 '통과'라는 글자가 떠야합니다.



답보는 순간 코딩실력 하락함





```
function 삼육구게임(num){
  if (num % 3 == 0) {
    console.log("박수");
  } else {
    console.log('통과');
  }
}
```
아까 만든 기능에 뭔가 더 추가해주면 되겠군요.

"9의 배수면 박수x2 출력해주세요" 라고 if문을 추가하면 될 것 같습니다.

근데 if문 추가할지 else if 문 추가할지 그런건 알아서 결정해보시면 됩니다.






```
function 삼육구게임(num){
  if (num % 9 == 0) {
    console.log("박수x2");
  } else if (num % 3 == 0){
    console.log('박수');
  } else {
    console.log('통과');
  }
}

삼육구게임(18);
```
else if 문을 쓰면 그게 아니면 만약에~ 라는 뜻이기 때문에

9의 배수가 아닐 때만 else if 뒤의 코드가 실행됩니다.

아무튼 테스트해봅시다.



[collapse]




참고) 함수이름 작명시 맨 처음 단어는 숫자를 사용하시면 안됩니다.

참고2) 페이지 내의 다른 곳에서 자바스크립트 문법 에러가 뜨는 경우 다른 코드도 실행이 제대로 되지 않습니다.

콘솔창에 에러가 없는지 한번 확인해보십시오.











Q3. 공인중개사 시험점수를 입력하면 합격인지 알려주는 함수를 만들어봅시다.



공인중개사 1차 시험은 개론, 민법 2개 과목이 있습니다.

과목마다 100점 만점이지만 두 과목 합해서 120점 이상이면 합격시켜줍니다.

다만 한 과목이 40점 미만이면 과락으로 불합격됩니다.  

과목 점수 2개를 파라미터로 입력하면 합격인지 불합격인지 여부를 콘솔창에 출력하는 함수를 만들어보십시오.


```
function 합격했냐(){
  //코드 짜면 됩니다
}
```
실행결과 예시 :

합격했냐(70, 70); 실행시 총점 120이상이니 콘솔창에 '합격'이 출력되어야합니다.

합격했냐(30, 100); 실행시 하나 과락이니 콘솔창에 '불합격'이 출력되어야합니다.

합격했냐(50, 50); 실행시 총점 120미만이니 콘솔창에 '불합격'이 출력되어야합니다.



쉬우니까 알아서 합시다


한글로 설명부터 잘해야지 코드부터 짠다고 해결되는게 아닙니다.



함수에 합격했냐(a, b) 이런 식으로 파라미터를 2개 입력할 수 있게 만들어두고

"a가 40미만이거나 b가 40 미만일 경우엔 불합격 출력"

"그게 아니면 a + b 가 120 이상이면 합격을 출력.... a + b 가 120 미만이면 불합격 출력"

이렇게 코드짜면 될듯합니다.





Q. 왜 불합격 먼저 확인하나요?

A. 코드짜는 사람 맘입니다




```
function 합격했냐(a, b){
  if ( a < 40 || b < 40 ) {
    console.log('불합격')
  } else if (a + b >= 120) {
    console.log('합격')
  } else {
    console.log('불합격')
  }
}
```
합격했냐(50, 50) 이러면 불합격

합격했냐(100, 100) 이러면 합격

잘 출력됩니다.








(응용) 원래의 369게임 룰을 적용하려면 어떻게 해야할까요?

3의 배수에서 박수를 치는게 아니라 끝자리가 3,6,9로 끝나는 숫자라면 '박수'를 출력되게 하는겁니다.

이건 숫자의 마지막자리를 어떻게 파악할지 구글 검색해보면 쉽게 해결되니 답은 없습니다.







(응용2) 합격판독기에 0에서 100사이 숫자가 아닌걸 입력하면 장난치지 말라고 alert를 띄우려면 어떻게 코드짜야할까요?

이것도 간단하게 if문 알아서 추가해봅시다.


-----

### 변수문법과 Dark mode 버튼만들기


오늘의 숙제 :

다크모드 버튼 눌렀을 때

버튼 누른 횟수가 홀수면 버튼 내부 글자를 Light로 변경해주세요~

버튼 누른 횟수가 짝수면 버튼 내부 글자를 Dark로 변경해주세요~

라고 코드짜오면 됩니다.  









다크모드 버튼을 만들어봅시다


![20220321_213955](/assets/20220321_213955.png)






사이트 돌아다니다보면 다크모드 버튼같은게 있습니다.

이거 누르면 사이트가 까매집니다. 이걸 만들어봅시다.

까매지는 class를 css 파일에 미리 만들어놓고 버튼누르면 부착하면 기능만들기 끝인데

가장 간단한 것 부터 해봅시다.

원래 코드짤게 많으면 가장 간단한 것 하나부터 구현하면 쉬워집니다.




```
<span class="badge bg-dark">Dark 🔄</span>
```
이런 버튼 사이트아무데나 추가하시고

(ms-auto mx-3 이런 클래스명도 추가하면 우측정렬 잘됨)

(🔄 이건 그냥 크롬에서 우클릭하면 나오는 이모티콘임)



버튼 1회 누르면 안의 글씨가 Light로 바뀜

2회 누르면 다시 Dark

3회 누르면 다시 Light

4회 누르면 다시 Dark

...

이런 기능이나 만들어봅시다.

그러려면 버튼누른 횟수를 어딘가에 기록해놔야겠군요?















자료를 잠깐 저장할 수 있는 변수문법



자료를 잠깐 저장하고 싶으면 변수문법을 씁시다.

var 변수명 = 넣을값;

이러면 됩니다.




```
var 나이 = 20;
var 이름 = 'kim';
```
그래서 잠깐 20과 'kim'을 변수에 저장해봤습니다.

이제 나이, 이름이라고 쓸 때 마다 그 자리에 20과 'kim'이 나옵니다.

확인하고싶으면 콘솔창에 나이, 이름 출력해보셈



- 문자, 숫자 말고도 거의 모든걸 다 집어넣을 수 있습니다.

document.getElementById() 이것도 변수에 넣어쓰기 가능

- 영어로 작명시엔 함수 작명하듯 camelCase로 하면 됩니다.









"그래서 변수 왜 쓰는 문법임?"

이라고 물어보면 답할 수 있어야 배운 것입니다.



1. 길고 복잡한 자료가 있으면 잠깐 변수에 저장해서 쓰면 편리합니다.

예를 들어 사이트 만드는데

'안녕하세요 반갑습니다 오랜만인데 그동안 잘지냈니' 라는 인삿말이 매우 자주 필요하다고 가정해봅시다.


```
var 인삿말 = '안녕하세요 반갑습니다 오랜만인데 그동안 잘지냈니';
```
그럴 땐 이렇게 저장해두면

저거 긴 문장이 필요한 부분에서 길게 하드코딩할 필요없이

인삿말이라고 쓰면 끝이니 편리해서 쓰는 것일 뿐입니다.







2. 특정 값을 기록하고 싶으면 변수씁니다.



예를 들어서 위에서 버튼누른 횟수가 필요합니다.

버튼을 1번 누르면 Dark로 글자가 바뀌어야하고

버튼을 2번 누르면 Light로 글자가 바뀌어야하는데

버튼누른 횟수를 어딘가에 기록해놓으면 편리하겠죠?



var count = 0;
그럴 때 대충 이런 변수 하나 만들어두고

버튼누를 때 마다 count를 1 증가시키면 되는 것입니다.

그래서 변수는 비유하자면 간단한 포스트잇이라고 보면 되겠습니다.











변수에 +1 하는 법



기존 값에 +1 하고 싶으면

변수명++

변수 += 1

변수 = 변수 + 1

셋 중 하나 골라쓰면 됩니다.



var count = 0;
count++;
console.log(count);
보고만 있지 말고 진짠지 확인하려면 콘솔창에 출력해봅시다.



참고로

변수명--

변수명 += 1

이렇게도 사용가능합니다.













오늘의 숙제 :

다크모드 버튼 눌렀을 때

버튼 누른 횟수가 홀수면 버튼 내부 글자를 Light로 변경해주세요~

버튼 누른 횟수가 짝수면 버튼 내부 글자를 Dark로 변경해주세요~

라고 다음시간까지 코드짜오십시오.

버튼 누를 때마다 버튼 글자가 Light, Dark로 차례로 바뀌면 성공입니다



(힌트) 자바스크립트엔 % 연산자라는게 있습니다.

나눈 후 나머지를 구해주는 연산자입니다.

5 % 3 은 2입니다.

7 % 2 는 1입니다.

어떤 숫자를 2로 나눠보면 홀수인지 짝수인지 알 수 있을듯요 아마 초등학교 때 해본듯


----

위 문제 해설


저번시간 숙제는



다크모드 버튼눌렀을 때

버튼 누른 횟수가 홀수면 버튼 내부 글자를 Light로 변경해주세요~

버튼 누른 횟수가 짝수면 버튼 내부 글자를 Dark로 변경해주세요~

코드를 짜봅시다.

그대로 코드로 번역만 하면 됩니다.






```
var count = 0;

$('.badge').on('click', function(){
  count += 1;
  if (count가 홀수면) {
    내부글자를 Light로 변경
  } else {
    내부글자를 Dark로 변경
  }
});
```
한글만 잘 채우면 되겠네요.

count += 1 왜하냐고요?

버튼누를 때 마다 버튼누른 횟수를 계속 업데이트하고싶으니까 쓴 것임










```
var count = 0;

$('.badge').on('click', function(){
  count += 1;
  if (count % 2 == 1) {
    $('.badge').html('Light');
  } else {
    $('.badge').html('Dark')
  }
});
```
2로 나눠서 나머지가 1이면 항상 홀수입니다.

jQuery로 찾은 요소 innerHTML을 바꾸고 싶으면 .html('바꿀내용') 쓸 수 있습니다.

이러면 이제 버튼 누를 때 마다 글자가 Light <-> Dark 왔다갔다합니다.

실제 다크모드처럼 사이트가 시커멓게 변하는건

1. 부착하면 시커매지는 class 하나를 만들어놓고 2. 버튼누를 때 class를 부착해보길 바랍니다.

CSS 수업시간이 아니니 여기까지하겠습니다.





(참고) Bootstrap 스타일이 적용된 요소는 css 덮어쓰기가 어려울 수 있습니다.

bg-dark 클래스명을 bg-light 이런 식으로 바꾸거나

아니면 붙어있던 class를 제거하거나 그러면 됩니다.













변수의 선언, 할당, 범위라는 개념



변수쓸 땐 선언과 할당이라는 용어가 있는데

변수만드는걸 선언

변수에 뭐 집어넣는걸 할당이라고 합니다.


```
var 나이;
var 이름;
```
이건 변수의 선언이라고 합니다.




```
var 나이;
var 이름;
나이 = 20;
이름 = 'kim';
```
밑의 2줄은 할당이라고 합니다.



- 저렇게 선언만 따로, 할당만 따로 할 수 있습니다.

- 이미 있는 변수를 재선언도 가능합니다.

- 이미 들어있는 값을 등호로 재할당도 가능합니다.








```
function 함수(){
  var 나이 = 20;
  console.log(나이); //가능
}

console.log(나이); //불가능
```
변수는 사용가능한 범위가 있습니다.

함수 안에서 변수를 만들었을 경우 함수 안에서만 사용가능합니다.

밖에선 사용불가능합니다. 밖에서 출력하면 변수가 정의 안되었다고 에러남



- 반대로 함수 바깥에서 만든 변수는 함수 안에서는 사용가능합니다.













var let const 문법 전부 변수생성 가능


```
let 거주지 = 'seoul';
const 가격 = 3000;
```
var 대신 let, const 문법 써도 똑같이 변수생성이 가능합니다.

근데 let, const는 이런 기능을 제공합니다.




```
let 거주지 = 'seoul';
let 거주지; //에러내줌
```
let, const는 재선언 불가능합니다. 재선언하면 에러를 내줍니다.  



Q. 장점이 뭐임

여러분 코드 천줄 만줄 짜다보면 나중에 변수만든거 또 만들고 그런 실수가 있습니다.

그걸 미연에 방지해주는 고마운 변수생성 키워드입니다.








```
const 가격 = 3000;
가격 = 4000;  //에러내줌
```
const는 재할당도 불가능합니다. 재할당하면 에러를 내줍니다.



Q. 장점이 뭐임

값을 수정하면 큰일나는 변수들을 만들고싶을 때 유용합니다.

나중에 값을 변경하는 실수를 방지하고 싶을 때 쓰면 됩니다.










```
if (true) {
  let 이름 = 'kim';
}
```
console.log(이름); //없다고 나옴
let과 const는 범위가 더 좁습니다. 모든 중괄호가 범위입니다.

if, function, 나중에 배울 for 반복문 이런 것은 중괄호가 있습니다.

중괄호 안에서 만든 let const 변수의 경우 중괄호를 벗어나면 없다고 나옵니다.











![20220321_214148](/assets/20220321_214148.png)



정리하자면 이렇습니다.

var 변수는 유연해서 재선언 재할당이 자유롭습니다. -->
