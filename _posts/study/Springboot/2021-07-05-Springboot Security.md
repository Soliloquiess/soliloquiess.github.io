---
title: "[Springboot] Springboot Security"
layout: post
subtitle: Springboot
date: "2021-07-05-04:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


![20210715_184923](/assets/20210715_184923.png)

![20210715_185819](/assets/20210715_185819.png)


Oauth 로 로그인 하면 authentication의 객체로 들어오게 됨.


스프링 시큐리티는 자기만의 세션을 들고 있음.
시큐리티인데 타입은 Authentication 객체밖에 없는데 쏙 들어와야됨.

저 안에는 userDetails 타입과 Oauth2User타입이 들어갈 수 있다.



userDetails -> 일반 로그인
OAuth2User -> OAuth 로그인

OAuth2User와 userDetails 타입 세션에 저장돼었는데 떙겨옴 근데 user를 찾을 수가 없음.
그래서 PrincipalDetails 에 userDetails를 구현해서 user를 안에 넣는다.
