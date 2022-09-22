<template>
    <div class="box">
        <!-- 头部的 Logo 区域 -->
        <div class="layui-main">
            <img src="@/assets/logo.png" />
        </div>

        <div class="loginAndRegBox">
            <div class="title-box"></div>
            <!-- 注册的div -->
            <div class="reg-box">
                <!-- 注册的表单 -->
                <form
                    class="layui-form"
                    id="form_reg"
                >
                    <!-- 用户名 -->
                    <div class="layui-form-item">
                        <i class="layui-icon layui-icon-username"></i>
                        <input
                            type="text"
                            v-model.lazy="username"
                            required
                            lay-verify="required"
                            placeholder="请输入用户名"
                            autocomplete="off"
                            class="layui-input"
                        />
                    </div>
                    <!-- 密码 -->
                    <div class="layui-form-item">
                        <i class="layui-icon layui-icon-password"></i>
                        <input
                            type="password"
                            v-model.lazy="password"
                            required
                            lay-verify="required|pwd"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                        />
                    </div>
                    <!-- 密码确认框 -->
                    <div class="layui-form-item">
                        <i class="layui-icon layui-icon-password"></i>
                        <input
                            type="password"
                            name="repassword"
                            required
                            lay-verify="required|pwd|repwd"
                            placeholder="再次确认密码"
                            autocomplete="off"
                            class="layui-input"
                        />
                    </div>
                    <!-- 注册按钮 -->
                    <div class="layui-form-item">
                        <!-- 注意：表单提交按钮和普通按钮的区别，就是 lay-submit 属性 -->
                        <button
                            class="layui-btn layui-btn-fluid layui-btn-normal"
                            lay-submit
                            @click.prevent="registerAccount"
                        >注册</button>
                    </div>
                    <div class="layui-form-item links">
                        <router-link to="/login">去登录</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            username: "",
            password: "",
            repassword: "",
        };
    },
    methods: {
        // 注册账户
        registerAccount() {
            this.$store
                .dispatch("userOption/registerAccount", {
                    username: this.username,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push("/login");
                });
        },
    },
};
</script>

<style scoped>
    .box {
        width: 100%;
        height: 100vh;
        background: url('./images/login_bg.jpg') no-repeat center;
        background-size: cover;
    }

    .loginAndRegBox {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 400px;
        height: 310px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .title-box {
        height: 60px;
        background: url('./images/login_title.png') no-repeat center;
    }

    .layui-form {
        padding: 0 30px;
    }

    .links {
        display: flex;
        justify-content: flex-end;
    }

    .links a {
        font-size: 12px;
    }

    .layui-form-item {
        position: relative;
    }

    .layui-icon {
        position: absolute;
        left: 10px;
        top: 10px;
    }

    .layui-input {
        padding-left: 32px;
    }
</style>