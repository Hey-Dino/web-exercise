// 该文件用于创建 Vuex 中最核心的Store

// 导入Vue
import Vue from "vue";
// 导入 Vuex
import Vuex from "vuex";
// 使用Vuex插件
Vue.use(Vuex);

// 准备actions —— 响应组件中的动作
const actions = {};
// 准备mutation —— 用于操作数据（state）
const mutation = {};
// 准备state —— 用于存储数据
const state = {};

// 创建并暴露 Store
export default new Vuex.Store({
    actions,
    mutation,
    state
});
