---
layout: post
title:  "http, https과 fiddler, 개발자도구 사용 개념. "
subtitle:  "etc"

date: "2022-10-20-02:26:51 +0900"
categories: etc
tags: etc
comments: true
---


#### HTTP는 Hypertext Transfer Protocol의 약자

- HTTP 프로토콜은 서로 다른 통신 시스템 간의 통신을 제공한다. 
- 사용자가 브라우저에서 HTTP 요청을 하면 웹 서버는 요청된 데이터를 웹 페이지 형태로 사용자에게 보냄. 간단히 말해서 HTTP 프로토콜을 통해 서버에서 클라이언트로 데이터를 전송할 수 있다고 말할 수 있음.

사진

- HTTP 는 TCP 계층 위에 있는 응용 프로그램 계층 프로토콜. 웹 브라우저와 서버에 몇 가지 표준 규칙을 제공하여 서로 통신하는 데 사용할 수 있다.

- HTTP 는 각 트랜잭션이 이전 트랜잭션에 대한 지식 없이 별도로 실행되기 때문에 상태 비저장 프로토콜. 즉, 웹 브라우저와 서버 간에 트랜잭션이 완료되면 연결이 끊어짐.

<br>

----


#### HTTPS의 전체 형식은 Hypertext Transfer Protocol Secure이다.

                                                                                                                                                                                                                           . 

- 이 프로토콜을 사용하면 암호화된 형식으로 데이터를 전송할 수 있다. HTTPS 프로토콜의 사용은 주로 은행 계좌 정보를 입력해야 하는 경우에 필요하다.                                         

- HTTPS 프로토콜은 로그인 자격 증명을 입력해야 하는 경우 주로 사용된다. 크롬과 같은 최신 브라우저에서는 두 프로토콜, 즉 HTTP와 HTTPS가 다르게 표시된다. 

- HTTPS는 암호화를 제공하기 위해 Transport Layer Security라는 암호화 프로토콜을 사용하며 공식적으로는 SSL(Secure Sockets Layer)이라고 한다. 이 프로토콜은 비대칭 공개 키 인프라로 알려진 메커니즘을 사용하며 아래에 제공된 두 가지 다른 키를 사용한다.



    - 개인 키: 이 키는 웹 사이트 소유자가 관리하는 웹 서버에서 사용할 수 있다.
        - 공개키로 암호화된 정보를 복호화.
    - 공개 키: 이 키는 모든 사람이 사용할 수 있다. 데이터를 암호화된 형태로 변환한다.

<br>

------

#### HTTP와 HTTPS의 주요 차이점


HTTP 와 HTTPS 의 주요 차이점은 SSL 인증서. HTTPS 프로토콜은 보안 기능이 추가된 HTTP 프로토콜의 확장 버전이다.

이 추가 보안 기능은 신용 카드 정보와 같은 민감한 데이터를 전송하는 웹 사이트에 매우 중요하다.


- HTTPS 프로토콜은 SSL 프로토콜로 인해 보호됨.(Amazon ACM 같은)
 - https://soliloquiess.github.io/study/2022/08/22/http%EB%A5%BC-https%EB%A1%9C-(SSL).html

- SSL 프로토콜은 클라이언트가 서버로 전송하는 데이터를 암호화. 
 
- 누군가 클라이언트와 서버 간에 통신 중인 정보를 훔치려고 하면 암호화로 인해 이해할 수 없다. 

- 이것은 HTTP에 SSL이 포함되어 있지 않은 반면 HTTPS에는 클라이언트와 서버 간의 보안 통신을 제공하는 SSL이 포함되어 있다는 HTTP와 HTTPS의 주요 차이점이다.

<br>

 -----------------


#### 규약

- HTTP 프로토콜은 Hypertext Transfer Protocol의 약자<br> HTTPS는 Hypertext Transfer Protocol Secure의 약자.

#### 보안
 
- HTTP 프로토콜은 SSL(Secure Sockets Layer)을 포함하지 않으므로 보안 프로토콜이 아님.<br> 즉, 클라이언트에서 서버로 데이터를 전송할 때 데이터를 도난당할 수 있다. 

- 반면 HTTPS 프로토콜에는 데이터를 암호화된 형식으로 변환하는 SSL 인증서가 포함되어 있으므로 이 경우 외부인이 암호화된 텍스트를 이해하지 못 하기 때문에 데이터를 도용할 수 없다.

#### 포트 번호

- HTTP는 포트 번호 80을 통해 데이터를 전송하는 반면 HTTPS는 443 포트 번호를 통해 데이터를 전송. "포트 번호가 지정되지 않으면 HTTP로 간주될 것"

- RFC 1340이 발표되었을 때 IETF(Internet Engineering Task Force)는 HTTP에 포트 번호 80을 제공. 1994년에 새로운 RFC가 출시되었을 때 HTTPS에는 포트 번호 443이 할당.

#### 레이어

- HTTP 프로토콜은 애플리케이션 계층에서 작동하고 HTTPS 프로토콜은 전송 계층에서 작동. <br>
전송 계층의 책임은 데이터를 클라이언트에서 서버로 이동하는 것이며 데이터 보안이 주요 관심사. 
<br>
HTTPS는 전송 계층에서 작동하므로 보안 계층으로 래핑.

#### SSL 인증서

- 웹사이트에 HTTPS 프로토콜을 사용하려면 서명된 SSL 인증서를 설치.<br>
SSL 인증서는 무료 및 유료 서비스 모두에서 사용할 수 있다.
<br> 서비스는 비즈니스 요구 사항에 따라 선택.

- HTTP는 SSL 인증서를 포함하지 않으므로 데이터를 해독하지 않으며 데이터는 일반 텍스트 형식으로 전송.

```
import requests
from bs4 import BeautifulSoup
import re


def scrape_weather():
    print("[네이버 오늘의 날씨]")
    url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8"
    res = requests.get(url)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")

    # 오늘 날씨 : ex) 어제보다 1° 높아요  맑음
    summary = soup.find("p", attrs={"class": "summary"}).get_text()
    print(summary)
    print("")

    # 현재 온도 (최저 온도 / 최고 온도)
    curr_temp = soup.find("div", attrs={"class": "temperature_text"}).get_text().replace(" 현재 온도", "")  # 4°
    print(f"현재 온도 : {curr_temp}")

    min_temp = soup.find("span", attrs={"class": "lowest"}).get_text().replace("최저기온", "")  # -4°
    print(f"최저 온도 : {min_temp}")

    max_temp = soup.find("span", attrs={"class": "highest"}).get_text().replace("최고기온", "")  # 6°
    print(f"최고 온도 : {max_temp}")

    # 오전 강수확률 OO%, 오후 강수확률 OO%
    rainfall = soup.find_all("span", attrs={"class": "weather_left"})
    for idx, rainfall_idx in enumerate(rainfall):
        if idx == 0:
            rainfall_morning = rainfall_idx
            print("")
            print("강수 확률 :", rainfall_morning.get_text())
        elif idx == 1:
            rainfall_afternoon = rainfall_idx
            print("강수 확률 :", rainfall_afternoon.get_text())

    # 미세먼지
    dusts = soup.find("li", attrs={"class": "item_today level1"})
    # print(dusts[0].find("li", attrs={"class":"item_today level1"}))
    dusts = dusts.get_text()[2:]
    print("")
    print(dusts)


if __name__ == "__main__":
    scrape_weather()  #  날씨정보 가져오기, 직접 실행할 때만 동작하도록 함수 정의, 다른 파일에 의해서 호출될 때는 실행 안되게
```


<br>

------

해당 피들러를 실행하고 잡아보면 에러가 뜬다.

이는 SSL을 신뢰할수 없는 인증서라고 인식해서 이다.

```
    print("[네이버 오늘의 날씨]")
    # url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8"
    # url = "https://weather.naver.com/"
    url = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8"
    res = requests.get(url, verify = False)
```

여기 부분에서 requests.get에서 verify = False를 주면 실행이 가능해진다.


<br>

-------

#### fiddler

- Http 트래픽을 검사하는 가장 인기 있는 도구 중 하나다. 이 도구를 사용하면 REST API 웹 요청을 매우 쉽게 테스트할 수 있다.


#### 웹 요청 및 응답을 보는 방법

- 피들러에서  capture을 실행. 이에 따라 캡쳐 실행 설정 가능

#### HTTPS 트래픽을 캡처
 
Fiddler 는 암호화되어 있기 때문에 HTTPS URL(보안 사이트) 에 대한 웹 요청의 내용을 표시하지 않는다

그래서 쓰려면 옵션에서 설정해야 한다.

사진


Tools -> options -> Https


<br>

------------


#### 웹 요청 및 응답을 보는 방법

