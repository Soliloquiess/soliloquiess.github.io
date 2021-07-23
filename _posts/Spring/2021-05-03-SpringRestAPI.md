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

![20210722_202633](/assets/20210722_202633.png)


![20210722_203009](/assets/20210722_203009.png)

기존 서비스는 가공된 데이터 이용해서 특정 플랫폼에 적합한 형태의 View로 만들어서 반환



그에 비해 Rest Service는 데이터 처리만 한다거나 처리 후 반환될 데이터가 있다면 JSON이나 XML 형태로 전달. View에 대해서는 신경 쓸 필요가 없다. -> 이런 이유로 OPEN API 에서 많이 사용



기존 서비스는 웹이던 모바일이던 플랫폼에 맞게 view를 변경해야 했으나 Rest를 쓰면 json/xml의 형식의 데이터만 전달해서 아무곳에서 사용 가능.

![20210722_203457](/assets/20210722_203457.png)


![20210723_010305](/assets/20210723_010305.png)

![20210723_010307](/assets/20210723_010307.png)

우리가 데이터 넘겨줄 떄 클라이언트가 전송 view 페이지를 만들어서 보내는게 일반적인 방법(jsp)라던가 비동기는 좀 달라짐. 모든 화면을 구성해서 보내는 게 아니라 xml이나 json 형태로 보내게 된다.


서버쪽에서 서블릿으로 만들던게 스프링으로 만들며 방법이 좀 달라지게 된다.

![20210723_014701](/assets/20210723_014701.png)

자바스크립트, url(이동할 곳의),
타입은 get,post,put이런거 지정.

contentType은 클라이언트에서 서버에 보내는 타입 지정.(여기선 제이슨 형식으로 보냄)

dataType은 서버에서 클라이언트로 돌아올 때의 타입.

![20210723_015406](/assets/20210723_015406.png)

#### 비동기로 만드는 2가지 방법

1. @Controller로 만드는데 그럼 일반 컨트롤러랑 차이가 없으니까 메서드에 리턴타입을 @ResponseBody를 이용해서 String, dto, list이런걸 리턴시켜서 뷰의 이름이 아니라 실제 데이터를 리턴.

2. @RestConroller라고 설정 가능.
이렇게 설정하면 이 메서드는 public String/DTO/list  + 메서드가
이 앞에 ResponseBody가 없다.
이 안에서 처리하는 모든 매핑은 다 REST라 자동으로 ResponseBody가 붙는다고 생각하면 된다.

![20210723_021640](/assets/20210723_021640.png)

리스트를 서비스에서 얻어와라
오브젝트하고 배열돌려라
포문 돌려라
오브젝트하고 풋풋한걸 배열에 집어넣고 문자열로 바꿔서 보내라.

원래 이렇게 해야됨(옛날 방식)
그리고 이걸 쓰기 위해 json-simple.jar로 사용해서 했었다.


![20210723_021839](/assets/20210723_021839.png)

근데 이건 우리가 알던 제이슨 작업 안하고 바로 리턴 작업 해버림

![20210723_021945](/assets/20210723_021945.png)

그래서 석세스 부분에 유저에 list가 들어가는데 json형태인데 그냥 오면 java객체는 못들어 가서 일반적으로는 안됨.


근데 jackson 라이브러리를 쓰면 설정해서 java객체는 json으로 자동으로 변환시켜준다.


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
쓰면 자동으로 @ResponseBody 붙는
그럼 알아서 제이슨으로 리턴이 됨.
