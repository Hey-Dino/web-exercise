// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddToCartSucc from "@/pages/AddToCartSucc"
import Shopcart from "@/pages/Shopcart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import paySuccess from "@/pages/PaySuccess"

export default [
    // 路由重定向，首次进入页面，跳转到Home页面
    {
        path: '*',
        component: Home,
        meta: {
            showFooter: true
        }
    },
    // 首页
    {
        path: '/home',
        component: Home,
        meta: {
            showFooter: true
        }
    },
    // 查询
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: {
            showFooter: true
        }
    },
    // 登录
    {
        path: '/login',
        component: Login,
        meta: {
            showFooter: false
        }
    },
    // 注册
    {
        path: '/register',
        component: Register,
        meta: {
            showFooter: false
        }
    },
    // 商品详情
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: {
            showFooter: true
        }
    },
    // 商品添加进入购物车成功
    {
        path: '/addToCartSucc',
        component: AddToCartSucc,
        meta: {
            showFooter: true,
        }
    },
    // 购物车
    {
        path: '/shopcart',
        component: Shopcart,
        meta: {
            showFooter: true,
        }
    },
    // 订单结算页面
    {
        path: '/trade',
        component: Trade,
        meta: {
            showFooter: true,
        }
    },
    // 支付页面
    {
        path: '/pay',
        component: Pay,
        meta: {
            showFooter: true,
        }
    },
    // 支付成功页面
    {
        path: '/paySuccess',
        component: paySuccess,
        meta: {
            showFooter: true,
        }
    }
]