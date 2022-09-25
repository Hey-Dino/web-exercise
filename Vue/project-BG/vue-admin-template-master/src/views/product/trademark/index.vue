<template>
    <div>
        <!-- 添加按钮 -->
        <el-button
            type="primary"
            icon="el-icon-plus"
            style="margin-bottom: 10px;"
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
                label="ID   "
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
                        @click="showEditDialog"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        icon="el-icon-close"
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
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="prev, pager, next, jumper,->, total, sizes"
        >
        </el-pagination>

        <!-- 添加、编辑对话框 -->
        <!-- :before-close="dialogBeforeClose" -->
        <el-dialog
            :title="`${diaglogMode == 0 ? '添加' : '编辑'}品牌信息`"
            :visible.sync="dialogVisible"
        >
            <el-form
                style="width: 80%;"
                label-width="85px"
            >
                <el-form-item label="品牌名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO">
                    <el-upload
                        class="avatar-uploader"
                        action="/simply-api/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="imageUrl"
                            :src="imageUrl"
                            class="avatar"
                        >
                        <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                        ></i>
                        <div
                            slot="tip"
                            class="el-upload__tip"
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
                    @click="addTrademark"
                    v-show="diaglogMode != 1"
                >确 定</el-button>
                <!-- 添加编辑按钮 -->
                <el-button
                    type="primary"
                    @click="editTrademark"
                    v-show="diaglogMode == 1"
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
            // 当前页码
            currentPage: 1,
            // 每页记录数
            pageSize: 10,
            // 总记录数
            total: 0,
            // 对话框的显示与隐藏
            dialogVisible: false,
            // 对话框模式，0表示添加，1表示编辑
            diaglogMode: 0,
            // 对话框的图片链接
            imageUrl: "",
            tmForm: {
                
            }
        };
    },
    methods: {
        // 获取品牌信息
        async getTrademarkList() {
            // 解构获取当前页码、每页记录数
            const { currentPage, pageSize } = this;
            // 发送请求获取数据
            const result = await this.$API.trademark.reqGetTrademarkList(
                currentPage,
                pageSize
            );

            if (result.code === 200) {
                this.form = result.data.records;
                this.total = result.data.total;
            }
        },
        // 监听每页记录数的改变
        handleSizeChange(pageSize) {
            // 更新每页记录数
            this.pageSize = pageSize;
            // 更新品牌信息
            this.getTrademarkList();
        },
        // 记录页码的改变
        handleCurrentChange(currentPage) {
            // 更改当前页码
            this.currentPage = currentPage;
            // 更新品牌信息
            this.getTrademarkList();
        },
        // 展示添加框
        showAddDialog() {
            // 切换对话框模式
            this.diaglogMode = 0;
            // 展示对话框
            this.dialogVisible = true;
        },
        // 添加品牌信息
        addTrademark() {
            // 关闭对话框
            this.dialogVisible = false;
        },
        // 展示编辑框
        showEditDialog() {
            // 切换对话框模式
            this.diaglogMode = 1;
            // 展示对话框
            this.dialogVisible = true;
        },
        // 编辑品牌信息
        editTrademark() {
            // 关闭对话框
            this.dialogVisible = false;
        },
        // 关闭对话框
        closeDialog() {
            this.dialogVisible = false;
        },
        // 图片上传到后台服务器时触发该函数
        handleAvatarSuccess(res, file) {
            // 更新图片url
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl);
        },
        beforeAvatarUpload(file) {
            // console.log(file);
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
</style>