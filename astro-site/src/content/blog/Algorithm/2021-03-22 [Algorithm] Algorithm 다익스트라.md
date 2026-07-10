---
title: "[Algorithm] Algorithm 다익스트라"
date: 2021-03-22
category: "Algorithm"
tags: ["Algorithm"]
description: "최단 경로 개념과 다익스트라 알고리즘 구현, 그리고 KMP 문자열 패턴 매칭 알고리즘까지 정리한 학습 노트."
permalink: "class/2021/03/22/다익스트라"
---

## 최단 경로

### 최단 경로 정의

- 간선의 가중치가 있는 그래프에서, 두 정점 사이의 경로들 중 간선 가중치의 합이 최소인 경로.

### 최단 경로 알고리즘 분류

| 종류 | 알고리즘 | 특징 |
| --- | --- | --- |
| 하나의 시작 정점 → 끝 정점 | 다익스트라 | 음의 가중치 허용하지 않음 |
| 하나의 시작 정점 → 끝 정점 | 벨만-포드 | 음의 가중치 허용 |
| 모든 정점 쌍 | 플로이드-와셜 | 모든 정점에 대한 최단 경로 |

![다익스트라 최단경로 개념도](/assets/20210322_112458.png)

아직 고려되지 않은(처리되지 않은) 정점 중에서, 시작점에서 자신에게 오는 거리가 가장 가까운 정점을 먼저 찾는다.

---

## 다익스트라 알고리즘

- 시작 정점에서의 거리가 최소인 정점을 선택해 나가면서 최단 경로를 구하는 방식.
- 탐욕 기법(greedy)을 사용하는 알고리즘으로, MST의 프림 알고리즘과 유사하다.

### 동작 정리

- 선택이 안 된 정점 중 하나를 선택한다.
- w를 u에 합친다.
- `d[v]`는 아직 방문하지 않은 v에 대해, 기존 거리와 경유 거리 중 어느 것이 더 작은지를 따진다.
- (예) 1과 0 중 연결된 것들 중 제일 작은 값을 고른다.

![다익스트라 동작 예시](/assets/20210322_152245.png)

### 갱신 조건 이해

`!visited[j]`, `adjMatrix[current][j] != 0`, `distance[j] > min + adjMatrix[current][j]` 세 조건의 의미:

- `!visited[j]` : 아직 선택(방문)하지 않은 곳.
- `adjMatrix[current][j] != 0` : 자기 자신으로 가는 경우가 아닐 때(연결되어 있는 경우만 확인). 인접 행렬이라 자기 자신인 0을 확인했지만, 인접 리스트로 구현한다면 이 확인 없이도 작성할 수 있다.
- `distance[j] > min + adjMatrix[current][j]` : 경유해서 가는 비용이 기존 값보다 더 최적이라면 갱신.

> PQ를 왜 쓰는지 아는 것이 중요하다. 최솟값 정점을 빠르게(거의 O(1)에 꺼내는 느낌으로) 찾기 위해서다.

![다익스트라 코드 설명 1](/assets/20210322_154957.png)

![다익스트라 코드 설명 2](/assets/20210322_155050.png)

### 코드

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Dijkstra {
	public static void main(String[] args) throws NumberFormatException, IOException {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int V = Integer.parseInt(br.readLine());
		int start = 0; //출발점
		int end = V-1;	//도착점.
		int [][] adjMatrix = new int[V][V];//인접행렬

		StringTokenizer st = null;
		for(int i =0; i<V;i++) {
			st = new StringTokenizer(br.readLine()," ");
			for(int j  =0; j<V;j++) {
				adjMatrix[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		int [] distance = new int[V];
		boolean [] visited = new boolean[V];

		Arrays.fill(distance, Integer.MAX_VALUE);
		distance[start] = 0;

		for(int i =0; i<V;i++) {
			//step1. 처리하지 않은 정점 중 출발지에 가장 가까운 정점 선택
			int min = Integer.MAX_VALUE;
			int current=0; //min의 최소비용에 해당하는 정점번호.
			for(int j =0; j<V; j++) {
				if(!visited[j] && min > distance[j]) {
//					distance의 값 중 최소의 값을 찾아야 하니까.
					min = distance[j];
					current = j;
				}
			}

			visited[current] = true;
			if(current== end)break; //끝이면 다른곳으로 경유해서 거쳐서 가는 애를 찾을 필요 없다.
			//출발지에서 목적지 가는 모든 경우 비교할 거아니면 여기서 끝내도 된다.
			//step2. 선택된 current를 경유지로 하여 아직 처리하지 않은 다른 정점으로 최소비용을 따져본다.
			for(int j =0; j<V;j++) {
				if(!visited[j] && adjMatrix[current][j]!=0 && distance[j]>min+adjMatrix[current][j]) {
					//출발지에서 current까지 더한게 최소비용 . 출발지에서 j로 오는 비용보다 크면 원래 거보다 거쳐서 오는게 더 유용하다는 의미니까
					distance[j] = min+adjMatrix[current][j];
				}

			}
		}
		System.out.println(distance[end]);
		//만약 출발지에서 어떤 경유로 가도 end 못가면 max_value
		//그래서 초기값인 maxvalue면 어떤 식으로 해도 목적지에 못간다.
	}
}
```

---

## KMP 알고리즘 (Knuth-Morris-Pratt Algorithm)

- 불일치가 발생한 텍스트 문자열의 앞부분에 어떤 문자가 있는지 미리 알고 있으므로, 불일치가 발생한 앞부분은 다시 비교하지 않고 매칭을 수행한다.
- 패턴을 전처리해 배열 `fail[k]`를 구해 잘못된 시작을 최소화한다.
  - `fail[k]`: k 인덱스에서 일치하는 접두사와 접미사의 최대 길이.
- 시간 복잡도: `O(M+N)`

![KMP 예시](/assets/20210322_155104.png)

### 패턴 매칭에 사용되는 알고리즘

1. 고지식한 패턴 검색 알고리즘(브루트포스)
2. 라빈-카프 알고리즘
3. 보이어-무어 알고리즘
4. KMP 알고리즘

![패턴 매칭 알고리즘 1](/assets/20210322_155207.png)
![패턴 매칭 알고리즘 2](/assets/20210322_155333.png)

### KMP 핵심 이해

KMP는 틀린 부분이 발생했을 때, 그 앞의 맞은 부분은 그대로 두고, 맨 앞으로 돌아가는 것이 아니라 패턴을 밀어서 그 자리에서 최대한 비교한다. 안 되면 다음으로 넘어간다.

`fail`이라고 적어놨지만(실패 함수), 사실 함수가 아니라 문자열 비교에 실패했을 때 패턴 포인터가 어느 위치로 가야 하는지 알려주는 길잡이 배열이다.

![KMP 설명 1](/assets/20210322_160220.png)

![KMP 설명 2](/assets/20210322_160300.png)

![KMP 설명 3](/assets/20210322_160316.png)
