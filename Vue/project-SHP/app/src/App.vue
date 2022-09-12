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
        // disptach活动，为更新vuex中的categoryList数据
        this.$store.dispatch("homeOption/categoryList");
    },
};
</script>