---
title: "[Springboot] MSA, HTTPS, gRPC — Spring Boot 배포와 서비스 아키텍처"
date: 2021-07-11
category: "Springboot"
tags: ["Springboot"]
description: "Spring yml/Profile 환경 분리, Dockerfile 빌드 전략, MSA와 Spring Cloud Gateway, RabbitMQ 메시지 큐 패턴, 클라우드 서비스 개요, HTTPS 핸드셰이크 원리, gRPC 통신까지 다룬 백엔드 배포·아키텍처 학습 노트."
permalink: "study/2021/07/11/백엔드-기초-스터디-8일차"
---

## Spring Framework — yml 설정과 @Value 주입

**yml**은 프로퍼티 파일에서 계층 구조(트리 형식)를 표현하는 방식이다.

![yml 계층 구조 예시](/assets/20210711_140222.png)

- **`@Value`**: 런타임에 yml 값을 필드에 주입. `${}` 표현식으로 yml 키를 참조
- `nonexistence` 같이 설정되지 않은 키는 기본값(`:` 뒤 값)으로 대체됨
- MyBatis 등에서도 yml 값을 읽어 적용 가능

![Value 어노테이션 예시](/assets/20210711_140433.png)

> 주의: `@Value`는 생성자(constructor) 단계에서 사용하면 `null`이 주입된다. 기본 생성자가 완료된 이후에 값이 주입되기 때문이다.

![Value 필드 주입 시점](/assets/20210711_140609.png)

![IOC 컨테이너 동작](/assets/20210711_141100.png)

---

## Profile Handling — 환경별 설정 분리

실행 환경(dev/prod/common 등)에 따라 다른 설정 파일을 로드하는 방식.

![Profile 설정 구조](/assets/20210711_141341.png)

- Spring Boot는 기동 시 `application.yml` 하나만 읽고, 나머지는 설정값으로 보관
- `default: dev` 설정 시 profile이 지정되지 않으면 자동으로 dev profile 사용
- `prod` profile 지정 시 `prod`와 `common` 두 파일을 함께 사용하도록 구성 가능

![Profile 실행 예시](/assets/20210711_142111.png)

![Profile 출력 확인](/assets/20210711_142313.png)

![Profile 설정 적용 화면](/assets/20210711_142410.png)

### Profile 지정 방법 3가지

| 방법 | 명령/설정 | 특징 |
|------|-----------|------|
| JVM `-D` 옵션 | `-Dspring.profiles.active=dev` | 런타임에 동적으로 지정 |
| OS 환경변수 | `export SPRING_PROFILES_ACTIVE=dev` | 세션 또는 시스템 전역 |
| `application.yml` 내 `spring.profiles.active` | `active: dev` | 컴파일 전에 정의 |

```
-Dspring.profiles.active=dev
```

![java -D 옵션 설명](/assets/20210711_142551.png)

![환경변수 설정 예시 1](/assets/20210711_142643.png)

![환경변수 설정 예시 2](/assets/20210711_142741.png)

### 환경변수와 Linux 쉘 구조

**환경변수**: OS가 실행 중인 상태에서 저장해두는 변수(예: `PATH`). Docker 컨테이너에서는 호스트 OS에 영향 없이 컨테이너 내부에서만 적용된다.

Linux의 가장 큰 특징은 **멀티세션 로그인** 지원으로, 서버 OS로 적합하다.

![Shell/Kernel/Utility 구조](/assets/20210711_143218.png)

| 구성 요소 | 역할 |
|-----------|------|
| **커널(Kernel)** | OS의 핵심. 하드웨어와 소통 |
| **쉘(Shell)** | 커널 사용을 위한 UI. 사용자 입력을 해석해 커널에 전달 |
| **터미널(Terminal)** | 쉘 출력을 시각화하는 GUI 소프트웨어 |
| **유틸리티(Utility)** | 쉘에서 사용하는 프로그램 도구 |

- 멀티 유저 환경에서 쉘을 공유하며, 요청 순서에 따라 결과를 각 세션에 반환

![Path 추가 방법](/assets/20210711_143601.png)

![터미널 세션 환경변수](/assets/20210711_143751.png)

![export 명령어 예시](/assets/20210711_143917.png)

---

## Dockerfile — 이미지 빌드 방식

![Dockerfile 예시](/assets/20210711_144422.png)

Spring Boot 앱의 Docker 이미지 빌드 방식은 두 가지:

1. **jar 파일 직접 실행**: `app.jar`로 복사 후 `java -jar`로 실행
2. **jar를 레이어로 분리**: 의존성(dependency) 레이어와 앱 레이어를 분리해 캐시 효율 향상

둘 중 하나만 사용해야 한다(나머지는 주석 처리).

![Dockerfile 레이어 분리 예시](/assets/20210711_144743.png)

---

## MSA (Microservices Architecture)

![MSA 아키텍처 개요](/assets/20210711_145112.png)

기존 **모놀리식(Monolithic)** 방식은 하나의 애플리케이션에 모든 기능을 담아 운영. 규모가 커질수록 작은 수정에도 전체를 재기동해야 하고 의존성 충돌이 발생한다.

**MSA**: 명확한 역할을 가진 서비스를 독립적으로 분리해 관리하는 방식. 아키텍처의 OOP라고 볼 수 있다.

### Spring Cloud Gateway

Spring Boot 기반 **게이트웨이 패턴** 구현 모듈. 어떤 URL이 어떤 서비스로 라우팅될지 정의한다.

![Spring Cloud Gateway 설정](/assets/20210711_145307.png)

### Message Queue (메시지 큐)

서비스 간 **비동기 통신**을 위해 사용. 상대방의 결과에 자신의 작업이 영향받지 않을 때 적합하다.

| 패턴 | 동작 방식 | 사용 예 |
|------|-----------|---------|
| **Work Queue** | 여러 Consumer 중 한가한 쪽이 처리 | 이미지 처리, 이메일 발송 |
| **Publish/Subscribe** | Exchange가 모든 Queue에 publish, 구독자 전체 수신 | 카카오택시 배차, 인적사항 변경 알림 |

![RabbitMQ 패턴](/assets/20210711_145525.png)

![RabbitMQ Work Queue](/assets/20210711_145606.png)

- **RabbitMQ**: 소규모 서비스에 적합. Spring Boot에서 `AMQP` 라이브러리로 연동
- **Apache Kafka**: 더 높은 처리량이 필요한 서비스에 사용. 설정이 까다로운 편
- 참고: https://www.rabbitmq.com/tutorials/tutorial-one-spring-amqp.html

![Apache Kafka 사용 예시](/assets/20210711_145742.png)

![RabbitMQ Fanout 패턴](/assets/20210711_150545.png)

> `fanout`은 조건 없이 모든 구독자에게 메시지를 전달하는 방식. MSA에서 한 서버의 데이터 변경이 다른 서버에 영향을 줄 때 Publish/Subscribe 패턴으로 감지·전달한다.

---

## Cloud Service (클라우드 서비스)

![클라우드 서비스 종류](/assets/20210711_150840.png)

- **IaaS** (예: AWS EC2, GCP Compute Engine): 가상 서버 환경 제공. 유지보수·책임은 클라우드 제공자가 담당
- **ECR / Container Registry**: Docker 이미지 저장소 서비스
- 물리 서버 대비 초기 비용이 적지만, 장기적으로는 유지보수 및 인건비를 함께 고려해야 함

![클라우드 서비스 비교](/assets/20210711_151306.png)

---

## HTTPS와 SSL/TLS 핸드셰이크

![HTTPS 암호화 흐름](/assets/20210711_151322.png)

HTTPS는 **공개키 암호화**와 **대칭키 암호화**를 함께 사용한다.

### 핸드셰이크(Handshake) 흐름

1. 클라이언트가 랜덤 데이터 + 지원 가능한 암호화 알고리즘 목록 전송
2. 서버가 사용할 암호화 방식 선택 후 응답
3. 서버가 **SSL 인증서**(사이트 증명) + **공개키** 전송
4. 브라우저가 인증서 유효성 검증 (발급 기관, 만료일 확인)
5. 1·2 단계의 랜덤 데이터를 합쳐 **대칭키** 생성 후 공개키로 암호화해 전송
6. 서버가 비공개키로 복호화해 대칭키 확보
7. 이후 통신은 대칭키로 암호화/복호화

> SSL 인증서 문제가 있으면 브라우저에서 경고(빨간색)를 표시한다. HTTPS 미적용 시 평문(plain text)으로 통신되므로 보안에 취약하다.

![HTTPS 핸드셰이크 다이어그램](/assets/20210711_151958.png)

**실습 목표**: Spring Boot 앱에 HTTPS 적용해보기
- 키워드: `nginx ssl https`, `spring boot https 설정`
- 면접에서도 "HTTPS 동작 원리 설명" 질문이 자주 나온다

---

## gRPC — 고성능 서비스 간 통신

MSA에서 서비스 간 **지속적이고 고성능 통신**이 필요할 때 사용. 구글이 만든 HTTP/2 기반 통신 프로토콜.

- 우리가 흔히 쓰는 것은 HTTP/1.x 방식이며, gRPC는 HTTP/2를 사용
- **Proto Buffer(프로토 버퍼)**: 주고받을 메시지와 서비스를 정의하면 각 언어 코드로 자동 생성

![gRPC 포트폴리오 예시](/assets/20210711_153853.png)

![gRPC 서비스 정의 파일](/assets/20210711_153917.png)

![Proto Buffer 메시지 구조](/assets/20210711_153935.png)

- **RPC**: 원격 함수 호출. 요청 메시지를 받으면 응답 메시지를 반환
- **Stub**: 클라이언트 측 gRPC 호출 객체. pom/gradle 빌드 시 자동 생성됨

![gRPC Stub 코드 자동생성](/assets/20210711_154206.png)

![터미널/쉘/커널 관계 정리](/assets/20210711_155438.png)

> 서버 환경에서는 GUI가 없으므로 CLI(Command Line Interface)를 통해 원하는 작업을 수행할 수 있어야 한다. 쉘 스크립트는 DevOps 영역에서 중요하게 활용된다.
