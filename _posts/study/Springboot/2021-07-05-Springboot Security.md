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
