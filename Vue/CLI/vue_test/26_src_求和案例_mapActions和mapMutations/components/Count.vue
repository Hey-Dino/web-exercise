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
        <button @click="ADD(addend)">+</button>
        <button @click="REDUCE(addend)">-</button>
        <button @click="addOdd(addend)">当前求和为奇数时再加</button>
        <button @click="addWait(addend)">等一等再加</button>
    </div>
</template>

<script>
// 导入 mapState
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Count",
    data() {
        return {
            addend: 1,
        };
    },
    computed: {
        /* 借助 mapState 生成计算属性，从 state 中取数据。（对象写法） */
        // ...mapState({ sum: "sum", school: "school", subject: "subject" }),
        /* 借助 mapState 生成计算属性，从 state 中取数据。（数组写法） */
        ...mapState(["sum", "school", "subject"]),

        /* 借助 mapGetters 生成计算属性，从 state 中取数据。（对象写法） */
        // ...mapGetters({ bigSum: "bigSum" }),
        /* 借助 mapGetters 生成计算属性，从 state 中取数据。（数组写法） */
        ...mapGetters(["bigSum"]),
    },
    methods: {
        /* 普通写法 */
        /* add() {
            this.$store.commit("ADD", this.addend);
        },
        reduce() {
            this.$store.commit("REDUCE", this.addend);
        }, */
        /* 借助 mapMutations 生成方法，方法会调用commit去联系Mutation（对象写法） */
        // ...mapMutations({ add: "ADD", reduce: "REDUCE" }),       // 在调用方法时需要传参
        /* 借助 mapMutations 生成方法，方法会调用commit去联系Mutation（数组写法） */
        ...mapMutations(["ADD", "REDUCE"]),

        /* 普通写法 */
        /* addWhenSumIsOdd() {
            this.$store.dispatch("addOdd", this.addend);
        },
        addDelay() {
            this.$store.dispatch("addWait", this.addend);
        }, */
        /* 借助 mapActions 生成方法，方法会调用dispatch去联系Actions（对象写法） */
        // ...mapActions({ addWhenSumIsOdd: "addOdd", addDelay: "addWait" }),   // 在调用方法时需要传参
        ...mapActions(["addOdd", "addWait"]),
    },
};
</script>

<style>
    button {
        margin-left: 5px;
    }
</style>