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

// 删除商品信息
export const reqDeleteSkuById = (skuId) => {
    return requests({
        method: 'DELETE',
        url: `/cart/deleteCart/${skuId}`
    })
}

// 修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        method: 'GET',
        url: `/cart/checkCart/${skuId}/${isChecked}`
    })
}

// 获取验证码
export const reqGetCodeByPhone = (phone) => {
    return requests({
        method: 'GET',
        url: `/user/passport/sendCode/${phone}`
    })
}

// 注册账户
export const reqRegisterAccount = (phone, password, code) => {
    return requests({
        method: 'POST',
        url: '/user/passport/register',
        data: {
            phone,
            password,
            code
        }
    })
}

// 登录账户
export const reqLoginAccount = (phone, password) => {
    return requests({
        method: 'POST',
        url: '/user/passport/login',
        data: {
            phone,
            password
        }
    })
}

// 获取用户信息【通过Token】
export const reqGetUserInfoByToken = (token) => {
    return requests({
        method: 'GET',
        url: '/user/passport/auth/getUserInfo'
    });
}

// 退出登录（注销）
export const reqLogoutAccount = () => {
    return requests({
        method: 'GET',
        url: '/user/passport/logout',
    })
}

// 获取用户地址信息
export const reqGetUserAddress = () => {
    return requests({
        method: 'GET',
        url: '/user/userAddress/auth/findUserAddressList',
    })
}

// 获取交易信息
export const reqGetOrderInfo = () => {
    return requests({
        method: 'GET',
        url: '/order/auth/trade',
    })
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        method: 'POST',
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
    })
}

// 获取订单支付信息
export const reqCreateNative = (orderId) => {
    return requests({
        method: 'GET',
        url: `/payment/weixin/createNative/${orderId}`
    })
}

// 获取订单支付状态（待支付、已支付）
export const reqQueryPayStatus = (orderId) => {
    return requests({
        method: 'GET',
        url: `/payment/weixin/queryPayStatus/${orderId}`,
    })
}