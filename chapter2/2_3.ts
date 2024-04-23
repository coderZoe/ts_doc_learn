//函数
//可选参数
//可选参数必须放在必选参数的后面
function sayHello(name1: string, name2?: string) {
    console.log(name1, name2)
}
sayHello("Tom");
sayHello("Tom", "Jerry")


//在必选参数后面的带默认值的参数都是可选的
function sayHello2(name: string, name2: string = "Jerry") {
    console.log(name, name2);
}
sayHello2("Tom");
sayHello2("Tom", "Bill")
//如果默认值参数在可选参数前面，调用时不能省略
function sayHello3(name: string = "Tom", name2: string) {
    console.log(name, name2)
}
sayHello3(undefined, "Tom"); //当这里赋值undefined的时候，形参会变成tom
sayHello3("Bill", "Tom")

//剩余参数
function sayHello4(name: string, ...names: string[]) {
    let array = [name, ...names];
    console.log(array);
}
sayHello4("Tom")
sayHello4("Tom", "Jerry", "Bill")


//缩小范围
function padLeft(padding: number | string, input: string) {
    if (typeof padding === 'number') {
        return " ".repeat(padding) + input;
    } else {
        return padding + input;
    }
}

//类型谓词
interface Fish {
    swim(): void;
}
interface Bird {
    fly(): void;
}

function isFish(arg: Fish | Bird): arg is Fish {
    return (arg as Fish).swim !== undefined;
}

function getAnimal(): Fish | Bird {
    if (Math.random() < 0.5) {
        return {
            swim() {
                console.log("i am fish")
            }
        } as Fish
    } else {
        return {
            fly() {
                console.log("i am bird");
            }
        } as Bird;
    }
}

let animal = getAnimal();
//这里其实就是类型谓词的作用，通过arg is Fish告诉编译器，如果返回true 则这个参数是Fish类型
//因此通过调用isFish可以在里面安全的调用animal.swim() 但如果不使用类型谓词只返回true/false ，则调用isFish会返回结果依然无法确定是什么类型
//依然无法在里面安全的调用animal.swim()
if (isFish(animal)) {
    animal.swim();
} else {
    animal.fly();
}