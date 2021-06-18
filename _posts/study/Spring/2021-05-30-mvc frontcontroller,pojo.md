---
title: "[Spring] MVC FrontController, Pojo이용"
layout: post
subtitle: Spring
date: "2021-05-29-23:58:53 +0900"

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


클라이언트의 요청을 개별 컨트롤러에 연결해서 처리했는데 FrontController를 쓰면 모든 요청을 프론트 컨트롤러가 먼저 받게 된다.

서블릿도 자바고 서블릿은 웹에서 실행되는 골격

순수한 자바는 틀은 없음.

그래서 일반 서블릿과 다른 걸 만들었는데 그게 Pojo
plain old java object로 평범한 자바라 명시.


FrontController는 서블릿으로 만들고
일반 Controller는 자바로 만든다. 이 때 자바를 pojo 라 부른다.

![20210531_141558](/assets/20210531_141558.png)

.do로 끝나는 요청은 FrontController로 받게 하자.


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

![20210531_142525](/assets/20210531_142525.png)

mvc04가 contextpath 이 컨텍스트 패스로 등록됨.

이 컨텍스트 이름으로 뒤에 있는 이름을 뽑아냄.

![20210531_150907](/assets/20210531_150907.png)



전의 mvc 개인정리 1 에서 했던 내용과 같은데 그때 컨트롤러가 여러개였다면 이번엔 컨트롤러가 하나가 됐다는 점이 다르다.

여기서 프론트 컨트롤러가 해야할 일을 대신해야할 컨트롤러를 추가할 건데 그걸 Pojo라고 한다.



근데 FrontController가 다하면 부하가 날 수도 있다.

그래서 FrontController를 안내보조원이라 생각하면 된다.

FrontController는 서블릿으로 만들고 일바 pojo는 자바로 만든다.


![20210531_155319](/assets/20210531_155319.png)

![20210531_160359](/assets/20210531_160359.png)

리퀘스트 핸들러 기능 넣어주기위해 인터페이스 하나 만듬

-----------

### Pojo가 할 일



![20210531_162424](/assets/20210531_162424.png)


memberlist.do 가 들어왔을 때 오른쪽을 작업시킴.

pojo를 만들고 컨트롤러가 어디까지 할건가

모델하고 연결하고(dao) 객체 바인딩하고(vo)
뷰 페이지의 정보를 리턴하는게 pojo의 역할



![20210531_164250](/assets/20210531_164250.png)



![20210531_165715](/assets/20210531_165715.png)

view의 경로는 옮길면 바꿔줘야(리턴값) = 당연



![20210531_180222](/assets/20210531_180222.png)


----

핸들러 매핑

![20210531_205927](/assets/20210531_205927.png)

위 핸들러가 들어오면 아래 컨트롤러가 실행




웹은 현재 작업중인 페이지에서 다른 페이지로 이동하기 위해 2가지 페이지 전환 기능을 제공합니다. 오늘은 2가지의 페이지 전환 방법의 차이와 사용법에 대해 알아보도록 하겠습니다.



1. Forward 방식
[ Forward 방식 ]
Forward는 Web Container 차원에서 페이지의 이동만 존재합니다. 실제로 웹 브라우저는 다른 페이지로 이동했음을 알 수 없습니다. 그렇기 때문에 웹 브라우저에는 최초에 호출한 URL이 표시되고, 이동한 페이지의 URL 정보는 확인할 수 없습니다. 또한 현재 실행중인 페이지와 forward에 의해 호출될 페이지는 Request 객체와 Response 객체를 공유합니다.


위와 같이 Foward는 다음으로 이동 할 URL로 요청정보를 그대로 전달합니다. 그렇기 때문에 사용자가 최초로 요청한 요청정보는 다음 URL에서도 유효합니다. 예를 들어 게시판을 작성하는 과정이라고 할 때, 사용자가 보낸 요청 정보를 이용하여 글쓰기 기능을 수행한다고 할 때, forward를 사용하여 응답 페이지를 부르면 다음과 같은 문제가 발생하게 됩니다. 만약 사용자가 실수 혹은 고의로 글쓰기 응답 페이지에서 새로고침을 누른다면, 요청 정보가 그대로 살아있기 때문에 요청이 여러 번 전달되어 동일한 게시물이 여러 번 등록될 수 있습니다. 그렇기 때문에 게시판을 제작하는 과정에서는 시스템에 변화가 생기지 않는 단순 조회 요청(글 목록 보기, 검색)의 경우 forward로 응답하는 것이 바람직합니다.











2. Redirect 방식
[ Redirect 방식 ]
Redirect는 Web Container로 명령이 들어오면, 웹 브라우저에게 다른 페이지로 이동하라고 명령을 내립니다. 그러면 웹 브라우저는 URL을 지시된 주소로 바꾸고 해당 주소로 이동합니다. 다른 웹 컨테이너에 있는 주소로 이동하며 새로운 페이지에서는 Request와 Response객체가 새롭게 생성됩니다.




Redirect의 경우 최초 요청을 받은 URL1에서 클라이언트에게 redirect할 URL2를 반환하고, 클라이언트에서는 새로운 요청을 생성하여 URL2에 다시 요청을 보냅니다. 그러므로 처음 보냈던 최초의 Request와 Response 객체는 유효하지 않고 새롭게 생성되는 것 입니다. 예를 들어 게시판을 작성하는 과정이라고 할 때, 사용자가 보낸 요청 정보를 이용하여 글쓰기 기능을 수행한다고 할 때, redirect를 사용하여 응답 페이지를 부르면 사용자가 실수 혹은 고의로 글쓰기 응답 페이지에서 새로고침을 누른다고 하더라도, 처음의 요청 정보는 존재하지 않으므로 게시물이 여러 번 등록되지 않습니다. 그렇기 때문에 시스템에 변화가 생기는 요청(회원가입, 글쓰기 등)의 경우에는 redirection을 사용하는 것이 바랍직합니다.





출처: https://mangkyu.tistory.com/51 [MangKyu's Diary]


![20210531_211313](/assets/20210531_211313.png)

여기서 앞에 redirect라는 글자가 있으면 redirect로 가고 없으면 forward로 간다.







FrontController에 요청이 왔다 memberList.do라는 요청이 왔는데 Handler매핑은 키로 찾아보고 찾으면 그 밸류를 프론트 컨트롤러에 리턴하면 pojo에 일을 시킴.


프론트 컨트롤러는 자기가 해야될 일이 정해져 있음

스프링은 이미 프론트 컨트롤러가 만들어져 있다.
DispatcherServlet이 이미 주어져서 여기서 프론트 컨트롤러에
