<template>
    <el-container>
        <el-header>修改用户信息</el-header>
        <el-main>
            <el-form
                ref="form"
                label-width="90px"
            >
                <el-form-item label="原密码">
                    <el-input
                        type="password"
                        v-model="oldPwd"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input
                        type="password"
                        v-model="newPwd1"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input
                        v-model="newPwd2"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submit"
                    >修改密码</el-button>
                    <el-button @click="reset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import { removeToken } from "@/utils/token";

export default {
    name: "ChangePassword",
    data() {
        return {
            oldPwd: "",
            newPwd1: "",
            newPwd2: "",
        };
    },
    methods: {
        // 提交修改
        submit() {
            this.$store
                .dispatch("userOption/updateUserPassword", {
                    oldPwd: this.oldPwd,
                    newPwd: this.newPwd1,
                })
                .then(() => {
                    // 清除Token并跳转Login页面
                    removeToken();
                    this.$router.push("/login");
                });
        },
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
    }

    .el-form-item__content {
        display: flex;
    }

    .el-form-item:last-child {
        float: left;
    }
</style>