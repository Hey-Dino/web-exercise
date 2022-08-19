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

    ```vue
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