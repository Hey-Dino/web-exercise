const express = require("express");

const app = express();

// 1.定义中间件函数
function mv1(req, res, next) {
    console.log("这是中间件函数(1)。");
    next();
}
const mv2 = (req, res, next) => {
    console.log("这是中间件函数(2)。");
    next();
}


// 2.带多个中间件的get请求
app.get('/', [mv1, mv2], (req, res) => {
    console.log("Home page");
});

// 3.不带中间件的get请求
app.get('/user', (req, res) => {
    console.log("User page");
});

app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
});