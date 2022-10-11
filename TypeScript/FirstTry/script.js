"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = 'https://api.thecatapi.com/v1/images/search';
const button = document.querySelector("button");
const tableBody = document.querySelector('#table-body');
/* 接口实现类 */
class Cat {
    constructor(id, url, height, width) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}
class WebDisplay {
    /* 公有静态方法，无返回值 */
    static addData(data) {
        // 创建 Cat类 实例对象
        const cat = new Cat(data.id, data.url, data.height, data.width);
        // 创建 DOM元素
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}"></td>
            <td>${cat.height}</td>
            <td>${cat.width}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `;
        // 在tbody中插入新创建的DOM元素
        tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tableRow);
    }
    static deleteData(deleteButton) {
        // 此处使用了断言
        const td = deleteButton.parentElement;
        const tr = td.parentElement;
        tr.remove();
    }
}
/* 获取 Promise */
function getJSON(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const json = yield response.json();
        return json;
    });
}
/* 获取实际数据 */
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const json = yield getJSON(url);
            const data = json[0];
            WebDisplay.addData(data);
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message;
            }
            else {
                message = String(error);
            }
            console.log(message);
        }
    });
}
/* 增加按钮监听事件 <'click'>可以避免事件写错 */
button === null || button === void 0 ? void 0 : button.addEventListener('click', getData);
tableBody === null || tableBody === void 0 ? void 0 : tableBody.addEventListener('click', (ev) => {
    // 避免删除按钮不存在时报错，因而使用<>注明类型
    WebDisplay.deleteData(ev.target);
});
