import request from "@/utils/simplyRequest"

// 获取Spu信息列表
export function reqGetSpuList(page, limit, category3Id) {
    return request({
        method: 'GET',
        url: `/admin/product/${page}/${limit}`,
        params: {
            category3Id,
        }
    })
}

// 获取单个Spu信息
export function reqGetSpuById(spuId) {
    return request({
        method: 'GET',
        url: `/admin/product/getSpuById/${spuId}`
    })
}

// 根据spuId获取图片集
export function reqGetSpuImageList(spuId) {
    return request({
        method: 'GET',
        url: `/admin/product/spuImageList/${spuId}`
    })
}

// 根据spuId获取销售属性
export function reqGetBaseSaleAttrList(){
    return request({
        method: 'GET',
        url: '/admin/product/baseSaleAttrList'
    })
}