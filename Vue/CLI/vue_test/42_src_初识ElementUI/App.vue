<template>
    <div>
        <div class="slideShow">
            <el-carousel
                :interval="4000"
                type="card"
                height="200px"
            >
                <el-carousel-item
                    v-for="item in 6"
                    :key="item"
                >
                    <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-button
            :plain="true"
            @click="open"
        >打开消息提示</el-button>
        <el-button
            :plain="true"
            @click="openVn"
        >VNode</el-button>
    </div>

</template>

<script>
export default {
    name: "App",
    methods: {
        open() {
            this.$message("你的输入有误");
        },

        openVn() {
            const h = this.$createElement;
            this.$message({
                message: h("p", null, [
                    h("span", null, "内容可以是 "),
                    h("i", { style: "color: teal" }, "VNode"),
                ]),
            });
        },
    },
};
</script>

<style scoped>
    .el-carousel {
        width: 600px;
    }

    .el-carousel__item h3 {
        margin: 0;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 40px;
        opacity: 0.75;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>