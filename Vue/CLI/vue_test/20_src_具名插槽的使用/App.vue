<template>
    <div class="container">
        <Category
            title="foods"
            :listData="foods"
        >
            <img
                slot="center"
                src="https://s3.ax1x.com/2021/01/16/srJ1q0.jpd"
            >
            <template slot="footer">
                <div class="foot">
                    <a href="javascript:;">更多美食</a>
                </div>
            </template>
        </Category>
        <Category title="games">
            <ul slot="center">
                <li
                    v-for="(game,index) in games"
                    :key="index"
                >{{game}}</li>
            </ul>
            <template slot="footer">
                <div class="foot">
                    <a href="javascript:;">单机游戏</a>
                    <a href="javascript:;">网络游戏</a>
                </div>
            </template>
        </Category>
        <Category title="films">
            <video
                slot="center"
                controls
                src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
            ></video>
            <!-- 
                Vue 2.6以后新添加的写法：v-slot:name，仅限于template使用    
            -->
            <template v-slot:footer>
                <div class="foot">
                    <a href="javascript:;">单机游戏</a>
                    <a href="javascript:;">网络游戏</a>
                </div>
                <h4>欢迎前来观影</h4>
            </template>
        </Category>
    </div>
</template>

<script>
import Category from "./components/Category";

export default {
    name: "App",
    data() {
        return {
            foods: ["火锅", "烧烤", "小龙虾", "牛排"],
            games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
            films: [
                "《教父》",
                "《拆弹专家》",
                "《你好，李焕英》",
                "《尚硅谷》",
            ],
        };
    },
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