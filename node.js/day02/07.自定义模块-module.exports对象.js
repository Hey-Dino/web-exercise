// 1.向 module.exports 对象挂载属性 username
module.exports.username = "Dino"

// 2.向 module.exports 对象挂载方法 sayHi
module.exports.sayHi = function () {
    console.log("Hello, everybody!");
};

// 3.让 module.exports 指向一个全新的对象
module.exports = {
    username: "Peppa Pig",
    sayHi() {
        console.log("Hello, Node. Hello, everyone.")
    }
}

// 注意点：
// 1.【module.exports】可以使用【exports】代替
// 2.时刻谨记，require() 模块时，得到的永远是【module.exports】指向的对象：
// 3.但是，不要在同一 .js 文件中，混用【module.exports】和【exports】，可能会产生意想不到的结果
//   可以尝试把上方步骤3（3.XXXX）的【module.exports】改为【exports】，然后在终端执行命令【node .\08.test-module.exports对象.js】，查看终端输出