// 导入 express 模块
const express = require('express');
const apiRouter = express.Router();

// GET 接口
apiRouter.get('/get', (req, res) => {
    // 1.获取到客户端通过查询字符串，发送到服务器的数据
    const query = req.query;
    // 2.调用 res.send() 方法，把数据响应到客户端
    res.send({
        status: 0,  // 状态
        msg: 'GET请求成功',
        data: query
    });
});

// POST 接口
apiRouter.post('/post', (req, res) => {
    // 1.获取客户端通过请求体，发送到服务器的 URL-encoded 数据
    const body = req.body;
    res.send({
        status: 0,
        msg: 'POST请求成功',
        data: body
    });
});

// DELETE 接口，用于测试 预检请求
apiRouter.delete('/delete', (req, res) => {
    res.send({
        status: 0,
        msg: 'DELETE 请求成功'
    });
});

module.exports = apiRouter;