// 引入 Vue 和 Vuex
import Vue from "vue"
import Vuex from "vuex"

// 使用 Vuex 插件
Vue.use(Vuex);

// 引入子仓库
import user from "./user";
import article from "./article";

// 创建并暴露 store 实例
export default new Vuex.Store({
    modules: {
        userOption: user,
        articleOption: article,
    }
})