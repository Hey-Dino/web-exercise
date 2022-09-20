// 引入路由组件
// 一级
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
import Center from "@/pages/Center"
// 二级
import MyOrder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"

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
            needLogin: true,
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === "/shopcart" || from.path === "/trade") {
                // 放行
                next();
            } else {
                // 此情况表示：来自shopcart路由，由于未登录而被跳转到login路由
                // 若不做此判断，会导致在上述情况下，用户被卡在login页面
                if (from.path === "/login") {
                    next('/home');
                } else {
                    next(false);
                }
            }
        }
    },
    // 支付页面
    {
        path: '/pay',
        component: Pay,
        meta: {
            showFooter: true,
            needLogin: true,
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === "/trade" || from.path === "/pay") {
                // 放行
                next();
            } else {
                // 退回
                next(false);
            }
        },
    },
    // 支付成功页面
    {
        path: '/paySuccess',
        component: paySuccess,
        meta: {
            showFooter: true,
            needLogin: true,
        },
        // 前往 pages/PaySuccess 查看组件内守卫
    },
    // 个人中心页面
    {
        path: '/center',
        component: Center,
        meta: {
            showFooter: true,
            needLogin: true,
        },
        children: [
            {
                // 路由重定向
                path: '/center',
                redirect: '/center/myOrder',
            },
            {
                name: 'myOrder',
                path: 'myOrder',
                component: MyOrder,
                meta: {
                    needLogin: true,
                }
            },
            {
                name: 'groupOrder',
                path: 'groupOrder',
                component: GroupOrder,
                meta: {
                    needLogin: true,
                }
            }
        ]
    }
]