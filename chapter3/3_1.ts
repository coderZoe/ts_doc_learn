// 条件类型
//ts的条件类型就是可以判断一个类型是否继承自另一个类型  但这个三元表达式只能返回类型，也即赋值给type 
//  SomeType extends OtherType ? TrueType : FalseType;

class Animal300 {

}
class Dog extends Animal300 {

}

type example = Dog extends Animal300 ? number : string;

//不行
// let a:example = "123"
//可以
let a: example = 123;

//看一个更复杂的例子
interface IdLabel {
    id: number;
}
interface NameLabel {
    name: string;
}
//与泛型一起用  可以看到ts的类型系统很复杂
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    if (typeof idOrName === 'number') {
        return {
            id: idOrName
        } as NameOrId<T>
    } else {
        return {
            name: idOrName
        } as NameOrId<T>
    }
}

let result1: NameLabel = createLabel("hello");
let result2: IdLabel = createLabel(11);

//与泛型一起 做类型约束
//如下代表：如果泛型T包含属性message，则MessageOf代表T["message"]的类型，否则MessageOf代表never
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
//如：
interface User300 {
    name: string;
    length: number;
    message: string
}
interface User301 {
    name: string;
    length: number;
}
//其中就是string
let str: MessageOf<User300> = "hello";
//下面就不能将string赋值给never
// let neverX: MessageOf<User301> = "11";

//再看个例子，如果类型T是数组，则Flatten是数组元素类型，否则Flatten是T本身类型
type Flatten<T> = T extends any[] ? T[number] : T;
let userArray = [
    { name: "hello", age: 123 },
    { name: "hello2", age: 1234 },
    { name: "hello3", age: 12345 }
]
let user: Flatten<typeof userArray> = {
    name: "hello",
    age: 123
}
let ageXX: Flatten<number> = 123;


//将T扩展成数组
type toArray<T> = T extends any ? T[] : never;
type strArrayOrNumberArray = toArray<string | number>; //string[] | number[]

let strArray: strArrayOrNumberArray = ["1234", "2345", "3456"];
let numberArray: strArrayOrNumberArray = [1234, 2345, 3456];