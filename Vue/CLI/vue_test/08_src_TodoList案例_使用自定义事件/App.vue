<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <TodosHeader @addTodo="addTodo"></TodosHeader>
                <TodosList
                    :todos="todos"
                    :handleCheck="handleCheck"
                    :handleDel="handleDel"
                ></TodosList>
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
        addTodo(todoObj) {
            this.todos.unshift(todoObj);
        },
        handleCheck(id) {
            this.todos.forEach((todo) => {
                if (todo.id === id) todo.done = !todo.done;
            });
        },
        handleDel(id) {
            this.todos.forEach((todo, index) => {
                if (todo.id === id) this.todos.splice(index, 1);
            });
        },
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