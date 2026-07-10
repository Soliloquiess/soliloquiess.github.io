---
title: "[Springboot] 스프링 부트 입문 — 웹 MVC, 템플릿 엔진, DB 접근 기술 핵심 정리"
date: 2021-06-04
category: "Springboot"
tags: ["Springboot"]
description: "Spring Boot 프로젝트 구조 파악부터 정적 콘텐츠·MVC·API 응답 방식 비교, 회원 관리 예제를 통한 Repository·Service 계층 설계, JUnit 테스트 케이스 작성까지 단계적으로 정리한 입문 학습 노트."
permalink: "study/2021/06/04/스프링-입문"
---

![20210604_033321](/assets/20210604_033321.png)

기본 내용은 그대로 진행하되, Settings → Build Tools에서 **Gradle** 빌드를 **IntelliJ** 빌드로 변경한다.

![20210604_034116](/assets/20210604_034116.png)

프로젝트 구조는 크게 두 가지로 나뉜다.

- **java** 폴더: 모든 자바 소스 파일
- **resources** 폴더: 자바 파일을 제외한 나머지 파일(HTML, 설정 등)

웹 애플리케이션에서 첫 번째 진입점은 **컨트롤러**다.

---

## 웹 응답의 세 가지 방식

### 1. 템플릿 엔진(Thymeleaf) — Hello 예제

컨트롤러에 다음과 같이 작성한다.

```java
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping("hello")   // 웹 애플리케이션에서 /hello 로 들어오면 이 메서드를 호출한다.
    public String hello(Model model){
        model.addAttribute("data","hello"); // 모델 전달 (여기서 모델은 MVC의 Model)
        return "hello";
    }
}
```

타임리프 템플릿에서 모델 데이터를 받아 출력한다.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<!--이 줄을 넣어주면 타임리프를 사용할 수 있다.-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <p th:text="'hi'+${data}"> 안녕하세요 . 손님</p>
</body>
</html>
```

![20210604_152013](/assets/20210604_152013.png)

요청 흐름을 정리하면 다음과 같다.

1. 웹 브라우저에서 `localhost:8080/hello` 요청
2. **내장 톰캣**이 요청을 받아 스프링에 전달
3. `@GetMapping("hello")` 가 매핑된 컨트롤러 메서드 호출
4. `model.addAttribute("data", "hello")` 로 데이터 세팅
5. 반환값 `"hello"` → `viewResolver`가 `resources/templates/hello.html` 탐색
6. **타임리프** 템플릿 엔진이 렌더링 후 HTML을 클라이언트에 전달

> `data`는 키값이며, 타임리프는 `${data}`로 모델에서 꺼내 치환한다.

---

### 정적 콘텐츠

- 서버에서 처리 없이 파일을 **그대로** 내려준다.

### MVC와 템플릿 엔진

- JSP, PHP처럼 서버에서 HTML을 **동적으로** 변환해서 내려준다.

### API

- 안드로이드·iOS 클라이언트나 서버 간 통신 시, **JSON** 포맷으로 데이터를 내려준다.

> 스프링 부트는 정적 콘텐츠를 자동으로 제공한다.

---

![20210604_222004](/assets/20210604_222004.png)

`hello-static.html` 요청이 들어오면 스프링은 **먼저 컨트롤러에서 매핑을 탐색**하고, 없을 경우 `resources/static/hello-static.html` 을 찾아 반환한다. 컨트롤러가 정적 파일보다 우선순위가 높다.

---

## MVC 와 템플릿 엔진 상세

**MVC**: Model, View, Controller

과거 Model 1 방식(View에 모든 로직)에서 **Model 2** → 현재 MVC 방식으로 발전했다.

| 레이어 | 역할 |
|--------|------|
| **View** | 화면 렌더링에 집중 |
| **Controller** | 요청 수신·흐름 제어 |
| **Model** | 비즈니스 데이터 전달 |

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam("name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";    // hello-template.html 로 이동
}
```

```java
@GetMapping("hello-mvc")
  public String helloMvc(@RequestParam("name") String name, Model model) {

      model.addAttribute("name", name);
      return "hello-template";    // hello-template.html 로 이동
  }
```

`@RequestParam`의 `required` 옵션은 기본값이 `true`다. (`@RequestParam(value = "name", required = true)`)

![20210604_225857](/assets/20210604_225857.png)

GET 방식으로 실행해 보면 파라미터가 넘어온 것을 확인할 수 있다.

![20210604_225958](/assets/20210604_225958.png)

모델 값이 치환되어 표시된다.

![20210604_230027](/assets/20210604_230027.png)

MVC 요청 흐름:

1. 웹 브라우저 → 톰캣 → `hello-mvc` 컨트롤러 호출
2. 스프링이 메서드 호출 후 모델에 값("spring") 세팅
3. `viewResolver`에 전달 → 템플릿 탐색
4. 타임리프가 **렌더링(변환) 후** HTML을 브라우저에 전달 (정적일 때와 달리 변환 과정이 있음)

---

## API 방식

실질적으로 MVC(템플릿 엔진) 방식과 **API 방식** 두 가지로 구분된다.

### 문자열 직접 반환

```java
@GetMapping("hello-string")
@ResponseBody   // 반드시 넣어야 한다.
public String helloString(@RequestParam("name") String name) {
    return "hello " + name;
}
```

`@ResponseBody`는 HTTP 응답의 **Body에 직접 문자를 넣겠다**는 의미다.

![20210604_234258](/assets/20210604_234258.png)

소스 보기로 확인하면 HTML 태그 하나 없이 문자열 그대로 출력된다. 템플릿 엔진은 뷰 템플릿을 거치지만, 이 방식은 값을 그대로 내려준다.

### 객체(JSON) 반환

```java
@GetMapping("hello-api")
@ResponseBody
public Hello helloApi(@RequestParam("name") String name) {
Hello hello = new Hello();
hello.setName(name);
return hello;
}
static class Hello {
private String name;
public String getName() {
return name;
}
public void setName(String name) {
this.name = name;
}
}
```

![20210605_002630](/assets/20210605_002630.png)

처음으로 **객체**를 반환했다.

![20210605_004053](/assets/20210605_004053.png)

JSON 형태(`key: value`)로 응답이 나온다. 과거에는 XML을 많이 사용했으나, 현재는 **JSON**이 표준이다.

Java에서는 **Getter/Setter** 를 통해 필드에 접근한다.

![20210605_011947](/assets/20210605_011947.png)

`@ResponseBody` 동작 원리:

| 반환 타입 | 처리 방식 |
|-----------|-----------|
| 문자(String) | `StringHttpMessageConverter` |
| 객체(Object) | `MappingJackson2HttpMessageConverter` (JSON 변환) |
| 기타 | 등록된 HttpMessageConverter 자동 선택 |

- `viewResolver` 대신 **HttpMessageConverter**가 동작
- 객체를 JSON으로 변환하는 대표 라이브러리: **Jackson**(스프링 기본값), Gson

### 세 가지 방식 정리

| 방식 | 설명 |
|------|------|
| **정적 콘텐츠** | 파일을 그대로 내려줌 |
| **MVC + 템플릿 엔진** | 서버에서 렌더링된 HTML을 클라이언트에 전달 |
| **API** | 객체를 JSON으로 변환해 반환, 뷰 없음 |

---

## 백엔드 개발 — 회원 관리 예제

### 비즈니스 요구사항

- **데이터**: 회원 ID, 이름
- **기능**: 회원 등록, 조회
- 데이터 저장소 미선정(가상 시나리오)

일반적인 웹 애플리케이션은 **컨트롤러 → 서비스 → 리포지토리 → 도메인 → DB** 구조로 구성된다.

![20210605_013900](/assets/20210605_013900.png)

| 레이어 | 역할 |
|--------|------|
| **컨트롤러** | 웹 MVC의 컨트롤러 역할 |
| **서비스** | 핵심 비즈니스 로직 구현 |
| **리포지토리** | 데이터베이스 접근, 도메인 객체 저장·관리 |
| **도메인** | 비즈니스 도메인 객체(회원, 주문, 쿠폰 등), DB에 저장·관리 |

설계 방침:
- 저장소가 미정이므로 **인터페이스**로 구현 클래스를 교체할 수 있도록 설계
- 초기에는 **메모리 기반** 저장소 사용(RDB, NoSQL 중 미결정)

> `Optional`은 Java 8에 추가된 기능으로, null을 안전하게 다루기 위해 사용한다.

```java
package hello.hellospring.repository;

import hello.hellospring.domain.Member;

import java.util.*;


/**
 * 동시성 문제가 고려되어 있지 않음, 실무에서는 ConcurrentHashMap, AtomicLong 사용 고려
 */


public class MemoryMemberRepository implements  MemberRepository{

    private  static Map<Long, Member> store = new HashMap<>();
    private  static long sequence = 0L;
    //시퀀스는 0,1,2 이렇게만들어 주는거.


    @Override
    public Member save(Member member) {
        member.setId(++sequence);
        store.put(member.getId(), member);  //map 에저장
        return member;  //결과 반환
    }

    @Override
    public Optional<Member> findById(Long id) { //스토어에서 꺼내면 됨.
        //파라미터로 넘어온게 같으닞 확인 같은 경우에만 반환
        return Optional.ofNullable(store.get(id));  //이 결과가 없으면 Null이거나
        //널이 반환될 가능성이 있으면 ofNullable 로 감싸면 널이여도 반환됨. 그럼클라이언트에서 뭘 할수 있다.
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                .filter(member -> member.getName().equals(name))//파라미터로 넘어온게 같은지 확인
                .findAny(); //찾으면 반환함. 루프 다 돌면서 하나 찾으면 그거 반환 없으면 옵셔널에 널 포함되서 반환


    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>();//values가 반환(멤버들)
    }

    public void clearStore(){
        store.clear();  //메모리 클리어
    }
}

```

---

### 회원 리포지토리 테스트 케이스 작성

개발한 기능을 main 메서드나 컨트롤러로 테스트하면 준비와 반복 실행이 어렵다는 단점이 있다.

> **Java는 JUnit 프레임워크**로 테스트를 실행해 이 문제를 해결한다.

테스트 케이스는 `main`이 아닌 `test` 폴더에서 실행한다.

![20210605_022937](/assets/20210605_022937.png)

결과를 글자로 비교하려면 `Assertions`(JUnit 제공)를 활용한다.

`Assertions.assertEquals(member,result)` 처럼 비교할 수 있고,
`Assertions.assertThat(member).isEqualTo(result)` 방식도 많이 사용한다.

![20210605_025806](/assets/20210605_025806.png)

`Assertions`는 static import로 간소화할 수 있다. (Alt+Enter → Add static import)

테스트 케이스의 장점은 **여러 테스트를 한 번에 실행**할 수 있다는 점이다.

![20210605_032508](/assets/20210605_032508.png)

테스트 실행 순서는 보장되지 않아, 앞 테스트에서 저장된 데이터가 남아 다음 테스트가 실패할 수 있다. 각 테스트 종료 후 저장소를 초기화해야 한다.

**해결**: `@AfterEach` 콜백으로 각 테스트 종료 시 데이터 클리어

![20210605_033428](/assets/20210605_033428.png)

리포지토리에 `clearStore()` 추가:

```java
public void clearStore(){
       store.clear();  //메모리 클리어
   }
```

테스트 클래스에 `@AfterEach` 추가:

```java
@AfterEach
   public void afterEach(){
       repository.clearStore();
   }
```

전체 테스트 클래스:

```java

package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;
import java.util.List;




public class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach  //메서드가 끝날때마다 실행(콜백메서드라 생각하면 됨)
    public void afterEach(){
        repository.clearStore();
    }

    @Test
    public void save(){
        Member member = new Member();
        member.setName("spring");

        repository.save(member);
//        repository.findById(member.getId()).get();

        Member result = repository.findById(member.getId()).get();
        System.out.println("result = " + (result==member));
//      Assertions.assertEquals(member,result);이런 식으로 비교 가능
//        Assertions.assertEquals(member, result); 이렇게도 쓸 수 있고
        assertThat(member).isEqualTo(result); //이렇게도 쓸 수 있다.
        //메모리 저장한게 디비에서 꺼낸거랑 같으면 참
        //assert해서 멤버가 같으면
        //Assertions는 static이라 없애기 가능
//        assertThat(member).isEqualTo(result);
        //이렇게 바로 assertThat을 쓰기 가능하다.
    }


    @Test
    public void findByName() {
    //given
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);
        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);
    //when
        Member result = repository.findByName("spring1").get();
    //then
        assertThat(result).isEqualTo(member1);
    }


    @Test
    public void findAll() {
    //given
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);
    //when
        List<Member> result = repository.findAll();
    //then
        assertThat(result.size()).isEqualTo(2);
    }


}


```

> **`@AfterEach`**: 한 번에 여러 테스트를 실행하면 메모리 DB에 직전 테스트 결과가 남을 수 있다. `@AfterEach`를 사용하면 각 테스트 종료 시마다 이 기능이 실행된다. 테스트는 각각 독립적으로 실행되어야 하며, 테스트 순서에 의존관계가 있는 것은 좋은 테스트가 아니다.

**TDD(테스트 주도 개발)**: 테스트 먼저 만들고 구현 클래스를 작성하는 방식이다. 이 예제는 구현 클래스를 먼저 만들었으므로 TDD는 아니다.

> `gradlew` 빌드 시 모든 테스트가 자동으로 실행된다. 테스트 코드는 규모가 커질수록 필수불가결하며, 반드시 깊이 공부해야 한다.

---

### 회원 서비스 테스트

| 단축키 | 기능 |
|--------|------|
| `Ctrl + Shift + T` | 테스트 케이스 자동 생성 |
| `Alt + Enter` | static import 추가 |
| `Ctrl + Alt + V` | 리턴문 자동 생성 |

기존 회원 서비스는 `MemoryMemberRepository`를 **직접 생성**했다.

    public class MemberService {
    	 private final MemberRepository memberRepository =
    	 new MemoryMemberRepository();
    }

리포지토리를 외부에서 주입받도록 변경하면 **DI(Dependency Injection, 의존성 주입)** 가 가능해진다.

    public class MemberService {
        private final MemberRepository memberRepository;
        public MemberService(MemberRepository memberRepository) {
            this.memberRepository = memberRepository;
        }
     ...
    }

![20210605_130743](/assets/20210605_130743.png)

`Ctrl + Shift + T`로 테스트 유닛을 자동 생성한다.

`MemoryMemberRepository`를 만들어 `MemberService`에 외부에서 주입한다. 직접 `new`하지 않고 외부 리포지토리를 넣어주는 것이 **DI(Dependency Injection)**다.

```java
@Test
  public void 중복_회원_예외() {
      //given
      Member member1 = new Member();
      member1.setName("spring");

      Member member2 = new Member();
      member2.setName("spring");

```

`setName`이 같아야 중복 예외가 발생한다.

전체 서비스 테스트:

```java
package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemoryMemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach() {  //동작하기 전에 넣어줌.
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach() {
        memberRepository.clearStore();
    }

    @Test
    void join() {
        //given
        Member member = new Member();
        member.setName("spring");

        //when
        Long saveId = memberService.join(member);

        //then
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }

    @Test
    public void 중복_회원_예외() {
        //given
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");

        //when
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다");

        /*
        try {
            memberService.join(member2);
            fail();
        } catch (IllegalStateException e) {
            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
        }
        */

    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}

```

> **`@BeforeEach`**: 각 테스트 실행 전에 호출된다. 테스트가 서로 영향을 미치지 않도록 항상 새로운 객체를 생성하고, 의존관계도 새로 맺어준다.
