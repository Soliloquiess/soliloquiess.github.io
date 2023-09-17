//test1
// console.log(test());
// console.log(testValue());

// function test(){
//     return "test";
// }

// var testValue = function(){
//     return "testValue";
// }


//test2
// console.log(testValue);
// console.log(undeclared); //선언하지 않은 변수는 에러남. 
// //선언한 변수도 "값"까지 끌어올려지지는 않음

// var testValue = 100;

//test3
// console.log(testValueVar());

// var testValueVar = function testValue(){
//     return "hoist test";
// }


///////


//test4

// console.log(test);
// var condition = false;

// if(condition){  //if문 안에서 변수 선언 및 초기화
//     var test = "this is test";
// }

//test5
// console.log(test());
// console.log(value);

// function test(){ // 함수 안에서 변수의 선언과 초기화가 이뤄지는 경우
//     var value = "hoist";
//     return value + " test";
// } 

//test6

console.log(test1);
console.log(test2);

console.log(Tester);

let test1 = "let value";
const test2 = "const value";

class Tester{
    constructor(){
        this.name = "test";
    }
}

let tester = new Tester();