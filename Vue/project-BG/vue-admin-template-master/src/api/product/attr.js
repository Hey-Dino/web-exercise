/* 管理三级分类的请求 */
import request from "@/utils/simplyRequest"

// 获取一级分类信息
export function reqGetCategory1List() {
    return request({
        method: 'GET',
        url: '/admin/product/getCategory1'
    })
}

// 获取二级分类信息
export function reqGetCategory2List(category1Id) {
    return request({
        method: 'GET',
        url: `/admin/product/getCategory2/${category1Id}`
    })
}

// 获取三级分类信息
export function reqGetCategory3List(category2Id) {
    return request({
        method: 'GET',
        url: `/admin/product/getCategory3/${category2Id}`
    })
}

// 获取属性信息
export function reqGetAttrInfoList({ category1Id, category2Id, category3Id }) {
    return request({
        method: 'GET',
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    })
}

// 保存属性信息
export function reqSaveAttrInfo(data) {
    return request({
        method: 'POST',
        url: '/admin/product/saveAttrInfo',
        data,
    })
}