---
title: "[DevOps] 배포 자동화 — AWS 배포 스크립트·Travis CI"
date: 2021-11-13
category: "DevOps"
tags: ["DevOps"]
description: "AWS 인스턴스 배포 스크립트 작성과 Travis CI 연동으로 배포를 자동화하는 과정을 정리한 노트."
permalink: "study/2021/11/13/aws-travis-배포"
---

> **📚 웹 풀스택 정리 — Spring · Vue · React · 배포**
>
> [Spring 실전](/study/2021/11/13/면접-대비-Web(spring~devops).html)
> [Vue.js 실전](/study/2021/11/13/vue-실전.html)
> [React 실전](/study/2021/11/13/react-실전.html)
> 배포 자동화 ← *지금 글*

## [AWS] 스프링 부트 배포 스크립트 생성

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FufFpw%2FbtrfolbIEVG%2F5U2LKUjUUKYKODQwmh7uf0%2Fimg.png">

<br>

AWS에서 프로젝트를 배포하는 과정은 프로젝트가 수정할 때마다 똑같은 일을 반복해야한다.

#### 프로젝트 배포 과정

- `git pull`로 프로젝트 업데이트
- gradle 프로젝트 빌드
- ec2 인스턴스 서버에서 프로젝트 실행 및 배포

<br>

이를 자동화 시킬 수 있다면 편리할 것이다. 따라서 배포에 필요한 쉘 스크립트를 생성해보자.

`deploy.sh` 파일을 ec2 상에서 생성하여 아래와 같이 작성한다.

<br>

```sh
#!/bin/bash

REPOSITORY=/home/ec2-user/app/{clone한 프로젝트 저장한 경로}
PROJECT_NAME={프로젝트명}

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

./gradlew build

echo "> step1 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi

echo "> 새 애플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

nohup java -jar \
       -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
       -Dspring.profiles.active=real \
       $REPOSITORY/$JAR_NAME 2>&1 &
```

<br>

쉘 스크립트 내 경로명 같은 경우에는 사용자의 환경마다 다를 수 있으므로 확인 후 진행하도록 하자.

<br>

스크립트 순서대로 간단히 설명하면 아래와 같다.

```sh
REPOSITORY=/home/ec2-user/app/{clone한 프로젝트 저장한 경로}
PROJECT_NAME={프로젝트명}
```

자주 사용하는 프로젝트 명을 변수명으로 저장해둔 것이다.

`REPOSITORY`는 ec2 서버 내에서 본인이 git 프로젝트를 clone한 곳의 경로로 지정하며, `PROJECT_NAME`은 해당 프로젝트명을 입력하자.

<br>

```SH
echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

./gradlew build

echo "> step1 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/
```

<br>

현재 해당 경로는 clone한 곳이기 때문에 바로 `git pull`이 가능하다. 프로젝트의 변경사항을 ec2 인스턴스 서버 내의 코드에도 update를 시켜주기 위해 pull을 진행한다.

그 후 프로젝트 빌드를 진행한 뒤, 생성된 jar 파일을 현재 REPOSITORY 경로로 복사해서 가져오도록 설정했다.

<br>

```sh
CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi
```

<br>

기존에 수행 중인 프로젝트를 종료 후 재실행해야 되기 때문에 pid 값을 얻어내 kill 하는 과정을 진행한다.

현재 구동 중인 여부를 확인하기 위해서 `if else fi`로 체크하게 된다. 만약 존재하면 해당 pid 값에 해당하는 프로세스를 종료시킨다.

<br>

```sh
echo "> JAR Name: $JAR_NAME"

nohup java -jar \
       -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
       -Dspring.profiles.active=real \
       $REPOSITORY/$JAR_NAME 2>&1 &
```

<br>

`nohup` 명령어는 터미널 종료 이후에도 애플리케이션이 계속 구동될 수 있도록 해준다. 따라서 이후에 ec2-user 터미널을 종료해도 현재 실행한 프로젝트 경로에 접속이 가능하다.

`-Dspring.config.location`으로 처리된 부분은 우리가 git에 프로젝트를 올릴 때 보안상의 이유로 `.gitignore`로 제외시킨 파일들을 따로 등록하고, jar 내부에 존재하는 properties를 적용하기 위함이다.

예제와 같이 `application-oauth.properties`, `application-real-db.properties`는 git으로 올라와 있지 않아 따로 ec2 서버에 사용자가 직접 생성한 외부 파일이므로, 절대경로를 통해 입력해줘야 한다.

<br>

프로젝트의 수정사항이 생기면, EC2 인스턴스 서버에서 `deploy.sh`를 실행해주면, 차례대로 명령어가 실행되면서 수정된 사항을 배포할 수 있다.

<br>

<br>

#### [참고 사항]

- [링크](https://github.com/jojoldu/freelec-springboot2-webservice)


---

## [Travis CI] 프로젝트 연동하기

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbMIduW%2FbtrfWMtiPEC%2FENLpZFdHhIVcpV31IWNBcK%2Fimg.jpg">

<br>

> 자동으로 테스트 및 빌드가 될 수 있는 환경을 만들어 개발에만 집중할 수 있도록 하자

<br>

#### CI(Continuous Integration)

코드 버전 관리를 하는 Git과 같은 시스템에 PUSH가 되면 자동으로 빌드 및 테스트가 수행되어 안정적인 배포 파일을 만드는 과정을 말한다.

<br>

#### CD(Continuous Deployment)

빌드한 결과를 자동으로 운영 서버에 무중단 배포하는 과정을 말한다.

<br>

### Travis CI 웹 서비스 설정하기

[Travis 사이트](https://www.travis-ci.com/)로 접속하여 깃허브 계정으로 로그인 후, `Settings`로 들어간다.

Repository 활성화를 통해 CI 연결을 할 프로젝트로 이동한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcpCgp3%2Fbtrf1hF3DBd%2F6y2x40HdH0Ko8ZUB4kHV90%2Fimg.jpg">

<br>

<br>

### 프로젝트 설정하기

세부설정을 하려면 `yml`파일로 진행해야 한다. 프로젝트에서 `build.gradle`이 위치한 경로에 `.travis.yml`을 새로 생성하자

```yml
language: java
jdk:
  - openjdk11

branches:
  only:
    - main

# Travis CI 서버의 Home
cache:
  directories:
    - '$HOME/.m2/repository'
    - '$HOME/.gradle'

script: "./gradlew clean build"

# CI 실행 완료시 메일로 알람
notifications:
  email:
    recipients:
      - gyuseok6394@gmail.com
```

- `branches` : 어떤 브랜치가 push할 때 수행할지 지정
- `cache` : 캐시를 통해 같은 의존성은 다음 배포하지 않도록 설정
- `script` : 설정한 브랜치에 push되었을 때 수행하는 명령어
- `notifications` : 실행 완료 시 자동 알람 전송 설정

<br>

생성 후, 해당 프로젝트에서 `Github`에 push를 진행하면 Travis CI 사이트의 해당 레포지토리 정보에서 빌드가 성공한 것을 확인할 수 있다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbwMGb1%2FbtrfXzHcn2G%2FFjODgalLKrzYNvsx5COlxK%2Fimg.jpg">

<br>

<br>

#### *만약 Travis CI에서 push 후에도 아무런 반응이 없다면?*

현재 진행 중인 프로젝트의 GitHub Repository가 바로 루트 경로에 있지 않은 확률이 높다.

즉, 해당 레포지토리에서 추가로 폴더를 생성하여 프로젝트가 생성된 경우를 말한다.

이럴 때는 `.travis.yml`을  `build.gradle`이 위치한 경로에 만드는 것이 아니라, 레포지토리 루트 경로에 생성해야 한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzdMai%2Fbtrf1iEWSaG%2Fq2FZkc3HXXo0Nnes2MYegk%2Fimg.jpg">

<br>

그 이후 다음과 같이 코드를 추가해주자 (현재 위치로 부터 프로젝트 빌드를 진행할 곳으로 이동이 필요하기 때문)

```yml
language: java
jdk:
  - openjdk11

branches:
  only:
    - main

# ------------추가 부분----------------

before_script:
  - cd {프로젝트명}/

# ------------------------------------

# Travis CI 서버의 Home
cache:
  directories:
    - '$HOME/.m2/repository'
    - '$HOME/.gradle'

script: "./gradlew clean build"

# CI 실행 완료시 메일로 알람
notifications:
  email:
    recipients:
      - gyuseok6394@gmail.com
```

<br>

<br>

#### [참고 자료]

- [링크](https://github.com/jojoldu/freelec-springboot2-webservice)

<br>


##### 참고 : https://gyoogle.dev/blog/web-knowledge/react-knowledge/React%20Hook.html

여기보고 복붙하듯 한번씩 다 써보면서 공부하려고 노력하였습니다
