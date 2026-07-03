---
title: "[Java] Java 깊이 파기 — JVM·GC·스레드·Stream·예외처리 완전 정리"
date: 2021-11-11
category: "Java"
tags: ["Java"]
description: "Java 컴파일 과정·Call by Value·Primitive/Reference 타입·오토박싱·직렬화·String 클래스·스레드 동기화·JVM 메모리·Garbage Collection·Stream API·Record까지 면접 관점에서 정리한 노트."
permalink: "study/2021/11/11/면접-대비-언어-JAVA계열"
---

## [Java] 컴파일 과정

![Java 컴파일 과정 개요](/assets/20211121_234448.png)

### 자바 컴파일 순서

1. 개발자가 자바 소스코드(`.java`)를 작성한다.

2. **자바 컴파일러(Java Compiler)** 가 자바 소스파일을 컴파일한다. 이때 나오는 파일은 자바 바이트 코드(`.class`)로 아직 컴퓨터가 읽을 수 없는 자바 가상 머신이 이해할 수 있는 코드다. 바이트 코드의 각 명령어는 1바이트 크기의 Opcode와 추가 피연산자로 이루어져 있다.

3. 컴파일된 바이트 코드를 **JVM(Java Virtual Machine)** 의 클래스로더(Class Loader)에게 전달한다.

4. 클래스 로더는 **동적로딩(Dynamic Loading)** 을 통해 필요한 클래스들을 로딩 및 링크하여 런타임 데이터 영역(Runtime Data area), 즉 JVM의 메모리에 올린다.

#### 클래스 로더 세부 동작

| 단계 | 설명 |
|------|------|
| **로드** | 클래스 파일을 가져와서 JVM의 메모리에 로드 |
| **검증** | 자바 언어 명세(Java Language Specification) 및 JVM 명세에 명시된 대로 구성되어 있는지 검사 |
| **준비** | 클래스가 필요로 하는 메모리를 할당 (필드, 메서드, 인터페이스 등) |
| **분석** | 클래스의 상수 풀 내 모든 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경 |
| **초기화** | 클래스 변수들을 적절한 값으로 초기화 (static 필드) |

5. **실행엔진(Execution Engine)** 은 JVM 메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 가져와서 실행한다. 두 가지 방식으로 변경한다.

| 방식 | 설명 |
|------|------|
| **인터프리터** | 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행. 하나하나의 실행은 빠르나 전체적인 실행 속도가 느리다는 단점 |
| **JIT 컴파일러 (Just-In-Time Compiler)** | 인터프리터의 단점을 보완. 바이트 코드 전체를 컴파일하여 바이너리 코드로 변경하고 이후에는 해당 메서드를 더이상 인터프리팅하지 않고 바이너리 코드로 직접 실행. 전체적인 실행속도가 더 빠름 |

---

## Call by Value와 Call by Reference

### Call by Value — 값에 의한 호출

함수가 호출될 때, 메모리 공간 안에서는 함수를 위한 별도의 임시공간이 생성된다. (종료 시 해당 공간 사라짐)

함수 호출 시 전달되는 변수 값을 복사해서 함수 인자로 전달한다. 복사된 인자는 함수 안에서 지역적으로 사용되기 때문에 local value 속성을 가진다.

**따라서, 함수 안에서 인자 값이 변경되더라도 외부 변수 값은 변경되지 않는다.**

```java
void func(int n) {
    n = 20;
}

void main() {
    int n = 10;
    func(n);
    printf("%d", n);
}
```

`printf`로 출력되는 값은 그대로 **10**이 출력된다.

### Call by Reference — 참조에 의한 호출

함수 호출 시 인자로 전달되는 변수의 **레퍼런스**를 전달한다. 따라서 함수 안에서 인자 값이 변경되면, 아규먼트로 전달된 객체의 값도 변경된다.

```java
void func(int *n) {
    *n = 20;
}

void main() {
    int n = 10;
    func(&n);
    printf("%d", n);
}
```

`printf`로 출력되는 값은 **20**이 된다.

### Java의 함수 호출 방식

~~자바의 경우, 함수에 전달되는 인자의 데이터 타입에 따라 함수 호출 방식이 달라짐~~

~~primitive type(원시 자료형) : call by value~~

~~reference type(참조 자료형) : call by reference~~

**자바의 경우, 항상 call by value로 값을 넘긴다.**

C/C++와 같이 변수의 주소값 자체를 가져올 방법이 없으며, 이를 넘길 수 있는 방법 또한 없다. reference type(참조 자료형)을 넘길 시에는 해당 객체의 주소값을 복사하여 이를 가지고 사용한다.

따라서 **원본 객체의 프로퍼티까지는 접근이 가능하나, 원본 객체 자체를 변경할 수는 없다.**

```java
User a = new User("gyoogle");   // 1

foo(a);

public void foo(User b){        // 2
    b = new User("jongnan");    // 3
}

/*
==========================================

// 1 : a에 User 객체 생성 및 할당(새로 생성된 객체의 주소값을 가지고 있음)

 a   -----> User Object [name = "gyoogle"]

==========================================

// 2 : b라는 파라미터에 a가 가진 주소값을 복사하여 가짐

 a   -----> User Object [name = "gyoogle"]
               ↑     
 b   -----------

==========================================

// 3 : 새로운 객체를 생성하고 새로 생성된 주소값을 b가 가지며 a는 그대로 원본 객체를 가리킴

 a   -----> User Object [name = "gyoogle"]

 b   -----> User Object [name = "jongnan"]

*/
```

C/C++와 Java에서 변수를 할당하는 방식 비교:

```c
// c/c++

 int a = 10;
 int b = a;

 cout << &a << ", " << &b << endl; // out: 0x7ffeefbff49c, 0x7ffeefbff498

 a = 11;

 cout << &a << endl; // out: 0x7ffeefbff49c
```

java:
```java
 int a = 10;
 int b = a;

 System.out.println(System.identityHashCode(a));    // out: 1627674070
 System.out.println(System.identityHashCode(b));    // out: 1627674070

 a = 11;

 System.out.println(System.identityHashCode(a));    // out: 1360875712
```

C/C++에서는 생성한 변수마다 새로운 메모리 공간을 할당하고 값을 덮어씌우는 형식으로 값을 할당한다. Java에서도 생성한 변수마다 새로운 메모리 공간을 갖는 것은 마찬가지지만, 그 메모리 공간에 값 자체를 저장하는 것이 아니라 **값을 다른 메모리 공간에 할당하고 이 주소값을 저장**하는 것이다.

```java
C/C++          |        Java
               |
a -> [ 10 ]    |   a -> [ XXXX ]     [ 10 ] -> XXXX(위치)
b -> [ 10 ]    |   b -> [ XXXX ]
               |
            값 변경
a -> [ 11 ]    |   a -> [ YYYY ]     [ 10 ] -> XXXX(위치)
b -> [ 10 ]    |   b -> [ XXXX ]     [ 11 ] -> YYYY(위치)
```

즉, Java에서의 변수는 [할당된 값의 위치]를 [값]으로 가지고 있는 것이다.

### 정리

| 방식 | 장점 | 단점 |
|------|------|------|
| **Call by Value** | 원본 데이터가 변경될 가능성이 없다 | 인자를 넘겨줄 때마다 메모리 공간을 할당해야 해서 메모리를 더 잡아먹는다 |
| **Call by Reference** | 메모리 공간 할당 문제를 해결 | 원본 값이 변경될 수 있다는 위험이 존재 |

- 출처 : Is Java "pass-by-reference" or "pass-by-value"? - Stack Overflow

---

## Primitive Type & Reference Type

### Java 데이터 타입 분류

```java
Java Data Type
ㄴ Primitive Type
    ㄴ Boolean Type(boolean)
    ㄴ Numeric Type
        ㄴ Integral Type
            ㄴ Integer Type(short, int, long)
            ㄴ Floating Point Type(float, double)
        ㄴ Character Type(char)
ㄴ Reference Type
    ㄴ Class Type
    ㄴ Interface Type
    ㄴ Array Type
    ㄴ Enum Type
    ㄴ etc.
```

### Primitive Type (기본형 타입)

- Java에서는 총 8가지의 Primitive type을 미리 정의하고 제공한다.
- 자바에서 기본 자료형은 반드시 사용하기 전에 선언(Declared)되어야 한다.
- OS에 따라 자료형의 길이가 변하지 않는다.
- 비객체 타입이다. 따라서 null 값을 가질 수 없다. null을 넣고 싶다면 Wrapper Class를 활용한다.
- **스택(Stack) 메모리에 저장**된다.

![Primitive Type 크기 표](/assets/20211122_002311.png)

| 타입 | 설명 |
|------|------|
| `boolean` | 기본값 false. 1bit면 충분하지만 최소 단위가 1byte이므로 메모리 크기 1byte |
| `byte` | 주로 이진데이터를 다루는데 사용 |
| `short` | C언어와의 호환을 위해 사용. 잘 사용되지 않음 |
| `int` | 자바에서 정수 연산을 하기 위한 기본 타입. byte/short 변수가 연산을 하면 결과는 int형 |
| `long` | 수치가 큰 데이터 처리. 초기화 시 정수값 뒤에 `L`을 붙여야 함 |
| `float` | 실수 부동소수점 방식. `F` 접미사 필요 |
| `double` | 실수 기본 타입. float보다 표현 가능 범위가 더 큼 |

```java
long l = 2147483648; // 컴파일 에러 발생
long l = 2147483648L;
```

```java
float f = 1234.567;  // 무조건 double 타입으로 이해하려고 하므로 컴파일 에러가 발생합니다.
float f = 1234.567F; // float type이라는 것을 표시해야 합니다.
```

### Reference Type (참조형 타입)

- Java에서 Primitive type을 제외한 타입들이 모두 Reference type이다.
- `java.lang.Object` 클래스를 상속하는 모든 클래스들을 말한다.
- `new`로 생성하는 것들은 **Heap 영역**에 생성되고, Garbage Collector가 돌면서 메모리를 해제한다.
- 클래스 타입, 인터페이스 타입, 배열 타입, 열거 타입이 있다.
- 빈 객체를 의미하는 **null**이 존재한다.
- null 값으로 받은 객체나 배열을 사용하면 런타임 시 `NullPointerException` 발생.

![Reference Type 구조](/assets/20211122_002833.png)

**String 클래스**

참조형에 속하지만 기본적인 사용은 기본형처럼 사용한다. **불변(immutable)** 객체다. String 클래스에는 값을 변경해주는 메소드들이 존재하지만, 해당 메소드를 통해 데이터를 바꾼다 해도 새로운 String 클래스 객체를 만들어내는 것이다.

일반적으로 기본형 비교는 `==` 연산자를 사용하지만 String 객체간의 비교는 `.equals()` 메소드를 사용해야 한다.

---

## [Java] 오토 박싱 & 오토 언박싱

자바에는 기본 타입과 Wrapper 클래스가 존재한다.

| 구분 | 종류 |
|------|------|
| **기본 타입** | int, long, float, double, boolean 등 |
| **Wrapper 클래스** | Integer, Long, Float, Double, Boolean 등 |

- **박싱(Boxing)**: 기본 타입 데이터에 대응하는 Wrapper 클래스로 만드는 동작
- **언박싱(Unboxing)**: Wrapper 클래스에서 기본 타입으로 변환

```java
// 박싱
int i = 10;
Integer num = new Integer(i);

// 언박싱
Integer num = new Integer(10);
int i = num.intValue();
```

JDK 1.5부터는 자바 컴파일러가 박싱과 언박싱이 필요한 상황에 자동으로 처리해준다.

```java
// 오토 박싱
int i = 10;
Integer num = i;

// 오토 언박싱
Integer num = new Integer(10);
int i = num;
```

### 성능 주의

편의성을 위해 오토 박싱과 언박싱이 제공되고 있지만, 내부적으로 추가 연산 작업이 거치게 된다.

오토 박싱 연산:

```java
public static void main(String[] args) {
    long t = System.currentTimeMillis();
    Long sum = 0L;
    for (long i = 0; i < 1000000; i++) {
        sum += i;
    }
    System.out.println("실행 시간: " + (System.currentTimeMillis() - t) + " ms");
}

// 실행 시간 : 19 ms
```

동일 타입 연산:

```java
public static void main(String[] args) {
    long t = System.currentTimeMillis();
    long sum = 0L;
    for (long i = 0; i < 1000000; i++) {
        sum += i;
    }
    System.out.println("실행 시간: " + (System.currentTimeMillis() - t) + " ms") ;
}

// 실행 시간 : 4 ms
```

100만건 기준으로 약 **5배**의 성능 차이가 난다. 따라서 서비스를 개발하면서 불필요한 오토 캐스팅이 일어나는지 확인하는 습관을 가지자.

---

## [Java] 직렬화 (Serialization)

자바 시스템 내부에서 사용되는 객체 또는 데이터를 외부의 자바 시스템에서도 사용할 수 있도록 **바이트(byte) 형태로 데이터 변환하는 기술**

각자 PC의 OS마다 서로 다른 가상 메모리 주소 공간을 갖기 때문에, Reference Type의 데이터들은 인스턴스를 전달할 수 없다. 따라서 주소값이 아닌 Byte 형태로 직렬화된 객체 데이터를 전달해야 한다.

직렬화된 데이터들은 모두 Primitive Type(기본형)이 되고, 이는 파일 저장이나 네트워크 전송 시 파싱이 가능한 유의미한 데이터가 된다.

![직렬화 개념도](/assets/20211122_003530.png)

### 직렬화 조건

`java.io.Serializable` 인터페이스 구현으로 직렬화/역직렬화가 가능하다.

- **역직렬화**: 직렬화된 데이터를 받는 쪽에서 다시 객체 데이터로 변환하기 위한 작업
- **직렬화 대상**: 인터페이스 상속 받은 객체, Primitive 타입의 데이터

**직렬화가 사용되는 상황**

- JVM에 상주하는 객체 데이터를 영속화할 때
- Servlet Session
- Cache
- Java RMI(Remote Method Invocation)

### 직렬화 구현

```java
@Entity
@AllArgsConstructor
@toString
public class Post implements Serializable {
private static final long serialVersionUID = 1L;

private String title;
private String content;
```

`serialVersionUID`를 만들어준다.

```java
Post post = new Post("제목", "내용");
byte[] serializedPost;
try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
    try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
        oos.writeObject(post);

        serializedPost = baos.toByteArray();
    }
}
```

`ObjectOutputStream`으로 직렬화를 진행한다. Byte로 변환된 값을 저장하면 된다.

역직렬화 예시:

```java
try (ByteArrayInputStream bais = new ByteArrayInputStream(serializedPost)) {
    try (ObjectInputStream ois = new ObjectInputStream(bais)) {

        Object objectPost = ois.readObject();
        Post post = (Post) objectPost;
    }
}
```

`ObjectInputStream`으로 역직렬화를 진행한다.

### serialVersionUID

선언하지 않아도 자동으로 해시값이 할당된다. 직접 설정하는 이유는 기존의 클래스 멤버 변수가 변경되면 `serialVersionUID`가 달라지는데, 역직렬화 시 달라진 넘버로 Exception이 발생될 수 있기 때문이다.

### 요약

- 데이터를 통신 상에서 전송 및 저장하기 위해 직렬화/역직렬화를 사용한다.
- `serialVersionUID`는 개발자가 직접 관리한다.
- 클래스 변경을 개발자가 예측할 수 없을 때는 직렬화 사용을 지양한다.
- 개발자가 직접 컨트롤할 수 없는 클래스(라이브러리 등)는 직렬화 사용을 지양한다.
- 자주 변경되는 클래스는 직렬화 사용을 지양한다.
- 역직렬화에 실패하는 상황에 대한 예외처리는 필수로 구현한다.
- 직렬화 데이터는 타입, 클래스 메타정보를 포함하므로 사이즈가 크다. JSON 포맷이 직렬화 데이터 포맷보다 2~10배 더 효율적이다.

---

## 문자열 클래스

| 분류 | String | StringBuffer | StringBuilder |
|------|--------|-------------|---------------|
| **변경** | Immutable | Mutable | Mutable |
| **동기화** | — | Synchronized 가능 (Thread-safe) | Synchronized 불가능 |

### 1. String 특징

- `new` 연산을 통해 생성된 인스턴스의 메모리 공간은 변하지 않음 (Immutable)
- Garbage Collector로 제거되어야 함
- 문자열 연산 시 새로 객체를 만드는 Overhead 발생
- 객체가 불변하므로, Multithread에서 동기화를 신경 쓸 필요가 없음 (조회 연산에 매우 큰 장점)

*String 클래스: 문자열 연산이 적고, 조회가 많은 멀티쓰레드 환경에서 좋음*

### 2. StringBuffer, StringBuilder 특징

**공통점**

- `new` 연산으로 클래스를 한 번만 만듦 (Mutable)
- 문자열 연산 시 새로 객체를 만들지 않고, 크기를 변경시킴
- StringBuffer와 StringBuilder 클래스의 메서드가 동일함

**차이점**

- `StringBuffer` — Thread-Safe
- `StringBuilder` — Thread-safe하지 않음

*StringBuffer 클래스: 문자열 연산이 많은 Multi-Thread 환경*

*StringBuilder 클래스: 문자열 연산이 많은 Single-Thread 또는 Thread 신경 안쓰는 환경*

---

## [Java] Object 클래스 wait, notify, notifyAll

Java의 최상위 클래스 = Object 클래스

### Object Class가 갖고 있는 주요 메서드

| 메서드 | 설명 |
|--------|------|
| `toString()` | 객체를 문자열로 변환 |
| `hashCode()` | 객체의 해시코드 반환 |
| `wait()` | 갖고 있던 고유 lock 해제, Thread를 잠들게 함 |
| `notify()` | 잠들던 Thread 중 임의의 하나를 깨움 |
| `notifyAll()` | 잠들어 있던 Thread를 모두 깨움 |

`wait`, `notify`, `notifyAll`은 호출하는 스레드가 반드시 고유 락을 갖고 있어야 한다.

- Synchronized 블록 내에서 실행되어야 한다.
- 블록 밖에서 호출하는 경우 `IllegalMonitorStateException` 발생.

---

## Casting (업캐스팅 & 다운캐스팅)

### 캐스팅이란?

> 변수가 원하는 정보를 다 갖고 있는 것

```java
int a = 0.1; // (1) 에러 발생 X
int b = (int) true; // (2) 에러 발생 O, boolean은 int로 캐스트 불가
```

- (1)은 0.1이 double형이지만, int로 될 정보 또한 가지고 있음
- (2)는 true는 int형이 될 정보를 가지고 있지 않음

### 캐스팅이 필요한 이유

1. **다형성** : 오버라이딩된 함수를 분리해서 활용할 수 있다.
2. **상속** : 캐스팅을 통해 범용적인 프로그래밍이 가능하다.

### 형변환의 종류

| 종류 | 설명 | 예시 |
|------|------|------|
| **묵시적 형변환** (업캐스팅) | 캐스팅이 자동으로 발생 | `Parent p = new Child();` |
| **명시적 형변환** (다운캐스팅) | 캐스팅할 내용을 적어줘야 하는 경우 | `Child c = (Child) p;` |

업캐스팅: Parent를 상속받은 Child는 Parent의 속성을 포함하고 있기 때문에 자동 형변환 가능.

다운캐스팅: 업캐스팅이 발생한 이후에 작용한다.

### 예시 문제

```java
class Parent {
	int age;

	Parent() {}

	Parent(int age) {
		this.age = age;
	}

	void printInfo() {
		System.out.println("Parent Call!!!!");
	}
}

class Child extends Parent {
	String name;

	Child() {}

	Child(int age, String name) {
		super(age);
		this.name = name;
	}

	@Override
	void printInfo() {
		System.out.println("Child Call!!!!");
	}

}

public class test {
    public static void main(String[] args) {
        Parent p = new Child();

        p.printInfo(); // 문제1 : 출력 결과는?
        Child c = (Child) new Parent(); //문제2 : 에러 종류는?
    }
}
```

- **문제1**: `Child Call!!!!`
  - 자바에서는 오버라이딩된 함수를 동적 바인딩하기 때문에, Parent에 담겼어도 Child의 `printInfo()` 함수를 불러오게 된다.

- **문제2**: `Runtime Error`
  - 컴파일 과정에서는 데이터형의 일치만 따진다. 프로그래머가 `(Child)`로 형변환을 해줬기 때문에 컴파일러는 문법이 맞다고 생각해서 넘어간다. 하지만 런타임 과정에서 Child 클래스에 Parent 클래스를 넣을 수 없다는 것을 알게 되고 런타임 에러가 발생한다.

---

## [Java] Thread

> 요즘 OS는 모두 멀티태스킹(Multitasking)을 지원한다.

**멀티태스킹이란?**

> 컴퓨터로 음악을 들으면서 웹서핑도 하는 것처럼, 두 가지 이상의 작업을 동시에 하는 것

실제로 동시에 처리될 수 있는 프로세스의 개수는 CPU 코어의 개수와 동일한데, 각 코어들은 아주 짧은 시간동안 여러 프로세스를 번갈아가며 처리하는 방식을 통해 동시에 동작하는 것처럼 보이게 한다.

**멀티스레딩**: 하나의 프로세스 안에 여러 개의 스레드가 동시에 작업을 수행하는 것. 스레드는 하나의 작업 단위다.

### 스레드 구현 방법

```java
public class MyThread implements Runnable {
    @Override
    public void run() {
        // 수행 코드
    }
}
```

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        // 수행 코드
    }
}
```

둘 다 `run()` 메소드를 오버라이딩하는 방식이다.

### 스레드 생성

Runnable 인터페이스를 구현한 경우는, 해당 클래스를 인스턴스화해서 Thread 생성자에 argument로 넘겨줘야 한다.

```java
public static void main(String[] args) {
    Runnable r = new MyThread();
    Thread t = new Thread(r, "mythread");
}
```

Thread 클래스를 상속받은 경우는, 상속받은 클래스 자체를 스레드로 사용할 수 있다. Thread 클래스를 상속받으면 스레드 클래스의 메소드(`getName()`)를 바로 사용할 수 있지만, Runnable 구현의 경우 `Thread.currentThread()`를 호출하여 현재 스레드에 대한 참조를 얻어와야만 호출이 가능하다.

```java
public class ThreadTest implements Runnable {
    public ThreadTest() {}

    public ThreadTest(String name){
        Thread t = new Thread(this, name);
        t.start();
    }

    @Override
    public void run() {
        for(int i = 0; i <= 50; i++) {
            System.out.print(i + ":" + Thread.currentThread().getName() + " ");
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 스레드 실행

> 스레드의 실행은 `run()` 호출이 아닌 **`start()` 호출**로 해야한다.

`run()`으로 작업 지시를 하면 스레드를 사용하는 것이 아니다.

Java에는 콜 스택(call stack)이 있다. 만약 동시에 두 가지 작업을 한다면, 두 개 이상의 콜 스택이 필요하다.

**스레드를 이용한다는 건, JVM이 다수의 콜 스택을 번갈아가며 일처리를 하고 사용자는 동시에 작업하는 것처럼 보여준다.**

`run()` 메소드를 이용한다는 것은 main()의 콜 스택 하나만 이용하는 것으로 스레드 활용이 아니다.

`start()` 메소드를 호출하면, JVM은 알아서 스레드를 위한 콜 스택을 새로 만들어주고 context switching을 통해 스레드답게 동작하도록 해준다.

***우리는 새로운 콜 스택을 만들어 작업을 해야 스레드 일처리가 되는 것이기 때문에 `start()` 메소드를 써야한다!***

### 스레드의 상태

| 상태 | 설명 |
|------|------|
| **NEW** | 스레드가 생성되고 아직 `start()`가 호출되지 않은 상태 |
| **RUNNABLE** | 실행 중 또는 실행 가능 상태 |
| **BLOCKED** | 동기화 블럭에 의해 일시정지된 상태 (lock이 풀릴 때까지 기다림) |
| **WAITING, TIME_WAITING** | 실행가능하지 않은 일시정지 상태 |
| **TERMINATED** | 스레드 작업이 종료된 상태 |

### 동기화

멀티스레드로 구현을 하다보면 동기화는 필수적이다. 여러 스레드가 같은 프로세스 내의 자원을 공유하면서 작업할 때 서로의 작업이 다른 작업에 영향을 주기 때문이다.

스레드의 동기화를 위해선, **임계 영역(critical section)** 과 **잠금(lock)** 을 활용한다.

### 스레드 동기화 방법

| 방법 | 설명 |
|------|------|
| **임계 영역 (critical section)** | 공유 자원에 단 하나의 스레드만 접근하도록 (하나의 프로세스에 속한 스레드만 가능) |
| **뮤텍스 (mutex)** | 공유 자원에 단 하나의 스레드만 접근하도록 (서로 다른 프로세스에 속한 스레드도 가능) |
| **이벤트 (event)** | 특정한 사건 발생을 다른 스레드에게 알림 |
| **세마포어 (semaphore)** | 한정된 개수의 자원을 여러 스레드가 사용하려고 할 때 접근 제한 |
| **대기 가능 타이머 (waitable timer)** | 특정 시간이 되면 대기 중이던 스레드 깨움 |

### synchronized 활용

`synchronized`를 활용해 임계영역을 설정할 수 있다.

```java
//synchronized : 스레드의 동기화. 공유 자원에 lock
public synchronized void saveMoney(int save){    // 입금
    int m = money;
    try{
        Thread.sleep(2000);    // 지연시간 2초
    } catch (Exception e){

    }
    money = m + save;
    System.out.println("입금 처리");

}

public synchronized void minusMoney(int minus){    // 출금
    int m = money;
    try{
        Thread.sleep(3000);    // 지연시간 3초
    } catch (Exception e){

    }
    money = m - minus;
    System.out.println("출금 완료");
}
```

### wait()과 notify() 활용

스레드가 서로 협력관계일 경우에는 무작정 대기시키는 것으로 올바르게 실행되지 않기 때문에 사용한다.

- `wait()` : 스레드가 lock을 가지고 있으면, lock 권한을 반납하고 대기하게 만듦
- `notify()` : 대기 상태인 스레드에게 다시 lock 권한을 부여하고 수행하게 만듦

두 메소드는 동기화된 영역(임계 영역) 내에서 사용되어야 한다.

```java
/**
* 스레드 동기화 중 협력관계 처리작업 : wait() notify()
* 스레드 간 협력 작업 강화
*/

public synchronized void makeBread(){
    if (breadCount >= 10){
        try {
            System.out.println("빵 생산 초과");
            wait();    // Thread를 Not Runnable 상태로 전환
        } catch (Exception e) {

        }
    }
    breadCount++;    // 빵 생산
    System.out.println("빵을 만듦. 총 " + breadCount + "개");
    notify();    // Thread를 Runnable 상태로 전환
}

public synchronized void eatBread(){
    if (breadCount < 1){
        try {
            System.out.println("빵이 없어 기다림");
            wait();
        } catch (Exception e) {

        }
    }
    breadCount--;
    System.out.println("빵을 먹음. 총 " + breadCount + "개");
    notify();
}
```

조건 만족 안할 시 `wait()`, 만족 시 `notify()`를 받아 수행한다.

---

## [Java] 고유 락 (Intrinsic Lock)

**Intrinsic Lock (= monitor lock = monitor)**: Java의 모든 객체는 lock을 갖고 있음.

*Synchronized 블록은 Intrinsic Lock을 이용해서, Thread의 접근을 제어한다.*

```java
public class Counter {
    private int count;

    public int increase() {
        return ++count;		// Thread-safe 하지 않은 연산
    }
}
```

`++count`는 read → modify → write 과정에서 여러 Thread가 공유 자원(count)으로 접근할 수 있으므로, 동시성 문제가 발생한다.

### Synchronized 블록을 사용한 Thread-safe Case

```java
public class Counter{
    private Object lock = new Object(); // 모든 객체가 가능 (Lock이 있음)
    private int count;

    public int increase() {
        // 단계 (1)
        synchronized(lock){	// lock을 이용하여, count 변수에의 접근을 막음
            return ++count;
        }

        /*
        단계 (2)
        synchronized(this) { // this도 객체이므로 lock으로 사용 가능
        	return ++count;
        }
        */
    }
    /*
    단계 (3)
    public synchronized int increase() {
    	return ++count;
    }
    */
}
```

### Reentrancy (재진입)

Lock을 획득한 Thread가 같은 Lock을 얻기 위해 대기할 필요가 없는 것. Lock의 획득이 **호출 단위**가 아닌 **Thread 단위**로 일어나는 것.

```java
public class Reentrancy {
    // b가 Synchronized로 선언되어 있더라도, a 진입시 lock을 획득하였음.
    // b를 호출할 수 있게 됨.
    public synchronized void a() {
        System.out.println("a");
        b();
    }

    public synchronized void b() {
        System.out.println("b");
    }

    public static void main (String[] args) {
        new Reentrancy().a();
    }
}
```

### Structured Lock vs Reentrant Lock

| 구분 | 설명 |
|------|------|
| **Structured Lock (구조적 Lock)** | 고유 lock을 이용한 동기화. Synchronized 블록 단위로 lock의 획득/해제가 일어남. A획득→B획득→B해제→A해제는 가능하지만, A획득→B획득→A해제→B해제는 불가능 |
| **Reentrant Lock (명시적 Lock)** | 위의 순서를 가능하게 하기 위해 사용 |

### Visibility (가시성)

여러 Thread가 동시에 작동하였을 때, 한 Thread가 쓴 값을 다른 Thread가 볼 수 있는지 여부.

- Structure Lock과 Reentrant Lock은 Visibility를 보장한다.
- **원인 1**: 최적화를 위해 Compiler나 CPU에서 발생하는 코드 재배열
- **원인 2**: CPU core의 cache 값이 Memory에 제때 쓰이지 않아 발생하는 문제

---

## 자바 가상 머신 (JVM, Java Virtual Machine)

**시스템 메모리를 관리하면서, 자바 기반 애플리케이션을 위해 이식 가능한 실행 환경을 제공한다.**

<br>

<img src="http://www.itworld.co.kr/sites/default/files/image/2018/09/jw_jvm_overview_3x2_1200x800-100758586-large(1).jpg">

<br>

JVM이 갖춘 기능 2가지:

1. 자바 프로그램이 어느 기기나 운영체제 상에서도 실행될 수 있도록 하는 것
2. 프로그램 메모리를 관리하고 최적화하는 것

### JVM에서의 메모리 관리

<img src="https://i.imgur.com/Vy1JC1b.png">

**실행 과정**

1. JVM은 OS로부터 프로그램에 필요한 메모리를 할당받아 용도에 따라 여러 영역으로 나누어 관리함
2. 자바 컴파일러(JAVAC)가 자바 소스코드를 읽고, 자바 바이트코드(`.class`)로 변환시킴
3. 변경된 class 파일들을 클래스 로더를 통해 JVM 메모리 영역으로 로딩함
4. 로딩된 class파일들은 Execution engine을 통해 해석됨
5. 해석된 바이트 코드는 메모리 영역에 배치되어 실질적인 수행이 이루어짐. JVM은 필요에 따라 스레드 동기화나 가비지 컬렉션 같은 메모리 관리 작업을 수행함

### Runtime Data Areas

JVM이 운영체제 위에서 실행되면서 할당받는 메모리 영역이다. 총 5가지 영역으로 나누어진다.

| 영역 | 설명 |
|------|------|
| **PC 레지스터** | 스레드가 어떤 명령어로 실행되어야 할지 기록하는 부분 (JVM 명령의 주소를 가짐) |
| **스택(Stack) Area** | 지역변수, 매개변수, 메서드 정보, 임시 데이터 등을 저장 |
| **네이티브 메서드 스택** | 실제 실행할 수 있는 기계어로 작성된 프로그램을 실행시키는 영역 |
| **힙(Heap)** | 런타임에 동적으로 할당되는 데이터가 저장되는 영역. 객체나 배열 생성. 가비지컬렉터의 대상 |
| **메서드 영역** | JVM이 시작될 때 생성. 클래스와 인터페이스에 대한 런타임 상수 풀, 필드 및 메서드 코드, 정적 변수, 메서드의 바이트 코드 등을 보관 |

힙과 메서드 영역은 모든 스레드가 공유해서 사용한다.

### 가비지 컬렉션 (Garbage Collection)

자바 이전에는 프로그래머가 모든 프로그램 메모리를 관리했다. 하지만 자바에서는 JVM이 프로그램 메모리를 관리한다.

GC는 자바 프로그램에서 사용되지 않는 메모리를 지속적으로 찾아내서 제거한다.

**실행순서**: 참조되지 않은 객체들을 탐색 후 삭제 → 삭제된 객체의 메모리 반환 → 힙 메모리 재사용

---

## Garbage Collection

**GC의 메모리 해제 과정을 3단계로 이해하자.**

GC를 알기 전에 **'stop-the-world'** 라는 용어를 알아야 한다. GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것이다. 어떤 GC 알고리즘을 사용하더라도 stop-the-world는 발생하며, 대개의 경우 GC 튜닝은 이 시간을 줄이는 것이다.

### GC의 메모리 해제 과정

**1. Marking**

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-001.png">

GC가 메모리가 사용되는지 아닌지를 찾아낸다. 참조되는 객체는 파란색, 참조되지 않는 객체는 주황색으로 표시된다. 모든 오브젝트를 스캔하기 때문에 매우 많은 시간을 소모한다.

**2. Normal Deletion**

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-002.png">

참조되지 않는 객체를 제거하고, 메모리를 반환한다. 메모리 Allocator는 반환되어 비어진 블럭의 참조 위치를 저장해 두었다가 새로운 오브젝트가 선언되면 할당되도록 한다.

**3. Compacting**

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-003.png">

퍼포먼스를 향상시키기 위해, 참조되지 않는 객체를 제거하고 남은 참조되는 객체들을 묶는다. 이들을 묶음으로써 공간이 생기므로 새로운 메모리 할당 시에 더 쉽고 빠르게 진행할 수 있다.

### Weak Generational Hypothesis

신규로 생성한 객체의 대부분은 금방 사용하지 않는 상태가 되고, 오래된 객체에서 신규 객체로의 참조는 매우 적게 존재한다는 가설이다.

이 가설에 기반하여 자바는 **Young 영역**과 **Old 영역**으로 메모리를 분할한다.

### Generational Garbage Collection

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-006.png">

| 영역 | 설명 |
|------|------|
| **Young 영역 (Young Generation)** | 새롭게 생성한 객체의 대부분이 위치. 많은 객체가 Young 영역에 생성되었다가 사라짐. 이 영역에서 객체가 사라질 때 **Minor GC** 발생 |
| **Old 영역 (Old Generation)** | Young 영역에서 살아남은 객체가 복사됨. 대부분 Young 영역보다 크게 할당. 이 영역에서 객체가 사라질 때 **Major GC (Full GC)** 발생 |
| **Permanent 영역 (Method Area)** | JVM이 클래스들과 메소드들을 설명하기 위해 필요한 메타데이터들을 포함. JDK8부터는 PermGen이 Metaspace로 교체됨 |

### Generational Garbage Collection 과정

1. 새로운 객체가 들어오면 **Eden Space**에 할당

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-007.png">

2. Eden space가 가득 차게 되면, **Minor GC** 시작

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-008.png">

3. 참조되는 객체들은 첫 번째 survivor(S0)로 이동, 비 참조 객체는 Eden space가 clear 될 때 반환

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-009.png">

4. 다음 Minor GC 때, 참조 객체는 두 번째 survivor space(S1)로 이동. S0에서 이동된 객체들도 age가 증가하고 S1 공간으로 이동. S0와 Eden 공간은 Clear

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-010.png">

5. 다음 Minor GC 때, survivor space들이 switch. 참조되는 객체들은 S0로 이동. Eden과 S1 공간은 Clear

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-011.png">

6. Minor GC 후 aged 오브젝트들이 일정한 age threshold를 넘게 되면 Young generation에서 Old로 **promotion**

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-012.png">

7. Minor GC가 계속되고 계속해서 객체들이 Old Generation으로 이동

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-013.png">

8. 결국 **Major GC**가 Old Generation에 시행되고, Old Generation은 Clear되고 공간이 Compact

   <img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-014.png">

이외에도 정말 많은 내용이 있지만, GC의 개념과 작동원리를 간단하게 알아보았다. 개발자 기술 면접에서도 종종 나오니 확실하게 학습해두면 도움이 많이 될 것이다.

#### [참고 자료]

- [링크](https://d2.naver.com/helloworld/1329)
- [링크](https://118k.tistory.com/817)
- [링크](https://advenoh.tistory.com/14)
- [링크](https://itmining.tistory.com/24#recentComments)

---

## Error & Exception

**Error**는 컴파일 시 문법적인 오류와 런타임 시 널포인트 참조와 같은 오류로 프로세스에 심각한 문제를 야기시켜 프로세스를 종료시킬 수 있다.

**Exception**은 컴퓨터 시스템의 동작 도중 예기치 않았던 이상 상태가 발생하여 수행 중인 프로그램이 영향을 받는 것이다.

| 구분 | 설명 |
|------|------|
| **Error** | 메모리 부족이나 스택오버플로우와 같이 발생하면 복구할 수 없는 심각한 오류 |
| **Exception** | 발생하더라도 수습할 수 있는 비교적 덜 심각한 오류. 프로그래머가 적절히 코드를 작성해주면 비정상적인 종류를 막을 수 있다 |

### Exception Handling

잘못된 하나로 인해 전체 시스템이 무너지는 결과를 방지하기 위한 기술적인 처리.

**예외가 주로 발생하는 원인**

- 사용자의 잘못된 데이터 입력
- 잘못된 연산
- 개발자가 로직을 잘못 작성
- 하드웨어, 네트워크 오작동
- 시스템 과부하

### Throwable 클래스

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-error-exception-001.png">

Throwable 클래스는 예외처리를 할 수 있는 최상위 클래스다. Exception과 Error는 Throwable의 상속을 받는다.

### Error (에러)

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-error-exception-003.png">

Error는 시스템 레벨에서 발생하여, 개발자가 어떻게 조치할 수 없는 수준을 의미한다.

- **OutOfMemoryError**: JVM에 설정된 메모리의 한계를 벗어난 상황. 힙 사이즈 부족, 너무 많은 class 로드, 가용가능한 swap 없음, 큰 메모리의 native메소드 호출 등이 원인.

### Exception (예외)

<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-error-exception-002.png">

예외는 개발자가 구현한 로직에서 발생하며 개발자가 다른 방식으로 처리 가능한 것들로 JVM은 정상 동작한다.

### Exception의 2가지 종류

| 종류 | 설명 |
|------|------|
| **Checked Exception** | 예외처리가 필수이며, 처리하지 않으면 컴파일되지 않음. JVM 외부와 통신(네트워크, 파일시스템 등)할 때 주로 쓰임. IOException, SQLException 등 |
| **Unchecked Exception** | 컴파일 때 체크되지 않고, Runtime에 발생하는 Exception. NullPointerException, IndexOutOfBoundException 등 |

### 대표적인 Exception Class

| Exception | 설명 |
|-----------|------|
| `NullPointerException` | Null 레퍼런스를 참조할 때 발생 |
| `IndexOutOfBoundsException` | 배열과 유사한 자료구조에서 범위를 벗어난 인덱스 번호 사용 |
| `FormatException` | 문자열, 숫자, 날짜 변환 시 잘못된 데이터로 발생 |
| `ArithmeticException` | 정수를 0으로 나눌 때 발생 |
| `ClassCastException` | 변환할 수 없는 타입으로 객체를 변환할 때 발생 |
| `IllegalArgumentException` | 잘못된 인자 전달 시 발생 |
| `IOException` | 입출력 동작 실패 또는 인터럽트 시 발생 |
| `IllegalStateException` | 객체의 상태가 메소드 호출에 부적절한 경우 |
| `ConcurrentModificationException` | 금지된 곳에서 객체를 동시에 수정하는 것이 감지될 경우 |
| `UnsupportedOperationException` | 객체가 메소드를 지원하지 않는 경우 |

### 주요 Method

| 메서드 | 설명 |
|--------|------|
| `printStackTrace()` | 발생한 Exception의 출처를 메모리상에서 추적하면서 결과를 알려줌. void를 반환 |
| `getMessage()` | 한줄로 요약된 메세지를 String으로 반환 |
| `getStackTrace()` | StackTraceElement[] 문자열 배열로 변경해서 출력하고 저장 (JDK1.4 이상) |

### Exception Handling 방법

1. **try ~ catch** : 예외에 대한 최종적인 책임을 지고 직접 처리
2. **throws Exception** : 발생한 예외의 책임을 호출하는 쪽이 책임지도록 위임 (다른 메소드의 일부분으로 동작하는 경우 권장)

**예외 던지기 (throws 구문)**

```java
public class ThrowsEx {
    public void call_A() throws Exception {
        call_B();
    }

    private void call_B() throws Exception {
        call_C();
    }

    private void call_C() throws Exception {
        System.out.println(1 / 0);
    }

    public static void main(String[] args) throws Exception {
        ThrowsEx test = new ThrowsEx();
        test.call_A();
    }
}
```

실행 결과:

```java
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at exception.ThrowsEx.call_C(ThrowsEx.java:13)
    at exception.ThrowsEx.call_B(ThrowsEx.java:9)
    at exception.ThrowsEx.call_A(ThrowsEx.java:5)
    at exception.ThrowsEx.main(ThrowsEx.java:18)
```

#### [참고 자료]

- [링크](https://drcarter.tistory.com/153)
- [링크](https://movefast.tistory.com/12?category=765934)
- [링크](https://sjh836.tistory.com/122)

---

## Java Stream

> Java 8버전 이상부터는 Stream API를 지원한다.

자바에서도 8버전 이상부터 람다를 사용한 함수형 프로그래밍이 가능해졌다.

기존에 존재하던 Collection과 Stream의 차이는 **데이터 계산 시점**이다.

| 구분 | 설명 |
|------|------|
| **Collection** | 모든 값을 메모리에 저장하는 자료구조. Collection에 추가하기 전에 미리 계산이 완료되어 있어야 한다. 외부 반복을 통해 사용자가 직접 반복 작업을 거쳐 요소를 가져올 수 있다(for-each) |
| **Stream** | 요청할 때만 요소를 계산한다. 내부 반복을 사용하므로 추출 요소만 선언해주면 알아서 반복 처리를 진행한다. 스트림에 요소를 따로 추가 혹은 제거하는 작업은 불가능하다 |

> Collection은 핸드폰에 음악 파일을 미리 저장하여 재생하는 플레이어라면, Stream은 필요할 때 검색해서 듣는 멜론과 같은 음악 앱이라고 생각하면 된다.

### 외부 반복 & 내부 반복

**성능 면에서는 내부 반복**이 비교적 좋다. 내부 반복은 작업을 병렬 처리하면서 최적화된 순서로 처리해준다. Collection에서 병렬성을 이용하려면 직접 `synchronized`를 통해 관리해야만 한다.

<img src="https://media.vlpt.us/images/adam2/post/5ecab89a-4c60-4ba6-bc36-3a58915d8b1b/image.png" width="500">

### Stream 연산

스트림은 연산 과정이 **'중간'** 과 **'최종'** 으로 나누어진다.

`filter, map, limit` 등 파이프라이닝이 가능한 연산을 중간 연산, `count, collect` 등 스트림을 닫는 연산을 최종 연산이라고 한다.

중간 연산들은 모두 한꺼번에 병합하여 연산을 처리한 다음 최종 연산에서 한꺼번에 처리하게 된다.

예시) Item 중에 가격이 1000 이상인 이름을 5개 선택한다.

```java
List<String> items = item.stream()
    		.filter(d->d.getPrices()>=1000)
                      .map(d->d.getName())
                      .limit(5)
                      .collect(tpList());
```

> filter와 map은 다른 연산이지만, 한 과정으로 병합된다.

### Stream 중간 연산

| 연산 | 설명 |
|------|------|
| `filter(Predicate)` | Predicate를 인자로 받아 true인 요소를 포함한 스트림 반환 |
| `distinct()` | 중복 필터링 |
| `limit(n)` | 주어진 사이즈 이하 크기를 갖는 스트림 반환 |
| `skip(n)` | 처음 요소 n개 제외한 스트림 반환 |
| `map(Function)` | 매핑 함수의 result로 구성된 스트림 반환 |
| `flatMap()` | 스트림의 콘텐츠로 매핑. map과 달리 평면화된 스트림 반환 |

### Stream 최종 연산

| 연산 | 설명 |
|------|------|
| `allMatch(Predicate)` | 모든 스트림 요소가 Predicate와 일치하는지 검사 |
| `anyMatch(Predicate)` | 하나라도 일치하는 요소가 있는지 검사 |
| `noneMatch(Predicate)` | 매치되는 요소가 없는지 검사 |
| `findAny()` | 현재 스트림에서 임의의 요소 반환 |
| `findFirst()` | 스트림의 첫번째 요소 |
| `reduce()` | 모든 스트림 요소를 처리해 값을 도출 |
| `collect()` | 스트림을 reduce하여 list, map, 정수 형식 컬렉션을 만듦 |
| `forEach()` | 스트림 각 요소를 소비하며 람다 적용 |
| `count` | 스트림 요소 개수 반환 |

### Optional 클래스

값의 존재나 여부를 표현하는 컨테이너 Class.

- null로 인한 버그를 막을 수 있는 장점이 있다.
- `isPresent()` — Optional이 값을 포함할 때 True 반환

### Stream 활용 예제

1. `map()`

   ```java
   List<String> names = Arrays.asList("Sehoon", "Songwoo", "Chan", "Youngsuk", "Dajung");

   names.stream()
       .map(name -> name.toUpperCase())
       .forEach(name -> System.out.println(name));
   ```

2. `filter()`

   ```java
   List<String> startsWithN = names.stream()
       .filter(name -> name.startsWith("S"))
       .collect(Collectors.toList());
   ```

3. `reduce()`

   ```java
   Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
   Optional<Integer> sum = numbers.reduce((x, y) -> x + y);
   sum.ifPresent(s -> System.out.println("sum: " + s));
   ```

   > sum : 55

4. `collect()`

   ```java
   System.out.println(names.stream()
                      .map(String::toUpperCase)
                      .collect(Collectors.joining(", ")));
   ```

#### [참고자료]

- [링크](https://velog.io/@adam2/JAVA8%EC%9D%98-%EC%8A%A4%ED%8A%B8%EB%A6%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)
- [링크](https://sehoonoverflow.tistory.com/26)

---

## [Java] Record

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdgOUBE%2FbtqD9u258Y0%2FV8ICQnAgbwpSJnXL6qkfd1%2Fimg.jpg" width="400">

```
Java 14에서 프리뷰로 도입된 클래스 타입
순수히 데이터를 보유하기 위한 클래스
```

Java 14버전부터 도입되고 16부터 정식 스펙에 포함된 Record는 class처럼 타입으로 사용이 가능하다.

객체를 생성할 때 보통 아래와 같이 개발자가 만들어야 한다.

```java
public class Person {
   private final String name;
   private final int age;

   public Person(String name, int age) {
      this.name = name;
      this.age = age;
   }

   public String getName() {
      return name;
   }

   public int getAge() {
      return age;
   }
}
```

이를 Record 타입의 클래스로 만들면 상당히 단순해진다.

```java
public record Person(
	String name,
    int age
) {}
```

자동으로 필드를 `private final`로 선언하여 만들어주고, **생성자**와 **getter**까지 암묵적으로 생성된다. 또한 `equals`, `hashCode`, `toString`도 자동으로 생성된다.

단, getter 메소드의 경우 구현 시 `getXXX()`로 명칭을 짓지만, 자동으로 만들어지는 메소드는 `name()`, `age()`와 같이 **필드명**으로 생성된다.

#### [참고 자료]

- [링크](https://coding-start.tistory.com/355)
