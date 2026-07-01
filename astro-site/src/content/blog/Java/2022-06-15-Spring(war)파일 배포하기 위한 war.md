---
title: "[java] Spring WAR 파일을 Tomcat에 직접 배포하는 법"
date: 2022-05-01
category: "Java"
tags: ["Java"]
description: "Eclipse에서 Spring 프로젝트를 WAR로 내보내고 Tomcat에 직접 배포하는 8단계 절차를 스크린샷과 함께 정리한다."
permalink: "class/2022/05/01/Spring(war)파일-배포하기-위한-war"
---

Spring 프로젝트를 **WAR(Web Application Archive)** 파일로 묶어 Tomcat에 직접 배포하는 과정을 단계별로 정리한다.

---

## 1단계 — 프로젝트 WAR 내보내기

완성된 프로젝트 폴더를 우클릭 → **Export > WAR file** 을 선택한다.

![20220615_220955](/assets/20220615_220955.png)

---

## 2단계 — WAR 파일 경로·이름 설정

저장 경로를 지정하고(빈 폴더 권장), 파일명 끝에 반드시 `.war` 확장자를 붙인다.

![20220615_221110](/assets/20220615_221110.png)

---

## 3단계 — Export 체크리스트 3항목 모두 선택

Export 옵션 화면에서 체크리스트 3곳을 전부 체크한 후 완료한다.

![20220615_221201](/assets/20220615_221201.png)

---

## 4단계 — 배포 폴더에 프로젝트·server.xml 복사

앞서 지정한 폴더에 WAR 파일과 **server.xml**을 함께 넣는다.
`server.xml`은 IDE 내 `Servers\Tomcat v9.0 Server at localhost-config\server.xml`에서 가져온다(Tomcat 폴더에 배치할 것).

![20220615_222250](/assets/20220615_222250.png)

![20220615_222332](/assets/20220615_222332.png)

![20220615_222348](/assets/20220615_222348.png)

---

## 5단계 — WAR 파일을 webapps 폴더에 압축 해제

Tomcat의 `webapps` 폴더 안에 Export한 WAR 파일을 풀어 넣는다.

![20220615_225043](/assets/20220615_225043.png)

---

## 6단계 — server.xml 교체

IDE 서버 설정에서 가져온 `server.xml`로 Tomcat의 `conf/server.xml`을 **덮어쓴다**.

![20220615_225208](/assets/20220615_225208.png)

---

## 7단계 — Tomcat 기동

Tomcat 폴더의 `bin` 디렉터리에서 **startup.bat**을 실행해 서버를 올린다.

![20220615_222442](/assets/20220615_222442.png)

---

## 8단계 — 브라우저에서 접속 확인

Tomcat이 뜨면 `server.xml`에 설정한 포트·컨텍스트 경로로 접속해 배포 결과를 확인한다.

![20220615_223440](/assets/20220615_223440.png)
