/* 
    利用 mockjs 来模拟数据接口
*/
import Mock from "mockjs"
// Webpack 默认对外暴露的类型：img、json
import banners from "./banners.json"
import floors from "./floors.json"

Mock.mock('/mock/banners', {
    status: 200,
    data: banners
});

Mock.mock('/mock/floors', {
    status: 200,
    data: floors
});