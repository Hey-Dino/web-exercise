// 目的：为了保证 路由模块 的纯粹性，所有的 路由处理函数，必须抽离到对应的 路由处理函数模块中

// 导入数据库模块
const db = require('../db/index');
// 导入用户密码加密模块
const bcrypt = require('bcryptjs');

// 注册用户的处理函数
module.exports.regUser = (req, res) => {
    // 1.接收表单数据
    const userInfo = req.body;

    // 2.判断数据是否合法
    // if (!userInfo.username || !userInfo.password)
    //     return res.cc('用户名或密码不能为空');
    // 被 @escook/express-joi 的参数校验取代

    // 3.检测用户名是否已经存在
    const sqlStr = `SELECT * FROM ev_users WHERE username=?`;
    db.query(sqlStr, [userInfo.username], (err, results) => {
        // 3.1 执行 SQL 语句失败
        if (err)
            return res.cc(err);

        // 3.2 用户名被占用
        if (results.length > 0)
            return res.cc('用户名被占用，请更换其他用户名！');

        // 3.3 用户名可用，执行相关操作
        // 加密用户密码，“10”为加密强度(0~99)，数值越大加密强度越大，解密性能越差
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        // 插入新用户
        const sqlStr = 'INSERT INTO ev_users SET ?';
        db.query(sqlStr, userInfo, (err, results) => {
            if (err)
                return res.cc(err);

            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1)
                return res.cc('注册新用户失败，请稍后再试！');

            res.cc('注册成功！', 0);
        })
    });
};

// 登录的处理函数
module.exports.login = (req, res) => {
    // 1.接收表单数据
    const userInfo = req.body;

    // 2.定义 SQL 语句
    const sqlStr = `SELECT * FROM ev_users WHERE username=?`;
    db.query(sqlStr, [userInfo.username], (err, results) => {
        if (err)
            return res.cc(err);

        // SQL 语句执行成功，但影响行数不为 1
        if (results.length !== 1)
            return res.cc('123登录失败！');

        // 判断用户输入的密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
        if (!compareResult)
            return res.cc('密码错误，登录失败！');

        const config = require('../config');
        const jwt = require('jsonwebtoken');
        // 剔除 密码 和 头像，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = { ...results[0], password: '', user_pic: '' };
        // 生成 token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        // 将生成的 token 字符串响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        });
    });
};