---
title: "[JSP·Servlet] JDBC 보충 — Statement vs PreparedStatement, 서블릿을 JSP로, MVC 패턴"
date: 2021-03-30
category: "JSP·Servlet"
tags: ["JSP·Servlet"]
description: "Statement·PreparedStatement·CallableStatement 성능 비교, DBServlet을 JSP로 변환하는 실습, 그리고 MVC 패턴(Model·View·Controller·DAO)의 역할 분담을 정리한 학습노트."
permalink: "class/2021/03/30/jdbc-보충"
---

## Statement vs PreparedStatement

![Statement 비교 개요](/assets/20210331_094631.png)

**Statement와 PreparedStatement는 용도가 같다.** 차이는 성능과 사용 방식에 있다.

| 구분 | 리턴 타입 |
|---|---|
| `executeQuery()` | `ResultSet` |
| `executeUpdate()` | `int` (영향받은 행 수) |

`PreparedStatement`는 실무에서 **자주 사용한다.**

---

### Statement — 빈 그릇

![Statement 구조](/assets/20210331_103526.png)

```java
String query = "insert into customer values(?,?,?)";
```

- `?`는 값이 들어가는 자리 표시자(placeholder). 바뀌는 부분만 `?`로 처리한다.
- **Statement**: 아무것도 담기지 않은 빈 그릇. 실행할 때마다 쿼리 전체를 컴파일한다.

---

### PreparedStatement — 미리 준비된 그릇

![PreparedStatement 구조](/assets/20210331_104412.png)

- 쿼리의 **고정 부분을 미리 컴파일**해 두고, `?` 부분만 나중에 채워서 실행
- Statement보다 **실행 속도가 빠름**
- **컴파일은 1번**만 일어남 (Statement는 실행할 때마다 컴파일)
- 일부를 메모리에 남겨두었다가 값만 채워 실행 → 성능 향상

![PreparedStatement 실행 예시 1](/assets/20210331_110308.png)

![PreparedStatement 실행 예시 2](/assets/20210331_110403.png)

![PreparedStatement 실행 예시 3](/assets/20210331_110504.png)

![PreparedStatement 실행 예시 4](/assets/20210331_110534.png)

![레코드 삽입 성공](/assets/20210331_110654.png)

레코드 넣기 성공.

![PreparedStatement DELETE 예시](/assets/20210331_110724.png)

쿼리의 고정 부분은 동일하고, 값(`?` 부분)만 매번 다르게 들어간다. `DELETE`도 동일한 방식으로 사용 가능하다.

---

### CallableStatement — DB 내장 프로시저 호출

![CallableStatement 개요](/assets/20210331_110822.png)

- 자바에서 쿼리를 보내는 대신, **이미 데이터베이스 안에 저장된 쿼리(Stored Procedure)를 호출**
- 사용할 쿼리가 DB에 미리 준비되어 있어야 한다.

**성능 비교** (낮을수록 빠름):

| 순위 | 구분 |
|---|---|
| 1 (빠름) | `CallableStatement` |
| 2 | `PreparedStatement` |
| 3 (느림) | `Statement` |

> 학습 범위는 `PreparedStatement`까지.

---

## 서블릿(DBServlet.java)을 JSP로 변환

> `System.out.println()`은 콘솔에 출력되고 브라우저에는 표시되지 않는다.  
> 브라우저에 출력하려면 `out.println()`을 사용해야 한다.

![서블릿 코드 예시](/assets/20210331_113103.png)

`DBServlet.java`를 `DBjsp.jsp`로 변환해보자.

```java
package com.hello;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DBServlet")
public class DBServlet extends HttpServlet {

    String driver = "com.mysql.cj.jdbc.Driver";

    // jdbc url
    // jdbc:protocol name, mysql:db이름. localhost:db server 주소. 3306:port, scott:schema 이름
    String url = "jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC&characterEncoding=UTF-8";
    // "jdbc:mysql://localhost:3306/(여기가 쓰는 디비)?serverTimezone=UTC&characterEncoding=UTF-8";  ?쿼리스트링 뒤는 옵션사항.

    String user = "root";
    String password = "mysql";

    // 이 3가지가 디비 접속하기 위한 정보들 — 이게 있어야 Connection 가능
    String query = "select * from customer where address='seoul'";

    public void init(ServletConfig config) throws ServletException {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // 서버에서 클라이언트로 보내는 컨텐트 타입 지정
        response.setContentType("text/html;charset=utf-8");  // mime 타입, charset은 한글 처리를 위해 작성
        // 클라이언트로 보낼 컨텐트 출력을 위한 처리
        PrintWriter out = response.getWriter();

//      String query = "select * \r\n" +
//              "from customer \r\n" +
//              "where address='seoul'"
//      String query = "select empid, fname, phone from emp";

        // 1. Driver 등록(사용할 db에 맞춰서 등록)
        try {
            Class.forName(driver);
//          Class.forName("com.hello.Car");  // 객체 생성. 'com.hello 안의 Car 객체 생성'이라는 뜻.
//          이전엔 new로 객체 생성했지만 (Car c = new Car()), Class.forName(xx)은
//          xx에 런타임 시 다른 값을 줄 수 있어 생성 객체가 매번 달라질 수 있다 → 융통성.

            // 2. Connection 생성 - network 연결
            Connection con = DriverManager.getConnection(url, user, password);

            // 3. Statement 생성
            Statement stat = con.createStatement();
            // 그릇이 만들어지고 그 만들어진 그릇으로 4번에서 실행

            // 4. Query 실행
            ResultSet rs = stat.executeQuery(query);
            // insert/update/delete라면 executeUpdate() 사용

            out.print("<table border=1>");
            out.print("<tr><th>번호</th><th>이름</th><th>주소</th></tr>");

            // 5. 결과 처리
            while (rs.next()) {  // 한 행씩 처리
                String num = rs.getString(1);
                String name = rs.getString(2);
                String address = rs.getString(3);

//              System.out.println(num + "--" + name + "--" + address);
                out.println("<tr><td>" + num + "</td><td>" + name + "</td><td>" + address + "</td></tr>");
                // System.out은 콘솔에 찍히고 브라우저에 안찍힌다. out.println을 써야 브라우저에 찍힌다.
            }

            // 6. 마무리
            rs.close();
            stat.close();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

`DBjsp.jsp`로 변환:

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>

<%!
    String driver = "com.mysql.cj.jdbc.Driver";
    String url = "jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC&characterEncoding=UTF-8";

    String user = "root";
    String password = "mysql";

    String query = "select * from customer ";
/*
    public void init(ServletConfig config) throws ServletException {
    } */
%>

<%
    // 1. Driver 등록
    Class.forName(driver);
%>
<%
    // 2. Connection 생성 - network 연결
    Connection con = DriverManager.getConnection(url, user, password);
%>
<%
    // 3. Statement 생성
    Statement stat = con.createStatement();
%>
<%
    // 4. Query 실행
    ResultSet rs = stat.executeQuery(query);
%>
        <table border=1>
        <tr><th>번호</th><th>이름</th><th>주소</th></tr>
<%
    // 5. 결과 처리
    while (rs.next()) {
        String num = rs.getString(1);
        String name = rs.getString(2);
        String address = rs.getString(3);
%>
            <tr>
                <td><%= num %></td>
                <td><%= name %></td>
                <td><%= address %></td>
            </tr>
<%  } %>

<%
    // 6. 마무리
    rs.close();
    stat.close();
    con.close();
%>
    }
}
```

---

## JSTL — JSP 자바 코드를 태그로

![JSTL 개요](/assets/20210331_131756.png)

자바 코드를 스크립트릿에 넣는 대신 **태그로 처리**하겠다는 것이 JSTL의 핵심이다.
JSP가 자바로 변환될 때 사이즈가 불필요하게 커지는 부작용을 줄일 수 있다.

![JSTL 접두어(prefix)](/assets/20210331_131850.png)

JSP 태그 앞에 **접두어(prefix)**를 붙이는 이유: HTML 태그와의 이름 충돌을 방지하기 위해 구분자를 붙이는 것이다.

![JSTL 태그 예시](/assets/20210331_132344.png)

---

## EL (Expression Language)

![EL 기본 문법](/assets/20210331_132955.png)

![EL 스코프 탐색](/assets/20210331_133900.png)

![EL 연산자 예시](/assets/20210331_135544.png)

![EL 활용 예시](/assets/20210331_134642.png)

**`forward`를 사용하면 동일한 `request` 객체가 공유된다.**

JSP에서는 `forward` 태그로, Java(서블릿)에서는 코드로 forward를 처리한다.

---

## MVC 패턴

![MVC 개요 — TV와 모델 비유](/assets/20210331_141234.png)

- **Model**: 데이터 담당
- **View**: 화면 표시 (TV)

> JSP 안에 DB 연동 코드가 있으면 잘못된 구조다.

![MVC 흐름도 1](/assets/20210331_141519.png)

![MVC 흐름도 2](/assets/20210331_141540.png)

**MVC 요청 처리 흐름**:
1. 클라이언트 요청 → **Controller(서블릿)**이 수신
2. Controller → **Model**에 작업 위임 (로직·데이터 처리)
3. Model → Controller에 결과 반환
4. Controller → **View(JSP)**에 결과 전달
5. View가 데이터를 화면에 완성 → 최종 JSP가 클라이언트에 전달

![MVC 상세 흐름](/assets/20210331_141825.png)

![MVC 구성 요소](/assets/20210331_142107.png)

---

## DAO (Data Access Object)

![DAO 구조](/assets/20210331_143343.png)

![DAO 메서드 단위 작업](/assets/20210331_143939.png)

![DAO 실습 코드](/assets/20210331_144007.png)

- **DAO**: 실제로 일하는 객체 (DB 작업 전담)
- 클라이언트 요청에 대한 실제 처리를 수행
- **메서드 하나 = DB 작업 하나** (SELECT면 SELECT, INSERT면 INSERT — 단위 작업 원칙)

> Controller는 나중에 프레임워크가 제공해 주므로, Controller만 만들면 된다. 업무를 분담시킨다는 개념이 핵심이다.

---

## 실행 방법

초기 화면 접근:

```
http://localhost:{port}/mvc/list.bod
```

초기에는 직접 URL을 입력해야 하며, 이후에는 링크·버튼으로 이동한다.

![MVC 실행 결과](/assets/20210331_150015.png)
