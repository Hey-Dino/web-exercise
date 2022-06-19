const express = require('express');
// 1.导入 自定义中间件 模块
const bodyParser = require('./15.自定义中间件');

const app = express();

app.use(bodyParser);

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('OK');
});

app.listen(80, () => {
    console.log("Express Server running at http://127.0.0.1");
})