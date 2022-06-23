const express = require('express');
const router = express.Router();

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate');

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schem } = require('../schema/artcate');

// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates);
// 添加文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCate);
// 删除文章分类(根据ID号)
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById);
// 查找文章分类(根据ID号)
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById);
// 更新文章分类(根据ID号)
router.post('/updatecate', expressJoi(update_cate_schem), artcate_handler.updateCateById);

module.exports = router;