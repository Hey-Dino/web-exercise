var obj = {
    b: 2,
}

// 问题：对象obj的属性b可以被任意修改
/* obj.b = "Hello";
console.log(obj.b); */

// 1、获取属性修饰符
console.log("1、获取属性修饰符 ", Object.getOwnPropertyDescriptor(obj, "b"));

// 2、设置属性修饰符
Object.defineProperty(obj, "a", {
    value: 1,
    writable: false,    // 不可重新赋值
    enumerable: false,  // 不可遍历
    configurable: false // 不可修改属性修饰符本身
});

// 2.1 体现无法重新赋值
obj.a = 3 && console.log("\n属性a：", obj.a);

// 2.2 体现不可遍历
console.log("对象Obj属性名：", Object.keys(obj));

// 2.3 体现不可修改修饰符本身
Object.defineProperty(obj, "a", { value: 3, writable: true });