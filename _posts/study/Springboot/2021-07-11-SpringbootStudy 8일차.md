---
title: "[Springboot] Springboot 스터디 8일차"
layout: post
subtitle: Springboot
date: "2021-07-11-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---



댓글 처리


댓글 예시

댓글을 작성하는 건 글 읽기 해서 해당 게시글 밑에 작성하는 거니까



먼저 댓글 목록 먼저 조회 할 것.

댓글 목록 조회

board/list가 아니라 다른 방식으로 요청


1. 댓글 게시글 읽기화면에서도 보이게 되고
2. 등록할 때도 보이게 되고
3 .댓글을 수정할 때도 변경할 것


###

서비스 요청은 public List<Reply> replyList(Integer boardNo); 글번호 넘겨줘서 알게
여러개의 댓글 가져올 거고



쿼리는 reply 테이블에서 조회하게 할 것.

### Mapper


3-1 pub


보여질 뷰 페이지는 reply/list.html으로 보여지게 할 것이다.


댓글 글 쓰기

board/replyRegister 로 post로 요청만 보낼거(따로 화면 없을 예정)
댓글 자체로만 매핑이 되야됨(get방식으로 매핑 되는 부분이 없고 post로만 보낼 예정)



service에서 replyRegister라 하고 객체를 넘겨주면서 등록을 하도록 한다.



void replyCreate(Reply reply)

ㅑㅜㄴㄷㄳ ㅑㅜ새 ㅠㅐㅁㄱㅇ_ㄱ데ㅣㅛ ㅠㅐㅁㄱㅇ_ㅜㅐ, 채ㅜㅅ둣, ㅈ걋ㄷㄱrk emfdjrkf rj.


html 은 따로 존재할 거 없을거.

댓글 등록하면 응답할 건 없을 얘정

reply에 list.html가 응답될 거.

--------------



댓글 목록 새로 조회하고 새로 그 화면 보여줄 것.

제이쿼리에서 에이젝스로 비동기 요청 보낼거

그거 하기 전에 수정부터 만들자


댓글 등록과 유사할 텐데

board/ replyModify 댓글 수정 처리

게시글 읽기 페이지 자체에서 수정 영역이 나오고 그 영역에서 수정하고 수정하는거라 따로 요청하는 request 요청이 없다.

매퍼에선 insert 대신 update로 작업을 해줘야 한다.

그리고 변경해줘야 하는건 writer,(t실제에선 writer를 수정 거어어의 안함)
content,
조건은 해당게시글

내가 작성한 게시글을 수정해야되니까
댓글 번호를 기준으로 수정하자.
댓글 수정하고 수정된 내용까지 포함된 댓글 목록을 다시 응답 받아서 글 읽기 화면에서 그 영역만 세팅할 것.

새로 등록된 댓글 포함한 댓글 다시 가져옴
그때 그 화면을 데이터라는 이름으로 뷰페이지 가져오는데
전달 받아와서 기존에 있는 댓글 목록은 클리어시킴.

empty쓰면 그 요소 다 지워주고 append는 엘리먼트 추가됨.



댓글 작성했었는데 칸을 비워줄거(댓글입력상자)

boardNo
Register 내용 글번호 가져와서 writeReply 함수로 호출하면 에이잭스로 호출해서 비동기 요청 딱 보내면 boardController에 매핑되어있는 객체가 reply로 가져와서 매핑받고 replyRegister 로 등록하고 글 번호로 가지고 댓글 목록을 가지고 모델에 등록하면 reply에 list라는 뷰페이지를 응답한다.


응답하면 read.html안의 요청안에서 데이터라는 매개변수 이름으로 reply에 list라는 뷰페이지 전달 받고 그 뷰페이지 안에서는 댓글이 새로 갱신된 내용이 넘어옴. 그 기존에 있던 댓글목록은 비우고 새로 갱신한다ㅏ.


이 페이지 자체를 데이터라는 변수로 데이터를 가져옴

댓글 등록하고 목로겡 포함되는지 보자


댓글 이벤트를 다시 가져오면 다시 실행해줘야하는 의무가 있다.

수정 삭제 요청하는거
