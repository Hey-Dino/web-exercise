<template>
    <li>
        <label>
            <input
                type="checkbox"
                :checked="todo.done"
                @change="checkTodo(todo.id)"
            />
            <span v-show="!todo.isEdit">{{todo.tit}}</span>
            <input
                type="text"
                v-show="todo.isEdit"
                :value="todo.tit"
                ref="editInput"
                @blur.enter="handleBlur(todo.id, $event)"
            />
        </label>
        <button
            class="btn btn-danger"
            @click="delTodo(todo.id)"
        >删除</button>
        <button
            class="btn btn-edit"
            v-show="!todo.isEdit"
            @click="editTodo"
        >编辑</button>
    </li>
</template>

<script>
export default {
    name: "TodosItem",
    data() {
        return {
            isEdit: false,
        };
    },
    props: ["todo"],
    methods: {
        // 全选或取消全选
        checkTodo(id) {
            this.$bus.$emit("handleCheck", id);
        },
        // 删除Todo
        delTodo(id) {
            // 发布消息
            if (confirm("是否删除该条记录？")) this.$bus.$emit("handleDel", id);
        },
        // 编辑Todo
        editTodo() {
            if (!this.todo.hasOwnProperty("isEdit")) {
                this.$set(this.todo, "isEdit", true);
            } else {
                // 这边可能违反不修改的props的原则了
                this.todo.isEdit = true;
            }

            this.$nextTick(function () {
                this.$refs.editInput.focus();
            });
        },
        // 输入框失去焦点，真正处理编辑操作
        handleBlur(id, e) {
            // this.todo.isEdit = false;

            if (!e.target.value.trim()) {
                alert("输入框不能为空！");
            } else {
                this.$bus.$emit("handleEdit", id, e.target.value);
            }
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