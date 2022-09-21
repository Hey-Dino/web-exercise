<template>
    <el-container>
        <el-header>文章列表管理</el-header>
        <el-main>
            <el-select
                v-model="value"
                placeholder="请选择"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-table
                border
                :span="8"
            >
                <el-table-column
                    fixed
                    prop="date"
                    label="文章标题"
                    :span="4"
                />
                <el-table-column
                    prop="name"
                    label="分类"
                    :span="1"
                />
                <el-table-column
                    prop="name"
                    label="发表时间"
                    :span="1"
                />
                <el-table-column
                    prop="name"
                    label="状态"
                    :span="1"
                />
                <el-table-column
                    fixed="right"
                    label="操作"
                    :span="1"
                >
                    <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row)"
                            type="text"
                            size="small"
                        >删除</el-button>
                        <el-button
                            type="text"
                            size="small"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "ArticleList",
    data() {
        return {
            selectOption: 1,
            options: [
                {
                    value: "1",
                    label: "所有状态",
                },
                {
                    value: "2",
                    label: "已发布",
                },
                {
                    value: "3",
                    label: "草稿",
                },
            ],
            value: "1",
        };
    },
};
</script>

<style scoped>
    .el-container {
        background-color: #fff;
    }

    .el-header {
        text-align-last: left;
        line-height: 60px !important;
        border-bottom: 1px solid #f6f6f6;
    }

    .el-main {
        line-height: 30px;
    }

    .el-select {
        float: left;
        margin-bottom: 10px;
    }
</style>