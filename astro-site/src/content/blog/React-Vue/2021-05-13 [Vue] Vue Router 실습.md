---
title: "[Vue] Vue Router 실습"
date: 2021-05-13
category: "React-Vue"
tags: ["Vue"]
description: "Vue 프로젝트의 진입 구조(index.html, main.js, App.vue)와 Vuex의 state·actions·mutations 흐름, axios 비동기 통신, computed 속성을 실습으로 정리한 학습 노트입니다."
permalink: "class/2021/05/13/Vue-Router정리"
---

## 프로젝트 진입 구조 (index.html → main.js → App.vue)

- `public` 밑에 `index.html`이 있다. build하면 필요한 라이브러리와 css, html 등을 묶어 배포할 파일이 만들어지고, 그걸 STS에 넣는다.
- `main.js`는 프로젝트 전체에서 **가장 상위에 있는 스크립트 파일**이라고 생각하면 된다.

![main.js에서 렌더링하는 코드](/assets/20210518_233435.png)

여기서 렌더링해서 HTML 문서의 `#app`을 마운팅시킨다.

진입 순서를 정리하면 다음과 같다.

1. 맨 처음 `index.html` 문서가 있다.
2. `index.html`에 `main.js`가 들어간다.
3. `main.js`는 `App.vue`를 import해서 화면을 생성하고, 생성된 결과를 `#app`에 mount시킨다.

![App.vue를 import해 #app에 mount하는 흐름](/assets/20210518_233729.png)

컴포넌트 포함 관계는 다음과 같다.

- `main.js` 안에 `App.vue`가 들어간다.
- `App.vue` 안에 `header.vue`, `list.vue`, `footer.vue`가 들어간다.

## Vuex(store) 기본 개념

`vuex`는 보통 **store**라고 부른다. 여러 개의 뷰 파일에서 같은 데이터를 가져다 써야 하는 상황에 쓰는 것이 store다.

| 구성 | 역할 |
| --- | --- |
| state | 저장하고 공유할 데이터 |
| actions | 서버(Rest server)에서 비동기 통신을 수행 |
| mutations | 데이터를 수정하고 영향을 주는 부분 |

----

## App.vue와 라우터 등록

`App.vue`는 컴포넌트 중 **가장 상위에 있는 컴포넌트**다. import한 라우터를 여기 집어넣는다.

![App.vue에 라우터를 등록하는 코드](/assets/20210519_003432.png)

- 괄호 안에 들어 있는 대상(라우터)을 여러 컴포넌트에서 사용할 수 있도록 한다. (뷰 파일이 굉장히 많은데, 라우터를 모든 곳에서 쓸 수 있게 하는 것)
- import하지 않고도 바로 사용할 수 있게 한다.
- `main.js`에서 `Vue.use(...)`로 괄호 안의 대상을 등록한다.

![main.js에서 Vue.use로 라우터를 등록](/assets/20210519_003842.png)

이런 식으로 라우터를 import하지 않고도 Vue Router를 통해 각 컴포넌트에서 `this.$router`로 접근한다.

`router.js`의 `export default`는 "이러이러한 경로를 들고 있다"는 뜻이다. (매핑 정보를 export해서 Vue 객체에 등록한다.)

![router.js의 매핑 정보 export](/assets/20210519_004534.png)

-----

## store.js 와 상태 변경 흐름

`store.js`에서 희미하게 색이 빠진 것은 **import한 뒤 안 쓴 것**이다.

![store.js 코드](/assets/20210519_010025.png)

상태 변경 흐름은 다음과 같다.

1. 화면에서 action을 요청 → `dispatch` 함수 호출
2. action에서 mutation 호출 → `commit` 호출
3. mutation에서 DB 접근

`mutation`은 데이터를 건드릴 수 있어서 `state`를 사용할 수 있다.

![axios import 및 action 정의](/assets/20210519_015931_fz2hexdxs.png)

- axios 객체를 사용하기 위해 import한다.
- `store.commit`은 mutation을 부르는 것이고, 아래의 mutation도 메서드다.

![store.commit으로 mutation 호출](/assets/20210519_021850.png)

`store.commit`을 하면서 아래 mutation 중 하나를 호출하는데, 여기서 `alltodo`가 mutation 이름이다.

- action의 메서드 이름도 `alltodo`, mutation의 메서드 이름도 `alltodo`로 **맞춰 둔다**.
- commit하면 해당 메서드를 호출한다.
- `alltodo`를 호출하면서 `todolist: response.data`를 가져간다.

여기서 `payload`는 JSON이고, 실제 데이터는 `todolist: response.data`이다.

- JSON 전체가 `payload`이고, 그 안에서 `todolist`라는 키를 가진 값을 꺼내달라는 것이다.

![payload에서 todolist 키를 꺼내는 코드](/assets/20210519_023057.png)

다음처럼 줄여서 쓰는 것도 가능하다.

![축약형 작성 예시](/assets/20210519_023136.png)

- 아직 action을 호출하는 쪽은 없다.
- action 중 `alltodo`를 호출하고 `store.commit`해서 payload를 전달해 세팅하도록 한다.

![action에서 commit으로 payload 전달](/assets/20210519_023301.png)

그러면 여기 `todolist` 배열에 저장이 된다.

## 받는 쪽: todoList.vue

`todoList.vue`는 리스트를 전부 화면에 뿌려줘야 하는 컴포넌트다.

- `li` 태그에서 `v-for`를 돌면서 데이터를 뿌린다.
- 원래는 부모에서 받은 props였는데, 이제는 부모에서 받는 게 아니라 **vuex store.js에서 꺼내오면** 된다.

![v-for로 리스트를 뿌리는 코드](/assets/20210519_024004.png)

부모가 주는 것이 없고, 실행되자마자 데이터를 받아와서 뿌려야 한다.

- axios의 get을 통해, `list.vue`가 실행되자마자 화면에 뿌려야 한다.
- 그래서 `method` 앞에 `created`를 추가한다. (화면에 내용이 보여지기 전에 실행)

store 접근과 action 호출 방법은 다음과 같다.

- store 접근: `this.$store`
- action 호출: `dispatch`로 호출하고, 호출할 action 이름을 괄호에 적는다.

```
this.$store.dispatch("ALLTODO")
```

![created에서 dispatch로 action 호출](/assets/20210519_025013.png)

이러면 action call이 되고, action이 mutation에 신호를 보내 `todolist` 세팅을 끝낸다. 그러면 가져다 쓰면 된다.

## computed 속성

작업할 때 사용하는 데이터가 변했으면 `computed` 속성을 만든다.

- 생긴 건 함수처럼 생겼는데, **데이터처럼** 쓸 수 있다.
- 반드시 `return`해서 값을 줘야 한다.
- 여기서 체크하는 데이터는 `state.todoList`이다. action을 하면 state 값이 바뀌게 되고, 그 값을 return한다.

생긴 건 함수처럼 생겼지만, 쓸 때는 변수처럼 쓴다.

![computed 속성 정의](/assets/20210519_025445.png)

## 삭제 기능 (emit → store dispatch)

아래는 번호 하나를 주면 삭제되는 기능이었다. 원래는 `emit`해서 부모에게 신호를 보내 삭제했었다.

![기존 emit 기반 삭제 코드](/assets/20210519_025528.png)

이제는 이렇게 하지 않고, store에 있으니 비동기 요청으로 처리한다.

```
this.$store.dispatch()
```

- 항상 action을 호출해야 한다.
- `ALLTODO`가 호출하는 메서드였으니, 여기서도 메서드를 선언하고 실행해야 한다.
- 그리고 파라미터(수정할 대상)를 보내야 하는데, 이것이 받는 쪽에서는 `payload`로 간다.

![dispatch로 삭제 요청 전달](/assets/20210519_025648.png)

- 뒤에 삭제할 번호가 붙는다.
- 번호만 단독으로 붙어서, `num`이 `payload`로 온다.

----

## 라우터 매핑과 detail 페이지 이동

넘어가는 정보는 `router.js`에 있다.

![router.js 매핑 정보](/assets/20210519_045021.png)

![detail 경로 매핑](/assets/20210519_045314.png)

매핑 정보는 이렇게 구성된다.

- push하면서 detail로 넘어가고, 뒤에 num이 붙는다.

`state`는 action에서 직접 못 건드린다. 그래서 mutation에 부탁해서 연결한다.

![mutation을 통한 state 연결](/assets/20210519_122452.png)

- commit으로 mutation을 call한다.
- 실제 값은 `response.data`이고, 이름은 `todo`이다.

![commit으로 mutation에 값 전달](/assets/20210519_123158.png)

![mutation에서 state 세팅 1](/assets/20210519_123243.png)

![mutation에서 state 세팅 2](/assets/20210519_123332.png)

![mutation에서 state 세팅 3](/assets/20210519_123417.png)

`dispatch`해서 action을 호출하면, 갔다 와서 mutation을 호출해 state를 세팅하는 데까지 진행된다.

이제 store에 저장되어 있는 것을 가져다 쓰면 된다.

> `computed`는 함수처럼 생겼지만, 실제 쓸 때는 데이터처럼 쓴다고 했다.
