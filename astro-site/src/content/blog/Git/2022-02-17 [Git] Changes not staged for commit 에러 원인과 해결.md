---
title: "[Git] Changes not staged for commit 에러 원인과 해결"
date: 2022-02-17
category: "Git"
tags: ["Git"]
description: "정상적으로 쓰던 레포지토리에서 갑자기 Changes not staged for commit 에러가 뜨는 경우, 원인별 해결 방법을 정리한다. (파일 잠금·중첩 .git 두 케이스)"
permalink: "study/2022/02/17/git-Changes-not-staged-for-commit에러"
---
<!-- 처음 정리 2022-02, 재정리 2022-07 -->

## 에러 증상

정상으로 쓰던 레포지토리에서 파일을 추가하고 `git add .` 후 커밋하려 하면

```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
```

커밋이 스테이지에 올라가지 않았다는 에러가 뜨거나,

```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
```

추적할 수 없는 파일이라는 메시지가 함께 뜬다.

`git add -A`나 `git commit -a`를 써봐도 같은 에러가 나고, 상위 폴더에서 git 설정을 한 건 아닌지 확인해봐도 같은 폴더인데 에러가 계속 발생하는 경우 아래 원인들을 확인해 보자.

---

## 원인 1 — 관련 파일이 열려 있음 (파일 잠금)

![20220217_173041](/assets/20220217_173041.png)

직접적으로 경로를 지정해 `git add`해 보면

![20220217_173552](/assets/20220217_173552.png)
![20220217_173540](/assets/20220217_173540.png)

특정 폴더(예: `Reference`)만 add가 안 되고 나머지는 정상 add가 된다.

![20220217_174011](/assets/20220217_174011.png)

왜 안 되는지 확인해 보니

![20220217_173333](/assets/20220217_173333.png)

엑셀 파일(csv)이 열려 있었다. 이 파일이 열려 있어서 해당 폴더에서는 add가 안 되었고, `git add .`로 전체 폴더를 add할 때도 에러가 났던 것.

![20220217_174017](/assets/20220217_174017.png)

**해결**: add하기 전에 관련 파일(엑셀·편집기 등)이 열려 있는지 확인하고 닫은 뒤 다시 add한다.

---

## 원인 2 — 중첩 .git 폴더 (git clone 시 하위 폴더에도 .git 생성)

![20220731_174221](https://user-images.githubusercontent.com/37941513/182812120-a76b3cdd-df55-4a66-a981-7b1bdd74aa35.png)

`git clone`을 하면 루트 폴더뿐 아니라 안에 내부 폴더까지 `.git`이 생기는 경우가 있다.

루트 폴더에서 `git add .` 후 `status`를 확인해봐도 계속 같은 에러가 뜨는데, 자식 폴더의 `.git`에서 add하고 커밋해보면 에러가 사라진다.

![20220731_180430](https://user-images.githubusercontent.com/37941513/182812221-d9829ee1-37ae-4788-a1f1-c86ba52ef019.png)

단, 자식 폴더에서 push하면 위와 같은 에러가 뜨기 때문에, 상위 폴더 `.git`에서 add하고 커밋해야 정상적으로 들어간다.

![20220731_180616](https://user-images.githubusercontent.com/37941513/182812273-3cb821f1-20d8-42d6-8a4c-bd592d0b881c.png)

push 성공.

**해결**: 루트 폴더에서 작업하되, 하위 폴더에 불필요하게 생긴 `.git`은 삭제하거나 서브모듈로 등록되어 있는지 확인한다.

---

## 참고

- [git commit a untracked files — Stack Overflow](https://stackoverflow.com/questions/8470547/git-commit-a-untracked-files)
- [What does "Changes not staged for commit" mean — Stack Overflow](https://stackoverflow.com/questions/21134960/what-does-changes-not-staged-for-commit-mean)
- [https://dubaiyu.tistory.com/8](https://dubaiyu.tistory.com/8)
