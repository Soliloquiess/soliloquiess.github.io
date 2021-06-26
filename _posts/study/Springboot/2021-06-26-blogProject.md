---
title: "[Springboot] blogProject"
layout: post
subtitle: Springboot
date: "2021-06-26-04:52:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---



패키지 스캔 : 필요한 것들을 메모리 로드 IOC 싱글턴.


해당 패키지 이하로 만들어야 new 해서 만들어진다.


![20210626_150058](/assets/20210626_150058.png)

스프링은 properties도 되지만 yml에도 설정이 가능한데 스프링의 모든 파일의 설정을 yml에 설정이 가능하다.

properties안 쓰는 이유는 설정할때 자동완성 해주는
이렇게 적은거 또적고 이런식으로 해야한다. 이 형식 보다 yml이 더 좋다.

스프링 공식사이트엔 프로퍼티 쓰는데 뭐 gralde, maven 처럼 둘다 별 차이 없을거 같기도 하다.

깃은 이 3개를 일치시키는게 깃을 관리하는 방법

![20210626_192515](/assets/20210626_192515.png)

![20210626_193226](/assets/20210626_193226.png)


일치 시킨다고 할 때 동기화라는 용어를 많이 쓴다.

ex) 2개의 다른 파일을 동기화 시켜서 다른 파일을 일치시킨다.



-----

### http 1.1

통신하는데 byte stream(8bit)가 왔다갔다 한다.

http 통신: 약속

통신 방법 : 4가지
1. get
2. post
3. put
4. delete

http 통신은 B가 서버라고 하면(서버는 데이터를 가지고 있는 사람(갑))

B한테 스트림 연결하고 요청하는데 그럼 B가 응답하게 된다.

통신 방법은 요청의 방법이 4가지이다.

- get은 데이터를 달라고 할때 사용한다 - select
- post는 데이터를 추가해줘 - Insert 요청
- put은 데이터를 수정해줘 - update
- delete 는 데이터를 삭제해줘 - delete

근데 저기서 각 어떤 데이터를 다루는지 how가 없다.

![20210626_204519](/assets/20210626_204519.png)

A가 서버에 요청할때 뭘 요청할지 모르므로 how를 넣기 위해선
뒤에 쿼리스트링을 넣는다(? 사용)

![20210626_204754](/assets/20210626_204754.png)

--------


세션 : 데이터를 응답해줄 준비가 됨(인증)
전달 목적이 http 인데 이렇게 선이 끊기면 다음 요청떄 좀 곤란하므로
stateless 는 세션을 어떻게 만드는 지 하는 방법.
스프링에서는 시큐리티를 사용해서 세션을 유지하는 지 알 수 있다.


![20210626_210503](/assets/20210626_210503.png)

-------


http 통신은 패킷스위칭과 서킷 패킷스위칭으로 나뉜다.


![20210626_211216](/assets/20210626_211216.png)


https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

Mime 타입이 되게 많다.
