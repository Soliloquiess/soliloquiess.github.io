---
title: "[Spring] Week01 — RestController로 JSON 응답 구현과 Gradle 의존성 관리"
date: 2021-04-28
category: "Spring"
tags: ["Spring"]
description: "스프링 서버에서 JSON 데이터를 브라우저에 바로 내려주는 @RestController 사용법과, Gradle을 통한 외부 라이브러리 의존성 추가 방법을 실습한다."
permalink: "study/2021/04/28/week01"
---

## 브라우저에 JSON으로 바로 응답하기

데이터를 서버에서 전달받는 형식을 **JSON(JavaScript Object Notation)**이라고 한다.

스프링 서버를 띄워서 클래스 정보를 JSON으로 브라우저에 나타내보자.

**JSONView 설치**

```html
https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en
```

---

### @RestController란?

데이터로 응답하려면 **`@RestController`** 를 사용해야 한다.

| 애너테이션 | 설명 |
|---|---|
| `@Controller` | HTML, CSS 등 View를 반환하는 일반 컨트롤러 |
| `@RestController` | **JSON 형식**의 데이터만 반환하는 컨트롤러 |

- **Rest**: 서버의 응답이 JSON 형식임을 나타낸다. HTML, CSS 등을 주고받을 때는 붙이지 않는다.
- **Controller**: 클라이언트의 요청(Request)을 전달받는 자동 응답기.

### @RestController 만들기

1. `src > main > com.sparta.week01`에 `controller` 패키지를 만든다.
2. `CourseController.java` 파일을 만든다.
3. 아래 코드를 작성한다.

```java
@RestController
public class CourseController {

    @GetMapping("/courses")
    public Course getCourses() {
        Course course = new Course();
        course.setTitle("test");
        course.setDays(28);
        course.setTutor("ㅇㅇㅇ");
        return course;
    }
}
```

### 코드 이해

- **`@GetMapping("/courses")`**: 브라우저에서 주소를 치는 행위는 GET 방식 요청이다. 스프링 주소(`http://localhost:8080`) 뒤의 경로가 `/courses`일 경우 `getCourses()` 메서드를 실행한다.

---

## Gradle이란?

### 개발자는 얼마나 남의 코드에 의존할까?

```html
http://www.bloter.net/archives/253447
```

다른 사람들이 만들어둔 도구를 내려받아 활용하는 것은 개발의 기본이다.

| 언어 | 패키지 관리 도구 |
|---|---|
| JavaScript | **NPM** |
| Python | **pip** |
| Java | **mavenCentral**, jcenter |

**Gradle**은 이 다운로드·적용 과정을 더 편리하게 해주는 **빌드 자동화 도구**다.

### Gradle로 라이브러리 추가하기

1. Maven Repository에서 원하는 라이브러리를 찾는다.
2. `build.gradle`의 `dependencies` 블록에 원하는 항목을 넣는다.
3. `dependencies` 옆 **Run 버튼**을 누른다.

   ![20210414_234428](/assets/20210414_234428.png)

4. 우측 **Gradle 탭의 새로고침 버튼**을 누른다.
5. 대상 프로젝트가 추가된 것을 확인한다.
