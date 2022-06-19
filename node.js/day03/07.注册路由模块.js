const express = require("express");

const app = express();

// 1.导入路由模块
const router = require("./06.创建路由模块");
// 2.注册路由模块
app.use('/api', router);

app.listen(80, () => {
    console.log("(Router)Express Server running at http://127.0.0.1");
});