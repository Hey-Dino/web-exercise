/* 
    管理 文章article 的仓库
*/
import {
    reqGetCategoryList,
    reqDeleteCategory,
    reqEditCategory,
    reqAddCategory
} from "@/api"

const state = {
    // 文章分类列表
    categoryList: [],
}
const actions = {
    // 获取文章分类信息
    async getCategoryList({ commit }) {
        const result = await reqGetCategoryList();

        if (result.status == 0) {
            commit("GETCATEGORYLIST", result.data);
            return Promise.resolve("Get Category List Successfully.")
        } else {
            return Promise.reject(new Error("Get Category List Failure!"));
        }
    },
    // 删除文章分类信息
    async deleteCategory({ commit }, id) {
        const result = await reqDeleteCategory(id);

        if (result.status == 0) {
            return Promise.resolve("Delete Category List Successfully.")
        } else {
            return Promise.reject(new Error("Delete Category List Failure!"));
        }
    },
    // 编辑文章分类信息
    async editCategory({ commit }, { id, name, alias }) {
        const result = await reqEditCategory(id, name, alias);

        if (result.status === 0) {
            return Promise.resolve("Edit Category List Successfully.")
        } else {
            return Promise.reject(new Error("Edit Category List Failure!"));
        }
    },
    // 增加文章分类信息
    async addCategory({ commit }, { name, alias }) {
        const result = await reqAddCategory(name, alias);

        if (result.status === 0) {
            return Promise.resolve("Add Category List Successfully.")
        } else {
            return Promise.reject(new Error("Add Category List Failure!"));
        }
    }
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
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