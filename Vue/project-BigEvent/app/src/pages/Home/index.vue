<template>
    <el-container id="full-page">
        <!-- 头部 -->
        <el-header>
            <el-row :gutter="20">
                <el-col
                    :span="6"
                    class="logo"
                >
                    <img src="@/assets/logo.png">
                </el-col>
                <el-col
                    :span="5"
                    :offset="13"
                >
                    <!-- 头像部分 -->
                    <el-avatar
                        :size="50"
                        :src="userAvatar"
                    ></el-avatar>
                    <!-- 个人信息修改部分 -->
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu
                            slot="dropdown"
                            class="dropdownBox"
                        >
                            <el-dropdown-item>
                                <router-link :to="{name: 'basicInfo'}">基本资料</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link :to="{name: 'changeAvatar'}">更换头像</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link :to="{name: 'resetPassword'}">重置密码</router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 退出登录部分 -->
                    <el-button
                        type="text"
                        @click="logout"
                    ><i class="el-icon-switch-button"></i>退出</el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-col :span="12">
                    <el-row class="tac">
                        <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                        >
                            <el-menu-item
                                index="1"
                                @click="$router.push({name: 'dataVisual'})"
                            >
                                <i class="el-icon-s-data"></i>
                                <span slot="title">首页</span>
                            </el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span>文章管理</span>
                                </template>
                                <el-menu-item
                                    index="2-1"
                                    @click="$router.push({name: 'articleCategory'})"
                                >
                                    <i class="el-icon-document-copy"></i>
                                    <span>文章类别</span>
                                </el-menu-item>
                                <el-menu-item
                                    index="2-2"
                                    @click="$router.push({name: 'articleList'})"
                                >
                                    <i class="el-icon-folder-opened"></i>
                                    <span>文章列表</span>
                                </el-menu-item>
                                <el-menu-item
                                    index="2-3"
                                    @click="$router.push({name: 'articlePublish'})"
                                >
                                    <i class="el-icon-edit-outline"></i>
                                    <span>发布文章</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-user"></i>
                                    <span>个人中心</span>
                                </template>
                                <el-menu-item
                                    index="3-1"
                                    @click="$router.push({name: 'basicInfo'})"
                                >
                                    <i class="el-icon-user"></i>
                                    <span>基本资料</span>
                                </el-menu-item>
                                <el-menu-item
                                    index="3-2"
                                    @click="$router.push({name: 'changeAvatar'})"
                                >
                                    <i class="el-icon-picture-outline"></i>
                                    <span>更换头像</span>
                                </el-menu-item>
                                <el-menu-item
                                    index="3-3"
                                    @click="$router.push({name: 'resetPassword'})"
                                >
                                    <i class="el-icon-refresh-right"></i>
                                    <span>重置密码</span>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-row>
                </el-col>
            </el-aside>

            <!-- 底部 -->
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>© www.newsback.com 新闻管理后台系统</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
// 引入移除Token的方法
import { removeToken } from "@/utils/token";
import { mapGetters } from "vuex";

export default {
    name: "Home",
    data() {
        return {};
    },
    computed: {
        ...mapGetters("userOption", ["userAvatar"]),
    },
    methods: {
        // 获取用户信息
        getUserInfoById() {
            this.$store
                .dispatch("userOption/getUserInfoById")
                .then((result) => {
                    // 刷新用户头像
                    this.avatarUrl = this.$store.state.userOption.userInfo.user_pic;
                });
        },
        // 注销操作
        logout() {
            this.$confirm("确认退出登录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                // 移除Token
                removeToken();
                // 跳转login页面
                this.$router.push("/login");
            });
        },
    },
    mounted() {
        this.getUserInfoById();
    },
};
</script>

<style scoped>
    #full-page {
        height: 100vh;
    }

    .el-header {
        background-color: #23262E;
        line-height: 60px;
    }

    .el-footer {
        height: 44px !important;
        line-height: 44px;
        text-align: center;
        background-color: #eee;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .el-aside .el-col,
    .el-col .el-row {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .el-menu-vertical-demo {
        width: 100%;
        height: 100%;
    }

    .el-dropdown-link {
        margin-right: 10px;
    }

    .el-dropdown-link {
        color: rgba(255, 255, 255, .7);
        transition: all .3s;
    }

    .el-dropdown-link:hover {
        color: #fff;
    }

    .el-avatar {
        vertical-align: middle;
        margin-right: 10px;
    }

    .dropdownBox {
        width: 130px;
        font-size: 16px;
    }

    .el-dropdown-menu__item:hover {
        color: #000;
        background-color: #f2f2f2;
    }

    .el-message-box {
        width: 300px;
    }

    .el-button {
        color: rgba(255, 255, 255, .7);
        font-size: 16px;
    }

    .el-button:hover {
        color: #fff;
    }

    .el-button .el-icon-switch-button {
        margin-right: 5px;
    }
</style>