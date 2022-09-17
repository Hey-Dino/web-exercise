/* 
    shopcart组件的仓库
*/
import { reqGetCartList } from "@/api";

const state = {
    cartList: {}
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqGetCartList();

        if (result.code === 200) {
            commit("GETCARTLIST");
        }
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}