import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

//  home 模块的仓库
const state = {
    a: 1,
    categoryList: [],
    bannerList: [],
    floorList: []
};
const actions = {
    async categoryList({ commit }) {
        const result = await reqCategoryList();
        // 判断获取数据是否成功
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data);
        }
    },

    // 获取轮播图信息
    async getBannerList({ commit }) {
        // await 用于获取promise返回的内容，可以是resolve也可以是reject
        const result = await reqGetBannerList();
        if (result.status === 200) {
            commit("GETBANNERLIST", result.data);
        }
    },

    // 获取楼层信息
    async getFloorList({ commit }) {
        const result = await reqGetFloorList();
        console.log(result)
        if (result.status === 200) {
            commit("GETFLOORLIST", result.data);
        }
    }
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        console.log("bannerList装填成功")
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
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