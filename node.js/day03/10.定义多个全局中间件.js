const express = require("express");

const app = express();

// 定义中间件1
app.use((req, res, next) => {
    console.log("This is first middleware!");
    next();
});

// 定义中间件2
app.use((req, res, next) => {
    console.log("This is second middleware!");
    next();
});

app.get("/", (req, res) => {
    res.send("<h1>Home page!</h1>");
});

app.listen(80, () => {
    console.log("(Middleware)Express Server running at http://127.0.0.1");
});