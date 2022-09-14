// 引入 vue-router 及 Vue
import VueRouter from "vue-router";
import Vue from "vue"

// 使用VueRouter插件
Vue.use(VueRouter);

// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

// 重写 VueRouter原型 的push方法，避免 NavigationDuplicated 警告
const origiPush = VueRouter.prototype.push;

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        origiPush.call(this, location, resolve, reject);
    } else {
        origiPush.call(this, location, () => { }, () => { });
    }
}

// 创建并暴露路由
export default new VueRouter({
    routes: [
        // 路由重定向，首次进入页面，跳转到Home页面
        {
            path: '*',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                showFooter: false
            }
        }
    ]
})