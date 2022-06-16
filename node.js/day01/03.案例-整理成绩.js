var fs = require("fs");

// 1.读取数据
fs.readFile("./text/score-ok.txt", "utf-8", function (err, dataStr) {
    if (err)
        return console.log("读取文件失败，失败信息:", err.message);

    console.log("读取文件成功，文件内容:", dataStr);
    // 2.处理数据
    var arrOld = dataStr.split(" ");  // 输入结果：[ '小红=99', '小白=100', '小黄=70', '小黑=60', '小绿=88' ]
    var arrNew = [];
    arrOld.forEach(item => {
        arrNew.push(item.replace("=", ":"));    // 最终结果：[ '小红:99', '小白:100', '小黄:70', '小黑:60', '小绿:88' ]
    });
    var dataNew = arrNew.join("\n");

    // 3.写入数据
    fs.writeFile("./text/score-ok2.txt", dataNew, function (err) {
        if (err)
            return console.log("写入失败，失败信息:", err.message);

        console.log("写入成功。");
    });
});