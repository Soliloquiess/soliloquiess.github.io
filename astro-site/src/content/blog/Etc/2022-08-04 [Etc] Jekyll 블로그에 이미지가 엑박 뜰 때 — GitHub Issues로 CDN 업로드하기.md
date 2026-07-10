---
title: "[Etc] Jekyll 블로그에 이미지가 엑박 뜰 때 — GitHub Issues로 CDN 업로드하기"
date: 2022-08-04
category: "Etc"
tags: ["Etc"]
description: "아무리 push해도 이미지가 엑박으로 뜰 때, GitHub Issues의 파일 업로드 기능을 CDN으로 활용해 Markdown에 이미지를 안정적으로 삽입하는 방법을 정리한다."
permalink: "etc/2022/08/04/git-블로그-jekyl-사진-올리기"
---

## 문제 상황

Atom 에디터에서 드래그 앤 드롭으로 이미지를 삽입하던 방식이 갑자기 동작하지 않았다.
아무리 push해도 이미지가 **엑박**으로 뜨는 현상이 발생해, 대안을 찾아 정리해둔다.

> 참고: [https://hyeonjiwon.github.io/blog/markdown_img/](https://hyeonjiwon.github.io/blog/markdown_img/)

---

## 해결 방법 — GitHub Issues를 이미지 CDN으로 활용

### 1단계 — GitHub Repository의 Issues 탭으로 이동

자신의 GitHub Repository에 접속한 뒤 **Issues** 탭을 클릭하고 **New issue**를 누른다.

![20220804_184747](https://user-images.githubusercontent.com/37941513/182818010-c26c7ee7-1ce9-4045-b705-0f3a61c3d1c5.png)

---

### 2단계 — 이미지 파일을 텍스트박스에 끌어다 놓기

이슈 작성 텍스트박스에 이미지 파일을 **드래그 앤 드롭** 하거나 **붙여넣기**로 첨부한다.

![20220804_180937](https://user-images.githubusercontent.com/37941513/182814263-b51a85e9-8592-4856-b49e-1aa1d753524b.png)

---

### 3단계 — 업로드된 이미지 Markdown 주소 복사

업로드가 완료되면 텍스트박스에 Markdown 이미지 링크 문법이 자동 생성된다.
이 주소를 복사한다.

![20220804_184912](https://user-images.githubusercontent.com/37941513/182818109-f76975a4-447b-4ae0-b8ad-73496656155b.png)

---

### 4단계 — md 파일에 이미지 주소 붙여넣기

복사한 Markdown 이미지 링크를 블로그 포스트 `.md` 파일의 원하는 위치에 붙여넣는다.

![20220804_185002](https://user-images.githubusercontent.com/37941513/182818281-63f3e336-2688-4412-bcca-3dbc9fd1fa6f.png)

---

push 후 블로그에서 이미지가 정상적으로 표시되는지 확인한다.
