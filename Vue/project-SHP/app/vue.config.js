const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭代码审查
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: "http://gmall-h5-api.atguigu.cn"
            }
        }
    }
})
