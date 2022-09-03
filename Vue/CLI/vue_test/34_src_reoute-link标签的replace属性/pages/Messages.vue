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