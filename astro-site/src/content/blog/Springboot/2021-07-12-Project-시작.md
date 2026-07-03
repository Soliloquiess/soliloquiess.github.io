---
title: "[Springboot] Project 시작 - DB 테이블 설계"
date: 2021-07-12
category: "Springboot"
tags: ["Springboot"]
description: "커뮤니티 프로젝트를 시작하며 dbdiagram 문법으로 users, article, comment 등 주요 테이블과 관계를 설계한 기록이다."
permalink: "study/2021/07/12/pj-시작"
---

## 프로젝트 시작

새 프로젝트를 시작하면서 가장 먼저 데이터베이스 테이블 구조를 잡았다.
아래는 [dbdiagram](https://dbdiagram.io) 문법으로 작성한 테이블 정의(DBML)이다.

## 테이블 설계 (DBML)

### LEVEL 1 - Tables and References

```
//// -- LEVEL 1
//// -- Tables and References

// Creating tables
Table users as U{
  id int [pk, increment] // auto-increment
  username varchar [unique]
  email varchar [unique]
  nickname varchar [unique]
  categories varchar
  count int
  comment_count int
  level int
  introduce int
  point int
  big3 int
  created_at timestamp
}

Table normal_Article  {
  id int [pk, increment] // auto-increment
  title varchar
  content text
  user_id int [ref:> users.id]
  article_categories varchar
  created_at timestamp
}

table column {
  id int [pk, increment] // auto-increment
  title varchar
  content text
  user_id int [ref:> users.id]
  comment_id int
  created_at timestamp
}

Table article_files {
  id int [pk, increment]
  url varchar
  article_id int [ref:> normal_Article.id]
}


table column_files{
  id int [pk, increment]
  url varchar
  column_id int [ref:> column.id]
}

Table comments  {
  id int [pk, increment] // auto-increment
  user_id int
  article_id int [ref:> normal_Article.id]
  content text
  created_at timestamp
}

Table like {
 like_target int [ref:> column.id]
 liker int [ref:> users.id]
}

Table article_like {
 like_target int [ref:> normal_Article.id]
 liker int [ref:> users.id]
}

Table following {
following int [ref:> users.id]
 follower int [ref:> users.id]
}

Table medal {
  id int [pk, increment]
  title varchar
  content text
  userid int [ref:> users.id]
}

Table challenge {
  id int [pk, increment]
  title varchar
  content text
  userid int [ref:> users.id]
}

//Ref: "users"."username" < "users"."id"


// Ref: "challenge"."id" < "challenge"."title"
```

## 테이블 요약

| 테이블 | 역할 |
| --- | --- |
| `users` | 회원 정보 (등급, 포인트, 코멘트 수 등) |
| `normal_Article` | 일반 게시글 |
| `column` | 칼럼 게시글 |
| `article_files` / `column_files` | 각 게시글에 첨부되는 파일 |
| `comments` | 댓글 |
| `like` / `article_like` | 칼럼/게시글 좋아요 |
| `following` | 팔로우 관계 |
| `medal` / `challenge` | 메달, 챌린지 |

## 함께 공부할 JS 개념

> 실행 컨텍스트, 이벤트 루프, 스코프, 프로미스, 프로토타입
