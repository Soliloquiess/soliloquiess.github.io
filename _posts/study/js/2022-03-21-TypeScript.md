---
title: "[js] TypeScript"
layout: post
subtitle: JS
date: "2021-12-15-23:45:51 +0900"

categories: study
tags: JS
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---
### 타입스크립트 쓰는 이유



웹개발자 채용공고보면 타입스크립트가 항상 보입니다.

규모가 좀 있는 곳들은 거의 타입스크립트를 요구스펙에서 빼놓지 않고 기입하는데

모른다고 그리 걱정할건 아닙니다. 왜냐면 정말 별거 없어서 그렇습니다.



타입스크립트는 자바스크립트의 타입부분을 업그레이드해서 사용하고싶을 때 설치해서 쓰는

일종의 자바스크립트의 대용품입니다.

완전 다른 언어는 아니라 자바스크립트 문법 그대로 이용가능한데 타입문법을 업그레이드해서 쓸 수 있습니다.




근데 타입스크립트는 이런걸 전부 에러로 잡아줍니다.

이거 하나 때문에 쓰는 언어가 바로 타입스크립트입니다.



코딩 꼰대들은 이런 생각을 할 수 있습니다.

"굳이?"

하지만 1. 코드 천줄 만줄 짜다보면

2. 남이짜던 자바스크립트 수정할 일이 생기면

생각이 달라질 수 있습니다.



Dynamic typing은  쪼그만 기능들을 개발할 땐 편리하겠지만 여러분 큰 프로젝트할 때는 이런게 오히려 단점입니다.

 type과 관련된 버그들이 많이 발생합니다.

천재라서 버그 안만들 자신이 있다고요?

하지만 남이 짠 더러운 코드를 수정할 땐 천재든 지니어스든 무소용입니다.

남이 짠 코드에 뭔가를 더하거나 수정할 때 정말 알 수 없는 타입관련 버그들이 생길텐데

제발 타입스크립트로 만들어졌길 빌어야합니다.



타입스크립트를 쓰면 에러메세지도 더 정확해집니다.

쌩 자바스크립트는 "이거 좀 이상한데요나도 몰?루" 같은 애매한 에러메세지가 많은데

타입스크립트는 엄격한 타입룰 덕분에

"여기에 숫자가 들어와야하는데 문자쓰지마라 멍청아"

"님 토익 300점임? object에 apend() 그런건 없어요 append() 말한거 아님?"

이렇게 친절하게 알려줍니다.

그래서 언어보다는 일종의 에디터 부가기능있죠 그런거랑 비슷하다고 보면 됩니다.


왜냐면 자바스크립트는 타입에 관대합니다.

5 - '3' 이렇게 숫자와 문자를 연산해도

parseInt([1,2,3]) 숫자로 바꿔주는 함수에 뭔가 이상한걸 넣어도

아무런 제지가 없습니다.

지가 알아서 타입을 바꿔주기 때문입니다.

(멋있는 말로 자바스크립트는 Dynamic typing 을 지원하는 언어입니다)

일반 HTML CSS JS 웹개발시 타입스크립트 사용하려면





앞으로의 강의도 이 환경에서 타입스크립트를 사용해볼 것입니다.

제일 간단하고 좋으니까요



1. Nodejs 최신버전, VScode 에디터를 설치합니다.

Nodejs는 언제나 최신버전 아니면 에러가 잦습니다. 구글에 검색해서 둘다 설치합시다.



2. VScode 에디터에서 터미널을 오픈합니다.

상단메뉴에 Terminal - New Terminal 누르면 됩니다.



3. 터미널에서 입력합니다.
```
npm install -g typescript
```
타입스크립트 컴파일러라는걸 설치하는건데 컴퓨터마다 한 번만 하면 됩니다.

에러가 납니까


(1) nodejs 최신버전 설치를 안한 것임 삭제 후 최신 버전으로 재설치 합시다.

(2) 윈도우인데 허가되지 않은 script 실행불가 어쩌구 에러가 뜨면

시작 - 검색 - powershell - 우클릭해서 관리자 권한으로 실행한 다음

Set-ExecutionPolicy Unrestricted 입력하셈 그리고 y 선택하면 될듯

(3) 맥북인데 보안에러 어쩌구가 뜨면

sudo npm install 어쩌구~ 이렇게 sudo를 앞에 붙여보십시오.

중간에 맥북 비번입력이 필요할 수 있습니다.

4. 코드짤 작업폴더를 하나 만들어줍니다.

코드짤 폴더 아무데나 만드셈 찾기좋은 바탕화면이 어떨까요.



5. 작업폴더를 에디터로 오픈합니다.

에디터에서 상단메뉴중에 File - Open Folder 누르고 방금 만든 작업폴더 오픈하면 됩니다.

오픈안하면 큰일남



6. 그 다음에 작업폴더에 .ts로 끝나는 파일 만들고 타입스크립트 사용 시작하면 됩니다.

ts 파일은 js랑 똑같이 사용가능합니다.

다만 근데 웹브라우저는 ts 파일을 알아듣지 못하기 때문에

js 파일로 변환 작업을 해야합니다.



7. js 파일로 변환하려면 에디터에서 Terminal 새로 여신다음

tsc -w 입력해두면 얘가 자동으로 ts파일을 js 파일로 근처에 변환해줍니다.



8. 이제 HTML 파일 등에서 타입스크립트로 작성한 코드를 사용하려면

당연히 .ts가 아니라 변환된 .js 파일을 사용하십시오.
```
<script src="변환된파일.js"></script>
```

React 프로젝트에서 Typescript 사용할 경우





1. 이미 있는 React 프로젝트에 설치하실거면

작업폴더경로에서 터미널을 오픈하신 후
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

입력해주면 끝입니다. 이제 .js 파일을 .ts 파일로 바꿔서 이용가능합니다.

근데 뭔가 많아서 불안정하고 에러도 많이날 것 같죠?

그러면 yarn 1버전이 설치되어있으면 yarn add라는 명령어 쓰든가

그냥 애초에 처음부터 Typescript 적용된 React 프로젝트를 생성할 수도 있습니다.





2. 그냥 React 프로젝트를 새로 만들거면

새로 작업폴더를 하나 만드시고 거기서 에디터와 터미널을 오픈한 다음

npx create-react-app my-app --template typescript
입력해주면 끝입니다. 대시 두개임


Vue 프로젝트에서 Typescript 사용할 경우





1. 작업폴더경로에서 터미널을 오픈하신 후
```
vue add typescript
```
입력하면 라이브러리가 설치됩니다.





2. 이제 vue파일에서 타입스크립트를 쓰려면
```
<script lang="ts">

</script>
```
이렇게 lang 옵션을 켜두고 쓰면 알아서 잘 됩니다.

Vue 프로젝트 내에서도 tsconfig.json 파일 만들어서 설정도 자유롭게 가능합니다.


타입스크립트 10분 정리


```
let 이름 :string = 'kim'
```
변수를 만들 때 타입지정이 가능합니다.

변수명 : 타입명 이렇게 씁니다.

타입으로 쓸 수 있는 것들은 string, number, boolean, bigint, null, undefined,[], {} 등이 있습니다.






```
let 이름 :string = 'kim';
이름 = 123;
```
타입을 지정해놓으면 타입이 의도치 않게 변경될 경우 에러메세지를 띄워줍니다.

덕분에 타입관련 버그들을 사전에 찾아 없앨 수 있습니다.






```
let 이름 :string[] = ['kim', 'park']
let 나이 :{ age : number } = { age : number }
```
array 혹은 object 자료는 이렇게 타입지정이 가능합니다.








```
let 이름 :string | number = 'kim';
```
이 변수에 여러가지 타입의 데이터가 들어올 수 있다면

| 기호를 이용해 or 연산자를 표현할 수 있습니다.

위 예제는 변수에 숫자 혹은 문자를 집어넣을 수 있게 됩니다.








```
type nameType = string | number;
let 이름 :nameType = 'kim';
```
type 키워드를 이용해 타입을 변수처럼 담아서 사용가능합니다.






```
type NameType = 'kim' | 'park;
let 이름 :NameType = 'kim';
```
string number 이런 것 뿐만 아니라 나만의 타입을 만들어 사용가능합니다.

저렇게 원하는 글자나 숫자를 입력하면 이름이라는 변수엔 앞으로 'kim' 또는 'park'만 들어올 수 있습니다.

literal type이라고 부릅니다.








```
function 함수명(x :number) :number{
  return x * 2
}
```
함수는 파라미터와 return 값이 어떤 타입일지 지정가능합니다.

실수로 다른 타입이 파라미터로 들어오거나 return될 경우 에러를 내줍니다.

함수는 return 타입으로 void를 설정가능한데 return이 없는지 체크할 수 있는 타입입니다.
```
//에러
function 함수명(x :number | string) {
  return x * 2
}

//가능
function 함수명(x :number | string) {
  if (typeof x === 'number'){
    return x * 2
  }
}
```
타입스크립트는 지금 변수의 타입이 확실하지 않으면 마음대로 연산할 수 없습니다.

항상 타입이 무엇인지 미리 체크하는 narrowing 또는 assertion 문법을 사용해야 허락해줍니다.








```
type Member = [number, boolean];
let john:Member = [100, false]
```
array 자료 안에 순서를 포함해서 어떤 자료가 들어올지 정확히 지정하고 싶으면

tuple 타입을 쓰면 됩니다. 대괄호 [ ] 안에 들어올 자료의 타입을 차례로 적어주면 됩니다.








```
type MyObject = {
  name? : string,
  age : number
}
let 철수 :MyObject = {
  name : 'kim',
  age : 50
}
```
object 타입도 정의가 너무 길면 type 키워드로 변수에 담아 사용가능합니다.

type 키워드 대신 비교적 최근에 나온 interface 키워드를 이용해도 무방합니다. 차이점은 별로 없습니다.

특정 속성이 선택사항이면 물음표를 기입가능합니다.








```
type MyObject = {
  [key :string] : number,
}
let 철수 :MyObject = {
  age : 50,
  weight : 100,
}
```
object안에 어떤 속성이 들어갈지 아직 모른다면

그냥 전부 싸잡아서 타입지정도 가능합니다.

index signature라고 합니다.












```
class Person {
  name;
  constructor(name :string){
    this.name = name;
  }
}
```
class도 타입설정이 가능합니다.

다만 중괄호 내에 미리 name 이렇게 변수를 만들어놔야 constructor 안에서 this.name 이렇게 사용가능합니다.



근데 문법만 정리했다고해서 코드를 잘 짤리가 없죠

영문법책 읽어봤다고 영어로 프리토킹 잘한다는 소리같군요

다음 시간부터 보다 상세한 개념과 예제를 알아봅시다.


-----------

### Typescript 컴파일시 세부설정 (tsconfig.json)


tsconfig 파일 생성하기



여러분 프로젝트 폴더에  tsconfig.json 이라는 파일을 하나 생성합시다.

여기엔 타입스크립트 ts 파일들을 .js 파일로 변환할 때 어떻게 변환할 것인지 세부설정이 가능합니다.

리액트나 뷰 이런거 쓰는 중이면 이미 있을 수 있음


![20220323_122010](/assets/20220323_122010.png)
▲ 이렇게 그냥 자신있게 만들면 됩니다




```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
    }
}
```
그리고 json파일 안에 이렇게 복붙하도록 합시다.



'target'은 타입스크립트파일을 어떤 버전의 자바스크립트로 바꿔줄지 정하는 부분입니다.

es5로 셋팅해놓으면 es5 버전 자바스크립트로 컴파일(변환) 해줍니다.

신버전을 원하면 es2016, esnext 이런 것도 입력할 수 있습니다.



'module'은 자바스크립트 파일간 import 문법을 구현할 때 어떤 문법을 쓸지 정하는 곳입니다.

commonjs는 require 문법

es2015, esnext는 import 문법을 사용합니다.



그래서 어느정도 IE 호환성을 원하시면 es5, commonjs가 국룰임

근데 정말 신버전 자바스크립트만 표현가능한 그런 문법들이 있는데

(예를 들어 BigInt() 이런 함수와 bigint 타입)

그런 것들은 esnext 등으로 버전을 올려줘야 사용가능합니다.




 --------



 ###### 추가로 넣을만한 것들


```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
```
noImplicitAny는 any라는 타입이 의도치않게 발생할 경우 에러를 띄워주는 설정이고  

strictNullChecks는 null, undefined 타입에 이상한 조작하면 에러를 띄우는 설정입니다.

저는 이것들은 안넣고 시작할겁니다.

나중에 실제 개발할 때 넣어보셈


tsconfig에 들어갈 기타 항목들



대부분 건드릴 필요 없는데 쓸모있어보이는 것들만 추려봤습니다.

전체는 https://www.typescriptlang.org/tsconfig 에서 구경가능합니다.


```
{
 "compilerOptions": {

  "target": "es5", // 'es3', 'es5', 'es2015', 'es2016', 'es2017','es2018', 'esnext' 가능
  "module": "commonjs", //무슨 import 문법 쓸건지 'commonjs', 'amd', 'es2015', 'esnext'
  "allowJs": true, // js 파일들 ts에서 import해서 쓸 수 있는지
  "checkJs": true, // 일반 js 파일에서도 에러체크 여부
  "jsx": "preserve", // tsx 파일을 jsx로 어떻게 컴파일할 것인지 'preserve', 'react-native', 'react'
  "declaration": true, //컴파일시 .d.ts 파일도 자동으로 함께생성 (현재쓰는 모든 타입이 정의된 파일)
  "outFile": "./", //모든 ts파일을 js파일 하나로 컴파일해줌 (module이 none, amd, system일 때만 가능)
  "outDir": "./", //js파일 아웃풋 경로바꾸기
  "rootDir": "./", //루트경로 바꾸기 (js 파일 아웃풋 경로에 영향줌)
  "removeComments": true, //컴파일시 주석제거

  "strict": true, //strict 관련, noimplicit 어쩌구 관련 모드 전부 켜기
  "noImplicitAny": true, //any타입 금지 여부
  "strictNullChecks": true, //null, undefined 타입에 이상한 짓 할시 에러내기
  "strictFunctionTypes": true, //함수파라미터 타입체크 강하게
  "strictPropertyInitialization": true, //class constructor 작성시 타입체크 강하게
  "noImplicitThis": true, //this 키워드가 any 타입일 경우 에러내기
  "alwaysStrict": true, //자바스크립트 "use strict" 모드 켜기

  "noUnusedLocals": true, //쓰지않는 지역변수 있으면 에러내기
  "noUnusedParameters": true, //쓰지않는 파라미터 있으면 에러내기
  "noImplicitReturns": true, //함수에서 return 빼먹으면 에러내기
  "noFallthroughCasesInSwitch": true, //switch문 이상하면 에러내기
 }
}

```

--------


### 타입스크립트 기본 타입 정리 (primitive types)

변수 만들 때 타입정하기 (타입 실드씌우기)



타입스크립트는 변수만들 때 변수의 타입을 지정가능합니다.
```
let 이름: string = 'kim'
```
변수명:타입 이렇게 정하면 됩니다.

방금 여러분은 변수에 실드를 씌운 것입니다.

이제 이름이라는 변수는 string 타입이 되며

갑자기 숫자 이런걸 할당하려고 하면 실드로 튕겨냅니다 (에러가 나게 됩니다.)

진짜 시험삼아 숫자 할당해보십시오. 타입 실드가 바로 튕겨내줄걸요

(참고) name이라는 변수명은 전역변수로 사용불가능합니다. 비슷한거 여러개 있음











타입은 여러가지가 있습니다.



자주 쓰는 primitive types 들을 소개하자면  

string, number, boolean 이런게 있습니다.


```
let 이름 :string = 'kim';
let 나이 :number = 20;
let 결혼했니 :boolean = false;
```
(대문자 String 아닙니다 소문자 string임)





추가로 null, undefined 이런 것도 있습니다.

근데 굳이 사용하진 않습니다.











array 또는 object 자료 안에도 타입 지정가능



여러 자료를 한 곳에 저장하고 싶을 때 array 또는 object 자료형을 사용합니다.

근데 그 안에 들어갈 자료들도 전부 타입지정이 가능합니다.


```
let 회원들 :string[] = ['kim', 'park']
```
array 자료안에 들어갈 타입은 타입명[] 이렇게 지정하면 됩니다.

그럼 array 자료에 각각 string이라는 타입 실드를 장착한 겁니다.

이제 숫자로 수정하려면 실드가 튕겨냅니다. 에러날걸요?



Q. array 안에 string, number 이런게 동시에 들어갈 땐 타입지정 어떻게 하냐고요?

그것은 변수명: (string | number)[] 이렇게 하면 되는데 나중에 다뤄보도록 합시다.








```
let 내정보 : { age : number } = { age : 20 }
```
object 자료안에 들어갈 타입은 내가 만들 object와 똑같은 모습으로 지정하면 됩니다.

뭔가 이상해보이지만 변수명 오른쪽에 오는 것들은 전부 타입지정 문법입니다.

외우면 이상하지 않습니다.

아무튼 이러면 age 속성에 number 실드를 씌워준 것입니다.








```
let 이름 :string = 'kim';
이름 = 30;
```
타입을 잘 지정해준다면 타입이 실수로 변경될 때 이런 경고성 에러가 납니다.


```
Type 'number' is not assignable to type 'string'.(2322)
```
엄격하게 타입을 지켜서 코드짜는걸 도와주는 에러니 앞으로 반겨주면 됩니다.

(물론 이 에러는 ts에서만 나는 에러고 실제 변환된 .js 파일 가보시면 별일 없습니다.)

















하지만 오늘의 프로 팁은



그렇다고 모든 변수에 타입지정하러 다니면 초보티가 납니다.

숙련자들은 타입을 귀찮게 굳이 적지 않습니다.

왜냐면 변수 생성시 타입스크립트가 타입을 자동으로 부여해주니까요.


```
let 이름 = 'kim';
let 나이 = 20;
```
이렇게만 써도 자동으로 이름변수는 string, 나이 변수는 number를 가지고 있습니다.

(변수명에 마우스 올려보면 바로바로 확인가능)

array, object 만들 때도 자동으로 알아서 됩니다. 굳이 복잡하게 타입 명시할 필요 없음






```
let 이름;
이름 = 'kim';
```
심지어 변수만 만들고

나중에 가서 여기에 'kim'을 할당해도 타입이 자동으로 string으로 변합니다.

그래서 간단한 변수들은 타입을 생략하도록 합시다.타입지정하는게 보기좋으시다면 그렇게 하도록 합시다.









팁) 에러메세지는 tsc -w 명령어 실행중인 터미널에 나옵니다.

간결하게 보려면 terminal 탭 옆에 problems 탭에도 나옴













Q1. 여러분의 이름, 나이, 출생지역을 변수로 각각 저장해봅시다.

물론 타입도 알아서 지정해보십시오. 이건 쉬우니 답은 없습니다.







Q2. 여러분이 가장 좋아하는 곡과 가수이름을 변수에 object 자료형으로 담아보십시오.

object 안엔 노래 제목과 가수이름이 들어가면 됩니다.

근데 제목과 가수는 문자만 들어올 수 있어야합니다.

전 이렇게 했는데 따라하지 마셈

```
var 좋아하는거 :{ song :string, singer :string } = { song : '사랑하기때문에', singer : '유재하' }
 ```





Q3. 다음과 같이 생긴 자료의 타입지정을 해보도록 합시다.
```
let project = {
  member : ['kim', 'park'],
  days : 30,
  started : true,
}
```
project 변수 우측에 적으면 됩니다.

member 안엔 문자로 가득한 array만 들어올 수 있고

days는 숫자, started는 true/false만 들어올 수 있습니다.



답

```
let project :{
 member : string[],
 days : number,
 started : boolean,
} = {
 member : ['kim', 'park'],
 days : 30,
 started : true,
}
```

그렇다고 합니다. 왼쪽 오른쪽 짝맞추기임

-----

### 타입을 미리 정하기 애매할 때 (union type, any, unknown)


이 변수에 들어올게 string일지 number일지 아직 애매하다면

방법이 몇가지 있습니다.







가장 좋은 Union type 사용





"이 변수엔 string 또는 number가 들어올 수 있습니다~" 라고 타입정의를 하고싶으면 | 연산자를 씁시다.

OR 연산자 같은 느낌인데 이런 타입을 전문용어로 Union type 이라고 부릅니다.


```
let 이름: string | number = 'kim';
let 나이: (string | number) = 100;
```
심심하면 괄호쳐도 됩니다.

이러면 name, age 변수엔 string 또는 number만 들어올 수 있습니다.

그리고 할당하는 순간 타입은 string 또는 number 중 하나로 변합니다.





그럼 array, object 자료 만들 때 union type (OR 연산자) 쓰려면 어떻게 할까요
```
var 어레이: number[] = [1,'2',3]
var 오브젝트: {data : number} = { data : '123' }
```
위 코드에 정의된 어레이와 오브젝트는 지금 타입 때문에 에러가 납니다.

array와 object 자료에 number 또는 string이 들어올 수 있게 타입을 좀 고쳐보시길 바랍니다.



알아서 해보고 눌러봅시다



```
var 어레이: (number | string)[] = [1,'2',3]
var 오브젝트: {data : (number | string) } = { data : '123' }
```

이러면 될듯요









아니면 any 타입이라는 것도 있습니다



아무 자료나 집어넣을 수 있는 타입입니다.

쉽게 비유하면 실드해제입니다.


```
let 이름: any = 'kim';
이름 = 123;
이름 = undefined;
이름 = [];
```


any 타입은 실드 해제 문법이기 때문에 갑자기 타입을 마구 바꿔도 에러가 나지 않습니다.

any 타입은 좋다고 막쓰면 안되는데

그럼 타입관련 버그가 생길 경우 왜 그런지 추적하기가 어려우니까요.

타입 실드를 안씌우면 타입스크립트를 쓸 이유가 없습니다.

그래서 비상시 쓰는 변수 타입체크 해제기능 이런 용도로 씁시다.













###### any 보다는 unknown 타입이 나은듯



요즘 타입스크립트는 unknown 타입을 사용합니다.

any와 똑같이 모든 타입을 집어넣을 수 있습니다.


```
let 이름: unknown = 'kim';
이름 = 123;
이름 = undefined;
이름 = [];
```
이래도 에러가 나지 않습니다.

아직 어떤 타입이 들어올지 모를 경우, 다양한 타입을 집어넣어야할 경우 이걸 사용해보시길 바랍니다.

중요한 특징은

1. unknown 타입엔 모든 자료 다 집어넣을 수 있음

2. 자료집어넣어도 타입은 그대로 unknown입니다.






```
let 이름: unknown;

let 변수1: string = 이름;
let 변수2: boolean = 이름;
let 변수3: number = 이름;
```
당연히 unknown 타입을 다른 곳에 집어넣으려고 하면

그쪽 실드가 발동해서 에러가 납니다.

(any는 안그럼)


```
let 이름: unknown;
이름[0];
이름 - 1;
이름.data;
```
이래도 에러가 납니다.

(any는 안그럼)





왜냐면 타입스크립트는 정확하고 확실한걸 좋아합니다.

확실하지않은 타입에 뺄셈해주고 그런거 싫어합니다.

숫자가 아닌걸 뺄셈할 수는 없으니까요.

타입스크립트에선 뺄셈은 number 류의 타입만 할 수 있고

.name 이런건 object 류의 타입만 할 수 있다라고 미리 정의되어있습니다.







그래서 결론은 아직 뭘 집어넣을지 모르겠는데 약간의 안정성을 도모하고 싶으면 unknown 타입을 써봅시다.

근데 실은 코드짜다가 any, unknown 부여할 경우는 별로 없습니다.









Q1. 이 코드는 왜 에러가 나는 것이죠?
```
let 나이: string|number;
나이 + 1;
```
분명 자바스크립트에선 문자에도 +1 가능하고 숫자에도 +1 가능합니다.

근데 저건 에러가 납니다.



Q2. 이 코드도 왜 에러가 나는 것이죠?
```
let 나이: unknown = 1;
나이 + 1;
```
분명히 나이라는 변수는 1인데 +1 안해줍니다.

오늘 강의에서 제가 잘 명심하라는거 떠올리면 왜 그런지 답변가능할 듯



둘다 같은 이유입니다



타입스크립트는 언제나 확실한걸 좋아한다고 했습니다.

지금 변경하려는 변수의 타입이 확실해야 연산을 수행해줍니다.

그래서 -1은 확실하게 왼쪽에 있는게 number 타입일 때만 가능합니다.

unknown은 number타입이 아닙니다.

string|number 이것도 number 타입이 아닙니다. (union type은 새로운 타입을 하나 만든 겁니다)

+1도 마찬가지입니다


(참고) 그래서 unknown 타입인 변수를 조작하려면

내가 조작할 변수의 타입이 무엇인지 확실하게 체크하는 narrowing 또는 assertion 스킬을 사용해야합니다.

그것이 타입스크립트의 근간이 되는 코딩방법이고

변수에 뭐가 들어있을지 애매한, 추측해야하는 상황이 나오는 시점에선 반드시 사용해야합니다.

좀 길어서 그건 나중 강의에서 알아봅시다.









(숙제1) 다음 변수 4개에 타입을 지정해봅시다.


```
let user = 'kim';
let age = undefined;
let married = false;
let 철수 = [user, age, married];
```
허전하니까 변수 4개에 타입빨리 집어넣어봅시다.

(조건) age 변수엔 undefined 말고 숫자도 들어올 수 있습니다.



해보고 눌러봅시다


```
let user :string = 'kim';
let age :undefined | number = undefined;
let married :boolean = false;
let 철수 :(string|number|undefined|boolean)[]= [user, age, married];
```
쉬워서 설명은 안해도 될 것 같군요.



(숙제2) 학교라는 변수에 타입지정해보십시오.


```
let 학교 = {
    score : [100, 97, 84],
    teacher : 'Phil',
    friend : 'John'
}
학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]
```
타입지정을 안해줬더니 터미널에 에러가 나는군요.

에러안나게 학교라는 변수에 타입좀 지정해줍시다.



빨리 혼자 해보고 눌러봅시다

빨리 혼자 해보고 눌러봅시다

```
let 학교 : {
    score : (number|boolean)[],
    teacher : string,
    friend : string | string[]
}

= {
    score : [100, 97, 84],
    teacher : 'Phil',
    friend : 'John'
}
학교.score[4] = false;
학교.friend = ['Lee', 학교.teacher]
```
타입추가했더니 에러가 나지 않습니다 성공

설명은 필요없겠죠?



--------

### 함수에 타입 지정하는 법 & void 타입

걱정되니 함수의 기능부터 다시 짚어봅시다



함수라는 문법은 원래 용도가 긴 코드 짧게 축약하려고 만든 것도 있는데

실은 어떤 자료를 입력하면 다른 자료를 뿅 뱉는 기계 역할도 합니다.

2를 넣으면 4가 되고

4를 넣으면 8이 되는

그런 기계를 만들고 싶으면 함수를 가져다가 씁니다.



실제로 코드로 만들어보면
```
function 내함수(x){
  return x * 2
}
내함수(2);  //이러면 4가 이 자리에 남음
내함수(4);  //이러면 8이 이 자리에 남음
```
이렇게 되겠군요. 멋진 곱셈기계가 완성되었습니다.

소괄호 안에 들어가는 x같은 자료들을 파라미터라고 부르고

return 오른쪽에 있는 자료들을 리턴값 이런식으로 부릅니다.



1. 파라미터를 작명해주면 함수를 사용할 때 ( ) 소괄호 안에 아무 자료나 집어넣을 수 있게되고

2. 리턴값은 함수가 사용되고나서 그 자리에 남는 값입니다.

내함수(2) 이렇게 쓰고나면 진짜 그 자리에 return 우측에 있던 값이 뾰로롱 남습니다.

함수에 타입지정하려면 2곳 가능



그래서 함수는 총 두 군데 타입지정이 가능합니다.

1. 함수로 들어오는 자료 (파라미터)

2. 함수에서 나가는 자료 (return)




```
function 내함수(x :number) :number {
  return x * 2
}
```
1. 함수로 들어오는 파라미터 타입지정은 파라미터 옆에 적으면 됩니다.

2. 함수가 실행된 후 남는 값 (return 우측에 있는 값) 타입지정하고 싶으면 함수명() 우측에 적으면 됩니다.



함수에 멋있게 타입 실드를 장착했기 때문에

이제 파라미터와 리턴값이 이상해지면 자동으로 혼내줍니다.



- 파라미터에 타입을 지정하면 필수 파라미터가 됩니다.


함수는 void 타입이 있음



이런거 설명할 때 개발자들이 꼭 하는 말이 있습니다.

"Void 타입은 자바같은 프로그래밍 언어를 접한분들은 이해가 쉬울겁니다"

프로그래밍 책 보면 꼭 있는 말인데 그런 말 약간 극혐임

그런 언어 안해봤으니까 애초에 강의 듣고 있는거 아닐까요







함수는 특이하게도 void라는 타입을 사용가능합니다.

'아무것도 없이 공허함'을 뜻하는 타입인데  

return할 자료가 없는 함수의 타입으로 사용가능합니다.




```
function 내함수(x :number) :void {
  return x * 2 //여기서 에러남
}
```
그럼 이제 이 함수에서 뭔가를 return하려고할 때 에러를 냅니다.

함수에 return 방지장치를 주고 싶을 때 void 타입을 활용하시면 되겠습니다.


파라미터가 옵션일 경우



함수에 파라미터자리를 만들어놨지만 가끔 파라미터 없이 쓸 때도 있습니다.

그럴 경우 타입스크립트에선 미리 "이 파라미터는 옵션임" 이렇게 정의를 해주셔야 에러가 나지 않습니다.


```
function 내함수(x? :number) {

}
내함수(); //가능
내함수(2); //가능
```
파라미터 우측에 그냥 물음표치면 됩니다. 그럼 앞으로 내함수()를 사용할 때 파라미터없이도 쓸 수 있습니다.

근데 물음표는 실은 x : number | undefined 이거랑 똑같은 의미입니다 (중요)

파라미터가 정의가 안되면 자동으로 undefined가 되니까 그걸 반영한거라고 볼 수도 있겠습니다.













함수도 예외없이 Union type을 사용하면



엄격근엄진지한 타입스크립트가 딴지를 걸 수 있습니다.



Q. 예를 들어서 함수에 숫자 또는 문자를 집어넣으면 + 1 해주는 함수를 만들어봅시다.


```
function 자릿수세기(x :number | string){
  return x + 1
}
```
그냥 쌩 자바스크립트에서는 문자나 숫자나 모두 +1 이 가능하지만

타입스크립트에선 변수의 타입이 number | string 이런 union type인 경우 자료 조작을 금지시킵니다.

아직 이 파라미터의 타입이 확실하지 않으니까 파라미터 조작을 일단 실드로 막고 금지하는 것입니다.






```
function 내함수(x? :number) :number {
  return x * 2
}  
```
이런 코드도 타입스크립트가 엄격하게 금지합니다.

number 맞는데 왜저럴까요 빨리 혼자 말해보셈
x라는 파라미터는 옵션이고, 옵션인 파라미터는 number | undefined 이런 식으로 타입정의가 된다고 하지 않았습니까.

그래서 아직 x라는 파라미터가 뭔지 확실하지 않기 때문에 에러를 내줍니다.




그래서 엄격한 타입스크립트 성격에 맞춰주려면 여러분이 코드를 애초에 엄격하게 짜야합니다.


(숙제1) 이름을 파라미터로 입력하면 콘솔창에 "안녕하세요 홍길동"을 출력해주고

아무것도 파라미터로 입력하지 않고 함수를 사용하면 "이름이 없습니다" 를 출력하는 함수를 만들어봅시다.

파라미터와 return 타입지정도 잘 해봅시다.



어떻게 했나
 ```

function sayHi(x? :string ){
  if (x) {
    console.log('안녕하세요 ' + x)
  } else {
    console.log('왜입력안함')
  }
}
```

별거 아니라 설명은 생략합니다

return이 없어야한다면 return 타입도 void로 설정해보는게 어떨까요.



[collapse]






(숙제2) 함수에 숫자 또는 문자를 집어넣으면 자릿수를 세어 출력해주는 함수를 만들어보십시오.

예를 들어 '245' 이런 문자를 입력하면 3이 return 되어야합니다.

숫자도 마찬가지로 9567 이런 숫자를 입력하면 4가 return 되어야합니다.

숫자 또는 문자 이외의 자료가 들어오면 안됩니다.

function 자릿수세기(x :number | string) :number {
  return x.toString().length
}


구글에 물어보니 문자에 .length 붙이면 자릿수 세준다고 하네요.

근데 숫자는 .length를 붙여줄 수 없으니까

우선 문자로 변환했다고 합니다.

변환하는 함수도 역시 구글에 물어보니 .toString() 쓰면 된다고 하는군요.

물론 더 정확하게 하려면

만약에 x가 숫자일 경우 이렇게,

문자일 경우 이렇게 하라고 코드짜는게 좋습니다.

(숙제3) 결혼 가능 확률을 알려주는 함수를 만들어봅시다.

1. 함수의 파라미터로 월소득(만원단위), 집보유여부(true/false), 매력점수 ('상' or '중' or '하') 를 입력할 수 있어야합니다.

2. 월소득은 만원 당 1점, 집보유시 500점 & 미보유시 0점, 매력점수는 '상'일 때만 100점으로 계산합니다.

3. 총 점수가 600점 이상일 경우 "결혼가능"을 return 해줘야합니다. 그 외엔 아무것도 return하지 않습니다.



(예시)

결혼가능하냐(700, false, '중') 이렇게 사용할 경우 "결혼가능"을 return 해줍니다.

결혼가능하냐(100, false, '상') 이렇게 사용할 경우 아무것도 return되지 않습니다.



해보고 눌러봅시다



```
function 결혼가능하냐(money :number, house :boolean, charm :string) :string|void{
 let score :number = 0;
 score += money;
 if (house === true){
   score += 500
 }
 if (charm === '상'){
   score += 100
 }
 if (score >= 600){
   return '결혼가능'
 }
}
console.log(결혼가능하냐(100,true,'상'))
```

score라는 변수를 만들고

차례로 money에 따라 score를 + 시켰고

house여부에 따라 score를 + 시켰고.. 그랬다고 합니다.

콘솔창에 출력해보니 집있고 매력있는 사람은 월 소득에 관계없이 항상 결혼이 가능하군요.





하지만 월 소득을 마이너스로 이상한 숫자를 입력하면 어쩌죠?

그런 것도 막으려면 코드를 어떻게 짜야할까요.

마지막으로 string이 아니라 '상' '중' '하' 라는 글자만 입력할 수 있게 더욱 엄격한 타입지정도 가능한데

그건 Literal type 시간에 알아봅시다.


-------

### 타입 확정하기 Narrowing & Assertion


저번 시간에 만든 함수에 숫자 또는 문자를 집어넣으면 + 1 해주는 함수입니다.


```
function 내함수(x :number | string){
   return x + 1  //에러남
}
```
근데 이런 에러가 납니다.



Operator '+' cannot be applied to types 'string | number' and 'number'

string | number 같은 union type 에는 일반적으로 조작을 못하게 막아놔서 그렇습니다.

이런 메세지를 보면 1. 타입을 하나로 Narrowing 해주거나 2. Assert 해주거나 둘 중 하나 해주면 됩니다.











Type Narrowing



if문 등으로 타입을 하나로 정해주는 것을 뜻합니다.

그래서 아까 함수를 사용할 때


```
function 내함수(x :number | string){
  if (typeof x === 'number') {
    return x + 1
  }
  else if (typeof x === 'string') {
    return x + 1
  }
  else {
    return 0
  }
}
```



if문과 typeof 키워드로 현재 파라미터의 타입을 검사해서

"이게 'number' 타입일 경우 이렇게 해주세요~"

"이게 'string' 타입일 경우 이렇게 해주세요~"

이렇게 코드를 짜야 정상적으로 사용이 가능합니다.

타입스크립트는 타입 애매한걸 싫어해서 귀찮아도 하셔야함

타입이 확실하지 않을 때 생기는 부작용을 막기위한 장치라고 보시면 되겠습니다.

가끔 이걸 "defensive 하게 코딩한다"라고 하기도 합니다.





근데 또 함수 안에서 if문 쓸 때는 마지막에 else {} 이거 없으면 에러가 납니다.

return 하지않는 조건문이 있다면 나중에 버그가 생길 수 있어서 에러를 내주는 것인데

"noImplicitReturns": false,

이게 성가시다면 tsconfig.js 파일에서 이걸 추가하면 됩니다. 근데 굳이 수정하는 것 보다는 엄격하게 씁시다.





- 꼭 typeof를 쓸 필요는 없고 타입을 하나로 확정지을 수 있는 코드라면 어떤 것도 Narrowing 역할을 할 수 있습니다.

- in, instanceof 키워드도 사용가능합니다.





















Type Assertion



아니면 타입을 간편하게 assert 할 수도 있습니다.

"이 변수의 타입을 number로 생각해주세요"

이런 뜻으로 코드를 짜면 타입스크립트 컴파일러가 눈감아줍니다.

변수명 as string

이런 식으로 as라는 키워드 쓰면 됩니다.


```
function 내함수(x :number | string){
    return (x as number) + 1
}
console.log( 내함수(123) )

```
변수명 as number 라고 쓰시면

"나는 이 변수를 number라고 주장하겠습니다~" 라는 뜻이며 실제로 그렇게 타입을 변경해줍니다.

아무튼 이렇게 타입스크립트 컴파일러에게 반기를 들 수 있습니다.

근데 이러려면 내가 "함수에 무조건 숫자가 들어올 것이다"라는 사실을 알고 있어야 안전하게 쓸 수 있는 문법이겠죠?





as 키워드 사용시 특징이 있는데

1. as 키워드는 union type 같은 복잡한 타입을 하나의 정확한 타입으로 줄이는 역할을 수행합니다. (number 타입을 as string 이렇게 바꾸려고 하면 에러날걸요)

2. 실은 그냥 타입실드 임시 해제용입니다. 실제 코드 실행결과는 as 있을 때나 없을 때나 거의 동일합니다.

아무튼 그러면 이제 변수를 숫자로 가정해서 가공할 수 있습니다.







Q. 근데 내함수('123') 이렇게 숫자말고 문자를 입력하면 어떻게 됩니까

A. as number라고 썼긴 했지만 number 타입처럼 +1 해주진 않습니다. 콘솔창에 결과 출력해보면 '1231' 이렇게 출력될걸요

as는 그냥 주장만 하는거지 실제로 타입을 바꿔주는건 아니기 때문입니다.







as 쓰면 간편해쥬금 하지만 정확히 코드짜려면 narrowing을 씁시다.  

as 키워드는 맘대로 타입을 개발자 맘대로 주장하는 역할이라 때문에 엄격한 타입체크기능을 잠깐 안쓰겠다는 뜻과 동일합니다.

그래서 as 문법은 이럴 때 쓰도록 합시다.

1. 왜 타입에러가 나는지 정말 모르겠는 상황에 임시로 에러해결용으로 사용하거나

2. 내가 어떤 타입이 들어올지 정말 확실하게 알고 있는데 컴파일러 에러가 방해할 때

알겠죠? 뉴비처럼 온갖군데 as 키워드 붙이면 안됩니다.

물론 대부분의 상황에선 as 보다 훨씬 엄격하고 좋은 type narrowing으로 해결할 수 있습니다.

옛날 assertion 문법은

```
as 키워드 대신 <> 이런 괄호를 이용했습니다.

let 이름 :number = 123;

(이름 as string) + 1;  //현재문법
<string>이름 + 1;   //옛날문법
```

위에 있는 두 줄의 코드는 똑같은 의미입니다.

다만 html과 js가 혼연일체된 리액트에서 사용시 html태그 이런거랑 헷갈릴 수 있기 때문에

지금은 그냥 as 키워드를 주로 씁니다.



혹은 as는 이럴 때 유용하게 쓰기도 합니다


가끔 타입을 강제로 부여하는 기계를 하나 만들어쓰고 싶은 때가 있습니다.

그럴 때 함수에 데이터를 넣으면 as 타입명을 붙여서 return 하는 함수를 만들어서 사용하면 됩니다.


```
type Person = {
    name : string
}
function 변환기<T>(data: string): T {
    return JSON.parse(data) as T;
}
const jake = 변환기<Person>('{"name":"kim"}');
```
변환기라는 함수를 만들었는데

이 함수에 자료를 입력하면 as 키워드로 타입을 하나 붙여줍니다.



하지만 아직 배우지 않은 문법이 등장합니다.

<타입을 파라미터로 넣는 방법> 그리고 type 키워드 이런게 등장하는데

지금은 그렇구나~ 까지만 느끼면 되고 나중가면 알게될 것입니다.


(숙제 전 참고사항 : console.log() 하는 법)

코드짜다가 콘솔창에 변수를 출력해보려면 console.log()를 쓰면 되는데

그러려면 당연히 html파일이 필요합니다.

index.html 이런거 만드시고 안에

<script src="index.js"></script>  
이렇게 ts에서 변환된 js 파일을 집어넣으면

html을 크롬으로 연 후에 개발자도구에서 console.log 잘 해볼 수 있을겁니다.

아니면 .ts 파일을 바로 실행시켜주는 에디터 부가기능 찾아 쓰셔도 될듯요













(숙제1) 숫자여러개를 array 자료에 저장해놨는데

가끔 '4', '5' 이런 식의 문자타입의 숫자가 발견되고 있습니다.

이걸 클리닝해주는 함수가 필요합니다.

클리닝함수( ['1', 2, '3'] ) 이렇게 숫자와 문자가 섞인 array를 입력하면

[1,2,3] 이렇게 숫자로 깔끔하게 변환되어 나오는 클리닝함수를 만들어오고 타입지정까지 확실히 해보십시오.

모르는 부분은 구글검색해도 봐드림 --------
```
function 클리닝함수(a :(number|string)[]){

  let 클리닝완료된거 :number[] = [];

  a.forEach((b)=>{
    if (typeof b === 'string') {
      클리닝완료된거.push(parseFloat(b))
    } else {
      클리닝완료된거.push(b)
    }
  })

  return 클리닝완료된거
}

console.log( 클리닝함수([123,'3']) )
```

저는 파라미터로 집어넣은 array 자료를 반복문 돌려서

하나하나 숫자로 바꿔서 새로운 array에 집어넣는 방식으로 코드를 짰습니다.



1. 클리닝 함수를 만들었습니다. 파라미터로 array를 집어넣을 수 있다고 해놨습니다.

2. 클리닝완료된 array를 클리닝완료된거라고 작명해서 만들어뒀습니다.

3. 저는 집어넣은 array를 반복문을 돌리려고 forEach()를 썼습니다.

4. 그리고 반복문 돌리면 array 안에 있던 하나하나의 자료가 b라는 파라미터로 나오는데

그게 string 타입이면 parseFloat(b)에 넣어서 숫자로 바꾸고 클리닝완료된거 array에 집어넣었습니다.

number 타입이면 그냥 클리닝완료된거 array에 집어넣었습니다.


(숙제2) 다음과 같은 함수를 만들어보십시오.


```
let 철수쌤 = { subject : 'math' }
let 영희쌤 = { subject : ['science', 'english'] }
let 민수쌤 = { subject : ['science', 'art', 'korean'] }
```
지금 여러 변수에 선생님이 가르치고 있는 과목이 저장이 되어있습니다.

과목 1개만 가르치는 쌤들은 문자 하나로 과목이 저장이 되어있고

과목 2개 이상 가르치는 쌤들은 array 자료로 과목들이 저장되어있습니다.



철수쌤같은 선생님 object 자료를 집어넣으면

그 선생님이 가르치고 있는 과목중 맨 뒤의 1개를 return 해주는 함수를 만들어봅시다.

그리고 타입지정도 엄격하게 해보도록 합시다.



(동작예시)
```
만들함수( { subject : 'math' } )  //이 경우 'math'를 return
만들함수( { subject : ['science', 'art', 'korean'] } ) //이 경우 'korean'을 return
만들함수( { hello : 'hi' } )  //이 경우 타입에러 나면 됩니다
```
Q. 이 자료가 array type 인지 어떻게 검사하냐고요? 구글에 물어보시면 됩니다.

방법은 매우 많으니 알아서 해봅시다



```
function 만들함수( x :{subject : string | string[]} ){
  if (typeof x.subject === 'string') {
    return x.subject
  } else if (Array.isArray(x.subject) ){
    return x.subject[x.subject.length - 1]
  } else {
    return '없쪄'
  }
}

console.log( 만들함수( { subject : ['english', 'art'] }  ) )
```

1. 함수에 object 자료를 입력할 수 있다고 써야하는데 저는 type alias를 만들어사용했습니다.

2. 그리고 만들함수()를 디자인했다고 합니다.

3. 지금 x.subject 라는 파라미터는 케이스가 2개니까 if문을 두개 썼는데 안전하게 마지막 else 문도 추가했습니다.

아니면 그냥 if 한개 else 한개 이렇게 해도 똑같을 듯요

4. 이 변수가 array 자료인지 확인하려면 typeof 이거는 못사용하고 Array.isArray() 이거나 아니면 다른 여러 방법을 쓰셔야합니다.

5. 그래서 실제 실행해보니 { subject : ['english', 'art'] } 입력해보면 'art'가 잘 나옵니다.



심심하면 함수가 어떤 값을 return 해야할 지도 타입지정할 수 있겠군요.

---------



### 타입도 변수에 담아쓰세요 type 키워드 써서 & readonly


타입 정의가 너무 길면 Type Aliases (별칭)



코드 열심히 짜다보면

let 동물 :string | number | undefined;
매우 길고 복잡하게 타입을 나열하는 경우가 많습니다.

1. 이게 길고 보기싫으면

2. 나중에 또 사용하고 싶으면

변수에 담아쓰십시오.

변수만드는 것 처럼 type 이라는 키워드를 쓰면 됩니다.

type 키워드 쓰는걸 type alias 라고 합니다.

alias를 번역하자면 별칭인데 저는 그냥 쉽게 변수라고 부르겠습니다.








```
type Animal = string | number | undefined;
let 동물 :Animal;
```
type 타입변수명 = 타입종류

타입을 변수처럼 만들어서 쓰는 alias 문법입니다. 관습적으로 대문자로 시작합니다.

일반 자바스크립트 변수랑 차별을 두기 위해 AnimalType 이런 식으로 작명하는게 어떨까요.















object 타입도 저장가능합니다


```
type 사람 = {
  name : string,
  age : number,
}

let teacher :사람 = { name : 'john', age : 20 }
```
object에 타입지정할 때 자주 활용할 수 있겠군요





type 키워드 안쓰면 이렇게 만들어야함
```
let teacher :{
  name : string,
  age : number,
} = { name : 'john', age : 20 }
```
에구디러

미래의 내가 봤을 때 이해가 어려울 것 같으면 좋은 코드가 아닙니다













readonly로 잠그기




```
const 출생지역 = 'seoul';
출생지역 = 'busan'; //const 변수는 여기서 에러남

```
const 변수라고 아십니까.

const 변수는 값이 변하지 않는 변수를 만들고 싶을 때 const 쓰면 됩니다.

재할당시 에러가 나기 때문에 값이 변하는걸 미리 감지하고 차단할 수 있으니까요.






```
const 여친 = {
  name : '엠버'
}
여친.name = '유라';  //const 변수지만 에러안남
```
하지만 object 자료를 const에 집어넣어도 object 내부는 마음대로 변경가능합니다.

const 변수는 재할당만 막아줄 뿐이지 그 안에 있는 object 속성 바꾸는 것 까지 관여하지 않기 때문입니다.

object 속성을 바뀌지 않게 막고 싶으면 타입스크립트 문법을 쓰십시오.







readonly 키워드는 속성 왼쪽에 붙일 수 있으며

특정 속성을 변경불가능하게 잠궈줍니다.


```
type Girlfriend = {
  readonly name : string,
}

let 여친 :Girlfriend = {
  name : '엠버'
}
여친.name = '유라' //readonly라서 에러남
```
이러면 사이버세상에서 여친과 평생살고 결혼까지 할 수 있습니다.

한번 부여된 후엔 앞으로 바뀌면 안될 속성들을 readonly로 잠궈봅시다.  

(물론 readonly는 컴파일시 에러를 내는 것일 뿐 변환된 js 파일 보시면 잘 바뀌긴 합니다)











속성 몇개가 선택사항이라면



그니까 어떤 object자료는 color, width 속성이 둘다 필요하지만

어떤 object 자료는 color 속성이 선택사항이라면

type alias를 여러개 만들어야하는게 아니라 물음표연산자만 추가하면 됩니다.


```
type Square = {
  color? : string,
  width : number,
}

let 네모2 :Square = {
  width : 100
}
```
Square라는 type alias를 적용한 object 자료를 하나 만들었습니다.

근데 color 속성이 없어도 에러가 나지 않습니다.

함수시간에 배웠죠? 넘어가도록 합시다.



실은 물음표는 "undefined 라는 타입도 가질 수 있다~"라는 뜻임을 잘 기억해둡시다.

진짠지 확인하고싶으면 마우스 올려보면 됩니다.















type 키워드 여러개를 합칠 수 있습니다.


```
type Name = string;
type Age = number;
type NewOne = Name | Age;
```
OR 연산자를 이용해서 Union type을 만들 수도 있습니다.

위 코드에서 NewOne 타입에 마우스 올려보시면 string | number라고 나올겁니다.






```
type PositionX = { x: number };
type PositionY = { y: number };
type XandY = PositionX & PositionY
let 좌표 :XandY = { x : 1, y : 2 }
```
object에 지정한 타입의 경우 합치기도 가능합니다.

& 기호를 쓴다면 object 안의 두개의 속성을 합쳐줍니다.

위 코드에서 XandY 타입은 { x : number, y : number } 이렇게 정의되어있을 겁니다.

합치기는 초딩용어고 멋진 개발자말로 extend 한다라고 합니다.



물론 Type alias & Type alias 만 가능한게 아니라

Type alias & { name : string } 이런 것도 가능합니다.













type 키워드는 재정의가 불가능합니다.


```
type Name = string;
type Name = number;
```
이러면 에러가 날 겁니다.

나중에 type 키워드랑 매우 유사한 interface 키워드를 배우게 될텐데

이 키워드를 쓰면 재정의가 가능합니다. 재정의하면 & 하는거랑 똑같은 기능을 하는데

하지만 재정의 불가능한 편이 더 안전하지 않을까요.















(숙제1) object 타입을 정의한 type alias 두개를 & 기호로 합칠 때 중복된 속성이 있으면 어떻게 될까요?

그건 여러분들이 한번 테스트해보길 바랍니다.





(숙제2) 다음 조건을 만족하는 타입을 만들어봅시다.

1. 이 타입은 object 자료형이어야합니다.

2. 이 타입은 color 라는 속성을 가질 수도 있으며 항상 문자가 들어와야합니다.

3. 이 타입은 size 라는 속성이 있어야하며 항상 숫자가 들어와야합니다.

4. 이 타입은 position 이라는 변경불가능한 속성이 있어야하며 항상 숫자가 담긴 array 자료가 들어와야합니다.  

type alias로 만들어보셈


10초 드림


이번만 봐드리는 겁니다


```
type MyType = {
    color? : string,
    size : number,
    readonly position : number[]
}

let 테스트용변수 :MyType = {
    size : 123,
    position : [1,2,3]
}
```
저는 이렇게 MyType 이라는 type alias를 만들었다고 합니다.

테스트해봤더니 잘 되는군요


(숙제3) 다음을 만족하는 type alias를 연습삼아 간단히 만들어보십시오.

1. 대충 이렇게 생긴 object 자료를 다룰 일이 많습니다. { name : 'kim', phone : 123, email : 'abc@naver.com' }

2. object 안에 있는 이름, 전화번호, 이메일 속성이 옳은 타입인지 검사하는 type alias를 만들어봅시다.

3. 각 속성이 어떤 타입일지는 자유롭게 정하십시오.



이런 간단한 건 답펼치면 쪽팔린 편

```
type User = { name : string, email? : string, phone : number }
let 회원가입정보 :User = {
  name : 'kim',
  phone : 123,
}
 ```

설명 안해도 될듯

email은 심심해서 물음표쳐봤습니다.

--------


(숙제4). 다음을 만족하는 type alias를 만들어보십시오.

1. 숙제2와 똑같은데 이번엔 이름, 전화번호, 이메일, 미성년자여부 속성을 옳은 타입인지 검사하는 type alias를 만들어봅시다.

2. 미성년자 여부 속성은 true/false만 들어올 수 있습니다.

3. 멋있게 숙제2에서 만들어둔  type alias를 재활용해봅시다.



잘되면 답볼 필요는 없습니다

```
type User = { name : string, email? : string, phone : string }
type Adult = { adult : boolean }

type NewUser = User & Adult;

let 회원가입정보 :NewUser = {
  name : 'kim',
  adult : false,
  phone : 1234
}
```
`
기존 type을 & 기호로 extend 해봤습니다.


------------

### Literal Types로 만드는 const 변수 유사품


어떤 변수는 1이라는 값만 가질 수 있게 제한하고 싶으면 어쩌죠.

자바스크립트 const 변수 쓰면 되겠군요. 근데 1 또는 0만 가질 수 있게 제한하고 싶으면 어쩌죠.

그 변수에 number 이런 식으로 타입을 지정하면 너무 광범위하지않습니까.

그럴 땐 Literal type을 선언하도록 합시다.

어떤 변수가 미리 골라놓은 데이터만 가질 수 있게 도와줍니다.











Literal Type 만드는 법



string, number 이런 것만 타입이 될 수 있는게 아닙니다.

일반 글자같은 것도 타입이 될 수 있습니다.


```
let john :'대머리';
let kim :'솔로';
```
제가 방금 '대머리', '솔로'라는 타입을 만들었습니다.

마음대로 변수나 함수에 할당 가능합니다.



그럼 신기하게도

john이라는 변수는 이제 '대머리' 라는 글자만 할당할 수 있습니다.

kim이라는 변수는 이제 '솔로' 라는 글자만 할당할 수 있습니다.

특정 글자나 숫자만 가질 수 있게 제한을 두는 타입을 literal type 이라고 부릅니다.

더욱 엄격한 실드라고 보면 되겠군요.






```
let 방향: 'left' | 'right';
방향 = 'left';
```
or 기호 써도 됩니다. 이제 'left' 또는 'right' 글자만 가질 수 있는 변수가 완성되었군요.








```
function 함수(a : 'hello') : 1 | 0 | -1 {
  return 1
}
```
함수도 똑같습니다.

파라미터 타입선언할 때 글자나 숫자를 집어넣으시면 그 만 파라미터로 넣을 수 있고

return 타입선언할 때도 글자나 숫자를 집어넣으시면 그 값만 return할 수 있습니다.







Q. 이런 함수는 어떻게 만들까요?

- '가위', '바위', '보' 문자들만 파라미터로 입력할 수 있고

- '가위', '바위', '보' 라는 문자들만 담을 수 있는 array 자료만 return 할 수 있습니다.

- 예를 들면 ['가위', '보', '가위'] 이런거 return 가능

- ['가위', '바보'] 이런거 return하면 에러나야함


10초안에 짜오십시오

```
function rock(a : '가위'|'바위'|'보') :('가위'|'바위'|'보')[]{
  return ['가위','보']
}
```
이렇게 했다고 합니다. ['가위','보'] 이런거 return 해봤을 때 에러안나면 성공입니다.



array 자료를 타입지정하고 싶으면

number[] 이렇게 하지 않습니까

근데 number가 아니라 literal type으로 가득채웠다고 합니다.

어떻게보면 const 변수의 업그레이드버전이라고 보면 되는데

const 변수는 값을 바꿀 수 없는 변수입니다.
```
const 변하면안되는변수 = 123;
```
그래서 중요한, 변하지않는 정보를 저장하고 싶을 때 const를 자주 쓰는데

가끔은 변하는 중요한 정보를 저장하고 싶을 땐 const가 무쓸모입니다.

예를 들어 변수가 'kim' 또는 'park' 만 가질 수 있는 이런 식의 엄격한 변수는 못만듭니다.




```
const 이름 = 'kim' | 'park' (이런 식의 문법은 자바스크립트에 없음)
```
그럴 때 타입스크립트 설치하고 literal type 쓰면 되는 것입니다.

뭔가 배보다 배꼽이 더 커보입니다.


as const 문법



'kim' 이라는 타입만 들어올 수 있는 함수를 만들었습니다.

근데 자료.name을 입력하고 싶은겁니다.


```
var 자료 = {
  name : 'kim'
}

function 내함수(a : 'kim') {

}
내함수(자료.name)
```
그래서 코드를 이렇게 짜봤는데 위 코드는 에러가 납니다.



왜 에러가 나겠습니까.

함수는 'kim' 타입만 입력할 수 있다고 해놨고

자료.name 이라는건 string 타입이지 'kim' 타입이 아니기 때문입니다.







이런걸 해결하고 싶으면

1. object 만들 때 타입을 잘 미리 정하든가

2. 예전에 배웠던 assertion을 쓰시든가 (as 'kim' 이런걸 붙이는 겁니다)

3. 아니면 as const 라는걸 애초에 object 자료에 붙일 수 있습니다.

```
var 자료 = {
  name : 'kim'
} as const;

function 내함수(a : 'kim') {

}
내함수(자료.name)
```
as const는 효과가 2개인데

1. 타입을 object의 value로 바꿔줍니다. (타입을 'kim'으로 바꿔줍니다)

2. object안에 있는 모든 속성을 readonly로 바꿔줍니다 (변경하면 에러나게)



object를 잠그고 싶으면 as const를 활용해보도록 합시다.

-----------

### 함수와 methods에 type alias 지정하는 법


function type 도 저장가능



함수에 들어갈 파라미터와 return으로 뱉을 값들을 타입지정할 수 있다고 배워봤습니다.

함수 타입도 type alias로 저장해서 쓸 수 있습니다.





예를 들어서 1. 숫자 두개를 파라미터로 입력할 수 있고

2. 숫자를 return 하는 함수를 별명을 지어서 사용하려면
```
type NumOut = (x : number, y : number ) => number ;
```
이런 식입니다.


화살표 함수 ()=>{} 를 모른다고요


자바스크립트로 함수만들 때 arrow function 이라고 부르는 => 문법을 써도 함수 만들어집니다.


```
(파라미터)=>{}  //arrow function 문법
function(파라미터){} //일반 function 문법
차이는 하나가 있는데 this값이 달라진다는거 밖에 없습니다.
```


arrow function의 장점은 기호 생략기능을 제공해준다는 점인데

1. arrow function에선 중괄호안에 return 어쩌구 코드밖에 없으면 중괄호 { } 생략해도 봐줍니다.

2. 파라미터가 한개 밖에 없으면 소괄호 ( ) 생략해도 봐줍니다.



그래서 예를 들어서 2를 넣으면 2를 곱해주어 return 해주는 함수를 만들고 싶으면
```
x => 2 * x
```
이렇게 사용가능합니다.

----------------

이걸 함수 만들 때 사용하려면

function 함수이름 :NumOut (){}

이런 식은 불가능합니다. function 키워드에는 () 이거 내부랑 오른쪽에만 타입지정이 가능해서요.

그래서 이렇게 합니다.


```
type NumOut = (x : number, y : number ) => number
let ABC :NumOut = function(x,y){
  return x + y
}
```
함수를 만들 때

let 함수명 = function(){} 이렇게 해도 되니까

함수명 오른쪽에 함수명 : 타입별명

이렇게 지정해서 사용하는 것입니다.

type alias 만들기 싫으면 그냥 함수만들 때 직접 타입작성하면 되겠죠 뭐

------

methods 안에 타입지정하기



object 자료 안에 함수도 맘대로 집어넣을 수 있습니다.

몰랐다면 대충 어떻게 생겼는지 알아봅시다.


```
let 회원정보 = {
  name : 'kim',
  age : 30,
  plusOne (x){
    return x + 1
  },
  changeName : () => {
    console.log('안녕')
  }
}
회원정보.plusOne(1);
회원정보.changeName();
```
plusOne 그리고 changeName 함수를 object 자료에 집어넣었습니다.

arrow function, 일반함수 전부 object 안에 맘대로 집어넣을 수 있습니다.

넣은 함수들은 똑같이 점찍어서 사용가능합니다.



왜 넣냐고요? 그냥 함수도 자료안에 보관해서 쓰고싶을 때가 있기 때문입니다.

근데 저거 타입지정 어떻게 하게요

그건 여러분도 알고있으니 숙제로 알아서 해보길 바랍니다.





(숙제1) 위 코드에서 회원정보라는 변수에 타입지정 알아서 해보십시오.

- plusOne이라는 속성은 함수여야하고, 숫자를 넣어서 숫자를 뱉는 함수여야합니다.

- changeName이라는 속성은 함수여야하고, 아무것도 return하면 안됩니다.

- type 키워드를 쓰든 말든 알아서 합시다.

위에서 배운걸로 혼자가능할듯 혼자 안해보면 클남



```
type Member = {
  name : string,
  age : number,
  plusOne : ( x :number ) => number,
  changeName : () => void
}
```
전 이렇게 했다고 합니다.

진짜 되는지 확인하려면 위에서 만든 let 회원정보에 Member 타입 집어넣어보셈

에러안나면 성공입니다.

(숙제2) 다음 함수2개를 만들어보고 타입까지 정의해보십시오.

- cutZero()라는 함수를 만듭시다. 이 함수는 문자를 하나 입력하면 맨 앞에 '0' 문자가 있으면 제거하고 문자 type으로 return 해줍니다.

- removeDash()라는 함수를 만듭시다. 이 함수는 문자를 하나 입력하면 대시기호 '-' 가 있으면 전부 제거해주고 그걸 숫자 type으로 return 해줍니다.

- 함수에 타입지정시 type alias를 꼭 써보도록 합시다.

물론 문자제거 하는 방법을 모른다면 구글검색이 필요합니다.





함수 두개 만드는거 별거 아닙니다

```
type CutType = (x :string) => string

let cutZero :CutType = function (x){
    let result = x.replace(/^0+/, "");
    return result
}
function removeDash(x :string) :number{
    let result = x.replace(/-/g, "");
    return parseFloat(result)
}
```

한개만 type alias 써봤는데 나머지도 써보십시오.



cutZero는 파라미터 입력하면 첫 글자 0을 제거해주고 return,

removeDash는 파라미터 입력하면 - 대시제거해주고 return 하라고 썼습니다.

/어쩌구/ 이건 정규식문법인데 정규식은 글자에서 원하는 글자를 찾는 식일 뿐입니다. 처음본다면 검색해보도록 합시다.

그리고 removeDash는 return 하기 전에 숫자로 변형했습니다.


(숙제3) 함수에 함수를 집어넣고 싶습니다.

숙제2에서 만든 함수들을 파라미터로 넣을 수 있는 함수를 제작하고 싶은 것입니다.

이 함수는 파라미터 3개가 들어가는데 첫째는 문자, 둘째는 함수, 셋째는 함수를 집어넣을 수 있습니다. 이 함수를 실행하면

1. 첫째 파라미터를 둘째 파라미터 (함수)에 파라미터로 집어넣어줍니다.

2. 둘째 파라미터 (함수)에서 return된 결과를 셋째 파라미터(함수)에 집어넣어줍니다.

3. 셋째 파라미터 (함수)에서 return된 결과를 콘솔창에 출력해줍니다.

이 함수는 어떻게 만들면 될까요?

둘째 파라미터엔 cutZero, 셋째 파라미터엔 removeDash 라는 함수들만 입력할 수 있게 파라미터의 타입도 지정해봅시다.



(실행예시)
```
만들함수('010-1111-2222', cutZero, removeDash)
```
이렇게 사용하면 문자에 1. cutZero를 해주고, 2. removeDash를 해주고 그 결과를 콘솔창에 1011112222 이렇게 출력해줍니다.

이런거 처음이면 어려울 수 있으니 하루 드림

뭐여 어떻게 함수를 파라미터로 집어넣어서 실행시킴?


function 함수1(){
  어쩌구~~
}
function 함수2(){
  어쩌구~~
}

함수1(함수2)
그니까 이렇게 파라미터로 함수를 입력하면

함수2() 이런 코드가 함수1 안에서 실행되어야합니다.

이건 코드를 어떻게 짜야되냐면.. 별거아닌데




```
function 함수1(a){
  a()
}
function 함수2(){
  어쩌구~~
}

함수1(함수2)
```
이렇게 디자인해놓으면 함수를 파라미터로 입력했을 때 내부에서 실행할 수 있습니다.

함수1(함수2) 이렇게 코드를 적으면

함수1() 내부 코드가 실행되고 그러면 함수2() 이게 실행이 되겠군요.

이게 함수에 함수넣어서 실행시키는 법입니다.



함수에 들어가는 함수를 멋진 개발자 용어로 콜백함수라고 부릅니다.

여기선 함수2가 콜백함수네요


이건 답인데 답보고 베껴봤자 3일 후에 까먹음

```
function 만들함수(a, func1, func2){
  let result = func1(a);
  let result2 = func2(result);
  console.log(result2)
}
만들함수('010-1111-2222', cutZero, removeDash)  //1011112222 출력잘됨
```
자바스크립트 3줄 이상 못읽는 초보는 타입스크립트부터 보면 혼절합니다.

그래서 타입지정없이 먼저 짜보는 것도 좋은 선택입니다.



그래서 저는 코드를 어떻게 짰냐면

1. 만들함수에 입력한 a라는 파라미터를 func1() 함수에 집어넣습니다.

2. 집어넣은 결과를 result에 저장합니다.

3. 그걸 다시 func2() 함수에 집어넣습니다.

4. 최종결과를 콘솔창에 출력했습니다.



이제 타입지정하면 끝임

우선 파라미터 3개에 타입 지정을 해보겠습니다.






```
type 함수타입1 = (a :string) => string;
type 함수타입2 = (a :string) => number;

function 만들함수(a :string, func1 :함수타입1, func2 :함수타입2){
  let result = func1(a);
  let result2 = func2(result);
  console.log(result2)
}
만들함수('010-1111-2222', cutZero, removeDash)  //1011112222 출력잘됨

```
첫 파라미터는 당연히 문자 들어올 수 있다고 쓰면 되겠고

둘째 파라미터는 cutZero같은 함수가 들어와야합니다. 그래서 함수타입을 alias로 만들어봤습니다.

셋째 파라미터는 removeDash같은 함수가 들어와야합니다. 그래서 함수타입을 alias로 만들어봤습니다.


--------

### 타입스크립트로 HTML 변경과 조작할 때 주의점


자바스크립트의 원래 존재 목적은 단연 html 조작과 변경입니다.

그래서 타입스크립트를 써도 html 조작이 가능한데 근데 그냥 자바스크립트 쓸 때와 약간 다른 점이 존재합니다.

귀찮다는 점이요

왜인지는 실제로 html 조작해보며 알아봅시다.

document.getElementById() 이거 쓰는 법을 설명할 것인데

html 찾고 변경하는 법 안다고 가정하고 진행합니다 모른다면 js 기초강의 ㄱㄱ



근데 또 react, vue 이런걸 쓰다보면 html 조작과 변경하는 법은 몰라도 되긴 합니다.

근데 react, vue 사용할 때도 html 직접조작이 간혹 필요한 경우가 있어서 아예 모르면 안되겠죠











우선 strictNullCheck 옵션을 켜봅시다



많은 환경에서 null이 들어올 경우 체크해주는 옵션을 켜고 코드짭니다.

변수 조작하기 전에 이게 null인지 아닌지 캐치해낼 수 있으니까요.

특히 html 조작할 때 셀렉터로 찾으면 null 어쩌구가 많이 발생하는데 그거 잡을 때도 도움됩니다.


```
{
    "compilerOptions": {
        "target": "ES5",
        "module": "commonjs",
        "strictNullChecks": true
    }
}
```
tsconfig.json 파일을 열어서 strickNullChecks 옵션을 true로 바꾸고 코드짜봅시다.

혹은 그냥 "strict" : true 이런걸 써두면 strickNullChecks 옵션도 자동으로 true로 켜집니다.











HTML 파일 준비



(index.html)
```
<h4 id="title">안녕하세요</h4>
<a href="naver.com">링크</a>
<button id="button">버튼</button>

<script src="변환된 자바스크립트파일.js"></script>
```
당연히 타입스크립트 파일을 html에 집어넣어야 html 조작을 하든말든 하겠죠?

html 파일만들고 타입스크립트 -> 자바스크립트 변환된 파일을 집어넣도록 합시다.

그리고 조작을 체험하기 위한 html 몇개 작성했습니다. 여러분도 따라치셈













HTML 찾고 변경해보기


```
<h4>제목을 다른 글자로 변경해봅시다.

let 제목 = document.querySelector('#title');
제목.innerHTML = '반갑소'
```
이러면 원래 변경되어야하는데 타입스크립트는 에러를 내줍니다.



"제목이라는 변수가 null일 수 있습니다"

아까 켜놨던 strict 옵션 덕분에 이런 에러를 내주는데

이유는 셀렉터로 html을 찾으면 타입이 Element | null 이기 때문에 그렇습니다.

(html을 못찾을 경우 null이 됩니다)



그래서 아직 확실하지 않아서 점찍고 조작하고 변경하는걸 금지시켜주는 것입니다.

이거 어떻게 해결하죠? 제가 앞선 강의에서 잘 기억하라던 TS 동작원리나 그런걸 떠올리면 해결책이 나올듯요



정답은
제목이라는 변수가 union type이기 때문에 if문으로 type narrowing 하면 됩니다.

아니면 as 문법으로 assertion 해도 되긴 되겠군요.

---

그래서 해결책1. narrowing 하면 됩니다.

```
let 제목 = document.querySelector('#title');
if (제목 != null) {
  제목.innerHTML = '반갑소'
}
```
멋있게 else문도 추가하면 더 완벽한 코드가 되겠군요.









해결책2. 더 좋은 instanceof 사용하는 narrowing 방법도 있습니다.

```
let 제목 = document.querySelector('#title');
if (제목 instanceof HTMLElement) {
  제목.innerHTML = '반갑소'
}
```
instanceof 라는 연산자를 쓰는 것인데 우측에 HTMLElement 입력하면 그 타입인지 체크해줍니다.

나중에 배우게 될 것이니 맛만 보도록 합시다 .









해결책3. assertion 써도 될듯요  

```
let 제목 = document.querySelector('#title') as HTMLElement;
제목.innerHTML = '반갑소'
```
as 키워드를 쓰면 타입을 구라칠 수 있다고 배웠습니다.

HTMLElement 혹은 그냥 Element 이걸로 구라치면 됩니다.

물론 좋지 않은 임시 땜빵문법이 맞습니다.











해결책4. optional chaining 연산자
```
let 제목 = document.querySelector('#title');
if (제목?.innerHTML != undefined) {
  제목.innerHTML = '반갑소'
}
```
이건 몰라도 되는데 가끔 innerHTML 작성할 때 엔터키로 자동완성시키면 ?. 이런 연산자가 자동으로 붙습니다.

js 신문법인데 뭔 뜻이냐면 왼쪽에 있는 object 자료안에 .innerHTML이 존재하면 그거 써주시고 없으면 undefined 남기셈~ 입니다.

그래서 가끔 ?. 연산자로 해결할 때도 있습니다.







해결책5. 그냥 strict 설정 false로 끄셈

null 체크해주는게 귀찮으면 그냥 설정 끄면 모든 고민이 해결되긴 합니다.







가장 좋은 방법은 해결책2 instanceof 연산자를 쓰는 것인데

이걸 써야 조작가능한 부분이 있기 때문입니다.

왜 그런 것인지는 스크롤 내려봅시다.











a 태그의 href 속성을 바꿔보자



html 파일에
```
<a href="naver.com"></a>
```
 이런 태그가 있었습니다.

이 태그의 href 속성을 바꾸고 싶으면 셀렉터로찾고.href = 'https://kakao.com' 이렇게 쓰면 됩니다.

근데 그냥 하면 안될걸요




```
let 링크 = document.querySelector('#link');
if (링크 instanceof HTMLElement) {
  링크.href = 'https://kakao.com' //에러남 ㅅㄱ
}
```
에러납니다. HTMLElement 타입은 href 그런 속성 없다~고 하네요.

그럴 경우 그냥 이렇게 바꿔주면 됩니다.






```
let 링크 = document.querySelector('#link');
if (링크 instanceof HTMLAnchorElement) {
  링크.href = 'https://kakao.com'  //잘됨
}
```
이러면 에러나지 않습니다.

html 태그 종류별로 정확한 타입명칭이 있습니다.

a 태그는 HTMLAnchorElement

img 태그는 HTMLImageElement

h4 태그는 HTMLHeadingElement

..

백만개가 있는데 이런 정확한 타입으로 narrowing 해주셔야 html 속성 수정을 제대로할 수 있습니다.

전부 외울 필요는 없고 자동완성 잘 될걸요


잠깐 왜 그래야하는지 원리를 설명하자면


타입스크립트에서 쓸 수 있는 HTML 타입들은 이렇게 됩니다.

Element, HTMLElement, HTMLAnchorElement 등이 있는데

Element에 들어있는걸 복사해서 몇개 더 추가해서 HTMLElement 타입을 만들어놨고

HTMLElement에 들어있는걸 복사해서 몇개 더 추가해서 HTMLAnchorElement 타입을 만들어놨습니다.



셀렉터로 대충 찾으면 Element 타입이라는게 부여가 됩니다.

아직 이 태그가 뭔지 몰라서 그냥 광범위한 타입하나를 달랑 지정해주는 겁니다.

이건 광범위한 그냥 일반 html 태그의 특징을 정리해둔 타입이기 때문에 안에 .href .src 이런거 안들어있습니다.



반면 HTMLAnchorElement 이건 조금 상세한 타입입니다.

이 타입은 "href, style, class, id 이런 속성을 가질 수 있다~" 라고 타입이 정의되어있습니다.

그래서 a태그에게 어울리는 타입인 HTMLAnchorElement 라는 타입을 쓸 수 있는지 instanceof 키워드로 확인해야합니다.

확인하는 과정을 narrowing으로 인정해줌



----



이벤트리스너 부착해보기



버튼 누르면 뭐 실행해주세요~라는 코드도 많이 짭니다.

이것도 그냥 쓰시면 안되고 타입지정해야 잘 사용가능합니다.


```
let 버튼 = document.getElementById('button');
버튼.addEventListener('click', function(){
  console.log('안녕')
})
```
이러면 에러납니다. 버튼이라는 변수가 null 일 수도 있어요~ 라는 에러가 날걸요

어떻게 해결할까요? narrowing 알아서 해보십시오.









근데 이런 해결책도 있습니다.

```
let 버튼 = document.getElementById('button');
버튼?.addEventListener('click', function(){
  console.log('안녕')
})
```
addEventListener 함수 붙일 때 물음표도 붙이는 것인데 이게 무슨 뜻이냐면


optional chaining 신문법


2020년 이후 브라우저들은 ?. 연산자를 이용가능합니다.

그니까 object에서 자료뽑을 때 object.어쩌구 이렇게 자료를 뽑는데

object?.어쩌구 이렇게도 뽑을 수 있다는 겁니다.

이걸 쓰면 어쩌구라는 자료가 object에 존재하면 그거 뽑아주시고요

존재하지 않으면 undefined 남겨주세요~ 라는 뜻과 동일합니다.



그래서 간혹 narrowing할 때 && 연산자로 undefined 체크하기 귀찮을 때 간혹 사용됩니다.





그래서 혹여나 버튼이라는 변수가 없을 경우 그 자리에 undefined를 내보내고,

HTMLElement로 잘 있으면 addEventListener() 잘 부착해주기 때문에  

이것도 일종의 narrowing 이라고 보면 되겠습니다.

그래서 에러안내고 봐줌

--------


(숙제1) 버튼을 누르면 이미지를 바꿔봅시다.


```
<img id="image" src="test.jpg">
```
html 안에 test.jpg를 보여주고 있는 이미지 태그가 있다고 칩시다.

이미지를 new.jpg 라는 이미지로 바꾸고 싶으면 자바스크립트 코드를 어떻게 짜야할까요?

성공여부는 크롬 개발자도구 켜면 src 속성이 잘 바뀌었는지 확인가능하겠죠?


type narrowing 잘 하십시오

```
let 이미지 = document.querySelector('#image');
if (이미지 instanceof HTMLImageElement){
  이미지.src = 'change.jpg';
}
```
저는 html 요소를 찾고 이걸 HTMLImageElement 타입 맞냐고 확인해봤습니다.

이 경우 src 속성을 수정가능합니다.







(숙제2) 바꾸고 싶은 html 요소가 많습니다.


```
<a class="naver" href="naver.com">링크</a>
<a class="naver" href="naver.com">링크</a>
<a class="naver" href="naver.com">링크</a>
```
3개의 링크가 있는데 이 요소들의 href 속성을 전부 https://kakao.com으로 바꾸고 싶은 겁니다.

자바스크립트 코드를 어떻게 짜야할까요?




에러나면 실패임

```
let 링크 = document.querySelectorAll('.naver');

링크.forEach((a)=>{
  if (a instanceof HTMLAnchorElement){
    a.href = 'https://kakao.com'
  }
})
```
querySelectorAll() 셀렉터를 쓰면 많은 요소를 한번에 찾을 수 있습니다.

근데 이 경우 타입이 NodeListOf<어쩌구> 이렇게 나오는데 그냥 여러개 찾으면 이런 타입이 된다고 생각하면 됩니다.

그리고 forEach 반복문을 이용해서 찾은 요소마다 각각 href 속성을 변경해줬다고 합니다.




```
let 링크 = document.querySelectorAll('.naver');

for (let i = 0; i < 3; i++){
  let a = 링크[i];
  if (a instanceof HTMLAnchorElement){
    a.href = 'https://kakao.com'
  }
}
```

일반 for 반복문을 쓸 경우 변수를 만들어줘야 매끄럽게 narrowing이 가능합니다.

-----

### class 만들 때 타입지정 가능


필드값 타입지정



class 내부에는 모든 자식 object들이 사용가능한 속성같은걸 만들 수 있습니다.

예를 들어서 모든 Person 클래스의 자식들에게 data 라는 속성을 부여해주고 싶으면


```
class Person {
  data = 0;
}

let john = new Person();
let kim = new Person();

console.log(john.data);
console.log(kim.data);
```
그냥 class 중괄호 안에다가 변수처럼 만들면 됩니다. (var let 키워드 안씀)

그럼 Person이 출산한 모든 자식에게 data = 0을 하나씩 복사해줍니다.

당연히 자식들은 object 자료형이니 점찍고 data 쓰면 됩니다.

class 안에 저렇게 대충 만드는 속성을 필드라고 합니다.



근데 타입이 없군요.

저거 data라는 속성엔 number만 들어올 수 있다고 타입지정을 해봅시다.

어떻게 할까요? 감으로 해보셈


이건 답인데


저거 가만히 냅두셔도 자동으로 number 타입이 됩니다.

타입스크립트는 많은 것들을 알아서 자동으로 타입지정해준다니까요.

굳이 명시하고 싶으면 일반 변수처럼 타입 지정해주면 끝임




```
class Person {
  data :number = 0;
}

let john = new Person();
john.data = '1';  //이제 문자할당시 에러남
```
정말 별거없음

-------

###### constructor 타입지정



class는 간단히 말하면 object 복사기계라고 했습니다.

예를 들어서 { name : 어쩌구, age : 어쩌구 } 이렇게 생긴 object 자료를 복사해주는 기계를 만들어봅시다.

ES6 신문법에선 constructor 함수를 쓰면 된다고 했습니다.


```
class Person {
  constructor (){
    this.name = 'kim';
    this.age = 20;
  }
}
```
이렇게 생겼는데 실은 타입스크립트에선 이 문법이 맞지 않습니다.

에러날걸요 Error : Property 'name' does not exist on type 'Person'

this.어쩌구를 사용하고 싶으면 어쩌구를 미리 필드값으로 만들어줘야합니다.

안그러면 에러남


 -------
```
 class Person {
  name;
  age;
  constructor (){
    this.name = 'kim';
    this.age = 20;
  }
}
```

필드 값으로 name, age가 미리 정의되어있어야 constructor 안에서도 사용가능합니다.

이런 점 때문에 자바스크립트 꼰대들이 타입스크립트 싫어합니다.  

"옳은 JS문법은 옳은 TS문법이라던데 왜 이건 아님? 뭐여 다른 언어임?"

이런 말이 나옵니다.












```
class Person {
  name;
  age;
  constructor (a){
    this.name = a;
    this.age = 20;
  }
}
```
constructor 함수엔 변수를 집어넣을 수 있다고 했습니다.

그러면 이제 new Person('hello') 할 때 소괄호안에 들어가는 'hello' 이런 자료가 저기 a라는 파라미터자리에 들어갑니다.

생산되는 object마다 각각 다른 이름을 부여하고 싶을 때 유용하겠군요.

근데 저거 a라는 파라미터에 타입지정을 미리 해줘야할듯 합니다.


Q. 타입지정은 어떻게하게요

name 속성에는 string만 들어올 수 있게 타입지정 해보십시오.



이건 답인데

```
class Person {
  name;
  age;
  constructor ( a :string ){
    this.name = a;
    this.age = 20;
  }
}
```
뭔가 함수같이 생긴 것들은 함수처럼 타입지정하면 됩니다.

class 내부라고 다른거 아님








```
class Person {
  name;
  age;
  constructor ( a = 'kim' ){
    this.name = a;
    this.age = 20;
  }
}
```
혹은 함수 문법 중에 기본 파라미터 이런게 있습니다 (default parameter)

파라미터에 값을 입력 안하면 자동으로 할당해주는 그런걸 지정가능한데

파라미터 = 자료 이렇게 씁니다.

이런거 활용하면 그냥 타입지정 안해도 될 듯


참고로 constructor 함수는 return 타입지정을 하면 안됩니다.

constructor에 의해서 항상 object자료가 생산되기 때문에 생각해보면 의미없습니다.



Q. 필드값이랑 constructor랑 똑같은 역할이네요? 왜 구분해놓음?

들켰군요 똑같은 기능을 합니다.

근데 new Person() 사용할 때 파라미터로 뭔가 집어넣고 싶으면 constructor로 만들어야합니다.


###### methods 타입지정



class 내부엔 함수를 입력할 수 있습니다.

그냥 함수명(){} 이거 넣으면 끝인데

이 함수는 Person이라는 클래스의 prototype에 추가됩니다.


```
class Person {

  add(숫자){
    console.log(숫자 + 1)
  }
}
```
이러면 모든 Person의 자식들은 add 라는 함수를 이용가능합니다.

이 때 add라는 함수 타입지정은 어떻게 하게요

그냥 함수랑 똑같습니다. 파라미터 & return 타입지정 자유롭게 할 수 있습니다. 해보십시오.




(숙제1) Car 클래스를 만들고 싶습니다.

1. 대충 { model : '소나타', price : 3000 } 이렇게 생긴 object를 복사해주는 class를 만들어보십시오.

2. 그리고 복사된 object 자료들은 .tax() 라는 함수를 사용가능한데 현재 object에 저장된 price의 10분의1을 출력해주어야합니다.

3. model과 price 속성의 타입지정도 알아서 잘 해보십시오. tax() 함수의 return 타입도요.



(동작 예시)
```
let car1 = new Car('소나타', 3000)
console.log(car1) //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()) //콘솔창 출력결과는 300
 ```





 이건 답인데 직접 해보셔야



 ```
 class Car {
   model :string;
   price :number;
   constructor(a :string, b :number){
     this.model = a;
     this.price = b;
   }

   tax() :number{
     return this.price * 0.1
   }
 }


 let car1 = new Car('소나타', 3000)
 console.log(car1) //콘솔창 출력결과는 { model : '소나타', price : 3000 }
 console.log(car1.tax()) //콘솔창 출력결과는 300
  ```

 이렇게 작성했더니 콘솔창에 출력이 잘됩니다.

 필드값에도 model :string 타입지정하고

 파라미터에도 a :string 타입지정하면 뭔가 쓸데없는 중복같은 느낌이 들지만

 필드값은 디폴트값 이런 걸로 생각하셔도 괜찮습니다.

 -------

 (숙제2) class인데 파라미터가 잔뜩 들어가는 class Word를 만들어봅시다.

1. object 만들 때 new Word() 소괄호 안에 숫자 혹은 문자를 입력하면

2. 숫자는 전부 object 안의  num 속성 안에 array 형태로 저장되고

3. 문자는 전부 object 안의 str 속성 안에 array 형태로 저장되는 class를 만들어봅시다.

4. class 만들 때 넣을 수 있는 숫자와 문자 갯수는 일단 제한은 없습니다. 그리고 타입 빼먹지 마셈



(동작 예시)


```
let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num) //[3,5]
console.log(obj.str) //['kim', 'park']
 ```



겁쟁이는 누르시오

```
class Word{
  num;
  str;

  constructor(...param){
    let 숫자들 :number[] = [];
    let 문자들 :string[] = [];

    param.forEach((i)=>{
      if (typeof i ==='string') {
        문자들.push(i)
      } else {
        숫자들.push(i)
      }
    })

    this.num = 숫자들;
    this.str = 문자들;
  }
}


let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num) //[3,5]
console.log(obj.str) //['kim', 'park']
```
지금 100만개 들어온 파라미터가 대체 무슨 타입인지 검사해서

각 속성에 집어넣으면 됩니다.





1. class Word를 만들고 constructor를 만들었는데

2. 그 안에는 rest parameter가 들어올 수 있다고 만들었습니다. 이제 new Word() 할 때 파라미터 개많이 입력가능

3. rest parameter는 array로 들어옵니다. 그걸 반복문 돌려서 하나하나 검사해봅니다.

4. 파라미터 타입이 문자면 문자들 [] 에 추가, 숫자면 숫자들 [] 에 추가합니다.

5. this.num = 숫자들 array, this.str = 문자들 array 이렇게 해줬습니다.



테스트해보니 잘 됩니다.


-----------

### Object에 타입지정하려면 interface 이것도 있음


type 키워드를 이용해서 타입을 변수처럼 저장해서 쓰는 건 앞에서 해봤죠?

근데 더 좋은 방법이 있습니다.









Object에 쓸 수 있는 interface 문법



interface 문법을 쓰시면 object 자료형의 타입을 보다 편리하게 지정가능합니다.

예를 들어서 { color : 'red', width : 100 }

이런 object를 만들고 싶은데 type을 미리 정의하고 싶으면 interface 키워드를 이렇게 만들어봅시다.


```
interface Square {
  color :string,
  width :number,
}

let 네모 :Square = { color : 'red', width : 100 }
 ```

interface는 object랑 비슷한 모습으로 작성하면 됩니다.

type alias와 용도와 기능이 똑같습니다.

1. 대문자로 작명하고 2. { } 안에 타입을 명시해주면 됩니다.

만들어두면 앞으로 object자료 만들 때 interface 만든걸 집어넣으시면 간편하게 타입지정이 가능합니다.





(참고) 한 줄 끝나면 콤마대신 세미콜론도 가능합니다.


interface 장점은 extends도 가능합니다



Student interface & Teacher interface가 필요하다고 가정해봅시다.

Student는 name 속성이 들어가야하고

Teacher는 name 속성과 age 속성이 들어가야합니다.

어떻게 만들면 되겠습니까 직접 만들어보시고 스크롤 내려보십시오.




```
interface Student {
  name :string,
}
interface Teacher {
  name :string,
  age :number,
}
```
저는 이렇게 만들었습니다. 훌륭합니다.

이제 object에 자유롭게 집어넣고 그러면 될텐데

근데 안에 중복사항들이 좀 보이는 것 같군요.


이런건 extends 문법쓰시면 줄일 수 있습니다.

extends 문법은 interface 여기에 복사해달라는 뜻입니다.


```
interface Student {
  name :string,
}
interface Teacher extends Student {
  age :number
}
```
Student interface를 extends 해달라고 적으면 Student 안에 있던걸 복사해서 Teacher에 넣어줍니다.

이제 Teacher 타입은 age, name 속성을 가지고 있습니다.


type 키워드와의 차이점



type alias와 interface는 거의 똑같은 기능을 제공합니다.

그래서 차이점은 extends 문법이 약간 다르다 이런건데


```
interface Animal {
  name :string
}
interface Cat extends Animal {
  legs :number
}
```
interface의 경우 일반적으로 이렇게 extends 합니다.




```
type Animal = {
  name :string
}
type Cat = Animal & { legs: number }
```
type alias의 경우 extends는 안되고 & 기호를 쓰면 object 두개를 합칠 수 있습니다.

이러면 Cat 타입은 name, legs 속성을 가질 수 있습니다.


실은 interface도 type처럼 & 기호를 이용해도 복사가능

```
interface Student {
  name :string,
}
interface Teacher {
  age :number
}

let 변수 :Student & Teacher = { name : 'kim', age : 90 }
```
& 기호 쓰는걸 intersection이라고 부르는데 extends 와 유사하게 사용가능합니다.

(주의) extends 쓸 때 타입끼리 중복속성이 발견될 경우 에러로 혼내주는데 & 쓰면 때에 따라 아닐 수도 있습니다.

-------


### 타입이름 중복선언시


```
interface Animal {
  name :string
}
interface Animal {
  legs :number
}
```
interface의 경우 타입이름 중복선언을 허용해주며 중복시 extends 한 것이랑 동일하게 동작합니다.

이러면 Animal 타입은 name, legs 속성을 가질 수 있습니다.

(장점) type 선언을 자주 쓰는 외부 라이브러리 이용시 type 선언을 내가 덮어쓰기, override 하기 편리합니다.






```
type Animal = {
  name :string
}
type Animal = {
  legs :number
}
```

type의 경우 중복선언을 허용하지 않습니다. 에러남

(장점) 엄격하고 진지함







그래서 일반적인 상황에선 type 키워드 자주 활용하면 되는데

다른 사람이 내 코드를 이용하는 상황이 많으면 interface로 유연하게 만드는게 좋습니다.

그래서 타입스크립트로 작성된 라이브러리들은 interface로 타입정해놓은 곳이 많습니다.

혹은 object 자료형은 전부 interface로 만들고 다른 자료형은 type 키워드로 만들고 이런 것들도 괜찮습니다.

type과 interface 문법을 잘 알고 있으면 기준은 정하기 나름입니다.

--------


extend 할 때 object 안의 속성이 중복될 경우


```
interface Animal {
  name :string
}
interface Dog extends Animal {
  name :number
}
```
Animal을 복사해서 Dog interface를 만들어봤습니다.

근데 name 속성이 중복되네요? 그럼 에러납니다 끝








```
interface Animal {
  name :string
}
interface Dog {
  name :number
}

let 변수 :Dog & Animal = { name : '멍멍' }
```
& 연산자로 Dog, Animal을 합쳐봤습니다.

근데 name 속성이 중복되네요? 그럼 에러납니다 끝

interface 말고도 type 키워드도 똑같은 현상이 일어납니다.



(주의) 근데 name : string , name : number 라서 에러가 나는 것이지

둘다 name : string 타입이면 에러가 나지 않습니다. 하나로 합쳐줌


 ----------


 (숙제1) interface 이용해서 간단하게 타입을 만들어봅시다
```
let 상품 = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }
```
이런 변수가 있는데 interface 키워드로 타입지정 이쁘게 하고 싶습니다. 어떻게 코드를 짜면 될까요?

무슨 타입일지는 알아서 기입합시다.



그러게요 어떻게한담

```
interface Product {
  brand : string,
  serialNumber : number,
  model : string[]
}

let 상품 :Product = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }
```
이랬다고 합니다









(숙제2) array 안에 object 여러개가 필요합니다.

쇼핑몰 장바구니를 구현하려고 하는데
```
let 장바구니 = [ { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 } ]
```
이렇게 생긴 object들이 잔뜩 들어갈 수 있는 array는 어떻게 타입을 지정해야할까요?

오늘 배운 interface 문법을 써봅시다.



혼란이 온다면 array object에 익숙하지 않은 것일 뿐

```
interface Cart {
  product : string,
  price : number
}

let 장바구니 :Cart[] = [ { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 } ];
```
array에 들어갈 수 있는 object의 타입을 interface로 만들어봤습니다.







(숙제3) 위에서 만든 타입을 extends 해봅시다.

갑자기 서비스가 업데이트되어서 일부 상품은 card 속성이 들어가야합니다.
```
{ product : '청소기', price : 7000, card : false }
```
위에서 만든 interface를 extends 해서 이 object의 타입을 만들어보십시오.



매우 별거 아니라서

```
interface Cart {
  product : string,
  price : number
}

interface NewCart extends Cart{
  card : boolean
}
```
혹은 속성이 겹치지않으면 & 연산자 써도 가능합니다.













(숙제4) object 안에 함수를 2개 넣고 싶은데요

1. 이 object 자료는 plus() 함수를 내부에 가지고 있으며 plus 함수는 파라미터 2개를 입력하면 더해서 return 해줍니다.

2. 이 object 자료는 minus() 함수를 내부에 가지고 있으며 minus 함수는 파라미터 2개를 입력하면 빼서 return 해줍니다.

이 object 자료를 어떻게 만들면 될까요?

interface를 이용해서 object에 타입지정도 해보십시오.



자신감이 있으면 됩니다

```
interface MathObj {
  plus : (a:number, b:number) => number,
  minus : (a:number, b:number) => number
}

let 오브젝트 :MathObj = {
  plus(a,b){
    return a + b
  },
  minus(a,b){
    return a - b
  }
}
 ```

그랬다고 합니다.

함수타입은 ()=>{} 이렇게 만들면 된다고 했습니다.
