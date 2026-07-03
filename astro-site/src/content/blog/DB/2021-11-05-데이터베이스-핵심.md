---
title: "[DB] 데이터베이스 핵심 — Key·Join·정규화·트랜잭션·인덱스"
date: 2021-11-05
category: "DB"
tags: ["DB"]
description: "DB Key 5종, JOIN 6종(SQL 포함), SQL Injection 공격/방어, SQL vs NoSQL 비교, 이상 현상(Anomaly), 인덱스 구조, 정규화 1~3NF, 트랜잭션 ACID·격리 수준 4단계, Redis 핵심 개념 정리."
permalink: "study/2021/11/05/면접-대비-DB"
---

## Key

**Key란?** 검색·정렬 시 Tuple을 구분할 수 있는 기준이 되는 Attribute.

| Key 종류 | 설명 |
|---|---|
| **Candidate Key** (후보키) | Tuple을 유일하게 식별하기 위한 속성들의 부분 집합. 유일성 + 최소성 만족 |
| **Primary Key** (기본키) | 후보키 중 선택한 Main Key. Null 불가, 중복 불가 |
| **Alternate Key** (대체키) | 후보키 중 기본키를 제외한 나머지 키 (보조키) |
| **Super Key** (슈퍼키) | 유일성은 만족하지만 최소성은 만족하지 못하는 키 |
| **Foreign Key** (외래키) | 다른 릴레이션의 기본키를 참조하는 속성의 집합 |

---

## Join

**조인이란?** 두 개 이상의 테이블이나 데이터베이스를 연결하여 데이터를 검색하는 방법. 연결하려면 적어도 하나의 컬럼을 서로 공유해야 한다.

### INNER JOIN

![INNER JOIN](/assets/20211114_183443.png)

교집합. 기준 테이블과 join 테이블의 **중복된 값**을 보여준다.

```
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
INNER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

### LEFT OUTER JOIN

![LEFT OUTER JOIN](/assets/20211114_183548.png)

기준 테이블(왼쪽) 값과 조인 테이블의 중복된 값을 보여준다.

```
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
LEFT OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

### RIGHT OUTER JOIN

![RIGHT OUTER JOIN](/assets/20211114_183739.png)

LEFT OUTER JOIN과 반대로 오른쪽 테이블 기준으로 JOIN.

```
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
RIGHT OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP

```

### FULL OUTER JOIN

![FULL OUTER JOIN](/assets/20211114_183822.png)

합집합. A와 B 테이블의 모든 데이터가 검색된다.

```
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
FULL OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

### CROSS JOIN

![CROSS JOIN](/assets/20211114_183854.png)

모든 경우의 수를 표현하는 방식. A가 3개, B가 4개면 총 3×4 = 12개의 데이터가 검색된다.

```
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
CROSS JOIN JOIN_TABLE B
```

### SELF JOIN

![SELF JOIN](/assets/20211114_183931.png)

자기 자신과 조인하는 것. 하나의 테이블을 여러 번 복사해서 조인한다고 생각하면 편하다. 자신이 가진 컬럼을 다양하게 변형시켜 활용할 때 사용한다.

```
SELECT
A.NAME, B.AGE
FROM EX_TABLE A, EX_TABLE B
```

---

## SQL Injection

해커에 의해 조작된 SQL 쿼리문이 데이터베이스에 그대로 전달되어 비정상적 명령을 실행시키는 공격 기법.

### 공격 방법

#### 1) 인증 우회

로그인 input에 정상 값 외에 SQL 구문을 함께 삽입하는 방법.

```
SELECT * FROM USER WHERE ID = "abc" AND PASSWORD = "1234";
```

공격 시 비밀번호 input에 아래를 입력:

```
1234; DELETE * USER FROM ID = "1";
```

보안이 완벽하지 않은 경우, 비밀번호가 True가 되어 뒤에 작성한 DELETE문도 실행되는 치명적 상황이 발생한다. WHERE 절에 `OR '1'='1'` 같은 true문을 삽입하여 DB를 마음대로 조작할 수도 있다.

#### 2) 데이터 노출

시스템 에러 메시지를 이용하는 방법. GET 방식 URL 쿼리 스트링에 악의적인 구문을 삽입하여 에러를 발생시키고, 해당 오류를 통해 웹 앱의 데이터베이스 구조를 유추하여 해킹에 활용한다.

### 방어 방법

| 방법 | 설명 |
|---|---|
| **특수문자 검사** | 로그인 전 검증 로직을 추가하여 미리 설정한 특수문자가 들어오면 요청을 차단 |
| **에러 메시지 숨기기** | view를 활용하여 원본 DB 테이블 접근 권한을 높이고, 일반 사용자는 view로만 접근 |
| **PreparedStatement 사용** | 특수문자를 자동으로 escaping. 쿼리문에서 전달인자 값을 `?`로 받아 서버 측 필터링 처리 |

---

## SQL과 NoSQL의 차이

### SQL (관계형 DB)

RDBMS에서 데이터를 저장·수정·삭제·검색한다.

- **데이터는 정해진 스키마에 따라 테이블에 저장된다.** 스키마를 준수하지 않은 레코드는 추가 불가.
- **데이터는 관계를 통해 여러 테이블에 분산된다.** 중복을 피하기 위해 '관계'를 이용.

![SQL 관계형 데이터 구조](/assets/20211115_205955.png)

하나의 테이블에서 중복 없이 하나의 데이터만 관리하므로 다른 테이블에서 부정확한 데이터를 다룰 위험이 없다.

### NoSQL (비관계형 DB)

**스키마도 없고, 관계도 없다.**

레코드를 **문서(document)**라고 부르며 JSON과 비슷한 형태로 저장한다. 다른 구조의 데이터를 같은 컬렉션에 추가 가능하다.

관련 데이터를 동일한 '컬렉션'에 한꺼번에 포함해서 저장하므로 조인이 필요 없다. 조인이 필요한 경우 컬렉션을 통해 데이터를 복제하여 처리하지만, 데이터 중복으로 서로 영향을 줄 위험이 있다.

### 확장성 비교

| 방식 | SQL | NoSQL |
|---|---|---|
| **수직적 확장** (서버 성능 향상) | 가능 | 가능 |
| **수평적 확장** (서버 추가·분산) | 일반적으로 불가 | **가능** |

### SQL vs NoSQL 장단점

| 항목 | SQL | NoSQL |
|---|---|---|
| **장점** | 명확한 스키마, 데이터 무결성 보장, 중복 없는 데이터 관리 | 유연한 스키마, 빠른 읽기 속도, 수평 확장 가능 |
| **단점** | 스키마 사전 계획 필요, 복잡한 JOIN 쿼리, 수직 확장만 가능 | 데이터 중복 발생, 중복 데이터 모든 컬렉션에서 업데이트 필요 |
| **적합한 경우** | 관계 데이터가 자주 변경, 명확한 스키마가 중요한 경우 | 데이터 구조가 불명확하거나 자주 변경, 막대한 양의 데이터, 수평 확장 필요 |

---

## Anomaly (이상 현상)

잘못된 테이블 설계로 인해 발생하는 이상 현상. 정규화가 필요한 이유다.

예시 스키마: `{Student ID, Course ID, Department, Course ID, Grade}`

| 종류 | 설명 |
|---|---|
| **삽입 이상** (Insertion Anomaly) | 불필요한 데이터를 추가해야만 삽입할 수 있는 상황. 예) 수강하지 않은 학생은 Course ID가 없어 기본키(Null 불가)를 만족할 수 없음 |
| **갱신 이상** (Update Anomaly) | 일부만 변경하여 데이터가 불일치하는 모순 발생. 예) 학생의 전공 변경 시 모든 레코드를 수정해야 하는데 일부를 누락하는 경우 |
| **삭제 이상** (Deletion Anomaly) | 튜플 삭제로 인해 꼭 필요한 데이터까지 함께 삭제. 예) 수강 철회 시 학생 정보(Student ID, Department)도 함께 삭제됨 |

---

## Index

### DB Index란?

RDBMS에서 **검색 속도를 높이기 위한 기술**. 테이블의 Column을 색인화(B+ Tree 구조)하여 Full Scan 없이 빠르게 검색한다.

### 파일 구조

테이블 생성 시 MYD, MYI, FRM 3개의 파일이 생성된다.

| 파일 | 내용 |
|---|---|
| **FRM** | 테이블 구조 |
| **MYD** | 실제 데이터 |
| **MYI** | Index 정보 (Index 사용 시 생성됨) |

사용자가 SELECT 쿼리로 Index 컬럼을 탐색할 때 MYI 파일을 검색한다.

### Index 단점

- Index 생성 시 .mdb 파일 크기 증가
- 한 페이지를 동시에 수정할 수 있는 병행성 감소
- 인덱스된 Field에서 데이터 업데이트·추가·삭제 시 성능 저하
- 데이터 변경 작업이 잦으면 Index를 재작성해야 함

### 사용 권장 / 비권장 상황

| 사용 권장 | 사용 비권장 |
|---|---|
| WHERE 절에서 자주 사용되는 Column | 데이터 중복도가 높은 Column |
| 외래키가 사용되는 Column | DML이 자주 일어나는 Column |
| JOIN에 자주 사용되는 Column | |

### DML 발생 시 Index 동작

| 연산 | 상황 |
|---|---|
| **INSERT** | 기존 Block에 여유가 없으면 새 Block 할당 + Key 이동 (많은 Redo 기록, Index split 동안 DML 블로킹) |
| **DELETE** | Table은 데이터가 지워지고 공간 재사용 가능. Index는 데이터가 지워지지 않고 '사용 안 됨' 표시만 → Table과 Index 데이터 수 불일치 가능 |
| **UPDATE** | Index는 직접 Update 불가. Delete 후 새 Insert = **2배의 작업** 소요 |

---

## 정규화 (Normalization)

**가장 큰 목표: 테이블 간 중복된 데이터를 허용하지 않는 것.** 중복 제거로 무결성 유지 및 DB 저장 용량을 효율적으로 관리한다.

**목적**:
- 데이터 중복 제거 및 불필요한 데이터 최소화
- 무결성 유지, 이상 현상 방지
- 논리적이고 직관적인 테이블 구성
- 데이터베이스 구조 확장 용이

### 제1정규화 (1NF)

테이블 컬럼이 **원자값(하나의 값)**을 갖도록 테이블을 분리.

- 모든 도메인이 원자값만으로 구성
- 모든 속성에 반복되는 그룹이 없음
- 기본키로 관련 데이터의 각 집합을 고유하게 식별 가능

![1NF 적용 전](/assets/20211115_213916.png)

전화번호를 여러 개 가지고 있어 원자값이 아님 → 분리 필요

![1NF 적용 후](/assets/20211115_213944.png)

### 제2정규화 (2NF)

테이블의 모든 컬럼이 **완전 함수적 종속**을 만족해야 한다. 기본키가 복합키(키1, 키2)일 때, 두 키 중 하나의 키만으로 다른 컬럼을 결정지을 수 없어야 한다 (부분 함수 종속 제거).

![2NF 적용 전](/assets/20211115_214212.png)

Manufacturer만으로 Manufacturer Country가 결정됨 (부분 함수 종속) → 테이블 분리 필요

![2NF 적용 후 (1)](/assets/20211115_214245.png)

![2NF 적용 후 (2)](/assets/20211115_214304.png)

### 제3정규화 (3NF)

2NF에서 **이행적 종속**을 없애기 위해 테이블을 분리한다.

*이행적 종속: A → B, B → C이면 A → C가 성립*

조건:
- 릴레이션이 2NF를 만족
- 기본키가 아닌 속성들이 기본키에만 의존

![3NF 적용 전](/assets/20211115_214740.png)

Winner Date of Birth가 기본키(Tournament, Year)가 아닌 Winner에 의해 결정 → 3NF 위반

![3NF 적용 후](/assets/20211115_215049.png)

---

## DB 트랜잭션 (Transaction)

**데이터베이스의 상태를 변화시키기 위해 수행하는 작업 단위.** SQL 질의어(SELECT·INSERT·DELETE·UPDATE)를 통해 DB에 접근하는 것을 말한다.

```
예시) 사용자 A가 사용자 B에게 만원을 송금한다.

* 이때 DB 작업
- 1. 사용자 A의 계좌에서 만원을 차감한다 : UPDATE 문을 사용해 사용자 A의 잔고를 변경
- 2. 사용자 B의 계좌에 만원을 추가한다 : UPDATE 문을 사용해 사용자 B의 잔고를 변경

현재 작업 단위 : 출금 UPDATE문 + 입금 UPDATE문
→ 이를 통틀어 하나의 트랜잭션이라고 한다.
- 위 두 쿼리문 모두 성공적으로 완료되어야만 "하나의 작업(트랜잭션)"이 완료되는 것이다. `Commit`
- 작업 단위에 속하는 쿼리 중 하나라도 실패하면 모든 쿼리문을 취소하고 이전 상태로 돌려놓아야한다. `Rollback`
```

### 트랜잭션 특징 (ACID)

| 특징 | 설명 |
|---|---|
| **원자성 (Atomicity)** | 트랜잭션이 DB에 모두 반영되거나, 혹은 전혀 반영되지 않아야 함 |
| **일관성 (Consistency)** | 트랜잭션 작업 처리 결과는 항상 일관성 있어야 함 |
| **독립성 (Isolation)** | 동시에 병행 실행 중인 트랜잭션은 서로의 연산에 끼어들 수 없음 |
| **지속성 (Durability)** | 트랜잭션이 성공적으로 완료되면 결과는 영구적으로 반영 |

- **Commit**: 트랜잭션이 성공적으로 끝나 DB가 일관성 있는 상태임을 알리는 연산
- **Rollback**: 트랜잭션이 비정상 종료되어 원자성이 깨진 경우 마지막 일관성 상태로 복귀

### Transaction 관리를 위한 DBMS 전략

DBMS 구조: **Query Processor(질의 처리기)** + **Storage System(저장 시스템)**. 입출력은 고정 길이의 page 단위로 disk에 읽거나 쓴다.

![DBMS 구조](/assets/20211115_215853.png)

#### Buffer 관리 정책 (UNDO/REDO)

| 정책 | 설명 |
|---|---|
| **steal** | 수정된 페이지를 언제든지 디스크에 쓸 수 있는 정책. 대부분의 DBMS 채택. **UNDO logging 필요** |
| **no-steal** | 수정된 페이지를 EOT까지 버퍼에 유지. UNDO 불필요하나 큰 메모리 버퍼 필요 |
| **FORCE** | 수정된 모든 페이지를 commit 시점에 disk에 반영. REDO 불필요 |
| **no-FORCE** | commit 시점에 반영하지 않는 정책. 대부분의 DBMS. **REDO 복구 필요** |

---

## 트랜잭션 격리 수준 (Transaction Isolation Level)

트랜잭션에서 일관성 없는 데이터를 허용하도록 하는 수준. 무조건 Locking으로 모든 트랜잭션을 순서대로 처리하면 성능이 떨어지고, Locking 범위를 줄이면 잘못된 값이 처리될 수 있어 **최적의 Locking 방법**이 필요하다.

### Isolation Level 종류

| 레벨 | 이름 | 설명 |
|---|---|---|
| **0** | Read Uncommitted | Shared Lock 없음. 커밋되지 않은 데이터도 읽기 허용 |
| **1** | Read Committed | Shared Lock 적용. 커밋된 트랜잭션만 조회 가능. SQL 서버 기본값 |
| **2** | Repeatable Read | 트랜잭션 완료까지 모든 SELECT 데이터에 Shared Lock. 범위 내 조회 데이터 항상 동일 보장. 다른 사용자 수정 불가 |
| **3** | Serializable | 완벽한 읽기 일관성. 다른 사용자의 수정 및 입력 모두 불가 |

레벨이 높을수록 동시성은 낮아지고 무결성은 높아진다. 비용 또한 증가한다.

### 낮은 격리 수준에서 발생하는 문제

| 문제 | 설명 |
|---|---|
| **Dirty Read** | 커밋되지 않은 수정 중인 데이터를 다른 트랜잭션에서 읽는 현상 |
| **Non-Repeatable Read** | 한 트랜잭션에서 같은 쿼리를 두 번 수행할 때, 중간에 다른 트랜잭션이 값을 수정·삭제하여 결과가 달라지는 현상 |
| **Phantom Read** | 한 트랜잭션 내에서 일정 범위 레코드를 두 번 읽었을 때, 첫 번째에 없던 레코드가 두 번째에 나타나는 현상 (새로운 레코드 삽입 허용으로 발생) |

---

## Redis

**빠른 오픈 소스 인메모리 키-값 데이터 구조 스토어.**

일반 DB는 하드디스크나 SSD에 저장하지만, Redis는 **메모리(RAM)에 저장**하여 디스크 스캐닝이 필요 없어 매우 빠르다. 캐싱, 실시간 채팅, 세션 클러스터링 등에 활용된다.

**RAM의 휘발성 문제 해결 방법**:

| 방법 | 설명 |
|---|---|
| **snapshot** | 특정 지점을 설정하고 디스크에 백업 |
| **AOF** (Append Only File) | 명령(쿼리)들을 저장해두고 서버 셧다운 시 재실행하여 복구 |

데이터 구조는 **key/value** 값으로 이루어진 비관계형 데이터베이스 관리 시스템.

### value 5가지 타입

| 타입 | 설명 |
|---|---|
| **String** | text, binary data — 512MB까지 저장 가능 |
| **Set** | String 집합 |
| **Sorted Set** | Set을 정렬해둔 상태 |
| **Hash** | 필드-값 쌍의 컬렉션 |
| **List** | 양방향 연결리스트 |

---

참조: https://gyoogle.dev/blog/computer-science/data-base/Key.html

여길 보면서 면접 대비로 눈으로 보는것 보다 한줄 씩 다 적어보면서 베끼기만 하려는 것이 아닌 이해하려고 최대한 노력했다.
