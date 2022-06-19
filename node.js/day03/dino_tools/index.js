const dateFormat = require("./src/dateFormat");
const htmlEscape = require("./src/htmlEscape");

// 导出格式化函数
module.exports = {
    // ... 为展开语法
    ...dateFormat,
    ...htmlEscape
}