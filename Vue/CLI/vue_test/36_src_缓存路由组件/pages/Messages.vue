<template>
    <div>
        <ul>
            <li
                v-for="m in messages"
                :key="m.id"
            >
                <router-link :to="{
                    name: 'detail',     
                    params: {           
                        id: m.id,
                        title: m.title
                    }
                }">
                    {{m.title}}
                </router-link>
                <button @click="pushShow(m)">push展示</button>
                <button @click="replaceShow(m)">replace展示</button>
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
    methods: {
        pushShow(msg) {
            this.$router.push({
                name: "detail",
                params: {
                    id: msg.id,
                    title: msg.title,
                },
            });
        },
        replaceShow(msg) {
            this.$router.replace({
                name: "detail",
                params: {
                    id: msg.id,
                    title: msg.title,
                },
            });
        },
    },
    beforeDestroy() {
        console.log("Messages组件即将被销毁")
    },
};
</script>