---
title: "[React] React 기본정리 part2"
layout: post
subtitle: React-Vue
date: "2021-10-04 19:45:51 +0900"

categories: study
tags: React-Vue
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


### 이미지 넣는 법 & public 폴더 이용하기


리액트는 원래 좀 자유롭습니다.

이미지 넣는 법도 서너개 있습니다.





강의에서 사용하는 신발 이미지 URL



https://codingapple1.github.io/shop/shoes1.jpg

https://codingapple1.github.io/shop/shoes2.jpg

https://codingapple1.github.io/shop/shoes3.jpg







이거 붙여넣으면 가로로 균일하게 3개로 쪼개줍니다

```
<div className="container">
  <div className="row">
    <div className="col-md-4">안녕</div>
    <div className="col-md-4">안녕</div>
    <div className="col-md-4">안녕</div>
  </div>
</div>
```
모바일 사이즈에선 알아서 세로로 정렬해줍니다.

Bootstrap쓰면 레이아웃 짜는게 약간 간편해집니다.

물론 CSS 잘하면 직접 하는게 더 효율적임




------------


### 코드 길어지면 import export 하면 됩니다


오늘의 숙제 :

1. 오늘 만든 상품목록을 컴포넌트로 만들어봅시다. 길면 다른 파일로 빼십쇼

2. 컴포넌트만들면 그 안에 데이터바인딩도 아마 다시해야겠군요

3. 반복적인 html이나 컴포넌트를 발견하면 연습삼아 map 반복문을 써봅시다.









쇼핑몰에 필요한 상품데이터


```
[
  {
    id : 0,
    title : "White and Black",
    content : "Born in France",
    price : 120000
  },

  {
    id : 1,
    title : "Red Knit",
    content : "Born in Seoul",
    price : 110000
  },

  {
    id : 2,
    title : "Grey Yordan",
    content : "Born in the States",
    price : 130000
  }
]

```
App.js 안의 state에 저장해서 사용하면 됩니다.

아무튼 서버에서 보낸 것이라고 생각합시다.  


-------

저번시간 숙제 해설 (Card 컴포넌트 만들기)

새로운 내용 없으니 숙제 잘했으면 다음강의로 넘어갑시다.

저는


```
<div className="col-md-4">
```
있는 부분을 Card> 컴포넌트로 만들어봤고

Card>가 3개 있으니까 그걸 반복문 돌려서 숙제를 해결했다고 합니다.

방법은 달라도 잘되면 다 정답입니다.

--------

### 리액트 라우터 1 : 셋팅이랑 기본 라우팅


오늘의 숙제 :

/detail로 접속하면 보여줄 상세페이지를 컴포넌트를 이용해서 만들어오십시오.

코드 너무 기니까 다른 파일에 작성해봅시다.







페이지를 나누고 싶으면

일반 html css js 사이트는 그냥 html 파일 여러개 만들면 그게 하나의 페이지인데

근데 리액트는 html 파일을 하나만 사용합니다.

그래서 리액트에선 누가 다른 페이지 요청하면 그냥 내부에 있는 <div>를 갈아치워서 보여주면 됩니다.

근데 직접 코드짜면 귀찮으니 react-router-dom 이라는 외부 라이브러리 설치해서 구현하는게 일반적이라 그렇게 해봅시다.







상세페이지에 들어갈 html 레이아웃


```
<div className="container">
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">상품명</h4>
      <p>상품설명</p>
      <p>120000원</p>
      <button className="btn btn-danger">주문하기</button>
    </div>
  </div>
</div>
```
붙여넣으면 상세페이지같은 레이아웃이 하나 생성됩니다.

숙제할 때 사용합시다.
