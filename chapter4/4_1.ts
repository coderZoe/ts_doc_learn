interface User400 {
    name: string,
    sayIt: () => void;
}

//函数加了this挺麻烦的，有些类似于go中的方法，函数绑了对象
//这种时候只能通过对象.函数名()调用
function sayHello(this: User400) {
    console.log(this.name);
}

let user400: User400 = {
    name: "Tom",
    sayIt: sayHello
}
user400.sayIt();
