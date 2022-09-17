<template>
    <div class="details clearfix">
        <div class="sui-navbar">
            <div class="navbar-inner filter">
                <ul class="sui-nav">
                    <li
                        v-for="order in orderList"
                        :key="order.orderId"
                        :class="{ active: orderIndex == order.orderId }"
                    >
                        <a @click="changeOrder(order)">{{order.orderName}}
                            <!-- 支持[降序]与[升序]之间切换 -->
                            <template v-if="order.supportChange">
                                <span
                                    v-show="isDesc"
                                    class="iconfont icon-arrowdown1"
                                ></span>
                                <span
                                    v-show="!isDesc"
                                    class="iconfont icon-arrowup1"
                                ></span>
                            </template>
                            <!-- 不支持[降序]与[升序]之间切换 -->
                            <template v-if="!order.supportChange">
                                <span class="iconfont icon-arrowdown1"></span>
                            </template>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="goods-list">
            <ul class="yui3-g">
                <li
                    v-for="goods in goodsList"
                    :key="goods.id"
                    class="yui3-u-1-5"
                >
                    <div class="list-wrap">
                        <div class="p-img">
                            <router-link :to="`/detail/${goods.id}`"><img :src="goods.defaultImg" /></router-link>
                        </div>
                        <div class="price">
                            <strong>
                                <em>¥</em>
                                <i>{{goods.price}}</i>
                            </strong>
                        </div>
                        <div class="attr">
                            <a
                                target="_blank"
                                href="item.html"
                                title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                            >{{goods.title}}</a>
                        </div>
                        <div class="commit">
                            <i class="command">已有<span>2000</span>人评价</i>
                        </div>
                        <div class="operate">
                            <a
                                href="success-cart.html"
                                target="_blank"
                                class="sui-btn btn-bordered btn-danger"
                            >加入购物车</a>
                            <a
                                href="javascript:void(0);"
                                class="sui-btn btn-bordered"
                            >收藏</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Pagination></Pagination>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Details",
    data() {
        return {
            orderIndex: 1,
            isDesc: true,
            orderList: [
                {
                    // 排序Id
                    orderId: 1,
                    // 排序名称
                    orderName: "综合",
                    // 是否支持[降序]与[升序]之间切换
                    supportChange: false,
                },
                {
                    orderId: 2,
                    orderName: "价格",
                    supportChange: true,
                },
                /* {
                    orderId: 3,
                    orderName: "销量",
                    supportChange: false,
                },
                {
                    orderId: 4,
                    orderName: "新品",
                    supportChange: false,
                },
                {
                    orderId: 5,
                    orderName: "评论数",
                    supportChange: false,
                }, */
            ],
        };
    },
    computed: {
        // 获得商品信息
        ...mapGetters("searchOption", ["goodsList"]),
    },
    methods: {
        // 修改排序类型
        changeOrder(order) {
            // 判断点击的是否为同一个排序类型
            if (this.orderIndex === order.orderId) {
                // 若不支持[降序]与[升序]之间切换，则不做任何处理
                if (!order.supportChange) {
                    return;
                }

                // 若支持[降序]与[升序]切换
                this.isDesc = !this.isDesc;
            } else {
                // 避免上次排序类型为[销量升序]时，导致切换为其他排序类型时也为[升序]
                this.isDesc = true;
                this.orderIndex = order.orderId;
            }

            const orderStr =
                this.orderIndex + ":" + (this.isDesc ? "desc" : "asc");
            // 向父组件传值，通知父组件依据order重新排序
            this.$emit("changeOrder", orderStr);
        },
    },
};
</script>

<style scoped>
    .details {
        margin-bottom: 5px;
    }

    .details .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
    }

    .details .sui-navbar .filter {
        min-height: 40px;
        padding-right: 20px;
        background: #fbfbfb;
        border: 1px solid #e2e2e2;
        padding-left: 0;
        border-radius: 0;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
    }

    .details .sui-navbar .filter .sui-nav {
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
    }

    .details .sui-navbar .filter .sui-nav li {
        float: left;
        line-height: 18px;
        box-sizing: border-box;
    }

    .details .sui-navbar .filter .sui-nav li a {
        display: block;
        padding: 11px 15px;
        cursor: pointer;
        color: #777;
        text-decoration: none;
    }

    .details .sui-navbar .filter .sui-nav li.active a {
        background: #e1251b;
        color: #fff;
    }

    .sui-navbar .filter .sui-nav li span {
        font-size: 12px;
        margin-left: 5px;
    }

    .details .goods-list {
        margin: 20px 0;
    }

    .details .goods-list ul {
        display: flex;
        flex-wrap: wrap;
    }

    .details .goods-list ul li {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
    }

    .details .goods-list ul li .list-wrap .p-img {
        padding-left: 15px;
        width: 215px;
        height: 255px;
    }

    .details .goods-list ul li .list-wrap .p-img a {
        display: block;
        padding-bottom: 40px;
        color: #666;
    }

    .details .goods-list ul li .list-wrap .p-img a img {
        max-width: 100%;
        width: 100%;
        /* height: auto; */
        vertical-align: middle;
    }

    .details .goods-list ul li .list-wrap .price {
        padding-left: 15px;
        font-size: 18px;
        color: #c81623;
    }

    .details .goods-list ul li .list-wrap .price strong {
        font-weight: 700;
    }

    .details .goods-list ul li .list-wrap .attr {
        padding-left: 15px;
        width: 85%;
        overflow: hidden;
        margin-bottom: 8px;
        min-height: 38px;
        cursor: pointer;
        line-height: 1.8;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .details .goods-list ul li .list-wrap .attr a {
        color: #333;
        text-decoration: none;
    }

    .details .goods-list ul li .list-wrap .commit {
        padding-left: 15px;
        height: 22px;
        font-size: 13px;
        color: #a7a7a7;
    }

    .details .goods-list ul li .list-wrap .commit span {
        font-weight: 700;
        color: #646fb0;
    }

    .details .goods-list ul li .list-wrap .operate {
        padding: 12px 15px;
    }

    .details .goods-list ul li .list-wrap .operate .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 0;
        background-color: transparent;
        margin-right: 15px;
    }

    .details .goods-list ul li .list-wrap .operate .btn-bordered {
        min-width: 85px;
        background-color: transparent;
        border: 1px solid #8c8c8c;
        color: #8c8c8c;
    }

    .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
        border: 1px solid #666;
        color: #fff !important;
        background-color: #666;
        text-decoration: none;
    }

    .details .goods-list ul li .list-wrap .operate .btn-danger {
        border: 1px solid #e1251b;
        color: #e1251b;
    }

    .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
        border: 1px solid #e1251b;
        background-color: #e1251b;
        color: white !important;
        text-decoration: none;
    }

    .details .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
    }

    .details .page .sui-pagination {
        margin: 18px 0;
    }

    .details .page .sui-pagination ul {
        margin-left: 0;
        margin-bottom: 0;
        vertical-align: middle;
        width: 490px;
        float: left;
    }

    .details .page .sui-pagination ul li {
        line-height: 18px;
        display: inline-block;
    }

    .details .page .sui-pagination ul li a {
        position: relative;
        float: left;
        line-height: 18px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #e0e9ee;
        margin-left: -1px;
        font-size: 14px;
        padding: 9px 18px;
        color: #333;
    }

    .details .page .sui-pagination ul li.active a {
        background-color: #fff;
        color: #e1251b;
        border-color: #fff;
        cursor: default;
    }

    .details .page .sui-pagination ul li.prev a {
        background-color: #fafafa;
    }

    .details .page .sui-pagination ul li.disabled a {
        color: #999;
        cursor: default;
    }

    .details .page .sui-pagination ul li.dotted span {
        margin-left: -1px;
        position: relative;
        float: left;
        line-height: 18px;
        text-decoration: none;
        background-color: #fff;
        font-size: 14px;
        border: 0;
        padding: 9px 18px;
        color: #333;
    }

    .details .page .sui-pagination ul li.next a {
        background-color: #fafafa;
    }

    .details .page .sui-pagination div {
        float: right;
        width: 240px;
        margin: 8px 0;
        color: #333;
        font-size: 14px;
    }
</style>