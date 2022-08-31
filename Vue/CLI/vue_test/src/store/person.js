import axios from "axios";

// 学生相关配置
export default {
    namespaced: true,
    actions: {
        addPersonWang(context, person) {
            if (person.name.indexOf("王") === 0) {
                console.log(111)
                context.commit("ADDPERSON", person);
            } else {
                alert("请添加王姓同学!");
            }
        },
        getQuotations(context) {
            axios.get("https://api.uixsj.cn/hitokoto/get?type=social").then(
                response => {
                    context.commit("SETQUOTATION", response.data);
                },
                error => {
                    alert(error.message);
                }
            )
        }
    },
    mutations: {
        ADDPERSON(state, person) {
            state.personList.unshift(person);
        },
        SETQUOTATION(state, quotation) {
            state.quotation = quotation;
        }
    },
    state: {
        personList: [
            {
                id: "001",
                name: "Dino"
            }
        ],
        quotation: ''
    },
    getters: {
        firstPersonName(state) {
            return state.personList[0].name;
        }
    }
}