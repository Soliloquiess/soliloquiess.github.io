---
title: "[Springboot] Springboot 스터디 5일차"
layout: post
subtitle: Springboot
date: "2021-06-28-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

페이징 처리 후
검색 된 번호 게시글 수 이런게 같이 이어져야 한다ㅣ.

검색 버튼 누르면 넘어가는 6가지.

컨트롤러에서도 변경해야 한다.

검색 하고 수정하면 에러나지만(지금은)
정보를 가지고 넘어와야 되는데 보드의 서치에선 정보를 아직 안 넘겨줌. 그래서 보드 컨트롤러가서 수정해야

페이지 정보도 같이 가서 수정해야한다.

전체 : 315건
"수정" 이라는 검색어가 포함된 게시글 수를 조회해보면 100번있다

이 100건을 가지고 조회해야한다.

이 토털카운트 계산할 때
여기선 조회된 게시글 수를 있는지 없는지 확인하지 않고 무조건 검색할 것이다.

검색 했을때 8페이지 갔다가
(검색어를 포함하지 않은 페이지에서 8페이지 가고 )
수정 검색하면 8페이지보다 더 작은 페이지가 생길 수 있다.

그럼 전체 검색해서 있는 페이지가 있을 수 있는데 만약 검색했을 떄 페이지 번호를 몇부터 시작할거냐

검색 했을 때 1페이지로 리셋 시켜 줄 것이다.
![20210628_201913](/assets/20210628_201913.png)

오라클이 아닌거도 나온다.

오라클인거만 나와야 하는데

키워드가 주소창에 안 딸려 온다(키워드 포함해서 )

자바 눌렀을 떄 안나온다. 왜?

보드클릭후 list로 보낸다.

이렇게 주소창으로

모델 등록한게 비어씼느지 아닌지

![20210628_190719](/assets/20210628_190719_fvyffd147.png)

상위 객체가 등록이 안되서 객체까지 넣어줘야 한다.

20페이지씩 보기 옵션 넣기 추가하겠다..
.

표현언어 = $로 모델이나 객체 가져오는 것

![20210628_195344](/assets/20210628_195344_8tkebeg5f.png)

html에서도 가져올 수 있지만 자스에서도 가져올 수 있고 타임리프에선 이런식으로 쓴다.
"문자열 안에 대괄호 두번 작성하고 표현언어 작성하면 페이지 객체의 페이지 넘버 가져온다.
\
페이지가 처음 열렸을 떄 보면 10줄보기 20줄 보기 30줄 보기가 선택 안된상태에선 첫 옵션이 나오는데 기본 값은 10줄보기가 기본값이고 페이지도 10페이지 보기가 기본값.
기본값 초기화 먼저

아이디가 rowsPerPage 밑에 옵션태그에 밸류가 rowsperpage인 애를 선택해서 속성을 selected로 지정하면 그게 선택이 된다.

바꾸고 페이지 가보면

![20210628_195433](/assets/20210628_195433.png)

페이지당 게시글 수 초기화

노출 페이지 수 초기화

---

변경 이벤트는 아이디가 셀렉트 태그
원래 기본은 10줄 보기로 되어있는데 20줄 보기로 바꾸면 줄보기 변경 이벤트가 동작하는데 그때 변경된 값을 받아온다.

this.val로 20줄 보기 선택했는데 20 을 value에서 가져옴.
rowsperpage에 지정하고 url 경로를 board의 list로가는데 넘버는1로 바꾸고 원래는 10이였는데 20으로 바꿈.

나머지는 페이지가 열릴떄 지정된 기본값으로 가져감.

홑따옴표 쌍따옴표 나누는 이유?
'' 와 "" 차이는 ''는 객체 가져온다로 의

따옴표를 써야하는 경우.  
쌍따옴표 안에 쌍따옴표 쓰면 안됨.
쌍따옴표를 전체로 감싸면 홋따옴표만 가능하고

그 반대도 가능하다.

문자열에 또 문자열(따옴표)가 들어갈 경우만 주의 하면 된다.

페이징 처리 하기 위해서 계산되어야 하는 정보가 있다
검색어 수가 있고 페이지 개수가 있고 이런식.

게시글을 유연하게 볼 수 있다.

메일 같은거 보는데도 10개씩이나 5개씩 보면 페이지 넘어가야하니까 한번에 많은거 보려면 20~30개 보고 찾고 할 수 있다.

페이징 처리

---
