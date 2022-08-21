<template>
    <div
        class="todo-footer"
        v-show="todosTotal"
    >
        <label>
            <input
                type="checkbox"
                v-model="isAll"
            />

        </label>
        <span>
            <span>已完成{{doneTotal}}</span> / 全部{{todosTotal}}
        </span>
        <button
            class="btn btn-danger"
            @click="delAll"
        >清除已完成任务</button>
    </div>
</template>

<script>
export default {
    name: "TodosFooter",
    props: ["todos"],
    computed: {
        todosTotal() {
            return this.todos.length;
        },
        doneTotal() {
            return this.todos.reduce((pre, todo) => {
                return pre + (todo.done ? 1 : 0);
            }, 0);
        },
        isAll: {
            get() {
                return (
                    this.doneTotal === this.todosTotal && this.todosTotal > 0
                );
            },
            set(isCheckAll) {
                this.$emit("handleCheckAll", isCheckAll);
            },
        },
    },
    methods: {
        delAll() {
            if (confirm("是否确定清除已完成任务?")) {
                this.$emit("handleDelChecked");
            }
        },
        checkAll(e) {
            this.$emit("handleCheckAll", e.target.checked);
        },
    },
};
</script>

<style scoped>
    /*footer*/
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>