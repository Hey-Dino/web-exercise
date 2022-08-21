<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <TodosHeader @addTodo="addTodo"></TodosHeader>
                <TodosList :todos="todos"></TodosList>
                <TodosFooter
                    :todos="todos"
                    @handleCheckAll="handleCheckAll"
                    @handleDelChecked="handleDelChecked"
                ></TodosFooter>
            </div>
        </div>
    </div>
</template>

<script>
import pubsub from "pubsub-js";

import TodosHeader from "./components/TodosHeader";
import TodosList from "./components/TodosList";
import TodosFooter from "./components/TodosFooter";

export default {
    name: "App",
    data() {
        return {
            // 避免初始TodoList为空时，控制台报错
            todos: JSON.parse(localStorage.getItem("TodoList")) || [],
        };
    },
    methods: {
        // 响应header组件的回调
        addTodo(todoObj) {
            this.todos.unshift(todoObj);
        },
        // 响应Item组件的回调
        handleCheck(id) {
            this.todos.forEach((todo) => {
                if (todo.id === id) {
                    todo.done = !todo.done;
                    return;
                }
            });
        },
        handleDel(id) {
            this.todos.forEach((todo, index) => {
                if (todo.id === id) this.todos.splice(index, 1);
            });
        },
        handleEdit(id, value) {
            this.todos.forEach((todo) => {
                if (todo.id === id) {
                    todo.isEdit = false;
                    todo.tit = value;
                    return;
                }
            });
        },
        // 响应Footer组件的回调
        handleCheckAll(isCheckAll) {
            this.todos.forEach((todo) => (todo.done = isCheckAll));
        },
        handleDelChecked() {
            this.todos = this.todos.filter((todo) => !todo.done);
        },
    },
    // 注册组件
    components: {
        TodosHeader,
        TodosList,
        TodosFooter,
    },
    // 监听todos的改变，将更新后的todos同步到 LocalStorage
    watch: {
        todos: {
            // 不添加深度监视的话，无法监视到done的变化
            deep: true,
            handler(newVal) {
                localStorage.setItem("TodoList", JSON.stringify(newVal));
            },
        },
    },
    // 利用全局事件总线设置自定义事件
    mounted() {
        this.$bus.$on("handleCheck", this.handleCheck);
        this.$bus.$on("handleDel", this.handleDel);
        this.$bus.$on("handleEdit", this.handleEdit);
    },
    beforeDestroy() {
        this.$bus.$off("handleCheck");
        this.$bus.$off("handleDel");
        this.$bus.$off("handleEdit");
    },
};
</script>

<style>
    /*base*/
    body {
        background: #fff;
    }

    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-danger:hover {
        color: #fff;
        background-color: #bd362f;
    }

    .btn-edit {
        color: #fff;
        background-color: skyblue;
        border: 1px solid #6bb6d4;
        margin-right: 5px;
    }

    .btn-edit:hover{
        background-color: #6bb6d4;
    }

    .btn:focus {
        outline: none;
    }


    /*app*/
    .todo-container {
        width: 600px;
        margin: 0 auto;
    }

    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>