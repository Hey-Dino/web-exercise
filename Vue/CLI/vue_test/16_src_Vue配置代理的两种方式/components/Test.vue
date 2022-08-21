<template>
    <div>
        <button @click="getStudent">点我获取学生信息</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    methods: {
        getStudent() {
            axios.get("http://localhost:8080/api1/students").then(
                (response) => {
                    console.log("请求成功，获得的数据：", response.data);
                },
                (err) => {
                    console.log("请求失败，失败信息：", err.message);
                }
            );
        },
    },
};
</script>

<style>

</style>