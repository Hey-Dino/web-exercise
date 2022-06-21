// 1.导入 mysql 模块
const mysql = require('mysql');

// 2.建立与 MySql 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'w442395',
    database: 'demo'
});

// 3.测试是否正常工作
db.query('select 1', (err, results) => {
    if (err)
        return console.log('Error: ' + err.message);

    console.log('测试成功:\n', results, '\n');
});


// 4.查询数据
db.query('SELECT * FROM user', (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    console.log('查询成功:\n', results, '\n');
});


// 5.插入数据
// 5.1 要插入到 user 表中的数据对象
let user = { name: 'George', pwd: '123321' };
// 5.2 待执行的 SQL 语句，其中英文的 ? 表示占位符
let sqlStr = 'INSERT INTO user (name, pwd) VALUES (?, ?)';
// 5.3 直接将数据对象当作占位符的值
db.query(sqlStr, [user.name, user.pwd], (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    if (results.affectedRows === 1)
        console.log('插入成功:\n', results, '\n');
});

// 快捷方式
sqlStr = 'INSERT INTO user SET ?';
db.query(sqlStr, user, (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    if (results.affectedRows === 1)
        console.log('插入成功(快捷):\n', results, '\n');
});


// 6.更新数据
user = { name: 'Suxi', pwd: '321123', id: 00005 }
sqlStr = 'UPDATE user SET name=?, pwd=? WHERE id=?';
db.query(sqlStr, [user.name, user.pwd, user.id], (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    if (results.affectedRows === 1)
        console.log('更新成功:\n', results, '\n');
});

// 快捷方式
sqlStr = 'UPDATE user SET ? WHERE id=?';
db.query(sqlStr, [user, user.id], (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    if (results.affectedRows === 1)
        console.log('更新成功(快捷):\n', results, '\n');
});


// 7.删除数据
/* user = { name: 'George' };
sqlStr = 'DELETE FROM user WHERE ?';
db.query(sqlStr, user, (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    if (results.affectedRows === 1)
        console.log('删除成功:\n', results, '\n');
}); */

// 标记删除
user = { name: 'George', status: 1 };
sqlStr = 'UPDATE user SET status=? WHERE name=?';
db.query(sqlStr, [user.status, user.name], (err, results) => {
    if (err)
        return console.log('Error:', err.message);

    if (results.affectedRows === 1)
        console.log('删除成功(标记):\n', results, '\n');
});