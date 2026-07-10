---
title: "[Algorithm] SWEA_서로소집합"
date: 2021-04-15
category: "Algorithm"
tags: ["Algorithm"]
description: "Union-Find 자료구조로 합집합과 같은 집합 여부 확인 연산을 처리하는 SWEA 서로소 집합 문제 풀이 정리."
permalink: "study/2021/04/15/서로소집합"
---

## 문제

> 출처: [SWEA - 서로소 집합](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWBJKA6qr2oDFAWr&categoryId=AWBJKA6qr2oDFAWr&categoryType=CODE&problemTitle=%EC%84%9C%EB%A1%9C%EC%86%8C+%EC%A7%91%ED%95%A9&orderBy=FIRST_REG_DATETIME&selectCodeLang=ALL&select-1=&pageSize=10&pageIndex=1)

초기에 {1}, {2}, ... {n}이 각각 n개의 집합을 이루고 있다. 여기에 다음 두 연산을 수행하는 프로그램을 작성하면 된다.

- **합집합 연산**: a가 포함된 집합과 b가 포함된 집합을 하나로 합친다.
- **포함 여부 확인 연산**: 두 원소 a, b가 같은 집합에 속해 있는지 확인한다.

### 입력

- 첫 번째 줄에 테스트 케이스의 수 `T`가 주어진다.
- 각 테스트 케이스의 첫째 줄에 `n`(1 ≤ n ≤ 1,000,000), `m`(1 ≤ m ≤ 100,000)이 주어진다. (`m`은 연산의 개수)
- 다음 `m`개의 줄에 각각의 연산이 주어진다.

| 입력 형태 | 연산 | 의미 |
| --- | --- | --- |
| `0 a b` | 합집합 | a가 속한 집합과 b가 속한 집합을 합친다. |
| `1 a b` | 확인 | a와 b가 같은 집합에 속해 있는지 확인한다. |

- a와 b는 n 이하의 자연수이며 같을 수도 있다.

### 출력

각 테스트 케이스마다 `1`로 시작하는 입력에 대해 같은 집합에 속해 있으면 `1`을, 아니면 `0`을 순서대로 한 줄에 연속하여 출력한다.

## 풀이

```

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class d4_3289_서로소집합 {
	static int [] p;
	static int find(int a) {
		if(a==p[a]) return a;
		else return p[a] = find(p[a]);
	}
	static void union(int a, int b) {
//		int pa = find(a);
//		int pb = find(b);
//		사실 변수 그대로 쓰는건 별로긴 하지만 최소코딩이면 이렇게도 가능하다.
//		a = find(a);
//		b = find(a);
//		pa pb 같던지 말던지.
//				p[pb] = pa;

		p[find(b)] = find(a);



	}
	public static void main(String[] args) throws NumberFormatException, IOException {
				 //0,1,2,3,4,5,6,7,8,9
//		int[] p = {0,1,1,2,3,4,8,9,7,9};	//5번의 부모는 4, 4번의 부모는 3, 3번의 부모는 2
//		
//		System.out.println(Arrays.toString(p));
//		System.out.println(find(5));
//		System.out.println(Arrays.toString(p));

		System.setIn(new FileInputStream("res/input_d4_3298.txt"));
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		//자바에서 읽어오는건 인풋 스트림 리더의 형태이다.
		StringBuilder sb = new StringBuilder();
		int T = Integer.parseInt(br.readLine());

		for(int tc = 1; tc<=T;tc++) {
			StringTokenizer st = new StringTokenizer(br.readLine()," ");
			int N = Integer.parseInt(st.nextToken());
			int M = Integer.parseInt(st.nextToken());

			p = new int[N+1];
			for(int i =0; i<N; i++) p[i] = i;
			sb.append("#").append(tc).append(" ");

			for(int i = 0; i<M; i++) {
				st = new StringTokenizer(br.readLine()," ");
				int c = Integer.parseInt(st.nextToken());
				int a = Integer.parseInt(st.nextToken());
				int b = Integer.parseInt(st.nextToken());
				if(c==0) union(a,b);
				else sb.append(find(a)==find(b)?1:0);
			}

			sb.append("ans").append("\n");
		}
		System.out.println(sb.toString());
	}
}


```

## 메모

Union-Find(서로소 집합)의 대표적인 문제였다. 자매품으로 jungol의 종교, BOJ의 친구비가 있다.
