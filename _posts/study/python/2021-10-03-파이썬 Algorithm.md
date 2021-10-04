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
5.                                    data_list[index], data_list[index + 1] = data_list[index + 1], data_list[index]
6.                                    swap += 1
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

##### 병합 정렬 (merge sort)

### 1. 병합 정렬 (merge sort)

- 재귀용법을 활용한 정렬 알고리즘
  1. 리스트를 절반으로 잘라 비슷한 크기의 두 부분 리스트로 나눈다.
  2. 각 부분 리스트를 재귀적으로 합병 정렬을 이용해 정렬한다.
  3. 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.

#### 직접 눈으로 보면 더 이해가 쉽다: https://visualgo.net/en/sorting

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif" width=500/>

출처: [위키피디아](https://ko.wikipedia.org/wiki/%ED%95%A9%EB%B3%91_%EC%A0%95%EB%A0%AC)

![20211004_043104](/assets/20211004_043104.png)
