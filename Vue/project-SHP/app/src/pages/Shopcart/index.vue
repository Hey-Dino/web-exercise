<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="cart in cartInfoList"
                    :key="cart.id"
                >
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="cart.isChecked === 1"
                            @click="changeChecked(cart)"
                        >
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl">
                        <div class="item-msg">{{cart.skuName}}</div>
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-txt">语音升级款</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{cart.skuPrice}}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            class="mins"
                            @click="updateSkuNum(cart, 'minus', -1)"
                            :disabled="cart.skuNum <= 1"
                        >-</a>
                        <input
                            type="text"
                            class="itxt"
                            minnum="1"
                            autocomplete="off"
                            oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
                            :value="cart.skuNum"
                            @blur="updateSkuNum(cart, 'text', $event.target.value - cart.skuNum)"
                        >
                        <a
                            class="plus"
                            @click="updateSkuNum(cart, 'add', 1)"
                        >+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a
                            class="sindelete"
                            @click="deleteSku(cart.skuId)"
                        >删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input
                    class="chooseAll"
                    type="checkbox"
                    :checked="isAllChecked"
                    @click="checkOrUncheckAllSku"
                >
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllSkuChecked">删除选中的商品</a>
                <a>移到我的关注</a>
                <a>清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>0</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费）：</em>
                    <i class="summoney">{{totalPrice}}</i>
                </div>
                <div class="sumbtn">
                    <router-link
                        to="/trade"
                        class="sum-btn"
                    >结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// 引入lodash，用于节流
import { throttle } from "lodash";

export default {
    name: "ShopCart",
    computed: {
        // 获得购物车商品信息
        ...mapGetters("shopcartOption", ["cartInfoList"]),
        // 获取全部商品总价
        totalPrice() {
            let sum = 0;
            this.cartInfoList.forEach((cartInfo) => {
                // 判断商品是否选中
                if (cartInfo.isChecked === 1) {
                    sum += cartInfo.skuPrice * cartInfo.skuNum;
                }
            });

            return sum;
        },
        // 判断是否全选
        isAllChecked() {
            // 只有每个条件都为true时，every才返回true
            // every待遍历的数组长度为0，也返回true；这造成没有商品时，全选按钮仍处于选中状态；因而增加条件[this.cartInfoList.length > 0]去避免此情况
            return (
                this.cartInfoList.every(
                    (cartInfo) => cartInfo.isChecked === 1
                ) && this.cartInfoList.length > 0
            );
        },
    },
    methods: {
        // 获取购物车数据
        async getCartData() {
            try {
                await this.$store.dispatch("shopcartOption/getCartList");
            } catch (err) {
                console.log(err.message);
            }
        },
        // 更新商品数量
        updateSkuNum: throttle(async function (cart, type, diffNum) {
            // 当更新数据失败时，就会抛出错误
            try {
                // 判断是减少还是增加商品数量
                if (diffNum < 0) {
                    // 此处正数不包括0
                    const isPositive = diffNum + cart.skuNum > 0;
                    // 若减少后的数量不小于0，则更新商品数量
                    if (isPositive) {
                        await this.$store.dispatch(
                            "shopcartOption/updateToCart",
                            {
                                skuId: cart.skuId,
                                skuNum: diffNum,
                            }
                        );
                    }
                } else if (diffNum > 0) {
                    // 如果有库存上限，此处可加判断限制
                    await this.$store.dispatch("shopcartOption/updateToCart", {
                        skuId: cart.skuId,
                        skuNum: diffNum,
                    });
                }

                // 更新页面
                this.getCartData();
            } catch (err) {}
        }, 700),
        // 删除商品
        async deleteSku(skuId) {
            try {
                // 调用 deleteSku方法
                await this.$store.dispatch(
                    "shopcartOption/deleteSkuById",
                    skuId
                );
                // 更新页面
                this.getCartData();
            } catch (err) {
                alert(err.message);
            }
        },
        // 更改单个商品选中状态
        async changeChecked(cart) {
            try {
                await this.$store.dispatch("shopcartOption/updateCheckedById", {
                    skuId: cart.skuId,
                    isChecked: cart.isChecked === 1 ? 0 : 1,
                });

                // 更新页面
                this.getCartData();
            } catch (err) {
                console.log(err.message);
            }
        },
        // 删除所有选中的商品
        async deleteAllSkuChecked() {
            try {
                await this.$store.dispatch(
                    "shopcartOption/deleteAllSkuChecked"
                );

                // 更新页面
                this.getCartData();
            } catch (err) {
                console.log(err.message);
            }
        },
        // 更改所有商品的选中状态
        async checkOrUncheckAllSku($event) {
            try {
                // 获得全选按钮的checked值
                let isChecked = $event.target.checked;
                // 将全选按钮的checked的布尔值改为数字 —— 0 取消全选 1 全选
                isChecked = isChecked ? 1 : 0;

                await this.$store.dispatch(
                    "shopcartOption/checkOrUncheckAllSku",
                    isChecked
                );

                // 更新页面
                this.getCartData();
            } catch (err) {
                console.log(err.message);
            }
        },
    },
    mounted() {
        this.getCartData();
    },
};
</script>

<style scoped>
    .cart {
        width: 1200px;
        margin: 0 auto;
    }

    .cart h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart .cart-main .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;
    }

    .cart .cart-main .cart-th>div {
        float: left;
    }

    .cart .cart-main .cart-th .cart-th1 {
        width: 25%;
    }

    .cart .cart-main .cart-th .cart-th1 input {
        vertical-align: middle;
    }

    .cart .cart-main .cart-th .cart-th1 span {
        vertical-align: middle;
    }

    .cart .cart-main .cart-th .cart-th2 {
        width: 25%;
    }

    .cart .cart-main .cart-th .cart-th3,
    .cart .cart-main .cart-th .cart-th4,
    .cart .cart-main .cart-th .cart-th5,
    .cart .cart-main .cart-th .cart-th6 {
        width: 12.5%;
    }

    .cart .cart-main .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;
    }

    .cart .cart-main .cart-body .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }

    .cart .cart-main .cart-body .cart-list>li {
        float: left;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con1 {
        width: 4.1667%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con2 {
        width: 25%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con2 img {
        width: 82px;
        height: 82px;
        float: left;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con2 .item-msg {
        float: left;
        width: 150px;
        margin: 0 10px;
        line-height: 18px;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con3 {
        width: 20.8333%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con3 .item-txt {
        text-align: center;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con4 {
        width: 12.5%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con5 {
        width: 12.5%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con5 .mins {
        float: left;
        width: 6px;
        padding: 8px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
        border-right: 0;
        color: #666;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con5 input {
        border: 1px solid #ddd;
        width: 40px;
        height: 32px;
        float: left;
        text-align: center;
        font-size: 14px;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con5 .plus {
        float: left;
        width: 6px;
        padding: 8px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
        border-left: 0;
        color: #666;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con5 .mins[disabled] {
        /* 使元素不对鼠标事件做出反应 */
        pointer-events: none; 
        color: #ccc;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con6 {
        width: 12.5%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con6 .sum {
        font-size: 16px;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con7 {
        width: 12.5%;
    }

    .cart .cart-main .cart-body .cart-list .cart-list-con7 a {
        color: #666;
        cursor: pointer;
    }

    .cart .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;
    }

    .cart .cart-tool .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;
    }

    .cart .cart-tool .select-all span {
        vertical-align: middle;
    }

    .cart .cart-tool .select-all input {
        vertical-align: middle;
    }

    .cart .cart-tool .option {
        padding: 10px;
        overflow: hidden;
        float: left;
    }

    .cart .cart-tool .option a {
        float: left;
        padding: 0 10px;
        cursor: pointer;
        color: #666;
    }

    .cart .cart-tool .money-box {
        float: right;
    }

    .cart .cart-tool .money-box .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
    }

    .cart .cart-tool .money-box .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
    }

    .cart .cart-tool .money-box .sumprice .summoney {
        color: #c81623;
        font-size: 16px;
    }

    .cart .cart-tool .money-box .sumbtn {
        float: right;
    }

    .cart .cart-tool .money-box .sumbtn a {
        display: block;
        position: relative;
        width: 96px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        background: #e1251b;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        overflow: hidden;
    } 
</style>