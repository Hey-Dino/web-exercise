// 引入路由组件
/* 
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/

export default [
    // 路由重定向，首次进入页面，跳转到Home页面
    {
        path: '*',
        component: () => import("@/pages/Home"),
        meta: {
            showFooter: true
        }
    },
    // 首页
    {
        path: '/home',
        component: () => import("@/pages/Home"),
        meta: {
            showFooter: true
        }
    },
    // 查询
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import("@/pages/Search"),
        meta: {
            showFooter: true
        }
    },
    // 登录
    {
        path: '/login',
        component: () => import("@/pages/Login"),
        meta: {
            showFooter: false
        }
    },
    // 注册
    {
        path: '/register',
        component: () => import("@/pages/Register"),
        meta: {
            showFooter: false
        }
    },
    // 商品详情
    {
        path: '/detail/:skuid?',
        component: () => import("@/pages/Detail"),
        meta: {
            showFooter: true
        }
    },
    // 商品添加进入购物车成功
    {
        path: '/addToCartSucc',
        component: () => import("@/pages/AddToCartSucc"),
        meta: {
            showFooter: true,
        }
    },
    // 购物车
    {
        path: '/shopcart',
        component: () => import("@/pages/Shopcart"),
        meta: {
            showFooter: true,
        }
    },
    // 订单结算页面
    {
        path: '/trade',
        component: () => import("@/pages/Trade"),
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
        component: () => import("@/pages/Pay"),
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
        component: () => import("@/pages/PaySuccess"),
        meta: {
            showFooter: true,
            needLogin: true,
        },
        // 前往 pages/PaySuccess 查看组件内守卫
    },
    // 个人中心页面
    {
        path: '/center',
        component: () => import("@/pages/Center"),
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
                component: () => import("@/pages/Center/MyOrder"),
                meta: {
                    needLogin: true,
                }
            },
            {
                name: 'groupOrder',
                path: 'groupOrder',
                component: () => import("@/pages/Center/GroupOrder"),
                meta: {
                    needLogin: true,
                }
            }
        ]
    }
]