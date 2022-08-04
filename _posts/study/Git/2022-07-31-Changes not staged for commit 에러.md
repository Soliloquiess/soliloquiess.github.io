---
title: "[Git] Git Changes not staged for commit 에러"
layout: post
subtitle: Git
date: "2022-07-31-05:58:53 +0900"
categories: study
tags: Git
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


#### Git Changes not staged for commit 에러

종종 깃 커밋하다보면 저런 에러가 뜬다. (너무 화남)

그래서 이 기회에 그냥 적어두려고 한다.
다양한 에러가 있겠지만 일단 나같은 경우

![20220731_174221](https://user-images.githubusercontent.com/37941513/182812120-a76b3cdd-df55-4a66-a981-7b1bdd74aa35.png)


이런식으로 (안에는 untracked 관련 에러로 파일을 못 찾는다 떴다).

프로젝트는 git clone해둔 상태였고 git clone을 하면 루트폴더 뿐 아니라 안에 내부 폴더까지 .git이 생겼다.

루트폴더에서 git add. 후 status를 확인해 봐도 계속 같은 에러가 떠서

그냥 자식 폴더 .git에서 add를 하고 커밋해보니 에러가 사라졌다.

![20220731_180430](https://user-images.githubusercontent.com/37941513/182812221-d9829ee1-37ae-4788-a1f1-c86ba52ef019.png)


대신 푸쉬를 하면 위와같은 에러가 뜨길래 상위 폴더에 있는 깃에서 add 하고 커밋해보니 잘 들어가긴 한다.

![20220731_180616](https://user-images.githubusercontent.com/37941513/182812273-3cb821f1-20d8-42d6-8a4c-bd592d0b881c.png)


push 성공
