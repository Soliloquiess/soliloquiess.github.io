---
title: "[Algorithm] SWEA_최소스패닝트리"
date: 2021-04-19
category: "Algorithm"
tags: ["Algorithm"]
description: "프림과 크루스칼 알고리즘 선택 기준과 우선순위 큐 사용 시 방문 처리 시점을 정리한 최소 스패닝 트리(MST) 학습 노트."
permalink: "study/2021/04/19/최소스패닝트리"
---

## MST 알고리즘 선택 기준

- **간선이 많으면 프림**, **간선이 적으면 크루스칼**.
  - 외우는 법: "간(선)많(으면)프(림), 간(선)적(으면)쿠(르스칼)" - by 효인샘
- `2147483647`(Integer.MAX_VALUE)도 외워두자: "21 47 48 36 47".

## 우선순위 큐(PQ)와 방문 처리

- 일반 큐 기반 BFS에서는 **넣을 때 방문 처리**하는 것이 기본이다(무조건 방문 처리).
  - 일반 큐는 넣는 순서가 바뀌지 않기 때문이다.
- 하지만 **우선순위 큐(PQ)를 쓸 때 넣을 때 방문 처리를 하면 큰일 난다.** 왜?
  - PQ는 이미 가중치 순서대로 정렬되어 처리되고, 넣을 때마다 위치가 알아서 바뀌기 때문이다.
  - 그래서 PQ에서는 넣을 때 방문 처리하지 않고, **꺼낼 때 방문 처리**한다.

> 참고: Eclipse에서 `Ctrl + Shift + O`는 import 자동 정렬 단축키.

## 코드 (프림 + PQ + 인접 리스트)

```
package a0419.add;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class Solution_d4_3124_최소스패닝트리_MST3_PrimPQListTest {
	static class Edge implements Comparable<Edge>{
		int from,to,weight;

		public Edge(int from, int to, int weight) {
			super();
			this.from = from;
			this.to = to;
			this.weight = weight;
		}
		@Override
		public int compareTo(Edge o) {
			return Integer.compare(this.weight, o.weight);
		}
	}
	public static void main(String args[]) throws Exception{
		System.setIn(new FileInputStream("res/input_d4_3124.txt"));
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb=new StringBuilder();
		int T=Integer.parseInt(br.readLine());

		for(int tc=1; tc<=T; tc++){
			StringTokenizer st = new StringTokenizer(br.readLine()," ");	 
			int V = Integer.parseInt(st.nextToken());
			int E = Integer.parseInt(st.nextToken());

			//int[][] adjMatrix = new int[V][V];
			List<Edge>[] adjList=new ArrayList[V];
			for (int i = 0; i < V; i++) {
				adjList[i] = new ArrayList<Edge>();
			}
			boolean[] visited = new boolean[V];
			long[] minEdge = new long[V];				
			for (int i = 0; i < V; i++) {
				minEdge[i] = Long.MAX_VALUE;			
			}

			for (int i = 0; i < E; i++) {						
				st = new StringTokenizer(br.readLine()," ");
				int from = Integer.parseInt(st.nextToken())-1;
				int to = Integer.parseInt(st.nextToken())-1;
				int weight = Integer.parseInt(st.nextToken());
				//adjMatrix[from][to] = weight;					
				//adjMatrix[to][from] = weight;
				adjList[from].add(new Edge(from,to,weight));
				adjList[to].add(new Edge(to,from,weight));
			}

			long result = 0;
			minEdge[0] = 0;

			PriorityQueue<Vertex> queue = new PriorityQueue<Vertex>();
			queue.offer(new Vertex(0, minEdge[0]));
			int cnt = 0; // 정점 개수

			while(!queue.isEmpty()) {			
				Vertex minVertex = queue.poll();
				if(visited[minVertex.no]) continue;

				result += minVertex.cost;
				visited[minVertex.no] = true;
				if(++cnt == V) break;

				//for (int i = 0; i < V; i++) {
				//	if(!visited[i] && adjMatrix[minVertex.no][i] != 0 &&
				//			minEdge[i] > adjMatrix[minVertex.no][i]) {
				//		    minEdge[i] = adjMatrix[minVertex.no][i];
				//		    queue.offer(new Vertex(i,minEdge[i]));
				//	}
				//}
				for (Edge edge:adjList[minVertex.no]) {
					if(!visited[edge.to] && edge.weight != 0 &&
							minEdge[edge.to] > edge.weight) {
						    minEdge[edge.to] = edge.weight;
						    queue.offer(new Vertex(edge.to,minEdge[edge.to]));
					}
				}
			}
			sb.append("#").append(tc).append(" ").append(result).append("\n");
		}
		System.out.print(sb.toString());
		br.close();
	}
	static class Vertex implements Comparable<Vertex>{
		int no;
		long cost;

		public Vertex(int no, long cost) {
			this.no = no;
			this.cost = cost;
		}

		@Override
		public int compareTo(Vertex o) {
			return Long.compare(this.cost, o.cost);
		}
	}
}



```
