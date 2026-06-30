---
title: "[Spring] MVC FrontController와 POJO 분리 설계"
date: 2021-05-29
category: "Spring"
tags: ["Spring"]
description: "모든 요청을 단일 진입점에서 받는 FrontController 패턴과, 실제 처리를 담당하는 POJO 컨트롤러를 분리하는 구조를 코드와 함께 정리한다. Forward/Redirect 전환 판단 기준도 포함."
permalink: "study/2021/05/29/mvc-frontcontroller,pojo"
---

## FrontController 패턴이란?

기존 방식은 클라이언트의 요청을 **개별 컨트롤러에 직접 연결**해서 처리했다. **FrontController**를 도입하면 모든 요청을 프론트 컨트롤러가 먼저 받아 분기한다.

| 구분 | 구현 방식 | 설명 |
|------|-----------|------|
| **FrontController** | 서블릿(Servlet) | 웹 요청을 받는 골격. 웹에서 실행되는 자바 |
| **일반 Controller (POJO)** | 순수 자바 클래스 | 틀 없는 평범한 자바 — Plain Old Java Object |

> 서블릿은 웹에서 실행되는 골격이고, 순수 자바(POJO)는 그런 틀이 없다. FrontController는 서블릿으로 만들고, 일반 Controller는 POJO로 만든다.

---

![20210531_141558](/assets/20210531_141558.png)

`.do`로 끝나는 요청은 FrontController가 받도록 설정한다.

```
package kr.bit.frontcontroller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.bit.controller.Controller;
import kr.bit.controller.MemberContentController;
import kr.bit.controller.MemberDeleteController;
import kr.bit.controller.MemberInsertController;
import kr.bit.controller.MemberListController;
import kr.bit.controller.MemberRegisterController;
import kr.bit.controller.MemberUpdateController;
import kr.bit.model.MemberDAO;
import kr.bit.model.MemberVO;
@WebServlet("*.do")
public class MemberFrontController extends HttpServlet {
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		// 클라이언트가 어떤 요청을 했는지 파악하기
		String url=request.getRequestURI();
		//System.out.println(url);		
		String ctx=request.getContextPath();
		//System.out.println(ctx);		
		// 실제로 요청한 명령이 무엇이지 파악
		String command=url.substring(ctx.length());
		System.out.println(command); // /memberInsert.do
		// 요청에 따른 분기작업(if~ else if~)
		Controller controller=null;
		String nextPage=null;
		// 핸들러매핑->HandlerMapping
	    HandlerMapping mapping=new HandlerMapping();
	    controller=mapping.getController(command);
	    nextPage=controller.requestHandler(request, response);
		// forward, redirect
		if(nextPage!=null) {
			if(nextPage.indexOf("redirect:")!=-1) {
				//            redirect:/MVC04/memberList.do
				response.sendRedirect(nextPage.split(":")[1]); // redirect
			}else {
				RequestDispatcher rd=request.getRequestDispatcher(ViewResolver.makeView(nextPage)); // forward
				rd.forward(request, response);
			}
		}		
	}
}


```

---

![20210531_142525](/assets/20210531_142525.png)

`mvc04`가 컨텍스트 패스로 등록된다. 이 컨텍스트 이름 뒤에 있는 이름을 뽑아내어 실제 요청 명령을 파악한다.

![20210531_150907](/assets/20210531_150907.png)

이전 MVC 정리에서는 컨트롤러가 여러 개였다면, 이번에는 **컨트롤러가 하나로 통합**된 것이 핵심 차이다.

여기서 FrontController가 해야 할 일을 대신할 컨트롤러를 추가하는데, 그것이 **POJO**다.

> FrontController가 모든 처리를 직접 다 하면 부하가 발생할 수 있다. FrontController는 **안내·보조원** 역할만 하고, 실제 업무는 POJO에 위임한다.

---

## POJO의 역할

![20210531_155319](/assets/20210531_155319.png)

![20210531_160359](/assets/20210531_160359.png)

`requestHandler` 기능을 넣어주기 위해 인터페이스를 하나 만든다.

---

### POJO가 할 일

![20210531_162424](/assets/20210531_162424.png)

`memberlist.do` 요청이 들어왔을 때 POJO가 처리하는 작업:

- **Model 연결** — DAO 호출
- **객체 바인딩** — VO 처리
- **뷰 페이지 경로 반환** — 결과 뷰 이름 리턴

![20210531_164250](/assets/20210531_164250.png)

![20210531_165715](/assets/20210531_165715.png)

> View 경로를 변경하면 반환값도 함께 바꿔야 한다.

![20210531_180222](/assets/20210531_180222.png)

---

## HandlerMapping

![20210531_205927](/assets/20210531_205927.png)

특정 핸들러(요청)가 들어오면 대응하는 컨트롤러(POJO)가 실행된다.

---

## Forward vs Redirect 판단

```
if(nextPage!=null) {
			if(nextPage.indexOf("redirect:")!=-1) {
				//            redirect:/MVC04/memberList.do
				response.sendRedirect(nextPage.split(":")[1]); // redirect
			}else {
				RequestDispatcher rd=request.getRequestDispatcher(ViewResolver.makeView(nextPage)); // forward
				rd.forward(request, response);
			}
		}		
```

FrontController에서 nextPage 값에 `"redirect:"` 문자열이 있으면 Redirect, 없으면 Forward로 처리한다.

### Forward 방식

**Forward**는 Web Container 차원에서 페이지를 이동한다. 웹 브라우저는 이동 사실을 알 수 없으므로 URL이 최초 호출 URL 그대로 유지된다. 현재 페이지와 Forward로 호출되는 페이지는 **Request·Response 객체를 공유**한다.

> 주의: 글쓰기처럼 시스템에 변화가 생기는 요청에 Forward를 쓰면, 새로고침 시 요청 정보가 살아있어 **게시물이 중복 등록**될 수 있다. 단순 조회(글 목록, 검색)에만 Forward를 사용하는 것이 바람직하다.

### Redirect 방식

**Redirect**는 Web Container가 브라우저에게 다른 페이지로 이동하라는 명령을 내린다. 브라우저는 URL을 지시된 주소로 바꾸고 해당 주소로 **새 요청**을 보낸다. 새로운 페이지에서는 Request·Response 객체가 새롭게 생성된다.

> 글쓰기·회원가입처럼 **시스템에 변화가 생기는 요청**에는 Redirect를 사용해야 새로고침 시 중복 처리를 막을 수 있다.

출처: https://mangkyu.tistory.com/51

![20210531_211313](/assets/20210531_211313.png)

---

## 정리

**FrontController 흐름 요약:**

1. `memberList.do` 요청이 FrontController에 도착
2. **HandlerMapping**이 키(요청 URL)로 해당 POJO를 조회해 반환
3. FrontController가 POJO에 처리를 위임
4. POJO가 결과 뷰 경로를 반환
5. FrontController가 Forward 또는 Redirect로 응답

> 스프링에서는 이 FrontController가 이미 **DispatcherServlet**으로 구현되어 제공된다.
