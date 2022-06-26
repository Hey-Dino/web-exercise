// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();


// 导入 cors 中间件，并注册为全局中间件
const cors = require('cors');
app.use(cors());


// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));


// 添加 封装错误响应信息 的中间件
app.use((req, res, next) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    }

    next();
});


// 配置解析 token 的中间件
const config = require('./config');
const expressJwt = require('express-jwt');
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));


// 导入 路由模块，并注册为全局中间件
const router = require('./router/user');
app.use('/api', router);

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo');
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter);

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate');
app.use('/my/article', artCateRouter);

// 导入并使用文章路由模块
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'));


// 错误级别中间件
const Joi = require('joi');
const { UnauthorizedError } = require('express-jwt');
app.use((err, req, res, next) => {
    // Joi 参数校验错误
    if (err instanceof Joi.ValidationError)
        return res.cc(err);

    // 身份认证失败错误
    if (err instanceof UnauthorizedError)
        return res.cc('身份认证失败！');

    // 未知的错误
    return res.cc(err);
});

// 调用 app.listen() 方法，指定端口号并启动Web服务器
app.listen(3007, () => {
    console.log('Express Server running at http://127.0.0.1:3007');
})