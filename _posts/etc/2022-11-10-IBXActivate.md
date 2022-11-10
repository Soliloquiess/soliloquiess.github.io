---
layout: post
title:  "IBXActivate 설정"
subtitle:  "etc"

date: "2022-11-09-17:26:51 +0900"
categories: etc
tags: etc
comments: true
---

1 . cn= 으로 시작하는 인증키로부터 인증키를  ibk 기업은행에 공공인증서 확인이라는 곳에 간다. 

1-1 . 공동인증서 로그인에서 위 받은 인증서를 넣고 비밀번호를 넣어준다.

2 . NPKI 는 LOCALROW안에 NPKI라는 곳에 복사한다(혹은 위치한다) NPKI안에 보면 yessign이라는 애 있을 것.

![20221110_180823](https://user-images.githubusercontent.com/37941513/201048031-934432a8-1005-4417-8bf6-d69f87da2a62.png)

3 . IBXActivate화면은 아래와 같다.

![20221110_180958](https://user-images.githubusercontent.com/37941513/201048311-f01fe93e-06ed-4773-aac3-b30c5306fb78.png)

여기서 IBXLoad를 누르면 해당 정보들을 불러온다.

![20221110_181311](https://user-images.githubusercontent.com/37941513/201049642-1f30a147-c49c-4f58-b170-a29bb4f0aa3d.png)

![20221110_181535](https://user-images.githubusercontent.com/37941513/201049665-81a21a24-9b4b-4046-af51-79c1ae31a834.png)


위 사진은 검색창에 *가 있고 이 상태에서 검색해보면 전체 정보를 불러온다.
만약 A30* 이라고 검색하면 기업은행, A45*라고 하면 새마을 금고의 내용을 불러온다.

4 . 위 사진에서 옆에 네비게이션 메뉴가 있는데 해당 대분류로 나눠진다.
- 여기서 엑셀에 보면 기타 및 공공기관 메뉴가 있다.
- 공공기관은 K(세무정보), P(개인정보), S(경제통계). 기타는 M(마일리지). 


5 . 
- 위 엑셀 사진에서 정상적이면 초록색이 뜬다.
- 00000:정상. 그리고 거래내역 없음 이런게 뜰텐데 이 경우 오류가 아니다. 이 경우 권한이 없는 경우들도 있다.
- 오류 발생시 빨간색으로 에러코드 뜸 8000FFFF() 이런걸 ibx에서 나올 시 엑셀에 마찬가지로 반영해준다.


------


etc) 

- NPKI = 인증서 레포지토리
- pfx -> NPKI를 extract하기 위한 인증키
- 일반적인 NPKI 경로: C:\Users\사용자\AppData\LocalLow\NPKI