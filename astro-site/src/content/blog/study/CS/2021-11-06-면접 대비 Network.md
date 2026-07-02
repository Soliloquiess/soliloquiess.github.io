---
title: "[Network] 네트워크 핵심 — OSI 7계층·TCP/UDP·HTTP/HTTPS·로드밸런싱"
date: 2021-11-06
category: "Network"
tags: ["Network", "네트워크"]
description: "OSI 7계층 역할, TCP 3·4-way handshake, 흐름제어·혼잡제어(AIMD·Slow Start), UDP vs TCP 비교, 대칭키·공개키·HTTPS 인증 흐름, TLS/SSL HandShake, 로드 밸런싱, Blocking/Non-blocking·Sync/Async 차이까지 네트워크 면접 핵심 정리."
permalink: "study/2021/11/06/면접-대비-Network"
---

## OSI 7 계층

![OSI 7계층 구조](/assets/20211116_140249.png)

**7계층으로 나누는 이유**: 통신이 일어나는 과정을 단계별로 파악할 수 있고, 특정 계층에 이상이 생기면 그 계층만 수정할 수 있기 때문이다.

| 계층 | 이름 | 주요 장비/프로토콜 | 역할 |
|---|---|---|---|
| 1 | **물리 (Physical)** | 리피터, 케이블, 허브 | 데이터를 전기적 신호로 변환하여 전송 |
| 2 | **데이터 링크 (Data Link)** | 브릿지, 스위치 | MAC 주소를 통해 통신. 에러 검출·재전송·흐름 제어 |
| 3 | **네트워크 (Network)** | 라우터, IP | 라우터를 통해 경로 선택·IP 주소 지정·패킷 전달. 라우팅·흐름 제어·오류 제어·세그먼테이션 |
| 4 | **전송 (Transport)** | TCP, UDP | TCP/UDP 프로토콜로 통신 활성화. 포트를 열어 프로그램이 전송할 수 있도록 제공 |
| 5 | **세션 (Session)** | API, Socket | 데이터 통신을 위한 논리적 연결 담당. TCP/IP 세션 생성·제거 |
| 6 | **표현 (Presentation)** | JPEG, MPEG | 데이터 표현 독립성 제공·암호화. 파일 인코딩·압축·암호화 |
| 7 | **응용 (Application)** | HTTP, FTP, DNS | 최종 목적지. 응용 프로세스와 직접 연관. 사용자 인터페이스·전자우편·DB 관리 서비스 제공 |

---

## TCP 3-way handshake & 4-way handshake

**연결을 성립하고 해제하는 과정.**

### 3-way handshake — 연결 성립

TCP는 정확한 전송을 보장하기 위해 통신 전 논리적 접속을 성립하는 3-way handshake를 진행한다.

![3-way handshake](/assets/20211117_121037.png)

1. 클라이언트가 서버에게 **SYN** 패킷을 보낸다 (sequence: x)
2. 서버가 SYN(x)을 받고, 클라이언트로 **ACK**(x+1)와 **SYN**(y) 패킷을 보낸다
3. 클라이언트는 ACK(x+1)와 SYN(y)를 받고, **ACK**(y+1)를 서버로 보낸다

3번의 통신이 완료되면 연결이 성립된다.

### 4-way handshake — 연결 해제

![4-way handshake](/assets/20211117_121426.png)

1. 클라이언트는 서버에게 연결을 종료한다는 **FIN** 플래그를 보낸다
2. 서버는 FIN을 받고 확인했다는 **ACK**를 클라이언트에게 보낸다 (이때 모든 데이터를 보내기 위해 **CLOSE_WAIT** 상태)
3. 데이터를 모두 보냈다면 서버는 연결 종료를 알리는 **FIN** 플래그를 클라이언트에게 보낸다
4. 클라이언트는 FIN을 받고 **ACK**를 서버에게 보낸다 (아직 받지 못한 데이터가 있을 수 있으므로 **TIME_WAIT** 상태로 대기)

- 서버는 ACK를 받은 이후 소켓을 닫는다 (Closed)
- TIME_WAIT 시간이 끝나면 클라이언트도 닫는다 (Closed)

---

## TCP/IP (흐름제어/혼잡제어)

### TCP 통신이란?

네트워크 통신에서 **신뢰적인 연결 방식**. unreliable network에서 reliable network를 보장하는 프로토콜이며, network congestion avoidance algorithm을 사용한다.

**reliable network 보장 시 4가지 문제점**:

| 문제 | 설명 |
|---|---|
| **손실** | packet이 손실될 수 있음 |
| **순서 바뀜** | packet 순서가 바뀔 수 있음 |
| **Congestion** | 네트워크가 혼잡한 문제 |
| **Overload** | receiver가 overload되는 문제 |

### 흐름제어 vs 혼잡제어

| 구분 | 대상 | 설명 |
|---|---|---|
| **흐름제어 (Flow Control)** | 송신측 ↔ 수신측 | 송신측과 수신측의 데이터 처리 속도 차이 해결. receiver가 sender에게 현재 상태를 feedback |
| **혼잡제어 (Congestion Control)** | 송신측 ↔ 네트워크 | 송신측의 데이터 전달과 네트워크의 처리 속도 차이 해결 |

**전송 전체 과정**:
1. Application layer: sender가 socket에 data를 씀
2. Transport layer: data를 segment에 감싸 network layer에 전달
3. sender의 send buffer와 receiver의 receive buffer에 data 저장
4. application에서 준비되면 buffer에 있는 것을 읽기 시작
5. flow control의 핵심: **receiver buffer가 넘치지 않게** 하는 것
6. receiver는 **RWND(Receive WiNDow)**: receive buffer의 남은 공간을 홍보

### 1. 흐름제어 (Flow Control)

송신측 속도가 수신측보다 빠를 경우 데이터 손실이 발생할 수 있으므로, 송신측의 데이터 전송량을 수신측에 맞게 조절한다.

#### Stop and Wait

매번 전송한 패킷에 대해 확인 응답을 받아야만 다음 패킷을 전송하는 방법.

![Stop and Wait](/assets/20211117_123054.png)

#### Sliding Window (Go Back N ARQ)

수신측에서 설정한 윈도우 크기만큼 **확인 응답 없이** 세그먼트를 전송할 수 있게 하여 데이터 흐름을 동적으로 조절하는 제어 기법.

`LastByteSent - LastByteAcked <= ReceiveWindowAdvertised`
(현재 공중에 떠있는 패킷 수 ≤ sliding window)

동작 방식: 윈도우에 포함된 모든 패킷을 전송하고, 전달이 확인되는 대로 윈도우를 옆으로 옮겨 다음 패킷 전송.

![Sliding Window](/assets/20211117_123218.png)

**세부 구조**:

![송신 버퍼](/assets/20211117_123651.png)

- 200 이전 바이트: 이미 전송, 확인 응답 받음
- 200~202 바이트: 전송되었으나 확인 응답 못 받음
- 203~211 바이트: 아직 전송되지 않음

![수신 윈도우](/assets/20211117_123954.png)

![송신 윈도우](/assets/20211117_124026.png)

수신 윈도우보다 작거나 같은 크기로 송신 윈도우를 지정하면 흐름 제어가 가능하다.

![송신 윈도우 이동](/assets/20211117_124102.png)

- Before: 203~204 전송 → 수신측에서 ACK 203 보냄 → 송신측이 수신 윈도우를 203~209 범위로 이동
- After: 205~209가 전송 가능한 상태

### 2. 혼잡제어 (Congestion Control)

한 라우터에 데이터가 몰릴 경우 처리하지 못한 호스트들이 재전송하여 혼잡이 가중되고 오버플로우·데이터 손실이 발생한다. 이를 방지하기 위해 송신측에서 보내는 데이터의 전송 속도를 강제로 줄인다.

![혼잡제어 방법](/assets/20211117_124438.png)

| 방법 | 설명 |
|---|---|
| **AIMD** (Additive Increase / Multiplicative Decrease) | 패킷을 하나씩 보내며 성공 시 window 크기를 1씩 증가. 실패 시 속도를 절반으로 줄임. 공평하지만 초기에 높은 대역폭 활용 불가 |
| **Slow Start** | 패킷을 하나씩 보내며 시작. 각 ACK마다 window size를 1씩 늘려 한 주기마다 2배 증가. 혼잡 발생 시 window size를 1로 떨어뜨림. 이후 혼잡 발생 window size의 절반까지는 지수적으로, 이후는 1씩 증가 |
| **Fast Retransmit** (빠른 재전송) | 중복된 순번의 ACK 패킷을 3개 받으면 재전송. window size를 줄임 |
| **Fast Recovery** (빠른 회복) | 혼잡 시 window size를 1로 줄이지 않고 반으로 줄인 뒤 선형 증가. 이후 순수한 AIMD 방식으로 동작 |

---

## UDP

### UDP (User Datagram Protocol)란?

- 데이터를 **데이터그램 단위**로 처리하는 프로토콜
- **비연결형, 신뢰성 없는** 전송 프로토콜
- Transport layer 프로토콜

### TCP vs UDP 비교

| 항목 | TCP | UDP |
|---|---|---|
| **연결 방식** | 연결 지향 (3-way handshake) | 비연결 |
| **신뢰성** | 높음 (데이터 분실·중복·순서 보정) | 낮음 (에러·순서 바뀜 발생 가능) |
| **속도** | 상대적으로 느림 | **빠름** |
| **용도** | 데이터 정확성이 중요한 경우 | 실시간 방송, 온라인 게임 |

**TCP와 UDP가 나온 이유**:
1. IP는 Host to Host 통신만 지원 → 하나의 장비에서 여러 프로그램 통신 시 한계 → **포트 번호** 도입
2. IP에서 오류가 발생하면 ICMP가 알려주지만 대처 불가 → **TCP·UDP** 상위 프로토콜 도입

### UDP Header

![UDP Header 구조](/assets/20211117_125954.png)

| 필드 | 설명 |
|---|---|
| **Source port** | 시작 포트 |
| **Destination port** | 도착지 포트 |
| **Length** | 길이 |
| **Checksum** | 오류 검출 (중복 검사로 데이터 무결성 보호) |

헤더가 간단하므로 TCP보다 용량이 가볍고 송신 속도가 빠르지만, 확인 응답이 없어 신뢰도가 낮다.

### DNS와 UDP

**DNS(Domain Name Service)가 UDP를 사용하는 이유**:

1. TCP는 3-way handshake를 사용하지만 UDP는 connection 유지 불필요
2. DNS request는 UDP segment에 들어갈 정도로 작음 (single request + single reply)
3. reliability는 application layer에서 추가 가능 (Timeout, resend)

DNS는 UDP **53번 포트** 사용.

**TCP를 사용하는 경우**: Zone Transfer(DNS 서버 간 요청) 또는 데이터가 512 bytes를 넘거나 응답을 받지 못한 경우.

---

## 대칭키 & 공개키

### 대칭키 (Symmetric Key)

암호화와 복호화에 **같은 암호키**를 사용하는 알고리즘.

- **장점**: 동일한 키를 사용하므로 매우 빠름
- **단점**: 대칭키 전달 과정에서 해킹 위험에 노출

### 공개키 (Public Key)

암호화와 복호화에 **서로 다른 암호키**를 사용하는 알고리즘. 자신의 비밀키로만 복호화할 수 있는 공개키를 대중에 공개.

**공개키 암호화 방식 진행 과정**:
1. A가 웹상에 공개된 'B의 공개키'를 이용해 평문을 암호화하여 B에게 보냄
2. B는 자신의 비밀키로 복호화한 평문을 확인, A의 공개키로 응답을 암호화하여 A에게 보냄
3. A는 자신의 비밀키로 암호화된 응답문을 복호화

- **장점**: 대칭키의 단점(키 전달 해킹 위험) 완전 해결
- **단점**: 암·복호화가 매우 복잡 (암호화·복호화 키가 서로 다르기 때문)

**대칭키와 공개키를 혼합하면?** → SSL 탄생의 시초

1. A가 B의 공개키로 **대칭키를 암호화**하여 B에게 보냄
2. B는 자신의 비밀키로 복호화하여 대칭키를 얻음
3. 이후 이 대칭키로 암호화 통신

즉, **대칭키를 주고받을 때만 공개키 방식을 사용**하고, 이후에는 대칭키 방식으로 통신한다.

---

## HTTP & HTTPS

### HTTP (HyperText Transfer Protocol)

인터넷 상에서 클라이언트와 서버가 자원을 주고받을 때 쓰는 통신 규약.

텍스트 교환이므로 **네트워크에서 신호를 가로채면 내용이 노출**되는 보안 이슈가 존재한다.

### HTTPS (HyperText Transfer Protocol Secure)

SSL 프로토콜을 사용해 **텍스트를 암호화(공개키 암호화 방식)**하여 통신하는 규약.

**HTTPS 통신 흐름**:
1. 애플리케이션 서버(A)가 공개키와 개인키를 만든다
2. 신뢰할 수 있는 **CA(Certificate Authority)** 기업을 선택하고 공개키 관리를 계약
3. CA 기업은 A서버의 이름·공개키·암호화 방법을 담은 인증서를 만들어 **CA 기업의 개인키로 암호화**하여 A서버에 제공
4. A서버는 HTTPS가 아닌 요청이 오면 이 암호화된 인증서를 클라이언트에게 전달
5. 클라이언트는 CA 기업의 공개키(브라우저가 이미 보유)로 인증서를 해독하여 A서버의 공개키를 얻음
6. 이후 A서버와 통신할 때 A서버의 공개키로 암호화하여 요청

> HTTPS도 신뢰받지 않는 CA의 자체 인증서를 사용한 경우에는 브라우저에서 경고를 표시한다.

---

## TLS/SSL HandShake

HTTPS에서 클라이언트와 서버 간 통신 전, SSL 인증서로 신뢰성 여부를 판단하기 위해 연결하는 방식.

![TLS/SSL HandShake 흐름](/assets/20211117_131022.png)

1. 클라이언트 → 서버: **client hello** (버전·암호 알고리즘·압축 방식 포함)
2. 서버 → 클라이언트: **server hello** + 세션 ID + **CA 공개 인증서** (handshake 중 암호화에 사용할 공개키 포함)
3. 클라이언트: CA 인증서를 CA 목록에서 유효성 확인
4. CA 인증서 신뢰 확인 후 클라이언트는 **난수 바이트를 생성**하여 서버의 공개키로 암호화 (대칭키를 정하는 데 사용)
5. 서버가 클라이언트 인증서를 요구했다면 클라이언트 인증서 + 개인키로 암호화된 임의 바이트 문자열 함께 전송
6. 서버: 클라이언트 인증서 확인 후 난수 바이트를 자신의 개인키로 복호화하여 **대칭 마스터 키** 생성
7. 클라이언트 → 서버: **finished** 메시지 + 교환 내역을 해싱한 값을 대칭키로 암호화하여 전송
8. 서버: 교환 내용을 해싱하여 클라이언트에서 보낸 값과 일치 확인 후 **finished** 메시지를 대칭키로 암호화하여 전송
9. 클라이언트: 대칭키로 복호화하여 신뢰 확인 → 이후 해당 대칭키로 데이터 통신

---

## 로드 밸런싱 (Load Balancing)

**둘 이상의 CPU 또는 저장장치와 같은 컴퓨터 자원들에게 작업을 나누는 것.**

![로드 밸런싱 구조](/assets/20211117_131412.png)

웹 서버 트래픽 급증에 대한 대응 방안:
- **Scale-up**: 하드웨어 성능 향상 (비용이 더 비쌈)
- **Scale-out**: 여러 대의 서버가 나눠서 처리 → **무중단 서비스 환경 구성이 용이** → 더 효과적

Load Balancer를 클라이언트와 서버 사이에 두고 여러 서버에 부하를 분산시킨다.

### 로드 밸런서가 서버를 선택하는 방식

| 방식 | 설명 |
|---|---|
| **라운드 로빈 (Round Robin)** | CPU 스케줄링의 라운드 로빈 방식 활용 |
| **Least Connections** | 연결 개수가 가장 적은 서버 선택 (세션이 길어지는 경우 권장) |
| **Source** | 사용자 IP를 해싱하여 분배 (특정 사용자가 항상 같은 서버로 연결 보장) |

**로드 밸런서 장애 대비**: 로드 밸런서 자체에 문제가 생길 수 있으므로 **이중화**하여 대비한다.

---

## Blocking/Non-blocking & Synchronous/Asynchronous

**동기/비동기와 블로킹/논블로킹은 서로 다른 개념이다.**

![2x2 매트릭스](/assets/20211117_144824.png)

### Blocking / Non-blocking

**호출된 함수가 호출한 함수에게 제어권을 건네주는 유무의 차이.**

| 방식 | 설명 |
|---|---|
| **Blocking** | 함수 B는 할 일을 다 마칠 때까지 제어권을 가진다. A는 B가 끝날 때까지 기다려야 한다 |
| **Non-blocking** | 함수 B는 할 일을 마치지 않아도 A에게 제어권을 바로 넘겨준다. A는 B를 기다리면서도 다른 일을 진행할 수 있다 |

### Synchronous / Asynchronous

**B의 수행 결과나 종료 상태를 A가 신경 쓰는지의 유무 차이.**

| 방식 | 설명 |
|---|---|
| **Synchronous** | A는 B가 일하는 중에 현재 상태를 계속 체크한다 |
| **Asynchronous** | B의 수행 상태를 B 스스로 신경 쓴다 (Callback). A는 신경 쓰지 않고 다른 일을 할 수 있다 |

### 4가지 조합 예시 (치킨집 비유)

| 조합 | 상황 |
|---|---|
| **Blocking + Synchronous** | 치킨 주문 후 멀뚱히 서서 치킨 튀기는 것을 보며 기다림 (궁금함, 움직이지 못함) |
| **Blocking + Asynchronous** | 치킨 주문 후 언제 되는지 안 궁금하지만, "잠시만이래서" 서서 붙잡힌 상황 |
| **Non-blocking + Synchronous** | "볼일 보다 오세요" 들었지만 5분마다 "제꺼 나왔나요?" 확인 |
| **Non-blocking + Asynchronous** | "볼일 보다 오세요" 들은 후 앉아서 다른 일 하다가 "치킨 나왔습니다" 알림 받음 |

---

## Blocking I/O & Non-Blocking I/O

I/O 작업은 Kernel level에서만 수행 가능하므로 Process·Thread는 커널에게 I/O를 요청해야 한다.

### 1. Blocking I/O

1. Process(Thread)가 Kernel에게 I/O 요청 함수 호출
2. Kernel이 작업을 완료하면 결과 반환

- **특징**: I/O 작업이 진행되는 동안 User Process(Thread)는 자신의 작업을 중단한 채 대기. Resource 낭비 심함 (I/O 작업은 CPU 자원을 거의 사용하지 않음)
- 여러 Client 접속 서버에 Blocking 방식을 적용하면 → client별로 별도의 Thread 생성 → 접속자 증가 → **Context Switching 횟수 증가 → 비효율적**

### 2. Non-Blocking I/O

I/O 작업이 진행되는 동안 User Process의 작업을 **중단하지 않음**.

1. User Process가 recvfrom 함수 호출 (커널에게 socket data 요청)
2. Kernel은 recvBuffer를 바로 채우지 못하므로 **"EWOULDBLOCK"** 반환
3. User Process는 다른 작업 진행 가능
4. recvBuffer에 데이터가 있으면 Buffer에서 데이터를 복사하여 받아옴
5. recvBuffer는 Kernel 메모리에 있으므로 Memory 간 복사로 I/O보다 훨씬 빠른 속도로 데이터 수신
6. recvfrom 함수는 복사한 데이터의 길이와 함께 반환

---

참조: https://gyoogle.dev/blog/computer-science/network/OSI%207%20Layer.html
