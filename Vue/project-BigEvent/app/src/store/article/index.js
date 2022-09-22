/* 
    管理 文章article 的仓库
*/
import {
    reqGetCategoryList,
    reqDeleteCategory,
    reqEditCategory,
    reqAddCategory,
    reqPublishArticle,
    reqGetArticles,
    reqGetArticlesByState,
    reqDeleteArticleById,
    reqUpdateArticleById,
} from "@/api"

const state = {
    // 文章分类列表
    categoryList: [],
    // 文章列表
    articleList: [],
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
    },
    // 发布文章
    async publishArticle({ commit }, articleInfo) {
        const result = await reqPublishArticle(articleInfo);

        if (result.status === 0) {
            return Promise.resolve("Publish Article Successfully.")
        } else {
            return Promise.reject(new Error("Publish Article Failure!"));
        }
    },
    // 获取文章信息
    async getArticles({ commit }) {
        const result = await reqGetArticles();

        if (result.status === 0) {
            commit("SETARTICLES", result.data);
            return Promise.resolve("Get Article Successfully.")
        } else {
            return Promise.reject(new Error("Get Article Failure!"));
        }
    },
    // 获取某种状态的文章信息
    async getArticlesByState({ commit }, state) {
        const result = await reqGetArticlesByState(state);

        if (result.status === 0) {
            commit("SETARTICLES", result.data);
            return Promise.resolve("Get Article By State Successfully.")
        } else {
            return Promise.reject(new Error("Get Article By State Failure!"));
        }
    },
    // 删除文章
    async deleteArticleById({ commit }, id) {
        const result = await reqDeleteArticleById(id);

        if (result.status === 0) {
            return Promise.resolve("Delete Article By State Successfully.")
        } else {
            return Promise.reject(new Error("Delete Article By State Failure!"));
        }
    },
    // 更新文章
    async updateArticleById({ commit }, articleInfo) {
        const result = await reqUpdateArticleById(articleInfo);

        if (result.status === 0) {
            return Promise.resolve("Update Article By State Successfully.")
        } else {
            return Promise.reject(new Error("Update Article By State Failure!"));
        }
    }
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    SETARTICLES(state, articleList) {
        state.articleList = articleList;
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