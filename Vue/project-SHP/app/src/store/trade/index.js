/* 
    管理 订单详情页trade 的仓库
*/
import { reqGetUserAddress, reqGetTradeInfo } from "@/api"

const state = {
    addressInfoList: [],
    tradeInfo: {},
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        const result = await reqGetUserAddress();

        if (result.code === 200) {
            commit("GETUSERADDRESS", result.data);
        }
    },
    // 获取交易信息
    async getOrderInfo({ commit }) {
        const result = await reqGetTradeInfo();

        if (result.code === 200) {
            commit("GETORDERINFO", result.data);
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, addressInfoList) {
        state.addressInfoList = addressInfoList;
    },
    GETORDERINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo;
    },
}
const getters = {
    // 获取订单详情信息
    orderDetailList(state) {
        // 数据处理，避免undefined的影响
        const orderDetailVoList = state.tradeInfo.orderDetailVoList || [];
        const no1 = orderDetailVoList[0] || {};
        const orderDetailList = no1.orderDetailList || [];

        return orderDetailList;
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}