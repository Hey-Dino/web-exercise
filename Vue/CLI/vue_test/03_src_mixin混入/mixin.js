export const mixin1 = {
    methods: {
        showName() {
            console.log(this.name);
        },
    },
    data() {
        return {
            x: 100,
            y: 100
        }
    },
}

export const mixin2 = {
    mounted() {
        console.log("挂载完成-mixin.js")
    },
}