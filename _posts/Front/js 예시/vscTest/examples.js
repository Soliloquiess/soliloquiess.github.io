/**
 * 
 * 원시 타입 / 참조 타입 / 원시 래퍼 타입 
 * 
 */

var one = 1;
var two = 2;

one = two

one = 3;
console.log(two); //—> one 과 two 변수는 모두 고유하다.

//------------------------------------//

var objOne = { one: 1 };
var objTwo = { two: 2 };

objTwo = objOne;

objTwo.one = 3;

console.log(objOne.one);

//------------------------------------//

var name = "bit";
console.log(name.concat("coin"));


var name = "bit";
var temp = new String(name);
console.log(temp.concat("coin"));
temp = null;


var name = "bit";
name.coin = "coin";
console.log(name.coin);



/**
 * 
 * 좀 더 this 하기
 * 
 */

function menuGlobal() {
    console.log("오늘 저녁은 " + this.name);
}

var myDiner = {
    name: "김치찌개",
    menu: menuGlobal
}
myDiner.menu();


var yourDiner = {
    name: "된장찌개",
    menu: menuGlobal
}
yourDiner.menu();

//------------------------------------//

function menuGlobal(item) {
    console.log("오늘 저녁은 " + item + this.name);
}

var myDiner = {
    name: "김치찌개"
}


var yourDiner = {
    name: "된장찌개"
}

menuGlobal.call(myDiner, "묵은지");
menuGlobal.call(yourDiner, "삼겹살");

//------------------------------------//

function menuGlobal(item1, item2) {
    [item1, item2].forEach(function (el) {
        console.log(this);
        console.log("오늘 저녁은 " + el + this.name)
    }, this);
}

var myDiner = {
    name: "김치찌개"
}


var yourDiner = {
    name: "된장찌개"
}

menuGlobal.apply(myDiner, ["묵은지", "삼겹살"]);
menuGlobal.apply(yourDiner, ["두부", "애호박"]);

//------------------------------------//

function menuGlobal(item) {
    console.log("오늘 저녁은 " + item + this.name);
}

var myDiner = {
    name: "김치찌개"
}

var yourDiner = {
    name: "된장찌개"
}

var menuGlobalForMe = menuGlobal.bind(myDiner);
var menuGlobalForYou = menuGlobal.bind(yourDiner);


console.log(menuGlobalForMe("묵은지"));
console.log(menuGlobalForYou("삼겹살"))

myDiner.menuMine = menuGlobalForYou;
myDiner.menuMine("묵은지");

//------------------------------------//

function menuGlobal(item1, item2) {
    [item1, item2].forEach(function (el) {
        console.log("오늘 저녁은 " + el + this.name)
    }, this);
}

var myDiner = {
    name: "김치찌개"
}


var yourDiner = {
    name: "된장찌개"
}

menuGlobal.apply(myDiner, ["묵은지", "삼겹살"]);
menuGlobal.apply(yourDiner, ["두부", "애호박"]);


/**
 * 
 * 저격수의 소양, Scope
 * 
 */

var func1 = function () {
    var a = 1;
    var b = 2;
    console.log(a + b);
};

var a = 20;
func1();

//------------------------------------//

var func = function () {
    var a = 1;
    var b = 2;

    var func2 = function () {
        var b = 5;
        var c = 6;
        a = a + b + c;

        console.log(a);
    };
    func2();
};

func();

function test() {
    val = "hello";
    var val2 = "world";
}
test();

console.log(val);
console.log(val2);
//선언되지 않은 전역변수에 주의

//------------------------------------//

if (true) {
    var value = "hello";
}
console.log(value);

if (true) {
    let value = "world";
}
console.log(value);


/**
 *
 * 그것이 알고싶다. 클로저
 *
 */

var outer = function () {
    var a = 1;
    var inner = function () {
        var b = 5;
        var c = 6;
        a = a + b + c;
        console.log(a);
    };
    inner();
};
outer();

//------------------------------------//

var outer = function () {
    var a = 1;
    var inner = function () {
        var b = 5;
        var c = 6;
        a = a + b + c;
        console.log(a);
    };
    return inner;
};

var newInner = outer();
newInner();

//------------------------------------//

var person = (function () {
    var age = 15;

    return {
        name: "wade",

        getAge: function () {
            console.log(age);
            return age;
        },

        setAge: function (val) {
            age = val;
            console.log(age);
        }
    }
})();

person.getAge();
person.setAge(20);

person.age = 30;
person.getAge();


/**
 *
 * 객체 공장장, 생성자
 *
 */


function MyOwn() { }

var myObj = new MyOwn();

console.log(myObj instanceof MyOwn);
console.log(myObj.constructor === MyOwn);

//------------------------------------//

function Food(name) {
    this.name = name;
    this.smell = function () {
        console.log(this.name + " 냄새가 난다");
    }
}

var myFood1 = new Food("특재 파스타");
var myFood2 = new Food("해물 파스타");
var myFood3 = new Food("토마토 파스타");

console.log(myFood1.name);
myFood1.smell();

console.log(myFood2.name);
myFood2.smell();

console.log(myFood3.name);
myFood3.smell();

//------------------------------------//

function Food(name) {
    this.name = name;
    this.smell = function () {
        console.log(this.name + " 냄새가 난다");
    }
}

var myFood1 = Food("특재 파스타");

console.log(myFood1.name);
myFood1.smell();
// error


/**
 *
 * 드러나는 비밀, 프로토타입
 *
 */

function smell() {
    console.log(this.name + " 냄새가 난다");
}

function Food(name) {
    this.name = name;
    this.smell = smell;
}

var myFood = new Food("로제 파스타");
var myFood2 = new Food("창란젓");

myFood.smell();
myFood2.smell();

console.log(myFood.smell === myFood2.smell);

//------------------------------------//

Food.prototype.smell = function () {
    console.log(this.name + " 냄새가 난다");
}

function Food(name) {
    this.name = name;
}

var myFood = new Food("로제 파스타");
var myFood2 = new Food("청국장");

myFood.smell();
myFood2.smell();


/**
 *
 * 서브 타입 & 슈퍼 타입
 *
 */

// 기본 소시지 레시피
function Sausage(el1, el2) {
    this.inside1 = el1;
    this.inside2 = el2;
}

Sausage.prototype.taste = function () {
    return this.inside1 + "와 " + this.inside2 + " 맛이 난다!";
}

var mySausage = new Sausage("돼지고기", "마늘");
console.log(mySausage.taste());



// 불맛 소시지 레시피
function FireSausage(el1, el2, el3) {
    this.inside1 = el1;
    this.inside2 = el2;
    this.inside3 = el3;
}

FireSausage.prototype.taste = function () {
    return this.inside1 + "와 " + this.inside2 + " 맛이 난다!";
}

FireSausage.prototype.flavor = function () {
    return this.inside3 + "의 풍미도 있다!";
}


var myNewSausage = new FireSausage("돼지고기", "마늘", "불맛");

console.log(myNewSausage.taste());
console.log(myNewSausage.flavor());

//------------------------------------//

function FireSausage(el1, el2, el3) {
    Sausage.call(this, el1, el2);
    this.inside3 = el3;
}

var myNewSausage = new FireSausage("돼지고기", "마늘", "불맛");
console.log(myNewSausage.inside1);
console.log(myNewSausage.inside2);
console.log(myNewSausage.inside3);

//------------------------------------//

FireSausage.prototype = Object.create(Sausage.prototype);
FireSausage.prototype.constructor = FireSausage;

FireSausage.prototype.flavor = function () {
    return this.inside3 + "의 풍미도 있다!";
}

//------------------------------------//

function FireSausage(el1, el2, el3) {
    Sausage.call(this, el1, el2);
    this.inside3 = el3;
}

FireSausage.prototype = Object.create(Sausage.prototype);
FireSausage.prototype.constructor = FireSausage;

FireSausage.prototype.flavor = function () {
    return this.inside3 + "의 풍미도 있다!";
}

var myNewSausage = new FireSausage("돼지고기", "마늘", "불맛");

console.log(myNewSausage.taste());
console.log(myNewSausage.flavor());


/**
 *
 * 어서와 클래스, JS는 처음이지?
 *
 */

class User {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this);
        console.log(this.name);
    }
}

var me = new User("jaehyun");
me.sayName();

//constructor 메서드는 우리가 앞에서 예기해본 Object.prototype.contructor 와는 다릅니다. 클래스의 생성자 함수라고 할 수 있습니다.

//------------------------------------//

function UserOld(name) {
    this.name = name
}

UserOld.prototype.sayName = function () {
    console.log(this);
    console.log(this.name);
}

var user = new UserOld("jaehyun");
user.sayName();

//------------------------------------//

class Sausage {
    constructor(el1, el2) {
        this.inside1 = el1;
        this.inside2 = el2;
    }

    taste() {
        return this.inside1 + "와 " + this.inside2 + " 맛이 난다!";
    }
}

var classicSausage = new Sausage("닭고기", "양파");
console.log(classicSausage.taste());


class FireSausage extends Sausage { }

var classicFireSausage = new FireSausage("소고기", "파");

console.log(classicFireSausage.inside1);
console.log(classicFireSausage.inside2);
console.log(classicFireSausage.taste());

//------------------------------------//

class FireSausage extends Sausage {
    constructor(el1, el2, el3) {
        this.inside3 = el3;
    }

    flavor() {
        return this.inside3 + "의 풍미도 있다!";
    }
}

var classicFireSausage = new FireSausage("소고기", "파", "불맛");

console.log(classicFireSausage.taste());
console.log(classicFireSausage.flavor());

//------------------------------------//

class FireSausage extends Sausage {
    constructor(el1, el2, el3) {
        super(el1, el2);
        this.inside3 = el3;
    }

    flavor() {
        return this.inside3 + "의 풍미도 있다!";
    }
}

var classicFireSausage = new FireSausage("소고기", "파", "불맛");

console.log(classicFireSausage.taste());
console.log(classicFireSausage.flavor());


/**
 *
 * 이벤트 위임 (delegate)
 *
 */

/*  HTML 코드가 포함되어 있기 때문에 주석처리 했습니다.
<div class="parent">
        <button type="button">generate item</button>
        <ul>
            <li>initial item</li>
        </ul>
    </div>

    <script>
        var parent = document.querySelector(".parent");
        parent.addEventListener('click', function (event) {
            if (event.target.tagName.toLowerCase() === "button") {
                const item = document.createElement("li");
                item.innerText = "hello world~";
                parent.querySelector("ul").appendChild(item);
            }

            if (event.target.tagName.toLowerCase() === "li") {
                console.log('hit!!');
            };
        });

    </script>
*/


/**
 *
 * documentFragment
 *
 */


for (let i = 0; i < 10; i++) {
    let divEl = document.createElement("div");
    divEl.innerText = "hello~ this is " + i;
    document.body.appendChild(divEl);
}

//------------------------------------//

const docFrag = document.createDocumentFragment();

for (let i = 0; i < 10; i++) {
    var divEl = document.createElement("div");
    divEl.innerText = "hello~ this is " + i;
    docFrag.appendChild(divEl);
}

document.body.appendChild(docFrag);

//------------------------------------//

//const docFrag = document.createDocumentFragment();
const test = document.createElement('div');

for (let i = 0; i < 10; i++) {
    var divEl = document.createElement("div");
    divEl.innerText = "hello~ this is " + i;
    //docFrag.appendChild(divEl);
    test.appendChild(divEl);
}

//document.body.appendChild(docFrag);
document.body.appendChild(test);

//------------------------------------//

const docFrag = document.createDocumentFragment();
//const test = document.createElement('div');

for (let i = 0; i < 10; i++) {
    var divEl = document.createElement("div");
    divEl.innerText = "hello~ this is " + i;
    docFrag.appendChild(divEl);
    //test.appendChild(divEl);
}

console.log(docFrag.childNodes);
document.body.appendChild(docFrag);
//document.body.appendChild(test);
//console.log(test);
console.log(docFrag.childNodes);

//------------------------------------//

/* HTML 코드가 포함되어 있기 때문에 주석처리 했습니다.
<div class="container">

</div>
<div class="container">

</div>
<div class="container">

</div>

<script>
    const frag = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const el = document.createElement("div");
        const img = document.createElement("img");
        img.src = 'koreanFlag.png';
        el.appendChild(img);
        frag.appendChild(el);
    }

    const cont = document.querySelectorAll(".container");

    for (let i = 0; i < cont.length; i++) {
        cont[i].appendChild(frag.cloneNode(true));
    }

</script>

*/




