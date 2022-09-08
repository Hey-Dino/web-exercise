<template>
    <div class="type-nav">
        <div class="container">
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 下方的mouseleave 使用了事件委派 -->
            <!-- 三级联动 -->
            <div
                class="sort"
                @mouseleave="changeIndex(-1)"
            >
                <div class="all-sort-list2">
                    <div
                        class="item"
                        v-for="(c1, index) in categoryList"
                        :key="c1.categoryId"
                        @click="goSearch"
                    >
                        <h3
                            @mouseenter="changeIndex(index)"
                            :class="{bgChange: currentIndex === index}"
                        >
                            <a
                                :class="{acChange: currentIndex === index}"
                                :data-categoryName="c1.categoryName"
                                :data-category1Id="c1.categoryId"
                            >{{c1.categoryName}}</a>
                        </h3>
                        <div
                            class="item-list clearfix"
                            v-show="currentIndex === index"
                        >
                            <div class="subitem">
                                <dl
                                    class="fore"
                                    v-for="c2 in c1.categoryChild"
                                    :key="c2.categoryId"
                                >
                                    <dt>
                                        <a
                                            :data-categoryName="c2.categoryName"
                                            :data-category2Id="c2.categoryId"
                                        >{{c2.categoryName}}</a>
                                    </dt>
                                    <dd>
                                        <em
                                            v-for="c3 in c2.categoryChild"
                                            :key="c3.categoryId"
                                        >
                                            <a
                                                :data-categoryName="c3.categoryName"
                                                :data-category3Id="c3.categoryId"
                                            >{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入 mapState
import { mapState } from "vuex";
// 引入节流工具 lodash
import throttle from "lodash/throttle";

export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
        };
    },
    methods: {
        /* changeIndex(index) {
            this.currentIndex = index;
        }, */
        // 利用 lodash 的throttle方法实现节流
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 100),
        // 实现 三级路由 跳转
        goSearch(e) {
            // 获取事件触发的对象及其属性集
            const element = e.target;
            const {
                categoryname,
                category1id,
                category2id,
                category3id,
            } = element.dataset;

            // 判断对象是否为可跳转对象
            if (categoryname) {
                const location = { path: "/search" };
                const query = { categoryName: categoryname };

                // 根据categoryId值，定义不同的参数
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }

                location.query = query;
                // 实现编程式路由导航
                this.$router.push(location);
            }
        },
    },
    computed: {
        ...mapState("homeOption", ["categoryList"]),
    },
    mounted() {
        this.$store.dispatch("homeOption/categoryList");
    },
};
</script>

<style scoped>
    .type-nav {
        border-bottom: 2px solid #b1191a;
    }

    .type-nav a {
        cursor: pointer;
    }

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;
    }

    .container .all {
        width: 210px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background-color: #b1191a;
    }

    .container .nav a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
    }

    .container .sort {
        position: absolute;
        left: 0;
        top: 45px;
        z-index: 999;
        width: 210px;
        height: 461px;
        padding: 5px 0;
        box-sizing: border-box;
        background: #c81623;
    }

    .container .sort .all-sort-list2 .item h3 {
        line-height: 30px;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        padding: 0 20px;
        margin: 0;
    }

    /* .container .sort .all-sort-list2 .item h3:hover{
        background: #fff;
    } */

    /* .container .sort .all-sort-list2 .item h3:hover a{
        color: #c81623;
    } */

    .container .sort .all-sort-list2 .item h3 a {
        color: #fff;
        font-size: 14px;
    }

    .container .sort .all-sort-list2 .item .item-list {
        /* display: none; */
        position: absolute;
        width: 734px;
        min-height: 460px;
        background: #f7f7f7;
        left: 210px;
        border: 1px solid #ddd;
        top: 0;
        z-index: 9999 !important;
    }

    .container .sort .all-sort-list2 .item .item-list .subitem {
        float: left;
        width: 650px;
        padding: 0 4px 0 8px;
    }

    .container .sort .all-sort-list2 .item .item-list .subitem dl {
        border-top: 1px solid #eee;
        padding: 6px 0;
        overflow: hidden;
        zoom: 1;
    }

    .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
        border-top: 0;
    }

    .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
        float: left;
        width: 54px;
        line-height: 22px;
        text-align: right;
        padding: 3px 6px 0 0;
        font-weight: 700;
    }

    .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
        float: left;
        width: 415px;
        padding: 3px 0 0;
        overflow: hidden;
    }

    .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
        float: left;
        height: 14px;
        line-height: 14px;
        padding: 0 8px;
        margin-top: 5px;
        border-left: 1px solid #ccc;
    }

    .container .sort .all-sort-list2 .item:hover .item-list {
        display: block;
    }

    /* 控制 a链接 字体颜色变化 */
    .acChange {
        color: #c81623 !important;
    }
    /* 控制 a链接父元素 背景颜色变化 */
    .bgChange {
        background-color: #fff;
    }
</style>