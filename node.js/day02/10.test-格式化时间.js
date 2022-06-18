const timer = require("./09.自定义模块-格式化时间");

const date = new Date();

const newDt = timer.dateFormat(date);
console.log("时间:", newDt);