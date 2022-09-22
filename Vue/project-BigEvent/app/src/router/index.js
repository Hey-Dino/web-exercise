// 引入 Vue 和 vue-router
import Vue from "vue";
import VueRouter from "vue-router";

// 使用 vue-router 插件
Vue.use(VueRouter);

// 重写 VueRouter 原型的 push 方法，避免 NavigationDuplicated 警告
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

// 引入路由
import routes from "./routes";

// 创建并暴露路由
const vueRouter = new VueRouter({
    routes,
});

export default vueRouter;