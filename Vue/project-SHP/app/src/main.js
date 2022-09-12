import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router";
// 引入Vuex仓库 store
import store from "@/store"
// 引入三级联动组件（全局组件）
import TypeNav from "@/components/TypeNav"

// 关闭生产提示
Vue.config.productionTip = false;
// 注册全局组件（第一个参数为注册名，第二个参数为组件）
Vue.component(TypeNav.name, TypeNav);

// 引入 mockServer.js，实现数据模拟
import "@/mock/mockServer";

new Vue({
    render: h => h(App),
    // 注册路由
    router,
    // 注册 store
    store
}).$mount('#app')
