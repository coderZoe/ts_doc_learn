//枚举

enum Color {
    RED,
    YELLOW,
    BLUE
}
//默认是数字枚举，从0开始，所以：
console.log(Color.YELLOW);  //1
//可以更改数字枚举
enum Color2 {
    RED = 3,
    YELLOW,
    BLUE = 10,
    WHITE
}
console.log(Color2.YELLOW, Color2.WHITE);

//value还可以是字符串。字符串无递增属性，所以需要自己赋值
enum Color3 {
    RED = "red",
    YELLOW = "yellow",
    BLUE = "blue"
}
console.log(Color3.YELLOW);