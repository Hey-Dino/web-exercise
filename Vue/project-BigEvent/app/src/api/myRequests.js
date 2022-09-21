import axios from "axios";

import { getToken } from "@/utils/token";

// 创建requests实例
const myRequests = axios.create({
    baseURL: '/my',
    timeout: 5000,
});

// 请求拦截器
myRequests.interceptors.request.use((config) => {
    // 获取Token，并添加到请求头中
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});

// 响应拦截器
myRequests.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    return Promise.reject(new Error(err.message));
})

// 暴露
export default myRequests;