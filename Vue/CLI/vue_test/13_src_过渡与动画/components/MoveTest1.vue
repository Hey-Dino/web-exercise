/* 
    配合@keyframes实现动画效果
 */
<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition :appear="true">
            <h1 v-show="isShow">{{msg}}</h1>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "Welcome to Vue!",
            isShow: true,
        };
    },
};
</script>

<style scoped>
    h1 {
        background-color: skyblue;
        color: #fff;
    }

    .v-enter-active {
        animation: move 0.5s;
    }

    .v-leave-active {
        animation: move 0.5s reverse;
    }

    @keyframes move {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>