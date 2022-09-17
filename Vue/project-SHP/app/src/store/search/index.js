//  search 模块的仓库
import { reqGetSearchInfo } from "@/api"

const state = {
    searchInfo: {}
};
const actions = {
    // params 至少为空对象
    async getSearchInfo({ commit }, params = {}) {
        const result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit("GETSEARCHINFO", result.data);
        }
    },
};
const mutations = {
    GETSEARCHINFO(state, params) {
        state.searchInfo = params;
    }
};
const getters = {
    // 此处的state为当前Option的state
    attrsList(state) {
        /* 
            假如getSearchInfo请求受阻，导致searcInfo为空对象
            为避免此时返回undefined，应在末尾加上 || []
        */
        return state.searchInfo.attrsList || [];
    },
    goodsList(state) {
        return state.searchInfo.goodsList || [];
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || [];
    },
    pageNo(state) {
        return state.searchInfo.pageNo;
    },
    pageSize(state) {
        return state.searchInfo.pageSize;
    },
    total(state) {
        return state.searchInfo.total;
    },
    totalPages(state) {
        return state.searchInfo.totalPages;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}