import axios from "axios";

// 引入获取 token 的方法
import { getToken } from "@/utils/token";

// 创建requests实例
const apiRequests = axios.create({
    // 基础路径
    baseURL: '/api',
    // 请求超时的事件
    timeout: 5000,
});

// 请求拦截器
apiRequests.interceptors.request.use((config) => {
    // 获取Token，并添加到请求头中
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});

// 响应拦截器
apiRequests.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    return Promise.reject(new Error(err.message));
})

// 暴露
export default apiRequests;