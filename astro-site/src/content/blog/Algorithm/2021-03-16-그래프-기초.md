---
title: "[Algorithm] 그래프 기초"
date: 2021-03-16
category: "Algorithm"
tags: ["Algorithm"]
description: "그래프의 정의와 유형, 인접 행렬·인접 리스트·간선 리스트 표현법, 그리고 BFS·DFS 탐색을 정리한 학습 노트."
permalink: "class/2021/03/16/algorithm_01"
---

## 자료구조의 분류

- **선형 구조**: 1:1 관계로, 한 줄로 줄 세울 수 있다.
- **비선형 구조**: 1:1이 아닌 관계(1:다, 다대다) → **트리, 그래프**

## 그래프란?

그래프는 아이템(사물 또는 추상적 개념)들과 이들의 연결 관계를 표현하는 자료구조다.

- **정점(Vertex)**: 그래프의 구성요소로, 하나의 연결점.
- **간선(Edge)**: 두 정점을 연결하는 선.
- **차수(degree)**: 정점에 연결된 간선의 수.
- 그래프는 **정점들의 집합**과 이들을 연결하는 **간선들의 집합**으로 구성된다.

### 정점과 간선의 개수 관계

- `V`: 정점의 개수, `E`: 그래프에 포함된 간선의 개수
- V개의 정점을 가지는 그래프는 최대 `V*(V-1)/2`개의 간선이 가능하다.
- 예) 5개 정점이 있는 그래프의 최대 간선 수는 `5*4/2 = 10`개이다.

선형 자료구조나 트리 자료구조로 표현하기 어려운 **N:N 관계**를 가지는 원소들을 표현하기에 용이하다.

---

## 그래프 유형

- **무향 그래프**: 방향성이 없으며, 양방향 관계를 의미한다.
- **유향 그래프**: 간선에 방향이 있다.
- **가중치 그래프**: 간선에 가중치(비용)가 있다.
- **사이클 없는 방향 그래프 (DAG, Directed Acyclic Graph)**

![그래프 유형 분류](/assets/20210316_092412.png)

### 완전 그래프 / 부분 그래프 / 트리

- **완전 그래프**: 정점들에 대해 가능한 모든 간선을 가진 그래프.
- **부분 그래프**: 원래 그래프에서 일부 정점이나 간선을 제외한 그래프.
- **트리**: 사이클이 없는 무향 연결 그래프.
  1. 두 노드 사이에는 유일한 경로가 존재한다.
  2. 각 노드는 최대 하나의 부모 노드가 존재할 수 있다.
  3. 각 노드는 자식 노드가 없거나 하나 이상 존재할 수 있다.

---

## 인접 정점

### 인접(Adjacency)

- 두 개의 정점이 간선으로 연결되어 있으면 서로 **인접**해 있다고 한다.
- 완전 그래프에 속한 임의의 두 정점은 모두 인접해 있다.

![인접 정점 예시](/assets/20210316_093713.png)

---

## 그래프 경로

**경로(path)**란 어떤 정점에서 시작해 다른 정점에서 끝나는 순회로, 두 정점 사이를 잇는 간선들을 순서대로 나열한 것이다.

완전탐색은 루트부터 시작하지만, 그래프는 루트라는 개념이 없으므로 임의의 정점에서 시작해도 전부 탐색할 수 있다. (임의의 정점이 다른 하나의 정점에 연결되어 있으면 모두 탐색 가능하다.)

**예) 0~6의 경로**

- 정점들: `0-2-4-6`
- 간선들: `(0,2), (2,4), (4,6)`

### 단순 경로

- 경로 중 한 정점을 **최대 한 번만** 지나는 경로를 단순경로라 한다.
- 예) `0-2-4-6`, `0-1-6`

### 순환 경로(Cyclic Path)

- 경로의 시작점과 끝점이 같은 경로.
- 경로에서 어떤 정점을 2번 이상 거치는 경우.
- 예) `1-3-5-1`

---

## 그래프 표현

간선의 정보를 저장하는 방식으로, 메모리나 성능을 고려해서 결정한다.

| 표현 방식 | 설명 |
| --- | --- |
| **인접 행렬(Adjacency Matrix)** | `V×V` 크기의 2차원 배열로 간선 정보를 저장 (배열의 배열, Reference Array) |
| **인접 리스트(Adjacency List)** | 각 정점마다 다른 정점으로 나가는 간선의 정보를 저장 |
| **간선 리스트(Edge List)** | 간선(시작 정점, 끝 정점)의 정보를 객체로 표현해 리스트에 저장 |

![그래프 표현 방식 비교](/assets/20210316_095223.png)

---

### 인접 행렬

두 정점을 연결하는 간선의 유무를 행렬로 표현한다.

- `V×V` 정방 행렬
- 행 번호와 열 번호는 각각 정점에 대응
- 두 정점이 인접되어 있으면 `1`, 아니면 `0`으로 표현

**차수 계산**

- **무향 그래프**: i번째 행의 합 = i번째 열의 합 = `Vi`의 차수
- **유향 그래프**:
  - 행 i의 합 = `Vi`의 진출 차수
  - 열 i의 합 = `Vi`의 진입 차수

![인접 행렬 예시](/assets/20210316_103546.png)

#### 인접 행렬의 단점

희소 그래프(Sparse Graph)와 밀집 그래프(Dense Graph)를 구분해야 한다.

![희소 그래프 vs 밀집 그래프](/assets/20210316_103759.png)

희소 그래프일 때는 인접 행렬보다 **인접 리스트**를 쓰는 것이 유리하다.

---

### 인접 리스트

- 각 정점에 대한 인접 정점들을 순차적으로 표현한다.
- 하나의 정점에 대한 인접 정점들을 각각 노드로 하는 **연결 리스트**로 저장한다.

![인접 리스트 구조](/assets/20210316_104236.png)

![인접 리스트 예시](/assets/20210316_104105.png)

맨 앞 배열에 있는 것이 `from`, 거기서 오른쪽으로 이어진 것들을 `to`로 보면 된다.

- 0번 정점 기준으로 인접한 정점들
- 1번 정점 기준으로 인접한 정점들
- … 이렇게 옆으로 정점이 이어져 있다.

![연결 리스트 head 유지](/assets/20210316_104343.png)

연결 리스트의 head(첫 번째)만 가지고 있으면 그 뒤의 노드들을 다 따라갈 수 있다. 따라서 정점 개수만큼 연결 리스트를 만들고, 각 연결 리스트의 head만 유지한다.

#### 구현 방식

구현 방식에 따라 두 가지로 나뉜다.

1. **연결 리스트로 구현**: 하나하나 노드로 만들어 `Node` 타입의 배열로 선언한다.
2. **ArrayList로 구현**: ArrayList의 배열로 담는다.

> 2번이 더 쉬워 보일 수 있지만, ArrayList는 자바의 컬렉션이라 성능상 불리함이 있다. 직접 연결 리스트로 구현하는 편이 더 좋다(30% 이상 속도 개선).

- 연결 리스트 안의 **순서는 중요하지 않다.** 앞으로 삽입하는 알고리즘으로 추가하면 된다(head가 가리키는 것을 계속 바꿔주므로 복잡할 게 없다).
- 2차원 배열로 만드는 것보다 손이 더 가서 잘 안 쓰려고 하지만 알아두는 게 좋다.

![인접 리스트 (무향/유향)](/assets/20210316_105058.png)

위는 무향 그래프로, `0-6`, `6-0`을 모두 추가한다. 간선이 8개지만 의미상으로는 16개다(`4, 1, 1, 2, 3, 3, 2` → 합 16개). 인접 행렬을 대칭으로 만들었던 것처럼, 인접 리스트도 뒤집어서 관계성을 똑같이 표현해야 한다.

반면 아래는 유향 그래프이므로 그럴 필요가 없다. `0-6` 간선이면 0번에서만 처리하면 되고 6번 인접 head에서 처리할 필요가 없다. 따라가면서 자신과 연결된 정점의 수가 차수가 된다.

---

### 간선 리스트

- 두 정점에 대한 간선 그 자체를 객체로 표현하여 리스트로 저장한다.
- 간선을 표현하는 두 정점의 정보(시작 정점, 끝 정점)를 나타낸다.
- 어느 정점에서 어느 정점으로 가는 간선인지, 그때의 가중치가 얼마인지를 담는다.
- 무향이면 간선 정보를 하나 더 만들어서 넣어주면 된다.

![간선 리스트 예시](/assets/20210316_105540.png)

---

## 그래프 탐색(순회)

그래프 순회는 비선형 구조인 그래프로 표현된 **모든 정점을 빠짐없이 탐색**하는 것을 의미한다. 두 가지 방법이 있다.

1. **너비 우선 탐색 (BFS, Breadth First Search)**
2. **깊이 우선 탐색 (DFS, Depth First Search)**

---

## BFS (Breadth First Search)

- 너비 우선 탐색은 탐색 시작점의 인접한 정점들을 먼저 모두 차례로 방문한 후에, 방문했던 정점을 시작점으로 해서 다시 인접한 정점들을 차례로 방문하는 방식이다.
- 인접한 정점들을 탐색한 후 차례로 다시 너비 우선 탐색을 진행해야 하므로, **선입선출(FIFO) 구조인 큐**를 활용한다.
- **최단 거리**를 찾을 때 BFS를 많이 사용한다.

![BFS 동작 1](/assets/20210316_110049.png)

![BFS 동작 2](/assets/20210316_110242.png)

### 인접 행렬 기반 BFS 구현

```
package com.ssafy.graph;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

/*
7
8
0 1
0 2
1 3
1 4
2 4
3 5
4 5
5 6
*/

public class G1_AdjMatrixTest {
	static int N;
	static boolean[][] adjMatrix;

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br  = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		int C = Integer.parseInt(br.readLine());
		adjMatrix = new boolean[N][N];

		StringTokenizer st = null;
		for(int i =0; i<C;i++) {
			st = new StringTokenizer(br.readLine()," ");
			int from = Integer.parseInt(st.nextToken());
			int to = Integer.parseInt(st.nextToken());
			adjMatrix[to][from] = adjMatrix[from][to] =true;
		}
		bfs();
	}
	private static void bfs() {
		Queue<Integer> queue = new LinkedList<Integer>();
		boolean [] visited = new boolean[N];

		//탐색 시작 정점 : 0으로 출발
		int start =0;
		queue.offer(start);
		visited[start] = true;

		while(!queue.isEmpty()) {
			int current = queue.poll();
			//현재 정점에 관련된 처리
			System.out.println((char)(current+65));

			//인접 정점 탐색
			for(int i = 0;i<N;i++) {
				if(adjMatrix[current][i] //인접정렬
						&& !visited[i]) {//미방문 정점
					queue.offer(i);
					visited[i] = true;

			}
		}
	}
}
}

```

![인접 리스트 구성 1](/assets/20210316_150139.png)

![인접 리스트 구성 2](/assets/20210316_152757.png)

#### 인접 리스트에 노드 추가하기 (앞쪽 삽입)

연결 리스트는 방향과 순서가 상관없으므로, **맨 앞(첫 번째)에 삽입**하는 알고리즘을 쓴다. 맨 뒤에 넣으려면 맨 뒤를 찾는 작업이 필요하지만, 맨 앞에 집어넣으면 그럴 필요가 없다.

![head 갱신 1](/assets/20210316_153240.png)

핵심 코드는 다음 한 줄이다.

```
			adjList[from] = new Node(to,adjList[from]);
```

![head 갱신 2](/assets/20210316_153446.png)

`from` 정점의 head를 새로 만드는 노드로 바꾸되, 새 노드가 첫 번째가 되도록 기존 head 정보를 새 노드의 `next`에 두어 자신의 뒤로 오게 한다. 이렇게 하면 계속 첫 번째 노드로 삽입하게 된다.

![인접 정점 순회 코드](/assets/20210316_154316.png)

```
 for(Node temp = adjList[current]; temp!=null; temp = temp.next)
```

이 부분은 인접 정점만 반복 처리한다. **탐색하는 방법(인접 체크 조건)만 바뀌고 BFS 논리는 그대로**다.

> 정점이 1000개인데 한 정점마다 간선 정보가 2~3개 미만이면, 인접 행렬은 모든 정점을 계속 확인해야 하지만 인접 리스트는 인접한 정점만 처리한다. 따라서 처리량도 줄고, 관계없는 정점까지 자리를 차지하지 않아 **공간 효율도 좋다.** → 인접 리스트가 훨씬 유리하다.

출력이 인접 행렬 버전과 약간 다른데, 이는 노드를 앞쪽에 계속 삽입하기 때문이다(너비가 같은 부분의 순서만 다르다). 인접 행렬에서 오른쪽으로 탐색하든 왼쪽으로 탐색하든 결과는 동일하다.

![탐색 결과 비교](/assets/20210316_160455.png)

#### 너비가 같은 정점들 사이에서는 순서가 상관없다

순서를 유지하려면 매번 마지막 노드로 삽입해야 하는데, 그러면 순서가 바뀌어 들어올 수 있다. 결과가 이렇게 나오는 이유를 알려면 인접 리스트가 어떻게 구성되는지 이해해야 한다.

> 먼저 처리한 인접 리스트 정점이 맨 뒤로, 마지막에 처리한 정점이 맨 앞으로 가므로 순서가 바뀐 것처럼 느껴진다.

### 인접 리스트 기반 BFS 구현

```

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

/*
7
8
0 1
0 2
1 3
1 4
2 4
3 5
4 5
5 6
*/

public class G2_AdjListTest {

	static class Node{

		int vertex;
		Node next;
		//연결리스트의 요소 하나하나 나타내려 만듬.
		//정점 번호랑 연결리스트 역할위한 링크의노드 포인터 가짐.
		public Node(int vertex, Node next) {	//생성자 생성.(노드생성)
			super();
			this.vertex = vertex;
			this.next = next;

		}
		public Node(int vertex) {		//정점정보만 있는 노드 생성.
			super();
			this.vertex = vertex;
		}
		@Override
		public String toString() {	//오버라이딩
			return "Node [vertex=" + vertex + ", next=" + next + "]";
		}

	}

	static int N;
	static Node[] adjList;	//노드 배열
	//0번 정점에 서 인접해있는	인접 정점들의 연결리스트의 몫(head)
	//기차의 처음만 가져오면 다 딸려오듯. 리스트 처음만 알면 링크 따라 다 끌고 옴.

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br  = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		int C = Integer.parseInt(br.readLine());
		adjList = new Node[N];	//정점의 개수만큼 배열 만듬

		StringTokenizer st = null;
		for(int i =0; i<C;i++) {
			st = new StringTokenizer(br.readLine()," ");
			int from = Integer.parseInt(st.nextToken());
			int to = Integer.parseInt(st.nextToken());
			adjList[from] = new Node(to,adjList[from]);
			//0번 노드에서 마지막 노드 따라간 다음 그 마지막 노드 뒤에 붙여야(0-2면)
			//0-3이면 똑같이 2 마지막 따라가서 붙인다.
			//그리고 이 부분들이 상관이 없다.
			//from 의 정점의 헤드를 지금 새로 만드는 애로 바꿔라 대신 새로 만드는 애가 첫째가 되기 위해선 기존 헤드 정보를 넥스트에 두어서 자신의 뒤로 오게 하면 계속 첫번쨰 노드로 집어넣게 되는 것

			adjList[to] = new Node(from,adjList[to]);	//뒤집어서 한번 더해야
			//이렇게 하면 인접리스트 끝. 간선개수만큼 하면 지금 한 작업들이 계속 반복되면 각 노드마다 인접한 정점으로 연결리스트 만들고 각 헤드를 다 물고 있게 된다.

		}
		bfs();
	}
	private static void bfs() {
		Queue<Integer> queue = new LinkedList<Integer>();
		boolean [] visited = new boolean[N];

		//탐색 시작 정점 : 0으로 출발
		int start =0;
		queue.offer(start);
		visited[start] = true;

		while(!queue.isEmpty()) {	//큐가 비어있지 않을때까지 돌면서
			int current = queue.poll();	//뺀다(가장 앞의 정점)
			//현재 정점에 관련된 처리
			System.out.println((char)(current+65));

			//인접 정점 탐색(여기서 부터 달라짐)
			//아까는 인접행렬이라 정점개수만큼 들여다보며 하나씩 체크했는데 이번은 인접리스트라 어떤정점의 인접리스트엔 인접한 애들만 들어있ㅅ다.
//			그래서 인접여부 체크 할 필요가 없다.
			for(Node temp = adjList[current]; temp!=null; temp = temp.next) {
				//Node temp = adjList[current]; 이게 인접리스트의 첫번쨰 해드

//for(Node temp = adjList[current]; temp!=null; temp = temp.next) { 이 부분은 인접 정점만 반복처리
//탐색하는 법이 바뀌는 거 bfs 논리는 그대로임. 이 아래는 인접 체크 조건이 바뀐거. 불필요한 조건이 없어짐.

					if(!visited[temp.vertex]) {	//연결은 되어있으니 인접여부는 판단할 필요가 없고  노드가 저장된 정점을 보면 그게 어떤 정점 정보인지 알 수 있다. 그게 방문되었는지 아닌지만 체크
						queue.offer(temp.vertex);
						visited[temp.vertex] = true;
					}

				}
			}
		}
}

```

> 상황에 따라 인접 행렬을 못 만드는 경우가 있다. 그럴 때는 인접 리스트를 만들어야 한다. 정 어렵다면 ArrayList를 여러 개 차곡차곡 쌓아 만들 수도 있지만, 인접 리스트 구현은 꼭 알아두자.

---

## DFS 알고리즘

- 시작 정점에서 한 방향으로 갈 수 있는 경로가 있는 곳까지 깊이 탐색해 가다가, 더 이상 갈 곳이 없으면 가장 마지막에 만났던 갈림길 정점으로 되돌아와서 다른 방향의 정점으로 탐색을 반복하여 결국 모든 정점을 방문하는 순회 방법.
- 가장 마지막에 만났던 갈림길 정점으로 되돌아가야 하므로, **재귀로 구현하거나 후입선출(LIFO) 구조의 스택**을 사용한다.

![DFS 동작](/assets/20210316_162321.png)

### DFS 구현 (BFS와 함께)

```

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

/*
7
8
0 1
0 2
1 3
1 4
2 4
3 5
4 5
5 6
*/

public class G2_AdjListTest {

	static class Node{

		int vertex;
		Node next;
		//연결리스트의 요소 하나하나 나타내려 만듬.
		//정점 번호랑 연결리스트 역할위한 링크의노드 포인터 가짐.
		public Node(int vertex, Node next) {	//생성자 생성.(노드생성)
			super();
			this.vertex = vertex;
			this.next = next;

		}
		public Node(int vertex) {		//정점정보만 있는 노드 생성.
			super();
			this.vertex = vertex;
		}
		@Override
		public String toString() {	//오버라이딩
			return "Node [vertex=" + vertex + ", next=" + next + "]";
		}

	}

	static int N;
	static Node[] adjList;	//노드 배열
	static boolean[] visited;
	//0번 정점에 서 인접해있는	인접 정점들의 연결리스트의 몫(head)
	//기차의 처음만 가져오면 다 딸려오듯. 리스트 처음만 알면 링크 따라 다 끌고 옴.

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br  = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		int C = Integer.parseInt(br.readLine());
		adjList = new Node[N];	//정점의 개수만큼 배열 만듬

		StringTokenizer st = null;
		for(int i =0; i<C;i++) {
			st = new StringTokenizer(br.readLine()," ");
			int from = Integer.parseInt(st.nextToken());
			int to = Integer.parseInt(st.nextToken());
			adjList[from] = new Node(to,adjList[from]);
			//0번 노드에서 마지막 노드 따라간 다음 그 마지막 노드 뒤에 붙여야(0-2면)
			//0-3이면 똑같이 2 마지막 따라가서 붙인다.
			//그리고 이 부분들이 상관이 없다.
			//from 의 정점의 헤드를 지금 새로 만드는 애로 바꿔라 대신 새로 만드는 애가 첫째가 되기 위해선 기존 헤드 정보를 넥스트에 두어서 자신의 뒤로 오게 하면 계속 첫번쨰 노드로 집어넣게 되는 것

			adjList[to] = new Node(from,adjList[to]);	//뒤집어서 한번 더해야
			//이렇게 하면 인접리스트 끝. 간선개수만큼 하면 지금 한 작업들이 계속 반복되면 각 노드마다 인접한 정점으로 연결리스트 만들고 각 헤드를 다 물고 있게 된다.

		}
		bfs();

		visited = new boolean[N];
		visited[0] = true;
		dfs(0);
	}
	private static void bfs() {
		Queue<Integer> queue = new LinkedList<Integer>();
		boolean [] visited = new boolean[N];

		//탐색 시작 정점 : 0으로 출발
		int start =0;
		queue.offer(start);
		visited[start] = true;

		while(!queue.isEmpty()) {	//큐가 비어있지 않을때까지 돌면서
			int current = queue.poll();	//뺀다(가장 앞의 정점)
			//현재 정점에 관련된 처리
			System.out.println((char)(current+65));

			//인접 정점 탐색(여기서 부터 달라짐)
			//아까는 인접행렬이라 정점개수만큼 들여다보며 하나씩 체크했는데 이번은 인접리스트라 어떤정점의 인접리스트엔 인접한 애들만 들어있ㅅ다.
//			그래서 인접여부 체크 할 필요가 없다.
			for(Node temp = adjList[current]; temp!=null; temp = temp.next) {
				//Node temp = adjList[current]; 이게 인접리스트의 첫번쨰 해드

//for(Node temp = adjList[current]; temp!=null; temp = temp.next) { 이 부분은 인접 정점만 반복처리
//탐색하는 법이 바뀌는 거 bfs 논리는 그대로임. 이 아래는 인접 체크 조건이 바뀐거. 불필요한 조건이 없어짐.

					if(!visited[temp.vertex]) {	//연결은 되어있으니 인접여부는 판단할 필요가 없고  노드가 저장된 정점을 보면 그게 어떤 정점 정보인지 알 수 있다. 그게 방문되었는지 아닌지만 체크
						queue.offer(temp.vertex);
						visited[temp.vertex] = true;
					}

				}
			}
		}

	private static void dfs(int current) {	//bfs랑 비슷 큐에서 뽑아내는 정점이 dfs는 재귀는 현재 받아오는 매개변수 정점이 됨.

//		visited[current] = true;	아니면 호출받자마자 재귀할거냐.
		//어차피 들어갈 때 하나 호출을 받을 떄 하나 차이가 없다. 순서를 기다렸다는게 아니라 visited하고하냐 하고 들어가냐 차이

		System.out.println((char)(current+65));

		for(Node temp = adjList[current]; temp!= null; temp = temp.next) {
			if(!visited[temp.vertex]) {
				visited[current] = true;	//체크하고 함수(메서드)타러 갈거냐 / 아니면 호출받자마자 재귀할거냐.(위에거)
				//혹시나 방ㅁ문체크코드 아까처럼 짜고싶으면  항상 호출하는 코드에 쌍이 되게 넣어주자.
				//들어갈떄 하느냐 문 열자마자 차이(사실 차이 없음)
				dfs(temp.vertex);
			}
		}
	}
}


```
