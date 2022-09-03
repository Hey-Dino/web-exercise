<template>
    <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
            <h2>Vue Router Demo</h2>
            <button @click="back">后退</button>
            <button @click="forward">前进</button>
            <button @click="go">前进三步</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Banner",
    methods: {
        back() {
            console.log(this.$router)
            this.$router.back();
        },
        forward() {
            this.$router.forward();
        },
        go() {
            // 当不满足步数要求时，则不跳转
            this.$router.go(3);
        },
    },
};
</script>