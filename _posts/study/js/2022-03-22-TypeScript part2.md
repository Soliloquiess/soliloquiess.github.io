---
title: "[js] TypeScript part2"
layout: post
subtitle: JS
date: "2021-12-19-23:45:51 +0900"

categories: study
tags: JS
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


### 함수 rest 파라미터, destructuring 할 때 타입지정


잠깐 rest 파라미터 개념설명



리액트 때문에 계속되는 자바스크립트 기초학력 저하현상으로 잠깐만 JS 문법설명을 하자면

함수에 어떤 파라미터가 몇개 들어올지 미리 정의가 불가능한 경우가 있습니다.

3개일지 4개일지 100개일지 모른다면 점3개 ...로 rest 파라미터를 만들어주면 됩니다.


```
function 전부더하기(...a){
  console.log(a)
}

전부더하기(1,2,3,4,5)
```
함수 파라미터 작명할 때 점3개 붙여주면 여기엔 파라미터 잔뜩 들어올 수 있습니다~라고 정의가 가능합니다.



전문 용어로 rest 파라미터라고 합니다.

- rest 파라미터는 다른 일반 파라미터 뒤에만 올 수 있습니다.

- rest 파라미터자리에 집어넣은 값들은 전부 [ ] 안에 담겨있습니다. 출력해보시면 진짜임


rest 파라미터 타입지정은


```
function 전부더하기(...a :number[]){
  console.log(a)
}

전부더하기(1,2,3,4,5)
```
rest 파라미터는 항상 [ ] 안에 담겨오기 때문에 타입지정도 array처럼 해주시면 됩니다. 끝













Spread operator와 다른겁니다



코드짜다보면 점 3개 붙이는 경우가 또 있는데

array 혹은 object 괄호 벗기고 싶을 때 왼쪽에 사용합니다.
```
let arr = [3,4,5];
let arr2 = [1,2, ...arr]
console.log(arr2)
```
array 혹은 object 왼쪽에 점3개 붙이면 괄호 벗겨주세요~ 라는 뜻입니다.

그래서 arr2 출력해보면 [1,2,3,4,5] 나옵니다.



괄호벗겨주는 ...spread는 array, object 자료 왼쪽에,

여러개의 파라미터를 의미하는 ...rest는 함수선언할 때 소괄호 안에 출몰합니다.











잠깐 Destructuring 문법 개념설명



잠깐 다시 JS 문법설명 하나만 합시다.

자바스크립트에서 array, object 안에 있는 데이터를 빼서 변수로 만들고 싶을 때 쓰는 문법이 있습니다.


```
let 사람 = { student : true, age : 20 }
let student = 사람.student;
let age = 사람.age
```
이렇게 쓰면 되긴 하는데 개발자들이 귀찮아서 새로운 문법을 만들어냈습니다.

Destructuring 이라는 것인데 변수로 빠르고 쉽게 뺄 수 있도록 도와주는 문법입니다.







let { student, age } = { student : true, age : 20 }
이렇게 쓰면 똑같이 변수로 뺄 수 있습니다.

진짭니다 student 한 번 출력해보셈 true 들어있을 걸요

이걸 destructuring 문법이라고 하며 왼쪽 오른쪽 틀린그림찾기처럼 변수 작명해주시면 끝입니다.


```
let [a, b] = ['안녕', 100]
```
array 자료도 왼쪽오른쪽 똑같아보이게 변수 작명해주시면 변수로 쉽게 뺄 수 있습니다.

다만 특징은 object destructuring할 땐 변수이름을 속성이름과 맞춰주는게 편리하고 (안맞추면 더 복잡함)

array destructuring할 땐 변수이름 맘대로 작명가능합니다.











Destructuring 문법도 함수 파라미터에 사용가능



왜냐면 함수 파라미터 작명하는 것도 변수만드는 문법과 똑같아서 그렇습니다

변수만들 때 기존 object에 있던 자료를 파라미터로 집어넣고 싶으면




```
let person = { student : true, age : 20 }

function 함수(a, b){
  console.log(a, b)
}
함수(person.student, person.age)
```
기존 object에 있던걸 person.student 이렇게 각각 찝어서 집어넣으면 되긴 되는데

destructuring 문법을 이용하면 약간 더 쉽게 사용가능합니다.




```
let person = { student : true, age : 20 }

function 함수({student, age}){
  console.log(student, age)
}
함수({ student : true, age : 20 })
```
실은 안쉬운듯

그니까 파라미터 변수만들 때 { student, age }라고 쓰면

파라미터로 들어오는 { student : 어쩌구 }는 student 라는 변수에 저장해주세요~

파라미터로 들어오는 { age : 어쩌구 }는 age 라는 변수에 저장해주세요~

라는 뜻입니다. (object 자료니까 변수 작명할 때 object 속성명으로 잘 작명해야함)

항상 같은 모습의 object, array 자료가 들어올 때 쓰는 문법이라고 보면 되겠습니다.





Q. 위의 함수 파라미터에 타입지정해보도록 합시다 어떻게 하게요

힌트는 object처럼 생긴건 항상 object처럼 타입지정하면 됩니다. 알아서 해보십시오

이거 펼쳐보면 자신감부족임


```
let person = { student : true, age : 20 }

function 함수({student, age} :{student : boolean, age : number}){
  console.log(student, age)
}
함수({ student : true, age : 20 })
```
object가 들어있으니까 object 처럼 타입지정을 했다고 합니다.

너무 길면 type 키워드 쓰는게 좋아보입니다.  










(숙제1) 숫자 여러개를 입력하면 최댓값을 return 해주는 함수를 만들어봅시다.

최댓값(6,3,7,2) 이렇게 쓰면 7이 return 되어야합니다.

(조건1) 넣을 수 있는 숫자 갯수는 제한없음, 0 이상의 정수만 가능합니다.

(조건2) Math.max() 사용금지 반복문이나 쓰셈



저는 어떻게 했냐면


```
function 최댓값(...x : number[]) {
  let result = 0;
  x.forEach((i)=>{
    if (result < i) {
      result = i
    }
  })
  return result;
}
console.log(최댓값(4,6,3,2))
```



1. 함수를 만들었는데 파라미터 하나를 입력가능하게 만들었습니다. 근데 rest 파라미터라서 개많이 입력가능

2. 변수하나 만들었습니다. result = 0 이렇게요

3. 반복문을 써서 파라미터로 들어온 숫자를 계속 result와 비교합니다.

그래서 숫자가 더 크면 result 를 그 숫자로 갈아치우고

그게 아니면 냅둡니다.



반복문이 끝나면 result라는걸 return 해줍니다.

return 값 타입지정은 알아서 해보도록 합시다.





(숙제2) 이렇게 생긴 object 자료를 파라미터로 입력할 수 있는 함수를 만들어봅시다.

함수( { user : 'kim', comment : [3,5,4], admin : false } )
어떻게 코드를 짜야할까요?

(조건1) 오늘 배운 파라미터 destructuring 문법을 써봅시다.

(조건2) 함수실행시 입력한 파라미터의 value들 (kim, [3,5,4] 이런거)을 전부 콘솔창에 출력해줘야합니다.



마무리로 타입지정안하면 에러날걸요

```
type UserType = {
  user : string,
  comment : number[],
  admin : boolean
}

function 함수({user, comment, admin} :UserType) :void{
  console.log(user, comment, admin)
}

함수({ user : 'kim', comment : [3,5,4], admin : false })
```
설명은 생략하겠습니다

파라미터 변수명은 object 속성명 그대로 작명해야 편리합니다.






(숙제3) 이렇게 생긴 array 자료를 파라미터로 입력할 수 있는 함수를 만들어봅시다.

함수( [40, 'wine', false] )
어떻게 코드를 짜야할까요?

(조건1) 오늘 배운 파라미터 destructuring 문법을 써봅시다.

(조건2) 함수실행시 입력한 파라미터들을 전부 콘솔창에 출력해줘야합니다.



저는 어떻게 했냐면

```
type 어레이 = (number | string | boolean)[];

function 함수([a,b,c]:어레이){
  console.log(a,b,c)
}

함수( [40, 'wine', false] )
```
array destructuring할 때는 자유작명이 가능합니다.

-----------

### Narrowing 할 수 있는 방법 더 알아보기


Narrowing 하면서 코드짜는 것도 힘든데 특히나

1. undefined 타입일 경우 처리하는거

2. 복잡한 object자료들 narrowing 하는거

이게 가장 잦고 귀찮습니다. 이걸 쉽게 하는 법을 좀 알아봅시다.









null & undefined 체크하는 법



실제로 개발할 때 어떤 변수나 함수파라미터에 null, undefined가 들어올 경우

어떻게 대처할지 if문으로 코드짜는 경우가 매우 많을 겁니다.


```
if (저 변수가 undefined일 경우) 어쩌구~
```

이런 코드 많이 짤 텐데 왜냐면 저런 상황을 미리 방어하는게 언제나 좋기 때문입니다.



근데&& 스킬을 쓰면 저런 if문을 생략할 수 있습니다.

그러기 위해서 && 연산자에 관련한 내용을 알아봅시다.

&& 연산자의 다른 기능


원래 && 이건 조건식 2개가 참이면 전부 참으로 판정해주세요~ 라는 논리연산자인데

여러개를 사용하면 이상한 현상이 있습니다.



&& 기호로 비교할 때 true와 false를 넣는게 아니라 자료형을 넣으면

&& 사이에서 처음 등장하는 falsy 값을 찾아주고 그게 아니면 마지막 값을 남겨줍니다.

falsy 값은 false와 유사한 기능을 하는 null, undefined, NaN 이런 값들을 의미합니다.
```
1 && null && 3   // null이 남음
undefined && '안녕' && 100  // undefined 남음
 ```

이걸 약간 exploit 하면 if문을 조금 더 간략하게 쓸 수 있습니다.


그래서 && 기호를 이용해서
```
if (변수 && typeof strs === "string") {}
  ```
이렇게 사용하면 변수가 undefined라면 undefined가 남아서 if문이 실행되지 않고,

(if문 조건식안에 falsy 값이 남으면 if문 실행되지 않습니다)

변수가 string 타입이면 if문이 실행됩니다.

변수가 null, undefined인 경우를 쉽게 거를 수 있는 문법이라고 보면 되겠습니다.


```
function printAll(strs: string | undefined) {
  if (strs && typeof strs === "string") {  
    console.log(s);
  }
}
```
근데 한 눈에 안들어온다면 안쓰는게 좋습니다.

그냥 if (저 변수가 undefined일 경우) 어쩌구~ 이렇게 if문을 하나 더 쓰는게 어떨까요.



참고로 if (변수 != null) 이렇게 조건식을 써도 null, undefined 이거 두 개를 동시에 거를 수 있습니다.





















in 연산자로 object 자료 narrowing



예를 들어서 파라미터로 object가 2개 들어올 수 있다고 타입지정을 해놓은 것입니다.

하나는 {a : 'kim}

다른 하나는 {b : 'park'}

이렇게 서로 다른 유니크한 속성들을 가지고 있다면



if (이 파라미터가 a라는 속성을 안에 가지고 있냐)

이런 if문을 써도 narrowing이 가능하다는 뜻입니다.

if (키값 in object자료형) 이렇게 쓰면 됩니다.

타입스크립트 컴파일러는 똑똑한 편이라 이런 것들도 narrowing 으로 판정해줍니다.

```
type Fish = { swim: string };
type Bird = { fly: string };
function 함수(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim
  }
  return animal.fly
}
```
서로 배타적인 속성을 가져와야 narrowing이 가능합니다.

예를 들어서 Fish와 Bird 타입이 둘 다 swim 속성을 가지고 있고 Bird만 fly 속성을 추가로 가지고 있으면 어쩌죠?

어떻게 narrowing하면 좋을지 한 번 생각해봅시다.











class로부터 생산된 object라면 instanceof로 narrowing



class 문법을 아는 분들만 들어보도록 합시다.

어떤 클래스로부터 new 키워드로 생산된 object들이 있습니다.

그런 object 들은 instanceof 키워드를 붙여서 부모 클래스가 누군지 검사할 수 있는데

이것도 narrowing 역할을 할 수 있습니다.



가장 쉽게 new 키워드로 object 생산할 수 있는게 바로 날짜인데

자바스크립트에선 new Date() 이렇게 하면 date object 라는게 생성됩니다.

그래서 instanceof로 부모 클래스가 누군지 검사할 수 있습니다.

```
let 날짜 = new Date();
if (날짜 instanceof Date){
  console.log('참이에요')
}
```
이렇게 쓸 수 있고 이런 문법도 narrowing 역할을 할 수 있습니다.

이 변수가 Date()로 부터 생성된 object 자료인지, 아니면 다른 애로부터 생성된 자료인지 이런걸 구분가능하기 때문입니다.



class 문법모르면 뭔소린지 모르겠죠? 그럴 경우엔 뒷부분 class, prototype 수업듣고 다시 놀러오도록 합시다.

literal type이 있으면 narrowing 쉬움




```
type Car = {
  wheel : '4개',
  color : string
}
type Bike = {
  wheel : '2개',
  color : string
}

function 함수(x : Car | Bike){
  if (x가 Car타입이면요){
    console.log('이 차는 ' + x.color)
  } else {
    console.log('이 바이크는 ' + x.color)
  }
}
```
지금 Car, Bike 타입을 각각 만들었는데 object 자료가 들어올 수 있습니다.



함수에 Car 타입을 입력할 경우 뭔가 실행하고 싶은데

근데 if문 안에서 narrowing 어떻게 하죠? Car 타입인지 어떻게 구분합니까 빨리 해보셈



typeof 연산자 써도 그냥 object 입니다~ 라고만 나올걸요 왜냐면 typeof 연산자는 string, number, object 이런 것만 구분해주기 때문입니다.

위에서 배웠던 in 문법 이런걸로 narrowing하기엔 힘들어보입니다. Car, Bike 둘 다 배타적인 속성이 없으니까요.

망한듯





실은 object들 구분할 일이 많을 때 literal type을 만들어두면 편리한데

그럼 서로 비슷한 object들이 들어와도 literal type으로 narrowing 가능하기 때문입니다.

제가 literal type 하나씩 적어둔거 보이시죠?

지금 Car 타입은 무조건 wheel 출력해보면 4

Bike 타입은 wheel 출력해보면 무조건 2가 나옵니다.

이거 가지고 object 끼리 narrowing 가능합니다.

그냥 if문으로 "지금 이 변수가 wheel 속성에 저장된게 4냐" 라고 물어보면 이건 누가봐도 Car 타입아니겠습니까.



타입스크립트는 스마트하니까 그렇게 쓰면 narrowing 충분히 가능합니다.

그래서 빨리 위에 코드 if문 조건식 채워보셈

 ---

 저는 어떻게 했냐면

```
type Car = {
  wheel : '4개',
  color : string
}
type Bike = {
  wheel : '2개',
  color : string
}

function 함수(x : Car | Bike){
  if (x.wheel === '4개'){
    console.log('the car is ' + x.color)
  } else {
    console.log('the bike is ' + x.color)
  }
}
```
그냥 literal type 으로 선언된 속성이 뭔지 찾아냈을 뿐입니다. 그러면 narrowing 가능

그래서 결론은 object 자료 비슷한걸 많이 다룰 땐

literal type으로 object 안에 각각 유니크한 자료를 달아두거나 그러면 나중에 구분하기 편리할 수 있습니다.

--------


### 함수에 사용하는 never 타입도 있긴 합니다


Never type 을 알아보자



함수에 붙이는 return type으로 사용가능합니다.

근데 좀 특이합니다.


```
function 함수() :never{

}
```
어떤 함수가

조건 1) 절대 return을 하지 않아야하고

조건 2) 함수 실행이 끝나지 않아야합니다 (전문용어로 endpoint가 없어야합니다)

그런 함수에 붙일 수 있는 타입니다.

실은 조건1, 2는 같은 소리인데 모든 자바스크립트 함수 맨 밑엔 return undefined 라는 숨겨진 코드를 가지고 있습니다.

그래서 조건2가 맞으면 1도 맞음
```
function 함수(){
  console.log(123)
}
```

이런 함수들에 never를 붙일 순 없습니다.

왜냐면 조건 1번은 만족하지만 2번은 만족하지 않습니다.

2번 조건은 함수 내부 코드 실행이 끝나지 않는 함수여야합니다.

 ```
function 함수() :never{
  while ( true ) {
    console.log(123)
  }
}
```
이런 함수엔 붙일 수 있습니다.

while 문법은 ( ) 소괄호안의 조건식이 true일 경우 계속 내부 코드를 실행해라~ 라는 뜻입니다.

무한히 실행되기 때문에 끝이안나죠? 그래서 never 타입을 사용가능합니다.








```
function 함수() :never{
  throw new Error('에러메세지')
}
```
이런 함수에도 붙일 수 있습니다.

throw new Error() 문법은 그냥 강제로 에러내라~ 라는 뜻인데

에러가 나면 전체 코드실행이 중단되니까 2번 조건도 나름 충족하는 것이기 때문에

never를 사용가능합니다.



그래서 1. 무언가 return 하지 않고 2. 끝나지도 않는 함수를 표현하고 싶을 때 never 타입을 지정하면 되는데

2번 조건의 함수를 만들 일이 거의 없기 때문에 never 타입은 쓸 일이 없습니다.

무언가를 return하고싶지 않을 경우 그냥 void 타입을 이용하시면 되며

배우는 이유는 가끔 코드 이상하게 짜다보면 자동으로 등장하기 때문입니다.

이 때 never 이게 뭘 의미하는지 이해만 잘 하면 됩니다.

어떨 때 등장하는지 알아봅시다.













파라미터가 never 타입이 되는 경우도 있음


```
function 함수(parameter: string) {
  if ( typeof parameter === "string"){
    parameter + 1;
  } else {
    parameter;
  }
}
```

위 함수는 뭔가 이상한 함수입니다.

지금 narrowing을 이용해서 파라미터의 타입이 string 이면 뭔가 해달라고 써놨는데

else 문이 존재합니다. 타입이 string이 아닐 경우 이거 해달라는 뜻입니다.

근데 else문은 말이 안되죠? 지금 파라미터가 string 밖에 못들어오는데 말입니다.

이런 잘못된 narrowing을 사용했을 때 파라미터의 타입이 never로 변합니다. 파라미터에 마우스 올려보셈

이런 건 있을 수 없다, 일어나면 안된다고 알려주는 느낌입니다.

그럴 때 never를 구경할 수 있으니 never 타입이 발견되는 경우 코드를 수정하는게 어떨까요.

자동으로 never 타입을 가지는 경우



자바스크립트는 함수를 만드는 방법이 2개 있습니다.
```
function 함수(){

}

let 함수2 = function (){

}
```
위는 함수 선언문,

밑은 함수 표현식이라고 부릅니다. 똑같이 함수만들 수 있는 문법입니다.




```
function 함수(){
  throw new Error()
}

let 함수2 = function (){
  throw new Error()
}
```
함수 선언문이 아무것도 return 하지 않고 끝나지도 않을 경우 void 타입이 자동으로 return 타입으로 할당되며

함수 표현식이 아무것도 return 하지 않고 끝나지도 않을 경우 never 타입이 자동으로 return 타입으로 할당됩니다.

마우스 올려보면 나옵니다.







또는 tsconfig.json에서 strict 옵션을 켜둘 경우

함부로 any 타입을 지정해주지 않는 경우가 있습니다.

그럴 때 array 같은거 대충 타입지정 안하고 만들면
```
let arr = [];
```
원래는 any[] 이런 타입이 되는데 any를 가질 수 없어서

never[] 이런 타입이 발견되기도 합니다.

아무튼 쓸 일이 별로 없기 때문에 이럴 때도 등장한다고 알아두기만 하면 됩니다.

---------



### public, private 쓰는거 보니까 타입스크립트 귀여운편


타입스크립트 쓰면 자바스크립트에 없는 문법도 사용가능합니다.

객체지향 언어에서 제공하는 public, private, static, protected 이런 키워드를 사용가능한데

뭔지 한번 알아봅시다.









public, private 키워드로 사용제한두기



타입스크립트는 class 안에서 public 키워드를 사용가능합니다.

원하는 속성 왼쪽에 붙이면 그 속성은 아무데서나 수정이 가능합니다.


```
class User {
  public name: string;

  constructor(){
    this.name = 'kim';
  }
}

let 유저1 = new User();
유저1.name = 'park';  //가능
```
public이 붙은 속성은 자식 object들이 마음대로 사용하고 수정가능합니다.

실은 public 붙이든 안붙이든 똑같긴 합니다. 맞잖아요 실험해보셈

왜냐면 필드값 같은걸 그냥 만들면 public이 몰래 왼쪽에 부여되기 때문입니다.



(참고) public 키워드는 class 내의 prototype 함수에도 붙일 수 있습니다.







근데 private 키워드를 붙이면 수정이 불가능해집니다.

무조건 class { } 중괄호 안에서만 수정 및 사용가능합니다.

심지어 class로 부터 생산된 자식 object에서도 private 붙은건 사용불가능합니다.

(class 중괄호 내부가 아니니까요)


```
class User {
  public name :string;
  private familyName :string;  

  constructor(){
    this.name = 'kim';
    let hello = this.familyName + '안뇽'; //가능
  }
}

let 유저1 = new User();
유저1.name = 'park';  //가능
유저1.familyName = 456; //에러남
```
secretId 라는 속성에는 private 키워드를 추가했더니 아무데서나 수정이 불가능해졌습니다.

private 붙은 속성들은 오직 class { } 안에서만 수정이 가능합니다.

이렇게 속성을 외부에서 숨기고 싶을 때 private 키워드를 이용합니다.

실은 오리지널 자바스크립트 문법에서도 #이걸 속성옆에 붙이면 private 속성이 됩니다.



(참고) private 키워드는 class 내의 함수에도 붙일 수 있습니다.







Q. private 부여된 속성을 class 밖에서 수정해야할 경우?

1. private 속성을 수정하는 함수를 class 안에 만들어서 2. 함수를 실행시키면 됩니다.

이건 그 예시임


위에서 private 붙여놓은 secretId 이런걸 바깥에서 수정하고 싶은 경우 이렇게 합니다.



class User {
  public name :string;
  private familyName :string;

  constructor(){
    this.name = 'kim';
    let hello = this.familyName + '안뇽';
  }
  changeSecret(){
    this.familyName = 'park';
  }
}

let 유저1 = new User();
유저1.familyName = 'park';  //에러남
유저1.changeSecret()        //가능
1. changeSecret() 함수를 class 안에 만들었습니다.

이 함수는 familyName을 수정해주는 함수입니다.

2. 그러면 이제 class 바깥에서도 changeSecret() 함수를 이용하면 간접적으로 familyName을 수정가능합니다.

함수 불러도 에러안나고 수정 잘 됩니다.

중요한건 아니고 참고로 알아둡시다.





근데 "문법을 이렇게 쓴다~~ 필기해라" 가 중요한게 아니라

배웠으면 어디다 쓰는지 알아야합니다.

어디다 쓰는지 알아야 나중에 개발할 때 써먹죠


Q. private 이걸 어따씀?

A. 개발하다보면 소중하게 지켜주고 싶은 중요한 변수나 속성들이 있습니다.

예를 들면 위의 예제에선 familyName 이런건데 이걸 외부에서 실수로 수정하거나 그러면 큰일날 것 같은 그런 속성들이요.

이걸 외부에서 실수로 수정하지 않도록 지켜주고 싶으면 private를 붙여보시길 바랍니다.

그리고 이걸 쓰면 함수를 만들어서 수정해야하니 약간의 안전장치를 더해서 개발이 가능합니다.

개발이 귀찮아지지만 버그를 예방해주는 키워드이며

react-redux 이런거 하다보면 매번 보게될 패턴입니다.























public, private 키워드 쓰면 이런 것도 가능



constructor 안에서 this.name = name 이런걸 생략할 수 있습니다.


```

class Person {
  name;
  constructor ( name :string ){  
    this.name = name;
  }
}
let 사람1 = new Person('john')


class Person {
  constructor ( public name :string ){  

  }
}
let 사람1 = new Person('john')
```
위 두개의 코드는 같은 역할을 하는 코드입니다.

"constructor 파라미터에 public 붙이면 this.name = name 이거 생략가능하다" 라는걸 참고해주시면 되며

이제 Person으로부터 새로 생산되는 object들은 name 속성을 가질 수 있습니다.



---------


### class에서 사용가능한 protected, static 키워드


(잠깐 JS 문법시간) class는 extends로 복사가능합니다





class는 복사할 수 있습니다.

extends라는 문법 쓰면 다른 class 만들 때 기존 class에 있던걸 전부 복사붙여넣기 가능합니다.
```
class NewUser extends User {
  ~~ 어쩌구
}
```
이러면 새로운 NewUser class 만들 때 User에 있던거 저기다가 복붙해줍니다. 끝

님들이 기존 class와 비슷한 class를 많이 만들어야할 때 사용합니다.











class 안에서 쓰는 protected 키워드



private 이거랑 비슷한 키워드가 하나 있는데

private인데 약간 보안을 해제하고 싶을 때 씁니다.

protected를 달아놓으면 1. private 이거랑 똑같은데 2. extends 된 class 안에서도 사용가능하게 약간 보안을 풀어줍니다.





예제를 쉽게 다시 만들어봅시다
```
class User {
  protected x = 10;
}
```
User 라는 class의 x 속성은 protected 입니다.

그럼 private와 동일하게 class 안에서만 사용이 가능해지며

User의 자식들도 함부로 사용이 불가능합니다.

```
class User {
  protected x = 10;
}

class NewUser extends User {
  doThis(){
    this.x = 20;
  }
}
```
User를 extends 하는 NewUser class를 만들었습니다.

NewUser가 갑자기 this.x 이런 식으로 x를 가져다가 쓰려고 하면

x가 private 속성일 경우엔 에러가 나지만

x가 protected 속성일 경우엔 에러가 나지 않습니다.



그래서 class 여러개 만들 때 class 끼리 공유할 수 있는 속성을 만들고 싶으면 protected,

class 하나 안에서만 쓸 수 있는 속성을 만들고 싶으면 private 이걸 쓰도록 합시다.

class 여러개 만들 일이 없으면 쓸모없습니다.















class 안에서 쓰는 static 키워드



우리가 class { } 안에 집어넣는 변수, 함수 이런건 전부 class로 부터 새로 생성되는 object (일명 instance) 에 부여됩니다.

근데 class에 직접 변수나 함수를 부여하고 싶으면 static 키워드를 왼쪽에 붙여주면 됩니다.





예를 들어 봅시다.

```
class User {
  x = 10;
  y = 20;
}

let john = new User();
john.x //가능
User.x //불가능
```
이런 x와 y같은 변수들은 User로 부터 생성된 object들만 사용가능합니다.

근데 static 키워드를 붙이면




```
class User {
  static x = 10;
  y = 20;
}

let john = new User();
john.x //불가능
User.x //가능
```
john은 사용불가능하고

User는 직접 사용가능합니다.



- 함수도 static 붙이기 가능

- extends 로 class를 복사할 경우 static 붙은 것들도 따라옵니다.











(참고) static은 private, protected, public 키워드와 동시 사용가능합니다.
```
class User {
  private static x = 10;
}
```
이건 무슨 뜻이게요 설명해보십시오.

오늘 숙제니까 일단 봐드리겠습니다. 하단에서 다시 만납시다.













Q. static 이런걸 언제 씁니까

주로 class 안에 간단한 메모를 하거나, 기본 설정값을 입력하거나

class로 부터 생성되는 object가 사용할 필요가 없는 변수들을 만들어놓고 싶을 때 사용합니다.









쓸데는 없지만 간단한 활용 예시를 들어봅시다.


```
class User {
  static skill = 'js';
  intro = User.skill + '전문가입니다'
}
var 철수 = new User();
console.log(철수)
```
1. User 클래스를 만들었습니다.

2. 근데 자식들에게 { intro : 'js 전문가입니다' } 이걸 복사해주고 싶은 것입니다.

3. 근데 여기서 js 라는 단어가 중요할 것 같아서 static skill 이 곳에다가 메모해놓고 그걸 사용했습니다.

4. 이제 자식들은 철수.intro 이렇게 사용할 때 마다 'js 전문가입니다~' 를 출력해줍니다.







근데 갑자기 skill을 좀 변경하고 싶은 겁니다.

철수 이후로 생산되는 자식들은 'js 전문가입니다~'가 아니라 'python 전문가입니다' 를 달고 나오게 하고 싶은 것임  

그럴 때 class 내부를 직접 js -> python 이렇게 수정해도 되지만

class가 멀리 떨어져있거나 다른 파일에 있을 경우 귀찮습니다.

다행히 static 키워드로 만들어놨기 때문에 그걸 수정해버려도 됩니다.


```
class User {
  static skill = 'js';
  intro = User.skill + '전문가입니다'
}

var 철수 = new User();
console.log(철수);

User.skill = 'python';
var 민수 = new User();
console.log(민수);
```
User.skill을 저렇게 수정해버리면

이제 민수부터는 'python 전문가입니다~' 이걸 달고 등장합니다.

이런 식으로 쓸 수 있다고 보여드린 것일 뿐입니다.

실은 class 내부의 기본 변수같은걸 저렇게 수정할 일은 별로 없습니다.

수정하고 싶으면 private 쓰고 그 다음에 수정함수를 만들어서 사용하는게 더 안전한 방법입니다.









(숙제1) 다음 x, y, z 속성의 특징을 설명해보십시오.


```
class User {
  private static x = 10;
  public static y = 20;
  protected z = 30;
}
```
누가 쓸 수 있고, 어디서 수정할 수 있는지 이런 것들이요.

친구가 물어봤을 때 어떻게 답해줄 것입니까













(숙제2) x 속성에 숫자를 더해주는 함수가 필요합니다.


```
class User {
  private static x = 10;
  public static y = 20;
}
User.addOne(3) //이렇게 하면 x가 3 더해져야함
User.addOne(4) //이렇게 하면 x가 4 더해져야함
User.printX()  //이렇게 하면 콘솔창에 x값이 출력되어야함
```
저렇게 User.addOne() 쓸 때마다 x가 증가하는 함수는 어떻게 만들 수 있을까요?

그리고 x값을 콘솔창에 출력해주는 printX() 함수도 한번 만들어보십시오.

(조건) private static x = 10; 이 코드 수정금지



답은 다음강의에











(숙제3) 이런거 어떻게 만들게요



웹 요소 애니메이팅하는거 이런 것의 기초 격인데
```
let 네모 = new Square(30, 30, 'red');
네모.draw()
네모.draw()
네모.draw()
네모.draw()
```
이렇게 네모.draw()를 할 때마다

index.html에 가로 30px, 세로 30px, 배경색이 'red' 의 <div> 박스가

가로 400px 세로 400px 공간 안에 무작위로 배치되어야합니다.

![20220324_101400](/assets/20220324_101400.png)

▲ 저는 네모.draw() 이걸 8번 적고 새로고침 해봤더니 8개의 박스가 생기네요

Square라는 class를 어떻게 만들면 될까요?

html css 기초학력이 흔들리는 분들은 좌절을 느낄 수 있는데 생각보다 별거 아닙니다.

그리고 심심하면 타입지정도 해봅시다.



 -------------



 ### 저번시간 숙제 해설 (class 만들기)



 (숙제1) 다음 x,y 속성의 특징을 설명해보십시오.


 ```
 class User {
   private static x = 10;
   public static y = 20;
 }
 ```

 x와 y는 누가 쓸 수 있고, 어디서 수정할 수 있는지 이런 것들이요.

 친구가 물어봤을 때 어떻게 답해줄 것입니까 아는 만큼 설명해봅시다.



 소곤소곤


 1. 필드값은 원래는 모든 User의 자식들에게 물려주는 속성이지만

 x와 y에는 static 키워드가 붙었기 때문에 User.x 이런 식으로만 접근해서 쓸 수 있습니다.

 User의 자식들은 x와 y를 쓸 수 없습니다.



 2. private static x는 class 내부에서만 수정가능합니다.



 3. public static y는 class 내부 외부 상관없이 수정가능합니다. public 키워드 지워도 똑같이 동작할 듯



 4. protected z는 private 키워드와 유사하게 class 내부에서만 사용이 가능한데

 약간 범위가 넓어서 extends로 복사한 class 내부에서도 사용할 수 있습니다.

 -------------


 (숙제2) x 속성에 숫자를 더해주는 함수가 필요합니다.



class User {
  private static x = 10;
  public static y = 20;
}
User.addOne(3) //이렇게 하면 x가 3 더해져야함
User.addOne(4) //이렇게 하면 x가 4 더해져야함
저렇게 User.addOne() 쓸 때마다 x가 증가하는 함수는 어떻게 만들 수 있을까요?

그리고 x값에 뭐가 들었는지 확인하고싶으니까 x값을 콘솔창에 출력해주는 함수도 한번 만들어보십시오.

(조건) private static x = 10; 이거 코드 수정금지





이것저것 실험해보면 답이 나올 수 있습니다. 해보고 누르십시오


일단 static 속성들은 class에 직접 부여되는 속성이랬습니다.

그래서 static 속성을 수정하거나 가져다 쓰고 싶으면

그냥 클래스명.속성명 이렇게 하면 나옵니다.


```
class User {
  private static x = 10;
  public static y = 20;

  static addOne(파라미터 :number){
    User.x += 파라미터
  }

  static printX(){
      console.log(User.x)
  }
}
User.addOne(3)
User.addOne(10)
User.printX()
```
그래서 1. addOne() 함수를 만들었습니다. 그리고 static을 붙여줬음

그러면 이제 User.addOne() 이렇게 쓸 수 있으니까요.

2. addOne(파라미터) 실행하면 x속성에 파라미터만큼 더해달라고 했습니다.

3. 그리고 printX() 실행하면 콘솔창에 User.x 출력해달라고 했습니다.

의도대로 잘 동작하는 군요.


--------


(숙제3) 이런거 어떻게 만들게요
```
let 네모 = new Square(30, 30, 'red');
네모.draw()
네모.draw()
네모.draw()
네모.draw()
```
이렇게 네모.draw()를 할 때마다

index.html에 가로 30px, 세로 30px, 배경색이 'red' 의 <div> 박스가 무작위로 배치되어야합니다.









저는 어떻게 했냐면


일단 index.html 안에 타입스크립트가 변환된 js 파일 첨부가 잘 되어있는지 확인하시고

(index.html 내부)
<body>
  <script src="index.js"></script>
</body>




그 다음에 저는 이렇게 만들었습니다.


```
class Square {  
  constructor (public width :number, public height :number, public color :string){
  }
  draw(){
    let a = Math.random();
    let square = `<div style="position:relative;
      top:${a * 400}px;
      left:${a * 400}px;
      width:${this.width}px;
      height : ${this.height}px;
      background:${this.color}"></div>`;
    document.body.insertAdjacentHTML( 'beforeend', square );
  }
}


let 네모 = new Square(30, 30, 'red');
네모.draw()
네모.draw()
네모.draw()
네모.draw()
 ```

1. constructor를 이용해서 새로뽑는 object 들은 width, height, color를 입력할 수 있게 만들었습니다.

2. 자식들은 draw()를 쓰면

(1) 0과 1사이의 무작위 숫자를 뽑습니다. 그걸 변수 a에 저장해둡니다.

(2) <div>를 디자인합니다. 근데 <div>박스의 폭, 높이, 색상은 constructor로 입력한 것들을 활용합니다.

(3) <div> 박스의 위치는 left, right 속성을 이용해서 0~400px 사이로 무작위로 배치합니다.

(4) insertAdjacentHTML 이런거 이용하면 원하는 곳에 html 추가가 가능합니다.



그래서 실제로 자식을 하나 뽑아서 draw() 했더니 진짜 빨간 박스 4개 나옵니다.

다른 사이즈, 다른 색상으로도 뽑아서 draw() 이것도 가능하겠군요


---------


### 타입도 import export 해서 씁니다 그리고 namespace


만든 타입변수를 다른 파일에서 사용하고 싶은 경우 자바스크립트 import export 문법 그대로 사용가능합니다.

import export 문법이 처음이라면 듣는 의미가 없을 수 있으니 간략하게 설명하자면







a.ts -> b.ts 이렇게 변수나 함수를 가져다쓰고 싶은 경우


```
(a.ts)

export var 이름 = 'kim';
export var 나이 = 30;
```
```
(b.ts)

import {이름, 나이} from './a'
console.log(이름)
 ```



이렇게 사용하면 됩니다.

1. 우선 변수를 다른 파일에서 쓰이게 내보내고 싶으면 export 문법으로 내보내야하고

2. export된 변수를 가져와서 쓰고 싶으면 import 문법으로 가져와야합니다.   

export 하고 싶으면 변수나 함수 정의부분 왼쪽에 export 키워드 붙이면 되고

import 하고 싶으면 import {변수명} from 파일경로

이렇게 쓰면 됩니다. 경로는 ./ 부터 시작해야합니다 현재경로라는 뜻이고 ts 파일 확장자는 안붙여야합니다.





 ```
import * from './a';
console.log(이름);
console.log(나이);
 ```

변수명 쓰기 귀찮으면 import * 하셔도 됩니다. 그 파일에서 export된 변수를 전부 import 해오는 문법입니다.

참고로 export default 이런 것도 있는데 첨 들어보면 나중에 찾아보도록 합시다.









a.ts -> b.ts 이렇게 정의된 타입을 가져다 쓰고 싶은 경우

```
(a.ts)

export type Name = string | boolean;
export type Age = (a :number) => number;
(b.ts)

import {Name, Age} from './a'
let 이름 :Name = 'kim';
let 함수 :Age = (a) => { return a + 10 }
```


타입도 똑같이 사용하면 됩니다.





Q. 다른 파일에서 쓰지못하는 a.ts에서만 쓰고 싶은 일종의 로컬 타입은 어떻게 만드나요?

A. export 안붙이면 그게 a.ts에서만 쓸 수 있는 타입이죠 뭐


과거엔 namespace를 썼습니다



타입스크립트 1.5 버전 이하였나 그 때는 자바스크립트 import / export 문법이 없었습니다.

그냥 script src="" 이걸 여러개 써서 파일들을 첨부해서 썼는데 그 문법의 문제는  

파일이 많아질 수록 변수명이 겹치는 위험이 발생한다는 점입니다.

그래서 외부 파일에서 사용하지 않을 변수들은 함수로 감싸거나 그랬는데

타입변수들은 namespace 문법으로 숨겼습니다.







```
(a.ts)

namespace MyNamespace {
  export interface PersonInterface { age : number };
  export type NameType = number | string;
}
```
중요한 타입정의들을 다른 파일들에서 쓰고 싶으면 안전하게 namespace 안에 써서 export 해줬습니다.








```
(b.ts)

/// <reference path="./a.ts" />

let 이름 :MyNamespace.NameType = '민수';
let 나이 :MyNamespace.PersonInterface = { age : 10 };
```
그러면 ts 파일은 이상한 <reference/> 라는 태그를 이용해서 다른 파일을 import해올 수 있는데

그럼 이제 그 파일에 있던 namespace를 사용가능합니다.

네임스페이스명.타입명

이렇게 쓰면 다른 파일에 있던 타입변수를 자유롭게 쓸 수 있습니다.






```
(b.ts)

/// <reference path="./a.ts" />

let 이름 :MyNamespace.NameType = '민수';
let 나이 :MyNamespace.PersonInterface = { age : 10 };

type NameType = boolean; //사용 가능
interface PersonInterface {} //사용 가능
```
점찍어서 써야하기 때문에 다른 변수명을 오염시키지 않아서

변수명 중복선언문제를 방지할 수 있어서 유용합니다.

근데 자바스크립트 es6 버전이 나온 이후로 import as 키워드로 나름 namespace 와 유사하게 중복문제를 해결가능해서

namespace는 그렇게 많이 쓰이진 않습니다.





(참고) 옛날 옛적엔 module 키워드를 썼었는데 갑자기 namespace 키워드로 바뀌었습니다. 참고로 알아둡시다.











(숙제1) Car 그리고 Bike 타입을 만들었는데 너무 길어요



(index.ts)
```
type Car = {
  wheel : number,
  model : string
}
interface Bike {
  wheel : 2,
  model : string
}
```
index.ts에 만들어놨는데 더러워서 다른 파일로 옮겨서 사용하고 싶습니다.

빨리 위 코드를 다른 파일 아무데나 저장하신 후 index.ts에서 가져와서 변수만들 때 사용해보십시오.


굳이 답을 볼 필요가 있을까요

```
(a.ts)

export type Car = {
  wheel : number,
  model : string
}
export interface Bike {
  wheel : 2,
  model : string
}
```
이것은 타입담아둘 파일




```
(index.ts)

import {Car, Bike} from './a'

let 빠방이 :Car = { wheel : 4, model : 'Sonata' }
```
이것은 가져다쓰는 파일입니다.



(숙제2) 너무 자주만들어 쓰는 함수가 하나 있습니다

이 함수는 파라미터로 object자료 하나를 선택적으로 집어넣을 수 있고

아무것도 return 해주지 않아야합니다.

함수 만들 때마다 여기에 타입 일일이 붙이기 귀찮아서 그런데

이 타입을 다른 파일에 저장해두고 import 해와서 함수 만들 때마다 쓰려면 어떻게 코드를 짜야할까요



이것도 굳이 답을 볼 필요가 있을까요

```
(a.ts)

export type ObjFunction = (a? :object) => void
```
이것은 타입담아둘 파일




```
(index.ts)

import {ObjFunction} from './a'

let 함수 :ObjFunction = function(a){
  console.log(a)
}

함수({abc : '안뇽'});
```
이것은 가져다쓰는 파일입니다.

에러안나니 잘 되는 것임

저럴 경우 참고로 object 대신 array 자료 집어넣어도 별말 안합니다.



[collapse]






(숙제3) 타입 중복이 너무 많이 발생합니다.


```
type Dog = string;
interface Dog { name : string };

let dog1 :Dog = 'bark';
let dog2 :Dog = { name : 'paw' }
```
위 코드에서 에러를 없애야합니다. 어떻게 코드를 짜면 될까요?

(조건) type Dog, interface Dog의 타입이름 변경 금지, 파일 분할 금지



배운 기념으로 namespace 써보십쇼

```
namespace GoodDog {
  export type Dog = string;
}
namespace BadDog {
  export interface Dog { name : string };
}

let dog1 :GoodDog.Dog = 'bark';
let dog2 :BadDog.Dog = { name : 'paw' }
```
저는 namespace를 2개 만들고 각각 다른 타입을 담았습니다.

그럼 이제 첫째 타입은 GoodDog.Dog 이렇게 쓸 수 있고

둘째 타입은 BadDog.Dog 이렇게 쓸 수 있습니다.



---------


### 타입을 파라미터로 입력하는 Generic


함수만들 때 () 여기에 파라미터 입력하지않습니까

근데 타입스크립트를 쓰시면 파라미터로 타입을 입력할 수도 있습니다.

<> 여기에 집어넣으면 됩니다.













함수 return 값의 타입이 애매하면



예를 들어 1. 아무렇게나 생긴 array 자료를 입력하면 2. array의 첫 자료를 그대로 출력해주는 함수를 만들었다고 합시다.


```
function 함수(x: unknown[]) {
return x[0];
}

let a = 함수([4,2])
console.log(a)
```
이러면 콘솔창에 4가 출력됩니다.



근데 마우스 올려서 a의 타입을 확인해보면 숫자는 아니고 unknown 타입입니다.

왜냐면 지금 입력하는 array도 unknown 타입이라서 그렇습니다.

여기서 중요포인트는 타입스크립트는 타입을 알아서 변경해주지 않습니다.

스마트하게 숫자가 return 되면 "number 타입입니다~" 문자가 return 되면 "string 타입입니다~"

그런거 안해준다는 것입니다.






```
function 함수(x: unknown[]) {
return x[0];
}

let a = 함수([4,2])
console.log(a + 1)
```
그래서 이런 연산도 에러가 납니다.

a는 사람이 보기에 분명히 숫자가 맞지만 아직 타입은 unknown 타입이니까요.

님들이 함수의 return 타입지정을 :number 이런 걸로 강제로 바꾸기 전까지는 number 타입으로 변하지 않습니다.









그래서 여러분이 함수에 불확실한 unknown, any, union 타입을 입력하면

나오는 값도 unknown, any, union 타입이고, 이 때문에 일어나는 문제들이 많습니다.

예를 들면 "함수가 10을 return 하는데 타입이 unknown 이라서 맘대로 조작을 못하네" 문제요  

해결책은 1. narrowing 잘 하면 해결됩니다. 근데 귀찮음

2. 그냥 애초에 타입을 파라미터로 함수에 미리 입력하는 방법도 있습니다. 그럼 원하는 곳에 가변적으로 타입지정 가능

2번을 Generic 이라고 부릅니다.











Generic 적용한 함수만들기



함수에 <> 이런 괄호를 열면 파라미터를 또 입력할 수 있습니다.

근데 여기 안엔 타입만 입력할 수 있습니다. 타입파라미터 문법임


```
function 함수<MyType>(x: MyType[]) :MyType {
return x[0];
}

let a = 함수<number>([4,2])
let b = 함수<string>(['kim', 'park'])
```
그럼 이제 함수를 사용할 때도 <> 안에 파라미터처럼 타입을 입력할 수 있습니다.

그럼 님들이 이제 함수<number>( ) 이렇게 쓰는 순간

MyType 이라는 변수에 number 라는게 들어간다고 보시면 됩니다.

그럼 이제 함수( x : number[] ) :number { } 이거랑 똑같이 동작합니다.



그럼 뭐가 좋겠습니까. 아까 unknown 가득한 예제와는 다르게

return 되는 타입이 number입니다.

b 변수는 return되는 타입이 뭐게요 맞춰보셈





아무튼 결론 : Generic을 쓰면 여러분이 정한 타입을 return 값으로 뱉는 함수를 제작가능한 것입니다.

<> 문법만 잘 쓰면 됩니다.








```
function 함수<MyType>(x: MyType[]) :MyType {
return x[0];
}

let a = 함수([4,2])
let b = 함수(['kim', 'park'])
```
실은 함수 사용시 꼭 <> 안써도 알아서 기본 타입을 유추해서 집어넣어줍니다.

이래도 결과는 똑같습니다.





(참고)

- 타입파라미터는 자유작명가능 보통 <T> 이런걸로 많이 합니다.

- 일반 함수파라미터 처럼 2개 이상 넣기도 가능합니다  













근데 왜 - 1은 불가능함



함수 이런거 만들었는데 왜 에러가 나는 것이죠?


```
function 함수<MyType>(x: MyType) {
return x - 1
}

let a = 함수<number>(100)
```
MyType 자리에 number 이런거 타입 꽂아넣으면

MyType 붙은 곳에 다 집어넣어진다면서요

근데 x - 1 은 불가능하네요? 님 사기꾼인듯









이유는 에러메세지를 잘 보면 됩니다. 영어잘해야함


![20220324_104152](/assets/20220324_104152.png)

어디서 많이 보던 문장입니다.

<MyType> 이라는 곳에 number 말고도 다른거 혹시 집어넣을 수 있으니까 저런 - 1 연산을 미리 방지해주는 것입니다.

그래서 해결책은 narrowing을 하셔도 되는데 MyType에 집어넣을 수 있는 타입을 미리 제한하는 것도 하나의 해결책입니다.















Generic 타입 제한하기 (constraints)



extends 문법을 쓰면 넣을 수 있는 타입을 제한할 수 있습니다.

그래서 MyType extends number 라고 쓰면 타입 파라미터에 넣을 수 있는 타입을 제한가능합니다.

interface 문법에 쓰는 extends와는 살짝 다른 느낌입니다.

그 extends는 복사인데 이번 extends는 number와 비슷한 속성을 가지고 있는지 if 문으로 체크하는 문법이라고 보면 됩니다.


```
function 함수<MyType extends number>(x: MyType) {
  return x - 1
}

let a = 함수<number>(100) //잘됩니다
```
그래서 그렇게 써봤습니다. 이러면 에러없이 잘됩니다.

return 타입지정을 안한 이유는 숫자 - 숫자를 했으니 알아서 number 타입이 됩니다.













언제나 커스텀 타입도 extends 가능





예를 들어서 문자로 파라미터를 넣으면 자릿수를 세어서 출력해주는 함수를 Generic으로 만들고 싶습니다.


```
function 함수<MyType>(x: MyType) {
  return x.length
}

let a = 함수<string>('hello')
```
문자에 .length 붙이면 몇자리의 문자인지 출력해주는데

에러나고 안됩니다.

왜냐면 MyType에 님들이 string을 집어넣었지만 나중에 number 이런거 실수로 집어넣으면 어쩔 것임

그럴 수 있어서 아직 .length같은 조작을 일단 방지해주는 것입니다.

그래서 MyType을 extends 이런걸로 정확히 제한해주면 되는데

이번엔 interface로 만들어둔 타입을 extends 해봅시다. 제맘임






```
interface lengthCheck {
  length : number
}
function 함수<MyType extends lengthCheck>(x: MyType) {
  return x.length
}

let a = 함수<string>('hello')  //가능
let a = 함수<number>(1234) //에러남
```
1. length 속성을 가지고 있는 타입을 하나 만들었습니다. 이름은 lengthCheck로 했습니다.

2. 그걸 extends 해주면 MyType도 length 속성을 복사해서 가집니다.

3. 그래서 MyType은 length가 분명히 있기 때문에 맘대로 MyType을 부여받은 x는 .length 조작이 가능합니다.





(참고) class도 class <MyType> {} 이런 식으로 만들면 new로 뽑을 때 타입파라미터를 집어넣을 수 있습니다.

type Age<MyType> = MyType 이런 식으로 타입변수에도 사용가능











(숙제1) 문자를 집어넣으면 문자의 갯수, array를 집어넣으면 array안의 자료 갯수를 콘솔창에 출력해주는 함수는 어떻게 만들까요?



연습삼아 Generic 이런걸로 만들어봅시다. 굳이 Generic 이런게 필요는 없겠지만요



(동작 예시)

```
함수<string>('hello') 이렇게 사용하면 콘솔창에 5가 나와야합니다.

함수<string[]>( ['kim', 'park'] ) 이렇게 사용하면 콘솔창에 2가 나와야합니다.
```


공짜답안 좋아하면 머리가 빠집니다

```
function 함수<MyType extends string | string[]>(x: MyType)  {
      console.log(x.length)   
}

함수<string>('hello');
함수<string[]>(['kim','park'])
```
1. <> 안에 타입을 집어넣을 수 있는 함수를 만들었습니다. 그리고 기능은 심플한데 x.length를 출력해줍니다.

2. 근데 에러가 납니다. x에 뭐가 들어올지 모르니까 미리 에러를 내주고 있습니다.

3. 그래서 <>에 집어넣은 타입은 extends 를 이용해서 string 또는 string[] 얘네들의 특성을 가지고 있는지 확인하라고 했습니다.

그랬더니 x.length 잘 됩니다.












(숙제2) Animal 이라는 타입이 있습니다.


```
interface Animal {
  name : string;
  age : number
}

let data = '{"name" : "dog", "age" : 1 }
```
그리고 data라는 변수도 있습니다. object처럼 생겼지만 따옴표 쳐진 JSON 자료입니다.



data라는 JSON 자료를 object { } 자료로 변환을 해서 return 해주는 함수를 만들어보십시오.

근데 변환된 object의 타입은 Animal이 되었으면 좋겠는데 어떻게 코드를 짜면 될까요?

오늘 배운 Generic을 이용해서 구현해보도록 합시다.  



(동작 예시)

함수<Animal.>(data) 이렇게 쓰면 이 자리에 { name : 'dog' , age : 1 } 이런 object 자료가 남아야합니다. 근데 타입은 Animal임



###### JSON이 뭔데요
object 자료형인데 글자로 바꾸려고 전부 따옴표쳐놓은 자료를 JSON 이라고 칭합니다.

서버랑 통신할 때 가끔 사용합니다. 끝

JSON --> object 이렇게 변환하고 싶으면 직접 따옴표를 제거하든가 아니면  

JSON.parse() 소괄호 안에 JSON자료를 넣으면 그 자리에 따옴표가 제거된 object가 남습니다.

[collapse]
예전에 뭔가 다뤘던 것 같기도한데



```
interface Animal {
  name : string;
  age : number
}

let data = '{"name" : "dog", "age" : 1 }';


function 함수(x :string){
  return JSON.parse(x);
}
let result = 함수(data)
console.log(result)
```
이렇게 하면 JSON --> object 자료 변환기를 만들 수 있습니다.

data라는 변수를 변환한 결과를 출력해보면 근데 타입은 이상한 any 타입입니다.

그래서 여러분이 Animal 타입을 입력하면 그걸 타입으로 가지라고 직접 지정해주면 되는데




```
interface Animal {
  name : string;
  age : number
}

let data = '{"name" : "dog", "age" : 1 }';


function 함수<Type>(x :string) :Type {
  return JSON.parse(x);
}
let result = 함수<Animal>(data)
console.log(result)
```
이렇게 하면 result가 진짜로 Animal 타입을 가지게 됩니다.

이게 다 타입파라미터 덕분입니다.



Q. as 쓰면 더 쉽지 않나요 return 값 오른쪽에 as Animal 하드코딩 해놓으면 <> 필요없겠네

A. 들킴

근데 확장성이 없을 수 있습니다. Generic 쓰시면 Animal 말고도 다른 타입으로 변환이 가능하잖아요











(숙제3) class 를 수정해봅시다.
```
class Person {
  name;
  constructor(a){
    this.name = a;
  }
}
let a = new Person('어쩌구');
a.name //any 타입이 되었넹
 ```

지금 만든 class는 new Person('어쩌구') 라고 분명 문자를 집어넣었는데 any 타입이 name 속성에 부여됩니다.

이게 싫어서 파라미터에 string을 집어넣으면 string 타입

number를 집어넣으면 number 타입

string[]을 집어넣으면 string[] 타입이 되게 하려면 위의 코드를 어떻게 수정해야할까요?

오늘 배운 Generic을 이용해봅시다.



안배운건 검색

```
class Person <T> {
  name;
  constructor(a :T){
    this.name = a;
  }
}
let a = new Person<string>('어쩌구');
a.name //string 타입이 되었넹
```
타입파라미터를 입력할 수 있게 만들었습니다.

그럼 이제 new Person 할 때마다 타입 파라미터를 입력할 수 있게 되며

내맘대로 타입지정이 가능합니다.


----------

### React + TypeScript 사용할 때 알아야할 점

기존 프로젝트에 타입스크립트 같은거 도입하려면

그냥 대충 남들이 쓴다고 해서 따라쓰지말고 이득을 따져보셔야합니다.



- 프로젝트 사이즈가 큰가

- 협업시 다른 사람이 짠 코드를 참조할 일이 많은가

- 장기적으로 유지보수에 도움이 되는가

- 나중에 팀원이 더 필요해도 인력수급이 쉽게 가능한가

- 팀원들 학습에 필요한 시간과 비용이 적게 드는가



이런 질문을 해보시고 Yes 가 많으면 도입해도 됩니다.

실은 그냥 쓰십쇼 요즘은 거의 필수 스택이 되어서요 그리고 다른 언어도 아니고 에디터 부가기능 수준임













리액트프로젝트 설치는 이런 명령어를 사용합니다.

```
npx create-react-app 프로젝트명 --template typescript
```
typescript 셋팅이 완료된 프로젝트 설치하는 법인데

처음이라 설치 어떻게 하는건지 모르면 리액트 강의 무료파트를 듣도록 합시다.





기존 프로젝트에 타입스크립트만 더하고 싶으면

기존 프로젝트 경로에서 터미널을 오픈하신 후

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```
입력해주면 끝입니다. 이제 .js 파일을 .ts 파일로 바꿔서 이용가능합니다.

이런거 할 바엔 깔끔하게 그냥 새로 프로젝트 만드는게 안전합니다.









그럼 프로젝트가 생성되는데


![20220324_111459](/assets/20220324_111459.png)

일반 프로젝트와 다른 점은 컴포넌트 파일은 js가 아니라 tsx로 확장자를 사용하셔야한다는 점입니다. ts랑 똑같은데 jsx 문법을 지원합니다.

코드짜는 것은 일반 리액트와 큰 다른점이 없습니다. 있는게 이상함

다만 함수, 컴포넌트, state, props 타입체크를 잘 해줘야 에러가 나지 않습니다.

그래서 리액트에선 TS 문법을 어디에 써야하는지 4개로 정리해드리겠습니다.

그냥 타입관련 버그가 생길 것 같은 곳에 타입지정하면 끝입니다.



1. 일반 변수, 함수 타입지정



그냥 타입스크립트 배웠던 대로 똑같이 하면 됩니다.













2. JSX 타입지정



리액트에선 변수나 자료에 <div></div> 이런걸 쌩으로 담아서 쓸 수 있습니다.

왜냐면 리액트에서 <div></div> 이렇게 쓰면 HTML이 아니라 JSX라고 부르는 자료가 됩니다.

이런 자료를 타입지정하고 싶으면 JSX.Element 라는 타입을 쓰시면 됩니다.
```
let 박스 :JSX.Element = <div></div>
let 버튼 :JSX.Element = <button></button>
```
이러면 끝입니다.





실은 더 정확히 타입지정하시려면
```
<div> <a> <h4>
```
같은 기본 태그들은 JSX.IntrinsicElements 라는 이름의 타입을 쓰면 됩니다.



let 박스 :JSX.IntrinsicElements['div'] = React.createElement('div');
let 버튼 :JSX.IntrinsicElements['button'] = <button></button>;
위처럼 button 이런 간단한 태그를 타입지정하고 싶으면 저렇게 쓰십시오.

참고로 React.createElement('div') 이건
```
<div></div>
```
가 남습니다.

JSX 안쓰면 createElement 라는 이상한 함수로 리액트 코딩하셔야합니다.















3. function component 타입지정


```
function App () {
 return (
   <div>안녕하세요</div>
 )
}
```
리액트의 컴포넌트는 이렇게 생겼습니다.

컴포넌트 타입지정은 어떻게 하게요

당연히 함수니까 파라미터와 return 타입지정하면 됩니다.

파라미터는 항상 props기 때문에 props가 어떻게 생겼는지 조사해서 타입지정하시면 되고

근데 컴포넌트는 JSX를 return 한다는게 문제입니다. return 타입에 대체 뭘 기입해야하죠






```
type AppProps = {
 name: string;
};

function App (props: AppProps) :JSX.Element {
 return (
   <div>{message}</div>
 )
}
```
props 파라미터는 어떻게 생겼는지 조사해서 알아서 타입지정해주면 되고

return 타입은 JSX.Element 써주시면 됩니다. 근데 생략해도 자동으로 타입지정됩니다.



예전 문법은
```
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```
이상하게 생겼는데 곧 사라질 문법입니다.









4. state 문법 사용시 타입지정



state 만들 땐 그냥 자동으로 타입이 할당되어서 걱정할 필요는 없습니다.

state 타입이 나중에 변화할 수 있다고요? 그런 경우는 흔치 않겠지만 그러면 미리 지정하십시오.

 const [user, setUser] = useState<string | null>('kim');
그냥 <> 열고 타입넣으시면 됩니다.

Generic 문법을 이용해서 타입을 useState함수에 집어넣는 식으로 설정하면 됩니다.

















5. type assertion 문법 사용할 때


```
let code: any = 123;
let employeeCode = <number> code; //안됩니다
```
assertion 하고 싶으면 as 또는 <> 쓰면 되는데

리액트에서 컴포넌트로 오해할 수 있어서 꺾쇠 괄호는 리액트에서 쓰지않습니다.

as 키워드만 씁시다.

하지만 as 키워드는 타입스크립트 보안해제기 때문에 타입이 100% 확실할 때만 사용하도록 합시다.











결론은 타입스크립트 쓴다고 뭔가 리액트 개발방식이 달라지는게 아니라

함수 변수 정의부분 타입지정을 할 수 있다는 것만 달라집니다.

"props엔 무조건 { name : string }만 들어올 수 있습니다"

이런 문법을 작성하는게 끝이고 그냥 에디터 부가기능 수준일 뿐임

여러분이 변수 함수 class 타입지정 하는 법을 잘 배우셨으면 누구나 응용가능합니다.





 --------


 ### React + TypeScript 사용할 때 알아야할 점 2 : Redux toolkit


 redux 왜 쓰냐면 1. state를 한 곳에서 관리할 수 있어서 컴포넌트들이 props없이 state 다루기 쉽고

 2. 수정방법을 미리 reducer라는 함수로 정의해놔서 state 수정시 발생하는 버그를 줄일 수 있어서 씁니다.

 그 외엔 쓸데없음 코드만 길어짐



 - redux 공식 toolkit 라이브러리를 써서 이쁘게 코드짜는 신규방식 redux

 - 예전처럼 if문 switch문 그런거 쓰는 전통방식 redux

 둘 다 타입지정 어떻게 하는지 알아봅시다.  

 역시 이번 강의도 Redux 모르면 굳이 들을 필요는 없습니다.









 (전통방식 redux) state와 reducer 만들 때 타입지정 필요  



 redux를 사용하고 싶으면 npm install redux react-redux 이 명령어로 설치하면 됩니다.

 redux는 걱정할 필요없이 type 정의가 미리 잘 되어있어서 그냥 설치하면 됩니다.





 일단 예제로 button 버튼을 누르면 state가 +1, -1 되는 예제를 만들어보도록 하겠습니다.

 그러려면 state가 하나 필요하겠죠? 그리고 +와 - 하는 방법을 정의해둔 reducer도 필요할 것 같군요.

 파일 여러개로 나누면 이해가 어려우니 보기쉽게 index.ts에 필요한 모든 코드를 적어왔습니다.


 ```
 import { Provider } from 'react-redux';
 import { createStore } from 'redux';

 interface Counter {
   count : number
 }

 const 초기값 :Counter  = { count: 0 };

 function reducer(state = 초기값, action :any) {
   if (action.type === '증가') {
     return { count : state.count + 1 }
   } else if (action.type === '감소'){
     return { count : state.count - 1 }
   } else {
     return initialState
   }
 }

 const store = createStore(reducer);

 // store의 타입 미리 export 해두기
 export type RootState = ReturnType<typeof store.getState>

 ReactDOM.render(
   <React.StrictMode>
     <Provider store={store}>
       <App />
     </Provider>
   </React.StrictMode>,
   document.getElementById('root')
 )
```

 적은 코드 설명을 하자면

 1. 지금 initialState = { count: 0 } 이렇게 생긴 state 초기값을 만들었고

 2. function reducer를 만들어서 state가 변경되는 방법을 미리 정의해뒀습니다. 변경방법은 1. 증가 2. 감소 두 개 입니다.

 3. createStore 이런 나머지는 자잘한 기본 셋팅 문법입니다. 이해 필요없음



 지금 딱 봐도 변수와 함수 보이죠? 타입지정 하고 싶으면 하십시오

 그래서 redux 쓸 때는 똑같이 state 초기값과 reducer 함수의 타입지정 잘하면 됩니다.



 (1) 초기값 변수 오른쪽에 타입지정 잘 해주십시오.

 (2) reducer 함수는 state, action 이 이름의 파라미터 2개 타입지정 잘 해주십시오.

 실은 state는 타입지정 필요없습니다 초기값 넣으면 타입지정 잘 됩니다

 action은 님들이 나중에 dispatch 날릴 때 object 자료 집어넣죠? 그거랑 똑같이 생겨야합니다.

 그래서 그거 그대로 타입지정해주면 되는데 대부분 { type : string, payload : number } 이런 식으로 생겼을 겁니다.

 위에선 any라고 대충 써넣음 님들이 채워보셈



 (3) 마지막으로 심심하면 reducer 함수의 return 타입도 타입지정 잘 해보십시오.

 어떤걸 return 해줘야할지 적어두시면 됩니다. 딱봐도 초기값이랑 유사하게 생기면 될 듯





 그리고 간혹 오해하시는 것들이 있는데

 reducer 타입지정은 전부 reducer 안의 코드들을 잘못 짜서 생기는 버그를 약간 방지하는 용도입니다.

 App.tsx 이런 곳에서 dispatch() 를 잘쓰냐 못쓰냐는 캐치해주지 않습니다.


 (전통방식 redux) state를 꺼낼 때



redux에 있던 state를 가져오려면

mapStateToProps도 있지만 useSelector 훅을 쓰시면 간단한걸 쉽게 가져올 수 있습니다.

그리고 state를 변경하려면 useDispatch 훅을 쓰면 dispatch를 간단히 날릴 수 있습니다.


```
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import {RootState} from './index'

function App() {
  const 꺼내온거 = useSelector( (state :RootState) => state );
  const dispatch :Dispatch = useDispatch();

  return (
    <div className="App">
      { 꺼내온거.count }
      <button onClick={()=>{dispatch({type : '증가'})}}>버튼</button>
      <Profile name="kim"></Profile>
    </div>
  );
}
```
1. useSelector를 쓰면 redux에 있던 state 빼오기 쉽습니다. 안에 콜백함수 넣으면 거기 있던 파라미터가 그대로 state임

2. useDispatch를 쓰면 redux로 수정요청을 날릴 수 있습니다. type을 잘 기입하시면 미리 정의해뒀던 수정방법이 동작함

위에선 버튼 누르면 증가하라고 해놨네요



타입지정은 그냥

(1) useSelector() 안에 파라미터 있는데 거기 하십쇼

state가 어떻게 생겼는지 파악한 다음 타입알아서 손수 지정해주시거나 아니면

귀찮으면 index.ts에서 타입을 export 해서 가져와도 됩니다.

index.ts 에 있던 export type RootState = ReturnType<typeof store.getState> 이 코드가

store의 타입을 미리 export 해두는 방법입니다.



(2) useDispatch도 타입지정하면 좋은데
```
import {Dispatch} from 'redux'
```
이렇게 타입을 가져오셔서

const dispatch :Dispatch 이렇게 쓰면 됩니다.

그럼 dispatch 날릴 때 안에 파라미터 안쓰면 에러내줌













(신규방식 redux) state와 reducer 만들 때 타입지정 필요  



신식 redux를 사용하고 싶으면 redux, react-redux에 이어서
```
npm install @reduxjs/toolkit
```
이런 라이브러리를 추가로 설치해주면 됩니다.

그럼 이제 조금 더 깔끔하게 코드짤 수 있습니다.



위와 같은 예제로 button 버튼을 누르면 state가 +1, -1 되는 예제를 만들어보도록 하겠습니다.

index.ts에 필요한 모든 코드를 적어왔습니다.




```
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const 초기값 = { count: 0, user : 'kim' };

const counterSlice = createSlice({
  name: 'counter',
  initialState : 초기값,
  reducers: {
    increment (state){
      state.count += 1
    },
    decrement (state){
      state.count -= 1
    },
    incrementByAmount (state, action :any){
      state.count += action.payload
    }
  }
})

let store = configureStore({
  reducer: {
    counter1 : counterSlice.reducer
  }
})

//state 타입을 export 해두는건데 나중에 쓸 데가 있음
export type RootState = ReturnType<typeof store.getState>

//수정방법 만든거 export
export let {increment, decrement, incrementByAmount} = counterSlice.actions
```
그리고 하단엔 <Provider store={store}> 이런 코드 추가해주면 끝입니다.





적은 코드 설명을 하자면

1. createSlice() 로 slice 라는걸 만들어줍니다. slice는 state와 reducer를 합쳐놓은 새로운 뭉텅이라고 보시면 됩니다.

2. slice 안에는 slice 이름, state초기값, reducer가 정확한 이름으로 들어가야합니다. 맘대로 작명 불가

3. state는 그냥 맘대로 만드시면 되고 reducer는 함수 형태로 만들어주면 됩니다. 첫 파라미터는 state, 둘째는 actions가 자동으로 부여됩니다.

4. 다 만든 것들은 configureStore 안에 등록하면 됩니다.

5. 내가 만들어둔 reducer를 쓰고 싶으면 reducer 안의 함수명을 export 해주시면 됩니다.

6. 나머지는 필요없는 셋팅문법임





타입지정은

(1) state 초기값 타입지정 알아서 해주십시오

(2) reducer 안의 action 파라미터의 타입지정 해주십시오

(3) 나머지는 타입지정 필요없습니다. 자동임







action 타입지정은 방법이 따로 있는데
```
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

(상단 생략)
  incrementByAmount (state, action: PayloadAction<number>){
      state.value += action.payload
  },
  ```
이렇게 타입지정하라고 권장합니다.

나중에 dispatch할 때 보내는 데이터가 있으면 그걸 payload 라고 부르는데

그 자료의 타입을 <> 안에 집어넣어서 타입지정하라는 소리입니다.

문자를 payload로 보낼거면 string 집어넣으시고 그런 식입니다.











(신규방식 redux) state를 꺼낼 때   


```
import { useDispatch, useSelector } from 'react-redux'
import {RootState, increment} from './index'

function App() {

  const 꺼내온거 = useSelector( (state :RootState) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {꺼내온거.counter1.count}
      <button onClick={()=>{dispatch(increment())}}>버튼</button>
    </div>
  );
}
```
1. useSelector 함수를 쓰면 state를 쉽게 꺼낼 수 있습니다.

쓰는 법은 안에 콜백함수 ()=>{} 하나를 집어넣으면 되는데 그 함수의 첫 파라미터는 항상 state가 됩니다.

2. useDispatch 함수를 쓰면 쉽게 수정요청을 날릴 수 있습니다.







타입지정은 state와 dispatch에 해주시면 됩니다.

(1) useSelector() 안의 파라미터에 타입지정해주십시오.

state가 어떻게 생겼는지 파악한 다음 타입알아서 지정해주시거나 아니면

타입을 index.ts 이런 리듀서 만든 곳에서 미리 RootState라는 타입을 export 해두시면 저렇게 저처럼 import 해서 쉽게 타입지정이 가능합니다.



(2) useDispatch() 사용할 때 타입지정 가능한데 그냥 예전 방식처럼 하든가

아니면 공식 문서에서는

index.ts에서 export type AppDispatch = typeof store.dispatch 해두고

App.tsx에서 import 해와서 useDispatch<AppDispatch>() 이렇게 타입지정하라고 되어있는데

저는 귀찮아서 이전 방식으로 씁니다.











역시 리덕스는 설계 부터 뭔가 잘못된 라이브러리입니다. 어떻게 해도 코드가 드러움

Vuex 보고 배워야합니다.


----------



### array 자료에 붙일 수 있는 tuple type


array 자료에 타입을 지정하고 싶으면 string[] 이렇게 기입하라고 했습니다.

하지만 보다 구체적으로 타입지정하고싶을 때가 있습니다.

"첫 자료는 무조건 string, 둘째 자료는 무조건 number인 array"

이런 것도 가능합니다. tuple 타입 쓰면 됩니다.









Tuple 타입



tuple type은 array에 붙일 수 있는 타입인데

자료의 위치까지 정확히 지정할 수 있는 타입입니다.


```
let 멍멍이 :[string, boolean];
멍멍이 = ['dog', true]
```
[ ] 괄호 안에 타입 적으시면 tuple type이 됩니다.

[ ] 안에 차례로 세부 타입을 기입하면 됩니다.

그럼 정말 첫 자료는 무조건 string, 둘째 자료는 무조건 boolean만 허용해주고 다른게 들어오면 에러로 잡아줍니다.











Tuple 응용 : rest parameter


```
function 함수(...x :string[]){
  console.log(x)
}
```
함수 정의할 때 파라미터 왼쪽에 점3개 붙이면 rest parameter라고 했습니다.

"여기에 파라미터가 몇 개 들어올지 아직 몰라요~" 라는 뜻으로 사용하는 파라미터입니다.

x 자리에 입력한 파라미터들은 array에 담겨오기 때문에 array 처럼 타입지정을 해주는게 일반적입니다.

근데 tuple을 이용해서 타입지정을 해주는 것도 가능








```
function 함수(...x :[string, number] ){
  console.log(x)
}
함수('kim', 123)  //가능
함수('kim', 123, 456)  //에러
함수('kim', 'park')  //에러
```
rest parameter를 엄격하게 사용가능합니다.

일반 파라미터 2개 넣는 것과 기능상 다를 바는 없는데

차이는 rest parameter 쓰시면 파라미터가 전부 array에 담겨서 오는게 차이입니다.













tuple 안에도 옵션가능


```
type Num = [number, number?, number?];
let 변수1: Num = [10];
let 변수2: Num = [10, 20];
let 변수3: Num = [10, 20, 10];
```
물음표 넣어서 옵션이라고 표현가능합니다.

하지만 이런 코드는 어떻습니까.






```
type Num = [number, number?, number];
이거 말이 됩니까
```
array 중간에 있는 자료는 옵션이라고요?

중간을 빼고 만들 수도 없고 뭔가 논리적으로 이상합니다.



그래서 ? 옵션기호는 뒤에만 붙일 수 있습니다.

물음표 2개 쓰고 싶으시면 뒤에서 2개만 붙일 수 있음

물음표 100개 쓰고 싶으시면 뒤에서 100개만 붙일 수 있음













array 두개를 spread 연산자로 합치는 경우 타입지정은?


```
let arr = [1,2,3]
let arr2 = [4,5, ...arr]  
```
점 3개 spread 연산자를 사용하면 array의 괄호를 벗겨준다고 했습니다.

그래서 위 예제처럼 쓰면 array 두개를 합치고 그럴 수 있습니다.

근데 그럼 arr2 타입지정은 대체 어떻게 해야할까요 tuple 타입으로요.

arr 자리에 자료 몇개가 들어올지도 모르는 상황이라면요








```
let arr = [1,2,3]
let arr2 :[number, number, ...number[]] = [4,5, ...arr]  
```
tuple 타입에 점3개 붙이면 됩니다.

점3개 붙이면 아직 여기에 몇개의 자료가 들어올지 모른다는

rest parameter 같은 느낌으로다가 활용가능합니다.






```
let arr2 :[number, number, ...number[]] = [4,5,6,7,8,9,10]  
```
rest parameter 처럼 맘껏 집어넣을 수 있습니다.













(숙제1) 여러분이 최근에 사먹은 음식의 1. 이름 2. 가격 3. 맛있는지여부를 array 자료에 담아보고 타입지정까지 해보십시오.

오늘 배운 tuple 타입으로 타입지정합시다.

쉬워서 답은 생략합니다.



(예시) [ '동서녹차', 4000, true ] 이런 자료 만들고 타입지정하라는 소리입니다.







(숙제2) 이렇게 생긴 자료는 타입지정 어떻게 해야할까요?

```
let arr = ['동서녹차', 4000, true, false, true, true, false, true]
```
몇개인지는 모르겠지만 true와 false가 셋째 자료부터 잔뜩 들어올 수 있다고 합니다.

tuple 타입과 spread 연산자를 써보도록 합시다.


------------


아이쉽다

```
type Arr = [string, number, ...boolean[]]
let arr :Arr = ['동서녹차', 4000, true, false, true, true, false, true];

```


(숙제3) 함수에 타입지정을 해보도록 합시다.
```
function 함수(){

}
```
1. 이 함수의 첫째 파라미터는 문자,

2. 둘째 파라미터는 boolean,

3. 셋째 파라미터부터는 숫자 또는 문자가 들어와야합니다.

그럼 함수에 파라미터를 어떻게 만들고 타입지정은 또 어떻게 해야할까요?

오늘 배운 tuple 타입과 rest parameter를 사용해봅시다.

-------


누르면 바보
```
function 함수(...rest :[string, boolean, ...(number|string)[] ]){
}


함수('a', true, 6, 3, '1', 4)
```
이렇게 하면 잘 되는군요
