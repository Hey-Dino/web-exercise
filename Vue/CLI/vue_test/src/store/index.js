// 该文件用于创建 Vuex 中最核心的Store

// 导入Vue
import Vue from "vue";
// 导入 Vuex
import Vuex from "vuex";
// 使用Vuex插件
Vue.use(Vuex);

// 导入模块
import countOption from "./count.js"
import personOption from "./person.js"

// 创建并暴露 Store
export default new Vuex.Store({
    modules: {
        countOption,
        personOption
    }
});
