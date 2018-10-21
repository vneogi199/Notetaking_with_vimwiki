export {}

let message = "Hello World";
console.log(message);


let x = 10;
const y =20;

let z;
const name = "Vinit";

let isEmpty: boolean = true;
let total:number = 5;
let lang:string = "Typescript";

let sentence: string = `
Hello ${name}
${lang}
`;

console.log(sentence);

let n:null = null;
let u:undefined = undefined;

let isNew: boolean = null;
let myName: string = undefined;


let list1: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];


let person: [string, number] = ["Vinit", 22];

enum Color {Red=5, Green, Blue};
let c:Color = Color.Green;
console.log(c);

let randomValue:unknown = 10;
randomValue = true;
randomValue = "Vinit";

function hasName(obj:any): obj is {name: string}{
    return !!obj && typeof obj === "object"  && "name" in obj;
}
if(hasName(randomValue)){
    console.log(randomValue.name);
}

// randomValue();
// (randomValue as string).toUpperCase();


let a;
a = 10;
a = true; //valid, no type inference


let b = 10;
// b = true; // invalid, type inference performed

let multiType: number | boolean;
multiType = 10;
multiType = true;


//optional parameters
function add(num1: number, num2?: number): number{
    if(num2)    return num1 + num2;
    else return num1;
}
add(2,3);
add(2);

//default parameters
function sub(num1: number, num2: number = 20): number{
    if(num2)    return num1 - num2;
    else return num1;
}
sub(50,10);
sub(50);



interface Person {
    firstName: string;
    lastName?: string;
}

function fullName(person: Person){
    if(person.lastName) console.log(`${person.firstName} ${person.lastName}`);
    else console.log(`${person.firstName}`);
}

let p = {
    firstName: "Vinit"
}

fullName(p);



class Employee {
    protected employeeName: string;
    
    constructor(name: string){
        this.employeeName = name;
    }

    greet(){
        console.log(`Hello ${this.employeeName}`); //accessible here
    }
}

let emp1 = new Employee("Vinit");
// console.log(emp1.employeeName); causes error
emp1.greet();


class Manager extends Employee {
    
    constructor(managerName: string){
        super(managerName);
    }

    delegateWork(){
        console.log(`Manager delegating tasks ${this.employeeName}`); //accessible here
        
    }
}

let m1 = new Manager('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);



