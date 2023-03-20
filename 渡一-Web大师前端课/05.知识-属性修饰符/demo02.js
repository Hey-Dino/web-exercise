// 属性修饰符中 get 和 set 函数的使用
const obj = {}

/* Object.defineProperty(obj, "a", {
    get: function () {
        return 123;
    },
    set: function () {
        throw new Error("Cannot redefine property: a");
    }
});

console.log(obj.a)
// 重新赋值属性a
obj.a = "123"; */

// 实现简单的读值和赋值
/* // 错误实现×（会造成递归，栈溢出）
//     RangeError: Maximum call stack size exceeded
Object.defineProperty(obj, "a", {
    get: function () {
        // obj.a 即为 get() 方法
        return obj.a;
    },
    set: function (val) {
        // obj.a = val 即为 set(val)
        obj.a = val;
    }
});
console.log(obj.a); */

// 正确实现✔（借助外部变量）
let innerA = undefined;
Object.defineProperty(obj, "a", {
    get: function () {
        return innerA;
    },
    set: function (val) {
        innerA = val;
    }
});
obj.a = "123";
console.log(obj.a)