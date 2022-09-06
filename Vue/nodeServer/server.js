const express = require("express");
const history = require("connect-history-api-fallback");

const app = express();

// 使用中间件，避免前端路由被传入到后端
app.use(history());
app.use(express.static(__dirname + "/static"));

app.get("/getDemo", (req, resp) => {
    resp.send({
        name: "Dino",
        age: 22
    });
});

app.listen(5000, (err) => {
    if (!err) {
        console.log("Web Server running at http://127.0.0.1:5000")
    }
});