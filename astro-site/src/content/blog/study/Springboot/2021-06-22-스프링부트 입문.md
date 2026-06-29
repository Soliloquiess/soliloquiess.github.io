---
title: "[Springboot] Springboot 입문"
date: 2021-06-22
category: "Springboot"
tags: ["Springboot"]
description: "스프링의 의존 주입(DI)과 제어의 역전(IoC) 개념, 의존 주입 방식과 뷰 템플릿, 내장 WAS, 기본 프로젝트 구성을 정리한 입문 노트."
permalink: "study/2021/06/22/스프링부트-입문"
---

## 의존 주입(DI)과 제어의 역전(IoC)

### 객체를 사용하는 두 가지 방식

![DI 객체 사용 방식 비교 — 직접 생성 vs 주입](/assets/20210622_131332.png)

객체 A가 B, C를 사용한다고 볼 수 있지만, 다르게 보면 A는 B, C의 기능에 **의존**한다고도 말할 수 있다.

![스프링 컨테이너의 객체 생성과 의존 주입 흐름](/assets/20210622_131837.png)

스프링은 객체를 생성하고, 라이프 사이클을 관리하며, 필요로 하는 객체에 의존 주입을 해주는 라이브러리 집합체라 할 수 있다.

개발자가 객체를 직접 제어하지 않고 그 제어권이 컨테이너로 넘어갔다는 의미에서, 이를 **제어의 역전(IoC)** 이라 한다.

### 강한 결합 vs 약한 결합

```
import java.util.Date;

public class UnderstandDI {

	public static void main(String[] args) {
		//날짜를 구하기 위해서는 Date 클래스에 의존해야 한다.
		Date date = new Date();
		System.out.println(date);
	}

	public static void getDate(Date d) {
		Date date=d;
		System.out.println(date);
	}

	private static void memberUse1() {
		//강한 결합 : 직접 생성
		Member m1 = new Member();
	}
	private static void memberUse2(Member m) {
		//약한 결합: 생성된 것을 주입 받음 - 의존 주입(Dependency Injection)
		Member m2 = m;
	}
}

//Member를 사용한다 = 기능에 의존한다는 소리.
class Member{
	String name;
	String nickname;
	public Member() {}
}

```

- **강한 결합**: 객체를 직접 `new`로 생성하는 방식.
- **약한 결합**: 외부에서 생성된 객체를 주입받는 방식, 즉 의존 주입(DI).

약한 결합은 다른 클래스의 변화에 안전하게 대처할 수 있다.

---

## 스프링 부트 의존 주입

의존 주입 방식은 두 가지가 있다.

- 자바 코드를 이용한 의존 주입 (필요한 경우에만)
- 어노테이션을 이용한 의존 주입

### `@SpringBootApplication`의 세 가지 기능

| 어노테이션 | 역할 |
| --- | --- |
| `@Configuration` | 자바 코드로 작성된 클래스를 설정 파일로 지정 |
| `@EnableAutoConfiguration` | 애플리케이션 컨텍스트(Application Context)를 만들 때 지정해 둔 설정값들을 이용해 자동으로 설정하는 기능을 켬 |
| `@ComponentScan` | 지정한 위치 이하에 있는 `@Component`, `@Configuration`이 붙은 클래스를 스캔해서 Bean으로 등록 |

### 설정 관련 어노테이션

- `@Configuration` — 클래스를 스프링 설정으로 사용함을 의미
- `@Bean` — 메서드의 리턴값을 빈(Bean) 객체로 사용함을 의미

---

## 스프링 부트가 지원하는 뷰

### 기본 지원 템플릿

- FreeMarker
- Groovy
- Thymeleaf

프로젝트 생성 시 디펜던시를 추가했다면, 추가 설정 없이 템플릿 폴더 아래에 확장자 `.html` 파일을 만들어 사용할 수 있다.

- 파일 내용은 HTML과 유사하지만 마치 JSP처럼 동작한다.
- 이때부터 HTML 파일은 정적인 파일이 아니라, 동적으로 컨텐츠를 표현하는 파일이 된다.

### 추가 설정이 필요한 뷰

- velocity
- jsp

이들은 추가 설정을 해야 사용할 수 있으며, 기본적으로는 지원되지 않는다.

### 정적 리소스 위치

JS, 이미지, CSS 등 정적인 요소는 `static` 폴더 아래에 둔다.

![static 폴더에 배치한 정적 리소스를 참조하는 HTML 예시](/assets/20210622_160134.png)

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

Hello World <br>
안녕하세요 <br>
<img src=/image/SpringBoot.png />

</body>
</html>

```

---

## 스프링 부트 내장 WAS

- 내장 WAS 종류: tomcat, jetty, undertow
- undertow는 톰캣보다 훨씬 빠르고 안정적인 모습을 보여준다.
- 단, JSP는 스프링 부트 내장 대상이 아니다.

### 컨트롤러 예제 — Model과 ModelAndView

```

package com.study.springboot;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MyController {

    @RequestMapping("/")
    public @ResponseBody String root() throws Exception{
        return "Model & View";
    }

    @RequestMapping("/test1")
    public String test1(Model model) {
    	// Model 객체를 이용해서, view로 Data 전달
    	// 데이터만 설정이 가능
        model.addAttribute("name", "홍길동");

        return "test1";       
    }

    @RequestMapping("/mv")
    public ModelAndView test2() {
    	// 데이터와 뷰를 동시에 설정이 가능
        ModelAndView mv = new ModelAndView();

        List<String> list = new ArrayList<>();

        list.add("test1");
        list.add("test2");
        list.add("test3");

        mv.addObject("lists", list);      			 // jstl로 호출
        mv.addObject("ObjectTest", "테스트입니다."); // jstl로 호출
        mv.addObject("name", "홍길동");				 // jstl로 호출
        mv.setViewName("view/myView");

        return mv;                                     
    }

}


```

- `Model` — 데이터만 view로 전달할 때 사용한다.
- `ModelAndView` — 데이터와 뷰를 동시에 설정할 수 있다.

### Model 동작 원리를 흉내 낸 예제

```

package com.study.springboot;

import java.util.HashMap;
import java.util.Map;

public class Main {
	public static void main(String[] args) {
		//지역변수라 메서드 종료되면 메모리에서 사라짐.
		//힙에 객체 생성되고 스택에 그 객체 위치 저장한 참조 뵨슈거 샹송ㄷ함
		Map<String, String> model = new HashMap<>();
		//리퀘스트 매핑 정보에 따라 메서드 호출
		String sReturn = root(model);
		//리턴 받은 뷰 페이지 이름과 ㄱ모델 객체 출력을 위해 다시 넘김
		printData(sReturn, model);

	}
	//파라미터 모델은 힙 영역에 생성된 객체를 참조하기 위한 또다른 참조 변수
	//명(이름-임금, 부모, 스승),, 자(존중-선배,친구)호(별명)
	//이순신: 호 :덕암, 자:여해, 이름:순신, 군호:덕풍부원군, 시호: 충무공
	public static String root(Map model) {
		model.put("name1",  "홍길동");
		model.put("name2",  "으아아");
		return "hello";
	}

	public static void printData(String s, Map model) {
		String str1 = (String) model.get("name1");
		System.out.println(str1);

		System.out.println("/WEB-INF/views/"+s+".jsp");
	}
}


```

- `model` 파라미터는 힙 영역에 생성된 객체를 참조하기 위한 또 다른 참조 변수다.
- 리퀘스트 매핑 정보에 따라 메서드를 호출하고, 리턴받은 뷰 페이지 이름과 모델 객체를 다시 넘겨 출력한다.

---

## 스프링 부트 프로젝트 기본형 만들기

프로젝트를 생성한 뒤 다음 순서로 기본형을 구성한다.

1. **`build.gradle` 수정**
   - JSP 디펜던시 추가
   - 톰캣 버전 수정
   - 프로젝트 제목 우클릭(팝업 메뉴) → Gradle → Refresh Gradle Project
2. **`application.properties` 수정**
   - 포트 번호 변경
   - JSP 설정
   - DB 설정
3. **폴더 구성 (복사 후 제거)**
   - 필요 없는 폴더, JSP 파일 지우기
4. **MyController 복사**
   - 필요 없는 내용 지우기
