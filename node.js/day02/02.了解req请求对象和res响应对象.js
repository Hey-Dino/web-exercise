const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    // req是请求对象，它包含了与客户端相关的数据和属性，例如：
    // req.url 是客户端请求的 URL 地址
    // req.method 是客户端请求的 method 请求类型
    const str = `您请求的 url 地址是 ${req.url}，请求的 method 类型是 ${req.method}`;
    console.log(str);

    // res是响应对象，其作用为：
    // 向客户端发送指定的内容，并结束这次请求的处理过程

    // 为防止中文显示乱码的问题，需要设置响应头 Content-Type 的值为 text/html; charset=utf-8
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(str);
});

server.listen(80, () => {
    console.log("http server running at http://127.0.0.1");
});