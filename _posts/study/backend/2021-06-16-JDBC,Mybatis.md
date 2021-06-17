---
title: "[backend] JDBC,Mybatis"
layout: post
subtitle: backend
date: "2021-06-16-04:42:51 +0900"

categories: study
tags: backend
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### Mybatis란?

JDBC에 다 쓰던 SQL과 쿼리문을 분리시키자.

그럼 자바소스에서 SQL 쓰려면 API가 필요해질텐데?



자바 소스코드에서 SQL 연결하는 거를 마이바티스에서는 Mapping이라 하고 이 Mybatis를 Mapping framework라고 한다.

#### JDBC의 문제점과
1. 노출(보안 문제)
2. 유지보수에 어려움
3. 개발 속도가 느리다.

이걸 마이 바티스로 넘어가면 어느정도 해결이 가능하다.


![20210617_201011](/assets/20210617_201011.png)

Mybatis 가서 3버전을 다운받자.

![20210617_202251](/assets/20210617_202251.png)


1. Configuration XML 파일

![20210617_203107](/assets/20210617_203107.png)

이런 형식으로 되어있는게 환경 설정 파일이다.


2. 프로퍼티스 파일


```
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/test?characterEncoding=UTF-8&serverTimeZone=UTC
username=root
password=mysql

```


프로퍼티 파일은 Key= value 로 저장하는게 프로퍼티 파일의 특징.
중요한건 = 사이사이에 공백이 들어있는지 봐야된다.(맨 뒤에까지도 포함. 공백 있으면 에러남.)


3. SQL 문장을 저장해둔 파일(Mapper.xml, XML파일)

https://mybatis.org/mybatis-3/getting-started.html

![20210617_210637](/assets/20210617_210637.png)


![20210617_210801](/assets/20210617_210801.png)


가장 기본적인 파일이 이 3개의 파일 부분이다

------


![20210618_001938](/assets/20210618_001938.png)

 이 프로퍼티스 파이로가 매퍼파일을 Configuration 파일에 연결시킨다.




 세션팩토리라는 클래스 객체가 필요하게 되며 XML로부터 필요한데 XML이 환경설정이다.
