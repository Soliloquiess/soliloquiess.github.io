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

![20210618_012722](/assets/20210618_012722.png)

![20210618_013436](/assets/20210618_013436.png)

-----

유저가 많아지면 많아질 수록 디비 성능이 떨어짐.

연결시 부하가 걸려서 성능이 급격히 떨어짐.

mybatis는 이 커넥션을 없애지 말고 계속해서 재활용 하자는취지임.

-------

#### 커넥션 풀은 커넥션을 미리 만들어 둠.

(디비에 연결하는 커넥션을 다 만들어 둠)

디비를 사용하고 싶을떄 그때그떄 만드는게 아니라 사전에 미리 먼저 메모리에 커넥션을 만듬.(핵심)

이 영역을 커넥션 풀이라고 한다.

Pooled는 커넥션 풀을 이용해서 데이터베이스 정보들을 가지거 커넥션들을 만들라는 소리.

몇개 만들라는 건 가이드가 없다.


----

디비 연결은 순간 연결되고 순간 끊어짐.

이 풀에 들어있는게 5~8정도 되면 유연하게 가능

정리하면 XML 해석해서 Pooled로 커넥션 만들어서 SQL 세션 팩토리를 만듬.(sqlSessionFactory)

근데 마이바티스에선 하나를 커넥션 객체라 하는데, JDBC에선 커넥션 객체라고 하지만 마이바티스에선 커넥션이라는 용어를 하나하나 객체를 SQL 세션이라고 한다.(중요)


![20210618_031341](/assets/20210618_031341.png)

미리 연결된 객체 하나하나를 sql 세션이라 하고 여러개 모여져있는게 풀 기법이고 이 메모리 공간 가르키는걸 객체 이름을 팩토리라 한다


이 환경설정 파일들을 읽어서 메모리에 커넥션 풀을 만들어서 팩토리 객체를 만드는게 가장 중요한 코딩작업

XML로 부터 읽어서 팩토리를 만드는데 SQL팩토리가 만들어지고 객체가 가리키게 되며 포워드로 가리키게 된다.

----

초기화 블럭 - 처음 실행되고 딱 한번 실행되는 영역

```
package kr.bit.model;
import java.io.InputStream;
// JDBC->MyBatis
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
public class MemberDAO {
   private static SqlSessionFactory sqlSessionFactory; //[O O O O O ]

   // 초기화 블럭-프로그램실행시 딱 한번만 실되는 코드영역
   static {
	   try {
		   String resource = "kr/bit/mybatis/config.xml";
		   InputStream inputStream = Resources.getResourceAsStream(resource);//읽기
		   sqlSessionFactory =new SqlSessionFactoryBuilder().build(inputStream);
	   }catch(Exception e) {
		   e.printStackTrace();
	   }
   }
   // 회원전체 리스트보기
   public List<MemberVO> memberList() {
	   // [Connection+Statement]=>SqlSession
	   SqlSession session=sqlSessionFactory.openSession();
	   List<MemberVO> list=session.selectList("memberList");
	   session.close();//반납
	   return list;
   }
   // 회원가입
   public int memberInsert(MemberVO vo) {
	   SqlSession session=sqlSessionFactory.openSession();
	   int cnt=session.insert("memberInsert", vo);
	   session.commit();
	   session.close();//반납
	   return cnt;
   }
   // 회원삭제
   public int memberDelete(int num) {
	   SqlSession session=sqlSessionFactory.openSession();
	   int cnt=session.delete("memberDelete", num);
	   session.commit();
	   session.close();
	   return cnt;
   }
   // 회원상세보기
   public MemberVO memberContent(int num) {
	   SqlSession session=sqlSessionFactory.openSession();
	   MemberVO vo=session.selectOne("memberContent", num);
	   session.close();
	   return vo;
   }
   // 회원수정하기
   public int memberUpdate(MemberVO vo) {
	   SqlSession session=sqlSessionFactory.openSession();
	   int cnt=session.update("memberUpdate", vo);
	   session.commit();
	   session.close();
	   return cnt;
   }
}




```


뺴놓은 파일을 매퍼파일이라 한다

매퍼파일은 안에있는 Sql을 연결해야 해서 연결하도록 적어줘야한다.


resultType이 셀렉트해서 겨로가 가져오고 어레이리스트로 묶어지는 타입정보를 적어야 한다.
그리고 세션 반납하고 마지막으로 리스트를 리턴한다

JDBC와 마이바티스의 코드를 비교해보자.

![20210618_042645](/assets/20210618_042645.png)


확연한 차이가 보인다.



![20210618_050044](/assets/20210618_050044.png)

이런식으로 매핑한다고 해서 매핑 프레임 워크라고도 한다.


------------


### 중요한 거

##### JDBC->Mybatis로 변경하기

1. JDBC의 문제점
2. SQL 매핑 프레임워크의 이해
3. 마이바티스 환경설정(파일 3개 이해하기)
4. SqlSessionFactory, SqlSession 이해하기
5. ConncectionPool 이해하기



-----

1. 기존 JDBC(Java Database Connectivity)의 문제점과
- 중요한 정보가 소스코드에 노출(아이디, 패스워드 등등)

-  자바 소스코드와 SQL 문장이 혼합되서 향후 유지보수에 어려움.

- 개발 속도가 느림(모든 코드를 개발자가 직접 만듬)

![20210618_094115](/assets/20210618_094115.png)

#### JDBC 기본 구조 이해


![20210618_094128](/assets/20210618_094128.png)

2. Mybatis(SQL Mapping Framework for aJava)
- 객체 지향인 자바의 관계형 데이터 베이스 프로그래밍을 좀 더 쉽게 도와주는 개발 프레임 워크로서 JDBC로 디비 액세스 하는 작업을 캡슐화 하고 일반 SQL 쿼리, 저장 프로시져 및 고급 매핑을 지원하며 모든 JDBC 코드 및 매개변수의 중복 작업 제거함.

- Mybatis에선 프로그램에 있는 SQL 쿼리들을 한 구성파일에 구성하여 프로그램 코드와 SQL을 분리할 수 있는 장점을 지님.

![20210618_095045](/assets/20210618_095045.png)


3. Mybatis 환경설정(파일 3개 이해하기)

- Mybatis configuration file(XML)
  - mybatis3의 작업 설정을 설명하는 XML 파일
- Mapper file(XML)
  - SQL 쿼리를 작성하는 파일

- Properties file
  -   데이터 베이스 연결 정보 기술(url, user,password)



4. SQLSessionFactory, SqlSession 이해하기
- org.apache.ibatis.session.SqlSessionFactoryBuilder
  - Mybatis 환경설정 파일(XML) 을 읽어서 SQL세션을 구성하는 요소
  - 커넥션 풀을 만든다.

-  org.apache.ibatis.session.SqlSessionFactory
  - SqlSession을 구성하는 요소(커넥션 풀)

-  org.apache.ibatis.session.SqlSession
  - 데이터 베이스에 액세스 할 떄 가장 중요한 역할을 함
  - JDBC의 커넥션 + Statement역할

![20210618_101832](/assets/20210618_101832.png)

![20210618_101843](/assets/20210618_101843.png)

-------
