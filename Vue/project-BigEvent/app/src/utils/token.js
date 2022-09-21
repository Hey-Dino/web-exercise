/* 
    用于管理 token 的工具类
*/
// 设置 Toknen
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}

// 获取 Token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}

// 移除 Token
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}