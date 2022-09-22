<template>
    <el-container>
        <!--  -->
        <el-header>文章列表管理</el-header>

        <!--  -->
        <el-main>
            <el-select
                v-model="selectState"
                placeholder="请选择"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-table
                :data="articleList"
                border
                :span="8"
            >
                <el-table-column
                    fixed
                    prop="title"
                    label="文章标题"
                    :span="4"
                />
                <el-table-column
                    prop="cate_name"
                    label="分类"
                    :span="1"
                />
                <el-table-column
                    prop="pub_date"
                    label="发表时间"
                    :span="1"
                />
                <el-table-column
                    prop="state"
                    label="状态"
                    :span="1"
                    :formatter="stateName"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    :span="1"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="small"
                            plain
                            @click="showEditDialog(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="info"
                            size="small"
                            plain
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <!-- 对话框 dialog -->
        <el-dialog
            title="编辑文章信息"
            :visible.sync="dialogFormVisible"
        >
            <el-form :model="form">
                <el-form-item
                    label="文章标题"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <!-- 分类 -->
                <el-form-item
                    label="分类"
                    :label-width="formLabelWidth"
                >
                    <el-select
                        v-model="form.cate_id"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="category in categoryList"
                            :key="category.id"
                            :label="category.name"
                            :value="category.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 发表时间 -->
                <el-form-item
                    label="发表时间"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.pub_date"
                        autocomplete="off"
                        disabled
                    ></el-input>
                </el-form-item>
                <!-- 文章状态 -->
                <el-form-item
                    label="状态"
                    :label-width="formLabelWidth"
                >
                    <el-radio
                        v-model="form.state"
                        label="0"
                        border
                    >发布</el-radio>
                    <el-radio
                        v-model="form.state"
                        label="1"
                        border
                    >草稿</el-radio>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="updateArticle(form)"
                >确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ArticleList",
    data() {
        return {
            // 选中的文章状态
            selectState: "-1",
            options: [
                {
                    value: "-1",
                    label: "所有状态",
                },
                {
                    value: "0",
                    label: "已发布",
                },
                {
                    value: "1",
                    label: "草稿",
                },
            ],
            // 控制编辑框的显示与隐藏
            dialogFormVisible: false,
            // 输入框标签宽度
            formLabelWidth: "80px",
            // 表单数据
            form: {
                title: "",
                cate_id: "",
                pub_date: "",
                state: "",
            },
        };
    },
    computed: {
        ...mapState("articleOption", ["articleList", "categoryList"]),
    },
    methods: {
        // 获取文章列表(针对所有状态)
        getArticleList() {
            this.$store.dispatch("articleOption/getArticles");
        },
        // 获取[某种状态]的文章列表
        getArticleListByState() {
            this.$store.dispatch(
                "articleOption/getArticlesByState",
                this.selectState
            );
        },
        // 将状态ID转化为状态名称
        stateName(row, column, cellValue) {
            if (cellValue === "0") {
                return "发布";
            } else if (cellValue === "1") {
                return "草稿";
            }
        },
        // 删除文章
        deleteArticleById(id) {
            this.$confirm("是否删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$store
                        .dispatch("articleOption/deleteArticleById", id)
                        .then(() => {
                            // 更新页面
                            this.getArticleList();

                            this.$message({
                                type: "success",
                                message: "删除成功！",
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        message: "已取消删除！",
                    });
                });
        },
        // 显示并编辑编辑框内容
        showEditDialog(articleInfo) {
            // 修改编辑框内容
            this.form = { ...this.form, ...articleInfo };
            // 显示编辑框
            this.dialogFormVisible = true;
        },
        // 提交编辑内容并更新
        updateArticle() {
            // 解构数据
            const { id, title, cate_id, state } = this.form;
            // 派发请求，更新文章
            this.$store
                .dispatch("articleOption/updateArticleById", {
                    id,
                    title,
                    cate_id,
                    state,
                })
                .then(() => {
                    // 更新文章列表
                    this.getArticleList();
                    // 隐藏对话框dialog
                    this.dialogFormVisible = false;
                });
        },
    },
    watch: {
        // 监听'状态选择值'的变化,以更新列表
        selectState(state) {
            if (state === "-1") {
                this.getArticleList();
            } else {
                this.getArticleListByState(state);
            }
        },
    },
    mounted() {
        this.getArticleList();
        // 获取文章分类列表
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
        float: left;
        margin-bottom: 10px;
    }

    .el-select {
        width: 100%;
    }
</style>