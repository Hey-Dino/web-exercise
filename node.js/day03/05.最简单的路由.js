const express = require("express");

const app = express();

// 最简单的路由
app.get("/", (req, res) => {
    res.send("Hello, Express Router!")
});
app.post("/", (req, res) => {
    res.send("Got a Post Request!")
});

app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
});