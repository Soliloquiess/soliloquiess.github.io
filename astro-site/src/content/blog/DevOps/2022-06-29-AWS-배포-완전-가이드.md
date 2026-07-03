---
title: "[DevOps] AWS 배포 완전 가이드 — EC2·RDS·Git 연동·HTTPS"
date: 2022-06-30
category: "DevOps"
tags: ["DevOps"]
permalink: "study/2022/06/30/AWS-인스턴스-생성-및-설정"
description: "AWS 배포 전 과정을 하나로 정리한 통합 가이드. EC2 인스턴스 생성·설정부터 EC2 Linux 환경 설치, RDS(DB) 생성, Git 연동, HTTPS(SSL) 적용, 그리고 로컬/원격 트러블슈팅까지 순서대로 다룬다."
---

AWS 배포 과정을 매번 까먹어서(항상 안 하면 까먹는다 ㅠ) 한 번에 정리해 둔 통합 가이드다.

배포 흐름은 다음 순서로 진행한다.

1. **EC2 인스턴스 생성·설정** (Windows Server 기준)
2. **EC2 Linux 환경 설치** (putty · 자바 · 타임존 · HostName · RDS 접속)
3. **RDS(DB) 생성 및 파라미터 설정**
4. **Git 연동/배포**
5. **HTTPS(SSL) 적용** (ACM · Route 53 · 가비아 · 로드밸런서)
6. **트러블슈팅** — 로컬/원격 삽질 기록

<br>

---

## 1단계. EC2 인스턴스 생성·설정

### 1-1. 인스턴스 생성

**단계 1: Amazon Machine Image(AMI) 선택**

![20220630_204818](/assets/20220630_204818.png)

여기서 프리티어인 Window Server 2019 base를 선택한다.

<br>

**단계 2: 인스턴스 유형 선택**

![20220630_204952](/assets/20220630_204952.png)

그대로인 프리티어 설정 선택 그리고 검토 및 시작을 누르게 되면 "단계 7: 인스턴스 시작 검토" 로 바로 이동하게 된다.

<br>

**단계 7: 인스턴스 시작 검토**

![20220630_205709](/assets/20220630_205709.png)

바로 2단계에서 7단계로 오는 데 시작하기를 누르게 되면 인스턴스 생성이 완료 된다.

<br>

---

### 1-2. ※ 기존 키 페어 생성 또는 새 키 생성

![20220630_211231](/assets/20220630_211231.png)

저기 우측 상단 지역 설정이 있는데 만약 키를 만들었음에도 새키페어 등록이 나오거나 기존키 페어를 봤는데 없을 경우가 있다.

만약 서울 선택하고 키를 만들었는데 설정이 미국 오하이오 북부거나 이런식으로 다르게 설정이 되어있으면 키가 안 나와서 적는다.

![20220630_213450](/assets/20220630_213450.png)

생성 후 상태검사에 가보면 통과 했다고 알려주게 된다.

![20220701_094757](/assets/20220701_094757.png)

그리고 위에 인스턴스 부분을 체크하고 연결을 선택

<br>

---

### 1-3. 원격 데스크톱 연결

![20220701_094955](/assets/20220701_094955.png)

그리고 클릭하게 되면 위와 같은 화면이 나온다.

인스턴스 연결이 나오면 RDP 클라이언트로 가서 아래 보면 원격 데스크톱 파일 다운로드가 있다.

> 원격 데스크톱 파일은 원격 서버에 연결할 수 있는 정보가 담긴 파일. 바로가기와 유사하고 원격 서버에 연결할 떄는 이 파일을 더블클릭한다.

![20220701_095346](/assets/20220701_095346.png)

위 파일이 받아지고 실행시킨다.

가상 컴퓨터 접속하려면 id,pw 넣고 아까 저장한 파일 (키 페어 파일)을 열면 암호가 나온다.

![20220701_095525](/assets/20220701_095525.png)

실행하고 연결을 하게 되면 사용자 자격 증명 입력 어쩌구 하면서 암호 화면이 나오게 된다.

<br>

---

### 1-4. 암호 가져오기(암호 해독)

![20220701_100137](/assets/20220701_100137.png)

그리고 아까 화면에서 아래 보면 암호와 암호 가져오기 버튼이 있다.

![20220701_100204](/assets/20220701_100204.png)

![20220701_100258](/assets/20220701_100258.png)

암호 가져오기 버튼에서 Browse버튼을 누르고 이전에 받아둔 key.pem파일을 넣는다. 그리고 암호 해독 버튼 실행

![20220701_100344](/assets/20220701_100344.png)

인스턴스 연결 화면이 나오게 된다.

<br>

---

<br>

![20220701_095525](/assets/20220701_095525_q7vg5ehtf.png)

그리고 아까 화면에서

![20220701_100623](/assets/20220701_100623.png)

인스턴스 연결 화면에서 밑에 암호를 복사한 뒤

(참고로 암호 복사 할 때 암호 부분을 긁어서 복사하면 안 먹는다. 옆에 암호 복사 클릭할 수 있는 부분을 클릭해야 복사한 뒤 저 암호 박스에 넣어야 정상 작동이 가능하다.)

![20220701_100903](/assets/20220701_100903.png)

![20220701_101539](/assets/20220701_101539.png)

암호를 잘 복사해서 넣어주고 실행하게 되면, 위와 같은 화면으로 가게 된다. 실행해주자.

<br>

---

<br>

참고로 위 설정은 맥이든 윈도우든 어디서 하든 상관이 없다.

맥 윈도우 어디서 하냐 설정 차이 일 뿐 결국 AWS EC2라는 원격 컴퓨터에 접속하기 때문에 어디서 하든 설정은 같다.

<br>

---

### 1-5. AWS 윈도우 프리티어는 IE가 안 먹는다?

IE 가 22년 6월부로 사형선고를 받았다.

그래서 그런지 AWS 윈도우 서버에서 깃허브를 로그인 하고 들어가려니까

![20220701_105738](/assets/20220701_105738.png)

id, pw를 입력해도 아래와 같은 에러가 계속 나왔다.

그래서 크롬을 다운 받으려는데

![20220701_110202](/assets/20220701_110202.png)

크롬 다운 받는 란 마저 헤더 부분 말고 아무 것도 안뜨더라

그래서 다른 분들께 물어본 결과 그냥 로컬에서 ctrl + cv를 하면 된다길래 주소창을 복사해봤지만 주소창 복사하고 넣어도 똑같길래 또 다른분이 setup.exe를 cv하면 된다서 해봤는데

![20220701_111113](/assets/20220701_111113.png)

진짜로 setup.exe파일이 복사가 되더라.. 이거 뭐야.. 하나 알아갑니다.

<br>

---

### 1-6. 톰캣 · JDK 설치 및 환경변수

해당 윈도우 AWS에 들어오면 앞서 톰캣과 jdk 설치해야한다.

![20220701_140100](/assets/20220701_140100.png)

![20220701_140130](/assets/20220701_140130.png)

tomcat9와 openjdk 1.8을 해당 서버 컴퓨터에 띄워서 들어가서 받아준다.

그리고 환경변수로 들어가 준다.

<br>

![20220701_142623](/assets/20220701_142623.png)

![20220701_143226](/assets/20220701_143226.png)

똑같이 영어긴 하지만 로컬 윈도우에서 했듯이 path 설정과 javaHome을 추가해준다.

<br>

---

![20220701_162902](/assets/20220701_162902.png)

톰캣도 마찬가지로 C드라이브에 옮기고 실행해준다(startup.sh)

![20220701_163245](/assets/20220701_163245.png)

그렇게 되면 localhost:8080접속시 톰캣 화면이 잘 작동하게 된다.

<br>

---

### 1-7. 방화벽(보안 그룹) 포트 개방

![20220701_163353](/assets/20220701_163353.png)

검색창 firewall을 입력해주고 왼 쪽 Advanced Setting을 실행해준다.

![20220701_164207](/assets/20220701_164207.png)

![20220701_164909](/assets/20220701_164909.png)

안에 가서 Inbound rules 선택

<br>

![20220701_165239](/assets/20220701_165239.png)

New rules 선택(Inbound는 방화벽 안 Outbound는 방화벽 밖)

![20220701_170754](/assets/20220701_170754.png)

여기서 program이 디폴트로 되어있을 텐데 port로 바꾸고 다음으로 간다.

![20220701_165422](/assets/20220701_165422.png)

관련 설정 해줄텐데 8080 해주고 실행하면 된다.

<br>

---

안에 들어가서 보안 설정으로 간다.

![20220701_165952](/assets/20220701_165952.png)

그리고 아래 인바운드 규칙/ 아웃바운드 규칙이 있는데 아웃바운드 규칙으로 간다.

그리고 안에서 유형을 모든 TCP 로 변경한다.

<br>

![20220701_170142](/assets/20220701_170142.png)

참고로 아웃바인드였는데 인바운드 규칙 편집해야 한다

![20220701_171813](/assets/20220701_171813.png)

설정하고 실행해보면 해당 public 주소를 넣고 뒤에 포트번호를 넣고 주소창에서 실행해보면

![20220701_172728](/assets/20220701_172728.png)

나오게 된다.

<br>

---

### 1-8. WAR 빌드 및 배포

그리고 배포하기 위해 sts3에서 war을 만들어주자

![20220702_141353](/assets/20220702_141353.png)

(참고로 sts3는 마켓플레이스나 run메뉴에서 war로 바로 export하는 메뉴가 없다. 그래서 maven install, maven build를 실행하고 .m2파일 안에 war파일을 만들어야 한다.)

<br>

---

그리고 인스턴스를 실행해준다.

**인스턴스 안 쓰면 중지 시켜두자. (그래야 시간이 줄어들지 않는다고 한다.)**

인스턴스 화면에서 연결 선택

![20220702_143500](/assets/20220702_143500.png)

그리고 안에 원격 데스크탑 가서 선택

![20220702_144347](/assets/20220702_144347.png)

그럼 위에서 했던거 처럼 rdp파일을 준다.

안에 pem 비밀번호 입력.(rdp 실행해서 암호 넣는게 아니라 아래 암호 가져오기를 통해 암호를 넣는다.)

![20220702_144528](/assets/20220702_144528.png)

그리고 위에서 했던대로 암호 해독하고 실행.

로컬에서 만든 C드라이브를 가상 컴퓨터 안의 톰캣 폴더 안의 webapp에 넣어준다.

![20220702_145715](/assets/20220702_145715.png)

넣어두면 톰캣이 자동으로 실행되며 압축이 풀린다. (혹시 안되면 bin 폴더가서 startup.sh 실행)

![20220702_150000](/assets/20220702_150000.png)

그리고 실행 후 로컬로 돌아와서 AWS에 있는 퍼블릭 주소를 복사해서 주소창에 가서 실행해보면 잘 돌아가는 걸 볼 수 있다.

<br>

---

## 2단계. EC2 Linux 환경 설치

윈도우가 아니라 리눅스로 설치해보자.

![20220708_001605](/assets/20220708_001605.png)

두개 차이를 모르겠는데 맨 위의 AMI선택

이후 검토 및 시작이 아니라 다음으로 넘어가기를 누른다.

![20220708_002401](/assets/20220708_002401.png)
![20220708_002720](/assets/20220708_002720.png)

서버 1개쓰니까 딱히 별다른 설정 안하고 다음 누른다.

![20220708_004242](/assets/20220708_004242.png)

스토리지 구성에서 크기는 30GB로 하고 다음으로 넘어간다.

![20220708_005255](/assets/20220708_005255.png)

그리고 다음으로 넘어가서 태그 추가 후 Name을 키로 값으로 springboot2-webservice로 만들어준다

![20220708_005531](/assets/20220708_005531.png)

그리고 보안그룹인데 보안그룹은 방화벽을 얘기한다.

서버로 80포트 이외엔 허락하지 않는다는 방화벽이 AWS에서는 보안그룹으로 쓰인다.

**이 보안그룹이 가장 중요하다.**

유형하옥에서 SSH이면서 포트학목에서는 22인 경우 AWS EC2에 터미널로 접속할 때 이야기.

pem키가 없으면 접속이 안되느 0.0.0.0 하는 경우 종종 발견하는데 이러면 파일공유 디렉토리나 pem키가 실수로 노출되면 서버에서 가상화폐가 채굴될 수 있다.

그리고 보안은 언제나 높으면 좋으니 pem키 관리와 지정된 IP에서만 ssh접속이 가능하도록 구성하는 것이 안전하다.

그래서 본인 IP를 기본적으로 추가하고(내 IP선택시 현재 접속IP가 자동 지정) 카페나 다른 곳이면 해당 IP를 다시 ssh 규칙에 추가하는 것이 좋다.

현재 기본인 8080을 추가하고 검토 및 시작을 클릭

검토 화면에서 보안그룹 경고하는데 8080이 전체 오픈되서 발생하는데 8080을 전체 여는건 위험한 일은 아니라 바로 시작한다.

![20220708_010903](/assets/20220708_010903.png)

이후 기존 키가 있다면 기존키 없으면 새 키를 선택해서 시작한다.

<br>

---

### 2-1. EIP(고정 IP) 할당

인스턴스도 하나의 서버라 IP가 존재한다. 인스턴스 생성시 항상 새 IPㄹㄹ 할당한다.

같은 인스턴스를 중지시키고 시작해도 새 IP가 할당된다.

요금을 아끼려 인스턴스 중지 후 다시 시작시 IP가 벼경되는데 이러면 매번 접속되는 IP가 변경되서 PC에 접근할때마다 IP주소를 확인해야 한다.

굉장히 번거로우므로 인스턴스 IP가 변경되지 않고 고정 IP를 가지게 해야한다.

고정 IP를할당한다.

AWS고정 IP를 Elastic IP라고 한다.

![20220708_013235](/assets/20220708_013235.png)

이후 새 주소 할당을 한다

그 뒤 EC2로 접속한다.

<br>

---

### 2-2. putty로 SSH 접속

Window는 ssh에 접속하기엔 불편해서 putty를 사용한다.

실행파일은 putty.exe, puttygen.exe 2개 파일이다.

putty는 pem키로 사용이 안 되며, pem키를 ppk로 변환해야 한다

puttygen은 이 과정을 진행하는 클라이언트다.

puttygen에서 conversions->important key를 선택해서 pem키를 선택한다.

그리고 ppk를 저장할 위치와 이름을 등록한다.

![20220708_015820](/assets/20220708_015820.png)

ppk가 만들어진다.

<br>

---

HostName : username@public_Ip를 등록합니다.
우리가 생성한 Amazon Linux는 ec2-user가 username이라서 ec2-user@탄력적 IP주소를 등록

Port: ssh접속 포트인 22를 등록한다

Connection type : ssh를 선택한다.

![20220708_020110](/assets/20220708_020110.png)

![20220708_020721](/assets/20220708_020721.png)

위 browse에서 생성한 ppk선택해서 불러오고 session탭으로 이동해서 saved sessions에 설정을 저장하고 saved를 한다.

![20220708_021120](/assets/20220708_021120.png)

근데 위 host네임에 ec2-users이렇게 하니까 안 되길래 구글링 후 퍼블릭 ip4주소를 넣으니까 정상 작동했다

![20220708_022332](/assets/20220708_022332.png)

정상 작동시 경고창이나온다. 예를 눌러준다.

![20220708_022536](/assets/20220708_022536.png)

이제 해당 putty 접속 후 ec2-user를 넣으면 정상 로그인이 된다.

이후 접속해서 자바8, 타임존 변경 , 호스트네임(현제 접속한 서버 별명 등록)을 한다.

<br>

---

### 2-3. 자바 8 설치

```
sudo yum install -y java-1.8.0-openjdk-devel.x86_64

```
설치 완료 후 인스턴스 java를 8로 변경

```
sudo /usr/sbin/alternatives --config java
```

<br>

---

### 2-4. 타임존 변ㄴ경

EC2의 기본 타임존은 UTC, 이는 세계 표준 시간으로 한국의 시간대가 아니다.
한국과 9시간 차이가 발생하고 이렇게 되면 서버에서 수행되는 java애플리케이션에서 생성되는 시간도 9시간 차이가 나기 떄문에 꼭 수정해야한다.

```
sudo rm /etc/localtime
sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

![20220708_023209](/assets/20220708_023209.png)

kst로 변경을 확인할 수 있다.

<br>

---

### 2-5. HostName설정

여러 서버 관리 중일 경우 IP만으로 어떤 서비스의 서버인지 확인이 어렵다

그래서 어느서버가 어떤 서비스인지 확인하기 위해 HOSTNAME을 변경한다.

```
sudo vim /etc/sysconfig/network
```
![20220708_023349](/assets/20220708_023349.png)

위와 같은 화면이 나오게 되고 hostname부분을 원하는 서비스 명으로 변경한다

![20220708_023456](/assets/20220708_023456.png)

이후 sudo reboot로 재부팅을 해준다.

근데 putty에서는 위 에러가 뜨는데 아마 aws인스턴스가 실행중이라 그런가보다.

<br>

---

### 2-6. ec2에 rds등록

```
sudo yum install mysql
```

이후 mysql -u 계정 -p -h HOST주소 로 등록해준다.

```
mysql -u admin(사용자 이름) -p -h springboot2-webservice.c3wlv6jbqwu8.ap-northeast-2.rds.amazonaws.com(엔드포인트)

```

```
mysql -u admin --host springboot2-webservice.c3wlv6jbqwu8.ap-northeast-2.rds.amazonaws.com

```
![20220708_050815](/assets/20220708_050815.png)

근데 위 구문 넣어도 에러나길래 소스 부분을 anywhere ip4로 바꿨더니 정상 작동한다.

![20220708_050958](/assets/20220708_050958.png)

<br>

---

## 3단계. RDS(DB) 생성 및 설정

### Amazon Relational Database Service(Amazon RDS)란?

Amazon Relational Database Service(Amazon RDS)는 AWS 클라우드에서 관계형 데이터베이스를 더 쉽게 설치, 운영 및 확장할 수 있는 웹 서비스입니다. 이 서비스는 산업 표준 관계형 데이터베이스를 위한 경제적이고 크기 조절이 가능한 용량을 제공하고 공통 데이터베이스 관리 작업을 관리합니다

-> 그냥 AWS에 디비 띄워서 공용으로 사용 가능하게 하겠다는 뜻.

![20220704_182624](/assets/20220704_182624_xk5w3cy8b.png)

위 짤은 프리티어 혜택들

그리고 AWS RDS를 만드는 곳에 가면 위와 같은 화면이 뜨는데 원하는 디비 설정하고 만들어준다.

![20220704_184958](/assets/20220704_184958.png)

![20220704_175859](/assets/20220704_175859.png)

가용성 및 내구성 부분은 인스턴스 하나 생성되면 대기 인스턴스 하나를 생성해서 하나를 만들것이냐 아니면 그냥 대기 인스턴스 없이 사용할 것인가 묻는 거

<br>

---

<br>

![20220704_190051](/assets/20220704_190051.png)

아래는 원하는 대로 설정 이 설정은 그냥 이름만 변경함

그리고 db부분은 db.m6g.large 그대로(디폴트)로 설정하는 것 같다.

스토리지의 경우 EBS 기반이기 떄문에 EBS에 선택한것과 동일 마그네틱 선택한다.

근데 그냥 다 무시하고 우리는 프리티어 쓴다.

![20220704_192617](/assets/20220704_192617.png)

그리고 밑에 추가구성은 3306(mysql이라) 그대로 두 암호인증 선택해 둠

![20220704_192730](/assets/20220704_192730.png)

그리고 아래 프리티어면 위와 같은 화면이 뜰것

<br>

---

### 3-1. RDS 생성 확인 및 엔드포인트

그리고 RDS가 만들어지면 아래와 같은 화면이 만들어진다.

![20220704_194131](/assets/20220704_194131.png)

위에 인스턴스 연결을 클릭한다. 상세 정보들이 나온다.

![20220704_194401](/assets/20220704_194401.png)

그럼 암호가 나올텐데 암호 복사하면 이전 화면에 사용가능이 뜬다.(근데 나같은 경우 그냥 떠있던데 버전 업데이트 되서 그런가 아무튼 그럼)

그리고 옆 메뉴인 유지보수 관리에 들어가면 스냅샷이 하나 생성된 것을 볼 수 있다.

![20220704_194645](/assets/20220704_194645.png)

그리고 메뉴에 연결 & 보안이 있는데 여기 엔드포인트라는 것이 있다.

만약 멀티적으로 구성했다면 저 경로로 들어가면 날아가지 않게된다(싱글(프리티어)일 떄는 잘 모르겠다.)

<br>

---

### 3-2. RDS운영 환경에 맞는 파라미터 설정

![20220706_001611](/assets/20220706_001611.png)

파라미터 그룹 - 파라미터 설정

세부 정보 위쪽에 DB 엔진 선택하는 항목에서 생성한 DB와 같은 버전을 맞춰야 한다.

만약 마리아디비 10.2.21이면 같은 버전으로 해야한다.

![20220706_001733](/assets/20220706_001733.png)

![20220706_002018](/assets/20220706_002018.png)

위에서 생성한 파라미터 그룹을 클릭한다.

<br>

---

파라미터 편집으로 설정들을 하나씩 변경

time/zone으로 가서 asia/seoul 선택

![20220706_002710](/assets/20220706_002710.png)

그리고 Character Set을 변경

총 8개 항목 변경

character_set_client
character_set_connection
character_set_database
character_set_filesystem
character_set_results
character_set_server
collation_connection
collation_server

이 8개 항목 중 character 항목은 utf8mb4로

collation 항목들은 utf8mb4_general_ci로 변경한다.

![20220706_003131](/assets/20220706_003131.png)

![20220706_003141](/assets/20220706_003141.png)

utf8과 utf8mb4의 차이는 이모지의 저장 가능 여부이다.

utf8은 이모지를 저장할 수 없지만, utf8mb4는 이모지를 저장할 수 있으므로 보편적으로 utf8mb4를 많이 사용한다.

마지막으로 max connection을 수정한다.

RDS의 Max Connection은 인스턴스 사양에 따라 자동으로 정해진다.

![20220706_003310](/assets/20220706_003310.png)

프리티어사양은 60개만 가능하다.(돈 내면 더 가능)

<br>

---

생성한 파라미터 그룹을 데이터베이스에 연결한다

![20220706_003443](/assets/20220706_003443.png)

옵션에서 DB 파라미터는 default로 되어있다

DB파라미터 그룹을 방금 생성한 신규파라미터로 변경한다.

![20220706_003740](/assets/20220706_003740.png)

수정에서 DB 파라미터 그룹을 변경한다. 그 후 저장.

![20220706_003902](/assets/20220706_003902.png)

수정사항 요약에서 반영 시점을 적용 시점을 즉시 적용으로 한다

예약된 다음 유지시간으로 하면 지금하지않고 새벽시간대에 진행한다.

이 수정사항이 반영되는 동안 디비가 작동 안할 수 있으므로 예약 걸어두라는 의미지만 지금은 서비스가 오픈 되지 않아서 즉시 적용.

![20220706_004259](/assets/20220706_004259.png)

혹시 파라미터 그룹이 제대로 반영 안 될수 있으므로 정상 적용을 위해 한번 더 재부팅을 진행한다.

<br>

---

### 3-3. 로컬 PC에서 RDS 접속해보기

로컬에서 RDS에 접근하기 위해 RDS의 보안그룹의 나의 IP를 추가해야 한다.

![20220706_004706](/assets/20220706_004706.png)

RDS의 세부정보 페이지에서 [보안 그룹] 을 선택한다.(컨트롤로 새창 띄워서)

![20220706_005320](/assets/20220706_005320.png)

그리고 EC2에 사용된 보안그룹의 그룹 ID를 복사한다.

![20220706_010210](/assets/20220706_010210.png)

인바운드 규칙 편집으로 들어간다.

![20220706_010154](/assets/20220706_010154.png)

![20220706_010504](/assets/20220706_010504.png)

![20220706_010531](/assets/20220706_010531.png)

복사된 보안그룹 ID와 본인 IP를 RDS보안 그룹의 인바운드로 추가한다.(EC2 인스턴스 안의 보안그룹)

인바운드 규칙에서는 Mysql/Aurora를 선택시 자동으로 3306 포트가 선택된다.

보안그룹 첫 번째 줄 : 현재 PC의 IP를 등록한다.
보안그룹 두 번째 줄 : EC2의 보안그룹을 등록한다.

- 이렇게 하면 EC2와 RDS간의 접근이 가능하다.
- EC2의 경우 이후 2,3대가 될 수도 있는데 매번 IP를 등록할 수 없으니 이렇게 보안 그룹간에 연동을 한다.

RDS간에 개인PC, EC2의 연동 설정은 모두 됨. 로컬 간에 테스트를 진행하면 된다.

<br>

---

### 3-4. Database 플러그인 설치

![20220706_010858](/assets/20220706_010858.png)

인텔리제이에 플러그인을 설치한다.

![20220706_010959](/assets/20220706_010959.png)

RDS의 접속 URL은 연결 & 보안에 있다.(엔드포인트)

인텔리제이에 플러그인을 설치하면 옆에 DB브라우저가 생성된다.

![20220706_011252](/assets/20220706_011252.png)

그리고 MariaDB를 썼으므로 Mysql을 선택한다.

![20220706_011427](/assets/20220706_011427.png)

마스터 계정명과 비밀번호를 등록 뒤 커넥션 테스트 해본다.

![20220706_012806](/assets/20220706_012806.png)

참고로 마스터 계정은 AWS안의 계정을 말한다.(이거 몰라서 로컬 mysql인줄 알고 삽질..)

![20220706_012843](/assets/20220706_012843.png)

<br>

---

<br>

참고로 위에서는 얼티메이트 버전이라 DB 설정 항목이 따로 있어서 거기서 했다.

그리고 콘솔로 들어가서 쿼리를 짜면 된다.

만약 본인이 RDS 생성시 지정한 database명을 잊었다면 인텔리제이 왼쪽의 schema항목에서 MYSQL에서 기본으로 생성하는 스키마 외에 다른 스키마가 있으므로 확인하면 된다.

<br>

---

### 3-5. 삽질) 데이터베이스 이름 미지정

아니 아무리 찾아도 데이터베이스 스키마가 없길래 찾아보니 데이터베이스 옵션이 없었고 데이트 베이스 이름 지정 안하면 데이터베이스를 생성 안한다.. 하.. 다시 생성해야됨.

<br>

---

## 4단계. Git 연동/배포

AWS상에서 GIT CLONE을 하게 되면(깃을 사용하게 되면) 인증을 하라고 문구가 뜬다.

근데 21년 8월부터 토큰키 형식으로 이미 다 바뀌었기 떄문에 별도로 설정해 줘야한다.

**1. 실제로 깃에서 연동하고 뭐 해보려 하면 핑거프린트가 뜬다.**

![20220814_141728](https://user-images.githubusercontent.com/37941513/184523666-ae545a45-404d-4f21-a3e6-98eb1b2330bd.png)

이를 막기위해 ssh.key를 만들고 깃허브에 등록해줘야한다.

**2. ssh폴더로 이동해서 아래 명령어를 수행해준다.**

```sh
cd ~/.ssh
ssh-keygen -t rsa -C github계정 메일(example@github.com)
```

![20220814_141909](https://user-images.githubusercontent.com/37941513/184523743-16140295-5e9d-4d39-90cb-b66753997ee8.png)

위 명령어를 실행하면 위 사진처럼 나오는데 key를 복사해서 깃허브에 등록해준다.

**3. github setting에 와서 ssh and gpg keys로 간 뒤 아까 복사한 키를 넣어준다.**

![20220814_135157](https://user-images.githubusercontent.com/37941513/184523866-b8d7c1fe-7ed6-4f06-ac0f-c18da8451755.png)

**4. 등록 된걸 확인 후 원격에서 실행해 보면 clone이 정상 실행된다.**

![20220814_135253](https://user-images.githubusercontent.com/37941513/184523876-506d574c-4b18-48e1-a2f2-399c0dd37ec7.png)

**5. AWS 원격에서는 HTTP가 아닌 SSH로 git clone주소를 복사하고 넣어준다.**

![20220814_142904](https://user-images.githubusercontent.com/37941513/184523896-b5ecb6ca-afa1-4aaa-abca-c83f343ea3ec.png)

<br>

---

## 5단계. HTTPS(SSL) 적용

### HTTP를 HTTPS로 리다이렉션

기본적으로 SSL같은 인증서를 설정해 주지 않으면 HTTP로 리다이렉트 되게 되고 주의 요함 같은 경고문을 띄우게 된다. 보안적인 측면에서도 HTTPS가 유리한 점이 많으므로 HTTPS를 설정해보자.

![20220826_103921](https://user-images.githubusercontent.com/37941513/186798266-6b95b19f-1135-4d33-aef9-51378b0e25fb.png)

먼저 메인 화면에 인스턴스 실행이 되는것을 확인 했다(이미 로드밸런서 이런거를 만들어 놔서 로드밸런서가 1인 상태)

일단 ACM으로 이동한다.

https://ap-northeast-2.console.aws.amazon.com/acm/home?region=ap-northeast-2#/welcome

![20220826_105543](https://user-images.githubusercontent.com/37941513/186799925-810252c8-abbe-49a6-b4e8-a078c2a5b18c.png)

다음과 같은 화면이 나오고 인증서 요청을 클릭한다.

인증서 요청 페이지로 이동하게 되고 퍼블릭 인증서 요청으로 이동하게 된다.

![20220828_151512](https://user-images.githubusercontent.com/37941513/187060452-0ffa58f9-aa83-410f-a990-986f86fce20c.png)

![20220826_105845](https://user-images.githubusercontent.com/37941513/186800362-37153f92-204d-42ae-86df-1e8535359835.png)

도메인 이름에는 직접 만든 도메인이나 aws, gabia 등 이런 곳에서 직접 구매하고 설정한 도메인을 설정해 준다.

이름은 여러개 등록이 가능하며 *.test.com 같은 와일드 카드로도 가능하다.

여기 이후 Route53으로 이동한다.

<br>

---

### 5-1. ROUTE 53 설정

대시보드에서 호스팅 영역으로 간다.

![20220828_152529](https://user-images.githubusercontent.com/37941513/187060719-82fb43ef-5a9c-4bd4-841c-2db8d4f2da65.png)

그 후 호스팅 영역 생성을 눌러준다.

![20220828_152555](https://user-images.githubusercontent.com/37941513/187060721-037e2b39-e68a-4f85-bb29-ea3c607637e4.png)

도메인 이름에 도메인 구매한 내용을 적어준다.
aws에서 구매했으면 그 내용을 가비아에서 구매했으면 가비아에서 구매한 내용을 적어준다.

가비아에서 도메인 구매한 경우
네임 서버에 도메인 내용을 적어주면 된다.

https://developer-ping9.tistory.com/320

![20220828_153805](https://user-images.githubusercontent.com/37941513/187061132-aecfb54e-6a6a-44c0-9f29-80277144fc9d.png)

태그엔 생성한 네임 등록

![20220828_154531](https://user-images.githubusercontent.com/37941513/187061347-0fb99b2c-08d1-4393-931a-6683760d82c7.png)

![20220828_162934](https://user-images.githubusercontent.com/37941513/187063238-c56a92de-fcb4-47bb-a810-c2a2da7ece0c.png)

레코드 생성시 레코드 이름, A레코드 유형, 별칭을 주고
트래픽 라우팅 대상에 Application/Classic Load Balancer에 대한 별칭, 아시아(서울),
생성한 로드밸런서 를 넣어주고 레코드 생성을 한다.

![20220828_154531](https://user-images.githubusercontent.com/37941513/187061347-0fb99b2c-08d1-4393-931a-6683760d82c7.png)

그리고 위에 사진에서 생성된 네임들 4개를 가비아에 연결하면 된다.

<br>

---

### 5-2. 가비아 설정

1 . My가비아 -> 구입도메인의 관리 탭 클릭

2 . 네임서버 설정

![20220828_163902](https://user-images.githubusercontent.com/37941513/187063425-322e6554-5720-4093-a52c-f40ca6f93dfa.png)

aws에서 설정한 네임서버 4개를 가비아에 등록

<br>

---

### 5-3. 로드밸런서 생성

위 ROUTE 53에서 등록시 로드 밸런서가 있었는데 이는 미리 만들어 줘야 한다.

![20220828_164324](https://user-images.githubusercontent.com/37941513/187063600-67441a16-db33-4cf2-82bc-0d4934ac0911.png)

ec2 메인 대시보드에 왼쪽 네비게이션바를 내려보면 로드밸런서 탭이 있다.

여기서 로드 밸런서 생성을 누르고 해당 탭으로 들어온다.

이후 로드밸런서 탭에 들어오면 위와 같은 사진이 나오며
가장 왼쪽의 탭을 클릭해준다.

**1단계: Load Balancer 구성**

![20220828_233936](https://user-images.githubusercontent.com/37941513/187079906-5d572038-4bdf-488f-95df-29c5aa7d03ac.png)

**2단계: 보안 설정 구성**

![20220828_234027](https://user-images.githubusercontent.com/37941513/187079908-78329ea9-40e9-4b7f-992a-b6d464a534ea.png)

**3단계: 보안 그룹 구성**

![20220828_234259](https://user-images.githubusercontent.com/37941513/187079909-2e6cad62-bd3a-4cfa-be3b-47a5bc08d694.png)

**4단계: 라우팅 구성**

![20220828_234352](https://user-images.githubusercontent.com/37941513/187079910-d9a0a9fb-cbd0-4140-ab13-e64d481416df.png)

**5단계: 대상 등록**

![20220828_234408](https://user-images.githubusercontent.com/37941513/187079912-65274d31-5d8f-4067-b423-a9cf43869741.png)

이후 검토를 눌러 로드밸런서를 생성한다.

<br>

---

## 6단계. 트러블슈팅 — 로컬/원격 삽질 기록

### 6-1. JDK 버전 불일치 (UnsupportedClassVersionError)

분명 로컬에서 만들고(인텔리제이) 실행하면 잘 도는데(인텔리제이 내부든 톰캣 로컬 컴퓨터에서 실행해서 돌리든) 잘만 되던게

![20220704_141844](/assets/20220704_141844.png)

![20220704_142100](/assets/20220704_142100.png)

설정을 똑같이 하고 프로젝트 가져와서 실행해도 도저히 안됐다

```
​

WARN : org.springframework.web.context.support.XmlWebApplicationContext - Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'sqlSessionFactory' defined in ServletContext resource [/WEB-INF/spring/root-context.xml]: Invocation of init method failed; nested exception is java.lang.UnsupportedClassVersionError: com/fastcampus/ch4/domain/BoardDto has been compiled by a more recent version of the Java Runtime (class file version 55.0), this version of the Java Runtime only recognizes class file versions up to 52.0 (unable to load class [com.fastcampus.ch4.domain.BoardDto])

ERROR: org.springframework.web.context.ContextLoader - Context initialization failed

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'sqlSessionFactory' defined in ServletContext resource [/WEB-INF/spring/root-context.xml]: Invocation of init method failed; nested exception is java.lang.UnsupportedClassVersionError: com/fastcampus/ch4/domain/BoardDto has been compiled by a more recent version of the Java Runtime (class file version 55.0), this version of the Java Runtime only recognizes class file versions up to 52.0 (unable to load class [com.fastcampus.ch4.domain.BoardDto])

at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1708)

at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:581)

at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:503)

at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:317)

at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:222)

at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:315)

at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199)

at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:741)

at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:869)

at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:550)

at org.springframework.web.context.ContextLoader.configureAndRefreshWebApplicationContext(ContextLoader.java:409)

at org.springframework.web.context.ContextLoader.initWebApplicationContext(ContextLoader.java:291)

at org.springframework.web.context.ContextLoaderListener.contextInitialized(ContextLoaderListener.java:103)

at org.apache.catalina.core.StandardContext.listenerStart(StandardContext.java:4768)

at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5230)

at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)

at org.apache.catalina.core.ContainerBase.addChildInternal(ContainerBase.java:726)

at org.apache.catalina.core.ContainerBase.addChild(ContainerBase.java:698)

at org.apache.catalina.core.StandardHost.addChild(StandardHost.java:696)

at org.apache.catalina.startup.HostConfig.deployWAR(HostConfig.java:1024)

at org.apache.catalina.startup.HostConfig$DeployWar.run(HostConfig.java:1911)

at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)

at java.util.concurrent.FutureTask.run(FutureTask.java:266)

at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75)

at java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:112)

at org.apache.catalina.startup.HostConfig.deployWARs(HostConfig.java:825)

at org.apache.catalina.startup.HostConfig.deployApps(HostConfig.java:475)

at org.apache.catalina.startup.HostConfig.start(HostConfig.java:1618)

at org.apache.catalina.startup.HostConfig.lifecycleEvent(HostConfig.java:319)

at org.apache.catalina.util.LifecycleBase.fireLifecycleEvent(LifecycleBase.java:123)

at org.apache.catalina.util.LifecycleBase.setStateInternal(LifecycleBase.java:423)

at org.apache.catalina.util.LifecycleBase.setState(LifecycleBase.java:366)

at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:946)

at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:835)

at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)

at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1396)

at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1386)

at java.util.concurrent.FutureTask.run(FutureTask.java:266)

at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75)

at java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:134)

at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:919)

at org.apache.catalina.core.StandardEngine.startInternal(StandardEngine.java:263)

at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)

at org.apache.catalina.core.StandardService.startInternal(StandardService.java:432)

at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)

at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:930)

at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)

at org.apache.catalina.startup.Catalina.start(Catalina.java:772)

at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)

at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)

at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)

at java.lang.reflect.Method.invoke(Method.java:498)

at org.apache.catalina.startup.Bootstrap.start(Bootstrap.java:345)

at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:476)

Caused by: java.lang.UnsupportedClassVersionError: com/fastcampus/ch4/domain/BoardDto has been compiled by a more recent version of the Java Runtime (class file version 55.0), this version of the Java Runtime only recognizes class file versions up to 52.0 (unable to load class [com.fastcampus.ch4.domain.BoardDto])

at org.apache.catalina.loader.WebappClassLoaderBase.findClassInternal(WebappClassLoaderBase.java:2477)

at org.apache.catalina.loader.WebappClassLoaderBase.findClass(WebappClassLoaderBase.java:875)

at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1376)

at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1220)

at java.lang.Class.forName0(Native Method)

at java.lang.Class.forName(Class.java:348)

at org.apache.ibatis.io.ClassLoaderWrapper.classForName(ClassLoaderWrapper.java:186)

at org.apache.ibatis.io.ClassLoaderWrapper.classForName(ClassLoaderWrapper.java:89)

at org.apache.ibatis.io.Resources.classForName(Resources.java:261)

at org.apache.ibatis.builder.xml.XMLConfigBuilder.typeAliasesElement(XMLConfigBuilder.java:170)

at org.apache.ibatis.builder.xml.XMLConfigBuilder.parseConfiguration(XMLConfigBuilder.java:110)

at org.apache.ibatis.builder.xml.XMLConfigBuilder.parse(XMLConfigBuilder.java:99)

at org.mybatis.spring.SqlSessionFactoryBean.buildSqlSessionFactory(SqlSessionFactoryBean.java:587)

at org.mybatis.spring.SqlSessionFactoryBean.afterPropertiesSet(SqlSessionFactoryBean.java:491)

at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1767)

at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1704)

... 53 more

04-Jul-2022 05:58:20.639 SEVERE [main] org.apache.catalina.core.StandardContext.startInternal One or more listeners failed to start. Full details will be found in the appropriate container log file

04-Jul-2022 05:58:20.645 SEVERE [main] org.apache.catalina.core.StandardContext.startInternal Context [/ch4] startup failed due to previous errors

04-Jul-2022 05:58:20.682 WARNING [main] org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesJdbc The web application [ch4] registered the JDBC driver [net.sf.log4jdbc.sql.jdbcapi.DriverSpy] but failed to unregister it when the web application was stopped. To prevent a memory leak, the JDBC Driver has been forcibly unregistered.

04-Jul-2022 05:58:20.689 WARNING [main] org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesJdbc The web application [ch4] registered the JDBC driver [com.mysql.cj.jdbc.Driver] but failed to unregister it when the web application was stopped. To prevent a memory leak, the JDBC Driver has been forcibly unregistered.

04-Jul-2022 05:58:20.703 WARNING [main] org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesThreads The web application [ch4] appears to have started a thread named [mysql-cj-abandoned-connection-cleanup] but has failed to stop it. This is very likely to create a memory leak. Stack trace of thread:

java.lang.Object.wait(Native Method)

java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:144)

com.mysql.cj.jdbc.AbandonedConnectionCleanupThread.run(AbandonedConnectionCleanupThread.java:91)

java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)

java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)

java.lang.Thread.run(Thread.java:750)

04-Jul-2022 05:58:20.716 INFO [main] org.apache.catalina.startup.HostConfig.deployWAR Deployment of web application archive [C:\apache-tomcat-9.0.64\webapps\ch4.war] has finished in [13,789] ms

04-Jul-2022 05:58:20.720 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [C:\apache-tomcat-9.0.64\webapps\docs]

04-Jul-2022 05:58:20.808 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [C:\apache-tomcat-9.0.64\webapps\docs] has finished in [88] ms

04-Jul-2022 05:58:20.812 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [C:\apache-tomcat-9.0.64\webapps\examples]

04-Jul-2022 05:58:21.841 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [C:\apache-tomcat-9.0.64\webapps\examples] has finished in [1,029] ms

04-Jul-2022 05:58:21.849 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [C:\apache-tomcat-9.0.64\webapps\host-manager]

04-Jul-2022 05:58:21.907 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [C:\apache-tomcat-9.0.64\webapps\host-manager] has finished in [58] ms

04-Jul-2022 05:58:21.910 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [C:\apache-tomcat-9.0.64\webapps\manager]

04-Jul-2022 05:58:22.008 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [C:\apache-tomcat-9.0.64\webapps\manager] has finished in [97] ms

04-Jul-2022 05:58:22.011 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deploying web application directory [C:\apache-tomcat-9.0.64\webapps\ROOT]

04-Jul-2022 05:58:22.074 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [C:\apache-tomcat-9.0.64\webapps\ROOT] has finished in [63] ms

04-Jul-2022 05:58:22.091 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]

04-Jul-2022 05:58:22.162 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [35406] milliseconds

04-Jul-2022 05:58:25.022 INFO [mysql-cj-abandoned-connection-cleanup] org.apache.catalina.loader.WebappClassLoaderBase.checkStateForResourceLoading Illegal access: this web application instance has been stopped already. Could not load []. The following stack trace is thrown for debugging purposes as well as to attempt to terminate the thread which caused the illegal access.

java.lang.IllegalStateException: Illegal access: this web application instance has been stopped already. Could not load []. The following stack trace is thrown for debugging purposes as well as to attempt to terminate the thread which caused the illegal access.

at org.apache.catalina.loader.WebappClassLoaderBase.checkStateForResourceLoading(WebappClassLoaderBase.java:1432)

at org.apache.catalina.loader.WebappClassLoaderBase.getResource(WebappClassLoaderBase.java:1057)

at com.mysql.cj.jdbc.AbandonedConnectionCleanupThread.checkThreadContextClassLoader(AbandonedConnectionCleanupThread.java:123)

at com.mysql.cj.jdbc.AbandonedConnectionCleanupThread.run(AbandonedConnectionCleanupThread.java:90)

at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)

at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)

at java.lang.Thread.run(Thread.java:750)
```

그래서 뭐가 문제지 계속 찾던 와중 버전이 문제라는 문구가 나왔다길래 확인해 보니까 버전문제가 맞았다..

(환경이 달랐던 거..)

인텔리제이는 세팅을 11로 하고 로컬 jdk 설정도 15여서 잘 돌아갔던거.

AWS 컴퓨터에서는 open-jdk 8버전을 설치해놓고 인텔리제이는 11버전으로 build 한뒤 war로 가져와서 webapp에 넣고 계속 돌리고 있었다...

하.. 이 사소한 문제로 몇시간을 날렸다.. 내시간 ㅠㅠ

<br>

---

### 6-2. 인스턴스 재시작 시 RDP 파일 재발급

<br>

![20220704_164059](/assets/20220704_164059.png)

이건 AWS 인스턴스 실행 시 전에 받아둔 데스크톱 파일로 암호를 해독하고 넣어도 아무리 해도 안 되길래 뭐가 문제지 알아보니까.

인스턴스를 중지시키고 새로 받으면 저 데스크톱 파일도 새로 받아서 암호키를 넣고 실행해 줘야했다.

이거도 알아두자.
