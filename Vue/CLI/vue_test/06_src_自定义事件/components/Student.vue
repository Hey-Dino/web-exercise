<template>
    <div>
        <h2 id="name">姓名：{{name}}</h2>
        <h2>性别：{{sex}}</h2>
        <h3 v-show="waitTime">请等待{{waitTime / 1000}}s后点击下方按钮</h3>
        <button @click="sendStudentName">点我发送学生姓名</button>
        <button @click="sendStudentSex">点我发送学生性别</button>
        <br>
        <button @click="unbind">点我解绑事件</button>
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
            this.$emit("showStudentName", this.name, 10, 20, "Dino");
        },
        sendStudentSex() {
            this.$emit("showStudentSex", this.sex);
        },
        unbind() {
            // this.$off("showStudentName");   // 解绑一个自定义事件
            // this.$off(["showStudentName", "showStudentSex"]);   // 解绑多个自定义事件
            this.$off(); // 结伴所有自定义事件
        },
    },
    props: ["waitTime"],
};
</script>

<style scoped>
    #name {
        color: pink;
        font-size: 30px;
    }
</style>