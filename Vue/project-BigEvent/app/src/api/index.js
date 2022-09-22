/* 
    API 统一管理
*/
import apiRequests from "./apiRequests"
import myRequests from "./myRequests"

// 注册账户
export const reqRegisterAccount = (username, password) => {
    return apiRequests({
        method: "POST",
        url: '/reguser',
        data: {
            username,
            password
        }
    })
}

// 登录账户
export const reqLoginAccount = (username, password) => {
    return apiRequests({
        method: "POST",
        url: '/login',
        data: {
            username,
            password,
        }
    })
};

// 获取文章类别信息
export const reqGetCategoryList = () => {
    return myRequests({
        method: 'GET',
        url: '/article/cates',
    })
};

// 删除文章类别信息
export const reqDeleteCategory = (id) => {
    return myRequests({
        method: 'GET',
        url: `/article/deletecate/${id}`,
    })
};

// 编辑文字类别信息
export const reqEditCategory = (id, name, alias) => {
    return myRequests({
        method: 'POST',
        url: '/article/updatecate',
        data: {
            id,
            name,
            alias
        }
    })
}

// 增加文章类别信息
export const reqAddCategory = (name, alias) => {
    return myRequests({
        method: 'POST',
        url: '/article/addcates',
        data: {
            name,
            alias
        }
    })
}

// 获取用户信息
export const reqGetUserInfoById = () => {
    return myRequests({
        method: 'GET',
        url: '/userinfo',
    })
}

// 更新用户信息
export const reqUpdateUserInfoById = (username, nickname, email) => {
    return myRequests({
        method: 'POST',
        url: '/userinfo',
        data: {
            username,
            nickname,
            email,
        }
    })
}

// 修改用户密码
export const reqUpdateUserPasswordById = (oldPwd, newPwd) => {
    return myRequests({
        method: 'POST',
        url: '/updatepwd',
        data: {
            oldPwd,
            newPwd
        }
    })
}

// 发布文章
export const reqPublishArticle = ({ title, cateId, state, content }) => {
    return myRequests({
        method: 'POST',
        url: '/article/add',
        data: {
            title: title,
            cate_id: cateId,
            state: state,
            content: content,
        }
    })
}

// 获取文章列表
export const reqGetArticles = (state) => {
    return myRequests({
        method: 'GET',
        url: `/article/get`,
    })
}

// 获取某种状态的文章列表
export const reqGetArticlesByState = (state) => {
    return myRequests({
        method: 'GET',
        url: `/article/get/${state}`,
    })
}

// 删除文章
export const reqDeleteArticleById = (id) => {
    return myRequests({
        method: 'GET',
        url: `/article/delete/${id}`,
    });
}

// 更新文章
export const reqUpdateArticleById = ({ id, title, cate_id, pub_date, state }) => {
    return myRequests({
        method: 'POST',
        url: '/article/update',
        data: {
            id,
            title,
            cate_id,
            state,
        }
    })
}