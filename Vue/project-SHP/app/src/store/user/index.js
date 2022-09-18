/* 
    管理用户相关操作的仓库
*/
import { reqGetCodeByPhone, reqRegisterAccount, reqLoginAccount, reqGetUserInfoByToken, reqLogoutAccount } from "@/api"
// 导入设置、清除Token的方法
import { setToken, removeToken } from "@/utils/token"

const state = {
    userInfo: {},
}
const actions = {
    // 通过手机号获取验证码
    async getCodeByPhone({ commit }, phone) {
        const result = await reqGetCodeByPhone(phone);

        if (result.code === 200) {
            // 输出验证码，方便注册时填写
            console.log("store-register\nRegister Code:", result.data);
            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Get Code By Phone Number Failure!"))
        }
    },
    // 注册账户
    async registerAccount({ commit }, { phone, password, code }) {
        const result = await reqRegisterAccount(phone, password, code);

        if (result.code === 200) {
            return Promise.resolve("Success");
        } else {
            return Promise.reject("Register Account Failure!");
        }
    },
    // 登录账户【Token】
    async loginAccount({ commit }, { phone, password }) {
        const result = await reqLoginAccount(phone, password)

        if (result.code === 200) {
            // 存储 Token
            setToken(result.data.token);

            return Promise.resolve("Success");
        } else {
            return Promise.reject(new Error("Login Account Failure!"));
        }
    },
    // 通过Token获取用户信息
    async getUserInfoByToken({ commit }) {
        const result = await reqGetUserInfoByToken();

        if (result.code === 200) {
            commit("GETUSERINFOBYTOKEN", result.data);
        }
    },
    // 注销账户
    async logoutAccount({ commit }) {
        const result = await reqLogoutAccount();

        if (result.code === 200) {
            // action中不能操作state中的数据
            commit("LOGOUTACCOUTN");
            return Promise.resolve("Logout Account Successfully.");
        } else {
            return Promise.reject(new Error("Logout Account Failure!"));
        }
    },
}
const mutations = {
    GETUSERINFOBYTOKEN(state, userInfo) {
        state.userInfo = userInfo;
    },
    LOGOUTACCOUTN(state) {
        // 移除 Token
        removeToken();
        // 清除用户信息
        state.userInfo = {};
    },
}
const getters = {
    // 对state中的userInfo进行处理，避免出现undefined的情况
    userInfo(state) {
        return state.userInfo || {};
    },
    // 获取用户昵称
    nickName(getters) {
        return getters.userInfo.nickName;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}