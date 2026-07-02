---
title: "[Network] HTTP vs HTTPS 핵심 개념과 Fiddler로 트래픽 분석하기"
date: 2022-10-20
category: "Network"
tags: ["Network", "네트워크"]
description: "HTTP와 HTTPS의 구조적 차이(SSL/TLS, 포트, 보안 계층)를 정리하고, Fiddler로 HTTPS 트래픽을 캡처하는 방법과 Python requests에서 SSL 검증을 우회하는 방법을 설명한다."
permalink: "etc/2022/10/20/http_https"
---

## HTTP (Hypertext Transfer Protocol)

- **HTTP**는 서로 다른 시스템 간 통신을 제공하는 응용 프로그램 계층(Application Layer) 프로토콜이다.
- 사용자가 브라우저에서 HTTP 요청을 하면 웹 서버는 요청된 데이터를 웹 페이지 형태로 응답한다.
- **TCP** 위에서 동작하며, 웹 브라우저와 서버에 표준 통신 규칙을 제공한다.
- **상태 비저장(Stateless)** 프로토콜로, 각 트랜잭션은 이전 트랜잭션과 독립적으로 실행된다. 트랜잭션 완료 후 연결이 끊어진다.

---

## HTTPS (Hypertext Transfer Protocol Secure)

- **HTTPS**는 HTTP에 보안 기능을 추가한 확장 프로토콜이다.
- 데이터를 **암호화된 형식**으로 전송하며, 은행·로그인 등 민감한 정보 전송 시 필수다.
- 암호화에는 **TLS (Transport Layer Security)** 를 사용하며, 공식 명칭은 **SSL (Secure Sockets Layer)** 이다.
- **비대칭 공개 키 인프라** 메커니즘을 사용하는 두 가지 키:

| 키 종류 | 관리 주체 | 역할 |
|---------|----------|------|
| **개인 키 (Private Key)** | 웹 서버(사이트 소유자) | 공개 키로 암호화된 정보를 복호화 |
| **공개 키 (Public Key)** | 누구나 사용 가능 | 데이터를 암호화된 형태로 변환 |

---

## HTTP vs HTTPS 주요 차이점

HTTP와 HTTPS의 핵심 차이는 **SSL 인증서** 유무다.

- HTTPS 프로토콜은 **SSL 프로토콜**로 보호된다. (Amazon ACM 같은 서비스 참고)
  - https://soliloquiess.github.io/study/2022/08/22/http%EB%A5%BC-https%EB%A1%9C-(SSL).html
- SSL은 클라이언트가 서버로 전송하는 데이터를 암호화하여, 중간에서 탈취해도 내용을 알 수 없게 한다.

| 항목 | HTTP | HTTPS |
|------|------|-------|
| **규약** | Hypertext Transfer Protocol | Hypertext Transfer Protocol Secure |
| **보안** | SSL 없음 — 데이터 평문 전송, 탈취 가능 | SSL 인증서 포함 — 암호화 전송 |
| **포트 번호** | **80** (RFC 1340, IETF 지정) | **443** (1994년 RFC 지정) |
| **동작 계층** | 애플리케이션 계층 | 전송 계층(보안 래핑) |
| **SSL 인증서** | 불필요 | 서명된 SSL 인증서 설치 필요 (무료/유료) |

> 포트 번호가 지정되지 않으면 HTTP(포트 80)로 간주된다.

---

## Python requests 예제 — HTTPS 날씨 스크래핑

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

---

## Fiddler에서 SSL 인증서 오류 발생 시

Fiddler를 실행하고 트래픽을 잡으면 SSL 인증서 오류가 발생한다. Fiddler의 프록시 인증서를 신뢰할 수 없는 인증서로 인식하기 때문이다.

`requests.get`에 **`verify=False`** 옵션을 주면 SSL 검증을 우회하여 실행할 수 있다.

```
    print("[네이버 오늘의 날씨]")
    # url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8"
    # url = "https://weather.naver.com/"
    url = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8"
    res = requests.get(url, verify = False)
```

---

## Fiddler — HTTP 트래픽 분석 도구

**Fiddler**는 HTTP 트래픽을 검사하는 가장 인기 있는 도구 중 하나로, REST API 웹 요청을 쉽게 테스트할 수 있다.

### 웹 요청 및 응답 캡처 방법

- Fiddler에서 **Capture**를 실행하면 트래픽 캡처가 시작된다.

### HTTPS 트래픽 캡처 설정

Fiddler는 기본적으로 HTTPS 내용을 표시하지 않는다(암호화되어 있기 때문). HTTPS를 캡처하려면 아래와 같이 옵션을 설정해야 한다.

![20221025_112844](https://user-images.githubusercontent.com/37941513/197800574-cf507c53-35fc-48f2-b5f3-fd001bb062fe.png)

**Tools → Options → HTTPS** 탭에서 HTTPS 복호화 옵션을 활성화한다.

---

### 웹 요청 및 응답을 보는 방법
