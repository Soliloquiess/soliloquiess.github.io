---
title: "[Springboot] JPA Repository Methods"
layout: post
subtitle: Spring
date: "2024-01-23-04:58:53 +0900"
categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### JPA란

Spring Data JPA는 Java Persistence API (JPA)를 기반으로 하는 데이터 액세스를 지원하는 Spring 프레임워크의 일부입니다. JPA Repository는 데이터베이스와 상호 작용하기 위한 메서드를 정의하는 인터페이스입니다. 이를 통해 개발자는 데이터베이스 조작을 위한 쿼리를 명시적으로 작성하지 않고도 데이터를 조회, 삽입, 갱신, 삭제할 수 있습니다.
Spring Data JPA는 Java Persistence API (JPA)를 기반으로 하는 데이터 액세스를 지원하는 Spring 프레임워크의 일부입니다. JPA Repository는 데이터베이스와 상호 작용하기 위한 메서드를 정의하는 인터페이스입니다. 이를 통해 개발자는 데이터베이스 조작을 위한 쿼리를 명시적으로 작성하지 않고도 데이터를 조회, 삽입, 갱신, 삭제할 수 있습니다.

JPA Repository에서 사용할 수 있는 메서드들은 다양하며, 일반적으로 다음과 같은 패턴을 따릅니다:

1 . 쿼리 메서드(Query Methods): 메서드 이름으로 쿼리를 생성할 수 있습니다. 메서드 이름 자체가 쿼리의 일부로 해석되며, 특정 규칙에 따라 쿼리가 생성됩니다.

```
// 예: 이름을 기반으로 엔터티 찾기
List<Person> findByFirstName(String firstName);
```

2 . DSL(Domain Specific Language): Spring Data JPA는 QueryDSL과 함께 사용될 수 있습니다. 이를 통해 유연하고 타입 안전한 쿼리를 작성할 수 있습니다.

```
// QueryDSL을 사용한 예
List<Person> findByFirstNameAndLastName(String firstName, String lastName);
```

3 . @Query 어노테이션 사용: JPQL(Java Persistence Query Language)이나 네이티브 쿼리를 직접 작성하여 메서드에 적용할 수 있습니다.

```
// JPQL을 사용한 예
@Query("SELECT p FROM Person p WHERE p.firstName = ?1 AND p.lastName = ?2")
List<Person> findPeopleByFirstNameAndLastName(String firstName, String lastName);
```

4 . 파라미터 정의: 메서드에 파라미터를 추가하여 동적 쿼리를 작성할 수 있습니다.

```// 동적 쿼리 예
List<Person> findByFirstNameAndAge(String firstName, int age);
```

5 . 정렬과 페이징: 정렬과 페이징을 지원하는 메서드를 작성할 수 있습니다.

```
// 정렬된 결과를 가져오는 예
List<Person> findByLastNameOrderByFirstNameAsc(String lastName);

// 페이징 및 정렬 예
Page<Person> findByLastName(String lastName, Pageable pageable);
```

<br>

---

Spring Data JPA의 JpaRepository 인터페이스는 다양한 CRUD (Create, Read, Update, Delete) 작업을 지원하는 여러 메서드를 기본적으로 제공합니다. save() 메서드는 그 중 하나로, 엔터티를 저장하거나 갱신하는데 사용됩니다.

#### 1 . save() methods

save() 메서드는 다음과 같은 두 가지 시나리오에서 사용됩니다:

1 . 새로운 엔터티 저장:

새로운 엔터티를 생성하고, 이를 데이터베이스에 저장할 때 사용합니다.
엔터티에는 기본 키(auto-generated ID)가 없을 수 있습니다. save() 메서드는 이를 자동으로 생성하고 엔터티를 영구 저장소에 저장합니다.

```
// Person 엔터티를 저장하는 예
Person person = new Person();
person.setFirstName("John");
person.setLastName("Doe");

personRepository.save(person);
```

2 . 기존 엔터티 갱신:

이미 데이터베이스에 저장된 엔터티의 값을 변경하고, 이를 데이터베이스에 갱신할 때 사용합니다.
엔터티의 ID가 존재하는 경우, 해당 ID를 기반으로 데이터베이스에서 엔터티를 찾아 업데이트합니다.

```
// 이미 저장된 Person 엔터티를 갱신하는 예
Person existingPerson = personRepository.findById(1L).orElse(null);

if (existingPerson != null) {
    existingPerson.setFirstName("UpdatedFirstName");
    existingPerson.setLastName("UpdatedLastName");

    personRepository.save(existingPerson);
}

```

save() 메서드는 영속성 컨텍스트를 통해 엔터티를 추적하고, 상황에 따라 INSERT 또는 UPDATE 쿼리를 실행합니다. 필요에 따라 ID가 이미 존재하는지 여부에 따라 동적으로 동작합니다.

Spring Data JPA는 여러 다양한 save() 메서드의 오버로딩을 제공하며, 다양한 유형의 저장 작업을 지원합니다. 예를 들어, 여러 엔터티를 동시에 저장하거나, 특정 조건을 기반으로 저장 여부를 결정하는 등의 작업을 수행할 수 있습니다

<br>

---

2 . findById() 메서드는 Spring Data JPA에서 제공되는 JpaRepository 인터페이스의 메서드 중 하나로, 데이터베이스에서 특정 ID에 해당하는 엔터티를 조회하는데 사용됩니다. 주로 단일 엔터티를 검색할 때 활용됩니다.

메서드 시그니처는 다음과 같습니다:

```
Optional<T> findById(ID id);
```

T: 엔터티의 타입을 나타냅니다.
ID: 엔터티의 ID의 타입을 나타냅니다.
Optional< T >: 조회된 엔터티를 감싼 Optional 객체를 반환합니다. 이는 조회 결과가 null인 경우에 대비한 방법으로 사용됩니다.
예를 들어, Person이라는 엔터티가 있다고 가정하고, 해당 엔터티의 ID를 사용하여 데이터베이스에서 조회하는 코드는 다음과 같습니다:

```
import java.util.Optional;

public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void exampleFindById(Long personId) {
        // findById 메서드를 사용하여 ID에 해당하는 엔터티를 조회
        Optional<Person> personOptional = personRepository.findById(personId);

        // 조회 결과를 확인하고 작업 수행
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            System.out.println("Found person: " + person);
        } else {
            System.out.println("Person not found with ID: " + personId);
        }
    }
}
```

위 예제에서 findById() 메서드는 주어진 ID에 해당하는 Person 엔터티를 Optional로 감싸서 반환합니다. Optional은 Java 8 이후에서 null을 방지하고자 하는 목적으로 도입된 클래스입니다. 만약 조회 결과가 존재하지 않는 경우, Optional은 빈 상태를 나타내게 됩니다.

<br>

3 . saveAll() 메서드는 Spring Data JPA에서 제공되는 JpaRepository 인터페이스의 메서드 중 하나로, 여러 개의 엔터티를 한 번에 데이터베이스에 저장하거나 갱신하는 데 사용됩니다. 보통 컬렉션을 인자로 받아 해당 컬렉션에 포함된 여러 엔터티를 일괄적으로 저장합니다.

메서드 시그니처는 다음과 같습니다:

```
<S extends T> Iterable<S> saveAll(Iterable<S> entities);
```

여기서:

T: 엔터티의 타입을 나타냅니다.
S: T의 하위 타입이거나 같은 타입을 나타냅니다.
Iterable< S >: 여러 개의 엔터티를 담고 있는 Iterable입니다.
Iterable< S >: 저장된 엔터티들을 나타내는 Iterable을 반환합니다.
예를 들어, Person 엔터티를 저장하는데 사용할 수 있는 saveAll() 메서드의 예제는 다음과 같습니다:

```
import java.util.Arrays;

public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void exampleSaveAll() {
        // 여러 Person 엔터티를 생성
        Person person1 = new Person("John", "Doe");
        Person person2 = new Person("Jane", "Doe");
        Person person3 = new Person("Alice", "Smith");

        // 엔터티들을 리스트에 담아서 saveAll() 메서드로 일괄 저장
        Iterable<Person> savedPeople = personRepository.saveAll(Arrays.asList(person1, person2, person3));

        // 저장된 엔터티들에 대한 추가 작업 수행
        savedPeople.forEach(savedPerson -> System.out.println("Saved person: " + savedPerson));
    }
}
```

위의 예제에서 saveAll() 메서드는 Person 엔터티를 담은 리스트를 인자로 받아 일괄적으로 저장하고, 저장된 엔터티들을 반환합니다.

<br>

4 . findAll() 메서드는 Spring Data JPA에서 제공하는 JpaRepository 인터페이스의 메서드 중 하나로, 데이터베이스에 저장된 모든 엔터티를 조회하여 반환하는 데 사용됩니다. 메서드 시그니처는 다음과 같습니다:

```
Iterable<T> findAll();
```

T: 엔터티의 타입을 나타냅니다.
Iterable< T >: 조회된 모든 엔터티를 나타내는 Iterable을 반환합니다.
예를 들어, Person 엔터티를 조회하는데 사용할 수 있는 findAll() 메서드의 예제는 다음과 같습니다:

```
import java.util.List;

public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void exampleFindAll() {
        // findAll() 메서드를 사용하여 모든 Person 엔터티를 조회
        Iterable<Person> allPeople = personRepository.findAll();

        // 조회된 엔터티들에 대한 추가 작업 수행
        for (Person person : allPeople) {
            System.out.println("Found person: " + person);
        }
    }
}
```

findAll() 메서드는 데이터베이스에 저장된 모든 엔터티를 조회하여 Iterable로 반환합니다. 이후에는 해당 Iterable을 순회하거나 다른 방식으로 엔터티들에 대한 작업을 수행할 수 있습니다. 만약 엔터티가 많을 경우, findAll()을 사용할 때 성능상의 고려가 필요할 수 있습니다

5 . deleteById(), delete(), 그리고 deleteAll()

Spring Data JPA에서 제공하는 JpaRepository 인터페이스의 메서드들로, 엔터티를 데이터베이스에서 삭제하는데 사용됩니다.

5-1 . deleteById() - Delete a Single Entity from the Database:

deleteById() 메서드는 주어진 ID에 해당하는 엔터티를 데이터베이스에서 삭제합니다.
메서드 시그니처:

```
void deleteById(ID id);
```

여기서 ID는 엔터티의 ID 타입을 나타냅니다.

```
// 예: ID가 1인 Person 엔터티를 삭제
personRepository.deleteById(1L);
```

5-2 . delete() - Delete an Entity From the Database Table:

delete() 메서드는 주어진 엔터티를 데이터베이스에서 삭제합니다.
메서드 시그니처:

```
void delete(T entity);
```

여기서 T는 엔터티의 타입을 나타냅니다.

```
// 예: Person 엔터티를 삭제
Person person = personRepository.findById(1L).orElse(null);
if (person != null) {
    personRepository.delete(person);
}
```

5-3 . deleteAll() - Delete All the Entities From the Database Table:

deleteAll() 메서드는 데이터베이스에 저장된 모든 엔터티를 삭제합니다.
메서드 시그니처:

```
void deleteAll();
```

해당 메서드는 모든 엔터티를 삭제하므로 주의하여 사용해야 합니다.

```
// 예: 모든 Person 엔터티를 삭제
personRepository.deleteAll();
```

이러한 메서드들을 사용하여 엔터티를 삭제하면 데이터베이스에서 해당 엔터티들이 삭제됩니다. 삭제 작업은 주로 엔터티의 일부를 정리하거나 더 이상 필요하지 않은 데이터를 정리하는 데 사용됩니다.

<br>

6 . count() 메서드는 Spring Data JPA에서 제공하는 JpaRepository 인터페이스의 메서드 중 하나로, 데이터베이스 테이블에 저장된 레코드의 총 개수를 조회하는 데 사용됩니다.

메서드 시그니처는 다음과 같습니다

```
long count();
```

여기서 long은 데이터베이스 테이블에 저장된 레코드의 총 개수를 나타냅니다.

예를 들어, Person 엔터티를 사용하는 경우 count() 메서드는 데이터베이스에 저장된 모든 Person 레코드의 개수를 반환합니다:

```
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void exampleCount() {
        // count() 메서드를 사용하여 Person 엔터티의 총 개수 조회
        long personCount = personRepository.count();

        System.out.println("Total number of persons: " + personCount);
    }
}
```

이 메서드는 특정 조건에 맞는 레코드의 개수를 세는 것이 아니라, 테이블에 저장된 전체 레코드의 총 개수를 조회합니다. 이를 통해 특정 테이블에 저장된 데이터의 크기를 파악할 수 있습니다.

<br>

7 . existsById() 메서드는 Spring Data JPA에서 제공하는 JpaRepository 인터페이스의 메서드 중 하나로, 주어진 ID에 해당하는 엔터티가 데이터베이스에 존재하는지 여부를 확인하는 데 사용됩니다.

메서드 시그니처는 다음과 같습니다:

```
boolean existsById(ID id);
```

여기서:

ID: 엔터티의 ID 타입을 나타냅니다.
boolean: 주어진 ID에 해당하는 엔터티가 존재하면 true를, 그렇지 않으면 false를 반환합니다.

예를 들어, Person 엔터티를 사용하는 경우 existsById() 메서드는 데이터베이스에 해당 ID를 가진 Person 엔터티가 존재하는지 여부를 확인합니다:

```
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void exampleExistsById(Long personId) {
        // existsById() 메서드를 사용하여 주어진 ID에 해당하는 Person 엔터티의 존재 여부 확인
        boolean personExists = personRepository.existsById(personId);

        if (personExists) {
            System.out.println("Person with ID " + personId + " exists in the database.");
        } else {
            System.out.println("Person with ID " + personId + " does not exist in the database.");
        }
    }
}
```

이 메서드를 사용하면 엔터티의 존재 여부를 확인하여 추가적인 작업을 수행할 수 있습니다.

<br>

---
