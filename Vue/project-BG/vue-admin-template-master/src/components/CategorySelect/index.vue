<template>
    <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
    >
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
            <el-select
                v-model="category1Id"
                placeholder="请选择"
                @change="select1Handler"
                :disabled="couldHandle"
            >
                <el-option
                    v-for="category in form.category1List"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类">
            <el-select
                v-model="category2Id"
                placeholder="请选择"
                @change="select2Handler"
                :disabled="couldHandle"
            >
                <el-option
                    v-for="category in form.category2List"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <!-- 三级分类 -->
        <el-form-item label="三级分类">
            <el-select
                v-model="category3Id"
                placeholder="请选择"
                @change="select3Handler"
                :disabled="couldHandle"
            >
                <el-option
                    v-for="category in form.category3List"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                ></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "CategorySelect",
    props: ["couldHandle"],
    data() {
        return {
            // 一级分类的ID
            category1Id: "",
            // 二级分类的ID
            category2Id: "",
            // 三级分类的ID
            category3Id: "",
            // 各级分类数据
            form: {
                category1List: [],
                category2List: [],
                category3List: [],
            },
        };
    },
    methods: {
        // 获取一级分类的数据
        async getCategory1List() {
            const result = await this.$API.attr.reqGetCategory1List();

            if (result.code === 200) {
                this.form.category1List = result.data;
            }
        },
        // 第一个选择器(一级分类)的handler
        async select1Handler() {
            // 清空第二、第三选择器的options列表和id选择，避免旧数据的影响
            this.form.category2List = [];
            this.form.category3List = [];
            this.category2Id = "";
            this.category3Id = "";

            // 重新获取二级分类数据
            const result = await this.$API.attr.reqGetCategory2List(
                this.category1Id
            );

            if (result.code === 200) {
                // 通知父组件更新一级分类ID
                this.$emit("getCategoryId", this.category1Id, 1);
                // 更新二级分类列表数据
                this.form.category2List = result.data;
            }
        },
        // 第二个选择器(二级分类)的handler
        async select2Handler() {
            // 清空第三选择器的options列表和id选择，避免旧数据的影响
            this.form.category3List = [];
            this.category3Id = "";

            // 重新获取三级分类数据
            const result = await this.$API.attr.reqGetCategory3List(
                this.category2Id
            );

            if (result.code === 200) {
                // 通知父组件更新二级分类ID
                this.$emit("getCategoryId", this.category2Id, 2);
                // 更新三级分类列表数据
                this.form.category3List = result.data;
            }
        },
        // 第三个选择器(三级分类)的handler
        select3Handler() {
            // 通知父组件更新一级分类ID
            this.$emit("getCategoryId", this.category3Id, 3);
        },
    },
    mounted() {
        this.getCategory1List();
    },
};
</script>

<style>

</style>