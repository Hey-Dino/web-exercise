## 模板介绍

- 简洁版：https://github.com/PanJiaChen/vue-admin-template
- 加强版：https://github.com/PanJiaChen/vue-admin-template

### 各文件夹及文件介绍

- build文件夹

  - index.js：webpack配置文件

- mock文件夹

  模拟数据时使用，利用 `mock.js` 实现。实际开发中，很少使用

- node_modules

  项目依赖的模块

- public文件夹

  用于存放 **静态资源** ，如静态网页、ico图标。

  在项目打包时，会原封不动地打包到 **dist文件夹**。

- src文件夹

  存放 **源代码** 的位置

  - api文件夹：涉及请求
  - assets文件夹：存放静态资源（大部分时候是共享）。该文件夹在项目打包时，会被编译。
  - component文件夹：放置 非路由 或 全局组件
  - icons文件夹：放置 SVG矢量图
  - layout文件夹：放置 组件 及 混入
  - router文件夹：存放路由信息
  - store文件夹：与vuex相关
  - styles文件夹：与样式相关
  - utils文件夹：存放 axios二次封装文件 及 工具插件
  - views文件夹：存放 路由组件

  - App.vue：根组件

  - main.js：入口文件
  - permission.js：与 导航守卫 有关，路由跳转控制
  - settings.js：项目配置文件

