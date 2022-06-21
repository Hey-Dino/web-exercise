// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 导入 cors 中间件，并注册为全局中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 导入 路由模块，并注册为全局中间件
const router = require('./router/user');
app.use('/api', router);

// 调用 app.listen() 方法，指定端口号并启动Web服务器
app.listen(3007, () => {
    console.log('Express Server running at http://127.0.0.1:3007');
})