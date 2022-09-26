<template>
    <div>
        <!-- 添加按钮 -->
        <el-button
            type="primary"
            icon="el-icon-plus"
            style="margin: 10px 0;"
            @click="showAddDialog"
        >添加</el-button>

        <!-- 表格table -->
        <el-table
            ref="form"
            :border="true"
            :data="form"
        >
            <el-table-column
                align="center"
                prop="id"
                label="ID"
                width="80px"
            >
            </el-table-column>
            <el-table-column
                prop="tmName"
                label="品牌名称"
            >
            </el-table-column>
            <el-table-column
                prop="logoUrl"
                label="品牌LOGO"
            >
                <template slot-scope="{row}">
                    <el-image
                        style="width: 100px"
                        :src="row.logoUrl"
                        lazy
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="prop"
                label="操作"
            >
                <!-- row 为此列数据，$index 为该列索引值 -->
                <template slot-scope="{row, $index}">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="showEditDialog(row)"
                    >编辑</el-button>
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-close"
                        @click="deleteTrademark(row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <!-- 
            current-page：当前页
            total: 总数据条数
            page-size：分页数据条数
            page-sizes：可选择的每页数据条数
        -->
        <el-pagination
            style="margin-top: 10px; textAlign: center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50]"
            :total="pagination.total"
            layout="prev, pager, next, jumper,->, total, sizes"
        >
        </el-pagination>

        <!-- 添加、编辑对话框 -->
        <!-- :before-close="dialogBeforeClose" -->
        <el-dialog
            :title="`${dialog.mode == 0 ? '添加' : '编辑'}品牌信息`"
            :visible.sync="dialog.visible"
        >
            <!-- rules 需要和 model 配合使用 -->
            <el-form
                style="width: 80%;"
                label-width="95px"
                :model="tmForm"
                :rules="rules"
                ref="ruleForm"
            >
                <el-form-item
                    label="品牌名称"
                    prop="tmName"
                >
                    <el-input v-model="tmForm.tmName"></el-input>
                </el-form-item>
                <el-form-item
                    label="品牌LOGO"
                    prop="logoUrl"
                >
                    <el-upload
                        class="avatar-uploader"
                        action="/simply-api/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="tmForm.logoUrl"
                            :src="tmForm.logoUrl"
                            class="avatar"
                        >
                        <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                        ></i>
                        <div
                            slot="tip"
                            class="el-upload__tip"
                            :class="{illegal_logo: dialog.illegalLogo}"
                        >只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="closeDialog">取 消</el-button>
                <!-- 添加确定按钮 -->
                <el-button
                    type="primary"
                    @click="addTrademark('ruleForm')"
                    v-show="dialog.mode != 1"
                >确 定</el-button>
                <!-- 添加编辑按钮 -->
                <el-button
                    type="primary"
                    @click="editTrademark('ruleForm')"
                    v-show="dialog.mode == 1"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Trademark",
    data() {
        return {
            // 存储品牌信息
            form: [],
            /* 分页器各项参数 */
            pagination: {
                // 当前页码
                currentPage: 1,
                // 每页记录数
                pageSize: 10,
                // 总记录数
                total: 0,
            },
            /* 控制对话框的各参数 */
            dialog: {
                // 对话框的显示与隐藏
                visible: false,
                // 对话框模式：0表示添加框，1表示编辑框
                mode: 0,
                // 品牌LOGO是否符合规则
                illegalLogo: false,
            },
            /* 对话框内容 */
            tmForm: {
                tmName: "",
                logoUrl: "",
            },
            /* 表单验证规则 */
            rules: {
                tmName: [
                    {
                        required: true,
                        message: "请输入品牌名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 8,
                        message: `长度在2到8个字符`,
                        trigger: "blur",
                    },
                ],
                logoUrl: [
                    {
                        required: true,
                        message: "请选择品牌LOGO",
                    },
                ],
            },
        };
    },
    methods: {
        // 获取品牌信息
        async getTrademarkList() {
            // 解构获取当前页码、每页记录数、总记录数
            const { currentPage, pageSize } = this.pagination;
            // 发送请求获取数据
            const result = await this.$API.trademark.reqGetTrademarkList(
                currentPage,
                pageSize
            );

            if (result.code === 200) {
                this.form = result.data.records;
                this.pagination.total = result.data.total;
            }
        },
        // 监听每页记录数的改变
        handleSizeChange(pageSize) {
            // 更新每页记录数
            this.pagination.pageSize = pageSize;
            // 更新品牌信息
            this.getTrademarkList();
        },
        // 记录页码的改变
        handleCurrentChange(currentPage) {
            // 更改当前页码
            this.pagination.currentPage = currentPage;
            // 更新品牌信息
            this.getTrademarkList();
        },
        // 关闭对话框
        closeDialog() {
            this.dialog.visible = false;
        },
        // 展示添加框
        showAddDialog() {
            // 清空编辑框内容
            Object.keys(this.tmForm).forEach((key) => {
                this.tmForm[key] = "";
            });
            // 切换对话框模式
            this.dialog.mode = 0;
            // 展示对话框
            this.dialog.visible = true;
        },
        // 添加品牌信息
        addTrademark(formName) {
            // 校验表单信息
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // 提交添加内容
                    const result = await this.$API.trademark.reqAddTrademark(
                        this.tmForm
                    );

                    // 判断请求是否成功
                    if (result.code === 200) {
                        // 更新表单数据
                        this.getTrademarkList();
                        // 关闭对话框
                        this.dialog.visible = false;
                    }
                }
            });
        },
        // 展示编辑框
        showEditDialog(tmInfo) {
            // 为编辑框填充内容
            this.tmForm = { ...tmInfo };
            // 切换对话框模式
            this.dialog.mode = 1;
            // 展示对话框
            this.dialog.visible = true;
        },
        // 编辑品牌信息
        editTrademark(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // 提交编辑信息
                    const result = await this.$API.trademark.reqUpdateTrademark(
                        this.tmForm
                    );

                    // 判断请求是否成功
                    if (result.code === 200) {
                        // 更新表单数据
                        this.getTrademarkList();
                        // 关闭对话框
                        this.dialog.visible = false;
                    }
                }
            });
        },
        // 删除品牌信息
        deleteTrademark({ id }) {
            // 确认是否确定删除
            this.$confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    // 发送请求删除该商品信息
                    const result = await this.$API.trademark.reqDeleteTrademark(
                        id
                    );

                    if (result.code === 200) {
                        // 判断删除后跳转的页号
                        if (this.form.length == 1) {
                            // 当前页面的记录数等于1，跳转到上一页
                            this.pagination.currentPage -= 1;
                            // 若上方变更后的页号为0，则将页号重置为1
                            if (this.pagination.currentPage < 1) {
                                this.pagination.currentPage = 1;
                            }
                        }

                        // 更新品牌信息
                        this.getTrademarkList();
                        // 提示删除成果信息
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                    }
                })
                .catch(() => {});
        },
        // 图片上传到后台服务器时触发该函数
        handleAvatarSuccess(res, file) {
            // 更新图片url
            this.tmForm.logoUrl = res.data;
        },
        beforeAvatarUpload(file) {
            // 判断图片格式是否符合要求
            const isJPGOrPNG =
                file.type === "image/jpeg" || file.type === "image/png";
            // 判断图片大小是否符合要求
            const isLt500K = file.size / 1024 < 500;

            if (isJPGOrPNG && isLt500K) {
                this.dialog.illegalLogo = false;
            } else {
                // 清空编辑框内容
                Object.keys(this.tmForm).forEach((key) => {
                    this.tmForm[key] = "";
                });
                // 高亮图片格式提示信息
                this.dialog.illegalLogo = true;
                // 停止图片的上传
                return false;
            }
        },
    },
    mounted() {
        this.getTrademarkList();
    },
};
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .illegal_logo {
        color: #f56c6c;
    }
</style>