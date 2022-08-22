<template>
    <div class="container">
        <Category title="games">
            <!-- 作用域插槽必须配合template使用 -->
            <template scope="atguigu">
                <ul>
                    <li
                        v-for="(game,index) in atguigu.games"
                        :key="index"
                    >{{game}}</li>
                </ul>
            </template>
        </Category>
        <Category title="games">
            <!-- 作用域插槽必须配合template使用 -->
            <!-- 使用ES6对对象进行解构 -->
            <template scope="{games}">
                <ol>
                    <li
                        v-for="(game,index) in games"
                        :key="index"
                    >{{game}}</li>
                </ol>
            </template>
        </Category>
        <Category title="games">
            <!-- 作用域插槽必须配合template使用 -->
            <!-- slot-scope为新写法 -->
            <template slot-scope="{games}">
                <h4
                    v-for="(game,index) in games"
                    :key="index"
                >{{game}}</h4>
            </template>
        </Category>
    </div>
</template>

<script>
import Category from "./components/Category";

export default {
    name: "App",
    components: { Category },
};
</script>

// 属性既可以添加在App.vue中，也可以添加在Category.vue；无论是否scoped限制都生效
<style scoped>
    .container {
        display: flex;
        justify-content: space-around;
    }

    .foot {
        display: flex;
        justify-content: space-evenly;
    }

    h4 {
        text-align: center;
    }
</style>