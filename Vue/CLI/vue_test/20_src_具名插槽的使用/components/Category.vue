<template>
    <div class="category">
        <h3>{{title}}</h3>
        <slot name="center">插槽无内容！！！</slot>
        <slot name="footer">插槽无内容！！！</slot>
    </div>
</template>

<script>
export default {
    name: "Category",
    props: ["title", "listData"],
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