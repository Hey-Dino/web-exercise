/* 
    专门请求 mock 接口的axios封装
*/
import axios from "axios";

const requests = axios.create({
    // 基础路径
    baseURL: '/mock',
    // 请求超时时间
    timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    return Promise.reject(new Error('failed'))
});

// 暴露 requests
export default requests;