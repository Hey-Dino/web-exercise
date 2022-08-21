/* 
    多个元素过渡
 */
<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <!-- 一旦定义name，下方的v-leave、v-enter等的都要更改 -->
        <transition-group
            name="dino"
            :appear="true"
        >
            <h1 v-show="!isShow" key="1">{{msg}}</h1>
            <h1 v-show="isShow" key="2">{{msg}}</h1>
        </transition-group>
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

    .dino-enter, .dino-leave-to {
        transform: translateX(-100%);
    }

    .dino-enter-active, .dino-leave-active{
        transition: all .5s;
    }

    .dino-enter-to, .dino-leave {
        transform: translateX(0);
    }
</style>