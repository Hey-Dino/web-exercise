<template>
    <div>
        <h3>学生姓名: {{name}}</h3>
        <h3>学生年龄: {{age}}</h3>
    </div>
</template>

<script>
export default {
    name: "Student",
    data() {
        return {
            name: "Dino",
            age: 22,
        };
    },
};
</script>