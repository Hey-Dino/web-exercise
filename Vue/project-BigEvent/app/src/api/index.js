/* 
    API 统一管理
*/
import apiRequests from "./apiRequests"
import myRequests from "./myRequests"

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