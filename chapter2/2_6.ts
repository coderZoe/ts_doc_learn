class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }
}

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

let cat = new Animal("cat");
let dog = new Dog("dog");
//cat可以赋值给dog类型，因为ts 结构性兼容
dog = cat;
let tom60 = new Person("tom");
//同样tom60也可以赋值给dog
dog = tom60;

//ts中类中属性默认都是public public下类型比较是结构性比较，但如果包含private 则必须要
//“其中一个类型里包含一个private成员，那么只有当另外一个类型中也存在这样一个private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的”
class Animal60 {
    private name: string
    constructor(name: string) {
        this.name = name;
    }
}

class Dog60 extends Animal60 {
    constructor(name: string) {
        super(name);
    }
}
class Person60 {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
}

let cat60 = new Animal60("cat");
let dog60 = new Dog60("dog");
//这是可以的，因为Animal中的name属性和Dog中的name属性是同一个
dog60 = cat60;
let person60 = new Person60("tom")
//这是不行的，因为Person中的name属性与Dog中的不是同一个
// dog60 = person60;

//getter setter 与js中基本一样
class User61 {
    private firstName: string = "";
    private lastName: string = "";

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fullName: string) {
        [this.firstName, this.lastName] = fullName.split(" ");
    }
}

let bill = new User61();
bill.fullName = "Bill Gates"
console.log(bill.fullName);

//类静态属性 与js也基本一样
class Grid {
    static origin = {
        x: 0,
        y: 0
    }
    scale: number
    constructor(scale: number) {
        this.scale = scale;
    }
    distance(point: { x: number, y: number }): number {
        let xDis = point.x - Grid.origin.x;
        let yDis = point.y - Grid.origin.y;
        return Math.sqrt(xDis * xDis + yDis * yDis) / this.scale;
    }
}

let grid = new Grid(2);
console.log(grid.distance({ x: 7, y: 9 }))



interface User {
    name: string;
    age: number;
    sayHello(): void;
}

abstract class AbstractUser {
    name: string;
    age: number;
    abstract sayHello(): void;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class UserClass {
    name: string;
    age: number;
    sayHello(): void {
        console.log("hello", this.name)
    }
}

let userClassObj: UserClass = {
    name: "Tom",
    age: 12,
    sayHello(): void {
        console.log("hello i am", this.name, "and i am ", this.age, "years old");
    }
}

let userObj5: UserClass = new UserClass();
userObj5.name = "Bill";
userObj5.sayHello();

//对接口 抽象类 类 对象字面量 和通过类new出的对象的理解：
//首先谈接口 抽象类和类
//在js中 成员包括 属性和方法，如上面的interface User 有三个成员其中两个属性name、age和一个方法 sayHello()　
//接口的核心意义是定义且不实现，比如上面我们定义了两个属性成员 name和age，但接口不会为name和age赋值 且定义了一个方法sayHello()，同样也不实现
//类与接口的区别是 对于属性 类是可以初始化的，比如定义时初始化或者通过构造方法初始化，接口是没有构造方法的 无论抽象类还是具体类 对于属性都是一样的，可以初始化
//抽象类唯一的区别是可以定义方法而不去实现，具体类不可以，具体类必须实现所有定义的方法

//因此总结为：类和接口区别是  类可以实例化属性，可以有构造方法，但接口不行
//抽象类与具体类的区别是：抽象类可以定义接口不实现，具体类必须实现方法

//再谈对象字面量和new出的对象 
//new出的对象是以class为模板来创建自己，所以其天生继承class的所有成员 比如上面的userObj5天生有sayHello这个方法成员
//但对于对象字面量，对象字面量是一个完整的实例，它不继承任何信息，而ts中的类型使用的是结构性类型系统。 
//也即当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的
//所以当
// let userClassObj: UserClass = {
//     name: "Tom",
//     age: 12,
//     sayHello(): void {
//         console.log("hello i am", this.name, "and i am ", this.age, "years old");
//     }
// }
//时候代表我们创建一个对象字面量，这个字面量的类型是UserClass，既然是UserClass，那就要实现UserClass的所有成员，所以这个对象字面量要自己实现UserClass内的所有成员