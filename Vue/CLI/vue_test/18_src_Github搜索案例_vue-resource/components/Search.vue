<template>
    <section class="jumbotron">
        <h3 class="search-tit jumbotron-heading">Search Github Users</h3>
        <div>
            <input
                type="text"
                placeholder="enter the name you search"
                @keyup.enter="searchUserInfo"
                v-model.lazy="keyWord"
                ref="searchInput"
            />
            <button @click="searchUserInfo">Search</button>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "Search",
    data() {
        return {
            keyWord: "",
        };
    },
    methods: {
        searchUserInfo() {
            // 判断输入框是否为空
            if (this.keyWord.trim() == "") {
                this.keyWord = ""; // 清空输入框
                return; // 不做请求，直接返回
            }

            this.$bus.$emit("updateListData", {
                isFirst: false,
                isLoading: true,
                users: [],
                errMsg: "",
            });

            this.$http
                .get(`https://api.github.com/search/users?q=${this.keyWord}`)
                .then(
                    (response) => {
                        // 请求成功后更新List数据
                        this.$bus.$emit("updateListData", {
                            isLoading: false,
                            users: response.data.items,
                        });
                        this.keyWord = ""; // 清空输入框
                    },
                    (err) => {
                        // 请求失败后更新List数据
                        this.$bus.$emit("updateListData", {
                            isLoading: false,
                            users: [],
                            errMsg: err.message,
                        });
                    }
                );
        },
    },
    mounted() {
        this.$refs.searchInput.focus(); // 在组件被挂载后，为输入框添加聚焦
    },
};
</script>

<style scoped>
    .jumbotron {
        margin-top: 15px;
    }

    .search-tit {
        line-height: 1;
        margin-top: 0;
        margin-bottom: 15px;
    }
</style>