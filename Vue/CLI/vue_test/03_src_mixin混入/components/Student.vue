<template>
    <div>
        <h2 @click="showName">姓名：{{name}}</h2>
        <h2>性别：{{sex}}</h2>
    </div>
</template>

<script>
import { mixin1 } from "../mixin";

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

<style>

</style>