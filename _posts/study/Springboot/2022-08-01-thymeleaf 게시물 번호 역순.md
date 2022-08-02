---
title: "[Springboot] thymeleaf 게시물 번호 역순"
layout: post
subtitle: Springboot
date: "2022-08-01-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


***번호 = 전체 게시물 개수 - (현재 페이지 * 페이지당 게시물 개수) - 나열 인덱스***


|항목| 설명|
|------|---|
|번호|	최종 표시될 게시물 번호|
|전체| 게시물 개수	데이터베이스에 저장된 게시물 전체 개수
|현재 페이지|	페이징에서 현재 선택한 페이지 (만약 페이지가 1부터 시작한다면 1을 빼주어야 한다. 하지만 스프링부트의 페이징은 0부터 시작하므로 1을 뺄 필요가 없다.)
|페이지당 게시물 개수|	한 페이지당 보여줄 게시물의 개수
|나열 인덱스|	for 문 안의 게시물 순서 (나열 인덱스는 현재 페이지에서 표시할 수 있는 게시물의 인덱스이므로 10개를 표시하는 페이지에서는 0~9, 2개를 표시하는 페이지에서는 0~1로 반복된다.)


공식이 조금 복잡하니 질문 게시물이 12개인 상황을 예로 들어 설명해 보자. 현재 페이지가 0이면 번호는 전체 게시물 개수 12에서 나열 인덱스 0~9를 뺀 12~3이 된다. 현재 페이지가 1이면 페이지당 게시물 개수는 10이므로 12에서 10을 뺀 값 2에 나열 인덱스 0~1을 다시 빼므로 번호는 2~1이다.



```
<html layout:decorate="~{layout}">
<div layout:fragment="content" class="container my-3">
    <table class="table">
        <thead class="table-dark">
            (... 생략 ...)
        </thead>
        <tbody>
            <tr th:each="question, loop : ${paging}">
                <td th:text="${paging.getTotalElements - (paging.number * paging.size) - loop.index}"></td>
                <td>
                    <a th:href="@{|/question/detail/${question.id}|}" th:text="${question.subject}"></a>
                </td>
                <td th:text="${#temporals.format(question.createDate, 'yyyy-MM-dd HH:mm')}"></td>
            </tr>
        </tbody>
    </table>
    (... 생략 ...)
</div>
</html>

```

다음 표는 템플릿에 사용한 공식의 상세 정보이다.

| 항목	|설명|
|------|-----|
| paging.getTotalElements	|전체 게시물 개수
| paging.number	|현재 페이지 번호
| paging.size |	페이지당 게시물 개수
| loop.index	| 나열 인덱스(0부터 시작)




하지만

위의 예시들은 타임리프를 썼으나  jpa의 기본 제공 객체인 page객체를 이용해서 jpa를 쓰지 않은 나에게는 먹히지 않았다.

그래서 page객체를 따로 만들었던 나는 위 코드 대신 다르게 사용했다.


-----


![20220802_091456](/assets/20220802_091456_g0pf6gymp.png)

page

```



//게시판 하단의 페이징
public class Paging {

	private int totalCount; // 게시판 전체 데이터 개수
	private int displayPageNum = 10; // 게시판 화면에서 한번에 보여질 페이지 번호의 개수
//	private int rowsPerPage;	//페이지 당 게시물 수
	private int totalPageCount; //게시판 전체 페이지 개수

	private int startPage; // 화면의 시작 번호
	private int endPage;  // 화면의 끝 번호
	private boolean prev; // 페이징 이전 버튼 활성화 여부
	private boolean next; // 페이징 다음 버튼 활성화 여부

	private Criteria cri;

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;

		pagingData();
	}

	private void pagingData() {

		endPage = (int) (Math.ceil(cri.getPage() / (double) displayPageNum) * displayPageNum);
		// endPage = (현재 페이지 번호 / 화면에 보여질 페이지 번호의 개수) * 화면에 보여질 페이지 번호의 개수
		startPage = (endPage - displayPageNum) + 1;
		// startPage = (끝 페이지 번호 - 화면에 보여질 페이지 번호의 개수) + 1

		int tempEndPage = (int) (Math.ceil(totalCount / (double) cri.getPerPageNum()));
		if(endPage > tempEndPage) {
			endPage = tempEndPage;
		}
		// 마지막 페이지 번호 = 총 게시글 수 / 한 페이지당 보여줄 게시글의개수

		totalPageCount = ((totalCount - 1) / cri.getPerPageNum()) + 1;
		if (cri.getPage() > totalPageCount) {
			cri.setPage(totalPageCount);
		}

		prev = startPage == 1 ? false : true;
		// 이전 버튼 생성 여부 = 시작 페이지 번호가 1과 같으면 false, 아니면 true
		next = endPage * cri.getPerPageNum() >= totalCount ? false : true;
		// 다음 버튼 생성 여부 = 끝 페이지 번호 * 한 페이지당 보여줄 게시글의 개수가 총 게시글의 수보다
		// 크거나 같으면 false, 아니면 true
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getDisplayPageNum() {
		return displayPageNum;
	}

	public void setDisplayPageNum(int displayPageNum) {
		this.displayPageNum = displayPageNum;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public boolean isPrev() {
		return prev;
	}

	public void setPrev(boolean prev) {
		this.prev = prev;
	}

	public boolean isNext() {
		return next;
	}

	public void setNext(boolean next) {
		this.next = next;
	}

	public Criteria getCri() {
		return cri;
	}

	public void setCri(Criteria cri) {
		this.cri = cri;
	}

	@Override
	public String toString() {
		return "PageMaker [totalCount=" + totalCount + ", startPage=" + startPage + ", endPage=" + endPage + ", prev="
				+ prev + ", next=" + next + ", displayPageNum=" + displayPageNum + ", cri=" + cri + "]";
	}

}

```

criteria


```



import lombok.Getter;
import lombok.Setter;

public class Criteria {

	// 특정 페이지 조회를 위한 클래스
	private int page; // 현재 페이지 번호
	private int perPageNum; // 페이지당 보여줄 게시글의 개수

	@Getter
	@Setter
	private String searchCardStatus;
	@Getter
	@Setter
	private String searchCardCreated;
	@Getter
	@Setter
	private String searchReviseDate;
	@Getter
	@Setter
	private String searchOrganName;
	@Getter
	@Setter
	private String searchProductName;

	@Getter
	@Setter
	private String searchOrganStatus;

	public int getPageStart() {
		// 특정 페이지의 범위를 정하는 구간, 현재 페이지의 게시글 시작 번호
		// 0 ~ 10 , 10 ~ 20 이런식으로
		return (this.page -1) * perPageNum;
	}


	public Criteria() {
		// 기본 생성자 : 최초 게시판에 진입시 필요한 기본값
		this.page = 1;
		this.perPageNum = 10;
	}

	// 현재 페이지 번호 page : getter, setter
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		if(page <= 0) {
			this.page = 1;

		} else {
			this.page = page;
		}
	}

	// 페이지당 보여줄 게시글의 개수 perPageNum : getter, setter
	public int getPerPageNum() {
		return perPageNum;
	}

	public void setPerPageNum(int perPageNum) {
		int cnt = this.perPageNum;

		if(perPageNum != cnt) {
			this.perPageNum = cnt;
		} else {
			this.perPageNum = perPageNum;
		}
		if (perPageNum <= 0 || perPageNum > 100) {
			this.perPageNum = 10;
			return;
		}
		this.perPageNum = perPageNum;
	}

	@Override
	public String toString() {
		return "Criteria [page=" + page + ", perPageNum=" + perPageNum + "]";
	}

}


```

위는 따로 수정한 페이지 객체들

-----


html

```
<tr th:each="bean , beanStat : ${list}">
                       <!--   <td class="text-center" th:text="${list.size+1}+(${paging.cri.page}-1)*${cri.perPageNum}" >1</td>-->


                           <td class="text-center"  td th:text="${paging.totalCount -   ((paging.cri.page-1)*   (paging.cri.perPageNum)) -  beanStat.index  }" ></td>                              


```




- index: the current iteration index, starting with 0 (zero)
- count: the number of elements processed so far
- size: the total number of elements in the list
- even/odd: checks if the current iteration index is even or odd
- first:  checks if the current iteration is the first one
- last: checks if the current iteration is the last one

공식 문서에 index라는 걸 타임리프에서 이미 제공을 해주고 있었다(list로 받을 경우)

그래서 index를 사용해서 페이지 인덱스 부분을 구현해서 뺴줬다.

공식문서를 꼭 읽자. (공식문서 저 부분 찾기도 뭔가 힘들었지만.. 그래도 공식문서를 제일 먼저 보자)
