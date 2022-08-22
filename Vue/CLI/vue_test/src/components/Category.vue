<template>
    <div class="category">
        <h3>{{title}}</h3>
        <!-- 作用域插槽，给插槽使用者传值 -->
        <slot :games="games">插槽无内容！！！</slot>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
        };
    },
    props: ["title"],
};
</script>

<style>
    .category {
        width: 200px;
        height: 300px;
        background:skyblue;
    }

    h3 {
        text-align: center;
        background-color: orange;
    }

    img, video {
        width: 100%;
    }
</style>