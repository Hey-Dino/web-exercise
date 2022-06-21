// 目的：为了保证 路由模块 的纯粹性，所有的 路由处理函数，必须抽离到对应的 路由处理函数模块中

// 注册用户的处理函数
module.exports.regUser = (req, res) => {
    console.log('register OK');

    res.send('register OK');
};

// 登录的处理函数
module.exports.login = (req, res) => {
    console.log('login OK');

    res.send('login ok')
};