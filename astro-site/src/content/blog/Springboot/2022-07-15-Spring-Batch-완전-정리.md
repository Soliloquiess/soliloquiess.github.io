---
title: "[Springboot] Spring Batch 완전 정리 — 설정·파일 처리·데이터 읽기"
date: 2022-07-15
category: "Springboot"
tags: ["Springboot"]
description: "Spring Batch의 개념·아키텍처부터 환경 설정, Tasklet/Chunk 기반 처리, JobParameters, @JobScope/@StepScope, ItemReader까지 단계별로 정리한 완전 학습 노트."
permalink: "study/2022/07/15/Spring-Batch-파일-사용"
---

## Spring Batch 개요

### Spring Batch란

- 큰 단위의 작업을 **일괄 처리**
- 대부분 처리량이 많고 **비 실시간성 처리**에 사용
- 대용량 데이터 계산, 정산, 통계, 데이터베이스 변환 등
- 사용자 상호작용으로 실행되기 보단, **스케줄러**와 같은 시스템에 의해 실행되는 대상
  - 예: 매일 오전 10시 배치 실행, 매주 월요일 12시마다 실행 (crontab, jenkins …)
- Spring Framework 기반 기술
  - Spring에서 지원하는 기술(DI, AOP, 서비스 추상화) 적용 가능
- **간단한 작업(Tasklet)** 기반 처리와 **대량 처리(Chunk)** 기반 기능 지원

### Spring Batch를 쓰는 이유

- 스프링 배치는 스프링에 **내장** 되어 있다.
- 대용량에 있어 배치 처리에 용이하다 (일괄 처리)
- **다양한 형태의 IO**가 가능하다 (XML, JSON, SQL 등)
- 시작, 중지, **재시작** 관리가 용이하다.

---

## 배치 어플리케이션 구조

### 기본 아키텍처

배치(batch)는 일괄처리라는 뜻을 갖고 있습니다. 일반 웹 어플리케이션과 달리, 배치를 사용하면 큰 데이터를 한번에 처리하고 해당 결과를 저장하거나 사용할 수 있습니다.

Spring Batch에서는 **Job**이 있습니다. Job은 여러 개의 **Step**으로 구성되고, Step은 **Tasklet(기능)**으로 구성됩니다. 배치 작업 하나가 Job에 해당됩니다.

![20220716_025821](https://user-images.githubusercontent.com/37941513/182810151-a04ded04-65e4-457c-8d46-7f203c788a5e.png)

### 스프링 배치 타입

| 타입 | 설명 |
|------|------|
| **Tasklet Step** | 단순 작업 기반 처리 |
| **Chunk-Oriented Step** | 대량 처리를 위한 청크 기반 처리 |

각 단계에 대해 작업 레포지토리가 정보를 저장할 위치에 메타데이터 정보를 저장한다.

### 스프링 배치 기본 구조

![20220716_203232](/assets/20220716_203232.png)

### 스프링 배치 기본 구조 - Job

- Job은 **JobLauncher**에 의해 실행
- Job은 배치의 실행 단위를 의미
- Job은 N개의 Step을 실행할 수 있으며, **흐름(Flow)**을 관리할 수 있다.
  - 예: A Step 실행 후 조건에 따라 B Step 또는 C Step을 실행 설정

### 스프링 배치 기본 구조 - Step

- Step은 Job의 세부 실행 단위이며, N개가 등록돼 실행된다.
- Step의 실행 단위는 크게 2가지로 나눌 수 있다.
  1. **Chunk 기반**: 하나의 큰 덩어리를 n개씩 나눠서 실행
  2. **Task 기반**: 하나의 작업 기반으로 실행

- Chunk 기반 Step은 **ItemReader**, **ItemProcessor**, **ItemWriter**가 있다.
  - 여기서 Item은 배치 처리 대상 객체를 의미한다.
- **ItemReader**는 배치 처리 대상 객체를 읽어 ItemProcessor 또는 ItemWriter에게 전달한다.
  - 예: 파일 또는 DB에서 데이터를 읽는다.
- **ItemProcessor**는 input 객체를 output 객체로 filtering 또는 processing 해 ItemWriter에게 전달한다.
  - ItemProcessor는 **optional** 하다.
  - ItemProcessor가 하는 일을 ItemReader 또는 ItemWriter가 대신할 수 있다.
- **ItemWriter**는 배치 처리 대상 객체를 처리한다.
  - 예: DB update를 하거나, 처리 대상 사용자에게 알림을 보낸다.

---

## 환경 설정

### 의존성 설정

![20220716_025601](/assets/20220716_025601.png)

![20220716_122506](/assets/20220716_122506.png)

### Main 클래스 설정

`@EnableBatchProcessing`은 **반드시 추가**해야 한다.

```java
package com.example.batchtest;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableBatchProcessing  //반드시 추가해줘야한다.
@SpringBootApplication
public class BatchTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(BatchTestApplication.class, args);
    }

}
```

`@ComponentScan`을 함께 사용하는 경우 — 빈으로 등록될 준비를 마친 클래스들을 스캔하여 빈으로 등록한다.

```java
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

![20220716_131248](/assets/20220716_131248.png)

### application.yml

```yaml
logging:
  level:
    root: info
    com.example.batchtest: debug

spring:
#  jpa:
#    hibernate:
#      ddl-auto: update
#      use-new-id-generator-mappings: true
#
#    show-sql: true
#    properties:
#      hibernate:
#        dialect: org.hibernate.dialect.MySQL5InnoDBDialect

    datasource:
      url: jdbc:mysql://localhost:3306/batchTest?&serverTimezone=Asia/Seoul
      username: root
      password: mysql
      driver-class-name: com.mysql.cj.jdbc.Driver
```

특정 Job만 실행하려면 `spring.batch.job.names`를 설정한다.

```yaml
spring:
  batch:
    job:
      names: ${job.name:NONE}
      initialize-schema:
```

이렇게 설정하면 `spring.batch.job.names`를 커스텀하게 `job.name`으로 바꾼다. `job.name` 파라미터로 Job 실행이 가능해진다. 설정하지 않으면 모든 Job이 실행된다.

### 배치 DB 스키마 설정

실행 전 배치 메타 테이블용 DB를 만들어야 한다. `spring-batch-core`에서 제공하는 SQL을 사용한다.

![20220716_031231](/assets/20220716_031231.png)

- 위치: `spring-batch-core/org.springframework/batch/core/*`
- **schema-\*\*.sql**의 실행 구분은 DB 종류별로 script가 구분된다.
- `spring.batch.initialize-schema` 설정으로 구분:
  - **ALWAYS**: 항상 실행
  - **EMBEDDED**: 내장 DB일 때만 실행
  - **NEVER**: 항상 실행 안함
  - 기본값은 `EMBEDDED`

![20220716_214839](/assets/20220716_214839.png)

`spring-batch-core:4.3.6`에서 안의 mysql 파일(쿼리문)을 찾고 실행해준다.

![20220716_214631](/assets/20220716_214631.png)

---

## Tasklet 기반 처리

### 기본 TaskletJob

```java
package com.example.batchtest.batch;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class TaskletJob {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    @Bean
    public Job taskletJob_batchbuild(){    //job 만들고 리턴해야됨.
        return jobBuilderFactory.get("taskletJob")
                .start(taskletJob_step1()).build();
    }

    @Bean
    public Step taskletJob_step1(){
        return stepBuilderFactory.get("taskletJob_step1")
                .tasklet((a,b)->{
                    log.debug("-> job->[step1]");
                    return RepeatStatus.FINISHED;
                }).build();
    }
}
```

### 두 번째 Tasklet 작업 추가 (SampleJob)

`next()`로 스텝 작업을 추가하면 다른 단계로 이어진다. 다른 단계를 추가하고 싶으면 단계 빌더 팩토리를 사용하여 다른 단계를 만들어야 한다.

```java
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

### 실행 결과

쿼리문을 DB에서 실행한 뒤 Main을 실행하면 테이블 안에 내용이 들어간 걸 볼 수 있다.

![20220716_033216](/assets/20220716_033216.png)

타 배치파일 실행하기 위해 config에서 `--job.name=taskletJob` 넣고 실행 (이렇게 하면 taskletJob 이외에는 실행 안한다.)

![20220716_035752](/assets/20220716_035752.png)

다른 프로젝트에서 실행한 결과:

![20220716_190206](/assets/20220716_190206.png)

줄여서도 실행 가능:

![20220716_192634](/assets/20220716_192634.png)

이렇게 하면 위와 같이 동일하게 helloSpringbatch가 실행된다.

active profile에서 mysql로 설정 후 실행:

![20220717_013711](/assets/20220717_013711.png)

이상없이 hello spring batch가 찍힌 결과:

![20220717_013816](/assets/20220717_013816.png)

DB에도 값이 들어간 게 보인다.

---

## 배치 메타 테이블 구조

### 테이블 ERD

![20220716_204530](/assets/20220716_204530.png)

### 테이블 설명

- 배치 실행을 위한 **메타 데이터**가 저장되는 테이블

| 테이블 | 설명 |
|--------|------|
| **BATCH_JOB_INSTANCE** | Job이 실행되며 생성되는 최상위 계층의 테이블. job_name과 job_key를 기준으로 하나의 row가 생성되며, 같은 job_name과 job_key는 저장될 수 없다. job_key는 BATCH_JOB_EXECUTION_PARAMS에 저장되는 Parameter를 나열해 암호화해 저장한다. |
| **BATCH_JOB_EXECUTION** | Job이 실행되는 동안 시작/종료 시간, job 상태 등을 관리 |
| **BATCH_JOB_EXECUTION_PARAMS** | Job을 실행하기 위해 주입된 parameter 정보 저장 |
| **BATCH_JOB_EXECUTION_CONTEXT** | Job이 실행되며 공유해야 할 데이터를 직렬화해 저장 |
| **BATCH_STEP_EXECUTION** | Step이 실행되는 동안 필요한 데이터 또는 실행된 결과 저장 |
| **BATCH_STEP_EXECUTION_CONTEXT** | Step이 실행되며 공유해야 할 데이터를 직렬화해 저장 |

---

## Job, JobInstance, JobExecution, Step, StepExecution 이해

### 객체-테이블 매핑

- **JobInstance** : BATCH_JOB_INSTANCE 테이블과 매핑
- **JobExecution** : BATCH_JOB_EXECUTION 테이블과 매핑
- **JobParameters** : BATCH_JOB_EXECUTION_PARAMS 테이블과 매핑
- **ExecutionContext** : BATCH_JOB_EXECUTION_CONTEXT 테이블과 매핑

![20220716_221530](/assets/20220716_221530.png)

### JobInstance / JobExecution 생성 규칙

- **JobInstance**의 생성 기준은 **JobParameters 중복 여부**에 따라 생성된다.
- 다른 parameter로 Job이 실행되면 → JobInstance가 **새로 생성**된다.
- 같은 parameter로 Job이 실행되면 → 이미 생성된 JobInstance가 **재실행**된다.
- **JobExecution은 항상 새롭게 생성**된다.

예:
- 처음 Job 실행 시 date parameter가 1월1일로 실행 됐다면, **1번** JobInstance가 생성된다.
- 다음 Job 실행 시 date parameter가 1월2일로 실행 됐다면, **2번** JobInstance가 생성된다.
- 다음 Job 실행 시 date parameter가 1월2일로 실행 됐다면, **2번** JobInstance가 재실행된다.
- 이때 Job이 재실행 대상이 아닌 경우 에러가 발생한다.
- Parameter가 없는 Job을 항상 새로운 JobInstance가 실행되도록 **RunIdIncrementer**가 제공된다.

### StepExecution / ExecutionContext

- **StepExecution** : BATCH_STEP_EXECUTION 테이블과 매핑
- **ExecutionContext** : BATCH_STEP_EXECUTION_CONTEXT 테이블과 매핑

![20220716_223337](/assets/20220716_223337.png)

### 작업 인스턴스와 작업 실행 컨텍스트

![20220716_160128](/assets/20220716_160128.png)

- 안의 작업 인스턴스는 별개다.
- 성공적으로 실행된 작업 인스턴스에 하나의 실행이 있을 시 작업을 다시 실행한다.
- 작업이 모종의 이유로 실행 실패 시 다른 작업을 실행할 수 있다.

작업 실행 컨텍스트에는 2가지 수준이 있다:

![20220716_160246](/assets/20220716_160246.png)

- **작업 수준** 실행 컨텍스트와 **단계 수준** 실행 컨텍스트
- 작업 실행 컨텍스트는 기본적으로 정보를 제공하는 맵(Map) 형식으로 저장
- 1단계에서 컨텍스트에 키 값을 넣으면 다른 단계에서도 해당 정보를 사용할 수 있다.
- 배치는 기본적으로 맵 형식으로 메타데이터를 넣어서 작업 실행 컨텍스트를 저장한다.

### 실행 순서 및 컨텍스트 실행 과정

![20220716_165717](/assets/20220716_165717.png)

단계 사이에 무언가 전달할 경우 작업 실행 컨텍스트로 이동한다.

---

## Task 기반 배치와 Chunk 기반 배치

### 비교

- 배치를 처리할 수 있는 방법은 크게 2가지

| 구분 | Tasklet (Task 기반) | Chunk 기반 |
|------|---------------------|------------|
| 적합한 경우 | 처리 과정이 비교적 단순한 경우 | 대량 처리 |
| 대량 처리 시 | 더 복잡 | 비교적 쉽게 구현 |
| 분할 처리 | 하나의 큰 덩어리를 나누기 부적합 | 예: 10,000개 중 1,000개씩 10개의 덩어리로 수행 |
| 구현 요소 | Tasklet | ItemReader, ItemProcessor, ItemWriter |

![20220717_123257](/assets/20220717_123257.png)

- **reader**에서 null을 return 할 때까지 Step은 반복
- `<INPUT, OUTPUT>chunk(int)`:
  - reader에서 INPUT을 return
  - processor에서 INPUT을 받아 processing 후 OUTPUT을 return (INPUT, OUTPUT은 같은 타입일 수 있음)
  - writer에서 `List<OUTPUT>`을 받아 write

---

## JobParameters 이해

- 배치 실행에 필요한 값을 **parameter**를 통해 외부에서 주입
- **JobParameters**는 외부에서 주입된 parameter를 관리하는 객체
- parameter를 JobParameters와 Spring EL(Expression Language)로 접근
  - `String parameter = jobParameters.getString(key, defaultValue);`
  - `@Value("#{jobParameters[key]}")`

---

## Chunk 기반 처리 전체 예제

### ChunkProcessingConfiguration

```java
package com.example.batchtest.thirdBatch;

import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.support.ListItemReader;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Slf4j
public class ChunkProcessingConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    public ChunkProcessingConfiguration(JobBuilderFactory jobBuilderFactory,
                                        StepBuilderFactory stepBuilderFactory) {
        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
    }

    @Bean
    public Job chunkProcessingJob() {
        return jobBuilderFactory.get("chunkProcessingJob")
                .incrementer(new RunIdIncrementer())
                .start(this.taskBaseStep())
                .next(this.chunkBaseStep(null))
                .build();
    }

    @Bean
    @JobScope
    public Step chunkBaseStep(@Value("#{jobParameters[chunkSize]}") String chunkSize) {

        return stepBuilderFactory.get("chunkBaseStep")
                .<String, String>chunk(StringUtils.isNotEmpty(chunkSize) ? Integer.parseInt(chunkSize) : 10)
                .reader(itemReader())
                .processor(itemProcessor())
                .writer(itemWriter())
                .build();
    }

    private ItemWriter<String> itemWriter() {
        return items -> log.info("chunk item size : {}", items.size());
        //items가 더해지고 100개의 리스트를 배치가 더해지고 item reader와 프로세스 거쳐서 writer에 옴
//        return items -> items.forEach(log::info);
    }

    private ItemProcessor<String, String> itemProcessor() {
        return item -> item + ", Spring Batch";
    }

    private ItemReader<String> itemReader() {
        return new ListItemReader<>(getItems());
    }

    @Bean
    public Step taskBaseStep() {
        return stepBuilderFactory.get("taskBaseStep")
                .tasklet(this.tasklet(null))
                .build();
    }

    @Bean
    @StepScope
    public Tasklet tasklet(@Value("#{jobParameters[chunkSize]}") String value) {
        List<String> items = getItems();

        return (contribution, chunkContext) -> {
            StepExecution stepExecution = contribution.getStepExecution();
//            JobParameters jobParameters = stepExecution.getJobParameters();
//            String value = jobParameters.getString("chunkSize", "10");

            int chunkSize = StringUtils.isNotEmpty(value) ? Integer.parseInt(value) : 10;

            int fromIndex = stepExecution.getReadCount();
            int toIndex = fromIndex + chunkSize;

            if (fromIndex >= items.size()) {
                return RepeatStatus.FINISHED;
            }

            List<String> subList = items.subList(fromIndex, toIndex);   //subLIst는 인덱스를 기준으로 중간 데이터 읽음.

            log.info("task item size : {}", subList.size());

            stepExecution.setReadCount(toIndex);

            return RepeatStatus.CONTINUABLE;
        };
    }

    private List<String> getItems() {
        List<String> items = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            items.add(i + " Hello");
        }

        return items;
    }

}
```

---

## @JobScope와 @StepScope 이해

**SCOPE는 빈의 라이프사이클을 설정할 수 있음** (기본은 싱글톤 스코프)

- `@Scope`는 어떤 시점에 bean을 생성/소멸 시킬 지 bean의 lifecycle을 설정
- **`@JobScope`**: job 실행 시점에 생성/소멸 → Step에 선언
- **`@StepScope`**: step 실행 시점에 생성/소멸 → Tasklet, Chunk(ItemReader, ItemProcessor, ItemWriter)에 선언
- Spring의 `@Scope`과 같은 것
  - `@Scope("job")` == `@JobScope`
  - `@Scope("step")` == `@StepScope`
- Job과 Step 라이프사이클에 의해 생성되기 때문에 **Thread safe**하게 작동
- `@Value("#{jobParameters[key]}")`를 사용하기 위해 `@JobScope`와 `@StepScope`는 **필수**

위의 예제들은 빈으로 사용해서 할 필요가 없었는데, task나 chunk를 써야 되면 JobScope나 JobParameters를 쓰면 빈으로 생성해서 사이클 관리를 해야한다.

---

## ItemReader

- 배치 대상 데이터를 읽기 위한 설정
  - 파일, DB, 네트워크 등에서 읽기 위함
- Step에 **ItemReader는 필수**
- 기본 제공되는 ItemReader 구현체: file, jdbc, jpa, hibernate, kafka 등
- ItemReader 구현체가 없으면 직접 개발
- **ItemStream**은 ExecutionContext로 read, write 정보를 저장

---

## 설정 템플릿

IntelliJ에서 Save as Live Template으로 등록해두면 편리하다.

```java
package com.example.batchtest.thirdBatch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.context.annotation.Bean;

public class TemplateConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    public TemplateConfiguration(JobBuilderFactory jobBuilderFactory,
                                 StepBuilderFactory stepBuilderFactory){


        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
    }

    @Bean
    public Job job(){
        return this.jobBuilderFactory.get("")
                .incrementer(new RunIdIncrementer())
                .start(this.step())
                .build();
    }

    @Bean
    public Step step(){
        return this.stepBuilderFactory.get("")//stepbuilder
                .chunk()
                .reader()
                .processor()
                .writer()
                .build();
    }
}
```

Live Template 설정 화면:

![20220717_134006](/assets/20220717_134006.png)
![20220717_134202](/assets/20220717_134202_u43xh5t2k.png)

![20220717_134439](/assets/20220717_134439.png)

Live Template 변수(`${PACKAGE_NAME}`, `${NAME}`, `${job_name}`, `${step_name}`) 활용 예시:

```java
package ${PACKAGE_NAME};

import org.springframework.batch.core.Job;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.context.annotation.Bean;

public class ${NAME} {  

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    public ${NAME}(JobBuilderFactory jobBuilderFactory,
                                 StepBuilderFactory stepBuilderFactory){


        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
    }

    @Bean
    public Job ${job_name}(){
        return this.jobBuilderFactory.get("${job_name}")
                .incrementer(new RunIdIncrementer())
                .start(this.${step_name}())
                .build();
    }

    @Bean
    public Step ${step_name}(){
        return this.stepBuilderFactory.get("")//stepbuilder
                  .chunk()
                  .reader()
                  .processor()
                  .writer()
                  .build();
    }
}

```
