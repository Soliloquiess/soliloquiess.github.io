---
title: "[Spring] Week02 — JPA·Repository·REST API 기초"
date: 2021-04-29
category: "Spring"
tags: ["Spring"]
description: "JPA로 Java와 SQL을 연결하는 방법, Domain/Repository/Service 3계층 구조, DTO를 통한 안전한 데이터 전송, REST API 설계 원칙을 실습 코드와 함께 정리한다."
permalink: "study/2021/04/29/week02"
---

## JPA와 Repository

**RDBMS**(관계형 데이터베이스 관리 시스템), 줄여서 **RDB**는 테이블 형태로 데이터를 관리하는 데이터베이스다.

| 개념 | 설명 |
|------|------|
| **RDB** | 관계형 데이터베이스 |
| **H2** | RDBMS의 일종. 서버가 켜져 있는 동안에만 작동하는 인메모리 DB |
| **SQL** | 데이터를 읽고, 저장하고, 변경하고, 삭제하는 구체적인 문법 |

스프링은 자바로 작동하고, 데이터베이스는 SQL로 작동한다. 서로 다른 언어 사이의 번역기가 바로 **JPA**다.

- **JPA(Spring Data JPA)** — Java 코드를 SQL로 번역해주며, 기본적인 CRUD 기능이 거의 완벽하게 내장되어 있다.
- **Repository** — JPA를 작동시키는 매개체.

이번 주에는 JPA 기반의 API 설계 전체 흐름을 배운다.

- API 요청 방식 — 생성·조회·수정·삭제 각각에 맞는 HTTP 메서드
- 스프링이 강제하는 데이터 송수신 규칙
- 현업에서 필수인 **DTO(Data Transfer Object)** 활용 이유와 방법

---

### JPA 소개

**JPA란?**
SQL을 직접 작성하지 않고도 데이터를 생성·조회·수정·삭제할 수 있도록 해주는 번역기다.

> JPA 없이 개발하면 자바 코드 중간에 SQL을 끼워 넣어야 하는 번거로움이 생긴다.

**JPA 의존성 설정** (한 줄이면 끝)

```sql
        implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

---

### Domain과 Repository

| DB 개념 | Java 개념 |
|---------|-----------|
| 테이블 | **Domain** (Entity 클래스) |
| SQL | **Repository** (인터페이스) |

**도입 순서**

1. `src > main > java > com.sparta.week02`에 `domain` 패키지를 만든다.
2. `Course.java`, `CourseRepository.java` 파일을 만든다.
3. **Course.java 클래스**

   ```java
   @NoArgsConstructor // 기본생성자를 대신 생성해줍니다.
   @Entity // 테이블임을 나타냅니다.
   public class Course {

       @Id // ID 값, Primary Key로 사용하겠다는 뜻입니다.
       @GeneratedValue(strategy = GenerationType.AUTO) // 자동 증가 명령입니다.
       private Long id;

       @Column(nullable = false) // 컬럼 값이고 반드시 값이 존재해야 함을 나타냅니다.
       private String title;

       @Column(nullable = false)
       private String tutor;

       public String getTitle() {
           return this.title;
       }

       public String getTutor() {
           return this.tutor;
       }

       public Course(String title, String tutor) {
           this.title = title;
           this.tutor = tutor;
       }
   }
   ```

4. **CourseRepository.java 인터페이스**

   ```java
   public interface CourseRepository extends JpaRepository<Course, Long> {
   }
   ```

> **Interface란?** 클래스에서 멤버가 빠진 메소드 모음집. JPA는 Repository 인터페이스를 통해서만 사용할 수 있다.

---

### SQL 로그 출력 설정

**application.properties** 한 줄 추가

```java
spring.jpa.show-sql=true
```

### JPA 실행 코드

```java
// Week02Application.java 의 main 함수 아래에 붙여주세요.
@Bean
public CommandLineRunner demo(CourseRepository repository) {
    return (args) -> {

    };
}
```

웹 콘솔에서 결과 확인:

```java
SELECT * FROM course;
```

> `@Bean`, 익명 함수 등 낯선 개념이 등장하지만, 이 코드는 이번 실습에서만 사용한다. 스프링의 방대한 내용을 모두 이해하고 넘어가려 하면 지쳐버린다. 지금 단계에서 필요한 것에만 집중하자.

---

### 상속과 Timestamped

**`extends` 키워드** — "이미 만들어둔 것을 가져다 쓰겠다"는 클래스 상속 선언이다.

```java
class Person {
	private String name;
	private String getName() {
		return this.name;
	}
}

class Tutor extends Person {
	private String address;
	// Person 클래스를 상속했기 때문에,
	// name 멤버변수와 getName() 메소드를 가지고 있습니다.
}

```

DB 설계의 기본은 **생성일자**와 **수정일자** 필드를 갖는 것이다. 이를 상속으로 깔끔하게 처리한다.

**Timestamped.java**

```java
@MappedSuperclass // 상속했을 때, 컬럼으로 인식하게 합니다.
@EntityListeners(AuditingEntityListener.class) // 생성/수정 시간을 자동으로 반영하도록 설정
public class Timestamped {

    @CreatedDate // 생성일자임을 나타냅니다.
    private LocalDateTime createdAt;

    @LastModifiedDate // 마지막 수정일자임을 나타냅니다.
    private LocalDateTime modifiedAt;
}
```

Course 클래스에 상속 추가:

```java
class Course extends Timestamped {
```

Week02Application 클래스에 JPA Auditing 활성화:

```java
@EnableJpaAuditing
@SpringBootApplication
public class Week02Application {
```

---

## JPA 심화 — CRUD와 서비스 계층

**CRUD** — 정보 관리의 4가지 기본 기능

| 기호 | 의미 | HTTP 메서드 |
|------|------|-------------|
| **C** | Create (생성) | POST |
| **R** | Read (조회) | GET |
| **U** | Update (변경) | PUT |
| **D** | Delete (삭제) | DELETE |

> IntelliJ에서 `Ctrl + Alt + L`을 누르면 코드 자동 정렬이 된다.

Update·Delete로 넘어가기 전에 먼저 **Service** 개념을 짚어야 한다.

### 스프링 3계층 구조

| 계층 | 역할 | 해당 클래스 |
|------|------|-------------|
| **Controller** | 가장 바깥, 요청/응답 처리 | `@Controller`, `@RestController` |
| **Service** | 중간, 실제 비즈니스 로직 수행 | `@Service` |
| **Repository** | 가장 안쪽, DB와 직접 맞닿음 | `JpaRepository` 상속 인터페이스 |

- `Update`는 **Service** 계층에 작성한다.

---

### Lombok

**Lombok**은 자바 프로젝트에 거의 필수인 라이브러리로, 반복적인 메서드·생성자를 어노테이션 한 줄로 자동 생성해 코드량을 크게 줄여준다.

- `Course.java` — `@Getter`, `@NoArgsConstructor` 적용
- `CourseService.java` — `@RequiredArgsConstructor` 적용

---

### DTO (Data Transfer Object)

> 테이블(Entity)을 직접 read/update에 사용하면, 다른 사람이 클래스를 변경했을 때 예상치 못한 부작용이 생길 수 있다.

이 위험을 막는 완충재가 바로 **DTO**다. 데이터 전송 전용 객체를 별도로 만들어 Entity와 분리한다.

---

## REST API 설계

### API란?

**API** — 클라이언트와 서버 간의 약속.
클라이언트가 정한 대로 서버에 **요청(Request)**을 보내면, 서버가 처리 후 **응답(Response)**을 반환한다.

### REST란?

**REST** — 주소에 **명사**, 요청 방식에 **동사**를 사용해 의도를 명확히 드러내는 설계 원칙.

여기서 동사는 CRUD에 대응하는 HTTP 메서드다.

| HTTP 메서드 | CRUD 의미 | 예시 URL | 의미 |
|-------------|-----------|----------|------|
| **GET** | Read (조회) | `GET /courses` | 강의 전체 목록 조회 |
| **GET** | Read (단건) | `GET /courses/1` | ID 1번 강의 조회 |
| **POST** | Create (생성) | `POST /courses` | 강의 생성 요청 |
| **PUT** | Update (수정) | `PUT /courses/3` | ID 3번 강의 수정 |
| **DELETE** | Delete (삭제) | `DELETE /courses/2` | ID 2번 강의 삭제 |

**주의사항**

- URL에 들어가는 명사는 **복수형** 사용 (`/courses`, `/users`)
- URL에 동사는 가급적 사용하지 않는다 (X: `/accounts/edit`)

---

`POST`는 생성 요청이다.
