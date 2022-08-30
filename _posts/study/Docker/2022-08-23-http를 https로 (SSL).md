---
layout: post
title:  "[AWS]http를 https로 (SSL)"
subtitle:  "AWS&Docker"
date: "2022-08-23-02:26:51 +0900"
categories: study
tags: AWS&Docker
comments: true
---


#### HTTP를 HTTPS로 리다이렉션


기본적으로 SSL같은 인증서를 설정해 주지 않으면
HTTP로 리다이렉트 되게 되고 주의 요함 같은 경고문을 띄우게 된다. 보안적인 측면에서도 HTTPS가 유리한 점이 많으므로 HTTPS를 설정해보자.

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

-------


#### ROUTE 53 설정


대시보드에서 호스팅 영역으로 간다.

![20220828_152529](https://user-images.githubusercontent.com/37941513/187060719-82fb43ef-5a9c-4bd4-841c-2db8d4f2da65.png)


그 후 호스팅 영역 생성을 눌러준다.


![20220828_152555](https://user-images.githubusercontent.com/37941513/187060721-037e2b39-e68a-4f85-bb29-ea3c607637e4.png)

도메인 이름에 도메인 구매한 내용을 적어준다.
aws에서 구매했으면 그 내용을 가비아에서 구매했으면 가비아에서 구매한 내용을 적어준다.

![20220828_153235](/assets/20220828_153235.png)

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





-----

#### 가비아 설정

1 . My가비아 -> 구입도메인의 관리 탭 클릭


2 . 네임서버 설정

![20220828_163902](https://user-images.githubusercontent.com/37941513/187063425-322e6554-5720-4093-a52c-f40ca6f93dfa.png)



aws에서 설정한 네임서버 4개를 가비아에 등록



-----

#### 로드밸런서 생성


위 ROUTE 53에서 등록시 로드 밸런서가 있었는데 이는 미리 만들어 줘야 한다.

![20220828_164324](https://user-images.githubusercontent.com/37941513/187063600-67441a16-db33-4cf2-82bc-0d4934ac0911.png)


ec2 메인 대시보드에 왼쪽 네비게이션바를 내려보면 로드밸런서 탭이 있다.

여기서 로드 밸런서 생성을 누르고 해당 탭으로 들어온다.

![20220828_164644](/assets/20220828_164644.png)

이후 로드밸런서 탭에 들어오면 위와 같은 사진이 나오며
가장 왼쪽의 탭을 클릭해준다.


1단계: Load Balancer 구성

![20220828_233936](https://user-images.githubusercontent.com/37941513/187079906-5d572038-4bdf-488f-95df-29c5aa7d03ac.png)

2단계: 보안 설정 구성

![20220828_234027](https://user-images.githubusercontent.com/37941513/187079908-78329ea9-40e9-4b7f-992a-b6d464a534ea.png)

3단계: 보안 그룹 구성


![20220828_234259](https://user-images.githubusercontent.com/37941513/187079909-2e6cad62-bd3a-4cfa-be3b-47a5bc08d694.png)

4단계: 라우팅 구성


![20220828_234352](https://user-images.githubusercontent.com/37941513/187079910-d9a0a9fb-cbd0-4140-ab13-e64d481416df.png)

5단계: 대상 등록

![20220828_234408](https://user-images.githubusercontent.com/37941513/187079912-65274d31-5d8f-4067-b423-a9cf43869741.png)


이후 검토를 눌러 로드밸런서를 생성한다.

-------
