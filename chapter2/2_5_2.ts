//泛型

//keyof
//一个泛型参数来约束另一个泛型参数 如下面，我们约束 Key得是T的属性之一
function getProperty<T, Key extends keyof T>(obj: T, keyName: Key) {
    return obj[keyName];
}

let user = {
    name: "Tom",
    age: 12
}
console.log(getProperty(user, "name")); //Tom

//泛型引入构造函数
class User {
    name = "Tom";
    age = 12;
    constructor() {
    }
    sayHello() {
        console.log("hello", this.name);
    }
}

function create<T>(con: new () => T): T {
    return new con();
}

create(User).sayHello();


//索引类型
type Person = { age: number, name: string, alive: boolean }
type KSet = keyof Person;  //"age"|"name"|"alive"
type Age = Person["age"];
type ValueSet = Person[KSet]; //number | string | boolean  Person[keyof Person]

let a: Age = 12;
let b: KSet = "age";
let c: ValueSet = true;


const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];

type Person2 = typeof MyArray[number];
let d: Person2 = {
    name: "Hello",
    age: 15
}



