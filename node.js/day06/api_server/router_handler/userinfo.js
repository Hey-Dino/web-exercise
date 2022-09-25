// 导入数据库操作模块
const db = require('../db/index');

const bcrypt = require('bcryptjs');

// 获取用户信息
module.exports.getUserInfo = (req, res) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sqlStr = `SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?`;
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err)
            return res.cc(err);

        if (results.length !== 1)
            return res.cc('获取用户信息失败！');

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    });
}

// 更新用户信息
module.exports.updateUserInfo = (req, res) => {
    // 用户ID是jwt验证身份后自动挂载的,无需手动传参
    const sqlStr = `UPDATE ev_users SET ? WHERE id=?`;
    db.query(sqlStr, [req.body, req.user.id], (err, results) => {
        if (err)
            return res.cc(err);

        if (results.affectedRows !== 1)
            return res.cc('修改用户信息失败');

        res.cc('修改用户信息成功', 0);
    });
};

// 修改用户密码
module.exports.updatePassword = (req, res) => {
    const sqlStr = `SELECT * FROM ev_users WHERE id=?`;
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err)
            return res.cc(err);
        if (results.length !== 1)
            return res.cc('用户不存在！');

        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult)
            return res.cc('原密码错误！');

        const sqlStr = `UPDATE ev_users SET password=? WHERE id=?`;
        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if (err)
                return res.cc(err);

            if (results.affectedRows !== 1)
                return res.cc('更新密码失败！');

            res.cc('修改密码成功！', 0);
        });
    })
}

// 修改用户头像
module.exports.updateAvatar = (req, res) => {
    const sqlStr = `UPDATE ev_users SET user_pic=? WHERE id=?`;
    
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        if (err)
            return res.cc(err);

        if (results.affectedRows !== 1)
            return res.cc('更新头像失败！');

        res.cc('更新头像成功！', 0);
    });
};