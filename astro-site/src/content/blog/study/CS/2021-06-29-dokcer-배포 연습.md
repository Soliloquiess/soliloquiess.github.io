---
title: "[DevOps] Docker로 Jenkins 컨테이너 배포 실습하기"
date: 2021-06-29
category: "DevOps"
tags: ["DevOps"]
description: "Docker Desktop 설치부터 기본 명령어, Jenkins 컨테이너 실행 및 초기 패스워드 확인까지 Docker 배포 첫걸음을 정리한 실습 노트."
permalink: "study/2021/06/29/dokcer-배포-연습"
---

## 도커 개발환경 설정

| 단계 | 내용 |
|------|------|
| 1. 설치 | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) |
| 2. 버전 확인 | `docker -v` |
| 3. Hello World 실행 | `docker run hello-world` |

---

## 도커 기본 명령어

| 명령어 | 설명 |
|--------|------|
| `docker ps -a` | 컨테이너 전체 조회 |
| `docker rm [ID 또는 name]` | 컨테이너 삭제 |
| `docker images` | 이미지 조회 |
| `docker rmi [이미지 id 또는 이미지명:TAG]` | 이미지 삭제 |

---

## 서비스 연습

### Jenkins 컨테이너 실행

`docker run --name myjenkins -d -p 9080:8080 jenkins/jenkins`

![Jenkins 실행 화면](/assets/20210629_203625_zoxjhktu1.png)

![Jenkins 접속 화면](/assets/20210629_203647.png)

### 초기 패스워드 확인

![Jenkins 초기 패스워드 출력](/assets/20210629_203730.png)
