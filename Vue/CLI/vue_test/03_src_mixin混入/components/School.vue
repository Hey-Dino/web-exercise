<template>
    <div>
        <h2 @click="showName">学校名称：{{name}}</h2>
        <h2>学校地址：{{addr}}</h2>
    </div>
</template>

<script>
import { mixin1 } from "../mixin";
import { mixin2 } from "../mixin";

export default {
    name: "School",
    data() {
        return {
            name: "HSTC",
            addr: "广东.潮州",
            x: 999,
        };
    },
    // 配置局部混入mixins
    mixins: [mixin2],
    mounted() {
        console.log("挂载完成-School.vue");
    },
};
</script>

<style>

</style>