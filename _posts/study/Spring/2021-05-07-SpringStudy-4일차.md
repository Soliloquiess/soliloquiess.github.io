---
title: "[Spring] SpringStudy-4일차"
layout: post
subtitle: Spring
date: "2021-05-07-23:46:51 +0900"

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

```
GuestbookDTO read(Long gno);
void modify(GuestbookDTO dto);
void remove(Long gno);

```

ServiceImpl의 Read부분으로 이동

```
@Override
 public GuestbookDTO read(Long gno) {

     Optional<Guestbook> result = repository.findById(gno);
     //findId해서  Optional한 결과 중에
     return result.isPresent()? entityToDto(result.get()): null;
     // result.isPresent()?  만약 결과가 있으면  result.get()하면 엔티티가 나옴.
//        그 엔티티를 entityToDto() 로 dto로 바꿔주는 작업. 없으면 널 반환

 }

```

이 3부분 필요

```
@GetMapping({"/read", "/modify"})
   public void read(long gno, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, Model model ){
   //번호 받음(long gno)long값으로 받았다.  pageRequestDto 써먹는다. ModelAttribute 이걸 이용해서 좀더 명시적으로  requestDto라는 이름으로 처리한다.
       //안그러면 pageRequestDto라는 이름으로 써도 됨. 그리고 DTO를 담기 위해서 모델 DTO가 필요하다.
       log.info("gno: " + gno);

       GuestbookDTO dto = service.read(gno); //서비스 계층에선 해당 방명록의 dto를 가져옴.

       model.addAttribute("dto", dto);


```

여기서 read하면 read.html이 떠야한다.
modify도 동일. 두가지 한번에 처리하도록 묶어서 (배열로)처리

![20210505_194843](/assets/20210505_194843.png)

read.html에 dto라고 담겨있어서 dto로 출력하게 된다.

![20210505_013119](/assets/20210505_013119.png)

modify도 동일.

modify는 대신 수정이 가능한 것만 수정하게 해줘야 한다.

```
<input type="hidden" name="page" th:value="${requestDTO.page}"><!--페이지 번호   수정 한 다음 어떤 페이지로 이동할건지 이런건 히든처리해서 보내는게 좋음-->

```

이걸 post방식으로 service에 전달하면

![20210505_195153](/assets/20210505_195153.png)

서비스에서 수정할수 있게 해준다.

![20210505_195313](/assets/20210505_195313.png)

여기서 제목과 내용만 수정 가능하게
만들었다.

```
entity.changeTitle(dto.getTitle());
entity.changeContent(dto.getContent());

```

컨트롤러에서 modify를 post방식으로 받고
post방식으로 modify가 다 끝나면

```

@PostMapping("/modify") //modify를 포스트 방식으로 받게 되고
 public String modify(GuestbookDTO dto,
                      @ModelAttribute("requestDTO") PageRequestDTO requestDTO,
                      RedirectAttributes redirectAttributes){


     log.info("post modify.........................................");
     log.info("dto: " + dto);

     service.modify(dto);

     redirectAttributes.addAttribute("page",requestDTO.getPage());
     redirectAttributes.addAttribute("type",requestDTO.getType());
     redirectAttributes.addAttribute("keyword",requestDTO.getKeyword());
//

 }

```

modify를 포스트 방식으로 받게 되고 끝나면

return "redirect:/guestbook/read";

로 인해 다시 read페이지로 가라

remove 또한 동일

```
@PostMapping("/remove")
 public String remove(long gno, RedirectAttributes redirectAttributes){
     //삭제될 번호 gno 만 있으면 되고  RedirectAttributes를 이용해 addFlashAttribute로 전달한다.

     log.info("gno: " + gno);

     service.remove(gno);

     redirectAttributes.addFlashAttribute("msg", gno);

     return "redirect:/guestbook/list";  //다 하고 list페이지로 보내주면 ㅗ딘다.

 }
```

addAttribute는 값을 지속적으로 사용해야할때 addFlashAttribute는 일회성으로 사용해야할때 사용해야합니다.
