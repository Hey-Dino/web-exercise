## 引入 JS 而非 TS 的缘故

> 目前，大部分的浏览器 **仍不支持 TypeScript语言**，因而只能借助 **JavaScript** 去使用它。

## 如何使用TS

1. 全局安装 TypeScript：

   在 **命令行终端** 输入：`npm i -g typescript`

2. 在项目的某一位置，创建自己需要的 TypeScript 文件（后缀名为 **.ts**）

3. 完成 TypeScript 代码后，在 TypeScript 文件的 **根路径** 下，在 **命令行终端**中输入如下命令生成 **同名**JavaScript文件：`tsc`（即 TypeScript Compiler的简写形式）。

4. 为避免重复输入 `tsc` 命令，可以使用 `tsc -w` 命令。其会监听 TypeScript 文件，一旦 TypeScript 文件保存时，便会自动执行 `tsc` 命令。其中，`-w`即为 **watch **的缩写。



备注：

1. 使用命令 `tsc --init` 生成初始化文档：**tsconfig.json**