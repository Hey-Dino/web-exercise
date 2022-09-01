// 该文件用于配置整个应用的路由
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About"
import Home from "../pages/Home"
import News from "../pages/News"
import Messages from "../pages/Messages"
import Detail from "../pages/Detail"

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
            children: [
                {
                    path: "news",
                    component: News
                },
                {
                    path: "messages",
                    component: Messages,
                    children: [
                        {
                            name: "detail",     // 定义路由名称
                            path: "detail",
                            component: Detail
                        }
                    ]
                }
            ]
        },
    ]
});