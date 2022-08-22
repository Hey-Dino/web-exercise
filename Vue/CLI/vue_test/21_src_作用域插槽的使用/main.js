// 引入Vue
import Vue from "vue";
// 引入APP
import App from './App.vue'
// 引入插件（类似于axios）
import vueResource from "vue-resource"
// 关闭Vue生产提示
Vue.config.productionTip = false;

// 使用vue-resource插件
Vue.use(vueResource);

// 创建Vue
new Vue({
    el: "#app",
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
})