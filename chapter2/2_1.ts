function greet(person: string, date: Date) {
    console.log(`Hello ${person},today is ${date.toDateString()}`);
}

greet("tom", new Date());


let isTs: boolean = true;
console.log(isTs);
let age: number = 9;
console.log(age);
let language: string = "typescript";
console.log(language)

let languageType: Array<string> = ['string', 'number', 'boolean'];
console.log(languageType);

//类型
interface User {
    isMan: boolean,
    age: number,
    name: string,
    hobby: Array<string>
}

//ts中新加的类型

//1. tuple 元组  元组是一个已知长度和每个元素类型的数组
let tom: [string, number] = ["tom", 12];
//错误
// let tom2:[string,number] = [12,'tom']
console.log(tom[0], tom[1]);


//2. 枚举 相当于enum与class类似，也是关键字了
enum Color { Red, Yellow }
let flowerColor: Color = Color.Red;
console.log(flowerColor);
//枚举可以配一个值 默认从0开始编号
enum Color2 { Red, Yellow = 2 }
//但此时得到的赋值表达式是string 不再是枚举
let bananaColor: string = Color2[2];
console.log(bananaColor);

//unknown 

//any 任意类型 不希望进行类型检查的类型
function getLength(arg: any): number {
    return arg.length;
}

console.log(getLength("Tom"));
console.log(getLength(["a", "b", "c", "d"]));
let anyArray: Array<any> = [1, "Tom", false];
console.log(anyArray[2]);

//never object

//类型断言，也即强转，有时候是需要强转的
let anyStr: any = "Hello World";
let strLength: number = (anyStr as string).length;
//或者
let strLength2: number = (<string>anyStr).length;
