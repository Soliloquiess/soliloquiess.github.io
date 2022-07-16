---
title: "[Springboot] Spring Batch 를 사용한 일괄 처리"
layout: post
subtitle: Springboot
date: "2022-07-16-14:58:53 +0900"
categories: study
tags: Springboot
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---


### Spring Batch 쓰는 이유

- 스프링 배치는 스프링에 내장 되어 있다.
- 대용량에 있어 배치 처리에 용이하다(일괄 처리)
- 다양한 형태의 IO가 가능하다(XML , JSON, SQL 등)
- 시작, 중지 재시작 이런 관리가 용이하다.


-------


##### 스프링 배치 타입

- Tasklet Step
- Chunk-Oriented Step



각 단계에 대해 작업 레포지토리가 정보를 저장할 위치에 메타데이터 정보를 저장한다.




##### 프로젝트 의존성 설정


![20220716_122506](/assets/20220716_122506.png)


```
package com.batch.app;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@EnableBatchProcessing
@SpringBootApplication
@ComponentScan("com.batch.config")	//빈으로 등록 될 준비를 마친 클래스들을 스캔하여, 빈으로 등록해주는 것이다.

//빈으로 등록 될 준비를 하는 것->
//우리가 @Controller, @Service, @Component, @Repository 어노테이션을 붙인
//클래스들이 빈으로 등록 될 준비를 한 것이다.
public class SpringBatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBatchApplication.class, args);
	}

}

```


빈 등록하기 위해 ComponentScan을 꼭 넎어준다.


![20220716_131248](/assets/20220716_131248.png)


아래 동일한 작업 수행하는 tasklet을 만들겠다



------


#### 두번쨰 tasklet 작업 추가

```
package com.batch.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SampleJob {

	@Autowired
	private JobBuilderFactory jobBuilderFactory;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Bean
	public Job firstJob() {
		return jobBuilderFactory.get("First Job")	//일단 아무말이나 넣
				//작업 빌더 만들고 제공함
				.start(firstStep())
				.next(secondStep())	//next로 스텝 작업 하나 추가
				.build();
	}

	private Step firstStep() {
		return stepBuilderFactory.get("First Step")
				//스텝 빌더 팩토리 만들고 첫 단계 생성
				.tasklet(firstTask())
				.build();
	}

	private Tasklet firstTask() {
		return new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("This is first tasklet step");
				return RepeatStatus.FINISHED;
			}
		};
	}

	private Step secondStep() {
		return stepBuilderFactory.get("Second Step")
				.tasklet(secondTask())
				.build();
	}

	private Tasklet secondTask() {
		return new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("This is second tasklet step");
				return RepeatStatus.FINISHED;
			}
		};
	}

}

```

만약 다른 단계를 추가하고 싶으면

단계 빌더 팩토리를 사용하여 다른 단계를 만들어야 한다.



----

#### Tasklet 단계 커스텀




컴포넌트 스캔에 빈 추가



```
package com.batch.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SampleJob {

	@Autowired
	private JobBuilderFactory jobBuilderFactory;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Bean
	public Job firstJob() {
		return jobBuilderFactory.get("First Job")	//일단 아무말이나 넣
				//작업 빌더 만들고 제공함
				.start(firstStep())
				.next(secondStep())	//next로 스텝 작업 하나 추가
				.build();
	}

	private Step firstStep() {
		return stepBuilderFactory.get("First Step")
				//스텝 빌더 팩토리 만들고 첫 단계 생성
				.tasklet(firstTask())
				.build();
	}

	private Tasklet firstTask() {
		return new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("This is first tasklet step");
				return RepeatStatus.FINISHED;
			}
		};
	}

	private Step secondStep() {
		return stepBuilderFactory.get("Second Step")
				.tasklet(secondTask())
				.build();
	}

	private Tasklet secondTask() {
		return new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("This is second tasklet step");
				return RepeatStatus.FINISHED;
			}
		};
	}

}

```

SecondTasklet

```
package com.batch.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SampleJob {

	@Autowired
	private JobBuilderFactory jobBuilderFactory;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Bean
	public Job firstJob() {
		return jobBuilderFactory.get("First Job")	//일단 아무말이나 넣
				//작업 빌더 만들고 제공함
				.start(firstStep())
				.next(secondStep())	//next로 스텝 작업 하나 추가
				.build();
	}

	private Step firstStep() {
		return stepBuilderFactory.get("First Step")
				//스텝 빌더 팩토리 만들고 첫 단계 생성
				.tasklet(firstTask())
				.build();
	}

	private Tasklet firstTask() {
		return new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("This is first tasklet step");
				return RepeatStatus.FINISHED;
			}
		};
	}

	private Step secondStep() {
		return stepBuilderFactory.get("Second Step")
				.tasklet(secondTask())
				.build();
	}

	private Tasklet secondTask() {
		return new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("This is second tasklet step");
				return RepeatStatus.FINISHED;
			}
		};
	}

}

```

-----


#### 작업 인스턴스와 작업 실행, 작업 실행 컨텍스트

![20220716_160128](/assets/20220716_160128.png)

안의 작업 인스턴스는 별개다.
성공적으로 실행된 작업 인스턴스에 하나의 실행이 있을 시 작업을 다시 실행한다.

만약 작업이 모종의 이유로 실행 실패 시 다른 작업을 실행할 수 있다.


작업 실행 컨텍스트는

예를 들어 위의 2개의 실행 컨텍스트가 있다고 치고



![20220716_160246](/assets/20220716_160246.png)

하나는 작업 수준이고 하나는 단계수준이다.

작업 수준에 있는 작업 실행 컨텍스트에 대해 이야기 해본다.



작업 실행 컨텍스트는 기본적으로 정보 제공하는 형식으로 저장할 수 있는 맵.

예를 들어 첫 단계에서 기본적으로 전달하려는 값이 있고
다른 단계로 이동 2,3단계로 이동하며

작업 실행 컨텍스트를 사용하여 수행할 수 있는 작업은 컨텍스트와 해당 정보를 다른 단계에서 사용할 수 있다.

1단계에서는 작업 실행 컨텍스트에 하나의 키 값을 넣는다.

그렇게 3단계를 거치면 작업이 완료되고
배치는 기본적으로 맵 형식으로 메타데이터 넣어서 작업 실행 컨텍스트를 저장한다.


---------

####  실행 순서 및 컨텍스트 실행 과정


![20220716_165717](/assets/20220716_165717.png)

단계 사이에 무언가 전달할 경우 작업 실행으로 이동



-----
