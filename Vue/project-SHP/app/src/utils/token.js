/* 
    管理Token的工具类
*/

// 设置Token
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}

// 获取Token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}

// 移除Token
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}