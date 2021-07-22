---
title: "[Springboot] Springboot JWT"
layout: post
subtitle: Springboot
date: "2021-07-18-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


### JWT


RFC를 사용.(시큐리티에서 다룸)
JSON 객체를 사용해서 토큰 자체에 정보들을 저장하고 있는 WEB Token 이라고 정의할 수 있음.

특히 JWT를 이용하는 건 헤비하지 않고 간편하게 진행할 수 있음.

![20210722_011638](/assets/20210722_011638.png)

JWT는 Header, Payload, Signature 의 3개로 구성됨.


![20210722_012754](/assets/20210722_012754.png)

Header는 Signature를 해싱하기 위한 정보들이 담긴다.

![20210722_012855](/assets/20210722_012855.png)

Payload는 서버와 클라이언트가 주고받는 시스템에서 실제로 사용 될 정보들에 대한 내용을 담는다.

![20210722_012743](/assets/20210722_012743.png)

Signature는 토큰의 유효성 검증을 위한 문자열이다.

이 문자열을 통해 문자열을 서버에서 이 토큰이 유효한 토큰인지 검증이 가능하다.


#### JWT 장점

- 중앙 인증 서버, 데이터 스토어에 대한 의존성 없음, 시스템 수평 확장 유리

- Base64 URL Safe Encoding > URL, Cookie, Header 모두 사용 가능.

#### JWT 단점
- Payload의 정보가 많아지면 네트워크 사용량 증가, 데이터 설계 고려 필요.
- 토큰이 클라이언트에 저장, 서버에 클라이언트의 토큰을 조작할 수 없음.

이제 스프링 설정하고

![20210722_021647](/assets/20210722_021647.png)

security, h2, lombok, spring web, jpa, validation을 체크하고 실행하자. 인텔리제이에서 실행하면 롬복을 쉽게 쓰기 위해

![20210722_014721](/assets/20210722_014721.png)

저 Enable부분을 체크해주자.


그리고 간단한 문자열 리턴하는 API를 만들고 테스트 해보자.


![20210722_015529](/assets/20210722_015529.png)

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
이제 postman을 켜서 localhost:8080/api/hello 로 한번 줘보자.

![20210722_022022](/assets/20210722_022022.png)

그리고 Request 401 UnAuthorized 에러가 난게 보인다.


-------


- 이제 401을 해결하기 위해 Security를 설정하고
- Datasource, JPA를 설정하고
- Entity를 생성하자.
- H2에서 확인해보자.

SecurityConfig로
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

이렇게 작성하고 포스트맨으로 테스트 해보자.

![20210722_023327](/assets/20210722_023327.png)

문자열이 잘 들어갔다.

이제 JWT를 진짜 써보자.


application.yml
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

create-drop의미는 sessionFactory가 시작시 drop,create,alter종료시 drop.

그리고 콘솔창에 실행되는 sql 보기좋게 하기위한 설정도 줬다.

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

@Entity는 데이터베이스 테이블과 1:1매칭
그 아래는 롬복 어노테이션으로 get,set,builder, 생성자들을 자동 생성.

User엔티티의 필드는 userid라는 자동증가하는 pk가 있고
username, password, nickname, 활성화여부, 권한 관계가 있는데 유저객체와 권한객체의 관계가 있는데


![20210722_025539](/assets/20210722_025539.png)

@ManytoMany, @JoinTable은 User객체와 권한관계의 다대다 관계를 일대다, 다대일 관계의 조인 테이블로 정의했다는 뜻.

권한 엔티티도 동일한 어노테이션으로 이뤄져 있고 권한 명이라는 pk를 가지고 있다.

위에서 yml에서 create-drop은 서버 실행할 때 마다 새로 만든다. 여기선 일단 이거 쓰자. 원래는 update로 해야 새로 안만들고 계속 저장하면서 간다.




resource 폴더 아래 data.sql을 만들고 서버가 시작할때마다 실행할 쿼리문을 붙여넣기한다. 이후부터는 data.sql이 자동실행됨.

![20210722_025943](/assets/20210722_025943.png)

이제 엔티티들이 db에 생성되는지 확인하기 위해 h2콘솔을 사용하자.

그리고 h2콘솔 하위 모든 요청과 파비콘 관련 요청은 spring security 로직 수행 하지 않도록 만들자.

configure 메서드를 오버라이드해서 내용을 추가하자.

/h2콘솔 하위 모든 요청과 파비콘은 모두 무시하게 설정하고 서버를 실행하자.
