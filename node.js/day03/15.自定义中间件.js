const qs = require('querystring');

function bodyParser(req, res, next) {
    // 2.监听 req 的 data 事件
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    });

    // 3.监听 req 的 end 事件
    req.on('end', () => {
        console.log(str);
        // 4.2 解析请求体数据
        const body = qs.parse(str);
        // 5.将解析处理的数据对象挂载到 req.body
        req.body = body;

        next();
    })
};

// 导出解析请求体数据的 中间件函数
module.exports = bodyParser;