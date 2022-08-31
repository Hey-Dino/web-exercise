// 求和相关配置
export default {
    namespaced: true,
    actions: {
        addOdd(context, val) {
            if (context.state.sum % 2) {
                context.commit("ADD", val);
            }
        },
        addWait(context, val) {
            if (!this.timer) {
                this.timer = setTimeout(() => {     // settimeout中切勿使用普通函数，否则this指向window
                    context.commit("ADD", val);
                    this.timer = null;
                }, 500);
            }
        }
    },
    mutations: {
        ADD(state, val) {
            state.sum += val;
        },
        REDUCE(state, val) {
            state.sum -= val;
        },
    },
    state: {
        sum: 0,
        school: "CS&S",
        subject: "Vue",
    },
    getters: {
        bigSum(state) {
            return state.sum * 10;
        }
    }
}