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

그리고 postmapping은 유저로부터 정보 받는거고


-------------

final은 상수, 한번 만들어지면 변경 불각
또 컴파일 할때 초기화가 되어있어야 한다! 안 그러면 에러남.

(final은 null이면 안된다. 무조건 값이 있어야 한다.)
 ![20210704_021853](/assets/20210704_021853.png)
lombok중 requiredArgsConstructor가 있는데

이 어노테이션을 쓰면 밑에 new 생성자 부분을 안 적어도 된다.

초기화 된 생성자를 만들어준다.



------


여기서 userRepository로 findAll을 하게 되고 이걸 List 형식으로 받게 된다. 그리고 MessageConverter로 인해 JavaObject를 Json 문자열 형태로 받게 된다.


-----

스프링은 데이터 응답할  메시지 컨버터가 응답하는데 기본 동작이 json이다.

legacy는 메시지 컨버터를 내가 직접 설정해줘야 한다.(옛날 방식)

------



public ResponseEntity<T> save(@RequestBody User user) {

이 부분은 우리가 지정해주는 ResponseEntity쓰라는 뜻.


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


로 만들어두고



실행하면 콘솔에 이런 CORS 정책 관련 오류가 나온다.

하도 자바스크립트로 장난질을 많이 해서

서버 외부에서 하는 요청을 모두 막는게 CORS.

@CrossOrigin은 CORS정책 상관 없다고 풀게 된다.


![20210704_222621](/assets/20210704_222621.png)

-------

Validation 체크

request와서 검사 할떄 노가다다 4자 들어와야되는데 10자 들어와서 검사하거나 한글 들어와야되는데 영어가 들어오거나 이러넉도 다 노가다.


컨트롤러에서 받는게 아니라 컨트롤러 전에 필터가 받음.


user->dispatcher->/user주소가 있는 함수 찾음.
