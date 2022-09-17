<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>品优购欢迎您！</p>
                    <p>
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link
                            to="/register"
                            class="register"
                        >免费注册</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的品优购</a>
                    <a href="###">品优购会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注品优购</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link
                    class="logo"
                    title="品优购"
                    to="/home"
                >
                    <img
                        src="./images/logo.png"
                        alt=""
                    >
                </router-link>
            </h1>
            <div class="searchArea">
                <form
                    @submit.prevent=""
                    class="searchForm"
                >
                    <input
                        type="text"
                        id="autocomplete"
                        class="input-error input-xxlarge"
                        v-model.lazy="keyword"
                        @keyup.enter="goSearch"
                    />
                    <button
                        class="sui-btn btn-xlarge btn-danger"
                        type="button"
                        @click="goSearch"
                    >搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        // 搜索按钮的回调函数，需要向 Search路由跳转
        goSearch() {
            // 合并原有 query 参数
            const query = this.$route.query;

            // 跳转路由
            this.$router.push({
                name: "search",
                params: {
                    // undefined 是为了避免字符串为存空格时，URL中出现？
                    keyword: this.keyword || undefined,
                },
                query,
            });
        },
    },
    mounted() {
        this.$bus.$on("clear", () => {
            this.keyword = "";
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
        margin: 30px 0;
        vertical-align: middle;
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
        padding: 0px 5px;
        border: 2px solid #c81623;
        float: left;
    }

    .header>.bottom .searchArea .searchForm input:focus {
        outline: none;
    }

    .header>.bottom .searchArea .searchForm button {
        height: 32px;
        width: 68px;
        background-color: #c81623;
        border: none;
        color: #fff;
        float: left;
        cursor: pointer;
    }

    .header>.bottom .searchArea .searchForm button:focus {
        outline: none;
    }
</style>