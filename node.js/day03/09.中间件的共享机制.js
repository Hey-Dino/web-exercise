const express = require("express");

const app = express();

// 定义一个全局生效的中间件
app.use((req, res, next) => {
    // 定义共享属性 startTime
    req.startTime = Date.now();
    next();
});

app.get("/", (req, res) => {
    res.send("Home page!" + req.startTime);
});
app.get("/user", (req, res) => {
    res.send("User page!" + req.startTime);
});


app.listen(80, () => {
    console.log("(Middleware)Express Server running at http://127.0.0.1");
});