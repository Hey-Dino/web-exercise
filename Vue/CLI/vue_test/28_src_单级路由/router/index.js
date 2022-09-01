// 该文件用于配置整个应用的路由
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About"
import Home from "../pages/Home"

// 创建并暴露路由
export default new VueRouter({
    routes: [
        {
            path: "/about",
            component: About,
        },
        {
            path: "/home",
            component: Home,
        },
    ]
});