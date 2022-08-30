/* 
    集成第三方动画 animate

    使用方法：
        1.安装 animate.css：npm i animate
        2.引入该CSS文件：import "animate.css"
        3.为需要添加过渡效果的元素添加name：animate__animated animate__bounce
        4.为需要添加过渡效果的元素添加属性：enter-active-class、leave-active-class，属性值过过渡效果名

        备注：具体参照animate官网：animate.style
 */
<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition-group
            appear
            name="animate__animated animate__bounce"
            enter-active-class="animate__backInUp"
            leave-active-class="animate__backOutUp"
        >
            <h1
                v-show="!isShow"
                key="1"
            >{{msg}}</h1>
            <h1
                v-show="isShow"
                key="2"
            >{{msg}}</h1>
        </transition-group>
    </div>
</template>

<script>
import "animate.css";

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
</style>