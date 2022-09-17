/* 
    全局组件 Carousel 轮播图
 */
<template>
    <!-- banner轮播 -->
    <div
        class="swiper-container"
        id="mySwiper"
    >
        <div class="swiper-wrapper">
            <div
                v-for="carousel in list"
                :key="carousel.id"
                class="swiper-slide"
            >
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";

export default {
    name: "Carousel",
    props: ["list"],
    watch: {
        list: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.$nextTick(() => {
                        var mySwiper = new Swiper(".swiper-container", {
                            loop: true, // 循环模式选项
                            autoplay: true, // 自动播放

                            // 如果需要分页器
                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true,
                            },

                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                    });
                });
            },
        },
    },
};
</script>

<style>

</style>