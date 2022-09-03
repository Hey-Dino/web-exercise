<template>
    <div>
        <ul>
            <li
                v-for="m in messages"
                :key="m.id"
            >
                <!-- 跳转路由并携带params参数，to的字符串写法 -->
                <!-- 模板字符串(``)需要JS解析，:xxx就会把""包裹的内容当作JS解析 -->
                <!-- <router-link :to="`/home/messages/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->

                <!-- 跳转路由并携带params参数，to的对象写法 -->
                <router-link :to="{
                    name: 'detail',     // 使用路由名称
                    params: {           // params 必须会 name 配合使用，否则会出错
                        id: m.id,
                        title: m.title
                    }
                }">
                    {{m.title}}
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Messages",
    data() {
        return {
            messages: [
                { id: "001", title: "message001" },
                { id: "002", title: "message002" },
                { id: "003", title: "message003" },
            ],
        };
    },
};
</script>