// 1.导入fs模块，来操作文件
var fs = require('fs');

// 2.调用fs.readFile()方法来读取文件
//   参数1: 读取文件的存放路径
//   参数2: 读取文件采用的编码格式，一般默认指定utf-8
//   参数3: 回调函数，获取读取失败和成功的结果 err 和 dataStr
fs.readFile("./text/text01.txt", "utf-8", function (err, dataStr) {
    // 2.1 打印失败的结果
    // 读取成功，err 的值为null
    // 读取失败，err 的值为错误对象，dataStr的值为undefined
    /*     console.log("Err:", err);
        console.log("-------------");
        // 2.2 打印成功的结果
        console.log("DataStr:", dataStr); */

    // 判断文件是否读取成功
    if (err) {
        console.log("文件读取失败!");
        console.log(err.message);
    } else {
        console.log("文件读取成功!");
        console.log(dataStr);
    }
});