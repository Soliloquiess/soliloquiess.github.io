---
title: "[SQL] Vagrant 실행"
layout: post
subtitle: SQL
date: '2022-04-19-13:45:51 +0900'

categories: class
tags: SQL
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


vagrant init - vagrant up 과정은 동일하다

vagrant.file을 바꾸는데

![20220419_142334](/assets/20220419_142334.png)

![20220419_142327](/assets/20220419_142327.png)

위와 같이 바꿔준다.

이후 방화벽 권한과 yum 설치를 진행해준다.

![20220419_142433](/assets/20220419_142433.png)

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/

여기로 들어가서

이 nano나 vim을 이용해 파일을 만들고

```
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
```

이 내용을 그대로 넣어준다.


이후
![20220419_142134](/assets/20220419_142134.png)


sudo yum install -y mongodb-org
를 실행해서 몽고디비를 설치해준다.

sudo systemctl start mongod

sudo systemctl status mongod
로 mongodb를 실행해준다
