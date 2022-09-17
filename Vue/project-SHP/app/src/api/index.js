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
export const reqGetFloorList = () => {
    return mockRequests.get("/floors");
}

// 获取搜索信息
export const reqGetSearchInfo = (params) => {
    return requests({
        method: "POST",
        url: "/list",
        data: params
    })
};

// 获取商品详情
export const reqGetGoodsDetail = (params) => {
    return requests({
        method: "GET",
        url: `/item/${params}`,
    })
}

// 添加或更新购物车商品信息
export const reqAddOrUpdateToCart = (skuId, skuName) => {
    return requests({
        method: "POST",
        url: `/cart/addToCart/${skuId}/${skuName}`,
    })
}

// 获取购物车信息
export const reqGetCartList = () => {
    return requests({
        method: 'GET',
        url: '/cart/cartList',
    })
}