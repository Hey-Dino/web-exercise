<template>
    <el-container>
        <!-- 顶部 -->
        <el-header>
            文章类别管理
            <el-button
                type="info"
                @click="showAddDiag"
            >添加类别</el-button>
        </el-header>
        <!-- 主要内容 -->
        <el-main>
            <el-table
                border
                :span="10"
                :data="tableData"
            >
                <el-table-column
                    fixed
                    prop="name"
                    label="分类名称"
                    :span="4"
                >
                </el-table-column>
                <el-table-column
                    prop="alias"
                    label="分类别名"
                    :span="4"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    :span="2"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="small"
                            plain
                            @click="showEditDiag(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="info"
                            size="small"
                            plain
                            prop="id"
                            @click="delCategory(scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <!-- Dialog -->
        <el-dialog
            :title="`${editDiagTitle}文章分类信息`"
            :visible.sync="dialogFormVisible"
        >
            <el-form :model="form">
                <el-form-item
                    label="分类名称"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="分类别名"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.alias"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    v-show="isEditDiag"
                    @click="editCategory(form)"
                >确 定</el-button>
                <el-button
                    type="primary"
                    v-show="!isEditDiag"
                    @click="addCategory"
                >确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ArticleCategory",
    data() {
        return {
            dialogFormVisible: false,
            form: {
                id: "",
                name: "",
                alias: "",
            },
            // 表格宽度
            formLabelWidth: "80px",
            // 判断是编辑框还是添加框
            isEditDiag: true,
            // 定义编辑\添加框标题
            editDiagTitle: "",
        };
    },
    computed: {
        ...mapState("articleOption", ["categoryList"]),
        // 为表单提供数据的属性
        tableData() {
            return this.categoryList || [];
        },
    },
    methods: {
        getData() {
            // 派发，获取文章分类信息
            this.$store.dispatch("articleOption/getCategoryList");
        },
        // 删除文章分类信息
        delCategory(id) {
            this.$confirm("是否删除该文章分类?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    // 删除文章
                    try {
                        this.$store
                            .dispatch("articleOption/deleteCategory", id)
                            .then(() => {
                                // 若删除成功，则刷新页面
                                this.getData();
                            });
                    } catch (err) {
                        console.log(err.message);
                    }
                })
                .catch(() => {});
        },
        // 展示分类信息编辑框
        showEditDiag(category) {
            // 修改编辑框数据
            const { id, name, alias } = category;
            this.form.id = id;
            this.form.name = name;
            this.form.alias = alias;
            this.editDiagTitle = "编辑";

            this.isEditDiag = true;
            // 显示编辑框
            this.dialogFormVisible = true;
        },
        // 编辑文章分类信息
        editCategory(formData) {
            // 派发分类信息修改到仓库
            this.$store
                .dispatch("articleOption/editCategory", formData)
                .then((result) => {
                    // 更新页面
                    this.getData();

                    // 隐藏编辑框
                    this.dialogFormVisible = false;
                });
        },
        // 展示分类信息添加框
        showAddDiag() {
            // 将Form对象置空
            this.form = {};
            // 修改 Diag 标题
            this.editDiagTitle = "添加";

            this.isEditDiag = false;
            // 展示Diag
            this.dialogFormVisible = true;
        },
        // 添加文章分类信息
        addCategory() {
            // 获取表单信息
            const { name, alias } = this.form;
            // 派发分类信息添加请求
            this.$store
                .dispatch("articleOption/addCategory", { name, alias })
                .then(() => {
                    // 更新页面
                    this.getData();

                    // 隐藏编辑框
                    this.dialogFormVisible = false;
                });
        },
    },
    mounted() {
        this.getData();
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

    .el-header .el-button {
        float: right;
        margin: 10px 0;
    }

    .el-dialog__header {
        height: 80px;
    }
</style>