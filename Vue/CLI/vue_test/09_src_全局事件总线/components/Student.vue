<template>
    <div>
        <h2>姓名：{{name}}</h2>
        <h2>性别：{{sex}}</h2>
        <button @click="sendStudentName">点我发送学生姓名给学校组件</button>
    </div>
</template>

<script>
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
            this.$bus.$emit("getStudentName", this.name);
        },
    },
};
</script>