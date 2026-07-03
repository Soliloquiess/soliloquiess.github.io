---
title: "[Spring] GET/POST/REST — HTTP 메서드와 Controller 실습"
date: 2021-03-24
category: "Spring"
tags: ["Spring"]
description: "Spring MVC에서 GET·POST·PUT·DELETE 메서드를 @RestController로 매핑하고, @RequestParam·@RequestBody로 파라미터를 수신하는 방법을 코드와 함께 정리한다."
permalink: "study/2021/03/24/Spring-공부"
---

## HTTP 메서드 개요

| 메서드 | 파라미터 위치 | 주요 특징 |
|--------|--------------|-----------|
| **GET** | URL 쿼리스트링 | 브라우저 캐시 가능, 길이 제한 있음 |
| **POST** | Request Body | URL 노출 없음, GET보다 긴 데이터 전송 가능 |
| **PUT / PATCH** | Request Body | 주로 업데이트에 사용 |
| **DELETE** | URL 파라미터 | 데이터 삭제에 사용 |

> **REST(Representational State Transfer)**: HTTP 프로토콜의 메서드를 활용한 아키텍처 스타일. HTTP Method로 Resource를 처리하며, CRUD를 통한 Resource 조작에 사용한다.

---

## GET — GetController

사용자로부터 주소를 받아 처리하는 묶음을 **컨트롤러(Controller)**라고 한다.

```java
package com.example.study.controller;


import com.example.study.model.SearchParam;
import org.springframework.web.bind.annotation.*;

@RestController //컨트롤러라고 활용할거라는 지시어
@RequestMapping("/api") //api 주소 매핑하기 위해 리퀘스트 매핑 사용
//localhost:8080/api
public class GetController {

    @RequestMapping(method= RequestMethod.GET, path = "/getMethod") //localhost:8080/api/getMethod
    public String getRequest(){ //()안에 파라미터 넣는다.
        return "Hi getMethod";
    }
    @GetMapping("/getParameter")    //주소지정 localhost:8080/api/getParameter라는 곳에 매핑이 된다.
    //localhost:8080/api/getParameter?id=1234&pasword=abcd
    //아이디와 패스워드 넘기기 위해 스프링에서는 RequestParam이란 걸 넘기게 된다.

    //localhost:8080/api/getMultiParameter?account=abcd&email=study@gmail.com&page=10
    public String getParameter(@RequestParam String id, @RequestParam(name ="password") String pwd){

        String password ="bbbb";
        System.out.println("id:" + id);
        System.out.println("pw:" + password);

        return id+password;
    }

    @GetMapping("getMultiParameter")
    public SearchParam getMultiParameter(SearchParam searchParam){
        System.out.println(searchParam.getAccount());
        System.out.println(searchParam.getEmail());
        System.out.println(searchParam.getPage());


        //보통 json 형태로 데이터 통신.(스프링에서 json 객체를 내부적으로 내장하고 있다.)
        //{"account":"","email":"","page":0}
        return searchParam;
    }
}
```

> **핵심**: GET 메서드를 매핑하고, **@RequestParam**으로 파라미터를 받아오고, 데이터를 처리한 뒤 JSON 형태로 응답하는 것이 기본 흐름이다.

---

## POST — PostController

**POST** 방식은 Request Body에 데이터를 담아 전송한다.

동일한 주소 매핑이 같은 클래스 내에 중복으로 존재하면 Spring Boot가 실행되지 않는다.

![GET 요청 중복 에러 화면](/assets/20210326_010601.png)

메서드의 주소가 동일하면 어떤 걸 실행할 지 모르기 때문에 실행 에러가 뜬다. 단, 서로 다른 클래스에서는 같은 주소 매핑이 겹쳐도 문제없다. 그래서 PostController에도 `/api`로 매핑시킨다.

![PostController 주소 매핑 확인](/assets/20210326_012749.png)

API 테스트 도구로 Talend API Tester(구 Restlet) 확장프로그램을 사용한다.

```java
package com.example.study.controller;


import com.example.study.model.SearchParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //컨트롤러라고 활용할거라는 지시어
@RequestMapping("/api") //api 주소 매핑하기 위해 리퀘스트 매핑 사용
public class PostController {
    //HTML <FORM>,
    //ajax 검색
    //http post body ->data 집어 넣어서 보내겠다.
    // json, xml , multipart-form / text-plain 같이 여러 형태로 올릴 수 있다.


    @PostMapping(value = "/postMethod")
    public String postMethod(@RequestBody SearchParam searchParam){
        //RequestBody에 SearchParam searchParam 이런 값들을 매칭시켜 주세요라는 뜻.
        return "OK";
    }
}
```

URL에는 `http://localhost:8080/api/getMethod`를 입력한다(https가 아닌 http).

![테스트 도구에서 GET 요청 확인](/assets/20210326_013615.png)

---

POST 방식으로 테스트 시 Content-Type을 JSON으로 설정하고 JSON 형태로 요청 본문을 작성한다.

![POST 요청 JSON 입력 화면](/assets/20210326_035048.png)

**PostController를 반환 타입 `SearchParam`으로 수정**하면 요청 본문을 그대로 응답으로 돌려준다.

```java
package com.example.study.controller;


import com.example.study.model.SearchParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //컨트롤러라고 활용할거라는 지시어
@RequestMapping("/api") //api 주소 매핑하기 위해 리퀘스트 매핑 사용
public class PostController {
    //HTML <FORM>,
    //ajax 검색
    //http post body ->data 집어 넣어서 보내겠다.
    // json, xml , multipart-form / text-plain 같이 여러 형태로 올릴 수 있다.


    @PostMapping(value = "/postMethod")
    public SearchParam postMethod(@RequestBody SearchParam searchParam){
        //RequestBody에 SearchParam searchParam 이런 값들을 매칭시켜 주세요라는 뜻.
        return searchParam;
        //이렇게 바꾸면 requestbody에 들어온 내용이 리턴
    }
}
```

수정 후 실행하면 요청한 내용이 정상적으로 리턴된다.

![POST 요청 정상 응답 결과](/assets/20210326_035532.png)

**흐름 해석**: POST 매핑 → Content-Type `application/json` 확인 → **@RequestBody**의 `SearchParam`에 JSON 필드 매핑 → 객체 그대로 JSON으로 응답.

![SearchParam JSON 매핑 구조](/assets/20210326_035825.png)

응답 상태 200으로 성공한 결과가 출력된다.

---

## HTTP 메서드 정리

![REST API 메서드 전체 정리](/assets/20210326_040839.png)
