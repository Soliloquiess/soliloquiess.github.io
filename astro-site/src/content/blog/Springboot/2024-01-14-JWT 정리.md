---
title: "[Springboot] Spring Security & JWT 완전 정리 — 인증·인가부터 토큰 구현까지"
date: 2024-01-14
category: "Springboot"
tags: ["Springboot"]
description: "Spring Security의 권한 어노테이션·세션·필터 구조부터 JWT(JSON Web Token)의 Header·Payload·Signature 구조, 발급·검증 흐름, Stateless 기반 Security 적용과 실전 구현 순서까지 하나로 정리한 통합 노트."
permalink: "study/2024/01/14/JWT-정리"
---

## 목차

1. 인증·인가 기초 개념 (세션·TCP·CIA·RSA·RFC)
2. Spring Security 구조와 권한 어노테이션
3. OAuth 로그인 (네이버)
4. JWT 구조와 원리
5. JWT 발급·검증 흐름
6. 기존 인증 방식과의 차이 (Basic vs Bearer)
7. Spring Security에 JWT 적용하기
8. 실전 개발 순서

---

## 1. 인증·인가 기초 개념

JWT를 제대로 이해하려면 먼저 **세션**, **TCP 통신**, **보안 3요소(CIA)**, **RSA 암호화**, **RFC 표준**이라는 배경 개념이 필요하다.

### 1-1. 세션(Session)이 왜 필요한가

![세션 개념](/assets/20210805_170735.png)

웹에서 GET 요청으로 주소를 요청하면 서버는 그 주소(HTML)를 넘겨준다. 이때 HTTP 헤더에 **쿠키**를 담아주는데, 쿠키에 세션 아이디를 담는다. 웹 브라우저는 이 세션 아이디를 받아 자동으로 다시 보낸다.

- 최초 요청으로 세션이 만들어진다.
- 두 번째 요청부터는 세션 아이디를 달고 간다. 헤더에 세션 아이디를 다시 넘겨준다.

비유하자면, 처음 오면 카드가 없으므로 서버는 카드를 만들 때마다 목록을 가지고 있어야 한다. 두 번째 요청부터 카드를 등록하고 목록에 넣는다(없으면 만들고, 있으면 확인). 세션 아이디는 최초 요청에만 만들고, 이후 요청마다 지속적으로 들고온다.

**세션이 사라지는 경우:**

1. 서버에서 세션을 날릴 때
2. 사용자가 브라우저를 모두 닫을 때 (세션 값이 날아감 — 서버 값은 살아있지만 브라우저가 카드를 들고 가지 않음)
3. 시간(타임아웃)이 지났을 때

### 1-2. 세션 동작 흐름

세션이란 로그인 요청(인증)을 하면 동작하는 것이다.

![세션 동작 흐름](/assets/20210806_175201.png)

1. 클라이언트가 서버에 request 한다.
2. 세션이라는 저장소에 세션 아이디를 만든다. 그리고 작은 공간이 생긴다(세션 저장소는 매우 큼).
3. 세션 아이디를 서버에서 클라이언트로 돌려준다.
4. 클라이언트 측 웹 브라우저에 세션 아이디(예: 1234)가 저장된다.
5. 그다음 로그인 요청을 한다.
6. 서버가 확인해서 데이터베이스에 넣는다. 정상이면 그 사람의 유저 정보를 저장한다.
7. 로그인이 성공하면 보통 메인 페이지(HTML)로 리턴한다.
8. 그다음부터 인증이 필요한 것을 요청한다(유저 정보 요청). 세션이 있는지(세션 아이디 1234가 있는지) 확인한다.
9. 유저 정보가 있으면 로그인한 사람인 것을 확인한다.
10. 데이터베이스에서 사용자 정보 응답을 받는다.
11. 사용자 정보를 응답받아 돌려준다.

> 세션은 이 과정을 계속 반복하며, 민감한 정보가 있는지 확인하고 응답한다.

### 1-3. 세션의 단점 — JWT가 해결하는 문제

![세션의 단점](/assets/20210806_175239.png)

클라이언트가 100만 명처럼 너무 많아지면 문제가 생긴다. 서버가 동시 접속자 100명을 처리하면 나머지는 기다려야 한다. 그래서 서버를 여러 개 두고 부하를 분산하는 **로드 밸런싱**을 한다.

하지만 로그인 후 다른 서버로 요청이 가면, 그 서버에는 세션 값이 없으므로 처음 온 것으로 인식한다. 해결 방법은 다음과 같다.

1. **스티키 세션**: 로드 밸런싱에서 2번째 요청이 같은 서버에 붙게 한다.
2. **세션 복제**: 세션을 모든 서버에 복제한다.
3. **세션 저장소 공유**: 서버들이 DB나 별도 저장소에 세션 값을 넣고 공유한다.

세션은 서버 메모리에 접근해 값을 가져와 매우 빠르다. 하지만 DB(하드디스크)에서 찾으면 IO가 일어나 매우 느려진다. 그래서 IO가 없는 **메모리 공유 서버(예: Redis)**를 쓰면 세션 값을 공유하면서도 빠르다.

> **JWT를 쓰면 위의 세션 단점들을 모두 해결할 수 있다.**

### 1-4. TCP 통신과 보안

통신은 **OSI 7계층**으로 이루어진다. (물-데-네-전-세-표-응: 물리/데이터링크/네트워크/전송/세션/표현/응용)

게임(롤)에서 캐릭터의 궁 데이터가 전달되려면, 응용 계층(롤 프로그램)으로 데이터가 넘어가는 식이다.

**TCP vs UDP**

- **TCP**: A가 B에게 "안녕"을 보내면 B가 ACK를 돌려주고, 그다음 "반가워"를 보낸다. ACK를 받는 중 유실되거나 통신이 안 되면 계속 재전송한다. 항상 확인하는 **신뢰성 있는** 방식이다.
- **UDP**:
  - ACK를 신경 쓰지 않고 계속 보낸다(신뢰성 없음).
  - 도착하지 않아도 계속 요청을 보낸다.
  - "안녕 반가워"가 끊겨 "안녕 반워"로 가도, 사람이 받으면 "안녕 반가워"로 인식할 수는 있다.

![TCP/UDP](/assets/20210806_182215.png)

데이터 링크 계층에서 IP로 어떤 집을 찾아갔는데 공유기가 하나 있고 컴퓨터 4개가 물려 있으면, 내부망을 **LAN**, 바깥을 **WAN**이라 한다.

![LAN/WAN](/assets/20210806_182702.png)

![네트워크 구조](/assets/20210806_182831.png)

> TCP 통신 시 어떤 보안 문제가 있는지 알아야 한다.

### 1-5. 보안 3요소 — CIA

A, B, C 나라가 있는데 A, B 나라가 동맹을 맺고 C 나라 모르게 문서를 전달하려 한다. 문서를 그냥 들고 가면 C 나라가 가로채 어떤 데이터인지 알 수 있다. 이것을 문서의 **CIA**라고 한다.

| 요소 | 의미 | 깨지는 경우 |
| --- | --- | --- |
| 기밀성(Confidentiality) | 내용을 못 보게 함 | C가 문서를 획득하면 깨짐 |
| 무결성(Integrity) | 문서 변경을 막음 | C가 문서를 바꿔 전송하면 깨짐 |
| 가용성(Availability) | 문서를 지킴 | 문서를 빼앗기면 깨짐 |

문서를 보낼 때 최고의 병사들을 같이 보내면 쉽게 빼앗기지 않는다(가용성).

![CIA 개념](/assets/20210806_183301.png)

C 나라가 병사를 죽이면 무결성이 깨지므로 문서를 **암호화**한다.

![암호화](/assets/20210806_184122.png)

- 문서를 암호화하면 기밀성이 유지된다.
- 금고를 A라는 열쇠로 잠글 수 있는데, 금고 자체를 가져가면 무결성이 깨진다. 그래서 벽에 붙여놔야 무결성을 가진다.
- A 열쇠를 가지고 금고에 달라붙으면 가용성도 지킬 수 있다.

그런데 문제가 있다. A 열쇠로 잠갔는데, B 나라가 A 열쇠를 받아야 하는 상황에서 C 나라가 가로챌 수 있다.

![열쇠 전달 문제](/assets/20210806_191226.png)

그래서 다음 두 가지가 해결되어야 한다.

1. 열쇠 전달 문제
2. 문서가 누구로부터 왔는지(인증)

### 1-6. RSA — 공개키 암호화

앞의 두 가지 문제(**열쇠 전달**, **인증**)를 해결하는 것이 RSA다.

- **public key**: 공개키
- **private key**: 개인키

A가 B에게 "사랑해"를 전달하고 싶을 때, 이 메시지를 (B의) 공개키로 암호화해서 보낸다.

- 공개키는 블로그 같은 곳에 올려도 상관없지만, 개인키는 개인만 들고 있어야 한다.
- 키가 하나만 있으면(하나로 잠그고 열고) **시메트릭 키(대칭키)**라고 한다.

B의 공개키는 블로그에 공개되어 있어 잠글 수 있는데, 해커가 이것을 가로챈다. 하지만 B의 공개키로 잠겨 있기 때문에 B의 개인키로만 열 수 있고, 해커는 개인키가 없으므로 열지 못한다.

![RSA 공개키 암호화](/assets/20210806_191226_adouy0jdf.png)

이것으로 **열쇠 전달 문제**가 해결된다.

| 사용 키 방향 | 용도 |
| --- | --- |
| 공개키 → 개인키 | 암호화 |
| 개인키 → 공개키 | 전자서명 |

전자서명의 경우:

1. 문서를 받으면
2. A의 공개키로 열어본다.

![전자서명](/assets/20210806_195217.png)

### 1-7. RFC 문서란

![RFC 문서](/assets/20210807_022519.png)

public key와 private key가 있는 암호화 방식을 사용하며, **RFC 7519** 문서에 정의되어 있다. RFC에 대해 알고 가야 한다.

> 프로그래밍을 수박 겉핥기로 하면 실력이 빨리 늘 수 없다. RFC가 뭔지, JWT가 뭔지 등 개념이 잡혀 있어야 문서를 제대로 읽을 수 있다. 영어를 잘한다고 읽을 수 있는 게 아니다.

**HTTP와 RFC의 탄생**

벨 연구소에서 WWW(World Wide Web)이 등장했다. 내부망끼리는 선이 연결되어 데이터를 주고받았다. 그런데 A 대학이 벨 연구소와 통신하려면, 두 내부망이 서로 다른 규칙을 쓰고 있으니 **약속된 규칙**이 필요하다.

![통신 규칙 필요](/assets/20210807_024650.png)

- 약속된 규칙 하나가 RFC의 1번 문서(최초 약속)이고, 이 약속된 방식을 **프로토콜**이라 한다.
- B 대학이 생겨 통신하려는데 프로토콜이 없으면 RFC 2번 문서가 만들어지고, 네트워크가 연결될 때마다 문서가 생긴다.

![RFC 문서 누적](/assets/20210807_025553.png)

이런 문서들이 연결되어 만들어진 것이 **WWW**이고, 이 약속이 **HTTP 프로토콜**이다.

> 예를 들어 K 대학이 참여하려고 규칙을 요청해도, 너무 비대해지면 들어가기 어려워진다(나머지가 다 동의해야 RFC 문서가 됨).

![RFC 생태계](/assets/20210807_025856.png)

처음엔 동의를 얻는 동등한 관계였지만, 지금 만들어지는 문서는 동등하지 않다. 거대한 생태계에 추가하려면 동등한 규약이 되기 어렵다.

![RFC 정리](/assets/20210807_025843.png)

> RFC 문서를 이해하면 된다. 그중 RFC 7519에 정의된 것이 **JWT(JSON Web Token)**이다.

---

## 2. Spring Security 구조와 권한 어노테이션

### 2-1. SecurityConfig

```
@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity // 필터 체인 관리 시작 어노테이션
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소 접근시 권한 및 인증을 위한 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter{



```

### 2-2. `@Secured`

```
@GetMapping("/info")
public @ResponseBody String info() {
  return "개인정보";
}
```

![/info 접근](/assets/20210719_224653.png)

별다른 설정이 없으면 `/info`에는 아무나 들어갈 수 있다. 하지만 위 설정에서 `securedEnabled = true`로 어노테이션 활성화를 시키면, 권한이 없는 사용자의 접근을 막을 수 있다.

![접근 제한 1](/assets/20210719_225529.png)

![접근 제한 2](/assets/20210719_230227.png)

이제 admin이어야만 들어갈 수 있다.

### 2-3. `@PreAuthorize`

해당 어노테이션이 붙은 메서드가 실행되기 **전에** 실행된다.

```
//	@PreAuthorize("ROLE_USER")	//이렇게 하면 안먹는다.
	@PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
	//하나만 걸고싶으면 hasROle하나만 걸면된다(근데 하나 걸바엔 Secured)쓰는게
//	,근데 여러개는 hasrole로 가능하다.
	//이건 메서드가 실행 되기 전에 실행된다.
	@GetMapping("/data")
	public @ResponseBody String data() {
		return "데이터 정보";
	}


```

- 권한 하나만 걸고 싶으면 `@Secured`를 쓰고, 여러 개는 `@PreAuthorize`의 `hasRole`로 처리한다.

### 2-4. `@PostAuthorize`

`@PreAuthorize`와 반대로, 메서드가 **종료된 후**에 실행된다.

### 2-5. 특정 메서드에 권한 걸기

특정 메서드에 간단하게 권한을 걸고 싶으면 이렇게 한다.

![메서드 권한 1](/assets/20210715_184923.png)

![메서드 권한 2](/assets/20210715_185819.png)

### 2-6. 스프링 시큐리티 세션과 Authentication

스프링 시큐리티는 일반 세션과 별도로 시큐리티가 관리하는 세션을 가진다. 이 세션 안에 들어가는 타입은 `Authentication` 객체뿐이며, 필요할 때마다 DI로 꺼내 쓸 수 있다.

![Authentication 객체](/assets/20210720_012645.png)

`Authentication` 객체 안에는 두 가지 타입이 들어갈 수 있다.

| 타입 | 로그인 방식 |
| --- | --- |
| `UserDetails` | 일반 로그인 |
| `OAuth2User` | OAuth 로그인 |

![UserDetails 타입](/assets/20210720_012558.png)

일반 로그인 때는 이것을 사용한다.

![OAuth2User 타입](/assets/20210720_012606.png)

OAuth 때는 이것을 사용한다. 그렇다면 컨트롤러에서는 무엇을 써야 할까?

세션 정보를 찾을 때 처리가 복잡하므로, `PrincipalDetails`로 이 두 가지를 묶는다. 우리는 이 `PrincipalDetails`로 묶어서 프로그램을 작성한다.

![PrincipalDetails로 묶기](/assets/20210720_012645_kvn8szje5.png)

![PrincipalDetails 구현](/assets/20210720_013633.png)

**정리**

- OAuth로 로그인하면 `Authentication` 객체로 들어온다.
- 스프링 시큐리티는 자기만의 세션을 가지며, 그 타입은 `Authentication` 객체뿐이다.
- 그 안에는 `UserDetails`(일반 로그인)와 `OAuth2User`(OAuth 로그인) 타입이 들어갈 수 있다.
- 두 타입이 세션에 저장되는데, user를 직접 찾을 수 없으므로 `PrincipalDetails`에 `UserDetails`를 구현하고 그 안에 user를 넣는다.
- 구글, 페이스북, 네이버 로그인을 다룰 것이다.

---

## 3. OAuth 로그인 (네이버)

스프링 부트는 구글, 페이스북, 트위터 등은 OAuth Provider로 기본 제공하지만, 네이버는 잘 제공하지 않는다. 네이버는 한국에서만 유명하기 때문에 Provider로 제공하지 않는다.

![네이버 Provider 미제공](/assets/20210720_225925.png)

> 네이버는 기본적으로 Provider가 아니다. (다른 나라 포털 대표 사이트를 다 제공하면 스프링 부트 디펜던시가 너무 비대해질 것이다.)

### 3-1. OAuth 인증 방식

스프링 부트 시큐리티의 인증 방식은 몇 가지가 있다.

**Authorization Code Grant Type 방식**

![Authorization Code Grant](/assets/20210720_231943.png)

**Client Credentials Grant Type 방식**

- 출처: [blog.naver.com/getinthere](https://blog.naver.com/getinthere/222064999924)

우리가 사용하는 방식은 **Authorization Code Grant Type** 방식이다. 코드를 부여받고, 이 코드로 액세스 토큰을 응답받은 뒤 요청한 데이터를 응답한다.

### 3-2. application 설정 (OAuth2)

```
security:
  oauth2:
    client:
      registration:
        google: # /oauth2/authorization/google 이 주소를 동작하게 한다.
          client-id: 391208636966-ep51cg8drdfra574ql9scga7qnctcs17.apps.googleusercontent.com
          client-secret: S-NWrO4VpBTulsjStErAXFy3
          scope:
          - email
          - profile

        facebook:
          client-id: 210771624270218
          client-secret: 3658a4ba647970d620b9a0fed65f06f1
          scope:
          - email
          - public_profile #https://developers.facebook.com/docs/facebook-login/web 여기서 제공해주는 스코프 이름을 정확하게 적어야 한다.

        naver:
          client-id:
          client-secret:
          scope:
          - name
          - email
          client-name: Naver
          authorization-grant-type: authorization_code
          redirect-uri: http://localhost:8080/login/oauth2/code/naver #코드를 받는 콜백 주소. 근데 이거 안적어줘도 됨(그렇게 설정 되어있어서)
          #근데 네이버는 프로바이더가 설정이 안되서 적어줘야한다.
          #네이버는 주소가 고정이 안되어서 맘대로 만들기 가능
          #그래도 이 규칙에 맞춰서 적어주는게 편하다.
```

네이버 개발자 센터에서 애플리케이션을 등록한다.

![네이버 앱 등록 1](/assets/20210721_000416.png)

![네이버 앱 등록 2](/assets/20210721_000423.png)

- 아이디, 이름만 체크한다.
- 윗부분은 8080 포트, 아래는 콜백 주소를 적고 등록한다.

그러면 Client ID와 Secret이 나온다.

![Client ID/Secret 1](/assets/20210721_001358.png)

![Client ID/Secret 2](/assets/20210721_001458.png)

이것을 id, secret 부분에 넣어준다.

![id/secret 설정](/assets/20210721_001622.png)

Provider가 등록되지 않은 상태에서 저장하면 오류가 난다. EntityManager가 close되었는데 authorizedClient에 네이버를 저장할 수 없다는 오류로, 네이버 registration이 없어서 발생한다. 이것을 등록해줘야 한다.

![Provider 등록](/assets/20210721_005630.png)

이 주소로 요청하면 네이버 로그인이 된다.

![네이버 로그인 요청](/assets/20210721_005709.png)

프로필 주소도 마찬가지다.

> **중요**: 네이버는 Provider를 직접 등록해줘야 한다.

![네이버 로그인 생성](/assets/20210721_012734.png)

네이버 로그인이 생겼다.

![네이버 로그인 화면](/assets/20210721_012801.png)

아직 컨트롤러 설정을 안 해서 에러가 났지만, 콘솔에 찍힌 정보들이 네이버 로그인 시 response로 받는 데이터다.

![콘솔 응답 1](/assets/20210721_013012.png)

![콘솔 응답 2](/assets/20210721_013626.png)

컨트롤러에 추가하자.

![컨트롤러 추가](/assets/20210721_013012.png)

response 부분을 받기 위해 `getAttribute` 안에 있는 response 값을 넘겨준다. `getAttribute` 안이 Map이 되므로 Map으로 잡는다.

![getAttribute Map 처리](/assets/20210721_015350.png)

네이버가 다음과 같이 리턴해준다.

![네이버 리턴 구조](/assets/20210721_015425_vsxasydj3.png)

리턴된 것은 여기로 들어간다. response 안에 또 response가 있으므로(한 번 더 들어가야 함):

![response 중첩](/assets/20210721_015638.png)

이렇게 적으면 되는데, 뒤에 `get("response")`를 한 번 더 붙이는 이유는 response 안에 response가 또 있기 때문이다.

![중첩 처리 결과](/assets/20210721_015620.png)

![네이버 로그인 성공](/assets/20210721_015942.png)

네이버 로그인이 잘 들어간 것이 보인다.

![/user 경로 확인](/assets/20210721_021208.png)

`/user`로 가면 콘솔에 로그인한 경로가 보인다. 구글 로그인도 마찬가지다.

---

## 4. JWT 구조와 원리

### 4-1. JWT란?

**JWT(JSON Web Token, RFC 7519)** 는 정보를 안전하게 전송하기 위한 간결하고 자체 포함(self-contained)된 오픈 표준이다.

- JSON 객체로 정보를 전달하며 주로 **REST API 보안**에 사용된다.
- 클라이언트와 서버 간 안전한 통신 수단으로 활용된다.
- **Stateless(무상태)** 인증 메커니즘을 따른다.
- 토큰 자체에 정보들을 저장하고 있는 Web Token이며, 무겁지 않고 간편하게 인증을 진행할 수 있다.

![JWT 개념도](/assets/20210722_011638.png)

> JWT(JSON Web Token)는 당사자 간에 정보를 JSON 개체로 안전하게 전송하기 위한 간결하고 자체 포함된 방법을 정의하는 개방형 표준(RFC 7519)입니다. 이 정보는 디지털 서명되어 있으므로 확인하고 신뢰할 수 있습니다. JWT는 비밀(HMAC 알고리즘 사용) 또는 RSA/ECDSA를 사용하는 공개/개인 키 쌍을 사용하여 서명할 수 있습니다.
>
> 출처: [jwt.io/introduction](https://jwt.io/introduction)

### 4-2. JWT를 사용해야 하는 경우

| 목적 | 설명 |
|------|------|
| **인가 (Authorization)** | 사용자 권한·역할 정보를 안전하게 전달하여 특정 자원 접근 자격을 확인한다. |
| **정보 교환 (Information Exchange)** | 웹 앱·API·마이크로서비스 간 정보를 안전하게 교환한다. 토큰 무결성 검증이 가능하다. |

### 4-3. JWT 장단점

**장점**

- 중앙 인증 서버, 데이터 스토어에 대한 의존성이 없어 시스템 수평 확장에 유리하다.
- Base64 URL Safe Encoding을 사용하므로 URL, Cookie, Header 모두에서 사용 가능하다.

**단점**

- Payload의 정보가 많아지면 네트워크 사용량이 증가하므로 데이터 설계 시 고려가 필요하다.
- 토큰이 클라이언트에 저장되며, 서버에서는 클라이언트의 토큰을 조작할 수 없다.

### 4-4. JWT 구성 요소

**JWT**는 점(`.`)으로 구분된 세 부분으로 구성된다: **헤더(Header)**, **페이로드(Payload)**, **시그니처(Signature)**.

```
   xxxxx        .        yyyyy        .        zzzzz
  ┌──────┐             ┌─────────┐            ┌───────────┐
  │ 헤더  │             │ 페이로드 │            │  시그니처   │
  │Header│             │ Payload │            │ Signature │
  └──────┘             └─────────┘            └───────────┘
 (Base64Url)          (Base64Url)          (Header+Payload+Secret 서명)
```

![JWT의 세 가지 구성 요소](/assets/20210722_012754.png)

| 부분 | 이름 | 내용 |
| --- | --- | --- |
| xxxxx | Header(헤더) | 어떤 알고리즘으로 서명했는지 |
| yyyyy | Payload(페이로드) | 정보(클레임) |
| zzzzz | Signature(시그니처) | 헤더+페이로드+개인키를 HMAC으로 암호화 |

#### 헤더 (Header)

토큰 유형(JWT)과 서명 알고리즘(HMAC SHA256 또는 RSA)을 담는다. Signature를 해싱하기 위한 정보들이 담기며, **Base64Url**로 인코딩된다.

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

![JWT Header](/assets/20210722_012855.png)

#### 페이로드 (Payload)

**클레임(Claims)** 을 담는다. 서버와 클라이언트가 주고받는 시스템에서 실제로 사용될 정보들에 대한 내용을 담으며, **Base64Url**로 인코딩된다.

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

![JWT Payload](/assets/20210722_012743.png)

클레임은 다음 세 가지 유형이 있다.

- **등록된 클레임**: 필수는 아니지만 정의된 클레임
- **공개 클레임**
- **개인(비공개) 클레임**: 유저 정보에 필요한, 공개되어도 되는 정보를 넣는다.

#### 시그니처 (Signature)

인코딩된 헤더·페이로드·비밀 키·지정 알고리즘으로 생성되며, 토큰 무결성을 보장한다. 토큰의 유효성 검증을 위한 문자열로, 서버에서 해당 토큰이 유효한 토큰인지 검증할 수 있다.

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

최종 JWT 형태:

```
base64UrlEncode(header) + "." + base64UrlEncode(payload) + "." + signature
```

> 이 구조 덕분에 JWT는 간결하고 URL에 안전하며 웹 환경에서 손쉽게 전달할 수 있다.

#### Base64와 해시의 차이

- **Base64**: 암호화(인코딩)하고 디코딩(복호화)할 수 있다.
- 스프링에서 암호화하면 **해싱**이 되어 복호화되지 않는다. 비밀번호를 찾으려면 초기화를 해야 한다. 그게 해시다.

---

## 5. JWT 발급·검증 흐름

### 5-1. JWT 작동 방식 (전체 흐름)

```
[Client]                                   [Server]
   │  ① 로그인 (ID/PW)                          │
   │ ─────────────────────────────────────▶   │
   │                              ② JWT 생성 (Header.Payload.Signature)
   │  ③ JWT 발급                                │
   │ ◀─────────────────────────────────────   │
   │  (JWT를 안전하게 보관)                       │
   │                                           │
   │  ④ 요청 + JWT (HTTP 헤더/쿠키)              │
   │ ─────────────────────────────────────▶   │
   │                              ⑤ 시그니처로 무결성 검증 + 권한 확인
   │  ⑥ 응답                                    │
   │ ◀─────────────────────────────────────   │
   │  (만료 시 토큰 갱신 요청)                    │
```

| 단계 | 설명 |
|------|------|
| **① 인가 (Authentication)** | 로그인 시 서버가 사용자 ID·역할·권한 등의 클레임을 생성하여 페이로드에 저장한다. |
| **② 토큰 발급 (Token Issuance)** | 서버가 헤더·페이로드·시그니처를 포함한 JWT를 생성한다. 시그니처로 무결성을 보장한다. |
| **③ 토큰 전달 (Token Transmission)** | 클라이언트가 JWT를 안전하게 보관하고 이후 요청 시 HTTP 헤더나 쿠키로 전달한다. |
| **④ 요청과 검증 (Request & Verification)** | 서버가 헤더·페이로드를 해독해 클레임을 확인하고 시그니처로 무결성을 검증한다. |
| **⑤ 인가 처리 (Authorization Handling)** | 토큰이 유효하고 권한이 부여된 경우 서버가 요청을 처리하고 응답한다. |
| **⑥ 토큰 갱신 (Token Refresh)** | 토큰 만료 시 클라이언트가 새 토큰을 요청하고, 서버는 새 토큰을 발급하며 이전 토큰을 폐기한다. |

### 5-2. JWT 발급 흐름 (서버 관점)

클라이언트가 id, pw를 전송하면, 서버는 (세션 대신) JSON Web Token을 만든다. 서버가 헤더, 페이로드, 시그니처를 만든다.

- 헤더: HS256으로 서명했다는 정보
- 페이로드: 유저 네임, 패스워드 등 유저 정보
- 시그니처: 헤더와 페이로드에 서버만 아는 키값(예: cos)을 더해 HS256으로 암호화

`HS256`은 `HMAC` 방식으로 암호화하는데, `SHA256`으로 해시화해 복호화하는 암호를 만들고, `HMAC`은 시크릿 키를 포함해 암호화한다. 그 결과를 Base64로 인코딩한다.

![JWT 발급](/assets/20210807_151451.png)

### 5-3. JWT 검증 흐름

클라이언트는 보통 로컬 스토리지에 토큰을 저장한다. key-value로 저장해뒀다가 요청 시 로컬 스토리지의 토큰을 들고 요청한다. 서버는 JWT를 받으면 신뢰할 수 있는지 검증해야 한다.

> 중요한 것은 안에 데이터가 뭔지 아는 게 아니라, 이 JWT가 **유효한 토큰인지** 아는 것이다.

![JWT 검증](/assets/20210807_151903.png)

- JWT 시그니처 부분이 이전과 같으면(예: abc5), 이전에 왔던 게 맞다고 인식한다.
- 개인정보가 맞는지 확인은 payload의 유저 네임으로 한다.

JWT의 헤더, 페이로드, 시그니처에서, 시그니처는 헤더+페이로드+시크릿 값을 HMAC(HS256)으로 암호화한 것이다.

RSA 256을 사용하면, 서버가 자기 개인키로 잠그고 토큰을 돌려주고, 클라이언트가 받아 서버로 요청할 때 검증 시 공개키로 시그니처를 열어보기만 하면 된다.

![RSA 서명](/assets/20210807_152239.png)

> RSA로 해도 되고 SHA256으로 해도 되지만, 보통 SHA256을 더 많이 쓴다고 한다.

![JWT 검증 과정](/assets/20210807_152627.png)

JWT는 헤더(빨강), 페이로드(보라), 시그니처로 이루어지며 각각 Base64로 인코딩되어 있다.

- Base64로 인코딩되어 있으면 디코딩이 가능하고, 디코딩하면 값이 나온다.
- 이것은 암호화가 목적이 아니라 **서명(유효성 확인)**이 목적이다.
- 데이터가 유효한지에 대한 것이지, 비밀성을 보장하는 것이 아니다.

![Base64 디코딩](/assets/20210807_152727.png)

**검증 과정:**

1. 토큰을 들고와 헤더, 페이로드, 시그니처로 나눈다.
2. 비밀키를 가져와 똑같이 HMAC SHA256으로 암호화한다.
3. 똑같은 값이 나오면 검증이 끝난다.

이러면 서버가 여러 개여도 세션 없이 토큰만 쓰면 되므로, 클라이언트가 어느 서버에 들어가도 유효하다(서버들이 JWT 검증만 하면 됨). JWT가 검증되면 payload의 유저 정보로 select 등을 수행한다. 이 토큰은 아무나 못 만들고 서버가 만들어 유효한 값을 인증한다.

### 5-4. JWT 프로젝트 세팅

![JWT 세팅 1](/assets/20210807_154011.png)

문자열을 더해서(자바에서 `+`):

![JWT 세팅 2](/assets/20210807_154153.png)

- raw 시그니처 부분을 HS256으로 암호화한다.
- 그것을 다시 Base64로 인코딩해도 되고 안 해도 된다.
- 페이로드가 본문이며, Base64 부분은 하나하나 만들어도 되지만 라이브러리를 쓰면 매우 쉽게 만들 수 있다.

![JWT 라이브러리](/assets/20210807_154332.png)

---

## 6. 기존 인증 방식과의 차이 (Basic vs Bearer)

### 6-1. Basic Auth — JWT 미사용

```
[ 기본 인증 (Basic Auth) - jwt 미사용 ]

Client                                Server
  │  API 요청마다 매번                   │
  │  Header: username + password  ───▶  │  매 요청마다
  │  (하드코딩된 인증정보 반복 전달)        │  username/password 검증
  │  ◀────────────────  응답            │
```

> **단점:** 모든 API 요청마다 하드코딩된 사용자 이름과 비밀번호를 헤더에 반복 전달해야 한다.

### 6-2. JWT 인증 — JWT 사용

```
[ JWT 인증 - jwt 사용 ]

Client                                  Server
  │  ① 로그인 (username + password)  ───▶  │  일치 시
  │  ② jwt 토큰 발급                ◀───  │  JWT 토큰 생성
  │  (이후 요청)                            │
  │  ③ Header: Authorization JWT   ───▶   │  토큰 검증
  │  ◀──────────────────  응답            │  (이름/비밀번호 재전달 X)
```

최초 로그인 시에만 이름·비밀번호를 전달하고, 이후 요청부터는 **JWT 토큰**만 헤더에 담아 전달한다.

### 6-3. Bearer 인증 방식과 Stateless

![Bearer 인증](/assets/20210808_121747.png)

- **stateless 방식**: 세션을 안 쓰겠다는 것이다.
- 웹은 기본적으로 stateless인데, statefull처럼 쓰기 위해 쿠키를 만들고 세션을 만든다. 그것을 안 쓰겠다는 설정이다.

**세션 방식 복습**

1. 클라이언트가 id, pw를 날린다.
2. 최초 요청 시 서버는 세션 메모리 영역에 세션 아이디를 만든다.
3. id, pw가 정상(예: 홍길동)이면 그 아이디에 대한 세션 아이디를 만들고 홍길동만의 영역을 만든다.
4. 유저 오브젝트를 저장하고 세션 아이디를 리턴한다.
5. 클라이언트의 웹 브라우저는 쿠키 영역에 세션 아이디를 저장한다.
6. 그다음 요청부터 이 쿠키를 들고 가고, 서버는 이를 통해 인증을 확인한다.

> 이 방식은 서버가 하나면 괜찮지만, 서버가 여러 개가 되면 안 좋아진다(서버마다 세션 메모리가 따로 있기 때문).

**쿠키 방식의 문제 (CORS)**

- Ajax로 JS에서 요청하면, 쿠키/세션 정책은 기본적으로 **동일 도메인**에서만 동작한다.
- 다른 IP(예: `210.10.10.5`)로 요청하면 거부되고 쿠키가 날아가지 않는다.
- 자바스크립트에서 쿠키를 강제로 담아 요청할 수도 있지만, 요즘 서버는 `HttpOnly`로 자바스크립트가 쿠키를 못 건드리게 만든다.
- 동일 출처 정책을 풀어주면 자바스크립트로 장난칠 수 있어 보안상 좋지 않다.
- 두 번째로, 쿠키 방식은 서버가 많아질수록 확장성이 떨어진다(관리가 어려움).

**Basic 인증 vs Bearer 인증**

- **Basic 방식**: Header의 `Authorization` 키에 id, password를 담아 요청한다. 매번 인증을 달고 요청하며, id/pw가 암호화되지 않아 노출될 수 있다. 그래서 HTTPS(secure) 서버를 써야 id, pw가 암호화되어 전송된다.
- **Bearer 방식**: `Authorization: 토큰` 형태로, id/pw 대신 **토큰**을 담아 요청한다. 노출되더라도 그 자체가 id/pw가 아니라 위험 부담이 적다.

![Bearer 토큰](/assets/20210808_122740.png)

- 토큰이 노출되면 다른 사람이 로그인 요청을 할 수 있지만, 로그인할 때마다 서버가 다시 만들어주고 **유효 시간**이 있어 위험이 적다. (예: 유효시간 10분이면 10분 후엔 그 토큰으로 로그인 못 함)

![토큰 방식](/assets/20210808_122718.png)

이 토큰 방식으로 **JWT 방식**을 만든다. 우리는 Bearer 방식을 쓸 것이므로, 세션 방식과 기본 인증(Basic) 방식을 모두 비활성화해야 한다.

---

## 7. Spring Security에 JWT 적용하기

### 7-1. 스프링 프로젝트 설정

프로젝트를 생성하며 security, h2, lombok, spring web, jpa, validation을 체크하고 실행한다.

![프로젝트 의존성 선택 화면](/assets/20210722_021647.png)

인텔리제이에서 Lombok을 쉽게 쓰기 위해 아래 Enable 부분을 체크해 준다.

![인텔리제이 Lombok Enable 설정](/assets/20210722_014721.png)

### 7-2. 간단한 API 만들고 테스트

간단한 문자열을 리턴하는 API를 만들어 테스트해 본다.

![HelloController 작성 화면](/assets/20210722_015529.png)

```
@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("hello");  //간단한 문자열 리턴
    }
}
```

Postman을 켜서 `localhost:8080/api/hello`로 요청을 보내본다.

![Postman 401 Unauthorized 응답](/assets/20210722_022022.png)

그러면 Request에 **401 Unauthorized** 에러가 난 것이 보인다.

### 7-3. 401 해결 및 JPA 설정

다음 순서로 진행한다.

- 401을 해결하기 위해 Security를 설정한다.
- Datasource, JPA를 설정한다.
- Entity를 생성한다.
- H2에서 확인한다.

**SecurityConfig**

```
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/hello").permitAll()
                .anyRequest().authenticated();
    }
}

```

이렇게 작성하고 Postman으로 테스트해 본다.

![SecurityConfig 적용 후 정상 응답](/assets/20210722_023327.png)

문자열이 잘 들어갔다. 이제 JWT를 실제로 써본다.

**application.yml**

```
spring:

  h2:
    console:
      enabled: true

  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
    properties:
      hibernate:
        format_sql: true
        show_sql: true

```

- `create-drop`의 의미: SessionFactory가 시작 시 drop, create, alter를 수행하고 종료 시 drop한다.
- 콘솔창에 실행되는 SQL을 보기 좋게 하기 위한 설정(`format_sql`, `show_sql`)도 추가했다.

### 7-4. Entity 생성

```
@Entity
@Table(name = "authority")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority {

   @Id
   @Column(name = "authority_name", length = 50)
   private String authorityName;
}
```

- `@Entity`는 데이터베이스 테이블과 1:1로 매칭된다.
- 그 아래는 Lombok 어노테이션으로 get, set, builder, 생성자들을 자동 생성한다.

User 엔티티의 필드는 `userid`라는 자동 증가하는 PK가 있고, username, password, nickname, 활성화 여부, 권한 관계를 가진다. 즉 유저 객체와 권한 객체 사이의 관계가 있다.

![User 엔티티 정의 화면](/assets/20210722_025539.png)

- `@ManyToMany`, `@JoinTable`은 User 객체와 권한 관계의 다대다 관계를, 일대다·다대일 관계의 조인 테이블로 정의했다는 뜻이다.
- 권한 엔티티도 동일한 어노테이션으로 이루어져 있고, 권한 명이라는 PK를 가진다.

> 위 yml에서 `create-drop`은 서버를 실행할 때마다 새로 만든다. 여기서는 일단 이것을 쓴다. 원래는 `update`로 해야 새로 만들지 않고 계속 저장하면서 이어간다.

User 엔티티에서 Role은 ENUM 대신 `,`로 구분해 문자열로 저장하고, `getRoleList()`에서 파싱하는 방식도 있다.

```
@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String username;
    private String password;
    private String roles;		//user, admin
//    private Role roles;		//이런식으로 Role을 만들어서 처리하기도 가능하다(Role 이라는 클래스 만들고)


    // ENUM으로 안하고 ,로 해서 구분해서 ROLE을 입력 -> 그걸 파싱!!
    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
}

```

> Role은 ENUM 대신 `,`로 구분해 문자열로 저장하고, `getRoleList()`에서 파싱한다.

![User 테이블 생성](/assets/20210807_162654.png)

JPA로 User 테이블이 잘 만들어졌다. 시큐리티를 세팅하기 위해 config와 클래스를 만든다.

### 7-5. data.sql

resource 폴더 아래에 `data.sql`을 만들고, 서버가 시작할 때마다 실행할 쿼리문을 붙여넣는다. 이후부터는 `data.sql`이 자동 실행된다.

![data.sql 작성 화면](/assets/20210722_025943.png)

### 7-6. H2 콘솔 확인

엔티티들이 DB에 생성되는지 확인하기 위해 H2 콘솔을 사용한다.

- `/h2` 콘솔 하위의 모든 요청과 파비콘 관련 요청은 Spring Security 로직을 수행하지 않도록 만든다.
- `configure` 메서드를 오버라이드해서 내용을 추가한다.
- `/h2` 콘솔 하위 모든 요청과 파비콘은 모두 무시하게 설정하고 서버를 실행한다.

### 7-7. Stateless 설정

세션을 쓰지 않으면 모든 페이지에 접근이 가능해진다. 이때까지 만든 시큐리티와 다른 점은 다음과 같다.

```
.sessionManagement().sessionCreationPolicy(SessionC
  reationPolicy.STATELESS) // 세션을 사용하지 않겠다는 뜻
```

- 세션 없이 쓰는 **stateless 서버**다.
- CORS 정책을 쓰지 않는다(모든 접근 허용).
- 폼 로그인을 안 쓰는 것이 가장 큰 차이다.

### 7-8. JWT Filter 등록 테스트

![JWT Filter 등록](/assets/20210808_184627.png)

- 출처: [velog.io - Spring Security Filter 적용](https://velog.io/@sa833591/Spring-Security-5-Spring-Security-Filter-%EC%A0%81%EC%9A%A9)
- 참고: [blog.naver.com/getinthere](https://blog.naver.com/getinthere/222094919059)

---

## 8. 실전 개발 순서 (Spring Security JWT 적용)

1. JWT 종속성(dependency) 추가
2. `JwtAuthenticationEntryPoint` 생성
3. `application.properties`에 JWT 속성 추가
4. `JwtTokenProvider` 생성
5. `JwtAuthenticationFilter` 생성
6. `JWTAuthResponse` DTO 생성
7. Spring Security 구성에서 JWT 구성
8. 로그인(signin) API를 클라이언트에 토큰 반환하도록 변경
