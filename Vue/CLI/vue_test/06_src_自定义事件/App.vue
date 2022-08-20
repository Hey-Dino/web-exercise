<template>
    <div>
        <!-- 子组件给父组件传递数据 -->

        <!-- 通过父组件给子组件传递函数类型的 props 实例 -->
        <School :showSchoolName="showSchoolName"></School>
        <hr>
        <!-- 通过父组件给子组件绑定一个 自定义事件实现 -->
        <!-- <Student v-on:showStudentName="showStudentName"></-Student> -->
        <Student ref="student" :waitTime="waitTime"/>
    </div>
</template>

<script>
import School from "./components/School";
import Student from "./components/Student";

export default {
    name: "App",
    data() {
        return {
            waitTime: 3000,
        };
    },
    methods: {
        showSchoolName(name) {
            console.log("获取到学校名称：", name);
        },
        showStudentName(name, ...params) {
            console.log("获取到学生姓名：", name, "其他数据：", params);
        },
        showStudentSex(sex) {
            console.log("获取到学生性别：", sex);
        },
    },
    mounted() {
        const timer = setInterval(() => {
            this.waitTime -= 1000;
        }, 1000);

        // 类似于 <Student v-on:showStudentName="showStudentName" /> 绑定一个事件
        // 相较于使用 v-on 直接绑定，下方的操作可以实现【异步操作】，如设置定时器
        setTimeout(() => {
            clearInterval(timer);
            this.$refs.student.$on("showStudentName", this.showStudentName);
            this.$refs.student.$on("showStudentSex", this.showStudentSex);
        }, this.waitTime);
    },
    components: {
        School,
        Student,
    },
};
</script>