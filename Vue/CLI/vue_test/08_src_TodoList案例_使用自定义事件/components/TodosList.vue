<template>
    <ul class="todo-main">
        <TodosItem
            v-for="item in todos"
            :key="item.id"
            :todo="item"
            :handleCheck="handleCheck"
            :handleDel="handleDel"
        ></TodosItem>
    </ul>
</template>

<script>
import TodosItem from "./TodosItem";

export default {
    name: "TodosList",
    components: {
        TodosItem,
    },
    props: ["todos", "handleCheck", "handleDel"],
};
</script>

<style scoped>
    /*main*/
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }

    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
</style>