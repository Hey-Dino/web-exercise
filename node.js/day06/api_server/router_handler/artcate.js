// 导入数据库操作模块
const db = require('../db/index');

// 获取文章分类
module.exports.getArticleCates = (req, res) => {
    const sqlStr = `SELECT * FROM ev_article_cate WHERE is_delete=0 ORDER BY id ASC`;
    db.query(sqlStr, (err, results) => {
        if (err)
            return res.cc(err);

        res.send({
            status: 0,
            message: '获取文字分类列表成功',
            data: results
        });
    });
}

// 增加文章分类
module.exports.addArticleCate = (req, res) => {
    const sqlStr = `SELECT * FROM ev_article_cate WHERE name=? or alias=?`;
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        if (err)
            return res.cc(err);

        // 分类名称 和 别名 都被占用
        if (results.length === 2)
            return res.cc('分类名称与别名被占用，请更换后重试！');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名称与别名被占用，请更换后重试！');
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名被占用，请更换后重试！');
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用，请更换后重试！');


        const sqlStr = `INSERT INTO ev_article_cate SET ?`;
        db.query(sqlStr, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err)
                return res.cc(err);

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1)
                return res.cc('新增文章分类失败！');

            // 新增文章分类成功
            res.cc('新增文章分类成功！', 0);
        })
    })
}

// 根据 ID 号，删除文章分类
module.exports.deleteCateById = (req, res) => {
    const sqlStr = `UPDATE ev_article_cate SET is_delete=1 WHERE id=?`;
    db.query(sqlStr, req.params.id, (err, results) => {
        // SQL 语句执行失败
        if (err)
            return res.cc(err);

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1)
            return res.cc('删除文章分类失败！');

        // 删除文章分类成功
        res.cc('删除文章分类成功！', 0);
    })
}

// 根据 ID 号，查找文章分类
module.exports.getArtCateById = (req, res) => {
    const sqlStr = `SELECT * FROM ev_article_cate WHERE id=? AND is_delete=0`;
    db.query(sqlStr, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err)
            return res.cc(err)

        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1)
            return res.cc('获取文章分类数据失败！');

        // 获取文章分类数据成功
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        });
    });
}

// 根据 ID 号，更新文章分类
module.exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句(<> 表示不等于)
    const sqlStr = `SELECT * FROM ev_article_cate WHERE Id<>? AND (name=? OR alias=?)`;
    db.query(sqlStr, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err)
            return res.cc(err);

        // 分类名称 和 别名 都被占用
        if (results.length === 2)
            return res.cc('分类名称与别名被占用，请更换后重试！');
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名称与别名被占用，请更换后重试！');
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名被占用，请更换后重试！');
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用，请更换后重试！');


        const sqlStr = `UPDATE ev_article_cate SET ? WHERE id=?`;
        db.query(sqlStr, [req.body, req.body.id], (err, results) => {
            // SQL 语句执行失败
            if (err)
                return res.cc(err);

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1)
                return res.cc('更新文章分类失败！');

            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0);
        });
    })
}