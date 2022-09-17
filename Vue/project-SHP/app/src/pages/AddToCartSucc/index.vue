<template>
    <div class="cart-complete-wrap">
        <div class="cart-complete">
            <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
            <div class="goods">
                <div class="left-good">
                    <div class="left-pic">
                        <img :src="skuInfo.skuDefaultImg">
                    </div>
                    <div class="right-info">
                        <p class="title">{{skuInfo.skuName}}(4GB+64GB)</p>
                        <p class="attr">
                            <span
                                v-for="saleAttrValue in skuInfo.skuSaleAttrValueList"
                                :key="saleAttrValue.id"
                            >
                                {{saleAttrValue.saleAttrName}}：{{saleAttrValue.saleAttrValueName}}&nbsp;
                            </span>数量：{{skuNum}}
                        </p>
                    </div>
                </div>
                <div class="right-gocart">
                    <router-link
                        :to="`/detail/${skuInfo.id}`"
                        class="sui-btn btn-xlarge"
                    >查看商品详情</router-link>
                    <router-link to="/shopcart">去购物车结算 > </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddToCartSucc",
    computed: {
        // 商品详情
        skuInfo() {
            return JSON.parse(sessionStorage.getItem("SKUINFO"));
        },
        // 商品数量
        skuNum() {
            return this.$route.query.skuNum;
        },
    },
};
</script>

<style scoped>
.cart-complete-wrap {
    background-color: #f4f4f4;
}

.cart-complete-wrap .cart-complete {
    width: 1200px;
    margin: 0 auto;
}

.cart-complete-wrap .cart-complete h3 {
    padding-top: 15px;
    padding-bottom: 15px;
    margin: 0;
    font-weight: 400;
    font-size: 16px;
    color: #6aaf04;
}

.cart-complete-wrap .cart-complete h3 .icon-pc-right {
    padding: 3px;
    margin-right: 8px;
    border-radius: 15px;
    border: 2px solid #6aaf04;
    background-color: #fff;
}

.cart-complete-wrap .cart-complete .goods {
    padding: 10px 0;
    overflow: hidden;
}

.cart-complete-wrap .cart-complete .goods .left-good {
    float: left;
}

.cart-complete .goods .left-good .left-pic {
    float: left;
    width: 60px;
    border: 1px solid #dfdfdf;
}

.cart-complete .goods .left-good .left-pic img {
    width: 60px;
    height: 60px;
}

.cart-complete .goods .left-good .right-info {
    float: left;
    width: 750px;
    margin-left: 10px;
    color: #444;
}

.cart-complete .goods .left-good .right-info .title {
    width: 100%;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}

.cart-complete .goods .left-good .right-info .attr {
    color: #aaa;
}

.cart-complete .goods .right-gocart {
    float: right;
}

.cart-complete .goods .right-gocart a {
    float: left;
    padding: 7px 36px;
    line-height: 22px;
    border: 1px solid #e1e1e1;
    color: #333;
    background-color: #eee;
    font-size: 15px;
    text-decoration: none;
}

.cart-complete .goods .right-gocart a:hover {
    background-color: #f7f7f7;
    border: 1px solid #eaeaea;
}

.cart-complete .goods .right-gocart a:active {
    background-color: #e1e1e1;
    border: 1px solid #d5d5d5;
}

.cart-complete .goods .right-gocart .btn-danger {
    background-color: #e1251b;
    color: #fff;
}

.cart-complete .goods .right-gocart .btn-danger:hover {
    background-color: #e1251b;
}
</style>