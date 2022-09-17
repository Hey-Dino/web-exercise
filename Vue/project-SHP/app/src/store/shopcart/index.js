/* 
    shopcart组件的仓库
*/
import { reqGetCartList, reqAddOrUpdateToCart } from "@/api";

const state = {
    cartList: [],
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqGetCartList();

        if (result.code === 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    // 更新商品数量
    async updateToCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateToCart(skuId, skuNum);

        if (result.code === 200) {
            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Failure"));
        }
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList[0];
    }
}
const getters = {
    cartInfoList(state) {
        return state.cartList.cartInfoList || [];
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}