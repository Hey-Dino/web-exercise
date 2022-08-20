<template>
    <div>
        <h2>姓名：{{name}}</h2>
        <h2>性别：{{sex}}</h2>
        <button @click="sendStudentName">点我发送学生姓名给学校组件</button>
    </div>
</template>

<script>
import pubsub from "pubsub-js";

export default {
    name: "Student",
    data() {
        return {
            name: "Dino",
            sex: "男",
        };
    },
    methods: {
        sendStudentName() {
            // 发布消息
            pubsub.publish("getStudentName", this.name);
        },
    },
};
</script>