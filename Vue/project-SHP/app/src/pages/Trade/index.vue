<template>
    <div class="trade-container">
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <h5 class="receive">收件人信息</h5>
            <div
                class="address clearFix"
                v-for="(addressInfo,index) in addressInfoList"
                :key="addressInfo.id"
            >
                <span
                    class="username"
                    :class="{selected: index == selectedAddressId}"
                >{{addressInfo.consignee}}</span>
                <p @click="changeAddressSelected(index)">
                    <span class="s1">{{addressInfo.fullAddress}}</span>
                    <span class="s2">{{addressInfo.phoneNum}}</span>
                    <span
                        class="s3"
                        v-show="addressInfo.isDefault == 1"
                    >默认地址</span>
                </p>
            </div>
            <div class="line"></div>
            <h5 class="pay">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
                <span
                    class="username"
                    style="margin-left:5px;"
                >货到付款</span>

            </div>
            <div class="line"></div>
            <h5 class="pay">送货清单</h5>
            <div class="way">
                <h5>配送方式</h5>
                <div class="info clearFix">
                    <span class="s1">天天快递</span>
                    <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
                </div>
            </div>
            <div class="detail">
                <h5>商品清单</h5>
                <ul
                    class="list clearFix"
                    v-for="orderDetail in orderDetailList"
                    :key="orderDetail.skuId"
                >
                    <li class="skuImg">
                        <img :src="orderDetail.imgUrl">
                    </li>
                    <li class="skuPre">
                        <p class="skuName">{{orderDetail.skuName}}</p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li class="skuPrice">
                        <h3>￥{{orderDetail.orderPrice}}</h3>
                    </li>
                    <li class="skuNum">X{{orderDetail.skuNum}}</li>
                    <li class="skuStatus">有货</li>
                </ul>
            </div>
            <div class="bbs">
                <h5>买家留言：</h5>
                <textarea
                    placeholder="建议留言前先与商家沟通确认"
                    class="remarks-cont"
                    v-model.lazy="msg"
                ></textarea>

            </div>
            <div class="line"></div>
            <div class="bill">
                <h5>发票信息：</h5>
                <div>普通发票（电子） 个人 明细</div>
                <h5>使用优惠/抵用</h5>
            </div>
        </div>
        <div class="money clearFix">
            <ul>
                <li>
                    <b><i>{{orderInfo.totalNum}}</i>件商品，总商品金额</b>
                    <span>¥{{orderInfo.totalAmount}}</span>
                </li>
                <li>
                    <b>返现：</b>
                    <span>0.00</span>
                </li>
                <li>
                    <b>运费：</b>
                    <span>0.00</span>
                </li>
            </ul>
        </div>
        <div class="trade">
            <div class="price">应付金额:　<span>¥{{orderInfo.totalAmount}}</span></div>
            <div class="receiveInfo">
                寄送至:
                <span>{{selectedAddress.fullAddress}}</span>&nbsp;&nbsp;&nbsp;
                收货人：<span>{{selectedAddress.consignee}}</span>&nbsp;&nbsp;
                <span>{{selectedAddress.phoneNum}}</span>
            </div>
        </div>
        <div class="sub clearFix">
            <a
                class="subBtn"
                @click="submitOrder"
            >提交订单</a>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    name: "Trade",
    data() {
        return {
            selectedAddressId: 0,
            // 卖家留言
            msg: "",
        };
    },
    computed: {
        // 获取trade仓库中的state
        ...mapState("tradeOption", ["addressInfoList", "orderInfo"]),
        ...mapGetters("tradeOption", ["orderDetailList"]),
        // 选择的地址信息
        selectedAddress() {
            return this.addressInfoList[this.selectedAddressId] || {};
        },
    },
    methods: {
        // 改变选择的地址
        changeAddressSelected(index) {
            this.selectedAddressId = index;
        },
        // 提交订单
        submitOrder() {
            const tradeNo = this.orderInfo.tradeNo;
            const data = {
                consignee: this.selectedAddress.consignee,
                consigneeTel: this.selectedAddress.phoneNum,
                deliveryAddress: this.selectedAddress.fullAddress,
                paymentWay: "ONLINE",
                orderComment: this.msg,
                orderDetailList: this.orderDetailList,
            };

            // 发送请求，获得[订单号]
            this.$API.reqSubmitOrder(tradeNo, data).then((result) => {
                if (result.code === 200) {
                    // 提取订单号
                    const orderId = result.data;
                    // 跳转pay页面
                    this.$router.push(`/pay?orderId=${orderId}`);
                } else {
                    console.log(result.msg);
                }
            });
        },
    },
    mounted() {
        // 派发，获取用户地址信息
        this.$store.dispatch("tradeOption/getUserAddress");
        // 获取交易信息
        this.$store.dispatch("tradeOption/getOrderInfo");
    },
};
</script>

<style scoped>
    .title {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 21px;
    }

    .content {
        width: 1200px;
        margin: 10px auto 0;
        border: 1px solid #dddddd;
        padding: 25px;
        box-sizing: border-box;
    }

    .content .receive,
    .content .pay {
        line-height: 36px;
        margin: 18px 0;
    }

    .content .address {
        padding-left: 20px;
        margin-bottom: 15px;
    }

    .content .address .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
    }

    .content .address .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
    }

    .content .address .username.selected {
        border-color: #e1251b;
    }

    .content .address .username.selected::after {
        display: block;
    }

    .content .address p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;
    }

    .content .address p .s1 {
        float: left;
    }

    .content .address p .s2 {
        float: left;
        margin: 0 5px;
    }

    .content .address p .s3 {
        float: left;
        width: 56px;
        height: 24px;
        line-height: 24px;
        margin-left: 10px;
        background-color: #878787;
        color: #fff;
        margin-top: 3px;
        text-align: center;
    }

    .content .address p:hover {
        background-color: #ddd;
    }

    .content .line {
        height: 1px;
        background-color: #ddd;
    }

    .content .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;
    }

    .content .way h5 {
        line-height: 50px;
    }

    .content .way .info {
        margin-top: 20px;
    }

    .content .way .info .s1 {
        float: left;
        border: 1px solid #ddd;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 10px;
    }

    .content .way .info p {
        line-height: 30px;
    }

    .content .detail {
        width: 1080px;
        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;
    }

    .content .detail h5 {
        line-height: 50px;
    }

    .content .detail .list li {
        float: left;
        line-height: 30px;
    }

    .content .detail .list .skuPre {
        float: left;
        width: 650px;
        margin-left: 30px;
    }

    .content .detail .list .skuPre .skuName {
        width: 100%;
        /* height: 52px; */
        line-height: 26px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .content .detail .list .skuPrice {
        width: 100px;
        margin-left: 20px;
        text-align: right;
    }

    .content .detail .list .skuNum {
        width: 70px;
        margin-left: 10px;
        text-align: right;
    }

    .content .detail .list .skuStatus{
        width: 60px;
        margin-left: 10px;
        text-align: right;
    }

    .content .detail .list li img {
        width: 82px;
        height: 82px;
    }

    .content .detail .list li p {
        /* margin-bottom: 20px; */
    }

    .content .detail .list li h4 {
        color: #c81623;
        font-weight: 400;
    }

    .content .detail .list li h3 {
        color: #e12228;
    }

    .content .bbs {
        margin-bottom: 15px;
    }

    .content .bbs h5 {
        line-height: 50px;
    }

    .content .bbs textarea {
        width: 100%;
        padding: 0 10px;
        line-height: 1.8;
        box-sizing: border-box;
        border-color: #e4e2e2;
        outline: none;
        resize: none;
    }

    .content .bill h5 {
        line-height: 50px;
    }

    .content .bill div {
        padding-left: 15px;
    }

    .money {
        width: 1200px;
        margin: 20px auto;
    }

    .money ul {
        width: 220px;
        float: right;
    }

    .money ul li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;
    }

    .money ul li i {
        color: red;
    }

    .trade {
        box-sizing: border-box;
        width: 1200px;
        padding: 10px;
        margin: 10px auto;
        text-align: right;
        background-color: #f4f4f4;
        border: 1px solid #ddd;
    }

    .trade div {
        line-height: 30px;
    }

    .trade .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
    }

    .trade .receiveInfo {
        color: #999;
    }

    .sub {
        width: 1200px;
        margin: 0 auto 10px;
    }

    .sub .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;
    }
</style>