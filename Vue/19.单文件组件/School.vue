<template>
    <div class="demo">
        <h3>学校名称: {{name}}</h3>
        <h3>学校地址: {{addr}}</h3>
        <button @click="showSchoolName">点我展示学校名!</button>
    </div>
</template>

<script>
export default {
    name: "School",
    data() {
        return {
            name: "HSTC",
            addr: "Teochew, Guangdong",
        };
    },
    methods: {
        showSchoolName() {
            alert(this.name);
        },
    },
};
</script>

<style>
    .demo {
        font-weight: normal;
        font-size: 18px;
        color: skyblue;
    }
</style>