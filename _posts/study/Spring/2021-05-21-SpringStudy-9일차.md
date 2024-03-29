---
title: "[Spring] SpringStudy-9일차"
layout: post
subtitle: Spring
date: "2021-05-11-23:58:53 +0900"

categories: study
tags: Spring
# layout: post
# title:  WebFrontEnd
# subtitle:   "시작하기"
# categories: study
# tags: java
comments: true
---

### 자바 ORM 표준 JPA 프로그래밍 6장

06 다양한 연관관계 매핑
엔티티의 연관관계를 매핑할 때는 다음 3가지 고려사항이 있다.

다중성
단방향, 양방향
연관관계의 주인
다중성
다대일: @ManyToOne
일대다: @OneToMany
일대일: @OneToOne
다대다: @ManyToMany
다중성을 판단하기 어려울 때는 반대방향을 생각하면 된다.

일대다 -> 다대일
일대일 -> 일대일
보통 다대일을 많이 사용하고
다대다 관계는 실무에서 거의 사용하지 않는다.

단방향, 양방향
DB 테이블은 방향이라는 개념이 없다.
반면에 객체는 참조가 있어야만 해당 객체를 탐색하므로 방향이 있다.

객체 관계에서 다른 객체를 참조하고 있다면 단방향이다.
객체 관계에서 서로간에 참조하고 있다면 양방향이다.
연관관계의 주인
연관관계의 주인이란, DB 테이블을 기준으로 외래키를 관리하는 테이블을 매핑한 객체를 뜻한다.
연관관계의 주인은 DB의 데이터를 실질적으로 처리한다.(CRUD)
반면에 주인이 아닌 객체는 READ만 가능하다.

연관된 객체를 주인으로 인정하기 위해 mappedBy=를 사용한다.
다대일(N:1)

![20210530_023624](/assets/20210530_023624.png)

다대일 관계의 반대 방향은 항상 일대다 관계고
일대다 관계의 반대 방향은 항상 다대일 관계이다.

DB 에서 외래 키는 항상 다에 있다.
따라서 객체 양방향 관계에서 연관관계의 주인은 항상 다쪽이다.

다대일 단방향
다대일 단방향은 가장 많이 사용하는 연관관계이며
우리가 추구해야할 연관관계이다.

Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    @ManyToOne
    @Joincolumn(name = "TEAM_ID")
    private Team team;

    // Getter, Setter
    ...

}
Team

@Entity
public class Team {

    @Id @GeneratedValue
    @Column(name = "TEAM_ID")
    private Long id;

    private String name;

    // Getter, Setter
    ...

}
회원은 Member.team을 통해서 Team 엔티티를 조회할 수 있다.
반대로 팀은 회원을 참조하는 필드가 없기에 다대일 단방향 연관관계가 되었다.

Member는 @Joincolumn을 통해,
TEAM_ID라는 외래키를 관리하며, 의존관계 주인이 되어 DB로직 처리를 담당한다.

다대일 양방향
양방향이기에 두 객체 중 하나의 객체를 연관관계의 주인으로 지정해야한다.
대개, 외래키가 있는 쪽이 연관관계의 주인이 된다.

Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    @ManyToOne
    @Joincolumn(name = "TEAM_ID")
    private Team team;

    public void setTeam(Team team) {
        this.team = team;

        // 무한루프에 빠지지 않도록 체크
        if(!team.getMembers().contains(this)) {
            team.getMembers().add(this);
        }
    }

}
Team

@Entity
public class Team {

    @Id @GeneratedValue
    @Column(name = "TEAM_ID")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "team")
    private List<Member> members = new ArrayList<>();

    public void addMember(Member member) {
        this.members.add(member);
        if (member.getTeam() != this) {  // 무한루프에 빠지지 않도록 체크
            member.setTeam(this);
        }
    }

}
양방향은 외래 키가 있는 쪽이 연관관계의 주인이다.
일대다와 다대일 연관관계는 항상 다에 외래 키가 있다.
그렇기에 Member.team이 연관관계의 주인이 된다.
JPA는 외래 키를 관리할 때 연관관계의 주인만 사용한다.
주인이 아닌 Team.members는 조회를 위한 JPQL이나 객체 그래프를 탐색할 때 이용한다.

양방향 연관관계는 항상 서로를 참조해야 한다.
양방향 연관관계는 서로를 참조하고 있는 형태이다.
항상 서로를 참조하게 하려면 연관관계 편의 메서드를 작성하는 것이 좋은데
회원의 setTeam(), 팀의 addMember() 메서드가 이런 연관관계 편의 메서드들이다.

연관관계 편의 메서드는 한 곳에만 작성하거나 양쪽 다 작성할 수 있는데,
양쪽에 다 작성하면 무한루프에 빠지므로 주의해야한다.
인강/책에 나온 코드들을 양쪽에 작성했는데 실은 둘 중 하나만 호출하면 된다.
또한, 무한루프에 빠지지 않도록 검사하는 로직도 넣어줘야 한다.

이거 다음에 물어볼 것

**실무에서는 어떻게 사용할까?**  
연관관계의 주인만을 사용하는 것 같다.

![20210530_025301](/assets/20210530_025301.png)

일대다(1:N)
일대다 관계는 다대일 관계의 반대 반향이다.
일대다 관계는 엔티티를 하나 이상 참조할 수 있으므로 JCF를 이용한다.
다대일과의 차이점으로는 연관관계의 주인을 일에 둔다는 것이다.
무조건 다쪽에 외래키가 들어간다.

일대다 단방향
하나의 Team은 여러 Member를 참조할 수 있다.
일대다 단방향관계는 다대일 단방향과 다르게 일이 외래 키를 관리한다.
보통 자신이 매핑한 테이블의 외래 키를 관리하는데,
이 매핑은 반대쪽 테이블에 있는 외래 키를 관리한다.
즉, Team엔티티에서 members라는 변수를 통해 외래 키를 관리하는 형태가 된다.

Team

@Entity
public class Team {

    @Id @GeneratedValue
    @Column(name = "TEAM_ID")
    private Long id;

    private String name;

    @OneToMany
    @JoinColumn(name = "TEAM_ID") // MEMBER 테이블의 TEAM_ID (FK)
    private List<Member> members = new ArrayList<>();

    // Getter, Setter ...

}
Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    // Getter, Setter
    ...

}
일대다 단방향 관계를 매핑할 때는 @JoinColumn을 명시해야 한다.
그렇지 않으면 JPA는 연결테이블을 중간에 두고 연관관계를 관리하는
조인 테이블 전략을 기본으로 사용해서 매핑한다.

일대다 단방향 매핑의 단점
매핑한 객체가 관리하는 외래 키가 다른 테이블에 있다.
본인 테이블에 외래 키가 있으면 엔티티의 저장과 연관관계 처리를
INSERT SQL 한 번으로 끝낼 수 있지만,
다른 테이블에 외래 키가 있으면 연관관계 처리를 위한 UPDATE SQL을 추가로 실행해야한다.

Main

Member member1 = new Member("member1");
Member member2 = new Member("member2");

Team team1 = new Team("team1);
team1.getMembers().add(member1);
team1.getMembers().add(member2);

em.persist(member1); // INSERT
em.persist(member2); // INSERT
em.persist(team1); // INSERT
// UPDATE  
transaction.commit();
실행된 SQL

insert into Member (MEMBER_ID, username) values (null, ?);  
insert into Member (MEMBER_ID, username) values (null, ?);  
insert into Team (TEAM_ID, name) values(null, ?);
update Member set TEAM_ID=? where MEMBER_ID=?;  
update Member set TEAM_ID=? where MEMBER_ID=?;  
실제로 실행된 SQL 문을 보게 된다면
UPDATE 문이 실행되는 것을 알 수 있다.

일대다 단방향 매핑보다는 다대일 양방향 매핑을 사용하자
일대다 단방향 매핑을 사용하면 엔티티를 매핑한 테이블이 아닌 테이블의 외래 키를 관리해야한다.
이것은 성능 문제도 있지만 다른 테이블의 외래키를 관리한다는 것도 부담스럽다.
문제를 해결하는 좋은 방법은 일대다 단방향 매핑 대신에 다대일 양방향 매핑을 사용하는 것이다.

일대다 양방향
JPA에서는 일대다 양방향 매핑을 공식적으로 지원하지는 않는다.
만약, 이를 사용하고자 한다면 다대일 양방향 매핑을 사용해야 한다.
대신 기존 다대일 양방향 매핑과의 다른점은
@ManyToOne인 Member가 연관관계의 주인이 아니라
@OneToMany인 Team이 연관관계의 주인인 것이다.

하지만 앞서 말했듯이 @ManyToOne는 mappedBy=라는 속성 값이 존재하지 않는다.
그렇다면 어떻게해야 연관관계의 주인(CRUD)과 대상(READ)으로 나눌 수 있을까? 🤔

방법은 간단하다.
주인 객체는 @JoinColumn을 이용하고
반대 객체도 @JoinColumn을 이용하되
읽기 전용 속성(inseratble, updateable)을 사용하면 된다.

Team

@Entity
public class Team {

    @Id @GeneratedValue
    @Column(name = "TEAM_ID")
    private Long id;

    private String name;

    @OneToMany
    @JoinColumn(name = "TEAM_ID") // MEMBER 테이블의 TEAM_ID (FK)
    private List<Member> members = new ArrayList<>();

    // Getter, Setter ...

}
Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    @ManyToOne
    @JoinColumn(name="TEAM_ID", insertable=false, updatable=false)
    private Team team;

    // Getter, Setter...

}
이 방법은 일대다 양방향 매핑이라기보다는
일대다 단방향 매핑 반대편에 다대일 단방향 매핑을 읽기 전용으로 추가해서
일대다 양방향처럼 보이도록 하는 방법이다.

하지만, 단방향 매핑이 가지는 단점을 그대로 가져가기에
될 수 있으면 다대일 양방향 매핑을 사용하도록 하자

![20210530_032722](/assets/20210530_032722.png)

일대일(1:1)
일대일 관계는 양쪽이 서로 하나의 관계만을 가진다.

일대일 관계는 그 반대도 일대일이라는 특징을 가지고 있다.
주 테이블이나 대상 테이블 상관 없이, 아무 테이블에서나 외래키를 관리 가능하다.
1대1 관계이기에 unique 제약 조건을 사용할 수 있다.(권장한다)
주 테이블에 외래키
주 객체가 대상 객체를 참조하는 것처럼, 주 테이블에 외래 키를 두고 대상 테이블을 참조한다.
외래키를 객체 참조와 비슷하게 사용할 수 있어서 객체지향 개발자들이 선호한다.
또한, 주 테이블이 자주 조회되는 객체라면 객체 탐색 그래프를 이용하기 편해진다.

대상 테이블에 외래키
전통적인 DBA 분들은 대상 테이블에 외래키를 두는 것을 선호한다.
이 방법의 장점은 일대일에서 일대다로 변환이 필요할 때, 구조를 변경할 필요가 없다는 점이다.

주 테이블에 외래키
일대일 관계를 구성할 때 객체지향 개발자들은 주 테이블에 외래키가 있는 것을 선호한다.

단방향
Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    @OneToOne
    @JoinColumn(name = "LOCKER_ID")
    private Locker locker;

    ...

}
Locker

@Entity
public class Locker {

    @Id @GeneratedValue
    @Column(name = "LOCKER_ID")
    private Long id;

    private String name;

}
일대일 관계 이므로 객체 매핑에 @OneToOne을 사용했다.

양방향
Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    @OneToOne
    @JoinColumn(name = "LOCKER_ID")
    private Locker locker;

    ...

}
Locker

@Entity
public class Locker {

    @Id @GeneratedValue
    @Column(name = "LOCKER_ID")
    private Long id;

    private String name;

    @OneToOne(mappedBy = "locker")
    private Member member;
    ...

}
양방향 관계이므로 연관관계의 주인을 지정해야한다.
일단 현재 단의 컨셉은 주 테이블이 연관관계의 주인이 되는 것이므로
대상 테이블인 Locker 에서 mappedBy= 속성을 사용했다.

![20210530_032945](/assets/20210530_032945.png)

대상 테이블에 외래키
단방향
일대일 관계 중 대상 테이블에 외래 키가 있는 단방향 관계는 JPA에서 지원하지 않는다.
그리고 이런 모양으로 매핑할 수 있는 방법도 없다.
이럴 때는 단방향 관계를 Locker -> Member 방향으로 수정하거나,
양방향 관계로 만들고 Locker를 연관관계 주인으로 설정해야한다.

참고로, JPA 2.0 부터는 일대다 단방향 관계에서 대상 테이블에 외래키가 있는 매핑을 허용했지만
일대일 단방향 관계에서는 대상 테이블에 외래키가 있는 매핑을 허용하지 않는다.

양방향
Member

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    private String username;

    @OneToOne(mappedBy = "member")
    private Locker locker;

    ...

}
Locker

@Entity
public class Locker {

    @Id @GeneratedValue
    @Column(name = "LOCKER_ID")
    private Long id;

    private String name;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    ...

}
일대일 매핑에서 대상 테이블에 외래 키를 두고 싶으면 이렇게 양방향으로 매핑한다.
주 엔티티인 Member 엔티티 대신에
대상 엔티티인 Locker를 연관관계의 주인으로 만들어서
LOKCER 테이블의 외래키를 관리하도록 한다.

주의
프록시를 사용할 때,
외래 키를 직접 관리하지 않는 일대일 관계는 지연로딩으로 설정해도 즉시 로딩된다.
예를 들어, Locker.member는 지연 로딩할 수 있지만,
Member.locker는 지연 로딩으로 설정해도 즉시 로딩된다.
이것은 프록시의 한계 때문에 발생하는 문제인데,
프록시 대신에 bytecode instrumentation 을 사용하면 해결할 수 있다.

그렇다면 왜 즉시 로딩 되는 것일까? 🤔
JPA 입장에서, 프록시 객체를 만들려면 참조하는 값이 무조건 존재해야한다.
주 테이블에 외래 키가 있는 경우에는 바로 매핑된 테이블을 검색해서
실제 값이 있다면 실제 값을, 값이 없다면 null 값을 넣어주면 되지만,

주 테이블이 아닌 대상 테이블에 외래키가 있다면
주 테이블은 무조건 대상 객체를 통해서 대상 테이블의 외래키를 탐색해야 한다.
그렇기에 지연로딩을 설정했다 하더라도 프록시를 위해 즉시로딩이 되는 것이다.

![20210530_034703](/assets/20210530_034703.png)

다대다(N:M)
RDB는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없다.
그렇기에, 다대다 관계를 일대다 + 다대일 관계로 풀어내는 연결 테이블을 사용한다.

그러나 객체는 테이블과 다르게 객체 2개만 가지고서도 다대다 관계를 만들 수 있다.
서로간에 객체를 컬렉션을 이용하여 저장하고 참조하면 되기 때문이다.

다대다 단방향
Member

@Entitiy
public class Member {

    @Id @Column(name = "MEMBER_ID")
    private String id;

    private String username;

    @ManyToMany
    @JoinTable(name = "MEMBER_PRODUCT",
               joinColumns = @JoinColumn(name = "MEMBER_ID"),
               inverseJoinColumns = @JoinColumn(name = "PRODUCT_ID"),
    private LIst<Product> products = new ArrayList<>();

}
Product

@Entity
public class Product {

    @Id @Column(name = "PRODUCT_ID")
    private string id;

    private String name;
    ...

}
Member와 Product 엔티티를 @ManyToMany로 매핑했다.
여기서 중요한 점은 @ManyToMany와 @JoinTable로 매핑을 진행했다는 것이다.
이를 이용하여 연결 엔티티인 Member_Product없이도
연결 테이블인 MEMBER_PRODUCT를 만들어서 사용할 수 있다.

@JoinTable(name = "이름") : 연결 테이블을 생성하고, 이름을 지정한다.
joinColumns = @JoinColumn(name = "이름") : 현재 방향인 Member와 매핑할 조인 컬럼 정보를 지정한다.
inverseJoinColumns = @JoinColumn(name = "이름"): 반대 방향인 상품과 매핑할 조인 컬럼 정보를 지정한다.
속성 기능
joinColumns 현재 엔티티를 참조하는 연결 테이블간의 외래키
inverseJoinColumns 반대방향 엔티티를 참조하는 연결 테이블간의 외래키
@ManyToMany를 통해 다대다 관계를 설정할 경우
DB 테이블의 연결 테이블과 매핑된 연결 엔티티를 신경쓰지 않고도 구현할 수 있다.

이와 같이 정의할 경우
우리는 참조한 객체를 탐색해서 사용하는 것 같지만,
DB 테이블 관점에서 보면 연결 테이블에서 데이터를 가져오고 있다.

저장

       public void save() {
       // 상품 영속성 컨텍스트에 등록
       Product productA = new Product();
       productA.setId("productA");
       productA.setName("상품A");
       em.persist(productA);

       // 유저에 상품 등록, 단방향에다가 주인은 Member 이기에 JCF에 값만 넣어줘도 연관관계 등록이 된다.
       Member member1 = new Member();
       member1.setId("member1");
       member1.setUsername("회원1");
       member1.getProducts().add(productA);
       em.persist(member1);

}
INSERT INTO PRODUCT..
INSERT INTO MEMBER..
INSERT INTO MEMBER_PRODUCT..  
회원1과 상품 A의 연관관계를 설정했으므로 회원1을 저장할 때 연결 테이블에도 값이 저장된다.

탐색

public void find() {
Member member = em.find(Member.class, "member1");
List<Product> products = member.getProducts();
for (Product product : products) {
System.out.println("product.name = " + product.getNmae());
}
}
List<Product> products = member.getProducts();에 대한 SQL을 보자면 아래와 같다.

SELECT \* FROM MEMBER_PRODUCT MP
INNER JOIN PRODUCT P ON MP.PRODUCT_ID=P.PRODUCT_ID
WHERE MP.MEMBER_ID=?
실행된 SQL을 보면,
연결 테이블인 FROM MEMBER_PRODUCT 와 상품 테이블을 조인해서 연관된 상품을 조회한다.

다대다 양방향
기존 다대다 단방향 매핑에서
역방향인, Product 클래스에도 @ManyToMany를 사용하여 참조를 추가하면 된다,
그리고 일대일과 마찬가지로 원하는 곳에 연관관계의 주인을 지정해주자.(mappedBy=를 이용한다)

Member

@Entitiy
public class Member {

    @Id @Column(name = "MEMBER_ID")
    private String id;

    private String username;

    @ManyToMany
    @JoinTable(name = "MEMBER_PRODUCT",
               joinColumns = @JoinColumn(name = "MEMBER_ID"),
               inverseJoinColumns = @JoinColumn(name = "PRODUCT_ID"),
    private List<Product> products = new ArrayList<>();

}
Product

@Entity
public class Product {

    @Id @Column(name = "PRODUCT_ID")
    private string id;

    private String name;

    @ManyToMany(mappedBy = "products")
    private List<Member> members = new ArrayList<>();
    ...

}
위와 같이 코드를 작성하고
다대다 양방향 연관관계는 다음처럼 설정하면 된다.

연관관계 설정하는 법

member.getProducts().add(product);
product.getMembers().add(member);
그리고, 여타 다른 연관관계처럼
양방향 연관관계는 연관관계 편의 메서드를 추가해서 관리하는 것이 편리하다.
다음처럼 Member 엔티티에 연관관계 편의 메서드를 추가하자

연관관계 편의 메서드

public void addProduct (Product product) {
...
products.add(product);
prodcut.getMembers().add(this);
}
이를 활용하면, member.addProduct(product);를 통해 간단히 설정할 수 있다.

역방향 탐색

public void findInverse() {

    Product product = em.find(Product.class, "productA");
    List<Member> members = product.getMembers();
    for (Member member : members) {
        System.out.println("member = " + member.getUsername());
    }

}
양방향 연관관계로 만들었으므로
product.getMembers();를 사용해서 역방향으로 객체 그래프를 탐색할 수 있다.

다대다 매핑의 한계와 극복, 연결 엔티티 사용
보통 연결 테이블에는 기존의 테이블들의 정보 말고도 추가 정보 필요하다.
주문을 가정했을시, 수량 컬럼/주문한 날짜와 같은 정보들 말이다.

이러한 경우 객체 연결관계에서는 새로운 컬럼들을 매핑할 수 없다는 문제가 발생한다.
그러므로 이를 처리하기 위해서 연결 테이블과 매핑되는 연결 엔티티를 만드는 것이 좋다.

MemberProduct

@Enitity
@IdClass(MemberProductId.class)  
public class MemberProduct {

    @Id
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Id
    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    // 추가될 컬럼
    private int orderAmount;

}
이렇게 연결 엔티티를 만들면,
기존에 있던 엔티티들은 @ManyToMany를 사용할 수 없다.
해당 엔티티들은 앞으로 연결 엔티티인 MemberProduct와 연결되기 때문이다.

Member

@Entitiy
public class Member {

    @Id @Column(name = "MEMBER_ID")
    private String id;

    private String username;

    @OneToMany(mappedBy = "member")
    private List<MemberProduct> memberProducts = new ArrayList<>();

    ...

}
Product

@Entity
public class Product {

    @Id @Column(name = "PRODUCT_ID")
    private string id;

    private String name;

    ...

}
Member엔티티는 양방향 관계로 사용될 가능성이 높기에 양방향으로 설정했고
Product엔티티는 단방향만으로 충분할 것 같기에 참조를 추가하지 않았다.
그리고 다가 외래키를 가진 형태이므로 MemberProduct가 주인이 되도록 한다.

참고로, 단방향으로 결정할지 양방향으로 결정할지에 대해서 선정 기준은
해당 클래스부터 객체 그래프 탐색 기능이 필요하다면 추가하는 것이다.

MemberProductId-회원상품 식별자 클래스

public class MemberProductId implements Serializable {

    private String member;
    private String product;

    // hashCode and equals

    @Override
    public boolean equals(Object o) {...}

    @Override
    public int hashCode() {...}

}
MemberProduct 연결 엔티티를 보면,
기본키를 매핑하는 @Id와
외래키를 매핑하는 @JoinColumn을 동시에 사용해서
기본키 + 외래키를 한번에 매핑하고 있는 것을 알 수 있다.
그리고 @IdClass(MemberProductId.class)를 사용해서 복합 기본키를 매핑했다.

복합 기본키
MemberProduct 엔티티는 기본키가 MEMBER_ID와 PRODUCT_ID로 이루어진 복합 기본키다.
JPA에서 복합 키를 사용하려면 별도의 식별자 클래스를 만들어야 한다.
그리고 엔티티에 @IdClass를 사용해서 식별자 클래스를 지정하면 된다.

복합키를 위한 식별자 클래스는 다음과 같은 특징이 있다.

복합키는 별도의 식별자 클래스로 만들어야 한다.
Serializable을 구현해야한다.
equals와 hashcode 메서드를 구현해야 한다.
기본 생성자가 있어야 한다.
식별자 클래스는 public 이어야 한다.
@IdClass를 사용하는 방법 외엔 @EmbededId를 사용하는 방법도 있다.
JPA에서 복합키를 구현하는 방법은?

Entity에는 보통 @Id를 하나만 사용한다.
BUT, 복합키로 이뤄져 있을 때는 아래를 고려하여 설계해야 한다.
@Embeddable, @IdClass 두개를 사용하여 복합키를 설정한다.
@EmbededId는 @IdClass 방식 보다 좀더 객체지향 방식
@EmbeddedId 를 이용하여 엔티티를 설계할 때에는
Serializable 인터페이스를 구현한 클래스를 선언하고
필드에 복합키로 사용되는 컬럼을 선언하면 된다.
식별 관계 MemberProduct는 Member와 Product의 기본키를 받아서 자신의 기본키로 사용한다.
이렇게 부모 테이블의 기본 키를 받아서 자신의 기본키 + 외래키로 사용하는 것을
DB용어로 식별 관계라 말한다.

저장

public void save() {

    // 회원 저장
    Member member1 = new Member();
    member1.setId("member1");
    member1.setUsername("회원1");
    em.persist(member1);

    // 상품 저장
    Product productA = new Product();
    productA.setId("productA");
    productA.setName("상품1");
    em.persist(productA);

    // 회원상품 저장
    MemberProduct memberProduct = new MemberProduct();
    memberProduct.setMember(member1);
    memberProduct.setProduct(productA);
    memberProduct.setOrderAmount(2);

    em.persist(memberProduct);

}
회원상품 엔티티를 만들면서 연관된 회원 엔티티와 상품 엔티티를 설정했다.
회원상품 엔티티는 데이터베이스에 저장될 때,
연관된 회원의 식별자와 상품의 식별자를 가져와서 자신의 기본 키 값으로 사용한다.

조회

public void find() {

    // 기본키 값 생성
    MemberProductId memberProductId = new MemberProductUd();
    memberProductId.setMember("member1");
    memberProductId.setProduct("productA");

    // memberProductId 가 id값이 되어 연결 테이블을 찾을 수 있다.
    MemberProduct memberProduct = em.find(MemberProduct.class, memberProductId);

    Member member = memberProduct.getMember();
    Product product = memberProduct.getProduct();

    System.out.println("member = " + member.getUsername());
    System.out.println("product = " + product.getName());
    System.out.println("orderAmount = " + memberProduct.getOrderAmount());

}
지금까지와 달리, 복합키를 위한 클래스를 만들었으므로
복합키 클래스의 객체를 만들어서 em.find()를 통해 엔티티를 조회해야한다.

복합키를 사용하는 방법은 복잡하다.
단순히 컬럼 하나만 기본키로 사용하는 것과 비교해서
복합키를 사용하면 ORM 매핑에서 처리할 일이 상당히 많아진다.

복합키를 위한 식별자 클래스도 만들어야하고,
@IdClass또는 @EmbeddedId도 사용해야한다.
그리고 식별자 클래스에 equals, hashCode도 구현해야 한다.

다대다 : 새로운 기본 키 사용
추천하는 기본키 생성 전략은
DB에서 자동으로 생성해주는 대리키를 Long 값으로 사용하는 것이다.

이 전략의 장점으로 간편하고 거의 영구히 쓸 수 있으며 비즈니스에 의존하지 않는다.
그리고 ORM 매핑시에 복합키를 만들지 않아도 되므로 간단한 매핑을 완성시켜준다.

이번에는 기존 연결 테이블과 다르게 Order라는 연결 클래스로 정의해보자

MemberProduct

@Table(name = "ORDERS")
@Enitity
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    // 추가될 컬럼
    private int orderAmount;

}
ORDER_ID라는 새로운 기본키를 하나 만들고
MEMBER_ID, PRODUCT_ID컬럼을 외래키로만 사용한다.

Member

@Entitiy
public class Member {

    @Id @Column(name = "MEMBER_ID")
    private String id;

    private String username;

    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();

    ...

}
Product

@Entity
public class Product {

    @Id @Column(name = "PRODUCT_ID")
    private string id;

    private String name;

    ...

}
저장 코드

public void save() {

    // 회원 저장
    Member member1 = new Member();
    member1.setId("member1");
    member1.setUsername("회원1");
    em.persist(member1);

    // 상품 저장
    Product productA = new Product();
    productA.setId("productA");
    productA.setName("상품1");
    em.persist(productA);

    // 주문 저장
    Order order = new Order();
    order.setMember(member1);      // 연관관계 설정
    order.setProduct(productA);    // 연관관계 설정
    order.setOrderAmount(2);
    em.persist(order);

}
조회하는 코드

public void find() {

    Long orderId = 1L;
    Order order = em.find(Order.class, orderId);

    Member member = order.getMember();
    Product product = order.getProduct();

}
식별자 클래스를 사용하지 않아서 코드가 한결 단순해진다.
이처럼 새로운 기본키를 사용해서 다대다 관계를 풀어내는 것도 좋은 방법이다.

다대다 연관관계 정리
다대다 관계를 일대다 관계, 다대일 관계로 풀어내기 위해
연결 테이블을 만들 때 식별자를 어떻게 구성할지 선택해야 한다.

식별 관계 :
받아온 식별자를 기본키 + 외래키로 사용한다.
부모 테이블의 기본키를 받아서 자식 테이블의 기본키 + 외래키로 사용하는 방법이다.
비식별 관계 :
받아온 식별자는 외래키로만 사용하고 새로운 식별자를 추가한다.
외래키로만 사용하는 방법
