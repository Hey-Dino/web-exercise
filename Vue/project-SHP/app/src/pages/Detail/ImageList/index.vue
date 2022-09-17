<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div
                class="swiper-slide"
                v-for="(img, index) in imageList"
                :key="img.id"
            >
                <img
                    :src="img.imgUrl"
                    @mouseenter="changeActive(index)"
                    :class="{active: currIndex === index}"
                >
            </div>
            <div
                class="swiper-slide"
                v-for="(img, index) in imageList"
                :key="(img.id + 1) * 2"
            >
                <img
                    :src="img.imgUrl"
                    @mouseenter="changeActive(index)"
                    :class="{active: currIndex === index}"
                >
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Swiper from "swiper";

export default {
    name: "ImageList",
    data() {
        return {
            currIndex: 0,
        };
    },
    props: ["imageList"],
    methods: {
        changeActive(index) {
            this.currIndex = index;
            this.$bus.$emit("changeActiveImg", index);
        },
    },
    watch: {
        imageList: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    new Swiper(".swiper-container", {
                        // 每行显示格式
                        slidesPerView: 5,
                        // 单次轮播个数
                        slidesPerGroup: 5,
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                });
            },
        },
    },
};
</script>

<style scoped>
    .swiper-container {
        width: 402px;
        height: 56px;
        box-sizing: border-box;
        padding: 0 12px;
    }

    .swiper-slide {
        /* float: left; */
        /* width: 56px; */
        height: 56px;
        margin: 0 9px;
    }

    .swiper-slide img {
        display: block;
        width: 50px;
        height: 50px;
        padding: 2px;
        border: 1px solid transparent;
    }

    .swiper-slide img.active {
        border: 2px solid #f60;
        padding: 1px;
    }

    .swiper-slide img:hover {
        border: 2px solid #f60;
        padding: 1px;
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        font-size: 12px;
    }
</style>
