---
title: "[js] Javascript&ES6 part3"
layout: post
subtitle: JS
date: "2021-03-23-23:45:51 +0900"

categories: study
tags: JS
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

Array, Object 자료형에 있는 중요한 자료들을 변수로 꺼내고 싶으면 어떻게 합니까.

한두개면 모르겠는데 여러개의 자료를 뽑아서 변수 만들려면 코드가 매우 길어지겠죠?

그럴 때 destructuring 문법을 사용하면 변수를 쉽게 만들 수 있습니다.

맨날 쉽다 별거아니다 그러는데 이번엔 진짜 쉽습니다.

Array 안에 있는 데이터를 변수에 담는 방법

[2,3,4]라는 array가 있는데,

여기안에 있는 3개의 데이터들을 전부 밖으로 꺼내서 변수에 담고 싶으면 어떻게 합니까.

```
var array = [2,3,4];
var a = array[0];
var b = array[1];
```

뭐 이런식 아닐까요?

근데 더 쉽게할 수 있는 방법이 있습니다.

```
var [a,b,c] = [2,3,4];
```

[2,3,4]라는 자료랑 비슷한 모양으로 변수를 선언해주시면 됩니다.

변수 이름은 아무렇게나 해주시면 되고요.

그럼 a,b,c 변수가 세개 생성되는데 각각 2,3,4라는 자료를 가집니다.

array에서 데이터 끄집어내서 변수 생성 끝입니다.

디폴트 값도 줄 수 있습니다.

당연히 왼쪽 오른쪽 갯수가 다르면 변수가 제대로 만들어지지 않습니다.

```
var [a,b,c] = [2,3];
```

위처럼 쓰시면 c라는 변수는 값이 할당이 안되어서 undefined가 할당되어있습니다.

이걸 방지하고 싶으면

값이 아무것도 안들어오는 변수들은 기본값을 가질 수 있게 만들 수 있습니다.

```
var [a,b,c = 5] = [2,3];
```

그럼 c는 아무 값도 안들어오는 경우 5라는 기본값을 할당해줍니다.

함수 배웠을 때 쓰던 default 파라미터 문법과 똑같이 쓰시면 됩니다.

Object 안에 있는 데이터를 변수에 담는 방법

object도 좌우를 똑같이 맞춰주시면 변수가 생성됩니다.

```
var { name : a, age : b } = { name : 'Kim', age : 30 };
```

이렇게 하시면 됩니다.

그럼 a, b라는 변수가 생성되고 Kim과 30이라는 자료를 각각 할당해줍니다.

이렇게 쓰시면 조금 더 쉽게 변수를 뽑을 수 있는데

변수 이름을 오브젝트 안의 key 이름과 똑같이 맞춰줄 때는 이렇게만 쓰셔도 됩니다.

```
var { name, age } = { name : 'Kim', age : 30 };
```

name : name을 name 이렇게 하나로 생략이 가능합니다.

이렇게 하시면 name, age라는 변수가 생성되고

각각 Kim, 30이라는 값을 할당해줍니다.

object에서 변수꺼내기 끝입니다.

- array랑 똑같이 등호로 디폴트값도 적용가능합니다.

이번엔 변수를 object로 집어넣고 싶은 경우

```
var name = 'Kim';
var age = 30;

var obj = { name : name, age : age }
```

변수를 object 자료형에 집어넣고 싶은 경우 이런 식으로 쓰면 되겠죠?

하지만 destructuring 문법을 이용하시면 이런 것도 가능합니다.

```
var name = 'Kim';
var age = 30;

var obj = { name, age }
```

name : name 이렇게 key값과 value값이 동일하면

name 이렇게 하나로 생략이 가능합니다.

함수 파라미터 변수 만들 때도 똑같이 적용가능합니다.

함수가 하나 있는데 이 함수는 두개의 파라미터를 입력할 수 있습니다.

여기에 object 내의 Kim, 그리고 age 자료들을 입력하고 싶으면 어떻게 할까요?

```
function 함수(name, age){
  console.log(name);
  console.log(age);
}

var obj = { name : 'Kim', age : 20 }
함수(obj.name, obj.age);
```

아마 obj.name 이걸 직접 집어넣고 그러면 되겠죠?

혹은 destructuring 문법을 쓰시면 됩니다.

```
function 함수( { name, age }){
  console.log(name);
  console.log(age);
}

var obj = { name : 'Kim', age : 20 };
함수(obj);
```

아마 obj.name, obj.name 이걸 두개 뽑지 않고도 넣을 수 있습니다.

왜냐면 파라미터는 실은 변수만드는 거랑 똑같은 행위기 때문에

변수만드는 문법을 그대로 적용할 수 있는 것이지요.

파라미터를 입력할 때

```
{name, age} = { name : 'Kim', age : 20 }
```

이거 한거랑 똑같습니다.

(솔직히 많이 쓰진 않습니다)

이해가 안되면 조금 더 쉬운 array를 보도록 합시다.

함수 파라미터로 array 내의 데이터들을 집어넣고 싶으면 어떻게 하죠?

```
function 함수( name, age ){
  console.log(name);
  console.log(age);
}

var array = [ 'Kim', 30 ];
함수(array[0], array[1]);
```

위처럼 해도 되지만

destructuring 문법을 이용하시면

```
function 함수( [name, age] ){
  console.log(name);
  console.log(age);
}

var array = [ 'Kim', 30 ];
함수( ['Kim', 30] );
```

이렇게 하셔도 됩니다.
파라미터인 [name, age] 를 만들 때 ['Kim', 30] 이걸 그대로 대입해서 만드는 것이죠.
그럼 각각 name과 age에는 Kim과 30이라는 데이터가 들어갑니다.

실제 코딩상황에서 이 문법이 생각날지 염려가 되어
직접 연습해보시라고 하단에 예제를 두어개 준비했습니다.

Q1. 변수를 마구 만들었는데 말입니다..

```
var [number, address] = [ 30, 'seoul' ];
var {address : a , number = 20 } = { address, number };

```

약간 복잡해서 여러분께 물어보겠습니다.

a와 address와 number라는 변수는 각각 무슨 값을 가지고 있을까요?

A.

생각해보셨습니까

첫 줄을 거치면 number라는 변수는 30, address라는 변수는 'seoul'이 됩니다.

둘째줄을 약간 보기쉽게 바꿔보자면

```
var {address : a , number = 20 } = { address : 'seoul', number : 30 };
```

이렇게 됩니다. 이러면 조금 더 보기쉽죠?

그래서 a는 'seoul'

number는 30

address는 첫줄에서 수정되고 끝나니까 그대로 'seoul'입니다.

Q2. 다음과 같은 Object에서 데이터를 뽑아서 변수를 만들고 싶습니다.

```
let 신체정보 = {
  body: {
    height: 190,
    weight: 70
  },
  size: ["상의 Large", "바지 30인치"],
};

```

여러분의 뛰어난 신체 정보를 담은 Object입니다.

여기서 키, 몸무게, 상의사이즈, 하의사이즈 정보를 각각 뽑아서 4개의 변수를 만들고 싶습니다.

어떻게 만들면 될까요?

(참고 : 데이터가 얼마나 복잡하든간에 좌우 형태를 똑같이 맞추시면 destructuring 문법으로 변수를 만들 수 있습니다.)

A.
저는 이렇게 만들었습니다

```
let 신체정보 = {
  body: {
    height: 190,
    weight: 70
  },
  size: ["상의 Large", "바지 30인치"],
};

let {
  body: {
    height,
    weight
  },
  size: [ 상의, 하의 ]
} = 신체정보;
```

잘 보시면 등호를 이용해서 좌우를 똑같이 맞췄습니다.

그리고 왼쪽엔 변수명을 적어주었고요.

그럼 이제 height, weight, 상의, 하의라는 이름의 변수가 생성됩니다.

---

##### import / export 를 이용한 파일간 모듈식 개발

![20210926_233055](/assets/20210926_233055.png)

자바스크립트 코드가 길어지면 다른 파일로 쪼개는게 좋은 관습입니다.

다른 파일로 쪼개놓고 그걸 첨부해서 사용하는 방법을 알아보도록 합시다.

ES6 import/export를 쓰시면 내가 원하는 변수, 함수, class만 다른 파일로 보낼 수 있습니다.

어떻게 하는지 알아봅시다.

(참고) import 해온 변수, 함수는 사용은 가능하지만 수정은 불가능합니다. read-only 입니다.

파일 두개를 만들어봅시다.

저는 index.html과 library.js를 만들어서

library.js 파일에 있는 내용을 index.html <script>태그 내에서 가져다 쓰도록 하겠습니다.

(이거 말고도 당연히 .js 파일 간에도 가능합니다.)

(index.html)

```
<script type="module">

</script>
```

▲HTML 파일 안에서 ES6 import 문법을 쓰시려면 저렇게 script 태그 안에 type을 module로 설정해주셔야합니다.

(1) export default / import 를 쓰면

다른 파일에 있는 변수 등을 가져다쓸 수 있습니다.

변수 함수 class 전부 가능합니다.

(library.js)

```
var a = 10;
export default a;
```

---

(index.html)

```
<script type="module">
  import a from 'library.js';
  console.log(a);
</script>
```

JS 파일에서는 특정 변수를 다른 파일에서 이용할 수 있게 내보내고 싶으면

export default 변수명 이라고 하시면 됩니다.

그리고 그 변수를 가져다쓰고 싶다면

다른 파일에서 import 어쩌구 from '경로'

해주시면 됩니다.

(import시 어쩌구라는 변수명은 여러분 아무렇게나 작명이 가능합니다.)

(2) 여러개를 export 할 수도 있습니다

![20210926_233156](/assets/20210926_233156.png)

JS파일에서 변수를 여러개 만들고 그걸 다 내보내고싶으면

export 라는 키워드를 여러번 쓰시면 됩니다.

(library.js)

```
var a = 10;
var b = 20;
export {a, b};
```

---

(index.html)

```
<script type="module">
  import {a,b} from 'library.js';
  console.log(a);
</script>
```

근데 export 라고 쓰실 땐

export {변수명1, 변수명2 ...} 이렇게 담아주셔야합니다.

혹은 export var a = 10; 이렇게 쓰셔도 됩니다.

export 키워드로 내보낸 것들을 import 하실 땐

import {변수명1, 변수명2 ...} from '경로' 이렇게 가져오셔야합니다.

export default와 차이점은..

(3) 그럼 export와 export default 동시에 사용하면?

그래도 잘 됩니다.

근데 import할 때 어떻게 해야할지 감이 안오죠?

![20210926_234130](/assets/20210926_234130.png)

(library.js)

```
var a = 10;
var b = 20;
var c = 30;
export {a, b};
export default c;
```

---

(index.html)

```
<script type="module">
  import c, {a,b} from 'library.js';
  console.log(c);
</script>
```

![20210926_234130](/assets/20210926_234130_a5jntaj7y.png)

![20210926_234221](/assets/20210926_234221.png)
이렇게 import 해오시면 됩니다.

export default 한건 맨 왼쪽에 써주시면 되고

그 다음부터 이제 {} 중괄호 안에 export 했던 변수들을 적어주시면 됩니다.

(4) 변수명이 마음에 안들면 as로 새로 짓자

import를 쓰실 때 변수명 오른쪽에 as라는 키워드를 붙일 수 있습니다.

변수명 as 새변수명 이렇게 하시면 import하는 변수의 변수명을 멋있는걸로 바꿀 수 있습니다.

![20210926_234351](/assets/20210926_234351.png)

(library.js)

```
var a = 10;
var c = 30;
export {a};
export default c;
```

---

(index.html)

```
<script type="module">
  import c as 간지, {a as 폭발} from 'library.js';
  console.log(간지);
  console.log(폭발);
</script>
```

c라는 것은 간지라고 이름을 바꿨고

a라는 것은 폭발로 이름을 바꿨습니다.

아무튼 저렇게 변수명 오른쪽에 그대로 붙이시면 됩니다.

(5) import할 때 변수들이 너무 많으면 \* 기호를 씁시다

export 했던 변수들이 100개면

import 오른쪽에 변수를 100개나 쭉 써줘야합니까?

맞습니다 .. ㄷㄷ

근데 그러기 싫으시면 변수들을 한꺼번에 object에 담아서 import 해올 수 있습니다.

![20210926_234456](/assets/20210926_234456.png)

(library.js)

```
var a = 10;
var b = 20;
var c = 30;
export {a,b};
export default c;
```

---

(index.html)

```
<script type="module">
  import c, {* as 변수모음} from 'library.js';
  console.log(변수모음.a);
  console.log(c);
</script>
```

'\*' 이라는 기호는 export 했던 애들을 그냥 다 import 해주세요~ 라는 뜻입니다.

근데 그냥 쓰면 안되고 as로 별명을 꼭 지어주셔야합니다.

그럼 이제 별명에 export 했던 변수들이 다 들어갑니다.

(export default 했던건 그냥 원래대로 import 하시면 되고요)

![20210926_234556](/assets/20210926_234556.png)

옛날엔 require, module.exports 라는게 있었습니다.

옛날에 Require.js 이상한 라이브러리를 쓰거나 nodejs 개발시

자바스크립트를 모듈식으로 개발이 가능했었습니다.

이렇게 씁니다.

(export 하는 js파일)

module.exports.a = 10 ;

---

(import 하는 js파일)

```
var 가져온거 = require('/library.js');
```

이러면 a를 쓸 수 있었습니다.

근데 이제는 ES6 import/export를 쓰면 되기 때문에

아 그냥 저런게 있었구나 라고 이해만 하셔도 되겠습니다.

나중에 저런 옛날 코드를 해석할 일이 있으면 그 때 찾아보셔도 충분하니까요.

그리고 import/export는 당연 IE 호환성이 없기 때문에

단순한 html css js 프론트엔드 개발시 JS파일을 HTML에 첨부하시려면

```
<script src="경로"></script>
```

이걸 쓰도록 합시다. 이것이 원조 import 문법 아니겠습니까.

혹은 모던 브라우저에선 <script type="module" src="경로"></script> 이렇게 하면 import export 문법이 사용가능해지는데

![20210926_234707](/assets/20210926_234707.png)

대부분은 리액트 뷰 nodejs 이런거할 때 많이 사용하게 됩니다.(프론트엔드에선 script=src 많이 쓰는 반면 위에서 쓴 방식들은 리액트, 뷰 같은 프론트 프레임워크에서 많이 쓴다.)

---

문법만 배운다고 코딩잘하는 사람이 되는게 아닙니다.

오늘 배울 건 웹브라우저의 동작원리인데 상식으로 알아두면 여러분 코딩생활에 도움이될 수 있습니다.

이벤트리스너, setTimeout 같은거 다룰 때 의도와는 다르게 미스터리하게 동작하는 경우가 많은데

그것은 이런 이유였다고 합니다.

웹 브라우저란

![20210927_024733](/assets/20210927_024733.png)

서버에서 받아온 HTML CSS JS를 실행시켜주는 프로그램입니다.

근데 브라우저가 자바스크립트를 실행하는데 일련의 과정이 있습니다.

이걸 알고계시면 앞으로 코드잘짤 수 있습니다.

브라우저는 C++ 이라는 언어로 코드가 짜여져있습니다.

브라우저는 실행해야할 자바스크립트 코드를 발견하면

C++ 언어로 만들어둔 stack에 넣어 돌립니다.

stack이 뭐냐고요? 그냥 다 집어넣고 맨 윗줄부터 하나하나 실행시키는 공간입니다.

처리가 오래걸리는 코드를 만나면

![20210927_024722](/assets/20210927_024722.png)

![20210927_031046](/assets/20210927_031046.png)

하지만 가끔가다가 특별한 코드를 실행해야할 경우가 있습니다.

서버로의 ajax 요청, 이벤트리스너, setTimeout 이런 코드들입니다.

이런 코드는 처리하기까지 시간이 오래걸립니다.

ajax 요청은 서버에서 응답을 받기까지 시간이 오래걸리고

버튼 이벤트리스너는 사용자가 버튼을 누르기까지 시간이 오래걸립니다.

그래서 그런건 Stack에 쌓아서 실행하지 않고

잠깐 보류해놨다가 완료가 되는 시점에 Stack으로 보냅니다.

![20210927_030948](/assets/20210927_030948.png)

근데 Stack은 항상 존나게 바쁘기 때문에 Stack이 텅 빈 시점에 집어넣게 되어있습니다.

아무튼 ajax 요청, 이벤트리스너, setTimeout 이런 코드가 실행준비가 되면

Queue라는 곳에 집어넣고 Queue에 있던 코드는 Stack으로 옮겨서 실행해주는데

Stack에 넣어서 실행하는데 Stack이 비어있을 때만 차례로 집어넣어서 실행해줍니다.

(참고로 Queue는 들어온 순서대로 차례차례 Stack으로 옮겨줍니다.)

그래서 코드짤 때 이렇게 코드짜면 안됩니다

Stack을 바쁘게 만들면 여러분이 ajax 요청, 이벤트리스너, setTimeout 이런 코드 실행이 불가능한 것입니다.

반복문을 1억번 돌리면 시간이 걸리겠죠?

10초걸린다고 합시다.

그럼 10초 동안 ajax 요청, 이벤트리스너, setTimeout 이런 코드는 실행이 불가능합니다.

Stack이 10초동안 비지 않기 때문에 그렇습니다.

그럼 브라우저가 멈추거나 하얗게 변하거나 그런 현상이 일어납니다.

결론 : Stack을 바쁘게하면 웹사이트가 버벅이겠구나 라는 생각을 하며 코드짜도록 합시다.

반복문을 100억번 돌리긴 해야합니다 어쩌죠

```
for (let i = 0; i < 1e10; i++) {
  i++;
}
(참고로 1e10은 0을 10개 붙이라는 뜻입니다)
```

이렇게 쓰면 반복문이 100억번 돌아가는데 아무리 CPU가 좋아도 시간이 약간 오래걸릴겁니다.

10초가 걸린다고 하면 10초동안 사용자가 버튼클릭 이런게 전혀 안먹는다는 소리입니다.

이런 작업을 꼭 해야한다면 가장 간단한 트릭은

1. setTimeout을 이용하는 것입니다.

setTimeout()을 이용해서

0초마다 0~1억 반복, 1억~2억 반복, 2억~3억 반복...

이렇게 코드를 실행하면 보다 쾌적하게 작업을 실행할 수 있습니다.

0초마다 Queue로 보내기 때문에 그 사이사이에 사용자의 이벤트리스너 이런 코드를 실행가능하니까요.

(setTimeout 타이머를 0초로 설정해도 실은 4ms로 동작합니다 설정가능한 최소시간이 4ms 임)

2. Web worker를 이용합니다.

다른 자바스크립트 파일을 이용해서

그 파일에서 힘든 연산을 시키고 그게 완료가 되면 값을 가져오라고 명령이 가능합니다.

이미 만들어진 Worker라는 클래스를 사용하면 됩니다.

(메인 js 파일)

```
var myWorker = new Worker('worker.js');

w.onmessage = function(e){
  console.log(e.data) //이러면 1 나올듯
};
```

(worker.js 파일)

```
var i = 0;
postMessage(i + 1); //postMessage라는 특별한 함수가 있음
```

이런 식으로 셋팅해놓으면

worker.js에서 작업이 완료될 시 postMessage() 이렇게 실행하면

다른 파일로 완료된 결과값을 전달해줄 수 있습니다.

이러면 Stack이 바빠지지 않습니다.

---

##### 동기/비동기 처리와 콜백함수라는 용어 깔끔하게 정리

자바스크립트는 무슨 병렬처리가 잘되는 언어다 그런 소리를 하는 이상한 게시물들이 많은데

개발자들도 헷갈려하는 개념을 지금부터 정확히 알려드리겠습니다.

##### (중요) 자바스크립트는 항상 동기식 처리 (synchronous)

자바스크립트는 비동기 언어라는데 아니다!

동기식 처리가 뭐냐면 한번에 코드 한줄씩 차례차례 실행된다는 소리입니다.

자바스크립트를 실행하는 웹브라우저는 stack이라는 코드 실행 공간이 있는데

거기서 코드를 한줄한줄 차례로 실행합니다.

그럼 하단 코드는 어떤 순서대로 출력될까요?

```
<script>
  console.log(1);
  console.log(2);
  console.log(3);
</script>
```

예상하신 대로 1,2,3이 차례로 출력됩니다.

왜냐면 자바스크립트는 한번에 코드 한줄씩 차례차례 실행하니까요.

이걸 전문용어로 동기적이다~ (synchronous) 라고 합니다.

그냥 거의 대부분의 프로그래밍 언어들은 이런 특징을 가지고 있습니다.

비동기처리 (asynchronous)라는 것도 가능합니다

특정 코드를 1초 후에 실행하고 싶으면 어떻게하죠?

일반적인 프로그래밍 언어에서 이런 코드를 작성하려면......

```
print(1)
time.sleep(1)
print(2)
```

▲ 파이썬으로 해보았습니다. 이렇게 작성합니다.

time.sleep(1)이라는건 1초 쉬어주세요 라는 뜻입니다.

그럼 1이라는게 출력되고 / 1초 쉬고 / 2라는게 출력됩니다.

![20210927_033432](/assets/20210927_033432.png)

자바스크립트에서 1초 쉬고 뭔가 출력하는 코드를 작성하려면

```
console.log(1);
setTimeout(function(){}, 1000);
console.log(2);
```

보통 프로그래밍 언어처럼 이렇게 작성하면 될까요?

안됩니다. 1과 2가 콘솔창에 동시에 출력됩니다.

여기서 자바스크립트의 이상한 점을 느끼시면 됩니다.

자바스크립트는 보통 프로그래밍 언어들과 생각하는 방식자체가 다릅니다.

왜그러냐면 setTimeout() 이라는 함수를 잘 보시면 이건 실행까지 시간이 조금 걸리는 함수죠?

1초나 걸립니다.

자바스크립트 실행머신인 웹브라우저는

이런 특수한 코드들을 발견하면 약간 제쳐두고 다른 코드부터 실행하려고 합니다.

그래서 setTimeout() 을 제껴두고 그 밑에 있는 console.log(2)라는 코드 부터 실행하는 것입니다.

![20210927_035208](/assets/20210927_035208.png)

이런 처리방식을 바로 비동기(asynchronous)라고 합니다.

실행이 오래걸리는 그런 코드들은 잠깐 대기실에 제쳐두고,

실행이 바로바로 가능한 코드들부터 처리하는 방식을 뜻합니다.

이건 자바스크립트 언어 자체의 기능이 아니라

자바스크립트 실행을 도와주는 웹브라우저 덕분에 해낼 수 있는 것입니다.

잠깐 코드를 제쳐두는 대기실

실행을 미루고 옆으로 잠깐 제껴둘 수 있는 코드들은 미리 정해져있습니다.

위에서 말했던 setTimeout, addEventListener, ajax 관련 함수들이 바로 그것입니다.

setTimeout, addEventListener, ajax관련 함수들은 1초대기, 클릭대기 이런걸 하는 코드들인데

이런 코드들의 특징은.. 읽는 시점과 동작 시점이 차이가 있습니다. (쉽게 말하면 동작까지 오래걸립니다.)

자바스크립트를 실행하고 해석하는 크롬쨩은 이런 특별한 코드들을 만나면

1. 잠깐 대기실에 제껴두고 2. 준비가 완료되면 다시 실행시킵니다.

```
console.log(1);
setTimeout(function(){}, 1000);
console.log(2);
```

▲ 크롬쨩은 위의 코드를 읽다가 setTimeout~ 이런 코드를 만나면 잠시 Web API 대기실로 옮겨서 대기시킵니다.

그리고 1초의 대기시간이 지나고 setTimeout이 완료가 되면 대기실에서 코드를 꺼내서 코드가 실행되게 만들어줍니다.

이것 덕분에 setTimeout같이 시간이 오래걸리는 코드들을 비동기식으로 처리할 수 있는 것입니다.

그래서 자바스크립트는 평소에 별일 없으면 동기식으로 처리하는데

비동기를 지원하는 setTimeout 같은 함수를 이용하면 비동기식으로 동작하게 만들 수 있는 언어입니다.

끝

콜백함수를 이용한 순차적 실행

그럼 아까 예시로 돌아와서, 자바스크립트에서 1초 후에 코드를 실행하고 싶으면 어떻게 하죠?

```
console.log(1);
setTimeout(function(){
  console.log(2);
}, 1000);
console.log(3);
```

저렇게 setTimeout 안에 콜백함수안에 코드를 짜면 된다고 배우지 않았습니까.

맞습니다.

그러면 콘솔창에 1과 3이 먼저 빠르게 출현하고

그 다음 1초 후에 2라는 숫자가 출현합니다.

자바스크립트는 비동기상황 등에서 코드를 순차적으로 실행하고 싶을 때 콜백함수를 적극 활용합니다.

콜백함수가 뭔데요?
별거없고 그냥 함수안에 들어가는 함수를 전부 콜백함수라고 부릅니다.

어떻게 했길래 콜백함수를 쓰면 순차적으로 실행되는건지 혹시 궁금하지 않으십니까.

궁금하신 것 같으니 알려드리겠습니다.

콜백함수 디자인하는 법

예를 들면 순차적으로 실행하고 싶은 함수가 두개 있다고 칩시다.

그럼 이렇게 코드짜면 될까요?

```
function 첫째함수(){
  console.log(1)
}

function 둘째함수(){
  console.log(2)
}

첫째함수();
둘째함수();
```

여러분이 파이썬으로 코드짜신다면 이게 맞습니다.

하지만 자바스크립트는 비동기라는 특수성으로 인해 이렇게 쓴다고 순차적으로 실행하는걸 보장하진 않습니다.

(첫째함수가 뭐 setTimeout이라든지 Web API 대기실로 보내는 코드라면 나중에 실행될 수 있으니까요)

그럼 우리도 이거랑 똑같이 개발하면 될 것 같습니다.

콜백함수를 만들어서 첫째함수(둘째함수);

이런 식으로 실행시킬 수 있게 만들어놓으면 순차적으로 실행할 수 있겠죠?

그럼 어떻게 코드를 짜놔야 함수를 함수안에 집어넣을 수 있을까요?

![20210927_035347](/assets/20210927_035347.png)

```
function 첫째함수(콜백){
  console.log(1);
  콜백();
}

function 둘째함수(){
  console.log(2)
}

첫째함수(둘째함수);
```

함수에 파라미터를 하나 뚫어주시면 됩니다.

그리고 그 파라미터에 소괄호를 붙여서 실행해주세요~ 라고 하면 함수안에 함수를 집어넣어서 실행이 가능합니다.

이게 콜백함수 디자인하는 법입니다.

![20210927_035505](/assets/20210927_035505.png)

그리고 콜백함수는 비동기 동기와 관련 없다.
콜백함소는 함수 디자인 패턴일 뿐이다.

위처럼 미리 만들어놓은 함수를 집어넣을 수도 있고

```
첫째함수(function(){
  console.log(2)
}):
```

이렇게 직접 함수선언문을 집어넣을 수도 있습니다.

순차적으로 실행하려고 콜백함수를 여러개 사용하면 단점이 조금 있습니다.

코드가 옆으로 길어집니다.

![20210927_040209](/assets/20210927_040209.png)

```
첫째함수(function(){
  둘째함수(function(){
    셋째함수(function(){
      어쩌구..
    });
  });
}):
```

첫째함수 둘째함수 셋째함수 이렇게 차례로 실행해주는 코드입니다.

특히 자바스크립트로 서버개발시 이런 패턴 흔합니다.

이런거 보기싫으시면 ES6 신문법인 Promise라는 기계를 만들어 사용하시면 됩니다.

콜백대신 쓸 수 있는 Promise 디자인 패턴을 적용하면 어떻게 되냐면

```
첫째함수().then(function(){
   그 담에 실행할거
}).then(function(){
   그 담에 실행할거
});
```

옆으로 길어지지 않고 then이라는 키워드 덕분에 그나마 뭘 하는지도 파악이 쉬워집니다.

---

##### 인간의 언어로 설명하는 ES6 Promise

콜백함수 디자인패턴이 마음에 안드는 분들은

Promise 디자인패턴을 사용하시면 됩니다.

이건 자바스크립트의 새로운 기능이라기보다는 코드/함수 디자인 패턴일 뿐입니다.

이런거 안써도 코드잘짤 수 있긴 한데 나오면 알아야하니 아무튼

그럼 일단 어떻게 하는지 알아봅시다.

![20210927_043345](/assets/20210927_043345.png)

Promise 생김새 맛보기

그대로 따라적어봅니다.

```
var 프로미스 = new Promise();

프로미스.then(function(){

}).catch(function(){

});
```

이것이 끝입니다.

new Promise() 문법으로 프로미스라는 변수 오브젝트를 하나 생성하시면 Promise 제작 끝입니다.

그럼 이제 프로미스라는 변수에다가 then()을 붙여서 실행가능합니다.

프로미스 안의 코드가 실행이 완료가 되었을 때 then() 함수 내의 코드를 실행시켜줍니다.

코드가 실행이 실패했을 경우엔 catch() 함수 내의 코드를 실행시켜줍니다.

(지금은 프로미스 안에 코드가 암것도 없지만요)

이런 식으로 코드를 차례로 실행할 수 있게 도와주는 디자인 패턴이 바로 Promise입니다.

Promise가 콜백함수보다 좋다고 하는 이유는 두개가 있습니다.

1. 콜백함수와는 다르게 순차적으로 뭔가를 실행할 때 코드가 옆으로 길어지지 않습니다. then 함수를 붙여서 순차적으로 실행하니까요.

2. 콜백함수는 불가능한 '실패시 특정 코드를 실행해주세요~' 라고 코드를 짤 수 있습니다. (catch)

Promise의 정확한 뜻과 사용법

성공하면 then(), 실패하면 catch()를 실행해주세요~

라는 코드를 짤 수 있게 도와주는게 바로 Promise입니다.

그럼 Promise는 성공과 실패 상황을 알려줘야겠죠?

그래서 Promise를 를 쉽게 정의하자면 성공&실패 판정기계입니다.

Promise 기계 안에는 아무거나 다 집어넣을 수 있습니다

1 + 1같은 어려운 연산이 끝나면 성공판정 내려주세요~

페이지 내의 button을 누르면 성공으로 판정해주세요 ~

Ajax 요청으로 서버의 데이터를 가져오면 성공판정, 에러나면 실패판정해주세요~

아무거나 다 집어넣을 수 있습니다.

Promise 안에서 성공/실패를 판정하는 방법은 쉽습니다. 그대로 따라쓰시면 됩니다.

```
var 프로미스 = new Promise(function(성공, 실패){
  성공();
});

프로미스.then(function(){

}).catch(function(){

});
```

Promise()안에 콜백함수를 하나 추가해주시면 그 안에서 성공/실패 판정을 내릴 수 있습니다.

성공()이라고 첫째 파라미터를 함수형태로 작성하면 성공판정이 됩니다.

실패()라고 둘째 파라미터를 함수형태로 작성하면 실패판정이 됩니다.

위의 코드는 무조건 성공()을 실행하게 되어있으니 무조건 성공을 판정내리며

그 후엔 이제 then()안의 코드가 실행이 되겠죠?

실제로 사용하는 예시를 봅시다.

예시1. 힘든 수학연산 성공 후에 특정 코드를 실행하려면?

콜백함수로 디자인해놓아도 될 것 같죠? 그럼 그렇게 하시면 됩니다.

근데 저는 콜백보다는 .then()을 쓰고싶어서 Promise를 한번 활용해보겠습니다.

```
var 프로미스 = new Promise(function(성공, 실패){
  var 어려운연산 = 1 + 1;
  성공();
});

프로미스.then(function(){
  console.log('연산이 성공했습니다')
}).catch(function(){

});
```

Promise()안에 어려운 수학 연산을 해주는 기능을 추가했습니다.

그리고 그 연산이 완료되면 성공() 코드를 실행하도록 코드를 추가했습니다.

(일반 코드들은 저렇게 위아래로 나란히 적으면 그냥 차례로 실행됩니다)

기계를 잘 만들어놨으니 then 함수 안에는 프로미스가 성공판정을 내리면 실행할 코드를 담을 수 있습니다.

그럼 디자인 끝입니다.

1. 이제 프로미스 내의 1+1 이라는 어려운 수학연산이 완료되면 성공() 판정을 내리며,

2. 성공시 then() 내의 코드를 실행해줍니다.

이렇게 Promise를 사용하시면 이상한 콜백함수패턴 대신 멋있는 then을 사용할 수 있군요.

Promise 내에선 특정상황시 실패판정을 내릴 수도 있습니다.

이렇게 하시면 됩니다.

```
var 프로미스 = new Promise(function(성공, 실패){
  var 어려운연산 = 1 + 1;
  실패();
});

프로미스.then(function(){
  console.log('연산이 성공했습니다')
}).catch(function(){
  console.log('실패했습니다')
});

```

실패()라는 함수를 실행하는 순간 실패판정을 내립니다.

그렇게 되면 catch() 내의 코드를 실행해줍니다.

실패의 경우 다른 내용을 실행해줄 수도 있고하니 그냥 콜백함수 디자인보다 훨씬 뭔가 직관적이고 유용합니다.

참고로 연산결과같은걸 then 안에서 활용하고 싶으면

성공(); 함수 구멍안에 넣어주시면 됩니다.

```
var 프로미스 = new Promise(function(성공, 실패){
  var 어려운연산 = 1 + 1;
  성공(어려운연산);
});

프로미스.then(function(결과){
  console.log('연산이 성공했습니다' + 결과)
}).catch(function(){
  console.log('실패했습니다')
});

```

그럼 then 함수 안에서 파라미터의 형태로 그 결과를 사용하실 수 있습니다.

끝입니다.

실제로 사용하는 예시를 하나 더 봅시다.

예시2. 1초 대기 성공 후에 특정 코드를 실행하려면?

역시 콜백함수로 디자인해놓아도 될 것 같죠? 그럼 그렇게 하시면 됩니다.

하지만 저는 간지나게 then을 사용해보기 위해 Promise를 디자인해보겠습니다.

```
var 프로미스 = new Promise(function(성공, 실패){
  setTimeout(function(){
    성공();
  }, 1000);
});

프로미스.then(function(){
  console.log('1초 대기 성공했습니다')
}).catch(function(){
  console.log('실패했습니다')
});
```

이러면 되겠죠?

아마 실패하는 경우는 없을 것 같아서 실패()는 안썼습니다.

Promise의 몇가지 특징

![20210927_050907](/assets/20210927_050907.png)

1. 일단 new Promise()로 생성된 변수를 콘솔창에 출력해보시면 현재 상태를 알 수 있습니다.

성공/실패 판정 전에는 <pending> 이라고 나오며

성공 후엔 <resolved>

실패 후엔 <rejected> 이런 식으로 나옵니다.

이렇게 프로미스 오브젝트들은 3개 상태가 있습니다.

그리고 성공을 실패나 대기상태로 다시 되돌릴 순 없습니다. 참고로 알아둡시다.

2. Promise는 동기를 비동기로 만들어주는 코드가 아닙니다.

![20210927_051111](/assets/20210927_051111.png)

Promise는 비동기적 실행과 전혀 상관이 없습니다.

그냥 코딩을 예쁘게 할 수 있는 일종의 디자인 패턴입니다.

예를 들면.. Promise 안에 10초 걸리는 어려운 연산을 시키면 10초동안 브라우저가 멈춥니다.

10초 걸리는 연산을 해결될 때 까지 대기실에 제껴두고 그런거 아닙니다.

![20210927_051346](/assets/20210927_051346.png)

promise와 유사한 기능을 하는건 ajax와 fetch가 있다. fetch는 항상 promise를 리턴한다.

(그냥 원래 자바스크립트는 평상시엔 동기적으로 실행이 되며 비동기 실행을 지원하는 특수한 함수들 덕분에 가끔 비동기적 실행이 될 뿐입니다.)

---

##### ES6 Promise 간단 연습문제 & 해설

Q1. <img> 이미지 로딩 성공시 특정 코드를 실행하고 싶습니다.

HTML 안에 있는 이미지 로딩이 끝나면 무언가 코드를 실행하고 싶습니다.

```
<img id="test" src="https://codingapple1.github.io/kona.jpg">
```

이 이미지가 로드가 되면 콘솔창에 성공, 로드가 실패하면 콘솔창에 실패를 출력하고 싶은데

Promise 문법의 then, catch 함수를 사용해 만들고 싶습니다. 어떻게 코드를 짜면 될까요?

(참고) 이미지 로딩이 끝났다는 것은 <img>에 load라는 이벤트리스너를 붙여서 체크가 가능합니다.

(참고) 이미지 로딩이 실패했다는 것은 <img>에 error라는 이벤트리스너를 붙여서 체크가 가능합니다.

정 안풀린다면 살짝만 엿보고 다시 풀어봅시다

id가 test인 <img>가 로딩이 되었는지 / 로딩 실패했는지 판단하려면

```
var img = document.querySelector('test');

img.addEventListener('load', function(){
    로딩성공시 실행할 코드
});
img.addEventListener('error', function(){
    로딩실패시 실행할 코드
});

```

이렇게 하면 됩니다. 별거아닙니다.

그럼 이걸 Promise를 이용해서 로딩성공시 .then() 실패시 .catch()를 실행하도록 코드를 짜보도록 합시다.

```

var 이미지로딩 = new Promise(function(성공, 실패){
 var img = document.querySelector('test');
 img.addEventListener('load', function(){
     성공();
 });
 img.addEventListener('error', function(){
     실패();
 });

});


이미지로딩.then(function(){
 console.log('성공했어요')
}).catch(function(){
 console.log('실패했어요')
})
```

있는 이미지인 경우:
![20210927_051949](/assets/20210927_051949.png)

없는 이미지인 경우:
![20210927_052104](/assets/20210927_052104.png)

이렇게 짤 수 있겠습니다.

프로미스 안에서는 성공(), 실패()가 실행되는 경우의 수를 만들어주시면 되고

그렇게 하면 이제 .then() .catch()를 이용해서 성공/실패시 특정 코드들을 실행할 수 있습니다.

끝입니다.

Q2. Ajax 요청이 성공하면 무언가 코드를 실행하고 싶습니다.

https://codingapple1.github.io/hello.txt 라는 경로로 GET 요청을 하면 인삿말이 하나 딸려옵니다.

여기로 GET 요청을 해서 성공하면

Promise의 then 함수를 이용해서 Ajax로 받아온 인삿말을 콘솔창에 출력해주고 싶습니다.

어떻게 하면 될까요? (jQuery Ajax 사용가능)

이것은 jQuery CDN 파일

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

```

jQuery Ajax 어떻게 하는지 힌트좀요

일단 jQuery로 Ajax 요청을 하려면 $.ajax혹은 $.get을 쓰시면 됩니다.

(그리고 jQuery 설치 파일이 상단에 첨부되어있어야겠죠?)

```
$.ajax({
  type : 'GET',
  url : 'URL 경로'
})


$.get('URL 경로')

```

둘중 하나 마음에 드는거 쓰시면 URL 경로 상에 있는 데이터를 가져올 수 있습니다.

그리고 가져온 데이터를 출력하거나 가져온 후에 특정 코드를 실행하고 싶다면

```

$.ajax({
  type : 'GET',
  url : 'URL 경로'
}).done(function(결과){
  console.log(결과);
});


$.get('URL 경로').done(function(결과){
  console.log(결과)
});

```

done함수를 뒤에 붙여서 이렇게 쓰시면 됩니다.

결과라는 파라미터에 여러분이 가져온 데이터가 담겨져있습니다.

A.

![20210927_052213](/assets/20210927_052213.png)
이게 그대로 답안이긴 하지만 Promise를 안 썼으므로 Promise를 사용해보자.

직접 해보셨다면 답을 맞춰봅시다

그래서 jQuery done함수 자체에 Promise 기능이 있기 때문에 코드가 길어지고 약간 쓸데없을 수 있지만

연습삼아 해보도록 합시다.

![20210927_052427](/assets/20210927_052427.png)
저 프로미스 부분이 Ajax가 성공할 시 실행시켜주는 프로미스다

일단 위의 저 경로로 Ajax요청을 해봅시다.

$.get('요청할 URL')을 적어주시면 Ajax GET요청이 간단하게 가능합니다.

```
$.get('https://codingapple1.github.io/hello.txt').done(function(결과){
  console.log(결과)
});
```

이렇게 하시면 되겠군요. 콘솔창에 Ajax로 가져온 인삿말이 출력되죠?

근데 이걸 성공하면 Promise의 then 함수로 뭔가 코드를 실행시키고 싶다고 했죠?

그럼 Promise 기계를 하나 만들어줍니다. 그리고 안에 성공판정 기준도 하나 마련해주고요.

```
var 프로미스 = new Promise(function(성공, 실패) {
    $.get('https://codingapple1.github.io/hello.txt').done(function(결과){
      성공(결과)
    });
});
```

기계가 완성되었습니다.

이제 프로미스에 then을 붙여서 성공시 뭔가 코드를 실행할 수 있습니다.

```
var 프로미스 = new Promise(function(성공, 실패) {
    $.get('https://codingapple1.github.io/hello.txt').done(function(결과){
      성공(결과)
    });
});

프로미스.then(function(결과) {
  console.log(결과);
})
```

이제 프로미스가 성공하면 콘솔창에 결과가 출력되죠? 성공입니다.

Q3. Promise chaining

2번 문제에서 https://codingapple1.github.io/hello.txt 라는 경로로 GET 요청을 한 뒤에

.then을 이용해 인삿말을 콘솔창에 출력해보았습니다.

이번엔 그 직후 https://codingapple1.github.io/hello2.txt 라는 경로로 GET 요청을 또 하고

.then을 이용해 인삿말을 또 출력해보고 싶습니다.

쉽게 말하면

1. hello.txt GET 요청

2. 그게 완료되면 hello2.txt GET 요청

3. 그게 완료되면 hello2.txt 결과를 콘솔창에 출력

을 하고 싶다는 말입니다.

2번에서 만든 코드를 어떻게 업데이트하면 될까요?

힌트1) 프로미스.then(()=>{둘째실행할거}).then(()=>{셋째실행할거})

이렇게 then을 여러개 이어붙여 만들어보세요 (검색이 필요할 수 있음)

힌트2) .then()은 new Promise()로 생성한 프로미스 오브젝트들에만 붙일 수 있습니다.

A.
저는 어떻게 짰냐면

![20210927_052737](/assets/20210927_052737.png)

이것도 그냥 jQuery done이나 콜백함수를 쓰는게 더 깔끔할 수 있겠지만

연습삼아 then을 여러개 사용해서 단계적으로 코드를 실행시켜보도록 합시다.

일단 이렇게 코드를 실행하고 싶다는 것입니다.

```
var 프로미스 = new Promise(function(성공, 실패) {
    $.get('https://codingapple1.github.io/hello.txt').done(function(결과){
      성공(결과)
    });
});

//hello1.txt 가져오는 프로미스가 성공하면
프로미스.then(function(결과) {
  그럼 이제 hello2.txt도 가져와주세요
}).then(function(결과) {
  hello2.txt 가져오면 콘솔창에 출력해주세요
})


```

then을 여러개 붙여서 뭔가 단계적으로 실행할 수 있습니다.

하지만 그냥 붙이면 안되고 then 함수는 new Promise()로 부터 생성된 오브젝트에만 붙일 수 있습니다.

그럼 then을 붙일 수 있게 첫째 then에서 return new Promise() 이런걸 해주면 되지 않을까요?

return 해주면 그 자리에 new Promise()가 남아서 거기 뒤에 .then을 붙일 수 있으니까요.

![20210927_052917](/assets/20210927_052917.png)

![20210927_052940](/assets/20210927_052940.png)

```
var 프로미스 = new Promise(function(성공, 실패) {
    $.get('https://codingapple1.github.io/hello.txt').done(function(결과){
      성공(결과)
    });
});

프로미스.then(function(결과) {
  console.log(결과);

  var 프로미스2 = new Promise(function(성공, 실패) {
    $.get('https://codingapple1.github.io/hello2.txt').done(function(결과){
      성공(결과)
    })
  });

  return 프로미스2;

}).then(function(결과) {
    console.log(결과);
})


```

그래서 첫 then 안에 프로미스2를 만들고, 프로미스2는 두번째 ajax 요청을 해주고 성공판정을 내립니다.

그리고 프로미스2를 return 해주는 기능을 만들었습니다.

그럼 이제 뒤에 then을 붙여서 코드를 연달아 실행이 가능하겠군요.

흐름은 이렇습니다.

1. 첫프로미스가 성공하면 then() 안의 코드를 실행시켜줍니다.

2. 근데 거기 안에는 프로미스2가 있습니다. 프로미스2가 성공하면

3. 뒤에 있는 then() 안의 코드를 실행시켜줍니다.

그리고 직접 ajax 말고 fetch도 쓸 수 있는데 찾아서 실행해보자.

그래서 이렇게 하시면 프로미스를 이용해 단계적으로 코드를 실행할 수 있습니다.

---

##### Promise 어려워서 싫으면 async/await을사용합시다

Promise가 어렵다면 그보다 훨씬 쉽게 쓸 수 있는 ES8 문법이 있습니다.

async, await이라는 키워드인데 각각 Promise와 then을 매우 쉽게 만들어주는 문법입니다.

같이 알아봅시다.

async 키워드를 쓰면 Promise 오브젝트가 절로 생성됩니다.

말그대로입니다. new Promise() 어쩌구 하실 필요가 없습니다.

근데 이 키워드는 function 선언 앞에만 붙일 수 있습니다.

```
async function 어려운연산 (){
  1 + 1
}
```

그럼 이 함수 자체가 Promise가 되어버립니다.

그래서 이 함수를 실행할 때 뒤에 then을 붙일 수 있습니다. Promise니까요.

(함수를 실행하면 그 자리에 Promise 인스턴스 (new Promise() 로 만든 오브젝트)가 남습니다. )

```
async function 더하기(){
  1 + 1
}

더하기().then(function(){
  console.log('더하기 성공했어요')
});
```

그럼 이제 Promise 만들 때 했던거 처럼 then을 붙여서 더하기() 함수가 성공한 뒤에 뭔가를 실행시킬 수 있습니다.

(훨씬 쉽네요 진작에 이렇게 만들것이지)

함수안에서 연산한 결과를 then 안에서 사용하고 싶다면

```
async function 더하기(){
  return 1 + 1
}

더하기().then(function(결과){
  console.log(결과)
});
```

이렇게하시면 됩니다.

return 오른쪽에 결과를 적어주시면 됩니다. 그럼 then함수까지 전해집니다.

then() 함수가 귀찮다면 await 키워드를 쓸 수 있습니다.

async 키워드를 쓴 함수 안에서는 await을 사용가능합니다.

await은 그냥 프로미스.then() 대체품으로 생각하시면 됩니다.

하지만 then보다 훨씬 문법이 간단합니다.

새로운 예제를 만들어봅시다.

어떤 function 안에서 어려운 연산을 실행한 뒤에 성공/실패를 판정해주는 Promise를 만들고 싶습니다.

그럼 어떻게 합니까.

```
async function 더하기(){
  var 어려운연산 = new Promise((성공, 실패)=>{
    var 결과 = 1 + 1;
    성공();
  });
  어려운연산.then();
}
더하기();
```

많이 했던 패턴대로 이렇게하시면 됩니다.

(혹은 Promise 만들기 귀찮으면 어려운연산을 함수로 만든 후 async를 쓰시면 됩니다)

그럼 이제 어려운연산.then() 이렇게 성공시 특정 코드를 실행할 수 있습니다.

근데 .then()이게 너무 복잡해서 보기 싫으시면

await이라는 키워드를 이용가능합니다.

```
async function 더하기(){
  var 어려운연산 = new Promise((성공, 실패)=>{
    var 결과 = 1 + 1;
    성공();
  });
  var 결과 = await 어려운연산;
}
더하기();
```

어려운연산.then() 과 매우 유사한 문법입니다.

정확한 뜻은 어려운연산 Promise를 기다린 다음에 완료되면 결과를 변수에 담아주세요

입니다.

![20210927_142347](/assets/20210927_142347.png)
이 경우는 promise가 해결 될 떄까지 기다린 후 실행한다.

연산 결과를 출력하거나 그러고 싶다면

성공 함수에 파라미터를 담아주시면 된다고 했죠?

```
async function 더하기(){
  var 어려운연산 = new Promise((성공, 실패)=>{
    var 결과 = 1 + 1;
    성공(결과);
  });
  var 결과 = await 어려운연산;
  console.log(결과);
}
더하기();
```

성공()함수 안에 있던 2라는 파라미터는

var 결과라는 변수에 저장됩니다.

그럼 Promise의 연산 결과를 출력해볼 수도 있겠네요.

(주의) 비동기식처리되는 코드를 담는다면 await 기다리는 동안 브라우저가 잠깐 멈출 수 있습니다.

await은 실패하면 에러가 나고 코드가 멈춥니다

Promise가 실패하는 하단 코드를 실행해봅시다.

```
async function 더하기(){
  var 어려운연산 = new Promise((성공, 실패)=>{
    실패();
  });
  var 결과 = await 어려운연산;
  console.log(결과);
}
더하기();
```

어려운연산이라는 Promise가 실패할 경우

await 어려운연산이라는 코드는 에러가 나고 코드실행을 멈춥니다.

그럼 await 하단에 있는 코드들은 더 이상 실행이 되지 않겠죠.

그래서 Promise가 실패할 경우

코드실행을 멈추고 싶지 않으면 약간 특별한 방법이 필요합니다.

```
async function 더하기(){
  var 어려운연산 = new Promise((성공, 실패)=>{
    실패();
  });
  try {  var 결과 = await 어려운연산 }
  catch { 어려운연산 Promise가 실패할 경우 실행할 코드 }
}
```

try catch라는 자바스크립트 문법인데,

try {} 안의 코드가 에러가 나고 멈출 경우

대신 catch {} 내부의 코드를 실행해줍니다.

이렇게 에러처리를 하실 수 있습니다. 더 복잡하니까 그냥 then() 이런거 쓰셈

어려운연산이라는 Promise가 실패()가 안날거라고 자신하면 try/catch를 굳이 쓸 필요는 없으니 코드가 더 간단해질 수도 있습니다.

예제 : button을 누르면 성공하는 Promise 만들기

Q. HTML 페이지 내에 버튼 아무거나 하나 만들고

그걸 클릭하면 성공하는 Promise를 만들고 싶습니다.

성공하면 콘솔창에 '성공했어요'를 출력하고요.

어떻게 코드를 짜면 될까요?

(async, await을 쓰도록 합시다. 그리고 async는 function 키워드 앞에만 붙일 수 있는걸 명심합시다)

A.

혼자 해보고 펼쳐보아야 공부가 됩니다

```
<button id="test">버튼</button>

<script>
  async function 버튼누르기(){
    var 프로미스 = new Promise(function(성공, 실패){
      document.getElementById('test').addEventListener('click', function(){
        성공();
      });
    }
    var 결과 = await 프로미스;
    console.log('성공했으요')
  }

  버튼누르기();
</script>
```

전 이렇게 짰습니다.

1. 일단 위의 버튼을 누르면 성공판정을 내리는 Promise를 만들었습니다.

그건 별거 아닙니다.

2. 근데 이제 그게 성공하면 console.log()를 해주는 코드를 짜려고 봤더니 then을 쓰기 싫어서

await 프로미스; 이렇게 작성했습니다.

3. 근데 await 을 쓰려면 async functinon 안에서만 쓸 수 있댔죠?

그래서 이 전체 코드를 async function을 하나 만들어서 감쌌을 뿐입니다.

혹은 이렇게 짜셨을 수도 있겠군요.

```
<button id="test">버튼</button>

<script>
  async function 버튼누르기(){
    async function 프로미스(){
      document.getElementById('test').addEventListener('click', function(){
        return '성공했어요'
      });
    }
    var 결과 = await 프로미스();
    console.log(결과)
  }

  버튼누르기();
</script>

```

▲근데 위의 코드는 잘 동작하지 않습니다.

async가 Promise를 퉤 뱉는다고해서 async function 프로미스() 를 쓰긴 쓰셨는데

문제는 이겁니다.

1. 이벤트 리스너는 바로 실행되지 않아서 Web API라는 공간으로 보냅니다.

2. 그래서 코드 시작시 async function 프로미스() 함수 내부는 빈칸과 동일합니다.

3. 자바스크립트는 function 안이 빈칸이면 그냥 자동으로 return undefined 를 채워 실행합니다.

(그럼 3번에 의해서 async function 프로미스()는 0.0001초만에 자동으로 성공()판정이 됩니다)

그래서 하단의

var 결과 = await 프로미스();

이 코드는 프로미스()가 0.0001초만에 성공판정이 내려진 상태로 실행되며

var 결과 = undefined 와 동일한 뜻입니다.

그래서 코드가 이상해진 것입니다.

하지만 Promise로 만들어서 직접 성공(), 실패() 경우를 지정해준다면

await이 잘 기다려줍니다.

---

##### for in / for of 반복문과 enumerable, iterable 속성

이번기회에 반복문들 총정리를 해봅시다.

for, forEach는 기초강의에서 했으니 for in, for of 반복문을 알아봅시다.

그리고 함께 enumerable, iterable 이라는 속성도 알아봅시다.

![20210927_143957](/assets/20210927_143957.png)

반복문은 용도가 2개라고 보시면 됩니다.

1. 코드 단순 반복

2. 자료형에 담긴 자료들을 하나씩 꺼내고 싶을 때

사용합니다.

그 중 for in 반복문을 먼저 알아봅시다.

for in 반복문은 Object에 사용합니다.

Object 자료형에 저장된 자료들을 하나씩 꺼내고 싶을 때 사용합니다.

```
var 오브젝트 = { name : 'Kim', age : 30 };

for (var key in 오브젝트) {
  console.log(오브젝트[key]);
}
```

이렇게 사용합니다.

(key라는건 변수명입니다. 여러분이 마음대로 작명하시면 됩니다.)

그럼 반복문은 오브젝트라는 자료 내부 데이터 갯수만큼 반복하게 되며

반복할 때마다 key라는 변수는 name, age 이렇게 데이터의 key값이 됩니다.

그럼 반복시마다 변경되는 key 값을 이용하면 오브젝트 내의 자료를 모두 출력할 수 있습니다.

단순하게 오브젝트.key를 콘솔창에 출력하면 되는데, 변수명을 저렇게 쩜찍고 쓸 수는 없으니

오브젝트[key] 라고 사용하시면 됩니다.

오브젝트에서 자료 꺼내기 끝입니다.

![20210927_144735](/assets/20210927_144735.png)


![20210927_172340](/assets/20210927_172340.png)

####### for in 반복문의 특징 1. enumerable한 것만 출력해줍니다

여러분이 object 자료형을 만들 때

{ name : 'Kim' } 이걸 저장하면 Kim 이라는 자료만 달랑 저장되는게 아닙니다.

Kim과 함께 비밀스러운 속성들 3개가 저장됩니다.

```
var 오브젝트 = { name : 'Kim', age : 30 };

console.log( Object.getOwnPropertyDescriptor(오브젝트, 'name') );
```

비밀스런 속성 3개를 출력해보고 싶으면 위처럼 쓰시면 됩니다.

그럼 콘솔창에 뭐 이런게 나오죠?

```
{value: "Kim", writable: true, enumerable: true, configurable: true}
```

이것이 Kim과 함께 몰래 저장되는 속성들입니다.

(그래서 Object 자료형이 좀 무겁습니다)

여기서 enumerable이라는게 있는데, 이게 true인 자료들만 for in 반복문이 출력할 수 있습니다.

이걸 강제로 false로 만들면 for in 반복문이 거릅니다.

아무튼 이런 동작원리를 가진게 바로 for in 반복문입니다.

- enumerable을 번역하면 '셀수있는' 이라는 뜻입니다.

###### for in 반복문의 특징 2. 부모의 prototype에 저장된 것도 출력해줍니다.

object의 부모의 유전자에 있는 속성도 반복문으로 출력해줍니다.

진짜인지 한번 실험해봅시다.

```
class 부모 {

}
부모.prototype.name = 'Park';

var 오브젝트 = new 부모();

for (var key in 오브젝트) {
  console.log(오브젝트[key]);
}
```

Park이라는 자료는 부모가 가지고 있는 것인데도 출력해줍니다.

이게 단점입니다.

이런게 싫으시다면 if문을 추가해주셔야합니다.

```
class 부모 {

}
부모.prototype.name = 'Park';

var 오브젝트 = new 부모();

for (var key in 오브젝트) {
  if (오브젝트.hasOwnProperty(key)) {
    console.log(오브젝트[key]);
  }
}
```

오브젝트.hasOwnProperty()라는 함수는

오브젝트가 이 key값을 직접 가지고 있냐라고 물어보는 함수입니다.

갖고 있으면 true, 없으면 false를 뱉어줍니다.

그래서 내가 가진 것만 반복시키고 싶으면 이걸 꼭 쓰셔야합니다.

![20210927_144905](/assets/20210927_144905.png)

###### for of 반복문

사용해봅시다. for in 반복문과 매우 유사합니다.

```
var 어레이 = [2,3,4,5];
for (var 자료 of 어레이) {
  console.log(자료);
}
```

![20210927_172727](/assets/20210927_172727.png)

이러면 어레이 안에 있던 모든 자료를 하나씩 콘솔창에 출력할 수 있군요.

array 자료형 뿐만 아니라

array, 문자, arguments, NodeList, Map, Set 이라는 자료형에 적용할 수 있는 반복문입니다.

근데 정확히 말하면 iterable인 자료형들에만 적용가능한 반복문입니다.

iterable한 자료형이 뭐냐면

[Symbol.iterator]() 이라는 일종의 메소드를 가지고 있는 자료형들을 뜻합니다.

진짜 이런 괴상한게 있는지 출력만 해보도록 합시다.

```
var 어레이 = [2,3,4,5];
console.log( 어레이[Symbol.iterator]() );
```

array 자료형 뒤에 붙이면 뭔가 출력되긴 하죠?

문자도 그렇습니다.

실은 반복문 출력을 도와주는 일종의 함수인데 실용성은 없어서 깊게 이해할 필요는 없고

이걸 가지고 있으면 for of 반복문을 쓸 수 있구나~라고만 아시면 됩니다.

for of는 NodeList라는 곳에도 사용할 수 있는데

우리가 흔히 document.getElementsByClassName()이나 document.querySelectorAll() 이런 셀렉터로 찾은 요소들이

[] 대괄호안에 담겨오는데 array는 아니고 NodeList라는 자료형이라고 부릅니다.

NodeList에 있는 HTML요소들을 하나씩 꺼내서 처리할 때

매우 자주 쓸 수 있는 반복문이라고 보시면 됩니다.

(하지만 for of의 호환성 주의)

새로운 반복문 배운 기념으로 연습삼아 유명한 문제 하나만 풀어보는건 어떨까요.

for of 반복문을 이용해서 2단부터 9단까지의 구구단을 콘솔창에 한번 출력해보십시오.

2 x 1 = 2

2 x 2 = 4

...

이런 문자를 쭉 9단까지 출력해보시면 되겠습니다.


----------



##### Symbol 자료형이 있는 이유?


![20210927_173543](/assets/20210927_173543.png)

ES6부터 Symbol 이라는 Primitive 자료형이 하나 추가되었습니다.

이걸 어디에 사용하는지 알아보도록 합시다.











Symbol 자료형 만드는 법



간단하게 만들 수 있습니다.

```
var 심볼 = Symbol('설명아무거나적기');
```

Symbol() 함수를 이용하시면 되고 안에 아무 설명이나 적으시면 됩니다. 심볼만들기 끝!

그냥 주석(설명)하나만 달랑 저장할 수 있는 자료형입니다.

근데 어디다가 사용하는지 알아야 코딩할 때 쓰죠 문법만 배워서 뭐함













Symbol은 Object자료형에 비밀스런 key값을 부여하고싶을 때 씁니다.



원래 Object 자료형에는 문자로만 key값을 입력할 수 있습니다.

문자 아닌걸 입력해도 문자로 자동으로 치환되고요.

근데 ES6부터는 Symbol도 key값으로 입력할 수 있습니다.





person[심볼명] = 넣을자료;

이렇게 쓰시면 Object자료형에 Symbol을 이름으로 가진 자료를 저장가능합니다.


```
var person = { name : 'Kim' };
person.weight = 100;

var weight = Symbol('내 진짜 몸무게');
person[weight] = 200;

console.log(person);
```
위의 예제코드는 Symbol을 key값, 200을 value값으로 오브젝트에 집어넣은 예제입니다.

출력해보면 { Symbol(내 진짜 몸무게) : 200 } 이라는 자료가 들어가있을겁니다.

이렇게 특이한 이름을 가진 자료를 Object안에 만들고 싶을 때 Symbol을 쓰시면 됩니다.





이 자료는 특징이 있는데,

for문에 등장하지 않는다는겁니다.

보통 Object를 반복문을 돌릴 때 for in 이런걸 사용합니다.

그런데 Symbol은 반복문에서 감지하지 못합니다.



그래서 시크릿한 내용을 저장하고 싶을 때 Symbol을 이용해서 자료를 저장하시면 됩니다.















심볼을 직접 입력하려면



심볼을 오브젝트 만들 때 직접 입력할 수도 있습니다.
```
var height = Symbol('내 키임');

var person = { name : 'Kim', [height] : 160 };
```
Object 자료형에 직접 입력하실 때는 저렇게 대괄호안에 심볼명을 담아주시면 됩니다.





 ![20210927_174259](/assets/20210927_174259.png)







Symbol 자료형 특징1. 설명은 설명일 뿐


![20210927_174419](/assets/20210927_174419.png)

Symbol() 안에는 간단한 설명을 저장할 수 있다고 했습니다.

근데 같은 설명을 가졌다고 해서 같은 Symbol이 아닙니다.

각각 다른겁니다.


```
var a = Symbol('설명1');
var b = Symbol('설명1');
console.log(a === b);
```



위의 예제에서 a와 b 심볼은 설명이 같음에도 불구하고

두개를 같다고 비교해보면 false가 남습니다.

Symbol은 Symbol()이라고 사용할 때마다 각각 유니크한 Symbol이 생성되서 그렇습니다.





![20210927_174538](/assets/20210927_174538.png)

Symbol 자료형 특징2. Symbol.for()로 만드는 전역심볼



변수처럼 뭔가 같은값을 가지면 같은 변수로 취급해주는

전역 심볼을 만들어쓸 수 있습니다.



그러고 싶으면 Symbol() 대신에 Symbol.for() 로 만드시면 됩니다.


```
var a = Symbol.for('설명1');
var b = Symbol.for('설명1');
console.log(a === b);
```
위의 예제를 출력해보면 true라는 값이 남습니다.

왜냐면 Symbol.for()로 새로운 Symbol을 만들 때

설명이 같으면 이미 그 설명을 가지고 있는 Symbol을 그 자리에 집어넣기 때문입니다.

그래서 a와 b의 심볼은 각각 다른 곳에서 만들었음에도 불구하고 같은 Symbol이 됩니다.






![20210927_174617](/assets/20210927_174617.png)




Symbol 자료형 특징3. 기본 내장 Symbol들



Array, Object 자료형을 만들 때 몰래 붙어있는 기본 Symbol 들도 있습니다.

예를 들면 모든 array 자료형은 [Symbol.iterator]라는 이름을 가진 심볼이 안에 있습니다.

궁금하면 아무 array나 만들고 한번 저걸 출력해보십시오.

(Symbol을 출력하고 싶으면 오브젝트[심볼명] 이렇게 하시면 됩니다)


```
var array = [2,3,4];
console.log(array[Symbol.iterator]);
```

Q. 근데 우린 왜 몰랐죠?

심볼은 몰래 자료를 저장할 때 쓰는 자료형이랬잖아요. 그래서 반복문 이런걸 써도 전혀 출력되지 않습니다.





참고로 Symbol.iterator라는 심볼은 for of를 쓸 수 있게 도와주는 Symbol입니다.

그래서 ES6환경에선 저런 식으로 뭔가 내장 기능을 만들어내는구나~라고 이해만 하시면 됩니다.

원리를 파헤치기 시작하면 훌륭한 자바스크립트 대현자가 되지만

한국은 원리를 파헤치고 그런 기초과학하는 나라가 아닙니다. 기술을 배워 먹고사는게 먼저입니다.


---------

##### Map, Set 자료형


ES6부터 Map, Set 자료형도 추가되었습니다.

역시 매일 만나는 자료형은 아니기 때문에 간단하게 어디다쓰는지만 알아보도록 합시다.







매핑을 할 수 있는 Map 자료형



Object자료형과 똑같이 key, value 형태로 자료를 저장할 수 있는 자료형입니다.

어떻게 만드냐면
```
var person = new Map();
person.set('name', 'Kim');
person.set('age', 20);
```
이렇게 만들고 자료를 저장할 수 있습니다.

그럼 name은 Kim

age는 20이라는 자료가 저장됩니다.

근데 출력해보시면 Object와는 약간 다릅니다.





![20210927_185307](/assets/20210927_185307.png)



화살표로 나타내줍니다.

왜냐면 Map 자료형은 자료의 연관성을 표현하기 위해 쓰기 때문입니다.

그냥 key, value형식으로 저장하려면 Object 쓰시면 되고,

name이 Kim과 연관되어있다~ 라고 저장하고 싶으면 Map을 쓰시면 됩니다.

다시한번 강조하면 자료들 간의 연관성을 표현하기 위해 쓰는 자료형이 바로 Map입니다.

















그래서 Map 자료형은 key, value값에 모든 자료를 집어넣을 수 있습니다.



key값란에 별걸 다 집어넣을 수 있다는 소리입니다.

```
var person = new Map();
person.set([1,2,3], 'Kim');
person.set('age', 20);
```
자료의 이름으로 array도 되고 object도 됩니다.

단순하게 자료의 이름이라기보다는

Map은 이 값이 저 값과 연관되어있다~ 라는걸 표현하기 위함이니까요.




![20210927_185436](/assets/20210927_185436.png)


Map 다루는 법



```  
var person = new Map();
person.set('age', 20);

person.get('age'); //자료 꺼내는 법
person.delete('age'); //자료 삭제하는 법
person.size; //자료 몇갠지 알려줌

//Map자료 반복문 돌리기
for (var key of person.keys() ){
  console.log(key)
}

//자료를 직접 집어넣고 싶으면

var person = new Map([
  ['age', 20],
  ['name', 'Kim']
]);
```

이렇게 다룰 수 있습니다.

때에 따라 평생 쓸일이 없을 수도 있습니다.









평소에 개발할 땐 여기까지만 알고계시면 되는데

실은 알고리즘 공부를 하게 된다면 Map 자료형을 다시 만나게 될 겁니다.

array 같은 곳에 자료를 저장할 때 자료가 천만개 1억개 이상으로 많으면 Hash Map, Hash Table 이라는걸 사용합니다.

왜냐면 1억개 자료가 저장된 array에서 원하는 것만 쏙 뽑고 싶으면 반복문을 돌리든가 해서 1억개를 전부 들춰봐야하니까요.


```
var array = [1,5,34,67,43,2,213,8]
```
이런 자료에서 2라는 자료가 어딨는지 찾고싶으면 어떻게합니까.

몇번째인지 모르니까 반복문 돌려서 하나하나 출력해봐야하는 것입니다. 그래서 느리다는 겁니다.





근데 Hash Table 이런걸 쓰면 자료를 미리 abc 순으로 정돈이 가능한데

abc 순으로 정돈된 자료는 매우 찾기 빠릅니다.

왜 빠르냐고요? 여러분 종이 영어사전에서 단어 찾을 때도 abc 알파벳 순으로 정렬되어있어서 빠르게 찾을 수 있잖아요.  

그래서 자료가 1억개고 거기서 원하는걸 찾을 일이 많으면 Hash Table을 사용합니다.

자료에 key값을 부여해놓고 정렬하면 그게 Hash Table 만들기 끝입니다.

실은 여태까지 잘 쓰던 object 자료형이 Hash Table이랑 비슷합니다.





근데 Hash Table을 만들기 위해선 쌩 자바스크립트 object 자료 쓰면 되긴 하는데

1. object 자료형은 hasOwnProperty, toString 이런 키들도 집어넣을 수 있어서 너무 유연하고

2. key값으로 들어올 수 있는게 문자형태로 제한되어있어서

Map 자료형을 사용합니다. 그냥 new Map() 쓰면 끝임

가끔 Map 이라는 클래스를 직접 똑같이 만들어보는 것도 좋은 연습문제로 등장합니다.












Set 자료형



간단한 Array 자료형과 똑같이 생겼습니다.

자료를 일렬로 쭉 저장할 수 있습니다.

이렇게 만들 수 있습니다.



![20210927_185914](/assets/20210927_185914.png)


```
var 출석부2 = new Set([ 'john' , 'tom', 'andy', 'tom' ]);

console.log(출석부2);
```



출력해보면 아시겠지만 중괄호로 표현이 되죠?

중괄호지만 Array와 유사하게 생겼습니다.




![20210927_184955](/assets/20210927_184955.png)






또 다른 특징은 이 자료형은 중복자료를 절대 허용하지 않습니다.

실수로 tom이라는걸 두개 집어넣었었는데, 지금 tom은 하나만 출력됩니다.

이렇게 중복 데이터를 방지하고 싶을 때 쓰시면 유용한 자료형입니다.









Set 자료형 다루기


```
var 출석부2 = new Set([ 'john' , 'tom', 'andy', 'tom' ]);

출석부2.add('sally'); //자료더하기
출석부2.has('tom'); //자료있는지 확인
출석부2.size;  //자료 몇갠지 세기
```

물론 반복문도 돌릴 수 있습니다. forEach 혹은 for of 반복문을 씁니다.

Set은 Map보다는 그나마 많이 씁니다.











특히 Array의 데이터 중복제거할 때 많이 씁니다.



왜냐면 Array를 Set으로 바꾸는게 매우 쉽기 때문입니다.

한번 Array에 있는 중복데이터를 제거해봅시다.




```
var 출석부 = [ 'john' , 'tom', 'andy', 'tom' ];

var 출석부2 = new Set(출석부); //Array를 Set으로 바꾸기

출석부 = [...출석부2]  //Set을 Array로 바꾸기
```
이런 패턴으로 많이 합니다.

위의 예제는 출석부라는 Array자료형을 Set으로 바꿨다가 다시 바로 Array로 바꾸는 예제입니다.

그럼 이제 출석부에 있던 중복자료들이 자동으로 제거가 됩니다.



------



##### Web Components : 커스텀 HTML 태그 만들기 1


html 코드를 짜다보면 div 들이 매우 많아 귀찮은 경우가 있습니다.

그럴 땐 여러개의 div 태그들을 하나의 단어로 축약할 수 있는 문법을 쓰면 됩니다.

Web Component 라는 문법입니다.

자바스크립트 문법은 아니고 브라우저 기본 기능 중 하나입니다.





약간의 class 문법만 알고계시면

복잡한 html 태그들을
```
<pretty-card>

<grey-button>
```
이런 식으로 이쁘게 축약해서 사용가능합니다.









커스텀 html 태그 만드는 법



예를 들어서 custom-input 이라고 입력하면

```<label><input>``` 이렇게 2개의 태그가 안에 출현하게 만들고 싶어진 것입니다.

그럼 어떻게 코드를 짜야하는지 알아봅시다.



```<custom-input>``` 같은 커스텀 태그를 이제부터 컴포넌트라고 칭할겁니다.

컴포넌트를 만들고 싶으면 이런 형식에 따라서 그대로 타이핑만 하면 됩니다.

이건 정해진 문법이라 이해할 필요는 없고 따라치면 됩니다.


```
//1. 컴포넌트에 뭐 들어갈지 설정하는 법
class CustomInput extends HTMLElement {

   connectedCallback() {
      //2. 컴포넌트에 html 더하는 법
      let 라벨 = document.createElement('label');
      라벨.innerHTML = '이름을 입력하쇼';
      this.appendChild(라벨);
      let 인풋 = document.createElement('input');
      this.appendChild(인풋);
   }
}

//3. <컴포넌트> 이름 등록하는 법
customElements.define("custom-input", CustomInput);
```
```
<custom-input></custom-input>

(이제 이러면 label 태그와 input 태그가 세트로 생성됩니다)
```





1. 컴포넌트에 어떤 html들을 집어넣을지 맘대로 설정 가능합니다.

class와 extend 문법 저렇게 그대로 써주시면 되고 (class명 작명가능)

안에는 connectedCallback() 이라는 함수안에

여러분의 커스텀 html을 막 꾸미면 됩니다.

(참고) connectedCallback() 함수는 컴포넌트가 html에 장착될 때 실행됩니다.





2. html 만들고 싶으면 쌩자바스크립트로 html 만드는 문법 가져다 쓰면 됩니다.

document.createElement('div') 이런게 div태그 만드는 문법임

this.appendChild(만든html태그) 이런건 만든 div 태그 컴포넌트에 추가하는 문법임

(this는 컴포넌트를 의미합니다)





다 됐으면 3번처럼 써주시면 컴포넌트 등록이 가능합니다.

작명도 아무렇게나 합시다.

(보통 대시기호 넣는게 관습입니다)



![20210927_210303](/assets/20210927_210303.png)







▲ 그럼 브라우저에서 개발자도구로 검사해보면

```<custom-input>``` 이라고 쓸 때마다 ```<label> <input>``` 이것들이 남습니다.

이것이 html을 컴포넌트로 축약해서 쓸 수 있는 Web Component 문법입니다.













리액트, 뷰와 다른 점은



많이들 좋아라하는 리액트도 똑같은 기능을 제공합니다.

리액트도 html을 하나로 묶어서 component로 만들어서 재사용이 가능합니다.

하지만 리액트는 웹앱을 만드는 라이브러리라 용도가 약간 다릅니다.

리액트는 state를 사용가능해서 state가 변할 경우 자동으로 html 재렌더링해주는 기능도 제공하고

리액트는 virtual DOM을 이용해서 재렌더링을 매우 빠르고 효율적으로 도와줍니다.

하지만 html의 class를 className으로 바꿔야하고 props 귀찮게 넣어야하고 useEffect 이상한 함수도 많고

문법이 약간 더러울 뿐입니다.



참고로 자바스크립트의 Web Component와 유사한 문법을 가지고 있는건 Vue.js 입니다.

그래서 자바스크립트 근본주의자들이 Vue는 좋아함
