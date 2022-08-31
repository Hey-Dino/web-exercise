<template>
    <div>
        <h1>当前求和为：{{$store.state.sum}}</h1>
        <h2>10倍求和为：{{$store.getters.bigSum}}</h2>
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
export default {
    name: "Count",
    data() {
        return {
            addend: 2,
        };
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