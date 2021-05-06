---
title: "[Spring] AOP Mybatis"
layout: post
subtitle: Spring
date: '2021-04-29 19:45:51 +0900'

categories: class
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

스프링에서 세팅 = xml

dao를 대신하는거(정확히 jdbc 대신)
xml에 세팅하면 됨

그리고 conn이 접속해야 되는 url, id,pass가 뭔 xml에 세팅만
또 실행해야 하는 쿼리문이 뭔지 xml에 세팅(crud)
이 쿼리문 만들면서 값 지정 가능


![20210429_100232](/assets/20210429_100232.png)

xml 만들떄 어떤 dto로 뭘 할건지 xml에 세팅.

xml에 다 세팅하면 dao가 소스가 간단해짐.

컨트롤러 대신하는 프레임워크는 스프링이 아니라 스프링이 지닌 web mvc.
dao로 jdbc썼는데 mybatis프레임워크로 jdbc대신하는 프레임워크 쓸 것.

mybatis로 jdbc에서 작업했던 내용들이 싹 사라짐.= 훨씬 편하게 쓸 수 있다.


----

### Mybatis 개요와 특징

- mybatis는 자바 object와  sql문 사이의 자동 mapping을 지원하는 orm 프레임워크.

- HIvernate나 jpa(java persistence api)처럼 새로운 db 프로그래밍 패러다임을 익혀야하는 부담 없이 개발자가 익숙한 sql을 그대로 쓰면서 jdbc 코드 작성 불편함을 제거하고 도메인 객체나 vo객체를 중심으로 개발 가능.

- 쉬운 접근성과 코드의 간결함
  - 가장 간단한 persistence springframework
  - xml형태로 서술된 jdbc 코드라 생각할 만큼 jdbc의 모든 기능을 mybatis가 대부분 제공
  - 복잡한 jdbc코드를 걷어내며 깔끔한 소스코드 유지
  - 수동적인 파라미터 설정과 쿼리결과에 대한 매핑 구문을 제거
- SQL 과 프로그래밍 코드의 분리
  - SQL 변경이 있을 떄 마다 자바코드 수정하거나 컴파일 안해도 됨
  - SQL 작성과 관리 또는 검토를 DBA와 같은 개발자가 아닌 다른사람에게 맡길 수 있음.


-----


SQLSessionFactory

SQLSessionFactory(=Connection)

-> 쿼리 실행시킬수 있는 메서드


직접하던 작업을 mybatis가 대신하는거

xml문서가 등장하는데 여기엔 여러 정보 등장
디비에 관련된 정보.(어느 디비랑 연결해서 작업할건데)



VO 생성시 반드시 디폴트 생성자를 있게 만들어 둬야한다.


![20210429_151829](/assets/20210429_151829.png)


데이터 베이스 관련 설정파일 필요.
쿼리가 어디있는지 매퍼파일 과 디비설정 ALiases도 설정해줘야 한다.


----

컨트롤러는 서비스에 넘기고 서비스는 DAO에 또 넘김.
DAO 가면 DAOIMPL에서 실행.

reg 가 요청하면 dispatcher서블릿이 먼저 요청 받음(요청은 전부 디스패처 서블릿이 받음)
그 요청을 컨트롤러에 넘긴다.(전달)
컨트롤러는 서비스 보고 호출

컨트롤러가 서비스 호출해서 일 시키는데 그 안에 누가 주입이 되냐면 si가 주입이 된거.(serviceImpl)


jdbc 써서 직접 작업하고 리턴하고 그런식이였따.

DI 역할은  객체를 자동생성해줌

자동 생성된걸 프록시라 한다.
impl을 직접 만들었었는데 이젠 안 만들어도 된다.

자동으로 만들어진 프록시가 serviceImpl에 자동주입

내가 만든게 아니고 mybatis에 의해 자동으로 생성된게 들어감.

1. sql세션 팩토리에서 sqlsession을 얻어오고
얻어온 sql으로 쿼리를 실행할 것.
2. 쿼리 실행한 후 결과 있을텐
쿼리 실행 결과를 서비스한테 리턴


3. 쿼리 실행 결과를 서비스에게 리턴.


DAO 인터페이스 안의 메서드이름 = Mapper파일 안의 쿼리 id는 동일해야함

그래야 메서드 호출했을 때 그 쿼리가 실행이 된다


-----------


resources에 넣는다.

![20210506_012421](/assets/20210506_012421.png).


디비 프로퍼티 잇던거(db연결하는거)

mybatis에 전달하는건 하나밖에 안되서 맵이나 DTO를 쓴다 아!

![20210506_014417](/assets/20210506_014417.png)


![20210506_014506](/assets/20210506_014506.png)

이 메서드와 아이디를 맞춰주는게 좋다.


```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="">
<!--
	<select id = "login" parameterType = "map" resultType = "com.ssafy.guestbook.model.MemberDto"> -->
	<select id = "login" parameterType = "map" resultType = "member">
		select username, userid, email
		from ssafy_member
		where userid = #{userid} and userpwd = #{userpwd}
		<!-- 맵 안에있는 프로퍼티를 세팅함#{}안에 -->
	</select>
</mapper>

```
그리고 매퍼 부분도 네임스페이스 명시(자세하게\)


<mapper namespace="com.ssafy.guestbook.model.dao.UserDao">


그리고 매퍼는 네임스페이스가 항상 채워져 있어야 한다(비어있으면 안된다.)


![20210506_015708](/assets/20210506_015708.png)

마이바티스에서 이 시점에 이미 읽어서 사용 안해도 비어있으면 안된다.

--------

servlet.context는 웹에 관련된거
root.context는 비웹에 관련된거

![20210506_022455](/assets/20210506_022455.png)


에러 나는지 안나는지 잘 보자 $는 statement방식 #는 preparedStatement방식

dto안엔 getter,setter 다 필요

------------

![20210506_025852](/assets/20210506_025852.png)

controller가 service에 일 시키고 service가 daoimpl에 일 시킴
여기서 daoimpl은 sqlssesion만 있으면 mybatis가 알아서 다 처리해주고 db연동.
dao에서


![20210506_025907](/assets/20210506_025907.png)

![20210506_025918](/assets/20210506_025918.png)

![20210506_025930](/assets/20210506_025930.png)

![20210506_025941](/assets/20210506_025941.png)

![20210506_025951](/assets/20210506_025951.png)

![20210506_025959](/assets/20210506_025959.png)
참고로 여기 dao가 아니라 serviceimpl

![20210506_030009](/assets/20210506_030009.png)


mybatis 쓰면 dao를 통해 직접 연결할 필요 없이 서비스에서 매퍼를 통해 다이렉트로 연결 가능.

```
package com.ssafy.guestbook.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.guestbook.model.MemberDto;
import com.ssafy.guestbook.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private SqlSession sqlSession;

	@Override
	public MemberDto login(Map<String, String> map) throws Exception {
		if(map.get("userid") == null || map.get("userpwd") == null)
			return null;
		return sqlSession.getMapper(UserMapper.class).login(map);
	}

	@Override
	public List<MemberDto> userList() {
		return sqlSession.getMapper(UserMapper.class).userList();
	}

	@Override
	public MemberDto userInfo(String userid) {
		return sqlSession.getMapper(UserMapper.class).userInfo(userid);
	}

	@Override
	public int userRegister(MemberDto memberDto) {
		return sqlSession.getMapper(UserMapper.class).userRegister(memberDto);
	}

	@Override
	public int userModify(MemberDto memberDto) {
		return sqlSession.getMapper(UserMapper.class).userModify(memberDto);
	}

	@Override
	public int userDelete(String userid) {
		return sqlSession.getMapper(UserMapper.class).userDelete(userid);
	}
}


```
