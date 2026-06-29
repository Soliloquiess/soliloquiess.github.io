---
title: "[Springboot] Springboot JWT"
date: 2021-07-18
category: "Springboot"
tags: ["Springboot"]
description: "JWT의 구조(Header/Payload/Signature)와 장단점을 정리하고, 스프링부트에 Security와 JPA를 설정해 JWT를 적용해 본 학습 노트이다."
permalink: "study/2021/07/18/SpringBoot-JWT"
---

## JWT란?

- RFC 표준을 사용하며, 스프링에서는 Security에서 다룬다.
- JSON 객체를 사용해 **토큰 자체에 정보들을 저장하고 있는 Web Token**이라고 정의할 수 있다.
- JWT를 이용하면 무겁지 않고 간편하게 인증을 진행할 수 있다.

![JWT 개념도](/assets/20210722_011638.png)

## JWT의 구조

JWT는 **Header, Payload, Signature** 3개로 구성된다.

![JWT의 세 가지 구성 요소](/assets/20210722_012754.png)

### Header

Signature를 해싱하기 위한 정보들이 담긴다.

![JWT Header](/assets/20210722_012855.png)

### Payload

서버와 클라이언트가 주고받는 시스템에서 실제로 사용될 정보들에 대한 내용을 담는다.

![JWT Payload](/assets/20210722_012743.png)

### Signature

- 토큰의 유효성 검증을 위한 문자열이다.
- 이 문자열을 통해 서버에서 해당 토큰이 유효한 토큰인지 검증할 수 있다.

## JWT 장단점

### 장점

- 중앙 인증 서버, 데이터 스토어에 대한 의존성이 없어 시스템 수평 확장에 유리하다.
- Base64 URL Safe Encoding을 사용하므로 URL, Cookie, Header 모두에서 사용 가능하다.

### 단점

- Payload의 정보가 많아지면 네트워크 사용량이 증가하므로 데이터 설계 시 고려가 필요하다.
- 토큰이 클라이언트에 저장되며, 서버에서는 클라이언트의 토큰을 조작할 수 없다.

## 스프링 설정

프로젝트를 생성하며 security, h2, lombok, spring web, jpa, validation을 체크하고 실행한다.

![프로젝트 의존성 선택 화면](/assets/20210722_021647.png)

인텔리제이에서 Lombok을 쉽게 쓰기 위해 아래 Enable 부분을 체크해 준다.

![인텔리제이 Lombok Enable 설정](/assets/20210722_014721.png)

### 간단한 API 만들고 테스트

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

---

## 401 해결 및 JPA 설정

다음 순서로 진행한다.

- 401을 해결하기 위해 Security를 설정한다.
- Datasource, JPA를 설정한다.
- Entity를 생성한다.
- H2에서 확인한다.

### SecurityConfig

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

### application.yml

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

### Entity 생성

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

### data.sql

resource 폴더 아래에 `data.sql`을 만들고, 서버가 시작할 때마다 실행할 쿼리문을 붙여넣는다. 이후부터는 `data.sql`이 자동 실행된다.

![data.sql 작성 화면](/assets/20210722_025943.png)

### H2 콘솔 확인

엔티티들이 DB에 생성되는지 확인하기 위해 H2 콘솔을 사용한다.

- `/h2` 콘솔 하위의 모든 요청과 파비콘 관련 요청은 Spring Security 로직을 수행하지 않도록 만든다.
- `configure` 메서드를 오버라이드해서 내용을 추가한다.
- `/h2` 콘솔 하위 모든 요청과 파비콘은 모두 무시하게 설정하고 서버를 실행한다.
