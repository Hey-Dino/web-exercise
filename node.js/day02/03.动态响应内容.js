const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    // 1.获取请求的 URL 地址
    const url = req.url;
    // 2.初始化默认的响应内容：404 Not Found!
    let content = "<h1>404 Not Found!</h1>";
    // 3.区分用户请求
    if (url === "/" || url === "/index.html") {
        content = "<h1>首页</h1>";
    } else if (url === "/about.html") {
        content = "<h1>关于页面</h1>";
    }
    // 4.设置响应头，防止中文乱码
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // 5.发送响应内容到客户端
    res.end(content);
});

server.listen(80, () => {
    console.log("Http Server Running at http://127.0.0.1");
});