const express = require("express");

const app = express();

app.get('/', (req, res) => {
    // 1.抛出一个自定义错误
    throw new Error('服务器内部发生了错误!');
    console.log('Home page.');
});

// 2.定义错误级别的中间件
app.use((err, req, res, next) => {
    console.log('发生了错误: ' + err.message);
    res.send('Error! ' + err.message);
});

app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
});