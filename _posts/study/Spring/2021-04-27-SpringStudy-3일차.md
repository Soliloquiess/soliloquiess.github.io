---
title: "[Spring] spring 스터디 3일차 자료"
layout: post
subtitle: Spring
date: '2021-04-27-23:45:51 +0900'

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


DTO = 데이터 주고 받을 때 새로 클래스를 만들어서 사용하자.
기존에 있는 클래스를 사요하지 말자는 뜻.


Crud 할 때 클래스를 다른사람이 건드리거나 변경하면? -> DB를 건드리게 되 변경될 가능성이 커진다.

정보를 물고 다니는 걸 따로 만들 필요성이 부각.
그럴떄 필요한게 DTO.


그럴 때를 대비해서 완충제로 사용하는 것이 DTO.

jpa는 하이버네이트 고유의 어노테이션
jpa 어노테이션

거기서 상속으로 baseentity 만들라고사용되고

mappedsuperclass로 부모클래스로만 사용되고 실제 엔티티로 사용되는게 아니다라는 뜻

Auditing이 감시라는 거라는데
업데이트 되는 시간 이런걸.
시간을 기록할 수 있게 됨

마이바티스를 쓰면
개체로 전달. 내용을 뽑아서 sql로 만들고 끝
디비에서 조회하면 sql 조회되고 그걸 개체화 되서 전달

jpa는 mybatis가 전달하는게 같지 않음.
persistence context가 보관하고

DTO
- 데이터 전송 객체
계층간(Layer) 데이터 교환을 위해 사용.
로직을 가지지 않은 순수한 데이터 객치에며 getter/setter 메서드만 가진다.


VO
- 값 객체
값 그 자체를 표현하는 객체
서로다른 이름을 가진 VO의 인스턴스가 모든 속성값이 같다면 같은 객체.

vo(value object):값을 저장하기 위한 용도.테이블 안의 레코드 한 건의 값을 저장하기 위한 목적

DTO를 VO처럼 불변객체로 사용하면 얻을 수 있는 이점?
- DTO가 전송하고자하는 데이터가 전송 과정 중 변조되지 않음을 보장할 수 있다.


###### 참고) Entity 클래스와 DTO 클래스를 분리하는 이유


View Layer와 DB Layer의 역할을 철저하게 분리하기 위해서
테이블과 매핑되는 Entity 클래스가 변경되면 여러 클래스에 영향을 끼치게 되는 반면 View와 통신하는 DTO 클래스(Request / Response 클래스)는 자주 변경되므로 분리해야 한다.


Domain Model을 아무리 잘 설계했다고 해도 각 View 내에서 Domain Model의 getter만을 이용해서 원하는 정보를 표시하기가 어려운 경우가 종종 있다.

이런 경우 Domain Model 내에 Presentation을 위한 필드나 로직을 추가하게 되는데, 이러한 방식이 모델링의 순수성을 깨고 Domain Model 객체를 망가뜨리게 된다.


또한 Domain Model을 복잡하게 조합한 형태의 Presentation 요구사항들이 있기 때문에 Domain Model을 직접 사용하는 것은 어렵다.
즉 DTO는 Domain Model을 복사한 형태로, 다양한 Presentation Logic을 추가한 정도로 사용하며 Domain Model 객체는 Persistent만을 위해서 사용한다.


---



- 자바로 DB를 사용하도록 도와주는 녀석이 JPA 라고 말씀드렸습니다.
- 그럼 DB를 이용하는데 핵심이었던 "테이블"과 "SQL"과 동일한 개념의 자바 용어가 있겠죠?
- "테이블"은 Domain, "SQL"은 Repository 입니다.

![20210429_015628](/assets/20210429_015628.png)




```
@EnableJpaAuditing
@SpringBootApplication
public class Week02Application {

    public static void main(String[] args) {
        SpringApplication.run(Week02Application.class, args);
    }

    // Week02Application.java 의 main 함수 아래에 붙여주세요.
    @Bean
    public CommandLineRunner demo(CourseRepository repository) {
        return (args) -> {
            Course course1 = new Course("Spring","yacho");
            repository.save(course1);

            List<Course> courseList = repository.findAll();

            for (int i = 0; i < courseList.size(); i++) {
                System.out.println(courseList.get(i));
            }
        };
    }
}

```

자바값만 썻는데 코드를 보여준다.

이건 주소값 보여준거.
![20210429_021518](/assets/20210429_021518.png)


update, delete 로 넘어가기 전에, 다루어야 하는 개념이 바로 Service 입니다.

- 스프링의 구조는 3가지 영역으로 나눌 수 있습니다.
    1. Controller : 가장 바깥 부분, 요청/응답을 처리함.

        → 2주차 후반부에 배울 녀석

    2. Service : 중간 부분, 실제 중요한 작동이 많이 일어나는 부분

        → 지금 배울 녀석

    3. Repo : 가장 안쪽 부분, DB와 맞닿아 있음.

        → 여태 배운 녀석 (Repository, Entity)

- Update 는 Service 부분에 작성합니다.


리포지토리는 가장 안이라 디비와 닿아있음
컨트롤러는 요청이 들어오면 받아주는 자동응답기

그사이에 디비 꺼내오는 연결고리가 서비스가
업데이트는 밖에서요청이 들어오는데 이떄 서비스 활용.
업데이트는 서비스에 작성



```java
@Service // 스프링에게 이 클래스는 서비스임을 명시
public class CourseService {

		// final: 서비스에게 꼭 필요한 녀석임을 명시
    private final CourseRepository courseRepository;

		// 생성자를 통해, Service 클래스를 만들 때 꼭 Repository를 넣어주도록
		// 스프링에게 알려줌
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Transactional // SQL 쿼리가 일어나야 함을 스프링에게 알려줌
    public Long update(Long id, Course course) {
        Course course1 = courseRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
        );
        course1.update(course);
        return course1.getId();
    }
}
```

이런식으로 코스를 바로 넣고 넘겨주고 하면(전달용도로) 사용하는 건 안좋다. 왜? 테이블을 막 건드리면 다른사람이 실수로 변경하면 오류가 날 확률이 매우 커진다.

디비를 물고 다닐 녀석을 따로 만드는데 이게 DTO.



--------------

Spring MVC

- Model
  - 어플리케이션 상태의 캡슐화
  - 상태 쿼리에 대한 응답.
  - 어플리케이션의 기능 표현
  - 변경을 view에 통지

- View
  - 모델을 화면에 시각적으로 표현
  - 모델에게 업데이트 요청
  - 사용자의 입력을 컨트롤러에 전달.
  - 컨트롤러가 view를 선택하도록 허용.

- controller
  - 어플리케이션의 행위 정의
  - 사용자 액션을 모델 업데이트와 매핑
  - 응답에 대한 뷰 선택


### MVC 패턴
- 어플리케이션의 확장을 위해 모델, 뷰, 컨트롤러 3가지 영역 분리
- 컴포넌트 변경이 다른 영역 컴포넌트에 영향 미치지 않음
- 컴포넌트 간 결합성이 낮아 프로그램 수정에 용이(확장성 뛰어남)

- 장점
 - 화면과 비즈니스 로직 분리해 작업 가능
 - 영역별 개발로 확장성 뛰어남
 - 표준화된 코드 사용으로 공동작업이 용이하고 유지보수성이 뛰어남

- 단점
  - 개발 과정이 복잡해 초기 개발속도가 늦음
  - 초보자가 이해하고 개발하기에 다소 어려움.

![20210427_103151](/assets/20210427_103151.png)

------


### Sprnig MVC 구성요소

- DispatcherServlet(Front Controller)
  - 모든 클라이언트의 요청을 전달받음
  - 컨트롤러에게 클라이언트 요청을 전달하고 클라이언트의 요청을 전달하고, 컨트롤러가 리턴한 결과값을 뷰에게 전달하여 알맞은 응답을 생성.

- HandlerMapping
  - 클라이언트의 요청 URL을 어떤 컨트롤러가 처리할 지를 결정
  - URL 과 요청정보를 기준으로 어떤 핸들러 객체를 사용할 지 정하는 객체이며, DispatcherServlet은 하나 이상의 핸들러 매핑을 가질 수 있음.

- Controller
  - 클라이언트의 요청을 처리한 뒤, 모델을 호출하고 그 결과를 Dispatcher에 알려준다.

- ModelAndView
  - 컨트롤러가 처리한 데이터 및 화면에 대한 정보를 보유한 객체
- viewResolver
  - 컨트롤러가 리턴한 뷰 이름을 기반으로 컨트롤러의 처리결과를 보여줄 view를 결정

- VIEW
  - controller 의 처리



-------------
