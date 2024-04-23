//接口

//如下，我们为入参arg指令了一个类型 {label:string} 
function printLabel(arg: { label: string }) {
    console.log(arg.label);
}
let myObj = { size: 10, label: "hello world" };
printLabel(myObj);

//使用接口来重写上例：
interface Label {
    label: string
}
function printLabel2(arg: Label) {
    console.log(arg.label);
}
printLabel2(myObj);

//可选属性，ts中的接口类似于对结构的定义，但很多时候，这些接口中的属性并不是一定要都有，而是可选：
interface User4 {
    name: string,
    isMan: boolean,
    age?: number,
    address?: string,
}

function getUser(user: User4): { name: string, isMan: boolean, age: number, address: string } {
    let defaultUser = {
        age: 12,
        address: "测试"
    }
    //使用解构表达式来配置默认值
    return { ...defaultUser, ...user };
}

console.log(getUser({ name: "小明", isMan: true }))

//索引签名
interface User5 {
    name?: string,
    age?: number
}
function sayHello(user: User5): void {
    console.log(user.name, user.age);
}


//这种会报错
// sayHello({ name: "Tom", address: "翻斗花园" });
//但 下面这种不会报错
let user5 = {
    name: "Tom",
    address: "翻斗花园"
};
sayHello(user5);
//这是因为，在调用sayHello({ name: "Tom", address: "翻斗花园" });的时候，实际上是把这个匿名对象声明为类型User5，但User5中没有address属性
//而第二种方法，sayHello(user5); 其实是将一个obj类型的对象，强转为了User5，再调用sayHello函数，所以第一种其实也可以强转生效
sayHello({ name: "Tom", address: "翻斗花园" } as User5)
//第二种，如果定义user5的时候指明类型：
// let user5: User5 = {
//     name: "Tom",
//     address: "翻斗花园"
// }
//也会报错，因为User5接口中没有address属性

//从上面我们可以看到对于ts 如果一个对象字面量存在任何“目标类型”不包含的属性时，将会报错
//一种解决方案是索引签名：
interface User6 {
    name?: string,
    age?: number,
    [propName: string]: any
}
function sayHello6(user: User6): void {
    console.log(user.name, user.age);
}
sayHello6({ name: "Tom", address: "翻斗花园" });
let user6: User6 = { name: "Tom", address: "翻斗花园" };
//上面的propName是代表User接口还可能任意数量的属性，类型是any

//函数接口，所谓函数接口 就是接口里定义一个函数
interface includes {
    (source: string, target: string): boolean;
}
let myIncludes: includes = function (source, target) {
    return source.includes(target);
}
console.log(myIncludes("hello world", "hello"));


//类
interface User7 {
    name: string,
    age: number,
    sayHello(): void;
}

class User7Class implements User7 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    sayHello(): void {
        console.log(this.name, this.age)
    }
}

new User7Class("tom", 12).sayHello();

//一个接口和构造方法间的例子

//如下是两个接口，第二个接口比较简单，就是一个Click接口，定义了tick()方法
//第一个接口其实是个函数式接口，这里的new代表了一个构造函数的签名，也即继承的class必须要实现这个构造函数
//我们其实也可以将第二个接口理解为ClockInterface的构造函数接口，相当于把ClockInterface的构造函数单独抽出来了当接口
interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

//这里其实是一个关键函数，这个函数入参是构造函数，返回是ClockInterface实例，也即通过构造函数构造实例
//这里之所以觉得比较乱是因为我们将构造函数抽出了当接口
function createClock(cons: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new cons(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(hour: number, minute: number) {
    }
    tick(): void {
        console.log("DigitalClock")
    }
}

class AnalogClock implements ClockInterface {
    constructor(hour: number, minute: number) {
    }
    tick(): void {
        console.log("AnalogClock ")
    }
}

let clock1 = createClock(DigitalClock, 12, 10);
clock1.tick();

let clock2 = createClock(AnalogClock, 12, 20);
clock2.tick();

//如上，由于类DigitalClock和AnalogClock实现了ClockConstructor规定的构造方法，因此可以作为createClock入参
//其实可以写为：
let constructor1: ClockConstructor = DigitalClock;
let constructor2: ClockConstructor = AnalogClock;
clock1 = createClock(constructor1, 12, 10);
clock2 = createClock(constructor2, 12, 20);
//这有些像多态，传入谁的类就用谁的构造方法，创建出的实例就是谁的类的实例 但很明显，上面这种写法很绕很绕。


//接口继承
interface A {
    name: string
}
interface B extends A {
    age: number
}
let tom8: B = {
    name: "Tom",
    age: 12
}

//混合接口
interface Counter {
    //函数接口 代表实现该接口的可以作为函数使用
    (start: number): string;
    //属性 具备当前属性
    interval: number;
    //函数 可以通过实例调用这个函数
    reset(): void;
}

function getCounter(): Counter {
    let counter = function (start: number): string {
        return start + "hello";
    } as Counter;
    counter.interval = 5;
    counter.reset = function () {
        console.log("aaa")
    }

    return counter;
}


//ts中接口还可以继承自类 但接口继承的类 只是继承了类中成员的声明，没有实现（其实就是感觉反了，应该接口先声明，类再实现才对）

class User9 {
    name: string;
    age: 12;
    sayHello() {
        console.log(this.name, this.age)
    }
}

interface UserI extends User9 {
}

let tom: UserI = {
    name: "Tom",
    age: 12,
    //tom还是要自己实现sayHello 因为UserI只是继承了User9的sayHello声明
    sayHello() {
        console.log(this.name, this.age)
    }
}

//反过来会好很多
interface UserI2 {
    name: string,
    age: number
    sayHello(): void;
}

class User10 implements UserI2 {
    name: string;
    age: number;
    sayHello(): void {
        console.log(this.name, this.age);
    }
}

let tom77: User10 = {
    name: "Tom",
    age: 10,
    sayHello() {

    },
}

