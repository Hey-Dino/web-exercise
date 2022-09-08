import { reqCategoryList } from "@/api";

//  home 模块的仓库
const state = {
    a: 1,
    categoryList: []
};
const actions = {
    async categoryList({ commit }) {
        const result = await reqCategoryList();
        // 判断获取数据是否成功
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data);
        }
    }
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    }
};
const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}