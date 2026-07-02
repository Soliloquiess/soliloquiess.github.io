---
title: "[Springboot] Clean Architecture와 NoSQL 입문"
date: 2021-07-04
category: "Springboot"
tags: ["Springboot"]
description: "Spring 레이어 컴포넌트(@Controller/@Service/@Repository/@Configuration) 역할, WAV 헤더 제거 서비스 실습, Clean Architecture 계층 설계, OOP 인터페이스 기반 DI 원칙, Redis·MongoDB 등 NoSQL 소개를 정리한 노트."
permalink: "study/2021/07/04/백엔드-기초-스터디-6일차"
---

## Spring Managed Components

![Spring 레이어 아키텍처 다이어그램](/assets/20210704_140308.png)

Spring에서 거의 모든 것이 이 컴포넌트 구조로 만들어진다.

| 레이어 | 어노테이션 | 역할 |
|---|---|---|
| **Presentation Layer** | `@Controller` / `@RestController` | 클라이언트 요청을 받는 컴포넌트 |
| **Business Layer** | `@Service` | 실제 제공하고자 하는 비즈니스 로직 |
| **Persistence Layer** | `@Repository` | DB와 연결되는 컴포넌트 |
| **Database Layer** | — | 실제 DB |
| **Configuration** | `@Configuration` + `@Bean` | 애플리케이션 실행 시 설정을 정의하고 주입 가능하게 함 |

컴포넌트 특징을 가져가면서 각 레이어의 개별적인 역할을 담당한다. 구분 없이 `@Component`만 써도 동작은 하지만 좋지 않은 방법이다.

---

## 실습: WAV Header Removal Service

WAV 파일을 POST 요청으로 받아 헤더를 제거하고 순수 PCM 데이터를 반환하는 서비스.

### WAV 파일 구조

![WAV 파일 헤더 구조](/assets/20210704_141148.png)

- WAV 파일 앞 **44~46바이트**는 헤더: 샘플레이트, 채널 수, 데이터 길이 등을 포함
- `subchunk2id` 필드가 실제 오디오 데이터의 시작 위치
- 이 필드가 없으면 WAV 파일이 아닌 것으로 판단 가능 → Spring이 자동으로 **400 에러** 반환
- 연구 목적의 음성 처리에서는 헤더 없이 순수 **PCM 데이터**만 필요

### 서비스 구현

![WAV 헤더 제거 서비스 코드](/assets/20210704_141427.png)

- raw PCM 데이터의 시작 위치를 찾아 저장
- 응답의 OutputStream에 해당 InputStream을 그대로 전달

![WAV 데이터 offset 처리](/assets/20210704_141621.png)

- 헤더 이후 순수 데이터 부분만 응답으로 반환

![Postman multipart 에러 예시](/assets/20210704_141711.png)

- multipart 전송 한계 초과 시 Postman 에러 발생
- 유니코드 변환 과정에서 오류가 나기도 함

---

## Spring 레이어별 컴포넌트 역할

![Spring 컴포넌트 레이어 재확인](/assets/20210704_140308.png)

- **Controller**: 클라이언트와 직접 통신, 요청이 맞는지·권한이 있는지 검증
- **Service**: 독립적으로 작동할 수 있는 비즈니스 로직 담당
- **Repository(DAO)**: 실제 DB와 연결
- **Configuration**: 애플리케이션 실행 시 필요한 설정 정의, `@Bean`으로 주입 가능하게 함

![Configuration Bean 예시](/assets/20210704_142144.png)

---

## Clean Architecture

![Clean Architecture 다이어그램](/assets/20210704_142511.png)

- **로버트 C. 마틴(Robert C. Martin)** 이 제안한 아키텍처
- 내부로 들어갈수록 더 상세한 비즈니스 로직을 다루며, 각 계층은 인접 계층과만 소통

![Clean Architecture 패키지 구조 예시](/assets/20210704_142641.png)

- **UseCase**: 컨트롤러에 포함될 수 있지만, 프로젝트가 커지면 별도로 분리해 관리
- **Core(Service)**: 인터페이스로 제공해 구현체와의 결합도를 낮춤
- `@Primary` 어노테이션: 같은 인터페이스의 구현체가 여러 개일 때 우선 사용할 것을 지정

> 계층 간 결합성을 줄이기 위해 **인터페이스를 만들고 구현체를 주입** 받는 방식을 사용한다.  
> 구현체가 인터페이스를 무조건 따라야 하므로 잘못된 변경을 방지할 수 있다.

---

## OOP와 DI (Dependency Injection, 의존성 주입)

![List vs ArrayList 타입 선언 예시](/assets/20210704_145256.png)

![DI 개념 예시](/assets/20210704_145313.png)

- Java에서 `ArrayList`를 직접 선언하지 말고 **`List` 인터페이스로 선언**하자
- `ArrayList`는 `List`의 하위 객체 → `List` 자리에 `ArrayList`를 넣을 수 있음 (Liskov 원칙)
- 반대로 `List` 타입 변수에 `ArrayList`만의 기능을 쓰려 하면 에러 발생
- 소통하는 함수를 만들 때는 **인터페이스·추상클래스 기준**으로 만드는 것이 좋다 → OOP의 DI 핵심

### InputStream 예시

- `InputStream`은 추상클래스 → 구현체가 여러 종류 존재
- `ByteArrayInputStream`: 메모리 상의 바이트 배열에서 읽음
- `FileInputStream`: 파일 시스템에서 읽음
- 출처에 따라 구현체를 달리 할 수 있지만 사용하는 코드는 `InputStream` 인터페이스로 동일하게 처리 가능

---

## RDB 외 데이터 처리

### 관계형 데이터베이스의 한계

![RDB 확장성 한계 다이어그램](/assets/20210704_151147.png)

| 확장 방식 | 설명 |
|---|---|
| **Scale-Up** | 서버 하드웨어 스펙을 높여 대응 |
| **Scale-Out** | 동일 하드웨어를 여러 대로 늘려 대응 |

요즘은 **Scale-Out**이 더 중요해지는 추세이며, RDB는 분산 환경에서 한계가 있다.

관계형 데이터베이스를 사용하지 않으면 모두 **NoSQL**이라 부를 수 있다.

---

### Redis

![Redis 구조 및 사용 사례](/assets/20210704_151229.png)

- **Redis (Remote Dictionary Server)**: 메모리 상에서 **key-value** 쌍으로 데이터를 저장
- 주로 **캐시(Cache)** 용도로 많이 사용
- 참고: https://www.objectrocket.com/blog/how-to/top-5-redis-use-cases/

---

### MongoDB (Document DB)

- 일반적으로 **JSON을 컬렉션에 저장**
- 같은 컬렉션 내에서도 필드가 다른 항목 추가 가능 (유연한 스키마)
- 필드 기준 색인·검색 기능 포함

---

## 게시판 ERD 설계 예시

![게시판 기본 ERD](/assets/20210704_151728.png)

- 게시판(Board)이 여러 개가 되면 카테고리(Category) 테이블을 별도로 분리

![카테고리 추가 ERD](/assets/20210704_152150.png)

- `table categories`를 만들어 Board 분류의 기준으로 삼음
- 카테고리가 100개로 늘어나도 테이블 구조 변경 없이 row만 추가하면 됨
- User와 Category 간의 관계도 생성 가능

> 언제나 **개선·변경사항에 대응할 방법**을 미리 생각해두는 것이 좋다.

---

## 질문하는 방법 (우아한 테크코스 4단계)

1. 할 수 있는 만큼 직접 해본다
2. 검색한다
3. 실패 사례를 정리한다
4. 그것을 가지고 질문하러 간다

> 에러를 많이 내고 직접 해결하는 것이 실력 향상의 가장 빠른 길이다.
