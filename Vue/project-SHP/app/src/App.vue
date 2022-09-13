<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <Footer v-show="$route.meta.showFooter"></Footer>
    </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

// 引入 swiper 样式
import "swiper/css/swiper.min.css";

export default {
    name: "App",
    components: {
        Header,
        Footer,
    },

    mounted() {
        /* disptach活动 */
        // 更新vuex中的 categoryList 数据
        this.$store.dispatch("homeOption/categoryList");
        // 更新vuex中的 bannerList 数据
        this.$store.dispatch("homeOption/getBannerList");
        // 更新vuex中的 floorList 数据
        this.$store.dispatch("homeOption/getFloorList");
    },
};
</script>