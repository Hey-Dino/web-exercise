/* 
    管理 login 的仓库
*/
import { reqLoginAccount } from "@/api"

// 获取设置 Token 的方法
import { setToken } from "@/utils/token";

const state = {}
const actions = {
    async loginAccount({ commit }, { username, password }) {
        const result = await reqLoginAccount(username, password)

        // 证明登录成功
        if (result.status === 0) {
            // 持久化存储Token
            setToken(result.token);

            return Promise.resolve("Login Account Successfully!");
        } else {
            return Promise.reject(new Error("Login Account Failure!"));
        }
    }
}
const mutations = {}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}