1. 编程式路由跳转到当前路由（参数不变），多次执行相同跳转会抛出 NavigationDuplicated 的警告⚠错误？

   - 声明式路由导航没有这类问题，因为 vue-router 底层已经处理完成了
   - 3.5.3版本的 vue-router 引入了 promise，是造成此错误的重要原因。

   解决方法：

   - 通过给push方法传递相应的成功、失败的回调函数，便可以捕获当前的异常，可以解决问题。`this.$router.push({...}, ()=>{}, ()=>{})`

     - 此方法 ==治标不治本==，需要在每个 push|replace 重复上述操作。

   - 通过修改 `VueRouter.prototype.push()` 实现彻底更改：

     ```javascript
     // router/index.js
     
     ...
     // 先把 VueRouter 原型对象的 push() 方法保存一份
     const originPush = VueRouter.prototype.push;
     
     // 重写push方法
     VueRouter.prototype.push = function(location, resolve, reject){
     	// 判断是否定义了 成功、失败的回调函数    
         if (resolve && reject) {
             // 由于原origiPush方法的上下文（this）为window，这边需要使用call篡改上下文
             originPush.call(this, location, resolve, reject);
         } else {
             originPush.call(this, locaiton, ()=>{}, ()=>{});
         }
     }
     
     // replace 方法同理
     ```

     补充：

     `call` 和 `apply`  的区别：

     - 相同点：都可以调用函数一次，篡改函数的上下文（this）一次。
     - 不同点：call与apply传递参数，call使用逗号分隔参数，apply使用数组

   

2. axios 二次封装

   - 封装的原因：

     是为了设置 **请求拦截器** 和 **响应拦截器** ，请求拦截器用于在请求发送前处理事务，响应拦截器用于在服务器返回数据后处理事务。

   - API文件夹：

     用于存放 axios 请求

     ```javascript
     // api/request.js
     
     // 对于 Axios 进行二次封装
     import axios from "axios";
     
     // 1.利用axios对象的方法，create一个实例
     //   request 就是 需要配置的axios
     const requests = axios.create({
         // 基础路径
         baseURL: "/api",
         // 请求超时的时间
         timeout: 5000,
     });
     
     // 2.设置请求拦截器
     requests.interceptors.request.use((config) => {
         // config: 配置对象，其中属性header（请求头）十分重要
         return config;
     });
     
     // 3.设置响应拦截器
     requests.interceptors.response.use((res) => {
         return res.data;
     }, (err) => {
         return Promise.reject(new Error('faile'));
     });
     
     // 4.暴露 requests
     export default requests;
     ```

   

3. nprogress进度条的使用

   ```javascript
   // api/request.js
   import nprogress from "nprogress";
   import "nprogress/nprogress.css";
   ```

   start：代表进度条的开始

   ```javascript
   // api/request.js
   ...
   requests.interceptors.request.use((config) => {
      nprogress.start();
      ...
   });
   ```

   done：代表进度条的结束

   ```javascript
   // api/request.js
   ...
   requests.interceptors.response.use((res) => {
       nprogress.done();
   }, (err) => {
       ...
   });
   ```

   如果，需要调整进度条颜色，进入 `nprogress/nprogress.css`进行修改

   

4. vuex

   - vuex 是官网提供的一个插件（状态管理库），集中式管理项目中组件共用的数据。

   - vuex 支持 **模块化开发**：

     - 创建子模块

       ```javascript
       //  xxxx 模块的仓库
       const state = {};
       const action = {};
       const mutations = {};
       const getters = {};
       
       export default {
           state,
           action,
           mutations,
           getters
       }
       ```

     - 引入子模块

       ```javascript
       // store/index.js
       ...
       // 引入子仓库
       import home from "./home";
       import search from "./search";
       
       export default new Vuex.Store({
           modules: {
               home,
               search
           }
       });
       ```

5. 防抖与节流

   - 防抖：

     连续快速的触发事件时，前面的所有触发的事件都被取消，仅有 **最后一次** 触发的事件会被执行。

   - 节流：

     在规定的时间间隔范围内不会 **重复触发回调**，只有大于这个 **规定的时间范围** 才会触发回调，把频繁触发转化为少量触发。