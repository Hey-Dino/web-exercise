<template>
    <div class="spec-preview">
        <img :src="defaultImg.imgUrl" />
        <div
            class="event"
            ref="event"
            @mousemove="moveAndShow"
        ></div>
        <div class="big">
            <img
                :src="defaultImg.imgUrl"
                ref="bigImg"
            />
        </div>
        <div
            class="mask"
            ref="mask"
        ></div>
    </div>
</template>

<script>
// 引入lodash，用于节流
import { throttle } from "lodash";

export default {
    name: "Zoom",
    data() {
        return {
            imgIndex: 0,
        };
    },
    props: ["imageList"],
    computed: {
        defaultImg() {
            return this.imageList[this.imgIndex] || {};
        },
    },
    methods: {
        // 用于商品展示图修改
        changeActiveImg(index) {
            this.imgIndex = index;
        },
        // 控制遮罩和大图移动
        moveAndShow: throttle(function (e) {
            // 获取遮罩、图片框、大图元素
            const mask = this.$refs.mask;
            const event = this.$refs.event;
            const bigImg = this.$refs.bigImg;
            // 计算遮罩和图片框的宽高差值
            const diffHeight = event.offsetHeight - mask.offsetHeight;
            const diffWidth = event.offsetWidth - mask.offsetWidth;
            // 计算遮罩的位置
            let top = e.offsetY - mask.offsetHeight / 2;
            let left = e.offsetX - mask.offsetWidth / 2;

            // 处理遮罩到达边界的情况
            if (top < 0) {
                top = 0;
            } else if (top > diffHeight) {
                top = diffHeight;
            }
            if (left < 0) {
                left = 0;
            } else if (left > diffWidth) {
                left = diffWidth;
            }

            // 修改遮罩与大图的位置
            mask.style.top = top + "px";
            mask.style.left = left + "px";
            bigImg.style.top = -2 * top + "px";
            bigImg.style.left = -2 * left + "px";
        }, 50),
    },
    mounted() {
        // 绑定事件，监听大图变化
        this.$bus.$on("changeActiveImg", this.changeActiveImg);
    },
};
</script>

<style scoped>
    .spec-preview {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #ccc;
    }

    .spec-preview img {
        width: 100%;
        height: 100%;
    }

    .spec-preview .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .spec-preview .mask {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 50%;
        background-color: #fddd4d;
        opacity: .5;
    }

    .spec-preview .big {
        display: none;
        position: absolute;
        top: -1px;
        left: 100%;
        width: 100%;
        height: 100%;
        z-index: 998;
        border: 1px solid #aaa;
        overflow: hidden;
        background: white;
    }

    .spec-preview .big img {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        max-width: 200%;
    }

    .spec-preview .event:hover~.mask,
    .spec-preview .event:hover~.big {
        display: block;
    }
</style>