---
title: "[java] Spring(war)파일 배포하기 위한 war "
layout: post
subtitle: Java
date: '2022-05-01 19:45:51 +0900'

categories: class
tags: Java
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---



스프링 프로젝트 war로 tomcat 배포

1.  완성된 폴더를 Export한다.(War file)


![20220615_220955](/assets/20220615_220955.png)

2. War파일 설정시 경로를 설정하고(빈 폴더면 좋다) 파일이름 뒤에 .war를 붙인다.

![20220615_221110](/assets/20220615_221110.png)

3. 그리고 Export부분에 체크리스트 3곳을 전부 체크한다.

![20220615_221201](/assets/20220615_221201.png)

4. 그리고 아까 지정했던 폴더에 프로젝트와 server.xml파일을 넣는다.
server.xml파일은 ide에서의 Servers\Tomcat v9.0 Server at localhost-config 안의 server.xml을 가져온다.(Tomcat폴더에 넣을것.)

![20220615_222250](/assets/20220615_222250.png)



![20220615_222332](/assets/20220615_222332.png)



![20220615_222348](/assets/20220615_222348.png)

5. tomcat 안의 webapp폴더에 export해서 만든 war파일을 풀어준다.

![20220615_225043](/assets/20220615_225043.png)

6. 위에서 ide 서버 설정한 server.xml을 tomcat안의 conf의 server.xml이 있는데 대체해준다.

![20220615_225208](/assets/20220615_225208.png)

7. tomcat을 startup으로 실행해준다.(tomcat폴더 안 bin)

![20220615_222442](/assets/20220615_222442.png)

8. tomcat을 실행하고 localhost로 설정했던 포트 및 주소로 들어가면 된다.

![20220615_223440](/assets/20220615_223440.png)
