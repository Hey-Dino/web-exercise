// 引入路由组件
// 引入获取token的方法
import { getToken } from "@/utils/token"

export default [
    // 路由重定向
    {
        path: "*",
        redirect: "/login",
    },
    // 注册页
    {
        path: "/register",
        component: () => import("@/pages/Register"),
    },
    // 登录页
    {
        path: '/login',
        // 路由懒加载
        component: () => import("@/pages/Login"),
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 获取Token
            const token = getToken();

            if (from.path === "/") {
                if (token) {
                    next("/home")
                } else {
                    next();
                }
            } else {
                if (token) {
                    next("/home");
                } else {
                    next();
                }
            }
        }
    },
    // 首页
    {
        path: '/home',
        component: () => import("@/pages/Home"),
        children: [
            // 路由重定向
            {
                path: '/home',
                redirect: '/home/dataVisual',
            },
            // 数据可视化页面
            {
                name: "dataVisual",
                path: "dataVisual",
                component: () => import("@/pages/Home/DataVisual")
            },
            {
                path: "articleManage",
                component: () => import("@/pages/Home/ArticleManage"),
                children: [
                    {
                        path: "articleManage",
                        redirect: "articleManage/articleCategory"
                    },
                    // 文章分类页面
                    {
                        name: "articleCategory",
                        path: "articleCategory",
                        component: () => import("@/pages/Home/ArticleManage/ArticleCategory")
                    },
                    // 文章列表页面
                    {
                        name: "articleList",
                        path: "articleList",
                        component: () => import("@/pages/Home/ArticleManage/ArticleList")
                    },
                    // 文章发布页面
                    {
                        name: "articlePublish",
                        path: "articlePublish",
                        component: () => import("@/pages/Home/ArticleManage/ArticlePublish")
                    }
                ]
            },
            // 个人中心
            {
                path: "userCenter",
                component: () => import("@/pages/Home/UserCenter"),
                children: [
                    // 基础信息页面
                    {
                        name: "basicInfo",
                        path: "basicInfo",
                        component: () => import("@/pages/Home/UserCenter/BasicInfo"),
                    },
                    // 更换头像页面
                    {
                        name: "changeAvatar",
                        path: "changeAvatar",
                        component: () => import("@/pages/Home/UserCenter/ChangeAvatar"),
                    },
                    // 重置密码页面
                    {
                        name: "resetPassword",
                        path: "resetPassword",
                        component: () => import("@/pages/Home/UserCenter/ResetPassword"),
                    },
                ]
            }
        ]
    }
]