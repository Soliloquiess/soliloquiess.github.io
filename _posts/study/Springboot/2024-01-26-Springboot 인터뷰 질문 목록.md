---
title: "[Springboot] Springboot 면접 질문 목록"
layout: post
subtitle: Spring
date: "2024-01-23-04:58:53 +0900"
categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### 스프링부트 관련 면접 질문 리스트

#### Q1. 스프링 부트란 무엇인가? Spring Boot는 어떤 문제를 해결합니까?

스프링 부트 (Spring Boot):

스프링 부트는 Pivotal(현재는 VMware의 일부분)에서 개발한 오픈 소스 자바 기반 프레임워크로, 스프링 프레임워크의 기능을 활용하여 단독 실행 가능한(Spring Boot는 내장된 서버를 갖고 있어 별도의 웹 서버 설치 없이도 실행 가능) 프로덕션 수준의 스프링 기반 애플리케이션을 쉽게 개발할 수 있게 도와줍니다.

Spring Boot의 주요 특징 및 기능:

1 . 자동 구성 (Auto-Configuration): 스프링 부트는 클래스패스 상의 라이브러리, 설정 및 애노테이션을 기반으로 애플리케이션을 자동으로 구성합니다. 이로써 개발자는 별도의 설정 없이도 간단한 명령어로 애플리케이션을 빠르게 구동시킬 수 있습니다.

2 . 스타터 (Starters): 스프링 부트 스타터는 특정 기술 세트에 대한 의존성을 갖고 있는 미리 구성된 프로젝트 템플릿입니다. 이를 이용하면 개발자는 필요한 라이브러리만 추가하여 프로젝트를 초기화할 수 있습니다.

3 . 내장 웹 서버: 스프링 부트는 내장된 서버(Tomcat, Jetty, Undertow 등)를 사용하여 별도의 서버 설치 없이도 애플리케이션을 실행할 수 있습니다.

4 . 간소화된 의존성 관리: 스프링 부트는 버전 관리를 통한 의존성 해결을 자동으로 수행해주기 때문에, 개발자는 애플리케이션의 의존성 버전을 명시하지 않아도 됩니다.

5 . 통합된 설정: 스프링 부트는 application.properties 또는 application.yml 파일을 통해 애플리케이션의 설정을 통합적으로 관리합니다.

6 . Spring Boot Actuator: 애플리케이션의 상태, 모니터링, 관리를 위한 기능을 제공하는 모듈로, 애플리케이션의 상태를 확인하고 모니터링할 수 있습니다.

###### Spring Boot의 문제 해결:

1 . 복잡한 설정 및 구성: 스프링 부트는 자동 구성을 통해 기본적인 설정을 자동으로 수행해주어, 개발자가 복잡한 설정 작업을 최소화할 수 있습니다.

2 . 빠르고 간편한 개발 및 배포: 스프링 부트는 간소화된 의존성 관리, 내장 웹 서버 등을 통해 빠르게 개발하고 배포할 수 있는 환경을 제공합니다.

3 . 유연한 프로젝트 구성: 스프링 부트의 스타터와 자동 구성은 개발자가 프로젝트를 더 유연하게 구성할 수 있도록 도와줍니다.

4 . 프로덕션 수준의 애플리케이션 개발: 스프링 부트는 기본적인 구성 및 설정을 제공하면서도, 프로덕션 환경에서의 안정성과 확장성을 고려한 기능을 제공합니다.

스프링 부트는 이러한 특징과 기능을 통해 개발자들에게 생산성 향상과 안정적인 애플리케이션 개발 경험을 제공하고 있습니다.

<br>

---

<br>

#### Q2. 스프링 부트란 무엇인가? Spring Boot는 어떤 문제를 해결합니까?

Q2. 몇 가지 중요한 Spring Boot 핵심 기능을 설명하시겠습니까?

1 . 자동 구성 (Auto-Configuration):

- 스프링 부트의 핵심 기능 중 하나로, 클래스패스 상의 라이브러리와 설정을 분석하여 애플리케이션의 구성을 자동으로 수행합니다.

- 개발자는 별다른 설정 없이도 스프링 부트를 사용할 수 있으며, 필요한 경우에는 자동 구성을 오버라이드하여 커스텀 구성을 적용할 수 있습니다.

2 . 스프링 부트 스타터 (Spring Boot Starter):

- 특정 목적을 위한 의존성 집합으로, 프로젝트 초기화를 간편하게 할 수 있는 템플릿입니다.

- 예를 들어, spring-boot-starter-web은 웹 애플리케이션을 개발하기 위한 필수 라이브러리를 포함하는 스타터입니다.

3 . 내장 웹 서버 (Embedded Web Server):

- 스프링 부트는 내장된 서버(Tomcat, Jetty, Undertow 등)를 사용하여 별도의 웹 서버 설치 없이도 애플리케이션을 실행할 수 있습니다.
- 이는 배포 및 실행 환경을 간단하게 구성하고 유지보수를 용이하게 만듭니다.

4 . 간소화된 의존성 관리:

스프링 부트는 버전 관리를 통해 의존성을 해결하므로, 개발자는 애플리케이션의 의존성 버전을 명시하지 않아도 됩니다.
버전 충돌과 같은 문제를 방지하며, 의존성 업그레이드가 간편해집니다.

5 . 통합된 설정 (Unified Configuration):

application.properties 또는 application.yml 파일을 사용하여 애플리케이션의 설정을 통합적으로 관리할 수 있습니다.
이를 통해 설정 정보를 외부에 분리하고 프로파일을 통해 다양한 설정을 관리할 수 있습니다.

6 . Spring Boot Actuator:

애플리케이션의 상태, 모니터링, 관리를 위한 기능을 제공하는 모듈입니다.
/actuator/health, /actuator/metrics 등의 엔드포인트를 통해
애플리케이션의 상태를 모니터링할 수 있습니다.

7 . Spring Boot CLI (Command Line Interface):

명령줄에서 스크립트 형태로 스프링 부트 애플리케이션을 빠르게 개발하고 실행할 수 있는 도구입니다.
단순한 명령어로 프로젝트 초기화, 의존성 추가, 애플리케이션 실행이 가능합니다.

이러한 Spring Boot의 핵심 기능들은 개발자에게 빠르고 효율적인
애플리케이션 개발을 가능케 하며, 프로덕션 환경에서의 운영과 유지보수를 간소화합니다.

<br>

---

<br>

#### Q3. 스프링 부트 자동 구성이란 무엇입니까?

###### 스프링 부트 자동 구성 (Spring Boot Auto-Configuration):

스프링 부트 자동 구성은 스프링 부트가 클래스패스 상에 존재하는 라이브러리 및 설정을 기반으로 애플리케이션의 구성을 자동으로 설정하는 기능입니다. 이는 개발자가 별다른 설정을 하지 않아도 스프링 애플리케이션을 실행할 수 있도록 해주며, 개발자가 특정 기능을 추가하려고 할 때 필요한 설정을 자동으로 수행합니다.

###### 주요 특징 및 원리:

1 . 클래스패스 스캔과 조건부 설정:

스프링 부트는 클래스패스를 스캔하여 자동 구성에 필요한 빈들을 찾습니다.
조건부 설정을 통해 특정 조건이 충족될 때만 자동 설정이 활성화됩니다.

2 .@EnableAutoConfiguration 어노테이션:

@SpringBootApplication 어노테이션에 포함된 @EnableAutoConfiguration 어노테이션은 스프링 부트 애플리케이션이 시작될 때 자동 구성을 활성화합니다.

3 . spring.factories 파일:

META-INF/spring.factories 파일은 자동 구성을 정의하는 데 사용되는 중요한 파일입니다.
이 파일에는 자동 구성을 제공하는 클래스들이 정의되어 있으며, 이를 통해 어떤 자동 구성이 언제 활성화되어야 하는지 정의됩니다.

4 . 조건부 의존성:

자동 구성은 특정한 조건이 충족될 때만 활성화됩니다. 예를 들어, 클래스패스에 특정 라이브러리가 존재하거나, 설정이 특정한 값으로 설정되어 있을 경우에만 자동 구성이 작동합니다.

###### 자동 구성의 이점:

1 . 간편한 구성:

개발자는 명시적인 설정 없이도 스프링 부트를 사용할 수 있습니다.
필요한 의존성이나 설정을 별도로 추가하지 않아도 기본적인 애플리케이션을 빠르게 구성할 수 있습니다.

2 . 유연성 및 확장성:

자동 구성은 개발자가 직접 설정을 작성하지 않아도 되므로, 애플리케이션의 구성이 변경되거나 확장될 때 더욱 유연하게 대처할 수 있습니다.

3 . 표준화된 설정:

자동 구성은 스프링 부트에서 정의한 일관된 규칙에 따라 설정이 이루어지므로, 개발자 간의 혼란을 줄여줍니다.

4 . 의존성 버전 관리:

스프링 부트는 의존성 버전을 자동으로 관리해주기 때문에, 버전 충돌 및 호환성 문제를 효과적으로 해결합니다.
스프링 부트의 자동 구성은 개발자에게 빠르고 편리한 애플리케이션 개발 경험을 제공하며, 스프링 생태계를 효과적으로 활용할 수 있도록 도와줍니다.

<br>

---

<br>

#### Q4. Spring Boot 내부 동작 및 Spring Boot에서의 run() 메서드에 대해 설명하십시오.

###### Spring Boot 내부 동작:

Spring Boot는 내부적으로 여러 메커니즘을 사용하여 자동 구성, 스타터 패키지, 내장 웹 서버 등의 기능을 지원합니다. 주요 동작 원리는 다음과 같습니다:

1 . 자동 구성 (Auto-Configuration):

- 클래스패스 상의 라이브러리 및 설정을 분석하여 애플리케이션의 구성을 자동으로 설정합니다.
- @EnableAutoConfiguration 어노테이션이 활성화되면 META-INF/spring.factories 파일을 통해 정의된 자동 구성 클래스들이 찾아지고 적용됩니다.

2 . 스프링 부트 스타터 (Spring Boot Starter):

- 특정 기술 스택에 필요한 의존성을 미리 구성된 스타터 패키지에 담아두어, 프로젝트 초기화를 용이하게 합니다.
- 스타터를 추가하면 해당 기술에 필요한 라이브러리 및 설정이 자동으로 포함됩니다.
  3 . 내장 웹 서버 (Embedded Web Server):

- 스프링 부트는 내장된 서버(Tomcat, Jetty, Undertow 등)를 사용하여 별도의 웹 서버 설치 없이도 애플리케이션을 실행합니다.
- 설정 파일(application.properties 또는 application.yml)을 통해 서버와 관련된 다양한 속성을 조정할 수 있습니다.
  4 . Application Context 초기화:

스프링 애플리케이션 컨텍스트가 초기화되면서 빈(Bean)들이 생성되고 의존성 주입이 이루어집니다.
@SpringBootApplication 어노테이션이 있는 클래스의 메소드들이 실행됩니다.

##### Spring Boot에서의 run() 메서드:

Spring Boot에서 run() 메서드는 SpringApplication 클래스의 인스턴스를 생성하고, 해당 인스턴스의 run() 메서드를 호출하는 역할을 합니다. 주로 애플리케이션의 진입점으로 사용되며 다음과 같은 주요 동작을 수행합니다:

1 . SpringApplication 인스턴스 생성:

- SpringApplication은 스프링 부트 애플리케이션을 실행하는데 필요한 구성을 담고 있는 클래스입니다.
- SpringApplication 인스턴스는 @SpringBootApplication 어노테이션이 붙은 클래스를 인자로 받아 생성됩니다.

2 . .Spring Boot Application 구성:

- SpringApplication은 자동 구성, 스프링 부트 스타터, 외부 설정 파일 등을 초기화합니다.
- spring.factories 파일을 통해 정의된 자동 구성 클래스들이 활성화되고, 스타터 패키지에 정의된 의존성이 해결됩니다.

3 . 내장 웹 서버 시작:

- 내장 웹 서버가 설정되어 있으면 해당 서버가 시작됩니다.
- 내장 웹 서버가 없으면 스프링 컨테이너만 구동됩니다.
  4 . Application Context 초기화 및 빈 생성:

- 스프링 애플리케이션 컨텍스트가 초기화되고, @SpringBootApplication 어노테이션이 붙은 클래스와 그 하위 패키지에 있는 빈들이 생성되고 관리됩니다.

5 . 애플리케이션 이벤트 처리:

- 애플리케이션 컨텍스트 초기화와 관련된 이벤트(예: ApplicationStartedEvent, ApplicationReadyEvent 등)가 발생하며, 필요에 따라 리스너들이 동작합니다.
- run() 메서드를 호출하는 것은 스프링 부트 애플리케이션을 시작하는 핵심 동작 중 하나이며, 이를 통해 자동 구성된 환경에서 애플리케이션이 실행됩니다.

<br>

---

<br>

#### Q5. Spring Boot 애플리케이션을 생성하는 다양한 방법은 무엇인가요?

스프링 부트 애플리케이션을 생성하는 방법은 여러 가지가 있습니다. 아래는 주요한 몇 가지 방법입니다:

1 . Spring Initializer:

- Spring Initializer 웹 사이트를 통해 빠르게 스프링 부트 프로젝트를 생성할 수 있습니다.
- 웹 인터페이스를 통해 프로젝트의 구성, 의존성, 패키징 형식 등을 선택하고 다운로드 받을 수 있습니다.

2 . Spring Boot CLI(Command Line Interface):

- 명령 줄에서 스크립트를 사용하여 스프링 부트 프로젝트를 생성할 수 있습니다.
- spring init 명령을 사용하고, 필요한 옵션을 설정하여 프로젝트를 생성할 수 있습니다.

```
spring init --dependencies=web my-spring-boot-app
```

3 . Spring Boot with IDE (Integrated Development Environment):

- 대부분의 통합 개발 환경(IDE)은 스프링 부트 프로젝트를 쉽게 생성할 수 있는 도구를 제공합니다.
- 이클립스, IntelliJ IDEA, Visual Studio Code 등에서는 스프링 부트 프로젝트를 새로 만들거나, 기존 프로젝트를 스프링 부트로 변환할 수 있습니다.
  4 . 스프링 부트 명령어로 애플리케이션 생성:

- 명령 줄에서 스프링 부트 명령어를 사용하여 애플리케이션을 생성할 수 있습니다.
- spring create 명령을 사용하여 프로젝트를 생성할 수 있습니다.

```
spring create my-spring-boot-app
```

5 . 스프링 부트 Initializr를 사용한 Maven 또는 Gradle 프로젝트 생성:

- 스프링 부트 Initializr는 프로젝트를 생성하고 빌드 도구로 Maven 또는 Gradle을 선택할 수 있는 옵션을 제공합니다.
- 생성된 프로젝트는 다운로드하여 IDE나 빌드 도구를 통해 개발할 수 있습니다.

이러한 방법 중 하나를 선택하여 스프링 부트 애플리케이션을 생성할 수 있으며, 선택한 방법에 따라 프로젝트의 구조와 초기 설정이 달라질 수 있습니다.

<br>

---

<br>

#### Q6. @SpringBootApplication, @Configuration, 그리고 @ComponentScan 어노테이션에 대해 설명하십시오.

1 . @SpringBootApplication:

- @SpringBootApplication 어노테이션은 스프링 부트 애플리케이션을 선언하는 메타 어노테이션입니다.
  이 어노테이션은 다음 세 가지 어노테이션을 포함하고 있습니다: @Configuration, @EnableAutoConfiguration, @ComponentScan.
- 따라서 이 어노테이션을 사용하면 스프링 부트 애플리케이션을 설정하고 자동 구성을 활성화하며, 컴포넌트 스캔을 수행할 수 있습니다.
- 주로 메인 애플리케이션 클래스에 선언되어 사용됩니다.

```
@SpringBootApplication
public class MySpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }
}
```

2 . @Configuration:

- @Configuration 어노테이션은 해당 클래스가 스프링 애플리케이션 컨텍스트의 구성(Configuration)을 담당하는 클래스임을 나타냅니다.
- 스프링에서 @Configuration 어노테이션이 붙은 클래스는 @Bean 어노테이션을 사용하여 빈(Bean)을 정의할 수 있습니다.
- 주로 설정 클래스에 사용되며, XML 기반 설정 대신 자바 기반의 설정을 제공합니다.

```
@Configuration
public class MyConfiguration {
    @Bean
    public MyBean myBean() {
        return new MyBean();
    }
}
```

3 . .@ComponentScan:

- @ComponentScan 어노테이션은 스프링에게 컴포넌트 클래스를 찾아서 스캔하도록 지시합니다.
- 주로 스프링이 어떤 패키지부터 컴포넌트를 찾아야 하는지를 설정할 때 사용됩니다.
- 특정 패키지나 기본 패키지 아래에 있는 모든 컴포넌트를 스캔하여 빈으로 등록합니다.

```
@Configuration
@ComponentScan(basePackages = "com.example")
public class MyConfiguration {
    // ...
}
```

이러한 어노테이션들은 스프링 부트 애플리케이션의 구성, 자동 구성, 컴포넌트 스캔과 관련된 중요한 역할을 수행하며, 스프링 부트를 효율적으로 사용하는 데 도움을 줍니다.

<br>

---

<br>

#### Q7. @SpringBootApplication, @Configuration, 그리고 @ComponentScan 어노테이션에 대해 설명하십시오.

##### Spring Boot Starters (스프링 부트 스타터):

Spring Boot Starters는 특정 목적을 위한 의존성 그룹으로 구성된 프로젝트 템플릿입니다. 이러한 스타터들은 특정한 도메인이나 개발 목적에 필요한 여러 의존성들을 묶어둔 것으로, 프로젝트 초기화 및 설정을 단순화하고 개발자가 더 쉽게 애플리케이션을 시작할 수 있도록 도와줍니다.

###### 중요한 Spring Boot Starter 의존성 몇 가지:

1 . spring-boot-starter-web:

웹 애플리케이션을 개발할 때 필요한 기본적인 의존성을 포함합니다. 웹 애플리케이션을 개발할 때 주로 사용됩니다.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

2 . spring-boot-starter-data-jpa:

데이터베이스와의 상호 작용을 위한 JPA(Java Persistence API) 구현을 포함합니다. 데이터베이스와의 데이터 액세스를 위해 사용됩니다.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

3 . spring-boot-starter-security:

스프링 시큐리티를 사용하여 보안 기능을 적용하는 데 필요한 의존성을 포함합니다. 사용자 인증 및 권한 부여와 관련된 기능을 제공합니다.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

4 . spring-boot-starter-test:

스프링 부트 애플리케이션의 테스트를 수행하기 위한 의존성을 포함합니다. JUnit 등의 테스트 프레임워크를 사용할 수 있도록 도와줍니다.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

5 . spring-boot-starter-data-mongodb:

몽고DB와의 상호 작용을 위한 의존성을 포함합니다. 몽고DB를 사용하는 애플리케이션을 개발할 때 사용됩니다.

```<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

이 외에도 스프링 부트는 다양한 스타터를 제공하며, 개발자는 필요한 도구나 기술 스택에 맞는 스타터를 선택하여 사용할 수 있습니다. 스프링 부트 스타터는 프로젝트 초기 설정을 간소화하고, 필요한 의존성을 자동으로 추가하여 빠르고 효율적인 애플리케이션 개발을 도와줍니다.

<br>

---

<br>

#### Q8. Spring Boot Starter Parent가 무엇인가요?

spring-boot-starter-parent는 스프링 부트 기반 프로젝트를 생성할 때 사용되는 부모(Parent) 프로젝트입니다. 이 부모 프로젝트는 스프링 부트 의존성 관리를 위한 설정들을 제공하며, 일반적으로 스프링 부트 애플리케이션의 부모 프로젝트로 사용됩니다.

##### 주요 특징과 역할:

1 . 의존성 관리:

- spring-boot-starter-parent는 스프링 부트 애플리케이션을 개발할 때 필요한 주요 의존성들의 버전을 관리합니다.
- 스프링 부트 프로젝트에서는 부모 프로젝트의 버전을 상속받아 사용하므로, 개발자는 별도로 버전을 명시하지 않아도 됩니다.

2 . 플러그인 설정:

- 스프링 부트 플러그인 및 빌드 관리를 위한 설정이 미리 정의되어 있습니다.
- Maven 빌드에서는 spring-boot-maven-plugin이 포함되어 있어 스프링 부트 애플리케이션을 패키징하고 실행하는 데 필요한 설정이 자동으로 처리됩니다.

3 . 프로퍼티 설정:

- application.properties 및 application.yml 파일에서 사용되는 주요 프로퍼티들의 기본값이 미리 정의되어 있습니다.
- 예를 들어, 내장 웹 서버의 포트, 애플리케이션의 이름 등의 기본 설정이 포함되어 있습니다.

4 . 코드 포매팅 및 품질 검사:

- 코드 포매팅 및 품질 검사를 위한 설정이 내장되어 있어, 코드의 일관성과 품질을 유지할 수 있습니다.

###### 사용법:

spring-boot-starter-parent를 부모로 설정하는 방법은 Maven 또는 Gradle 프로젝트에서 다음과 같이 설정합니다.

Maven:

```
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.4</version> <!-- 사용하고자 하는 스프링 부트 버전으로 변경 -->
</parent>
```

Gradle:

```
plugins {
    id 'org.springframework.boot' version '2.6.4'
}

```

부모 프로젝트로 spring-boot-starter-parent를 사용하면 스프링 부트 기반 애플리케이션의 빌드와 의존성 관리를 효율적으로 수행할 수 있습니다. 이를 통해 스프링 부트의 새로운 버전으로 간편하게 마이그레이션하거나 일관된 의존성 버전을 관리할 수 있습니다.

<br>

---

<br>

#### Q9. Spring Boot를 사용하여 얼마나 많은 유형의 프로젝트를 만들 수 있나요?

Spring Boot는 여러 종류의 프로젝트를 생성할 수 있는 다양한 스타터를 제공합니다. 주요한 프로젝트 유형은 다음과 같습니다:

1 . Spring Boot Web Application:

- spring-boot-starter-web 스타터를 사용하여 웹 애플리케이션을 개발할 수 있습니다.
- 주로 웹 애플리케이션 또는 RESTful 서비스를 개발할 때 사용됩니다.

2 . Spring Boot RESTful Service:

- RESTful 서비스를 빠르게 개발하기 위해 spring-boot-starter-web 스타터를 사용합니다.
- 주로 REST API를 제공하는 서비스를 구축할 때 사용됩니다.

3 . Spring Boot Data JPA:

- 데이터베이스와 상호 작용하기 위해 spring-boot-starter-data-jpa 스타터를 사용합니다.
- JPA(Java Persistence API)를 사용하여 데이터베이스에 대한 객체 지향적인 데이터 액세스를 개발할 수 있습니다.

4 . Spring Boot Data MongoDB:

- 몽고DB와 상호 작용하기 위해 spring-boot-starter-data-mongodb 스타터를 사용합니다.
- 몽고DB를 사용하는 애플리케이션을 개발할 때 사용됩니다.

5 . Spring Boot Batch Processing:

- 대용량 데이터 처리를 위해 배치 프로세싱을 구현하기 위해 spring-boot-starter-batch 스타터를 사용합니다.
- 대용량 데이터를 효과적으로 처리하고 스케줄링된 작업을 실행할 수 있습니다.

6 . Spring Boot Microservices:

- 마이크로서비스 아키텍처를 구현하기 위해 spring-boot-starter-web와 다양한 스프링 클라우드 스타터들을 함께 사용합니다.
- 마이크로서비스 간 통신, 서비스 디스커버리, 로드 밸런싱 등을 지원합니다.

7 . Spring Boot with Spring Security:

- 보안 기능을 구현하기 위해 spring-boot-starter-security 스타터를 사용합니다.
  사용자 인증, 권한 부여, 보안 설정 등을 포함한 보안 기능을 구현할 때 사용됩니다.

8 . Spring Boot with Thymeleaf:

- 템플릿 엔진으로 Thymeleaf를 사용하여 웹 애플리케이션을 개발하기 위해 spring-boot-starter-thymeleaf 스타터를 사용합니다.
- 서버 측 렌더링을 위해 사용됩니다.

이 외에도 다양한 스타터를 조합하여 사용자의 요구에 맞게 커스텀한 프로젝트를 생성할 수 있습니다. 스프링 부트의 다양한 스타터들은 필요한 의존성을 간편하게 추가하여 프로젝트 초기 설정을 편리하게 해주는 장점을 제공합니다.

<br>

---

<br>

#### Q10. Spring Boot의 내장 서버 유형을 설명하고 기본 서버 포트를 변경하는 방법에 대해 설명하세요.

##### Spring Boot의 내장 서버 종류:

Spring Boot는 응용 프로그램 자체에서 외부 서버 설치 없이 실행할 수 있는 여러 내장 서버를 지원합니다. Spring Boot에서 가장 일반적으로 사용되는 내장 서버는 다음과 같습니다:

1 . Tomcat:

- Tomcat은 Spring Boot의 기본 내장 서버입니다. 널리 사용되며 잘 지원됩니다.
- Tomcat을 사용하려면 spring-boot-starter-tomcat 종속성을 포함하면 됩니다.

2 . Jetty:

- Jetty는 Spring Boot에서 또 다른 인기 있는 내장 서버입니다. 가볍고 빠른 시작으로 알려져 있습니다.
- Jetty를 사용하려면 spring-boot-starter-jetty 종속성을 포함하면 됩니다.

3 . Undertow:

- Undertow는 가벼우면서 높은 성능을 자랑하는 웹 서버입니다. 논 블로킹 I/O로 유명합니다.
- Undertow를 사용하려면 spring-boot-starter-undertow 종속성을 포함하면 됩니다.

##### Spring Boot에서 기본 서버 포트 변경하기:

Spring Boot에서 기본 서버 포트는 server.port 속성을 구성하여 변경할 수 있습니다. 이를 위한 몇 가지 방법이 있습니다:

1 . 애플리케이션 프로퍼티 또는 YAML 파일:

- application.properties 또는 application.yml 파일에 다음 라인을 추가하여 원하는 포트를 지정합니다.

```
server.port=8081
```

이렇게 하면 서버 포트가 8081로 변경됩니다.

2 . 명령 줄:

애플리케이션을 시작할 때 명령 줄에서 포트를 재정의할 수 있습니다. 예를 들어:

```
java -jar your-application.jar --server.port=8081
```

3 . 환경 변수:

환경 변수를 사용하여 서버 포트를 설정할 수도 있습니다. 예를 들어 Unix 환경에서:

```
export SERVER_PORT=8081
java -jar your-application.jar
```

기본 서버 포트를 변경하는 것은 동일한 기계에서 여러 애플리케이션이 실행 중일 때 포트 충돌을 피하고자 할 때 유용합니다. 서로 다른 애플리케이션에 대해 서로 다른 포트를 구성하여 충돌 없이 동시에 실행할 수 있도록 하는 것이 일반적인 관행입니다.

<br>

---

<br>

**Q11. 명령 줄에서 Spring Boot 애플리케이션 실행하는 방법:**

Spring Boot 애플리케이션을 명령 줄에서 실행하는 방법에는 여러 가지가 있습니다. 가장 일반적인 방법 두 가지를 설명하겠습니다.

**1. Maven 또는 Gradle을 사용한 빌드 후 실행:**

**Maven을 사용하는 경우:**

```bash
mvn spring-boot:run
```

**Gradle을 사용하는 경우:**

```bash
./gradlew bootRun
```

이 명령은 Maven 또는 Gradle을 통해 애플리케이션을 빌드하고 내장된 Tomcat 서버에서 애플리케이션을 실행합니다. 이 방법은 애플리케이션의 소스 코드를 변경할 때마다 다시 빌드하고 실행해야 하는 경우에 사용됩니다.

**2. 빌드 후 JAR 파일 실행:**

**Maven을 사용하는 경우:**

```bash
mvn clean package
java -jar target/your-application.jar
```

**Gradle을 사용하는 경우:**

```bash
./gradlew clean build
java -jar build/libs/your-application.jar
```

이 방법은 JAR 파일을 생성하고, 그 JAR 파일을 `java -jar` 명령을 사용하여 실행합니다. 빌드된 JAR 파일에는 애플리케이션의 모든 종속성이 포함되어 있으므로, 외부에 설치된 웹 서버 없이도 실행할 수 있습니다.

애플리케션이 성공적으로 시작되면 기본적으로 내장된 웹 서버(예: Tomcat, Jetty, Undertow)가 기동되고, 설정된 포트(기본값은 8080)에서 애플리케이션을 제공합니다. 명령줄에서 Ctrl+C를 누르면 애플리케이션을 종료할 수 있습니다.

<br>

---

<br>

**Q12. Spring Boot 애플리케이션을 통한 REST API HTTP 요청의 흐름을 설명하세요.**

REST API HTTP 요청이 Spring Boot 애플리케이션을 통과하는 흐름은 일반적으로 여러 구성 요소와 단계를 포함합니다. 여기에는 고수준 개요가 포함되어 있습니다.

1. **클라이언트가 HTTP 요청을 보냄:**

   - 클라이언트(웹 브라우저 또는 다른 애플리케이션과 같은)가 HTTP 요청을 시작합니다. 요청에는 HTTP 메서드(GET, POST, PUT, DELETE 등), 헤더 및 경우에 따라(POST 또는 PUT 요청의 경우) 페이로드(데이터)와 같은 정보가 포함됩니다.

2. **DispatcherServlet이 요청을 수신함:**

   - Spring Boot 애플리케이션에서 HTTP 요청을 처리하는 핵심 구성 요소는 `DispatcherServlet`입니다. 이는 모든 들어오는 요청을 받아들이고 해당 요청을 적절한 컨트롤러로 전달합니다.

3. **Handler Mapping:**

   - Spring의 `HandlerMapping` 구성 요소는 들어오는 요청을 적절한 컨트롤러 메서드에 매핑합니다. 요청 URL을 분석하고 어떤 컨트롤러가 요청을 처리해야 하는지 결정합니다.

4. **컨트롤러가 요청을 처리함:**

   - 컨트롤러는 `@RestController` 또는 `@Controller`로 주석이 달린 Spring 구성 요소입니다. `@RequestMapping` 또는 `@GetMapping`, `@PostMapping` 등으로 주석이 달린 메서드를 포함하며, 이는 컨트롤러가 처리할 수 있는 URL 패턴을 지정합니다. 선택된 메서드가 들어오는 요청을 처리합니다.

5. **컨트롤러가 요청을 처리함:**

   - 컨트롤러 메서드는 요청을 처리하고, 필요에 따라 요청에서 데이터를 추출하고 비즈니스 로직을 수행하며 응답을 준비합니다. 메서드는 응답 객체 또는 데이터를 반환합니다.

6. **응답을 준비함:**

   - 컨트롤러 메서드의 결과는 일반적으로 HTTP 응답으로 변환됩니다. 이 변환은 Spring의 `HttpMessageConverter` 구성 요소에 의해 수행되며, 응답 데이터를 JSON 또는 XML과 같은 형식으로 직렬화합니다.

7. **DispatcherServlet이 응답을 전송함:**

   - `DispatcherServlet`은 HTTP 응답을 클라이언트로 보냅니다. 응답에는 HTTP 상태 코드, 헤더 및 직렬화된 응답 데이터와 같은 정보가 포함됩니다.

8. **클라이언트가 HTTP 응답을 받음:**

   - 클라이언트는 HTTP 응답을 받습니다. 요청이 성공한 경우 클라이언트는 응답을 처리하며, 이는 웹 페이지에 데이터를 렌더링하거나 받은 정보를 추가 작업에 사용하는 등의 작업을 수행할 수 있습니다.

9. **예외 처리 (선택 사항):**

   - 요청 처리 중에 예외가 발생하는 경우 Spring Boot는 의미 있는 오류 응답을 생성하기 위해 예외 처리 메커니즘을 사용할 수 있습니다. 이는 예외를 특정 HTTP 상태 코드에 매핑하고 응답에 오류 세부 정보를 반환하는 등의 작업을 수행합니다.

10. **Filter 및 Interceptor 처리 (선택 사항):**
    - Spring은 요청 및 응답을 추가 처리하기 위해 필터 및 인터셉터를 사용할 수 있습니다. 필터와 인터셉터는 로깅, 인증 또는 요청/응답 수정과 같은 작업을 수행할 수 있도록 구성될 수 있습니다.

이 흐름은 Spring Boot 애플리케이션에서 요청-응답 주기의 간략화된 개요를 나타냅니다. Spring은 다양한 단계에서 동작을 사용자 정의하고 확장할 수 있는 유연하고 모듈식인 아키텍처를 제공합니다.

<br>

---

<br>

**Q13. Spring Boot WAR를 생성하고 외부 Tomcat 서버에 배포하는 방법:**

### 1. WAR 배포를 위한 Spring Boot 구성:

1. **`pom.xml` 수정:**

   - Spring Boot 프로젝트의 `pom.xml` 파일에서 `packaging`이 `war`로 설정되어 있는지 확인하세요. 또한 내장 Tomcat 종속성을 제외해야 합니다. 외부 Tomcat 서버를 사용할 것이기 때문입니다.

   ```xml
   <packaging>war</packaging>

   <!-- 내장 Tomcat 제외 -->
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-tomcat</artifactId>
       <scope>provided</scope>
   </dependency>
   ```

2. **`SpringBootServletInitializer` 상속:**

   - 주 애플리케이션 클래스에서 `SpringBootServletInitializer`를 상속하고 `configure` 메서드를 오버라이드하세요.

   ```java
   import org.springframework.boot.builder.SpringApplicationBuilder;
   import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

   public class YourApplication extends SpringBootServletInitializer {

       @Override
       protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
           return application.sources(YourApplication.class);
       }

       public static void main(String[] args) {
           SpringApplication.run(YourApplication.class, args);
       }
   }
   ```

### 2. WAR 파일 빌드:

Maven 또는 Gradle을 사용하여 WAR 파일을 빌드하세요:

**Maven:**

```bash
mvn clean package
```

**Gradle:**

```bash
./gradlew clean build
```

이렇게 하면 `target` (Maven) 또는 `build/libs` (Gradle) 디렉토리에 WAR 파일이 생성됩니다.

### 3. 외부 Tomcat 서버에 배포:

1. **WAR 파일 복사:**

   - 생성된 WAR 파일(e.g., `your-application.war`)을 Tomcat의 `webapps` 디렉토리로 복사하세요.

2. **Tomcat 시작:**

   - 외부 Tomcat 서버를 시작하세요. Tomcat의 `bin` 디렉토리에서 `startup.sh` 또는 `startup.bat` 스크립트를 실행하면 됩니다.

3. **애플리케이션 접근:**
   - Tomcat이 시작되면 Spring Boot 애플리케이션에 `http://localhost:8080/your-application-context`와 같은 주소로 액세스할 수 있어야 합니다. 여기서 `your-application-context`는 Tomcat에서 정의한 컨텍스트 경로입니다.

### 주의 사항:

- 외부 Tomcat 서버 버전이 Spring Boot 버전과 호환되는지 확인하세요.
- 문제가 발생하는 경우 Tomcat 로그(`logs/catalina.out` 또는 `logs/catalina.log`)에서 오류 메시지를 확인하세요.

이 프로세스를 통해 Spring Boot 애플리케이션을 WAR 파일로 빌드하고 외부 Tomcat 서버에 배포할 수 있습니다. 프로젝트 구조와 Tomcat 구성에 따라 경로 및 이름을 조정하세요.

<br>

---

<br>

**Q14. Spring Boot DevTools는 무엇에 사용되나요?**

**Spring Boot DevTools:**

Spring Boot DevTools는 Spring Boot 개발 시에 편의성을 제공하는 도구 세트입니다. 이는 애플리케이션의 개발 단계에서 자주 변경되는 코드를 빠르게 반영하고, 애플리케이션을 다시 시작하지 않고도 변경 사항을 적용할 수 있게 해줍니다.

DevTools가 제공하는 주요 기능은 다음과 같습니다:

1. **코드 변경 감지:**

   - DevTools는 클래스패스 상의 소스 코드 변경을 감지하고, 변경이 발생하면 자동으로 애플리케이션을 다시 시작합니다.

2. **자동 재시작:**

   - 코드나 리소스가 변경될 때, DevTools는 애플리케이션을 자동으로 다시 시작하여 변경 사항을 적용합니다. 이로써 불필요한 빌드 및 재배포 과정을 거치지 않아도 됩니다.

3. **LiveReload 지원:**

   - 브라우저의 LiveReload 플러그인과 함께 사용하여, 프론트엔드 리소스가 변경될 때 브라우저를 자동으로 새로 고침합니다.

4. **속성 변경 감지:**

   - `application.properties` 또는 `application.yml` 파일의 변경을 감지하고, 변경이 있으면 애플리케이션을 자동으로 다시 시작합니다.

5. **Remote 애플리케이션 지원:**
   - DevTools는 원격 환경에서도 동작할 수 있도록 설계되어 있어, 원격 서버에 변경된 코드를 전송하고 애플리케이션을 다시 시작할 수 있습니다.

Spring Boot DevTools는 주로 개발자들이 애플리케이션을 빠르게 수정하고 테스트하는 데 사용되며, 생산 환경에서는 비활성화될 것을 권장합니다. 이는 불필요한 리로딩이나 개발 중에만 필요한 기능이기 때문입니다. DevTools는 `spring-boot-devtools` 모듈을 통해 의존성으로 추가될 수 있습니다.

<br>

---

<br>

**Q15. Spring Boot에 보안 기능을 추가하고 보안 자동 구성에 대해 설명하세요.**

### Spring Boot에 보안 추가하기:

Spring Boot에서 보안을 추가하려면 주로 Spring Security를 사용합니다. Spring Security는 애플리케이션에 대한 인증과 권한 부여를 처리하는 강력한 보안 프레임워크입니다. 아래는 Spring Boot에서 보안을 추가하는 기본 단계입니다:

1. **의존성 추가:**

   - `spring-boot-starter-security` 의존성을 프로젝트에 추가합니다.

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   ```

2. **보안 구성:**

   - `SecurityConfig`와 같은 클래스를 만들어서 보안 구성을 정의합니다. 이 클래스는 `WebSecurityConfigurerAdapter`를 확장하고 `@EnableWebSecurity` 어노테이션을 사용하여 활성화합니다.

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
   import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

   @Configuration
   @EnableWebSecurity
   public class SecurityConfig extends WebSecurityConfigurerAdapter {

       @Override
       protected void configure(HttpSecurity http) throws Exception {
           http
               .authorizeRequests()
                   .antMatchers("/", "/home").permitAll()
                   .anyRequest().authenticated()
                   .and()
               .formLogin()
                   .loginPage("/login")
                   .permitAll()
                   .and()
               .logout()
                   .permitAll();
       }
   }
   ```

3. **사용자 정의 인증:**

   - 사용자 명과 비밀번호를 저장하고 관리하는 `UserDetailsService` 빈을 구현하여 사용자 정의 인증을 구성합니다.

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.security.core.userdetails.User;
   import org.springframework.security.core.userdetails.UserDetailsService;
   import org.springframework.security.core.userdetails.UsernameNotFoundException;
   import org.springframework.security.core.userdetails.UserDetails;
   import org.springframework.security.crypto.password.PasswordEncoder;

   @Configuration
   public class CustomUserDetailsService {

       @Bean
       public UserDetailsService userDetailsService() {
           return new UserDetailsService() {
               @Override
               public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                   // Load user details from your data store
                   return User.builder()
                           .username("user")
                           .password("{bcrypt}$2a$10$eVNkGsN8j3r2Dk9ObGCTaO3oC7Ayzv5blWdDsH6g9BWbvrXDbvq4W") // Encoded password
                           .roles("USER")
                           .build();
               }
           };
       }

       @Bean
       public PasswordEncoder passwordEncoder() {
           return new BCryptPasswordEncoder();
       }
   }
   ```

### 보안 자동 구성:

Spring Boot는 보안을 구성하는 데 도움이 되는 자동 구성을 제공합니다. 이는 `SecurityAutoConfiguration`을 통해 활성화됩니다. 보안 자동 구성은 다양한 설정 옵션을 제공하며, 대부분의 경우 사용자 지정이 필요 없이 자동으로 동작합니다. 개발자가 직접 구성을 하려면 `SecurityConfigurerAdapter`를 확장하거나 `SecurityConfigurer`를 구현할 수 있습니다. 예를 들어, `WebSecurityConfigurerAdapter`를 사용하여 HTTP 보안을 구성할 수 있습니다.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .addFilterBefore(new CustomFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
                .antMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permit
```

<br>

---

<br>

**Q16. Spring Boot 프로젝트에서 프로파일을 사용한 적이 있나요? 있다면 간단히 설명해주세요.**

### 프로파일(Profile) 사용:

프로파일은 Spring Boot 애플리케이션에서 다양한 환경 설정을 관리하고 선택하는 데 사용됩니다. 다양한 환경에서 동일한 코드베이스를 실행할 수 있도록 도와줍니다. 주로 `application.properties` 또는 `application.yml` 파일을 사용하여 프로파일별 설정을 정의합니다.

1. **프로파일 정의:**

   - `application.properties` 또는 `application.yml` 파일에 프로파일을 정의합니다. 예를 들어, `dev`와 `prod` 두 가지 프로파일을 정의하는 경우:

   ```yaml
   # application-dev.yml
   server:
     port: 8081
   ```

   ```yaml
   # application-prod.yml
   server:
     port: 8080
   ```

2. **프로파일 활성화:**

   - 애플리케이션을 실행할 때, 활성화할 프로파일을 명시적으로 지정하거나 `spring.profiles.active` 속성을 사용하여 활성화합니다. 예를 들어, `dev` 프로파일을 활성화하려면 다음과 같이 실행할 수 있습니다.

   ```bash
   java -jar your-application.jar --spring.profiles.active=dev
   ```

   또는 `application.properties` 또는 `application.yml` 파일에 다음과 같이 설정할 수도 있습니다.

   ```yaml
   spring:
     profiles:
       active: dev
   ```

3. **프로파일별 설정 사용:**

   - 코드에서 `@Value`나 `@ConfigurationProperties` 어노테이션을 사용하여 프로파일별로 다른 설정을 주입받을 수 있습니다.

   ```java
   @Component
   @ConfigurationProperties("server")
   public class ServerConfig {

       private int port;

       // Getter and Setter
   }
   ```

   ```java
   @Service
   public class MyService {

       @Value("${server.port}")
       private int port;

       // ...
   }
   ```

프로파일은 개발, 테스트, 운영 등의 다양한 환경에서 설정을 유연하게 관리하는 데 도움이 됩니다. Spring Boot는 다양한 방식으로 프로파일을 활성화하고 사용할 수 있도록 다양한 기능을 제공합니다.
