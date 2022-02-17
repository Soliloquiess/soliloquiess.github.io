---
title: "[Git] Git Changes not staged for commit에러"
layout: post
subtitle: Git
date: "2022-02-17-05:58:53 +0900"
categories: study
tags: Git
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

정상으로 깃 쓰던 레포지토리에 파일 추가하고 add .를 한 뒤
커밋을 하니까



![20220217_173041](/assets/20220217_173041.png)

이런 식으로

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)


커밋이 스테이지에 안 올라 갔다고 에러가 떴다

![20220217_173133](/assets/20220217_173133.png)


또한

Untracked files:
  (use "git add <file>..." to include in what will be committed)


의 추적할 수 없는 파일이라 했는데

https://stackoverflow.com/questions/8470547/git-commit-a-untracked-files


스택 오버플로우에서의 git add -A나
git commit -a 을 써봐도 같은 에러가 났고 같은 폴더인지 확인하고 상위폴더에서 git 설정을 한건 아닌지 확인해 봐도 같은 폴더였고 에러내용은 동일하게 뜨던 와중

https://stackoverflow.com/questions/21134960/what-does-changes-not-staged-for-commit-mean

https://dubaiyu.tistory.com/8

이 분이 올리신 내용을 보고 직접적으로 경로를 add 해 갔다

![20220217_173552](/assets/20220217_173552.png)
![20220217_173540](/assets/20220217_173540.png)


![20220217_174011](/assets/20220217_174011.png)

그러니 Reference파일 빼고는 정상 add가 되었다

그렇게 왜 안되나 확인하던 차

![20220217_173333](/assets/20220217_173333.png)

엑셀 파일(csv)이 열려있었다. 이 파일이 열려 있어서 직접적인 폴더 Reference에서는 add가 안되었고 git add. 로 전체 폴더를 add시에도 에러가 났던 것.

![20220217_174017](/assets/20220217_174017.png)

간단한 문제였는데 add 하기 전에는 관련 파일이 열려있는지 잘 확인해보자.
