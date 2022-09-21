import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router"
// 引入仓库
import store from "@/store"

Vue.config.productionTip = false

// 完整导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入所有API接口，用于注册全局接口集合
import * as API from "@/api"

new Vue({
    el: "#app",
    render: h => h(App),
    beforeCreate() {
        // 全局接口集合
        Vue.prototype.$API = API;
    },
    // 注册路由
    router,
    // 注册仓库
    store,
});
