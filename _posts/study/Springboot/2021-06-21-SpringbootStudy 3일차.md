---
title: "[Springboot] Springboot 스터디 3일차"
layout: post
subtitle: Spring
date: "2021-06-21-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

검색 구현

![KakaoTalk_20210621_194801492](/assets/KakaoTalk_20210621_194801492.png)

컨트롤러에 내용 넣고 그걸 모델에 담아 서비스로 보내고 매퍼를 통해 디비로 간 다음 받은 내용을 모델에 담아서 컨트롤러로 가져오고 그 가져온 내용을 컨트롤러를 통해 뷰로 보여준다.

```
use aloha;
select *
from board
-- where title like concat('%', #{keyword},'%')
where title like concat('%', #{keyword},'%')
	or content like concat('%', #{keyword},'%')
    or writer like concat('%', #{keyword},'%');


select *
from board
where reg_date >= date(now())-30;


select *
from board
where reg_date >= date(subdate(now(), interval 7 day));

-- 1 페이지
select *
from board
limit 0,10; -- index(순서번호), count(개수)

-- 2 페이지
select *
from board
limit 10,10; -- index(순서번호), count(개수)

-- 3 페이지
select *
from board
limit 20,10; -- index(순서번호), count(개수)


-- 일반적인 페이지
select *
from board
limit #{startRowIndex}, #{rowsPerPage};




```

[페이징 처리]

▶필수 값

현재 페이지 번호 : pageNum
페이지 당 게시물 수 : rowsPerPage

전체 데이터 개수 : totalCount
노출 페이지 개수 : pageCount

▶수식
시작 페이지 번호 : startPage
((현재 페이지 번호-1) / 노출 페이지 개수) \* 노출 페이지 개수 + 1

끝 페이지 번호 : endPage
((현재 페이지 번호-1) / 노출 페이지 개수) + 1) _ 노출 페이지 개수
4 _ 10 = 40
첫 번째 페이지 번호 : firstPage
1

마지막 페이지 번호 : lastPage
toatalCount % rowsPerPage == 0
(전체 데이터 개수 / 페이지당 게시물 수)
else
(전체 데이터 개수 / 페이지당 게시물 수) + 1

이전 페이지 번호 : prev
현재 페이지 번호 - 1
다음 페이지 번호 : next
현재 페이지 번호 + 1

시작 글 index :
검색어 : keyword

ex. 전체 데이터 개수 : 127
페이지당 게시물 수 : 10
노출 페이지 개수 : 10
현재 페이지 번호 : 15

     시작 페이지 번호    : 11
     끝 페이지 번호      : 20 -> 13

     첫 번째 페이지 번호   : 1
     마지막 페이지 번호   : 13

     이전 페이지 번호   : 14
     다음 페이지 번호   : 16

---

---212건 ---
---10건씩 ---
---총 22페이지 ---
---현재 14페이지---

시작 페이지

---

(11-1 / 10) _ 10 + 1 ---> 11
(14-1 / 10) _ 10 + 1 ---> 11
15 ---> 11
16 ---> 11
17 ---> 11
.
.
(20-1 / 10) \* 10 + 1 --> 11

---

끝 페이지

---

((11-1 / 10) + 1) \* 10 --> 20
..
..

((20-1 / 10) + 1) \* 10 --> 20

---

시작 페이지

---

((1-1)/15) _ 15 + 1 --> 1
((14-1)/15) _ 15 + 1 --> 1
...
((15-1)/15) \* 15 + 1 --> 1

---

현재 페이지 : 33

---

시작
((33-1)/15) _ 15 + 1 --> 31
끝
((33-1)/15 + 1) _ 15 --> 45

---

1~15
16~30
31~45
36~60

1.............10
11....14.......20
21 22

시작 : 11
끝 : 20
첫 : 1
마지막 : 22

이전 : 13
다음 : 15

---
