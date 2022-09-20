// 对于 Axios 进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 获取 store 数据
import store from "@/store"
// 导入获取Token的方法
import { getToken } from "@/utils/token";

// 1.利用axios对象的方法，create一个实例
//   request 就是 需要配置的axios
const requests = axios.create({
    // 基础路径
    baseURL: "/api",
    // 请求超时的时间
    timeout: 5000,
});

// 2.设置请求拦截器
requests.interceptors.request.use((config) => {
    // 开启进度条
    nprogress.start();
    // 设置请求头，添加用户临时ID
    const userTempId = store.state.detailOption.userTempId;
    if (userTempId) {
        config.headers.userTempId = userTempId;
    }
    // 设置请求头，添加Token
    const token = getToken();
    if (token) {
        config.headers.token = token;
    }
    // config: 配置对象，其中属性header（请求头）十分重要
    return config;
});

// 3.设置响应拦截器
requests.interceptors.response.use((res) => {
    // 结束进度条
    nprogress.done();
    return res.data;
}, (err) => {
    return Promise.reject(new Error('failed'));
});

// 4.暴露 requests
export default requests;