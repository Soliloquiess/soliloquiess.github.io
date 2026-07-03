---
title: "[Java] Java 기초 - 배열(Array)과 불변성"
date: 2021-01-19
category: "Java"
tags: ["Java"]
description: "배열은 new 키워드로 생성하는 Object이며 index(zero 베이스)로 개별 값에 접근한다. 배열의 불변성(immutable) 특징과 메모리 구조, System.arraycopy를 정리한다."
permalink: "class/2021/01/19/java_02"
---

## 배열(Array) 만들기

![배열 생성 개념도](/assets/20210304_135704.png)

- 배열(Array)은 **Object**이며, 생성 시 `new` 키워드를 사용한다.
- index(zero 베이스)를 이용하여 개별 값에 접근(access)한다.

### Local Variables vs Array in Memory

![지역 변수와 배열의 메모리 구조 비교](/assets/20210304_115455.png)

## 배열은 불변(Immutable)이다

- 최초 메모리 할당 이후 변경할 수 없음.
- 개별 요소는 다른 값으로 변경이 가능하나, 삭제는 할 수 없음.
- 크기를 늘리거나 줄일 수는 없음.
- 변경이 필요한 경우, 새로 작성하는 것이 일반적으로 유리함.

> 배열은 자바 레벨에서 메모리의 인덱스로 직접 제어하는 로우 레벨 요소다. 그런 유일한 부분이라 할 수 있다.
> 배열은 컬렉션에서도 배우지만, 컬렉션은 하이 레벨이고 배열은 로우 레벨이라는 점이 다르다.

## System.arraycopy

- API에서 제공하는 배열 복사 메서드.
