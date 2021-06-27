---
title: "[Springboot] Springboot 스터디 3일차"
layout: post
subtitle: Springboot
date: "2021-06-27-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---



### 페이징 구현

키워드가 없이 목록을 조회한 경우와 검색어 없을 경우로 나눠서 생각을 해야한다.
ㅇㅇ

정해지지 않은 값이면 10 주고 따로 지정해 둔 값이 있으면 그 값 세팅.
그리고 페이지 만들고 조회 요청 보냄

해당 페이지 객체에 세팅된 정보에 따라 게시글 정보만 가져옴.


글번호가 아니라 실제 번호 확인하고 싶으면? 글번호는

어노테이션 쓰면 변수의 초기값 0으로 등록

tmp로 테이블 이름 등록하고 감싸는 안에서 rownum이라는 변수 안에서 사용

board_no =3 처럼 

row_no 으로 별칭 주고 1~10까지 나옴

파라미터 ㅂ
b.* 는 board 테이블의 모든 컬럼.

@을 이용해서

페이지 클래스에서 생성자로 파라미터 넘어오는데 필수 값이 번호, 게시물수 노출페이지수 전체페이지수였는데 그 필수 정보를 가져오고 스타트 로우인덱스로 계산해준다.

@rownum 이 다 가져온다.

board

byzero라고 나온다. 페이지 생성할 때 들어가게 되면
페이지를 1로 넣어주는데 

페이지 객체를 파라미터로 가져오면 기본 생성자가 됨.
 
 
 this 메서드 쓰면 하나의 생성자에서 다른 생성자를 사용 가능하다


select 를 쓰면 조회가 가능한데 조회한 결과를 추가 가능하다 . select 결과를 insert 하기

select title, writer, content


intsert i


페이지 번호를 보여줘야 한다.
저기 주소에 바뀐게 넘어간게 보이는데 정보가 넘어가야 바뀌는게 보인다.

1페이지에서 이전은 없어야 한다.(이전 페이지는 존재하지 않으므로)

.
