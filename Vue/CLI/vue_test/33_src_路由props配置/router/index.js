// 该文件用于配置整个应用的路由
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About"
import Home from "../pages/Home"
import News from "../pages/News"
import Messages from "../pages/Messages"
import Detail from "../pages/Detail"

// 创建并暴露路由
export default new VueRouter({
    routes: [
        {
            path: "/about",
            component: About,
        },
        {
            path: "/home",
            component: Home,
            children: [
                {
                    path: "news",
                    component: News
                },
                {
                    path: "messages",
                    component: Messages,
                    children: [
                        {
                            name: "detail",     
                            path: "detail/:id/:title",
                            component: Detail,

                            // 第一种写法，props值为对象，该方法传回的死值
                            /* props: {
                                id: '001',
                                title: 'Hello, Vue!'
                            } */

                            // 第二种写法，props值为布尔值true，该方法只支持【params传参】
                            // props: true

                            // 第三种写法，props值为函数，该方法可以获取到一个参数【$route】
                            props: function ({ query, params }) {
                                return {
                                    id: query.id || params.id,
                                    title: query.title || params.title
                                }
                            }
                        }
                    ]
                }
            ]
        },
    ]
});