// Detail组件的仓库
import { reqGetGoodsDetail, reqAddOrUpdateToCart } from "@/api"
import { getUserTempId } from "@/utils/userTempId"

const state = {
    goodsDetail: {},
    // 获取用户临时身份ID
    userTempId: getUserTempId(),
}
const actions = {
    async getGoodsDetail({ commit }, skuid) {
        const result = await reqGetGoodsDetail(skuid);

        if (result.code === 200) {
            commit("GETGOODSDETAIL", result.data);
        }
    },
    // 添加商品进入购物车
    async addToCart({ commit }, { skuId, skuName }) {
        const result = await reqAddOrUpdateToCart(skuId, skuName);

        if (result.code === 200) {
            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Failure"));
        }
    }
}
const mutations = {
    GETGOODSDETAIL(state, goodsDetail) {
        state.goodsDetail = goodsDetail;
    },
}
// getters 为简化数组而生
const getters = {
    categoryView() {
        // 添加[|| {}]，避免初始化goodsDetail为空对象时，返回undefined
        return state.goodsDetail.categoryView || {};
    },
    spuSaleAttrList() {
        return state.goodsDetail.spuSaleAttrList || [];
    },
    skuInfo() {
        return state.goodsDetail.skuInfo || {};
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}