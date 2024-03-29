---
title: "[Spring] SpringStudy-5일차"
layout: post
subtitle: Spring
date: "2021-05-08-23:48:51 +0900"

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

fetch는 필요하지 않으면 로딩하지 않는다..

그냥
@ManyToOne쓰면 회원까지 같이 가져오는데
fetch=lazy로 회원까지 같이 가져오지는 않게 한다.

두 엔티티각의 연관관계를 맺으면 쿼리를 실행하는 입장에서 두개 이상의 테이블로 생성되기 떄문에 조인이 필요하게됨.

@ManyToOne은 FK쪽의 엔티티를 가져올 떄 pk쪽의 엔티티도 가져옴.

![20210508_042622](/assets/20210508_042622.png)

이 부분은 Board부분만 가져오는게 아닌 ManyToOne으로 인해서 member를 조회하는 Board를 보여줌.

manytoONe은 즉시로딩으로 필요한거(연관된 부분)을 즉시 가져옴.

근데 조인을 하게 되면 테이블 여러개를 가져오게 되므로 성능 저하가 일어남.

그래서 권장하는 방법이 필요할 떄만 가져오게 하는 것.

![20210508_043757](/assets/20210508_043757.png)

replyTest에도 board뿐 아니라 member까지 같이 들어감.

```
Reply.java에서
@ManyToOne
   private Board board;
```

에서 board로 가고

```
Board.java
  private Member writer;

```

Board에서 회원을 가져옴.

그래서 댓글 하나를 가져왔는데 보드와 회원을 다 가져옴.(성능저하 발생)

@ToString(exclude = "writer") //toString사용시 필요없는 writer부분을 제외

fetch는 가져오는 방식.
Lazy방식은 필요하지 않으면 조회하지 않음.(Eager과 반대)

@ManyToOne의 경우 기본이 Eager 방식

가능하면 필요하지 않은 데이터를 가져오지 않도록 Lazy 로딩을 지정하는게 좋다.

![20210508_045244](/assets/20210508_045244.png)

no session이 나오면

디비 연결도 session이라 한다.

세션이란 말은 커넥션이란 말과 동일.

즉 위 에러는 디비 연결에서 에러가 발생했다는 뜻.
ManyToOne으로 줬기 때문에 getWriter참조에서 member테이블 로딩을 못하고 이미 디비가 끊겼기 떄문
이 경우에 no Session 에러가 발생. 다시 디비에 연결해 줘야 되는데 이 경우에 Transactional을 사용

새로운 연결이 필요한데 이 경우 트랜잭션을 사용하면 된다.

@Transactional은 해당 메서드를 하나의 트랜잭션으로 처리.

트랜잭션으로 처리하면 속성에 따라 다르지만. 기본적으로 필요한 부분이 나타나면 그 때 디비와 다시 연결이 생성됨.

![20210508_045933](/assets/20210508_045933.png)

---

스프링부트 2.0부터는 엔티티 내에 연관관계가 없더라도 조인 이용 가능(연관관계가 없어도 left join을 이용 가능)

![20210508_050636](/assets/20210508_050636.png)

Board의 경우 member를 물고 있음(연관관계 존재)

![20210508_050636](/assets/20210508_050636_gfrp5dc4r.png)

Reply에 Board를 물고 있음.

![20210508_050959](/assets/20210508_050959.png)

반대로 보면 Board에선 Reply를 물고있지 않음.

그래서 Board를 가져왔으면 Reply의 count라던가 요소를 가져올 수 없음.

그래서 양방향 연관관계를 썼는데 2.0으로 넘어와서 자유로워짐.

연관관계가 내부적으로 있으면 됨.

![20210508_051730](/assets/20210508_051730.png)

```
SELECT
board.bno, board.title,board.writer_email,rno,TEXT
FROM board LEFT OUTER JOIN reply
ON reply.board_bno =board.bno
WHERE board.bno = 100;

```

board와 reply 에 있는 bno 중 bno가 100인 애를 left조인해서 가져온다.

를 jpql로

```
@Query("select b, w from Board b left join b.writer w where b.bno =:bno")
  Object getBoardWithWriter(@Param("bno") Long bno);

```

로 바꿔줄 수 있다.

연관관계가 없는 경우에는 on으로 연결해서 사용.

![20210508_052555](/assets/20210508_052555.png)

100번 게시글에 대해 댓글을 가져옴.

JPQL:
https://ict-nroo.tistory.com/116

```
@Query(value ="SELECT b, w, count(r) " +
           " FROM Board b " +
           " LEFT JOIN b.writer w " +
           " LEFT JOIN Reply r ON r.board = b " +
           " GROUP BY b",
           countQuery ="SELECT count(b) FROM Board b")
   Page<Object[]> getBoardWithReplyCount(Pageable pageable);


```

게시물 가져오고(b) 작성자(w)를 가져오고 집계함수 count(r)사용.

LEFT JOIN Reply r ON r.board 이 부분은 연관관계가 없어서 on 사용.

countQuery ="SELECT count(b) FROM Board b"
