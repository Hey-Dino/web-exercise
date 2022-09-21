<template>
    <el-container>
        <el-header>文章列表管理</el-header>
        <el-main>
            <el-form
                ref="form"
                :model="form"
                label-width="80px"
            >
                <el-form-item label="文章标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="文章类别">
                    <el-select
                        v-model="form.region"
                        placeholder="请选择"
                    >
                        <el-option
                            label="科技"
                            value="1"
                        ></el-option>
                        <el-option
                            label="文学"
                            value="2"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input
                        type="textarea"
                        v-model="form.desc"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                    >发布</el-button>
                    <el-button>存为草稿</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "ArticlePublish",
    data() {
        return {
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
        };
    },
    methods: {
        onSubmit() {},
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
</style>