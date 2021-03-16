---
title: "[Algorithm]] Algorithm Learn"
layout: post
subtitle: Algorithm
date: '2021-03-14 19:45:51 +0900'

categories: study
tags: Algorithm
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---
20210315

bfs는 최단인 경우 (최단경로 뽑을 떄) 사용 하는 경우가 많음. 근데 한계가 있는데 정점당 비용이 동일할 때 최단 거리 구하기 가능하나 이 조건에 위배시 bfs로 구할 수 없다.
이 경우엔 별도로 그리디 구현해야 한다.

BFS는
1. Queue에 출발점 삽입
2. 반복
2-1 처음꺼
2-2 사용하기
2-3 자식 탐색.

사방탐색 할 곳 두군데 발견 되면 저기서 점에 서 멀어지는 게 동일한 뎁스에서 찾아가는 걸 bfs.

퍼져나감. 그렇게 최단거리 찾아감

그럼 변형된 BFS 도 알아두면 아주 좋다

큐가 비어있을 경우까지 계속 도는데


큐에서 무작정 뺴는 게 아니라 어디 까지 돌도록 반복 돌고 나머지는 나중에 돌게  이런식으로 해주면 좋지 않을까?


------
 DFS 는 최단 거리와는 전혀 다름.(이미 벗어남)
 그러다 갈 곳이 없으면 다시 탐색. 재귀를 통해 계속 탐색
