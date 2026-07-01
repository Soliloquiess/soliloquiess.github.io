---
title: "[Python] python Data Structure"
date: 2021-06-02
category: "Python"
tags: ["Python"]
description: "배열, 큐, 스택, 링크드 리스트, 해시 테이블, 트리, 힙 등 파이썬으로 구현하는 주요 자료구조와 각각의 시간 복잡도를 정리한 학습 노트."
permalink: "study/2021/06/02/파이썬-Data-Structure"
---

## 배열(Array)과 리스트(Python List)

### 배열은 왜 필요할까?

- 같은 종류의 데이터를 효율적으로 관리하기 위해 사용한다.
- 같은 종류의 데이터를 순차적으로 저장한다.

**장점**

- 빠른 접근이 가능하다.
  - 첫 데이터의 위치에서 상대적인 위치(인덱스 번호)로 데이터에 접근한다.

**단점**

- 데이터 추가/삭제가 어렵다.
  - 미리 최대 길이를 지정해야 한다.

파이썬에서는 리스트로 배열을 구현할 수 있다.

### range 사용법 정리

| 형태 | 예시 | 결과 |
| --- | --- | --- |
| `range(stop)` | `range(10)` | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| `range(start, stop)` | `range(1, 11)` | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 |
| `range(start, stop, step)` | `range(0, 20, 2)` | 0, 2, 4, 6, 8, 10, 12, 14, 16, 18 |

- `start`, `stop`, `step`은 음수로 지정할 수 있다.

---

## 큐(Queue)

- 줄을 서는 행위와 유사한 구조이다.
- 가장 먼저 넣은 데이터를 가장 먼저 꺼낼 수 있는 구조이다.
  - 음식점에서 가장 먼저 줄을 선 사람이 제일 먼저 입장하는 것과 같다.
  - FIFO(First-In, First-Out) 또는 LILO(Last-In, Last-Out) 방식으로, 스택과는 꺼내는 순서가 반대이다.

<img src="https://www.fun-coding.org/00_Images/queue.png" />
* 출처: http://www.stoimen.com/blog/2012/06/05/computer-algorithms-stack-and-queue-data-structure/

**주요 기능**

- Enqueue: 큐에 데이터를 넣는 기능
- Dequeue: 큐에서 데이터를 꺼내는 기능
- 시각화 자료: https://visualgo.net/en/list

### 큐는 어디에 많이 쓰일까?

- 멀티 태스킹을 위한 프로세스 스케줄링 방식을 구현하기 위해 많이 사용된다(운영체제 참조).
  > 이건 알아두고 가야 한다.

> 큐는 특별히 언급되는 장단점이 없으므로, 장단점보다는 활용 예인 프로세스 스케줄링 방식을 함께 이해해두는 것이 좋다.

---

## 스택(Stack)

- 데이터를 제한적으로 접근할 수 있는 구조이다.
  - 한쪽 끝에서만 자료를 넣거나 뺄 수 있다.
- 가장 나중에 쌓은 데이터를 가장 먼저 빼낼 수 있는 데이터 구조이다.
  - 큐: FIFO 정책
  - 스택: LIFO 정책

### 스택 구조

스택은 LIFO(Last In, First Out) 또는 FILO(First In, Last Out) 데이터 관리 방식을 따른다.

- LIFO: 마지막에 넣은 데이터를 가장 먼저 추출하는 데이터 관리 정책
- FILO: 처음에 넣은 데이터를 가장 마지막에 추출하는 데이터 관리 정책

**대표적인 스택의 활용**

- 컴퓨터 내부의 프로세스 구조에서 함수가 동작하는 방식

**주요 기능**

- push(): 데이터를 스택에 넣기
- pop(): 데이터를 스택에서 꺼내기

<img src="http://www.fun-coding.org/00_Images/stack.png" />

### 스택 구조와 프로세스 스택

- 스택 구조는 프로세스 실행 구조의 가장 기본이다.
  - 함수 호출 시 프로세스 실행 구조를 스택과 비교해서 이해할 필요가 있다.

### 자료구조 스택의 장단점

**장점**

- 구조가 단순해서 구현이 쉽다.
- 데이터 저장/읽기 속도가 빠르다.

**단점** (일반적인 스택 구현 시)

- 데이터 최대 갯수를 미리 정해야 한다.
  - 파이썬의 경우 재귀 함수는 1000번까지만 호출이 가능하다.
- 저장 공간의 낭비가 발생할 수 있다.
  - 미리 최대 갯수만큼 저장 공간을 확보해야 한다.

> 스택은 단순하고 빠른 성능을 위해 사용되므로, 보통 배열 구조를 활용해서 구현하는 것이 일반적이다. 이 경우 위에서 열거한 단점이 있을 수 있다.

---

## 링크드 리스트(Linked List)

- 연결 리스트라고도 한다.
- 배열은 순차적으로 연결된 공간에 데이터를 나열하는 데이터 구조이며, 이 배열의 문제를 해결하기 위해 나온 것이 링크드 리스트이다. 배열은 미리 특정한 연결 공간을 예약하고 그 안에 데이터를 쓰는 구조인 반면, 링크드 리스트는 미리 예약하지 않고 필요할 때마다 데이터를 추가하는 구조이다.
- 링크드 리스트는 떨어진 곳에 존재하는 데이터를 화살표로 연결해서 관리하는 데이터 구조이다.
- <font color='#BF360C'>본래 C언어에서는 주요한 데이터 구조이지만, 파이썬은 리스트 타입이 링크드 리스트의 기능을 모두 지원한다.</font>

**기본 구조와 용어**

- 노드(Node): 데이터 저장 단위로, (데이터값, 포인터)로 구성된다.
- 포인터(pointer): 각 노드 안에서 다음이나 이전 노드와의 연결 정보를 가지고 있는 공간이다.

<br>
* 일반적인 링크드 리스트 형태
<img src="https://www.fun-coding.org/00_Images/linkedlist.png" />
(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

### Node 구현

- 보통 파이썬에서 링크드 리스트를 구현할 때는 파이썬 클래스를 활용한다.
  - 파이썬 객체지향 문법에 대한 이해가 필요하다.

### 배열과 링크드 리스트의 차이

배열은 그림처럼 A, B를 가진 배열에 C를 넣을 수가 없다(A, B가 이미 공간을 차지하고 있기 때문이다. 파이썬은 `append` 등으로 가능할지 몰라도, C나 자바처럼 배열 크기가 정해지면 범위를 초과해서 넣을 수 없다).

링크드 리스트는 어느 공간이든 노드를 저장할 공간을 만들고, 그 앞에 새로운 데이터를 넣은 뒤 앞의 데이터가 새로 생성된 노드를 가리키도록 주소만 연결하면 된다.

![링크드 리스트에 노드를 추가하는 과정](/assets/20211002_183124.png)

링크드 리스트는 이런 구조이므로 무한정으로 뻗어나갈 수 있다.

### 링크드 리스트의 장단점 (전통적인 C언어 기준)

**장점**

- 미리 데이터 공간을 할당하지 않아도 된다.
  - 배열은 **미리 데이터 공간을 할당**해야 한다.

**단점**

- 연결을 위한 별도 데이터 공간이 필요하므로, 저장 공간 효율이 높지 않다.
- 연결 정보를 찾는 시간이 필요하므로 접근 속도가 느리다.
- 중간 데이터 삭제 시, 앞뒤 데이터의 연결을 재구성해야 하는 부가 작업이 필요하다.

### 복잡한 기능1 — 데이터 사이에 데이터를 추가

- 링크드 리스트는 유지 관리에 부가적인 구현이 필요하다.

<img src="https://www.fun-coding.org/00_Images/linkedlistadd.png" />

(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

### 복잡한 기능2 — 특정 노드를 삭제

![링크드 리스트에서 노드를 삭제하는 과정](/assets/20211002_183231.png)

링크드 리스트는 맨 앞 노드를 꼭 가져야 하며, 그것을 헤드(head)라고 부른다.

- 헤드를 삭제하려면 헤드가 다음 노드를 가리키도록 바꿔야 한다.
- 맨 마지막 노드(C)를 삭제하려면 그냥 없애면 되지만, 그 앞 노드의 주소값을 `null`(또는 `None`)로 바꿔줘야 한다.
- 중간 노드 삭제는 B를 없애고 A의 노드 주소값이 C를 가리키도록 바꿔줘야 한다.

> 다음 코드는 위의 코드에서 delete 메서드만 추가한 것이므로, 해당 메서드만 확인하면 된다.

---

## 다양한 링크드 리스트 구조

### 더블 링크드 리스트 (Doubly Linked List)

- 이중 연결 리스트라고도 한다.
- 장점: 양방향으로 연결되어 있어서 노드 탐색을 양쪽 모두에서 할 수 있다.

<br>
<img src="https://www.fun-coding.org/00_Images/doublelinkedlist.png" />
(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

일반 링크드 리스트는 노드를 찾을 때 반드시 헤드부터 시작해서 원하는 데이터로 이동해야 한다. 노드가 3개든, 마지막 데이터든, 어느 위치든 마찬가지이다.

노드가 1만 개라고 생각해보자. 찾는 노드가 맨 끝에 있으면 1만 번을 검색해야 한다.

이 1만 개의 노드가 0~9999까지 있다고 가정하고 찾는 값이 8000번대에 있다면, 8000은 끝에서 가까우므로 뒤에서부터 검색하면 약 2000번 정도만에 찾을 수 있다.

이처럼 찾고자 하는 위치에 따라 앞에서 검색할지 뒤에서 검색할지 선택할 수 있으면 검색이 빨라진다. 이 점을 보완하기 위해 나온 것이 더블 링크드 리스트이다.

![더블 링크드 리스트의 노드 구조](/assets/20211002_182417.png)

더블 링크드 리스트는 노드 구조가 일반 링크드 리스트와 다르다.

- 일반 링크드 리스트의 노드: 데이터 + 다음 노드를 가리키는 주소
- 더블 링크드 리스트의 노드: 데이터 + 다음 노드 주소 + **이전 노드 주소**

이전 노드 주소를 갖게 되면 맨 앞에서 뒤로, 또는 맨 뒤에서 앞으로 양방향 탐색이 가능하다. 즉, "앞에서부터만 검색해야 한다"는 기존 링크드 리스트의 단점을 보완한 것이 더블 링크드 리스트이다. 노드가 앞뒤로 주소를 모두 갖고 있다.

---

## 시간 복잡도

### 알고리즘 복잡도 계산이 필요한 이유

하나의 문제를 푸는 알고리즘은 다양할 수 있다.

- 정수의 절대값 구하기 (예: 1, -1 → 1)
  - 방법1: 정수값을 제곱한 뒤 다시 루트를 씌우기
  - 방법2: 정수가 음수인지 확인해서, 음수일 때만 -1을 곱하기

> 다양한 알고리즘 중 어느 것이 더 좋은지 분석하기 위해, 복잡도를 정의하고 계산한다.

### 알고리즘 복잡도 계산 항목

1. **시간 복잡도**: 알고리즘 실행 속도
2. **공간 복잡도**: 알고리즘이 사용하는 메모리 크기

> 가장 중요한 시간 복잡도를 꼭 이해하고 계산할 수 있어야 한다.

시간 복잡도는 반복문이 가장 큰 영향을 끼친다. 입력이 커질수록 반복문이 알고리즘 수행 시간에 큰 영향을 준다.

### 알고리즘 성능 표기법

- **Big O (빅-오) 표기법: O(N)**
  - 알고리즘 최악의 실행 시간을 표기한다.
  - **가장 많이/일반적으로 사용한다.**
  - **아무리 최악의 상황이라도 이 정도의 성능은 보장한다는 의미이기 때문이다.**
- **Ω (오메가) 표기법: Ω(N)**
  - 알고리즘 최상의 실행 시간을 표기한다.
- **Θ (세타) 표기법: Θ(N)**
  - 알고리즘 평균 실행 시간을 표기한다.

> 시간 복잡도 계산은 반복문이 핵심 요소임을 인지하고, 최상·평균·최악 중 최악의 시간인 Big-O 표기법을 중심으로 익히면 된다.

### 대문자 O 표기법

- 빅 오 표기법, Big-O 표기법이라고도 부른다.
- 형태: O(입력)
  - 입력 n에 따라 결정되는 시간 복잡도 함수이다.
  - O(1), O($log n$), O(n), O(n$log n$), O($n^2$), O($2^n$), O(n!) 등으로 표기한다.
  - 입력 n의 크기에 따라 기하급수적으로 시간 복잡도가 늘어날 수 있다.
    - O(1) < O($log n$) < O(n) < O(n$log n$) < O($n^2$) < O($2^n$) < O(n!)
    - 참고: log n의 베이스는 2 - $log_2 n$

단순하게 입력 n에 따라 몇 번 실행되는지를 계산하면 된다.

- **표현식에 가장 큰 영향을 미치는 n의 단위로 표기한다.**
- n이 1이든 100이든, 1000이든, 10000이든
  - 무조건 상수 회 실행한다: O(1)
    ```python
         if n > 10:
              print(n)
    ```
  - n에 따라 n번, n + 10번, 또는 3n + 10번 등 실행한다: O(n)
    ```python
         variable = 1
         for num in range(3):
             for index in range(n):
                  print(index)
    ```
  - n에 따라 $n^2$번, $n^2$ + 1000번, 100$n^2$ - 100, 또는 300$n^2$ + 1번 등 실행한다: O($n^2$)
    ```python
         variable = 1
         for i in range(300):
             for num in range(n):
                 for index in range(n):
                      print(index)
    ```

<img src="http://www.fun-coding.org/00_Images/bigo.png" width=400/>

**빅 오 입력값 표기 방법 (예)**

- 시간 복잡도 함수가 2$n^2$ + 3n 이라면
  - 가장 높은 차수는 2$n^2$
  - 상수는 실제로 큰 영향이 없음
  - 결국 빅 오 표기법으로는 O($n^2$) (서울부터 부산까지 가는 자동차의 예를 상기)

---

## 해시 테이블(Hash Table)

### 해시 구조

- Hash Table: 키(Key)에 데이터(Value)를 저장하는 데이터 구조이다.
  - Key를 통해 바로 데이터를 받아올 수 있으므로 속도가 획기적으로 빨라진다.
  - 파이썬 딕셔너리(Dictionary) 타입이 해시 테이블의 예이다: Key로 바로 데이터(Value)를 꺼낸다.
  - 보통 배열로 미리 Hash Table 사이즈만큼 생성한 후 사용한다(공간과 탐색 시간을 맞바꾸는 기법).
  - <font color='#BF360C'>단, 파이썬에서는 해시를 별도로 구현할 이유가 없다 - 딕셔너리 타입을 사용하면 된다.</font>

![배열과 해시 테이블의 탐색 비교](/assets/20211002_222528.png)

배열과의 차이는, 배열은 인덱스 위치를 하나하나 찾아야 하지만(예: 16번) 해시 테이블은 트럼프라는 데이터가 어디 있는지 곧바로 알 수 있다는 점이다.

키를 해시 함수에 넣으면 데이터가 저장된 위치가 나온다. 배열을 전부 검색할 필요 없이 데이터 위치를 알아낼 수 있는 구조가 해시 테이블이다. 파이썬의 딕셔너리도 이 해시 함수를 이용한 자료구조이다.

### 관련 용어

- 해시(Hash): 임의 값을 고정 길이로 변환하는 것
- 해시 테이블(Hash Table): 키 값의 연산에 의해 직접 접근이 가능한 데이터 구조
- 해싱 함수(Hashing Function): Key에 대해 산술 연산을 이용해 데이터 위치를 찾을 수 있는 함수
- 해시 값(Hash Value) 또는 해시 주소(Hash Address): Key를 해싱 함수로 연산해서 얻은 값. 이를 기반으로 해시 테이블에서 해당 Key의 데이터 위치를 일관성 있게 찾을 수 있다.
- 슬롯(Slot): 한 개의 데이터를 저장할 수 있는 공간
- 저장할 데이터에 대해 Key를 추출할 수 있는 별도 함수가 존재할 수도 있다.

<img src="https://www.fun-coding.org/00_Images/hash.png" width=400 />

키를 해시 함수에 넣으면 특별한 주소가 나오는데, 이 주소와 데이터 공간이 연결되어 있다. 이 구조를 해시 테이블이라고 한다.

![해시 함수로 키를 슬롯에 매핑하는 과정](/assets/20211002_224111.png)

각각의 키를 추출할 수 있게 하고 해시 함수를 만들면, 해시 테이블의 특정 슬롯에 저장하는 셈이 된다.

이것을 배열로 만든다면 모든 인덱스를 하나씩 다 탐색해야 한다(찾는 값이 트럼프라면 맨 뒤까지 검색해야 한다). 반면 해시 함수는 한 번만 돌리면 바로 위치를 알아낼 수 있다. 그래서 해시 테이블은 검색에 매우 많이 쓰인다.

### 해시 테이블의 장단점과 주요 용도

**장점**

- 데이터 저장/읽기(검색) 속도가 빠르다.
- 키에 대한 데이터가 있는지(중복) 확인이 쉽다.

**단점**

- 일반적으로 저장 공간이 좀 더 많이 필요하다.
- **여러 키에 해당하는 주소가 동일할 경우, 충돌을 해결하기 위한 별도 자료구조가 필요하다.**

**주요 용도**

- 검색이 많이 필요한 경우
- 저장, 삭제, 읽기가 빈번한 경우
- 캐시 구현 시 (중복 확인이 쉽기 때문)

<div class="alert alert-block alert-warning">
  <strong><font color="blue" size="3em">연습1: 리스트 변수를 활용해서 해쉬 테이블 구현해보기</font></strong><br>
  1. 해쉬 함수: key % 8<br>
  2. 해쉬 키 생성: hash(data)
</div>

```
hash_table = list([0 for i in range(8)])

def get_key(data):
    return hash(data)

def hash_function(key):
    return key % 8

def save_data(data, value):
    hash_address = hash_function(get_key(data))
    hash_table[hash_address] = value

def read_data(data):
    hash_address = hash_function(get_key(data))
    return hash_table[hash_address]
```

### 충돌(Collision) 해결 알고리즘

- 해시 테이블의 가장 큰 문제는 충돌(Collision)이다.
- 이 문제를 충돌(Collision) 또는 해시 충돌(Hash Collision)이라고 부른다.

#### Chaining 기법

- **개방 해싱(Open Hashing) 기법** 중 하나로, 해시 테이블 저장공간 외의 공간을 활용하는 기법이다.
- 충돌이 일어나면 링크드 리스트 자료구조를 사용해서 데이터를 추가로 뒤에 연결시켜 저장한다.

해시 충돌이 발생하면 해당 데이터에 대해 추가 데이터 공간을 확보해서 해결한다(오픈 해싱, 개방 해싱이라고 한다).

<div class="alert alert-block alert-warning">
<strong><font color="blue" size="3em">연습2: 연습1의 해쉬 테이블 코드에 Chaining 기법으로 충돌해결 코드를 추가해보기</font></strong><br>
1. 해쉬 함수: key % 8<br>
2. 해쉬 키 생성: hash(data)
</div>

![Chaining 기법으로 충돌을 해결하는 모습](/assets/20211003_032406.png)

Chaining 기법은 충돌 발생 시 링크드 리스트로 만들어서 연결해 해결한다.

배열로 한다면 충돌이 얼마나 일어날지 모르므로 최대 충돌 횟수만큼 미리 배열을 잡아둬야 한다. 반면 링크드 리스트는 충돌이 날 때만 리스트로 데이터를 만들면 되므로 이런 방식이 가능하다.

![해시 테이블 밖에 링크드 리스트를 두는 Chaining](/assets/20211003_033426.png)

Chaining 기법은, 빨간색 사각형이 해시 테이블일 때 그림의 1번처럼 충돌이 일어나면 테이블 밖에 링크드 리스트를 둔다.

#### Linear Probing 기법

- **폐쇄 해싱(Close Hashing) 기법** 중 하나로, 해시 테이블 저장공간 안에서 충돌 문제를 해결하는 기법이다.
- 충돌이 일어나면, 해당 hash address의 다음 address부터 맨 처음 나오는 빈 공간에 저장한다.
  - 저장공간 활용도를 높이기 위한 기법이다.

![Linear Probing으로 다음 빈 슬롯을 찾는 과정](/assets/20211003_033607.png)

Chaining 기법과 달리, 다음 칸을 찾아가면서 빈 공간이 있으면 그곳에 데이터를 넣는다. 다음 칸을 확인하며 처음으로 빈 공간을 발견했을 때 해당 데이터를 넣는 것이 Linear Probing 기법이다.

이 기법의 장점은 저장공간의 활용도를 높일 수 있다는 점이다. 해시 테이블의 빈 공간을 충돌된 데이터로 채워서 활용도를 높인다.

![Linear Probing 저장 예시1](/assets/20211003_034600.png)

![Linear Probing 저장 예시2](/assets/20211003_035533.png)

```
def read_data(data):
    index_key = get_key(data)
    hash_address = hash_function(index_key)

    if hash_table[hash_address] != 0: #0인지를 봐야한다.
        for index in range(hash_address, len(hash_table)):
            if hash_table[index] == 0:
                return None#없다는 표시로 none 리턴
            elif hash_table[index][0] == index_key: #만약 인덱스 키라면
                #내가 원하는 키라면 ? 해당 데이터 값을 리턴해준다. 그럼 이  for문은 끝남
                #근데 만약 이 조건이 부합하는건 어느 순간 데이터가 다 안맞는데 한번도 저장이 된적이 없으면?
                #해당 데이터에 대한 값이 한번도 저장된 적이 없다.

                #그것이 빈 공간이 있다는 것에 걸려서 None을 리턴한다.
                return hash_table[index][1]
    else:
        return None
```

Linear Probing 기법은, 테이블에 해당 데이터 주소가 저장되어 있을 때 키값으로 판단하고, 충돌이 일어나면 동일한 데이터 주소라도 다음 빈 공간을 찾아 저장한다.

찾을 때도 데이터가 있다고 바로 꺼내지 않고, 키값을 확인하여 키값이 맞을 때까지 빈 슬롯을 순회한다. 키값이 맞는 것을 매칭하면 해당 데이터를 리턴한다.

#### 빈번한 충돌을 개선하는 기법

- 해시 함수를 재정의하고 해시 테이블 저장공간을 확대한다.
- 예:

```python
hash_table = list([None for i in range(16)])

def hash_function(key):
    return key % 16
```

### 해시 함수와 키 생성 함수

- 파이썬의 `hash()` 함수는 실행할 때마다 값이 달라질 수 있다.
- 유명한 해시 함수들이 있다: SHA(Secure Hash Algorithm, 안전한 해시 알고리즘)
  - 어떤 데이터도 유일한 고정 크기의 값을 리턴해주므로, 해시 함수로 유용하게 활용할 수 있다.

### 시간 복잡도

- 일반적인 경우(Collision이 없는 경우): O(1)
  - 충돌이 없다면 입력값이 1개든 100만 개든 맞는 해시 공간에 바로 접근하면 된다.
- 최악의 경우(Collision이 모두 발생하는 경우): O(n)
  - 모든 경우에 충돌이 일어나는 경우이다.

> 해시 테이블은 일반적인 경우를 기대하고 만들기 때문에, 시간 복잡도는 O(1)이라고 말할 수 있다.

**검색에서 해시 테이블의 사용 예**

- 16개의 배열에 데이터를 저장하고 검색할 때: O(n) (모든 경우를 순회)
- 16개의 데이터 저장공간을 가진 해시 테이블에 저장하고 검색할 때: O(1) (해시 함수로 특정 저장공간에 저장/조회)

> 해시 테이블은 저장과 검색에 있어서 아주 효율적인 자료구조이다.

---

## 트리(Tree)

> 트리는 면접에서 자주 묻는 자료구조이다. 시니어 개발자들도 트리는 중요하게 생각하는 경우가 많으니 꼭 알아두자.

### 트리(Tree) 구조

- 트리: Node와 Branch를 이용해서, 사이클을 이루지 않도록 구성한 데이터 구조이다.
- 실제로 어디에 많이 사용되나?
  - 트리 중 이진 트리(Binary Tree) 형태의 구조로, 탐색(검색) 알고리즘 구현을 위해 많이 사용된다.

### 관련 용어

- Node: 트리에서 데이터를 저장하는 기본 요소 (데이터와 다른 연결된 노드에 대한 Branch 정보 포함)
- Root Node: 트리 맨 위에 있는 노드
- Level: 최상위 노드를 Level 0으로 했을 때, 하위 Branch로 연결된 노드의 깊이
- Parent Node: 어떤 노드의 다음 레벨에 연결된 노드
- Child Node: 어떤 노드의 상위 레벨에 연결된 노드
- Leaf Node (Terminal Node): Child Node가 하나도 없는 노드
- Sibling (Brother Node): 동일한 Parent Node를 가진 노드
- Depth: 트리에서 Node가 가질 수 있는 최대 Level

<img src="http://www.fun-coding.org/00_Images/tree.png" width="600" />

### 이진 트리와 이진 탐색 트리 (Binary Search Tree)

- 이진 트리: 노드의 최대 Branch가 2인 트리
- 이진 탐색 트리(Binary Search Tree, BST): 이진 트리에 다음 조건이 추가된 트리
  - 왼쪽 노드는 해당 노드보다 작은 값, 오른쪽 노드는 해당 노드보다 큰 값을 가진다.

<img src="https://www.mathwarehouse.com/programming/images/binary-search-tree/binary-search-tree-insertion-animation.gif" />

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

### 이진 탐색 트리의 장점과 주요 용도

- 주요 용도: 데이터 검색(탐색)
- 장점: 탐색 속도를 개선할 수 있음

> 단점은 이진 탐색 트리 알고리즘을 이해한 후에 살펴보기로 한다.

### 이진 트리와 정렬된 배열 간의 탐색 비교

<img src="https://www.mathwarehouse.com/programming/images/binary-search-tree/binary-search-tree-sorted-array-animation.gif" />

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

**정리**

- 트리는 브랜치와 노드로 구성되며 사이클을 갖지 않는 자료구조이다.
- 이진 트리는 거기에 더해 브랜치(노드)가 가질 수 있는 최대 노드 개수가 2개이다.
- 이진 탐색 트리는 하나 더 붙여서, 브랜치를 만들 때 작은 값은 왼쪽, 큰 값은 오른쪽에 둔다.
- 실제 데이터 탐색 시, 값이 작은지 큰지에 따라 한쪽으로만 내려가므로 빠른 탐색이 가능하다.

### 이진 탐색 트리 삭제

매우 복잡하므로 **경우를 나누어서 이해하는 것이 좋다.**

#### Leaf Node 삭제

- Leaf Node: Child Node가 없는 Node
- 삭제할 Node의 Parent Node가 삭제할 Node를 가리키지 않도록 한다.

<img src="http://www.fun-coding.org/00_Images/tree_remove_leaf.png" width="800" />

#### Child Node가 하나인 Node 삭제

- 삭제할 Node의 Parent Node가, 삭제할 Node의 Child Node를 가리키도록 한다.

<img src="http://www.fun-coding.org/00_Images/tree_remove_1child.png" width="800" />

#### Child Node가 두 개인 Node 삭제

![두 자식을 가진 노드 삭제 — 전략1](/assets/20211003_123458.png)

1. **삭제할 Node의 오른쪽 자식 중 가장 작은 값을, 삭제할 Node의 Parent Node가 가리키도록 한다.**

![두 자식을 가진 노드 삭제 — 전략2](/assets/20211003_123555.png)

2. 삭제할 Node의 왼쪽 자식 중 가장 큰 값을, 삭제할 Node의 Parent Node가 가리키도록 한다.

<img src="http://www.fun-coding.org/00_Images/tree_remove_2child.png" width="800" />

이렇게 하면 우측 그림처럼 트리의 형태가 깨지지 않는다.

![두 자식을 가진 노드 삭제 결과](/assets/20211003_123811.png)

**삭제할 Node의 오른쪽 자식 중 가장 작은 값을 Parent Node가 가리키게 할 경우** (이런 식으로 복잡한 문제를 만났을 때 divide and conquer로 해결해나가면 된다.)

- 삭제할 Node의 오른쪽 자식을 선택한다.
- 오른쪽 자식의 가장 왼쪽에 있는 Node를 선택한다.
- 해당 Node를, 삭제할 Node의 Parent Node의 왼쪽 Branch가 가리키게 한다.
- 해당 Node의 왼쪽 Branch가, 삭제할 Node의 왼쪽 Child Node를 가리키게 한다.
- 해당 Node의 오른쪽 Branch가, 삭제할 Node의 오른쪽 Child Node를 가리키게 한다.
- 만약 해당 Node가 오른쪽 Child Node를 가지고 있었다면, 해당 Node의 본래 Parent Node의 왼쪽 Branch가 그 오른쪽 Child Node를 가리키게 한다.

> 프로그래밍에서 가장 많이 쓰는 알고리즘이 divide and conquer이다. 복잡한 문제를 만나도 각각의 문제를 잘게 쪼개서 해결하자. 다만 코드로 구현하기는 어렵고, 면접에서 설명하거나 실제로 만들기는 쉽지 않다.

---

### 이진 탐색 트리 삭제 코드 구현과 분석

#### 삭제할 Node 탐색

- 삭제할 Node가 없는 경우도 처리해야 한다.
  - 이를 위해, 삭제할 Node가 없으면 False를 리턴하고 함수를 종료시킨다.

```
# def delete(self, value):
    searched = False
    self.current_node = self.head
    self.parent = self.head
    while self.current_node:
        if self.current_node.value == value: #current 노드가 value인지 보고 value면 바로 끝남(찾았으니까)
            searched = True#true로 바꾸고 반복문 탈출
            break
        elif value < self.current_node.value:#만약 노드에서 삭제할 노드가 아니라면 찾아야
            self.parent = self.current_node
            self.current_node = self.current_node.left
        else: #그렇지 않다면 같거나 크다
            self.parent = self.current_node
            self.current_node = self.current_node.right

    if searched == False:#이 구문을 뛰어 넘어서 이 구문 실행할 상황이 오면
        return False

    ### 이후부터 Case들을 분리해서, 코드 작성

```

#### Case1: 삭제할 Node가 Leaf Node인 경우

<img src="http://www.fun-coding.org/00_Images/tree_remove_leaf_code.png" width="600" />

```
# self.current_node 가 삭제할 Node, self.parent는 삭제할 Node의 Parent Node인 상태
    if  self.current_node.left == None and self.current_node.right == None:
        if value < self.parent.value:
            self.parent.left = None#Parent의 입장에서 보는거(작다면 self.parent의 좌측이 none이 되어야)
        else:
            self.parent.right = None
        del self.current_node#

```

#### Case2: 삭제할 Node가 Child Node를 한 개 가지고 있을 경우

<img src="http://www.fun-coding.org/00_Images/tree_remove_1child_code.png" width="400" />

```
if self.current_node.left != None and self.current_node.right == None:
    if value < self.parent.value:#왼쪽에 존재하는거 지우고 그럼 그 노드 아래(자식노드)주소 가리키게 해야 그럼 그 자식노드가 루트노드 바라보게 해야한다
        self.parent.left = self.current_node.left
    else:#이건 반대로 오른쪽일때(삭제되는 노드가)
        self.parent.right = self.current_node.left
elif self.current_node.left == None and self.current_node.right != None:
    #이 경우는 오른쪽에만 노드가 존재하는 경우다.
    if value < self.parent.value:
        self.parent.left = self.current_node.right
    else:
        self.parent.right = self.current_node.right

```

참고: `self.current_node`가 삭제할 Node, `self.parent`가 삭제할 Node의 Parent Node인 상태

```
    if  self.current_node.left == None and self.current_node.right == None:
        if value < self.parent.value:
            self.parent.left = None#Parent의 입장에서 보는거(작다면 self.parent의 좌측이 none이 되어야)
        else:
            self.parent.right = None
        del self.current_node#
```

#### Case3-1: 삭제할 Node가 Child Node 두 개를 가지고 있을 경우 (삭제할 Node가 Parent Node 왼쪽에 있을 때)

삭제할 노드가 부모 노드의 왼쪽에 있느냐 오른쪽에 있느냐에 따라 삭제 방법이 또 갈린다.

**기본 사용 가능 전략**

1. **삭제할 Node의 오른쪽 자식 중 가장 작은 값을, 삭제할 Node의 Parent Node가 가리키도록 한다.**
2. 삭제할 Node의 왼쪽 자식 중 가장 큰 값을, 삭제할 Node의 Parent Node가 가리키도록 한다.

이 중 1번 전략을 사용하여 코드를 구현하기로 한다. 이때 경우의 수가 다시 두 가지로 나뉜다.

- **Case3-1-1:** 삭제할 Node가 Parent Node의 왼쪽에 있고, 삭제할 Node의 오른쪽 자식 중 가장 작은 값을 가진 Node의 Child Node가 없을 때
- **Case3-1-2:** 삭제할 Node가 Parent Node의 왼쪽에 있고, 삭제할 Node의 오른쪽 자식 중 가장 작은 값을 가진 Node의 오른쪽에 Child Node가 있을 때
  - 가장 작은 값을 가진 Node의 Child Node가 왼쪽에 있을 경우는 없다. 왼쪽 Node가 있다는 것은 해당 Node보다 더 작은 값을 가진 Node가 있다는 뜻이기 때문이다.

<img src="http://www.fun-coding.org/00_Images/tree_remove_2child_code_left.png" width="600" />

```
if self.current_node.left != None and self.current_node.right != None: # case3
    if value < self.parent.value: # case3-1
        self.change_node = self.current_node.right
        self.change_node_parent = self.current_node.right
        while self.change_node.left != None:
            self.change_node_parent = self.change_node
            self.change_node = self.change_node.left
        if self.change_node.right != None:
            self.change_node_parent.left = self.change_node.right
        else:
            self.change_node_parent.left = None
        self.parent.left = self.change_node
        self.change_node.right = self.current_node.right
        self.change_node.left = self.change_node.left

```

#### Case3-2: 삭제할 Node가 Child Node 두 개를 가지고 있을 경우 (삭제할 Node가 Parent Node 오른쪽에 있을 때)

**기본 사용 가능 전략**

1. **삭제할 Node의 오른쪽 자식 중 가장 작은 값을, 삭제할 Node의 Parent Node가 가리키도록 한다.**
2. 삭제할 Node의 왼쪽 자식 중 가장 큰 값을, 삭제할 Node의 Parent Node가 가리키도록 한다.

이 중 1번 전략을 사용하여 코드를 구현하기로 한다. 이때 경우의 수가 다시 두 가지로 나뉜다.

- **Case3-2-1:** 삭제할 Node가 Parent Node의 오른쪽에 있고, 삭제할 Node의 오른쪽 자식 중 가장 작은 값을 가진 Node의 Child Node가 없을 때
- **Case3-2-2:** 삭제할 Node가 Parent Node의 오른쪽에 있고, 삭제할 Node의 오른쪽 자식 중 가장 작은 값을 가진 Node의 오른쪽에 Child Node가 있을 때
  - 가장 작은 값을 가진 Node의 Child Node가 왼쪽에 있을 경우는 없다. 왼쪽 Node가 있다는 것은 해당 Node보다 더 작은 값을 가진 Node가 있다는 뜻이기 때문이다.

<img src="http://www.fun-coding.org/00_Images/tree_remove_2child_code_right.png" width="600" />

```
else:
    self.change_node = self.current_node.right
    self.change_node_parent = self.current_node.right
    while self.change_node.left != None:
        self.change_node_parent = self.change_node
        self.change_node = self.change_node.left
    if self.change_node.right != None:
        self.change_node_parent.left = self.change_node.right
    else:
        self.change_node_parent.left = None
    self.parent.right = self.change_node
    self.change_node.left = self.current_node.left
    self.change_node.right = self.current_node.right

```

**전체 코드**

```

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class NodeMgmt: #여기서 이진탐색 트리가 되는 것
    def __init__(self, head):
        self.head = head

    def insert(self, value):
        self.current_node = self.head
        while True:
            if value < self.current_node.value:
                if self.current_node.left != None:
                    self.current_node = self.current_node.left
                else:
                    self.current_node.left = Node(value)
                    break
            else:
                if self.current_node.right != None:
                    self.current_node = self.current_node.right
                else:
                    self.current_node.right = Node(value)
                    break

    def search(self, value):
        self.current_node = self.head
        while self.current_node:
            if self.current_node.value == value:
                return True
            elif value < self.current_node.value:
                self.current_node = self.current_node.left
            else:
                self.current_node = self.current_node.right
        return False        

    def delete(self, value):
        # 삭제할 노드 탐색
        searched = False
        self.current_node = self.head
        self.parent = self.head
        while self.current_node:
            if self.current_node.value == value:
                searched = True
                break
            elif value < self.current_node.value:
                self.parent = self.current_node
                self.current_node = self.current_node.left
            else:
                self.parent = self.current_node
                self.current_node = self.current_node.right

        if searched == False:
            return False    

        # case1
        if  self.current_node.left == None and self.current_node.right == None:
            if value < self.parent.value:
                self.parent.left = None
            else:
                self.parent.right = None

        # case2
        elif self.current_node.left != None and self.current_node.right == None:
            if value < self.parent.value:
                self.parent.left = self.current_node.left
            else:
                self.parent.right = self.current_node.left
        elif self.current_node.left == None and self.current_node.right != None:
            if value < self.parent.value:
                self.parent.left = self.current_node.right
            else:
                self.parent.right = self.current_node.right        

        # case 3
        elif self.current_node.left != None and self.current_node.right != None:
            # case3-1
            if value < self.parent.value:
                self.change_node = self.current_node.right
                self.change_node_parent = self.current_node.right
                while self.change_node.left != None:
                    self.change_node_parent = self.change_node
                    self.change_node = self.change_node.left
                if self.change_node.right != None:
                    self.change_node_parent.left = self.change_node.right
                else:
                    self.change_node_parent.left = None
                self.parent.left = self.change_node
                self.change_node.right = self.current_node.right
                self.change_node.left = self.change_node.left
            # case 3-2
            else:
                self.change_node = self.current_node.right
                self.change_node_parent = self.current_node.right
                while self.change_node.left != None:
                    self.change_node_parent = self.change_node
                    self.change_node = self.change_node.left
                if self.change_node.right != None:
                    self.change_node_parent.left = self.change_node.right
                else:
                    self.change_node_parent.left = None
                self.parent.right = self.change_node
                self.change_node.right = self.current_node.right
                self.change_node.left = self.current_node.left

        return True

```

사실 각 케이스마다 테스트 케이스를 만들어서 검증하는 것이 가장 좋다.

### 이진 탐색 트리의 시간 복잡도와 단점

**시간 복잡도 (탐색 시)**

이진 탐색 트리는 depth와 관련이 있다.

- depth(트리의 높이)를 h라고 표기한다면 O(h)
- n개의 노드를 가진다면 $h = log_2{n}$에 가까우므로, 시간 복잡도는 $O(log{n})$
  - 참고: 빅오 표기법에서 $log{n}$의 밑은 10이 아니라 2이다.
  - 한 번 실행할 때마다 실행할 수도 있는 명령의 50%를 제거한다는 의미이다. 즉 실행 시간을 50% 단축할 수 있다는 뜻이다.

<img src="https://www.mathwarehouse.com/programming/images/binary-search-tree/binary-search-tree-sorted-array-animation.gif" />

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

**이진 탐색 트리 단점**

- 평균 시간 복잡도는 $O(log{n})$이지만, 이는 트리가 균형 잡혀 있을 때의 값이다.
- 다음 예처럼 한쪽으로 치우쳐 구성된 경우, 최악의 경우는 링크드 리스트 등과 동일한 성능($O(n)$)을 보인다.

<img src="http://www.fun-coding.org/00_Images/worstcase_bst.png" width="300" />

최악의 경우, 위와 같은 이진 트리에서 5라는 데이터를 찾으려면 마지막까지 탐색해야 한다($O(n)$의 시간 복잡도를 가진다).

---

## 힙(Heap)

### 힙(Heap)이란?

- 힙: 데이터에서 최대값과 최소값을 빠르게 찾기 위해 고안된 완전 이진 트리(Complete Binary Tree)
  - 완전 이진 트리: 노드를 삽입할 때 최하단 왼쪽 노드부터 차례대로 삽입하는 트리

<img src="https://www.fun-coding.org/00_Images/completebinarytree.png" width=300>

**힙을 사용하는 이유**

- 배열에 데이터를 넣고 최대값/최소값을 찾으려면 O(n)이 걸린다.
- 이에 반해, 힙에 데이터를 넣고 최대값/최소값을 찾으면 $O(log n)$이 걸린다.
- 우선순위 큐와 같이 최대값 또는 최소값을 빠르게 찾아야 하는 자료구조 및 알고리즘 구현에 활용된다.

### 힙(Heap) 구조

- 힙은 최대값을 구하기 위한 구조(최대 힙, Max Heap)와 최소값을 구하기 위한 구조(최소 힙, Min Heap)로 분류할 수 있다.
- 힙은 다음 두 가지 조건을 가진 자료구조이다.
  1. 각 노드의 값은 해당 노드의 자식 노드가 가진 값보다 크거나 같다 (최대 힙의 경우).
     - 최소 힙의 경우는 각 노드의 값이 자식 노드가 가진 값보다 작거나 같다.
  2. 완전 이진 트리 형태를 가진다.

### 힙과 이진 탐색 트리의 공통점과 차이점

- 공통점: 힙과 이진 탐색 트리는 모두 이진 트리이다.
- 차이점:
  - 힙은 각 노드의 값이 자식 노드보다 크거나 같다 (Max Heap의 경우).
  - 이진 탐색 트리는 왼쪽 자식 노드의 값이 가장 작고, 그 다음 부모 노드, 그 다음 오른쪽 자식 노드 값이 가장 크다.
  - 힙은 "자식 노드에서 작은 값은 왼쪽, 큰 값은 오른쪽"이라는 이진 탐색 트리의 조건이 없다.
    - 힙의 왼쪽/오른쪽 자식 노드는 오른쪽이 클 수도, 왼쪽이 클 수도 있다.
- 이진 탐색 트리는 탐색을 위한 구조, 힙은 최대/최소값 검색을 위한 구조로 이해하면 된다.

<img src="https://www.fun-coding.org/00_Images/completebinarytree_bst.png" width="800" />

### 힙(Heap) 동작

데이터를 힙 구조에 삽입·삭제하는 과정을 그림을 통해 선명하게 이해해보자.

#### 힙에 데이터 삽입하기 - 기본 동작

- 힙은 *완전 이진 트리*이므로, 삽입할 노드는 기본적으로 왼쪽 최하단부 노드부터 채워지는 형태로 삽입된다.

<img src="https://www.fun-coding.org/00_Images/heap_ordinary.png">

#### 힙에 데이터 삽입하기 - 삽입할 데이터가 힙의 데이터보다 클 경우 (Max Heap의 예)

- 먼저 삽입된 데이터는 완전 이진 트리 구조에 맞추어 최하단부 왼쪽 노드부터 채워진다.
- 채워진 노드 위치에서, 부모 노드보다 값이 클 경우 부모 노드와 위치를 바꿔주는 작업을 반복한다(swap).

<img src="https://www.fun-coding.org/00_Images/heap_insert.png">

부모 노드와 자식 노드를 비교했을 때, 부모 노드가 자식 노드보다 크면 더 이상 바꿀 필요가 없다.

**데이터 삽입은 2단계로 진행된다.**

1. 완전 이진 트리에 맞춰서 왼쪽 자식 노드부터 채워간다.
2. 채운 후에는 그 노드의 부모 노드와 비교해서, 자식 노드가 부모 노드보다 작아질 때까지 바꿔주는 작업을 반복한다.

#### 힙의 데이터 삭제하기 (Max Heap의 예)

Max Heap은 최대값이 이미 루트 노드에 있다. 삭제 시 가장 먼저 하는 일은 루트 노드의 값을 끌어내는 것이다(보통 맨 위에 있는 것을 먼저 삭제하며, 그 아래 자식 노드들을 먼저 지우지 않는다).

루트 노드를 삭제하면 트리 구조가 유지될 수 없다. 그래서 루트 노드를 삭제하면 가장 마지막에 들어갔던 데이터(노드)를 맨 위로 올린다.

이 노드를 맨 위로 올리면 "자식 노드보다 부모 노드가 커야 한다"는 힙의 조건이 깨질 수 있다. 따라서 맨 마지막에 넣은 값을 루트 노드로 올린 뒤, 자식 노드 중 큰 값(왼쪽이 클지 오른쪽이 클지 모름)과 비교해서 큰 값을 부모 노드와 바꾼다. 바꾼 뒤에도 내려간 노드와 그 자식 노드를 비교해서, 교환이 가능하면 다시 교환한다. 이 과정을 반복해 완전 이진 트리 형태를 유지하게 만든다.

- 보통 삭제는 최상단 노드(root 노드)를 삭제하는 것이 일반적이다.
  - 힙의 용도는 최대값 또는 최소값을 root 노드에 놓아 바로 꺼내 쓸 수 있도록 하는 것이다.
- 상단 데이터 삭제 시, 가장 최하단부 왼쪽에 위치한 노드(일반적으로 가장 마지막에 추가한 노드)를 root 노드로 이동한다.
- root 노드의 값이 child node보다 작을 경우, child node 중 가장 큰 값을 가진 노드와 root 노드의 위치를 바꿔주는 작업을 반복한다(swap).

<img src="https://www.fun-coding.org/00_Images/heap_remove.png">

### 힙 구현

#### 힙과 배열

- 일반적으로 힙 구현 시 배열 자료구조를 활용한다.
- 배열은 인덱스가 0번부터 시작하지만, 힙 구현의 편의를 위해 root 노드 인덱스 번호를 1로 지정하면 구현이 수월하다.
  - 부모 노드 인덱스 (parent node's index) = 자식 노드 인덱스 (child node's index) // 2
  - 왼쪽 자식 노드 인덱스 (left child node's index) = 부모 노드 인덱스 (parent node's index) * 2
  - 오른쪽 자식 노드 인덱스 (right child node's index) = 부모 노드 인덱스 (parent node's index) * 2 + 1

<img src="https://www.fun-coding.org/00_Images/heap_array.png" width=400>

#### 힙에 데이터 삽입 구현 (Max Heap 예)

**힙 클래스 구현1**

```
class Heap:
    def __init__(self, data):
        self.heap_array = list()
        self.heap_array.append(None)
        self.heap_array.append(data)

heap = Heap(1)
heap.heap_array
```

**힙 클래스 구현2 - insert1**

- 인덱스 번호는 1번부터 시작하도록 변경

<img src="https://www.fun-coding.org/00_Images/heap_ordinary.png">

```
class Heap:
    def __init__(self, data):
        self.heap_array = list()
        self.heap_array.append(None)
        self.heap_array.append(data)

    def insert(self, data):
        if len(self.heap_array) == 0:
            self.heap_array.append(None)
            self.heap_array.append(data)
            return True

        self.heap_array.append(data)#appedn가 리스트 맨 뒤에 추가
        # 그 맨끝 데이터에 4번 넣게 될 것.

        여기까지 데이터 넣었는데 5번 리스트 추가
        이걸 append로 간단하게 구현 가능
        return True           
```

**힙 클래스 구현3 - insert2**

- 삽입한 노드가 부모 노드의 값보다 클 경우, 부모 노드와 삽입한 노드 위치를 바꾼다.
- 삽입한 노드가 루트 노드가 되거나, 부모 노드보다 값이 작거나 같아질 때까지 반복한다.

특정 노드의 관련 노드 위치 알아내기

- 부모 노드 인덱스 (parent node's index) = 자식 노드 인덱스 (child node's index) // 2
- 왼쪽 자식 노드 인덱스 (left child node's index) = 부모 노드 인덱스 (parent node's index) * 2
- 오른쪽 자식 노드 인덱스 (right child node's index) = 부모 노드 인덱스 (parent node's index) * 2 + 1

<img src="https://www.fun-coding.org/00_Images/heap_insert.png">

```
class Heap:
    def __init__(self, data):
        self.heap_array = list()
        self.heap_array.append(None)
        self.heap_array.append(data)

    def move_up(self, inserted_idx):
        if inserted_idx <= 1:#이 노드가 루트노드로 갔다는 뜻
            return False#루트 노드일 땐 더이상 할게 없으므로 False반환

        parent_idx = inserted_idx // 2
        if self.heap_array[inserted_idx] > self.heap_array[parent_idx]:
            #만약 크면 그떄만 리턴해주고
            return True
        else:#아니면 False
            return False

    def insert(self, data):#이부분이 완전 이진트리에 맞춰서 배열에 데이터 넣고 append쓰면 간단히 ㄱ현가능
        if len(self.heap_array) == 0:
            self.heap_array.append(None)
            self.heap_array.append(data)
            return True

        self.heap_array.append(data)

        inserted_idx = len(self.heap_array) - 1#배열의 길이에 -1해줘야

        while self.move_up(inserted_idx):
            #부모노드에서 바꿔야 한다는 판단이 나오면
            parent_idx = inserted_idx // 2
            self.heap_array[inserted_idx], self.heap_array[parent_idx] = self.heap_array[parent_idx], self.heap_array[inserted_idx]
            #이 부분이 swap해줬다.C언어처럼 temp변수 만들어서 안 써도 가능.(갓 파이썬)
            inserted_idx = parent_idx

        return True

```

#### 힙에 데이터 삭제 구현 (Max Heap 예)

**힙 클래스 구현4 - delete1**

- 보통 삭제는 최상단 노드(root 노드)를 삭제하는 것이 일반적이다.
  - 힙의 용도는 최대값 또는 최소값을 root 노드에 놓아 바로 꺼내 쓸 수 있도록 하는 것이다.

```
class Heap:
    def __init__(self, data):
        self.heap_array = list()
        self.heap_array.append(None)
        self.heap_array.append(data)

    def pop(self):
        if len(self.heap_array) <= 1:
            return None

        returned_data = self.heap_array[1]
        return returned_data
```

**힙 클래스 구현4 - delete2**

- 상단 데이터 삭제 시, 가장 최하단부 왼쪽에 위치한 노드(일반적으로 가장 마지막에 추가한 노드)를 root 노드로 이동한다.
- root 노드의 값이 child node보다 작을 경우, child node 중 가장 큰 값을 가진 노드와 root 노드의 위치를 바꿔주는 작업을 반복한다(swap).

특정 노드의 관련 노드 위치 알아내기

- 부모 노드 인덱스 (parent node's index) = 자식 노드 인덱스 (child node's index) // 2
- 왼쪽 자식 노드 인덱스 (left child node's index) = 부모 노드 인덱스 (parent node's index) * 2
- 오른쪽 자식 노드 인덱스 (right child node's index) = 부모 노드 인덱스 (parent node's index) * 2 + 1

<img src="https://www.fun-coding.org/00_Images/heap_remove.png">

### 힙(Heap) 시간 복잡도

- depth(트리의 높이)를 h라고 표기한다면,
- n개의 노드를 가지는 heap에 데이터 삽입 또는 삭제 시, 최악의 경우 root 노드에서 leaf 노드까지 비교해야 하므로 $h = log_2{n}$에 가깝고, 시간 복잡도는 $O(log{n})$이다.
  - 참고: 빅오 표기법에서 $log{n}$의 밑은 10이 아니라 2이다.
  - 한 번 실행할 때마다 실행할 수도 있는 명령의 50%를 제거한다는 의미이다. 즉 실행 시간을 50% 단축할 수 있다는 뜻이다.
