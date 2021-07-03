---
title: "[Springboot] Springboot AOP 정리"
layout: post
subtitle: Springboot
date: "2021-07-03-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


### 중요하게 봐야 할 점

1. RestController
2. 기본적인 요청과 응답을 배울 것
3. validation 체크
4. 로그 남겨볼 예정
5. 문서로 만들기
6. CORS 개념



------

주소로 들어오는 모든건 String인데 Pathvariable이 해주는 건 주소에 적힌 아이디를 저 부분의 값을 넣었을 떄 int로 바꿈.



@GetMapping("/user")
	public void findAll() {

	}


@PostMapping("/user")
	public void save(String username, String password, String phone) {

	}
