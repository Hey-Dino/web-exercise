<template>
    <div>
        <h1 v-text="msg" ref="tit"></h1>
        <button @click="showDom" ref="btn">点我输出ref元素</button>
        <School ref="school"/>
    </div>
</template>

<script>
import School from "./components/School";

export default {
    name: "App",
    data() {
        return {
            msg: "欢迎学习Vue！",
        };
    },
    methods: {
        showDom(){
            console.log(this.$refs.tit)     // 获取真实DOM元素
            console.log(this.$refs.btn)
            console.log(this.$refs.school)  // School组件的实例对象（VC）
        }
    },
    components: {
        School,
    },
};
</script>