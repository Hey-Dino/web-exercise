## ref属性

- 被用来未给元素或子组件注册引用信息（id的替代者）
- 应用在HTML标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（VC）
- 使用方式
  - 打标识：`<h1 ref="xxx">...</h1>` 或 `<School ref="xxx" />`
  - 获取：`this.$refs.xxx`

## 配置项props

- 传递数据

  - `<Demo name="xxx" :age="xxx">`
- 接收数据

  - 只接受数据：`props:['name', 'age']`
  - 接收数据、限制类型：`props:{name:String, age:Number}`
  - 接收数据、限制类型、限制必要性 or 指定默认值：

    ```javascript
    props:{
    	name:{
    		type: String, 
    		required: true
    	},
    	age:{
    		type: Number, 
    		default:"男"
    	}
    }
    ```
- 备注：props是只读属性（可强制修改，但是可能引发潜在错误），Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么可以将props的内容复制到data中，修改data取代修改props

## mixin(混入)

- 功能：可以把多个组件公用的配置提取成一个混入对象
- 使用方式：

  - 第一步：定义混入，如下：

  ```js
  // 需要暴露，此为局部暴露
  export const mixin = {
      data(){...},
      methods:{...}
  }
  ```

  - 第二步：使用混入，如下：
    - 全局混入：Vue.mixin(xxx)
    - 局部混入：mixins['xxxx', 'xxx']

## 插件

- 功能：用于增强Vue
- 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
- 定义插件
  ```js
  对象.install = function(Vue, options) {
      // 1.添加全局过滤器
      Vue.filter(...)

      // 2.添加全局指令
      Vue.directive(...)

      // 3. 配置全局混入
      Vue.mixin(...)

      // 4.添加实例方法
      Vue.prototype.$myMethod = function() {...}
      Vue.prototype.$myProperty = xxx
  }
  ```

## scoped 样式

- 作用：让样式在局部生效，防止冲突
- 写法：`<style scoped>`

## 总结TodoList案例

1. 组件化编码流程
   - 拆分静态组件：组件要按照**功能点**拆分，命名不要与HTML元素冲突
   - 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用？
     - 一个组件在用：放在组件自身即可。
     - 一些组件在用：放在他们共同的父组件上（==状态提升==）
   - 实现交互：从绑定事件开始。
2. props使用范围：
   - 父组件 ==> 子组件 通信
   - 子组件 ==> 父组件 通信（父组件定义一个**带参数的函数**，并把该函数传递给子组件。子组件通过props接收，并在合适位置使用该函数）
3. 使用v-model的注意点：
   - v-model绑定的值不能是props传过来的值，因为props是不推荐修改的！
   - 修改props传递过来的对象的属性时，虽Vue不报错，但也是不推荐的。

## WebStorage

1. 存储内容大小一般支持**5MB左右**（不同浏览器可能有所不同）

2. 浏览器通过 **Window.sessionStorage** 和 **Window.localStorage** 属性来实现本地存储机制

3. 相关API：

   - `xxxStorage.setItem('key', 'value');`

     接收一个键和值作为参数，会把键值存储到本地；若键名已存在，则更新其值。

   - `xxxStorage.getItem('key');`

     接收一个键名作为参数，返回该键名对应的值；**若该键值对不存，则返回null。**

   - `xxxStorage.removeItem('key');`

     接收一个键名作为参数，从本地移除该 键名 对应的键值对。

   - `xxxStorage.clear();`

     从本地清除本网站下所有的键值对数据。

4. 备注：

   - SessionStorage存储的内容会随浏览器的关闭而消失。
   - 不同于SessionStorage，LocalStorage的数据需要手动清除才消失。
   - `JSON.parse(null)`的返回值仍然是 null。

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于任意组件间通信

2. 安装全局事件总线：

   ```vue
   new Vue({
   	...
   	beforeCreate(){
   		Vue.prototype.$bus = this;	// 安装全局事件总线，$bus就是当前应用的vm
   	}
   });
   ```

3. 使用事件总线：

   - 接收数据：A组件希望 **接收数据**，则在A组件中给 `$bus` 绑定自定义事件，事件的回调留在 A组件 自身。

     ```vue
     methods(){
     	demo(data){....}
     }
     ...
     mounted(){
     	this.$bus.$on("xxx", this.demo);
     }
     
     // 下方为【简写方式】
     mounted(){
     	this.$bus.$on("xxx", (param)=>{...})
     }
     ```

     - 注意点：

       使用【简写方式】时，必须使用 **箭头函数**；

       若不使用箭头函数，而使用普通函数（function() {…}），函数体内的 **this** 会指向提供数据的一方，而非接收数据的一方。

   - 提供数据：

     `this.$bus.$emit("xxx", 数据)`

     - 注意：`xxx`需要与 $on() 中的`xxx`相对应。

4. 最好在beforeDestroy钩子中，用`$off("xxx")`去解绑当前组件所用到的自定义事件。

## 消息订阅与发布（pubsub）

1. 一种组件间通信的方式，适用于==任意组件间通信==

2. 使用步骤：

   - 安装pubsub：`npm i pubsub-js`

   - 引入：`import pubsub from "pubsub-js"`

   - 接收数据：A组件希望 **接收数据**，则在A组件中订阅消息，事件的回调留在 A组件 自身。

     ```
     methods(){
     	demo(msgName, data){....}
     }
     ...
     mounted(){
     	this.pid = pubsub.subscribe("xxx", this.demo);	// 订阅消息；创建变量pid是便于后续 取消订阅
     }
     
     // 下方为【简写方式】
     mounted(){
     	this.pid = pubsub.subscribe("xxx", (msgName, data)=>{...})
     }
     ```

     - 注意：回调函数的第一个参数是==所订阅消息的名称==，而不是发布消息时所携带的数据。

   - 接收数据：`pubsub.publish("xxx", 数据)`

   - 最好在beforeDestroy钩子中，使用`pubsub.unsubscribe(pid)`取消订阅。


## nextTick
1. 语法：`this.$nextTick(回调函数)`
2. 作用：在 **下一次** DOM更新结束后执行其指定的回调
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。


## Vue封装的过渡与动画
1. 作用：在插入、更新或移除DOM元素时，在适合的时候给元素添加样式类名。
2. 图示：
![img](https://cn.vuejs.org/assets/transition-classes.f0f7b3c9.png)
3. 写法：
    - 准备样式：
        - 元素进入的样式：
            1. v-enter：进入的起点
            2. v-enter-active：进入过程中
            3. v-enter-to：进入的终点
        - 元素离开的样式：
            1. v-leave：离开的起点
            2. v-leave-active：离开过程中
            3. v-leave-to：离开的终点
        
    - 使用`<transition></transition>`包裹需要过渡的元素，并配置name属性：

        ```Vue
        <transition>
            <h1 v-show="isShow">Hello, Vue!</h1>
        </transition>
        ```

    - 备注：

        - 若有多个元素需要过渡，则需要使用：`<transition-group></transition-group>`包裹，并且为其包裹的每个元素添加`key`值

        - 若`<transition>`或`<transition-group>`配置了属性name，则上述v-enter等样式的“v”需要替换为对应的name值
        - 通常情况下，v-enter 和 v-leave-to 是一致的，v-enter-to 和 v-leave 是一致的，v-enter-active 和 v-leave-active 是一致的。

## Vue脚手架配置代理

**从前端解决 ==跨域== 问题**

### 方法一

​	在 **Vue.config.js** 文件中添加如下配置：

```javascript
devServer: {
    // 接收请求的服务器地址
    proxy: 'http://localhost:5000'
}
```

​	说明：

1. 优 点：配置简单，请求资源时直接发给前端（8080）即可
2. 缺点：不能配置 **多个代理**，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，只有当请求的资源不存在于前端时，才会将请求转发给服务器（优先匹配前端资源原则）

### 方式二

​	在 **Vue.config.js** 文件中添加如下配置：

```javascript
devServer: {
    proxy: {
      '/api1': {		// 匹配所有以 ‘/api1’ 开头的请求路径
        target: 'http://localhost:5000',	// 代理目标的基础路径
        pathRewriter: {‘^/api1’:''}，	// 利用正则表达式，将请求路径中的 /api1 转化为 空字符串
        ws: true,	// 是否支持 WebSocket
        changeOrigin: true		// 是否与代理目标同源
      },
      '/api2': {		
        target: 'http://localhost:5001',	
        pathRewriter: {‘^/api2’:''}，	
        ws: true,	
        changeOrigin: true		
      },
    }
}
/*
	1.在Vue中，ws 和 changeOrigin 的默认值为 true
	2.changeOrigin 设置为true时，服务器收到的请求头中的host与target配置项相同，为：localhost:5000
	  changeOrigin 设置为false时，服务器收到的请求头中的host为请求发送方的URL
*/
```

​	说明：

1. 优点：可以配置多个代理，且可以灵活地控制请求是否走代理
2. 缺点：配置略显繁琐，请求资源时必须加**前缀**，如 应将请求URL`http://localhost:8080/students`改为`http://localhost:8080/api1/students`。

## 插槽

 1. 作用：让 父组件 可以向 子组件 指定位置插入 **HTML结构**，也是一种组件间通信的方式，适用于 **父组件 ==> 子组件**。

 2. 分类：默认插槽、具名插槽、作用域插槽

 3. 使用方式：

    - 默认插槽

      ```vue
      <!-- 子组件中 -->
      <template>
      	<div>
              <!-- 定义插槽 -->
              <slot>插槽默认内容。。。</slot>
          </div>
      </template>
      
      <!-- 父组件中 -->
      <Category>
      	<div>HTML结构1</div>
      </Category>
      ```

    - 具名插槽

      ```vue
      <!-- 子组件中 -->
      <template>
      	<div>
              <!-- 定义插槽 -->
              <slot name="slot1">插槽默认内容。。。</slot>
              <slot name="slot2">插槽默认内容。。。</slot>
          </div>
      </template>
      
      <!-- 父组件中 -->
      <Category>
      	<div slot="slot1">HTML结构1</div>
          <!-- v-slot 需要和 template 配合使用 -->
          <template v-slot:slot2>
          	<div>HTML结构2</div>
          </template>
      </Category>
      ```

    - 作用域插槽

      - 理解：数据位于 **插槽所在的组件** ，但需要数据生成HTML结构的组件为 **插槽的使用者**。

        （如：数据和插槽在 Category 组件中，而使用数据所遍历出的HTML结构由 App 组件 决定）

      ```vue
      <!-- 子组件中 -->
      <template>
      	<div>
              <!-- 定义插槽 -->
              <slot :games="games">插槽默认内容。。。</slot>
          </div>
      </template>
      
      <script>
          export default {
              name: "Category",
              data() {
                  return {
                      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
                  };
              },
          };
      </script>
      
      <!-- 父组件中 -->
      <Category>
          <!-- scope 需要和 template 配合使用 -->
          <template scope="obj">
          	<ul>
                  <li v-for="(game, index) in obj.games" :key="index">{{game}}</li>
              </ul>
          </template>
          
          <!-- scope 需要和 template 配合使用 -->
          <template slot-scope="{...games}">
              <h4 v-for="(game, index) in games" :key="index">{{game}}</h4>
          </template>
      </Category>
      ```


## Vuex

### 1. 概念

​		在Vue中实现**集中式**状态（数据）管理的一个 **Vue插件** ，对Vue应用中多个组件的共享状态进行集中式的管理（读、写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2. 使用场景

​		对各组件需要共享数据时

### 3.搭建Vuex环境

  1. 创建文件：==src/store/index.js==

     ```javascript
     // 该文件用于创建 Vuex 中最核心的Store
     
     // 导入Vue
     import Vue from "vue";
     // 导入 Vuex
     import Vuex from "vuex";
     // 使用Vuex插件
     Vue.use(Vuex);
     
     // 准备actions —— 响应组件中的动作
     const actions = {};
     // 准备mutation —— 用于操作数据（state）
     const mutation = {};
     // 准备state —— 用于存储数据
     const state = {};
     
     // 创建并暴露 Store
     export default new Vuex.Store({
         actions,
         mutation,
         state
     });
     ```

2. 在 ==main.js== 中创建vm时传入 ==store==配置项

   ```javascript
   ...
   // 引入store（此处可以省略 /index，vue默认获取store目录下的index.js文件）
   import store from "./store"
   
   ...
   // 创建VM
   new Vue({
       el: "#app",
       render: h => h(App),
       store
   });
   ```

### 4.基本使用

1. 初始化数据、配置 ==actions==、==mutations==，操作文件 ==index.js==

   ```javascript
   // 导入Vue
   import Vue from "vue";
   // 导入 Vuex
   import Vuex from "vuex";
   // 使用Vuex插件
   Vue.use(Vuex);
   
   // 准备actions —— 响应组件中的动作
   const actions = {
       add(context, val) {
           context.commit("ADD", val);
       }
   };
   // 准备mutation —— 用于操作数据（state）
   const mutation = {
       ADD(state, val) {
           state.sum += value;
       }
   };
   // 准备state —— 用于存储数据
   const state = {
       sum: 0
   };
   
   // 创建并暴露 Store
   export default new Vuex.Store({
       actions,
       mutation,
       state
   });
   ```

2. 组件中读取Vuex中的数据：`$store.state.sum`

3. 组件中修改Vuex中的数据：`$store.dispatch("action中的方法名", 数据);`或`$store.commit("mutations中的方法名", 数据);`

   备注：

   若没有网络请求或其他业务逻辑，组件中可以越过actions，即不写`dispatch()`，直接编写`commit()`。

### 5.getter的使用

1. 概念：当state中的数据需要经过 **加工** 后，被 **多个组件** 共享使用，可以使用getters加工。

2. 在 ==index.js==中追加 ==getters== 配置项：

   ```javascript
   ...
   const getters = {
   	bigSum(state) {
           return state.sum * 10;
       }
   }
   
   // 创建并暴露Store
   export default new Vuex.Store({
       ...
       getters
   })
   ```

3. 组件中获取数据：`$store.getters.bigSum`。

4. 注意点：

   state 和 getters 类似于 组件中的 data 与 computed，但是 data 与 computed 只适用于组件自身，无法共享。

### 6.四个map方法的使用

1. mapState方法：用于帮助我们映射 ==state== 中的数据为计算属性

   ```javascript
   computed: {
   	// 借助 mapState 生成计算机属性：sum、school、subject（对象形式）
       ...mapState({sum: "sum", school: "school", subject: "subject"}),
       
       // 借助mapState 生成计算机属性：sum、school、subject（数组形式）
       ...mapState(["sum", "school", "subject"]);
   }
   ```

2. mapGetters方法：用于帮助我们映射 ==getters== 中的数据为计算属性

   ```javascript
   computed: {
       // 借助 mapGetters 生成计算机属性：bigSum（对象形式）
       ...mapGetters({bigSum: "bigSum"}),
       
       // 借助 mapGetters 生成计算机属性：bigSum（数组形式）
       ...mapGetters(["bigSum"]);
   }
   ```

3. mapActions方法：用于帮助我们生成与 ==actions== 对话的方法，即：包含 `$store.dispatch(xxx)` 函数

   ```javascript
   methods: {
       // 借助 mapActions 生成：addOdd、addWait（对象形式）
       ...mapActions({addOdd: "addOdd", addWait: "addWait"}),
       
       // 借助 mapActions 生成：addOdd、addWait（数组形式）
       ...mapActions(["addOdd", "addWait"]);
   }
   ```

4. mapMutations方法：用于帮助我们生成与 ==mutations== 对话的方法，即：包含 `$store.commit(xxx)`  函数

   ```javascript
   methods: {
       // 借助 mapMutations 生成：addOdd、addWait（对象形式）
       ...mapMutation({add: "ADD", reduce: "REDUCE"}),
       
       // 借助 mapMutations 生成：addOdd、addWait（数组形式）
       ...mapMutations(["ADD", "REDUCE"]);
   }
   ```

   注意：

   在使用 **mapActions** 或 **mapMutations** 生成的方法时，若需要传参：需要在模板中绑定事件时传递好的参数，否则参数是事件对象。如：使用 `addOdd(param)` 形式。

### 7.模块化 + 命名空间

1. 目的：让代码更易于维护，让多种数据分类更加明确。

2. 修改 ==index.js== :

   ```javascript
   // 引入 Vue 和 Vuex
   import Vue from "vue"
   import Vuex from "vuex"
   // 使用 Vuex 插件
   Vue.use(Vuex);
   
   const countOption = {
       namespaced: true,	// 开启命名空间，注意是【namespaced】过去式形式
       actions: { 
       	add(context, val) {
               ...
               context.commit("ADD", val);
           }
       },
       mutations: { 
       	ADD(state, val){ ... }
       },
       state: { 
           school: "CS&S", 
      		subject: "Vue"
       },
       getters: {
           bigSum(state) {
               return state.sum * 10;
           }
       }
   }
       
   const personOption = {
   	namespaced: true,
       actions: { ... },
       mutations: { ... },
       state: { ... },
       getters: { ... }
   }
               
   export default new Vuex.Store({
       modules: {
           countOption,
           personOption
       }
   })
               
   // 注意，除 state 外，其他单词都是【复数】形式
   // 		书写错误，会提示：[vuex] unknown action 等
   ```

3. 开启命名空间后，组件中读取 **state** 数据：

   ```javascript
   // 方式一：直接获取
   computed: {
       school() {
           return this.$store.state.countOption.school;
       }
   }
   // 方式二：借助 mapState 读取
   computed: {
   	...mapState('countOption', ['school', 'subject']),
    	// 或者
       ...mapState('countOption', {school: 'school', subject: 'subject'})	// 此方式支持重命名
   }
   ```

4. 开启命名空间后，组件中读取 **getters** 数据：

   ```javascript
   // 方式一：直接获取
   computed: {
       bigSum() {
   		return this.$store.getters['countOption/bigSum'];
       }
   }
   
   // 方式二：借助 mapGetters 读取
   computed: {
       ...mapGetters('conutOption', ['bigSum']),
   	// 或者
       ...mapGetters('countOption', {largeSum: 'bigSum'}),
   }
   ```

5. 开启命名空间后，组件中调用 **actions** ：

   ```javascript
   data() {
       return {
           addend: 1,
       }
   }
   
   // 方式一：直接获取
   methods: {
       add() {
           this.$store.dispatch('countOption/add', this.addend);	// 注意：此处是dispatch
       }
   }
   
   // 方式二：借助 mapActions
   methods: {
       ...mapActions('countOption', ['add']),
       // 或者
       ...mapActions('countOption', {increment: 'add'}),
   }
   ```

6. 开启命名空间后，组件中调用 **mutations** ：

   ```javascript
   data() {
       return {
           addend: 1,
       }
   }
   
   // 方式一：直接获取
   methods: {
       ADD(){
           this.$store.commit('countOption/ADD', this.addend);		// 注意：此处是 commit
       }
   }
   
   // 方式二：借助 mapMutations
   methods: {
       ...mapMutations('countOption', ['ADD']),
       // 或者
       ...mapMutations('countOption', {Add: "ADD"})
   }
   ```

注意点：

使用 **直接获取** 时，唯独 **state** 不同于其余三者，其获取方式为：`this.$store.state.模块名.状态名`。

其余三者的获取方式为：`this.$store.getters/dispatch/commit('模块名/函数名')`。

## 路由Vue-Router

### 1.基本使用

1. 安装 vue-router，命令：`npm i vue-router`

   如果使用的是Vue，需要安装vue-router@3

2. 导入并应用插件：

   ```javascript
   // main.js 文件
   import VueRouter from "vue-router"
   
   Vue.use(VueRouter);
   ```

3. 编写router配置项：

   ```javascript
   // router/index.js 文件
   
   // 引入VueRouter
   import VueRouter from "vue-router"
   // 引入路由组件
   import About from "../pages/About"
   import Home from "../pages/Home"
   
   // 创建并暴露路由器
   export default new VueRouter({
       routes: [
           {
               path: "/about",
               component: About
           },
           {
               path: "/home",
               component: Home
           }
       ]
   })
   ```

4. 实现切换（`active-class` 可配置高亮效果）

   ```html
   <router-link to="/about" class="" active-class="active">About</router-link>
   ```

   备注：

   `active-class` 为动态配置的类名

5. 指定展示位置

   ```html
   <router-view></router-view>
   ```

### 2.注意点

1. 路由组件通常存放在 ==pages== 文件夹，一般组件通常存放在 ==components== 文件夹。
2. 通过切换，“隐藏”的路由组件，默认是被销毁掉的，需要的时候再重新挂载。
3. 每个组件都有自己的 ==$route== 属性，里面存储着自己的路由信息。
4. 整个应用只有一个 router，可以通过组件的 ==$router== 属性获取到。

### 3.多级路由（嵌套路由）

1. 配置路由规则，使用 ==children== 配置项：

   ```javascript
   ...
   import News from "../pages/News"
   
   routes: [
       {
           ...
       },
       {
           path: '/home',
           component: Home,
           children: [
           	{
           		path: 'news',
           		component: News		// 注意不要添加 / ，否则会跳转到根路径，而不是在/home基础上跳转
       		},
       		{
                   ...
               }
           ]
       }
   ]
   ```

2. 跳转（完整路径）

   ```html
   <router-link to="/home/news">News</router-link>
   ```

### 4.路由传参(query)

1. 传递参数

   ```html
   <!-- pages/Messages.vue -->
   
   <!-- 跳转路由并携带query参数，to的字符串写法 -->
   <router-link :to="`/home/messages/detail?id=${m.id}&title=${m.title}`">跳转
   </router-link>
   
   <!-- 跳转路由并携带query参数，to的对象写法 -->
   <router-link :to="{
       path: '/home/messages/detail‘,
       query: {
       	id: m.id,
           title: m.title
       }
   }">
       跳转
   </router-link>
   ```

2. 接收参数

   ```javascript
   // pages/Detail.vue
   
   $route.query.id
   $route.query.title
   ```

### 5.路由命名

1. 作用：可以简化路由跳转时的路径名书写

2. 如何使用：

   - 给路由命名：

     ```javascript
     // router/index.js
     
     {
         path: '/demo',
         component: Demo,
         children: [
             {
                 path: 'test',
                 component: Test,
                 children: [
                     {
                         name: "hello",		// 给路由命名
                         path: 'hello',
                         component: Hello,
                     }
                 ]
             }
         ]
    }
     ```

   - 简化跳转名称
   
     ```html
     <!-- pages/xxx.vue -->
     
     <!-- 简化跳转前，需要书写完整的路径 -->
     <router-link to="/demo/test/hello">跳转</router-link>
     
     <!-- 简化跳转后，直接通过名称跳转 -->
     <router-link :to="{ name: '/demo/test/hello' }">跳转</router-link>
     
     <!-- 简化写法，配合参数传递 -->
     <router-link :to="{
     	name: 'hello',
     	query: {
         	id: '666',
     		title: 'Hello, Vue-Router'
     	}
     }">
     	跳转
     </router-link>
     ```


### 6.路由传参(params)

1. 配置路由，声明接收 params 参数：

   ```javascript
   // router/index.js
   
   {
       path: '/demo',
       component: Demo,
       children: [
           {
               path: 'test',
               component: Test,
               children: [
                   {
                       name: "hello",		// 给路由命名
                       path: 'hello/:id/:title',
                       component: Hello,
                   }
               ]
           }
       ]
   }
   ```

2. 传递参数

   ```html
   <!-- pages/xxx.vue -->
   
   <!-- 跳转路由并携带query参数，to的字符串写法 -->
   <router-link :to="`/demo/test/hello/${m.id}/${m.title}`">跳转
   </router-link>
   
   <!-- 跳转路由并携带query参数，to的对象写法 -->
   <router-link :to="{
       name: 'hello‘,
       params: {
       	id: m.id,
           title: m.title
       }
   }">
       跳转
   </router-link>
   ```

   注意：

   路由携带 ==params== 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置项。

3. 接收参数：

   ```javascript
   // pages/Detail.vue
   
   $route.params.id
   $route.params.title
   ```


### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```javascript
// router/index.js

{
    path: '/demo',
    component: Demo,
    children: [
        {
            path: 'test',
            component: Test,
            children: [
                {
                    name: "hello",		// 给路由命名
                    path: 'hello/:id/:title',
                    component: Hello,
                    // 第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Hello组件
                    // props: {a:900, b:"hello"},
                    // 第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Hello组件
                    props: true,
                    // 第三种写法：props值为函数，该函数的返回的对象中每一组key-value都会通过props传给Hello组件
                    props({query}) {
                        return {
                            id: query.id,
                            title: query.title
                        }
                    }
                }
            ]
        }
    ]
}
```

### 8.`<router-link>`的replace属性

1. 作用：控制路由器跳转时操作浏览器历史记录的模式

2. 浏览器的历史记录有两种写法方式：分别为 `push` 和 `replace`，`push`为追加历史记录，`replace`为替换当前记录。路由跳转时默认为 `push`。

3. 如何开启 `replace` 模式：

   `<router-link replace ...></router-link>`
   
   不建议为 **replace**属性添加参数 true，Vue会提示：==Invalid prop: type check failed for prop "replace".==

### 9.编程式路由导航

1. 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```javascript
   // pages/Messages.vue
   
   // push 方式
   this.$router.push({
       name: 'detail',
       params: {
           id: xxx,
           title: xxx,
       }
   });
   
   // replace 方式
   this.$router.replace({
       name: 'detail',
       params: {
           id: xxx,
           title: xxx,
       }
   });
   
   this.$router.forward();		// 历史记录前进
   this.$router.back();		// 历史记录后退
this.$router.go(数值);	   // 控制跳转步数，正数代表前进，负数代表后退
   ```
   

### 10.缓存路由组件

1. 作用：让不展示的路由保持挂载状态，不被销毁。

2. 具体编码：

   ```html
   <!-- pages/Home.vue -->
   
   <!-- 如果不设置include则表示对所有的组件执行 缓存 操作 -->
   <!-- include包含的是组件名，如果有多个组件，则使用 以英文逗号分隔的字符串、一个正则表达式，或是包含这多个组件的一个数组 -->
   <!-- exclude表示需要排除缓存的组件 -->
   <keep-alive include="News">
   	<router-view></router-view>
   </keep-alive>
   ```

   注意：

   何处使用`<keep-alive></keep-alive>`？在**包裹** 需要缓存组件 的组件中使用，如果不确定包裹关系，可以使用 **Vue工具** 查看。

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子（生命周期），用于捕获路由组件的**激活状态**。

2. 具体名字：

   - `activated`路由组件被激活时触发

   - `deactivated`路由组件失活时触发

     补充：

     `nextTick`同样也是钩子之一。

### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫：

   ```javascript
   // router/index.js
   import VueRouter from "vue-router"
   ...
   
   const router = new VueRouter({
       routes: [
           {
               ...
           },
           {
               name: "xxx",
               path: "/xxx"
               component: "Xxx",
               // 配置前后置路由守卫需要使用的数据
               meta: { title: "xxx", isAuth: true},	
           }
   	]
   })
   ```

   ```javascript
   // router/index.js
   
   // 全局-前置路由守卫 —— 初始化时被调用、每次路由切换前被调用
   router.beforeEach((to, from, next) => {
       if (to.meta.isAuth) {   // 判断是否需要鉴权
           if (localStorage.getItem("username") == "Dino") {
               next();		// 放行
           } else {
               alert("暂无权限查看");
           }
       } else {
           next();		// 放行
       }
   });
   
   // 全局-后置路由首位 —— 初始化时被调用、每次路由切换完成后被调用
   router.afterEach((to, from) => {
       document.title = to.meta.title;
   });
   ```

4. 独享守卫

   ```javascript
   // router/index.js
   
   new VueRouter({
      routes: [
          {
              name: "xxx",
              path: "/xxx",
              component: "Xxx",
              beforeEnter(to, from, next){
       	       if (localStorage.getItem("age") 
                      && localStorage.getItem("age") >= 18) {
                      next();	// 放行
                  } else {
                      alert("年龄不足！！！");
                  }
   		   }
          }
      ] 
   });
   ```

5. 组件内守卫

   ```javascript
   // 通过路由规则，进入该组件时被调用
   beforeRouteEnter(to, from, next) {
       ...
   }
   
   // 通过路由规则，离开该组件时被调用
   beforeRouteLeave(to, from, next) {
       ...
   }
   
   // 注意：是route【路由】而非router【路由器】
   ```


### 13.路由的两种工作模式

1. 对于一个 URL 来说，什么是 Hash值？ —— #及其后面的内容就是 Hash值

2. Hash值不会包含在 HTTP请求 中，即 Hash值不会带给服务器

3. Hash模式：

   - 地址中永远带着 # 号，不美观；
   - 若以后将地址通过第三方APP分享，若APP校验严格，则地址可能会被标记为不合法；
   - 兼容性较好。

4. History模式：

   - 地址干净，美观；
   - 兼容性和Hash模式相比，较差；
   - 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

5. 写入位置：

   ```javascript
   // router/index.js
   
   const router = new VueRouter({
       mode: 'hash',	// 默认为 hash模式
       routes: [
           {...},
           {...},
       ]
   });
   ```

   