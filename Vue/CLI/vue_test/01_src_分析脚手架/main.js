/* 
    整个项目的入口文件

    关于不同版本的Vue：
        1.vue.js 与 vue.runtime.xxx.js 的区别：
            (1).vue.js 是完整版的Vue。包含：核心功能+模板解析器
            (2).vue.runtime.xxx.js是运行版本的Vue，只包含：核心功能，没有模板解析器

        2.因为vue.runtime.xxx.js没有模板解析器，所有不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容
*/

// 引入Vue
import Vue from 'vue'
import App from './App.vue'

// 引入App组件，它是所有组件的父组件
Vue.config.productionTip = false

new Vue({
    el: "#app",
    render: h => h(App),
});
