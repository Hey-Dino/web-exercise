/* 管理商品属性 */
<template>
    <div>
        <el-card style="margin: 10px 0">
            <CategorySelect
                @getCategoryId="getCategoryId"
                :couldHandle="!isShowTable"
            ></CategorySelect>
        </el-card>

        <el-card>
            <div v-show="isShowTable">
                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    :disabled="!couldAdd"
                    style="margin: 10px 0"
                    @click="addAttr"
                >添加属性</el-button>
                <!-- 表格信息 -->
                <el-table
                    :data="attrInfoList"
                    style="width: 100%"
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
                        prop="attrName"
                        label="属性名称"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="attrValueList"
                        label="属性值列表"
                        width="600px"
                    >
                        <template slot-scope="{row}">
                            <el-tag
                                v-for="attrValue in row.attrValueList"
                                :key="attrValue.id"
                                type="success"
                                style="margin-right: 10px;"
                            >{{attrValue.valueName}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row}">
                            <el-button
                                icon="el-icon-edit"
                                type="primary"
                                size="mini"
                                @click="editAttr(row)"
                            >编辑</el-button>
                            <el-popconfirm
                                :title="`是否删除“${row.attrName}”?`"
                                @onConfirm="deleteAttr(row)"
                                style="margin-left: 10px;"
                            >
                                <el-button
                                    icon="el-icon-close"
                                    type="warning"
                                    size="mini"
                                    slot="reference"
                                >删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-show="!isShowTable">
                <!-- form -->
                <el-form
                    :inline="true"
                    ref="form"
                >
                    <el-form-item label="属性名">
                        <el-input v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <!-- button -->
                <div style="margin-bottom: 20px;">
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        :disabled="!attrInfo.attrName"
                        @click="addAttrValue"
                    >添加属性值</el-button>
                    <el-button @click="closeAddOrEditBox">取消</el-button>
                </div>
                <!-- table -->
                <el-table
                    :data="attrInfo.attrValueList"
                    :border="true"
                    style="width: 100%; margin-bottom: 20px;"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80px"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column label="属性值名称">
                        <template slot-scope="{row, $index}">
                            <el-input
                                v-model="row.valueName"
                                placeholder="请输入属性值"
                                size="mini"
                                v-show="row.flag"
                                @blur="toLook(row)"
                                @keyup.native.enter="toLook(row)"
                                :ref="$index"
                            ></el-input>
                            <span
                                style="display:block;padding:0 15px;"
                                v-show="!row.flag"
                                @click="toEdit(row, $index)"
                            >{{row.valueName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <el-popconfirm
                                :title="`确定删除${row.valueName}？`"
                                @onConfirm="deleteAttrValue($index)"
                            >
                                <!-- el-button需要配置[slot="reference"]才能与el-popconfirm配合使用 -->
                                <el-button
                                    type="warning"
                                    icon="el-icon-close"
                                    size="mini"
                                    slot="reference"
                                >删除</el-button>
                            </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>
                <!-- buttons -->
                <el-button
                    type="primary"
                    :disabled="!attrInfo.attrName"
                    @click="addOrUpdateAttr"
                >保存</el-button>
                <el-button @click="closeAddOrEditBox">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
// 从 lodash 中引入深拷贝函数
import cloneDeep from "lodash/cloneDeep";

export default {
    name: "Attr",
    data() {
        return {
            // 属性信息列表
            attrInfoList: [],
            // 控制添加按钮是否禁用
            couldAdd: false,
            // 控制table的显示与隐藏
            isShowTable: true,
            // 用于 添加|编辑 时存储属性信息
            attrInfo: {
                attrName: "", // 属性名
                attrValueList: [], // 属性值列表
                categoryId: "", // 三级分类的ID
                categoryLevel: 3, // 系统区分是哪一级ID
            },
            // 存储各级分类ID
            categoryId: {
                no1: "",
                no2: "",
                no3: "",
            },
        };
    },
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
                    this.getAttrInfoList();
                    break;
            }
        },
        // 获取属性信息列表
        async getAttrInfoList(data) {
            // 解构获取各级分类的ID
            const { no1, no2, no3 } = this.categoryId;
            const result = await this.$API.attr.reqGetAttrInfoList({
                category1Id: no1,
                category2Id: no2,
                category3Id: no3,
            });

            if (result.code === 200) {
                this.attrInfoList = result.data;
                // 启用添加按钮
                this.couldAdd = true;
            }
        },
        // 添加属性（属性包含属性名、属性值）
        addAttr() {
            // 关闭数据展示框
            this.isShowTable = false;
            // 清空 添加|编辑框 的原内容
            this.attrInfo = {
                attrName: "", // 属性名
                attrValueList: [], // 属性值列表
                categoryId: "", // 三级分类的ID
                categoryLevel: 3, // 系统区分是哪一级ID
            };
        },
        // 编辑属性（属性包含属性名、属性值）
        editAttr(attrInfo) {
            // 关闭数据展示框
            this.isShowTable = false;
            // 为 添加|编辑框 补充内容
            // 由于 添加|编辑框 的内容变化不能影响源数据，因而不能采用直接赋值
            // 又因为attrInfo还嵌套着数组，浅拷贝下的数组数据改变时，仍会影响源数据；因而需要采用 深拷贝
            this.attrInfo = cloneDeep(attrInfo);
            // 遍历attrInfo的属性attrValueList，为其每个元素添加属性flag
            this.attrInfo.attrValueList.forEach((item) => {
                // 避免使用直接赋值的方式[item.flag = false;]添加，这样无法实现响应式。而应该使用$set()实现
                this.$set(item, "flag", false);
            });
        },
        // 删除属性（属性包含属性名、属性值）
        async deleteAttr(attrInfo) {
            const result = await this.$API.attr.reqDeleteAttrInfo(attrInfo.id);

            if (result.code === 200) {
                console.log(result);
                this.$message({
                    message: "删除成功！",
                    type: "success",
                });
                // 刷新页面
                this.getAttrInfoList();
            }
        },
        // 关闭 添加|编辑框
        closeAddOrEditBox() {
            this.isShowTable = true;
        },
        // 添加属性值
        addAttrValue() {
            this.attrInfo.attrValueList.push({
                attrId: this.attrInfo.id,
                valueName: "",
                // 控制 查看|编辑模式 的切换
                flag: true,
            });
            // 聚焦输入框
            this.$nextTick(() => {
                // 新添加的属性值是通过push方式进入attrValueList数组的，因而位于数组末尾
                // 又每个编辑模式的input数据是以属性值的索引值作为ref，因而新添加的属性值的ref为[this.attrInfo.attrValueList.length - 1]
                this.$refs[this.attrInfo.attrValueList.length - 1].focus();
            });
        },
        // 删除属性值
        deleteAttrValue($index) {
            this.attrInfo.attrValueList.splice($index, 1);
        },
        // 控制属性值进入[查看模式]
        toLook(row) {
            // 去除属性值前后的空格
            row.valueName = row.valueName.trim();

            // 判断属性值是否为空串
            if (row.valueName) {
                // 遍历数组，避免属性值重复
                const isRepeat = this.attrInfo.attrValueList.some((item) => {
                    // 判断遍历到的对象是否为row自身，
                    if (item != row) {
                        return item.valueName == row.valueName;
                    }
                });

                // 若重复，则不切换为[查看模式]
                if (isRepeat) {
                    this.$notify({
                        message: "属性值“重复”!",
                        type: "warning",
                    });
                    return;
                } else {
                    row.flag = false;
                }
            } else {
                this.$notify({
                    message: "属性值“为空”！",
                    type: "warning",
                });
            }
        },
        // 控制属性值进入[编辑模式]
        toEdit(row, $index) {
            // 显示编辑模式的输入框
            row.flag = true;
            // 聚焦文本框
            // 由于输入框在隐藏状态下是无法定义聚焦的，需要等待DOM更新完成后才执行聚焦
            this.$nextTick(() => {
                this.$refs[$index].focus();
            });
        },
        // 保存 添加|修改 属性
        async addOrUpdateAttr() {
            /* 整理数据 */
            // 去空串及属性flag
            let attrValueList = this.attrInfo.attrValueList.filter((item) => {
                // 判断是否为空串
                if (item.valueName !== "") {
                    // 去除flag属性
                    delete item.flag;

                    return true;
                }
            });
            // 去重
            for (var i = 0; i < attrValueList.length - 1; i++) {
                if (
                    attrValueList[i].valueName == attrValueList[i + 1].valueName
                ) {
                    attrValueList.splice(i, 1);
                    i--;
                }
            }
            this.attrInfo.attrValueList = attrValueList;

            // 发送请求
            const result = await this.$API.attr.reqAddOrUpdateAttrInfo(
                this.attrInfo
            );

            // 请求成功
            if (result.code === 200) {
                // 更新数据
                this.getAttrInfoList();
                // 提示保存成功
                this.$message({
                    message: "属性信息保存成功",
                    type: "success",
                });
                // 隐藏 添加|编辑框，显示数据
                this.isShowTable = true;
            }
        },
    },
};
</script>