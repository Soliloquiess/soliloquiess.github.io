---
title: "[Spring] SpringRestAPI"
layout: post
subtitle: Spring
date: "2021-05-03 19:45:51 +0900"

categories: class
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### REST 서비스란?

HTTP URI + HTTP METHOD

- HTTP URI 를 통해 제어할 자원(Resource)를 명시하고
  HTTP METHOD(GET, POST, PUT, DELETE)를 통해
  해당 자원(RESOURCE)를 제어하는 명령을 내리는 방식의 아키텍쳐.

서버는 json형식으로 받아도 자바 형식으로 받아야 한다.

### Json

javascript 에서 객체를 만들 때 사용하는 표현식을 말한다.

RestController가 함축하고 있는 2가지는?

@RestConroller = @Controller + @ResponseBody

컨트롤러는 서비스 주입받고 서비스는 dao주입받고.

---

클라이언트에 요청이 들어오면 화면은 없이 데이터만 처리한다.
화면이 있긴 있어야 하는데 요청한 클라이언트 (postman)으로 대체한다.

원하는 데이터는 uri로 전달해주고(얘기해주고) = what
메서드로 전달해줘야.(얘기한 데이터를 어떻게 해야하는지 나타내는 것.줘야되는지 삭제해야되는지 수정해야되는지 = 방법 그걸 메서드라는 것으로 표시하는 것.
)

![20210503_191534](/assets/20210503_191534.png)

![20210503_191706](/assets/20210503_191706.png)

![20210503_191813](/assets/20210503_191813.png)

//쿼리의 아이디(xml매퍼)랑 dao(자바 매퍼)랑 맞춰야 한다

req(리퀘스트)가 들어오면 디스패쳐가 읽고 컨트롤러 읽고 서비스 일고 dao 읽음

```
package com.mvc.dao;

import java.util.List;

import com.mvc.vo.Customer;

//client(CustomerServiceImpl.java)
//java mapper(method name == xml mapper 안에 있는 쿼리 id)
//얘도 매퍼라 부른다. 매퍼는 매펀데 자바인 매퍼라 자바 매퍼라 부름.
//아까 쿼리문 들어있던 매퍼파일은 xml매퍼파일.
public interface CustomerDao {
	public List<Customer> selectAll();
	public Customer selectOne(String num);
	public int insert(Customer c);

	public int delete(String num);
	public List<Customer> findByAddress(String address);
	public int update(Customer c);

}



```

```
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

서비스는 dao메서도 읽음

컨트롤러는 서비스의 메서드 읽음

(왼쪽이 오을쪽을 읽음(사용))

서비스에 있가 dao 호출하면 xml 쿼리 있던 여러개 중에서 id 같으면 selectAll 실행

쿼리 아이디랑 2개가 일치해야한다.

그래야 그 메서드가 호출했을 떄 동작한다.

@Path는 경로
@PathVariable는 경로에 들어있는 변수를 의미한다.

get방식으로 요청하면서 url에 이러한 식으로 요청하겠다 이런 의미.

PathVariable 는 경로에 들어있는 값 중 하나를 의미한다.앞이 num이니까 tommy name 이렇게 들어간다.

raw 면 바로 넣겠다는 뜻

---

@RestController
쓰면 자동으로 @ResponseBOdy 붙는
그럼 알아서 제이슨으로 리턴이 됨.
