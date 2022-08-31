// 该文件用于创建 Vuex 中最核心的Store

// 导入Vue
import Vue from "vue";
// 导入 Vuex
import Vuex from "vuex";
// 使用Vuex插件
Vue.use(Vuex);

// 准备actions —— 响应组件中的动作
const actions = {
    addOdd(context, val) {
        if (context.state.sum % 2) {
            context.commit("ADD", val);
        }
    },
    addWait(context, val) {
        if (!this.timer) {
            this.timer = setTimeout(() => {     // settimeout中切勿使用普通函数，否则this指向window
                context.commit("ADD", val);
                this.timer = null;
            }, 500);
        }
    }
};
// 准备mutation —— 用于操作数据（state）
const mutations = {
    ADD(state, val) {
        state.sum += val;
    },
    REDUCE(state, val) {
        state.sum -= val;
    },
    ADDSTU(state, student) {
        state.personList.unshift(student);
    }
};
// 准备state —— 用于存储数据
const state = {
    sum: 0,
    school: "CS&S",
    subject: "Vue",
    personList: [
        {
            id: "001",
            name: "Dino"
        }
    ]
};
// 准备getters —— 用于获取数据
const getters = {
    bigSum(state) {
        return state.sum * 10;
    }
}

// 创建并暴露 Store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
});
