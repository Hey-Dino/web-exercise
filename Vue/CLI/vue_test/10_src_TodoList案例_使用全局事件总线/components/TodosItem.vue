<template>
    <li>
        <label>
            <input
                type="checkbox"
                :checked="todo.done"
                @change="checkTodo(todo.id)"
            />
            <!-- 此方法不符合Vue的建议，因为违法规则，修改了props -->
            <!-- <input type="checkbox" v-model="todo.done"/> -->
            <span>{{todo.tit}}</span>
        </label>
        <button
            class="btn btn-danger"
            @click="delTodo(todo.id)"
        >删除</button>
    </li>
</template>

<script>
export default {
    name: "TodosItem",
    props: ["todo"],
    methods: {
        checkTodo(id) {
            this.$bus.$emit("handleCheck", id);
        },
        delTodo(id) {
            if (confirm("是否删除该条记录？")) this.$bus.$emit("handleDel", id);
        },
    },
};
</script>

<style scoped>
    /*item*/
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        float: right;
        display: none;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }

    li:hover {
        background-color: #ddd;
    }

    li:hover button {
        display: block;
    }
</style>