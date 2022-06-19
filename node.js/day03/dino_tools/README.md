## Install
```
npm install dino_tools
```

## Import
```js
const tools = require('dino_tools');
```

## Usage
### DateFormat
```js
// result: 2022-06-18 13:51:30
console.log(tools.dateFormat(new Date));
```

### htmlEscape
```js
const htmlStr = '<h1 class="demo01">这是一个&nbsp;h1标签</h1>';
const str = tools.htmlEscape(htmlStr);
// result: &lt;h1 class=&quot;demo01&quot;&gt;这是一个&amp;nbsp;h1标签&lt;/h1&gt;
console.log(str);
```

### htmlUnEscape
```js
// result: <h1 class="demo01">这是一个&nbsp;h1标签</h1>
console.log(tools.htmlUnEscape(str));
```

## LICENSE
ISC

