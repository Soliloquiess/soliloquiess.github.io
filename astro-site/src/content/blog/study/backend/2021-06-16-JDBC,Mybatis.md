---
title: "[backend] JDBC의 한계와 MyBatis로의 전환"
date: 2021-06-16
category: "Backend"
tags: ["Backend"]
description: "JDBC(Java Database Connectivity)의 보안·유지보수 문제를 짚고, MyBatis의 3개 설정 파일 구조, SqlSessionFactory·SqlSession·커넥션 풀 동작 원리, MemberDAO 실전 코드까지 단계별로 정리한 학습노트."
permalink: "study/2021/06/16/JDBC,Mybatis"
---

## MyBatis란?

**JDBC(Java Database Connectivity)**에서 자바 소스코드에 뒤섞여 있던 SQL과 쿼리문을 분리하자는 취지에서 등장한 프레임워크다.

자바 소스코드와 SQL을 연결하는 방식을 MyBatis에서는 **Mapping**이라 하며, 이 때문에 MyBatis를 **SQL Mapping Framework**라고도 부른다.

---

## JDBC의 문제점

| 문제 | 내용 |
|------|------|
| **보안** | 아이디·패스워드 등 중요 정보가 소스코드에 노출 |
| **유지보수** | 자바 코드와 SQL 문장이 혼합되어 관리 어려움 |
| **개발 속도** | 모든 코드를 개발자가 직접 작성 |

이 문제들을 MyBatis로 전환하면 상당 부분 해결할 수 있다.

![20210617_201011](/assets/20210617_201011.png)

MyBatis 3 버전을 다운받는다.

![20210617_202251](/assets/20210617_202251.png)

---

## MyBatis 핵심 파일 3개

### 1. Configuration XML 파일

![20210617_203107](/assets/20210617_203107.png)

MyBatis 작업 전반을 설정하는 환경 설정 파일이다.

### 2. Properties 파일

```
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/test?characterEncoding=UTF-8&serverTimeZone=UTC
username=root
password=mysql

```

Properties 파일은 **Key=value** 형식으로 저장하는 것이 특징이다.

> 주의: `=` 앞뒤 및 줄 끝에 **공백이 있으면 에러**가 발생한다.

### 3. Mapper XML 파일 (SQL 저장 파일)

참고: https://mybatis.org/mybatis-3/getting-started.html

![20210617_210637](/assets/20210617_210637.png)

![20210617_210801](/assets/20210617_210801.png)

**이 3개의 파일이 MyBatis의 가장 기본 구성이다.**

---

## 파일 연결 구조

![20210618_001938](/assets/20210618_001938.png)

**Properties 파일**과 **Mapper 파일**을 **Configuration 파일**에 연결한다.

XML 환경 설정을 읽어서 **SqlSessionFactory** 클래스 객체를 생성한다.

![20210618_012722](/assets/20210618_012722.png)

![20210618_013436](/assets/20210618_013436.png)

---

## 커넥션 풀(Connection Pool)

사용자가 많아질수록 DB 연결 시 부하가 걸려 성능이 급격히 떨어진다.

MyBatis는 커넥션을 사용 후 버리지 않고 **재활용**하는 커넥션 풀 방식을 채택한다.

**커넥션 풀의 핵심:**
- DB를 사용할 때마다 그때그때 커넥션을 만드는 것이 아니라, **사전에 미리 메모리에 커넥션을 만들어 두는 것**
- DB 연결은 순간 연결·순간 해제되며, 풀에 **5~8개** 정도 확보해두면 유연하게 처리 가능
- `Pooled` 설정: 커넥션 풀을 이용해 커넥션들을 생성하라는 의미

**용어 정리:**

| 용어 | 설명 |
|------|------|
| **SqlSession** | 미리 연결된 커넥션 객체 하나 (JDBC의 Connection + Statement 역할) |
| **커넥션 풀** | SqlSession 여러 개가 모여있는 메모리 공간 |
| **SqlSessionFactory** | 커넥션 풀 전체를 가리키는 팩토리 객체 |

![20210618_031341](/assets/20210618_031341.png)

> XML 환경 설정을 읽어 메모리에 커넥션 풀을 만들고, **SqlSessionFactory** 객체를 생성하는 것이 가장 중요한 초기화 작업이다.

---

## MemberDAO 실전 코드

초기화 블록(`static { ... }`)은 **프로그램 실행 시 딱 한 번**만 실행되는 영역이다.

```
package kr.bit.model;
import java.io.InputStream;
// JDBC->MyBatis
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
public class MemberDAO {
   private static SqlSessionFactory sqlSessionFactory; //[O O O O O ]

   // 초기화 블럭-프로그램실행시 딱 한번만 실되는 코드영역
   static {
	   try {
		   String resource = "kr/bit/mybatis/config.xml";
		   InputStream inputStream = Resources.getResourceAsStream(resource);//읽기
		   sqlSessionFactory =new SqlSessionFactoryBuilder().build(inputStream);
	   }catch(Exception e) {
		   e.printStackTrace();
	   }
   }
   // 회원전체 리스트보기
   public List<MemberVO> memberList() {
	   // [Connection+Statement]=>SqlSession
	   SqlSession session=sqlSessionFactory.openSession();
	   List<MemberVO> list=session.selectList("memberList");
	   session.close();//반납
	   return list;
   }
   // 회원가입
   public int memberInsert(MemberVO vo) {
	   SqlSession session=sqlSessionFactory.openSession();
	   int cnt=session.insert("memberInsert", vo);
	   session.commit();
	   session.close();//반납
	   return cnt;
   }
   // 회원삭제
   public int memberDelete(int num) {
	   SqlSession session=sqlSessionFactory.openSession();
	   int cnt=session.delete("memberDelete", num);
	   session.commit();
	   session.close();
	   return cnt;
   }
   // 회원상세보기
   public MemberVO memberContent(int num) {
	   SqlSession session=sqlSessionFactory.openSession();
	   MemberVO vo=session.selectOne("memberContent", num);
	   session.close();
	   return vo;
   }
   // 회원수정하기
   public int memberUpdate(MemberVO vo) {
	   SqlSession session=sqlSessionFactory.openSession();
	   int cnt=session.update("memberUpdate", vo);
	   session.commit();
	   session.close();
	   return cnt;
   }
}




```

분리해 놓은 SQL을 담은 파일을 **Mapper 파일**이라 한다. Mapper 파일 안의 SQL을 연결하도록 `resultType`에 타입 정보를 지정하고, 세션을 반납한 후 결과 리스트를 반환한다.

---

## JDBC vs MyBatis 코드 비교

![20210618_042645](/assets/20210618_042645.png)

두 방식의 코드 차이가 확연히 드러난다.

![20210618_050044](/assets/20210618_050044.png)

이처럼 SQL과 자바 코드를 매핑한다고 해서 **매핑 프레임워크(Mapping Framework)**라고도 부른다.

---

## 핵심 요약 — JDBC에서 MyBatis로

**전환 시 이해해야 할 5가지:**

1. **JDBC의 문제점** — 보안·유지보수·개발속도
2. **SQL 매핑 프레임워크** 개념 이해
3. **MyBatis 환경 설정 파일 3개** 이해
4. **SqlSessionFactory, SqlSession** 이해
5. **커넥션 풀(ConnectionPool)** 이해

---

## JDBC 기본 구조

1. **기존 JDBC(Java Database Connectivity)의 문제점:**
   - 중요한 정보(아이디, 패스워드 등)가 소스코드에 노출
   - 자바 소스코드와 SQL 문장이 혼합되어 유지보수 어려움
   - 개발 속도 느림(모든 코드를 개발자가 직접 작성)

![20210618_094115](/assets/20210618_094115.png)

**JDBC 기본 구조:**

![20210618_094128](/assets/20210618_094128.png)

2. **MyBatis (SQL Mapping Framework for Java):**
   - 자바의 관계형 DB 프로그래밍을 쉽게 도와주는 프레임워크
   - JDBC로 DB 액세스하는 작업을 캡슐화
   - 일반 SQL 쿼리, 저장 프로시저(Stored Procedure), 고급 매핑 지원
   - 모든 JDBC 코드 및 매개변수의 중복 작업 제거
   - **SQL 쿼리를 하나의 구성 파일에 모아 프로그램 코드와 SQL을 분리**

![20210618_095045](/assets/20210618_095045.png)

3. **MyBatis 환경 설정 파일 3개:**

| 파일 | 역할 |
|------|------|
| **Configuration XML** | MyBatis3 작업 설정 전반을 기술하는 XML |
| **Mapper XML** | SQL 쿼리를 작성하는 파일 |
| **Properties** | DB 연결 정보 기술 (url, user, password) |

4. **SqlSessionFactory / SqlSession 이해:**

| 클래스 | 역할 |
|--------|------|
| `SqlSessionFactoryBuilder` | MyBatis 환경 설정 XML을 읽어 커넥션 풀을 생성 |
| `SqlSessionFactory` | SqlSession을 구성하는 요소 (커넥션 풀) |
| `SqlSession` | DB 액세스의 핵심 / JDBC의 Connection + Statement 역할 |

![20210618_101832](/assets/20210618_101832.png)

![20210618_101843](/assets/20210618_101843.png)

---
