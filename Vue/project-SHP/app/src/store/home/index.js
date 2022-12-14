//  home 模块的仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

const state = {
    // 商品种类信息 Nav
    categoryList: [],
    // 轮播图信息
    bannerList: [],
    // 楼层信息
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
        if (result.status === 200) {
            commit("GETFLOORLIST", result.data);
        }
    },
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
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