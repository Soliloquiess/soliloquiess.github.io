---
title: "[Maven] HttpServletRequest cannot be resolved to a type 해결"
layout: post
subtitle: Spring
date: "2022-05-25 19:45:51 +0900"

categories: class
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


Maven 프로젝트를 만드는 데

![20220527_114246](/assets/20220527_114246.png)

이클립스에서 HttpServlet이나 javax.servlet 패키지에 속해있는 클래스들을 못 찾았다.
<br>
이 경우

<br>
![20220527_114246](/assets/20220527_114246_hx3y4vkz2.png)

<br>
설정을 확인하기 위해 프로젝트를 클릭하고  또는 마우스 우클릭 -> Properties 를 통해 프로젝트 설정으로 간다.

Project Facets로 이동하여 Dynamic Web Module에 체크되어 있는지 확인한다.

또한 Version이 자신의 원하는 환경의 버전으로 되어있는지 확인합니다. Version은 Servlet의 버전을 의미하는데 현재 프로젝트가 Servlet 스펙의 몇버전을 가지고 진행할것인지를 설정한다.

<br>
물론 해당 버전을 지원하는 서블릿 컨테이너가 필요함.(톰캣8의 경우 3.1까지 지원)


<br>

![99035D3B5D297C2F0D](/assets/99035D3B5D297C2F0D.png)


<br>

만약 Dynamic Web Module 설정이 되어있다면 우측의 Runtimes탭으로 이동한다. 여기서 이 프로젝트의 구동환경(서블릿 컨테이너)이 체크되어 있는지 확인하고 안되어 있다면 체크합니다. 단 이클립스에 Server 환경설정으로 서블릿컨테이너(예를 들면 톰캣)가 등록되어 있어야 하며, 해당 서블릿 컨테이너가 Dynamic Web Module의 버전을 지원해야 한다. 설정이 끝났다면 Apply and Close로 종료한다.



<br>


그리고 위와 같이 Dynamic module 설정을 3.1로 해주니
package에 들어가던 Deployment Descriptor이라는 것이 안 보이게 된다.( 왜 생기는지 의문이였음.)


<br>

![20220527_114715](/assets/20220527_114715.png)



<br>

참고 블로그 : https://dololak.tistory.com/711
