// 引入 Vue 和 Vuex
import Vue from "vue";
import Vuex from "vuex";

// 使用 Vuex 插件
Vue.use(Vuex);

// 引入子仓库
import home from "./home";
import search from "./search";

export default new Vuex.Store({
    modules: {
        homeOption: home,
        searchOption: search
    }
});