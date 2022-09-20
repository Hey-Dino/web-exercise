<template>
    <div class="pagination">
        <button
            @click="prePage"
            :disabled="pageNo <= 1"
        >上一页</button>
        <button
            v-if="startAndEnd.start > 1"
            @click="otherPage(1)"
            :class="{active: pageNo === 1}"
        >1</button>
        <button v-if="startAndEnd.start > 2">···</button>

        <template v-for="page in startAndEnd.end">
            <button
                v-if="page >= startAndEnd.start"
                :key="page"
                @click="otherPage(page)"
                :class="{active: pageNo === page}"
            >{{page}}</button>
        </template>

        <button v-if="startAndEnd.end < totalPages - 1">···</button>
        <button
            v-if="startAndEnd.end < totalPages"
            @click="otherPage(totalPages)"
            :class="{active: pageNo === totalPages}"
        >{{totalPages}}</button>
        <button
            @click="afterPage"
            :disabled="pageNo >= totalPages"
        >下一页</button>

        <button id="total">共 {{total}} 条</button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Pagination",
    data() {
        return {
            continus: 5,
        };
    },
    props: ["pageNo", "total", "totalPages"],
    computed: {
        // ...mapGetters("searchOption", ["pageNo", "total", "totalPages"]),
        startAndEnd() {
            let start = 0,
                end = 0;

            // 在请求的totalPages、pageNo数据仍未返回时，二者均为undefined
            // 此时[continus > totalPages]判断为假，进入else作用域，最终start和end会被定义为NaN
            // v-for的对象为NaN时，系统提示错误：[Vue warn]: Error in render: "RangeError: Invalid array length"
            const { totalPages, pageNo, continus } = this;
            if (continus > totalPages) {
                start = 1;
                end = totalPages;
            } else {
                start = pageNo - parseInt(continus / 2);
                end = pageNo + parseInt(continus / 2);

                if (start < 1) {
                    start = 1;
                    end = continus;
                }
                if (end > totalPages) {
                    end = totalPages;
                    start = totalPages - continus + 1;
                }
            }

            // [|| 0]是为避免初始时，start和end为NaN
            return { start: start || 0, end: end || 0 };
        },
    },
    methods: {
        prePage() {
            this.$bus.$emit("changePage", this.pageNo - 1);
        },
        afterPage() {
            this.$bus.$emit("changePage", this.pageNo + 1);
        },
        otherPage(page) {
            this.$bus.$emit("changePage", page);
        },
    },
};
</script>

<style scoped>
    .pagination {
        text-align: center;
        margin-bottom: 10px;
    }

    .pagination button {
        display: inline-block;
        padding: 0 4px;
        margin: 0 5px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;

        border: 0;
        border-radius: 2px;
        vertical-align: top;
        outline: none;
        color: #606266;
        background-color: #f4f4f5;
        font-size: 13px;
        cursor: pointer;
    }

    .pagination button[disabled] {
        color: #c0c4cc;
        cursor: default;
    }

    .pagination button.active {
        cursor: default;
        background-color: #409eff;
        color: #fff;
    }

    .pagination button#total {
        margin-left: 30px;
    }
</style>