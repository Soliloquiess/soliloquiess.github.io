---
title: "[Algorithm] Array 문제"
date: 2021-06-03
category: "Algorithm"
tags: ["Algorithm"]
description: "배열을 활용하는 알고리즘 문제 12개(큰 수 출력, 보이는 학생, 가위바위보, 피보나치, 소수, 점수계산, 격자판 최대합, 봉우리, 멘토링 등)의 자바 풀이를 정리한다."
permalink: "study/2021/06/03/Array"
---

## 1. 큰 수 출력

이전 원소보다 큰 값만 출력한다(맨 앞자리는 무조건 포함).

```
import java.util.*;
class Main {
	public ArrayList<Integer> solution(int n, int[] arr){
		ArrayList<Integer> answer = new ArrayList<Integer>();
		answer.add(arr[0]);	//맨앞자리는 고정으로 들어가니까
		for(int i =1; i<n;i++) {
			if(arr[i]>arr[i-1]) {
				answer.add(arr[i]);
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int [] arr = new int [n];
		for(int i =0; i<n ;i++) {
			arr[i] = sc.nextInt();
		}
		for(int x: T.solution(n, arr)) {
			System.out.print(x+" ");
		}
	}
}


```

## 2. 보이는 학생

지금까지의 최댓값보다 큰 키가 나올 때마다 카운트한다.

```
import java.util.*;
class Main {
	public int solution(int n, int[] arr){
		int answer=1, max=arr[0];
		for(int i=1; i<n; i++){
			if(arr[i]>max){
				max=arr[i];
				answer++;
			}
		}
		return answer;
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[] arr=new int[n];
		for(int i=0; i<n; i++){
			arr[i]=sc.nextInt();
		}
		System.out.print(T.solution(n, arr));
	}
}


```

## 3. 가위바위보

각 라운드를 비교해 A승/B승/무승부(D)를 판정한다.

```
import java.util.*;
class Main {
	public String solution(int n, int[] a, int[] b){
		String answer="";
		for(int i=0; i<n; i++){
			if(a[i]==b[i]) answer+="D";
			else if(a[i]==1 && b[i]==3) answer+="A";
			else if(a[i]==2 && b[i]==1) answer+="A";
			else if(a[i]==3 && b[i]==2) answer+="A";
			else answer+="B";
		}
		return answer;
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner kb = new Scanner(System.in);
		int n=kb.nextInt();
		int[] a=new int[n];
		int[] b=new int[n];
		for(int i=0; i<n; i++){
			a[i]=kb.nextInt();
		}
		for(int i=0; i<n; i++){
			b[i]=kb.nextInt();
		}
		for(char x : T.solution(n, a, b).toCharArray()) System.out.println(x);
	}
}


```

## 4. 피보나치 수열

배열을 사용하는 풀이와, 배열 없이 변수만으로 푸는 풀이 두 가지다.

```
import java.util.*;
class Main {
	public int[] solution(int n){
		int[] answer=new int[n];
		answer[0]=1;
		answer[1]=1;
		for(int i=2; i<n; i++){
			answer[i]=answer[i-2]+answer[i-1];
		}
		return answer;
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		for(int x :T.solution(n)) System.out.print(x+" ");
	}
}






import java.util.*;
class Main {		//배열 안 쓰고 풀어야 할 경우.
	public void solution(int n){
		int a=1, b=1, c;
		System.out.print(a+" "+b+" ");
		for(int i=2; i<n; i++){
			c=a+b;
			System.out.print(c+" ");
			a=b;
			b=c;
		}
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		T.solution(n);
	}
}

```

## 5. 소수 (에라토스테네스의 체)

배수를 미리 지워가며 소수의 개수를 센다.

```
import java.util.*;
class Main {
	public int solution(int n){
		int cnt=0;
		int[] ch = new int[n+1];
		for(int i=2; i<=n; i++){
			if(ch[i]==0){
				cnt++;
				for(int j=i; j<=n; j=j+i)
					ch[j]=1;
			}
		}
		return cnt;
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		System.out.println(T.solution(n));
	}
}

```

## 6. 뒤집은 소수

각 수를 뒤집은 뒤 소수인지 판별한다.

```
import java.util.*;
class Main {
	public boolean isPrime(int num){
		if(num==1) return false;
		for(int i=2; i<num; i++){
			if(num%i==0) return false;
		}
		return true;
	}

	public ArrayList<Integer> solution(int n, int[] arr){
		ArrayList<Integer> answer = new ArrayList<>();
		for(int i=0; i<n; i++){
			int tmp=arr[i];
			int res=0;
			while(tmp>0){
				int t=tmp%10;
				res=res*10+t;
				tmp=tmp/10;
			}
			if(isPrime(res)) answer.add(res);
		}
		return answer;
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[] arr=new int[n];
		for(int i=0; i<n; i++){
			arr[i]=sc.nextInt();
		}
		for(int x : T.solution(n, arr)){
			System.out.print(x+" ");
		}
	}
}


```

## 7. 점수계산

연속으로 맞힌(1) 횟수만큼 점수를 누적한다.

```

import java.util.*;
class Main {
	public int solution(int n, int[] arr){
		int answer=0, cnt=0;
		for(int i=0; i<n; i++){
			if(arr[i]==1){
				cnt++;
				answer+=cnt;
			}
			else cnt=0;
		}
		return answer;
	}
	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[] arr=new int[n];
		for(int i=0; i<n; i++){
			arr[i]=sc.nextInt();
		}
		System.out.print(T.solution(n, arr));
	}
}

```

## 8. 등수 구하기

자신보다 점수가 높은 사람 수 + 1로 등수를 구한다.

```
import java.util.*;
class Main {
	public int[] solution(int n, int[] arr){
		int[] answer = new int[n];
		for(int i=0; i<n; i++){
			int cnt=1;
			for(int j=0; j<arr.length; j++){
				if(arr[j]>arr[i]) cnt++;
			}
			answer[i]=cnt;
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[] arr=new int[n];
		for(int i=0; i<n; i++){
			arr[i]=sc.nextInt();
		}
		for(int x :T.solution(n, arr)) System.out.print(x+" ");
	}
}
```

## 9. 격자판 최대합

각 행·열의 합과 두 대각선의 합 중 최댓값을 구한다.

```
import java.util.*;
class Main {
	public int solution(int n, int[][] arr){
		int answer=-2147000000;
		int sum1=0, sum2=0;
		for(int i=0; i<n; i++){
			sum1=sum2=0;
			for(int j=0; j<n; j++){
				sum1+=arr[i][j];	//행이 고정 열이 도는거
				sum2+=arr[j][i];	//행이 돌고 열이 고정되는거.
			}
			answer=Math.max(answer, sum1);
			answer=Math.max(answer, sum2);
		}
		sum1=sum2=0;
		for(int i=0; i<n; i++){
			sum1+=arr[i][i];	//우상향 대각선
			sum2+=arr[i][n-i-1];	//우하향 대각선
		}
		answer=Math.max(answer, sum1);
		answer=Math.max(answer, sum2);
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[][] arr=new int[n][n];
		for(int i=0; i<n; i++){
			for(int j=0; j<n; j++){
				arr[i][j]=sc.nextInt();
			}
		}
		System.out.print(T.solution(n, arr));
	}
}

```

## 10. 봉우리

상하좌우 4방향 값이 모두 자신보다 작으면 봉우리로 카운트한다. 격자 바깥을 0으로 둔 테두리(범위 체크)를 함께 본다.

```
import java.util.*;
class Main {
	int[] dx={-1, 0, 1, 0};
	int[] dy={0, 1, 0, -1};
	public int solution(int n, int[][] arr){
		int answer=0;
		for(int i=0; i<n; i++){
			for(int j=0; j<n; j++){
				boolean flag=true;
				for(int k=0; k<4; k++){	//k는 4방향 더해주는거
					int nx=i+dx[k];	//i 행번호
					int ny=j+dy[k];	//j 열번호
					if(nx>=0 && nx<n && ny>=0 && ny<n && arr[nx][ny]>=arr[i][j]){
														//arr[nx][ny]는 4방향의 방향의 값이 4방향에 1개라도 있으면 false
						//arr[nx][ny]>=arr[i][j] 이게 한번도 참이 안된건 상하좌우가 나보다 작다는 뜻 //그떄 봉우리니까 카운트
//						nx>=0 && nx<n && ny>=0 && ny<n  이부분은 범위 벗어나는거(0으로 설정한 부분들을 참조해서 거기를 벗어나지 않게.
//						arr[nx][ny]>=arr[i][j] 그리고 이부분이 뒤로가야됨 먼저 실행되면 안됨(범위설정이 먼저 실행되어야)
						flag=false;
						break;
					}
				}
				if(flag) answer++;	//그떄 봉우리니까 카운트
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[][] arr=new int[n][n];
		for(int i=0; i<n; i++){
			for(int j=0; j<n; j++){
				arr[i][j]=sc.nextInt();
			}
		}
		System.out.print(T.solution(n, arr));
	}
}

```

## 11. 임시 반장 정하기

학년마다 같은 반이었던 친구 수가 가장 많은 학생을 반장으로 정한다.

```

import java.util.*;
class Main {
	public int solution(int n, int[][] arr){
		int answer=0, max=0;
		for(int i=1; i<=n; i++){
			int cnt=0;
			for(int j=1; j<=n; j++){
				for(int k=1; k<=5; k++){
					if(arr[i][k]==arr[j][k]){
						cnt++;
						break;
					}
				}
			}
			if(cnt>max){
				max=cnt;
				answer=i;
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int[][] arr=new int[n+1][6];
		for(int i=1; i<=n; i++){
			for(int j=1; j<=5; j++){
				arr[i][j]=sc.nextInt();
			}
		}
		System.out.print(T.solution(n, arr));
	}
}

```

## 12. 멘토링

모든 시험에서 i가 j보다 항상 등수가 높은 (i, j) 쌍의 개수를 센다.

```
import java.util.*;
class Main {
	public int solution(int n, int m, int[][] arr){
		int answer=0;
		for(int i=1; i<=n; i++){
			for(int j=1; j<=n; j++){
				int cnt=0;
				for(int k=0; k<m; k++){
					int pi=0, pj=0;
					for(int s=0; s<n; s++){
						if(arr[k][s]==i) pi=s;
						if(arr[k][s]==j) pj=s;
					}
					if(pi<pj) cnt++;
				}
				if(cnt==m){
					answer++;
					//System.out.println(i+" "+j);
				}
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		int m=sc.nextInt();
		int[][] arr=new int[m][n];
		for(int i=0; i<m; i++){
			for(int j=0; j<n; j++){
				arr[i][j]=sc.nextInt();
			}
		}
		System.out.print(T.solution(n, m, arr));
	}
}

```
