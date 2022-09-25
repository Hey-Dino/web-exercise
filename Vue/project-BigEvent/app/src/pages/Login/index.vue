<template>
    <div class="box">
        <!-- 头部的 Logo 区域 -->
        <div class="layui-main">
            <img src="@/assets/logo.png" />
        </div>

        <!-- 登录注册区域 -->
        <div class="loginAndRegBox">
            <div class="title-box"></div>
            <!-- 登录的div -->
            <div class="login-box">
                <!-- 登录的表单 -->
                <form
                    class="layui-form"
                    id="form_login"
                >
                    <!-- 用户名 -->
                    <div class="layui-form-item">
                        <i class="layui-icon layui-icon-username"></i>
                        <input
                            type="text"
                            name="username"
                            required
                            lay-verify="required"
                            placeholder="请输入用户名"
                            autocomplete="off"
                            class="layui-input"
                            v-model.lazy="username"
                        />
                    </div>
                    <!-- 密码 -->
                    <div class="layui-form-item">
                        <i class="layui-icon layui-icon-password"></i>
                        <input
                            type="password"
                            name="password"
                            required
                            lay-verify="required|pwd"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                            v-model.lazy="password"
                        />
                    </div>
                    <!-- 登录按钮 -->
                    <div class="layui-form-item">
                        <!-- 注意：表单提交按钮和普通按钮的区别，就是 lay-submit 属性 -->
                        <button
                            class="layui-btn layui-btn-fluid layui-btn-normal"
                            @click.prevent="goLogin"
                        >登录</button>
                    </div>
                    <div class="layui-form-item links">
                        <router-link to="/register">去注册</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        // 登录操作
        goLogin() {
            this.$store
                .dispatch("userOption/loginAccount", {
                    username: this.username,
                    password: this.password,
                })
                .then(() => {
                    // 登录成功，跳转Home页面
                    this.$router.push("/home");
                })
                .catch(() => {
                    this.$message({
                        message: "用户名或密码错误！",
                        type: "warning",
                    });
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