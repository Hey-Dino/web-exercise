// 引入 vue-router 及 Vue
import VueRouter from "vue-router";
import Vue from "vue"
// 引入获取Token的方法
import { getToken, removeToken } from "@/utils/token"

// 使用VueRouter插件
Vue.use(VueRouter);

// 引入routes
import routes from "./routes";
import store from "@/store";

// 重写 VueRouter原型 的push方法，避免 NavigationDuplicated 警告
const origiPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        origiPush.call(this, location, resolve, reject);
    } else {
        origiPush.call(this, location, () => { }, () => { });
    }
}

// 创建路由
const vueRouter = new VueRouter({
    routes,
    // Vue滚动
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
});

// 设置全局前置路由守卫
vueRouter.beforeEach(async (to, from, next) => {
    // 获取用户昵称
    const userNickName = store.state.userOption.userInfo.nickName;
    // 获取Token
    const token = getToken();

    if (token) {
        if (!userNickName) {
            try {
                // 重新派发，获取用户信息
                await store.dispatch("userOption/getUserInfoByToken");
                // 信息获取成功，放行
                next();
            } catch (err) {
                /* 获取用户信息出错，表示Token过期失效 */
                console.log(err.message);
                // 清除Token
                removeToken();
                // 重定向到Login页面
                next("/login");
            }
        } else {
            // 用户登录状态下，不允许进入登录页面
            if (to.path === "/login") {
                next('/home');
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

// 暴露路由
export default vueRouter;