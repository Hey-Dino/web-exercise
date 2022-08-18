// 引入Vue
import Vue from "vue";
// 引入APP
import App from './App.vue'
// 关闭Vue生产提示
Vue.config.productionTip = false;

// 全局配置：引入mixin并绑定混入
import { mixin1 } from "./mixin"
Vue.mixin(mixin1);

// 创建Vue
new Vue({
    el: "#app",
    render: h => h(App)
})