<template>
    <el-container>
        <el-header>文章发布</el-header>
        <el-main>
            <el-form
                ref="form"
                :model="form"
                label-width="80px"
            >
                <!-- 文章标题 -->
                <el-form-item label="文章标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <!-- 文章类别 -->
                <el-form-item label="文章类别">
                    <el-select
                        v-model="form.cateId"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="category in categoryList"
                            :key="category.id"
                            :label="category.name"
                            :value="category.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- 文章内容 -->
                <el-form-item label="文章内容">
                    <el-input
                        type="textarea"
                        v-model="form.content"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="release"
                    >发布</el-button>
                    <el-button @click="depositDraft">存为草稿</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ArticlePublish",
    data() {
        return {
            form: {
                // 文章标题
                title: "",
                // 文章类别
                cateId: "",
                // 文章状态
                state: "",
                // 文章内容
                content: "",
            },
        };
    },
    computed: {
        // 获取文章分类信息
        ...mapState("articleOption", ["categoryList"]),
    },
    methods: {
        // 添加文章到数据库
        addArticle() {
            this.$store.dispatch("articleOption/publishArticle", this.form);
        },
        // 清空表单
        clearForm() {
            Object.keys(this.form).forEach((key) => {
                this.form[key] = "";
            });
        },
        // 发布内容
        release() {
            // 设置文章状态为0
            this.form.state = "0";
            // 派发,发布文章
            this.addArticle();
            // 清空表单
            this.clearForm();
            // 提示
            this.$message({
                message: "文章发布成功",
                type: "success",
            });
        },
        // 存入草稿
        depositDraft() {
            // 设置文章状态为0
            this.form.state = "1";
            // 派发,发布文章
            this.addArticle();
            // 清空表单
            this.clearForm();
            // 提示
            this.$message({
                message: "文章保存成功",
            });
        },
    },
    mounted() {
        // 派发，将文章分类信息存储到仓库中
        this.$store.dispatch("articleOption/getCategoryList");
    },
};
</script>

<style scoped>
    .el-container {
        background-color: #fff;
    }

    .el-header {
        text-align-last: left;
        line-height: 60px !important;
        border-bottom: 1px solid #f6f6f6;
    }

    .el-main {
        line-height: 30px;
    }

    .el-select {
        width: 100%;
        margin-bottom: 10px;
    }

    .el-form-item:last-child {
        float: left;
    }

    #status {
        text-align: left;
    }
</style>