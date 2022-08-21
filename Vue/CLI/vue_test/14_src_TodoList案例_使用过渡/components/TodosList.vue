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

    /* 下面为动画配置 */
    .todo-enter {
        transform: translateX(100%);
    }

    .todo-enter-to, .todo-leave {
        transform: translateX(0);
    }
    
    .todo-leave-to {
        transform: translateX(-100%);
    }

    .todo-enter-active, .todo-leave-active {
        transition: all .5s;
    }
</style>