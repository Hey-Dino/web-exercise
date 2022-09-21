<template>
    <router-view></router-view>
</template>

<script>
import axios from "axios";

export default {
    name: "ArticleManage",
    mounted() {
        axios
            .post({
                url: "http://127.0.0.1:3007/api/login",
                data: {
                    username: "Tom",
                    password: "123456",
                },
            })
            .then((result) => {
                console.log(result);
            });
    },
};
</script>