---
title: "[SQL] Vagrant 실행"
date: 2022-04-19
category: "SQL"
tags: ["SQL"]
description: "vagrant init vagrant up 과정은 동일하다 vagrant.file을 바꾸는데 위와 같이 바꿔준다. 이후 방화벽 권한과 yum 설치를 진행해준다. 여기로 들어가서 이 nano나 vim을 이용해 파일을…"
permalink: "class/2022/04/19/Vagrant-MongoDB-설치"
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


---------


cat config/copy1.conf

mkdir data1



dbPath: /home/vagrant/data1


sudo mongod -f config/copy1.conf

sudo mongod -f etc/mongod.conf
