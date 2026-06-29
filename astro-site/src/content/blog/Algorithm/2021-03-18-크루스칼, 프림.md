---
title: "[Algorithm] 크루스칼, 프림"
date: 2021-03-18
category: "Algorithm"
tags: ["Algorithm"]
description: "서로소 집합(Union-Find)과 최소 신장 트리(MST)를 만드는 크루스칼·프림 알고리즘을 정리한 학습 노트."
permalink: "class/2021/03/18/크루스칼,-프림"
---

## 인접 리스트 복습

인접 정점만 담는 리스트는 두 가지로 구현할 수 있다.

### 1. 연결 리스트 자료구조로 직접 구현

- 리스트 구성(가장 앞 노드 추가)
- 전체 탐색

이미 구성된 인접 리스트로 문제를 푸는 경우는 거의 없다. 입력 데이터를 받아 연결 리스트를 구성하고, 다 구성되면 탐색한다. **우리가 할 일은 추가하고 탐색하는 것**이다.

### 2. 사용 가능한 자료구조(ArrayList) 활용

비어 있는 ArrayList만 생성하면 된다.

![ArrayList 배열 구성](/assets/20210318_110221.png)

연결 리스트는 시작점 노드 타입을 따라 쭉 이어지므로 head만 가지고 있으면 됐지만, ArrayList는 차곡차곡 담아둬야 하므로 **ArrayList의 배열 타입**이 된다.

![ArrayList 배열 예시](/assets/20210318_110356.png)

> 연결 리스트를 못 만들겠다면 그냥 ArrayList를 쓰는 것도 하나의 방법이다.

---

## 서로소 집합 (Disjoint Set)

- **서로소(상호배타) 집합**은 서로 중복 포함된 원소가 없는 집합들이다. 즉, 교집합이 없다.
- 집합에 속한 하나의 특정 멤버를 통해 각 집합을 구분하며, 이를 **대표자(representative)**라 한다.
- 이 알고리즘의 대표가 잘 알려진 **유니온 파인드(Union-Find) 알고리즘**이다.

구분자(식별자)는 다른 것과 구별할 수 있는 값이다. 한 집합을 구성하는 모든 원소는 그 안에서 유니크하며, 집합들끼리 교집합이 없으므로 전체를 통틀어도 유니크하다. 따라서 구분자를 따로 만들 필요 없이, 집합 안에 있는 값 중 하나를 골라 식별자로 사용할 수 있다. 이렇게 선택된 요소를 **대표자**라 부른다.

![서로소 집합 개념](/assets/20210318_112354.png)

### 표현 방법과 연산

**표현 방법**

1. 연결 리스트
2. 트리

**기본 연산**

1. `Make-Set(x)`: 단위 집합 생성
2. `Find-Set(x)`: 대표자 찾기
3. `Union(x, y)`: 두 집합 합치기

![서로소 집합 연산](/assets/20210318_111828.png)

> 알고리즘은 새로운 문제도 풀어야 하지만, 풀었던 문제를 또 풀 줄 알아야 한다. 나중에 "풀어봤던 건데…?"라고만 기억나는 것은 소용이 없다.

---

### 서로소 집합 표현 - 연결 리스트

1. 같은 집합의 원소들은 하나의 연결 리스트로 관리한다.
2. 연결 리스트의 맨 앞 원소를 집합의 대표 원소로 삼는다.
3. 각 원소는 집합의 대표 원소를 가리키는 링크를 갖는다.

![연결 리스트 표현](/assets/20210318_114009.png)

- `e`가 속한 집합의 대표를 찾으려면 대표자 링크를 **한 번만** 따라가면 된다.
- `a`는 자신이 대표자인 집합이다.
- 어느 쪽으로 합쳐지느냐는 구현하기 나름이다.

![연결 리스트 합치기](/assets/20210318_114130.png)

---

### 서로소 집합 표현 - 트리

1. 하나의 집합(a disjoint set)을 하나의 트리로 표현한다.
2. 자식 노드가 부모 노드를 가리키며, **루트 노드가 대표자**가 된다.

유니온 파인드를 할 때는 트리로 많이 표현한다.

![트리 표현](/assets/20210318_114353.png)

시작하기 전 `Make-Set`으로 전처리 연산을 한다. 자신 하나만 갖는 집합(크기가 1인 집합)을 만드는 것으로, 절대 교집합이 있을 수 없다.

![Make-Set 1](/assets/20210318_114551.png)

![Make-Set 2](/assets/20210318_114607.png)

![Make-Set 3](/assets/20210318_114619.png)

![Union 동작](/assets/20210318_115553.png)

가리키는 방향은 위(부모)로 올라간다. 예를 들어 "쇠망치파"가 "쇠도끼파"에 흡수되면 부모가 쇠도끼파의 부하가 되어 `no1 → no2`로 연결되고 관계는 계속 유지된다.

> 대표(부모)를 통해 자식을 찾을 수는 없다. 자식에서 부모로 올라가기 위해서만 사용한다.

![연산 요약](/assets/20210318_114638.png)

| 연산 | 설명 |
| --- | --- |
| `Make-Set` | 쪼개진 가장 작은 단위 집합을 만든다 |
| `Find-Set` | 대표자를 찾는다 |
| `Union` | 두 집합을 합친다 |

![Union 예시 1](/assets/20210318_120438.png)

![Union 예시 2](/assets/20210318_120447.png)

---

### 문제점

트리 구조의 깊이(depth)가 깊어지는 경우가 생긴다. 이때 `b`의 대표자를 찾으라고 하면, 최악의 경우 루트까지 쭉 올라가야 한다. depth가 깊어져 리프 노드에 가까운 형태가 되면 원소 개수만큼 따라 올라가는 재귀 호출이 발생한다. `Find-Set`이 여러 번 발생하면 그만큼 재귀 호출이 늘어난다.

이를 개선할 수 있는 방법이 있다.

### 연산의 효율을 높이는 방법

**1. Rank를 이용한 Union**

1. 각 노드는 자신을 루트로 하는 서브트리의 높이를 **랭크(rank)**라는 이름으로 저장한다.
2. 두 집합을 합칠 때 rank가 낮은 집합을 rank가 높은 집합에 붙인다.

**2. Path Compression**

1. `Find-Set`을 행하는 과정에서 만나는 모든 노드가 직접 루트를 가리키도록 포인터를 바꿔준다.

#### Rank를 이용한 Union의 예

랭크가 높은 쪽에 낮은 쪽을 붙이면 랭크 변화가 없다. 하지만 랭크가 같은 둘을 합치면 대표자가 되는 쪽에 자식이 하나 더 생겨 depth가 하나 늘어나므로, 랭크 관리가 필요하다.

![Rank Union 1](/assets/20210318_121349.png)

![Rank Union 2](/assets/20210318_121401.png)

#### Path Compression의 예

어떤 집합에 속하는지 알기 위해 대표자 `a`를 찾아가면 부모를 계속 따라가는 현상이 발생한다. 그런데 조직 안의 계층 구조가 궁금한 게 아니라 "이 원소가 누구의 조직인지"만 알고 싶은 것이다. 그렇다면 내부 계층은 의미가 없으므로, 조직원을 바로 파악하기 위해 (부모로 가는 긴 경로를) 깨뜨려 루트를 직접 가리키게 한다.

![Path Compression](/assets/20210318_122035.png)

![Path Compression 결과](/assets/20210318_132356.png)

위 결과처럼 나오는 이유는

![Path Compression 구조](/assets/20210318_132340.png)

이처럼 `0`에서 바로 `1, 2, 3, 4`가 연결되기 때문이다.

### 서로소 집합 구현 코드

```
package com.ssafy;

import java.util.Arrays;

public class DisjointSetTest {
	static int N;
	static int parents[];

	static void make() {	// 크기가 1인 단위집합을 만든다.
		for(int i =0; i<N; i++) {
			parents[i] = i;	//자기 배열 위치에 자기 값 넣음.	자기 자신이 대표자
		}
	}

	//2. 대표자를 찾는 메서드
	static int findSet(int a) {	//find는 들어온 원소의 대표자를 찾아줌(재귀하면서 파라미터가 a였는데 a의 부모를 집어넣어서
		//a의 부모의 부모를 찾아가면서 어느 순간 꼭대기까지 가면 조건 만족해서 찾은 a값을 리턴.
		if(parents[a]==a) return a;	//내가대표면 그냥 리턴.	자기자신과 같으면 자기가 대표자라서 바로리턴
		//부모에도 부모가 있을 수 있고 계속 올라감.
//		return findSet(parents[a]);		//path Compression 전
		return parents[a] =  findSet(parents[a]);		//path Compression 후
		//아니면 다른 원소 들어있었으면 더 위로 올라가서 대표자 찾는 거.
		//찾은 부모값을 a의 부모값으로 다시 집어넣음.
		//올라가서 찾은 대표값을 리셋.
	}

	static boolean union(int a, int b) {	//유니온의 리턴값은 꼭 필요하진 않지만 잘 합쳐졌는지 확인해야 될 경우들이 있다.
		//아예 리턴값 활용하게 쓰는게 훨씬 좋은거 같다.
		//앞쪽에 있는 a에 뒤쪽에 있는 b를 넣는다.
		int aRoot = findSet(a);
		int bRoot = findSet(b);
		//얘들은 매개변수로만 쓰고 짱 끼리 합치는 거.
		if(aRoot == bRoot) {	//두 조직의 짱이 같은 상황이면 이미 같은 조직이므로 합칠 필요가 없음.
			return false;	//합치지 못한 결과 리턴.
		}

		parents[bRoot] = aRoot;	//aRoot의 값 가져다 b에 넣는게 아니라 b의부모를 연결해서 대표자와 대표자끼리 작업하게 함.
		//b의 대표자 집어넣음.
		//이거 잘 기억하면 문제 풀때 적용하기 쉽다.
		//b루트의 부모를 a루트로 바꿔줌.
		return true;
		//나중에 랭크 이용하면 랭크 비교해서 랭크가 높은 쪽에 낮은 쪽 붙이고 둘의 랭크 같으면 자식의 랭크 하나 올려주는 이런 코드가 필요
		//path 압축햇을때 랭크 관리 쉽지않음.
	}

	public static void main(String[] args) {
		N=5; //편의상 원소의 개수 5개
		parents = new int[N];//원소 개수만큼 배열 생성

		//1.make set 모든 원소들로 상호배타적인 집합 만든다.
		make();

		System.out.println("=====union=====");
		System.out.println(union(0,1));
		System.out.println(Arrays.toString(parents));
		System.out.println(union(1,2));
		System.out.println(Arrays.toString(parents));
		System.out.println(union(3,4));
		System.out.println(Arrays.toString(parents));
		System.out.println(union(0,2));
		System.out.println(Arrays.toString(parents));
		System.out.println(union(0,4));
		System.out.println(Arrays.toString(parents));

		System.out.println("=====find=====");

		System.out.println(findSet(4));
		System.out.println(Arrays.toString(parents));
		System.out.println(findSet(3));
		System.out.println(Arrays.toString(parents));
		System.out.println(findSet(2));
		System.out.println(Arrays.toString(parents));
		System.out.println(findSet(0));
		System.out.println(Arrays.toString(parents));
		System.out.println(findSet(1));
		System.out.println(Arrays.toString(parents));

	}
}

```

---

## 최소 신장 트리 (MST) — 중요

문제에도 많이 쓰이고 자주 출제되는 유형이다.

### 그래프의 최소 비용 문제

1. 모든 정점을 연결하는 간선들의 **가중치 합이 최소**가 되는 트리
2. 두 정점 사이의 최소 비용 경로 찾기

### 용어 정리

- **신장 트리(Spanning Tree)**: N개의 정점으로 이뤄진 무향 그래프에서 `n`개의 정점과 `n-1`개의 간선으로 이뤄진 트리.
- **최소 신장 트리(MST, Minimum Spanning Tree)**: 무향 가중치 그래프에서, 신장 트리를 구성하는 간선들의 가중치 합이 최소인 신장 트리.

![신장 트리 개념](/assets/20210318_140811.png)

![최소 신장 트리 개념](/assets/20210318_140941.png)

---

## 크루스칼(Kruskal) 알고리즘

**간선을 하나씩 선택해서 MST를 찾는 알고리즘**이다.

1. 최초에 모든 간선을 가중치에 따라 오름차순으로 정렬한다.
2. 가중치가 가장 낮은 간선부터 선택하면서 트리를 키운다.
   → 사이클이 존재하면 그 간선은 건너뛰고 다음으로 가중치가 낮은 간선을 선택한다.
3. `n-1`개의 간선이 선택될 때까지 2를 반복한다.

### 그래프 표현 복습

- 인접 행렬, 인접 리스트는 **정점 중심**으로 표현한다.
- 간선 리스트는 리스트 안에 **간선 정보**들이 쭉 들어간다.

간선 정보에는 `from → to`뿐 아니라, MST는 가중치 합을 최소로 만들어야 하므로 **가중치 정보**도 함께 담을 데이터 타입이 필요하다(가중치 그래프에 한해 만들 수 있다).

![간선 정보 표현](/assets/20210318_141523.png)

그런데 이런 데이터 타입은 따로 없다. `from`, `to`, `weight`를 한 번에 담는 특별한 클래스가 기본 제공되지 않으므로 **직접 클래스를 만든다.** `int[]` (1차원 배열)로 써도 되지만, 그러면 인덱스 0, 1, 2가 각각 무슨 의미인지 외워야 한다. 세 값을 담는 커스텀 타입을 만들면 더 관리하기 편하다. 이름을 `Edge`라 짓자.

![간선 리스트 집합](/assets/20210318_142341.png)

간선을 `int[]`로 만들고 이를 담는 집합이 필요하다면, `int[]`를 담는 ArrayList도 좋고, `int` 2차원 배열에 담아도 된다. **집합 개념만 성립하면 된다.** `Edge` 커스텀 타입으로 만든다면 `Edge[]` 배열이나 `ArrayList<Edge>`로 담으면 된다.

> 핵심은 그래프로 들어오는 정보를 **간선 리스트로 저장한다**는 것을 아는 것이다.

### 그리디(Greedy)와 정렬

현재 선택이 가장 최적이고 유리하다고 보고, 뒤를 돌아보지 않는 기법이 **그리디**다. 제일 작은 것, 그다음 작은 것을 더해가며 최소를 만든다.

![간선 정렬](/assets/20210318_143500.png)

순서가 섞여 있으면 판단할 수 없지만, 오름차순으로 정렬하면 가장 작은 것이 맨 앞, 그다음 작은 것 순으로 순서가 보장된다. N개 정점에서 가장 가중치가 작은 것부터 `n-1`개까지 선택하면 신장 트리를 만들 수 있다.

- `from`에서 `to`로 `weight` 가중치가 설정되면, 두 정점을 `weight` 비용으로 연결한다고 생각하면 된다.
- 간선을 하나 선택할 때마다 정점들이 연결된다. 즉 **간선 선택 = 두 정점을 연결하는 효과**다.
- 정점 3개에서 간선 2개만 쓰면 신장 트리가 된다.

### 사이클 주의

사이클이 생기면 트리가 될 수 없다. (정점 2 입장에서 1도 부모, 3도 부모인 상황이 가능한데, 거기에 `1-3`까지 이어지면 사이클이 된다.) 따라서 단순히 간선을 `n-1`개 소모한 것이 아니라, **의미 있다고 선택한 간선의 개수가 `n-1`개가 될 때** 신장 트리가 완성된다.

![사이클 발생 예](/assets/20210318_144437.png)

위에서 `2-3`은 쓰지 않는다(신장 트리가 안 되므로). 정점 4개에서 간선이 3개 있지만 결국 선택한 건 2개이고, 아직 하나 더 선택해야 한다.

그다음 최소는 `2-4`다.

![간선 선택 진행](/assets/20210318_144541.png)

이렇게 모든 정점이 연결되면 트리 구성이 끝난다.

---

### 크루스칼과 유니온 파인드

크루스칼 알고리즘은 **서로소 집합(유니온 파인드)** 으로 사이클을 찾고 해결한다.

정리하면, 다음 절차로 동작한다.

1. 모든 간선을 가중치 기준 오름차순으로 정렬한다(= 간선 리스트 작성).
2. 가중치가 가장 낮은 간선부터 선택하면서 트리를 키운다. → 사이클이 존재하면 건너뛴다.
3. `n-1`개의 간선이 선택될 때까지 2를 반복한다.

![초기 단위 집합](/assets/20210318_144813.png)

처음에는 정점들이 모두 끊어진, 크기가 1인 단위 집합이다. 간선을 하나 쓰기로 선택하면 두 정점을 연결해 한 덩어리로 만든다. 즉 **간선을 선택하는 작업이 곧 Union 처리**가 된다.

![사이클 판단](/assets/20210318_145212.png)

찾은 두 원소의 대표자가 똑같으면 이미 같은 집합이며, 연결하면 사이클이 발생한다. 이럴 때는 해당 간선을 쓰지 않는다. 앞서 `union()`을 `boolean`으로 만들었으므로, **리턴값을 활용**해 합쳐지는지 시도해본다.

![union 리턴값 활용](/assets/20210318_145334.png)

`find(a)` 결과를 `aRoot`, `find(b)` 결과를 `bRoot`에 담고, 두 루트가 같으면 `false`를 리턴한다.

선택된 간선이 `n-1`개가 되면 끝낸다. 가중치가 낮은 간선부터 썼으므로 뒤에는 더 큰 간선만 남아 더 볼 필요가 없다.

> 크루스칼 알고리즘을 잘 이해하려면 서로소 집합(Union-Find)을 잘 알고 있어야 한다.

![정렬된 간선 선택 1](/assets/20210318_145810.png)

간선 리스트가 가중치 기준 오름차순으로 정렬되어 있다. (예: `5-3`을 연결하는 비용이 18인데, 모두 분리된 독립 정점이라면 무조건 선택한다.) 기존에 연결된 것을 초록색으로 바꾸며 진행한다.

![사이클로 제외](/assets/20210318_145817.png)

`0-1`은 같은 집합에 속해 있으므로 선택하지 않는다(사이클 발생).

![간선 선택 진행 2](/assets/20210318_145949.png)

![최종 신장 트리](/assets/20210318_145826.png)

신장 트리를 만들어야 하므로 서로소 집합이 결국 1개로 합쳐져야 한다. 정점이 7개이므로 간선 6개가 선택되어야 한다.

### 크루스칼 알고리즘 구현 코드

```

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class MST1_KruskalTest {

	static class Edge implements Comparable<Edge>{
		int from , to, weight;
		//간선 스스로가 다른 간선과 자기 스스로 비교(나에서 상대를 뺸다)
//		항상 나를 기준으로 상대를 뺴는 연산(내림 차순이면 순서만 뒤집어라. )

		public Edge(int from, int to, int weight) {
			super();
			this.from = from;
			this.to = to;
			this.weight = weight;
		}

		@Override
		public int compareTo(Edge o) {
//			return this.weight -o.weight;
			return Integer.compare(this.weight, o.weight);
//			만약 값이 음수랑 섞일거 같다 생각하면 Integer.comapre이용해서 음수 발생하면 언더플로 양수에 음수 뺴지면 오버플로우 발생하니까
//			내부적으로 이렇게 써도 됨 . 알아서 내부적으로 앞에서 뒤를 뻄(부호를 크기검사해서 알아서 줌.)
		}



	}

	static int V,E;	//알트 쉬프트 R 키누르면 리네임(rename), V는 정점 개수, E는 간선 개수.
	static int parents[];
	static Edge[] edgeList; //간선 리스트 만들 거(간선 개수 줄거라 배열로 만듬.
	//간선 개수 모르면 어레이리스트 쓰면 좋지만 간선 들어오는 개수 알면 배열 안 쓸 이유가 없으니까 배열로 써도 된다.
	static void make() {	// 크기가 1인 단위집합을 만든다.
		for(int i =0; i<V; i++) {
			parents[i] = i;	//자기 배열 위치에 자기 값 넣음.	자기 자신이 대표자
		}
	}

	//2. 대표자를 찾는 메서드
	static int findSet(int a) {	//find는 들어온 원소의 대표자를 찾아줌(재귀하면서 파라미터가 a였는데 a의 부모를 집어넣어서
		//a의 부모의 부모를 찾아가면서 어느 순간 꼭대기까지 가면 조건 만족해서 찾은 a값을 리턴.
		if(parents[a]==a) return a;	//내가대표면 그냥 리턴.	자기자신과 같으면 자기가 대표자라서 바로리턴
		//부모에도 부모가 있을 수 있고 계속 올라감.
//		return findSet(parents[a]);		//path Compression 전
		return parents[a] =  findSet(parents[a]);		//path Compression 후
		//아니면 다른 원소 들어있었으면 더 위로 올라가서 대표자 찾는 거.
		//찾은 부모값을 a의 부모값으로 다시 집어넣음.
		//올라가서 찾은 대표값을 리셋.
	}

	static boolean union(int a, int b) {	//유니온의 리턴값은 꼭 필요하진 않지만 잘 합쳐졌는지 확인해야 될 경우들이 있다.
		//아예 리턴값 활용하게 쓰는게 훨씬 좋은거 같다.
		//앞쪽에 있는 a에 뒤쪽에 있는 b를 넣는다.
		int aRoot = findSet(a);
		int bRoot = findSet(b);
		//얘들은 매개변수로만 쓰고 짱 끼리 합치는 거.
		if(aRoot == bRoot) {	//두 조직의 짱이 같은 상황이면 이미 같은 조직이므로 합칠 필요가 없음.
			return false;	//합치지 못한 결과 리턴.
		}

		parents[bRoot] = aRoot;	//aRoot의 값 가져다 b에 넣는게 아니라 b의부모를 연결해서 대표자와 대표자끼리 작업하게 함.
		//b의 대표자 집어넣음.
		//이거 잘 기억하면 문제 풀때 적용하기 쉽다.
		//b루트의 부모를 a루트로 바꿔줌.
		return true;
		//나중에 랭크 이용하면 랭크 비교해서 랭크가 높은 쪽에 낮은 쪽 붙이고 둘의 랭크 같으면 자식의 랭크 하나 올려주는 이런 코드가 필요
		//path 압축햇을때 랭크 관리 쉽지않음.
	}

	//여기까지 서로소 집합 구성하는 부분.

	public static void main(String[] args) throws IOException {
		//메인에서 최소신장트리 만들기 위해 유니온 활용만 하면 됨.
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine()," ");

		V = Integer.parseInt(st.nextToken());
		E = Integer.parseInt(st.nextToken());

		parents = new int [V];	//정점개수 배열
		edgeList = new Edge[E];	//간선 개수 배열

		for(int i =0; i<E; i++) {
			st = new StringTokenizer(br.readLine()," ");
			int from = Integer.parseInt(st.nextToken());
			int to = Integer.parseInt(st.nextToken());
			int weight = Integer.parseInt(st.nextToken());
			edgeList[i] = new Edge(from, to, weight);
		}	//간선 리스트

		//1. 간선 리스트 가중치 기준 오름차순 정렬
		Arrays.sort(edgeList);	//(이미 위에서 오름차순 정렬해서 호출만 하면 끝)

		//여기서 부터 유니온 파인드 작업
		make();
		int result = 0; //가중치의 합 구할 변수
		int count = 0; // 선택한 간선 수(몇개 선택했는지 카운트 해야됨

		for(Edge edge : edgeList) {
			if(union(edge.from, edge.to)) {	// 이 결과가 true면 싸이클이 발생하지 않았다면 서로 다른집합.
				result += edge.weight;
				if(++count ==V-1) break;	//정점 -1 개수가 되면 더 볼 필요가 없음

			}
		}
//		간선이 union되면 그 때 비용 누적 시키고 카운트 올리고 카운트가 정점-1개수가 되면 빠져나옴
//		답은 그때까지 누적된 result를 찍으면 된다.
		System.out.println(result);
	}

}

5 10
0 1 5
0 2 10
0 3 8
0 4 7
1 2 5
1 3 3
1 4 6
2 3 1
2 4 3
3 4 1

output==>10
```

핵심은 유니온 파인드를 다음과 같이 활용한다는 것이다.

- 간선 하나를 선택하는 것은 두 정점을 연결하는 것이다.
- 처음에는 모든 정점이 독립된 집합에서 출발한다.
- 간선을 하나 쓸 때마다 두 정점을 계속 이어주는데, 이때 합칠 수 없다면(이미 같은 집합이라면) 다시 연결하면 사이클이 발생하므로 Union하지 않는다.

### 시간 복잡도와 한계

- 간선을 우선순위 큐에 저장하면 넣을 때 `log N`이 걸리고, 이를 N번 하므로 `N log N`이 된다. 뺄 때도 힙이 조정되어 `log N`이다. 다만 (정렬만 한다면) 굳이 우선순위 큐를 쓰지 않아도 된다.
- `findSet`을 썼다고 랭크가 완벽히 관리되는 것은 아니다. **`find`를 했을 때만 Path Compression이 발생**한다.

대표자끼리 Union하면(예: 4, 5가 각각 대표자인 상태에서 합치면) 부모를 찾아 올라가는 과정이 없어 Path Compression이 일어나지 않는다. 3, 4를 연결할 때도 서로 대표자라면 마찬가지다.

![Path Compression 한계](/assets/20210318_152841.png)

최악의 경우 한쪽으로만 쭉 이어져 Path Compression 효과가 없는 상황이 생긴다. 그래서 **랭크 관리**가 필요하다. 다만 랭크를 관리해도 완벽하진 않으며(Path Compression과 랭크 관리를 동시에 하기가 쉽지 않다), 그래도 이런 최악 상황을 방지할 수 있어 둘을 함께 구현하는 경우가 많다.

![랭크 관리 예 1](/assets/20210318_153102.png)

![랭크 관리 예 2](/assets/20210318_153127.png)

---

## 프림(Prim) 알고리즘

- **하나의 정점에서** 연결된 간선들 중 하나씩 선택해 나가면서 MST를 만들어가는 방식이다.

1. 임의의 정점을 하나 선택해서 시작한다.
2. 선택한 정점과 인접한 정점들 중 **최소 비용 간선**으로 연결되는 정점을 선택한다.
3. 모든 정점이 선택될 때까지 1, 2 과정을 반복한다.

### 두 개의 서로소 집합 유지

1. **트리 정점(tree vertices)**: MST를 만들기 위해 선택된 정점들.
2. **비트리 정점(non-tree vertices)**: 아직 선택되지 않은 정점들.

![프림 동작](/assets/20210318_153840.png)

### 크루스칼과 다른 점

- 프림은 **임의의 정점에서 출발**해, 인접한 정점들 중 가중치가 가장 작은 간선으로 연결되는 정점을 선택한다.
- 두 개의 서로소 집합 정보를 유지하지만, 여기서 서로소 집합(Union-Find) 알고리즘을 쓰는 것은 아니다. 신장 트리에 선택된 정점들과 그렇지 않은 나머지 정점들은 교집합이 없다는 의미일 뿐이다.

트리 정점을 `T`, 비트리 정점을 `NT`라 하면, 인접 정점들로 뻗어보며 가장 유리한 정점을 선택한다. 예를 들어 `A` 정점에서 시작하면 `B, C, D, E`는 비트리 정점(`NT`)이 된다. 그중 `B`를 신장 트리 구성에 포함하면 `B`를 `T`에 넣는다. (서로소 집합을 만들며 진행하는 것이 아니라 이런 느낌이라는 것이다.)

![프림 진행 1](/assets/20210318_154126.png)

![프림 진행 2](/assets/20210318_154138.png)

이 중 가장 유리한 정점을 연결하면 그 부분이 신장 트리에 들어간다.

![프림 진행 3](/assets/20210318_154245.png)

![프림 진행 4](/assets/20210318_154309.png)

![프림 진행 5](/assets/20210318_154325.png)

> 사실 크루스칼이 프림보다 쉽다. 프림은 "다른 정점에서 나에게 오는 가장 짧은 팔(간선) 길이가 얼마인지" 담는 배열을 들고 다닌다고 알아두자.
