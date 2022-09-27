/* 进一步封装el-button组件 */
<template>
    <a :title="title">
        <el-button
            v-bind="$attrs"
            v-on="$listeners"
        ></el-button>
    </a>
</template>

<script>
export default {
    name: "hint-button",
    props: ["title"],
};
</script>

<style>

</style>