---
title: "[Spring] Spring  3-Tier"
layout: post
subtitle: Spring
date: "2021-06-01-02:58:53 +0900"

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


![20210603_122057](/assets/20210603_122057.png)

Spring MVC에서 3티어는 이렇게 나눠지며
우리가 특히 신경써야 할 건 비즈니스 로직 계층이다.

DB는 매퍼 연동방식

![20210603_133811](/assets/20210603_133811.png)

인터페이스에 매퍼가 있는 곳 그리고 인터페이스 이름과
XML의 네임스페이스가 일치해야  매퍼인터페이스와 매퍼 xML을 자동으로 인터페이스의 메서드 이름 매퍼 안의 이름(id,이름들을) 일치하도록 만들면 연동이 끝나게 됨.


그리고 select 이름과 id 이름 같아야 한다.

그리고 root-context에서 디비 설정하는데

![20210603_140507](/assets/20210603_140507.png)

매퍼패키지를 스캔해서 매퍼인터페이스와 xml을 서로 연결시켜주게 작업해줘야 한다.


![20210603_140902](/assets/20210603_140902.png)

이걸 쓰려면 네임스페이스(위에 beans)를 걸어줘야 한다.

![20210603_141839](/assets/20210603_141839.png)

타입 alias 설정

inflearn.model.BoardVo를 boardVO로 타입설정 alias 주겠다는 뜻.


그리고 영속계층. 디비 연결하는 부분도 해야되니까
디비 환경설정하 rootcontext부분에서

![20210603_142700](/assets/20210603_142700.png)

이 부분 자동으로 처리하도록 mybatis-spring 을 넣어서 설정해준다.

그리고 pom.xml에 가서 api 넣어준다.


![20210603_144136](/assets/20210603_144136.png)

그리고 영속 게층임을 알려주고 매핑 된걸 보여주기 위해 @mapper 어노테이션을 넣어준다.


@Autowired로
자동으로 주입 DI로 의존성 주입
