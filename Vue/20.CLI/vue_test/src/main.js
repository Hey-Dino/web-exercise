/* 
    整个项目的入口文件
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
