// 引入Vue
import Vue from "vue";
// 引入APP
import App from './App.vue'
// 关闭Vue生产提示
Vue.config.productionTip = false;

// 创建Vue
new Vue({
    el: "#app",
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
})