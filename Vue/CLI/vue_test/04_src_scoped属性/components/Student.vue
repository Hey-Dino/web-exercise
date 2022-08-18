<template>
    <div>
        <h2 id="name">姓名：{{name}}</h2>
        <h2>性别：{{sex}}</h2>
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
};
</script>

<style scoped>
    #name {
        color: pink;
        font-size: 30px;
    }
</style>