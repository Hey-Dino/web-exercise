<template>
    <div>
        <h2 class="other">上述模块的求和值：{{sum}}</h2>
        <h2>学生信息：</h2>
        <input
            type="text"
            v-model="personName"
            placeholder="请输入学生姓名"
        >
        <button @click="addPerson">添加</button>
        <button @click="addPersonWang">添加王姓学生</button>
        <ul>
            <li
                v-for="p in personList"
                :key="p.id"
            >{{p.name}}</li>
        </ul>
        <h3>第一个学生的姓名：{{firstPersonName}}</h3>
        <br>
        <button @click="getQuotations">随机生成语录</button>
        <h3 v-show="quotation">{{quotation}}</h3>
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
            return this.$store.state.countOption.sum;
        },
        personList() {
            return this.$store.state.personOption.personList;
        },
        firstPersonName() {
            return this.$store.getters["personOption/firstPersonName"];
        },
        quotation() {
            return this.$store.state.personOption.quotation;
        },
    },
    methods: {
        addPerson() {
            let person = { id: nanoid(), name: this.personName };
            this.$store.commit("personOption/ADDPERSON", person);

            this.personName = "";
        },
        addPersonWang() {
            let person = { id: nanoid(), name: this.personName };
            this.$store.dispatch("personOption/addPersonWang", person);

            this.personName = "";
        },
        getQuotations() {
            this.$store.dispatch("personOption/getQuotations");
        },
    },
    mounted() {
        console.log(this.$store.state.personOption);
    },
};
</script>

<style>
    .other {
        color: red;
    }
</style>