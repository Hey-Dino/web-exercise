import request from "@/utils/simplyRequest"

// page 代表页面，limit 代表每页记录数
export function reqGetTrademarkList(page, limit) {
    return request({
        method: 'GET',
        url: `/admin/product/baseTrademark/${page}/${limit}`
    })
}

// 
export function req(){}