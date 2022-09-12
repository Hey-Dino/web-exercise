## 使用Mockjs模拟数据

使用步骤：

1. 安装 `mockjs`：

   `npm i mockjs`

2. 在 **src** 下创建文件夹：mock

3. 创建 **虚拟JSON数据**：

   ```json
   // mock/banners.json
   [
       {
           "id": "1",
           "imgUrl": "/images/banner1.jpg"
       },
       {
           "id": "2",
           "imgUrl": "/images/banner2.jpg"
       },
       {
           "id": "3",
           "imgUrl": "/images/banner3.jpg"
       },
       {
           "id": "4",
           "imgUrl": "/images/banner4.jpg"
       }
   ]
   ```

   注意：

   <u>访问 **public** 文件夹的内容时，不需要带有 public 前缀。因而，webpack打包时会把public下面很多文件复制到根目录 /。</u>

4. 将虚拟数据中需要用到的 **图片** 转移到 **public/images** 目录下。

5. 在 **mock** 文件夹下创建 **mockServer.js** 文件，通过mockjs实现【虚拟服务器】，模拟数据。

   ```js
   // mock/mockServer.js
   
   // 引入 mockjs 插件
   import Mock from "mockjs";
   // 引入虚拟数据
   import banners from "./banners.json"
   
   Mock.mock('/mock/banners', {
       status: 200,
       data: banners,
   });
   
   // 无需导出
   ```

6. 在入口文件 **main.js** 中引入

   ```js
   // main.js
   ...
   import "@/mock/mockServer";
   
   ...
   ```

## 使用swiper实现轮播图

1. 安装 **[swiper](https://www.swiper.com.cn/)**

   `npm i swiper@5`

2. 其 CSS 文件

   由于多个组件（typeNav组件、floor组件）需要使用，因而可以在 **App.vue** 引入

   ```javascript
   // App.vue
   import "swiper/css/swiper.min.css"
   ```

3. 引入 **swiper** 及添加 **Swiper实例**：

   ```javascript
   // pages/Home/ListContainer/index.vue
   
   export default {
       ...
       watch: {
        	// 监听 bannerList 的变化   
           bannerList() {
            	// 一旦 虚拟数据 渲染成功，则添加 Swiper 实例   
               this.nextTick(() => {
                   var mySwiper = new Swiper(".swiper-container", {
                       loop: true, // 循环模式选项
                       autoplay: true, // 自动播放
   
                       // 如果需要分页器
                       pagination: {
                           el: ".swiper-pagination",
                       },
   
                       // 如果需要前进后退按钮
                       navigation: {
                           nextEl: ".swiper-button-next",
                           prevEl: ".swiper-button-prev",
                       },
                   });
               });
           }
       }
   }
   ```