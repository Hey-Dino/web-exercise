<template>
    <div>
        <h2 class="other">上述模块的求和值：{{sum}}</h2>
        <h2>学生信息：</h2>
        <input
            type="text"
            v-model="personName"
            placeholder="请输入学生姓名"
        ><button @click="addStudent">添加</button>
        <ul>
            <li
                v-for="p in $store.state.personList"
                :key="p.id"
            >{{p.name}}</li>
        </ul>
    </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
    name: "Person",
    data() {
        return {
            personName: "",
        };
    },
    computed: {
        sum() {
            return this.$store.state.sum;
        }
    },
    methods: {
        addStudent() {
            let stu = { id: nanoid(), name: this.personName };
            this.$store.commit("ADDSTU", stu);

            this.personName = "";
        },
    },
};
</script>

<style>
    .other {
        color: red;
    }
</style>