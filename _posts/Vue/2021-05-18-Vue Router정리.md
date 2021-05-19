---
title: "[Vue] Vue Router 실습"
layout: post
subtitle: Vue
date: "2021-05-13 19:45:51 +0900"

categories: class
tags: Vue
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

 public 밑에 index.html 가 있었고 build하면 필요한 라이브러리와 css,html등 묶어서 배포할 파일 그걸 sts에 넣음.

 main.js = 프로젝트 전체에서 가장 상위에 있는 스크립트 파일이라 생각하면 된다.

 ![20210518_233435](/assets/20210518_233435.png)

 여기서 렌더링 해서 html 문서의 app를 마운팅 시킴

 그리고 app가서

 맨 처음에 index.html 문서 있었고
 index.html 에 main.js가 들어간다.

 main.js는 임포트함. app.vue를 임포트해서
 화면을 생성하고 생성된 결과를 #app에 mount시킴.

 ![20210518_233729](/assets/20210518_233729.png)

 main.js에 app.vue가 들어감.

 app.vue엔 header.vue, list.vue, footer.vue가 들어감.



 vuex는 store라 하는데 store로 여러개의 뷰 파일에서 그 데이터 가져다 써야해 이럴 수 있는 상황이 store.

 저장하고 공유할 데이터를 state,
 그리고 server(Rest server)에서 actions해서 비동기 통신 하는거고
 mutation이 수정하고 영향 주는 거

 ----

 APP.vue = 컴포넌트 중 가장 상위에 있는 컴포넌트의


 import 한 라우터를 여기 집어넣음.

 ![20210519_003432](/assets/20210519_003432.png)


괄호안에 들어있는 대상을 여러개의 컴포넌트에서 사용할 수 있도록 함.(뷰 파일이 굉장히 많은데 라우터라는 애를 사용할 수 있게함)
임포트 안하고 바로 사용할 수 있게 함.

Vue.use해서 괄호안에 들어있는 얘가 main.js

![20210519_003842](/assets/20210519_003842.png)

이런식으로
라우터 임포트 안하고 Vue라우터 해서 각각의 컴포넌트는 this.$router로 접근

router.js에 export default는 이러이러한 경로를 들고 있다는 뜻.(매핑정보를 export해서 vue객체에 등록한다.)

![20210519_004534](/assets/20210519_004534.png)

-----


store.js

희미하게 색깔 빠진건 import한 뒤 안 쓴거


![20210519_010025](/assets/20210519_010025.png)


화면에 action 요청하는게 dispatch함수 호출

action에서 mutation호출하는건 commit호출
그리고 뮤테이션에서 디비 접근
mutation은 data 건드릴 수 있어서 state 사용 가능
![20210519_015931](/assets/20210519_015931_fz2hexdxs.png)

axios 객체 사용하기 위해 임포트




store.commit은 mutation부르는 거

밑의 뮤테이션도 메서드임.

![20210519_021850](/assets/20210519_021850.png)
store.commit하면서 밑의 뮤테이션 중 하나를 호출하는데
alltodo가 뮤테이션 이름

액션에 있는 메서드 이름도 올투두 뮤테이션에 있는 메서드 이름도 올투두(맞춰둠)
커밋하면 메서드 호출

alltodo 하면서 todolist:response.data가져가겠다.


payload가 제이슨이고 실제 데이터는 todolist:response.data이다.

제이슨이 payload고 전체에서 그 안에서 todolist라는 키를 가진 애를 꺼내달라는 것.

![20210519_023057](/assets/20210519_023057.png)

만약 이렇게 안쓰고 줄이고도 가능하다

![20210519_023136](/assets/20210519_023136.png)

아직 action을 호출하는 쪽은 없음.
action중 alltodo호출하 store.commit해서 payload전달해서 세팅하도록

![20210519_023301](/assets/20210519_023301.png)

그럼 여기 todolist배열에 저장이 된다.


받는 쪽은 todoList.vue

리스트가 전부 다 뿌려줘야 되는 애.

li 태그에서 vfor를 돌면서 propsdata에서 돔. 부모에서 받아서 props였는데 부모에서 받는게 아니고 vuex store.js에서 꺼내오면 됨.

![20210519_024004](/assets/20210519_024004.png)

부모가 주는 게 없고


실행이 되자마자 받아와서 뿌려야 됨.

axios get에서 리스트.vue가 실행 되자마자 화면에 뿌려야 한다.

method 앞에다가 created를 추가한다.

화면에 내용이 보여지기 전.

store 접근하는 건 this.$store
action을 호출하는건 dispatch로 호출
그리고 호출하는 액션의 이름을 괄호에 적어줌.

this.$store.dispatch("ALLTODO")


![20210519_025013](/assets/20210519_025013.png)

이러면 Action call이 되고 액션이 뮤테이션에 보내서 신호를 받아서 todolist세팅 끝냄.

그럼 가져다 쓰면 됨.


어쩌구저쩌구 작업할 떄 사용하는 데이터 변했으면

computed속성 만듬.

생긴건 함수처럼 생겼는데 데이터 처럼 쓸수 있다.

반드시 리턴해서 값을 줘

자기가 체크하는 데이터는 state.todoList
액션하면 state값이 바뀌게 되서 그걸 리턴



생긴건 함수 처럼 생겼지만 쓸떄는 변수처럼 씀

![20210519_025445](/assets/20210519_025445.png)


밑에는 번호 한개 주면 삭제되는 거였는데 emit해서 부모한테 신호 보내서 삭제했었는데

![20210519_025528](/assets/20210519_025528.png)

이제 이렇게 안하고 비동기 요청하는거 (store에 있으니까)

this.$store.dispatch()
항상 액션을 호출해야.
ALLTODO가 호출하는 메서드였으니까 여기도 메서드 선언하고 실행해야.
그리고 파라미터 보내야(이거 수정해주세요)
이게 받는쪽에서는 payload로 감.


![20210519_025648](/assets/20210519_025648.png)

뒤에 삭제할 번호 붙음

번호가 혼자 붙음

num이 payload로 오는거



----


넘어가는 정보는 router.js에있다.

![20210519_045021](/assets/20210519_045021.png)

![20210519_045314](/assets/20210519_045314.png)

매핑정보는 이렇게 있다.

푸쉬하면서 detail로 넘어가고 뒤에num qnxsmsek.


stata는 액션에서 못 건드린다. 그래서 mutation에 부탁해서 연결한다.

![20210519_122452](/assets/20210519_122452.png)


커밋으로 뮤테이션을 콜한다.

실제 값은 response.data고 이름은 todo

뮤테이션한테

![20210519_123158](/assets/20210519_123158.png)


![20210519_123243](/assets/20210519_123243.png)


![20210519_123332](/assets/20210519_123332.png)


![20210519_123417](/assets/20210519_123417.png)

dispatch해서 액션 호출했더니 갔다와서 뮤테이션 호출해서 스테이츠 세팅하는 거까지 함.


store에 저장되어있는 걸 가져다가,


computetd는 함수처럼 생겼지만 실제 쓸데는 데이터 처럼 쓴다고 했다.
