import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router";
// 引入Vuex仓库 store
import store from "@/store"
// 引入三级联动组件（全局组件）
import TypeNav from "@/components/TypeNav"
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"

// 关闭生产提示
Vue.config.productionTip = false;
// 注册全局组件（第一个参数为注册名，第二个参数为组件）
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// 部分引入Element-UI
import { MessageBox, Message } from "element-ui"
// 注册Element-UI组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// 引入 mockServer.js，实现数据模拟
import "@/mock/mockServer";
// 引入 所有api接口
import * as API from "@/api"

new Vue({
    render: h => h(App),
    beforeCreate() {
        // 全局事件总线
        Vue.prototype.$bus = this;
        // 全局接口集合
        Vue.prototype.$API = API;
    },
    // 注册路由
    router,
    // 注册 store
    store
}).$mount('#app')
