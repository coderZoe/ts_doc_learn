//映射类型
//在说映射类型前 再聊下索引签名 在ts中核心解决的是如何描述一个数据结构的类型
//索引签名解决的是 对于一个尚未声明的结构，我们如何规范这个结构，假设我现在有一个user对象，如何规范这个user呢？

type UserIndex = {
    [key: string]: string
}
//如上 我们规定结构UserIndex必须是key是string value也是string类型，比如：
let user320: UserIndex = {
    name: "Tom"
}
//上面这个是ok的，但如果我们写成：
// let user321: UserIndex = {
//     age: 12
// }
// 就不行
//我们可以通过索引类型拿到一个已知对象的value类型:
let user302 = {
    name: "hello",
    age: 123,
    alive: true
}
//此时User302Type就是 string | number | boolean
type User302Type = (typeof user302)["name" | "age" | "alive"];
//索引类型的核心是通过索引拿到value的类型，还可以通过keyof这样 这种情况与上面的结果一样 keyof就是上面的"name" | "age" | "alive"
type User302Type1 = (typeof user302)[keyof typeof user302];

//索引类型+泛型 = 映射类型
type OptionsFlags<T> = {
    [Property in keyof T]: boolean;
}
//我们分析下上例：
//keyof T是拿到类型T的每个属性 property就是上面的每个属性 并将每个属性变为boolean，举个例子：
interface User303 {
    name: string,
    age: number
}
//上面我们定义了name和age两个属性，分别是string和number，但通过OptionsFlags一转化 
//得到的新属性其实是：{name:boolean,age:boolean} 将上面这些属性的类型都改为了boolean 属性名保留，类型被替换了
type User303Flag = OptionsFlags<User303>;
let user303FlagObj: User303Flag = {
    name: true,
    age: false
}
//所以映射修改器就是将原来Type内属性的类型改为其他类型
//同时映射属性还可以修改可选性?与可变性readOnly 改变的意思是可以添加或者删除 也即添加上可选性/可变性 或者删除可选性 可变性 https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
type OptionsFlags2<T> = {
    [property in keyof T]?: T[property];
}
//可以不写任何属性，因为都是可选
let user303FlagObj2: OptionsFlags2<User303> = {
}

//除了可以更改value类型，还可以通过as 更改属性名字：
//Capitalize是ts中的类型操作符，用于在类型层面将字符串类型的首字母大写 如：type small = "hello"  type CapitalizedSmall = Capitalize<Small>;  // 类型为 'Hello'
//而string&property是明确告诉Capitalize我的property是string类型的
type ToGetter<T> = {
    [property in keyof T as `get${Capitalize<string & property>}`]: () => T[property];
}

interface User304 {
    name: string,
    age: number
}
type UserGetter = ToGetter<User304>;
let userGetterObj: UserGetter = {
    getName() {
        return "hello";
    },
    getAge() {
        return 12;
    }
}

//Exclude操作符可以删除某些属性
type ExcludeType<T, V> = {
    [property in keyof T as Exclude<property, V>]: T[property]
}

//删除name属性 这个还是挺普遍用的，可以传入两个参数，来删除指定类型的指定属性
type ExcludeUser304 = ExcludeType<User304, "name">;
let excludeUser304Obj: ExcludeUser304 = {
    age: 12,
}

