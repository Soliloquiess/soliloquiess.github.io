---
layout: post
title: "morphious 정리"
subtitle: "etc"

date: "2024-04-17-8:43:51 +0900"
categories: etc
tags: etc
comments: true
---

1. 서버 구성 시 웹 폐쇄망
   구글 SMTP 사용-> 구글 계정 만들어서 추가 해줘야 함.
   -> SMTP는 열어야 하나, ,구글 계정은 어느 계정? 현재 유라클은 개인 계정은

-:> 인터넷에 나와있다고 함

2.

---

인터넷 망에 클라우드 센터 구성

- 사용자 ip를 최소한으로 사용
- 내부적으로 ip를 쓸떄 ip가 포트를 찾고 들어가지 않음.
- 접점에 대한 엔드포인트를 리소스를 만든 후(도메인 처럼 생긴)

  - 퍼블릭 ip가 있어야 함. 퍼블릭 ip로 nat 이런데서 가지고 있는 퍼블릭 ip로 받아줌

- 그 후에 리소스의 엔드포인트로 다 분기함

- 클라우드인데 일단 맨 처음 영역으로 다 들어옴

openvpn으로 붙고 vpn영역 통해 붙음.엔드포인트로 넘겨줌

ingress/egress =>inbound outbound 웹서버 처럼 동작 그러나 웹서버는 아님.

- 웹서버 처럼 동작함. 웹서버에 https면 ssl인증서 탑재해서 웹서버에 설치하고 인바운드 들어오는 거래 받아줌.

- 그러나 이건 웹서버는 아님. 웹서버는 웹 리소스가 있는데 그건 아님.
- API 게이트웨이처럼 생겼으나 SSL 인증서 관장하고, 여러 도메인이 들어오면 도메인 별로 분기

- L4가 있으면 ip port로 분기하지만, L7은 도메인으로 분기함.
- 분기가 된다는 건 로드밸런싱도 가능함.
- 각자 만든 서비스별로 분기해줌.

- L4(LB)에서 로드 밸런싱 해줌.

#### 우리쪽 해야하는 것?

- 웹서비스에서 인증서는 여기 설치
- 타고 들어와서 웹 서버에 대한 status가 소스에는 없지만, 로드밸런싱과 라우팅 해줘서 트랜잭션을 보낸다.

- WAS 1,2 / sentinel(redis)가 있는데 3개의 WAS가 있다 생각하면 된다.

---

api게이트 웨이처럼 생김.
도메인 여러개 들어오면 분기해줌.

ㅣ7은 도메인으로 분기, ,로드밸ㄹ럴ㄴ싱 역할도 해줌
LB->loadbalacner(가용성 집합)

LB의 영역에 따라 SSL 인증서 설치하는 곳이 있고 할수 없는 곳이 있고

우리는 웹서비스에서 SSL인증서는 Ingress컨트롤러에 설치됨

국방부로 들어오면 로드밸런싱 해줌 3개 was있다 보면 됨

---

맨 오른쪽은 애저가 관리(클라우드형) 디비 문제시 애저가 관리(관리형 서비스)

콘솔화면에서 생성

file share는 파일저장 싸게 가능함

s3에서는 file인데 sandisk처럼 네트워크 디스크 처럼)

시스템 깔면 마운트 시킴. 그럼 로컬처럼 씀.

또는 클라우드는 호출해서 쓰는 방법 있음

짝게 흐릿한 박스

그런건 의미가 없음.

AKS 클러스터쪽이 중요

나머지는 VM이 관리

---

deploy하는 방식이 다름

Ingress Controller가 쿠버네티스 서비스

---

pod->컨테이너

---

Azure Files->디스크 볼륨

1. API 펑션 쓰는방법
2. 마운트 된 디스크 사용

국방부 사용

쿠버네티스는 2장의 맨 위 CMS는 쿠버네티스 + 리액트 이거 사용
-> 안 해봐서 일단 해보쟈

---

추가정보 Azure 마음건강

부분 중요

INgress COntroller ->

VM 1 2

초록색은 PUSH하기 위함
REDIS는 읽기 전용 메모리 디비

REDIS센티널은 레디스 바라봄

고가용성 유지하기 위해 센티널을 중간 26379가 해줌

---

레디스는 select해서 가져오는거보다 json으로 키밸류 요청시 가져 옴

메뉴->push
madp->
비즈니스 로직이 들어간 업무 서비스

원래는 gw랑 비즈니스 로직 나누는데여기선 같이쓴다함
madp도 설치시 기본적으로 깔림

Azure Mysqk Service가 ip및 포트

push provider가 인바운드로 들어오는게 뭐가있냐
->푸시 알람 설정 및 세팅
push upmc(8070)에 설정시 푸시프로바이더가 읽어서 대외api.push.apple.com
이쪽으로 가서(end point)

fcm.googleapis.com->크로스플랫폼으로 앱/웹푸시
이거 3개면 푸시 가능(의심?)

outbound로 나가는건 우측 아래가 유일함

---

향후 메일/sms쓰면 대외에 추가(아웃바운드)

마음건강 결과 가져오는 API 나감

---

위까지는 운영

개발은 우리회사 개발 시스템

레디스 센티널 빠짐

mysql은 설치햏서 쓸거 (설치형이라 위치 옮겨짐)

디스크는 vm에 포함되어있음

운영은 애져클라우드랑 엮어 있고

개발은 SFMP로 올렸다 내리고

설정일떄 운영/개발 이거는 파악 제대로 해야. 이건 좀 조심해야함.
-> 개발 설정이 운영 넘어가면 큰일이기 떄문

위 내용을 알고 시작해야함.

츤dp anj ejswudi gksmsep ahfmrl Eoansdlrjf ahfmaus thtm ek Rkdiehla

큐써서 한다는 거 그게 뭐냐 (카프카 ) 이게 뭐 어쩌구 . 이게 단순한 큐가 아님.

80~90퍼 정도는 이정도 까지 이해

---

인코딩 ? 캐릭터 셋?
엔드포인트?

---

나머지는 endpoint로 되어있다.

AKS/VM

동철부장님 ->vm영역

BR프레임-> AKS 영역

클라우드 쪽 디비에서 가져와서 쓰긴 함

---

국방부 /군인공제 왔다갔따 ㅎ하는 걸 허브 하나로 함(1장 왼쪽 하단

api를 허브 하나로 통해 데이터 교환하려고 함

허브 뒤 와스 있고 디비 1개는 키관리 솔루션)

api포탈(쿠콘 닷넷같은)/개발자포탈(스웨거 같은)

허브는 vm하나씩

동철 부장님은
api허브에 올리면 개발자 포탈에서 쓰게 함

---

개발 말고 운영 반영 시 클라우드 센터에 반영 요청 해야하는 건지
SFMP로 올리는시 클라우드 센터가 관장 X
그냥 올림

애저 클라우드에 문제 생기면 우리 클라우드가 애져 바라 보고 있음
근데 그걸 적용해주진 않음.

운영 반영 가이드 처럼 적용하고 내리고 올리고 해야함

레디스 할줄 몰라서

스케일 다운 하고 다 올리고

mysql이 실패하면 관리형이니까 애져에서 책임져야함
->

---

k8s 메인

마지막은 호스트 os 같이 씀(컨테이너 배포)

->얘가 나온 이유가 있음 ->MSA 떄문

중간 버츄얼 배포면 많이지면 서버 하나(VM)을 더 올림

컨테이너 배포의 경우 MSA로 결제.장바구니,목록 등 서버 쪼개고
비지한 서버만 늘리면 되니까 그렇게 됨

---

replica는 pod의 개수를 조절

pod이 기동되면 노드가 됨

pod는 컨테이너가 들어가 있는 영역

---

cms랑 활동앱 연계하는게 있음

약속된 대로 되면 되는데 값이 이상하게 오거나 안 넘어오거나
이러면 연락해ㅐ봐야(비알 프레임)

---

etc. ELK STACK

Eureka(Netflix)

cicd pipeline(파이프라인은 일련의 라인)

"ECS"는 Amazon Web Services(AWS)의 컨테이너 관리 서비스 중 하나인 "Elastic Container Service"를 가리킵니다. ECS는 Docker 컨테이너를 실행하고 관리하기 위한 완전 관리형 서비스로, 클라우드 기반 애플리케이션을 구축하는 개발자들이 사용합니다.

ECS는 다음과 같은 기능을 제공합니다:

컨테이너 배포 및 관리: ECS를 사용하면 Docker 컨테이너를 간편하게 배포하고 관리할 수 있습니다. 컨테이너를 시작하고 중지하며, 다양한 스케일링 정책을 설정할 수 있습니다.

자동 확장: ECS는 요구 사항에 따라 자동으로 컨테이너 인스턴스의 수를 늘리거나 줄일 수 있는 자동 확장 기능을 제공합니다.

클러스터 관리: ECS는 클러스터를 생성하고 관리할 수 있습니다. 이를 통해 여러 서비스와 작업을 실행할 수 있으며, 리소스를 효율적으로 활용할 수 있습니다.

서비스 스케줄링: ECS는 컨테이너를 실행할 위치를 지정하는 서비스 스케줄링을 지원합니다. 사용자는 컨테이너를 어떤 인스턴스에 배치할지를 관리할 수 있습니다.

로그 및 모니터링: ECS는 컨테이너의 로그 및 상태를 모니터링할 수 있으며, Amazon CloudWatch와 통합하여 세부적인 모니터링 및 경고 기능을 제공합니다.

ECS는 AWS의 다른 서비스와 통합되어 있어, 다른 AWS 서비스들과 함께 사용하여 더욱 강력한 클라우드 기반 애플리케이션을 개발할 수 있습니다.

---

ㅊ보자도 이해하는 AWScode
dev.classmethod.jp

S3에 컨테이너

---

리액트 + 스프링 부트 쓰던 뭐던
CSR/SSR 차이 근데 무조건 리액트라고 중요한게 아님

CSR이 좋을떄도 있고 SSR이 좋을 떄도 있고

요구사항에 맞게 사용

MSA가 중요

CSR은 백/프론트단

개발자는 테이블 오브젝트 매핑하는 사람이 아님.
JPA오브젝트 보고 하면 됨
순수 개발자만 하는 일 하도록.
언제 디비 테이블 확인해서 보냐 이 소리

다 그걸 쓰니까 쓰는게 아닌 왜 쓰는게 중요

---

문의 시 콜센터 통함-> it면 다른 사업부나 그런거 통해서 옴

근데 이벤트 참석했는데 선물 언제오냐. 이걸 유라클에 요청
통계

---

가상서버에 도커 올리면 미친짓

host os에 게스트 os올렸는데 거기에 또 host os올림?

VM에 컨테이너 올려 쓰면 개뻘짓
테스트
