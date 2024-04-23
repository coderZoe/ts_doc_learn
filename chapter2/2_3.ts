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
