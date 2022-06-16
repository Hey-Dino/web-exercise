// 1，导入fs、path模块
const fs = require("fs");
const path = require("path");

// 2.定义匹配<style></style>和<script></script>标签的正则
//   其中，\s表示空白字符，\S表示非空白字符，*表示匹配任意次
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 3.1 处理 css 样式
function resolveCSS(htmlStr) {
    // 3.1.1 使用正则提取页面中的<style></style>标签
    const r1 = regStyle.exec(htmlStr);

    // 3.1.2 将提取处理的样式字符串，做进一步处理
    const newCSS = r1[0].replace("<style>", "").replace("</style>", "");

    // 3.1.3 将提取出来的 CSS 样式，写入到 clock/index.css 文件中
    fs.writeFile(path.join(__dirname, "./clock/index.css"), newCSS, err => {
        if (err)
            return console.log("写入 CSS 样式失败，失败信息:", err.message);

        console.log("写入 CSS 样式成功");
    });
}

// 3.2 处理 Javascript 样式
function resolveJs(htmlStr) {
    // 3.2.1 使用正则提取页面中的<script></script>标签
    var r2 = regScript.exec(htmlStr);

    // 3.2.2 将提取处理的样式字符串，做进一步处理
    var newJs = r2[0].replace("<script>", "").replace("</script>", "");

    // 3.1.3 将提取出来的 Javascript 样式，写入到 clock/index.js 文件中
    fs.writeFile(path.join(__dirname, "./clock/index.js"), newJs, err => {
        if (err)
            return console.log("写入 Javascript 失败，失败信息:", err.message);

        console.log("写入 Javascript 成功");
    });
}

// 3.3 处理 html 样式
function resolveHTML(htmlStr) {
    // 3.3.1 使用字符串的replace方法，把内嵌的 <style> 和 <script> 标签，替换为外联的 <link> 和 <script>
    var newHTML = htmlStr
        .replace(regStyle, '<link rel="stylesheet" href="./index.css" />')
        .replace(regScript, '<script src="./index.js"></script>');

    // 3.3.2 将替换完成之后的 HTML 代码，写入到 index.html 文件中
    fs.writeFile(path.join(__dirname, "./clock/index.html"), newHTML, err => {
        if (err)
            return console.log("写入 HTML 文件失败，失败信息:", err.message);

        console.log("写入 HTML 文件成功");
    });
}

// 4.读取需要被处理的 HTML 文件
fs.readFile(path.join(__dirname, "./index.html"), "utf-8", (err, dataStr) => {
    if (err)
        return console.log("文件读取失败，失败信息:", err.message);

    resolveCSS(dataStr);
    resolveJs(dataStr);
    resolveHTML(dataStr);
});