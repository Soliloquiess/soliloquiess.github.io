---
title: "[Algorithm] SWEA_오나의 여신님"
date: 2021-03-18
category: "Algorithm"
tags: ["Algorithm"]
description: "악마와 수연의 이동을 BFS로 동시에 시뮬레이션해 여신과 만나는 최소 시간을 구하는 SWEA 길찾기 문제 풀이."
permalink: "study/2021/03/18/오나의-여신님"
---

## 개요

DFS, BFS를 간단한 문제로 연습해두면 좋다. 그런 면에서 길찾기를 DFS/BFS로 구현해보는 이 문제는 연습용으로 좋은 문제다.

## 풀이 아이디어

- 악마(`*`)들이 먼저 큐에 들어가고, 그다음 수연(`S`)이 들어간다. 지도에 나온 순서대로 큐에 넣으면 안 된다.
- 수연은 모든 악마가 이동을 마친 뒤에 동작해야 하므로, 큐에는 악마들을 먼저 넣고 마지막에 수연을 넣는다.
- 매 턴(초)마다 현재 큐에 있는 노드들만 처리한다(레벨 단위 BFS).
  - 악마는 `.`과 `S`로 이동하며 방문 처리(`*`)한다.
  - 수연은 `.`로 이동하고, `D`(여신)를 만나면 그 시점의 턴 수를 정답으로 기록하고 종료한다.
- 끝까지 `A`가 `Integer.MAX_VALUE`로 남아 있으면 여신을 만나지 못한 것이므로 `GAME OVER`를 출력한다.

## 코드

```
package SWEA;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class SWEA_7793_오나의_여신님 {
	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static StringBuilder output = new StringBuilder();
	static StringTokenizer tokens;

	static int T;
	static int R, C;
	static char[][] map;
	static Queue<Point> points;
	static int A;

	static int[][] deltas = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };

	public static void main(String[] args) throws IOException {
		input = new BufferedReader(new StringReader(src));
		T = Integer.parseInt(input.readLine());
		for (int t = 1; t <= T; t++) {
			tokens = new StringTokenizer(input.readLine(), " ");
			R = Integer.parseInt(tokens.nextToken());
			C = Integer.parseInt(tokens.nextToken());

			points = new LinkedList<>();
			map = new char[R][];
			Point sPoint = null;
			for (int r = 0; r < R; r++) {
				map[r] = input.readLine().toCharArray();
				for (int c = 0; c < C; c++) {
					if (map[r][c] == '*') {
						points.offer(new Point(r, c, true));
					} else if (map[r][c] == 'S') {
						sPoint = new Point(r, c, false);
					}
				}
			}

//			테케가 들어오고 그 다음줄에 N,M이 들어온다 .
//			큐에 악마들이 다 들어가고 수연이 들어감. 지도 나온 순서대로 넣으면 안됨.

			// 지도 읽기
				// 수연이는 모든 악마가 다 들어간 다음에 동작
			points.offer(sPoint);
			// System.out.println(points);
			A = Integer.MAX_VALUE;
			bfs();
			// 여전히 A가 MAX_VALUE이면 여신을 못만난것.
			output.append("#").append(t).append(" ").append(A==Integer.MAX_VALUE?"GAME OVER":A).append("\n");
		}
		System.out.println(output);
	}

	static void bfs() {
		int turn = 1;
		while (!points.isEmpty()) {
			// 초마다 현재 queue 사용하기...
			int size = points.size();
			while (size-- > 0) {
				Point head = points.poll();

				// 자식 탐색 한다.
				for (int d = 0; d < deltas.length; d++) {
					int nr = head.r + deltas[d][0];
					int nc = head.c + deltas[d][1];

					if (isIn(nr, nc)) {
						// 지금 녀석이 악마라면.. 다음으로 이동은 .과 S
						if (head.isDevil) {
							if (map[nr][nc] == '.' || map[nr][nc] == 'S') {
								map[nr][nc] = '*'; // 방문처리
								points.offer(new Point(nr, nc, true));
							}
						}
						// 지금 녀석이 수연이라면.. . 또는 D (여신 - 만나면 종료)
						else {
							if (map[nr][nc] == 'D') {
								A = turn;
								return;
							} else if (map[nr][nc] == '.') {
								map[nr][nc] = 'S';
								points.offer(new Point(nr, nc, false));
							}
						}
					}
				}
			}
			turn++;
		}
	}

	static boolean isIn(int r, int c) {
		return 0 <= r && r < R && 0 <= c && c < C;
	}

	static class Point {
		int r, c;
		boolean isDevil;

		public Point(int r, int c, boolean isDevil) {
			super();
			this.r = r;
			this.c = c;
			this.isDevil = isDevil;
		}

		@Override
		public String toString() {
			return "[r=" + r + ", c=" + c + ", isDevil=" + isDevil + "]";
		}
	}

	private static String src = "2\r\n" +
			"5 3\r\n" +
			"D*S\r\n" +
			".X.\r\n" +
			".X.\r\n" +
			".X.\r\n" +
			"...\r\n" +
			"5 3\r\n" +
			"D*S\r\n" +
			"...\r\n" +
			".X.\r\n" +
			".X.\r\n" +
			"...";
}



```
