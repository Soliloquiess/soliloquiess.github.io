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

----

### 머스테치로 화면 구성하기


####  서버 템플릿 엔진과 머스테치

템플릿 엔진 : 지정된 템플릿 양식과 데이터가 합쳐져 HTML문서를 출력하는 소프트웨어
과거에는 JSP와 같이 HTML과 JAVA가 합쳐져 HTML에 데이터를 넣어서 동적으로 활용할 수 있는 것
최근에는 REACT, VUE 같은 것들이 등장했다.

과거 현재 모두 지정된 템플릿과 데이터를 이용하여 HTML을 생성하는 템플릿 엔진이지만
전자는(과거는) 서버 템플릿 엔진이라 불리며,
후자는(현재는) 클라이언트 템플릿 엔진이라 불린다.


```
<script type="text/javascript">

$(document).ready(function(){
    if( a == "1"){
      <%
        System.out.println("test");   
      %>    
    }
})  
```

위 코드의 문제점은 바로 if문과 상관없이 System.out.println("test");이 실행된다는 점이다.
이유는 javascript 와 jsp가 작동하는 영역이 다르기 때문이다.


javascript는 프론트 영역에서 jsp는 서버 영역에서 구동된다.

jsp와 같은 서버 템플릿 엔진을 이용한 화면 생성은 서버에서 java 코드로 문자열을 만든뒤
이 문자열을 HTML로 변환하여 브라우저로 전달한다.

그렇기에 위 코드는 HTML로 만드는 과정에서 System.out.println("test"); 명령어를 실행할 뿐이고
이때 자바스크립트는 실행되지 않는 단순한 문자열일 뿐이다.

자바스크립트는 기본적으로 브라우저 위에서 작동한다.
즉, 서버가 아닌 브라우저에서 작동되므로 서버 템플릿 엔진의 손을 벗어나게 되어 서버에서 제어를 할 수가 없다.

React, Vue 에서 서버는 json 혹은 xml형식의 데이터만 전달하고 클라이언트에서 조립한다.


------


#### 머스테치

머스테치는 현존하는 대부분의 언어를 지원하는 가장 심플한 템플릿 엔진이다.(JSP,REACT 같은)
자바에서 사용할 때는 서버 템플릿 엔진으로,
자바스크립트에서 사용될 때는 클라이언트 템플릿 엔진으로 모두 사용할 수 있다.

###### 장점

- 문법이 다른 템플릿 엔진보다 심플하다.

- 로직 코드를 사용할 수 없어 View의 역할과 서버의 역할을 명확하게 분리한다.

- Mustache.js 와 Mustache.java 2가지가 다 있어, 하나의 문법으로 클라이언트/서버 템플릿을 모두 사용가능


개인적으로 템플릿 엔진은 '화면' 역할에만 충실해야 한다고 생각이든다.  

너무 많은 기능을 제공하면 API와 템플릿 엔진, 자바스크립트가 서로 로직을 나눠 갖게 되어 유지보수하기가 굉장히 어렵다.  

----

#### 기본 페이지 만들기

######  index.mustahce 및 IndexController 작성

머스테치는 스프링 부트에서 공식 지원하는 템플릿 엔진이다.

그러므로 우선 스프링 부트 프로젝트에서 머스테치를 편하게 사용할 수 있도록
머스테치 스타터 의존성을 build.gradle에 등록하자


-----
<br>

###### index.mustahce 및 IndexController 작성

머스테치는 스프링 부트에서 공식 지원하는 템플릿 엔진이다.
그러므로 우선 스프링 부트 프로젝트에서 머스테치를 편하게 사용할 수 있도록
머스테치 스타터 의존성을 build.gradle에 등록하자

build.gradle
```
dependency{    
     ...
     compile('org.springframework.boot::spring-boot-starter-mustache')    
}

```
위처럼 mustache 의존성 설정을 넣어주면 이제 뒤에 .mustache가 기본으로 붙게 된다.


머스테치 파일의 기본 위치는 src/main/resources/templates이다.

이 위치에 머스테치 파일을 두면 스프링 부트에서 자동으로 로딩한다.

첫 페이지를 담당할 index.mustache를 src/main/resources/templates에 생성하자


<br>
----
<br>


index.mustache
```
<!doctype html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>스프링 부트 웹 서버</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app/bgimg.css">
</head>
<body>
    <h1>스프링 부트로 시작하는 웹 서비스 ver.2</h1>
</body>
</html>    
```
이제 이 머스테치에 접근할 Controller를 작성하고 URL 매핑을 진행해주자.

indexController
```
package com.yacho.SpringbootAWS;

import com.yacho.SpringbootAWS.config.auth.LoginUser;
import com.yacho.SpringbootAWS.config.auth.dto.SessionUser;
import com.yacho.SpringbootAWS.service.posts.PostsService;
import com.yacho.SpringbootAWS.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
```


머스테치 스타터 덕분에 컨트롤러에서 문자열을 반환할 때 앞의 경로와 뒤의 파일 확장자는 자동으로 지정된다.(View Resolver)

 앞에는 src/main/resources/templates 뒤에는 .mustache가 붙는 것이다.

 ----


##### IndexController 테스트
테스트 코드를 작성하여 검증을 진행하도록 하자


```
IndexControllerTest

package com.jojoldu.book.springboot.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class IndexControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void 메인페이지_로딩(){
        // when
        String body = this.restTemplate.getForObject("/",String.class);

        // then
        assertThat(body).contains("스프링 부트로 시작하는 웹 서비스");
        // 포함된 내용이 없으 False 리턴
    }
}

```

테스트 메소들를 실행하여 결과를 확인하고
테스트만으로는 아쉬우니 직접 브라우저에 접속해서 확인해보자

Application 클래스의 main 메소드를 실행
http://localhost:8080 접속
매핑 url 이 /이므로 index.mustache 가 출력 될 것이다.

<br>

--------

<br>



#### 게시글 등록 화면 만들기
##### 레이아웃 만들기
이번 머스테치를 작성할 때는 부트스트랩을 이용해서 개발할 것이다.
부트스트랩 사용방법은 크게 2가지이다.

1. 외부 CDN을 이용
2. 직접 라이브러리를 받아서 사용하는 것

-------


실제 서비스가 아니므로 머스테치 파일에 코드 한줄만 작성하는 CDN 방식을 사용할 것인데
우리는 각각에 파일에 한줄씩 넣는것보다 레이아웃 방식으로 추가해서 사용하는 방법으로 할 것이다.
레이아웃 방식이란 공통 영역을 별도의 파일로 분리하여 필요한 곳에서 가져다 쓰는 방식을 말한다.
이렇게 사용하는 이유는 반복되는 코드 작성 시간을 줄이고 변경시 유지보수에 편하기 때문이다.

1. src/main/resources/templates에 layout폴더 생성
2. src/main/resources/templates/layout에 header.mustache 생성
3. src/main/resources/templates/layout에 footer.mustache 생성


header.mustache

```
<!doctype html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>스프링 부트 웹 서버</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app/bgimg.css">
</head>
```

----

footer.mustache


```
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

</body>
</html>
```


-----


코드를 보면 css와 js의 위치가 서로 다른데 이는 페이지 로딩속도를 높이기 위해서이다.
html 에서는 head가 다 실행되고서야 body가 실행된다.

js를 head에 둘 경우 로딩하는 시간이 길어지므로 클라이언트 입장에서는 로딩되는 것으로 보인다.
그렇기에 html 과 css 를 우선으로 로딩하여 로딩이 빠르게 되는 것처럼 보여주게 하는 것이 좋다.

추가로 bootstrap은 제이쿼리에 의존적이기에 꼭 제이쿼리도 같이 사용해주어야 한다.

###### index.mustache 수정하기
레이아웃으로 파일을 분리햇으니 index.mustache에 글 등록 버튼을 하나 추가하자

index.mustache

```
{{>layout/header}}
    <h1>스프링 부트로 시작하는 웹 서비스 ver.2</h1>
    <div class="col-md-12">
        <!-- 로그인 기능 영역 -->
        <div class="row">
            <div class="col-md-6">
                <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
            </div>
        </div>
    </div>

{{>layout/footer}}
```
위 코드에서 작성된 주소 /posts/save를 처리해주는 Controller를 작성해주자

-----


IndexController

```

package com.jojoldu.book.springboot.web;

import com.jojoldu.book.springboot.config.auth.LoginUser;
import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
import com.jojoldu.book.springboot.service.posts.PostsService;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/posts/save")
    public String postsSave(){
        return "posts-save";
    }
}

```

----

/posts/save를 호출하면 posts-save.mustache를 호출하는 메소드를 추가해줬다.
컨트롤러 코드가 생성되었다면 호출될 posts-save.mustache 파일도 생성해주자

posts-save.mustache

```

{{>layout/header}}

<h1>게시글 등록</h1>
<div class="col-md-12">
    <div class="col-md-4">
        <form>
            <div class="form-group">
                <label for="title">제목</label>
                <input type="text" class="form-control" id="title" placeholder="제목을 입력하세요">
            </div>
            <div class="form-group">
                <label for="author"> 작성자</label>
                <input type="text" class="form-control" id="author" placeholder="작성자를 입력하세요">
            </div>
            <div class="form-group">
                <label for="content"> 내용</label>
                <textarea class="form-control" id="content" placeholder="내용을 입력하세요"></textarea>
            </div>
        </form>
        <a href="/" role="button" class="btn btn-secondary">취소</a>
        <button type="button" class="btn btn-primary" id="btn-save">등록</button>
    </div>
</div>
{{>layout/footer}}
```

##### Index.js 생성하기

UI를 작성했지만 아직 게시글 등록 화면에 등록 버튼에 대한 기능을 정의해주지 않았다.

그렇기에 src/main/resources에 static/js/app디렉토리를 생성해주고 js 코드를 작성해주자

index.js
```
var main = {
    init : function () {
        var _this = this;
        $('#btn-save').on('click', function(){
            _this.save();
        })
    },
    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function(){
            alert('글이 등록되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
};
```

main.init()
여기서 한가지 팁이 있는데 var index = { 함수이름 : function(){}}이런식으로 만들었을까?
이유는 간단하다 우선 아래 코드를 살펴보자

a.js
```
var init = function(){

}

var save = function(){

}
```
단순히 이러한 코드만 보면 문제가 없어보인다.
하지만 a.js와 같은 식별자를 사용하는 코드가 존재한다면 어떻게 될까?

b.js
```
var init = function(){

}

var save = function(){

}
```
이름이 같기 때문에 먼저 적용된 코드는 묻히고 뒤에 작성된 코드가 사용될 것이다.

var a = {
     init : function(){}
     save : function(){}
}

var b = {
     init : function(){}
     save : function(){}
}


그렇기에 이를 막고자 JavaScript의 객체의 특성을 이용하여 위와 같이 코드를 작성했으며
a.init() / a.save()와 b.init() / b.save() 이렇게 겹치지 않게 사용할 수 있게해준다.
이를 네임스페이스 기법이라고 부르기도 한다.

이제 작성된 index.js를 적용시키기 위해 footer.mustache에 추가해주자

footer.mustache
```
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

<!-- index.js 추가 -->
<script src="/js/app/index.js"></script>
</body>
</html>
```


등록 기능까지 끝냈으므로 실제로 한번 구동시켜서 테스트 해보자


<br>
--------
<br>


#### 전체 조회 화면 만들기

조회 UI를 위해 index.mustache를 조금 수정해보자

index.mustache

```
{{>layout/header}}
    <h1>스프링 부트로 시작하는 웹 서비스 ver.2</h1>
    <div class="col-md-12">
        <!-- 로그인 기능 영역 -->
        <div class="row">
            <div class="col-md-6">
                <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
            </div>
        </div>
    </div>
    <br>
    <!-- 목록 출력 영역 -->
    <table class="table table-horizontal table-bordered">
        <thead class="thead-string">
            <tr>
                <th>게시글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>최종수정일</th>
            </tr>
        </thead>
        <tbody id="tbody">
            {{#posts}}
                <tr>
                    <td>{{id}}</td>
                    <td>{{title}}</td>
                    <td>{{author}}</td>
                    <td>{{modifiedDate}}</td>
                </tr>
            {{/posts}}
        </tbody>
    </table>
{{>layout/footer}}
```

-----





{{#posts}}

     * posts라는 List를 순회한다.  
     * Java의 for문과 동일하게 생각하면 된다.  
_____________________________________________________________________________
{{#id}}등의 {{변수명}}

     * List에서 뽑아낸 객체의 필드를 사용한다.   
이제 조회를 위해서 기존에 있던 Controller, Service, Repository 에 코드를 추가해주자

PostsRepository

```

package com.jojoldu.book.springboot.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts,Long> {

    @Query("SELECT p FROM Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();
}
```
springDataJpa에서 제공해주는 CRUD 외에도 추가로 쿼리를 작성을 해도 된다.
그럴때는 @ Query로 사용해주면 된다.

PostsService
```
package com.jojoldu.book.springboot.service.posts;

import com.jojoldu.book.springboot.domain.posts.Posts;
import com.jojoldu.book.springboot.domain.posts.PostsRepository;
import com.jojoldu.book.springboot.web.dto.PostsListResponseDto;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
import com.jojoldu.book.springboot.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto){
        return postsRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto){
        Posts posts = postsRepository.findById(id).orElseThrow(() -> new
                IllegalArgumentException("해당 게시글이 없습니다. id="+ id));
        posts.update(requestDto.getTitle(), requestDto.getContent());

        return id;
    }

    @Transactional
    public PostsResponseDto findById(Long id){
        Posts entity = postsRepository.findById(id).orElseThrow(() -> new
                IllegalArgumentException("헤당 게시글이 없습니다. id="+id));
        return new PostsResponseDto(entity);
    }

    @Transactional(readOnly = true)
    public List<PostsListResponseDto> findAllDesc(){
        return postsRepository.findAllDesc().stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }

}
```

findAllDesc 메소드의 트랜잭션 어노테이션 @ Transactional에 옵션이 하나 추가되었다.


바로 (readOnly=true)인데 이 옵션을 추가해주면 트랜잭션 범위는 유지하되, 조회 기능만 남겨두어 조회 속도가 개선되기 때문에 등록, 수정, 삭제 기능이 없는 서비스 메소드에 사용하는 것이 좋다.

위 코드에서는 람다식이 사용되었는데 모르는 사람들을 위해 해석을 진행해보면 이렇다.
```
findAllDesc() -> List<Posts>로 반환
.stream() -> List에 저장된 각각의 원소들에 대하여 stream 진행 -> 전체가 아니라 Posts 하나씩 로직 처리하게 함  
.map(PostsListResponseDto::new) -> PostsListResponseDto 생성자 호출
                                -> 사실 .map(posts -> new PostsListResponseDto(posts)) 와 같은 의미  
                                -> 이는 stream으로 인해 하나씩 분리된 posts를 인자로 넘겨 PostsListResponseDto 생성자의 매개변수로 넣는다.
                                -> 아직 PostsListResponseDto는 만들지 않았지만 만들면 생성자의 매개변수로 Posts 변수로 만들어야 한다

```


즉, PostsRepository 결과로 넘어온 List에 저장된 각각의 Posts 를 PostsListResponseDto 만들고 다시 리스트에 넣는다.
그리고 PostsListResponseDto 를 아직 생성하지 않았으니 이 클래스 역시 패키지/web/dto에 생성해주자

PostsListResponseDto

```
package com.jojoldu.book.springboot.web.dto;

import com.jojoldu.book.springboot.domain.posts.Posts;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostsListResponseDto {
    private Long id;
    private String title;
    private String author;
    private LocalDateTime modifiedDate;

    public PostsListResponseDto(Posts entity){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.modifiedDate = entity.getModifiedDate();
    }
}
```

위에서 언급했듯이 .map(PostsListResponseDto::new) 를 수행하기 위해서 생성자 매개변수 타입은 Posts 이다.

이제 마지막으로 Controller를 수정한다

IndexController

```
package com.jojoldu.book.springboot.web;

import com.jojoldu.book.springboot.config.auth.LoginUser;
import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
import com.jojoldu.book.springboot.service.posts.PostsService;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;

    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("posts", postsService.findAllDesc());
        return "index";
    }

    @GetMapping("/posts/save")
    public String postsSave(){
        return "posts-save";
    }
}
```
-----



###### Model model  

     * 서버 탬플릿 엔진에서 사용할 수 있는 객체를 저장할 수 있다.  
     * 여기서 postsService.findAllDesc()로 가져온 결과를 posts로 index.mustache에 전달한다.  
Controller 까지 모두 완성되었으니 데이터를 등록해보고 조회 목록에 나오는지 확인하면 된다.


-----

##### 게시글 수정, 삭제 화면 만들기

마지막으로 게시글 수정, 삭제 화면을 만들어보자
게시글 수정 API는 이미 만들어 두었으니 삭제 API를 만들어주고 수정 삭제 화면을 만들면 된다.

###### 게시글 수정

게시글 수정 화면 머스테치 파일을 생성한다.


-----

posts-update.mustache


```
{{>layout/header}}

<h1>게시글 수정</h1>
<div class="col-md-12">
    <div class="col-md-4">
        <form>
            <div class="form-group">
                <label for="title">글 번</label>
                <input type="text" class="form-control" id="id" value="{{post.id}}" readonly>
            </div>
            <div class="form-group">
                <label for="title">제목</label>
                <input type="text" class="form-control" id="title" value="{{post.title}}">
            </div>
            <div class="form-group">
                <label for="author"> 작성자</label>
                <input type="text" class="form-control" id="author" value="{{post.author}}" readonly>
            </div>
            <div class="form-group">
                <label for="content"> 내용</label>
                <textarea class="form-control" id="content">{{post.content}}</textarea>
            </div>
        </form>
        <a href="/" role="button" class="btn btn-secondary">취소</a>
        <button type="button" class="btn btn-primary" id="btn-update">수정 완료</button>
    </div>
</div>
{{>layout/footer}}
```

{{post.id}}

     * 머스테치는 객체의 필드 접근시 점으로 구분한다.     
     * 즉, Post 클래스의 id에 대한 접근은 post.id로 사용할 수 있다.  
___________________________________________________________________
<input ... readonly>

     * Input 태그에 읽기 가능만 허용하는 속성이다.  
     * id와 author는 수정할 수 없도록 읽기만 허용하도록 추가한다


----


그리고 btn-update 버튼을 클릭하면 update 기능을 호출할 수 있게
index.js 파일에도 update function을 하나 추가하자

index.js
```
var main = {
    init : function () {
        var _this = this;
        $('#btn-save').on('click', function(){
            _this.save();
        })
        $('#btn-update').on('click', function(){
            _this.update();
        })
    },
    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function(){
            alert('글이 등록되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    update : function () {
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };
        var id = $('#id').val();

        $.ajax({
            type: 'PUT',
            url: '/api/v1/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function(){
            alert('글이 수정되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
};
main.init()
```

-----


$('#btn-update').on('click')

     * btn-update 란 id를 가진 HTML 엘리먼트에 click 이벤트가 발생할 때 update function을 실행하도록 이벤트를 등록한다.
___________________________________________________________________________________________________________________
update : function(){}

     * 신규로 추가될 update function 입니다.   
___________________________________________________________________________________________________________________
type : 'PUT'

     * 여러 HTTP Method 중 PUT 메소드를 선택합니다.  
     * PostsApiController에 있는 API에서 이미 @PutMapping으로 선언했기 때문에 PUT을 사용해야 한다.  
     참고로 이는 REST 규약에 맞게 설정된 것이다.  
     * REST에서 CRUD는 다음과 같이 HTTP Method에 매핑된다.  
          생성(create) - POST
          읽기(read) - GET
          수정(update) - PUT
          삭제(delete) - DELETE
___________________________________________________________________________________________________________________
url: '/api/v1/posts/'+id

     * 어느 게시글을 수정할지 URL Path로 구분하기 위해 Path에 id를 추가한다.  
마지막으로 전체 목록에서 수정 페이지로 이동할 수 있게 index.mustache 에 페이지 이동 기능을 추가해주자

----

마지막으로 전체 목록에서 수정 페이지로 이동할 수 있게 index.mustache 에 페이지 이동 기능을 추가해주자

index.mustache
```
{{>layout/header}}
    <h1>스프링 부트로 시작하는 웹 서비스 ver.2</h1>
    <div class="col-md-12">
        <!-- 로그인 기능 영역 -->
        <div class="row">
            <div class="col-md-6">
                <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
            </div>
        </div>
    </div>
    <br>
    <!-- 목록 출력 영역 -->
    <table class="table table-horizontal table-bordered">
        <thead class="thead-string">
            <tr>
                <th>게시글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>최종수정일</th>
            </tr>
        </thead>
        <tbody id="tbody">
            {{#posts}}
                <tr>
                    <td>{{id}}</td>
                    <td><a href="/posts/update/{{id}}">{{title}}</a></td>
                    <td>{{author}}</td>
                    <td>{{modifiedDate}}</td>
                </tr>
            {{/posts}}
        </tbody>
    </table>
{{>layout/footer}}
```

-----

```
<a href="/posts/update/{{id}}"></a>
```
     * 타이틀에 a tag 를 추가한다.
     * 타이틀을 클릭하면 해당 게시글의 수정 화면으로 이동한다.  
화면 작업이 끝났으므로 Controller 코드를 수정해주자

<br>
----

<br>


##### 게시글 삭제
삭제 버튼은 본문을 확인하고 진행해야 하므로 수정 화면에 추가해주자

posts-update.mustache
```
{{>layout/header}}

<h1>게시글 수정</h1>
<div class="col-md-12">
    <div class="col-md-4">
        <form>
            <div class="form-group">
                <label for="title">글 번</label>
                <input type="text" class="form-control" id="id" value="{{post.id}}" readonly>
            </div>
            <div class="form-group">
                <label for="title">제목</label>
                <input type="text" class="form-control" id="title" value="{{post.title}}">
            </div>
            <div class="form-group">
                <label for="author"> 작성자</label>
                <input type="text" class="form-control" id="author" value="{{post.author}}" readonly>
            </div>
            <div class="form-group">
                <label for="content"> 내용</label>
                <textarea class="form-control" id="content">{{post.content}}</textarea>
            </div>
        </form>
        <a href="/" role="button" class="btn btn-secondary">취소</a>
        <button type="button" class="btn btn-primary" id="btn-update">수정 완료</button>
        <button type="button" class="btn btn-danger" id="btn-delete">삭제</button>
    </div>
</div>
{{>layout/footer}}
```
------
```
<button type="button" class="btn btn-danger" id="btn-delete">삭제</button>
```
     * 삭제 버튼을 수정 완료 버튼 옆에 추가합니다.  
     * 해당 버튼 클릭시 JS에서 이벤트를 수신할 예정입니다.
삭제 이벤트를 진행할 JS 코드도 추가한다.

index.js
```
var main = {
    init : function () {
        var _this = this;
        $('#btn-save').on('click', function(){
            _this.save();
        })
        $('#btn-update').on('click', function(){
            _this.update();
        })
        $('#btn-delete').on('click', function(){
            _this.delete();
        })
    },
    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function(){
            alert('글이 등록되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    update : function () {
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };
        var id = $('#id').val();

        $.ajax({
            type: 'PUT',
            url: '/api/v1/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function(){
            alert('글이 수정되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    delete : function () {

        var id = $('#id').val();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function(){
            alert('글이 삭제되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }
};

main.init()
```
type은 DELETE를 제외하고는 update function과 크게 차이 나진 않습니다.


###### 삭제 API


PostsService
```
package com.jojoldu.book.springboot.service.posts;

import com.jojoldu.book.springboot.domain.posts.Posts;
import com.jojoldu.book.springboot.domain.posts.PostsRepository;
import com.jojoldu.book.springboot.web.dto.PostsListResponseDto;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
import com.jojoldu.book.springboot.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto){
        return postsRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto){
        Posts posts = postsRepository.findById(id).orElseThrow(() -> new
                IllegalArgumentException("해당 게시글이 없습니다. id="+ id));
        posts.update(requestDto.getTitle(), requestDto.getContent());

        return id;
    }

    @Transactional
    public PostsResponseDto findById(Long id){
        Posts entity = postsRepository.findById(id).orElseThrow(() -> new
                IllegalArgumentException("헤당 게시글이 없습니다. id="+id));
        return new PostsResponseDto(entity);
    }

    @Transactional(readOnly = true)
    public List<PostsListResponseDto> findAllDesc(){
        return postsRepository.findAllDesc().stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete (Long id){
        Posts posts = postsRepository.findById(id).orElseThrow(()->new
                IllegalArgumentException("해당 게시글이 없습니다. id="+ id));
        postsRepository.delete(posts);
    }

}
```

postsRepository.delete(posts)

     * JpaRepository에서 이미 delete 메소드를 지원하고 있으니 이를 활용합니다
     * 엔티티를 파라미터로 삭제할 수도 있고, deleteById 메소드를 이용하면 id로 삭제할 수 있다.  
     * 존재하는 Posts인지 확인을 위해 엔티티 조회 후 그대로 삭제한다.  
서비스에서 만든 delete 메소드를 컨트롤러가 사용하도록 코드를 추가한다.

PostsApiController
```
package com.jojoldu.book.springboot.web;

import com.jojoldu.book.springboot.service.posts.PostsService;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
import com.jojoldu.book.springboot.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class
{
    private final PostsService postsService; // 생성자로 주입

    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody PostsSaveRequestDto requestDto){
        return postsService.save(requestDto);
    }

    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto){
        return postsService.update(id, requestDto);
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById (@PathVariable Long id) {
        return postsService.findById(id);
    }

    @DeleteMapping("/api/v1/posts/{id}")
    public Long delete(@PathVariable Long id){
        postsService.delete(id);
        return id;
    }

}
```

컨트롤러 다 만들었고 실행하면 된다.

-----------

### 스프링 시큐리티와 OAuth2.0으로 로그인


#### 스프링 시큐리티와 스프링 시큐리티 Oauth2 클라이언트

왜 많은 서비스에서 소셜 로그인을 사용할까? 이동욱 저자님의 생각으로는 배보다 배꼽이 커지는 경우라 하셨다.

직접 구현한다면 다음을 전부 구현해야한다.

```
로그인 시 보안
비밀번호 찾기
비밀번호 변경
회원정보 변경
회원가입시 이메일 혹은 전화번호 인증
```
그렇기에 OAuth2 로그인 구현을하면 앞선 목록을 소셜 기업에 맡기고 서비스에만 집중할 수 있다.


-----



##### 스프링부트 1.5 vs 스프링 부트 2.0
<br>
스프링 부트 1.5에서의 OAuth2 연동 방법이 2.0에서는 크게 변경되었다.
하지만 spring-security-oauth2-autoconfigure 라이브러리 덕분에 설정 방법의 큰 차이를 없게 할 수 있다

spring-security-oauth2-autoconfigure
해당 라이브러리를 사용할 경우 스프링 부트2에서도 기존 설정을 그대로 사용할 수 있다.
아무래도 새로운 방식보다는 기존에 안전하게 작동하는 방법이 확실하므로 많은 개발자가 해당 방식을 이용했다.

하지만
우리는 스프링 부트2 방식인 Spring Security Oauth2 Client 라이브러리를 사용할 것이고
이유는 아래와 같다.

- 스프링 팀에서 기존 1.5에서 사용되던 spring-security-oauth 프로젝트는 유지 상태로 경정했으며 더는 신규 기능은 추가하지 않고 버그 수정 정도의 기능만 추가될 예정이다.
즉, 신규 기능은 oauth2 라이브러리에서만 지원하겠다고 선언한 것이다.

<br>

- 스프링 부트용 라이브러리(starter)가 출시 되었다.


<br>


- 기존에 사용되던 방식은 확장 포인트가 적절하게 오픈되어 있지 않아 직접 상속하거나 오버라이딩 해야 하고 신규 라이브러리의 경우 확장 포인트를 고려해서 설계된 상태이다.


그렇기에 이제 새롭게 배우는 학생 입장에서는 스프링 부트2 방식으로 배우는 것이 좀 더 나을 것이다.

-----


##### 추가 이야깃거리

<br>


스프링 부트2 방식의 자료를 찾고 싶은 경우 인터넷 자료들 사이에서 다음 2가지만 확인하면 된다.

1. spring-security-oauth2-autoconfigure 라이브러리를 사용했는지
2. application.properties 혹은 application.yml 정보가 다음 사진과 같이 차이가 있는지

-----


스프링 부트 1.5 방식에서는 url 주소를 모두 명시해야 하지만,
스프링 부트 2.0 방식에서는 client 인증 정보만 입력하면 된다.

1.5 버전에서 직접 입력했던 값들은 2.0 버전으로 오면서 모두 enum으로 대체되었다.


CommonOAuth2Provider라는 enum이 새롭게 추가되어 구글, 깃허브, 페이스북, 옥타의 기본 설정값은 모두 여기서 제공한다.
이외에 다른 소셜 로그인을 추가한다면 직접 다 추가해 주어야 한다.


------

#### 구글 서비스 등록


###### application-oauth 등록

application.properties가 있는 src/main/resources/디렉토리에
application-oauth.properties 파일을 생성한다.
그리고 해당 파일에 클라이언트ID와 클라이언트 보안 비밀 코드를 다음과 같이 등록한다.

application-oauth.properties

```
spring.security.oauth2.client.registration.google.client-id=692886957287-663ep6r6ds8ee0oukr9f5mrqof57k6bj.apps.googleusercontent.com
spring.security.oauth2.client.registration.google.client-secret=pVQcqYjwp_7fYyYdOJfkd5rk
spring.security.oauth2.client.registration.google.scope=profile,email
```

----


##### 관점 포인트

```
scope=profile,email
```

-----


##### .gitignore 등록
<br>

우리의 프로젝트는 깃허브와 연동하여 사용하다 보니 application-oauth.properties 파일이 깃허브에 올라갈 수 있다.
보안을 위해 해당 파일이 올라가는 것을 금지해주자

application-oauth.properties
추가한 뒤 커밋했을 때 커밋 파일 목록에 application-oauth.properties가 나오지 않으면 성공이다.
만약 .gitignore에 추가했음에도 여전히 커밋 목록에 노출된다면 이는 Git의 캐시문제이다.


-----

#### User Entity 설정하기

구글의 로그인 인증정보를 발급 받았으니 프로젝트 구현을 진행해보자


우선 사용자 정보를 담당할 도메인인 User클래스를 생성해주자.


----


User
```
package com.jojoldu.book.springboot.domain.user;

import com.jojoldu.book.springboot.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder
    public User(String name, String email, String picture, Role role){
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
    }

    public User update(String name, String picture){
        this.name = name;
        this.picture = picture;

        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}
```

@ Enumerated(EnumType.STRING)

* JPA로 데이터베이스로 저장할 때 Enum 값을 어떤 형태로 저장할지를 결정합니다.    
* 기본적으로 int로 된 숫자가 저장됩니다.   
* 숫자로 저장되면 데이터베이스로 확인할 때 그 값이 무슨 코드를 의미하는지 알 수가 없습니다.   
* 그래서 문자열 (EnumType.STRING)로 저장될 수 있도록 선언합니다.  

<br>
----
<br>

Role
```
package com.jojoldu.book.springboot.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@ Getter
@ RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST", "손님"),
    USER("ROLE_USER", "일반 사용자");

    private final String key;
    private final String title;
}
```
스프링 시큐리티에서는 권한 코드에 항상 ROLE_이 앞에 있어야 합니다.
그래서 코드별 키 값을 ***ROLE_GEUST, ROLE_USER*** 등으로 지정합니다.


-----


UserRepository
```
package com.jojoldu.book.springboot.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```



###### findByEmail(String email);   

* 소셜 로그인으로 반환되는 값중 email을 통해 이미 생성된 사용자인지 처음 가입하는 사용자인지 판단하기 위한 메소드
* PK 를 사용한 것이 아니라 Unique 를 사용한 것을 알 수 있다.   

-------


#### 스프링 시큐리티 설정
먼저 build.gradle에 스프링 시큐리티 관련 의존성 하나를 추가해주자

build.gradle
```
complie('org.springframework.boot::spring-boot-starter-oauth2-client')
```


###### spring-boot-starter-oauth2-client

* 소셜 로그인 등 클라이언트 입장에서 소셜 기능 구현시 필요한 의존성입니다.  


* spring-boot-starter-oauth2-client 와 spring-boot-starter-oauth2-jose를 기본으로 관리해줍니다.
build.gradle설정이 끝났으면 OAuth 라이브러리를 이용한 소셜 로그인 코드를 작성해보자
config.auth 패키지를 생성합니다.
앞으로 시큐리티 관련 클래스는 모두 이곳에 담는다고 보면 될 것 같습니다.

그리고 SecurityConfig 클래스를 생성해줍시다.

###### SecurityConfig

```
package com.yacho.SpringbootAWS.config.auth;

import com.yacho.SpringbootAWS.domain.member.Role;
//
여기서 위 경로를 제대로 안 써주면 h2안에있는 member 및 Role
이 잡히는데 이 경우엔 에러가 나므로 경로를 제대로 써줘야 한다.

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .csrf().disable().headers().frameOptions().disable().and()
                .authorizeRequests()
                .antMatchers("/","/css/**","/images/**","/js/**","/h2-console/**", "/profile").permitAll()
                .antMatchers("/api/v1/**").hasRole(Role.USER.name())
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

    }
}
```



import com.yacho.SpringbootAWS.domain.member.Role;

***여기서 위 경로를 제대로 안 써주면 h2안에있는 member 및 Role
이 잡히는데 이 경우엔 에러가 나므로 경로를 제대로 써줘야 한다.(경로 바꾸면 디폴트가 h2기 때문에 role경로를 제대로 써줘야)***



-----

@ EnableWebSecurity   

* Spring Security 설정들을 활성화시켜줍니다.     
_____________________________________________________________
http.csrf().disable().headers().frameOptions().disable()    

* h2-console 화면을 사용하기 위해 해당 옵션들을 disable합니다.   
_____________________________________________________________
.authorizeRequests()  

* URL 별 권한 관리를 설정하는 옵션의 시작점입니다.   
* authorizeRequests() 가 선언되어야만 andMatchers() 옵션을 사용할 수 있습니다.   
_____________________________________________________________
.andMatchers("url", "url2")    

* 권한 관리 대상을 지정하는 옵션입니다.   
* URL, HTTP 메소드별로 관리가 가능합니다.   
* "/" 등 지정된 URL들은 permitAll() 옵션을 통해 전체 열람 권한을 주었습니다.   
* "api/v1/**" 주소를 가진 API는 USER 권한을 가진 사람만 가능하도록 했습니다.  
_____________________________________________________________
.anyRequest()

* 설정된 값 이외 나머지 URL 들을 나타냅니다.  
* 여기서는 .authenticated()을 추가하여 나머지 URL 들은 모두 인증된 사용자들에게만 허용합니다.   
* 인증된 사용자 즉, 로그인 한 사용자들을 이야기합니다.   
_____________________________________________________________
.logout().logoutSuccessUrl("/")     
* 로그아웃 기능에 대한 여러 설정의 진입점입니다.   
* 로그아웃 성공시 / 주소로 이동합니다.  
_____________________________________________________________
.oauth2Login()   

* OAuth2 로그인 기능에 대한 여러 설정의 진입점입니다.   
_____________________________________________________________
.userInfoEndpoint()   

* OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당합니다.   
_____________________________________________________________
.userService(customOAuth2UserService)    

* 소셜 로그인 성공시 후속 조치를 진행할 UserService 인터페이스의 구현체를 등록합니다.       
* 리소스 서버(즉, 소셜 서비스들)에서 사용자 정보를 가져온 상태에서 추가로 진행하고자 하는 기능을 명시할 수 있습니다.  
* **OAuth2UserService 인터페이스의 추상메서드인 loadUser를 사용한다.**     



-----



설정 코드 작성이 끝났다면 CustomOAuth2UserService클래스를 생성하자
이 클래스는 구글 로그인 이후 가져온 사용자 정보들을 기반으로
가입 및 정보수정, 세션 저장등의 기능을 지원해준다.

CustomOAuth2UserService

```
package com.jojoldu.book.springboot.config.auth;

import com.jojoldu.book.springboot.config.auth.dto.OAuthAttributes;
import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
import com.jojoldu.book.springboot.domain.user.User;
import com.jojoldu.book.springboot.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User user = saveOrUpdate(attributes);
        httpSession.setAttribute("user", new SessionUser(user));

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }

    private User saveOrUpdate(OAuthAttributes attributes){
        User user = userRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getName(), attributes.getPicture()))
                .orElse(attributes.toEntity());

        return userRepository.save(user);
    }
}
```

<br>
-----
<br>

String registrationId = userRequest.getClientRegistration().getRegistrationId();

* 현재 로그인 진행중인 서비스를 구분하는 코드   
* 구글로 로그인, 네이버로 로그인하는지 구분하기 위해 사용되는 코드이다.   
_________________________________________________________________________________________
String userNameAttributeName =   
userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

* OAuth2 로그인 진행시 키가 되는 필드값을 이야기합니다. PK 같은 역할   
* 구글의 경우 기본적으로 코드를 지원하지만 ("sub") , 네이버 카카오등은 지원하지 않습니다.   
* 이후 네이버 로그인과 구글 로그인을 동시 지원할 때 사용할 것입니다.  
_________________________________________________________________________________________
OAuthAttributes attributes =
OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

* oAuth2User 는 OAuth2UserService 로 만들어진 OAuth2User 객체를 참조하는 변수이다.  
* OAuthAttributes attributes는 OAuth2UserService 를 통해 가져온 OAuth2User 클래스의 attribute를 담을 클래스입니다.
* 이후 네이버 등 다른 소셜 로그인도 이 클래스를 사용합니다.   
* 이것은 우리가 직접 정의해주는 클래스로 밑에서 클래스를 작성할 것입니다.   
________________________________________________________________________________________  
httpSession.setAttribute("user", new SessionUser(user));

* 세션에 자용자 정보를 저장하기 위한 DTO 클래스  
* User 클래스를 사용하면 안되기에 SessionUser를 만들었다.   
* 왜 User 클래스를 사용하면 안되나요?**
만약 User 클래스를 그대로 사용했다면 다음과 같은 에러가 발생합니다.   

Failed to convert from type [java.lang.Object]
to type [byte[]] for value 'com.jojoIdu.book.springboot.domain.user.User@4a43d6'    
이는 User 클래스에 직렬화를 구현하지 않았다는 의미의 에러입니다.     
그렇다면 User 클래스에 직렬화 코드를 넣으면 될까요? 그렇기에는 생각할 것이 많습니다.   

바로 User 클래스가  데이터베이스와 직접 연결되는 엔티티이기 때문입니다       
엔티티 클래스에는 언제 다른 엔티티와의 관계가 형성될지 모릅니다.       

예를 들면 @ OneToMany , @ ManyToMany등 자식 엔티티를 갖고 있다면      
직렬화 대상에 자식들까지 포함되니 성능 이슈, 부수 효과가 발생할 확률이 높습니다.      

그래서 직렬화 기능을 가진 DTO를 하나 추가로 만드는 것이 이후 운영 및 유지보수 때 많은 도움이 됩니다.  


-------


구글 사용자 정보가 업데이트 되었을 때를 대비하여 update 기능도 같이 구현되었습니다.
사용자의 이름이나, 프로필 사진이 변경되면 User 엔티티에도 반영이 됩니다.
정확히 말하면 기존 Email 이 있다면 최신 정보로 받아오고
Email 이 없다면 지금 정보로 Entity를 만들어라 하고 있습니다.

CustomOAuth2UserService 클래스까지 생성되었다면 OAuthAttributes 클래스를 생성합니다.
필자의 경우 OAuthAttributes는 DTO로 보기 때문에 config.auth.dto 패키지를 만들어 해당 패키지에 생성했습니다.

OAuthAttributes

```
package com.jojoldu.book.springboot.config.auth.dto;

import com.jojoldu.book.springboot.domain.user.Role;
import com.jojoldu.book.springboot.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String picture){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        System.out.println("registration="+registrationId);
        return ofGoogle(userNameAttributeName, attributes);
    }
    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.GUEST)
                .build();
    }
}
```

public static OAuthAttributes of(){}   

* OAuth2User에서 반환하는 사용자 정보는 Map 자료구조 형태이기에 값 하나하나를 변환해야한다.   
__________________________________________________________________________________________
toEntity()    

* User 엔티티를 생성합니다.   
* OAuthAttributes 에서 엔티티를 생성하는 시점은처음 가입할 때입니다.   
* 가입할 때의 기본 권한을 GUEST로 주기 위해서 role 빌더값에는 Role.GUEST를 사용합니다.   
OAuthAttributes 클래스 생성이 끝났으면 같은 패키지에 SessionUser 클래스를 생성합니다.


------

###### SessionUser

```
package com.jojoldu.book.springboot.config.auth.dto;

import com.jojoldu.book.springboot.domain.user.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

    private String name;
    private String email;
    private String picture;

    public SessionUser(User user){
        this.name = user.getName();
        this.email = user.getEmail();
        this.picture = user.getPicture();
    }
}
```

SessionUser에는 인증된 사용자 정보만 필요합니다.
그 외에 필요한 정보들은 없으니 name, email, picture 만 필드로 선언합니다.

----

로그인 테스트
스프링 시큐리티가 잘 적용되었는지 확인하기 위해 화면에 로그인 버튼을 추가하자
index.mustache에 로그인 버튼과 로그인 성공 시 사용자 이름을 보여주도록 하자

index.mustache
```
{{>layout/header}}
    <h1>스프링 부트로 시작하는 웹 서비스 ver.2</h1>
    <div class="col-md-12">
        <!-- 로그인 기능 영역 -->
        <div class="row">
            <div class="col-md-6">
                <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
                {{#userName}}
                    Looged in as : <span id="user">{{userName}}</span>
                    <a href="/logout" class="btn btn-info active" role="button">Logout</a>
                {{/userName}}
                {{^userName}}
                    <a href="/oauth2/authorization/google" class="btn btn-success active" role="button">
                        Google Login
                    </a>
                {{/userName}}
            </div>
        </div>
    </div>
    <br>
    <!-- 목록 출력 영역 -->
    <table class="table table-horizontal table-bordered">
        <thead class="thead-string">
            <tr>
                <th>게시글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>최종수정일</th>
            </tr>
        </thead>
        <tbody id="tbody">
            {{#posts}}
                <tr>
                    <td>{{id}}</td>
                    <td><a href="/posts/update/{{id}}">{{title}}</a></td>
                    <td>{{author}}</td>
                    <td>{{modifiedDate}}</td>
                </tr>
            {{/posts}}
        </tbody>
    </table>
{{>layout/footer}}
```

----


{{#userName}}   

* 머스테치는 다른 언어와 같은 if문을 제공하지 않습니다.     
* true/false 여부만 판단할 뿐입니다.      
* 그래서 머스터치에서는 항상 최종값을 넘겨줘야 합니다.      
* 여기서도 역시 userName 이 있다면 userName을 노출시키도록 구성했습니다.    
______________________________________________________________________________
a href="/logout"    

* 스프링 시큐리티에서 기본적으로 제공하는 로그아웃 URL 입니다.   
* 즉, 개발자가 별도로 저 URL에 해당하는 컨트롤러를 만들 필요가 없습니다.   
* SecurityCofing 클래스에서 URL을 변경할 순 있지만 기본 URL을 사용해도 충분하니 여기서는 그대로 사용합니다.   
______________________________________________________________________________
{{^userName}}

* 머스테치 에서 해당 값이 존재하지 않는 경우에는 ^ 를 사용합니다.   
* 여기서는 userName이 없다면 로그인 버튼을 노출시키도록 구성했습니다.  
______________________________________________________________________________

a href = "/oauth2/authorization/google"     

* 스프링 시큐리티에서 기본적으로 제공하는 로그인 URL 입니다.   
* 로그아웃 URL과 마찬가지로 개발자가 별도의 컨트롤러를 생성할 필요가 없습니다.  
* 후에 네이버 로그인은 따로 설정을 해주어야 할 것입니다.  


index.mustache에서 userName을 사용할 수 있게 IndexController 에서 UserName을 model에 저장하자

----


IndexController
```
package com.jojoldu.book.springboot.web;

import com.jojoldu.book.springboot.config.auth.LoginUser;
import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
import com.jojoldu.book.springboot.service.posts.PostsService;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;
    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model){

        model.addAttribute("posts", postsService.findAllDesc());
        Session User user= (SessionUser) httpSession.getAttribute("user");
        if(user != null){
            model.addAttribute("userName", user.getName());
        }
        return "index";
    }

    @GetMapping("/posts/save")
    public String postsSave(){
        return "posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id, Model model){

        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post",dto);
        return "posts-update";
    }
}
```

(SessionUser) httpSession.getAttribute("user");

* 앞서 작성된 CustomOAuth2UserService에서 로그인 성공 시 세션에 SessionUser를 지정하도록 구성했습니다.          
* 즉, 로그인 성공시 httpSession.getAttribute("user")에서 값을 가져올 수 있습니다.     
______________________________________________________________________________
if(user != null)   

* 세션에 저장된 값이 있을 때만 model에 userName 으로 등록합니다.      
* 세션에 저장된 값이 없으면 model엔 아무런 값이 없는 상태이니 로그인 버튼이 보이게 된다.
