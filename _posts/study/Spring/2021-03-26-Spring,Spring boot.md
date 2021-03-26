---
title: "[Spring] LOMBOK과 JPA"
layout: post
subtitle: Spring
date: '2021-03-26-23:45:51 +0900'

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### LOMBOK이란

![20210327_013619](/assets/20210327_013619.png)

![20210327_013746](/assets/20210327_013746.png)

자바 코딩할 때 힘든건 변수 선언하고 생성자라던지 각 변수마다 get,set이나 서브제너레이션 했는데 생성자에 대해서는 인텔리제이가 생성 안해주는데 그걸 한번에 해결해주는 게 롬복.

![20210327_013759](/assets/20210327_013759.png)

어노테이션 붙여주면
기본 생성자부터 get,set메서드 까지 한 번에 해결.


```
public SearchParam(){

   }

   public SearchParam(String account) {
       this.account = account;
   }

   public SearchParam(String account, String email, int page) {
       this.account = account;
       this.email = email;
       this.page = page;
   }

```

이런식으로 오버라이딩 하는 경우 많은데 굉장히 생산성이 안 좋다.

일단 롬복을 깔아보자.

File에 plugin을 검색하고 롬복을 설치

![20210327_014628](/assets/20210327_014628.png)


![20210327_014904](/assets/20210327_014904.png)

팁으로 저기 아래 하단에 Structure를 클릭하면 현재 클래스가 뭔지 뭐가 있는지 나온다.

그리고 우린 롬복을 설치 했기 때문에 다 지우자.

![20210327_015036](/assets/20210327_015036.png)

그리고 바로 롬복 어노테이션을 사용하려 하면 사용이 안되는데 그건 플러그인을 설치했지만 실제 라이브러리를 gradle에 추가하지 않았기 떄문

![20210327_015302](/assets/20210327_015302.png)

근데 위는 옛날버전인거 같아 검색해서

```
plugins {
    id 'org.springframework.boot' version '2.4.4'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
    mavenCentral()
}

dependencies {
    compile('org.projectlombok:lombok')
    testCompile('org.projectlombok:lombok')
    annotationProcessor('org.projectlombok:lombok')
    testAnnotationProcessor('org.projectlombok:lombok')
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

```

로 넣어줬다.

![20210327_022630](/assets/20210327_022630.png)

그리고 다 지웠는데 롬복인 @Data를 넣으면 롬복이 임포트 되면서 게터세터와 생성자가 자동 생성된다.

그리고 annotation 가서 저 Enable을 체크 해주고 실행해야 스프링이 제대로 실행된다.

![20210327_022915](/assets/20210327_022915.png)


-------

### JPA

Lombok & JPA
##### ORM ( Object Relational Mapping) 으로, RDB 데이터 베이스의 정보를 객체지향으로 손쉽게 활용할 수 있도록 도와주는 도구 이다.
- Object(자바객체)와 Relation(관계형 데이터베이스) 둘간의 맵핑을 통해서 보다
손쉽게 적용할 수 있는 기술을 제공해준다.
- 또한 쿼리에 집중 하기 보다는 객체에 집중 함으로써, 조금 더 프로그래밍 적으로 많이 활용 할 수 있다.



![20210327_025217](/assets/20210327_025217.png)

JPA 를 시험해보기 위해 mysql workbench로 가서 스키마를 하나 만들어 준다.


![20210327_025639](/assets/20210327_025639.png)

생성시 utf-8, utf-8 bin(ary)로 한글 설정 해주고 만들자.
그리고 apply하기전 저 부분은 워크벤치에서 자동으로 쿼리문을 만들어서 우리는 버튼만 누르면 실행되게 해준거다.
![20210327_031426](/assets/20210327_031426.png)

그리고 creat table을 위와같이 만들어 두자.


![20210327_031509](/assets/20210327_031509.png)

보면 테이블이 생성 된 걸 확인 가능하다.


```
compile('org.springframework.boot:spring-boot-starter-data-jpa')
compile('mysql:mysql-connector-java')
compile('org.projectlombok:lombok')

```

그리고 위 코드들을 build.gradle에 추가해주자.


![20210327_031702](/assets/20210327_031702.png)

그리고 추가했으면 저기 resource 밑에 application.properties 부분에 가는데 여긴 스프링 부트에 추가한 라이브러리들에 대해 설정을 관리해 주는 곳이다.


저기에

```
# properties
spring.datasource.url=jdbc:mysql://localhost:3306/study?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul

# db response name
spring.datasource.username=root

# db response password
spring.datasource.password=root
```

을 넣어주자.


![20210327_033256](/assets/20210327_033256.png)

jpa와 톰캣포트 8080이 제대로 올라갔다면 정상으로 실행 되었다.

-----------

### Entity

- Camel Case : 단어를 표기할 때 첫 문자는 소문자로 시작하며 띄어쓰기 대신 ( 대문자 )로 단어를 구분
- Java의 변수를 선언할 때 camelCase 로 선언한다.
ex) phoneNumber , createdAt, updatedAt
- Snake Case : 단어를 표기할 때 모두 소문자로 표기하며, 띄어쓰기 대신 ( _ ) 로 표기
- DB 컬럼에 사용
ex) phone_number , created_at , updated_at
- API를 정의하기에 따라 다르지만, 주로 API통신 규격에는 구간에서는 Snake Case를 많이 사용 합니다.


##### Entity : JPA에서는 테이블을 자동으로 생성해주는 기능 존재.
##### DB Table == JPA Entity


![20210327_035106](/assets/20210327_035106.png)



```
package com.example.study.model.entity;



import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@Entity //엔티티라는 거 정의
//@Table(name = "user")   //table을 유저라는 테이블을 가진 곳에 매핑시킬거다 선언
//근데 클래스의 이름이 동일하면 굳이 table 어노테이션을 설정 안해줘도 된다.
public class User { //이 클래스 이름은 디비의 이름과 동일하게(여기선 카멜 케이스에 맞게 선언)

    @Id//식별자에 대해선 Id를 붙이고![20210327_042455](/assets/20210327_042455.png)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //어떤식으로 관리할지 전략 설정
    private Long id;
//    @Column(name = "account")   이거도 마찬가지로 이름이 동일하면 안 써줘도 된다.
    private String account;
    private String email;
    private String phoneNumber;
    private LocalDate createdAt;
    private String createdBy;
    private LocalDate updatedAt;
    private String updatedBy;

    public User() { //이 부분은 에러나서 넣어줬다. Allargs넣으니까 에러나는데 ㅇㅅㅇ..

    }
}

//기본적으로 이 위까지가 mysql과 테이블 어떻게 할지 설정 완료

```


![20210327_042455](/assets/20210327_042455_p9f4vcckh.png)


--------
### Repository

따로 쿼리문 을 작성하지 않아도
기본적인
CREATE : 생성
READ : 읽기 (SELECT)
UPDATE : 업데이트
DELETE : 삭제

이미 개발 되있는 JPA 레파지토리를 상속받아줌.

![20210327_042630](/assets/20210327_042630.png)

--------
