---
title: "[DevOps] WSL2로 Ubuntu 설치하고 Docker·Nginx 띄우기"
date: 2021-06-29
category: "DevOps"
tags: ["DevOps"]
description: "Windows에서 WSL2와 Ubuntu 20.04 LTS를 설치하고, Docker WSL2 연동 후 Nginx 컨테이너까지 실행하는 전 과정을 스크린샷과 함께 정리한 실습 노트."
permalink: "study/2021/06/29/리눅스-설치-방법"
---

## WSL2 설치

![WSL 설치 화면 1](/assets/2.png)

![WSL 설치 화면 2](/assets/3.png)

**WSL2** 다운로드 후 설치한다.

![WSL2 다운로드](/assets/4.png)

![WSL2 설치 진행](/assets/5.png)

설치 완료 후 윈도우 마켓에서 **우분투 20.04 LTS** 버전을 설치한다.

![Ubuntu 20.04 LTS 설치](/assets/6.png)

설치가 끝나면 이제 파워쉘은 안 써도 된다.

---

## Ubuntu 초기 설정

![Ubuntu 초기 실행](/assets/7_p486u61bb.png)

비밀번호를 입력한다.

![비밀번호 입력 화면](/assets/8.png)

![설정 완료 화면](/assets/9.png)

터미널에서 Ubuntu를 열 때는 상단 메뉴바의 화살표를 누르면 Ubuntu 항목이 보인다.

![터미널에서 Ubuntu 선택](/assets/10.png)

---

## Docker + WSL2 연동

![Docker WSL2 설정 1](/assets/11.png)

![Docker WSL2 설정 2](/assets/12.png)

Docker가 Ubuntu에서 안 띄워졌는데, 위 항목을 체크하고 실행하면 정상 작동한다.

---

## Nginx 컨테이너 실행

**Exposing external port:**

```
docker run --name nginx-test -d -p 8080:80 nginx:latest
```

`http://localhost:8080` 또는 `http://host-ip:8080` 으로 접속하면 nginx 최신 버전을 받아온다.

![Nginx 실행 확인](/assets/13_nx1s4tk2s.png)

localhost:8080으로 접속하면 Nginx가 실행된 것을 확인할 수 있다.

---

## 덤 — VirtualBox 트러블슈팅

저번 주에 Docker 설치하려고 VirtualBox에서 Ubuntu와 CentOS를 밀고 다시 설치하려 했는데,

![VirtualBox 설치 오류](/assets/14.png)

이런 트러블이 계속 설치 도중 떠서 ISO를 새로 받고 온갖 방법을 다 써봤지만 해결이 안 됐다. 포맷까지 고려했으나 **VirtualBox를 최신 버전으로 업데이트**하니 해결되었다.
