<template>
    <div class="register-container">
        <!-- 注册内容 -->
        <div class="register">
            <h3>注册新用户
                <span class="go">我有账号，去
                    <router-link to="/login">登陆</router-link>
                </span>
            </h3>
            <div class="content">
                <label>手机号:</label>
                <input
                    type="text"
                    placeholder="请输入你的手机号"
                    v-model.lazy="phone"
                    tabindex="1"
                    name="phone"
                    v-validate="{required: true, regex: /^1(3|4|5|8|7)[0-9]{9}$/}"
                    :class="{invalid: errors.has('phone')}"
                >
                <span class="error-msg">{{errors.first('phone')}}</span>
            </div>
            <div class="content">
                <label>验证码:</label>
                <input
                    type="text"
                    tabindex="2"
                    placeholder="请输入验证码"
                    v-model.lazy="code"
                    name="code"
                    v-validate="{required: true, regex: /^\d{6}/}"
                    :class="{invalid: errors.has('code')}"
                >
                <button
                    id="code-btn"
                    @click="getCode"
                >点击获取验证码</button>
                <span
                    class="error-msg"
                    v-show="errors.has('code')"
                >{{errors.first("code")}}</span>
            </div>
            <div class="content">
                <label>登录密码:</label>
                <input
                    type="password"
                    placeholder="请输入你的登录密码"
                    v-model.lazy="password1"
                    tabindex="3"
                    name="password1"
                    v-validate="{required: true, regex: /[0-9A-Za-z]{6,24}/ }"
                    :class="{invalid: errors.has('password1')}"
                >
                <span class="error-msg">{{errors.first("password1")}}</span>
            </div>
            <div class="content">
                <label>确认密码:</label>
                <input
                    type="password"
                    placeholder="请输入确认密码"
                    v-model.lazy="password2"
                    tabindex="4"
                    name="password2"
                    v-validate="{required: true, is: password1}"
                    :class="{invalid: errors.has('password2')}"
                >
                <span class="error-msg">{{errors.first("password2")}}</span>
            </div>
            <div class="controls">
                <input
                    type="checkbox"
                    v-model="isAgree"
                    name="aggree"
                    v-validate="{required: true}"
                    :class="{invalid: errors.has('aggree')}"
                >
                <span>同意协议并注册《尚品汇用户协议》</span>
                <span class="error-msg">{{errors.first("aggree")}}</span>
            </div>
            <div class="btn">
                <button
                    id="regsiter-btn"
                    @click="registerAccount"
                >完成注册</button>
            </div>
        </div>

        <!-- 底部 -->
        <div class="copyright">
            <ul>
                <li>关于我们</li>
                <li>联系我们</li>
                <li>联系客服</li>
                <li>商家入驻</li>
                <li>营销中心</li>
                <li>手机尚品汇</li>
                <li>销售联盟</li>
                <li>尚品汇社区</li>
            </ul>
            <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
            <div class="beian">京ICP备19006430号
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            // 手机号
            phone: "",
            // 验证码
            code: "",
            // 密码
            password1: "",
            // 确认密码
            password2: "",
            // 是否同意协议
            isAgree: true,
        };
    },
    methods: {
        // 获取验证码
        getCode() {
            try {
                this.$store.dispatch("userOption/getCodeByPhone", this.phone);
            } catch (err) {
                console.log(err.message);
            }
        },
        // 注册用户
        registerAccount() {
            this.$validator.validateAll().then((result) => {
                // 返回数据则表示表单验证通过
                if (result) {
                    try {
                        this.$store.dispatch("userOption/registerAccount", {
                            phone: this.phone,
                            password: this.password1,
                            code: this.code,
                        });

                        // 登录成功，跳转到登录页面
                        this.$router.push("/login");
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
    .register {
        width: 1200px;
        height: 445px;
        border: 1px solid #dfdfdf;
        margin: 0 auto;
    }
    .register h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;
    }
    .register h3 span {
        font-size: 14px;
        float: right;
    }
    .register h3 span a {
        color: #e1251b;
    }
    .register div:nth-of-type(1) {
        margin-top: 40px;
    }
    .register .content {
        position: relative;
        height: 38px;
        padding-left: 390px;
        margin-bottom: 18px;
    }
    .register .content label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
    }
    .register .content input {
        width: 270px;
        height: 38px;
        padding: 0 8px;
        margin: 0 10px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #999;
    }
    .register .content #code-btn {
        height: 100%;
        padding: 0 5px;
        cursor: pointer;
    }
    .register .content img {
        vertical-align: sub;
    }
    .register .content .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
    }
    .register .controls {
        text-align: center;
        position: relative;
    }
    .register .controls input {
        vertical-align: middle;
    }
    .register .controls .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
    }
    .register .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;
    }
    .register .btn #regsiter-btn {
        display: inline-block;
        outline: none;
        width: 270px;
        height: 36px;
        border: none;
        cursor: pointer;
        color: #fff !important;
        background-color: #e1251b;
        font-size: 16px;
    }
    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;
    }
    .copyright ul li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
    }
</style>