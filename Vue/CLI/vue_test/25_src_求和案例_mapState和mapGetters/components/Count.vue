<template>
    <div>
        <h1>当前求和为：{{sum}}</h1>
        <h2>10倍求和为：{{bigSum}}</h2>
        <h2>我在 {{school}} 学习 {{subject}} </h2>
        <select v-model.number="addend">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">+</button>
        <button @click="reduce">-</button>
        <button @click="addWhenSumIsOdd">当前求和为奇数时再加</button>
        <button @click="addDelay">等一等再加</button>
    </div>
</template>

<script>
// 导入 mapState
import { mapState, mapGetters } from "vuex";

export default {
    name: "Count",
    data() {
        return {
            addend: 2,
        };
    },
    computed: {
        /* 普通写法 */
        /* sum(){
            return this.$store.state.sum;
        },
        school() {
            return this.$store.state.school;
        },
        subject() {
            return this.$store.state.subject;
        }, */
        /* 借助 mapState 生成计算属性，从 state 中取数据。（对象写法） */
        // ...mapState({ sum: "sum", school: "school", subject: "subject" }),
        /* 借助 mapState 生成计算属性，从 state 中取数据。（数组写法） */
        ...mapState(["sum", "school", "subject"]),

        /* 普通写法 */
        /* bigSum() {
            return this.$store.getters.bigSum;
        }, */
        /* 借助 mapGetters 生成计算属性，从 state 中取数据。（对象写法） */
        // ...mapGetters({ bigSum: "bigSum" }),
        /* 借助 mapGetters 生成计算属性，从 state 中取数据。（数组写法） */
        ...mapGetters(["bigSum"]),
    },
    methods: {
        add() {
            this.$store.commit("ADD", this.addend);
        },
        reduce() {
            this.$store.commit("REDUCE", this.addend);
        },
        addWhenSumIsOdd() {
            this.$store.dispatch("addOdd", this.addend);
        },
        addDelay() {
            this.$store.dispatch("addWait", this.addend);
        },
    },
};
</script>

<style>
    button {
        margin-left: 5px;
    }
</style>