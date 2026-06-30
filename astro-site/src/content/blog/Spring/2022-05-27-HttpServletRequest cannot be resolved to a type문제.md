---
title: "[Maven] Eclipse에서 HttpServletRequest cannot be resolved to a type 해결"
date: 2022-05-25
category: "Spring"
tags: ["Spring"]
description: "Maven 프로젝트에서 Eclipse가 HttpServlet·javax.servlet 패키지를 찾지 못할 때, Project Facets의 Dynamic Web Module 설정과 Runtimes 탭에서 서블릿 컨테이너를 연결해 해결하는 방법을 정리한다."
permalink: "class/2022/05/25/HttpServletRequest-cannot-be-resolved-to-a-type문제"
---

Maven 프로젝트를 만들 때 아래와 같은 오류가 발생했다.

![20220527_114246](/assets/20220527_114246.png)

Eclipse에서 `HttpServlet`이나 `javax.servlet` 패키지에 속한 클래스들을 찾지 못하는 문제다.

---

### 해결 방법

![20220527_114246](/assets/20220527_114246_hx3y4vkz2.png)

프로젝트를 우클릭 → **Properties** → **Project Facets**로 이동한다.

**확인 항목:**
- **Dynamic Web Module**에 체크되어 있는지 확인
- **Version**이 원하는 Servlet 스펙 버전으로 설정되어 있는지 확인

> Version은 Servlet 스펙 버전을 의미한다. 현재 프로젝트가 Servlet 스펙 몇 버전으로 동작할지 결정한다. 해당 버전을 지원하는 서블릿 컨테이너가 필요하다(예: 톰캣 8은 Servlet 3.1까지 지원).

---

![99035D3B5D297C2F0D](/assets/99035D3B5D297C2F0D.png)

**Dynamic Web Module**이 이미 설정되어 있다면, 우측 **Runtimes** 탭으로 이동한다.

- 이 프로젝트의 구동 환경(서블릿 컨테이너)이 **체크**되어 있는지 확인
- 체크되어 있지 않으면 체크한다
- 단, Eclipse에 Server 환경 설정으로 서블릿 컨테이너(예: 톰캣)가 **사전에 등록**되어 있어야 하며, 해당 컨테이너가 Dynamic Web Module 버전을 지원해야 한다
- 설정 완료 후 **Apply and Close**

---

### 부가 현상

Dynamic Web Module 버전을 **3.1**로 설정하니 패키지에 표시되던 **Deployment Descriptor** 항목이 사라졌다.

![20220527_114715](/assets/20220527_114715.png)

---

참고 블로그: https://dololak.tistory.com/711
