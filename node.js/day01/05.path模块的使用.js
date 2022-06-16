// 导入path模块
const path = require("path");

// 1.path.join()方法的使用
console.log("path.join()方法的使用:");
console.log(path.join("a/b/c", "./d/e"));
console.log(path.join("a/b/c", "../d/e"));

// 2.path.basename()方法的使用
console.log("\npath.basename()方法的使用:");
const filePath = "../a/b/c/index.html";

var fullname = path.basename(filePath);
console.log("Full Name:", fullname);

var nameWithoutExt = path.basename(filePath, ".html");
console.log("Name Without Ext:", nameWithoutExt);

// 3.path.extname()方法的使用
var extName = path.extname(filePath);
console.log("\npath.extname()方法的使用:");
console.log("Ext Name:", extName);