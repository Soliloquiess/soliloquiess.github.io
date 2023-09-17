// function menuGlobal() {
//     console.log("오늘 저녁은 " + this.name);
// }

// var myDiner = {
//     name: "김치찌개",
//     menu: menuGlobal
// }

// var yourDiner = {
//     name: "된장찌개",
//     menu: menuGlobal
// }

// yourDiner.menu();

// function Diner(name) {
//     this.name = name;
// }

// Diner.prototype.menu = function() {
//     console.log("오늘 저녁은 " + this.name);
// };

// var myDiner = new Diner("김치찌개");
// myDiner.menu();


function menuGlobal (item) {
    console.log("" + item +this.name)
 }
 
 var myDiner=
 {
     name: "김치찌개"    
 }
 var yourDiner =
 {
     name: "된장찌개"
 }
 menuGlobal.call (myDiner, ""); 
 menuGlobal.call(yourDiner, "");
 