---
title: "[Algorithm] 문자열"
date: 2021-06-03
category: "Algorithm"
tags: ["Algorithm"]
description: "문자 개수 세기, 대소문자 변환, 가장 긴 단어, 단어 뒤집기, 회문/팰린드롬 검사, 중복 문자 제거, 숫자 추출, 문자열 압축, 암호 해독 등 문자열 알고리즘 문제 12개의 자바 풀이를 정리한다."
permalink: "study/2021/06/03/문자열"
---

> 인프런에 자바 알고리즘 강의가 있어 문제 및 답을 정리한 글입니다. 문제는 직접 사서 보세요.

## 1. 특정 문자 개수 세기

문자열과 특정 문자를 입력받아, 그 문자가 문자열에 몇 개 존재하는지 센다(대소문자 무시).

```
import java.util.*;
class Main{
	public int solution(String str, char t){
		int answer=0;
		str=str.toUpperCase();
		t=Character.toUpperCase(t);
		//System.out.println(str+" "+t);
		/*for(int i=0; i<str.length(); i++){
			if(str.charAt(i)==t) answer++;
		}*/
		for(char x : str.toCharArray()){
			if(x==t) answer++;
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str= sc.next();
		char c= sc.next().charAt(0);
		System.out.print(T.solution(str, c));
	}
}

```

## 2. 대소문자 변환

대문자는 소문자로, 소문자는 대문자로 바꾼다. `Character` API를 쓰는 풀이와 아스키 코드(±32)로 직접 변환하는 풀이 두 가지다.

```
import java.util.*;
class Main {
	public String solution(String str){
		String answer="";
		for(char x : str.toCharArray()){
			if(Character.isLowerCase(x)) answer+=Character.toUpperCase(x);
			else answer+=Character.toLowerCase(x);

		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.print(T.solution(str));
	}
}


import java.util.*;
class Main {
	public String solution(String str){
		String answer="";
		for(char x : str.toCharArray()){
			if(x>=97 && x<=122) answer+=(char)(x-32);
			else answer+=(char)(x+32);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.print(T.solution(str));
	}
}

```

## 3. 가장 긴 단어 출력

문장에서 가장 긴 단어를 출력한다. `split`을 쓰는 풀이와 `indexOf`/`substring`으로 직접 자르는 풀이 두 가지다.

```

import java.util.*;
class Main {
	public String solution(String str){
		String answer="";
		int m=Integer.MIN_VALUE;
		String[] s = str.split(" ");
		for(String x : s){
			int len=x.length();
			if(len>m){
				m=len;
				answer=x;
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc= new Scanner(System.in);
		String str= sc.nextLine();
		System.out.print(T.solution(str));
	}
}




import java.util.*;
class Main {
	public String solution(String str){
		String answer="";
		int m=Integer.MIN_VALUE, pos;
		while((pos=str.indexOf(' '))!=-1){
			String tmp=str.substring(0, pos);
			int len=tmp.length();
			if(len>m){
				m=len;
				answer=tmp;
			}
			str=str.substring(pos+1);
		}
		if(str.length()>m) answer=str;
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str= sc.nextLine();
		System.out.print(T.solution(str));
	}
}


```

## 4. 단어 뒤집기

각 단어를 뒤집는다. `StringBuilder.reverse()`를 쓰는 풀이와 양 끝 포인터(lt, rt)로 직접 swap하는 풀이 두 가지다.

```
import java.util.*;
class Main {
	public ArrayList<String> solution(String[] str){
		ArrayList<String> answer=new ArrayList<>();
		for(String x : str){
			String tmp=new StringBuilder(x).reverse().toString();
			answer.add(tmp);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		String[] str=new String[n];
		for(int i=0; i<n; i++){
			str[i]=sc.next();
		}
		for(String x : T.solution(str)){
			System.out.println(x);
		}
	}
}








import java.util.*;
class Main {
	public ArrayList<String> solution(int n, String[] str){
		ArrayList<String> answer=new ArrayList<>();
		for(String x : str){
			char[] s=x.toCharArray();
			int lt=0, rt=x.length()-1;
			while(lt<rt){
				char tmp=s[lt];
				s[lt]=s[rt];
				s[rt]=tmp;
				lt++;
				rt--;
			}
			String tmp=String.valueOf(s);
			answer.add(tmp);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		String[] str=new String[n];
		for(int i=0; i<n; i++){
			str[i]=sc.next();
		}
		for(String x : T.solution(n, str)){
			System.out.println(x);
		}
	}
}






```

## 5. 특정 단어 뒤집기 (알파벳만)

알파벳만 양 끝 포인터로 뒤집고, 알파벳이 아닌 문자는 자리를 그대로 둔다. 판별을 `Character.isAlphabetic`으로 하는 풀이와 아스키 코드 범위로 직접 하는 풀이 두 가지다.

```
import java.util.*;
class Main {
	public String solution(String str){
		String answer;
		char[] s=str.toCharArray();
		int lt=0, rt=str.length()-1;
		while(lt<rt){
			if(!Character.isAlphabetic(s[lt])) lt++;
			else if(!Character.isAlphabetic(s[rt])) rt--;
			else{
				char tmp=s[lt];
				s[lt]=s[rt];
				s[rt]=tmp;
				lt++;
				rt--;
			}
		}
		answer=String.valueOf(s);
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.println(T.solution(str));
	}
}



---------


import java.util.*;
class Main {
	public String solution(String str){
		String answer;
		char[] s=str.toCharArray();
		int lt=0, rt=str.length()-1;
		while(lt<rt){
			if(!(s[lt] >= 97 && s[lt] <= 122) && !(s[lt] >= 65 && s[lt] <= 90)) lt++;
			else if(!(s[rt] >= 97 && s[rt] <= 122) && !(s[rt] >= 65 && s[rt] <= 90)) rt--;
			else{
				char tmp=s[lt];
				s[lt]=s[rt];
				s[rt]=tmp;
				lt++;
				rt--;
			}
		}
		answer=String.valueOf(s);
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.println(T.solution(str));
	}
}

```

## 6. 중복 문자 제거

각 문자의 첫 등장 위치(`indexOf`)가 현재 인덱스와 같을 때만 남긴다.

```
import java.util.*;
class Main {
	public String solution(String str){
		String answer="";
		for(int i=0; i<str.length(); i++){
			//System.out.println(str.charAt(i)+" "+i+" "+str.indexOf(str.charAt(i)));
			if(str.indexOf(str.charAt(i))==i) answer+=str.charAt(i);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.print(T.solution(str));
	}
}

```

## 7. 회문 문자열

앞뒤가 같은지 검사한다. 양 끝을 직접 비교하는 풀이와 `reverse()` 후 비교하는 풀이들이 있다.

```
import java.util.*;
class Main {
	public String solution(String str){
		String answer="YES";
		str=str.toUpperCase();
		int len=str.length();
		for(int i=0; i<len/2; i++){
			if(str.charAt(i)!=str.charAt(len-i-1)) answer="NO";
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.print(T.solution(str));
	}
}



import java.util.*;
class Main {
	public String solution(String str){
		String answer="NO";
		String tmp=new StringBuilder(str).reverse().toString();
		if(str.equalsIgnoreCase(tmp)) answer="YES";	//이거 대신 uppercase사용해도 됨.
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.print(T.solution(str));
	}
}




import java.util.*;
//toUpperCase 사용
class Main {
	public String solution(String str){
		String answer="NO";
		String tmp=new StringBuilder(str).reverse().toString().toUpperCase();
		if(str.equals(tmp)) answer="YES";	//이거 대신 uppercase사용해도 됨.
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next().toUpperCase();
		System.out.print(T.solution(str));
	}
}


```

## 8. 팰린드롬 검사 (공백·기호 무시)

알파벳이 아닌 문자를 모두 제거한 뒤, 앞뒤 어디서 읽어도 동일한지 검사한다.

```
import java.util.*;
class Main {
	public String solution(String s){
		String answer="NO";
		s=s.toUpperCase().replaceAll("[^A-Z]", "");	//A~Z까지 문자 아니면 공백까지 포함 다 제거
		String tmp=new StringBuilder(s).reverse().toString();
		if(s.equals(tmp)) answer="YES";
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.nextLine();
		System.out.print(T.solution(str));
	}
}

```

## 9. 숫자만 추출

문자와 숫자가 섞인 문자열에서 숫자만 뽑아 정수로 만든다(`answer*10 + 자릿수`).

```
import java.util.*;
class Main {
	public int solution(String s){
		int answer=0;
//		String answer="";
		for(char x : s.toCharArray()){
			if(x>=48 && x<=57) answer = answer*10 +(x-48);
			/*if(Character.isDigit(x)){
				answer=answer*10+ Character.getNumericValue(x);
			}*/
//			if(Character.isDigit(x)) answer+=x;
		}
		return answer;
//		return Integer.parseInt(answer);
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.print(T.solution(str));
	}
}

```

## 10. 가장 짧은 문자 거리

각 위치에서 특정 문자 t까지의 최소 거리를 구한다. 왼쪽→오른쪽으로 한 번, 오른쪽→왼쪽으로 한 번 훑어 두 결과의 최소값을 취한다.

```
import java.util.*;
class Main {
	public int[] solution(String s, char t){
		int[] answer=new int[s.length()];
		int p=1000;
		for(int i=0; i<s.length(); i++){
			if(s.charAt(i)==t){
				p=0;
				answer[i]=p;
			}
			else{
				p++;
				answer[i]=p;
			}
		}
		p=1000;
		for(int i=s.length()-1; i>=0; i--){
			if(s.charAt(i)==t) p=0;
			else{
				p++;
				answer[i]=Math.min(answer[i], p);
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		char c=sc.next().charAt(0);
		for(int x : T.solution(str, c)){
			System.out.print(x+" ");
		}
	}
}

```

## 11. 문자열 압축

연속으로 같은 문자가 나오면 그 개수를 문자 뒤에 붙인다(1개면 숫자 생략). 끝 처리를 위해 문자열 뒤에 공백을 하나 붙여 둔다.

```
import java.util.*;
class Main {
	public String solution(String s){
		String answer="";
		s=s+" ";
		int cnt=1;
		for(int i=0; i<s.length()-1; i++){
			if(s.charAt(i)==s.charAt(i+1)) cnt++;
			else{
				answer+=s.charAt(i);
				if(cnt>1) answer+=String.valueOf(cnt);
				cnt=1;
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		String str=sc.next();
		System.out.println(T.solution(str));
	}
}

```

## 12. 암호

7자리씩 끊어 `#`→1, `*`→0으로 바꾼 뒤, 2진수로 해석한 정수를 문자로 변환한다.

```
import java.util.*;
class Main {
	public String solution(int n, String s){
		String answer="";
		for(int i=0; i<n; i++){
			String tmp=s.substring(0, 7).replace('#', '1').replace('*', '0');
			int num=Integer.parseInt(tmp, 2);	//정수화 시키는거 tmp넘어가고 2진수화 시킴.
			answer+=(char)num;
			s=s.substring(7);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner sc = new Scanner(System.in);
		int n=sc.nextInt();
		String str=sc.next();
		System.out.println(T.solution(n, str));
	}
}

```
