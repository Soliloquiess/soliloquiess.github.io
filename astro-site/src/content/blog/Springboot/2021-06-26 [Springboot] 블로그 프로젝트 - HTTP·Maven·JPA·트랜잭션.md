---
title: "[Springboot] 블로그 프로젝트 - HTTP·Maven·JPA·트랜잭션"
date: 2021-06-26
category: "Springboot"
tags: ["Springboot"]
description: "패키지 스캔과 IoC, HTTP 통신, Maven, JPA 연관관계와 OSIV 전략, 스프링 동작 원리, OAuth까지 블로그 프로젝트를 만들며 배운 핵심 개념을 정리한다."
permalink: "study/2021/06/26/blogProject"
---

## 패키지 스캔과 설정 파일

- **패키지 스캔**: 필요한 것들을 메모리에 로드한다(IoC, 싱글턴). 해당 패키지 이하에 두어야 `new`로 생성된다.

![패키지 구조](/assets/20210626_150058.png)

### properties vs yml

스프링은 properties도 되지만 yml로도 모든 설정이 가능하다.

- properties는 설정할 때 같은 내용을 반복해서 적어야 하지만, yml은 계층 구조로 더 간결하게 작성할 수 있다.
- 스프링 공식 사이트는 properties를 쓰지만, Gradle/Maven처럼 둘 다 큰 차이는 없어 보인다.

### Git 관리

세 가지를 일치시키는 것이 Git을 관리하는 방법이다.

![Git 관리](/assets/20210626_192515.png)

![동기화](/assets/20210626_193226.png)

일치시킨다고 할 때 **동기화**라는 용어를 많이 쓴다.

> ex) 2개의 다른 파일을 동기화시켜서 일치시킨다.

---

## HTTP 1.1

통신할 때 byte stream(8bit)이 오간다. HTTP 통신은 일종의 **약속**이다.

### 통신 방법 4가지

HTTP 통신에서 B가 서버(데이터를 가지고 있는 쪽, 갑)라고 하면, B에게 스트림을 연결하고 요청하면 B가 응답한다. 요청 방법은 4가지다.

| 메서드 | 의미 | SQL 대응 |
| --- | --- | --- |
| GET | 데이터를 달라 | select |
| POST | 데이터를 추가해줘 | insert |
| PUT | 데이터를 수정해줘 | update |
| DELETE | 데이터를 삭제해줘 | delete |

### 쿼리 스트링

위 메서드만으로는 어떤 데이터를 다루는지(how)가 없다.

![요청 구조](/assets/20210626_204519.png)

서버에 요청할 때 무엇을 요청할지 알려주기 위해, 주소 뒤에 `?`를 사용해 쿼리 스트링을 넣는다.

![쿼리 스트링](/assets/20210626_204754.png)

---

## 세션과 Stateless

- **세션**: 데이터를 응답해줄 준비가 됨(인증)
- HTTP는 전달이 목적이라 선이 끊기면 다음 요청 때 곤란하다.
- **stateless**: 세션을 어떻게 유지할지에 대한 방법. 스프링에서는 시큐리티를 사용해 세션을 유지하는지 확인할 수 있다.

![세션](/assets/20210626_210503.png)

---

## 패킷 스위칭과 MIME

HTTP 통신은 패킷 스위칭과 서킷(회선) 방식으로 나뉜다.

![패킷 스위칭](/assets/20210626_211216.png)

MIME 타입은 매우 다양하다.

- 참고: [MDN - Common MIME types](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)

```

//사용자가 요청-> 응답(HTML파일)
//@Controller

//사용자가 요청->응답(Data)

@RestController
public class HttpControllerTest {

	//인터넷 브라우저 요청은 무조건 get요청 할 수 밖에 없다.
	// http://localhost:8080/http/get(select)
	@GetMapping("/http/get")
	public String getTest() {
		return "get요청";
	}



	// http://localhost:8080/http/post(insert)
	@PostMapping("/http/post")
	public String posttTest() {
		return "post 요청";
	}

	// http://localhost:8080/http/put(update)
	@PutMapping("/http/put")
	public String puttTest() {
		return "put요청";
	}

	// http://localhost:8080/http/delete(delete)
	@DeleteMapping("/http/delete")
	public String deleteTest() {
		return "delete 요청";
	}

}

```

### 인터넷 브라우저 요청은 무조건 GET 요청

브라우저 주소창으로는 POST, PUT, DELETE가 바로 안 되므로, 위 경로들을 주소창에 넣고 직접 실행해보자.

### 데이터 형식과 MessageConverter

- raw 데이터로 보낸 것은 `text/plain`을 보낸 것이다.
- JSON 형태로 보낼 때는 key-value 형태이며, key는 항상 String으로 보낸다.

![JSON 전송](/assets/20210626_225121.png)

value에는 숫자, 문자, JSON 오브젝트 등이 올 수 있다. 서버에서는 다음과 같이 받아서 출력한다.

![서버 수신](/assets/20210626_225750.png)

![출력 결과](/assets/20210626_230314.png)

그런데 text 형태로 보내면 제대로 응답하지 못한다.

![text 전송 실패](/assets/20210626_230405.png)

내가 보낸 데이터가 문자열이라 제대로 매핑되지 않기 때문이다. 반면 JSON으로 보내면 자동으로 파싱해서 데이터를 넣어준다. 이 일은 스프링 부트의 **MessageConverter**가 처리한다.

![MessageConverter](/assets/20210626_230501.png)

PUT으로 수정할 때도 마찬가지다. Body 데이터를 받았으니 `@RequestBody`를 사용한다.

> **결론**: 스프링에서 body로 데이터를 실어 보내면, `@RequestBody`를 사용해 오브젝트로 매핑해서 받을 수 있다.

---

## Maven이란

프로젝트를 하나 하려면 JDBC 등 여러 라이브러리가 필요하다.

![의존성 문제](/assets/20210626_232645.png)

JSoup 같은 라이브러리를 각 사이트에서 일일이 다운받으면 매우 불편하다(각 DB마다 새로 받아야 함).

![중앙 저장소](/assets/20210626_232818.png)

그래서 중앙 저장소에 전부 넣어두고, 우리는 거기에 접근해서 받으면 된다.

- `pom.xml`을 만들어 필요한 라이브러리를 기술한다.
- `.m2` 폴더(윈도우에서 `.`은 숨김 폴더) 내부에 전부 다운받고 자동으로 빌드까지 해준다.
- 리눅스 같은 곳에도 `pom.xml`만 배포하면 된다. 내 프로젝트를 그대로 넣고 Maven을 설치하면 끝이다.

---

## Lombok과 빌더 패턴

```
//@Getter
//@Setter
@Data //이러면 게터 세터 동시 생성
//@AllArgsConstructor
@RequiredArgsConstructor
public class Member {

	//디비에서 들고 온 값을 변경할 리가 없어서 final을 사용한다.
	private final int id;
	private final String username;
	private final String password;
	private final String email;

}

```

객체를 다음처럼 만들면 생성자 오버로딩을 별도로 작성해야 한다.

```
		Member m = new Member("ssar","1234","email");

```

```
public Member(int id, String username, String password, String email) {

	this.id = id;
	this.username = username;
	this.password = password;
	this.email = email;
}

public Member(String username, String password, String email) {

	this.username = username;
	this.password = password;
	this.email = email;
}


```

하지만 빌더 패턴을 쓰면 다음과 같이 가능하다.

```

		Member m = Member.builder().username("ssar").password("1234").email("ssar@naver.com").build();
```

- 원래는 빌더도 직접 만들어야 하지만, 이 경우 빌더가 값을 만들어준다.
- 생성자 순서를 지킬 필요 없이 빌더 패턴으로 만들 수 있다.

---

## yaml 설정

스프링을 설정한다는 것은 기존에 XML에 설정하던 것을 yml로 한다는 의미다.

- 참고: [Inflearn 질문](https://www.inflearn.com/questions/16184)
- 참고 출처: [getinthere.tistory.com](https://getinthere.tistory.com/20?category=884180)

컨텍스트는 프로그램에 들어가기 위한 진입점이다.

### (1) jasper

`.jsp` 경로를 설정하는 이유: 스프링 부트는 기본적으로 JSP 사용을 권장하지 않아 Thymeleaf 같은 다른 템플릿 엔진을 사용해야 한다. 하지만 JSP를 사용하려면 해당 구조로 폴더를 구성한 뒤 jasper를 세팅해야 한다.

### (2) com.mysql.cj.jdbc.Driver

datasource의 MySQL 드라이버에 `cj`가 들어간 이유: MySQL 6점대 이상 버전부터는 해당 드라이버를 사용하고, 그 이전 버전은 `cj`가 없는 `com.mysql.jdbc.Driver`를 사용한다.

### (3) open-in-view

`org.springframework.orm.hibernate3.support.OpenSessionInViewFilter` 클래스로, 영속성을 프레젠테이션 계층까지 가져간다.

- 트랜잭션은 Service 계층에서 종료된다.
- 트랜잭션 종료 후에도 Controller의 Session이 close되지 않았기 때문에, 영속 객체는 Persistence 상태를 유지할 수 있고 프록시 객체에 대한 Lazy Loading을 수행할 수 있다.
- 버전 2.0부터 스프링 부트는 OSIV가 활성화되어 있을 때 경고를 발행하므로, 프로덕션에 영향을 주기 전에 이 문제를 발견할 수 있다.

```

```

### 그 외 설정

- `static` 이하에는 브라우저가 인식할 수 있는 파일만 둬야 한다.
- `ddl-auto: create`를 하면 테이블을 새로 만들겠다는 뜻이다.
- `use-new-id-generator-mappings: false`는 JPA의 기본 넘버링 전략을 따라가지 않겠다는 뜻이다.

---

## 연관관계 주인 = FK를 가진 오브젝트

![연관관계](/assets/20210628_100916.png)

DB로 쿼리문을 날리는 게 아니라 join문을 날린다. Board 오브젝트와 User 오브젝트가 있고, Board를 select하면 User가 같이 조회된다(User를 들고 있기 때문).

![연관관계 매핑](/assets/20210628_101310.png)

![매핑 결과](/assets/20210628_103055.png)

![조회 결과](/assets/20210628_103157.png)

> 댓글은 펼치기 전까지는 필요 없으므로 Eager 전략이 필요 없다.

---

## JSON이란

![JSON 개념](/assets/20210628_113314.png)

![JSON 구조](/assets/20210628_113353.png)

![JSON 예시](/assets/20210628_114349.png)

---

## 기타 메모

- Enum을 넣으면 데이터를 넣을 때 값을 강제할 수 있다.
- 자바는 파라미터로 함수를 넣지 못한다(자바스크립트와 달리).
- save를 호출하지 않아도 (영속성 컨텍스트의 변경 감지로) 업데이트가 된다.

---

## 스프링 컨트롤러의 파싱 전략 정리

### 1. GET 요청

주소에 데이터를 담아 보낸다. 데이터 형태는 `key=value`.

### 2. POST, PUT, DELETE 요청

Body에 데이터를 담아 보낸다. 데이터 형태는 JSON으로 통일하는 것이 좋다.

### 3. 파싱 전략 1 - key=value 자동 파싱

스프링 컨트롤러는 `key=value` 데이터를 자동으로 파싱하여 변수에 담아준다.

GET 요청은 `key=value`이고, POST 요청 중 `x-www-form-urlencoded`(form 태그로 전송) 시에도 `key=value`이므로, 함수의 파라미터로 받을 수 있다.

```
PostMapping("/home")
public String home(String username, String email){

    return "home";
}
```

### 4. 파싱 전략 2 - 오브젝트로 파싱

스프링은 `key=value` 형태의 데이터를 오브젝트로 파싱해서 받아주는 역할도 한다.

> **주의**: setter가 없으면 `key=value` 데이터를 스프링이 파싱해서 넣어주지 못한다.

```
class User {
	private String username;
    private String password;

    public String getUsername(){
    	return username;
    }

    public String getPassword(){
    	return password;
    }

    public void setUsername(String username){
    	this.username = username;
    }

    public void setPassword(String password){
    	this.password = password;
    }

}
```

```
PostMapping("/home")
public String home(User user){

    return "home";
}
```

### 5. key=value가 아닌 데이터는 어떻게 파싱할까?

JSON이나 일반 text 데이터를 스프링 컨트롤러에서 받으려면 `@RequestBody` 어노테이션이 필요하다.

기본 전략상 스프링 컨트롤러는 `key=value` 데이터를 파싱해서 받는데, JSON 같은 데이터는 다음과 같이 생겼다.

```
{
    "username":"ssar",
    "password":"1234"
}
```

이런 데이터는 스프링이 오브젝트로 받지 못한다. 그래서 `@RequestBody` 어노테이션을 붙이면 MessageConverter를 구현한 Jackson 라이브러리가 동작하면서 JSON 데이터를 자바 오브젝트로 파싱해 받아준다.

```
PostMapping("/home")
public String home(@RequestBody User user){

    return "home";
}
```

---

## 회원 가입 시 Ajax를 쓰는 이유 2가지

### 1. 응답을 HTML이 아닌 Data(JSON)로 받기 위해

![Ajax 응답 1](/assets/20210630_003137.png)

![Ajax 응답 2](/assets/20210630_003542.png)

### 2. 비동기 통신을 하기 위해

---

## DB 격리 수준 - READ COMMITTED

- **트랜잭션**: 일이 처리되기 위한 가장 작은 단위

---

## 스프링의 전통적인 트랜잭션

### 스프링 시작 순서

1. 톰캣 시작 - 서버 작동
2. `web.xml`
3. `context.xml` → DB 연결 테스트

![전통적 트랜잭션](/assets/20210630_031621.png)

### 송금 예시 (홍길동 → 장보고 만원 송금)

1. 송금 요청
2. XML을 거치고 필터를 거친다. 이 시점에 다음이 만들어진다.
   1. 데이터베이스 연결 세션 생성 (JDBC 커넥션이 되어 select/insert 가능)
   2. 트랜잭션 실행
3. 컨트롤러를 거쳐 서비스 실행

송금 서비스에서 select를 2번 하고, DB 계좌 테이블을 영속성 컨텍스트로 만든다. select된 객체를 받아 홍길동과 장보고의 계좌 정보를 들고 있는 상태에서 값을 변경한다(아직 DB 변경은 안 되고 영속성 컨텍스트에 있는 것만 바뀜).

- `@RestController`는 데이터만 응답한다.
- `@Controller`라면 HTML만 리턴한다.

이대로 끝나면 DB에 값이 반영되지 않았는데, 트랜잭션을 종료시키면 영속성 컨텍스트의 값을 변경 감지(dirty checking)해서 flush로 DB에 반영한다. 그리고 response 후 JDBC 커넥션을 끊는다.

> 이게 기본 로직이며, 여기에 문제점이 하나 있다고 한다.

---

## 스프링 JPA의 OSIV 전략

![OSIV 전략](/assets/20210630_034810.png)

### OSIV 동작 순서

1. JDBC 커넥션 (DB로 쿼리를 날릴 수 있음)
2. 트랜잭션 시작
3. 영속성 컨텍스트 시작 (사용자마다 시작)
4. JDBC 커넥션 종료
5. 트랜잭션 종료 - commit - 변경 감지(update 수행)
6. 영속성 컨텍스트 종료

### Eager vs Lazy 예시 (이대호 선수 정보)

![선수-팀 연관관계](/assets/20210630_034810_p4c38zbf3.png)

이대호 데이터를 들고오려면 Foreign Key로 team id가 연결되어 있다.

![ManyToOne](/assets/20210630_034944.png)

위는 `@ManyToOne`이다(한 팀에 여러 명 존재 가능).

- `@ManyToOne`은 기본 전략이 **Eager**여서 이대호 정보와 팀 정보를 같이 가져온다.
- 이 2개 정보 중 이대호 정보만 들고온다.

**Lazy** 정보를 요청하면 1차 캐시를 들고오지 않는다.

- 영속성 컨텍스트가 종료되면 팀 정보를 못 가져온다.
- Eager는 팀 정보까지 같이 들고오지만, Lazy는 지연 로딩으로 롯데 팀의 프록시 객체를 들고온다.
- 프록시는 실제 정보가 아니라 빈 객체(데이터 없음)다. Lazy일 때는 이렇게 들고온다.
- 실제 팀 정보를 호출해도 안 되는 이유는 영속성을 날렸기 때문이다.

![Lazy 로딩](/assets/20210630_041246.png)

`getTeam`으로 팀 정보를 가져오면 호출된다. 트랜잭션을 건드리지 않고 JDBC를 다시 시작하면 DB에서 롯데 팀 정보를 가져오고 커넥션을 닫는다. 그러면 실제 객체가 들어가게 된다.

![팀 정보 조회](/assets/20210630_041425.png)

그리고 response하고 view를 보낸 뒤 영속성 컨텍스트를 종료한다.

### 정리

![OSIV 정리 1](/assets/20210630_042450.png)

세션이 시작되고 그 안에 영속성 컨텍스트가 있으며, `controller → service → repository` 순으로 진행된다. Repository에서 select 등을 했을 때 1차 캐시에 없으면 가져와 객체를 만든다. 이때 전략이 Eager면 팀 객체가 만들어지고, Lazy면 실제 데이터가 아닌 빈 프록시 객체가 만들어진다.

연결하고 업데이트 등을 다 한 뒤 서비스가 종료되는 시점에 커넥션과 트랜잭션이 종료된다.

![OSIV 정리 2](/assets/20210630_042605.png)

종료가 되어도 아직 영속성 컨텍스트는 살아있다. 컨트롤러에서 팀 객체를 호출하면 프록시 객체가 실제 팀 객체로 변경되고, DB에 연결해 팀 정보를 가져온다. 그러면 컨트롤러가 선수와 팀 객체를 받아 response한다.

> 전통적인 방식은 request 시작 시점에 JDBC, 트랜잭션, 영속성을 실행하고 끝날 때 다 같이 종료했다면, 최근에는 위처럼 바뀐 방식으로 실행하는 경우가 많다. `open-in-view`로 영속성 컨텍스트의 Eager/Lazy 로딩 방식을 설정할 수 있다.

---

## 스프링 작동 원리

- DispatcherServlet은 어떤 주소가 들어오는지 확인하고 컨트롤러로 요청을 보낸다.
- 그다음 컨트롤러가 메모리에 뜬다.

![스프링 작동 원리](/assets/20210701_231640.png)

위 4개는 요청 시마다 메모리에 떠 있다. 사용자 한 명이 요청하면 쓰레드가 만들어지면서 이 4개가 하나로 유지된 상태로 계속 뜬다. datasource는 DB와의 직접적인 연결이다.

### 로그인 요청 흐름

사용자가 로그인을 요청한다고 하면(톰캣과 DispatcherServlet은 메모리에 떠 있어야 함):

1. `request = http://localhost:8000/login`을 POST로 요청 → body에 username, password가 담겨 간다.
2. DispatcherServlet이 필터를 거쳐 요청이 들어오면 컨트롤러를 메모리에 띄운다. 컨트롤러는 주소를 만들어 데이터를 받는 역할이다(일반 컨트롤러에는 viewResolver가 작동).
3. 컨트롤러는 body 데이터를 받아 서비스로 넘기고, 서비스는 로그인 서비스를 시작한다.
4. 회원이 있는지 없는지는 DB에서 select 해봐야 안다. JPA Repository가 영속성으로 물어보고, 들고 있으면 응답한다. 없으면 datasource로 넘겨 유저 정보를 확인한다.
5. 리턴받은 값을 서비스에서 null인지 체크하고, null이 아니면 로그인 처리(세션 등록)를 한다. 어느 페이지로 갈지는 홈페이지 규칙에 따른다.

> DB는 모든 요청이 정상으로 끝나야 정상 종료되며, 한 건이라도 실패하면 모든 것을 롤백해야 한다. 이런 트랜잭션 처리를 **서비스**에서 한다.

![서비스의 역할](/assets/20210702_014211.png)

서비스의 역할은 하나의 기능을 담당하는 것이며, 이 기능을 수행하려면 여러 번의 DB 요청이 있을 수 있다. 하나의 패키지로 담고 있는 것이 하나의 서비스라고 보면 된다.

---

## OAuth

수많은 사이트에 '나'라는 존재(개인정보)가 퍼지면 관리가 어렵다. 하나의 아이디로 A, B 사이트에 개인정보가 모두 가는 셈이다.

- 보안을 유지하려면 한 곳(예: 네이버)만 관리하면 된다. 네이버가 노출되거나 털리면 정보가 새지만, 빠르게 비밀번호를 바꾸는 식으로 대응할 수 있다.
- **OAuth(Open Auth)**: 인증 처리를 대신해준다.

![OAuth 흐름](/assets/20210702_040752.png)

액세스 토큰을 받으면 권한을 부여받게 된다(홍길동 정보에 접근할 수 있는 권한).

![액세스 토큰](/assets/20210702_041939.png)

> 권한을 부여받는다 = 코드를 받는다 = 액세스 토큰을 받는다.

- 이 액세스 토큰이 홍길동에 접근할 수 있는 열쇠가 된다.
- 카카오 API가 인증 서버가 된다.
- 스프링에서 공식 지원하는 OAuth 주체는 페이스북과 구글이며, `OAuth-Client`로 쉽게 제공해준다.

![OAuth 설정](/assets/20210702_041910.png)

처음 시작 설정 시에도 미리 제공해준다.

### 카카오 로그인 설정 예시

![카카오 설정](/assets/20210702_174341.png)

- 클라이언트 키: `707fa25f64a631c417b6e7d590d8e58a` (REST API 키)
- 로그인 콜백 주소: `http://localhost:8000/auth/kakao/callback`
- 로그아웃 콜백 주소: `http://localhost:8000/auth/kakao/logout`
- User object: id(번호), username, password, email
- 카카오로부터 받을 정보: 프로필 정보(필수), 이메일(선택)

로그인 요청 주소:

```
https://kauth.kakao.com/oauth/authorize?client_id=:707fa25f64a631c417b6e7d590d8e58a&redirect_uri=http://localhost:8000/auth/kakao/callback&response_type=code
```

```
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<div class="container">
	<form action="/auth/loginProc" method="post">
		<div class="form-group">
			<label for="username">Username</label>
			<input type="text" name="username" class="form-control" placeholder="Enter username" id="username">
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" name="password" class="form-control" placeholder="Enter password" id="password">
		</div>

		<button id="btn-login" class="btn btn-primary">로그인</button>
		<a href="https://kauth.kakao.com/oauth/authorize?client_id=707fa25f64a631c417b6e7d590d8e58a&redirect_uri=http://localhost:8000/auth/kakao/callback&response_type=code">
		<img height="38px" src="/image/kakao_login_button.png" /></a>
	</form>

</div>

<%@ include file="../layout/footer.jsp"%>




```

![loginForm 실행](/assets/20210702_184109.png)

`loginForm`으로 실행하면:

![코드 전달 확인](/assets/20210702_184050.png)

위와 같이 나오고, 코드가 넘겨받아진 것을 확인할 수 있다.

---

## @Autowired 원리

- `final`은 초기화만 해야 한다(어떤 값이든).
- `@RequiredArgsConstructor` 어노테이션을 붙여야 한다.

![@Autowired](/assets/20210703_180219.png)

`@RequiredArgsConstructor`를 붙이면 생성자에 필요한 arg를 다 주입해준다. 즉, 초기화되지 않은 필드(꼭 초기화되어야 하는 필드)를 생성자 호출 시 파라미터로 받아 초기화해주라는 의미다.
