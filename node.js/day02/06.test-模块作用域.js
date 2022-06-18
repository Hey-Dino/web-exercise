// ".js"添加与否都可以
const rq = require("./05.自定义模块-模块作用域.js");

console.log(rq);
// 无法调用 ./05.自定义模块-模块作用域.js 中的属性和方法，会报错
// console.log(rq.username);
// console.log(rq.sayHi());