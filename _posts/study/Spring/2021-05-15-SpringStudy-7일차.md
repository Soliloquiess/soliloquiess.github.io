---
title: "[Spring] SpringStudy-7일차"
layout: post
subtitle: Spring
date: "2021-05-11-23:48:51 +0900"

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---




첨부파일 보여주는 영역 처리

json으로 실제 업로드 부분


```
//실제 업로드 부분
            //upload ajax
            $.ajax({
                url: '/uploadAjax',
                processData: false,
                contentType: false,
                data: formData,
                type: 'POST',
                dataType:'json',
                success: function(result){
                    console.log(result);
                    showResult(result);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log(textStatus);
                }
            }); //$.ajax
        }); //end change event


```

ajax의 호출 결과는 show Result()라는 별도의 함수로 처리

ajax로 결과 가져오면 showResult()로 호출하도록 수정

```
function showResult(uploadResultArr){

           var uploadUL = $(".uploadResult ul");

           var str ="";

           $(uploadResultArr).each(function(i, obj) {

               str += "<li data-name='" + obj.fileName + "' data-path='"+obj.folderPath+"' data-uuid='"+obj.uuid+"'>";
               str + " <div>";
               str += "<button type='button' data-file=\'" + obj.imageURL + "\' "
               str += "class='btn-warning btn-sm'>X</button><br>";
               str += "<img src='/display?fileName=" + obj.thumbnailURL + "'>";
               str += "</div>";
               str + "</li>";
           });

           uploadUL.append(str);
       }

```


이미지 파일의 삭제와 submit처리

이미지 파일의 삭제는 Ajax를 이용해서 처리
submi처리는 각 이미지를 <input type=‘hidden’>으로 구성해서 한번에 여러 개의 ImageDTO를 구성할 수 있도록 전송



````
$(".uploadResult ").on("click", "li button", function(e){

            console.log("delete file");

            var targetFile = $(this).data("file");

            var targetLi = $(this).closest("li");

            $.ajax({
                url: '/removeFile',
                data: {fileName: targetFile},
                dataType:'text',
                type: 'POST',
                success: function(result){
                    alert(result);

                    targetLi.remove();
                }
            }); //$.ajax
        });

````


화면에서 submit 누르면

1. 각 이미지 <li> 태그의 'data' 속성 읽음
2. 읽어들인 속성을 이용해서  from 태그 안의 input type = 'hidden' 태그 생성
3. input type= 'hidden'의 이름에는 imageDTOList[0]과 같이 인덱스 번호 붙여서 처리

각 이미지를 태그로 구성하고 imageDTOList[0]과 같이 구성하면 movieDTO로 데이터 수집시 자동으로 리스트로 변환되서 처리 가능.

```
//prevent submit
        $(".btn-primary").on("click", function(e) {
            e.preventDefault();

            var str = "";

            $(".uploadResult li").each(function(i,obj){
                var target = $(obj);

                str += "<input type='hidden' name='imageDTOList["+i+"].imgName' value='"+target.data('name') +"'>";

                str += "<input type='hidden' name='imageDTOList["+i+"].path' value='"+target.data('path')+"'>";

                str += "<input type='hidden' name='imageDTOList["+i+"].uuid' value='"+target.data('uuid')+"'>";

            });

            //태그들이 추가된 것을 확인한 후에 comment를 제거
            $(".box").html(str);

            $("form").submit();

        });


```

![20210515_125601](/assets/20210515_125601.png)


1. 파일 업로드가 되면 <li>태그가 구성된다.
2. Submit버튼을 클릭하면 <form>태그내에 태그들이 생성된다.
3. MovieController에서 POST방식으로 전달된 데이터들은 MovieImageDTO로 수집된다.
4. MovieService에서 MovieImageDTO들은 Movie 엔티티 객체내에 MovieImage로 처리된다.
5. JPA에 의해서 save( )처리후에 데이터베이스에 기록된다.
