//联合类型
//一个联合类型表示一个值的类型可以是几个类型中的一个
//上述的|代表arg参数可以是string或者number，这种方式比直接写any又多做了一步约束
function sayHello(arg: string | number) {
    console.log(arg);
}
sayHello("hello");
sayHello(1);
//会报错
// sayHello(false)

//联合类型的使用只能是联合类型的公共部分
//仅当该操作对联合体的每个成员都有效时，TypeScript 才允许您对联合体进行操作
interface Bird {
    fly(): void;
    layEggs(): void;
}
interface Fish {
    swim(): void;
    layEggs(): void;
}

function getBirdOrFish(): Bird | Fish {
    let bird: Bird = {
        fly() {
            console.log("bird fly")
        },
        layEggs() {
            console.log("bird layEggs")
        },
    }
    return bird;
}
let item = getBirdOrFish();
//只能调用item.layEggs 因为Bird|Fish的公共成员只有layEggs这个方法
item.layEggs();
//如果确定知道返回的是Bird 则可以强转来调fly
let birdItem = item as Bird;
birdItem.fly();

//联合类型的一种使用场景

//type的作用是当我们想复用联合类型的时候，可以通过type为这个联合类型起一个新的名字 然后使用这个新的名字来代替定义的联合类型即可

type NetworkLoadingState = {
    state: "loading";
}
type NetworkFailState = {
    state: "fail";
    code: number
}
type NetworkSuccessState = {
    state: "success";
    response: {
        title: string,
        duration: number,
        summary: string
    }
}
type NetworkFromCachedState = {
    state: "from_cache";
    id: string;
    response: NetworkSuccessState["response"];
};
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
//联合起来  这里可以看到ts比较智能的判断出了几种不同的情况，智能的可以调用networkState.code和networkState.response
//当 TypeScript 可以根据代码结构推断出更具体的值类型时，就会发生缩小。

type NetworkState = NetworkLoadingState | NetworkFailState | NetworkSuccessState | NetworkFromCachedState;
function log(networkState: NetworkState): void {
    switch (networkState.state) {
        case "loading":
            console.warn(`loading中,${networkState.state}`)
            break;
        case "fail":
            console.error(`fail,${networkState.code}`)
            break;
        case "success":
            console.log(`success ${networkState.response}`);
            break;
        case "from_cache":
            break;
        default:
            return assertNever(networkState);

    }
}

//联合还可以用在字面量类型，此时联合的功能和枚举差不多
type nameChoice = "tom" | "jerry" | "bill";
type ageChoice = 12 | 13 | 14;
class User50 {
    name: nameChoice;
    age: ageChoice;

    constructor(name: nameChoice, age: ageChoice) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(this.name, this.age);
    }
}

//参数只能从上面定义的字面量里选择
new User50("tom", 13).sayHello();



//交叉类型 联合类型是or 交叉类型是and 将多个类型合起来成一个大的类型
interface User11 {
    name: string
}
interface User12 {
    age: number
}
type UserType = User11 & User12;

function sayHello7(user: UserType): void {
    //既有name 也有age
    console.log(user.name, user.age)
}
let userObj: UserType = {
    name: "Tom",
    age: 12
}
sayHello7(userObj);




function sayHello50(name: string, age: 1 | 2) {
    console.log(name, age);
}

let userReq = {
    name: "Tom",
    age: 2
}
//如下写法会报错，这是因为ts认为userReq.age并不是1|2类型，因为userReq.age是可能变的，并不总是2
// sayHello50(userReq.name,userReq.age);
// 同样readOnly和const也无法和对象字面量一起用 一种解决办法是：
let userReq2 = {
    name: "Tom",
    age: 2
} as const;
//as const 后缀的作用类似于 const ，但对于类型系统来说，确保所有属性都分配为文字类型，而不是更通用的版本，如 string 或 number 。

sayHello50(userReq2.name, userReq2.age);
//还可以使用强转：
sayHello50(userReq.name, userReq.age as 2)

//还可以单独为1|2声明一个type 这里就不写了


