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