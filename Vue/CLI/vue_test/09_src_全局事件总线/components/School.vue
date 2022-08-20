<template>
    <div>
        <h2>学校名称：{{name}}</h2>
        <h2>学校地址：{{addr}}</h2>
        <h3 v-if="stuName">学生姓名：{{stuName}}</h3>
    </div>
</template>

<script>
export default {
    name: "School",
    data() {
        return {
            name: "HSTC",
            addr: "广东.潮州",
            stuName: "",
        };
    },
    mounted() {
        // 在【全局事件总线】上添加一个自定义事件
        this.$bus.$once("getStudentName", (stuName) => {
            this.stuName = stuName;
            console.log("我是School组件，我接收到学生姓名：", stuName);
        });
    },
    beforeDestroy() {
        // 在组件销毁前，取消之前在【全局事件总线】上添加的自定义事件
        this.$bus.$off("getStudentName");
    },
};
</script>