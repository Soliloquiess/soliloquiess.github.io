---
title: "[Spring] Spring MVC — DispatcherServlet·MyBatis 매퍼·컴포넌트 스캔 흐름 정리"
date: 2021-04-30
category: "Spring"
tags: ["Spring"]
description: "Spring MVC의 DispatcherServlet 요청 처리 흐름, MyBatis 매퍼 파일과 DAO 인터페이스의 매핑 원리, 컴포넌트 스캔(component-scan)을 통한 빈 자동 등록까지 핵심 흐름을 정리한 학습 노트."
permalink: "class/2021/04/30/FrameWork-적용-구현"
---

## Spring MVC

스프링이 제공하는 **서블릿(Servlet) 기반의 MVC** 프레임워크다.

![20210430_094224](/assets/20210430_094224.png)

요청이 들어오면 **DispatcherServlet**이 받아서, 어떤 컨트롤러가 처리할지 매핑을 확인한 후 해당 컨트롤러에 위임한다.

---

## MyBatis 매퍼와 DAO 인터페이스

![20210501_024701](/assets/20210501_024701.png)

쿼리는 **매퍼 파일(Mapper File, XML 문서)**에 저장되며, 각 쿼리마다 고유한 `id`가 붙는다.

**DAO**는 인터페이스로 선언되며, 메서드 내용 없이 껍데기(선언)만 존재한다.

> 핵심 규칙: **DAO 인터페이스의 메서드 이름**과 **매퍼 파일의 쿼리 id**가 일치해야 한다.

동작 흐름:
1. 사용자가 DAO의 메서드를 호출한다.
2. MyBatis가 같은 이름의 쿼리 id를 매퍼 파일에서 찾는다.
3. 해당 쿼리가 실행되어 DB 작업이 수행된다.

매퍼 파일 안의 쿼리 id와 인터페이스 메서드 이름이 **반드시 일치**해야 한다.

![20210430_194616](/assets/20210430_194616.png)

**Controller → Service → DAO** 순서로 요청이 흘러간다.

| 계층 | 역할 |
|------|------|
| **Controller** | 요청 수신, 서비스 호출 |
| **Service(ServiceImpl)** | 비즈니스 로직, DAO에 위임 |
| **DAO(인터페이스)** | DB 작업 선언, 매퍼 파일과 연결 |

- **Controller**는 `@Autowired`로 Service를 주입받는다. 직접 `new`하지 않고 스프링이 자동으로 주입해준다.
- **`@Repository`** 어노테이션은 DAO에 붙인다.
- `BoardServiceImpl`은 Service 계층에 해당하며, DAO 타입을 주입받아 DB 작업을 위임한다.

---

## 컴포넌트 스캔(component-scan)

컨테이너를 구성하는 설정은 `root-context.xml`에 담겨 있다.

![20210430_200455](/assets/20210430_200455.png)

`component-scan` 태그는 **지정한 패키지를 탐색**해서 어노테이션이 붙은 클래스를 자바 객체(빈)로 자동 등록하고, `@Autowired`가 있으면 의존관계까지 주입해준다.

스캔 대상 어노테이션:

| 어노테이션 | 등록 대상 |
|------------|-----------|
| `@Component` | 일반 컴포넌트 |
| `@Service` | 서비스 계층 |
| `@Controller` | 웹 컨트롤러 |
| `@Repository` | DAO 계층 |
