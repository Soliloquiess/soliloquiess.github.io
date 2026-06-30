---
title: "[Spring] Spring Boot 프로젝트 초기 세팅 — Swagger·MyBatis 연동 체크리스트"
date: 2021-05-06
category: "Spring"
tags: ["Spring"]
description: "Spring Boot 신규 프로젝트 생성부터 Swagger 의존성 추가, MyBatis Mapper 설정, application.properties 편집까지 단계별 체크리스트를 정리한다."
permalink: "class/2021/05/06/springboot보충"
---

> Swagger 대신 Postman을 사용해도 된다.

### Spring Boot 프로젝트 초기 세팅 순서

1. **프로젝트 생성** (Starter Project)
   - `package name`: `com.TODO`

2. **`pom.xml`** — Swagger dependency 추가

3. **MVC 보조 패키지 생성**
   - `vo`, `service`, `dao`, `controller`

4. **XML Mapper 폴더 생성**
   - `src/main/resources` 아래 mapper 폴더 생성

5. **`application.properties` 편집**
   - `mybatis.type-aliases-package` 확인
   - `mybatis.mapper-locations` 확인
   - `logging.level.com.todo.dao` — dao 패키지명으로 수정

6. **XML Mapper 작성**

7. **소스 코드 작성**
