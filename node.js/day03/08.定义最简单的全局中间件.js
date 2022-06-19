const express = require("express");

const app = express();

// 1.定义一个中间件函数
const mw = function (req, res, next) {
    console.log("这是一个最简单的中间件函数。");
    next();
};

// 2.使该中间件全局生效
app.use(mw);

app.get("/", (req, res) => {
    res.send("Home page!");
});
app.get("/user", (req, res) => {
    res.send("User page!");
});


app.listen(80, () => {
    console.log("(Middleware)Express Server running at http://127.0.0.1");
});