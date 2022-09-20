<template>
    <div>
        <TypeNav></TypeNav>

        <!--list-content-->
        <div class="main">
            <div class="py-container">
                <Bread
                    :categoryName="searchParams.categoryName"
                    :keyword="searchParams.keyword"
                    :trademark="searchParams.trademark"
                    :props="searchParams.props"
                    @removeCategoryName="removeCategoryName"
                    @removeKeyword="removeKeyword"
                    @removeTrademark="removeTrademark"
                    @removeProp="removeProp"
                ></Bread>
                <Selector
                    @addTrademark="addTrademark"
                    @addProp="addProp"
                ></Selector>
                <Details @changeOrder="changeOrder"></Details>
                <Hotsale></Hotsale>
            </div>
        </div>
    </div>
</template>

<script>
// 引入 TypeNav 模块
import TypeNav from "@/components/TypeNav";
import Bread from "./Bread";
import Selector from "./Selector";
import Details from "./Details";
import Hotsale from "./Hotsale";

export default {
    name: "Search",
    data() {
        return {
            searchParams: {
                category1Id: "",
                category2Id: "",
                category3Id: "",
                categoryName: "手机",
                keyword: "",
                order: "1:desc",
                pageNo: 1,
                pageSize: 10,
                props: [],
                trademark: "",
            },
        };
    },
    // 注册组件
    components: {
        TypeNav,
        Bread,
        Selector,
        Details,
        Hotsale,
    },
    watch: {
        // 监听路由信息的变化
        $route: {
            immediate: true,
            handler(newRoute) {
                // 清空3个categoryId，避免多次搜索时3个categoryId组合出现
                this.removeCategory();
                // 整理参数（使用ES6合并对象）
                Object.assign(
                    this.searchParams,
                    newRoute.query,
                    newRoute.params,
                    newRoute.keyword
                );
                // 发送请求
                this.$store.dispatch(
                    "searchOption/getSearchInfo",
                    this.searchParams
                );
            },
        },
    },
    methods: {
        removeCategory() {
            // 清除 categoryId
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            // 清除 categoryName
            this.searchParams.categoryName = undefined;
        },
        getData() {
            this.$store.dispatch(
                "searchOption/getSearchInfo",
                this.searchParams
            );
        },
        // 用于子组件 Bread 删除 categoryName 的面包屑
        removeCategoryName() {
            this.removeCategory();
            // 路由请求
            this.$router.push({
                name: "search",
                params: {
                    keyword: this.searchParams.keyword,
                },
            });
        },
        // 用于子组件 Bread 删除 keyword 的面包屑时更新内容
        removeKeyword() {
            this.searchParams.keyword = undefined;
            // 路由请求
            this.$router.push({
                name: "search",
                query: this.$route.query,
            });

            // 通过全局事件总线，通知Header组件清空keyword
            this.$bus.$emit("clear");
        },
        // 增加品牌信息
        addTrademark(trademark) {
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            this.getData();
        },
        // 用于子组件 Bread 删除 keyword 的面包屑时更新内容
        removeTrademark() {
            this.searchParams.trademark = undefined;
            this.getData();
        },
        // 增加其他信息
        addProp(attr, attrValue) {
            const prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
            // 判断该信息是否已存在
            if (this.searchParams.props.indexOf(prop) === -1)
                this.searchParams.props.push(prop);

            this.getData();
        },
        // 删除其他信息
        removeProp(index) {
            this.searchParams.props.splice(index, 1);
            this.getData();
        },
        // 修改排序类型
        changeOrder(order) {
            this.searchParams.order = order;
            this.getData();
        },
        // 改变页数
        changePage(page) {
            this.searchParams.pageNo = page;
            this.getData();
        },
    },
    mounted() {
        // 注册事件，根据分页器Pagination的返回页码更新数据
        this.$bus.$on("changePage", this.changePage);
    },
};
</script>

<style>
    .main {
        margin: 10px 0;
    }

    .main .py-container {
        width: 1200px;
        margin: 0 auto;
    }
</style>