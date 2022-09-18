/* 
    shopcart组件的仓库
*/
import { reqGetCartList, reqAddOrUpdateToCart, reqDeleteSkuById, reqUpdateCheckedById } from "@/api";

const state = {
    cartList: [],
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqGetCartList();

        if (result.code === 200) {
            commit("GETCARTLIST", result.data);
        } else {
            Promise.reject(new Error("Get Cart Info List Failure!"))
        }
    },
    // 更新商品数量
    async updateToCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateToCart(skuId, skuNum);

        if (result.code === 200) {
            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Add to Shop Cart Or Update Sku Num Failure"));
        }
    },
    // 删除商品
    async deleteSkuById({ commit }, skuId) {
        const result = await reqDeleteSkuById(skuId);

        if (result.code === 200) {
            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Delete Sku By Id Failure"));
        }
    },
    // 更新单个商品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        const result = await reqUpdateCheckedById(skuId, isChecked);

        if (result.code === 200) {
            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Update Checked Sku By Id Failure"));
        }
    },
    // 删除所有选中的商品
    deleteAllSkuChecked({ dispatch, getters }) {
        const promiseAll = [];
        getters.cartInfoList.forEach(cartInfo => {
            if (cartInfo.isChecked === 1) {
                const result = dispatch("deleteSkuById", cartInfo.skuId);
                promiseAll.push(result);
            }
        });

        // 当且仅当PromiseAll存储的全为resolve时，Promise.all()才返回true
        return Promise.all(promiseAll);
    },
    // 全选或取消全选
    checkOrUncheckAllSku({ dispatch, getters }, isChecked) {
        const promiseAll = [];
        getters.cartInfoList.forEach(cartInfo => {
            // 仅对与全选框checked不一致的商品进行操作
            if (cartInfo.isChecked !== isChecked) {
                const result = dispatch("updateCheckedById", { skuId: cartInfo.skuId, isChecked: isChecked })
                promiseAll.push(result);
            }
        });

        return Promise.all(promiseAll);
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}
const getters = {
    cartInfoList(state) {
        // 避免数据为undefined，出现错误
        const cartList = state.cartList || [];
        const cartListOne = cartList[0] || {};
        return cartListOne.cartInfoList || [];
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}