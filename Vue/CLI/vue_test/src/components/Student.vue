<template>
    <div>
        <h1>{{msg}}</h1>
        <h2>姓名：{{name}}</h2>
        <h2>性别：{{sex}}</h2>
        <h2>年龄：{{age}}</h2>
    </div>
</template>

<script>
export default {
    name: "School",
    data() {
        return {
            msg: "我是一个来自尚硅谷的学生",
        };
    },
    // 简单声明接收数据
    // props: ["name", "sex", "age"],

    // 声明接收数据的同时，进行数据类型检验，若不匹配则仅在控制台提示用户
    /* props: {
        name: String,
        sex: String,
        age: Number,
    }, */

    // 声明接收数据的同时，进行数据类型校验 与 必要性检验 or 默认值指定
    props: {
        name: {
            type: String,
            required: true, // name属性是必要的
        },
        sex: {
            type: String,
            default: "男", // 默认值指定
        },
        age: {
            type: Number,
            default: 20,
        },
    },
};
</script>

<style>

</style>