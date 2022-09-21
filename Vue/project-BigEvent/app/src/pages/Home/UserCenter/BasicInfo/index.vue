<template>
    <el-container>
        <el-header>修改用户信息</el-header>
        <el-main>
            <el-form
                ref="form"
                label-width="80px"
            >
                <el-form-item label="登录名称">
                    <el-input v-model="loginName"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="nickName"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input
                        v-model="email"
                        type="email"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submit"
                    >提交修改</el-button>
                    <el-button @click="reset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "BasicInfo",
    data() {
        return {
            loginName: "",
            nickName: "",
            email: "",
        };
    },
    methods: {
        // 提交修改
        submit() {},
        // 重置信息
        reset(formName) {
            this.$refs[formName].resetFileds();
        },
    },
};
</script>

<style scoped>
    .el-container {
        background-color: #fff;
    }
    .el-header {
        text-align: left;
        line-height: 60px;
        color: #333;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
    }

    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>