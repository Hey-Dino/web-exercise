/**
 * 四舍五入小数，保留指定的小数位数
 * @param {Number} num 所需四舍五入的小数
 * @param {Number} len 保留的小数位数
 */
function roundDecimal(num, len) {
    const multiple = Math.pow(10, len);
    return Math.round(num * multiple) / multiple;
}

/**
 * 获取DOM元素的位置
 * @param {Object} dom 所需获取位置的DOM元素
 * @returns {Object} 
 */
function getPosition(dom) {
    const rect = dom.getBoundingClientRect();
    return {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2)
    }
}

// 数据操作

/**
 * 记录单个商品信息的类
 */
class UIGoods {
    constructor(goods) {
        this.data = goods;
        this.chooseNum = 0;
    }

    // 增加商品数量
    increaseNum() {
        this.chooseNum++;
    }

    // 减少数量
    decreaseNum() {
        this.chooseNum > 0 && this.chooseNum--;
    }

    // 判断商品是否选中
    isChoose() {
        return this.chooseNum > 0;
    }

    // 获取商品总价
    getTotalPrice() {
        return this.data.price * this.chooseNum;
    }
}

/**
 * 记录总的商品及其他信息
 */
class UIData {
    constructor() {
        const goodsList = [];
        goods.forEach(item => {
            goodsList.push(new UIGoods(item));
        });

        this.goodsList = goodsList;     // 商品列表
        this.deliveryPrice = 5;     // 配送费
        this.deliveryThreshold = 30;    // 起送费
    }

    // 添加商品
    increaseGoods(index) {
        this.goodsList[index].increaseNum();
    }

    // 减少商品
    decreaseGoods(index) {
        this.goodsList[index].decreaseNum();
    }

    // 获取购物车商品总价
    getTotalPrice() {
        let totalPrice = 0;
        this.goodsList.forEach(item => {
            totalPrice += item.getTotalPrice();
        });

        return roundDecimal(totalPrice, 2);
    }

    // 获取购物车商品数量
    getTotalNum() {
        let totalNum = 0;
        this.goodsList.forEach(item => {
            totalNum += item.chooseNum;
        });

        return totalNum;
    }

    // 是否选择了商品
    hasChooseGoods() {
        return this.getTotalNum() > 0;
    }

    // 是否能够起送
    couldDelivery() {
        return this.getTotalPrice() >= this.deliveryThreshold;
    }

    // 商品是否被选择
    isChoose(index) {
        return this.goodsList[index].isChoose();
    }

    // 获取某个商品的数量
    getGoodsNum(index) {
        return this.goodsList[index].chooseNum;
    }
}

// 逻辑操作

/**
 * 控制整个页面的类
 */
class UI {
    constructor() {
        this.uiData = new UIData();
        this.doms = {
            goodsContainer: document.querySelector(".goods-list"),
            deliveryPrice: document.querySelector(".footer-car-tip"),
            totalPrice: document.querySelector(".footer-car-total"),
            car: document.querySelector(".footer-car"),
            badge: document.querySelector(".footer-car-badge"),
            payBtn: document.querySelector(".footer-pay"),
            payBtnInnerSpan: document.querySelector(".footer-pay span")
        }
        // 确定“+”动画的结束位置
        this.dynamicEnd = getPosition(this.doms.car);

        // 调用自身方法，动态创建商品
        this.createGoodsHTML();
        // 初始化配送费
        this.initDeliveryPrice();
        // 初始化事件监听
        this.initEventListener();
    }

    // 创建商品界面
    createGoodsHTML() {
        let htmlStr = '';
        this.uiData.goodsList.forEach((item, index) => {
            htmlStr += `<div class="goods-item">
                <img src="${item.data.pic}" class="goods-pic" />
                <div class="goods-info">
                    <h2 class="goods-title">${item.data.title}</h2>
                    <p class="goods-desc">${item.data.desc}</p>
                    <p class="goods-sell">
                        <span>月售 ${item.data.sellNumber}</span>
                        <span>好评率${item.data.favorRate}</span>
                    </p>
                    <div class="goods-confirm">
                        <p class="goods-price">
                            <span class="goods-price-unit">￥</span>
                            <span>${item.data.price}</span>
                        </p>
                        <div class="goods-btns">
                            <i class="iconfont i-jianhao" index="${index}"></i>
                            <span>0</span>
                            <i class="iconfont i-jiajianzujianjiahao"  index="${index}"></i>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        this.doms.goodsContainer.innerHTML = htmlStr;
    }

    // 创建“+”按钮，x和y代表位置
    createAddBtnHTML(x, y) {
        const div = document.createElement("div");
        div.className = "add-to-car";
        div.style.transform = `translateX(${x}px)`;

        const i = document.createElement("i");
        i.className = "iconfont i-jiajianzujianjiahao";
        i.style.transform = `translateY(${y}px)`;
        div.appendChild(i);

        document.body.appendChild(div);

        return div;
    }

    // 初始化配送费
    initDeliveryPrice() {
        this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    }

    // 初始化事件监听
    initEventListener() {
        this.doms.car.addEventListener("animationend", function () {
            this.classList.remove("animate");
        });
    }

    // 添加商品
    increaseGoods(index) {
        this.uiData.increaseGoods(index);
        this.updateGoodsItem(index);
        this.updateFooter();
        this.increaseDynamicEffect(index);
    }

    // 减少商品
    decreaseGoods(index) {
        this.uiData.decreaseGoods(index);
        this.updateGoodsItem(index);
        this.updateFooter();
    }

    // 更新商品数量的显示样式
    updateGoodsItem(index) {
        const goodsDom = this.doms.goodsContainer.children[index];
        // 由商品是否被选择，分配不同的状态
        if (this.uiData.isChoose(index)) {
            goodsDom.classList.add("active");
        } else {
            goodsDom.classList.remove("active");
        }

        // 更新商品数量
        const goodsNumDom = goodsDom.querySelector(".goods-btns span");
        goodsNumDom.textContent = this.uiData.getGoodsNum(index);
    }

    // 更新底部内容
    updateFooter() {
        const totalPrice = this.uiData.getTotalPrice();

        // 切换左侧购物车样式
        if (this.uiData.hasChooseGoods()) {
            this.doms.car.classList.add("active");
        } else {
            this.doms.car.classList.remove("active");
        }
        // 更新购物车图标右上角的徽章
        this.doms.badge.textContent = this.uiData.getTotalNum();

        // 更新商品总价(保证小数点后两位)
        this.doms.totalPrice.textContent = totalPrice;

        // 更新右侧计算按钮样式
        if (this.uiData.couldDelivery()) {
            this.doms.payBtn.classList.add("active");
        } else {
            this.doms.payBtn.classList.remove("active");
            // 更新起送所差金额
            const diff = roundDecimal(this.uiData.deliveryThreshold - totalPrice, 2);
            this.doms.payBtnInnerSpan.textContent = `还差￥${diff}元起送`
        }
    }

    // 添加商品的动效
    increaseDynamicEffect(index) {
        // 确定点击的“+”按钮的位置（动画起始位置）
        const addBtn = this.doms.goodsContainer.children[index].querySelector(".i-jiajianzujianjiahao");
        const dynamicStart = getPosition(addBtn);

        // 创建一个"+"按钮
        const newBtn = this.createAddBtnHTML(dynamicStart.x, dynamicStart.y);
        // 强行渲染，避免直接渲染结束位置
        newBtn.clientWidth;
        // 更新按钮位置至购物车
        newBtn.style.transform = `translateX(${this.dynamicEnd.x}px)`;
        newBtn.children[0].style.transform = `translateY(${this.dynamicEnd.y}px)`;

        // 动画结束，移除按钮并开启购物车动画
        newBtn.addEventListener("transitionend", () => {
            // 移出按钮
            newBtn.remove();
            // 开启购物车动画
            this.doms.car.classList.add("animate");
        }, {
            // newBtn子元素的动画结束，具有冒泡特性
            // 为避免重复执行，设置once为true
            once: true,
        });
    }
}

const ui = new UI();

// 事件
ui.doms.goodsContainer.addEventListener("click", function (e) {
    const clickBtn = e.target;
    if (clickBtn.classList.contains("i-jiajianzujianjiahao")) {
        const index = +clickBtn.getAttribute("index");
        ui.increaseGoods(index);
    } else if (clickBtn.classList.contains("i-jianhao")) {
        const index = +clickBtn.getAttribute("index");
        ui.decreaseGoods(index);
    }
});