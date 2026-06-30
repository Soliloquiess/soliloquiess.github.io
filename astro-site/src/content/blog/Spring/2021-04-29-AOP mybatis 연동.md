---
title: "[Spring] AOP & MyBatis — XML 설정부터 SqlSession 활용까지"
date: 2021-04-29
category: "Spring"
tags: ["Spring"]
description: "MyBatis 프레임워크를 Spring에 연동하는 방법을 정리한다. XML 설정, SqlSessionFactory, Mapper 파일 구성, 그리고 Service 계층에서 SqlSession을 활용하는 실습 코드까지 다룬다."
permalink: "class/2021/04/29/AOP-mybatis-연동"
---

스프링에서 설정은 **XML**로 관리한다.

MyBatis는 DAO에서 직접 작성하던 **JDBC 코드를 대체**하는 프레임워크다. DB 연결 정보(URL, ID, Password)와 실행할 쿼리(CRUD)를 모두 XML에 선언하면, DAO 코드가 크게 단순해진다.

![20210429_100232](/assets/20210429_100232.png)

---

### MyBatis 개요와 특징

- MyBatis는 자바 객체와 SQL 사이의 **자동 매핑**을 지원하는 ORM 프레임워크다.
- Hibernate나 JPA(Java Persistence API)처럼 새로운 DB 프로그래밍 패러다임을 익혀야 하는 부담 없이, 개발자에게 익숙한 SQL을 그대로 사용하면서 JDBC 코드 작성의 불편함을 제거한다. 도메인 객체나 VO 객체 중심의 개발이 가능하다.

**주요 특징**

| 특징 | 설명 |
|------|------|
| 쉬운 접근성과 코드 간결함 | JDBC의 모든 기능을 제공하면서 복잡한 코드를 제거 |
| 수동 파라미터 설정 제거 | 파라미터 설정과 쿼리 결과 매핑 구문을 자동 처리 |
| SQL과 코드의 분리 | SQL 변경 시 자바 코드 수정·컴파일 불필요 |
| DBA 협업 가능 | SQL 작성·관리를 비개발자에게 위임 가능 |

---

### SqlSessionFactory와 SqlSession

**SqlSessionFactory** (= Connection 역할)는 쿼리를 실행할 수 있는 **SqlSession**을 제공한다.

- 직접 작성하던 JDBC 작업을 MyBatis가 대신 처리한다.
- XML 문서에 DB 연결 정보, 쿼리, Aliases 등을 선언한다.

> VO 생성 시 반드시 **기본 생성자(default constructor)**가 있어야 한다.

![20210429_151829](/assets/20210429_151829.png)

DB 관련 설정 파일, 쿼리가 담긴 Mapper 파일, Aliases 설정이 모두 필요하다.

---

### 요청 처리 흐름

```
Controller → Service → DAO → DaoImpl (SqlSession으로 DB 연동)
```

- `reg` 요청이 들어오면 **DispatcherServlet**이 먼저 받아 Controller에 전달한다.
- Controller는 Service를 호출하고, Service 내부에는 **ServiceImpl**이 주입된다.
- MyBatis가 자동으로 프록시(Proxy) 객체를 생성해 ServiceImpl에 주입한다 — 직접 impl을 만들지 않아도 된다.

처리 순서:
1. **SqlSessionFactory**에서 SqlSession을 획득
2. SqlSession으로 쿼리 실행
3. 실행 결과를 Service에 반환

> **DAO 인터페이스의 메서드 이름**과 **Mapper 파일의 쿼리 id**가 반드시 일치해야 한다. 일치해야 메서드 호출 시 해당 쿼리가 실행된다.

---

resources 디렉터리에 Mapper XML 파일을 넣는다.

![20210506_012421](/assets/20210506_012421.png)

DB 프로퍼티 연결 설정과 MyBatis 전달값은 하나밖에 안 되어 **Map 또는 DTO**를 사용한다.

![20210506_014417](/assets/20210506_014417.png)

![20210506_014506](/assets/20210506_014506.png)

메서드 이름과 쿼리 id를 맞춰주는 것이 좋다.

```xml
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

Mapper의 **namespace는 반드시 명시**해야 한다(예: `com.ssafy.guestbook.model.dao.UserDao`). 비어있으면 MyBatis가 이미 읽은 시점에서 오류가 발생한다.

![20210506_015708](/assets/20210506_015708.png)

---

### Context 구성

| Context | 역할 |
|---------|------|
| `servlet-context` | 웹(Web) 관련 설정 |
| `root-context` | 비웹(Non-Web) 관련 설정 |

![20210506_022455](/assets/20210506_022455.png)

> `${}` 는 Statement 방식, `#{}` 는 **PreparedStatement 방식**이다. DTO 안에는 getter/setter가 모두 필요하다.

---

### 전체 처리 흐름 (화면 캡처)

![20210506_025852](/assets/20210506_025852.png)

Controller가 Service에 일을 시키고, Service는 DaoImpl에 위임한다. DaoImpl은 **SqlSession**만 있으면 MyBatis가 DB 연동을 모두 처리한다.

![20210506_025907](/assets/20210506_025907.png)

![20210506_025918](/assets/20210506_025918.png)

![20210506_025930](/assets/20210506_025930.png)

![20210506_025941](/assets/20210506_025941.png)

![20210506_025951](/assets/20210506_025951.png)

![20210506_025959](/assets/20210506_025959.png)

위 그림에서 `dao`가 아니라 **ServiceImpl**임에 주의한다.

![20210506_030009](/assets/20210506_030009.png)

MyBatis를 사용하면 DAO를 통한 직접 연결 없이 **Service에서 Mapper를 통해 다이렉트로 DB에 연결**할 수 있다.

```java
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
