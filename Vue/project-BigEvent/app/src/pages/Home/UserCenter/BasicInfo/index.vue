<template>
    <el-container>
        <el-header>修改用户信息</el-header>
        <el-main>
            <el-form
                ref="form"
                label-width="80px"
            >
                <el-form-item label="登录名称">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input
                        v-model="userInfo.email"
                        type="email"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="updateUserInfo"
                    >提交修改</el-button>
                    <el-button @click="reset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "BasicInfo",
    data() {
        return {};
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            this.$store.dispatch("userOption/getUserInfoById");
        },
        // 提交修改
        updateUserInfo() {
            // 发送请求,更新用户信息
            this.$store
                .dispatch("userOption/updateUserInfoById", this.userInfo)
                .then(() => {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                });
        },
        // 重置信息
        reset() {
            // 恢复原用户信息
            this.getUserInfo();
            // 提示
            this.$message({
                message: "重置成功",
            });
        },
    },
    computed: {
        ...mapState("userOption", ["userInfo"]),
    },
    mounted() {
        // 获取用户信息
        this.getUserInfo();
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

    .el-form-item:last-child {
        float: left;
    }
</style>