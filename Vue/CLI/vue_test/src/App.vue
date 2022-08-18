<template>
    <div>
        <Student
            name="张三"
            sex="男"
            :age="20"
        />
        <hr>
        <!-- 为避免传入的age为String，需将其定为数据绑定样式 -->
        <Student
            name="李四"
            sex="女"
            :age="21"
        />
    </div>
</template>

<script>
import Student from "./components/Student";

export default {
    name: "App",
    components: {
        Student,
    },
};
</script>