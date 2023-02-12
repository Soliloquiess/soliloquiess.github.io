---
layout: post
title:  "Sourcetree 사용 중 충돌 해결법"
subtitle:  "etc"

date: "2023-02-13--17:26:51 +0900"
categories: etc
tags: etc
comments: true
---


git을 사용 중 pull시 충돌 에러가 나오며 원하는 동작이 실행되지 않을 경우


![image](https://user-images.githubusercontent.com/37941513/218321884-fbe1e632-4da4-4d88-96c9-890ccdf6c27e.png)


내가 수정한 소스와 상대방이 push하여 원격 저장소에 올라간 소스와 충돌 났다.

이 경우에는 브랜치를 하나 생성해서 그 브랜치에 현재 작성된 소스들을 커밋 및 푸시 한다.

branch를 mergeTest 이름으로 생성한다. 생성한 해당branch(mergeTest)로 체크아웃 받고 mergeTest branch에 현재 충돌 나는 소스를 commit&push를 한다.

![image](https://user-images.githubusercontent.com/37941513/218322304-eb96b0c4-b792-4703-8099-911d43c01c92.png)


이후, 다시 mergeTest branch를 체크아웃 받아 돌아오고, develop branch 소스와 mergeTest branch를 병합한다.

![image](https://user-images.githubusercontent.com/37941513/218322376-3058fd2a-cc25-4716-8c89-8829ea2a8e0d.png)

위와 같이 현재 브랜치에 병합 할 커밋을 선택하여 병합한다.

그러면 아래와 같이 충돌 병합 Alert 창이 뜰 것이다.

![111111](https://user-images.githubusercontent.com/37941513/218321887-73f8fe10-8d70-4103-b477-72a4672a302b.png)


그래프를 보면, 아래와 같은 상태로 병합이 된 것을 확인할 수 있다.

![222222](https://user-images.githubusercontent.com/37941513/218321889-ef28fbcf-a20c-4569-83cd-a649ee369371.png)

하지만 파일 상태를 보면,


![33](https://user-images.githubusercontent.com/37941513/218321890-bf22d1f4-d7a9-4e9f-a753-a1743056216e.png)


이와 같이 병합한 소스 중 충돌 난 소스를 확인할 수 있다.

내가 수정한 소스는 <<<    HEAD ~ ====

원격 저장소에 올라가있는 소스는 ==== ~ >>>>>> orgin/master 으로 나눠진다.

저 소스를 동기화하고 온전한 상태의 소스로 가지려면, <<<   HEAD >>>origin/develop 으로 나눠진 소스를 수정하여 가져야한다.

하지만 Sourcetree에서는 이러한 행동을 편한 기능으로 제공한다


![44](https://user-images.githubusercontent.com/37941513/218321891-a893c7fc-f427-40d7-903a-f1242a4e8a5a.png)


액션 > 충돌 해결을 클릭해보면 ‘내것’을 이용해 해결, ‘저장소’ 것을 사용하여 해결이 있다.

즉, <<<  HEAD ~=== 까지의 소스는 ‘내것’을 이용해 해결====~>>>origin/develop 까지의 소스는 ‘저장소’ 것을 사용하여 해결을

클릭하면 쉽게 소스를 동기화 시킬 수 있다.


![555](https://user-images.githubusercontent.com/37941513/218321892-8c9ee98d-4e75-411d-bbe0-852087a177ea.png)

해당 소스를 동기화 하였으니 충돌 부분을 수정했다는 것을 알리기 위해, 원격 저장소에 commit&push를 한다.

이제 다시 develop branch를 체크아웃 받아 그래프를 보면 원격 origin/master branch를 mergeTest 에 병합한 것을 볼 수 있다.


![image](https://user-images.githubusercontent.com/37941513/218322581-07fc9180-715f-4e25-99cb-98fcdc5a2638.png)

이제 mergeTest branch를 내 master local branch에 병합한다.

그럼 아래와 같이 그래프가 바뀌는 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/37941513/218322581-07fc9180-715f-4e25-99cb-98fcdc5a2638.png)


마지막으로 내가 충돌 난 부분을 수정하고, 내 소스를 원격 develop branch에 push하면 충돌 해결 및 소스 동기화가 된다.

mergeTest branch는 충돌 해결을 위한 branch이므로 원격 저장소에 저장할 필요는 없지만, 추후 해당 branch를 지우기 위해서는 원격 저장소에 저장 후 삭제해야 오류가 나지 않는다. 이 작업을 하지 않더라도 git -D 명령어로 강제 삭제도 가능하다.


본인은 master branch와 mergeTest branch에 둘 다 push를 해줄 것이다.

![image](https://user-images.githubusercontent.com/37941513/218322653-3539d4dc-2066-4eda-99e6-8811cf41783e.png)

그 후 그래프를 보면 develop branch와 origin/mergetTest branch 가 같은 단계에 머물러 있는 것을 확인 할 수 있다.


local branch와 원격 저장소 mergeTest branch는 마우스 오른쪽 클릭으로 쉽게 삭제가 가능하다.

![image](https://user-images.githubusercontent.com/37941513/218322721-23de2015-718f-49c5-a37d-11d438c67963.png)

git은 사용자마다 사용하는 방법이 다양하고, 다를 수 있다. 위와 같은 일련의 작업들을 원격 저장소 소스를 먼저 받고, 그 위에 내 소스를 추가하여 commit&push 하는 방법도 있다.

또한 위와 같이 mergeTest branch를 새로 따고 push 한 뒤, 원격 저장소 develop 내용을 local develop branch에 바로 pull 받고, local develop branch와 mergeTest branch를 바로 병합한 후 소스 충돌을 해결하여 commit&push 방법도 있다.

꼭 Sourcetree를 사용하지 않아도, tortoiseGit을 사용해도 좋고, eclipse git 등 여러 형상관리 툴을 사용해도 된다. 또는 이런 일련의 작업들을 git 터미널에서 git 명령어를 직접 사용하여 관리하여도 되지만, 툴을 사용하는 것이 그래프나 파일 상태에 대해서 알기 쉽게 되어있기 때문에 사용하는 것을 추천한다.

git으로 형상관리 하는 방법은 많지만, 팀원과 작업자들끼리 소스 동기화만 잘하여 관리한다면 충돌을 최소화하여 소스를 관리 할 수 있을 것이다.

- 참고 : https://hoi5088.medium.com/git-sourcetree-%EC%82%AC%EC%9A%A9-%EC%A4%91-%EC%B6%A9%EB%8F%8C-%ED%95%B4%EA%B2%B0%EB%B2%95-becce5b93206