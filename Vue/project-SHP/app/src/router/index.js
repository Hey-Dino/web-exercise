// 引入 vue-router 及 Vue
import VueRouter from "vue-router";
import Vue from "vue"

// 使用VueRouter插件
Vue.use(VueRouter);

// 引入routes
import routes from "./routes";

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
    routes,
    // Vue滚动
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})