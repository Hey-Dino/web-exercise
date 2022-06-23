const joi = require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 定义 分类名称 和 分类别名 的校验规则
const name = joi
    .string()
    .required();

const alias = joi
    .string()
    .required();

module.exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 定义 分类Id 的校验规则
const id = joi
    .number()
    .integer()
    .min(1)
    .required();

module.exports.delete_cate_schema = {
    params: {
        id
    }
}

module.exports.get_cate_schema = {
    params: {
        id
    }
}

module.exports.update_cate_schem = {
    body: {
        id,
        name,
        alias
    }
}