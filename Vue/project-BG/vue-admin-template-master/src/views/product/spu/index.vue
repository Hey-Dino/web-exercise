<template>
    <div>
        <el-card style="margin: 10px 0">
            <CategorySelect
                @getCategoryId="getCategoryId"
                :couldHandle="scene !== 0"
            ></CategorySelect>
        </el-card>

        <el-card>
            <div v-show="scene == 0">
                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    :disabled="!couldAdd"
                    style="margin: 10px 0"
                    @click="addAttr"
                >添加SPU</el-button>

                <!-- 表格信息 -->
                <el-table
                    style="width: 100%"
                    :data="spuInfoList"
                    :border="true"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80px"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="spuName"
                        label="SPU名称"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="SPU描述"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row}">
                            <hint-button
                                type="success"
                                icon="el-icon-plus"
                                size="mini"
                                title="添加Spu"
                            ></hint-button>
                            <hint-button
                                icon="el-icon-edit"
                                type="warning"
                                size="mini"
                                title="编辑Spu"
                                @click="editAttr(row)"
                            ></hint-button>
                            <hint-button
                                type="info"
                                icon="el-icon-info"
                                size="mini"
                                title="查看该Spu对应的Sku数据"
                            ></hint-button>
                            <el-popconfirm
                                :title="`是否删除“${row.attrName}”?`"
                                @onConfirm="deleteAttr(row)"
                            >
                                <hint-button
                                    icon="el-icon-close"
                                    type="danger"
                                    size="mini"
                                    slot="reference"
                                    title="删除该Spu"
                                ></hint-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="[10, 20, 40]"
                    :page-size="pagination.pageSize"
                    layout="prev, pager, next, jumper,->, sizes, total"
                    :total="pagination.total"
                    style="textAlign: center; marginTop: 10px;"
                >
                </el-pagination>
            </div>
            <SpuForm
                v-show="scene == 1"
                @changeScene="changeScene"
            />
            <SkuForm v-show="scene == 2" />
        </el-card>
    </div>
</template>

<script>
import SpuForm from "./spuForm";
import SkuForm from "./skuForm";

export default {
    name: "Spu",
    data() {
        return {
            // 是否显示表格数据
            scene: 0,
            // 是否能够添加
            couldAdd: false,
            // 分页器相关属性
            pagination: {
                currentPage: 1,
                pageSize: 10,
                total: 21,
            },
            categoryId: {
                no1: "",
                no2: "",
                no3: "",
            },
            spuInfoList: [],
        };
    },
    components: { SpuForm, SkuForm },
    methods: {
        // 获取各级分类的ID
        getCategoryId(id, level) {
            switch (level) {
                case 1:
                    this.categoryId.no1 = id;
                    // 清空二级分类、三级分类的ID
                    this.categoryId.no2 = "";
                    this.categoryId.no3 = "";
                    break;
                case 2:
                    this.categoryId.no2 = id;
                    // 清除三级分类的ID
                    this.categoryId.no3 = "";
                    break;
                case 3:
                    this.categoryId.no3 = id;
                    this.getSpuInfoList();
                    break;
            }
        },
        // 获取SPU列表
        async getSpuInfoList() {
            const result = await this.$API.spu.reqGetSpuList(
                this.pagination.currentPage,
                this.pagination.pageSize,
                this.categoryId.no3
            );

            if (result.code === 200) {
                // 更新数据
                this.pagination.total = result.data.total;
                this.spuInfoList = result.data.records;
                // 启用添加按钮
                this.couldAdd = true;
            }
        },
        addAttr() {
            this.scene = 1;
        },
        editAttr(row) {
            this.$bus.$emit("initSpuInfo", row);
            // 切换窗口
            this.scene = 1;
        },
        // 监听每页记录数变化
        handleSizeChange(value) {
            this.pagination.pageSize = value;
            // 更新数据
            this.getSpuInfoList();
        },
        // 监听页号的变化
        handleCurrentChange(value) {
            this.pagination.currentPage = value;
            // 更新数据
            this.getSpuInfoList();
        },
        // 修改窗口
        changeScene(scene) {
            this.scene = scene;
        },
    },
};
</script>