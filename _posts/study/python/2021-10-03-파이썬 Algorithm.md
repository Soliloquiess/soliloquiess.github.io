---
title: "[python] python Algorithm"
layout: post
subtitle: Python
date: "2021-06-03 19:45:51 +0900"

categories: study
tags: Python
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

#### 공간 복잡도

- 알고리즘 계산 복잡도는 다음 두 가지 척도로 표현될 수 있음
  - 시간 복잡도: 얼마나 빠르게 실행되는지
  - 공간 복잡도: 얼마나 많은 저장 공간이 필요한지

> 좋은 알고리즘은 실행 시간도 짧고, 저장 공간도 적게 쓰는 알고리즘

- 통상 둘 다를 만족시키기는 어려움
  - 시간과 공간은 반비례적 경향이 있음
  - 최근 대용량 시스템이 보편화되면서, 공간 복잡도보다는 시간 복잡도가 우선
  - 그래서! 알고리즘은 시간 복잡도가 중심

##### 공간 복잡도 대략적인 계산은 필요함

- 기존 알고리즘 문제는 예전에 공간 복잡도도 고려되어야할 때 만들어진 경우가 많음
- 그래서 기존 알고리즘 문제에 시간 복잡도뿐만 아니라, 공간 복잡도 제약 사항이 있는 경우가 있음
- 또한, 기존 알고리즘 문제에 영향을 받아서, 면접시에도 공간 복잡도를 묻는 경우도 있음

Complexity:

- expected worst-case time complexity: O(N)
- expected worst-case space complexity: O(N)

> 현업에서 최근 빅데이터를 다룰 때는 저장 공간을 고려해서 구현을 하는 경우도 있음

##### 1. 공간 복잡도 (Space Complexity)

- 프로그램을 실행 및 완료하는데 필요한 저장공간의 양을 뜻함
- 총 필요 저장 공간
  - 고정 공간 (알고리즘과 무관한 공간): 코드 저장 공간, 단순 변수 및 상수
  - 가변 공간 (알고리즘 실행과 관련있는 공간): 실행 중 동적으로 필요한 공간
  - $ S(P) = c + S_p(n) $
    - c: 고정 공간
    - $ S_p(n) $: 가변 공간

> 빅 오 표기법을 생각해볼 때, 고정 공간은 상수이므로 공간 복잡도는 가변 공간예 좌우됨

##### 2. 공간 복잡도 계산

- 공간 복잡도 계산은 알고리즘에서 실제 사용되는 저장 공간을 계산하면 됨
  - 이를 빅 오 표기법으로 표현할 수 있으면 됨

###### 예제1

- n! 팩토리얼 구하기
  - n! = 1 x 2 x ... x n
- n의 값에 상관없이 변수 n, 변수 fac, 변수 index 만 필요함
- 공간 복잡도는 O(1)

> 공간 복잡도 계산은 실제 알고리즘 실행시 사용되는 저장공간을 계산하면 됨

```
  def factorial(n):
      fac = 1
      for index in range(2, n + 1):
          fac = fac * index
      return fac
```

###### 예제2

- n! 팩토리얼 구하기
  - n! = 1 x 2 x ... x n
- 재귀함수를 사용하였으므로, n에 따라, 변수 n이 n개가 만들어지게 됨
  - factorial 함수를 재귀 함수로 1까지 호출하였을 경우, n부터 1까지 스택에 쌓이게 됨
- 공간 복잡도는 O(n)

```
def factorial(n):
    if n > 1:
        return n * factorial(n - 1)
    else:
        return 1
```

---

#### 효과적인 알고리즘을 만드는 방법

- 바로 IDE에 쓰지 마라. 연습장 부터 키고 생각하자.

<div class="alert alert-block alert-info">
<center><strong><font size=4em>알고리즘 연습 방법</font></strong></center>

<font size=3em>1. 연습장과 펜을 준비하자.</font><br><br>
<font size=3em>2. 알고리즘 문제를 읽고 분석한 후에,</font><br><br>
<font size=3em>3. 간단하게 테스트용으로 매우 간단한 경우부터 복잡한 경우 순서대로 생각해보면서, 연습장과 펜을 이용하여 알고리즘을 생각해본다.</font><br><br>
<font size=3em>4. 가능한 알고리즘이 보인다면, 구현할 알고리즘을 세부 항목으로 나누고, 문장으로 세부 항목을 나누어서 적어본다.</font><br><br>
<font size=3em>5. 코드화하기 위해, 데이터 구조 또는 사용할 변수를 정리하고,</font><br><br>
<font size=3em>6. 각 문장을 코드 레벨로 적는다.</font><br><br>
<font size=3em>7. 데이터 구조 또는 사용할 변수가 코드에 따라 어떻게 변하는지를 손으로 적으면서, 임의 데이터로 코드가 정상 동작하는지를 연습장과 펜으로 검증한다.</font><br>

</div>

특정 패턴 찾고 가능한 알고리즘이 보이면
함수레벨로 적지 말고 문장단위로 어떤식으로 흘러가나 적는다.

적은 문장단위 구조에 필요한 데이터 구조나 사용할 변수 정리하고
이를 기반으로 풀리는지 펜으로 해본다. 그 경우가 몇가지 경우에서 다 풀리면 코드레벨에서 작성해서 실행해본다.

---

#### 정렬(Sort)

#### 정렬 (sorting) 이란?

- 정렬 (sorting): 어떤 데이터들이 주어졌을 때 이를 정해진 순서대로 나열하는 것
- 정렬은 프로그램 작성시 빈번하게 필요로 함
- 다양한 알고리즘이 고안되었으며, 알고리즘 학습의 필수

> 다양한 정렬 알고리즘 이해를 통해, 동일한 문제에 대해 다양한 알고리즘이 고안될 수 있음을 이해하고,
> 각 알고리즘간 성능 비교를 통해, 알고리즘 성능 분석에 대해서도 이해할 수 있음

#### 버블 정렬 (bubble sort) 란?

- 두 인접한 데이터를 비교해서, 앞에 있는 데이터가 뒤에 있는 데이터보다 크면, 자리를 바꾸는 정렬 알고리즘

###### 맨 뒤부터 정렬이 된다.

###### 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

<img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif" width=600/>

> 출처: https://en.wikipedia.org/wiki/Bubble_sort

##### 알고리즘 구현

- **특이점 찾아보기**
  - n개의 리스트가 있는 경우 최대 n-1번의 로직을 적용한다.
  - 로직을 1번 적용할 때마다 가장 큰 숫자가 뒤에서부터 1개씩 결정된다.
  - 로직이 경우에 따라 일찍 끝날 수도 있다. 따라서 로직을 적용할 때 한 번도 데이터가 교환된 적이 없다면 이미 정렬된 상태이므로 더 이상 로직을 반복 적용할 필요가 없다.
    <img src="https://www.fun-coding.org/00_Images/bubblealgo.png" />

1.  for num in range(len(data_list)) 반복
2.  swap = 0 (교환이 되었는지를 확인하는 변수를 두자)
3.  반복문 안에서, for index in range(len(data_list) - num - 1) n - 1번 반복해야 하므로
4.  반복문안의 반복문 안에서, if data_list[index] > data_list[index + 1] 이면
5.                                                                              data_list[index], data_list[index + 1] = data_list[index + 1], data_list[index]
6.                                                                              swap += 1
7.  반복문 안에서, if swap == 0 이면, break 끝

```
def bubblesort(data):
    for index in range(len(data) - 1):
        swap = False
        for index2 in range(len(data) - index - 1):#여기서 맨 뒤자리가 정렬이 되었으므로 1씩 줄면서 체크한다.
            if data[index2] > data[index2 + 1]:#앞의 데이터가 뒤의 데이터보다 크다면
                data[index2], data[index2 + 1] = data[index2 + 1], data[index2]#swap해준다.
                swap = True

        if swap == False:
            break
    return data
```

##### 알고리즘 분석

- 반복문이 두 개 O($n^2$)
  - 최악의 경우, <font size=5em>$\frac { n * (n - 1)}{ 2 }$</font>
- 완전 정렬이 되어 있는 상태라면 최선은 O(n)

---

#### 선택정렬

#### 선택 정렬 (selection sort) 란?

- 다음과 같은 순서를 반복하며 정렬하는 알고리즘
  1. 주어진 데이터 중, 최소값을 찾음
  2. 해당 최소값을 데이터 맨 앞에 위치한 값과 교체함
  3. 맨 앞의 위치를 뺀 나머지 데이터를 동일한 방법으로 반복함

##### 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

<img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif" width=100>

출처: https://en.wikipedia.org/wiki/Selection_sort### 1. 선택 정렬 (selection sort) 란?

- 다음과 같은 순서를 반복하며 정렬하는 알고리즘
  1. 주어진 데이터 중, 최소값을 찾음
  2. 해당 최소값을 데이터 맨 앞에 위치한 값과 교체함
  3. 맨 앞의 위치를 뺀 나머지 데이터를 동일한 방법으로 반복함

##### 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

<img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif" width=100>

출처: https://en.wikipedia.org/wiki/Selection_sort

- 데이터가 두 개 일때
  - 예: dataList = [9, 1]
    - data*list[0] > data_list[1] 이므로 data_list[0] 값과 data* list[1] 값을 교환
- 데이터가 세 개 일때
  - 예: data_list = [9, 1, 7]
    - 처음 한번 실행하면, 1, 9, 7 이 됨
    - 두 번째 실행하면, 1, 7, 9 가 됨
- 데이터가 네 개 일때
  - 예: data_list = [9, 3, 2, 1]
    - 처음 한번 실행하면, 1, 3, 2, 9 가 됨
    - 두 번째 실행하면, 1, 2, 3, 9 가 됨
    - 세 번째 실행하면, 변화 없음

##### 알고리즘 구현

1. for stand in range(len(data_list) - 1) 로 반복
2. lowest = stand 로 놓고,
3. for num in range(stand, len(data_list)) stand 이후부터 반복

- 내부 반복문 안에서 data_list[lowest] > data_list[num] 이면,
- lowest = num

4. data_list[num], data_list[lowest] = data_list[lowest], data_list[num]

```
def selection_sort(data):
    for stand in range(len(data) - 1):
        lowest = stand
        for index in range(stand + 1, len(data)): #기준이 되는 점에서 1을 더한값에서 시작하고 데이터 길이만큼 돈다.
            if data[lowest] > data[index]:#돌면서 가장 최소값인 거와 바꾼다.(swap한다)
                #기준점을 기준으로 돌고 끝까지 돌면서 가장 최솟값을 뽑고 그 인덱스를 바꾼다.
                lowest = index
        data[lowest], data[stand] = data[stand], data[lowest]
    return data
```

##### 알고리즘 분석

- 반복문이 두 개 O($n^2$)
  - 실제로 상세하게 계산하면, <font size=5em>$\frac { n * (n - 1)}{ 2 }$</font>

---

#### 삽입 정렬 (insertion sort)

### 1. 삽입 정렬 (insertion sort) 란?

- <strong>삽입 정렬은 두 번째 인덱스부터 시작</strong>
- 해당 인덱스(key 값) 앞에 있는 데이터(B)부터 비교해서 key 값이 더 작으면, B값을 뒤 인덱스로 복사
- 이를 key 값이 더 큰 데이터를 만날때까지 반복, 그리고 큰 데이터를 만난 위치 바로 뒤에 key 값을 이동

#### 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Insertion-sort-example.gif" />

> 출처: https://commons.wikimedia.org/wiki/File:Insertion-sort-example.gif

- 데이터가 네 개 일때 (데이터 갯수에 따라 복잡도가 떨어지는 것은 아니므로, 네 개로 바로 로직을 이해해보자.)
  - 예: data_list = [9, 3, 2, 5]
    - 처음 한번 실행하면, key값은 9, 인덱스(0) - 1 은 0보다 작으므로 끝: [9, 3, 2, 5]
    - 두 번째 실행하면, key값은 3, 9보다 3이 작으므로 자리 바꾸고, 끝: [3, 9, 2, 5]
    - 세 번째 실행하면, key값은 2, 9보다 2가 작으므로 자리 바꾸고, 다시 3보다 2가 작으므로 끝: [2, 3, 9, 5]
    - 네 번째 실행하면, key값은 5, 9보다 5이 작으므로 자리 바꾸고, 3보다는 5가 크므로 끝: [2, 3, 5, 9]

##### 알고리즘 구현

1. for stand in range(len(data_list)) 로 반복
2. key = data_list[stand]
3. for num in range(stand, 0, -1) 반복
   - 내부 반복문 안에서 data_list[stand] < data_list[num - 1] 이면,
     - data_list[num - 1], data_list[num] = data_list[num], data_list[num - 1]

```

def insertion_sort(data):
    for index in range(len(data) - 1):#각 턴에서 어떻게 처리되냐
        for index2 in range(index + 1, 0, -1):#여기서 0대신 -1을 쓰면 완전히 다른값 나올 수 있게 되므로 0쓴다.
            #인덱스 번호+1에서 0까지 -1로 돌면서(배열 맨뒤에서 맨 앞으로 옮겨가면서 대신 맨앞은 고정(채워지므로 +1로 기준점 바뀌어감)
            if data[index2] < data[index2 - 1]: #swap
                #데이터의 인덱스 번호와 -1(0으로 가서 판단)
                data[index2], data[index2 - 1] = data[index2 - 1], data[index2]
            else:#만약 데이터가  2 3 5 4 에서 2345 로 되고 3 4 비교한뒤 3<4이면 4랑 2를 비교할 필요 없이 멈춘다. 그떄 break로 탈출
                break
    return data
```

### 4. 알고리즘 분석

- 반복문이 두 개 O($n^2$)
  - 최악의 경우, <font size=5em>$\frac { n * (n - 1)}{ 2 }$</font>
- 완전 정렬이 되어 있는 상태라면 최선은 O(n)

- 이해가 안가면, 이 코드를 보면서 이해하기: https://goo.gl/XKBXuk

---

#### 재귀 용법 (recursive call, 재귀 호출)

> 고급 정렬 알고리즘엥서 재귀 용법을 사용하므로, 고급 정렬 알고리즘을 익히기 전에 재귀 용법을 먼저 익히기로 합니다.

##### 재귀 용법 (recursive call, 재귀 호출)

- 함수 안에서 동일한 함수를 호출하는 형태
- 여러 알고리즘 작성시 사용되므로, 익숙해져야 함

##### 재귀 용법 이해

- 예제를 풀어보며, 재귀 용법을 이해해보기

##### 예제 - 팩토리얼

- 간단한 경우부터 생각해보기
  - 2! = 1 X 2
  - 3! = 1 X 2 X 3
  - 4! = 1 X 2 X 3 X 4 = 4 X 3!
- 규칙이 보임: n! = n X (n - 1)!
  1. 함수를 하나 만든다.
  2. 함수(n) 은 n > 1 이면 return n X 함수(n - 1)
  3. 함수(n) 은 n = 1 이면 return n
- 검증 (코드로 검증하지 않고, 직접 간단한 경우부터 대입해서 검증해야 함)
  1. 먼저 2! 부터
  - 함수(2) 이면, 2 > 1 이므로 2 X 함수(1)
    - 함수(1) 은 1 이므로, return 2 X 1 = 2 맞다!
  2. 먼저 3! 부터
  - 함수(3) 이면, 3 > 1 이므로 3 X 함수(2)
    - 함수(2) 는 결국 1번에 의해 2! 이므로, return 2 X 1 = 2
    - 3 X 함수(2) = 3 X 2 = 3 X 2 X 1 = 6 맞다!
  3. 먼저 4! 부터
  - 함수(4) 이면, 4 > 1 이므로 4 X 함수(3)
    - 함수(3) 은 결국 2번에 의해 3 X 2 X 1 = 6
    - 4 X 함수(3) = 4 X 6 = 24 맞다!

```
def factorial(num):
    if num > 1:
        return num * factorial(num - 1)
    else:
        return num

```

##### 예제 - 시간 복잡도와 공간 복잡도

- factorial(n) 은 n - 1 번의 factorial() 함수를 호출해서, 곱셈을 함

  - 일종의 n-1번 반복문을 호출한 것과 동일
  - factorial() 함수를 호출할 때마다, 지역변수 n 이 생성됨

- 시간 복잡도/공간 복잡도는 O(n-1) 이므로 결국, 둘 다 O(n)

##### 일반적인 형태1

```
def function(입력):
    if 입력 > 일정값: # 입력이 일정 값 이상이면
        return function(입력 - 1) # 입력보다 작은 값
    else:
        return 일정값, 입력값, 또는 특정값 # 재귀 호출 종료
```

# 일반적인 형태2

```
def function(입력):
    if 입력 <= 일정값:              # 입력이 일정 값보다 작으면
        return 일정값, 입력값, 또는 특정값              # 재귀 호출 종료
    function(입력보다 작은 값)
    return 결과값

```

###### 팩토리얼 코드

```
def factorial(num):
    if num <= 1:
        return num

    return num * factorial(num - 1)

```

##### 재귀 호출은 스택의 전형적인 예

- 함수는 내부적오르 스택처럼 관리된다.

<img src="https://www.fun-coding.org/00_Images/recursivecall.png" />

- 재귀 호출이 이해가 가지 않는다면? - [코드분석](http://pythontutor.com/live.html#code=%23%20factorial%20%ED%95%A8%EC%88%98%20%EC%95%88%EC%97%90%EC%84%9C%20factorial%20%ED%95%A8%EC%88%98%EB%A5%BC%20%ED%98%B8%EC%B6%9C%0Adef%20factorial%28num%29%3A%0A%20%20%20%20if%20num%20%3E%201%3A%0A%20%20%20%20%20%20%20%20return%20num%20*%20factorial%28num%20-%201%29%0A%20%20%20%20else%3A%0A%20%20%20%20%20%20%20%20return%20num%0A%0Afactorial%285%29&cumulative=false&curInstr=22&heapPrimitives=false&mode=display&origin=opt-live.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false)

> 참고: 파이썬에서 재귀 함수는 깊이가(한번에 호출되는...) 1000회 이하가 되어야 함

#### 재귀 용법 연습문제

다음 함수를 재귀 함수를 활용해서 완성해서 1부터 num까지의 곱이 출력되게 만드세요

```
def muliple(data):
    if data <= 1:
        return data

    return -------------------------

multiple(10)
</pre>
</div>
```

```
A1.

def multiple(num):
    return_value = 1
    for index in range(1, num + 1):
        return_value = return_value * index
    return return_value

A2.

def multiple(num):
    if num <= 1:
        return num
    return num * multiple(num - 1)

```

숫자가 들어 있는 리스트가 주어졌을 때, 리스트의 합을 리턴하는 함수를 만드세요 (재귀함수를 써보세요)

```
def sum_list(data):
    if len(data) == 1:
        return data[0]

    return --------------------------------

import random
data = random.sample(range(100), 10)
print (sum_list(data))
</pre>

```

```
A.

def sum_list(data):
    if len(data) <= 1:
        return data[0]
    return data[0] + sum_list(data[1:])


```

회문(palindrome)은 순서를 거꾸로 읽어도 제대로 읽은 것과 같은 단어와 문장을 의미함
회문을 판별할 수 있는 함수를 재귀함수를 활용해서 만들어봅니다.

```

A.
def palindrome(string):
    if len(strung) <= 1:
        return True

    if string[0] == string[-1]:
        return palindrome(string[1:-1])
    else:
        return False

      #  참고 - 리스트 슬라이싱
      #  string = 'Dave'
      #  string[-1] --> e
      #  string[0] --> D
      #  string[1:-1] --> av
      #  string[:-1] --> Dav
```

1. 정수 n에 대해<br>
2. n이 홀수이면 3 X n + 1 을 하고,<br>
3. n이 짝수이면 n 을 2로 나눕니다.<br>
4. 이렇게 계속 진행해서 n 이 결국 1이 될 때까지 2와 3의 과정을 반복합니다.<br>
   예를 들어 n에 3을 넣으면,

3
10
5
16
8
4
2
1

이렇게 정수 n을 입력받아, 위 알고리즘에 의해 1이 되는 과정을 모두 출력하는 함수를 작성하세요.

```
A.

def func(n):
    print (n)
    if n == 1:
        return n

    if n % 2 == 1:
        return (func((3 * n) + 1))
    else:
        return (func(int(n / 2)))



```

문제: 정수 4를 1, 2, 3의 조합으로 나타내는 방법은 다음과 같이 총 7가지가 있음
1+1+1+1
1+1+2
1+2+1
2+1+1
2+2
1+3
3+1
정수 n이 입력으로 주어졌을 때, n을 1, 2, 3의 합으로 나타낼 수 있는 방법의 수를 구하시오

힌트: 정수 n을 만들 수 있는 경우의 수를 리턴하는 함수를 f(n) 이라고 하면,<br>
f(n)은 f(n-1) + f(n-2) + f(n-3) 과 동일하다는 패턴 찾기<br>

###### 문제 분석을 연습장에 작성해 본 예

<img src="https://www.fun-coding.org/00_Images/algopractice.jpg" />

```
A.

def func(data):
    if data == 1:
        return 1
    elif data == 2:
        return 2
    elif data == 3:
        return 4

    return func(data -1) + func(data - 2) + func(data - 3)
```

.

#### 동적 계획법 (Dynamic Programming)과 분할 정복 (Divide and Conquer)

원래 문제를 작은 문제로 나누어서 해결

###### 정의

- 동적계획법 (DP 라고 많이 부름)
  - 입력 크기가 작은 부분 문제들을 해결한 후, 해당 부분 문제의 해를 활용해서, 보다 큰 크기의 부분 문제를 해결, 최종적으로 전체 문제를 해결하는 알고리즘
  - 상향식 접근법으로, 가장 최하위 해답을 구한 후, 이를 저장하고, 해당 결과값을 이용해서 상위 문제를 풀어가는 방식
  - Memoization 기법을 사용함
    - Memoization (메모이제이션) 이란: 프로그램 실행 시 이전에 계산한 값을 저장하여, 다시 계산하지 않도록 하여 전체 실행 속도를 빠르게 하는 기술
  - 문제를 잘게 쪼갤 때, 부분 문제는 중복되어, 재활용됨
    - 예: 피보나치 수열
- 분할 정복
  - 문제를 나눌 수 없을 때까지 나누어서 각각을 풀면서 다시 합병하여 문제의 답을 얻는 알고리즘
  - 하양식 접근법으로, 상위의 해답을 구하기 위해, 아래로 내려가면서 하위의 해답을 구하는 방식
    - 일반적으로 재귀함수로 구현
  - 문제를 잘게 쪼갤 때, 부분 문제는 서로 중복되지 않음
    - 예: 병합 정렬, 퀵 정렬 등

##### 공통점과 차이점

- 공통점
  - 문제를 잘게 쪼개서, 가장 작은 단위로 분할
- 차이점
  - 동적 계획법
    - 부분 문제는 <strong>중복</strong>되어, 상위 문제 해결 시 재활용됨
    - Memoization 기법 사용 (부분 문제의 해답을 저장해서 재활용하는 최적화 기법으로 사용)
  - 분할 정복
    - 부분 문제는 서로 중복되지 않음
    - Memoization 기법 사용 안함

###### 동적계획법 분할정복 둘다 문제를 작은 문제로 쪼갠다는 장점이 있다.

##### 동적 계획법 알고리즘 이해

<img src="https://www.fun-coding.org/00_Images/Fibonacci.png" />
<pre>
함수를 fibonacci 라고 하면,
fibonacci(0):0
fibonacci(1):1
fibonacci(2):1
fibonacci(3):2
fibonacci(4):3
fibonacci(5):5
fibonacci(6):8
fibonacci(7):13
fibonacci(8):21
fibonacci(9):34
</pre>

<img src="https://www.fun-coding.org/00_Images/dp.png" />

##### recursive call 활용

```
def fibo(num):
    if num <= 1:
        return num
    return fibo(num - 1) + fibo(num - 2)
```

##### 동적 계획법 활용

```
def fibo_dp(num):
    cache = [ 0 for index in range(num + 1)]
    cache[0] = 0
    cache[1] = 1

    for index in range(2, num + 1):
        cache[index] = cache[index - 1] + cache[index - 2]
    return cache[num]
```

#### 실행 코드를 보며 이해해보기: [코드분석](http://www.pythontutor.com/live.html#code=def%20fibo_dp%28num%29%3A%0A%20%20%20%20cache%20%3D%20%20%5B%200%20for%20index%20in%20range%28num%20%2B%201%29%20%5D%0A%20%20%20%20cache%5B0%5D%20%3D%200%0A%20%20%20%20cache%5B1%5D%20%3D%201%0A%20%20%20%20%0A%20%20%20%20for%20index%20in%20range%282,%20num%20%2B%201%29%3A%0A%20%20%20%20%20%20%20%20cache%5Bindex%5D%20%3D%20cache%5Bindex%20-%201%5D%20%2B%20cache%5Bindex%20-%202%5D%0A%20%20%20%20return%20cache%5Bnum%5D%0A%0Aprint%28fibo_dp%2810%29%29&cumulative=false&curInstr=41&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false)

> 분할 정복 알고리즘의 예는 병합 정렬과 퀵 정렬을 통해 이해

---

#### 퀵 정렬 (quick sort)

##### 퀵 정렬 (quick sort) 이란?

- <font color='#BF360C'>정렬 알고리즘의 꽃</font>
- 기준점(pivot 이라고 부름)을 정해서, 기준점보다 작은 데이터는 왼쪽(left), 큰 데이터는 오른쪽(right) 으로 모으는 함수를 작성함
- 각 왼쪽(left), 오른쪽(right)은 재귀용법을 사용해서 다시 동일 함수를 호출하여 위 작업을 반복함
- 함수는 왼쪽(left) + 기준점(pivot) + 오른쪽(right) 을 리턴함

###### 코드 구현

<div class="alert alert-block alert-warning">
<strong><font color="black" size="4em">프로그래밍 연습</font></strong><br>
다음 리스트를 리스트 슬라이싱(예 [:2])을 이용해서 세 개로 짤라서 각 리스트 변수에 넣고 출력해보기<br>
</div>
<pre>
data_list = [1, 2, 3, 4, 5]
출력:
print (data1)
print (data2)
print (data3)
[1, 2]
3
[4, 5]
</pre>

<div class="alert alert-block alert-warning">
<strong><font color="black" size="4em">프로그래밍 연습</font></strong><br>
다음 리스트를 맨 앞에 데이터를 기준으로 작은 데이터는 left 변수에, 그렇지 않은 데이터는 right 변수에 넣기<br>
</div>
<pre>
data_list = [4, 1, 2, 5, 7]
</pre>

다음 리스트를 맨 앞에 데이터를 pivot 변수에 넣고, pivot 변수 값을 기준으로 작은 데이터는 left 변수에, 그렇지 않은 데이터는 right 변수에 넣기<br>

data_list 가 임의 길이일 때 리스트를 맨 앞에 데이터를 기준으로 작은 데이터는 left 변수에, 그렇지 않은 데이터는 right 변수에 넣기<br>

```
import random
data_list = random.sample(range(100), 10)

left = list()
right = list()
pivot = data_list[0]

for index in range(1, -----------------):
if data_list[index] <pre pivot:
left.append(data_list[index])
else:
right.append(data_list[index])

```

<div class="alert alert-block alert-warning">
<strong><font color="blue" size="4em">프로그래밍 연습</font></strong><br>
data_list 가 다음 세 데이터를 가지고 있을 때 리스트를 맨 앞에 데이터를 기준으로 작은 데이터는 left 변수에, 그렇지 않은 데이터는 right 변수에 넣고 left, right, pivot 변수 값을 사용해서 정렬된 데이터 출력해보기<br>
</div>
<pre>
data_list = [4, 3, 2]
</pre>

![20211004_014414](/assets/20211004_014414.png)

#### 알고리즘 구현

- quicksort 함수 만들기
  - 만약 리스트 갯수가 한개이면 해당 리스트 리턴
  - 그렇지 않으면, 리스트 맨 앞의 데이터를 기준점(pivot)으로 놓기
  - left, right 리스트 변수를 만들고,
  - 맨 앞의 데이터를 뺀 나머지 데이터를 기준점과 비교(pivot)
    - 기준점보다 작으면 left.append(해당 데이터)
    - 기준점보다 크면 right.append(해당 데이터)
  - return quicksort(left) + pivot + quicksort(right) 로 재귀 호출

> 리스트로 만들어서 리턴하기: return quick_sort(left) + [pivot] + quick_sort(right)

```

def qsort(data):
if len(data) <= 1:
return data

    left, right = list(), list()
    pivot = data[0]

    for index in range(1, len(data)):
        if pivot > data[index]:#피벗이 데이터의 인덱스보다 크다면(왼쪽에 있음)
            left.append(data[index])
        else:#아니면 오른쪽에 있음(피벗이 데이터 인덱스보다 크거나 같다면)
            right.append(data[index])

    return qsort(left) + [pivot] + qsort(right)

```

---

#### 병합 정렬 (merge sort)

- 재귀용법을 활용한 정렬 알고리즘
  1. 리스트를 절반으로 잘라 비슷한 크기의 두 부분 리스트로 나눈다.
  2. 각 부분 리스트를 재귀적으로 합병 정렬을 이용해 정렬한다.
  3. 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.

#### 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif" width=500/>

출처: [위키피디아](https://ko.wikipedia.org/wiki/%ED%95%A9%EB%B3%91_%EC%A0%95%EB%A0%AC)

![20211004_043104](/assets/20211004_043104.png)

##### 알고리즘 이해

- 데이터가 네 개 일때 (데이터 갯수에 따라 복잡도가 떨어지는 것은 아니므로, 네 개로 바로 로직을 이해해보자.)
  - 예: data_list = [1, 9, 3, 2]
    - 먼저 [1, 9], [3, 2] 로 나누고
    - 다시 앞 부분은 [1], [9] 로 나누고
    - 다시 정렬해서 합친다. [1, 9]
    - 다음 [3, 2] 는 [3], [2] 로 나누고
    - 다시 정렬해서 합친다 [2, 3]
    - 이제 [1, 9] 와 [2, 3]을 합친다.
      - 1 < 2 이니 [1]
      - 9 > 2 이니 [1, 2]
      - 9 > 3 이니 [1, 2, 3]
      - 9 밖에 없으니, [1, 2, 3, 9]

##### 알고리즘 구현

- mergesplit 함수 만들기

  - 만약 리스트 갯수가 한개이면 해당 값 리턴
  - 그렇지 않으면, 리스트를 앞뒤, 두 개로 나누기
  - left = mergesplit(앞)
  - right = mergesplit(뒤)
  - merge(left, right)

- merge 함수 만들기

  - 리스트 변수 하나 만들기 (sorted)
  - left_index, right_index = 0
  - while left_index < len(left) or right_index < len(right):
    - 만약 left_index 나 right_index 가 이미 left 또는 right 리스트를 다 순회했다면, 그 반대쪽 데이터를 그대로 넣고, 해당 인덱스 1 증가
    - if left[left_index] < right[right_index]:
      - sorted.append(left[left_index])
      - left_index += 1
    - else:
      - sorted.append(right[right_index])
      - right_index += 1

  .

```
def merge(left, right):
    merged = list()
    left_point, right_point = 0, 0

    # case1 - left/right 둘다 있을때
    while len(left) > left_point and len(right) > right_point:
        if left[left_point] > right[right_point]:
            merged.append(right[right_point])
            right_point += 1
        else:
            merged.append(left[left_point])
            left_point += 1

    # case2 - left 데이터가 없을 때
    while len(left) > left_point:
        merged.append(left[left_point])
        left_point += 1

    # case3 - right 데이터가 없을 때
    while len(right) > right_point:
        merged.append(right[right_point])
        right_point += 1

    return merged


def mergesplit(data):
    if len(data) <= 1:
        return data
    medium = int(len(data) / 2)
    left = mergesplit(data[:medium])
    right = mergesplit(data[medium:])
    return merge(left, right)

```

##### 알고리즘 분석

- 알고리즘 분석은 쉽지 않음, <font color='#BF360C'>이 부분은 참고로만 알아두자.</font>
  - 다음을 보고 이해해보자
    - 몇 단계 깊이까지 만들어지는지를 depth 라고 하고 i로 놓자. 맨 위 단계는 0으로 놓자.
      - 다음 그림에서 n/$2^2$ 는 2단계 깊이라고 해보자.
      - 각 단계에 있는 하나의 노드 안의 리스트 길이는 n/$2^2$ 가 된다.
      - 각 단계에는 $2^i$ 개의 노드가 있다.
    - 따라서, 각 단계는 항상 <font size=4em>$2^i * \frac { n }{ 2^i } = O(n)$</font>
    - 단계는 항상 $log_2 n$ 개 만큼 만들어짐, 시간 복잡도는 결국 O(log n), 2는 역시 상수이므로 삭제
    - 따라서, 단계별 시간 복잡도 O(n) \* O(log n) = O(n log n)

<img src="https://www.fun-coding.org/00_Images/mergesortcomplexity.png" />

---

#### 이진 탐색 (Binary Search)

##### 이진 탐색 (Binary Search) 이란?

- 탐색할 자료를 둘로 나누어 해당 데이터가 있을만한 곳을 탐색하는 방법

##### 예시 문제

<img src="https://www.fun-coding.org/00_Images/binarysearch.png" />

##### 이진 탐색의 이해 (순차 탐색과 비교하며 이해하기)

<img src="https://www.mathwarehouse.com/programming/images/binary-vs-linear-search/binary-and-linear-search-animations.gif">

- [저작자] by penjee.com [이미지 출처](https://blog.penjee.com/binary-vs-linear-search-animated-gifs)

##### 분할 정복 알고리즘과 이진 탐색

###### 무한도전때 티켓 찾는거라 생각하면 된다 . 100-> 50->25-> 37->43 (솨십솨)

- 분할 정복 알고리즘 (Divide and Conquer)
  - Divide: 문제를 하나 또는 둘 이상으로 나눈다.
  - Conquer: 나눠진 문제가 충분히 작고, 해결이 가능하다면 해결하고, 그렇지 않다면 다시 나눈다.
- 이진 탐색
  - Divide: 리스트를 두 개의 서브 리스트로 나눈다.
  - Comquer
    - 검색할 숫자 (search) > 중간값 이면, 뒷 부분의 서브 리스트에서 검색할 숫자를 찾는다.
    - 검색할 숫자 (search) < 중간값 이면, 앞 부분의 서브 리스트에서 검색할 숫자를 찾는다.

##### 어떻게 코드로 만들까?

- 이진 탐색은 데이터가 정렬되있는 상태에서 진행
- 데이터가 [2, 3, 8, 12, 20] 일 때,
  - binary_search(data_list, find_data) 함수를 만들고
    - find_data는 찾는 숫자
    - data_list는 데이터 리스트
    - data_list의 중간값을 find_data와 비교해서
      - find_data < data_list의 중간값 이라면
        - 맨 앞부터 data_list의 중간까지 에서 다시 find_data 찾기
      - data_list의 중간값 < find_data 이라면
        - data_list의 중간부터 맨 끝까지에서 다시 find_data 찾기
      - 그렇지 않다면, data_list의 중간값은 find_data 인 경우로, return data_list 중간위치

```
def binary_search(data, search):
    print (data)
    if len(data) == 1 and search == data[0]:
        return True #1인 경우 데이터 리턶나는게 아니라 만약 서치하는게 마나 확인
    #만약 데이터가 1개 밖에 없다면 그게 내가 검색한 거인지 보고 아니면 검색하려는게 존재하지 않는 것이다.
    if len(data) == 1 and search != data[0]:
        return False
    if len(data) == 0:
        return False

    medium = len(data) // 2 #분할정복진행
    if search == data[medium]:#만약 서치로 데이터 찾으면
        return True
    else:
        if search > data[medium]: #서치가 데이터 찾는거보다 크면(오른쪽 탐색)
            return binary_search(data[medium+1:], search)
        else:#반대로 왼쪽 탐색 서치가 찾는 데이터보다 작으면
            return binary_search(data[:medium], search)
```

##### 알고리즘 분석

- n개의 리스트를 매번 2로 나누어 1이 될 때까지 비교연산을 k회 진행

  - <font size=4em>n X $\frac { 1 }{ 2 }$ X $\frac { 1 }{ 2 }$ X $\frac { 1 }{ 2 }$ ... = 1</font>
  - <font size=4em>n X $\frac { 1 }{ 2 }^k$ = 1</font>
  - <font size=4em>n = $2^k$ = $log_2 n$ = $log_2 2^k$</font>
  - <font size=4em>$log_2 n$ = k</font>
  - 빅 오 표기법으로는 k + 1 이 결국 최종 시간 복잡도임 (1이 되었을 때도, 비교연산을 한번 수행)
    - 결국 O($log_2 n$ + 1) 이고, 2와 1, 상수는 삭제 되므로, O($log n$)

---

#### 순차 탐색 (Sequential Search)

##### 순차 탐색 (Sequential Search) 이란?

- 탐색은 여러 데이터 중에서 원하는 데이터를 찾아내는 것을 의미
- 데이터가 담겨있는 리스트를 앞에서부터 하나씩 비교해서 원하는 데이터를 찾는 방법

* 그냥 가장 기본적인 알고리즘이다.

```
from random import *

rand_data_list = list()
for num in range(10):
    rand_data_list.append(randint(1, 100))
rand_data_list
```

```
def sequencial(data_list, search_data):
    for index in range(len(data_list)):
        if data_list[index] == search_data:
            return index
    return -1
sequencial(rand_data_list, 4)
```

##### 알고리즘 분석

- 최악의 경우 리스트 길이가 n일 때, n번 비교해야 함
  - O(n)

---

#### 그래프 이해

##### 그래프 (Graph) 란?

- 그래프는 실제 세계의 현상이나 사물을 정점(Vertex) 또는 노드(Node) 와 간선(Edge)로 표현하기 위해 사용

##### 예제 집에서 회사로 가는 경로를 그래프로 표현한 예

<img src="https://www.fun-coding.org/00_Images/graph.png" width=400>

##### 그래프 (Graph) 관련 용어

- 노드 (Node): 위치를 말함, 정점(Vertex)라고도 함
- 간선 (Edge): 위치 간의 관계를 표시한 선으로 노드를 연결한 선이라고 보면 됨 (link 또는 branch 라고도 함)
- 인접 정점 (Adjacent Vertex) : 간선으로 직접 연결된 정점(또는 노드)

![20211004_135709](/assets/20211004_135709.png)

여기서 집의 간선은 2개이다.
여기서 지하철에 들어오는 간선(진입차선) 은 1개
지하철에서 나가는 간선도 1개.
경로길이는 집에서 회사 가는데 경로길이는 간선길이로 2개의 간선이 사용되었으며 경로길이는 2이다.

집에서 회사 가는건 단순 경로지만(중복된 정점이 없음)
집에서 집 오는건 사이클이 될 수 있다.
출발지와 목적지에 따라 단순경로, 사이클이 될 수 있다.

###### 근데 집->집 처럼 처음과 끝이 중복은 허용한다(단순 경로로 본다.)

###### 집->집 오는 건 단순경로로 볼수도 있고 싸이클로 볼 수도 있다.(단순경로도 맞고 출발지==목적지라 사이클로 불러도 맞는 말이다.)

- 참고 용어
  - 정점의 차수 (Degree): 무방향 그래프에서 하나의 정점에 인접한 정점의 수
  - 진입 차수 (In-Degree): 방향 그래프에서 외부에서 오는 간선의 수
  - 진출 차수 (Out-Degree): 방향 그래프에서 외부로 향하는 간선의 수
  - 경로 길이 (Path Length): 경로를 구성하기 위해 사용된 간선의 수
  - 단순 경로 (Simple Path): 처음 정점과 끝 정점을 제외하고 중복된 정점이 없는 경로
  - 사이클 (Cycle): 단순 경로의 시작 정점과 종료 정점이 동일한 경우

> 단순 경로 (A - B - C)
> <img src="https://www.fun-coding.org/00_Images/simplepath.png" width=200>

#### 그래프 (Graph) 종류

##### 무방향 그래프 (Undirected Graph)

- 방향이 없는 그래프
- 간선을 통해, 노드는 양방향으로 갈 수 있음
- 보통 노드 A, B가 연결되어 있을 경우, (A, B) 또는 (B, A) 로 표기
  <img src="https://www.fun-coding.org/00_Images/undirectedgraph.png" width=300>

##### 방향 그래프 (Directed Graph)

- 간선에 방향이 있는 그래프
- 보통 노드 A, B가 A -> B 로 가는 간선으로 연결되어 있을 경우, <A, B> 로 표기 (<B, A> 는 B -> A 로 가는 간선이 있는 경우이므로 <A, B> 와 다름)
  <img src="https://www.fun-coding.org/00_Images/directedgraph.png" width=300>

##### 가중치 그래프 (Weighted Graph) 또는 네트워크 (Network)

- 간선에 비용 또는 가중치가 할당된 그래프

<img src="https://www.fun-coding.org/00_Images/weightedgraph.png" width=300>

##### 연결 그래프 (Connected Graph) 와 비연결 그래프 (Disconnected Graph)

- 연결 그래프 (Connected Graph)
  - 무방향 그래프에 있는 모든 노드에 대해 항상 경로가 존재하는 경우
- 비연결 그래프 (Disconnected Graph)
  - 무방향 그래프에서 특정 노드에 대해 경로가 존재하지 않는 경우

> 비연결 그래프 예
> <img src="https://www.fun-coding.org/00_Images/disconnectedgraph.png" width=300>

##### 사이클 (Cycle) 과 비순환 그래프 (Acyclic Graph)

- 사이클 (Cycle)
  - 단순 경로의 시작 노드와 종료 노드가 동일한 경우
- 비순환 그래프 (Acyclic Graph)
  - 사이클이 없는 그래프

> 비순환 그래프 예
> <img src="https://www.fun-coding.org/00_Images/acyclicgraph.png" width=300>

##### 완전 그래프 (Complete Graph)

- 그래프의 모든 노드가 서로 연결되어 있는 그래프

> 완전 그래프 예
> <img src="https://www.fun-coding.org/00_Images/completegraph.png" width=300>

##### 그래프와 트리의 차이

- 트리는 그래프 중에 속한 특별한 종류라고 볼 수 있음

<div style="text-align:left">
<table>
  <tr>
    <th></th>
    <th style="text-align:center">그래프</th>
    <th style="text-align:center">트리</th>
  </tr>
  <tr>
    <td style="text-align:center">정의</td>
    <td style="text-align:left">노드와 노드를 연결하는 간선으로 표현되는 자료 구조</td>
    <td style="text-align:left">그래프의 한 종류, 방향성이 있는 비순환 그래프</td>
  </tr>
  <tr>
    <td style="text-align:center">방향성</td>
    <td style="text-align:left">방향 그래프, 무방향 그래프 둘다 존재함</td>
    <td style="text-align:left">방향 그래프만 존재함</td>
  </tr>
  <tr>
    <td style="text-align:center">사이클</td>
    <td style="text-align:left">사이클 가능함, 순환 및 비순환 그래프 모두 존재함</td>
    <td style="text-align:left">비순환 그래프로 사이클이 존재하지 않음</td>
  </tr>
  <tr>
    <td style="text-align:center">루트 노드</td>
    <td style="text-align:left">루트 노드 존재하지 않음</td>
    <td style="text-align:left">루트 노드 존재함</td>
  </tr>
  <tr>
    <td style="text-align:center">부모/자식 관계</td>
    <td style="text-align:left">부모 자식 개념이 존재하지 않음</td>
    <td style="text-align:left">부모 자식 관계가 존재함</td>
  </tr>
</table>
</div>

---

#### 깊이 우선 탐색 (Depth-First Search)

##### BFS 와 DFS 란?

- 대표적인 그래프 **탐색** 알고리즘
  - 너비 우선 탐색 (Breadth First Search): 정점들과 같은 레벨에 있는 노드들 (형제 노드들)을 먼저 탐색하는 방식
  - 깊이 우선 탐색 (Depth First Search): 정점의 자식들을 먼저 탐색하는 방식

#### BFS/DFS 방식 이해를 위한 예제

- BFS 방식: A - B - C - D - G - H - I - E - F - J
  - 한 단계씩 내려가면서, 해당 노드와 같은 레벨에 있는 노드들 (형제 노드들)을 먼저 순회함
- DFS 방식: A - B - D - E - F - C - G - H - I - J
  - 한 노드의 자식을 타고 끝까지 순회한 후, 다시 돌아와서 다른 형제들의 자식을 타고 내려가며 순화함

<img src="https://www.fun-coding.org/00_Images/BFSDFS.png" width=700>

##### 파이썬으로 그래프를 표현하는 방법

- 파이썬에서 제공하는 딕셔너리와 리스트 자료 구조를 활용해서 그래프를 표현할 수 있음

```
graph = dict()

graph['A'] = ['B', 'C']
graph['B'] = ['A', 'D']
graph['C'] = ['A', 'G', 'H', 'I']
graph['D'] = ['B', 'E', 'F']
graph['E'] = ['D']
graph['F'] = ['D']
graph['G'] = ['C']
graph['H'] = ['C']
graph['I'] = ['C', 'J']
graph['J'] = ['I']
```

##### 그래프 예와 파이썬 표현

<img src="https://www.fun-coding.org/00_Images/dfsgraph.png" width=700>

##### DFS 알고리즘 구현

- 자료구조 스택과 큐를 활용함
  - need_visit 스택과 visited 큐, 두 개의 자료 구조를 생성

> BFS 자료구조는 두 개의 큐를 활용하는데 반해, DFS 는 스택과 큐를 활용한다는 차이가 있음을 인지해야 함

- 큐와 스택 구현은 별도 라이브러리를 활용할 수도 있지만, 간단히 파이썬 리스트를 활용할 수도 있음

```
def dfs(graph, start_node):
    visited, need_visit = list(), list()
    need_visit.append(start_node)

    while need_visit:
        node = need_visit.pop()
        if node not in visited:
            visited.append(node)
            need_visit.extend(graph[node])

    return visited

```

### 4. 시간 복잡도

- 일반적인 DFS 시간 복잡도
  - 노드 수: V
  - 간선 수: E
    - 위 코드에서 while need_visit 은 V + E 번 만큼 수행함
  - 시간 복잡도: O(V + E)

---

#### 너비 우선 탐색 (Breadth-First Search)

##### BFS 와 DFS 란?

- 대표적인 그래프 **탐색** 알고리즘
  - 너비 우선 탐색 (Breadth First Search): 정점들과 같은 레벨에 있는 노드들 (형제 노드들)을 먼저 탐색하는 방식
  - 깊이 우선 탐색 (Depth First Search): 정점의 자식들을 먼저 탐색하는 방식

#### BFS/DFS 방식 이해를 위한 예제

- BFS 방식: A - B - C - D - G - H - I - E - F - J
  - 한 단계씩 내려가면서, 해당 노드와 같은 레벨에 있는 노드들 (형제 노드들)을 먼저 순회함
- DFS 방식: A - B - D - E - F - C - G - H - I - J
  - 한 노드의 자식을 타고 끝까지 순회한 후, 다시 돌아와서 다른 형제들의 자식을 타고 내려가며 순화함

<img src="https://www.fun-coding.org/00_Images/BFSDFS.png" width=700>

##### 파이썬으로 그래프를 표현하는 방법

- 파이썬에서 제공하는 딕셔너리와 리스트 자료 구조를 활용해서 그래프를 표현할 수 있음

##### 그래프 예와 파이썬 표현

<img src="https://www.fun-coding.org/00_Images/bfsgraph.png" width=700>

```
graph = dict()

graph['A'] = ['B', 'C']
graph['B'] = ['A', 'D']
graph['C'] = ['A', 'G', 'H', 'I']
graph['D'] = ['B', 'E', 'F']
graph['E'] = ['D']
graph['F'] = ['D']
graph['G'] = ['C']
graph['H'] = ['C']
graph['I'] = ['C', 'J']
graph['J'] = ['I']
```

##### BFS 알고리즘 구현

- 자료구조 큐를 활용함
  - need_visit 큐와 visited 큐, 두 개의 큐를 생성

<img src="https://www.fun-coding.org/00_Images/bfsqueue.png" width=700>

- 큐의 구현은 간단히 파이썬 리스트를 활용

```
def bfs(graph, start_node):
    visited = list()
    need_visit = list()

    need_visit.append(start_node)

    while need_visit:
        node = need_visit.pop(0)
        if node not in visited:
            visited.append(node)
            need_visit.extend(graph[node])

    return visited
```

<img src="https://www.fun-coding.org/00_Images/bfsgraph.png" width=700>

### 4. 시간 복잡도

- 일반적인 BFS 시간 복잡도
  - 노드 수: V
  - 간선 수: E
    - 위 코드에서 while need_visit 은 V + E 번 만큼 수행함
  - 시간 복잡도: O(V + E)

```
def bfs(graph, start_node):
    visited = list()
    need_visit = list()

    need_visit.append(start_node)
    count = 0
    while need_visit:
        count += 1
        node = need_visit.pop(0)
        if node not in visited:
            visited.append(node)
            need_visit.extend(graph[node])
    print (count)
    return visited
```

---

#### 백 트래킹 기법의 이해

##### 백 트래킹 (backtracking)

- 백트래킹 (backtracking) 또는 퇴각 검색 (backtrack)으로 부름
- 제약 조건 만족 문제 (Constraint Satisfaction Problem) 에서 해를 찾기 위한 전략
  - 해를 찾기 위해, 후보군에 제약 조건을 점진적으로 체크하다가, 해당 후보군이 제약 조건을 만족할 수 없다고 판단되는 즉시 backtrack (다시는 이 후보군을 체크하지 않을 것을 표기)하고, 바로 다른 후보군으로 넘어가며, 결국 최적의 해를 찾는 방법
- 실제 구현시, 고려할 수 있는 모든 경우의 수 (후보군)를 상태공간트리(State Space Tree)를 통해 표현
  - 각 후보군을 DFS 방식으로 확인
  - 상태 공간 트리를 탐색하면서, 제약이 맞지 않으면 해의 후보가 될만한 곳으로 바로 넘어가서 탐색
    - Promising: 해당 루트가 조건에 맞는지를 검사하는 기법
    - Pruning (가지치기): 조건에 맞지 않으면 포기하고 다른 루트로 바로 돌아서서, 탐색의 시간을 절약하는 기법

> 즉, 백트래킹은 트리 구조를 기반으로 DFS로 깊이 탐색을 진행하면서 각 루트에 대해 조건에 부합하는지 체크(Promising), 만약 해당 트리(나무)에서 조건에 맞지않는 노드는 더 이상 DFS로 깊이 탐색을 진행하지 않고, 가지를 쳐버림 (Pruning)

##### 상태 공간 트리 (State Space Tree)

- 문제 해결 과정의 중간 상태를 각각의 노드로 나타낸 트리
  <img src="https://www.fun-coding.org/00_Images/statespacetree.png" width=300>

###### 트리 형태를 만들어서 접근하는 거지 코드에서 트리를 직접 만들거나 하진 않는다.

##### N Queen 문제 이해

- 대표적인 백트래킹 문제
- NxN 크기의 체스판에 N개의 퀸을 서로 공격할 수 없도록 배치하는 문제
- 퀸은 다음과 같이 이동할 수 있으므로, 배치된 퀸 간에 공격할 수 없는 위치로 배치해야 함
  <img src="https://www.fun-coding.org/00_Images/queen_move.png">

##### Pruning (가지치기) for N Queen 문제

- 한 행에는 하나의 퀸 밖에 위치할 수 없음 (퀸은 수평 이동이 가능하므로)
- 맨 위에 있는 행부터 퀸을 배치하고, 다음 행에 해당 퀸이 이동할 수 없는 위치를 찾아 퀸을 배치
- 만약 앞선 행에 배치한 퀸으로 인해, 다음 행에 해당 퀸들이 이동할 수 없는 위치가 없을 경우에는, 더 이상 퀸을 배치하지 않고, 이전 행의 퀸의 배치를 바꿈
  - 즉, 맨 위의 행부터 전체 행까지 퀸의 배치가 가능한 경우의 수를 상태 공간 트리 형태로 만든 후, 각 경우를 맨 위의 행부터 DFS 방식으로 접근, 해당 경우가 진행이 어려울 경우, 더 이상 진행하지 않고, 다른 경우를 체크하는 방식
    <img src="https://www.fun-coding.org/00_Images/backtracking.png">

##### Promising for N Queen 문제

- 해당 루트가 조건에 맞는지를 검사하는 기법을 활용하여,
- 현재까지 앞선 행에서 배치한 퀸이 이동할 수 없는 위치가 있는지를 다음과 같은 조건으로 확인
  - 한 행에 어차피 하나의 퀸만 배치 가능하므로 수평 체크는 별도로 필요하지 않음
    <img src="https://www.fun-coding.org/00_Images/nqueen.png">

#### N Queen 문제 파이썬 코드 작성

```
def is_available(candidate, current_col):
    current_row = len(candidate)#candidate 길이와 동일
    for queen_row in range(current_row):  #행이 0부터 시작
        if candidate[queen_row] == current_col or abs(candidate[queen_row] - current_col) == current_row - queen_row:
            #만약 여기서 둘중 하나라도 만족하게 되면
            #queen row = 퀸의 컬럼 번호 current_col과 같은지(인자로 넘어온) 또는
            #candidate의 queen의 row(z컬럼과)-current_row것의 조건이 맞다면 다음에 위치할 수 있는 경우는 안된다.
            return False
    return True#위 그림의 조건을 만족하지 않으면 그 자리에 퀸을 놓을 수 있으므로 true를 리턴하게 된다.


def DFS(N, current_row, current_candidate, final_result):
    if current_row == N:
        final_result.append(current_candidate[:])#얇은 복사(복사본 넘겨줌)
        return

    for candidate_col in range(N):#N개의 열이있고 0번부터 체크
        if is_available(current_candidate, candidate_col):#리스트가 맨앞부터 들어감.
            current_candidate.append(candidate_col)
            DFS(N, current_row + 1, current_candidate, final_result)#그 다음행에 지금까지 배치된 걸 넘겨준다.
            #만약 이걸하면 다시 넘어올텐데 마지막 행까지 가지도 않았고 다음 행에 4가지의 열이 하나도 조건 만족하지 않으면 아무 조건없이 리턴
            #리턴 된다는 건 (아무거도 없이) 지금까지의 배치 조합으로는 그 다음행에 퀸 놓을 자리가 없다(백트랙)

            current_candidate.pop()#가장 최근에 append된게 없어진다.


def solve_n_queens(N):
    final_result = []
    DFS(N, 0, [], final_result)
    return final_result


```
