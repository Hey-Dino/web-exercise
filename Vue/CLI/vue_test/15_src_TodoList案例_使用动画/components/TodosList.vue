<template>
    <ul class="todo-main">
        <transition-group
            name="todo"
            appear
        >
            <TodosItem
                v-for="item in todos"
                :key="item.id"
                :todo="item"
            ></TodosItem>
        </transition-group>
    </ul>
</template>

<script>
import TodosItem from "./TodosItem";

export default {
    name: "TodosList",
    components: {
        TodosItem,
    },
    props: ["todos"],
};
</script>

<style scoped>
    /*main*/
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
        overflow: hidden;
    }

    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }

    /* 使用动画 */
    @keyframes move {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    .todo-enter-to, .todo-leave {
        animation: move .5s;
    }

    .todo-enter, .todo-leave-to {
        animation: move .5s reverse;
    }
</style>