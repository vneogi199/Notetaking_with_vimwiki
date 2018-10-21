"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var message = "Hello World";
console.log(message);
var x = 10;
var y = 20;
var z;
var name = "Vinit";
var isEmpty = true;
var total = 5;
var lang = "Typescript";
var sentence = "\nHello " + name + "\n" + lang + "\n";
console.log(sentence);
var n = null;
var u = undefined;
var isNew = null;
var myName = undefined;
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var person = ["Vinit", 22];
var Color;
(function (Color) {
    Color[Color["Red"] = 5] = "Red";
    Color[Color["Green"] = 6] = "Green";
    Color[Color["Blue"] = 7] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log(c);
var randomValue = 10;
randomValue = true;
randomValue = "Vinit";
function hasName(obj) {
    return !!obj && typeof obj === "object" && "name" in obj;
}
if (hasName(randomValue)) {
    console.log(randomValue.name);
}
// randomValue();
// (randomValue as string).toUpperCase();
var a;
a = 10;
a = true; //valid, no type inference
var b = 10;
// b = true; // invalid, type inference performed
var multiType;
multiType = 10;
multiType = true;
//optional parameters
function add(num1, num2) {
    if (num2)
        return num1 + num2;
    else
        return num1;
}
add(2, 3);
add(2);
//default parameters
function sub(num1, num2) {
    if (num2 === void 0) { num2 = 20; }
    if (num2)
        return num1 - num2;
    else
        return num1;
}
sub(50, 10);
sub(50);
function fullName(person) {
    if (person.lastName)
        console.log(person.firstName + " " + person.lastName);
    else
        console.log("" + person.firstName);
}
var p = {
    firstName: "Vinit"
};
fullName(p);
var Employee = /** @class */ (function () {
    function Employee(name) {
        this.employeeName = name;
    }
    Employee.prototype.greet = function () {
        console.log("Hello " + this.employeeName); //accessible here
    };
    return Employee;
}());
var emp1 = new Employee("Vinit");
// console.log(emp1.employeeName); causes error
emp1.greet();
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(managerName) {
        return _super.call(this, managerName) || this;
    }
    Manager.prototype.delegateWork = function () {
        console.log("Manager delegating tasks " + this.employeeName); //accessible here
    };
    return Manager;
}(Employee));
var m1 = new Manager('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);
