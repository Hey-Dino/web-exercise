<template>
    <div>
        <h2 id="name">学校名称：{{name}}</h2>
        <h2>学校地址：{{addr}}</h2>
    </div>
</template>

<script>

export default {
    name: "School",
    data() {
        return {
            name: "HSTC",
            addr: "广东.潮州",
        };
    },
};
</script>

<style scoped>
    #name {
        color: skyblue;
        font-size: 30px;
    }
</style>