const express = require("express");

const app = express();

// 托管静态资源（托管多个）
app.use(express.static('./clock'));
// 挂载路径前缀
app.use('/files', express.static('./files'));

app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
});