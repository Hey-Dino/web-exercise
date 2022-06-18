const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
    // 1.获取客户请求的 URL 地址
    const url = req.url;
    // 2.初始化响应地址
    let fpath = '';
    if (url === "/") {
        fpath = path.join(__dirname, "./clock/index.html");
    } else {
        fpath = path.join(__dirname, "./clock", url);
    }
    // 3.读取文件
    fs.readFile(fpath, "utf-8", (err, dataStr) => {
        if (err)
            return res.end("<h1>404 Not Found!</h1>");

        // 4.发送响应内容到客户端
        res.end(dataStr);
    });
});

server.listen(80, () => {
    console.log("Http Server Running at http://127.0.0.1");
});