<template>
    <div class="wrapper">
        <TypeNav />
        <ListContainer />
        <TodayRecommend />
        <Rank />
        <Like />
        <Floor
            v-for="floor in floorList"
            :key="floor.id"
            :floor="floor"
        />
        <Brand />
    </div>
</template>

<script>
// 引入局部组件
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

//
import { mapState } from "vuex";

export default {
    name: "Home",
    computed: {
        ...mapState("homeOption", ["floorList"]),
    },
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted() {
        // 获取用户信息
        this.$store.dispatch("userOption/getUserInfoByToken");
    },
};
</script>

<style>

</style>