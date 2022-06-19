// 导入 express 模块
const express = require("express");

// 创建 express 实例
const app = express();

// 1. 导入解析表单数据的中间件 body-parser
const parser = require("body-parser");
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }));
// express.urlencoded() 方法是对 parser.urlencoded() 方法的进一步封装。

app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// 指定端口号，并启动服务器
app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
});