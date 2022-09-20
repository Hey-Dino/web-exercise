/* 
    个人中心Center的二级路由：MyOrder
 */
<template>
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chosetype">
                <table>
                    <thead>
                        <tr>
                            <th width="29%">商品</th>
                            <th width="31%">订单详情</th>
                            <th width="13%">收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="orders">
                <table
                    class="order-item"
                    v-for="(record,index) in records"
                    :key="record.id"
                >
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="ordertitle">{{record.createTime}}　订单编号：{{record.outTradeNo}}
                                    <span class="pull-right delete"><img src="./images/delete.png"></span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(orderDetail, index2) in record.orderDetailList"
                            :key="orderDetail.id"
                        >
                            <td width="60%">
                                <div class="typographic">
                                    <img :src="orderDetail.imgUrl">
                                    <a class="block-text">{{orderDetail.skuName}}</a>
                                    <span>x{{orderDetail.skuNum}}</span>
                                    <a class="service">售后申请</a>
                                </div>
                            </td>
                            <td
                                width="8%"
                                class="center"
                                :rowspan="getOrderDetailNum(index)"
                                v-if="index2 === 0"
                            >{{record.consignee}}</td>
                            <td
                                width="13%"
                                class="center"
                                :rowspan="getOrderDetailNum(index)"
                                v-if="index2 === 0"
                            >
                                <ul class="unstyled">
                                    <li>总金额¥{{record.totalAmount}}</li>
                                    <li v-if="record.paymentWay === 'ONLINE'">在线支付</li>
                                </ul>
                            </td>
                            <td
                                width="8%"
                                class="center"
                                :rowspan="getOrderDetailNum(index)"
                                v-if="index2 === 0"
                            >
                                <a
                                    class="btn"
                                    v-if="record.orderStatus === 'UNPAID'"
                                >待支付</a>
                                <a
                                    class="btn"
                                    v-if="record.orderStatus === 'PAID'"
                                >已完成</a>

                            </td>
                            <td
                                width="13%"
                                class="center"
                                :rowspan="getOrderDetailNum(index)"
                                v-if="index2 === 0"
                            >
                                <ul class="unstyled">
                                    <li>
                                        <a href="mycomment.html">评价|晒单</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="choose-order">
                <Pagination
                    :pageNo="page"
                    :total="orderInfo.total"
                    :totalPages="orderInfo.pages"
                ></Pagination>
            </div>
        </div>

        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike03.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike04.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyOrder",
    data() {
        return {
            // 页码
            page: 1,
            // 每页订单数量
            limit: 10,
            // 订单信息
            orderInfo: {},
        };
    },
    computed: {
        // 订单商品信息
        records() {
            return this.orderInfo.records || [];
        },
    },
    methods: {
        // 发送请求，获取订单信息
        getData() {
            const { page, limit } = this;
            this.$API.reqGetOrderInfo(page, limit).then((result) => {
                if (result.code === 200) {
                    this.orderInfo = result.data;
                } else {
                    console.log(result.msg);
                }
            });
        },
        // 获取单个订单的商品数量
        getOrderDetailNum(index) {
            // 处理数据，避免undefined的出现导致错误
            const record = this.records[index] || {};
            const orderDetailList = record.orderDetailList || [];

            // 返回该订单的商品种类数
            return orderDetailList.length;
        },
        // 响应分页器行为，更新数据
        changePage(page) {
            // 更新页面，更新数据
            this.page = page;
            this.getData();
        },
    },
    mounted() {
        // 获取订单信息
        this.getData();
        // 注册事件，根据分页器Pagination的返回页码更新数据
        this.$bus.$on("changePage", this.changePage);
    },
};
</script>

<style scoped>
    .order-right {
        float: right;
        width: 83.33%;
    }

    .order-right .order-content {
        margin: 0 20px;
        color: #666;
    }

    .order-right .order-content .title {
        margin-bottom: 22px;
        border: 1px solid #ddd;
    }

    .order-right .order-content .title h3 {
        padding: 12px 10px;
        font-size: 15px;
        background-color: #f1f1f1;
    }

    .order-right .order-content .chosetype {
        margin-bottom: 15px;
        color: #666;
    }

    .order-right .order-content .chosetype table {
        border: 1px solid #e6e6e6;
        border-collapse: separate;
        border-radius: 2px;
        width: 100%;
        max-width: 100%;
        border-spacing: 0;
    }

    .order-right .order-content .chosetype table th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
    }

    .order-right .order-content .orders {
        font-size: 12px;
    }

    .order-right .order-content .orders a:hover {
        color: #4cb9fc;
    }

    .order-right .order-content .orders table {
        border: 1px solid #e6e6e6;
        border-collapse: collapse;
        border-radius: 2px;
        width: 100%;
        margin-bottom: 18px;
        max-width: 100%;
    }

    .order-right .order-content .orders table th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;
    }

    .order-right .order-content .orders table th .pull-right {
        float: right;
        cursor: pointer;
    }

    .order-right .order-content .orders table th .pull-right img {
        margin-right: 10px;
        vertical-align: middle;
    }

    .order-right .order-content .orders table td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;
    }

    .order-right .order-content .orders table td.center {
        text-align: center;
    }

    .order-right .order-content .orders table td .typographic img {
        float: left;
        width: 82px;
        height: 82px;
        margin-right: 10px;
    }

    .order-right .order-content .orders table td .typographic a {
        float: left;
        min-width: 80px;
        max-width: 250px;
        color: #e1251b;
    }

    .order-right .order-content .orders table td .typographic a.service {
        color: #666;
    }

    .order-right .order-content .orders table td .typographic span {
        float: left;
        min-width: 80px;
        max-width: 250px;
        text-align: center;
    }

    .order-right .order-content .choose-order .pagination {
        margin: 38px 0;
    }

    .order-right .order-content .choose-order .pagination ul {
        font-size: 0;
        display: inline-block;
    }

    .order-right .order-content .choose-order .pagination ul li {
        display: inline-block;
        padding: 4px 9px;
        font-size: 14px;
        border: 1px solid #e0e9ee;
    }

    .order-right .order-content .choose-order .pagination ul li.prev,
    .order-right .order-content .choose-order .pagination ul li.next {
        background-color: #fafafa;
    }

    .order-right .order-content .choose-order .pagination ul li.prev {
        border-right-color: #28a3ef;
    }

    .order-right .order-content .choose-order .pagination ul li.page {
        border-color: #28a3ef;
        border-left: 0;
    }

    .order-right .order-content .choose-order .pagination ul li.page.actived {
        background-color: #28a3ef;
    }

    .order-right .order-content .choose-order .pagination ul li.page.actived a {
        color: #fff;
    }

    .order-right .order-content .choose-order .pagination div {
        display: inline-block;
        font-size: 14px;
        color: #333;
    }

    .order-right .like {
        border: 1px solid #ddd;
        margin: 15px 20px;
    }

    .order-right .like .kt {
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #666;
        margin: 0;
        padding: 12px;
        font-size: 15px;
    }

    .order-right .like .like-list {
        padding: 15px 11px;
        overflow: hidden;
    }

    .order-right .like .like-list .likeItem {
        width: 25%;
        float: left;
    }

    .order-right .like .like-list .likeItem .p-img {
        text-align: left;
    }

    .order-right .like .like-list .likeItem .p-img img {
        width: 167px;
        height: 123px;
    }

    .order-right .like .like-list .likeItem .attr {
        padding: 0 15px;
    }

    .order-right .like .like-list .likeItem .price {
        padding: 0 15px;
        font-size: 16px;
        color: #c81623;
        margin-bottom: 20px;
    }

    .order-right .like .like-list .likeItem .commit {
        padding: 0 15px;
    }
</style>