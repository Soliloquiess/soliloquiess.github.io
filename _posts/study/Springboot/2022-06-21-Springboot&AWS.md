---
title: "[Springboot] Springboot&AWS 정리"
layout: post
subtitle: Springboot
date: "2022-06-21-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


#### Springboot & AWS 이용해서 배포하는 서비스까지 정리



##### 환경설정 - IntelliJ

###### 인텔리제이 장점

- 강력한 추천 기능
- 훨씬 더 다양한 리팩토링 디버깅 기능
- 이클립스의 깃(Git)에 비해 훨씬 높은 자유도
- 프로젝트 시작할 때 인덱싱을 하여 파일을 비롯한 자우너들에 대한 빠른 검색 속도
- HTML과 CSS, JS, XML에 대한 강력한 기능 지원
- 자바, 스프링 부트 버전업에 맞춘 빠른 업데이트

######프로젝트 생성(build.gradle)


```
buildscript {
    ext {
        springBootVersion = '2.1.9.RELEASE'
    }
    repositories {
        mavenCentral()
        jcenter()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'

group 'org.yacho.SpringbootAWS'
version '1.0-SNAPSHOT'
sourceCompatibility = 1.8

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    testCompile('org.springframework.boot:spring-boot-starter-test')
}
```


위에서


여기서 ext라는 키워드는 build.gradle에서 사용하는 전역변수를 설정하겠다는 의미이다.
코드를 해석하면 org.springframework.boot에 존재하는 spring-boot-gradle-plugin을
전역변수 springBootVersion를 사용해가지고 '2.1.7.RELEASE'버전을 의존성 주입 받겠다이다.

우선 저장소라는 감은 오는데 정확히 어떤 코드인지 살펴봐야 겠다.


```
apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
```


위 코드는 어떤 플러그인 의존성들을 적용할 것인지를 결정하는 코드이다.

io.spring.dependency-management 플러그인은
스프링 부트의 의존성들을 관리해주는 플러그인이므로 꼭 추가해주도록 하고
앞에 정의된 4개의 플러그인은 자바와 스프링부트를 사용하기 위해서는 필수 플러그인들이니 항상 추가하자



참고로 먼저 정의되어 있던 plugins{id java}는 지워줘야 한다.

```
repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    testCompile('org.springframework.boot:spring-boot-starter-test')
}
```
repositories는 각종 의존성 라이브러리들을 어떤 원격 저장소에 받을지를 정하는 것이다.
기본적으로는 mavenCentral()을 많이 사용하지만,
최근에는 라이브러리 업로드 난이도 때문에 jcenter()도 많이 사용한다.

##### mavenCentral

본인이 만든 라이브러리를 업로드하기 위해서는 많은 과정과 설정이 필요하다         
##### jcenter

라이브러리 업로드를 간단하게 하였고      
jcenter에 업로드를 하면 mavenCetral에도 업로드 될 수 있도록 자동화 할수 있게 되었다.     
이 책을 공부하는 우리는 아직 주니어 개발자이므로 두 개다 사용해보자는 의미로
저자님께서 둘 다 등록해보는 예제를 넣어주신 것 같다.

##### dependencies

프로젝트 개발에 필요한 의존성들을 선언하는 곳
여기서는 'org.springframework.boot:spring-boot-starter-web'와
'org.springframework.boot:spring-boot-starter-test'를 받도록 선언되어 있다.

재미있는 점은 인텔리제이는 메이븐 저장소의 데이터를 인덱싱해서 관리하기 때문에
커뮤니티 버전을 사용해도 의존성 자동완성이 가능하다.
즉 우리가 자주 사용하는ctrl+space를 통해 라이브러리를 빠르게 자동 완성 시킬 수 있다.
(여기서 나온 인덱싱이라는 것은 목차 같은 개념으로 메이븐 저장소 데이터 목록을 가지고 있는 것이다.)

여기서 자동완성을 진행할 경우 뒤에 :이 붙게되는데 원래는 이 뒤에 버전을 입력해주는 것이다.
하지만 따로 명시하지 않을 경우
buildscript 의
```
org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}
```
을 따라가기에
우리는 버전을 따로 명시해주지 않는 것이 좋다.



------

실행해주고 나 같은 경우 알 캡쳐를 많이 쓰다보니 검색이나 shift 이용해서 하는 서치 이런거에 제약 받았다.

![20220704_215543](/assets/20220704_215543_zaezl3seq.png)

그래서 위 화면에서 shift 2번 + /를 누르니 search창이 떳고 저기서 share project on github를 검색한다.

![20220704_220128](/assets/20220704_220128_hxt0dahek.png)

그럼 위 화면이 나오게 되고 깃허브와 연동이 가능해진다.


![20220704_223035](/assets/20220704_223035.png)


그리고 share를 누르면 동기화가 되고 깃허브 로그인 후

실행을 한다.


---------

<br>

#### 스프링부트에서 테스트 코드 작성하기



###### TDD 와 단위테스트




TDD는 테스트가 주도하는 개발을 의미
즉, 테스트 코드를 먼저 작성하는것부터 시작한다.



항상 실패하는 테스트를 먼저 작성

테스트가 통과하는 프로덕션 코드를 작성
테스트가 통과하면 프로덕션 코드를 리팩토링한다.

단위테스트는 TDD의 첫번째 단계인 기능단위의 테스트 코드를 작성하는 것을 의미한다.


https://repo.yona.io/doortts/blog/issue/1
위 링크로 가면 오래 되었지만 tdd 기술이 적힌 pdf를 볼 수 있다.

##### 스프링부트에서 TDD를 쓰는 이유

빠른 피드백 -> 서버를 재실행 하지 않아도 된다.

로그나 sysout을 통해 확인한 것을 자동검증을 통해 편하게 테스팅


개발자가 만든 기능을 안전하게 보호 (하나의 기능 추가시 기존 기능이 문제가 생길 수 있음)


더군다나 이는 규모가 클수록 전부다 검사를 진행하기가 힘들다.



----


<br>


프로젝트에서 패키지 하나 생성


![20220705_100825](/assets/20220705_100825.png)

그리고 프로젝트는 일반 프로젝트 이름과 역순으로 설정한다



그리고 가장 기본적인 스프링부트 클래스의 구조

```
@SpringBootApplication // @SpringBootApplication 있는 클래스가 가장 최상단 디렉토리에 위치해야 한다.
public class Application {
    public static void main(String[] args) { SpringApplication.run(Application.class,args); }
}
```

<br>
-----

<br>


@ SpringBootApplication어노테이션을 이용하여      
1. **스프링 부트 자동설정**    
2. **스프링 Bean 읽기와 생성을 모두 자동으로 설정**       
특히나 @ SpringBootApplication이 위치한 클래스로부터 설정을 읽어나가기 때문에        
@ SpringBootApplication이 위치한 클래스를 다른 클래스보다 프로젝트의 최상단에 위치시켜야한다.        
___________________________________________________________________________________________________   


SpringApplication.run 을 이용하여 내장 WAS(spring)를 실행시킨다.        
이렇게 사용할 경우 Tomcat을 사용할 필요가 없으니 어떤 환경에서든지 단순 jar로만 배포가 가능하다 => 내장 WAS를 쓰는 이유가 훨씬 좋은 이유. 어디서나 배포가 가능하기 때문

<br>
-----
<br>


```
@RestController

* 컨트롤러를 JSON으로 반환하는 컨트롤러로 만들어준다.(즉, 값을 반환했다 보면 된다.)
* 예전에는 @ResponseBody를 각 메소드마다 선언했던 것을 한번에 사용할 수 있게 해준거이라 생각하면 된다.

참고로 기존 @Controller 는 String이나 Model로 반환시에 해당 이름의 파일을 호출했다.  
___________________________________________________________________________________________________
@GetMapping

* HTTP Method인 Get의 요청을 받을 수 있는 API를 만들어준다.  
* 예전에는 @RequestMapping(method = RequsetMethod.GET)으로 사용했었다.  



```

<br>
----

<br>


```
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class HelloControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void hello가_리턴된다() throws Exception {
        //given
        String hello = "hello";

        //when
        ResultActions perform = mvc.perform(get("/hello"));

        //then
        perform
                .andExpect(status().isOk())
                .andExpect(content().string(hello));
    }
}
```


###### 테스트 코드 작성

참고로 테스트 코드는 test 폴더에 작성해야 한다.
main에서 아무리 설정하고 import 해봐야 위의 코드는 안 먹는다.



@ RunWith(SpringRunner.class)

* 테스트를 진행할 때 JUnit에 내장된 실행자 외에 다른 실행자를 실행시킵니다.  
* 해당 코드에서는 SpringRunner라는 스프링 실행자를 실행 -> 서버 구동 역할
* 즉, 스프링 부트 테스트와 JUnit 사이에 연결자 역할을 한 것이다.  
___________________________________________________________________________________________________


@ WebMvcTest(controllers = HelloController.class)

* 여러 스프링 테스트 어노테이션 중, Web(Spring MVC)에 집중할 수 있는 어노테이션

<br>
* @ Controller , @ ControllerAdvice 등을 사용할 수 있다.     

<br>
* 단, @ Service , @ Component , @ Repository등은 사용할 수 없다.   
<br>
* 즉, 컨트롤러에 관해서 테스팅 해주는 것이고 여기서는 Controller 테스트하기에 선언해준다.     
다른 어노테이션 사용을 추가로 원하면 다른 어노테이션을 더 설정해주면 된다.

<br>
* 후에 OAuth2 연동시 SecurityConfig를 읽지만 CustomOAuth2UserService 를 읽지 못하는 경우가 생기는데 그때 필터로 처리해준다.  


<br>
___________________________________________________________________________________________________


<br>


@ Autowired

* 스프링이 관리하는 빈(bean-객체)을 주입받는다.
___________________________________________________________________________________________________


<br>


private MockMvc mvc;

* 웹 API를 테스트 할 때 사용한다.  
* 스프링 MVC 테스트의 시작점이다.  
* 이 클래스를 통해 HTTP GET, POST 등에 대한 API 테스트를 할 수 있다.  
___________________________________________________________________________________________________


mvc.perform(get("/hello"))

* MockMvc를 통해 /hello 주소로 HTTP GET 요청을 한다. -> 실제 접속한 것처럼
* 체이닝이 지원되어 여러 검증 기능을 이어서 선언할 수 있따.   
___________________________________________________________________________________________________
(체이닝)
.andExpect(staus().isOk())
* mvc.perform의 결과를 검증한다.
* HTTP Header의 Status를 검증한다.(반환코드)
* 200 이면 성공이고 이외의 값이면 문제가 있다는 것이다.   

.andExpect(content().string(hello))
* mvc.perform의 결과를 검증한다.    
* 응답 본문의 내용을 검증한다. (json이면 json 내용 페이지면 페이지 전체 코드)   
* Controller에서 "hello"를 리턴하기 때문에 맞다.    


-----


실제 우리가 코드를 작성함에 있어 수동으로 검증하고 테스트 코드를 작성하진 않는다.


테스트 코드로 먼저 검증 후, 정말 못 믿겠다는 생각이 들 땐 프로젝트를 실행해 확인한다.

그리고 위 설정대로 실행하면


![20220705_105034](/assets/20220705_105034.png)


아래 부분에 pass가 되었다는 문구 및 표시가 나온다.

그리고 직접 확인하기 위해 Application Main 메서드를 실행하고 매핑해둔 설정 주소로 가보면

![20220705_105326](/assets/20220705_105326.png)

잘 나오는 것 볼수 있다.


<br>

---------
<br>


##### 1.3. 롬복 소개 및 설치하기


롬복은 자바 개발자들이 자주 사용하는 Getter, Setter, 기본생성자, toString등을 자동 생성해준다.


인텔리제이에선 플러그인과 gradle 덕분에 쉽게 설정이 가능하다.

##### build.gradle에 롬복 설정하기
```
build.gradle
dependecies{
...
compile('org.projectlombok:lombok')
...
}
```

###### 롬복 플러그인 설치하기

Command + shift + A 로 Action 진입 (MAC 버전)
plugins 입력후 클릭
플러그인 설치 팝업의 Marketplace 탭으로 이동하여 lombok 검색

###### lombok 설치 진행 및 재시작

롬복에 대한 설정이 필요하다는 팝업창 등장
클릭하여 설정해야 해야할 장소인 파란 링크를 클릭
Enable annotaion processing 의 체크박스를 체크한다.


```
compile('org.projectlombok:lombok')

```
를 이용해 롬복 의존성 추가

-------


##### 1.4. 롬복 사용해보기

HelloResponseDto
```
package com.yacho.SpringbootAWS.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HelloResponseDto {

    private final String name;
    private final int amount;

}
```


----

<br>

코드 리뷰

assertThat(값);

* assertj라는 테스트 검증 라이브러리의 검증 메소드입니다.
* 검증하고 싶은 대상을 메소드 인자로 받습니다.
* 메소드 체이닝이 지원되어 isEqualTo와 같이 메소드를 이어서 사용할 수 있다.   
____________________________________________________________________________________   
.isEqualTo()

* assertj의 동등 비교 메소드이다.
* assertThat에 있는 값과 isEqualTo()의 값을 비교해서 같을때만 성공이다.   
위 코드에서는 값이 변경없이 잘 들어갔나 확인하는 것이라 보면된다.  
asserThat은 사실 JUnit에도 존재하지만 assertj 라이브러리의 asserThat을 이용했다.
JUnit 과 assertj 를 비교해보자면 이렇다.(J유닛과 비교하여 assertThat의 장점)



CoreMatchers와 달리 추가적으로 라이브러리가 필요하지 않다.
JUnit의 asserThat을 사용시 is() 사용을 원하면 CoreMatchers 라이브러리를 추가로 필요하다.
자동 완성이 좀 더 확실하게 지원됩니다.


IDE에서는 CoreMatchers와 같은 Matcher 라이브러리의 자동완성 지원이 약하기 때문이다.


보다 자세한 설명은 백기선님의 유튜브 https://www.youtube.com/watch?v=zLx_fI24UXM 를 참고하자





-----


##### HelloController 수정



<br>
----
<br>


@ RequestParam 자료형 변수

* 외부에서 API로 넘긴 파라미터를 가져오는 어노테이션이다.
* 여기서는 외부에서 "name" 이란 이름으로 넘긴 파라미터를 name 변수에 저장한다.
HelloControllerTest 수정



<br>  
----
<br>

.param("키", 값);

* API 테스트할 때 사용될 요청 파라미터를 설정한다.
* 단, 값은 String만 허용된다.  
* 그래서 숫자/날짜 등의 데이터도 등록할 때는 문자열로 변경해야만 가능하다.  
___________________________________________________________________________________________________


jsonPath("$.name", is(name))

* JSON 응답값을 필드별로 검증할 수 있는 메소드이다.  
* $를 기준으로 필드명을 명시한다.
* 여기서는 name 과 amount를 검증하니 $.name, $.amount로 검증한다.  


---------



### 스프링 부트에서 JPA로 데이터베이스 다루기


웹 서비스를 개발하고 운영하다 보면 피할 수 없는 문제가 데이터베이스를 다루는 일이다.


이전 데이터베이스 기술은 객체 모델링이 아닌 테이블 모델링에 집중되어있는 형태였고
객체를 테이블에 맞추어 데이터를 전달하는 형식으로 객체지향 프로그래밍과 거리가 먼 형태였다


그래서 이러한 문제의 해결책으로 JPA라는 자바 표준 ORM 기술이 나오게 되었다.


#### JPA 소개

현대의 웹 애플리케이션에서 관계형 데이터베이스는 빠질 수 없는 요소이다.
그러다 보니 객체를 관계형 데이터베이스에서 관리하는 것이 무엇보다 중요해졌다.
이런 현상이 짙어지다 보니 모든 코드는 SQL 중심이 되기 시작했고
현업 프로젝트는 애플리케이션 코드보다 SQL로 가득하게 되었다.

개발자가 아무리 자바 클래스를 아름답게 설계해도 SQL을 통해야 데이터베이스를 사용할 수 있기에 피할 수 없다.


하지만 SQL 을 반복적으로 지속적으로 사용해야 하고 테이블이 수백개면 수백개의 SQL 코드를 작성해야한다.


그리고 각각의 관계형 데이터베이스마다 쿼리문이 다르니 이는 기하 급수적으로 늘어나게 된다.

또 한가지 문제점이 있다. 바로 ***패러다임 불일치*** 이다.

##### 관계형 데이터베이스 : 어떻게 데이터를 저장할지


##### 객체지향 프로그래밍 : 메시지를 기반으로 기능과 속성을 한 곳에서 관리하는 기술


예를 들면


```
User user = findUser();
Group group = user.getGroup();
```


위 코드와 같이 User와 Group 부모 자식 관계로 User를 통해서 Group을 얻을 수 있지만 여기에 데이터베이스 코드가 들어가게 된다면


```

User user = userDao.findUser();
Group group = GroupDao.findGroup(user.getGroupId());
```

------


#### SpringData JPA

JPA는 인터페이스로 자바 표준 명세서이다.
즉, 인터페이스인 JPA를 사용하기 위해서는 구현체(실체)인 Hibernate, Eclipse Link등이 있다.

Spring에서는 이러한 구현체를 직접 다루지 않고 이 위에 SpringData JPA 모듈을 이용하여 JPA 기술을 다룬다.

JPA <- Hibernate <- SpringData JPA


그럼 이렇게 사용하는 이유는 무엇이 있을까? 매번 그렇듯 유지보수를 편하기 하기 위해서이다.

- 구현체 교체의 용이성
- 저장소 교체의 용이성
###### 구현체 교체의 용이성

Hibernate외에 다른 구현체로 쉽게 교체하기 위함
SpringData JPA 내부에서 구현체 매핑을 지원해주기 때문에
Hibernate가 언젠가 수명을 다해서 새로운 JPA 구현체가 대세로 떠오를 경우 손쉽게 교체하기 위해서이다.

###### 저장소 교체의 용이성

관계형 데이터베이스 외에 다른 저장소로 쉽게 교체하기 위한 것이다.      
서비스 초기에는 관계형 데이터베이스로 모든 기능을 처리했지만,
점점 트래픽이 많아져 관계형 데이터베이스로는 도저히 감당이 안될 때 non-sql로 교체를 할 수도 있다.(Mongo DB
이때 개발자는 교체를 원한다면 SpringData JPA 에서 SpringData MongoDB로 의존성만 교체하면 된다.

이는 SpringData의 하위 프로젝트들은 기본적으로 CRUD의 인터페이스가 같기 때문이다.
그렇다보니 저장소가 교체되어도 기본적인 기능은 변경할 것이 없다.

<br>
------

<br>


##### 실무에서 JPA

실무에서 JPA를 사용하지 못하는 가장 큰 이유로 높은 러닝 커브를 이야기한다.

JPA를 잘 쓰려면 객체지향 프로그래밍과 관계형 데이터베이스를 둘 다 이해해야 한다.

하지만 JPA를 사용하게 되면 CRUD를 작성할 필요가 없어지고 부모-자식 관계, 1:N 관계 표현, 상태와 행위를 한 곳에서 관리하는 등 객체지향 프로그래밍을 쉽게 할 수 있다.


또한 속도 이슈도 없기에 많은 트래픽을 처리하는데도 사용해도 된다.

##### JPA 사용하기


게시판 기능

게시글 조회
게시글 등록
게시글 수정
게시글 삭제
회원 기능

구글 / 네이버 로그인
로그인한 사용자 글 작성 권한
본인 작성 글에 대한 권한 관리


<br>
-----
<br>


```
build.gradle

dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    compile('org.projectlombok:lombok')
    compile('org.springframework.boot:spring-boot-starter-data-jpa')
    compile('com.h2database:h2')
    testCompile('org.springframework.boot:spring-boot-starter-test')
}
```

<br>
-----
<br>




#### spring-boot-starter-data-jpa


  * 스프링 부트용 Spring Data Jap 추상화 라이브러리입니다.  
  * 스프링 부트 버전에 맞춰 자동으로 JPA 관련 라이브러리들의 버전을 관리해줍니다.  

_____________________________________________

#### h2
  * 인메모리 관계형 데이터베이스입니다.      
  * 별도의 설치가 필요 없이 프로젝트 의존성만으로 관리할 수 있습니다.      
  * 메모리에서 실행되기 때문에 애플리케이션을 재시작할 때마다 초기화된다는 점을 이용하여 테스트 용도로 많이 사용된다.       
  * 이 책에서는 JPA의 테스트, 로컬 환경에서의 구동에서 사용할 예정이다.     
  * 필자 주관으로 oracle의 sqlite 같은 격이다.


--------


##### 폴더(패키지) 생성

java 폴더 -> 디폴트 패키지에 domain 폴더 생성

domain은 게시글, 댓글, 회원, 정산, 결제 등 소프트웨어에 대한 요구사항 혹은 문제 영역이라 생각하자
기존 객체,DAO,xml 구조와 달리 객체클래스에서만 해결할 수 있다는 차이점에서 나온 용어이다.


#####  Posts 소스 코드 작성
domain 폴더 밑에 posts 폴더 생성후 클래스 파일 작성


Posts
```

package
import com.jojoldu.book.springboot.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column( columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }
}
Posts 클래스는 실제 DB의 테이블과 매칭될 클래스이며 보통 Entity 클래스라고 부른다.
JPA를 사용한다면 DB 데이터에 작업할 경우 실제 쿼리를 날리기보다는, 이 Entity 클래스의 수정을 통해 작업한다.
```
<br>
---
<br>


Posts 클래스는 실제 DB의 테이블과 매칭될 클래스이며 보통 Entity 클래스라고 부른다.
JPA를 사용한다면 DB 데이터에 작업할 경우 실제 쿼리를 날리기보다는, 이 Entity 클래스의 수정을 통해 작업한다.


-----



웬만하면 Entity의 PK는 Long 타입의 Auto_increment를 추천한다.  
주민등록번호와 같이 비즈니스상 유니크 키나, 여러 키를 조합한 복합키로 PK를 선정할 경우

1. FK 를 맺을때 다른 테이블에서 복합키 전부를 갖고 있거나, 중간 테이블을 하나 더 두는 상황이 생긴다.  
2. 인덱스에 좋은 영향을 끼치지 못한다.  
3. 유니크한 조건이 변경될 경우 PK 전체를 수정해야 하는 일이 발생한다.  
그렇기에 주민등록 번호, 복합키 등은 유니크 키로 별도로 추가를 해주자
소스 코드 해석

@Entity

  * 테이블과 링크될 클래스임을 나타낸다.  
  * 기본값으로 클래스의 카멜케이스 이름을 언더스코어 네이밍으로 테이블 이름을 매칭한다.  
  * SalesManager.java -> sales_manager table
____________________________________________________________________________________
@Id

  * 해당 테이블의 PK 필드를 나타낸다.
____________________________________________________________________________________
@GerneratedValue

  * PK의 생성 규칙을 나타낸다.  
  * 스프링부트 2.0 에서는 GenerationType.IDENTITY 옵션을 추가해야만 auto_increment가 된다.   
  * 참고 사이트 : https://jojoldu.tistory.com/295에 정리
____________________________________________________________________________________
@Column

  * 테이블의 칼럼을 나타내며 굳이 선언하지 않더라도 해당 클래스의 필드는 모두 칼럼이 된다.  
  * 사용하는 이유는, 기본값 외에 추가로 변경이 필요한 옵션이 있으면 사용한다.  
  * 문자열의 경우 VARCHAR(255)가 기본값인데, 사이즈를 500으로 늘리고 싶거나,
  타입을 TEXT로 변경하고 싶거나 등의 경우에 사용된다.  
____________________________________________________________________________________
@NoArgsConstructor

  * 기본 생성자 자동 추가 -> public Posts(){}
____________________________________________________________________________________
@Getter

  * 클래스 내 모든 필드의 Getter 메소드를 자동생성  
____________________________________________________________________________________
@Builder

  * 해당 클래의 빌더 패턴 클래스를 생성
  * 생성자 상단에 선언시 생성자에 포함된 빌드만 빌더에 포함  


<br>
------

<br>


----------



이 Posts 클래스에는 한 가지 특징이 있는데 바로 Setter 메소드가 없다.


자바빈 규약을 따지면 Getter/Setter 메소드를 정의해주는 것이 좋긴 하지만
이렇게 되면 해당 클래스의 인스턴스 값들이
언제 어디서 변해야 하는지 코드상으로 명확하게 구분할 수가 없어, 차후 기능 변경시 정말 복잡해진다.


그래서 Entity 클래스에서는 절대 Setter 메소드를 만들지 않는다.


대신 필드의 값 변경이 필요하면 명확히 그 목적과 의도를 나타낼 수 있는 메소드를 추가해야만 한다.

```
public class Order{
     public void setStatus(boolean status){
          this.status = status;
     }
     public void 주문서비스의_취소이벤트(){
          order.setStatus(false);
     }
}
위와 같이 Setter는 단순히 값을 세팅하는 것이기에 명확하게 목적과 의도를 나타내주지 못한다.

public class Order{
     public void cancleOrder(){
          this.status = false;
     }
     public void 주문서비스의_취소이벤트(){
          order.cancleOrder();
     }
}
```
위와 같이 메소드에 이름을 정확히 나타내주면 어떠한 목적과 의도로 값을 세팅하는지 파악이 가능해진다.


그러면
Setter 가 없는 이 상황에서 어떻게 값을 채워 DB에 삽입해야 할까?

기본적인 구조는 생성자를 통해 최종값을 채운 후 DB에 삽입 하는 것이며,
값 변경이 필요한 경우 해당 이벤트에 맞는 public 메소드를 호출하여 변경하는 것을 전제로한다.

또한 생성자 대신에 @ uilder를 통해 제공되는 빌더 클래스를 사용한다.
생성자나 빌더나 생성 시점에 값을 채워주는 역할은 똑같다.
다만, 생성자의 경우 지금 채워야 할 필드가 무엇인지 명확하게 지정을 할 수 없다.

<br>
-----

<br>

#### DataBase 접근을 위한 JpaRepository 생성

```
package com.yacho.SpringbootAWS.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, Long> {
}

```


DAO를 JPA에서는 Repository라고 부르며 인터페이스로 생성한다.

단순히 인터페이스를 생성한 후, JpaRepository<Entity 클래스, PK 타입>을 상속하면
기본적인 CRUD 메소드가 자동으로 생성된다.

기본 양식은 @ Repository 어노테이션도 추가해야 되지만 굳이 기술할 필요는 없고
다만, Entity 클래스와 EntityRepository는 함께 위치하는 것을 권장한다.
이는 나중에 프로젝트 규모가 커졌을시에 함께 움직여야 하므로 도메인 패키지에서 함께 관리한다.

<br>
---------
<br>



#### Spring Data JPA 테스트 코드 작성하기
test 디렉토리에 domain.posts 패키지를 생성하고,
테스트 클래스는 PostsRepositoryTest란 이름으로 생성한다.




###### PostsRepositoryTest


```
package com.yacho.SpringbootAWS.domain.posts;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostsRepositoryTest {

    @Autowired
    PostsRepository postsRepository;

    @After
    public void cleanup() {
        postsRepository.deleteAll();
    }

    @Test
    public void 게시글저장_불러오기() {
        //given
        String title = "테스트 게시글";
        String content = "테스트 본문";

        postsRepository.save(Posts.builder()
                .title(title)
                .content(content)
                .author("jojoldu@gmail.com")
                .build());

        //when
        List<Posts> postsList = postsRepository.findAll();

        //then
        Posts posts = postsList.get(0);
        assertThat(posts.getTitle()).isEqualTo(title);
        assertThat(posts.getContent()).isEqualTo(content);
    }
}
```

-----


@ After

     * Junit에서 단위 테스트가 끝날 때마다 수행되는 메소드를 지정  
     * 보통은 배포 전 전체 테스트를 수행할 때 테스트간 데이터 침범을 막기 위해 사용한다.  
     * 여러 테스트가 동시에 수행되면 테스트용 데이터베이스인 H2에 데이터가 그대로 남아 있어 다음 테스트 실행 시 테스트가 실패할 수 있다.
__________________________________________________________________________________________________________________


postsRepository.save()

     * 테이블에 posts에 insert/update 쿼리를 실행한다.  
     * id값이 있다면, update가 없다면 insert 쿼리가 실행된다.  
__________________________________________________________________________________________________________________



postsRepository.findAll()

     * 테이블 posts에 있는 모든 데이터를 조회해오는 메소드이다.  
별다른 설정 없이 @SpringTest를 사용할 경우 H2 데이터베이스를 자동으로 실행해준다.
(스프링에서는 H2 데이터베이스를 디폴트로 사용하기 때문이다.)

여기서 추가적인 팁으로 application.properties에 코드 한줄만 추가하면 실제 실행되는 쿼리문을 볼수 있다. src/main/resources 디렉토리 아래에 application.properties 생성 후 아래와 같이 작성 해주자

application.properties

spring.jpa.show_sql = true
위와 같이 했을 경우 테이블 생성 쿼리가 id bigint gernertated by default as identity로 출력된다.
이는 h2 데이터베이스 기준으로 쿼리가 출력된 것인데 이를 mysql 버전으로 변경하고자 하면 아래와 같이 작성해주자

application.properties

```
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
```

------------

#### 등록/수정/조회 API 만들기

##### Service 와 Domain

API를 만들기 위해 총 3개의 클래스가 필요하다.

Request 데이터를 받을 Dto
API 요청을 받을 Controller
트랜잭션, 도메인 기능 간의 순서를 보장하는 Service


여기서 많은 사람들이 Service 에서 비즈니스 로직을 처리해야 된다고 생각하고 있다.


하지만 이는 과거이고 큰 오해이며 현재는 Service는 트랜잭션, 도메인 간 순서 보장의 역할만 한다.

우선 이를 설명하기 전에 Spring 웹 계층에 대해서 알아보자


###### Web Layer

흔히 사용하는 @ Controller 와 JSP/Freemarker 등의 뷰 템플릿 영역입니다.
이외에도 필터, 인터셉터, 컨트롤러 어드바이스등 외부 요청과 응답에 대한 전반적인 영역을 이야기합니다.

######Service Layer

@ Service에 사용되는 서비스 영역입니다.
일반적으로 Controller와 DAO의 중간 영역에서 사용된다.

@ Transactional 이 사용되어야 하는 영역이기도 한다.


###### Repository Layer

Database와 같이 데이터 저장소에 접근하는 영역이다.
기존 개발 영역으로 본다면 DAO 영역이다.
Dtos

Dto 는 계층 간에 데이터 교환을 위한 객체를 이야기하며 Dtos는 이들의 영역을 얘기합니다.
뷰 템플릿 엔진에서 사용될 객체나 Repositroy Layer에서 결과로 넘겨준 객체 등이 이들을 이야기합니다.


###### Domain Model

도메인이라 불리는 개발 대상을
모든 사람이 동일한 관점에서 이해할 수 있고 공유할 수 있도록 단순화시킨 것을 도메인 모델이라 한다.
이를테면 택시 앱이라고 하면 배차, 탑승, 요금 등이 모두 도메인이 될 수 있다.


@ Entity를 사용하는 클래스도 도메인 모델이라 할 수 있다.

다만 무조건 데이터베이스의 테이블과 관계가 있어야만 하는 것은 아니다.
VO처럼 값 객체들도 이 영역에 해당하기 때문이다.

이 5가지 에리어에서 비지니스 처리를 담당하는 곳은? 바로 Domain이다.

이전에는 Service 방식에서 처리를 했고 이를 트랜잭션 스크립트라 불렀는데
도메인이라는 개념이 생기고 나서 이러한 방식이 바뀌게 되었다.

----


##### 트랜잭션 스크립트 - 과거 Service 방식

모든 로직이 Service 클래스 내부에서 처리된다.
그러다 보니 서비스 계층이 무의미하며, 객체란 단순히 데이터 덩어리 역할만 하게 된다.

반면, 도메인 모델(객체)에서 처리할 경우 다음과 같은 코드가 될 수 있다.

##### 현재 Service 방식


이해하기 쉽게 말하자면 Enitity 클래스에 메소드를 만들어서 처리하게끔 유도한 것이다.

order, billing, delivery가 각자 본인의 취소 이벤트 처리를 하며,
서비스 메소드는 트랜잭션과 도메인 간의 순서만 보장해 준다.

조금 더 쉽게 얘기하고자 한다면 update 원할시 Entity에 update 메소드를 정의하고

Service는 단순히 해당 객체와 메소드를 호출 및 순서만 보장해주면 된다.


-----


#### 등록/수정/삭제 기능 만들기

PostsApiController를 web 패키지에,
PostsService를 service 패키지에, PostsSaveRequestDto를 web.dto 패키지에 생성한다.

###### PostsApiController

```
package com.yacho.SpringbootAWS.web;

import com.yacho.SpringbootAWS.service.posts.PostsService;
import com.yacho.SpringbootAWS.web.dto.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PostsApiController {

    private final PostsService postsService;

    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postsService.save(requestDto);
    }

}
```


###### PostsService


```
package com.yacho.SpringbootAWS.service.posts;

import com.yacho.SpringbootAWS.domain.posts.PostsRepository;
import com.yacho.SpringbootAWS.web.dto.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto) {
        return postsRepository.save(requestDto.toEntity()).getId();
    }
}
```



스프링에서 Bean을 주입받는 방식은 3가지이다.

1. @ Autowired (필드)
2. setter
3. 생성자
기존 스프링에서는 @ Autowired (필드)을 주로 사용하지만 이는 좋은 방법은 아니다.
@ Autowired (필드)로 생성할 경우 생기는 문제점은 아래와 같다.


------



1. 단일 책임의 원칙 위반 (생성자의 파라미터가 많아짐에 리팩토링을 할 가능성 증대된다.)

2. 의존성이 숨는다 (숨은 의존성만 제공)

3. DI 컨테이너의 결합성과 테스트 용이성 (DI 컨테이너와 의존성을 가진 클래스는 곧바로 인스턴스화 할 수 없다.)

4. 불변성 (final 선언 불가로 객체가 변할 가능성이 있다.)


그렇기에 가장 권하는 방식은 생성자로 주입 받는 방식으로

@ RequiredArgsConstructor에서 final이 선언된 모든 필드를 인자값으로 하는 생성자를 만들어준다.


-----

#### PostsSaveRequestDto

```
package com.yacho.SpringbootAWS.web.dto;

import com.yacho.SpringbootAWS.domain.posts.Posts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    private String title;
    private String content;
    private String author;

    @Builder
    public PostsSaveRequestDto(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .author(author)
                .build();
    }

}
```

Entity(도메인) 클래스와 유사한 Dto 클래스를 생성했다.
그 이유는 Entity 클래스를 Request/Response 클래스로 사용하는 것은 매우 안좋기 때문이다.

Entity 클래스는 데이터베이스와 맞닿은 핵심 클래스이다.
Entity 클래스를 기준으로 테이블이 생성되고, 스키마가 변경된다.

화면 변경은 아주 사소한 기능 변경인데, 이를 위해 테이블과 연결된 Entity 클래스를 변경하는 것은 너무 큰 변경이다.

Request/Response용 Dto는 View를 위한 클래스라 정말 자주 변경이 필요하다.

View Layer와 DB Layer의 역할 분리를 철저하게 하고
Controller에서 결괏값으로 여러 테이블을 조인해서 줘야할 경우가 빈번하므로
Entity 클래스만으로 표현하기 어려운 경우가 많다.
그렇기에 되도록 Entity 클래스와 Controller에서 쓸 Dto는 분리해서 사용하도록 하자

-------
<br>

```

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column( columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }
}
```


PostsService 코드를 보면 update 기능에서는 업
데이트 쿼리를 사용하는 부분이 없다.


***이는 바로 JPA의 영속성 컨텍스트 때문이다.***

***영속성 컨텍스트***
엔티티를 영구 저장하는 환경
일종의 논리적 개념이라 보면 되고, JPA의 핵심 내용은 엔티티가 영속성 컨텍스트에 포함되어 있냐 아니냐로 갈린다.

JPA의 엔티티 매니저가 활성화된 상태로 트랜잭션 안에서 데이터베이스에 데이터를 가져오면
이 데이터는 영속성 컨텍스트가 유지된 상태이다.


이 상태에서 해당 데이터의 변경하면 트랜잭션이 끝나는 시점에 해당 테이블에 변경분을 반영한다.


즉, Entity 객체의 값만 변경하면 별도로 update 쿼리를 사용하지 않아도 된다.


이 개념을 더티체킹이라 한다.

```
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostsApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private WebApplicationContext context;

    @After
    public void tearDown() throws Exception{
        postsRepository.deleteAll();
    }

    @Test
    public void Posts_등록된다() throws Exception{
        // given
        String title = "title";
        String content = "content";
        PostsSaveRequestDto requestDto = PostsSaveRequestDto.builder()
                                                                .title(title)
                                                                .content(content)
                                                                .author("author")
                                                                .build();

        String url = "http://localhost:"+ port + "/api/v1/posts";

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Posts> all = postsRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getContent()).isEqualTo(content);
    }
    @Test
    public void Posts_수정된다() throws Exception{
        // given
        Posts savedPosts = postsRepository.save(Posts.builder()
                                                        .title("title")
                                                        .content("content")
                                                        .author("author")
                                                        .build());

        Long updateId = savedPosts.getId();
        String expectedTitle = "title2";
        String expectedContent = "content2";

        PostsUpdateRequestDto requestDto = PostsUpdateRequestDto.builder()
                                                                    .title(expectedTitle)
                                                                    .content(expectedContent)
                                                                    .build();

        String url = "http://localhost:"+ port + "/api/v1/posts/" + updateId;


        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Posts> all = postsRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(expectedTitle);
        assertThat(all.get(0).getContent()).isEqualTo(expectedContent);
    }

}
```

이전과 달리 @ WebMvcTest를 사용하지 않았는데 이유는 JPA 기능이 작동하지 않기 때문이다.
그렇기에 외부 연동 및 JPA 기능까지 한번에 테스트할 때는 @ SpringBootTest와 TestRestTemplate을 사용하면 된다.

----


###### H2 데이터베이스에 접근해보기

로컬 환경에선 데이터베이스로 H2를 주로 사용한다.
메모리에서 실행하기 때문에 직접 접근하려면 웹 콘솔을 사용해야만 한다.

먼저 아래와 같은 방법으로 웹 콘솔 옵션을 활성화 하자

application.properties

spring.h2.console.enable=true
추가한 뒤 Application.class 의 main 메소드를 실행하고
웹 브라우저에 http://localhost:8080/h2-console 로 접속하자


그 후 JDBC URL이 jdbc:h2:mem:testdb가 쓰여져 있는지 확인 후 connect 버튼을 눌러주자 이후 select * from posts와 같은 간단한 쿼리를 입력해보면 쿼리가 정상적으로 실행된다.


물론 아직 insert를 하지 않았지만 insert 후에 확인해보면 데이터가 정상 출력되는 것을 알 수 있다.

###### JPA Auditing으로 생성시간/수정시간 자동화하기
보통 엔티티에는 해당 데이터의 생성시간과 수정시간을 포함한다.
언제 만들어졌는지, 언제 수정되었는지 등은 차후 유지보수에 있어 굉장히 중요한 정보이기 때문이다.


그래서 DB에 삽입/갱신하기 전에 날짜 데이터를 등록해주는데
이런 단순하고 반복적인 코드가 모든 테이블과 서비스 메소드에 포함되어있다면 이는 매우 귀찮고 지저분해진다.

그래서 이러한 문제를 해결하기 위해서 JPA Auditing을 사용하자

----

###### LocalDate 사용
자바 8 부터는 Date 대신에 LocalDate를 사용한다.

Date와 Calendar 클래스의 문제점

1. 불변 객체가 아니다. (멀티스레드 환경에서 문제 발생 가능성 있음)    
2. Calendar는 월(Month)값 설계가 잘못되었다. (10월을 나타내는 Calendar.OCTOBER의 숫자값은 9이다)  


-------


###### BaseTimeEntity

```
package com.jojoldu.book.springboot.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

}
```
BaseTimeEntity 클래스는 모든 Entity의 상위 클래스가 되어
Entity들의 createDate, modifiedDate를 자동으로 관리하는 역할이다.



@ MappedSuperclass

     * JPA Entity 클래스들이 BaseTimeEntity을 상속할 경우 필드들도 createdDate 와 modifiedDate '컬럼'으로 인식하도록합니다.  
________________________________________________________________________________________
@ EntityListeners(AuditingEntityListener.class)

     * BaseTimeEntity 클래스에 Auditing 기능을 포함시킨다.  

감사(Auditing)란?
  - 의심가는 데이터베이스의 작업을 모니터링 하고, 기록 정보를 수집 하는 기능 입니다.
  - 어느시간때에 어떤 작업들이 주로 발생하는지, 어떤 작업을 누가 하는지 추적 할 수 있습니다.
  - 감사 작업을 하면, 감사 로그를 기록해야 하므로 시스템의 속도는 더 느려질 수 밖에 없습니다.
______________________________________________________________________________________________
@ CreateDate

     * Entity가 생성되어 저장될 때 시간이 자동 저장됩니다.  
______________________________________________________________________________________________
@ LastModifiedDate

     * 조회한 Entity의 값을 변경할 때 시간이 자동 저장됩니다.  
______________________________________________________________________________________________
그리고 Posts 클래스가 BaseTimeEntity를 상속받도록 변경한다.

<br>
-------

<br>
