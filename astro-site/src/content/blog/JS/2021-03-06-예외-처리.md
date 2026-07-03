---
title: "[JS] 예외 처리(try/catch/finally)"
date: 2021-03-06
category: "JS"
tags: ["JS"]
description: "자바스크립트의 예외 발생(throw)과 try/catch/finally 예외 처리, Error 객체, strict 모드를 정리한 학습 노트입니다."
permalink: "study/2021/03/06/js_예외처리"
---

## 예외 처리

### 예외(exception)란?

예외(exception)란 프로그램이 **실행 중에 발생하는 런타임 오류**를 의미합니다.

이러한 예외가 발생하지 않도록 미리 방지하는 것도 중요하지만, 일단 발생한 예외를 적절히 처리하는 방법 또한 매우 중요합니다.

> 참고로 **오류(error)** 는 프로그램 구문의 문법적인 오류를 의미합니다. (실행 중 발생하는 예외와는 구분됩니다.)

---

### 예외 발생 (throw)

예외를 발생시킨다는 것은 명시적으로 오류를 발생시킨다는 의미뿐만 아니라, 예외 상황을 알린다는 의미도 있습니다.

자바스크립트에서는 `throw` 키워드를 사용하여 예외를 발생시킬 수 있습니다.

```js
throw 표현식;
```

표현식에는 다음과 같은 값이 올 수 있습니다.

- 예외 코드를 나타내는 **숫자**
- 오류 메시지를 담고 있는 **문자열**
- **Error 객체** 등

---

### 예외 처리(exception handling)

자바스크립트에서는 프로그램이 실행되는 도중 발생하는 예외를 처리하기 위해 `try` / `catch` / `finally` 문을 사용합니다.

```js
try {

    예외를 처리하길 원하는 실행 코드;

} catch (ex) {

    예외가 발생할 경우에 실행될 코드;

} finally {

    try 블록이 종료되면 무조건 실행될 코드;

}
```

각 블록의 역할은 다음과 같습니다.

| 블록 | 역할 |
| --- | --- |
| `try` | 기본적으로 맨 먼저 실행되는 코드이며, 여기에서 발생한 예외는 `catch` 블록에서 처리됩니다. |
| `catch` | `try` 블록에서 발생한 예외 코드나 Error 객체를 인수로 전달받아 그 처리를 담당합니다. |
| `finally` | `try` 블록에서 예외가 발생하건 안 하건, 맨 마지막에 무조건 실행됩니다. |

`catch` 블록과 `finally` 블록은 선택적인 옵션으로, 반드시 함께 사용할 필요는 없습니다.

따라서 사용할 수 있는 적합한 `try` 구문은 다음과 같습니다.

1. `try` / `catch`
2. `try` / `finally`
3. `try` / `catch` / `finally`

### Error 객체

자바스크립트에서는 런타임 오류가 발생할 때마다 **Error 객체의 인스턴스**가 만들어져 해당 오류의 정보를 저장합니다.

---

### strict 모드 (엄격 모드)

ECMAScript 5에서 처음으로 소개된 strict 모드는 자바스크립트 코드에 더욱 엄격한 오류 검사를 적용해 줍니다.

strict 모드는 스크립트나 함수의 맨 처음에 `"use strict"` 지시어를 사용하여 선언할 수 있습니다.

```js
"use strict"    // 전체 스크립트를 strict 모드로 설정함.

try {
    num = 3.14; // 선언되지 않은 변수를 사용했기 때문에 오류를 발생시킴.
} catch (ex) {

    document.getElementById("text").innerHTML = ex.name + "<br>";
    document.getElementById("text").innerHTML += ex.message;

}
```
