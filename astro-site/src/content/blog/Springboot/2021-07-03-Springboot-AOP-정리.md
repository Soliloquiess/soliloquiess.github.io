---
title: "[Springboot] Springboot AOP 정리"
date: 2021-07-03
category: "Springboot"
tags: ["Springboot"]
description: "RestController 기반의 요청/응답, PathVariable, ResponseEntity, MessageConverter, CORS, Validation 등 스프링부트 기초 개념을 정리한 학습 노트이다."
permalink: "study/2021/07/03/Springboot-AOP정리"
---

## 중요하게 봐야 할 점

1. RestController
2. 기본적인 요청과 응답
3. Validation 체크
4. 로그 남기기
5. 문서로 만들기
6. CORS 개념

---

## 요청과 응답 기초

### PathVariable

주소로 들어오는 값은 모두 String이다. `@PathVariable`은 주소에 적힌 아이디 값을 해당 파라미터에 넣을 때, 예를 들어 `int`로 변환해주는 역할을 한다.

```java
@GetMapping("/user")
public void findAll() {
}

@PostMapping("/user")
public void save(String username, String password, String phone) {

}
```

`@PostMapping`은 유저로부터 정보를 받는 역할을 한다.

---

### final 키워드

- `final`은 상수로, 한번 만들어지면 변경이 불가능하다.
- 컴파일할 때 초기화가 되어 있어야 한다. 그렇지 않으면 에러가 난다.
- `final`은 null이면 안 되고, 무조건 값이 있어야 한다.

![lombok @RequiredArgsConstructor 예시](/assets/20210704_021853.png)

Lombok의 `@RequiredArgsConstructor`를 쓰면 아래에 `new` 생성자 부분을 직접 적지 않아도 된다. 초기화된 생성자를 자동으로 만들어 준다.

---

### MessageConverter

`userRepository`로 `findAll`을 하면 결과를 List 형식으로 받게 된다. 이후 MessageConverter에 의해 Java Object가 JSON 문자열 형태로 변환되어 전달된다.

- 스프링은 데이터를 응답할 때 MessageConverter가 처리하며, 기본 동작이 JSON이다.
- legacy(옛날 방식)는 MessageConverter를 직접 설정해 줘야 한다.

### ResponseEntity

```java
public ResponseEntity<T> save(@RequestBody User user) {
```

이 부분은 우리가 직접 지정해주는 `ResponseEntity`를 쓰라는 뜻이다.

---

## CORS

아래와 같이 클라이언트 HTML을 만들어 요청을 보내본다.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
  <button onclick="request()">요청하기</button>
  <script>

    function request(){

      var data = {
        username: "sasr",
        password : "1234",
        phone:"0101234124"
      }

      $.ajax({
        type:"post",
        url:"http://localhost:8080/user",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"
      }).done(function(result){
        console.log(result);
    });
  }

  </script>
</body>
</html>

```

실행하면 콘솔에 CORS 정책 관련 오류가 나온다.

- CORS는 서버 외부에서 들어오는 요청을 모두 막는 정책이다. (자바스크립트로 장난질하는 경우가 많아 생긴 보안 장치)
- `@CrossOrigin`을 붙이면 해당 요청은 CORS 정책과 상관없이 허용된다.

![CORS 정책 오류 콘솔 화면](/assets/20210704_222621.png)

---

## Validation 체크

요청이 들어왔을 때 값을 직접 검사하는 것은 번거로운 작업이다. 예를 들어 4자가 들어와야 하는데 10자가 들어오거나, 한글이 들어와야 하는데 영어가 들어오는 경우 등을 일일이 확인해야 한다.

이런 검증은 컨트롤러에서 받기 전에 필터 단계에서 먼저 받는다.

```
user -> dispatcher -> /user 주소가 있는 함수를 찾음
```
