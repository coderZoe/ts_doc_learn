//对象

interface paintOption {
    shape: "circle" | "square";
    xPos?: number;
    yPos?: number;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: paintOption) {
    console.log(shape, xPos, yPos);
}

paintShape({ shape: "circle", xPos: 100, yPos: 100 });
paintShape({ shape: "circle" });
paintShape({ shape: "square", yPos: 100 });

//泛型定义类型
interface Box<T> {
    content: T
}
let myBox: Box<string> = { content: "hello" };

