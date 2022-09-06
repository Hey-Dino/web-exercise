// 该文件用于配置整个应用的路由
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About"
import Home from "../pages/Home"
import News from "../pages/News"
import Messages from "../pages/Messages"
import Detail from "../pages/Detail"

// 创建并暴露路由
const router = new VueRouter({
    mode: 'history',    // 默认模式为：hash
    routes: [
        {
            name: "about",
            path: "/about",
            component: About,
            meta: { title: "关于页" }
        },
        {
            name: "home",
            path: "/home",
            component: Home,
            meta: { title: "主页" },
            children: [
                {
                    name: "news",
                    path: "news",
                    component: News,
                    meta: { isAuth: true, title: "新闻页" },
                    // 配置独享路由守卫
                    /* beforeEnter: (to, from, next) => {
                        if (localStorage.getItem("age") && localStorage.getItem(age) >= 18) {
                            next();     // 鉴权成功，放行
                        } else {
                            alert("年龄不足！！！");
                        }
                    } */
                },
                {
                    name: "messages",
                    path: "messages",
                    component: Messages,
                    meta: { isAuth: true, title: "消息页" },
                    children: [
                        {
                            name: "detail",
                            path: "detail/:id/:title",
                            component: Detail,
                            meta: { title: "细节页" },
                            props: function ({ query, params }) {
                                return {
                                    id: query.id || params.id,
                                    title: query.title || params.title
                                }
                            }
                        }
                    ]
                }
            ]
        },
    ]
});

// 全局-前置路由守卫 —— 初始化时被调用、每次路由切换前被调用
/* router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {   // 判断是否需要鉴权
        if (localStorage.getItem("username") == "Dino") {
            next();
        } else {
            alert("用户名有误！");
        }
    } else {
        next();
    }
}); */

// 全局-后置路由首位 —— 初始化时被调用、每次路由切换完成后被调用
router.afterEach((to, from) => {
    document.title = to.meta.title;
});

export default router;