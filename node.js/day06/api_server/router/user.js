// 创建 路由对象
const router = require('express').Router();

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user');

// Register
router.post('/reguser', userHandler.regUser);

// Login
router.post('/login', userHandler.login);

// 导入路由对象
module.exports = router;