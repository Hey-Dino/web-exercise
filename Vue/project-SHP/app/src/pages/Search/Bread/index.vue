<template>
    <div class="bread">
        <ul class="fl sui-breadcrumb">
            <li>
                <a href="#">全部结果</a>
            </li>
        </ul>
        <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li
                class="with-x"
                v-if="categoryName"
            >{{categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li
                class="with-x"
                v-if="keyword"
            >{{keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌名的面包屑 -->
            <li
                class="with-x"
                v-if="trademark"
            >{{trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 其他属性面包屑 -->
            <li
                class="with-x"
                v-for="(prop, index) in props"
                :key="index"
            >{{prop.split(":")[1]}}<i @click="removeProp(index)">×</i></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Bread",
    props: ["categoryName", "keyword", "trademark", "props"],
    methods: {
        removeCategoryName() {
            this.$emit("removeCategoryName");
        },
        removeKeyword() {
            this.$emit("removeKeyword");
        },
        removeTrademark() {
            this.$emit("removeTrademark");
        },
        removeProp(index) {
            this.$emit("removeProp", index);
        },
    },
};
</script>

<style scoped>
    .bread {
        margin-bottom: 5px;
        overflow: hidden;
    }

    .bread .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
    }

    .bread .sui-breadcrumb li {
        display: inline-block;
        line-height: 18px;
    }

    .bread .sui-breadcrumb li a {
        color: #666;
        text-decoration: none;
    }

    .bread .sui-breadcrumb li a:hover {
        color: #4cb9fc;
    }

    .bread .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
    }

    .bread .sui-tag .with-x {
        font-size: 12px;
        margin: 0 5px 5px 0;
        display: inline-block;
        overflow: hidden;
        color: #000;
        background: #f7f7f7;
        padding: 0 7px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #dedede;
        white-space: nowrap;
        transition: color 400ms;
        cursor: pointer;
    }

    .bread .sui-tag .with-x i {
        margin-left: 10px;
        cursor: pointer;
        font: 400 14px tahoma;
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

    .bread .sui-tag .with-x:hover {
        color: #28a3ef;
    }

</style>