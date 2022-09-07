## 初始化项目

1. 使用Vue-CLI脚手架初始化项目

    - 在对于项目目录下打开cmd，输入命令：vue create 项目名
    - 选择 Vue2

    各文件夹作用：

    - node_modules文件夹：项目依赖
    - public文件夹：存放静态资源。
    - src文件夹：代码存放位置
      - assets文件夹：一般存放多个组件共用的 **静态资源** 。
      - components文件夹：一般存放 **非路由组件** 。
      - App.vue：项目唯一的跟组件。
      - main.js：程序的入口文件，也是整个程序中最先执行的文件。
      - babel.config.js：项目的配置文件
      - package.json：记录项目名称、项目的运行方式、项目的依赖
      - package-lock.json：缓存性文件。

    

2. 项目的其他配置

    - 如何让项目运行时，让浏览器自动打开

      - 打开 **package.json** 文件，修改以下配置：

        ```json
        {
            ...
            "scripts": {
                "serve": "vue-cli-service serve --open"
                ...
            }
            ...
        }
        ```

    - 关闭 **eslint** 代码校验功能：

      在项目根路径下文件 **vue.config.js** 添加内容，若没有则手动创建

      ```javascript
      module.exports = {
      	// 关闭eslint
      	lintOnSave: false	
      }
      ```
      
    - 配置别名@提示，在根目录下添加 **jsconfig.json** 文件：

      ```json
      {
          "compilerOptions": {
              "baseUrl": "./",
              "paths": {
                  	"@/*":[
                          "src/*"
                      ]
              },
              "exclude": [
                  "node_modules",
                  "dist"
              ]
          }
      }
      ```

3. 项目路由分析

    - 路由组件：

      Home首页路由组件、Search搜索页路由组件、Login登录页路由组件、Register注册页路由组件

    - 非路由组件

      Header组件：存在于首页、搜索页

      Footer组件：存在于首页、搜索页

4. 路由组件的搭建：

    - Home
    - Search
    - Login
    - Register
    
5. 总结：

    - **路由组件** 与 **非路由组件** 的区别：
      - 路由组件一般存放在 pages或views 文件夹，非路由组件一般存放在 components 文件夹
      - 路由组件一般在 router/index.js 中注册，非路由组件的注册一般使用标签形式。
      - 注册完路由，不管路由组件、非路由组件，身上都有 `$route` 和 `$router`属性。
      
    - route 和 router 的区别：
      - `$route` 一般获取路由信息，如 name、path、query、params等
      - `$router` 一般进行编程式导航进行路由跳转 【push 、replace】
      
    - 路由跳转的方式：
      - 分别是：声明式路由导航 `router-link`，编程式路由导航 `push|replace`。
      - 编程式路由导航 较 声明式路由导航，除了可以进行路由跳转，还可以做一些业务逻辑。
      
      
      
    - 面试题：
    
      - 如何指定`params`参数可传可不传？
    
        答：在配置路由的时候，在占位符的后面加一个问好【?】
    
        `path: '/search/:keyWord?'`
    
      - 当`params`的参数为空串时，如何解决？
    
        答：在进行编程式路由导航时，为 params 添加额外内容
    
        `this.$router.push({ name:'search', params:{keyWord: ''||undefined, }})`
    
      - 路由组件可以使用props传参吗？
    
        答：可以使用props传参，需要配置，配置如下：
    
        - 在 `router/index.js` 需要使用props传参的路由添加一个属性：`props: true`
        - 在需要接收参数的路由组件中接收props，在script中添加：`props: ["xxx"]`。