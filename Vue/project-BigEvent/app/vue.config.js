const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭代码审查
    lintOnSave: false,
    // 开启代理服务器
    devServer: {
        proxy: "http://localhost:3007"
    },
    // 控制项目打包时不生成map文件（map文件可以判断文件出错位置，但是对于上线的项目可能并不需要）
    productionSourceMap: false,
})