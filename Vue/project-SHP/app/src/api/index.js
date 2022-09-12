/* 
    用于 API 统一管理
*/

import requests from "./request";
import mockRequests from "./ajaxMock";

// /api/product/getBaseCategoryList GET请求 无参数
export const reqCategoryList = () => {
    return requests({
        // 由于 request.js 中已经配置了基础路径，此处省略 /api
        url: "/product/getBaseCategoryList",
        method: "GET",
    })
}

// /mock/banners GET请求 无参 获取轮播图数据信息
export const reqGetBannerList = () => {
    return mockRequests.get("/banners");
}