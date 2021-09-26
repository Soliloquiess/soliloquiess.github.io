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

+ array랑 똑같이 등호로 디폴트값도 적용가능합니다.









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


-------


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
------------------------
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

------------------------
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
------------------------
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
------------------------
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











(5) import할 때 변수들이 너무 많으면 * 기호를 씁시다



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
------------------------
(index.html)

```
<script type="module">
  import c, {* as 변수모음} from 'library.js';
  console.log(변수모음.a);
  console.log(c);
</script>
```
'*' 이라는 기호는 export 했던 애들을 그냥 다 import 해주세요~ 라는 뜻입니다.

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


------------------------

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
