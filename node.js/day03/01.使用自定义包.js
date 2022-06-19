const tools = require("./dino_tools/index");

console.log(tools.dateFormat(new Date));

console.log('---------------');
const htmlStr = '<h1 class="demo01">这是一个&nbsp;h1标签</h1>';
const str = tools.htmlEscape(htmlStr);
console.log(str);

console.log('---------------');
console.log(tools.htmlUnEscape(str));