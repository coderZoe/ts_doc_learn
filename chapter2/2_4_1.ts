//函数 

//1. 将函数类型作为参数:
function add(arg1: number, arg2: number, func: (arg1: number, arg2: number) => number): number {
    return func(arg1, arg2);
}

function sum(arg1: number, arg2: number) {
    return arg1 + arg2;
}
console.log(add(1, 2, sum));

//可以使用type别名:
type sumFunc = (arg1: number, arg2: number) => number;

function add2(arg1: number, arg2: number, func: sumFunc): number {
    return func(arg1, arg2);
}
console.log(add2(1, 2, sum));

//函数还可以具有属性：
type FuncWithField = {
    description: string,
    //需要注意这里与起名和不起名的区别，起名的话，这个就变成属性了，不起名 这个方法就是自己本身
    (arg1: number, arg2: number): number;
}

function getFunWithField(): FuncWithField {
    function sum(arg1: number, arg2: number) {
        return arg1 + arg2;
    }
    sum.description = "求和";
    return sum;
}

function add3(arg1: number, arg2: number, func: FuncWithField): number {
    console.log(func.description);
    return func(arg1, arg2);
}
console.log(add3(10, 20, getFunWithField()));

//构造方法 类似于Date 可以通过new Date()也可以通过Date()这种方法调用来创建
interface User40 {
    name: string,
    age: number;
}

type User40Type = {
    (name: string, age: number): User40;
    new(name: string, age: number): User40;
}

function createUser(name: string, age: number, cons: User40Type): User40 {
    return cons(name, age);
}

function createUser2(name: string, age: number, cons: User40Type): User40 {
    return new cons(name, age);
}


//泛型 泛型是类型的变量
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

let names = ["tom", "bill", "john"];
console.log(getFirst(names))

function map<T, R>(arr: T[], func: (arg: T) => R): R[] {
    return arr.map(func);
}
let arrayX = [1, 2, 3];
console.log(map(arrayX, (item) => "Hello" + item));


interface Length {
    length: number;
}
//泛型继承 与java类似
function longest<T extends Length>(arr: T[]): T {
    return arr.sort((arg1, arg2) => arg2.length - arg1.length)[0];
}
let array1 = [1, 2, 3, 4];
let array2 = [1, 2, 3, 4, 5, 6, 7];
let array3 = [1, 2, 3, 4, 5];
let array4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(longest([array1, array2, array3, array4]));


//不要在回调函数中写可选参数
//不要将callback写为callback: (arg: any, index?: number)
function forEach(arr: any[], callback: (arg: any, index: number) => void): void {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

let array11 = ["tom", "bill", "peter"];
forEach(array11, (arg, index) => console.log(arg, index));
forEach(array11, (arg) => console.log(arg));