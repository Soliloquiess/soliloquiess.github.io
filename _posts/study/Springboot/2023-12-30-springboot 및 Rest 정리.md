---
title: "[Springboot] Rest 정리"
layout: post
subtitle: Spring
date: "2023-12-30-04:58:53 +0900"
categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### Rest란

REST(Representational State Transfer)는 네트워크 아키텍처 원칙의 모음으로, 웹을 위한 소프트웨어 아키텍처의 한 형태.

REST는 분산 시스템을 위한 기본적인 설계 원칙을 제공하여 자원을 표현하고 상태를 전송하는 방법을 정의한다.

REST는 다음과 같은 주요 개념을 포함합니다:

1 . 자원(Resource): 모든 것을 자원으로 표현합니다. 각 자원은 고유한 식별자(URI)를 가지며, 이를 통해 접근할 수 있습니다.

2 . 표현(Representation): 자원의 상태를 나타내는 형태로 데이터를 전달합니다. 예를 들어, JSON이나 XML 형태로 자원을 표현할 수 있습니다.
상태 전이(State Transfer): 클라이언트는 자원에 대한 상태를 조작하기 위해 필요한 정보를 포함한 요청을 보내고, 서버는 요청에 따라 적절한 응답을 반환합니다.

이러한 원칙을 준수하여 RESTful한 시스템을 구축하면, 서로 다른 시스템 간의 통합이 용이해지고, 확장성과 유지보수성이 높아지는 등 여러 이점을 얻을 수 있습니다. REST는 주로 HTTP 프로토콜을 기반으로 동작하며, HTTP 메서드(GET, POST, PUT, DELETE 등)를 사용하여 자원을 조작합니다.

![image](https://github.com/Soliloquiess/soliloquiess.github.io/assets/37941513/611d6679-4845-43d6-bd05-664086b82e3c)


### REST - REpresentational State Transfer

• REST API는 두 애플리케이션이 서로 HTTP를 통해 통신할 수 있도록 하는 중간 매개 API로, 서버가 브라우저와 통신하는 방식과 유사합니다.

• REST 아키텍처 스타일은 애플리케이션을 디자인하고 설계하는 데 전 세계적으로 매우 인기가 높아졌습니다.

• REST API의 필요성은 모바일 기기가 급격히 증가함에 따라 많이 증가했습니다. 웹 및 모바일 클라이언트가 API를 사용하도록 하고 별도의 애플리케이션을 개발하는 대신 REST API를 구축하는 것이 논리적으로 되었습니다.

<br>

### REST Architectural Constraints

다음과 같은 제약 조건을 갖는 API를 RESTful API라고 합니다:

• 클라이언트-서버 아키텍처: 클라이언트는 서비스의 프런트 엔드이고 서버는 백 엔드입니다. 두 엔티티가 서로 독립적임을 중요하게 알아야 합니다.

• 무상태(Stateless): 요청 전송 처리 중에 서버에 데이터를 저장하지 않아야 합니다. 세션의 상태는 클라이언트 측에 저장되어야 합니다.

• 캐시 가능(Cacheable): 클라이언트는 응답을 캐시에 저장할 수 있어야 합니다. 이는 API의 성능을 크게 향상시킵니다.

• 일관된 인터페이스(Uniform Interface): 이 제약 조건은 클라이언트와 서버 간의 모든 상호 작용을 통일된 방식으로 관리하는 일반적인 인터페이스를 나타냅니다. 이로써 아키텍처를 단순화하고 결합을 줄일 수 있습니다.

• 계층화된 시스템(Layered System): 서버는 여러 계층을 가질 수 있습니다. 이 계층화된 아키텍처는 로드 밸런싱을 가능하게 함으로써 확장성을 향상시킵니다.

• 코드 온 디맨드(Code on Demand): 이 제약 조건은 선택적입니다. 클라이언트 애플리케이션의 기능성을 서버로부터의 코드 다운로드와 실행을 허용하여 런타임에서 확장할 수 있음을 나타냅니다.

<br>

---

<br>

### REST 주요 개념

• 자원 (Resource): REST에서 자원은 데이터의 표현이며, 고유한 식별자인 URI를 통해 식별됩니다. 예를 들어, 웹 서비스에서는 사용자, 제품, 주문과 같은 데이터를 자원으로 나타낼 수 있습니다.

• 하위 자원 (Sub resource): 자원의 하위 부분을 나타냅니다. 예를 들어, 특정 사용자의 주문 목록이나 제품의 리뷰와 같이 자원의 세부적인 부분을 하위 자원으로 표현할 수 있습니다.

• URI (Uniform Resource Identifier): 자원을 식별하기 위한 고유한 주소입니다. 각 자원은 고유한 URI를 가지며, 이를 통해 해당 자원에 접근할 수 있습니다. URI는 자원을 나타내고 위치를 지정하는 역할을 합니다.

• HTTP 메소드 (HTTP Methods): RESTful API에서 자원을 조작하기 위해 사용되는 HTTP 요청 메소드입니다. 주요 메소드로는 GET(가져오기), POST(생성), PUT(수정), DELETE(삭제) 등이 있으며, 각 메소드는 자원에 대한 특정 작업을 수행합니다.

• HTTP 상태 코드 (HTTP Status Codes): HTTP 요청에 대한 서버의 응답 상태를 나타내는 코드입니다. 몇 가지 예시로는 200(성공), 404(찾을 수 없음), 500(내부 서버 오류) 등이 있으며, 각 코드는 요청의 성공 또는 실패를 알려줍니다.

REST의 이러한 주요 개념들은 자원을 식별하고 조작하기 위한 표준화된 방법을 제공하여 클라이언트와 서버 간의 통신을 단순화하고 효율적으로 관리할 수 있도록 합니다. 이는 유연하고 확장 가능한 웹 서비스를 구축하는 데 도움이 됩니다.

<br>

---

### REST - Resource

REST 기반 시스템의 기본 개념은 자원(Resource)입니다. 자원은 여러분의 애플리케이션을 통해 외부 세계에 노출하고자 하는 모든 것을 의미합니다.

이 맥락에서 자원은 외부에 제공하고자 하는 데이터의 형태를 가리키며, 이러한 자원은 주로 RESTful 시스템에서 URI(Uniform Resource Identifier)를 통해 식별됩니다. 웹 서비스에서 자원은 사용자, 제품, 주문, 이미지, 텍스트 문서 등과 같이 다양한 데이터 형태를 포함할 수 있습니다. 이러한 자원들은 클라이언트가 요청할 때 해당 정보를 제공하고 클라이언트가 필요로 하는 작업을 수행할 수 있도록 합니다.

REST는 이러한 자원을 중심으로 시스템을 구성하며, 자원을 나타내고 조작하기 위한 일관된 인터페이스를 제공하여 클라이언트와 서버 간의 효율적인 통신을 지원합니다. 이를 통해 유연하고 확장 가능한 웹 서비스를 개발할 수 있게 됩니다.


![image](https://github.com/Soliloquiess/soliloquiess.github.io/assets/37941513/3f6da552-5ef7-47cb-8911-0be13059b057)

---

URI (Uniform Resource Identifier)
유니폼 자원 식별자(Uniform Resource Identifier)는 자원을 식별하기 위한 고유한 주소체계입니다. 웹 기반 시스템에서는 외부 시스템과 통신할 때 HTTP가 가장 일반적으로 사용되는 프로토콜입니다. URI를 사용하여 고유한 자원을 식별할 수 있습니다.

예를 들어, 간단한 블로그 애플리케이션을 개발 중이라고 가정해봅시다. 블로그 게시물 자원에 대한 URI를 정의할 수 있습니다:

블로그 게시물 자원을 식별하기 위해 URI는 해당 자원의 고유한 위치를 가리킵니다. 예를 들어, 블로그 게시물 자원에 대한 URI는 "/posts", "/posts/{post_id}", "/categories/{category_id}/posts" 등과 같은 형태로 정의될 수 있습니다. 이러한 URI를 사용하여 클라이언트는 특정 블로그 게시물에 접근하거나 관련 정보를 요청할 수 있게 됩니다.

URI는 RESTful API에서 자원을 식별하고 접근하는 데 사용되며, 각각의 URI는 특정 자원을 가리키는 경로를 제공하여 클라이언트와 서버 간의 효율적인 통신을 지원합니다. URI는 시스템 내의 자원을 고유하게 식별하여 요청 및 응답 과정에서 정확한 자원을 찾고 조작하는 데 중요한 역할을 합니다.

![image](https://github.com/Soliloquiess/soliloquiess.github.io/assets/37941513/fbe1ee4d-6121-4032-b454-09ee5902f082)

---

### REST - Sub resource

• REST에서는 관계를 종종 하위 자원(sub resource)으로 모델링합니다. 하위 자원을 나타내는 데 다음과 같은 패턴을 사용합니다.

![image](https://github.com/Soliloquiess/soliloquiess.github.io/assets/37941513/1a48d42b-7ea4-46aa-b397-390eec6196ab)

• 하위 자원을 사용할 때, 자식 객체는 부모 객체 없이 존재할 수 없습니다.

<br>

---

#### HTTP Methods



![image](https://github.com/Soliloquiess/soliloquiess.github.io/assets/37941513/e15542b0-fd2a-426e-acba-530081f0df67)

참고 : https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

<br>

---

### HTTP Status Codes

- 아래는 가장 대중적인 상태 코드입니다

• 200 OK: 이 코드는 요청이 성공적이며 응답 내용이 적절하게 클라이언트로 반환되는 것을 나타냅니다.

• 201 Created: 이 코드는 요청이 성공적이며 새로운 리소스가 생성된 것을 나타냅니다.

• 400 Bad Request: 이 코드는 서버가 요청의 잘못된 구문 때문에 요청을 처리하지 못했음을 나타냅니다. 클라이언트는 요청을 수정한 후 다시 시도할 수 있습니다.

• 401 Unauthorized: 이 코드는 리소스에 대한 인증이 필요하다는 것을 나타냅니다. 클라이언트는 적절한 인증을 사용하여 다시 시도할 수 있습니다.

• 403 Forbidden: 이 코드는 서버가 요청을 거부하고 있으며 요청이 유효하더라도 응답하지 않는다는 것을 나타냅니다. 요청이 HEAD 메서드가 아닌 경우에는 이유가 본문 내용에 나열됩니다.

• 404 Not Found: 이 코드는 요청한 리소스가 요청에서 지정한 위치에서 찾을 수 없음을 나타냅니다.

• 500 Internal Server Error: 이 코드는 일반적인 오류 메시지를 나타내며, 서버에서 예기치 않은 오류가 발생하여 요청을 수행할 수 없음을 알려줍니다.
