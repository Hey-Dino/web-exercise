<template>
    <div class="pay-main">
        <div class="pay-container">
            <div class="checkout-tit">
                <h4 class="tit-txt">
                    <span class="success-icon"></span>
                    <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
                </h4>
                <div class="paymark">
                    <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{payInfo.orderId}}</em></span>
                    <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{payInfo.totalFee}}</em></span>
                </div>
            </div>
            <div class="checkout-info">
                <h4>重要说明：</h4>
                <ol>
                    <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
                    <li>其它支付渠道正在调试中，敬请期待。</li>
                    <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
                </ol>
                <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
                <ul>
                    <li>支付帐号：11111111</li>
                    <li>密码：111111</li>
                    <li>支付密码：111111</li>
                </ul>
            </div>
            <div class="checkout-steps">
                <div class="step-tit">
                    <h5>支付平台</h5>
                </div>
                <div class="step-cont">
                    <ul class="payType">
                        <li><img src="./images/pay2.jpg"></li>
                        <li><img src="./images/pay3.jpg"></li>
                    </ul>
                </div>
                <div class="hr"></div>

                <div class="payshipInfo">
                    <div class="step-tit">
                        <h5>支付网银</h5>
                    </div>
                    <div class="step-cont">
                        <ul class="payType">
                            <li><img src="./images/pay10.jpg"></li>
                            <li><img src="./images/pay11.jpg"></li>
                            <li><img src="./images/pay12.jpg"></li>
                            <li><img src="./images/pay13.jpg"></li>
                            <li><img src="./images/pay14.jpg"></li>
                            <li><img src="./images/pay15.jpg"></li>
                            <li><img src="./images/pay16.jpg"></li>
                            <li><img src="./images/pay17.jpg"></li>
                            <li><img src="./images/pay18.jpg"></li>
                            <li><img src="./images/pay19.jpg"></li>
                            <li><img src="./images/pay20.jpg"></li>
                            <li><img src="./images/pay21.jpg"></li>
                            <li><img src="./images/pay22.jpg"></li>
                        </ul>
                    </div>
                </div>
                <div class="hr"></div>

                <div class="submit">
                    <a
                        class="btn"
                        @click="open"
                    >立即支付</a>
                </div>
                <div class="otherpay">
                    <div class="step-tit">
                        <h5>其他支付方式</h5>
                    </div>
                    <div class="step-cont">
                        <span><a
                                href="weixinpay.html"
                                target="_blank"
                            >微信支付</a></span>
                        <span>中国银联</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";

export default {
    name: "Pay",
    data() {
        return {
            payInfo: {},
            // 轮询定时器
            timer: null,
            // 用户支付状态
            code: 0,
        };
    },
    computed: {
        // 支付信息ID
        orderId() {
            return this.$route.query.orderId;
        },
    },
    methods: {
        open() {
            // 通过 QRCode 将字符串 codeUrl 转化为 图片的URL
            QRCode.toDataURL(this.payInfo.codeUrl).then((imgUrl) => {
                // 控制支付框的弹出
                this.$alert(`<img src="${imgUrl}"/>`, "请你微信扫码支付", {
                    // 将 message 属性作为 HTML 片段处理
                    dangerouslyUseHTMLString: true,
                    // 隐藏右上角关闭按钮
                    showClose: false,
                    // 显示取消按钮并修改文本
                    showCancelButton: true,
                    cancelButtonText: "支付遇到问题",
                    // 修改确定按钮文本
                    confirmButtonText: "支付成功",
                    // 居中显示
                    center: true,
                })
                    .then(() => {
                        /* 点击确认按钮的回调 */
                        if (this.code === 200) {
                            // 跳转支付成功页面 PaySuccess
                            this.$router.push("/paySuccess");
                        } else {
                            // 取消计时器
                            clearInterval(this.timer);
                            this.timer = null;
                            // 弹框提示
                            this.$message({ message: "未支付成功" });
                        }
                    })
                    .catch(() => {
                        /* 点击取消按钮的回调 */
                        // 取消计时器
                        clearInterval(this.timer);
                        this.timer = null;
                        // 弹框提示
                        this.$message({ message: "请联系客服" });
                    });

                // 长轮询，查看支付状态
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        // 发送请求，查询支付状态
                        this.$API
                            .reqQueryPayStatus(this.orderId)
                            .then((result) => {
                                // 判断是否支付成功
                                if (result.code === 200) {
                                    // 取消定时器
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    // 保存支付成功返回的code
                                    this.code = result.code;
                                    // 清除弹框
                                    this.$msgbox.close();
                                    // 跳转支付成功页面 PaySuccess
                                    this.$router.push("/paySuccess");
                                }
                            });
                    }, 1000);
                }
            });
        },
    },
    mounted() {
        // 获取支付信息
        this.$API.reqCreateNative(this.orderId).then((result) => {
            if (result.code === 200) {
                this.payInfo = result.data;
            } else {
                console.log(result.msg);
            }
        });
    },
};
</script>

<style scoped>
    .header>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;
    }

    .header>.top .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }

    .header>.top .container .loginList {
        float: left;
    }

    .header>.top .container .loginList p {
        float: left;
        margin-right: 10px;
    }

    .header>.top .container .loginList p .register {
        border-left: 1px solid #b3aeae;
        padding: 0 5px;
        margin-left: 5px;
    }

    .header>.top .container .typeList {
        float: right;
    }

    .header>.top .container .typeList a {
        padding: 0 10px;
    }

    .header>.top .container .typeList a+a {
        border-left: 1px solid #b3aeae;
    }

    .header>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }

    .header>.bottom .logoArea {
        float: left;
    }

    .header>.bottom .logoArea .logo img {
        width: 175px;
        margin: 25px 45px;
    }

    .header>.bottom .searchArea {
        float: right;
        margin-top: 35px;
    }

    .header>.bottom .searchArea .searchForm {
        overflow: hidden;
    }

    .header>.bottom .searchArea .searchForm input {
        box-sizing: border-box;
        width: 490px;
        height: 32px;
        padding: 0px 4px;
        border: 2px solid #ea4a36;
        float: left;
    }

    .header>.bottom .searchArea .searchForm input:focus {
        outline: none;
    }

    .header>.bottom .searchArea .searchForm button {
        height: 32px;
        width: 68px;
        background-color: #ea4a36;
        border: none;
        color: #fff;
        float: left;
        cursor: pointer;
    }

    .header>.bottom .searchArea .searchForm button:focus {
        outline: none;
    }

    .pay-main {
        margin-bottom: 20px;
    }

    .pay-main .pay-container {
        margin: 0 auto;
        width: 1200px;
    }

    .pay-main .pay-container a:hover {
        color: #4cb9fc;
    }

    .pay-main .pay-container .orange {
        color: #e1251b;
    }

    .pay-main .pay-container .money {
        font-size: 18px;
    }

    .pay-main .pay-container .zfb {
        color: #e1251b;
        font-weight: 700;
    }

    .pay-main .pay-container .checkout-tit {
        padding: 10px;
    }

    .pay-main .pay-container .checkout-tit .tit-txt {
        font-size: 14px;
        line-height: 21px;
    }

    .pay-main .pay-container .checkout-tit .tit-txt .success-icon {
        width: 30px;
        height: 30px;
        display: inline-block;
        background: url(./images/icon.png) no-repeat 0 0;
    }

    .pay-main .pay-container .checkout-tit .tit-txt .success-info {
        padding: 0 8px;
        line-height: 30px;
        vertical-align: top;
    }

    .pay-main .pay-container .checkout-tit .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;
    }

    .pay-main .pay-container .checkout-tit .paymark .fl {
        float: left;
    }

    .pay-main .pay-container .checkout-tit .paymark .fr {
        float: right;
    }

    .pay-main .pay-container .checkout-tit .paymark .fr .lead {
        margin-bottom: 18px;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
    }

    .pay-main .pay-container .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;
    }

    .pay-main .pay-container .checkout-info h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
    }

    .pay-main .pay-container .checkout-info ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
    }

    .pay-main .pay-container .checkout-info ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
    }

    .pay-main .pay-container .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;
    }

    .pay-main .pay-container .checkout-steps .hr {
        height: 1px;
        background-color: #ddd;
    }

    .pay-main .pay-container .checkout-steps .step-tit {
        line-height: 36px;
        margin: 15px 0;
    }

    .pay-main .pay-container .checkout-steps .step-cont {
        margin: 0 10px 12px 20px;
    }

    .pay-main .pay-container .checkout-steps .step-cont ul {
        font-size: 0;
    }

    .pay-main .pay-container .checkout-steps .step-cont ul li {
        display: inline-block;
        padding: 5px 20px;
        margin: 2px;
        border: 1px solid #ddd;
        cursor: pointer;
        line-height: 18px;
    }

    .pay-main .pay-container .submit {
        text-align: center;
    }

    .pay-main .pay-container .submit .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
    }

    .footer {
        background-color: #eaeaea;
    }

    .footer .footer-container {
        width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
    }

    .footer .footer-container .footerList {
        padding: 20px;
        border-bottom: 1px solid #e4e1e1;
        border-top: 1px solid #e4e1e1;
        overflow: hidden;
        padding-left: 40px;
    }

    .footer .footer-container .footerList .footerItem {
        width: 16.6666667%;
        float: left;
    }

    .footer .footer-container .footerList .footerItem h4 {
        font-size: 14px;
    }

    .footer .footer-container .footerList .footerItem .footerItemCon li {
        line-height: 18px;
    }

    .footer .footer-container .footerList .footerItem:last-child img {
        width: 121px;
    }

    .footer .footer-container .copyright {
        padding: 20px;
    }

    .footer .footer-container .copyright .helpLink {
        text-align: center;
    }

    .footer .footer-container .copyright .helpLink li {
        display: inline;
    }

    .footer .footer-container .copyright .helpLink li .space {
        border-left: 1px solid #666;
        width: 1px;
        height: 13px;
        background: #666;
        margin: 8px 10px;
    }

    .footer .footer-container .copyright p {
        margin: 10px 0;
        text-align: center;
    }
</style>