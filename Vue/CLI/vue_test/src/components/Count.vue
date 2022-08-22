<template>
    <div>
        <h1>当前求和为：{{sum}}</h1>
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
            sum: 0,
            addend: 2,
        };
    },
    methods: {
        add() {
            console.log(111);
            this.sum += this.addend;
        },
        reduce() {
            this.sum -= this.addend;
        },
        addWhenSumIsOdd() {
            if (this.sum % 2 !== 0) {
                this.add();
            }
        },
        addDelay() {
            // 判断是否已经开启定时器，避免重复
            if (!this.timer) {
                this.timer = setTimeout(() => {
                    this.add();
                    this.timer = null;
                }, 500);
            }
        },
    },
};
</script>

<style>
    button {
        margin-left: 5px;
    }
</style>