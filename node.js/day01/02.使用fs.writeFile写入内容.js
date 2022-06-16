// 1.导入fs模块，来操作文件
var fs = require("fs");

fs.writeFile("./text/text01.txt", "Hello, Dino!", function (err) {
    if (err)
        console.log("文件写入失败，错误信息:\n", err.message);
    else
        console.log("文件写入成功");
});