---
title: "[Spring] Spring REST API — @RestController와 JSON 응답"
date: 2021-05-03
category: "Spring"
tags: ["Spring"]
description: "REST 서비스의 개념과 HTTP URI·METHOD 설계 원칙을 정리하고, @Controller/@RestController로 JSON 응답을 구현하는 두 가지 방법과 MyBatis 매퍼 연동 구조를 설명한다."
permalink: "class/2021/05/03/SpringRestAPI"
---

## REST 서비스란?

**REST(Representational State Transfer)**는 HTTP URI와 HTTP METHOD를 조합한 아키텍처 스타일이다.

- **HTTP URI**: 제어할 자원(Resource)을 명시
- **HTTP METHOD**: 해당 자원에 수행할 명령을 지정 (`GET`, `POST`, `PUT`, `DELETE`)

| HTTP METHOD | 의미 |
|---|---|
| `GET` | 자원 조회 |
| `POST` | 자원 생성 |
| `PUT` | 자원 수정 |
| `DELETE` | 자원 삭제 |

서버는 JSON 형식으로 받더라도 내부적으로는 자바 객체로 처리한다.

![20210722_202633](/assets/20210722_202633.png)

![20210722_203009](/assets/20210722_203009.png)

### 기존 서비스 vs REST 서비스

| 구분 | 기존 서비스 | REST 서비스 |
|---|---|---|
| 응답 형태 | 플랫폼에 맞는 View(HTML 등) | JSON 또는 XML 데이터 |
| View 관리 | 필요 | 불필요 |
| 플랫폼 의존성 | 웹/모바일별 View 변경 필요 | 어느 플랫폼에서나 동일 사용 가능 |
| 주 사용처 | 전통적 웹 서비스 | **OPEN API**, SPA, 모바일 앱 |

![20210722_203457](/assets/20210722_203457.png)

![20210723_010305](/assets/20210723_010305.png)

![20210723_010307](/assets/20210723_010307.png)

클라이언트가 데이터를 전송할 때, 일반적인 방법(JSP)은 전체 화면을 구성해서 보내지만, REST는 XML이나 JSON 형태의 데이터만 전송한다.

---

## AJAX 요청 설정

![20210723_014701](/assets/20210723_014701.png)

| 옵션 | 설명 |
|---|---|
| `url` | 요청을 보낼 서버 경로 |
| `type` | HTTP METHOD (`GET`, `POST`, `PUT` 등) |
| `contentType` | 클라이언트 → 서버로 보내는 데이터 타입 (여기선 JSON) |
| `dataType` | 서버 → 클라이언트로 돌아오는 데이터 타입 |

![20210723_015406](/assets/20210723_015406.png)

---

## 비동기 응답을 만드는 2가지 방법

### 방법 1: `@Controller` + `@ResponseBody`

- 일반 컨트롤러처럼 `@Controller`를 사용
- 메서드에 `@ResponseBody`를 추가하면 뷰 이름이 아닌 **실제 데이터**(String, DTO, List 등)를 HTTP 응답 바디로 직접 반환

### 방법 2: `@RestController`

- `@RestController` 하나로 `@Controller` + `@ResponseBody` 효과를 동시에 적용
- 클래스 내 모든 메서드에 자동으로 `@ResponseBody`가 붙는다고 이해하면 된다.

> `@RestController` = `@Controller` + `@ResponseBody`

![20210723_021640](/assets/20210723_021640.png)

과거에는 `json-simple.jar`를 사용해 JSON 객체를 직접 조립해서 반환했다 (아래가 구 방식).

![20210723_021839](/assets/20210723_021839.png)

**Jackson 라이브러리**를 사용하면 자바 객체를 JSON으로 **자동 변환**하여 반환할 수 있다.

![20210723_021945](/assets/20210723_021945.png)

`success` 콜백에 List가 들어오는데, Jackson이 자바 객체를 JSON으로 변환해주기 때문에 별도 처리 없이 사용 가능하다.

---

## JSON이란?

**JSON(JavaScript Object Notation)**은 자바스크립트에서 객체를 표현할 때 사용하는 표현식으로, 데이터 교환 형식으로 널리 사용된다.

---

## REST 요청 실습 — MyBatis 연동

클라이언트 요청 흐름:

```
Request → DispatcherServlet → Controller → Service → DAO → XML Mapper (쿼리)
```

화면은 **Postman**으로 대체한다.

- **URI**: 원하는 자원을 명시 (what)
- **HTTP METHOD**: 자원에 수행할 동작을 명시 (how)

![20210503_191534](/assets/20210503_191534.png)

![20210503_191706](/assets/20210503_191706.png)

![20210503_191813](/assets/20210503_191813.png)

> XML 매퍼의 쿼리 `id`와 자바 매퍼(DAO 인터페이스)의 메서드 이름이 **반드시 일치**해야 한다.

```java
package com.mvc.dao;

import java.util.List;
import com.mvc.vo.Customer;

// client(CustomerServiceImpl.java)
// java mapper (method name == xml mapper 안에 있는 쿼리 id)
public interface CustomerDao {
    public List<Customer> selectAll();
    public Customer selectOne(String num);
    public int insert(Customer c);
    public int delete(String num);
    public List<Customer> findByAddress(String address);
    public int update(Customer c);
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
   PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
   "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- mapper file: 실행 할 쿼리 문을 저장하는 파일. 테이블 하나당 한개씩 작성
namespace: 작업하는 테이블들을 구분해주기 위한 식별자 -->
<mapper namespace="com.mvc.dao.CustomerDao">

  <select id="selectAll" resultType="Customer">
    select * from customer
  </select>

  <select id="selectOne" parameterType="java.lang.String" resultType="Customer">
    select * from customer where num = #{num}
  </select>

  <insert id="insert" parameterType="Customer">
  	insert into customer values(#{num}, #{name}, #{address})
  </insert>

  <update id="update" parameterType="Customer">
  	update customer set address = #{address} where num = #{num}
  </update>

  <select id="findAddress" parameterType="string" resultType="Customer">
  	select * from customer where address = #{address}
  </select>

 <delete id="delete" parameterType="string">
  	delete from customer where num = #{num}
  </delete>

</mapper>
```

- **서비스**는 DAO 메서드를 호출
- **컨트롤러**는 서비스 메서드를 호출
- DAO가 XML 매퍼의 쿼리 `id`와 일치하는 메서드를 호출하면 해당 쿼리가 실행됨

### @PathVariable

- `@Path`: 경로 지정
- `@PathVariable`: 경로에 포함된 변수 값을 추출

GET 방식으로 URL에 변수를 포함해 요청할 때 사용한다.

- `raw`: 데이터를 직접 바디에 넣어 전송

---

## 정리

`@RestController`를 사용하면 자동으로 `@ResponseBody`가 적용되어, 메서드 반환값이 JSON으로 변환되어 응답된다.
