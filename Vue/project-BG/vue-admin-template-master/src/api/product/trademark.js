import request from "@/utils/simplyRequest"

// page 代表页面，limit 代表每页记录数
export function reqGetTrademarkList(page, limit) {
    return request({
        method: 'GET',
        url: `/admin/product/baseTrademark/${page}/${limit}`
    })
}

// 更新品牌信息，参数包括id、tmName、logoUrl
export function reqUpdateTrademark(data) {
    return request({
        method: 'PUT',
        url: '/admin/product/baseTrademark/update',
        data,
    })
}

// 添加品牌信息，参数包括tmName、logoUrl
export function reqAddTrademark(data) {
    return request({
        method: 'POST',
        url: '/admin/product/baseTrademark/save',
        data,
    })
}

// 删除品牌信息，参数id
export function reqDeleteTrademark(id) {
    return request({
        method: 'DELETE',
        url: `/admin/product/baseTrademark/remove/${id}`
    })
}

// 获取所有品牌信息（不带页号、每页记录数）
export function reqGetTrademarkAll(){
    return request({
        method: 'GET',
        url: '/admin/product/baseTrademark/getTrademarkList'
    })
}