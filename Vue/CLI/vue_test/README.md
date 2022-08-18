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