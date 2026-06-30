---
title: "[Spring] Week03 — CRUD API부터 타임라인 서비스 End-to-End 완성까지"
date: 2021-04-29
category: "Spring"
tags: ["Spring"]
description: "Spring Boot로 Memo CRUD API를 구현하고, HTML·CSS·JavaScript·jQuery로 타임라인 서비스 클라이언트를 완성하는 3주차 학습 노트."
permalink: "study/2021/04/29/week03"
---

**수업 목표**

1. 페이지를 만들기 위한 HTML, CSS, Javascript를 익힌다.
2. 스프링을 이용해 API를 만들고 기능 확인하는 법을 손에 익힌다.
3. 타임라인 서비스를 완성한다.

> 모든 토글을 열고 닫는 단축키: Windows `Ctrl + Alt + T` / Mac `⌘ + ⌥ + T`

---

## 01. 이번 주 배울 것

End to End 로 프로젝트를 완성해보는 3주차입니다! 🔥

| 주제 | 내용 |
|------|------|
| **타임라인 서비스** | 완성본 미리보기 |
| **서버 — Memo API** | CRUD 기능 구현. 키워드: `RestController`, `Service`, `Repository`, `RequestDto` |
| **HTML, CSS** | 웹 화면을 구성하는 마크업·스타일 기초 |
| **Javascript, jQuery** | 화면을 동적으로 제어하는 스크립트 기초 |
| **클라이언트 완성** | HTML·CSS·JS로 화면을 만들고 서버 API와 연결 |

**타임라인 서비스 주소**

```html
http://spring.spartacodingclub.kr/timeline
```

---

## 02. 프로젝트 만들고 API 설계하기

**전체 구조**

![Controller - Service - Repository 3계층 구조](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f40eb9b-9907-4600-9bdc-3437c36cff54/Untitled.png)

**Controller - Service - Repository** 3계층 구조를 기억하자. 구현은 안에서 바깥으로, **Repository → Service → Controller** 순서로 진행한다.

---

### 프로젝트 새로 만들기

1. 인텔리제이를 실행한다.
2. **New Project**를 클릭한다.

   ![인텔리제이 New Project 버튼](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8d48ec97-b7f7-456f-ba71-0e10f5c5f3f7/Untitled.png)

3. 왼쪽 메뉴에서 **Spring Initializr**를 클릭하고 **Next**를 클릭한다.

   ![Spring Initializr 선택 화면](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dd6c3ad3-eb07-4e97-9d5f-0741e74f8043/_2020-10-11__9.07.49.png)

4. **[중요]** 다음 사항을 반드시 확인한다. Type, Language, Java Version 중 하나라도 다르면 정상적으로 실행되지 않는다.

   | 항목 | 값 |
   |------|----|
   | Group | com.sparta |
   | Artifact | week03 |
   | **Type** | **Gradle** |
   | **Language** | **Java** |
   | **Java Version** | **8** |

   ![프로젝트 설정 화면](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3084efcf-6d4c-49fc-8e09-d2b596900095/_2020-10-11__9.08.51.png)

5. 다음 의존성을 차례로 검색해 추가한다. 우측에 5개 요소가 포함되면 완료다.
   - Lombok
   - Spring Web
   - Spring Data JPA
   - H2 Database
   - MySQL Driver

   ![의존성 5개 추가 완료 화면](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/99523adc-19db-4351-8c93-08fcc2144765/_2020-10-11__9.16.34.png)

6. **Finish**를 클릭한다.

   ![Finish 클릭 화면](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/87bd5a10-e840-4c85-a0d4-40a2b29b9957/Untitled.png)

7. 잠시 기다리면 아래 화면이 완성된다.

   ![프로젝트 생성 완료 화면](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c3d00a8-5e48-4133-badb-f5848061e2eb/Untitled.png)

### API 설계 (CRUD)

## 03. Repository 만들기

### Memo 클래스

메모는 ① 익명 작성자 이름(`username`), ② 메모 내용(`contents`)으로 구성된다. `domain` 패키지를 만들고 아래 클래스를 생성한다.

**Memo.java**

```java
@NoArgsConstructor // 기본생성자를 만듭니다.
@Getter
@Entity // 테이블과 연계됨을 스프링에게 알려줍니다.
public class Memo extends Timestamped { // 생성,수정 시간을 자동으로 만들어줍니다.
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String contents;

    public Memo(String username, String contents) {
        this.username = username;
        this.contents = contents;
    }

    public Memo(MemoRequestDto requestDto) {
        this.username = requestDto.getUsername();
        this.contents = requestDto.getContents();
    }
}
```

**Timestamped.java**

```java
@MappedSuperclass // Entity가 자동으로 컬럼으로 인식합니다.
@EntityListeners(AuditingEntityListener.class) // 생성/변경 시간을 자동으로 업데이트합니다.
public class Timestamped {

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;
}
```

### MemoRepository 인터페이스

ID 타입이 `Long`이므로 `JpaRepository<Memo, Long>`을 상속한다.

**MemoRepository.java**

```java
public interface MemoRepository extends JpaRepository<Memo, Long> {
	List<Memo> findAllByOrderByModifiedAtDesc();
}
```

JPA 쿼리 메서드 공식 문서:

```html
https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods
```

### 연습퀴즈 — MemoRequestDto 클래스 만들기

`Memo.java`의 에러를 해결하려면 `MemoRequestDto.java`를 만들어야 한다. `Memo` 클래스 코드를 바탕으로 작성해보자.

<details>
<summary>정답</summary>

```java
@Getter
public class MemoRequestDto {
    private String username;
    private String contents;
}
```

</details>

---

## 04. Service 만들기

![Controller - Service - Repository 3계층 구조](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f40eb9b-9907-4600-9bdc-3437c36cff54/Untitled.png)

이번 시간에는 **Service** 계층을 만든다.

1. `src > main > java > com.sparta.week03` 에 `service` 패키지를 만든다.
2. 해당 패키지 아래에 `MemoService.java`를 만든다.

**MemoService.java**

```java
@RequiredArgsConstructor
@Service
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public Long update(Long id, MemoRequestDto requestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        memo.update(requestDto);
        return memo.getId();
    }
}
```

**Memo.java에 update 메서드 추가**

```java
public void update(MemoRequestDto requestDto) {
    this.username = requestDto.getUsername();
    this.contents = requestDto.getContents();
}
```

---

## 05. Controller 만들기

![Controller - Service - Repository 3계층 구조](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f40eb9b-9907-4600-9bdc-3437c36cff54/Untitled.png)

이번 시간에는 **Controller** 계층을 만들고, ARC로 기능을 확인한다.

### 연습퀴즈 — Update API 만들어보기

메모 정보를 받아 DB 데이터를 변경하는 메서드를 만들어보자. (힌트: Create와 유사하다)

<details>
<summary>정답</summary>

```java
@PutMapping("/api/memos/{id}")
public Long updateMemo(@PathVariable Long id, @RequestBody MemoRequestDto requestDto) {
    memoService.update(id, requestDto);
    return id;
}
```

</details>

## 06. HTML, CSS 기초

**역할 구분**: HTML은 뼈대, CSS는 꾸밈, Javascript는 동작을 담당한다. [naver.com](https://naver.com)에서 `<head>` 태그를 제거해보면 차이가 바로 보인다.

### HTML 기초

**HTML 특징**

- 여는 태그와 닫는 태그가 쌍으로 존재하며, **교차(cross) 불가**

```html
(O) <h1><span>타이틀</span>입니다.</h1>

(X) <span><h1>타이틀</span>입니다.</h1>
```

- `<head>` 태그: CSS, Javascript 코드 포함
- `<body>` 태그: 페이지 뼈대 전체 포함

**대표 HTML 태그**

| 태그 | 의미 | 설명 |
|------|------|------|
| `h1`~`h6` | Headline | 신문 제목처럼 계층적 제목 |
| `div` | Division | 영역을 나누는 투명 비닐봉투 |
| `p` | Paragraph | 신문 기사 단락처럼 텍스트 내용 |
| `ul`, `ol`, `li` | (Un)ordered List | 목록, bullet point |
| `span` | — | 텍스트 일부에 색상 등 스타일 적용 |
| `table`, `th`, `tr`, `td` | Table | 엑셀 같은 표 |
| `img` | Image | 이미지 표시 |

더 공부하고 싶다면:
- 코드카데미 HTML: `https://www.codecademy.com/learn/learn-html`
- 생활코딩 HTML: `https://opentutorials.org/course/2039`

### CSS 기초

- `<head>` 안의 `<style>` 태그 안에 작성하며, 각 속성은 **세미콜론(;)**으로 마무리한다.

```java
.wrap {
    width: 538px;
    margin: 10px auto;
}

#contents {
    width: 538px;
}

.area-write {
    position: relative;
    width: 538px;
}
```

**선택자(id vs class)**

| 구분 | 기호 | 특징 |
|------|------|------|
| **id** | `#` | HTML 파일 전체에서 단 하나만 존재 (`#contents`) |
| **class** | `.` | 중복 적용 가능 (`.area-write`) |

---

### 타임라인 페이지 미리 보기

1. `src > main > resources > static` 에 `index.html` 파일을 만든다.
2. 아래 코드를 복사/붙여넣기 한다.

```html
       <!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <title>Timeline Service</title>

           <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
           <link
             href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap"
             rel="stylesheet"
           />
           <script>
             $(document).ready(function () {
               getMessages();
             });

             function getMessages() {
               $("#cards-box").empty();
               $.ajax({
                 type: "GET",
                 url: "/api/memos",
                 data: {},
                 success: function (response) {
                   for (let i = 0; i < response.length; i++) {
                     let message = response[i];
                     let id = message["id"];
                     let username = message["username"];
                     let contents = message["contents"];
                     let modifiedAt = message["modifiedAt"];
                     addHTML(id, username, contents, modifiedAt);
                   }
                 },
               });
             }

             function addHTML(id, username, contents, modifiedAt) {
               let tempHtml = makeMessage(id, username, contents, modifiedAt);
               $("#cards-box").append(tempHtml);
             }

             function makeMessage(id, username, contents, modifiedAt, i) {
               return `<div class="card">
                               <!-- date/username 영역 -->
                               <div class="metadata">
                                   <div class="date">
                                       ${modifiedAt}
                                   </div>
                                   <div id="${id}-username" class="username">
                                       ${username}
                                   </div>
                               </div>
                               <!-- contents 조회/수정 영역-->
                               <div class="contents">
                                   <div id="${id}-contents" class="text">
                                       ${contents}
                                   </div>
                                   <div id="${id}-editarea" class="edit">
                                       <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                                   </div>
                               </div>
                               <!-- 버튼 영역-->
                               <div class="footer">
                                   <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                                   <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                                   <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                               </div>
                           </div>`;
             }

             function isValidContents(contents) {
               if (contents == "") {
                 alert("내용을 입력해주세요");
                 return false;
               }
               if (contents.trim().length > 140) {
                 alert("공백 포함 140자 이하로 입력해주세요");
                 return false;
               }
               return true;
             }

             function genRandomName(length) {
               let result = "";
               let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
               let charactersLength = characters.length;
               for (let i = 0; i < length; i++) {
                 let number = Math.random() * charactersLength;
                 let index = Math.floor(number);
                 result += characters.charAt(index);
               }
               return result;
             }

             function writePost() {
               let contents = $("#contents").val();

               if (isValidContents(contents) == false) {
                 return;
               }

               let username = genRandomName(10);
               let data = { username: username, contents: contents };

               $.ajax({
                 type: "POST",
                 url: "/api/memos",
                 contentType: "application/json",
                 data: JSON.stringify(data),
                 success: function (response) {
                   alert("메시지가 성공적으로 작성되었습니다.");
                   window.location.reload();
                 },
               });
             }

             function editPost(id) {
               showEdits(id);
               let contents = $(`#${id}-contents`).text().trim();
               $(`#${id}-textarea`).val(contents);
             }

             function showEdits(id) {
               $(`#${id}-editarea`).show();
               $(`#${id}-submit`).show();
               $(`#${id}-delete`).show();

               $(`#${id}-contents`).hide();
               $(`#${id}-edit`).hide();
             }

             function hideEdits(id) {
               $(`#${id}-editarea`).hide();
               $(`#${id}-submit`).hide();
               $(`#${id}-delete`).hide();

               $(`#${id}-contents`).show();
               $(`#${id}-edit`).show();
             }

             function submitEdit(id) {
               let username = $(`#${id}-username`).text().trim();
               let contents = $(`#${id}-textarea`).val().trim();
               if (isValidContents(contents) == false) {
                 return;
               }
               let data = { username: username, contents: contents };

               $.ajax({
                 type: "PUT",
                 url: `/api/memos/${id}`,
                 contentType: "application/json",
                 data: JSON.stringify(data),
                 success: function (response) {
                   alert("메시지 변경에 성공하였습니다.");
                   window.location.reload();
                 },
               });
             }

             function deleteOne(id) {
               $.ajax({
                 type: "DELETE",
                 url: `/api/memos/${id}`,
                 success: function (response) {
                   alert("메시지 삭제에 성공하였습니다.");
                   window.location.reload();
                 },
               });
             }
           </script>

           <style>
             @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

             body {
               margin: 0px;
             }

             .area-edit {
               display: none;
             }

             .wrap {
               width: 538px;
               margin: 10px auto;
             }

             #contents {
               width: 538px;
             }

             .area-write {
               position: relative;
               width: 538px;
             }

             .area-write img {
               cursor: pointer;
               position: absolute;
               width: 22.2px;
               height: 18.7px;
               bottom: 15px;
               right: 17px;
             }

             .background-header {
               position: fixed;
               z-index: -1;
               top: 0px;
               width: 100%;
               height: 428px;
               background-color: #339af0;
             }

             .background-body {
               position: fixed;
               z-index: -1;
               top: 428px;
               height: 100%;
               width: 100%;
               background-color: #dee2e6;
             }

             .header {
               margin-top: 50px;
             }

             .header h2 {
               /*font-family: 'Noto Sans KR', sans-serif;*/
               height: 33px;
               font-size: 42px;
               font-weight: 500;
               font-stretch: normal;
               font-style: normal;
               line-height: 0.79;
               letter-spacing: -0.5px;
               text-align: center;
               color: #ffffff;
             }

             .header p {
               margin: 40px auto;
               width: 217px;
               height: 48px;
               font-family: "Noto Sans KR", sans-serif;
               font-size: 16px;
               font-weight: 500;
               font-stretch: normal;
               font-style: normal;
               line-height: 1.5;
               letter-spacing: -1.12px;
               text-align: center;
               color: #ffffff;
             }

             textarea.field {
               width: 502px !important;
               height: 146px;
               border-radius: 5px;
               background-color: #ffffff;
               border: none;
               padding: 18px;
               resize: none;
             }

             textarea.field::placeholder {
               width: 216px;
               height: 16px;
               font-family: "Noto Sans KR", sans-serif;
               font-size: 16px;
               font-weight: normal;
               font-stretch: normal;
               font-style: normal;
               line-height: 1;
               letter-spacing: -0.96px;
               text-align: left;
               color: #868e96;
             }

             .card {
               width: 538px;
               border-radius: 5px;
               background-color: #ffffff;
               margin-bottom: 12px;
             }

             .card .metadata {
               position: relative;
               display: flex;
               font-family: "Spoqa Han Sans";
               font-size: 11px;
               font-weight: normal;
               font-stretch: normal;
               font-style: normal;
               line-height: 1;
               letter-spacing: -0.77px;
               text-align: left;
               color: #adb5bd;
               height: 14px;
               padding: 10px 23px;
             }

             .card .metadata .date {
             }

             .card .metadata .username {
               margin-left: 20px;
             }

             .contents {
               padding: 0px 23px;
               word-wrap: break-word;
               word-break: break-all;
             }

             .contents div.edit {
               display: none;
             }

             .contents textarea.te-edit {
               border-right: none;
               border-top: none;
               border-left: none;
               resize: none;
               border-bottom: 1px solid #212529;
               width: 100%;
               font-family: "Spoqa Han Sans";
             }

             .footer {
               position: relative;
               height: 40px;
             }

             .footer img.icon-start-edit {
               cursor: pointer;
               position: absolute;
               bottom: 14px;
               right: 55px;
               width: 18px;
               height: 18px;
             }

             .footer img.icon-end-edit {
               cursor: pointer;
               position: absolute;
               display: none;
               bottom: 14px;
               right: 55px;
               width: 20px;
               height: 15px;
             }

             .footer img.icon-delete {
               cursor: pointer;
               position: absolute;
               bottom: 12px;
               right: 19px;
               width: 14px;
               height: 18px;
             }

             #cards-box {
               margin-top: 12px;
             }
           </style>
         </head>

         <body>
           <div class="background-header"></div>
           <div class="background-body"></div>
           <div class="wrap">
             <div class="header">
               <h2>Timeline Service</h2>
               <p>공유하고 싶은 소식을 입력해주세요. 24시간이 지난 뒤에는 사라집니다.</p>
             </div>
             <div class="area-write">
               <textarea
                 class="field"
                 placeholder="공유하고 싶은 소식을 입력해주세요"
                 name="contents"
                 id="contents"
                 cols="30"
                 rows="10"
               ></textarea>
               <!--            <button class="btn btn-danger" onclick="writePost()">작성하기</button>-->
               <img src="images/send.png" alt="" onclick="writePost()" />
             </div>
             <div id="cards-box" class="area-read">
               <div class="card">
                 <!-- date/username 영역 -->
                 <div class="metadata">
                   <div class="date">October 10, 2020</div>
                   <div class="username">anonymous</div>
                 </div>
                 <!-- contents 조회/수정 영역-->
                 <div class="contents">
                   <div id="1-contents" class="text">
                     dsafnkalfklewakflekelafkleajfkleafkldsankflenwaklfnekwlafneklwanfkelawnfkelanfkleanfklew
                   </div>
                   <div id="1-editarea" class="edit">
                     <textarea
                       id="1-textarea"
                       class="te-edit"
                       name=""
                       id=""
                       cols="30"
                       rows="5"
                     ></textarea>
                   </div>
                 </div>
                 <!-- 버튼 영역-->
                 <div class="footer">
                   <img
                     id="1-edit"
                     class="icon-start-edit"
                     src="images/edit.png"
                     alt=""
                     onclick="editPost('1')"
                   />
                   <img
                     id="1-delete"
                     class="icon-delete"
                     src="images/delete.png"
                     alt=""
                     onclick="deleteOne('1')"
                   />
                   <img
                     id="1-submit"
                     class="icon-end-edit"
                     src="images/done.png"
                     alt=""
                     onclick="submitEdit('1')"
                   />
                 </div>
               </div>
             </div>
           </div>
         </body>
       </html>
       ```

3. `static` 폴더 아래 `images` 폴더를 만들고, 아래 URL에서 이미지를 다운로드해 넣는다.

```html
https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/spring/week03/delete.png
```

```html
https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/spring/week03/done.png
```

```html
https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/spring/week03/edit.png
```

```html
https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/spring/week03/send.png
```

---

## 07. Javascript 기초 - 1

**Javascript**는 브라우저를 살아 숨쉬게 만드는 언어다. 클릭, 마우스오버 색 변화, 숨기기/나타내기 등 수많은 동작을 처리한다. `F12` 키로 크롬 개발자 도구를 열고 **Console** 탭에서 바로 실습할 수 있다.

### 변수

```jsx
let a = 3; // 변수를 처음 선언할 때 let을 써줍니다. 자료형은 써주지 않아도 되어요.
let b = 2;
console.log(a + b); // System.out.println()과 같은 녀석입니다.
b = 7;
console.log(a + b);
```

### 자료형

| 종류 | 예시 |
|------|------|
| 문자열 | `let name = "bknam"` (홑/쌍따옴표 모두 가능) |
| 숫자 | `let num = 10` |
| boolean | `let isAdult = age > 19` |
| 리스트 | `let fruits = ["사과", "딸기", "수박"]` |
| 딕셔너리 | `let course = { title: "...", tutor: "..." }` |

**문자 + 숫자** 연산 시 두 값 모두 문자열로 묶인다.

```jsx
let name = "bknam";
let course = "웹개발의 봄 Spring"; // 자바와 다르게 홑/쌍따옴표 상관없습니다.
let num = 10;
console.log(num + name); // 문자 + 숫자 하면 둘 모두를 문자로 묶습니다.
```

```jsx
let age1 = 18;
let age2 = 20;
let isAdult = age1 > 19;
console.log(isAdult); // false
isAdult = age2 > 19;
console.log(isAdult); // true
```

```jsx
let fruits = ["사과", "딸기", "수박"]; // List 보다 편하게 사용할 수 있습니다.
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
```

```jsx
let course = {
  title: "웹개발의 봄, Spring",
  tutor: "남병관",
};

console.log(course);
```

### 반복문

```jsx
let fruits = ["사과", "딸기", "수박"]; // List 보다 편하게 사용할 수 있습니다.
for (let i = 0; i < fruits.length; i++) {
  let fruit = fruits[i];
  console.log(fruit);
}
```

---

## 08. Javascript 기초 - 2

### 조건문

```jsx
let fruits = ["사과", "딸기", "수박"]; // List 보다 편하게 사용할 수 있습니다.
for (let i = 0; i < fruits.length; i++) {
  let fruit = fruits[i];
  console.log(fruit == "수박");
}
```

### 함수

```jsx
function sample() {
  alert("얼럿!");
}
```

### 백틱 (템플릿 리터럴)

`${}` 문법으로 변수를 문자열 안에 삽입한다.

```jsx
let name = "내 이름";
let text = `${name}님의 스프링 5주 완주를 축하합니다!`;
console.log(text);
```

### 연습 퀴즈 — 과일 개수 세기

Javascript 배열에서 특정 과일이 몇 개인지 세는 함수를 만들어보자.

```
let count = countFruit('감');
console.log(count); // 배열에 들어있는 감의 개수 인쇄
```

<details>
<summary>정답</summary>

```jsx
let fruits = ["사과", "딸기", "수박", "감", "배", "딸기", "감"];

function countFruit(name) {
  let result = 0;
  for (let i = 0; i < fruits.length; i++) {
    let fruit = fruits[i];
    if (fruit == name) {
      result += 1;
    }
  }
  return result;
}

let count = countFruit("감");
console.log(count); // 배열에 들어있는 감의 개수 인쇄
```

</details>

## 09. jQuery 기초 - 1

**jQuery**는 자주 쓰는 HTML·CSS 조작 함수를 미리 만들어 제공하는 Javascript 라이브러리다. 사용법만 익히면 된다. ([w3schools jQuery 시작하기](https://www.w3schools.com/jquery/jquery_get_started.asp))

**임포트** (`<head>` 태그 사이에 추가)

```jsx
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

**사용법**: `$`로 시작하고 괄호 안에 CSS 선택자로 대상을 지정한다.

```jsx
$("#contents").hide();
```

> 개발자 도구 Console에서 jQuery를 사용하려면 해당 웹사이트에 이미 임포트돼 있어야 한다. 실습 놀이터: `http://spartacodingclub.shop`

**숨기기 / 나타내기**

```jsx
$("#post-box").show();
```

```jsx
$("#post-box").hide();
```

---

## 10. jQuery 기초 - 2

**input 값 가져오기 / 넣기**

```jsx
$("#post-url").val();
```

```jsx
$("#post-url").val("new text");
```

**HTML 비우기 / 추가하기**

```jsx
$("#cards-box").empty();
```

```jsx
$("#cards-box").append(`<div class="card">
    <img class="card-img-top"
         src="https://www.eurail.com/content/dam/images/eurail/Italy%20OCP%20Promo%20Block.adaptive.767.1535627244182.jpg"
         alt="Card image cap">
    <div class="card-body">
        <a href="#" class="card-title">여기 기사 제목이 들어가죠</a>
        <p class="card-text">기사의 요약 내용이 들어갑니다. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산...</p>
        <p class="card-text comment">여기에 코멘트가 들어갑니다.</p>
    </div>
</div>`);
```

---

## 11. 클라이언트 설계하기

필요한 기능을 확인하고 시작코드를 준비한다.

---

## 12. 메모 생성 — `writePost` 함수

구현 단계:
1. 사용자가 입력한 메모 내용 확인
2. 작성 내용 유효성 검사
3. 랜덤한 `username` 생성
4. 전달할 data를 JSON으로 만들기
5. `POST /api/memos`로 데이터 전송

---

## 13. 메모 조회 — `getMessages` 함수 (1)

1. 기존 메모 목록 제거 (`empty()`)
2. `GET /api/memos`로 메모 목록 불러오기

---

## 14. 메모 조회 — `getMessages` 함수 (2)

1. 메모마다 HTML을 만들고 붙이는 `addHTML` 함수 작성
2. `Timestamped`, `Week03Application` 수정
3. 반복문 안에서 `addHTML` 호출
4. `getMessages`, `addHTML` 완성

---

## 15. 메모 변경 — `submitEdit` 함수

1. 수정 대상 메모의 `username`과 `contents` 확인
2. `isValidContents`로 유효성 검사
3. 전달할 data를 JSON으로 변환
4. `PUT /api/memos/{id}`에 data 전달

**PUT 요청 코드**

```jsx
$.ajax({
  type: "PUT",
  url: `/api/memos/${id}`,
  contentType: "application/json",
  data: JSON.stringify(data),
  success: function (response) {
    alert("메시지 변경에 성공하였습니다.");
    window.location.reload();
  },
});
```

**`submitEdit` 함수 완성**

```jsx
// 메모를 수정합니다.
function submitEdit(id) {
  // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
  let username = $(`#${id}-username`).text().trim();
  let contents = $(`#${id}-textarea`).val().trim();

  // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
  if (isValidContents(contents) == false) {
    return;
  }

  // 3. 전달할 data JSON으로 만듭니다.
  let data = { username: username, contents: contents };

  // 4. PUT /api/memos/{id} 에 data를 전달합니다.
  $.ajax({
    type: "PUT",
    url: `/api/memos/${id}`,
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      alert("메시지 변경에 성공하였습니다.");
      window.location.reload();
    },
  });
}
```

---

## 16. 메모 삭제 — `deleteOne` 함수

`DELETE /api/memos/{id}`에 요청해서 메모를 삭제한다.

```jsx
function deleteOne(id) {
  $.ajax({
    type: "DELETE",
    url: `/api/memos/${id}`,
    success: function (response) {
      alert("메시지 삭제에 성공하였습니다.");
      window.location.reload();
    },
  });
}
```

**클라이언트 완성 코드**

  ```jsx
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Timeline Service</title>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap" rel="stylesheet">

      <style>
          @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

          body {
              margin: 0px;
          }

          .area-edit {
              display: none;
          }

          .wrap {
              width: 538px;
              margin: 10px auto;
          }

          #contents {
              width: 538px;
          }

          .area-write {
              position: relative;
              width: 538px;
          }

          .area-write img {
              cursor: pointer;
              position: absolute;
              width: 22.2px;
              height: 18.7px;
              bottom: 15px;
              right: 17px;
          }

          .background-header {
              position: fixed;
              z-index: -1;
              top: 0px;
              width: 100%;
              height: 428px;
              background-color: #339af0;
          }

          .background-body {
              position: fixed;
              z-index: -1;
              top: 428px;
              height: 100%;
              width: 100%;
              background-color: #dee2e6;
          }

          .header {
              margin-top: 50px;
          }

          .header h2 {
              /*font-family: 'Noto Sans KR', sans-serif;*/
              height: 33px;
              font-size: 42px;
              font-weight: 500;
              font-stretch: normal;
              font-style: normal;
              line-height: 0.79;
              letter-spacing: -0.5px;
              text-align: center;
              color: #ffffff;
          }

          .header p {
              margin: 40px auto;
              width: 217px;
              height: 48px;
              font-family: 'Noto Sans KR', sans-serif;
              font-size: 16px;
              font-weight: 500;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.5;
              letter-spacing: -1.12px;
              text-align: center;
              color: #ffffff;
          }

          textarea.field {
              width: 502px !important;
              height: 146px;
              border-radius: 5px;
              background-color: #ffffff;
              border: none;
              padding: 18px;
              resize: none;
          }

          textarea.field::placeholder {
              width: 216px;
              height: 16px;
              font-family: 'Noto Sans KR', sans-serif;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1;
              letter-spacing: -0.96px;
              text-align: left;
              color: #868e96;
          }

          .card {
              width: 538px;
              border-radius: 5px;
              background-color: #ffffff;
              margin-bottom: 12px;
          }

          .card .metadata {
              position: relative;
              display: flex;
              font-family: 'Spoqa Han Sans';
              font-size: 11px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1;
              letter-spacing: -0.77px;
              text-align: left;
              color: #adb5bd;
              height: 14px;
              padding: 10px 23px;
          }

          .card .metadata .date {

          }

          .card .metadata .username {
              margin-left: 20px;
          }

          .contents {
              padding: 0px 23px;
              word-wrap: break-word;
              word-break: break-all;
          }

          .contents div.edit {
              display: none;
          }

          .contents textarea.te-edit {
              border-right: none;
              border-top: none;
              border-left: none;
              resize: none;
              border-bottom: 1px solid #212529;
              width: 100%;
              font-family: 'Spoqa Han Sans';
          }

          .footer {
              position: relative;
              height: 40px;
          }

          .footer img.icon-start-edit {
              cursor: pointer;
              position: absolute;
              bottom: 14px;
              right: 55px;
              width: 18px;
              height: 18px;
          }

          .footer img.icon-end-edit {
              cursor: pointer;
              position: absolute;
              display: none;
              bottom: 14px;
              right: 55px;
              width: 20px;
              height: 15px;
          }

          .footer img.icon-delete {
              cursor: pointer;
              position: absolute;
              bottom: 12px;
              right: 19px;
              width: 14px;
              height: 18px;
          }

          #cards-box {
              margin-top: 12px;
          }
      </style>
      <script>
          // 미리 작성된 영역 - 수정하지 않으셔도 됩니다.
          // 사용자가 내용을 올바르게 입력하였는지 확인합니다.
          function isValidContents(contents) {
              if (contents == '') {
                  alert('내용을 입력해주세요');
                  return false;
              }
              if (contents.trim().length > 140) {
                  alert('공백 포함 140자 이하로 입력해주세요');
                  return false;
              }
              return true;
          }

          // 익명의 username을 만듭니다.
          function genRandomName(length) {
              let result = '';
              let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              let charactersLength = characters.length;
              for (let i = 0; i < length; i++) {
                  let number = Math.random() * charactersLength;
                  let index = Math.floor(number);
                  result += characters.charAt(index);
              }
              return result;
          }

         // 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
         // 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
          function editPost(id) {
              showEdits(id);
              let contents = $(`#${id}-contents`).text().trim();
              $(`#${id}-textarea`).val(contents);
          }

          function showEdits(id) {
              $(`#${id}-editarea`).show();
              $(`#${id}-submit`).show();
              $(`#${id}-delete`).show();

              $(`#${id}-contents`).hide();
              $(`#${id}-edit`).hide();
          }
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // 여기서부터 코드를 작성해주시면 됩니다.

          $(document).ready(function () {
              // HTML 문서를 로드할 때마다 실행합니다.
              getMessages();
          })

          // 메모를 불러와서 보여줍니다.
          function getMessages() {
              // 1. 기존 메모 내용을 지웁니다.
              $('#cards-box').empty();
              // 2. 메모 목록을 불러와서 HTML로 붙입니다.
              $.ajax({
                  type: 'GET',
                  url: '/api/memos',
                  success: function (response) {
                      for (let i = 0; i < response.length; i++) {
                          let message = response[i];
                          let id = message['id'];
                          let username = message['username'];
                          let contents = message['contents'];
                          let modifiedAt = message['modifiedAt'];
                          addHTML(id, username, contents, modifiedAt);
                      }
                  }
              })
          }

          // 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
          function addHTML(id, username, contents, modifiedAt) {
              // 1. HTML 태그를 만듭니다.
              let tempHtml = `<div class="card">
                  <!-- date/username 영역 -->
                  <div class="metadata">
                      <div class="date">
                          ${modifiedAt}
                      </div>
                      <div id="${id}-username" class="username">
                          ${username}
                      </div>
                  </div>
                  <!-- contents 조회/수정 영역-->
                  <div class="contents">
                      <div id="${id}-contents" class="text">
                          ${contents}
                      </div>
                      <div id="${id}-editarea" class="edit">
                          <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                      </div>
                  </div>
                  <!-- 버튼 영역-->
                  <div class="footer">
                      <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                      <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                      <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                  </div>
              </div>`;
              // 2. #cards-box 에 HTML을 붙인다.
              $('#cards-box').append(tempHtml);
          }

          // 메모를 생성합니다.
          function writePost() {
              // 1. 작성한 메모를 불러옵니다.
              let contents = $('#contents').val();

              // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
              if (isValidContents(contents) == false) {
                  return;
              }
              // 3. genRandomName 함수를 통해 익명의 username을 만듭니다.
              let username = genRandomName(10);

              // 4. 전달할 data JSON으로 만듭니다.
              let data = {'username': username, 'contents': contents};

              // 5. POST /api/memos 에 data를 전달합니다.
              $.ajax({
                  type: "POST",
                  url: "/api/memos",
                  contentType: "application/json",
                  data: JSON.stringify(data),
                  success: function (response) {
                      alert('메시지가 성공적으로 작성되었습니다.');
                      window.location.reload();
                  }
              });
          }

          // 메모를 수정합니다.
          function submitEdit(id) {
              // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
              let username = $(`#${id}-username`).text().trim();
              let contents = $(`#${id}-textarea`).val().trim();

              // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
              if (isValidContents(contents) == false) {
                  return;
              }

              // 3. 전달할 data JSON으로 만듭니다.
              let data = {'username': username, 'contents': contents};

              // 4. PUT /api/memos/{id} 에 data를 전달합니다.
              $.ajax({
                  type: "PUT",
                  url: `/api/memos/${id}`,
                  contentType: "application/json",
                  data: JSON.stringify(data),
                  success: function (response) {
                      alert('메시지 변경에 성공하였습니다.');
                      window.location.reload();
                  }
              });
          }

          // 메모를 삭제합니다.
          function deleteOne(id) {
              // 1. DELETE /api/memos/{id} 에 요청해서 메모를 삭제합니다.
              $.ajax({
                  type: "DELETE",
                  url: `/api/memos/${id}`,
                  success: function (response) {
                      alert('메시지 삭제에 성공하였습니다.');
                      window.location.reload();
                  }
              })
          }
      </script>
  </head>

  <body>
  <div class="background-header">

  </div>
  <div class="background-body">

  </div>
  <div class="wrap">
      <div class="header">
          <h2>Timeline Service</h2>
          <p>
              공유하고 싶은 소식을 입력해주세요.
              24시간이 지난 뒤에는 사라집니다.
          </p>
      </div>
      <div class="area-write">
          <textarea class="field" placeholder="공유하고 싶은 소식을 입력해주세요" name="contents" id="contents" cols="30"
                    rows="10"></textarea>
          <!--            <button class="btn btn-danger" onclick="writePost()">작성하기</button>-->
          <img src="send.png" alt="" onclick="writePost()">
      </div>
      <div id="cards-box" class="area-read">
          <div class="card">
              <!-- date/username 영역 -->
              <div class="metadata">
                  <div class="date">
                      October 10, 2020
                  </div>
                  <div class="username">
                      anonymous
                  </div>
              </div>
              <!-- contents 조회/수정 영역-->
              <div class="contents">
                  <div id="1-contents" class="text">
                      dsafnkalfklewakflekelafkleajfkleafkldsankflenwaklfnekwlafneklwanfkelawnfkelanfkleanfklew
                  </div>
                  <div id="1-editarea" class="edit">
                      <textarea id="1-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                  </div>
              </div>
              <!-- 버튼 영역-->
              <div class="footer">
                  <img id="1-edit" class="icon-start-edit" src="edit.png" alt="" onclick="editPost('1')">
                  <img id="1-delete" class="icon-delete" src="delete.png" alt="" onclick="deleteOne('1')">
                  <img id="1-submit" class="icon-end-edit" src="done.png" alt="" onclick="submitEdit('1')">
              </div>
          </div>
          <div class="card">
              <!-- date/username 영역 -->
              <div class="metadata">
                  <div class="date">
                      October 10, 2020
                  </div>
                  <div class="username">
                      anonymous
                  </div>
              </div>
              <!-- contents 조회/수정 영역-->
              <div class="contents">
                  <div id="1-contents" class="text">
                      dsafnkalfklewakflekelafkleajfkleafkldsankflenwaklfnekwlafneklwanfkelawnfkelanfkleanfklew
                  </div>
                  <div id="1-editarea" class="edit">
                      <textarea id="1-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                  </div>
              </div>
              <!-- 버튼 영역-->
              <div class="footer">
                  <img id="1-edit" onclick="editPost('1')" class="icon-start-edit" src="edit.png" alt="">
                  <img id="1-delete" onclick="deleteOne('1')" class="icon-delete" src="delete.png" alt="">
                  <img id="1-submit" onclick="submitEdit('1')" class="icon-end-edit" src="done.png" alt="">
              </div>
          </div>
      </div>
  </div>
  </body>

  </html>
  ```

---

## 17. 마무리 & 숙제

드디어 End to End로 **Timeline Service**를 완성했다. 🎉

**3주차 복습 포인트**

- **REST API** CRUD 전체 프로세스 복습
- **HTML, CSS, Javascript, jQuery**로 화면을 만들고 조작하는 방법 학습
- API를 먼저 설계하고, 그에 따라 클라이언트 코드를 작성하는 프로세스 습득

---

### 숙제

타임라인 서비스가 불러오는 메모 목록을 **조회 시간으로부터 24시간 이내**의 것만 표시하도록 변경해보자.

- 힌트 1) `spring jpa localtime between` 으로 검색해보자.
- 힌트 2) 현재 시각은 `LocalDateTime.now()`, 하루 전은 `LocalDateTime.now().minusDays(1)`

**제출 파일**
- `MemoRepository.java`
- `MemoController.java`
