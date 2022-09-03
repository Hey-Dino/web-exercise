<template>
    <ul>
        <li>News01<input type="text" /></li>
        <li>News02<input type="text" /></li>
        <li>News03<input type="text" /></li>
    </ul>
</template>

<script>
export default {
    name: "News",
    beforeDestroy() {
        console.log("News组件即将被销毁");
    },
};
</script>