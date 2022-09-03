<template>
    <ul>
        <li :style="{opacity}">欢迎学习Vue</li>
        <li>News01<input type="text" /></li>
        <li>News02<input type="text" /></li>
        <li>News03<input type="text" /></li>
    </ul>
</template>

<script>
export default {
    name: "News",
    data() {
        return {
            opacity: 1,
        };
    },
    activated() {
        this.timer = setInterval(() => {
            this.opacity -= 0.01;
            if (this.opacity <= 0) {
                this.opacity = 1;
            }
        }, 16);
    },
    deactivated() {
        clearInterval(this.timer);
    },
};
</script>

<style scoped>
    ul li:first-child {
        font-size: 25px;
    }
</style>>
    
</style>