/* 
    管理用户相关操作的仓库
*/
// 引入请求方法
import {
    reqRegisterAccount,
    reqLoginAccount,
    reqGetUserInfoById,
    reqUpdateUserInfoById,
    reqUpdateUserPasswordById
} from "@/api"

// 获取设置 Token 的方法
import { setToken } from "@/utils/token";

const state = {
    userInfo: {},
}
const actions = {
    // 注册账户
    async registerAccount({ commit }, { username, password }) {
        const result = await reqRegisterAccount(username, password);
        console.log(result)
        // 证明登录成功
        if (result.status === 0) {
            return Promise.resolve("Login Account Successfully!");
        } else {
            return Promise.reject(new Error("Login Account Failure!"));
        }
    },
    // 登录账户
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
    },
    // 通过ID号查询用户信息
    async getUserInfoById({ commit }) {
        const result = await reqGetUserInfoById();

        if (result.status === 0) {
            commit("GETUSERINFOBYID", result.data)
            return Promise.resolve("Get User Information Successfully!");
        } else {
            return Promise.reject(new Error("Get User Information Failure!"));
        }
    },
    // 修改用户基本信息
    async updateUserInfoById({ dispatch }, userInfo) {
        // 解构对象属性
        const { username, nickname, email } = userInfo;

        const result = await reqUpdateUserInfoById(username, nickname, email);
        if (result.status === 0) {
            // 刷新用户数据信息
            dispatch("getUserInfoById").then(() => {
                return Promise.resolve("Update User Information Successfully!");
            })
        } else {
            return Promise.reject(new Error("Update User Information Failure!"));
        }
    },
    // 修改用户密码
    async updateUserPassword({ commit }, { oldPwd, newPwd }) {
        const result = await reqUpdateUserPasswordById(oldPwd, newPwd);

        if (result.status === 0) {
            return Promise.resolve("Update User Password Successfully!");
        } else {
            return Promise.reject(new Error("Update User Password Failure!"));
        }
    }
}
const mutations = {
    GETUSERINFOBYID(state, userInfo) {
        state.userInfo = userInfo;
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}