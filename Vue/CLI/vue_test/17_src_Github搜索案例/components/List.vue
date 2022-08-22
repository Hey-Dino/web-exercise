<template>
    <div>
        <div
            v-for="user in info.users"
            :key="user.node_id"
            class="card"
        >
            <a
                :href="user.html_url"
                target="_blank"
            >
                <img
                    :src="user.avatar_url"
                    style='width: 100px'
                />
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
        <!-- 1.展示欢迎词 -->
        <h1 v-show="info.isFirst">欢迎使用！</h1>
        <!-- 2.展示加载中 -->
        <h1 v-show="info.isLoading">加载中...</h1>
        <!-- 3.展示错误信息 -->
        <h1 class="errMsg" v-show="info.errMsg">{{info.errMsg}}</h1>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            info: {
                isFirst: true,
                isLoading: false,
                errMsg: "",
                users: [],
            },
        };
    },
    mounted() {
        this.$bus.$on("updateListData", (dataObj) => {
            this.info = { ...this.info, ...dataObj };
        });
    },
};
</script>

<style>
    .card {
        float: left;
        width: 33.333%;
        padding: .75rem;
        margin-bottom: 2rem;
        border: 1px solid #efefef;
        text-align: center;
    }

    .card > img {
        margin-bottom: .75rem;
        border-radius: 100px;
    }

    .card-text {
        font-size: 85%;
    }

    .errMsg {
        color: red; 
    }
</style>