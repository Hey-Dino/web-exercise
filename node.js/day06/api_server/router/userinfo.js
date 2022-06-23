const express = require('express');
const router = express.Router();

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi');
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user');

// 导入用户信息路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo');

router.get('/userinfo', userinfo_handler.getUserInfo);
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo);
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword);
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar);

module.exports = router;