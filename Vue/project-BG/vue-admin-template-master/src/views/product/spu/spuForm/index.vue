<template>
    <el-form
        :model="spu"
        label-width="80px"
    >
        <!-- Spu名称 -->
        <el-form-item label="SPU名称">
            <el-input
                v-model="spu.spuName"
                placeholder="请输入"
            ></el-input>
        </el-form-item>
        <!-- 品牌名称 -->
        <el-form-item label="品牌">
            <el-select
                placeholder="请选择"
                filterable
                v-model="spu.tmId"
            >
                <el-option
                    v-for="trademark in trademarkList"
                    :key="trademark.id"
                    :label="trademark.tmName"
                    :value="trademark.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <!-- Spu描述 -->
        <el-form-item label="SPU描述">
            <el-input
                rows="4"
                type="textarea"
                placeholder="请输入"
                v-model="spu.description"
            ></el-input>
        </el-form-item>
        <!-- Spu图片集 -->
        <el-form-item>
            <el-upload
                action="/simply-api/admin/product/fileUpload"
                list-type="picture-card"
                :file-list="spu.spuImageList || []"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img
                    width="100%"
                    :src="dialogImageUrl"
                >
            </el-dialog>
        </el-form-item>
        <!-- 销售属性 -->
        <el-form-item label="销售属性">
            <el-select
                filterable
                v-model="selectSaleAttrIdAndName"
                :placeholder="saleAttrSelectTip"
                :disabled="unSelectSaleAttrList.length <= 0"
            >
                <el-option
                    v-for="saleAttr in unSelectSaleAttrList"
                    :key="saleAttr.id"
                    :label="saleAttr.name"
                    :value="`${saleAttr.id}:${saleAttr.name}`"
                ></el-option>
            </el-select>
            <el-button
                type="primary"
                icon="el-icon-plus"
                style="marginLeft: 10px;"
                :disabled="selectSaleAttrIdAndName == ''"
                @click="addSaleAttr"
            >添加销售属性</el-button>
            <el-table
                :border="true"
                :data="spu.spuSaleAttrList"
                style="width: 100%;marginTop: 10px;"
            >
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="80px"
                >
                </el-table-column>
                <el-table-column
                    prop="saleAttrName"
                    label="属性名"
                >
                </el-table-column>
                <el-table-column label="属性值名称列表">
                    <template slot-scope="{row, $index}">
                        <el-tag
                            v-for="(saleAttrValue, index) in row.spuSaleAttrValueList"
                            :key="saleAttrValue.id"
                            style="marginRight: 10px;"
                            :disable-transitions="false"
                            closable
                            @close="deleteSaleAttrValue(row,index)"
                        >
                            {{saleAttrValue.saleAttrValueName}}
                        </el-tag>
                        <!-- keyup不直接调用addSaleAttrValue，是为避免触发失焦事件 -->
                        <el-input
                            class="input-new-tag"
                            v-if="row.inputVisible"
                            v-model="row.inputValue"
                            :ref="$index"
                            size="small"
                            @keyup.enter.native="$event.target.blur()"
                            @blur="addSaleAttrValue(row, $index)"
                        ></el-input>
                        <el-button
                            v-else
                            class="button-new-tag"
                            size="small"
                            @click="showInput(row, $index)"
                            icon="el-icon-plus"
                        >添加</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row, $index}">
                        <el-popconfirm
                            :title="`是否删除“${row.saleAttrName}”？`"
                            confirmButtonText="好的"
                            cancelButtonText="不用了"
                            icon="el-icon-info"
                            icon-color="red"
                            @onConfirm="deleteSaleAttr($index)"
                        >
                            <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-close"
                                slot="reference"
                            >删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <!--  -->
        <el-form-item>
            <el-button
                type="primary"
                @click="addOrUpdateSpu"
            >保存</el-button>
            <el-button @click="closeBox()">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "SpuForm",
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            // 与表单有关的数据
            spu: {
                category3Id: "",
                description: "",
                id: "",
                spuImageList: [],
                spuName: "",
                spuSaleAttrList: [],
                tmId: "",
            },
            // 所有品牌的信息
            trademarkList: [],
            // 所有销售属性的信息
            baseSaleAttrList: [],
            // 绑定添加时所选择的销售属性的ID和名称
            selectSaleAttrIdAndName: "",
        };
    },
    methods: {
        // 照片墙旧照片移除时的回调
        handleRemove(file, fileList) {
            // fileList为删除后的图片集
            this.spu.spuImageList = fileList;
        },
        // 照片墙新增的照片上传成功时的回调
        handleSuccess(response, file, fileList) {
            this.spu.spuImageList.push(file);
        },
        // 照片墙图片预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 关闭窗口
        closeBox() {
            /* 清理数据 */
            /* 
                Object.assign: ES6中新增的方法，可以合并对象
                组件实例this._data，可以操作data当中的响应式数据
                this.$option可以获取配置对象，配置对象的data函数执行后，返回的响应式数据为空
            */
            Object.assign(this._data, this.$options.data());
            // 通知父组件切换窗口
            this.$emit("changeScene", { scene: 0, flag: 1 });
        },
        // 获取所有品牌的信息
        async getTrademarkAll() {
            const result = await this.$API.trademark.reqGetTrademarkAll();

            if (result.code === 200) {
                this.trademarkList = result.data;
            }
        },
        // 获取销售属性
        async getBaseSaleAttrList() {
            const result = await this.$API.spu.reqGetBaseSaleAttrList();

            if (result.code === 200) {
                this.baseSaleAttrList = result.data;
            }
        },
        // 获取该Spu的信息
        async getSpuInfo(spuId) {
            const spuResult = await this.$API.spu.reqGetSpuById(spuId);
            if (spuResult.code === 200) {
                this.spu = spuResult.data;

                // 发送请求，获取该Spu的图片集
                const imgResult = await this.$API.spu.reqGetSpuImageList(
                    this.spu.id
                );
                if (imgResult.code === 200) {
                    // 为满足upload组件的file-list属性，对于照片集元素的属性名称的特殊要求（图片名称为name，地址为rul）
                    imgResult.data.forEach((item) => {
                        item.name = item.imgName;
                        item.url = item.imgUrl;
                    });
                    this.spu.spuImageList = imgResult.data || [];
                }
            }
        },
        // 初始化编辑Spu的信息
        initEditInfo({ id }) {
            // 获取所有品牌信息
            this.getTrademarkAll();
            // 获取所有销售属性信息
            this.getBaseSaleAttrList();
            // 获取Spu信息
            this.getSpuInfo(id);
        },
        // 添加销售属性
        addSaleAttr() {
            // 分离属性ID和属性名称
            const [
                baseSaleAttrid,
                saleAttrName,
            ] = this.selectSaleAttrIdAndName.split(":");
            // 将该属性加入Spu
            this.spu.spuSaleAttrList.push({
                baseSaleAttrid,
                id: "",
                saleAttrName,
                spuId: this.spu.id,
                spuSaleAttrList: [],
            });
            // 清空select选择框数据
            this.selectSaleAttrIdAndName = "";
        },
        // 删除销售属性
        deleteSaleAttr($index) {
            this.spu.spuSaleAttrList.splice($index, 1);
        },
        // 展示属性值添加输入框
        showInput(row, $index) {
            // 为row添加动态监听的属性：inputVisiable和inputValue
            this.$set(row, "inputVisible", true); // 设置为true，是为了显示输入框，与下方的聚焦操作做配合
            this.$set(row, "inputValue", "");
            // 聚焦输入框
            this.$nextTick((_) => {
                this.$refs[$index].focus();
            });
        },
        // 添加销售属性值
        addSaleAttrValue(row, $index) {
            // 提取数据
            const { baseSaleAttrId, inputValue, saleAttrName, spuId } = row;
            /* 鉴定数据是否为空 */
            if (inputValue.trim().length == "") {
                // 发送提示信息
                this.$message({
                    message: "属性值不能为空！",
                    type: "warning",
                });
                // 清空输入框内容并聚焦
                row.inputValue = "";

                return;
            }
            // 添加模式下，spuSqlAttrValueList初始是不存在的，无需判断是否重复。
            if (row.spuSaleAttrValueList == undefined) {
                this.$set(row, "spuSaleAttrValueList", []);
            } else {
                // 遍历Spu的属性值列表，判断新添加的属性值是否已经存在
                const isRepeat = row.spuSaleAttrValueList.some((item) => {
                    return item.saleAttrValueName == inputValue;
                });
                if (isRepeat) {
                    // 发送提示信息
                    return this.$message({
                        message: "属性值不能重复！",
                        type: "warning",
                    });
                }
            }

            row.spuSaleAttrValueList.push({
                baseSaleAttrId,
                id: undefined,
                isChecked: undefined,
                saleAttrName,
                saleAttrValueName: inputValue,
                spuId,
            });
            // 隐藏属性值输入框并置空其内容
            row.inputVisible = false;
            row.inputValue = "";
        },
        // 删除销售属性值
        deleteSaleAttrValue(row, index) {
            row.spuSaleAttrValueList.splice(index, 1);
        },
        // 新增或保存Spu信息
        async addOrUpdateSpu() {
            // 整理数据
            this.spu.spuImageList.forEach((item) => {
                item.imgName = item.name;

                // 如果是新增的图片，实际的Url地址在Reponse中的data，而非以blob开头的url地址
                if (item.response) {
                    item.imgUrl = item.response.data;
                    // 删除请求时无需携带的数据
                    delete item.response;
                    delete item.raw;
                    delete item.size;
                    delete item.status;
                    delete item.uid;
                    delete item.percentage;
                } else {
                    item.imgUrl = item.url;
                }
            });

            const result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
            if (result.code === 200) {
                this.$message({
                    message: "保存Spu信息成功！",
                    type: "success",
                });
                // 通知父组件切换窗口（scene表示切换的目标窗口，flag表示由编辑(1)还是添加(0)窗口进行切换）
                this.$emit("changeScene", {
                    scene: 0,
                    flag: this.spu.id ? 1 : 0,
                });
                // 清理数据
                Object.assign(this._data, this.$options.data());
            }
        },
        // 初始化新增Spu的信息
        initAddInfo(category3Id) {
            // 获取所有品牌信息
            this.getTrademarkAll();
            // 获取所有销售属性信息
            this.getBaseSaleAttrList();
            // 设置三级分类的ID
            this.spu.category3Id = category3Id;
        },
    },
    computed: {
        // 过滤获得由未选择的销售属性组成的列表
        unSelectSaleAttrList() {
            return this.baseSaleAttrList.filter((item1) => {
                // 判断item1（源销售属性列表中的单个销售属性）是否已经在Spu [已有销售属性] 中出现
                return this.spu.spuSaleAttrList.every((item2) => {
                    // 销售属性名相同，则说明已出现
                    if (item1.name == item2.saleAttrName) {
                        return false;
                    } else {
                        return true;
                    }
                });
            });
        },
        // 销售属性选择框提示语
        saleAttrSelectTip() {
            const length = this.unSelectSaleAttrList.length;

            return length > 0 ? `还有${length}项可供选择` : "无选项可供选择";
        },
    },
    mounted() {
        // 注册事件
        this.$bus.$on("initEditInfo", this.initEditInfo);
        this.$bus.$on("initAddInfo", this.initAddInfo);
    },
};
</script>

<style>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>