---
title: "[Springboot] blogProject"
layout: post
subtitle: Springboot
date: "2021-06-26-04:52:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

패키지 스캔 : 필요한 것들을 메모리 로드 IOC 싱글턴.

해당 패키지 이하로 만들어야 new 해서 만들어진다.

![20210626_150058](/assets/20210626_150058.png)

스프링은 properties도 되지만 yml에도 설정이 가능한데 스프링의 모든 파일의 설정을 yml에 설정이 가능하다.

properties안 쓰는 이유는 설정할때 자동완성 해주는
이렇게 적은거 또적고 이런식으로 해야한다. 이 형식 보다 yml이 더 좋다.

스프링 공식사이트엔 프로퍼티 쓰는데 뭐 gralde, maven 처럼 둘다 별 차이 없을거 같기도 하다.

깃은 이 3개를 일치시키는게 깃을 관리하는 방법

![20210626_192515](/assets/20210626_192515.png)

![20210626_193226](/assets/20210626_193226.png)

일치 시킨다고 할 때 동기화라는 용어를 많이 쓴다.

ex) 2개의 다른 파일을 동기화 시켜서 다른 파일을 일치시킨다.

---

### http 1.1

통신하는데 byte stream(8bit)가 왔다갔다 한다.

http 통신: 약속

통신 방법 : 4가지

1. get
2. post
3. put
4. delete

http 통신은 B가 서버라고 하면(서버는 데이터를 가지고 있는 사람(갑))

B한테 스트림 연결하고 요청하는데 그럼 B가 응답하게 된다.

통신 방법은 요청의 방법이 4가지이다.

- get은 데이터를 달라고 할때 사용한다 - select
- post는 데이터를 추가해줘 - Insert 요청
- put은 데이터를 수정해줘 - update
- delete 는 데이터를 삭제해줘 - delete

근데 저기서 각 어떤 데이터를 다루는지 how가 없다.

![20210626_204519](/assets/20210626_204519.png)

A가 서버에 요청할때 뭘 요청할지 모르므로 how를 넣기 위해선
뒤에 쿼리스트링을 넣는다(? 사용)

![20210626_204754](/assets/20210626_204754.png)

---

세션 : 데이터를 응답해줄 준비가 됨(인증)
전달 목적이 http 인데 이렇게 선이 끊기면 다음 요청떄 좀 곤란하므로
stateless 는 세션을 어떻게 만드는 지 하는 방법.
스프링에서는 시큐리티를 사용해서 세션을 유지하는 지 알 수 있다.

![20210626_210503](/assets/20210626_210503.png)

---

http 통신은 패킷스위칭과 서킷 패킷스위칭으로 나뉜다.

![20210626_211216](/assets/20210626_211216.png)

https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

Mime 타입이 되게 많다.

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

#### 인터넷 브라우저 요청은 무조건 get요청 할 수 밖에 없다.

(바로 post, put,delete가 안되므로 직접 저 경로들을 주소창에 넣고 실행해보자.)

raw데이터 보낸건 text/plain을 보낸거

여기서 json형태로 보내는데 키값의 형태다. 그리고 키는 항상 String 형태로 보낸다.

![20210626_225121](/assets/20210626_225121.png)

오른쪽은 숫자든 문자든 제이슨 오브젝트든 이렇게 올 수가 있다.

그럼 서버에선 사실

![20210626_225750](/assets/20210626_225750.png)

이렇게 받아서 출력한다.

![20210626_230314](/assets/20210626_230314.png)

그런데 이렇게 보냈는데 text형태로 보내면 제대로 응답하지 못한다.

![20210626_230405](/assets/20210626_230405.png)

왜냐면 내가 보낸 데이터가 text형태인데 문자열이라 제대로 매핑이 안된다. 그런데 json으로 보내면 자동으로 파싱해서 데이터 넣어준다 그리고 이 일을 MessageConverter는 스프링 부트가 하게된다.

![20210626_230501](/assets/20210626_230501.png)

위도 마찬가지.

put으로 수정도 마찬가지다.
Body데이터 받았으니까 @RequestBody사용

결론은 스프링에서 body로 데이터 실어서 보내면 오브젝트로 매핑해서 받을 수 있는데 RequestBody사용해서 오브젝트로 매핑해서 받을 수 있다.

---

### Maven이란

프로젝트 하나 하려고 하면 jdbc가 필요하다.

![20210626_232645](/assets/20210626_232645.png)

jsoup 이런거 각각 사이트 다운받게되면 굉장히 불편하다.(각 디비마다 새로 받아야)

그래서 중앙 저장소에 전부 넣고 우린 중앙저장소에 접근해서 받으면 된다.

![20210626_232818](/assets/20210626_232818.png)

파일을 하나 만드는데 pom.xml을 만들어 거기에 필요한 문서들을 기술한다.

그리고 .m2폴더가 있는데(윈도우에서 .은 숨김폴더)
그 내부에 다 다운받고 자동으로 빌드까지 해줌.

우리는 pom.xml에 필요한 걸 넣어주면 되고 리눅스 같은곳에도 pom.xml을 배포만 해주면 된다.

내 프로젝트 그대로 집어넣고 메이븐 설치하면 끝난다.

---

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

만약 멤버를

```
		Member m = new Member("ssar","1234","email");

```

이렇게 만들고 보내면 오버라이딩 생성자 해서 또 만들어야 되지만

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

builder 패턴을 쓰면

```

		Member m = Member.builder().username("ssar").password("1234").email("ssar@naver.com").build();
```

이렇게도 가능하다.
원래는 빌더도 만들었어야하지만 이 경우 빌더가 값을 만들어준다.
그리고 생성자 순서도 지켜야 됐지만 그런거 상관없이 빌더패턴으로 만들 수 있다.

---

### yaml 설정

- 스프링을 설정하겠다는거 기존에는 xml에 설정했는 간단하게 설명 보면 xml파일이라는 건

https://www.inflearn.com/questions/16184

을 보면 잘 나와있다.

참고 출처: https://getinthere.tistory.com/20?category=884180

포트내 컨텍스트 설치 컨텍스트는 프로그램 들어가기 위한 진입점이다.

(1) jasper

.jsp 경로를 설정한 이유는 스프링 부트는 기본적으로 jsp사용이 권장하기 않기 때문에 timeleaf 같은 다른 템플릿 엔진을 사용해야 한다. 하지만 jsp를 사용하기 위해서는 해당 구조로 폴더 구성을 한 뒤 세팅하여야 한다. (jasper)

(2) com.mysql.cj.jdbc.Driver

datasource 의 mysql 드라이버에 cj가 들어간 이유는 mysql 6점대 이상 버전부터는 해당 드라이버를 사용하고 그 이전 드라이버는 cj가 없는 com.mysql.jdbc.Driver를 사용한다.

(3) open-in-view

org.springframework.orm.hibernate3.support.OpenSessionInViewFilter 클래스
영속성을 프리젠테이션 계층까지 가져간다. 트랜잭션은 Service계층에서 종료된다. Transaction이 종료된 후에도 Controller의 Session이 close되지 않았기 때문에, 영속 객체는 Persistence 상태를 유지할 수 있으며, 따라서 프록시 객체에 대한 Lazy Loading을 수행할 수 있게 된다.

버전 2.0부터 스프링 부트는 기본적으로 OSIV가 활성화되어있을 때 경고를 발행하므로 프로덕션 시스템에 영향을 주기 전에 이 문제를 발견 할 수 있다.

```

```

static이하에는 브라우저가 인식할 수 있는 파일만 둬야 한다.

ddl-auto: create을 하면 테이블을 새로 만들겠다는 뜻.

use-new-id-generator-mappings: false 이건 jpa의 기본 넘버링 전략을 따라가지 않음.

---

### 연관관계 주인 = FK를 가진 오브젝트

![20210628_100916](/assets/20210628_100916.png)

디비로 쿼리문 날리는게 아니라 join문 날림.
board 오브젝트와 user오브젝트 오고 보드인데 보드를 셀렉트 하면 user가 같이 조회됨(user를 들고 있어서)

![20210628_101310](/assets/20210628_101310.png)

![20210628_103055](/assets/20210628_103055.png)

![20210628_103157](/assets/20210628_103157.png)

댓글은 펼치기 전까지는 필요 없음. Eager전략이 필요 없음.

---

### Json이란

![20210628_113314](/assets/20210628_113314.png)

![20210628_113353](/assets/20210628_113353.png)



![20210628_114349](/assets/20210628_114349.png)

---

Enum을 넣으면 데이터 넣을때 값을 강제 시킬 수 있다.


--------

자바는 파라미터로 함수를 못 넣는다(자바스크립트와 달리)

save 안해도 업데이트가 된다.

--------

1. Get요청
주소에 데이터를 담아 보낸다. 데이터 형태는 key=value



2. Post, Put, Delete 요청
Body에 데이터를 담아 보낸다. 데이터 형태는 json으로 통일하는 것이 좋다.



3. 스프링 컨트롤러의 파싱 전략 1
스프링 컨트롤러는 key=value 데이터를 자동으로 파싱하여 변수에 담아준다.

가령 get요청은 key=value이고 post요청중에 x-www-form-urlencoded (form태그를 만들어서 데이터 전송) 시에도 key=value 이기 때문에 이러한 데이터는 아래와 같이 함수의 파라메터로 받을 수 있다.

PostMapping("/home")
public String home(String username, String email){

    return "home";
}
4. 스프링 컨트롤러의 파싱 전략 2
스프링은 key=value 형태의 데이터를 오브젝트로 파싱해서 받아주는 역할도 한다.

** 이때 주의 할점은 setter가 없으면 key=value 데이터를 스프링이 파싱해서 넣어주지 못한다.

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
PostMapping("/home")
public String home(User user){

    return "home";
}
5. key=value가 아닌 데이터는 어떻게 파싱할까?
json 데이터나 일반 text데이터는 스프링 컨트롤러에서 받기 위해서는 @RequestBody 어노테이션이 필요하다.

** 기본전략이 스프링 컨트롤러는 key=value 데이터를 파싱해서 받아주는 일을 하는데 다른 형태의 데이터 가령 json 같은 데이터는 아래와 같이 생겼다.

{
    "username":"ssar",
    "password":"1234"
}
이런 데이터는 스프링이 파싱해서 오브젝트로 받지 못한다. 그래서 @RequestBody 어노테이션을 붙이면 MessageConverter 클래스를 구현한 Jackson 라이브러리가 발동하면서 json 데이터를 자바 오브젝트로 파싱하여 받아준다.

PostMapping("/home")
public String home(@RequestBody User user){

    return "home";
}


--------


###회원 가입시 Ajax를 쓰는 이유 2가지

1. 요청에 대한 응답을 html이 아닌 Data(Json)을 받기 위해

![20210630_003137](/assets/20210630_003137.png)

![20210630_003542](/assets/20210630_003542.png)

2. 비동기 통신을 하기 위해서이다.


----------


### DB격리수준 READ COMMIT

- 트랜잭션 : 일이 처리되기 위한 가장 작은 단위




-----------

### 스프링의 전통적인 트랜잭션


스프링 시작
1. 톰캣 시작 - 서버 작동
2. web.xml
3. context.xml-> 디비 연결 테스트

![20210630_031621](/assets/20210630_031621.png)

1. 송금요청(홍길동이 장보고에게 만원 송금)
2. xml 거치고 필터 거침
이 시점에 만들어지는게 있는데

	1. 데이터베이스 연결 세션 생성.(JDBC커넥션 되서 select라던지 insert라던지 가능)
	2. 트랜잭션 실행

3. 컨트롤러 거치고 서비스 실

송금이라는 서비스 할떄 아래 우측 select 2개하고 (서비스 로직에서) 디비에서 계좌테이블에 영속성 컨텍스트로 만듬.

select 하고나서 select된 객체를 받는다.
그걸 다시 응답 받아서 홍길동과 장보고의 계좌정보를 들고있는데 이걸 값을 변경한다(아직 디비 변경은 안되고 영속성 컨텍스트에 있는거만 바뀜)

RestController는 데이터만 응답.

컨트롤러라면 html만 리턴.

그럼 이렇게 끝나면 디비에 값이 반영이 안되었는데 트랜잭션 종료 시킨다.
그럼 자동으로 영속성컨텍스트에 있던 값을 변경감지해서 flush해서 값을 디비에 집어넣는다 그리고 response하고 jdbc 커넥션을 끊어버린다.

이게 기본 로직이다.

request하게 되면 필터에서(2,3에서 디비연결이 실행되고 트랜잭션 실행 컨트롤러가 요청받아서 요청 분기시켜서 송금을 실행.송금하려면 업데이트 2번해야되는데 그냥 셀렉트 해서 영속성 컨텍스트에 집어넣는다.  값을 업데이트 하고(객체 든 값 바 그리고 컨트로러 들어오 트랜잭션 종료되고 디 연계 세션 종료. 트랜잭션 종료되면 변경 감지하고 (영속화 된 객체가 변경되서 값을 변경시켜서 response가 되고 프로그램 종료되고 끝난다.
	)))

이게 스프링의 전통적인 트랜잭션인데 문제점이 하나 있다고 한다.

------


### 스프링 JPA의 OSIV 전략


![20210630_034810](/assets/20210630_034810.png)

1. JDBC 커넥션이 됨 = DB쪽으로 쿼리를 날릴 수 있다.( insert든 select든)
2. 트랜잭션 시작
3. 영속성 컨텍스트 시작(사용자마다 시작)
4. JDBC 커넥션 종료
5. 트랜잭션 종료 - commit- 변경감지(update 수행)
6. 영속성 컨텍스트 종료


여기서 이대호라는 정보를 들고온다 치면

![20210630_034810](/assets/20210630_034810_p4c38zbf3.png)

이대호 데이터 들고오려면 Foreignkey로 team 아이디가 연결되어있음.

![20210630_034944](/assets/20210630_034944.png)

위는 ManyTOone(한팀에는 여러명 존재 가능)

manytoOne은 기본전략이 eager
이대호 정보와 팀 정보를 같이 등록하게 된다.

이 2개정보중 이대호 정보만 들고온다.


----

lazy정보 요청하면 1차캐시를 안들고 와준다.

영속성 컨텍스트 종료되면 팀 정보 못 가져온다.

eager는 팀정보까지 같이 들고오는데 lazy는 지연로딩으로 롯데 팀 프록시 객체를 들고온다.

실제 정보가 아니라 가짜로 정보 들고온다(빈객체로 데이터가 없다.) lazy일때는 이렇게 들고온다.

실제 팀 정보 호출해도 안되는 이유가 영속성을 날렸기 떄문.

lazy로 지연로딩으로 들고 올 수 없다.

![20210630_041246](/assets/20210630_041246.png)


팀 정보를 getTeam으로 가져오면 다 호출 됨. 트랜잭션 건드리지 않고 jdbc를 다시 시작하면 DB에서 정보 들고오게 되면 롯데 팀정보 가져오고 커넥션 닫아버리낟. 그럼 실제 객체가 들어가게 된다.
![20210630_041425](/assets/20210630_041425.png)

그리고 response하고 view보내고 영속성 컨텍스트 종료한다.


정리하면

![20210630_042450](/assets/20210630_042450.png)

이렇게 세션이 시작되고 세션안에 영속성 컨텍스트
가 있으며 controller->service->repository순이다. 그리고
레파지토리에서 셀렉트든 뭐든 뭔짓을 해서 1차캐시에 없으면 가져와서 객체가 만들어지는데 하나의 객체가 만들어지는데 선수라면 이떄 전략이 Eager면 팀객체가 만들어지지만 lazy면 실제데이터가 아닌 빈객체 프록시가 만들어진다.



연결하고 이걸돌려주고 업데이트든 뭐든 다하고 서비스가 종료되는 시점 커넥션과 트랜잭션이 종료된다.


![20210630_042605](/assets/20210630_042605.png)

그리고 저렇게 종료가 되도 아직 영속성 컨텍스트는 살아있는데 컨트롤러에서 팀 객체를 호출하면 프록시 객체가 실제 팀 객체로 변경되고 디비에 연결해서 팀 정보를 가져올 수 있게된다. 그럼 팀프록시가 팀객체로 바뀌고 커트롤러에 선수와  팀객체를 반게되며 response하게 된다.



전통적인 방식에선 requset 시작시점에 jdbc,트랜잭션, 영속성 실행하고 끝날떄 다같이 종료됐다면 최근엔 위에서 설명한 것처럼 바뀌게 실행하는 경우가 많다.

open-in-view로 영속성 컨텍스트의 방식을 eager,lazy로딩을 설정할 수 있다.



--------------

### 스프링 작동원리


디스패쳐는 중간에 어떤 주소 들어오는지 확인하고 컨트롤러로 요청

그 다음 컨트롤러가 메모리에 뜸.

![20210701_231640](/assets/20210701_231640.png)


이 위 4개는 요청시마다 메모리에 떠있는다.
사용자 한명이 요청하면 쓰레드가 만들어지면서 이 4개가 하나로 유지된 상태로 계속 뜨게 됨.

datasource는 디비와 집적적인 연결


만약 사용자가 로그인 요청한다 하면 리퀘스트 시작하고 (톰캣 시작 되어있어야). dispatcher도 메모리 떠있어야 한다.

request = http://localhost:8000/login 이라는 요청이 post로 요청
그럼 body에 username, password가 담겨서 간다.
dispatcher가 필터 거치고 이런 요청이 들어오면
메모링 띄워준다.

컨트롤러는 주소 만들어서 데이터를 받는 역할

일반적인 컨트롤러에 viewResolver가 작동함.


톰캣 시하면 필터 디스패쳐 거쳐서 request요청 주고 해당 메서드 실행 컨트롤러는 바디데이터 받아서 서비스로 넘기고서비스는 그 로그인 서비스를 시작. 있는지 없는지를 디비에서 select 해봐야 안다. jpa레퍼지토리가 영속성으로 물어봄.. 만약 들고 있으면 응답 받으면 되는데 없으면 데이터소스에 넘겨서 유저정보에 있나 확인시킴. 그걸 계속 리턴 받아서 서비스에서 null인지 체크하고 null이 아니면 로그인 가능하니까 로그인 처리하기위해 세션 등록하고 어떤 페이지로 가기 위한건 홈페이지 규칙에 따른다.

디비는 모든 요청이 정상으로 끝나야 정상 종료가 되지 한 건이라도 실패시 모든걸 롤백 시켜야 한다.
이런 트랜잭션 처리를 서비스에서 하게 된다.

정밀하게 서비스의 역할은 기능을 담당한다. 그리고 이 기능을 수행하기 위해선 여러번의 디비 요청이 있을 수 있따.

하나의 패키지로 담고 있는게 하나의 서비스라 보면 된다.

![20210702_014211](/assets/20210702_014211.png)

서비스의 역할은 하나의 기능 담당하고 이 기능 수행하려면 여러번의 데이터베이스 요청 할 수 있음.

------


Oauth
수많은 사이트에 나라는 존재가 퍼짐. 그게 지속되면

이럼 하나의 아이디로 a,b사이트에 개인정보가 간다.
보안을 유지하려면 네이버만 막으면 됨(네이버가 관리되면 보안 유지됨. 근데 네이버가 노출되거나 털리면 정보가 털리긴함. 대신 빠르게 비번을 바꾸거나 하면 낫다.)

Open Auth: 인증처리를 대신해준다.


![20210702_040752](/assets/20210702_040752.png)


액세스토큰을 받게 되는데 이걸 권한을 부여받게 된다(홍길동 정보에 접근할 수 있는 권한)


![20210702_041939](/assets/20210702_041939.png)


권한을 부여받는다 = 코드를 받는다.  = 액세스 토큰을 받는다.

이 액세스 토큰이 대신 홍길동에 접근할 수 있는 열쇠가 된다.

카카오 api가 인증서버가 된다.


스프링에서 공식 지원 Oauth 주체는 페이스북과 구글.

Oauth-Client로 쉽게 페이스북과 구글을 제공해준다.

![20210702_041910](/assets/20210702_041910.png)

처음 시작 설정시에도 미리 제공해준다.
