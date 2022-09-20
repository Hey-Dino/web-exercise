<template>
    <div class="paysuccess">
        <div class="success">
            <h3>
                <img
                    src="./images/right.png"
                    width="48"
                    height="48"
                >
                恭喜您，支付成功啦！
            </h3>
            <div class="paydetail">
                <p class="button">
                    <router-link
                        class="btn-look"
                        to="/center"
                    >查看订单</router-link>
                    <router-link
                        class="btn-goshop"
                        to="/home"
                    >继续购物</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaySuccess",
    // 组件内守卫，另外还有beforeRouteUpdate、beforeRouteLeave
    beforeRouteEnter(to, from, next) {
        if (from.path === "/pay"  || from.path === "/paySuccess") {
            // 若来自于支付页面，放行
            next();
        } else {
            next(false);
        }
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

    .paysuccess {
        margin: 20px auto;
        padding: 25px;
        border: 1px solid #d3d3d3;
        width: 1200px;
        width: 1148px;
    }

    .paysuccess .success {
        width: 500px;
        margin: 0 auto;
    }

    .paysuccess .success h3 {
        margin: 20px 0;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;
    }

    .paysuccess .success h3 img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        margin-right: 14px;
    }

    .paysuccess .success .paydetail {
        margin-left: 66px;
        font-size: 15px;
    }

    .paysuccess .success .paydetail .button {
        margin: 30px 0;
        line-height: 26px;
    }

    .paysuccess .success .paydetail .button a {
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 2px;
        user-select: none;
        font-size: 18px;
        padding: 4px 20px;
        line-height: 22px;
        text-decoration: none;
    }

    .paysuccess .success .paydetail .button a.btn-look {
        margin-right: 13px;
        color: #fff;
        background-color: #e1251b;
        border: 1px solid #e1251b;
    }

    .paysuccess .success .paydetail .button a.btn-goshop {
        color: #666;
        background-color: #eee;
        border: 1px solid #e1e1e1;
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