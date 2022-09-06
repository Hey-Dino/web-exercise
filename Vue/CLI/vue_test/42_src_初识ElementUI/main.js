// 引入Vue
import Vue from "vue"

// 引入App组件
import App from "./App.vue"

// 完全引入
/* import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI); */

// 按需引入
import { Carousel, CarouselItem, Button } from "element-ui"
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Button.name, Button);

// 关闭生产提示
Vue.config.productionTip = false;
// 完全引入配置

new Vue({
    el: "#app",
    render: h => h(App),
})