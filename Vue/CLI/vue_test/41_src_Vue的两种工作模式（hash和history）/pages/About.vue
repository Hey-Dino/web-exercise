<template>
    <h2>我是About内容</h2>
</template>

<script>
export default {
    name: "About",
    // 通过路由规则，进入该组件时被调用
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem("age") <= 18) {
            console.log("About组件 —— beforeRouterEnter", from, to);
            next();
        }
    },
    // 通过路由规则，离开该组件时被调用
    beforeRouteLeave(to, from, next) {
        console.log("About组件 —— beforeRouterLeave", from, to);
        next();
    },
};
</script>