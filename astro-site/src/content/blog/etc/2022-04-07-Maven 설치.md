---
title: "Window10 Maven 완전 설치 가이드"
date: 2022-04-07
category: "Etc"
tags: ["Etc"]
description: "Windows 10에서 Apache Maven을 다운로드하고 환경 변수를 설정하여 mvn 명령어를 사용할 수 있도록 구성하는 단계별 설치 가이드."
permalink: "etc/2022/04/07/Maven-설치"
---

## 1. Maven 다운로드

Maven 공식 홈페이지에서 **Binary zip** 파일을 받는다.

![20220407_121523](/assets/20220407_121523.png)

https://maven.apache.org/download.cgi

---

## 2. 환경 변수 설정 — MAVEN_HOME

`D:` 드라이브에 zip 파일을 압축 해제한 후, 시스템 환경 변수를 설정한다.

**사용자 변수 → 새로 만들기:**

| 항목 | 값 |
|------|-----|
| **변수 이름** | `MAVEN_HOME` |
| **변수 값** | zip 압축을 푼 경로 (`bin` 폴더의 바로 상위 경로) |

![20220407_125227](/assets/20220407_125227.png)
![20220407_125251](/assets/20220407_125251.png)

---

## 3. 시스템 변수 PATH 편집

시스템 변수 `Path`를 편집(새로 만들기)하여 아래 경로를 추가한다.

```
%MAVEN_HOME%\bin
```

![20220407_135830](/assets/20220407_135830.png)
![20220407_135813](/assets/20220407_135813.png)

---

## 4. 설치 확인

```
mvn -version
```

![20220407_141850](/assets/20220407_141850.png)

---

## 5. 프로젝트 생성

아래 명령어로 Maven 프로젝트를 생성한다.

```
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false

```

![20220407_160236](/assets/20220407_160236.png)
![20220407_160307](/assets/20220407_160307.png)

---

## 6. 빌드 실행

생성된 프로젝트 디렉토리로 이동 후 빌드한다.

![20220407_160428](/assets/20220407_160428.png)

```
mvn package
```

빌드 시 아래 단계를 순서대로 거친다.

1. 확인
2. 소스 생성
3. 프로세스 소스
4. 자원 생성
5. 프로세스 리소스

![20220407_160518](/assets/20220407_160518.png)

빌드 성공 메시지와 함께 `Hello World`가 출력된다.

---

## 추가 Maven 명령어 (Maven in 30 Minutes)

### 소스 컴파일

```
mvn compile
```

![20220407_170028](/assets/20220407_170028.png)

---

### 단위 테스트 실행

테스트 소스를 컴파일하고 단위 테스트를 실행한다.

```
mvn test
```

![20220407_181206](/assets/20220407_181206.png)

---

### JAR 생성 및 로컬 리포지토리 설치

```
mvn package
```

---

### 기본 사이트 정보 생성

Maven 사이트를 커스터마이즈하고 싶지만 시간이 촉박한 경우, 프로젝트에 대한 기본 정보를 제공하는 사이트를 생성한다.

```
mvn site
```

---

### 시스템 속성 포함 리소스 처리

`application.properties` 파일에 시스템 속성 값을 포함시켜 실행한다.

```
mvn process-resources "-Dcommand.line.prop=hello again"

```

---

### 멀티 모듈 빌드 검증

한 번에 둘 이상의 프로젝트를 빌드한다. Maven에 내장된 여러 모듈 처리 기능으로, WAR 빌드 시 의존하는 JAR도 한 단계에 포함할 수 있다.

```
mvn verify
```

![20220407_181615](/assets/20220407_181615.png)

---
