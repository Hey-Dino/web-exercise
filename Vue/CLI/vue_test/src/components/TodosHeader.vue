<template>
    <div class="todo-header">
        <input
            type="text"
            placeholder="请输入你的任务名称，按回车键确认"
            v-model="content"
            @keyup.enter="add"
        />
    </div>
</template>

<script>
// 部分导入nanoid（生产随机数）
import { nanoid } from "nanoid";

export default {
    name: "TodosHeader",
    data() {
        return {
            content: "",
        };
    },
    methods: {
        add() {
            // 将用户的输入包装成一个对象
            this.addTodo({ id: nanoid(), tit: this.content, done: false });
            // 清空输入框
            this.content = "";
        },
    },
    props: ["addTodo"],
};
</script>

<style scoped>
    /*header*/
    .todo-header input {
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>