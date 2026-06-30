---
title: "[Spring] Lombok과 JPA — 어노테이션 기반 생산성 향상"
date: 2021-03-26
category: "Spring"
tags: ["Spring"]
description: "Lombok으로 반복 코드(getter/setter/생성자)를 어노테이션 하나로 제거하고, JPA와 MySQL Workbench를 연동해 CRUD 및 엔티티 연관관계까지 실습한 학습 기록."
permalink: "study/2021/03/26/Spring,Spring-boot"
---

## Lombok이란

![Lombok 소개 화면 1](/assets/20210327_013619.png)

![Lombok 소개 화면 2](/assets/20210327_013746.png)

자바 코딩할 때 변수 선언마다 생성자, getter/setter를 일일이 작성해야 했는데, IntelliJ도 생성자 자동 생성을 지원하지 않는 경우가 있다. **Lombok**은 어노테이션 하나로 이 모든 것을 해결해준다.

![Lombok 어노테이션 적용 결과](/assets/20210327_013759.png)

`@Data` 어노테이션을 붙여주면 기본 생성자부터 getter/setter 메서드까지 한 번에 자동 생성된다.

아래처럼 생성자를 오버로딩하던 방식은 생산성이 낮다.

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

---

### Lombok 설치

File → Plugins에서 **Lombok**을 검색해 설치한다.

![Lombok 플러그인 검색 화면](/assets/20210327_014628.png)

![Lombok 플러그인 설치 완료](/assets/20210327_014904.png)

> 팁: 하단 **Structure** 탭을 클릭하면 현재 클래스의 구성 요소를 한눈에 볼 수 있다.

기존에 직접 작성한 코드는 모두 지우자.

![기존 코드 삭제 후 상태](/assets/20210327_015036.png)

플러그인만 설치하고 어노테이션을 쓰려 하면 오류가 발생한다. **Gradle에 라이브러리를 추가**하지 않았기 때문이다.

![Gradle 의존성 추가 전 오류](/assets/20210327_015302.png)

최신 버전 기준으로 아래와 같이 `build.gradle`에 추가한다.

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

![Lombok @Data 적용 후 게터/세터 자동 생성](/assets/20210327_022630.png)

`@Data`를 추가하면 Lombok이 임포트되면서 getter/setter와 생성자가 자동으로 생성된다.

> IntelliJ Settings → Build, Execution, Deployment → Compiler → Annotation Processors에서 **Enable annotation processing**을 체크해야 정상 실행된다.

![Annotation Processing 활성화](/assets/20210327_022915.png)

---

## JPA

**JPA(Java Persistence API)**는 ORM(Object Relational Mapping) 기반으로, RDB 데이터를 객체지향으로 손쉽게 다룰 수 있게 해주는 도구다.

| 개념 | 설명 |
|---|---|
| **Object** | 자바 객체 |
| **Relation** | 관계형 데이터베이스 |
| **ORM** | 둘 사이를 자동으로 매핑 |

- 쿼리보다 **객체 중심**으로 프로그래밍할 수 있다.
- `JpaRepository`를 상속받으면 기본 CRUD가 자동 제공된다.

---

### MySQL 스키마 및 테이블 생성

![MySQL Workbench 스키마 생성](/assets/20210327_025217.png)

MySQL Workbench에서 스키마를 하나 만든다.

![스키마 생성 시 한글 인코딩 설정](/assets/20210327_025639.png)

생성 시 `utf-8`, `utf-8_bin`으로 한글 인코딩을 설정한다. Apply 전에 Workbench가 자동으로 쿼리문을 생성해주므로 버튼만 누르면 된다.

![테이블 생성 설정](/assets/20210327_031426.png)

테이블을 위와 같이 생성해 두자.

![테이블 생성 확인](/assets/20210327_031509.png)

테이블이 정상 생성된 것을 확인할 수 있다.

---

### Gradle 의존성 추가

```
compile('org.springframework.boot:spring-boot-starter-data-jpa')
compile('mysql:mysql-connector-java')
compile('org.projectlombok:lombok')

```

`build.gradle`에 위 의존성을 추가한다.

![Gradle 의존성 추가 후 임포트](/assets/20210327_031702.png)

이후 `src/main/resources/application.properties`에 DB 연결 설정을 추가한다. 이 파일은 추가한 라이브러리들의 설정을 관리하는 곳이다.

```
# properties
spring.datasource.url=jdbc:mysql://localhost:3306/study?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul

# db response name
spring.datasource.username=root

# db response password
spring.datasource.password=root
```

![JPA + Tomcat 8080 정상 기동](/assets/20210327_033256.png)

JPA와 Tomcat 포트 8080이 제대로 올라왔다면 정상 실행된 것이다.

---

## Entity

네이밍 컨벤션부터 정리하자.

| 케이스 | 사용처 | 예시 |
|---|---|---|
| **Camel Case** | Java 변수 | `phoneNumber`, `createdAt` |
| **Snake Case** | DB 컬럼, API 통신 | `phone_number`, `created_at` |

> **Entity**: JPA에서 테이블을 자동으로 생성해주는 단위. `DB Table == JPA Entity`

![Entity 클래스 구조 설명](/assets/20210327_035106.png)

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

- 클래스 이름과 DB 테이블 이름이 동일하면 `@Table` 어노테이션 생략 가능
- 컬럼 이름이 동일하면 `@Column` 생략 가능

![Entity 어노테이션 구조 캡처](/assets/20210327_042455_p9f4vcckh.png)

---

## Repository

**JpaRepository**를 상속받으면 쿼리 작성 없이 기본 CRUD가 모두 제공된다.

| 메서드 | 동작 |
|---|---|
| `save()` | CREATE / UPDATE |
| `findById()` | READ (SELECT) |
| `delete()` | DELETE |

![JpaRepository 상속 구조](/assets/20210327_042630.png)

---

![main vs test 폴더 구조](/assets/20210327_111228.png)

`main`은 실제 서비스 코드, `test`는 실제 동작에 영향을 주지 않는 테스트 전용 폴더다.

```
package com.example.study.repository;


import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

public class UserRepositoryTest extends StudyApplicationTests {

    @Autowired//DI로 Dependency Inㅓection으로 우선순위 주입을 뜻한다. 직접 객체를 만들지 않고(new) 스프링이 직접 관리하겠다는 뜻.
    private UserRepository userRepository;

    @Test
    public void create(){
        //String sql = insert into user(%s,%s,%d) value (account, email, age);
        User user = new User();//싱글톤으로 User는 매번 다른 값이 들어갈 수 있어 매번 생성하고 사용해야
        user.setAccount("TestUser01");
        user.setEmail("TestUser01@gmail.com");
        user.setPhoneNumber("010-1111-1111");
        user.setCreatedAt(LocalDate.now());
        user.setCreatedBy("admin");
        //데이터 들어갈 타입 맞춰서 컬럼으로 생성

        User  newUser = userRepository.save(user);
        System.out.println("newUser:"+newUser);
    }

    public void read(){

    }
    public void update(){

    }
    public void delete(){

    }
}

```

테스트 실행 전 Settings에서 확인할 사항이 있다.

![Run Test using 설정 변경](/assets/20210327_121252.png)

**Run Tests using** 항목을 **IntelliJ IDEA**로 변경해야 정상 실행된다.

![테스트 실행 결과 — 저장된 값 출력](/assets/20210327_121329.png)

입력한 값이 정상적으로 출력된다. Lombok의 `@Data`가 `toString()`을 자동으로 재정의해주므로 깔끔하게 확인할 수 있다.

![MySQL Workbench에서 데이터 조회](/assets/20210327_121456.png)

Workbench에서 테이블을 조회하면

![DB에 데이터 저장 확인](/assets/20210327_121522.png)

쿼리가 자동 생성되어 데이터가 저장된 것을 확인할 수 있다.

JPA가 실행하는 SQL을 콘솔에서 보려면 `application.properties`에 아래를 추가한다.

```

#이 부분을 추가해주자. jpa가 실행한 옵션에 대해 보겠다는 뜻.

spring.jpa.show-sql=true
```

![Hibernate SQL 로그 출력](/assets/20210327_121927.png)

실행하면 **Hibernate**가 어떤 SQL을 수행했는지 콘솔에 출력된다.

---

### READ

```
@Test
  public void read(){
      Optional<User> user= userRepository.findById(2L);
      //2L는 lonlong이고 옵셔널은 제너릭 타입으로 받게 됨.

      user.ifPresent(selectUser->{       //있을때만 실행에 대한 결과를 받겠다.
          //seleectUser가 있으면 그 값을 꺼내 달라는 뜻.
          System.out.println("user:"+selectUser);
      });
  }
```

read 메서드에 `@Test`를 추가하고, Workbench에서 id=2인 행을 선택한 뒤 테스트를 실행한다.

![READ 테스트 결과 출력](/assets/20210327_125918.png)

정보가 정상적으로 조회된다.

---

### UPDATE

````
@Test
    public void update(){
        Optional<User> user= userRepository.findById(2L);   //2번 셀렉트
        //2L는 lonlong이고 옵셔널은 제너릭 타입으로 받게 됨.

        user.ifPresent(selectUser->{
           selectUser.setAccount("PPPP");
           selectUser.setUpdatedAt(LocalDate.now());
           selectUser.setUpdatedBy("update Method");
           //값은 이거만 바꿨지만  jpa에서는 셀렉트유저값에 들어있는 특정 아이디값을 검색하고 한번더 꺼낸 다음
            //한번 더 업데이트 쳐줌.

           userRepository.save(selectUser);
           //쿼리문 통해 특정 유저 셀렉트 해주고 아이디를 한번 더 셀렉트 값 변경되서 값 찾고 그 값에 대해 업데이트 시킴.
        });
    }
````

![UPDATE 테스트 — 값 변경 확인](/assets/20210327_131149.png)

실행 결과, 값이 정상적으로 변경되었다.

---

### DELETE

````
@Test
   public void delete(){
       Optional<User> user= userRepository.findById(2L);   //2번 셀렉트
       //2L는 lonlong이고 옵셔널은 제너릭 타입으로 받게 됨.

       user.ifPresent(selectUser->{
           userRepository.delete(selectUser);
       });

       //이제 유저가 진짜 삭제 됐는지 확인해보자,(딜리트 된 유저 삭제 되었는지 확인)
       Optional<User> deleteUser = userRepository.findById(2L);
       if(deleteUser.isPresent()){
           System.out.println("데이터 존재: "+ deleteUser.get());
       }else{
           System.out.println("데이터 삭제 데이터 없음. ");

       }
````

![DELETE 테스트 결과 — 콘솔](/assets/20210327_160203.png)

![DELETE 후 Workbench 확인](/assets/20210327_160222.png)

id=2의 PPPP 데이터가 삭제된 것을 확인할 수 있다.

테스트 코드에서는 `Assert`를 활용하는 것이 좋다.

```
@Test
    public void delete(){
        Optional<User> user= userRepository.findById(1L);   //2번 셀렉트
        //2L는 lonlong이고 옵셔널은 제너릭 타입으로 받게 됨.

        Assert.assertTrue(user.isPresent()); // 반드시 값이 있는 값 통과해서

        user.ifPresent(selectUser->{
            userRepository.delete(selectUser);
        });

        //이제 유저가 진짜 삭제 됐는지 확인해보자,(딜리트 된 유저 삭제 되었는지 확인)
        Optional<User> deleteUser = userRepository.findById(1L);

        Assert.assertFalse(deleteUser.isPresent()); //false 그값이 삭제해서 반드시 false가 된다
```

![Assert 기반 DELETE 테스트 통과](/assets/20210327_162221.png)

값이 정상 삭제되었으며 Workbench에서도 id=1 행이 없어진 것을 확인할 수 있다.

- `Assert.assertTrue(user.isPresent())` : 삭제 전 값이 반드시 존재함을 검증
- `Assert.assertFalse(deleteUser.isPresent())` : 삭제 후 값이 반드시 없음을 검증

> `@Transactional`: 마지막 데이터까지 삭제하려 하면 동작하지 않는다. (DB에 데이터가 아예 없으면 의미가 없으므로)

---

## JPA 연관관계

![연관관계 테이블 설계](/assets/20210327_173544.png)

![ERD Reverse Engineering](/assets/20210327_174916.png)

Workbench에서 ERD를 직접 그려보자.

![ERD 작성 — Reverse Engineering 완료](/assets/20210327_174916_1rx1avy1d.png)

![접속 정보 입력](/assets/20210327_175143.png)

정보를 입력하고

![관련 DB 선택](/assets/20210327_175153.png)

![DB 연결 확인](/assets/20210327_175214.png)

관련 DB를 체크하면

![ERD 편집 화면](/assets/20210327_175615.png)

ERD를 그릴 수 있는 창이 열리고 관련 DB가 생성된다.

![관계도 ERD 매핑](/assets/20210327_180656.png)

이 관계도를 ERD로 매핑해보자.

- **실선**: 양쪽 모두 관계를 가지는 경우
- **점선**: 한쪽만 관계를 가지는 경우

![ERD Forward Engineering 시작](/assets/20210327_180905.png)

상단 메뉴 **Database → Forward Engineer**를 클릭한다. Reverse Engineering으로 ERD를 만들었다면, 이번엔 반대로 ERD를 실제 데이터 테이블로 만드는 과정이다.

![Forward Engineering 스키마 선택](/assets/20210327_181250.png)

![Forward Engineering 테이블 옵션](/assets/20210327_181402.png)

![Forward Engineering 실행 결과](/assets/20210327_181659.png)

> Workbench Forward Engineering이 안 될 경우 직접 테이블을 생성한다.

![study 스키마에 3개 테이블 생성 완료](/assets/20210327_191751.png)

`study` 스키마에 3개의 테이블이 생성되면 성공이다.

정 안 되면 아래 SQL을 직접 실행한다.

```
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema study
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema study
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `study` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
USE `study` ;

-- -----------------------------------------------------
-- Table `study`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `study`.`user` ;

CREATE TABLE IF NOT EXISTS `study`.`user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `updated_by` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;


-- -----------------------------------------------------
-- Table `study`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `study`.`item` ;

CREATE TABLE IF NOT EXISTS `study`.`item` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `content` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `study`.`order_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `study`.`order_detail` ;

CREATE TABLE IF NOT EXISTS `study`.`order_detail` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `order_at` DATETIME NULL,
  `user_id` BIGINT(20) NOT NULL,
  `item_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```

---


```
package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.OrderDetail;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

public class OrderDetailRepositoryTest extends StudyApplicationTests {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Test
    public void create(){
        OrderDetail orderDetail = new OrderDetail();

        orderDetail.setOrderAt(LocalDateTime.now());
        //어떤 사람? 4번 아이디를 가진 사람이
        orderDetail.setItemId(7L);
        //어떤 상품?    1번의 인덱스 아이디.
        orderDetail.setUserId(1L);
    }
}

```

id=1인 상품을 id=7인 사용자가 구매하는 주문 데이터를 생성하는 예시다.

![OrderDetail 저장 결과](/assets/20210327_203929.png)

![Workbench에서 order_detail 테이블 확인](/assets/20210327_225956.png)

---

## JPA 연관관계 — FetchType

//1:N
//fetch 타입
//Lazy = 지연 로딩 , Eager = 즉시로딩.
@OneToMany(fetch = FetchType.LAZY, mappedBy = "item")
private List<OrderDetail> orderDetailList;

| FetchType | 설명 | 권장 사용처 |
|---|---|---|
| **LAZY** (지연 로딩) | 실제 사용 시점에 쿼리 실행 | 기본값으로 항상 우선 사용 |
| **EAGER** (즉시 로딩) | 조회 즉시 연관 데이터도 함께 로딩 | 1:1 관계처럼 단일 연관일 때만 |

여러 연관관계가 존재할 경우 반드시 **LAZY**를 사용해야 한다.
