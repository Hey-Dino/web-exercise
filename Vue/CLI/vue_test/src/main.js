// 引入Vue
import Vue from "vue";
// 引入APP
import App from './App.vue'
// 引入插件（类似于axios）
import vueResource from "vue-resource"
// 引入Vuex
import Vuex from "vuex"
// 引入Store（此处可以省略 /index，vue默认获取store目录下的index.js文件）
import store from "./store/index"
// 关闭Vue生产提示
Vue.config.productionTip = false;

// 使用vue-resource插件
Vue.use(vueResource);
// 使用Vuex
// Vue.use(Vuex);      // 不能在此处使用Vuex插件，Uncaught Error: [vuex] must call Vue.use(Vuex) before creating a store instance.

// 创建Vue
new Vue({
    el: "#app",
    render: h => h(App),
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
})