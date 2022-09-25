/* 
    通过该文件，统一暴露 product 文件下所有请求
*/

import * as trademark from '@/api/product/trademark'
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from "@/api/product/spu"

export default {
    trademark,
    attr,
    sku,
    spu,
}