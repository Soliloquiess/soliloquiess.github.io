#### JVM의 메모리 구조
응용프로그램이 실행되면, JVM이 시스템으로부터 리소스를 할당받는다.
그 중에는 3가지 주요 영역이 있다. Method Area, Call Stack, Heap 이다.

1) 매서드 영역(Method Area)
- 프로그램 실행 중 어떤 클래스가 사용되면, JVM은 해당 클래스의 클래스파일(*.class)을 읽어서 분석하여 클래스에 대한 정보(클래스 데이터)1를 이곳에 저장한다. 이 때, 그 클래스의 클래스변수(class variable; static 으로 선언한 변수)2도 이 영역에 함께 생성된다.


- 객체를 생성하지 않고 매서드를 호출할 수 있으려면, 매서드 앞에 static을 붙여야 한다.

- 가비지 컬렉터(Garbage collector)는 여기를 Permanent Generation 영역이라고 부른다.


2) 힙(Heap)

- 인스턴스가 생성되는 공간, 프로그램 실행 중 생성되는 인스턴스는 모두 이 곳에 생성된다. 즉, 인스턴스 변수(instance variable)들이 생성되는 공간이다.


3) 호출 스택(Call Stack 또는 Execution Stack)

- 메서드의 작업에 필요한 메모리 공간을 제공한다. 메서드가 호출되면, 호출 스택에 호출된 메서드를 위한 메모리가 할당되며, 이 메모리는 메서드가 작업을 수행하는 동안 지역변수(매개변수 포함)들과 연산의 중간결과 등을 저장하는 데 사용된다. 그리고 메서드가 작업을 마치면 할당되었던 메모리 공간은 반환되어 비워진다.

※ 질문!
(1) 아래의 C언어 소스와 자바 소스를 비교해보자.

```
#include<stdio.h>
#include<stdlib.h>

typedef struct _node {
	int a[10];
} NODE;

int main(void){
	NODE *a; // 얘는 4바이트 짜리 포인터고,
			 // 아직 값이 초기화가 안 되어서 쓰레기값을 가지고 있을 것이다.
			 // 그러나 스택에 분명히 4바이트로 메모리가 할당되어있는 지역변수다.
	a = (NODE*)calloc(1, sizeof(NODE));
		// 이렇게 calloc이 힙에 메모리를 할당하고 그 시작 주소값을 넘겨줘서 a에 저장하게 된다.
}

```

```
public class Coupang {
	private int aa; 
	private String bb;

	public Coupang(){
		aa = 0;
	}
	public int coupangFunction(){
		return aa+1;
	}
}

public class Woonge {
	public static void main(){
		Coupang a; // 이 a는 레퍼런스를 저장하는 변수이다.
				   // 그러므로 C의 포인터(위 C코드의 a)처럼 주소값의 크기만큼
				   // 스택에 메모리를 할당받은 상태여야 하는 것 아닌가?
		a = new Coupang();
				// 그리고 여기서 new 연산이 calloc 처럼 힙에 메모리를 할당하여
				// 인스턴스를 생성하고, 그 인스턴스의 레퍼런스값(=주소값)을 반환하면
				// 그 레퍼런스 값이 a에 저장되게 되는 것이다. 맞나?
		// 그리고 또 하나 재미있는 점은,
		// 이렇게 new 를 해줬을 때 생기는 String 타입의 a.bb는
		// 위에서 Coupang a;를 선언했을 때와 마찬가지로 String 타입의 레퍼런스를 저장하기위해
		// 주소값의 크기만큼 할당 된 변수라는 것이다. 그러나 아직 String 인스턴스를
		// 만들어주지 않았으므로, 여기엔 아무 것도 안 들어있어야 한다.(NULL)
		// 그리고 사실 가장 궁금한 건,
		// ★★★ 인스턴스 안에 매서드에 대한 정보는 어떤 식으로 들어있을까????? ★★★
	}
}
```

후... 시니어분께 질문에 대한 답을 들었다. ㅠㅠ

1. 위의 자바 코드에서 a는 역시 포인터가 맞다.(그러나 일반적인 8바이트보다 조금 더 클 가능성이 있다.)

2. new 연산을 통해 인스턴스를 힙에 생성하면, 인스턴스 안에 멤버 변수들은 할당이 되지만, 매서드는 할당이 되지 않는다!(나는 함수 포인터로 생성이 되어서, 매서드 영역에 있는 해당 클래스의 매서드 바이너리 코드를 바라보고 있을 줄 알았는데 이것도 아니었다!)


→ 위에서 a.coupangFunction()으로 매서드를 호출하면, JVM이 가지고 있는 클래스-매서드 테이블에 가서 Coupang 클래스의 coupangFunction() 매서드를 찾아서 위치를 알아낸다. 그리고 그 곳에 가서 '매서드 이름으로 매서드를 찾아서' 바이트 코드를 스택으로 받아온다.
......
충격적이다.

나는 당연히 함수 포인터로 구현되어 있을 줄 알았어.. ㅠㅠ

정확한 답은
https://docs.oracle.com/javase/specs/
얘가 알고 있다고 한다.


Java SE Specifications
Java Language and Virtual Machine Specifications Java SE 8 The Java Language Specification, Java SE 8 Edition HTML | PDF The Java Virtual Machine Specification, Java SE 8 Edition HTML | PDF Java SE 7 The Java Language Specification, Java SE 7 Edition HTML | PDF The Java Virtual Machine Specification
docs.oracle.com


※ 회사 동기인 준밤(Joonbam)형이 알려준 답!!

"웅아, 클래스 파일을 만들면 그 안에 테이블이 있어.
그리고 매소드를 찾을 때 인자를 받는데, 그걸 통해서 점프를 뛰고
결국은 클래스 파일 (바이트 코드에서) 내가 어디를 실행해야 하는 지를 찾는 거라서, 마치 함수 포인터 주소랑 같은 느낌으로, 자바에서는 그 위치를 찾으려고 클래스 단위의 테이블을 가지고 있는 걸로 기억해."

- 준밤(Joonbam)


----


### Call by value와 Call by reference

값에 의한 호출 방법은 인수의 값을 해당 함수의 형식 매개변수에 복사합니다. 따라서 주 함수의 매개변수에 대한 변경 사항은 인수에 영향을 미치지 않습니다.

이 매개변수 전달 방법에서 실제 매개변수의 값은 함수의 형식 매개변수에 복사되고 매개변수는 다른 메모리 위치에 저장됩니다. 따라서 함수 내부에서 변경한 사항은 호출자의 실제 매개변수에 반영되지 않습니다.

주요 차이점

- 값에 의한 호출 방식에서는 원래 값이 수정되지 않는 반면 참조에 의한 호출 방식에서는 원래 값이 수정됩니다.

- 값에 의한 호출에서는 변수의 복사본이 전달되는 반면 참조에 의한 호출에서는 변수 자체가 전달됩니다.

- 값에 의한 호출에서는 실제 및 형식 인수가 다른 메모리 위치에 생성되는 반면 참조에 의한 호출에서는 실제 및 형식 인수가 동일한 메모리 위치에 생성됩니다.

- 값에 의한 호출은 C++, PHP, Visual Basic NET 및 C#과 같은 프로그래밍 언어의 기본 방법인 반면 참조에 의한 호출은 Java 언어에서만 지원됩니다.

- 값에 의한 호출은 간단한 방법을 사용하여 변수를 전달하는 반면 참조에 의한 호출은 변수의 주소를 저장하는 데 포인터가 필요합니다.


#### call by value
값에 의한 호출

함수가 호출될 때, 메모리 공간 안에서는 함수를 위한 별도의 임시공간이 생성됩니다. (종료 시 해당 공간 사라짐)

call by value 호출 방식은 함수 호출 시 전달되는 변수 값을 복사해서 함수 인자로 전달합니다.

이때 복사된 인자는 함수 안에서 지역적으로 사용되기 때문에 local value 속성을 가집니다.

따라서, 함수 안에서 인자 값이 변경되더라도, 외부 변수 값은 변경안됩니다.

#### call by reference
참조에 의한 호출

call by reference 호출 방식은 함수 호출 시 인자로 전달되는 변수의 레퍼런스를 전달합니다.

따라서 함수 안에서 인자 값이 변경되면, 아규먼트로 전달된 객체의 값도 변경됩니다.

### 문자코드란

문자코드란 컴퓨터가 사람이 알아볼 수 있는 문자로 표시하기 위해 각 문자에 할당한 고유번호를 말합니다.

문자코드란 컴퓨터가 사람이 알아볼 수 있는 문자로 표시하기 위해 각 문자에 할당한 고유번호를 말합니다.

초창기 문자를 나타내기 위한 아스키(ASCII)코드는 알파벳, 숫자, 특수 문자 등.. 각 문자에 해당하는 고유번호를 2진수 8비트로 지정하여 표시하였습니다.
2진수 8비트란 2진수인 0과 1을 나타내는 스위치 8개로 고유번호를 할당한 것을 말합니다. 예를 들면 01101100은 A, 01101101은 B… 이런식으로 2의 8제곱( 256 )가지의 문자를 표시 할 수 있습니다.

하지만 아스키코드로 영문 알파벳, 숫자, 특수 문자 등 256가지 이내의 문자는 커버가 가능했지만 다양한 국가의 다양한 언어를 처리하기에는 256가지로는 부족하기 때문에 더 발전된 문자코드의 개발이 필요했습니다. 게다가 아시아권의 언어같은 경우는 8비트(1바이트)로는 부족해서 16비트(2바이트) 이상을 사용해야 처리가 가능했습니다.

그래서 각 나라의 언어에 맞게 CP37, ISO 8859, Windows-1250 등… 수많은 문자코드세트가 만들어 졌습니다. 한국의 경우는 EUC-KR과 CP949를 주로 사용했었고 현재도 많이 사용하고 있습니다.

하지만 문자코드에도 표준화가 필요했기 때문에 근래에는 대부분 유니코드(UTF-8, UTF-16)로 사용하는 추세입니다. 유니코드는 대부분 국가의 언어를 포함하고 있어 현재 대부분의 운영체제와 javascript, HTML, node.js등 다양한 프로그램 언어에서 기본적으로 사용되어 지고 있습니다.

#### 부제: 유니코드란 무엇인가?

컴퓨터는 이진수만 안다.

컴퓨터와 내가 문자를 입력하고 출력할 수 있도록 해주는게 바로 문자 코드다.

그리고 문자코드와 숫자를 매칭시킨 표를 문자표라고 한다.

대표적으로 아스키 코드표가 있다


##### 유니코드(unicode)

세계 모든 언어와 기호에 코드값을 부여한 것이다.

저장 효율을 위해 언어에 따라 하나의 문자를 표현하는데 1~4byte를 사용한다.

그래서 가변 길이 인코딩 방식이라고 한다.

그러다보니 유니코드들의 나열에서 어느 정도의 크기를 읽어 하나의 문자로 인식해야하는지 혼란이 생겼다.

이에 다양한 인코딩 방식이 있는데, UTF-8, UTF-16, EUC-KR 등등이 있다.

 

##### UTF-8

8Bit Unicode Transform Format

유니코드를 인코딩하는 방식으로 8비트(1byte) 단위로 가변 인코딩 한다.

유니코드의 시작 바이트를 보고, 몇 바이트를 읽을 것인지를 결정하기로 약속한다.

 

즉,

0xxxxxxx 첫번째 바이트가 0으로 시작한다면 0 이외의 7비트를 ASCII로 인식한다.

110xxxxx 10xxxxxx 두번째 바이트까지 읽어서 하나의 문자로 표현

1110xxxx 10xxxxxx 10xxxxxx 세번째 바이트까지 읽어서 하나의 문자로 표현

11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 네번째 바이트까지 읽어서 하나의 문자로 표현

 

##### EUC-KR

한글을 표현하기 위해 2byte(16bit)로 사용


