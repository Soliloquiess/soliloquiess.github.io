---
title: "[React] React 실전 — Fragment·Hook·Spring Boot 연동"
date: 2021-11-13
category: "React-Vue"
tags: ["React"]
description: "React Fragment, Hook, 그리고 React + Spring Boot 연동까지 리액트 실전을 정리한 노트."
permalink: "study/2021/11/13/react-실전"
---

> **📚 웹 풀스택 정리 — Spring · Vue · React · 배포**
>
> [Spring 실전](/study/2021/11/13/면접-대비-Web(spring~devops).html)
> [Vue.js 실전](/study/2021/11/13/vue-실전.html)
> React 실전 ← *지금 글*
> [배포 자동화](/study/2021/11/13/aws-travis-배포.html)

## [React] Fragment

<br>

> JSX 파일 규칙상 return 시 하나의 태그로 묶어야한다.
> 이런 상황에 Fragment를 사용하면 쉽게 그룹화가 가능하다.

<br>

아래와 같이 Table 컴포넌트에서 Columns를 불렀다고 가정해보자

```JSX
import { Component } from 'React'
import Columns from '../Components'

class Table extends Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

<br>

Columns 컴포넌트에서는 `<td> ~~ </td>`와 같은 element를 반환해야 유효한 테이블 생성이 가능할 것이다.

```jsx
import { Component } from 'React'

class Columns extends Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

여러 td 태그를 작성하기 위해 div 태그로 묶었다. (JSX 파일 규칙상 return 시 하나의 태그로 묶어야한다.)

이제 Table 컴포넌트에서 DOM 트리를 그렸을 때 어떻게 결과가 나오는지 확인해보자

<br>

```html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Columns 컴포넌트에서 div 태그로 묶어서 Table 컴포넌트로 보냈기 때문에 문제가 발생한다. 따라서 JSX파일의 return문을 무조건 div 태그로 묶는 것이 바람직하지 않을 수 있다.

이때 사용할 수 있는 문법이 바로 `Fragment`다.

```jsx
import { Component } from 'React'

class Columns extends Component {
  render() {
    return (
      <Fragment>
        <td>Hello</td>
        <td>World</td>
      </Fragment>
    );
  }
}
```

div 태그 대신에 Fragment로 감싸주면 문제가 해결된다. Fragment는 DOM트리에 추가되지 않기 때문에 정상적으로 Table을 생성할 수 있다.

<br>

Frament로 명시하지 않고, 빈 태그로도 가능하다.

```JSX
import { Component } from 'React'

class Columns extends Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

<br>

이 밖에도 부모, 자식과의 관계에서 flex, grid로 연결된 element가 있는 경우에는 div로 연결 시 레이아웃을 유지하는데 어려움을 겪을 수도 있다.

따라서 위와 같은 개발이 필요할 때는 Fragment를 적절한 상황에 사용하면 된다.

<br>

<br>

#### [참고 사항]

- [링크](https://velog.io/@dolarge/React-Fragment%EB%9E%80)

----

## React Hook

> useState(), useEffect() 정의

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcbKGwj%2FbtqC5pwunG7%2FYkaJ6YKK5YSESx7Gs2x410%2Fimg.jpg">

<br>

리액트의 Component는 '클래스형'과 '함수형'으로 구성되어 있다.

기존의 클래스형 컴포넌트에서는 몇 가지 어려움이 존재한다.

1. 상태(State) 로직 재사용 어려움
2. 코드가 복잡해짐
3. 관련 없는 로직들이 함께 섞여 있어 이해가 힘듬

이와 같은 어려움을 해결하기 위해, 'Hook'이 도입되었다. (16.8 버전부터)

<br>

### Hook

- 함수형 컴포넌트에서 State와 Lifecycle 기능을 연동해주는 함수
- '클래스형'에서는 동작하지 않으며, '함수형'에서만 사용 가능

<br>

#### useState

기본적인 Hook으로 상태관리를 해야할 때 사용하면 된다.

상태를 변경할 때는, `set`으로 준 이름의 함수를 호출한다.

```jsx
const [posts, setPosts] = useState([]); // 비구조화 할당 문법
```

`useState([]);`와 같이 `( )` 안에 초기화를 설정해줄 수 있다. 현재 예제는 빈 배열을 만들어 둔 상황인 것이다.

<br>

#### useEffect

컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook

> '클래스' 컴포넌트의 componentDidMount()와 componentDidUpdate()의 역할을 동시에 한다고 봐도 된다.

```jsx
useEffect(() => {
    console.log("렌더링 완료");
    console.log(posts);
});
```

posts가 변경돼 리렌더링이 되면, useEffect가 실행된다.

<br>

<br>

#### [참고자료]

- [링크](https://ko.reactjs.org/docs/hooks-intro.html)


---


## React & Spring Boot 연동

---

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FANf2v%2Fbtqw4m6O105%2F5YoRpX1xO9NGkyjwbOKFV1%2Fimg.png">


<br>

React와 Spring Boot의 연동을 연습해보자

<br>

> **Front-end** : React
>
> **Back-end** : Spring Boot

<br>

**스프링 부트를 통해 서버 API 역할을 구축**하고, **UI 로직을 React에서 담당**
( React는 컴포넌트화가 잘되어있어서 재사용성이 좋고, 수많은 오픈소스 라이브러리 활용 장점 존재)

<br>

#### 개발 환경도구 (설치할 것)

- VSCode : 확장 프로그램으로 Java Extension Pack, Spring Boot Extension Pack 설치
   (메뉴-기본설정-설정에서 JDK 검색 후 'setting.json에서 편집'을 들어가 `java.home`으로 jdk 경로 넣어주기)

```
"java.home":  "C:\\Program Files\\Java\\jdk1.8.0_181" // 자신의 경로에 맞추기
```

- Node.js : 10.16.0

- JDK(8 이상)

<br>

<br>

### Spring Boot 웹 프로젝트 생성

---

1. VSCode에서 `ctrl-shift-p` 입력 후, spring 검색해서
   `Spring Initalizr: Generate Maven Project Spring` 선택
   <br>

2. 프로젝트를 선택하면 나오는 질문은 아래와 같이 입력

   > - **언어** : Java
   > - **Group Id** : no4gift
   > - **Artifact Id** : test
   > - **Spring boot version** : 2.1.6
   > - **Dependency** : DevTools, Spring Web Starter Web 검색 후 Selected

   <br>

3. 프로젝트를 저장할 폴더를 지정하면 Spring Boot 프로젝트가 설치된다!

<br>

일단 React를 붙이기 전에, Spring Boot 자체로 잘 구동되는지 진행해보자

JSP와 JSTL을 사용하기 위해 라이브러리를 추가한다. pom.xml의 dependencies 태그 안에 추가하자

```xml
<dependency>
	<groupId>org.apache.tomcat.embed</groupId>
	<artifactId>tomcat-embed-jasper</artifactId>
	<scope>provided</scope>
</dependency>
<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>jstl</artifactId>
	<scope>provided</scope>
</dependency>
```

<br>

이제 서버를 구동해보자

VSCode에서 터미널 창을 열고 `.\mvnw spring-boot:run`을 입력하면 서버가 실행되는 모습을 확인할 수 있다.

<br>

***만약 아래와 같은 에러가 발생하면?***

```
***************************
APPLICATION FAILED TO START
***************************

Description:

The Tomcat connector configured to listen on port 8080 failed to start. The port may already be in use or the connector may be misconfigured.
```

<br>

8080포트를 이미 사용 중이라 구동이 되지 않는 것이다.

cmd창을 관리자 권한으로 열고 아래와 같이 진행하자

<br>

```
netstat -ao |find /i "listening"
```

<br>

현재 구동 중인 포트들이 나온다. 이중에 8080 포트를 확인할 수 있을 것이다.

가장 오른쪽에 나오는 숫자가 PID번호다. 이걸 kill 해줘야 한다.

<br>

```
taskkill /f /im [pid번호]
```

<br>

다시 서버를 구동해보면 아래처럼 잘 동작하는 것을 확인할 수 있다!

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbHP9BD%2Fbtqw7chRt8b%2FKltDWaAziWWi1F8JgpZLgK%2Fimg.png">

<br>

<br>

### React 환경 추가하기

---

터미널을 하나 더 추가로 열고, `npm init`을 입력해 pakage.json 파일이 생기도록 하자

> 나오는 질문들은 모두 enter 누르고 넘어가도 괜찮음

이제 React 개발에 필요한 의존 라이브러리를 설치한다.

<br>

```
npm i react react-dom

npm i @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader style-loader webpack webpack-cli -D
```

> create-react-app으로 한번에 설치도 가능함

<br>

#### webpack 설정하기

> webpack을 통해 react 개발 시 자바스크립트 기능과 jsp에 포함할 .js 파일을 만들 수 있다.
>
> 프로젝트 루트 경로에 webpack.config.js 파일을 만들고 아래 코드를 붙여넣기

<br>

```javascript
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src/main/jsx'),
    entry: {
        main: './MainPage.jsx',
        page1: './Page1Page.jsx'
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/webapp/js/react/[name].bundle.js'
    },
    mode: 'none',
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env', '@babel/preset-react' ]
                }
            }
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        } ]
    }
};
```

<br>

> - 코드 내용
>
> React 소스 경로를 src/main/jsx로 설정
>
> MainPage와 Page1Page.jsx 빌드
>
> 빌드 결과 js 파일들을 src/main/webapp/js/react 아래 [페이지 이름].bundle.js로 놓음

<br>

<br>

### 서버 코드 개발하기

---

VSCode에서 패키지 안에 MyController.java라는 클래스 파일을 만든다.

<br>

```java
package no4gift.test;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MyController {

    @GetMapping("/{name}.html")
    public String page(@PathVariable String name, Model model) {
        model.addAttribute("pageName", name);
        return "page";
    }

}
```

<br>

추가로 src/main에다가 webapp 폴더를 만들자

webapp 폴더 안에 jsp 폴더와 css 폴더를 생성한다.

<br>

그리고 jsp와 css 파일을 하나씩 넣어보자

#### src/main/webapp/jsp/page.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!doctype html>
<html>
<head>
    <title>${pageName}</title>
</head>

<body>
    <div id="root"></div>
    <script src="/js/react/${pageName}.bundle.js"></script>
</body>
</html>
```

<br>

#### src/main/webapp/css/custom.css

```css
.main {
    font-size: 24px; border-bottom: solid 1px black;
}
.page1 {
    font-size: 14px; background-color: yellow;
}
```

<br>

<br>

### 클라이언트 코드 개발하기

---

이제 웹페이지에 보여줄 JSX 파일을 만들어보자

src/main에 jsx 폴더를 만들고 MainPage.jsx와 Page1Page.jsx 2가지 jsx 파일을 만들었다.

#### src/main/jsx/MainPage.jsx

```jsx
import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';

class MainPage extends React.Component {

    render() {
        return <div className="main">no4gift 메인 페이지</div>;
    }

}

ReactDOM.render(<MainPage/>, document.getElementById('root'));
```

<br>

#### src/main/jsx/Page1Page.jsx

```jsx
import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';

class Page1Page extends React.Component {

    render() {
        return <div className="page1">no4gift의 Page1 페이지</div>;
    }

}

ReactDOM.render(<Page1Page/>, document.getElementById('root'));
```

> 아까 작성한 css파일을 import한 것을 볼 수 있는데, css 적용 방식은 이밖에도 여러가지 방법이 있다.

<br>

이제 우리가 만든 클라이언트 페이지를 서버 구동 후 볼 수 있도록 빌드시켜야 한다!

<br>

<br>

### 클라이언트 스크립트 빌드시키기

jsx 파일을 수정할 때마다 자동으로 지속적 빌드를 시켜주는 것이 필요하다.

이는 webpack의 watch 명령을 통해 가능하도록 만들 수 있다.

VSCode 터미널에서 아래와 같이 입력하자

```
node_modules\.bin\webpack --watch -d
```

> -d는 개발시
>
> -p는 운영시

터미널 화면을 보면, `webpack.config.js`에서 우리가 설정한대로 정상적으로 빌드되는 것을 확인할 수 있다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdCY33w%2Fbtqw6nqnFYA%2F6PkKNTZAFhHS92sj9GDsc0%2Fimg.png">

<br>

src/main/webapp/js/react 아래에 우리가 만든 두 페이지에 대한 bundle.js 파일이 생성되었으면 제대로 된 것이다.

<br>

서버 구동이나, 번들링이나 명령어 입력이 상당히 길기 때문에 귀찮다ㅠㅠ
`pakage.json`의 script에 등록해두면 간편하게 빌드과 서버 실행을 진행할 수 있다.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "set JAVA_HOME=C:\\Program Files\\Java\\jdk1.8.0_181&&mvnw spring-boot:run",
    "watch": "node_modules\\.bin\\webpack --watch -d"
  },
```

<br>

이처럼 start와 watch를 등록해두는 것!

start의 jdk경로는 각자 자신의 경로를 입력해야한다.

이제 우리는 빌드는 `npm run watch`로, 스프링 부트 서버 실행은 `npm run start`로 진행할 수 있다~

<br>

빌드가 이루어졌기 때문에 우리가 만든 페이지를 확인해볼 수 있다.

해당 경로로 들어가면 우리가 jsx파일로 작성한 모습이 제대로 출력된다.

<br>

MainPage : http://localhost:8080/main.html

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FblVl1i%2Fbtqw8BHJS0i%2Fk9n8KFavNlAl72Ijl5zZB0%2Fimg.png">

<br>

Page1Page : http://localhost:8080/page1.html

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbE35Su%2Fbtqw79Y0c6b%2Fm57ohwy2QKkkEgdEWifvTk%2Fimg.png">

<br>

여기까지 진행한 프로젝트 경로

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FHrN7W%2Fbtqw5gec26g%2FMqCZViee9Qc2s1tl09XVs0%2Fimg.png">



이와 같은 과정을 토대로 구현할 웹페이지들을 생성해 나가면 된다.



이상 React와 Spring Boot 연동해서 환경 설정하기 끝!

---
