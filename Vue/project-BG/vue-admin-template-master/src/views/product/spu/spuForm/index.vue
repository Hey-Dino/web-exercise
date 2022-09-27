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
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="spu.spuImageList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
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
                placeholder="还有3项未选择"
                filterable
                value=""
            >
                <el-option
                    v-for="saleAttr in baseSaleAttrList"
                    :key="saleAttr.id"
                    :label="saleAttr.name"
                    :value="saleAttr.id"
                ></el-option>
            </el-select>
            <el-button
                type="primary"
                icon="el-icon-plus"
                style="marginLeft: 10px;"
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
                    <template slot-scope="{row}">
                        <el-tag
                            v-for="saleAttrValue in row.spuSaleAttrValueList"
                            :key="saleAttrValue.id"
                            style="marginRight: 10px;"
                            closable
                        >
                            {{saleAttrValue.saleAttrValueName}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作"
                >
                </el-table-column>
            </el-table>
        </el-form-item>
        <!--  -->
        <el-form-item>
            <el-button type="primary">保存</el-button>
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
                // category3Id: "",
                // description: "",
                // id: "",
                // spuImageList: [],
                // spuName: "",
                // spuSaleAttrList: [],
                // tmId: "",
            },
            // 所有品牌的信息
            trademarkList: [],
            // 所有销售属性的信息
            baseSaleAttrList: [],
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 关闭窗口
        closeBox() {
            this.$emit("changeScene", 0);
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
        // 初始化Spu信息
        initSpuInfo({ id }) {
            // 获取所有品牌信息
            this.getTrademarkAll();
            // 获取所有销售属性信息
            this.getBaseSaleAttrList();
            // 获取Spu信息
            this.getSpuInfo(id);
        },
    },
    mounted() {
        // 注册事件
        this.$bus.$on("initSpuInfo", this.initSpuInfo);
    },
};
</script>

<style>

</style>