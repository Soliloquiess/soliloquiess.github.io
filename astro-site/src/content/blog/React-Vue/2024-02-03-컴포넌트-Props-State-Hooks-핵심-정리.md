---
title: "[React] 컴포넌트·Props·State·Hooks 핵심 정리"
date: 2024-02-03
category: "React-Vue"
tags: ["React-Vue"]
description: "React의 컴포넌트 기반 구조와 Props·State·Hooks의 역할을 정리한 노트. 선언적 UI 설계 방식과 주요 용어를 한눈에 파악한다."
permalink: "study/2024/02/03/React-및-TS-정리-진행"
---

## React란?

**리액트(React)** 는 현대적인 싱글 페이지 애플리케이션(SPA)을 구축하기 위한 UI 프레임워크다.

---

## React 주요 기능

- **컴포넌트 기반** 프레임워크
- **선언적(Declarative)** 뷰
- 컴포넌트 로직은 **자바스크립트**로 작성
- 반응형 웹 디자인 및 현대적인 프레임워크 지원
- Bootstrap, Google Material Design 등과 호환

---

## React 컴포넌트 트리 구조

```text
App (루트 컴포넌트)
├── Component (UI 뷰 + 로직)
│     ├── Props   (부모 → 자식 데이터 전달)
│     ├── State   (컴포넌트 내부 상태)
│     └── Hooks   (상태/생명주기 등 기능 사용)
└── Component
      └── ... (컴포넌트 트리로 구성)
```

---

## React 핵심 용어

| 용어          | 정의 |
| ------------- | ---- |
| **Component** | UI 뷰와 애플리케이션 로직을 담은 자바스크립트 단위. React 앱의 기본 구성 요소. |
| **Props**     | 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 메커니즘. |
| **State**     | 컴포넌트 내부 데이터. 상태가 변경되면 컴포넌트가 자동으로 리렌더링된다. |
| **Hooks**     | 클래스 없이 로컬 상태와 React 기능을 사용할 수 있게 해주는 메커니즘. |
| **Module**    | 특정 뷰를 구성하는 관련 컴포넌트의 모음. |
