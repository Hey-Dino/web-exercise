// 导入处理路径的 path 核心模块
const path = require('path');
const db = require('../db/index');

// 增加文章信息
module.exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    // if (!req.file || req.file.filename != 'cover_img')
    //     return res.cc('文章封面是必选参数！');

    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        // cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id
    }

    const sqlStr = `INSERT INTO ev_articles SET ?`;
    db.query(sqlStr, articleInfo, (err, results) => {
        if (err)
            return res.cc(err);

        if (results.affectedRows !== 1)
            return res.cc('发布文章失败！');

        res.cc('发布文章成功！', 0);
    });
}

// 获取文章信息
module.exports.getArticles = (req, res) => {
    // SQL 查询语句
    const sqlStr = `SELECT eva.id, title, content, cover_img, pub_date, evc.name AS cate_name, cate_id, state 
                    FROM ev_articles eva 
                    LEFT JOIN ev_article_cate evc 
                    ON eva.cate_id = evc.id 
                    WHERE eva.is_delete = 0`;
    db.query(sqlStr, (err, results) => {
        if (err)
            return res.cc(err);

        res.send({
            status: 0,
            message: '获取文章成功',
            data: results
        });
    });
}

// 获取不同[状态]的文章
module.exports.getArticlesByState = (req, res) => {
    // 获取所需查询的状态
    const state = req.params.state;
    // SQL语句
    const sqlStr = `SELECT eva.id, title, content, cover_img, pub_date, evc.name AS cate_name, state 
                    FROM ev_articles eva 
                    LEFT JOIN ev_article_cate evc 
                    ON eva.cate_id = evc.id
                    WHERE evc.is_delete = 0 AND state = ?`;
    // 查询
    db.query(sqlStr, state, (err, results) => {
        if (err)
            return res.cc(err);

        res.send({
            status: 0,
            message: `获取文章[${state}]成功`,
            data: results
        });
    })
}

// 删除文章
module.exports.deleteArticleById = (req, res) => {
    // 获取所需删除的文章的ID
    const id = req.params.id;

    const sqlStr = 'UPDATE ev_articles SET is_delete = 1 WHERE id = ?';
    db.query(sqlStr, id, (err, results) => {
        if (err)
            return res.cc(err);

        if (results.affectedRows !== 1)
            return res.cc('删除文章失败！');

        res.cc('删除文章成功！', 0);
    })
}

// 编辑文章
module.exports.updateArticleById = (req, res) => {
    const sqlStr = 'UPDATE ev_articles SET ? WHERE id=?';
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // SQL 语句执行失败
        if (err)
            return res.cc(err);

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1)
            return res.cc('更新文章失败！');

        // 更新文章分类成功
        res.cc('更新文章成功！', 0);
    })
}