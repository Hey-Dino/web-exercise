// 1.导入 express
const express = require("express");

// 2.创建 web 服务器
const app = express();

// 4.监听GET请求
// app.get("/user", (req, res) => {
//     // 向客户端发送 JSON 对象
//     res.send({ name: "zs", age: 20 });
// })

// 5.监听POST请求
app.post("/user", (req, res) => {
    // 向客户端发送 文本内容
    res.send("请求成功!");
});

// 获取查询函数
app.get("/", (req, res) => {
    // 默认情况下，req.query 是一个空对象
    // 客户端使用 ?name=dino&age=20 这种查询字符串形式，发送到服务器的参数
    console.log(req.query);
    res.send(req.query);
});

// 获取动态参数
app.get("/user/:id/:username", (req, res) => {
    // 默认情况下，req.params 是一个空对象
    // 客户端使用 1 这种动态参数形式，发送数据到服务器
    console.log(req.params);
    res.send(req.params);
})

// 3.调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
});