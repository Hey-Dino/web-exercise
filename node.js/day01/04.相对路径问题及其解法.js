// 导入文件系统模块
const fs = require("fs");
// 导入path路径模块
const path = require("path");

// 1.若不在F:\codeWarehouse\web-exercise\node.js\day01>下执行node ...命令，则会报错
// fs.readFile("./text/score-ok2.txt", "utf-8", function (err, dataStr) {
//     if (err)
//         return console.log("读取文件失败，失败信息:", err.message);

//     console.log("读取文件成功，文件内容:", dataStr);
// });

console.log("当前JS文件路径:", __dirname, "\n");
// 2.若相对路径名含符号"."，如"./text/score-ok2.txt"，则会造成运行错误
// fs.readFile(__dirname + "/text/score-ok2.txt", "utf-8", function (err, dataStr) {
//     if (err)
//         return console.log("读取文件失败，失败信息:\n" + err.message);

//     console.log("读取文件成功，文件内容:\n" + dataStr);
// });

// 3.为解决上述【路径拼接】时，可能造成的错误，可以使用path.join()方法
fs.readFile(path.join(__dirname, "./text/score-ok2.txt"), "utf-8", function (err, dataStr) {
    if (err)
        return console.log("读取文件失败，失败信息:\n" + err.message);

    console.log("读取文件成功，文件内容:\n" + dataStr);
});