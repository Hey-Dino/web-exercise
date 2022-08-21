module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',

        },
    },
    lintOnSave: false, // 关闭语法检查
    // 配置代理服务器
    // 方式一
    /* devServer: {
        proxy: "http://localhost:5000"
    } */
    // 方式二
    devServer: {
        proxy: {
            '/api1': {      // 匹配所有以 ‘/api1’ 开头的请求路径
                target: 'http://localhost:5000',    // 代理目标的基础路径
                pathRewrite: { '^/api1': '' },      // 利用正则表达式，将请求路径中的 /api1 转化为 空字符串
                // ws 和 changeOrigin 在Vue中默认为 true
                ws: true,       // 是否支持 WebSocket
                changeOrigin: true      // 是否与代理目标同源
            },
            '/api2': {
                target: 'http://localhost:5001',
                pathRewrite: { '^/api2': '' },
            },
        }
    }
}
