---
title: "[Springboot] Spring and Spring Boot Annotations"
layout: post
subtitle: Spring
date: "2024-01-28-01:58:53 +0900"
categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

Spring 및 Spring Boot는 애플리케이션의 구성 및 개발을 간소화하기 위해 주석(Annotations)을 널리 활용합니다. 다음은 Spring 및 Spring Boot에서 자주 사용되는 25개 이상의 주석입니다.

### 핵심 Spring 주석:

1. **@ComponentScan:** Spring이 빈을 찾고 등록하기 위해 구성 요소 스캔을 구성합니다.
2. **@Configuration:** 클래스가 하나 이상의 `@Bean` 메서드를 선언하고 Spring 컨테이너에서 빈 정의를 생성할 수 있음을 나타냅니다.
3. **@Bean:** `@Configuration` 클래스 내의 메서드에 사용되어 빈을 정의합니다.

4. **@Autowired:** 빈의 자동 의존성 주입에 사용됩니다.

5. **@Qualifier:** `@Autowired`와 함께 사용되어 주입할 정확한 빈을 지정합니다.

6. **@Primary:** 동일한 타입의 여러 빈이 있는 경우 기본 빈을 나타냅니다.

7. **@Value:** 속성 파일이나 환경 변수에서 값을 필드에 주입합니다.

8. **@Scope:** 빈의 범위를 지정합니다(싱글톤, 프로토타입 등).

### Spring MVC 주석:

9. **@Controller:** 클래스를 Spring MVC 컨트롤러로 표시합니다.

10. **@RequestMapping:** HTTP 요청을 핸들러 메서드에 매핑합니다.

11. **@PathVariable:** URI 템플릿에서 값을 추출합니다.

12. **@RequestParam:** 요청 매개변수를 메서드 매개변수에 바인딩합니다.

13. **@ModelAttribute:** 메서드 매개변수를 모델 속성에 바인딩합니다.

14. **@ResponseBody:** 메서드 반환 값을 웹 응답 본문에 바인딩합니다.

15. **@ResponseStatus:** 응답 상태 코드를 설정합니다.

16. **@ExceptionHandler:** 컨트롤러 수준에서 예외를 처리합니다.

### Spring Boot 주석:

17. **@SpringBootApplication:** `@Configuration`, `@ComponentScan`, 및 `@EnableAutoConfiguration`을 결합합니다.

18. **@EnableAutoConfiguration:** Spring Boot의 자동 구성 메커니즘을 활성화합니다.

19. **@SpringBootConfiguration:** `@Configuration`과 유사하게 클래스를 구성 클래스로 지정합니다.

20. **@EnableWebMvc:** Spring Boot 애플리케이션에서 Spring MVC 구성을 활성화합니다.

21. **@EnableJpaRepositories:** Spring Data JPA 저장소를 활성화합니다.

22. **@EntityScan:** JPA 엔티티를 스캔할 기본 패키지를 지정합니다.

23. **@EnableTransactionManagement:** Spring의 주석 기반 트랜잭션 관리를 활성화합니다.

24. **@SpringBootTest:** Spring Boot 환경에서 통합 테스트에 사용됩니다.

25. **@Profile:** 활성 프로필에 따라 어떤 빈을 생성할지를 지정합니다.

26. **@ConditionalOnProperty:** 구성 속성의 존재나 값에 따라 빈 또는 구성을 활성화합니다.

27. **@ConditionalOnClass:** 클래스의 존재에 따라 빈 또는 구성을 활성화합니다.

이러한 주석은 XML 구성의 필요성을 줄이고 Spring 및 Spring Boot 애플리케이션에서 구성 및 종속성을 더 간결하고 읽기 쉬운 방식으로 표현하는 데 도움이 됩니다.

<br>

---

<br>

#### @Component Annotation

`@Component` 어노테이션은 Spring 프레임워크에서 컴포넌트 스캔을 통해 빈으로 등록될 수 있는 클래스를 표시합니다. 이 어노테이션을 사용하면 해당 클래스가 Spring IoC 컨테이너에 의해 자동으로 감지되고 빈으로 등록됩니다.

간단히 말해, `@Component` 어노테이션을 사용하면 해당 클래스가 Spring 애플리케이션 컨텍스트에서 관리되는 빈으로 등록되어 다른 빈들과 협력할 수 있게 됩니다.

예를 들어:

```java
import org.springframework.stereotype.Component;

@Component
public class MyComponent {

    // 클래스 내용...

}
```

위의 코드에서 `MyComponent` 클래스는 `@Component` 어노테이션을 사용하여 Spring에서 관리되는 빈으로 등록됩니다. 이제 이 클래스의 인스턴스는 다른 클래스에서 `@Autowired`를 사용하여 주입받을 수 있습니다.

`@Component` 어노테이션은 다음과 같은 하위 어노테이션들도 가지고 있습니다:

- `@Repository`: 데이터 액세스 계층(DAO)의 구현체에 사용됩니다.
- `@Service`: 비즈니스 로직(Service) 구현체에 사용됩니다.
- `@Controller`: Spring MVC 컨트롤러에 사용됩니다.

이들은 모두 `@Component`를 확장하고 있으며, 특정 계층에 맞게 명명된 어노테이션들입니다. 각 어노테이션은 컴포넌트 스캔을 통해 해당 계층의 빈으로 등록됩니다.

<br>

---

<br>

#### @Autowired Annotation

`@Autowired` 어노테이션은 Spring에서 자동 의존성 주입을 수행하는데 사용됩니다. 이 어노테이션을 사용하면 Spring IoC 컨테이너가 해당 타입의 빈을 찾아 자동으로 필드, 메서드, 또는 생성자에 주입합니다.

`@Autowired`를 사용하는 주된 목적은 빈 간의 의존성을 명시적으로 설정하지 않고, Spring이 자동으로 연결해주도록 하는 것입니다.

다양한 위치에서 `@Autowired`를 사용할 수 있습니다:

1. **필드 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;

   @Service
   public class MyService {
       @Autowired
       private MyRepository myRepository;

       // 나머지 클래스 내용...
   }
   ```

2. **메서드 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;

   @Service
   public class MyService {
       private MyRepository myRepository;

       @Autowired
       public void setMyRepository(MyRepository myRepository) {
           this.myRepository = myRepository;
       }

       // 나머지 클래스 내용...
   }
   ```

3. **생성자 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;

   @Service
   public class MyService {
       private final MyRepository myRepository;

       @Autowired
       public MyService(MyRepository myRepository) {
           this.myRepository = myRepository;
       }

       // 나머지 클래스 내용...
   }
   ```

`@Autowired`를 사용하면 해당 타입의 빈이 없거나 여러 개인 경우에도 Spring이 자동으로 의존성을 해결하려고 시도합니다. 그러나 경우에 따라서는 `@Qualifier`나 `@Primary`와 같은 추가적인 어노테이션을 사용하여 명시적으로 의존성을 해결해야 할 수도 있습니다.

<br>

---

<br>

#### @Qualifier Annotation

`@Qualifier` 어노테이션은 Spring에서 여러 빈 중에서 특정 빈을 지정하여 의존성을 주입할 때 사용됩니다. `@Autowired`와 함께 사용되며, 한정자(Qualifier) 역할을 수행하여 어떤 빈이 주입될지를 명시적으로 지정합니다.

아래는 `@Qualifier` 어노테이션의 사용 예시입니다:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    private final MyRepository myRepository;

    @Autowired
    public MyService(@Qualifier("myJpaRepository") MyRepository myRepository) {
        this.myRepository = myRepository;
    }

    // 나머지 클래스 내용...
}
```

이 예제에서 `@Qualifier("myJpaRepository")`는 `MyRepository` 타입의 빈 중에서 이름이 "myJpaRepository"인 빈을 주입하도록 지정하고 있습니다.

`@Qualifier`는 주로 여러 구현체를 가진 인터페이스나 추상 클래스를 사용하는 상황에서 유용하게 쓰입니다. 또는 특정한 이름을 가진 빈을 선택적으로 주입할 때 활용됩니다.

구체적인 빈의 이름을 `@Qualifier`에 지정하는 방식 외에도, 빈의 이름이나 다른 속성을 이용하여 한정자를 설정할 수 있습니다.

<br>

---

<br>

#### @Primary Annotation

`@Primary` 어노테이션은 Spring에서 여러 개의 동일한 타입의 빈이 등록되어 있을 때, 해당 빈을 주 우선적으로 선택하도록 지정하는데 사용됩니다. `@Autowired`와 함께 사용되며, 명시적인 한정자(`@Qualifier`) 없이 여러 빈 중에서 우선적으로 선택하고자 할 때 유용합니다.

아래는 `@Primary` 어노테이션의 사용 예시입니다:

```java
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Repository
@Primary
public class MyJpaRepository implements MyRepository {
    // MyRepository 인터페이스의 구현체
}
```

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    private final MyRepository myRepository;

    @Autowired
    public MyService(MyRepository myRepository) {
        this.myRepository = myRepository;
    }

    // 나머지 클래스 내용...
}
```

이 경우 `MyService`에서 `MyRepository`를 주입받을 때, `@Primary` 어노테이션이 붙은 `MyJpaRepository`가 주입됩니다.

`@Primary`는 특정 타입의 빈이 여러 개 등록되어 있을 때, 해당 타입의 빈 중에서 우선적으로 선택하도록 하는 간편한 방법을 제공합니다.

<br>

---

<br>

#### @Bean and @Configuration Annotations

`@Bean`과 `@Configuration` 어노테이션은 Spring에서 JavaConfig를 통해 빈을 정의하는 데 사용됩니다.

### `@Bean` 어노테이션

`@Bean` 어노테이션은 메서드 레벨에서 사용되며, 해당 메서드가 생성한 객체를 Spring 컨테이너의 빈으로 등록합니다. 이 어노테이션을 사용하면 XML 설정 파일 없이도 자바 코드를 통해 빈을 등록할 수 있습니다.

예를 들어:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyConfiguration {

    @Bean
    public MyBean myBean() {
        return new MyBean();
    }
}
```

위의 코드에서 `myBean()` 메서드가 생성한 `MyBean` 객체는 Spring 컨테이너에서 빈으로 사용됩니다.

### `@Configuration` 어노테이션

`@Configuration` 어노테이션은 클래스 레벨에서 사용되며, 해당 클래스를 설정 클래스로 지정합니다. 설정 클래스는 하나 이상의 `@Bean` 어노테이션이 있는 메서드를 가질 수 있고, 이러한 빈들은 Spring 컨테이너에 등록됩니다.

예를 들어:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyConfiguration {

    @Bean
    public MyBean myBean() {
        return new MyBean();
    }

    @Bean
    public AnotherBean anotherBean() {
        return new AnotherBean();
    }
}
```

위의 코드에서 `MyConfiguration` 클래스는 `@Configuration` 어노테이션으로 표시되었으며, `myBean()`과 `anotherBean()` 메서드가 각각 빈을 생성합니다.

이렇게 설정된 클래스를 사용하면 `@Bean`으로 정의된 빈들이 자동으로 Spring 컨테이너에 등록되고 관리됩니다. 설정 클래스를 사용함으로써 XML 설정 파일을 대체하고, 자바 기반의 설정을 통해 애플리케이션 컨텍스트를 구성할 수 있습니다.

<br>

---

<br>

#### @Controller, @Service and @Repository

`@Controller`, `@Service`, 그리고 `@Repository` 어노테이션들은 Spring에서 각각 웹 컨트롤러, 서비스, 그리고 데이터 액세스 계층(Repository)에 해당하는 클래스임을 나타내는데 사용됩니다.

1. **`@Controller` 어노테이션:**

   - `@Controller` 어노테이션은 Spring MVC에서 컨트롤러 클래스를 나타냅니다.
   - 웹 애플리케이션에서 클라이언트의 요청을 처리하고, 해당 요청에 대한 응답을 생성하는 역할을 합니다.
   - 주로 사용자 인터페이스와 상호작용하는 부분을 담당합니다.

   예를 들어:

   ```java
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.GetMapping;

   @Controller
   public class MyController {

       @GetMapping("/home")
       public String home() {
           return "home";
       }
   }
   ```

2. **`@Service` 어노테이션:**

   - `@Service` 어노테이션은 비즈니스 로직을 처리하는 서비스 클래스를 나타냅니다.
   - 주로 애플리케이션의 비즈니스 로직을 구현하고, 이를 컨트롤러에서 호출하여 사용합니다.

   예를 들어:

   ```java
   import org.springframework.stereotype.Service;

   @Service
   public class MyService {

       public String getMessage() {
           return "Hello from the service!";
       }
   }
   ```

3. **`@Repository` 어노테이션:**

   - `@Repository` 어노테이션은 데이터 액세스 계층의 구현체인 리포지토리 클래스를 나타냅니다.
   - 주로 데이터베이스와의 상호작용을 담당하며, 데이터베이스에서 데이터를 가져오거나 저장하는 역할을 수행합니다.

   예를 들어:

   ```java
   import org.springframework.data.repository.CrudRepository;
   import org.springframework.stereotype.Repository;

   @Repository
   public interface MyRepository extends CrudRepository<MyEntity, Long> {
       // 리포지토리 메서드들...
   }
   ```

   위의 코드에서 `MyRepository`는 Spring Data JPA에서 제공하는 `CrudRepository`를 상속하며, 데이터베이스와 상호작용하는 메서드를 제공합니다.

이러한 어노테이션들은 주로 Spring의 컴포넌트 스캔과 함께 사용되어 자동으로 빈으로 등록되고, 애플리케이션 컨텍스트에서 관리되도록 도와줍니다.

<br>

---

<br>

#### @Lazy Annotation

`@Lazy` 어노테이션은 Spring에서 빈의 지연 로딩(Lazy Loading)을 지정할 때 사용됩니다. 지연 로딩은 빈이 처음으로 요청될 때까지 해당 빈을 초기화하지 않고 기다리는 것을 의미합니다. 이를 통해 애플리케이션 시작 시간을 최적화하고 성능을 향상시킬 수 있습니다.

일반적으로, Spring은 모든 빈을 애플리케이션 컨텍스트가 시작될 때 초기화하고 설정합니다. 그러나 `@Lazy` 어노테이션을 사용하면 특정 빈이 필요한 시점에만 초기화되도록 설정할 수 있습니다.

예를 들어:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class MyConfiguration {

    @Lazy
    @Bean
    public MyBean myBean() {
        return new MyBean();
    }
}
```

위의 코드에서 `@Lazy` 어노테이션이 `myBean()` 메서드에 적용되었습니다. 이로써 `MyBean`은 해당 빈이 처음으로 요청될 때까지 초기화되지 않습니다.

`@Lazy` 어노테이션은 다양한 위치에서 사용될 수 있습니다. 필드, 메서드, 또는 클래스 레벨에 적용할 수 있으며, 지연 로딩을 적용하고자 하는 빈에 따라 선택적으로 사용됩니다.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    @Lazy
    @Autowired
    private MyLazyBean myLazyBean;

    // 나머지 클래스 내용...
}
```

위의 코드에서 `MyService` 클래스의 `myLazyBean` 필드에 `@Lazy` 어노테이션이 적용되었습니다. 이로써 `myLazyBean`은 필요한 시점에 초기화됩니다.

<br>

---

<br>

#### @Scope Annotation

`@Scope` 어노테이션은 Spring에서 빈의 범위(Scope)를 지정하는데 사용됩니다. 빈의 범위는 해당 빈 인스턴스의 생명주기와 관련이 있습니다. Spring에서는 다양한 범위를 제공하며, `@Scope` 어노테이션을 통해 설정할 수 있습니다.

가장 흔히 사용되는 빈의 범위는 다음과 같습니다:

1. **Singleton (기본값):**

   - `@Scope("singleton")` 또는 간단히 `@Scope`만 사용하면 기본적으로 싱글톤 범위가 적용됩니다.
   - 하나의 Spring 컨테이너에서 오직 하나의 빈 인스턴스만 생성되고, 이를 공유합니다.

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;

   @Configuration
   public class MyConfiguration {

       @Bean
       public MyBean myBean() {
           return new MyBean();
       }
   }
   ```

2. **Prototype:**

   - `@Scope("prototype")`으로 설정하면 매번 새로운 빈 인스턴스가 생성됩니다.
   - 각각의 빈 인스턴스는 독립적인 생명주기를 가지며, 요청할 때마다 새로운 인스턴스가 생성됩니다.

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.context.annotation.Scope;

   @Configuration
   public class MyConfiguration {

       @Bean
       @Scope("prototype")
       public MyBean myBean() {
           return new MyBean();
       }
   }
   ```

3. **Request, Session, Global Session (웹 환경에서):**

   - 웹 애플리케이션에서는 `request`, `session`, `globalSession`과 같은 범위도 사용할 수 있습니다.

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.context.annotation.Scope;

   @Configuration
   public class MyConfiguration {

       @Bean
       @Scope("request")
       public MyRequestScopedBean myRequestScopedBean() {
           return new MyRequestScopedBean();
       }

       @Bean
       @Scope("session")
       public MySessionScopedBean mySessionScopedBean() {
           return new MySessionScopedBean();
       }

       @Bean
       @Scope("globalSession")
       public MyGlobalSessionScopedBean myGlobalSessionScopedBean() {
           return new MyGlobalSessionScopedBean();
       }
   }
   ```

`@Scope` 어노테이션은 빈의 범위를 지정하는 중요한 도구이며, 애플리케이션의 요구에 따라 적절한 범위를 선택하는 것이 중요합니다.

<br>

---

<br>

#### @Value Annotation

`@Value` 어노테이션은 Spring에서 프로퍼티 값을 주입하는데 사용됩니다. 이 어노테이션을 사용하면 XML이나 JavaConfig 설정 파일에서 정의한 프로퍼티 값을 빈의 필드에 주입할 수 있습니다.

1. **리터럴 값 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   @Component
   public class MyComponent {

       @Value("Hello, Spring!")
       private String greeting;

       // 나머지 클래스 내용...
   }
   ```

   위의 예제에서 `greeting` 필드에는 "Hello, Spring!"이라는 문자열이 주입됩니다.

2. **프로퍼티 파일 값 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   @Component
   public class MyComponent {

       @Value("${my.property}")
       private String myProperty;

       // 나머지 클래스 내용...
   }
   ```

   위의 예제에서 `myProperty` 필드에는 `my.property`이라는 키를 가진 프로퍼티 파일의 값이 주입됩니다.

3. **환경 변수 값 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   @Component
   public class MyComponent {

       @Value("${MY_ENV_VARIABLE}")
       private String myEnvVariable;

       // 나머지 클래스 내용...
   }
   ```

   위의 예제에서 `myEnvVariable` 필드에는 환경 변수 `MY_ENV_VARIABLE`의 값이 주입됩니다.

4. **스프링 표현식 사용:**

   ```java
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   @Component
   public class MyComponent {

       @Value("#{systemProperties['java.version']}")
       private String javaVersion;

       // 나머지 클래스 내용...
   }
   ```

   위의 예제에서 `javaVersion` 필드에는 스프링 표현식을 사용하여 시스템 속성 중 `java.version`의 값이 주입됩니다.

`@Value` 어노테이션은 다양한 소스에서 값을 주입받을 수 있기 때문에 유연하게 사용할 수 있습니다. 이를 통해 설정 정보를 외부 파일에서 관리하거나, 프로퍼티 값에 따라 동적으로 빈을 설정하는 등 다양한 시나리오에서 활용할 수 있습니다.

<br>

---

<br>

#### @PropertySource and PropertySources Annotations

`@PropertySource` 어노테이션은 외부 프로퍼티 파일을 로드하여 Spring 환경 설정에 사용할 수 있도록 도와주는데 사용됩니다. `@PropertySources` 어노테이션은 여러 개의 `@PropertySource` 어노테이션을 사용하여 여러 프로퍼티 파일을 로드할 때 사용됩니다.

### `@PropertySource` 어노테이션:

`@PropertySource` 어노테이션을 사용하면 특정한 프로퍼티 파일을 로드하여 환경 속성으로 사용할 수 있습니다. 이 어노테이션을 사용하려면 `@Configuration` 어노테이션이 지정된 클래스에서 사용해야 합니다.

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig {
    // 설정 클래스 내용...
}
```

위의 예제에서 `application.properties` 파일은 classpath 상에 위치하고 있으며, 해당 파일의 속성들은 환경 변수 또는 `@Value` 어노테이션 등을 통해 주입될 수 있습니다.

### `@PropertySources` 어노테이션:

`@PropertySources` 어노테이션을 사용하면 여러 개의 프로퍼티 파일을 로드할 수 있습니다. 배열 형태로 여러 `@PropertySource` 어노테이션을 지정합니다.

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@Configuration
@PropertySources({
    @PropertySource("classpath:config/application.properties"),
    @PropertySource("file:/etc/myapp/config.properties")
})
public class AppConfig {
    // 설정 클래스 내용...
}
```

위의 예제에서는 `classpath:config/application.properties`와 `file:/etc/myapp/config.properties` 두 개의 프로퍼티 파일을 로드하고 있습니다.

이러한 어노테이션들을 사용하여 외부의 프로퍼티 파일을 로드하면 애플리케이션의 설정을 외부화하여 유지보수 및 확장성을 향상시킬 수 있습니다.

<br>

---

<br>

#### @ConfigurationProperties Annotation

`@ConfigurationProperties` 어노테이션은 외부 프로퍼티 파일이나 환경 변수로부터 값을 바인딩하여 Java 객체에 주입하는데 사용됩니다. 이를 통해 YAML 또는 Properties 형식의 설정 파일의 값을 편리하게 사용할 수 있습니다.

### 기본 사용:

1. **Java 클래스 생성:**

   ```java
   import org.springframework.boot.context.properties.ConfigurationProperties;
   import org.springframework.stereotype.Component;

   @Component
   @ConfigurationProperties(prefix = "myapp")
   public class MyAppProperties {

       private String property1;
       private int property2;

       // 게터, 세터 메서드...

   }
   ```

   위의 코드에서 `@ConfigurationProperties` 어노테이션은 `myapp` 접두사를 가진 프로퍼티들을 바인딩합니다. 예를 들어, `myapp.property1`과 `myapp.property2`에 해당하는 설정 값을 바인딩할 수 있습니다.

2. **application.properties 또는 application.yml 파일 작성:**

   ```properties
   myapp.property1=Hello
   myapp.property2=42
   ```

   또는 YAML 형식:

   ```yaml
   myapp:
     property1: Hello
     property2: 42
   ```

3. **프로퍼티 값 주입:**

   ```java
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;

   @Service
   public class MyService {

       private final MyAppProperties myAppProperties;

       @Autowired
       public MyService(MyAppProperties myAppProperties) {
           this.myAppProperties = myAppProperties;
       }

       public void printProperties() {
           System.out.println("Property 1: " + myAppProperties.getProperty1());
           System.out.println("Property 2: " + myAppProperties.getProperty2());
       }
   }
   ```

   이제 `MyService` 클래스에서 `MyAppProperties` 빈을 주입받아 설정된 프로퍼티 값을 사용할 수 있습니다.

### 추가 설정:

- `@ConfigurationProperties` 어노테이션은 `prefix` 속성으로 프로퍼티의 접두사를 지정할 수 있습니다.
- 필드 레벨에 `@Value` 어노테이션을 사용하여 디폴트 값을 설정할 수 있습니다.
- `@Configuration` 클래스에서 `@EnableConfigurationProperties` 어노테이션을 사용하여 빈으로 등록할 클래스를 명시적으로 지정할 수 있습니다.

```java
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(MyAppProperties.class)
public class MyConfiguration {
    // 추가 구성 내용...
}
```

`@ConfigurationProperties`를 사용하면 외부 설정 값을 객체로 바인딩하여 사용할 수 있으므로, 설정이나 환경 변수를 편리하게 다룰 수 있습니다.

<br>

---

<br>

#### @Controller and @ResponseBody Annotations

`@Controller`와 `@ResponseBody` 어노테이션은 Spring MVC에서 웹 애플리케이션의 컨트롤러를 정의하고, HTTP 응답의 내용을 직접 반환하는 데 사용됩니다.

### `@Controller` 어노테이션:

`@Controller` 어노테이션은 Spring MVC에서 컨트롤러 클래스를 정의하는 데 사용됩니다. 이 어노테이션을 사용하면 해당 클래스가 웹 애플리케이션의 컨트롤러로 동작하게 됩니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/hello")
    public String sayHello() {
        return "hello";
    }
}
```

위의 예제에서 `/hello` 경로에 대한 GET 요청을 처리하는 컨트롤러가 정의되어 있습니다.

### `@ResponseBody` 어노테이션:

`@ResponseBody` 어노테이션은 컨트롤러 메서드가 직접 HTTP 응답의 내용을 생성하여 반환하도록 지정합니다. 주로 JSON이나 XML과 같은 데이터를 반환할 때 사용됩니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @GetMapping("/hello")
    @ResponseBody
    public String sayHello() {
        return "Hello, World!";
    }
}
```

위의 예제에서 `/hello` 경로에 대한 GET 요청을 처리하는데, `@ResponseBody` 어노테이션을 사용하여 직접 문자열 "Hello, World!"을 HTTP 응답의 본문으로 반환하고 있습니다.

`@ResponseBody`를 사용하면 일반적으로 뷰 리졸버를 거치지 않고, 직접 HTTP 응답의 내용을 작성할 수 있습니다. 이는 RESTful 웹 서비스에서 데이터를 반환하는 데 자주 사용됩니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @GetMapping("/json")
    @ResponseBody
    public MyObject getJsonData() {
        MyObject myObject = new MyObject();
        myObject.setName("John");
        myObject.setAge(30);
        return myObject;
    }
}
```

위의 예제에서는 `@ResponseBody`를 사용하여 JSON 형식의 데이터를 직접 반환하고 있습니다. 반환되는 객체는 Spring에서 자동으로 JSON으로 변환됩니다.

<br>

---

<br>

#### @RestController Annotation

`@RestController` 어노테이션은 Spring MVC에서 컨트롤러를 정의할 때 사용되며, `@Controller`와 `@ResponseBody` 어노테이션을 합친 것과 같은 역할을 합니다. 즉, `@RestController`를 사용하면 컨트롤러의 모든 메서드에서 `@ResponseBody`를 사용하는 것과 동일한 효과를 얻을 수 있습니다.

기존의 `@Controller` 어노테이션은 주로 뷰를 반환하는 컨트롤러에 사용되었지만, RESTful 웹 서비스에서는 JSON 또는 XML과 같은 데이터를 반환하는 경우가 더 많습니다. `@RestController`는 이러한 RESTful 서비스를 간편하게 구현할 수 있도록 도와줍니다.

간단한 예제를 살펴보겠습니다:

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyRestController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

    @GetMapping("/json")
    public MyObject getJsonData() {
        MyObject myObject = new MyObject();
        myObject.setName("John");
        myObject.setAge(30);
        return myObject;
    }
}
```

위의 예제에서 `@RestController`를 사용하여 `/hello` 경로에 대한 문자열과 `/json` 경로에 대한 JSON 데이터를 반환하는 RESTful 컨트롤러를 정의하고 있습니다.

`@RestController`를 사용하면 각 메서드에 `@ResponseBody`를 추가할 필요 없이, 모든 메서드가 기본적으로 HTTP 응답의 본문으로 데이터를 직접 반환합니다. 이는 특히 RESTful 웹 서비스에서 간결하고 간편한 구현을 가능하게 합니다.

<br>

---

<br>

#### @RequestMapping Annotation

`@RequestMapping` 어노테이션은 Spring MVC에서 요청 URL과 컨트롤러 메서드를 매핑하는 데 사용됩니다. 이 어노테이션은 클래스 레벨 또는 메서드 레벨에서 사용할 수 있으며, 특정 URL 패턴에 대한 요청이 들어올 때 어떤 메서드가 실행될지를 지정합니다.

### 기본 사용:

1. **클래스 레벨에서 `@RequestMapping` 사용:**

   ```java
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;

   @Controller
   @RequestMapping("/example")
   public class MyController {

       @RequestMapping("/hello")
       public String sayHello() {
           return "hello";
       }

       @RequestMapping(value = "/greet", method = RequestMethod.GET)
       public String greet() {
           return "greet";
       }
   }
   ```

   위의 예제에서 `/example` 경로에 대한 요청은 `MyController` 클래스 내의 모든 메서드에서 처리됩니다. 예를 들어, `/example/hello`는 `sayHello()` 메서드에, `/example/greet`는 `greet()` 메서드에 매핑됩니다.

2. **메서드 레벨에서 `@RequestMapping` 사용:**

   ```java
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;

   @Controller
   public class MyController {

       @RequestMapping(value = "/hello", method = RequestMethod.GET)
       public String sayHello() {
           return "hello";
       }

       @RequestMapping(value = "/greet", method = RequestMethod.GET)
       public String greet() {
           return "greet";
       }
   }
   ```

   위의 예제에서는 클래스 레벨에서 `@RequestMapping`을 사용하지 않고, 각 메서드마다 직접 지정하고 있습니다. 따라서 `/hello`와 `/greet`는 클래스 레벨의 URL 패턴을 무시하고 각각의 메서드에 직접 매핑됩니다.

### 다양한 매핑 옵션:

- `value` 또는 `path`: 요청 URL 패턴을 지정합니다.
- `method`: HTTP 메서드를 지정합니다. 기본값은 모든 메서드를 허용하는 `RequestMethod.GET`입니다.
- `params`: 요청 파라미터를 지정합니다.
- `headers`: 요청 헤더를 지정합니다.
- `consumes`: 컨텐츠 타입을 지정합니다.
- `produces`: 응답 컨텐츠 타입을 지정합니다.

다양한 매핑 옵션을 통해 특정 URL 패턴에 대한 요청을 특정 메서드에 매핑하거나, 요청 메서드, 파라미터, 헤더, 컨텐츠 타입에 따라 메서드를 선택적으로 실행할 수 있습니다.

<br>

---

<br>

#### @GetMapping Annotation

`@GetMapping` 어노테이션은 Spring MVC에서 HTTP GET 요청에 대한 매핑을 지정하는데 사용됩니다. 이 어노테이션은 `@RequestMapping` 어노테이션의 축약형이며, GET 메서드에 대한 요청만을 처리하는 메서드에 사용됩니다.

### 기본 사용:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/hello")
    public String sayHello() {
        return "hello";
    }
}
```

위의 예제에서 `/hello` 경로에 대한 GET 요청이 들어오면 `sayHello()` 메서드가 실행됩니다.

### 다양한 매핑 옵션:

`@GetMapping`은 `@RequestMapping`의 GET 메서드에 대한 축약형이므로, 다양한 매핑 옵션들을 사용할 수 있습니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    @GetMapping("/greet")
    public String greet() {
        return "greet";
    }

    @GetMapping("/welcome")
    public String welcome(@RequestParam(name = "name", defaultValue = "Guest") String name) {
        return "welcome";
    }
}
```

위의 예제에서 `/greet`와 `/welcome` 경로에 대한 GET 요청을 처리하는 메서드들이 정의되어 있습니다. 또한, `@RequestParam` 어노테이션을 사용하여 쿼리 파라미터를 받아오는 예제도 있습니다.

`@GetMapping`을 사용하면 HTTP GET 요청에 대한 매핑을 간편하게 정의할 수 있습니다. 이는 주로 RESTful 웹 서비스에서 자주 사용되며, 메서드명과 URL 경로가 일치하는 간결한 구현을 가능하게 합니다.

<br>

---

<br>

#### @PostMapping and @RequestBody Annotations

`@PostMapping` 어노테이션은 Spring MVC에서 HTTP POST 요청에 대한 매핑을 지정하는데 사용됩니다. 이 어노테이션은 `@RequestMapping`의 POST 메서드에 대한 축약형이며, POST 메서드에 대한 요청만을 처리하는 메서드에 사용됩니다.

`@RequestBody` 어노테이션은 HTTP 요청의 본문(body)을 Java 객체로 매핑하는데 사용됩니다. 이는 주로 POST 요청에서 클라이언트가 JSON 또는 XML 형식으로 데이터를 전송할 때 사용됩니다.

### `@PostMapping` 기본 사용:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MyController {

    @PostMapping("/submit")
    public String submitForm(@RequestBody MyFormData formData) {
        // 폼 데이터 처리 로직...
        return "success";
    }
}
```

위의 예제에서 `/submit` 경로에 대한 POST 요청을 처리하는 `submitForm` 메서드가 정의되어 있습니다. `@RequestBody` 어노테이션을 사용하여 요청의 본문을 `MyFormData` 객체로 매핑하고, 이를 이용하여 폼 데이터를 처리합니다.

### `@RequestBody`와 JSON 데이터:

`@RequestBody`는 주로 JSON 데이터를 매핑할 때 사용됩니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MyController {

    @PostMapping("/addUser")
    public String addUser(@RequestBody User user) {
        // 사용자 추가 로직...
        return "userAdded";
    }
}
```

위의 예제에서 `/addUser` 경로에 대한 POST 요청을 처리하는 `addUser` 메서드가 정의되어 있습니다. `@RequestBody` 어노테이션을 사용하여 요청의 JSON 본문을 `User` 객체로 매핑하고, 이를 이용하여 사용자를 추가하는 로직을 구현합니다.

`@RequestBody`를 사용하면 클라이언트가 요청 본문에 JSON 또는 XML 형식으로 데이터를 전송할 때, 이를 자바 객체로 쉽게 변환할 수 있습니다.

<br>

---

<br>

#### @PutMapping Annotation

`@PutMapping` 어노테이션은 Spring MVC에서 HTTP PUT 요청에 대한 매핑을 지정하는데 사용됩니다. 이 어노테이션은 `@RequestMapping`의 PUT 메서드에 대한 축약형이며, PUT 메서드에 대한 요청만을 처리하는 메서드에 사용됩니다.

### 기본 사용:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MyController {

    @PutMapping("/updateUser")
    public String updateUser(@RequestBody UpdatedUser updatedUser) {
        // 사용자 업데이트 로직...
        return "userUpdated";
    }
}
```

위의 예제에서 `/updateUser` 경로에 대한 PUT 요청을 처리하는 `updateUser` 메서드가 정의되어 있습니다. `@RequestBody` 어노테이션을 사용하여 요청의 본문을 `UpdatedUser` 객체로 매핑하고, 이를 이용하여 사용자를 업데이트하는 로직을 구현합니다.

### `@RequestBody`와 JSON 데이터:

`@RequestBody` 어노테이션은 주로 JSON 데이터를 매핑할 때 사용됩니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MyController {

    @PutMapping("/updateProduct")
    public String updateProduct(@RequestBody Product updatedProduct) {
        // 제품 업데이트 로직...
        return "productUpdated";
    }
}
```

위의 예제에서 `/updateProduct` 경로에 대한 PUT 요청을 처리하는 `updateProduct` 메서드가 정의되어 있습니다. `@RequestBody` 어노테이션을 사용하여 요청의 JSON 본문을 `Product` 객체로 매핑하고, 이를 이용하여 제품을 업데이트하는 로직을 구현합니다.

`@PutMapping`을 사용하면 HTTP PUT 요청에 대한 매핑을 간편하게 정의할 수 있습니다. 이는 주로 RESTful 웹 서비스에서 자주 사용되며, 메서드명과 URL 경로가 일치하는 간결한 구현을 가능하게 합니다.

<br>

---

<br>

#### @DeleteMapping Annotation

`@DeleteMapping` 어노테이션은 Spring MVC에서 HTTP DELETE 요청에 대한 매핑을 지정하는데 사용됩니다. 이 어노테이션은 `@RequestMapping`의 DELETE 메서드에 대한 축약형이며, DELETE 메서드에 대한 요청만을 처리하는 메서드에 사용됩니다.

### 기본 사용:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MyController {

    @DeleteMapping("/deleteUser/{userId}")
    public String deleteUser(@PathVariable Long userId) {
        // 사용자 삭제 로직...
        return "userDeleted";
    }
}
```

위의 예제에서 `/deleteUser/{userId}` 경로에 대한 DELETE 요청을 처리하는 `deleteUser` 메서드가 정의되어 있습니다. `@PathVariable` 어노테이션을 사용하여 경로 변수로 전달된 `userId`를 사용하여 사용자를 삭제하는 로직을 구현합니다.

### `@PathVariable` 사용:

`@PathVariable` 어노테이션은 URL 경로 변수를 메서드 파라미터로 받아올 때 사용됩니다. 위의 예제에서 `{userId}`는 경로 변수로, DELETE 요청 시 해당 변수의 값이 `userId` 파라미터로 전달됩니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MyController {

    @DeleteMapping("/deleteProduct/{productId}")
    public String deleteProduct(@PathVariable String productId) {
        // 제품 삭제 로직...
        return "productDeleted";
    }
}
```

위의 예제에서 `/deleteProduct/{productId}` 경로에 대한 DELETE 요청을 처리하는 `deleteProduct` 메서드가 정의되어 있습니다. `@PathVariable` 어노테이션을 사용하여 경로 변수로 전달된 `productId`를 사용하여 제품을 삭제하는 로직을 구현합니다.

`@DeleteMapping`을 사용하면 HTTP DELETE 요청에 대한 매핑을 간편하게 정의할 수 있습니다. 이는 주로 RESTful 웹 서비스에서 자주 사용되며, 메서드명과 URL 경로가 일치하는 간결한 구현을 가능하게 합니다.

<br>

---

<br>

#### @PathVariable Annotation

`@PathVariable` 어노테이션은 Spring MVC에서 HTTP 요청의 URL 경로 변수를 메서드의 파라미터로 전달받을 때 사용됩니다. URL 경로 변수는 URI 템플릿의 일부로 지정되며, 메서드의 매개변수에 `@PathVariable` 어노테이션을 사용하여 해당 변수의 값을 전달 받을 수 있습니다.

### 기본 사용:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MyController {

    @GetMapping("/user/{userId}")
    public String getUserById(@PathVariable Long userId) {
        // userId를 이용한 사용자 조회 로직...
        return "userDetails";
    }
}
```

위의 예제에서 `/user/{userId}` 경로에 대한 GET 요청을 처리하는 `getUserById` 메서드가 정의되어 있습니다. `@PathVariable` 어노테이션을 사용하여 경로 변수로 전달된 `userId`를 메서드의 파라미터로 받아옵니다.

### 다중 경로 변수:

여러 개의 경로 변수를 사용할 수도 있습니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MyController {

    @GetMapping("/product/{category}/{productId}")
    public String getProductDetails(
            @PathVariable String category,
            @PathVariable Long productId) {
        // 카테고리와 제품 ID를 이용한 제품 조회 로직...
        return "productDetails";
    }
}
```

위의 예제에서 `/product/{category}/{productId}` 경로에 대한 GET 요청을 처리하는 `getProductDetails` 메서드가 정의되어 있습니다. `@PathVariable` 어노테이션을 사용하여 경로 변수로 전달된 `category`와 `productId`를 메서드의 파라미터로 받아옵니다.

`@PathVariable` 어노테이션을 사용하면 URL 경로에서 동적인 값을 추출하여 메서드로 전달할 수 있습니다. 이는 주로 RESTful 웹 서비스에서 경로 변수를 활용하여 리소스의 식별이나 검색을 구현하는 데 사용됩니다.

<br>

---

<br>

#### @RequestParam Annotation

`@RequestParam` 어노테이션은 Spring MVC에서 HTTP 요청의 파라미터를 메서드의 파라미터로 전달받을 때 사용됩니다. URL 쿼리 파라미터나 POST 요청의 폼 데이터를 읽어오는 데에 주로 사용됩니다.

### 기본 사용:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    @GetMapping("/greet")
    public String greet(
            @RequestParam(name = "name", defaultValue = "Guest") String name,
            @RequestParam(name = "age", defaultValue = "25") int age) {
        // name과 age를 이용한 환영 메시지 생성 로직...
        return "greet";
    }
}
```

위의 예제에서 `/greet` 경로에 대한 GET 요청을 처리하는 `greet` 메서드가 정의되어 있습니다. `@RequestParam` 어노테이션을 사용하여 요청의 쿼리 파라미터로 전달된 `name`과 `age`를 메서드의 파라미터로 받아옵니다.

### 다양한 매개변수:

- `name`: 요청 파라미터의 이름을 지정합니다.
- `defaultValue`: 요청 파라미터가 없을 경우 사용할 기본값을 지정합니다.
- `required`: 요청 파라미터가 필수인지 여부를 지정합니다. 기본값은 `true`입니다.
- `value`: `name`과 동일한 역할을 합니다.
- `defaultValue`: `defaultValue`와 동일한 역할을 합니다.

### 다중 파라미터:

여러 개의 파라미터를 한 메서드에서 받아올 수 있습니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    @GetMapping("/search")
    public String search(
            @RequestParam(name = "keyword", defaultValue = "") String keyword,
            @RequestParam(name = "category", defaultValue = "all") String category) {
        // keyword와 category를 이용한 검색 로직...
        return "searchResults";
    }
}
```

위의 예제에서 `/search` 경로에 대한 GET 요청을 처리하는 `search` 메서드가 정의되어 있습니다. `@RequestParam` 어노테이션을 사용하여 요청의 쿼리 파라미터로 전달된 `keyword`와 `category`를 메서드의 파라미터로 받아옵니다.

`@RequestParam` 어노테이션을 사용하면 클라이언트가 요청에 포함시킨 파라미터를 손쉽게 메서드로 전달받을 수 있습니다.
