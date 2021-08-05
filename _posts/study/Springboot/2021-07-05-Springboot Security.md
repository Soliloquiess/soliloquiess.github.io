---
title: "[Springboot] Springboot Security"
layout: post
subtitle: Springboot
date: "2021-07-05-04:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

```
@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity // 필터 체인 관리 시작 어노테이션
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소 접근시 권한 및 인증을 위한 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter{



```

```
@GetMapping("/info")
public @ResponseBody String info() {
  return "개인정보";
}
```

![20210719_224653](/assets/20210719_224653.png)


로 그냥 /info로 들어가면 아무나 들어가 졌지면
위의 securedEnabled = true) // 특정 주소 접근시 권한 및 인증을 위한 어노테이션 활성화를 시키면 이제 아무나 못 들어 가게 막는다.


![20210719_225529](/assets/20210719_225529.png)


![20210719_230227](/assets/20210719_230227.png)

이제 admin이여야만 들어가진다.



@PreAuthorize
도 있는데 이건 해당 어노테이션의 메서드가 실행 되기 전에 실행된다

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


@PostAuthorize
이것도 있는데 이건 반대로 메서드 종료 하고 나서 실행된다.



-------

스프링 시큐리티는 시큐리티 세션이 있는데 원래 세션에 시큐리티가 관리하는 세션이 따로 있다. 그리고 이 안에 들어가는 타입은 Authentication 객체밖에 없다.

이 객체가 안에 들어오고 그걸 꺼내올 수 있다.

그리고 이걸 필요할 때마다 DI할 수 있다.
![20210720_012645](/assets/20210720_012645.png)

첫번쨰는 userDetails타입, 그리고 두번쨰는 OAuth2User타입이 들어갈 수 있다.

![20210720_012558](/assets/20210720_012558.png)

일반 로그인 떄는 얘를 적고

![20210720_012606](/assets/20210720_012606.png)

OAuth 떄는 얘를 쓰면 컨트롤러엔 뭘 써야하나?

우리가 세션 정보 찾을때 처리가 복잡하니까
PrincipalDetails로 이 두가지를 묶는다 그래서 우리는
이 PrincipalDetails로 묶게 프로그램을 짠다.

![20210720_012645](/assets/20210720_012645_kvn8szje5.png)

![20210720_013633](/assets/20210720_013633.png)




-------


특정 메서드에 간단하게 걸고 싶으면 이렇게 걸면 된다.

![20210715_184923](/assets/20210715_184923.png)

![20210715_185819](/assets/20210715_185819.png)


Oauth 로 로그인 하면 authentication의 객체로 들어오게 됨.


스프링 시큐리티는 자기만의 세션을 들고 있음.
시큐리티인데 타입은 Authentication 객체밖에 없는데 쏙 들어와야됨.

저 안에는 userDetails 타입과 Oauth2User타입이 들어갈 수 있다.



userDetails -> 일반 로그인
OAuth2User -> OAuth 로그인

OAuth2User와 userDetails 타입 세션에 저장돼었는데 떙겨옴 근데 user를 찾을 수가 없음.
그래서 PrincipalDetails 에 userDetails를 구현해서 user를 안에 넣는다.


구글, 페이스북, 네이버 로그인


--------



네이버 로그인

일반적으로 스프링부트는 구글, 페이스북 트위터 등은 스프링부트가 oauth로 일반 제공해주는데 이건 잘 제공 안해줌. 예를들어 네이버는 한국꺼인데 대한민국에서만  유명, 그래서 Provider로 제공 안해준다.

![20210720_225925](/assets/20210720_225925.png)


네이버는 기본적으로 provider가 아님.(다른거 하기엔 막 다른 나라들 포털 대표사이트 있을텐데 이걸 다 제공하면 스프링부트 디펜던시는 정신 나갈거다)

---

스프링 부트 시큐리트는 방식이 몇개 있는데

#### Authorization Code Grant Type방식

![20210720_231943](/assets/20210720_231943.png)


#### Client Credentials Grant Type 방식

이렇게 있다.

출처: https://blog.naver.com/getinthere/222064999924

우리가 사용하는 방식은 코드를 부여받음.(Authorization Code Grant Type방식)

코드를 부여받고 이 코드로 액세스 토큰을 응답받고 요청한 데이터를 응답한다.


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

어플리케이션 프로퍼티에 시큐리티 Oauth2 부분 보자

네이버 개발자 센터에 가서 애플리케이션 등록에 간다음에

![20210721_000416](/assets/20210721_000416.png)

![20210721_000423](/assets/20210721_000423.png)

아이디, 이름만 체크하고

윗 부분은 8080포트 , 아래는 콜백 주소를 적어주고 등록한다.

그럼 클라이언트와 시크릿이 나올건데

![20210721_001358](/assets/20210721_001358.png)

![20210721_001458](/assets/20210721_001458.png)

이걸 id,secret부분에 넣어주자


![20210721_001622](/assets/20210721_001622.png)

그리고 provider가 아니라 저장하면 오류날 거
EntityManager가 close 됐는데 authorizedClient에 네이버를 저장할 수 없음(provider가 아니라서)

네이버라는 레지스트레이션이 없어서 이걸 등록해줘야한다.

![20210721_005630](/assets/20210721_005630.png)

이 주소로 요청하면 네이버 로그인이 되게 된다.

![20210721_005709](/assets/20210721_005709.png)

프로필 주소 또한 마찬가지

네이버는 프로바이더를 등록해줘야한다가 중요한 점.

![20210721_012734](/assets/20210721_012734.png)

네이버 로그인이 생겼고

![20210721_012801](/assets/20210721_012801.png)


아직 컨트롤러 설정을 안해서 에러가 났지만 이 콘솔에 찍힌 정보들이 네이버 로그인 했을 때 response로 들어가서 받는 거다.


![20210721_013012](/assets/20210721_013012.png)

![20210721_013626](/assets/20210721_013626.png)

컨트롤러에 추가하자

![20210721_013012](/assets/20210721_013012.png)


그리고 여기 response 부분을 받기 위 getAttribute안에 있는 response값을 넘겨주면 된다.

getAttribute를 안이 맵이 되므로 Map으로 잡자.

![20210721_015350](/assets/20210721_015350.png)


네이버가 이렇게 리턴을 해준다.

![20210721_015425](/assets/20210721_015425_vsxasydj3.png)

리턴 된건 여기 들어가고.

그 다음에 response안에 저 정보가 있는게 아닌 response안에 정보가 있으면

![20210721_015638](/assets/20210721_015638.png)

이렇게 적으면 되지만(뒤에 get("response"))가 필요 없음) 뒤에 붙이는 이유는

response안에 response안에 있기 떄문(한번 더 들어가기 때문)


![20210721_015620](/assets/20210721_015620.png)


![20210721_015942](/assets/20210721_015942.png)

이제 네이버 로그인이 잘 들어간 게 보인다.


![20210721_021208](/assets/20210721_021208.png)
이제 /user로 가면 콘솔에 로그인 한 경로가 보인다.

구글 로그인도 마찬가지.


--------

### JWT를 이해하기전 세션에 대해 알아보자


##### 중요: 왜 사용되고 어디에 쓰는지.

![20210805_170735](/assets/20210805_170735.png)

웹에서 겟요청으로 주소를 요청하고

서버는 그 주소를 넘겨준다(html)
이떄 http헤더에 넣고 해주는데
헤더에 뭘 담아주냐면 쿠키라는 걸 담아준다.
쿠키에 세션 아이디를 준다.
이걸 담아서 주는데 웹 브라우저는 세션 브라우저를 받아서 자동으로 준다.

최초요청으로 세션이 만들어짐.
2번쨰로 리퀘스트 할 때는 세션 ID를 달고 감.
헤더는 세션아이디 다시 또 넘겨준다.
