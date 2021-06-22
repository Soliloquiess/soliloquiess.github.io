---
title: "[Springboot] Springboot 스터디 2일차"
layout: post
subtitle: Springboot
date: "2021-06-18-04:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

디비에서 조회한 목록 보여줌

보드 서비스에 리스트 만들었고
게시글에 보드에 목록 요청했을떄 list.hmtl에서 모델에 담겨있는 데이터를 뿌려줘야

board 컨트롤러에서 리스트라는 이름으로 모델에 등록
리스트라는 이름의 목록 가져와서 표현식으로 뿌려주고
그 하나하나의 리스트 요소를 board라는 객체로 가져올 것
반환되는 결과가 <List<board>>라는 컬렉션 객체로 되어있으니까
보드라는 이름으로 tr태그를 반복해서 출력해 줄것.

보드 객체가 담겨있는 리스트라
게시글 목록은 데이터 한건이 아니라 여러 글

게시글 조회는 Integer boardNo 인 한건만 조회할거니까.
Board객체 하나만 가져오면 됨.
목록은 컬렉션 리스트로 받아옴(여러개이니까)

보드 넘버 넘겨주면서 해당 글번호에 해당하는 게시글 정보를 조회해서 객체로 받아와서 보드를 받아와서 모델에 등록.

BoardController

```
package aloha.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import aloha.domain.Board;
import aloha.service.BoardService;

@Controller
@RequestMapping("/board")
//경로
public class BoardController {

	@Autowired
	//의존성 자동주입
	private BoardService service;

	//게시글 쓰기 - 화면,처리

	@GetMapping("/register")
//	@RequestMapping(vaule="/register",method = RequestMethod.GET)
	public void registerForm(Model model, Board board) throws Exception{

	}

	@PostMapping("/register")
	public String register(Model model, Board board) throws Exception{
		//글쓰기 요청
		service.register(board);	//DTO 넘김

		model.addAttribute("msg", "등록완료");
		return "board/success";	//이동

	}

	//게시글 목록
	@GetMapping("/list")
	public void list(Model model, Board board) throws Exception{

		model.addAttribute("list",service.list());
		//전달받은거 모델등록
	}

	//게시글 읽기

	@GetMapping("/read")
	public void read(Model model, Integer boardNo) throws Exception{

		model.addAttribute("board",service.read(boardNo));

	}

	//게시글 수정화면

	@GetMapping("/modify")
	public void modifyForm(Model model, Integer boardNo) throws Exception{

		model.addAttribute("board",service.read(boardNo));
	}


	//게시글 수정처리

	@PostMapping("/modify")
	public String modify(Model model, Board board) throws Exception{

		service.modify(board);	//board객체 받아옴
		model.addAttribute("msg","수정 완료되었습니다.");
		return "board/success";

	}

	//게시글 삭제처리

	@PostMapping("/remove")
	public String remove(Model model, Integer boardNo) throws Exception{

		service.remove(boardNo);
		model.addAttribute("msg","삭제 완료되었습니다.");
		return "board/success";

	}


	//성공
}


```

보드에 경로에 해당하는 뷰페이지 정보를 화면에 출력.

boardNo=2 이경로로 요청했을떄 리퀘스트 매핑 요청하고 글읽기 요청을 클라이언트로 요청시켜주면된다.

보드 컨트롤러 등록 - 매퍼 인터페이스 등록 - 서비스 등록 - 서비스 임플 등록. 보드 매퍼에 쿼리 추가. -다시 보드 컨트롤러 등록.

1. 보드컨트롤러? 등록
2. 매퍼 파일 인터페이스 등록()
3. 서비스 등록 (서비스도 인터페이스)
4. 서비스 임플 구현(인터페이스 구현)
5. 매퍼 파일 구현()
6. 보드 매퍼에 쿼리 추가
7.

th오브젝트가 없을 떄는 화면에 데이터를 뿌려줄 떄는 타임리프 템플릿 엔진에서 th콜론에서 밸류값을넣어주고 싶을 떄는 보드 객체를 보드라는 이름으로 담았다.

th오브젝트 속성은 컨트롤러부터 가져온 경우 객체인 경우에 객체를 상위태그에 등록해두고 폼태그의 하위태그(내부요소)에 변수들만 접근해서 쓴다.

th:value나 th:field로 쓴다.

애스터리스크 (\*)를 사용해서 객체를 가져오고 그럼 뒤에 변수만 사용해서 작성이 가능하다.

보드 객체를 상위태그에 등록해 놔서 이런식으로 사용가능하다.

수정 버튼 눌러서 수정 가게
컨트롤러 가서 리퀘스트 매핑요청.
수정화면 응답하는 게시글 만든다.

이 페이지가 있는 위치가 board및에있는 위치

절대경로는 board에 remove로 요청.

---

Spring Model 객체

Controller의 메서드는 Model이라는 타입의 객체를 파라미터로 받을 수 있다.
순수하게 JSP Servlet으로 웹 어플리케이션을 만들 때 보통 request나 session 내장객체에 정보를 담아 jsp에 넘겨주곤 했는데 Spring에서는 Model이라는 녀석을 쓴다.

get,post 둘다 한 경로로 사용 가능

로그인 정책도 다양하게 가능 조회수라거나 파일 업로드, 다운로드

게시글 여러개 등등 이런거 줄여서 보여주려면 페이징 처리도 해야되고

매퍼와 서비스 객체를 나눈 이유가 서비스로 나눈 이유가 있다.
서비스에서 로직을 더 추가한다.

구현체에서 비즈니스 로직을 구현한다.
컨트롤러에서 어떤 서비스가 요청되고 어떤 모델에다 어떤 데이터를 등록하고 어떤 뷰페이지가 등록하는지가 아니라고실제 디비나
실제 요청을 기능을 하나 실행했을때 글쓰기, 회원가입 기능 하나가 실행 될 때 필요한 모델, 일련의 과정들을 비즈니스 과정이라 한다.

회원가입 할 떄는 비밀번호 암호화 해서 넣는다.

---

.
스프링에 있는 어노이션이나 개념들 보는게 좋다.

스프링 부트에선 로그 (sql에서도 로그 보여줄 수 있다.) 그거 쓰면 테스트도 편하다.

디비 로그도 같이 찍힌다. 디비 열어서 확인 안해도 디비 찍히게 할 수 있따.

sql도 로그에 찍을 수 있다.

---

.
